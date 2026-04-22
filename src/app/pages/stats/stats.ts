import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import statsData from '../../../assets/stats.json';

interface StatsData {
  generatedAt: string;
  prompts: number;
  commits: number;
  contributors: number;
  firstCommitDate: string;
  files: number;
  lines: number;
  byExt: Record<string, number>;
}

const EXT_LABELS: Record<string, string> = {
  ts: 'TypeScript',
  html: 'HTML',
  scss: 'SCSS',
  css: 'CSS',
  mjs: 'Scripts',
  js: 'JavaScript',
  yml: 'YAML',
  yaml: 'YAML',
  md: 'Markdown',
};

@Component({
  selector: 'app-stats',
  imports: [MatCardModule, MatIconModule, DatePipe],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stats {
  stats = signal<StatsData>(statsData as StatsData);

  tiles = computed(() => {
    const s = this.stats();
    return [
      { icon: 'forum', label: 'Prompts', value: s.prompts, hint: 'Every one documented on /prompts' },
      { icon: 'commit', label: 'Commits', value: s.commits, hint: 'In this repo so far' },
      { icon: 'description', label: 'Files', value: s.files, hint: 'Source + config (node_modules excluded)' },
      { icon: 'notes', label: 'Lines of code', value: s.lines.toLocaleString(), hint: 'Across ts / html / scss / scripts' },
    ];
  });

  breakdown = computed(() => {
    const s = this.stats();
    const total = Object.values(s.byExt).reduce((a, b) => a + b, 0);
    return Object.entries(s.byExt)
      .sort((a, b) => b[1] - a[1])
      .map(([ext, lines]) => ({
        ext,
        label: EXT_LABELS[ext] ?? ext.toUpperCase(),
        lines,
        pct: Math.round((lines / total) * 100),
      }));
  });
}
