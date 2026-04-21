import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const rocketPath =
  'M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zm6.48-9.48c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0 .39 1.02 0 1.41-1.02.39-1.41 0zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12C4.42 15.34 5.17 15 6 15c1.66 0 3 1.34 3 3z';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1565D8"/>
      <stop offset="100%" stop-color="#0B3EA8"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <g transform="translate(128 128) scale(10.666)">
    <path d="${rocketPath}" fill="#FFFFFF"/>
  </g>
</svg>`;

const srcSvgPath = join(outDir, 'icon.svg');
writeFileSync(srcSvgPath, svg);

for (const size of sizes) {
  const out = join(outDir, `icon-${size}x${size}.png`);
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out);
  console.log(`wrote ${out}`);
}

const faviconPath = join(__dirname, '..', 'public', 'favicon.png');
await sharp(Buffer.from(svg)).resize(64, 64).png().toFile(faviconPath);
console.log(`wrote ${faviconPath}`);

console.log('done');
