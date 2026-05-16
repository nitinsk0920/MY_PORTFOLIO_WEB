// Run this once: node copy-assets.mjs
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copies = [
  ['univere/fall.jpg', 'public/assets/fall.jpg'],
];

for (const [src, dest] of copies) {
  const from = join(__dirname, src);
  const to   = join(__dirname, dest);
  if (existsSync(from)) {
    copyFileSync(from, to);
    console.log(`✓  ${src}  →  ${dest}`);
  } else {
    console.warn(`✗  not found: ${from}`);
  }
}
