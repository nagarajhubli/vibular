import { ChangeDetectionStrategy, Component, signal, effect, inject, DestroyRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InstallBanner } from './shared/install-banner/install-banner';
import { ShortcutsService } from './shared/shortcuts/shortcuts.service';
import { Cheatsheet } from './shared/shortcuts/cheatsheet';
import { CommandPalette } from './shared/command-palette/command-palette';
import { safeStorage } from './shared/utils/storage';

type ThemeId = 'azure' | 'rose' | 'mint';
export type ModeId = 'system' | 'light' | 'dark';

interface ThemeOption {
  id: ThemeId;
  label: string;
  swatch: string;
}

const THEME_STORAGE_KEY = 'app-theme';
const MODE_STORAGE_KEY = 'app-mode';
const MODE_CYCLE: ModeId[] = ['system', 'light', 'dark'];
const MODE_META: Record<ModeId, { icon: string; label: string }> = {
  system: { icon: 'brightness_auto', label: 'System' },
  light: { icon: 'light_mode', label: 'Light' },
  dark: { icon: 'dark_mode', label: 'Dark' },
};

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

  theme = signal<ThemeId>((safeStorage.get(THEME_STORAGE_KEY) as ThemeId) || 'azure');

  mode = signal<ModeId>((safeStorage.get(MODE_STORAGE_KEY) as ModeId) || 'system');

  private shortcuts = inject(ShortcutsService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.shortcuts.install(this.destroyRef);

    this.shortcuts.openCheatsheet$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.dialog.open(Cheatsheet, { autoFocus: 'dialog', width: '480px' });
    });
    this.shortcuts.openPalette$.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.dialog.openDialogs.some((d) => d.componentInstance instanceof CommandPalette)) return;
      this.dialog.open(CommandPalette, { panelClass: 'palette-panel', autoFocus: false });
    });
    this.shortcuts.cycleTheme$.pipe(takeUntilDestroyed()).subscribe(() => {
      const ids = this.themes.map((t) => t.id);
      const i = ids.indexOf(this.theme());
      this.theme.set(ids[(i + 1) % ids.length]);
    });
    this.shortcuts.cycleMode$.pipe(takeUntilDestroyed()).subscribe(() => this.cycleMode());

    effect(() => {
      const t = this.theme();
      const root = document.documentElement;
      root.classList.remove('theme-azure', 'theme-rose', 'theme-mint');
      root.classList.add(`theme-${t}`);
      safeStorage.set(THEME_STORAGE_KEY, t);
    });

    effect(() => {
      const m = this.mode();
      const root = document.documentElement;
      root.classList.remove('mode-system', 'mode-light', 'mode-dark');
      root.classList.add(`mode-${m}`);
      safeStorage.set(MODE_STORAGE_KEY, m);
    });
  }

  setTheme(id: ThemeId) {
    this.theme.set(id);
  }

  cycleMode() {
    const i = MODE_CYCLE.indexOf(this.mode());
    this.mode.set(MODE_CYCLE[(i + 1) % MODE_CYCLE.length]);
  }

  modeIcon() {
    return MODE_META[this.mode()].icon;
  }

  modeLabel() {
    return MODE_META[this.mode()].label;
  }

  currentTheme() {
    return this.themes.find((t) => t.id === this.theme()) ?? this.themes[0];
  }
}
