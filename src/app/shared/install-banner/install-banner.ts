import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { safeStorage } from '../utils/storage';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'vib-install-dismissed';

@Component({
  selector: 'app-install-banner',
  imports: [MatButtonModule, MatIconModule],
  template: `
    @if (visible()) {
      <div class="install-banner" role="region" aria-label="Install Vibular">
        <mat-icon class="icon">rocket_launch</mat-icon>
        <div class="copy">
          <strong>Install Vibular</strong>
          <span>Add to your home screen for an app-like vibe.</span>
        </div>
        <div class="actions">
          <button mat-button (click)="dismiss()" aria-label="Dismiss">Not now</button>
          <button mat-flat-button (click)="install()">
            <mat-icon>download</mat-icon>
            Install
          </button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .install-banner {
        position: fixed;
        left: 1rem;
        right: 1rem;
        bottom: 1rem;
        max-width: 560px;
        margin: 0 auto;
        padding: 0.75rem 1rem;
        background: var(--mat-sys-surface-container-high);
        color: var(--mat-sys-on-surface);
        border: 1px solid var(--mat-sys-outline-variant);
        border-radius: 14px;
        box-shadow: var(--mat-sys-level3);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 1100;
        animation: slide-up 260ms ease;
      }
      .icon {
        color: var(--mat-sys-primary);
        font-size: 1.75rem;
        width: 1.75rem;
        height: 1.75rem;
        flex-shrink: 0;
      }
      .copy {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-width: 0;
      }
      .copy strong {
        font: var(--mat-sys-title-small);
      }
      .copy span {
        font: var(--mat-sys-body-small);
        color: var(--mat-sys-on-surface-variant);
      }
      .actions {
        display: flex;
        gap: 0.25rem;
        flex-shrink: 0;
      }
      @keyframes slide-up {
        from {
          transform: translateY(30px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      @media (max-width: 480px) {
        .copy span {
          display: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallBanner {
  private deferred: BeforeInstallPromptEvent | null = null;
  visible = signal(false);

  @HostListener('window:beforeinstallprompt', ['$event'])
  onPrompt(event: Event) {
    if (safeStorage.get(DISMISS_KEY) === '1') return;
    event.preventDefault();
    this.deferred = event as BeforeInstallPromptEvent;
    this.visible.set(true);
  }

  @HostListener('window:appinstalled')
  onInstalled() {
    this.visible.set(false);
    this.deferred = null;
  }

  async install() {
    if (!this.deferred) return;
    await this.deferred.prompt();
    await this.deferred.userChoice;
    this.visible.set(false);
    this.deferred = null;
  }

  dismiss() {
    safeStorage.set(DISMISS_KEY, '1');
    this.visible.set(false);
  }
}
