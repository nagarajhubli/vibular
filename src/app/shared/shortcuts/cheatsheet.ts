import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface ShortcutRow {
  keys: string[];
  desc: string;
}

@Component({
  selector: 'app-cheatsheet',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Keyboard shortcuts</h2>
    <mat-dialog-content>
      @for (group of groups; track group.title) {
        <h3>{{ group.title }}</h3>
        <dl class="rows">
          @for (row of group.rows; track row.desc) {
            <div class="row">
              <dt>
                @for (k of row.keys; track k; let last = $last) {
                  <kbd>{{ k }}</kbd>
                  @if (!last) {
                    <span class="plus">then</span>
                  }
                }
              </dt>
              <dd>{{ row.desc }}</dd>
            </div>
          }
        </dl>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="ref.close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      h3 {
        font: var(--mat-sys-title-small);
        color: var(--mat-sys-primary);
        margin: 1rem 0 0.5rem;
      }
      .rows {
        margin: 0;
        display: grid;
        gap: 0.5rem;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: space-between;
      }
      dt {
        display: flex;
        gap: 0.35rem;
        align-items: center;
      }
      dd {
        margin: 0;
        color: var(--mat-sys-on-surface-variant);
      }
      kbd {
        display: inline-block;
        padding: 0.1rem 0.5rem;
        border-radius: 6px;
        background: var(--mat-sys-surface-container-high);
        border: 1px solid var(--mat-sys-outline-variant);
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 0.85rem;
        box-shadow: 0 1px 0 var(--mat-sys-outline-variant);
      }
      .plus {
        font-size: 0.75rem;
        color: var(--mat-sys-on-surface-variant);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cheatsheet {
  ref = inject(MatDialogRef<Cheatsheet>);

  groups: { title: string; rows: ShortcutRow[] }[] = [
    {
      title: 'Navigate',
      rows: [
        { keys: ['g', 'h'], desc: 'Go to Home' },
        { keys: ['g', 'c'], desc: 'Go to Components' },
        { keys: ['g', 'p'], desc: 'Go to Prompts' },
        { keys: ['g', 'a'], desc: 'Go to About' },
        { keys: ['g', 'y'], desc: 'Go to Playground' },
        { keys: ['g', 's'], desc: 'Go to Stats' },
        { keys: ['g', 'l'], desc: 'Go to Changelog' },
      ],
    },
    {
      title: 'Search',
      rows: [
        { keys: ['Ctrl / ⌘', 'K'], desc: 'Open command palette' },
        { keys: ['/'], desc: 'Open command palette' },
      ],
    },
    {
      title: 'Appearance',
      rows: [
        { keys: ['t'], desc: 'Cycle theme' },
        { keys: ['m'], desc: 'Cycle color mode' },
      ],
    },
    {
      title: 'Help',
      rows: [{ keys: ['?'], desc: 'Show this cheatsheet' }],
    },
  ];
}
