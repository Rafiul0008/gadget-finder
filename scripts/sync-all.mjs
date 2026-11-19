#!/usr/bin/env node
/**
 * Full-Website Automation Pipeline
 *
 * Runs end-to-end daily automation:
 *   1. Scan newly launched & upcoming phones + refresh live prices
 *   2. Fetch local product photos for any newly discovered phones
 *   3. Sync live gadget deals, discounts, and bank offers
 *   4. Fetch top 5 daily trending electronic gadgets tech news + visuals
 *   5. Rebuild the entire static site into dist/
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const steps = [
  { name: 'Scan newly launched phones & refresh prices', cmd: 'node', args: ['scripts/scrape-phones.mjs', '--discover', '--refresh-prices', '--limit', '80'], optional: true },
  { name: 'Fetch missing phone images', cmd: 'node', args: ['scripts/fetch-images.mjs'], optional: true },
  { name: 'Fetch product category images', cmd: 'node', args: ['scripts/fetch-product-images.mjs'], optional: true },
  { name: 'Sync live deals & discounts', cmd: 'node', args: ['scripts/auto-update.mjs'], optional: true },
  { name: 'Fetch top 5 daily trending gadget news & images', cmd: 'node', args: ['scripts/fetch-daily-news.mjs'], optional: true },
  { name: 'Rebuild static site into dist/', cmd: 'node', args: ['scripts/build.mjs'], optional: false },
];

for (const step of steps) {
  console.log(`\n=== ${step.name} ===`);
  const res = spawnSync(step.cmd, step.args, { cwd: ROOT, stdio: 'inherit' });
  if (res.status !== 0) {
    console.warn(`Step "${step.name}" exited with code ${res.status}`);
    if (!step.optional) process.exit(res.status || 1);
  }
}

console.log('\n✓ Full automation sync complete.');
