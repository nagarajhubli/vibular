import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { ShortcutsService } from '../../../shared/shortcuts/shortcuts.service';
import {
  CrosswordTheme,
  CrosswordWord,
  DIFFICULTIES,
  Difficulty,
  PUZZLES,
  Puzzle,
  THEMES,
  WIN_MSGS,
} from './puzzles';

interface Cell {
  r: number;
  c: number;
  letter: string;
  answer: string; // '_' means black (no cell)
}

@Component({
  selector: 'app-crossword',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './crossword.html',
  styleUrl: './crossword.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Crossword implements OnDestroy {
  readonly themes = THEMES;
  readonly difficulties = DIFFICULTIES;

  private shortcuts = inject(ShortcutsService);

  theme = signal<CrosswordTheme>('all');
  diff = signal<Difficulty>('easy');
  stage = signal<'filter' | 'game'>('filter');

  puzzle = signal<Puzzle | null>(null);
  cells = signal<Cell[][]>([]);
  activeWord = signal<CrosswordWord | null>(null);
  activeCell = signal<{ r: number; c: number } | null>(null);
  seconds = signal(0);
  solved = signal(false);
  winMsg = signal('');

  /** Cells flagged after a Check / Reveal pass. Cleared on next input. */
  marks = signal<Map<string, 'correct' | 'wrong'>>(new Map());

  cols = computed(() => this.cells()[0]?.length ?? 0);

  numMap = computed<Record<string, number>>(() => {
    const p = this.puzzle();
    if (!p) return {};
    const out: Record<string, number> = {};
    for (const w of p.words) out[`${w.row},${w.col}`] = w.num;
    return out;
  });

  acrossClues = computed<CrosswordWord[]>(
    () => this.puzzle()?.words.filter((w) => w.dir === 'across') ?? [],
  );
  downClues = computed<CrosswordWord[]>(
    () => this.puzzle()?.words.filter((w) => w.dir === 'down') ?? [],
  );

  activeClueText = computed(() => {
    if (this.solved()) {
      return `Solved in ${this.timerText()} — ${this.winMsg()} · Click "New puzzle" to play again.`;
    }
    const w = this.activeWord();
    return w ? `${w.num} ${w.dir.toUpperCase()}: ${w.clue}` : 'Select a cell to begin';
  });

  solvedWords = computed<Set<string>>(() => {
    const cells = this.cells();
    const p = this.puzzle();
    if (!p) return new Set();
    const out = new Set<string>();
    for (const w of p.words) {
      const ok = w.word.split('').every((ch, i) => {
        const r = w.dir === 'across' ? w.row : w.row + i;
        const c = w.dir === 'across' ? w.col + i : w.col;
        return cells[r]?.[c]?.letter === ch;
      });
      if (ok) out.add(this.wordKey(w));
    }
    return out;
  });

  timerText = computed(() => {
    const s = this.seconds();
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  });

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (this.stage() !== 'game' || this.solved()) return;
        this.seconds.update((s) => s + 1);
      });
  }

  ngOnDestroy(): void {
    this.shortcuts.suspended.set(false);
  }

  // ─── selection / state helpers ───

  wordKey(w: CrosswordWord): string {
    return w.word + w.dir;
  }

  cellInWord(r: number, c: number, w: CrosswordWord): boolean {
    if (w.dir === 'across') return r === w.row && c >= w.col && c < w.col + w.word.length;
    return c === w.col && r >= w.row && r < w.row + w.word.length;
  }

  isActiveCell(r: number, c: number): boolean {
    const a = this.activeCell();
    return !!a && a.r === r && a.c === c;
  }

  isInActiveWord(r: number, c: number): boolean {
    const w = this.activeWord();
    return !!w && this.cellInWord(r, c, w);
  }

  markFor(r: number, c: number): 'correct' | 'wrong' | null {
    return this.marks().get(`${r},${c}`) ?? null;
  }

  setTheme(t: CrosswordTheme) {
    this.theme.set(t);
  }
  setDiff(d: Difficulty) {
    this.diff.set(d);
  }

  // ─── game lifecycle ───

  startGame() {
    const puzzle = PUZZLES[this.theme()]?.[this.diff()] ?? PUZZLES.all.easy;
    const rows = puzzle.grid.length;
    const cols = Math.max(...puzzle.grid.map((r) => r.length));
    const cells: Cell[][] = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({
        r,
        c,
        letter: '',
        answer: puzzle.grid[r]?.[c] || '_',
      })),
    );
    this.puzzle.set(puzzle);
    this.cells.set(cells);
    this.activeWord.set(null);
    this.activeCell.set(null);
    this.seconds.set(0);
    this.solved.set(false);
    this.winMsg.set('');
    this.marks.set(new Map());
    this.stage.set('game');
    this.shortcuts.suspended.set(true);
  }

  newPuzzle() {
    this.stage.set('filter');
    this.solved.set(false);
    this.activeWord.set(null);
    this.activeCell.set(null);
    this.marks.set(new Map());
    this.shortcuts.suspended.set(false);
  }

  onCellClick(r: number, c: number) {
    const puzzle = this.puzzle();
    if (!puzzle) return;
    const wordsHere = puzzle.words.filter((w) => this.cellInWord(r, c, w));
    if (!wordsHere.length) return;

    const active = this.activeCell();
    const current = this.activeWord();
    if (active?.r === r && active?.c === c && wordsHere.length > 1) {
      const other = wordsHere.find((w) => w !== current);
      if (other) {
        this.selectWord(other, r, c);
        return;
      }
    }
    const chosen = current && wordsHere.includes(current) ? current : wordsHere[0];
    this.selectWord(chosen, r, c);
  }

  selectWord(w: CrosswordWord, r?: number, c?: number) {
    this.activeWord.set(w);
    this.activeCell.set({ r: r ?? w.row, c: c ?? w.col });
  }

  // ─── keyboard ───

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.stage() !== 'game' || this.solved()) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const active = this.activeCell();
    const w = this.activeWord();
    if (!active || !w) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      const cells = this.cells();
      const cell = cells[active.r]?.[active.c];
      if (!cell || cell.answer === '_') return;
      if (cell.letter) {
        this.writeLetter(active.r, active.c, '');
      } else {
        this.moveCursor(-1);
      }
      return;
    }

    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      this.writeLetter(active.r, active.c, e.key.toUpperCase());
      this.moveCursor(1);
      this.checkWin();
    }
  }

  private writeLetter(r: number, c: number, letter: string) {
    this.cells.update((grid) => {
      const copy = grid.map((row) => row.slice());
      if (copy[r]?.[c]) copy[r][c] = { ...copy[r][c], letter };
      return copy;
    });
    // Clear stale marks on edit.
    if (this.marks().size) this.marks.set(new Map());
  }

  private moveCursor(dir: 1 | -1) {
    const w = this.activeWord();
    const a = this.activeCell();
    if (!w || !a) return;
    const idxCurrent = w.dir === 'across' ? a.c - w.col : a.r - w.row;
    const idx = Math.max(0, Math.min(w.word.length - 1, idxCurrent + dir));
    const nr = w.dir === 'across' ? w.row : w.row + idx;
    const nc = w.dir === 'across' ? w.col + idx : w.col;
    this.activeCell.set({ r: nr, c: nc });
  }

  // ─── check / reveal ───

  check() {
    const puzzle = this.puzzle();
    if (!puzzle) return;
    const cells = this.cells();
    const marks = new Map<string, 'correct' | 'wrong'>();
    for (const row of cells) {
      for (const cd of row) {
        if (cd.answer === '_' || !cd.letter) continue;
        const wordsHere = puzzle.words.filter((w) => this.cellInWord(cd.r, cd.c, w));
        const correct = wordsHere.some((w) => {
          const i = w.dir === 'across' ? cd.c - w.col : cd.r - w.row;
          return cd.letter === w.word[i];
        });
        marks.set(`${cd.r},${cd.c}`, correct ? 'correct' : 'wrong');
      }
    }
    this.marks.set(marks);
  }

  revealWord() {
    const w = this.activeWord();
    if (!w) return;
    this.cells.update((grid) => {
      const copy = grid.map((row) => row.slice());
      w.word.split('').forEach((ch, i) => {
        const r = w.dir === 'across' ? w.row : w.row + i;
        const c = w.dir === 'across' ? w.col + i : w.col;
        if (copy[r]?.[c]) copy[r][c] = { ...copy[r][c], letter: ch };
      });
      return copy;
    });
    this.marks.set(new Map());
    this.checkWin();
  }

  revealAll() {
    const puzzle = this.puzzle();
    if (!puzzle) return;
    this.cells.update((grid) => {
      const copy = grid.map((row) => row.slice());
      for (const w of puzzle.words) {
        w.word.split('').forEach((ch, i) => {
          const r = w.dir === 'across' ? w.row : w.row + i;
          const c = w.dir === 'across' ? w.col + i : w.col;
          if (copy[r]?.[c]) copy[r][c] = { ...copy[r][c], letter: ch };
        });
      }
      return copy;
    });
    this.marks.set(new Map());
    this.winGame();
  }

  private checkWin() {
    const puzzle = this.puzzle();
    const cells = this.cells();
    if (!puzzle) return;
    const all = puzzle.words.every((w) =>
      w.word.split('').every((ch, i) => {
        const r = w.dir === 'across' ? w.row : w.row + i;
        const c = w.dir === 'across' ? w.col + i : w.col;
        return cells[r]?.[c]?.letter === ch;
      }),
    );
    if (all && !this.solved()) this.winGame();
  }

  private winGame() {
    this.solved.set(true);
    this.winMsg.set(WIN_MSGS[Math.floor(Math.random() * WIN_MSGS.length)]);
  }
}
