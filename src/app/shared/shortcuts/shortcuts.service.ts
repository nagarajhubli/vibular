import { Injectable, inject, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ShortcutsService {
  private router = inject(Router);

  readonly openCheatsheet$ = new Subject<void>();
  readonly openPalette$ = new Subject<void>();
  readonly cycleTheme$ = new Subject<void>();
  readonly cycleMode$ = new Subject<void>();

  private chord: string | null = null;
  private chordTimer: ReturnType<typeof setTimeout> | null = null;

  install(destroyRef: DestroyRef) {
    const handler = (e: KeyboardEvent) => this.onKey(e);
    window.addEventListener('keydown', handler);
    destroyRef.onDestroy(() => window.removeEventListener('keydown', handler));
  }

  private onKey(e: KeyboardEvent) {
    if (this.isTyping(e.target)) return;
    if (e.altKey) return;

    // Ctrl/Cmd+K → command palette.
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.openPalette$.next();
      return;
    }

    if (e.ctrlKey || e.metaKey) return;

    const key = e.key;

    // Chord: g then h/c/p/a.
    if (this.chord === 'g') {
      this.clearChord();
      const map: Record<string, string> = {
        h: '/home',
        c: '/components',
        p: '/prompts',
        a: '/about',
        y: '/playground',
        s: '/stats',
        l: '/changelog',
      };
      const path = map[key.toLowerCase()];
      if (path) {
        e.preventDefault();
        this.router.navigateByUrl(path);
      }
      return;
    }

    if (key === 'g') {
      this.chord = 'g';
      this.chordTimer = setTimeout(() => this.clearChord(), 800);
      return;
    }

    if (key === '?' || (e.shiftKey && key === '/')) {
      e.preventDefault();
      this.openCheatsheet$.next();
      return;
    }

    if (key === '/') {
      e.preventDefault();
      this.openPalette$.next();
      return;
    }

    if (key === 't') {
      e.preventDefault();
      this.cycleTheme$.next();
      return;
    }

    if (key === 'm') {
      e.preventDefault();
      this.cycleMode$.next();
      return;
    }
  }

  private clearChord() {
    this.chord = null;
    if (this.chordTimer) {
      clearTimeout(this.chordTimer);
      this.chordTimer = null;
    }
  }

  private isTyping(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
    if (target.isContentEditable) return true;
    return false;
  }
}
