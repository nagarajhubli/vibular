import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Crossword } from './crossword/crossword';

type GameId = 'menu' | 'crossword';

interface GameTile {
  id: Exclude<GameId, 'menu'>;
  icon: string;
  title: string;
  blurb: string;
  tags: string[];
}

@Component({
  selector: 'app-games',
  imports: [MatCardModule, MatIconModule, MatButtonModule, Crossword],
  templateUrl: './games.html',
  styleUrl: './games.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Games {
  stage = signal<GameId>('menu');

  tiles: GameTile[] = [
    {
      id: 'crossword',
      icon: 'extension',
      title: 'Dev Crossword',
      blurb: 'Eighteen pre-baked puzzles across HTML, CSS, JS, React and tooling. Typed letters, dual-direction clues, a timer that judges you.',
      tags: ['6 themes', '3 difficulties', 'keyboard-first'],
    },
  ];

  open(id: Exclude<GameId, 'menu'>) {
    this.stage.set(id);
  }

  backToMenu() {
    this.stage.set('menu');
  }
}
