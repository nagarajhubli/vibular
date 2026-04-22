import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'public', 'og-image.png');

const rocketPath =
  'M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zm6.48-9.48c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0 .39 1.02 0 1.41-1.02.39-1.41 0zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12C4.42 15.34 5.17 15 6 15c1.66 0 3 1.34 3 3z';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1565D8"/>
      <stop offset="100%" stop-color="#0B3EA8"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.2" r="0.6">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g transform="translate(110 180) scale(12)">
    <path d="${rocketPath}" fill="#FFFFFF"/>
  </g>

  <text x="450" y="300" font-family="Montserrat, sans-serif" font-size="120" font-weight="700" fill="#FFFFFF">
    Vibular
  </text>
  <text x="450" y="370" font-family="Lato, sans-serif" font-size="36" font-weight="400" fill="#FFFFFF" opacity="0.85">
    Angular 21 + Material 3, vibe-coded
  </text>
  <text x="450" y="420" font-family="Lato, sans-serif" font-size="28" font-weight="300" fill="#FFFFFF" opacity="0.7">
    Soft pastels. Hard opinions. Zero tickets.
  </text>

  <text x="110" y="580" font-family="Lato, sans-serif" font-size="22" font-weight="400" fill="#FFFFFF" opacity="0.6">
    nagarajhubli.github.io/vibular
  </text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`wrote ${outPath}`);
