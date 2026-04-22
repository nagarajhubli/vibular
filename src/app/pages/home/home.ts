import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

const SEED_PROMPT = `bootstrap latest version of angular project in this folder, and add angular material library as a dependency, will be customizing the material library later`;

const REMIX_PROMPT = `clone https://github.com/nagarajhubli/vibular as a starting point, then help me rename the project and pick a fresh Material 3 color palette that matches my brand`;

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private snackBar = inject(MatSnackBar);
  copiedSeed = signal(false);
  copiedRemix = signal(false);

  async copySeed() {
    try {
      await navigator.clipboard.writeText(SEED_PROMPT);
      this.copiedSeed.set(true);
      this.snackBar.open('Seed prompt copied. Paste it into Claude Code.', '', { duration: 2500 });
      setTimeout(() => this.copiedSeed.set(false), 2500);
    } catch {
      this.snackBar.open('Copy failed', 'Dismiss', { duration: 2000 });
    }
  }

  async copyRemix() {
    try {
      await navigator.clipboard.writeText(REMIX_PROMPT);
      this.copiedRemix.set(true);
      this.snackBar.open('Remix prompt copied. Paste it into Claude Code.', '', { duration: 2500 });
      setTimeout(() => this.copiedRemix.set(false), 2500);
    } catch {
      this.snackBar.open('Copy failed', 'Dismiss', { duration: 2000 });
    }
  }
}
