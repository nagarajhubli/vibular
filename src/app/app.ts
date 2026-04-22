import { ChangeDetectionStrategy, Component, signal, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InstallBanner } from './shared/install-banner/install-banner';

type ThemeId = 'azure' | 'rose' | 'mint';

interface ThemeOption {
  id: ThemeId;
  label: string;
  swatch: string;
}

const THEME_STORAGE_KEY = 'app-theme';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    InstallBanner,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  themes: ThemeOption[] = [
    { id: 'azure', label: 'Azure Sky', swatch: '#a7c7e7' },
    { id: 'rose', label: 'Rose Petal', swatch: '#f4b6c2' },
    { id: 'mint', label: 'Mint Breeze', swatch: '#b5e8c9' },
  ];

  theme = signal<ThemeId>(
    (typeof localStorage !== 'undefined' && (localStorage.getItem(THEME_STORAGE_KEY) as ThemeId)) || 'azure',
  );

  constructor() {
    effect(() => {
      const t = this.theme();
      const root = document.documentElement;
      root.classList.remove('theme-azure', 'theme-rose', 'theme-mint');
      root.classList.add(`theme-${t}`);
      if (typeof localStorage !== 'undefined') localStorage.setItem(THEME_STORAGE_KEY, t);
    });
  }

  setTheme(id: ThemeId) {
    this.theme.set(id);
  }

  currentTheme() {
    return this.themes.find((t) => t.id === this.theme()) ?? this.themes[0];
  }
}
