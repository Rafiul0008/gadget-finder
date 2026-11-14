#!/usr/bin/env node
/**
 * Downloads the best available product image for each phone in data/phones.json
 * and stores it locally in src/assets/phones/<slug>.<ext>.
 *
 * Candidate sources, in priority order:
 *   1. an existing local file (skipped unless --force / too small)
 *   2. `phone.gallery[]` URLs collected by scrape-phones.mjs (highest resolution wins)
 *
 * The chosen file's real pixel size is measured from the binary header (no
 * external image tools needed) and written back into data/phones.json.
 *
 * Usage:
 *   node scripts/fetch-images.mjs                 # all phones, skip good local files
 *   node scripts/fetch-images.mjs --limit 10      # first 10 needing an image
 *   node scripts/fetch-images.mjs --force         # re-download everything
 *   node scripts/fetch-images.mjs --min-width 600 # replace images narrower than this
 *   node scripts/fetch-images.mjs --slug vivo-y6k --dry
 *
 * Note: these URLs are third-party CDN assets. They are fine for prototyping;
 * swap in your own affiliate-feed images before publishing the site.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = path.join(ROOT, 'data/phones.json');
const OUTDIR = path.join(ROOT, 'src/assets/phones');
const UA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Mobile Safari/537.36';

const args = process.argv.slice(2);
const opt = (name, fallback) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : fallback; };
const flag = (name) => args.includes(name);

const LIMIT = Number(opt('--limit', Infinity));
const MIN_WIDTH = Number(opt('--min-width', 400));
const ONLY_SLUG = opt('--slug', null);
const FORCE = flag('--force');
const DRY = flag('--dry');
const DELAY = Number(opt('--delay', 250));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(url, tries = 2) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'image/*' }, redirect: 'follow' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get('content-type') || '';
      if (!type.startsWith('image/')) throw new Error(`not an image (${type})`);
      return { buffer: Buffer.from(await res.arrayBuffer()), type };
    } catch (error) {
      if (attempt === tries) throw error;
      await sleep(800 * attempt);
    }
  }
}

/** Read pixel dimensions from PNG / JPEG / WebP headers. */
function dimensions(buffer) {
  if (buffer.length > 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { format: 'png', width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset++; continue; }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { format: 'jpg', height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }
  if (buffer.length > 30 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buffer.toString('ascii', 12, 16);
    if (kind === 'VP8X') return { format: 'webp', width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
    if (kind === 'VP8 ') return { format: 'webp', width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    if (kind === 'VP8L') {
      const bits = buffer.readUInt32LE(21);
      return { format: 'webp', width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

function existingImage(slug) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const file = path.join(OUTDIR, `${slug}.${ext}`);
    if (fs.existsSync(file)) return { file, ext };
  }
  return null;
}

/** Design renders beat benchmark screenshots, videos and camera samples. */
function candidates(phone) {
  const seen = new Set();
  return (phone.gallery || [])
    .filter((g) => g.url && /^https?:/.test(g.url) && !/watch\?|youtu/.test(g.url))
    .filter((g) => {
      if (seen.has(g.url)) return false;
      seen.add(g.url);
      return true;
    })
    .map((g, index) => {
      const file = g.url.split('/').pop().toLowerCase();
      const category = (g.category || '').toLowerCase();
      let rank = 0;
      if (category === 'design') rank += 4;
      else if (category === 'general') rank += 3;
      else if (category === '') rank += 3;
      else if (category === 'front camera' || category === 'rear camera') rank += 1;
      if (/front[-_ ]?(and[-_ ]?)?back|back[-_ ]?(and[-_ ])?front|front-back/.test(file)) rank += 2;
      if (/benchmark|antutu|geekbench|stress/.test(file)) rank -= 5;
      return { url: g.url, rank, index };
    })
    .sort((a, b) => b.rank - a.rank || a.index - b.index)
    .slice(0, 5);
}

async function bestFor(phone) {
  let best = null;
  for (const candidate of candidates(phone)) {
    try {
      const { buffer, type } = await download(candidate.url);
      const dims = dimensions(buffer);
      if (!dims) continue;
      const token = Math.round((dims.width * dims.height) / 100000);
      const score = candidate.rank * 1000 + token;
      if (!best || score > best.score) {
        const ext = dims.format === 'jpg' ? 'jpg' : dims.format;
        best = { buffer, dims, ext, url: candidate.url, score, type, rank: candidate.rank };
      }
      if (best.rank >= 6) break;
    } catch { /* try next candidate */ }
    await sleep(120);
  }
  return best;
}

async function main() {
  if (!fs.existsSync(DATA)) throw new Error(`Missing ${path.relative(ROOT, DATA)} — run the scraper first`);
  const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  fs.mkdirSync(OUTDIR, { recursive: true });

  const force = FORCE || DRY;
  const pool = ONLY_SLUG ? data.phones.filter((phone) => phone.slug === ONLY_SLUG || phone.slug.includes(ONLY_SLUG)) : data.phones;
  if (ONLY_SLUG && !pool.length) throw new Error(`No phone matches --slug ${ONLY_SLUG}`);
  const queue = pool.filter((phone) => {
    if (force) return true;
    const found = existingImage(phone.slug);
    if (!found) return true;
    const meta = phone.image;
    return !meta || !meta.width || meta.width < MIN_WIDTH;
  }).slice(0, LIMIT);

  console.log(`${queue.length} of ${pool.length} phones need an image${DRY ? ' (dry run)' : ''}`);

  let saved = 0, skipped = 0, failed = 0;
  for (const [index, phone] of queue.entries()) {
    try {
      if (!DRY) {
        const found = existingImage(phone.slug);
        if (found && !FORCE && (phone.image?.width || 0) >= MIN_WIDTH) { skipped++; continue; }
      }
      const best = await bestFor(phone);
      if (!best) { failed++; console.log(`✗ ${phone.slug}: no usable gallery image`); continue; }

      const target = path.join(OUTDIR, `${phone.slug}.${best.ext}`);
      if (DRY) {
        console.log(`• ${phone.slug} → ${best.dims.width}×${best.dims.height} ${best.ext.toUpperCase()} ${Math.round(best.buffer.length / 1024)}KB  ${best.url}`);
        saved++;
        continue;
      }
      // remove a previous file with a different extension
      for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
        const old = path.join(OUTDIR, `${phone.slug}.${ext}`);
        if (old !== target && fs.existsSync(old)) fs.rmSync(old);
      }
      fs.writeFileSync(target, best.buffer);
      const previous = phone.image;
      phone.image = {
        file: `assets/phones/${phone.slug}.${best.ext}`,
        width: best.dims.width,
        height: best.dims.height,
        bytes: best.buffer.length,
        source: best.url,
        fetchedAt: new Date().toISOString(),
      };
      saved++;
      const upgraded = previous?.width && best.dims.width > previous.width ? ` (was ${previous.width}px)` : '';
      console.log(`✓ ${phone.slug} ${best.dims.width}×${best.dims.height}${upgraded} ${Math.round(best.buffer.length / 1024)}KB`);
      if (index < queue.length - 1) await sleep(DELAY);
    } catch (error) {
      failed++;
      console.log(`✗ ${phone.slug}: ${error.message}`);
    }
  }

  if (!DRY) {
    data.imageStats = {
      generatedAt: new Date().toISOString(),
      count: data.phones.filter((p) => p.image?.file).length,
      minWidth: Math.min(...data.phones.filter((p) => p.image?.width).map((p) => p.image.width)),
      maxWidth: Math.max(...data.phones.filter((p) => p.image?.width).map((p) => p.image.width)),
    };
    fs.writeFileSync(DATA, JSON.stringify(data, null, 2));
  }
  console.log(`\n${saved} ${DRY ? 'found' : 'saved'}, ${skipped} skipped, ${failed} failed`);
  if (!DRY && data.imageStats) console.log(`local images: ${data.imageStats.count}/${data.phones.length} (width ${data.imageStats.minWidth}–${data.imageStats.maxWidth}px)`);
}

main().catch((error) => { console.error(error); process.exit(1); });
