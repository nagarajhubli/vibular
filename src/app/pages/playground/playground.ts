import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

interface Palette {
  id: string;
  label: string;
  swatch: string;
}

const PALETTES: Palette[] = [
  { id: 'azure', label: 'Azure', swatch: '#a7c7e7' },
  { id: 'rose', label: 'Rose', swatch: '#f4b6c2' },
  { id: 'spring-green', label: 'Mint', swatch: '#b5e8c9' },
  { id: 'violet', label: 'Violet', swatch: '#c7b6f4' },
  { id: 'orange', label: 'Orange', swatch: '#f4c7b6' },
  { id: 'cyan', label: 'Cyan', swatch: '#b6eaf4' },
];

const TERTIARIES: Palette[] = [
  { id: 'blue', label: 'Blue', swatch: '#90caf9' },
  { id: 'magenta', label: 'Magenta', swatch: '#f48fb1' },
  { id: 'cyan', label: 'Cyan', swatch: '#80deea' },
  { id: 'yellow', label: 'Yellow', swatch: '#fff59d' },
  { id: 'red', label: 'Red', swatch: '#ef9a9a' },
];

const FONTS = ['Lato', 'Montserrat', 'Roboto', 'Inter', 'Open Sans', 'system-ui'];

@Component({
  selector: 'app-playground',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatChipsModule,
  ],
  templateUrl: './playground.html',
  styleUrl: './playground.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Playground {
  private snackBar = inject(MatSnackBar);

  palettes = PALETTES;
  tertiaries = TERTIARIES;
  fonts = FONTS;

  primary = signal<string>('azure');
  tertiary = signal<string>('blue');
  brandFont = signal<string>('Montserrat');
  plainFont = signal<string>('Lato');
  density = signal<number>(-3);
  copied = signal(false);

  previewStyle = computed(() => {
    const p = this.palettes.find((x) => x.id === this.primary());
    const t = this.tertiaries.find((x) => x.id === this.tertiary());
    return {
      '--vib-playground-primary': p?.swatch ?? '#a7c7e7',
      '--vib-playground-tertiary': t?.swatch ?? '#90caf9',
      '--vib-playground-brand-font': `"${this.brandFont()}", sans-serif`,
      '--vib-playground-plain-font': `"${this.plainFont()}", sans-serif`,
    } as Record<string, string>;
  });

  snippet = computed(() => {
    return `@use '@angular/material' as mat;

html {
  @include mat.theme(
    (
      color: (
        primary: mat.$${this.primary()}-palette,
        tertiary: mat.$${this.tertiary()}-palette,
      ),
      typography: (
        brand-family: '${this.brandFont()}',
        plain-family: '${this.plainFont()}',
      ),
      density: ${this.density()},
    )
  );
}`;
  });

  async copy() {
    try {
      await navigator.clipboard.writeText(this.snippet());
      this.copied.set(true);
      this.snackBar.open('Snippet copied to clipboard', '', { duration: 2000 });
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      this.snackBar.open('Copy failed', 'Dismiss', { duration: 2000 });
    }
  }
}
