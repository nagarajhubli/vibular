import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'src', 'assets');
mkdirSync(outDir, { recursive: true });

function sh(cmd) {
  return execSync(cmd, { cwd: root, encoding: 'utf8' }).trim();
}

// --- Changelog ---------------------------------------------------------------
const log = sh(
  'git log --pretty=format:%H%x1f%h%x1f%aI%x1f%an%x1f%s%x1f%b%x1e --no-merges',
);
const changelog = log
  .split('\x1e')
  .map((s) => s.trim())
  .filter(Boolean)
  .map((entry) => {
    const [hash, short, date, author, subject, body] = entry.split('\x1f');
    return { hash, short, date, author, subject, body: (body || '').trim() };
  });

writeFileSync(join(outDir, 'changelog.json'), JSON.stringify(changelog, null, 2));
console.log(`wrote changelog.json (${changelog.length} commits)`);

// --- Stats -------------------------------------------------------------------
const IGNORE = new Set(['node_modules', 'dist', '.git', '.angular', 'coverage', 'assets']);
const IGNORE_FILES = new Set(['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml']);

function walk(dir, acc = { files: 0, lines: 0, byExt: {} }) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE.has(entry.name)) continue;
    if (entry.isFile() && IGNORE_FILES.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
    } else if (entry.isFile()) {
      const ext = entry.name.includes('.') ? entry.name.split('.').pop() : '';
      if (!['ts', 'html', 'scss', 'css', 'md', 'mjs', 'js', 'yml', 'yaml'].includes(ext)) continue;
      acc.files += 1;
      try {
        const lines = readFileSync(full, 'utf8').split('\n').length;
        acc.lines += lines;
        acc.byExt[ext] = (acc.byExt[ext] || 0) + lines;
      } catch {
        /* ignore */
      }
    }
  }
  return acc;
}

const { files, lines, byExt } = walk(root);

// Read prompts.ts to count entries.
const promptsSrc = readFileSync(join(root, 'src', 'app', 'pages', 'prompts', 'prompts.ts'), 'utf8');
const promptCount = (promptsSrc.match(/\bstep:\s*\d+/g) || []).length;

// Commit count (total, including history)
const commitCount = Number(sh('git rev-list --count HEAD'));
const contributors = Number(sh('git log --format="%aN" | sort -u | wc -l'));
const firstCommitDate = sh('git log --reverse --pretty=format:%aI | head -1');

const stats = {
  generatedAt: new Date().toISOString(),
  prompts: promptCount,
  commits: commitCount,
  contributors,
  firstCommitDate,
  files,
  lines,
  byExt,
};

writeFileSync(join(outDir, 'stats.json'), JSON.stringify(stats, null, 2));
console.log(`wrote stats.json — ${promptCount} prompts, ${commitCount} commits, ${files} files, ${lines} lines`);
