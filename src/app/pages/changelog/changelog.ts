import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import changelogData from '../../../assets/changelog.json';

interface Commit {
  hash: string;
  short: string;
  date: string;
  author: string;
  subject: string;
  body: string;
}

interface MonthGroup {
  key: string;
  label: string;
  commits: Commit[];
}

const REPO = 'https://github.com/nagarajhubli/vibular';

@Component({
  selector: 'app-changelog',
  imports: [MatCardModule, MatIconModule, DatePipe],
  templateUrl: './changelog.html',
  styleUrl: './changelog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Changelog {
  commits = signal<Commit[]>(changelogData as Commit[]);

  groups = computed<MonthGroup[]>(() => {
    const by = new Map<string, MonthGroup>();
    for (const c of this.commits()) {
      const d = new Date(c.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
      if (!by.has(key)) by.set(key, { key, label, commits: [] });
      by.get(key)!.commits.push(c);
    }
    return [...by.values()];
  });

  commitUrl(short: string) {
    return `${REPO}/commit/${short}`;
  }
}
