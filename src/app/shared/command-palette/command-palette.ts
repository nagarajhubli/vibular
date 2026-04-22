import { ChangeDetectionStrategy, Component, computed, inject, signal, ElementRef, viewChild, AfterViewInit, HostListener } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { COMMANDS, Command } from './commands';

@Component({
  selector: 'app-command-palette',
  imports: [MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <div class="palette">
      <div class="search-row">
        <mat-icon>search</mat-icon>
        <input
          #searchInput
          type="text"
          [(ngModel)]="query"
          (ngModelChange)="onQuery($event)"
          placeholder="Jump to a page or demo…"
          autocomplete="off"
          spellcheck="false"
        />
        <kbd>esc</kbd>
      </div>

      <div class="results" role="listbox">
        @for (group of grouped(); track group.title) {
          <div class="group-title">{{ group.title }}</div>
          @for (item of group.items; track item.id) {
            <button
              type="button"
              role="option"
              class="result"
              [class.active]="item === active()"
              (mouseenter)="setActive(item)"
              (click)="pick(item)"
            >
              <mat-icon>{{ item.icon }}</mat-icon>
              <span class="label">{{ item.label }}</span>
              @if (item.hint) {
                <span class="hint">{{ item.hint }}</span>
              }
            </button>
          }
        }
        @if (!filtered().length) {
          <div class="empty">No matches. Try another keyword.</div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .palette {
        width: min(560px, 92vw);
        display: flex;
        flex-direction: column;
        max-height: 70vh;
      }
      .search-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--mat-sys-outline-variant);
      }
      .search-row input {
        flex: 1;
        border: 0;
        outline: none;
        background: transparent;
        font: var(--mat-sys-body-large);
        color: var(--mat-sys-on-surface);
      }
      .search-row kbd {
        font-size: 0.7rem;
        padding: 0.1rem 0.4rem;
        border: 1px solid var(--mat-sys-outline-variant);
        border-radius: 4px;
        color: var(--mat-sys-on-surface-variant);
      }
      .results {
        overflow-y: auto;
        padding: 0.5rem 0;
      }
      .group-title {
        font: var(--mat-sys-label-medium);
        color: var(--mat-sys-on-surface-variant);
        padding: 0.5rem 1rem 0.25rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .result {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.55rem 1rem;
        background: transparent;
        border: 0;
        text-align: left;
        cursor: pointer;
        color: var(--mat-sys-on-surface);
        font: var(--mat-sys-body-medium);
      }
      .result.active {
        background: color-mix(in srgb, var(--mat-sys-primary) 12%, transparent);
      }
      .result .label {
        flex: 1;
      }
      .result .hint {
        font: var(--mat-sys-body-small);
        color: var(--mat-sys-on-surface-variant);
      }
      .empty {
        padding: 1.5rem 1rem;
        text-align: center;
        color: var(--mat-sys-on-surface-variant);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPalette implements AfterViewInit {
  private ref = inject(MatDialogRef<CommandPalette>);
  private router = inject(Router);

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  query = '';
  queryS = signal('');
  active = signal<Command | null>(null);

  filtered = computed(() => {
    const q = this.queryS().toLowerCase().trim();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q));
  });

  grouped = computed(() => {
    const list = this.filtered();
    const groups: { title: string; items: Command[] }[] = [];
    for (const item of list) {
      let g = groups.find((x) => x.title === item.group);
      if (!g) {
        g = { title: item.group, items: [] };
        groups.push(g);
      }
      g.items.push(item);
    }
    return groups;
  });

  ngAfterViewInit() {
    setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    this.active.set(this.filtered()[0] ?? null);
  }

  onQuery(q: string) {
    this.queryS.set(q);
    this.active.set(this.filtered()[0] ?? null);
  }

  setActive(c: Command) {
    this.active.set(c);
  }

  pick(c: Command) {
    this.ref.close();
    const [path, hash] = c.path.split('#');
    this.router.navigate([path], hash ? { fragment: hash } : undefined);
  }

  @HostListener('keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    const list = this.filtered();
    if (!list.length) return;
    const curr = this.active();
    const idx = curr ? list.indexOf(curr) : -1;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.active.set(list[(idx + 1) % list.length]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.active.set(list[(idx - 1 + list.length) % list.length]);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (curr) this.pick(curr);
    }
  }
}
