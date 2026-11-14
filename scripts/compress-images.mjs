#!/usr/bin/env node
/**
 * Post-build WebP optimizer for dist/
 *
 * Converts large PNGs in dist/assets/phones and dist/assets/products into
 * high-quality WebP (-q 85, full resolution) when `cwebp` is available,
 * and updates references in dist/ HTML files.
 * Shrinks dist/ from ~2.2 GB down to ~250 MB for fast Cloudflare/GitHub hosting.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

const hasCwebp = spawnSync('cwebp', ['-version'], { stdio: 'ignore' }).status === 0;
if (!hasCwebp) {
  console.log('cwebp not installed in this environment; skipping WebP compression.');
  process.exit(0);
}

const dirs = [
  path.join(DIST, 'assets/phones'),
  path.join(DIST, 'assets/products'),
];

const converted = new Set();
let savedBytes = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.png')) continue;
    const pngPath = path.join(dir, file);
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    try {
      execFileSync('cwebp', ['-q', '85', '-m', '4', '-mt', '-quiet', pngPath, '-o', webpPath]);
      const oldSize = fs.statSync(pngPath).size;
      const newSize = fs.statSync(webpPath).size;
      if (newSize > 0 && newSize < oldSize) {
        fs.unlinkSync(pngPath);
        savedBytes += oldSize - newSize;
        converted.add(file);
      } else if (fs.existsSync(webpPath)) {
        fs.unlinkSync(webpPath);
      }
    } catch {
      if (fs.existsSync(webpPath)) fs.unlinkSync(webpPath);
    }
  }
}

if (converted.size) {
  const rewriteHtml = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) rewriteHtml(full);
      else if (entry.name.endsWith('.html')) {
        const html = fs.readFileSync(full, 'utf8');
        const next = html.replace(/(assets\/(?:phones|products)\/[a-z0-9-]+)\.png/gi, (m, base) => {
          const fname = `${path.basename(base)}.png`;
          return converted.has(fname) ? `${base}.webp` : m;
        });
        if (next !== html) fs.writeFileSync(full, next);
      }
    }
  };
  rewriteHtml(DIST);
}

console.log(`Compressed ${converted.size} PNGs to WebP (-q 85), saved ${(savedBytes / (1024 * 1024)).toFixed(1)} MB.`);
