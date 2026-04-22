import { ChangeDetectionStrategy, Component, input, signal, inject, computed } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { slug } from '../utils/slug';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

@Component({
  selector: 'app-demo-block',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <div class="demo-block" [id]="anchor()">
      <header>
        <h2>
          <a class="anchor" [href]="'#' + anchor()" (click)="copyLink($event)">
            {{ title() }}
            <mat-icon class="anchor-icon">{{ linkCopied() ? 'check' : 'link' }}</mat-icon>
          </a>
        </h2>
        <div class="actions">
          <button
            mat-icon-button
            (click)="showCode.set(!showCode())"
            [matTooltip]="showCode() ? 'Hide code' : 'Show code'"
            aria-label="Toggle code"
          >
            <mat-icon>{{ showCode() ? 'code_off' : 'code' }}</mat-icon>
          </button>
          <button
            mat-stroked-button
            (click)="copyCode()"
            aria-label="Copy code"
          >
            <mat-icon>{{ copied() ? 'check' : 'content_copy' }}</mat-icon>
            {{ copied() ? 'Copied' : 'Copy' }}
          </button>
        </div>
      </header>

      <div class="demo-area">
        <ng-content />
      </div>

      @if (showCode()) {
        <pre class="code-view hljs"><code [innerHTML]="highlighted()"></code></pre>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .demo-block {
        margin: 2rem 0;
        padding: 1.5rem;
        background: var(--mat-sys-surface-container-low);
        border-radius: 12px;
        box-shadow: var(--mat-sys-level1);
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        gap: 1rem;
        flex-wrap: wrap;
      }
      h2 {
        font: var(--mat-sys-headline-small);
        color: var(--mat-sys-primary);
        margin: 0;
      }
      h2 .anchor {
        color: inherit;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }
      h2 .anchor-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        opacity: 0;
        transition: opacity 0.15s ease-in-out;
      }
      h2 .anchor:hover .anchor-icon,
      h2 .anchor:focus-visible .anchor-icon {
        opacity: 0.7;
      }
      .actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      .demo-area {
        padding: 0.5rem 0;
      }
      .code-view {
        margin: 1rem 0 0;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
        white-space: pre;
      }
      .code-view code {
        background: transparent;
        padding: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBlock {
  title = input('');
  code = input('');

  private snackBar = inject(MatSnackBar);
  private sanitizer = inject(DomSanitizer);
  showCode = signal(false);
  copied = signal(false);
  linkCopied = signal(false);

  anchor = computed(() => slug(this.title()));

  highlighted = computed<SafeHtml>(() => {
    const src = this.code();
    const lang = src.includes('// imports:') || src.includes('inject(') ? 'typescript' : 'xml';
    const result = hljs.highlight(src, { language: lang, ignoreIllegals: true });
    return this.sanitizer.bypassSecurityTrustHtml(result.value);
  });

  async copyLink(event: MouseEvent) {
    event.preventDefault();
    const url = `${location.origin}${location.pathname}#${this.anchor()}`;
    history.replaceState(null, '', `#${this.anchor()}`);
    try {
      await navigator.clipboard.writeText(url);
      this.linkCopied.set(true);
      this.snackBar.open('Link copied to clipboard', '', { duration: 1800 });
      setTimeout(() => this.linkCopied.set(false), 1800);
    } catch {
      this.snackBar.open('Copy failed', 'Dismiss', { duration: 2000 });
    }
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      this.snackBar.open('Code copied to clipboard', '', { duration: 2000 });
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      this.snackBar.open('Copy failed', 'Dismiss', { duration: 2000 });
    }
  }
}
