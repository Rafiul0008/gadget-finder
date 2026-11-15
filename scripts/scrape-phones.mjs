#!/usr/bin/env node
/**
 * Spec importer for gadgets.beebom.com product pages.
 *
 * Extracts FACTUAL data only (specs, prices, scores, bands) from a page's
 * embedded Astro island props. No editorial prose or article content is copied.
 *
 * Usage:
 *   node scripts/scrape-phones.mjs --urls urls.txt --out data/phones.json
 *   node scripts/scrape-phones.mjs --discover --limit 60
 *   node scripts/scrape-phones.mjs --slug vivo-y6k --dry
 *
 * Flags:
 *   --urls FILE     newline-separated product URLs or slugs
 *   --discover      discover phone URLs from the sitemap + home page
 *   --limit N       max phones to fetch (default 60)
 *   --out FILE      output JSON (default data/phones.json); merged, resumable
 *   --delay MS      delay between requests (default 700)
 *   --dry           print one parsed record, write nothing
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const ORIGIN = 'https://gadgets.beebom.com';
const UA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Mobile Safari/537.36';
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(name);

const DELAY = Number(opt('--delay', 700));
const LIMIT = Number(opt('--limit', 60));
const OUT = path.resolve(ROOT, opt('--out', 'data/phones.json'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html' } });
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (error) {
      if (attempt === tries) throw error;
      await sleep(1500 * attempt);
    }
  }
}

/** Astro serialises props as [0, value] scalars and [1, [[0, item], ...]] lists. */
function unwrap(value) {
  if (Array.isArray(value)) {
    if (value.length === 2 && value[0] === 0) return unwrap(value[1]);
    if (value.length === 2 && value[0] === 1) return (value[1] || []).map((entry) => (Array.isArray(entry) && entry[0] === 0 ? unwrap(entry[1]) : unwrap(entry)));
    return value.map(unwrap);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value)) out[key] = unwrap(value[key]);
    return out;
  }
  return value;
}

const decode = (s) => s
  .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

function islands(html) {
  const found = [];
  const re = /<astro-island[^>]*?component-url="[^"]*\/([A-Za-z0-9_]+)\.[A-Za-z0-9_-]+\.js"[^>]*?props="([^"]*)"/g;
  let match;
  while ((match = re.exec(html))) {
    const component = match[1];
    const start = match.index;
    let props = null;
    try { props = unwrap(JSON.parse(decode(match[2]))); } catch { /* component without parseable props */ }
    found.push({ component, start, props });
  }
  return found;
}

const stripTags = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const clean = (v) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : v);

function parsePrice(text) {
  if (!text) return null;
  const matches = [...text.matchAll(/([₹¥$])\s?([\d,]+)/g)]
    .map((m) => ({ currency: m[1], amount: Number(m[2].replace(/,/g, '')), text: m[0] }))
    .filter((m) => m.amount > 0);
  if (!matches.length) return null;
  const first = matches[0];
  if (first.currency === '₹' && first.amount < 3000) {
    const realistic = matches.slice(0, 6).find((m) => m.currency === '₹' && m.amount >= 3000);
    if (realistic && !/\b(nokia\s*1\d\d|jio\s*bharat|jiophone|i\s*kall|itel|hmd\s*1\d\d|lava\s*action)\b/i.test(text.slice(0, 300))) {
      return realistic;
    }
  }
  return first;
}

function parseSpecGroups(html) {
  const list = islands(html);
  const groups = {};
  for (const island of list) {
    if (island.component !== 'SpecItemGroup' || !island.props) continue;
    // group name is the nearest preceding <h3>
    const before = html.slice(0, island.start);
    const heading = [...before.matchAll(/<h3[^>]*>([^<]{1,60})<\/h3>/g)].pop();
    if (!heading) continue;
    const group = stripTags(heading[1]);
    const specs = (island.props.validSpecs || []).map((spec) => {
      const children = (spec.expanded || [])
        .map((child) => ({ label: clean(child.displayName || child.name), value: clean(child.value) }))
        .filter((child) => child.label && child.value);
      return {
        label: clean(spec.name),
        value: clean(spec.value),
        ...(children.length ? { children } : {}),
      };
    }).filter((spec) => spec.label && (spec.value || spec.children));
    if (specs.length) groups[group] = specs;
  }
  return groups;
}

function parseHighlights(html) {
  const table = html.match(/<table[^>]*id="highlights-table"[^>]*>([\s\S]*?)<\/table>/);
  if (!table) return {};
  const out = {};
  const rows = table[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
  for (const row of rows) {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => stripTags(m[1]));
    if (cells.length >= 2 && cells[0]) out[cells[0]] = cells[1];
  }
  return out;
}

function parseGallery(html) {
  const island = islands(html).find((i) => i.component === 'PdpMainHeroImage' && i.props);
  const images = island?.props?.gallery?.images || [];
  return images.map((img) => ({ url: img.url, alt: img.alt, category: img.category })).filter((img) => img.url);
}

function parseRecord(html, slug) {
  const all = islands(html);
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]{1,160}?)<\/h1>/g)].map((m) => stripTags(m[1])).find(Boolean) || '';

  // Limit score/rating/price/status lookups to the hero, before Key Highlights,
  // so values from the "Explore ... phones" rails cannot leak in.
  const heroEnd = Math.max(html.indexOf('highlights-table'), html.indexOf('Key Highlights'));
  const heroHtml = heroEnd > 0 ? html.slice(0, heroEnd) : html.slice(0, 120000);
  const heroText = stripTags(heroHtml);

  const brandIsland = all.find((i) => i.component === 'ExploreBrandPhonesClient' && i.props);
  const rawBrand = brandIsland?.props?.brandDisplayName
    || (/\bExplore\s+([A-Za-z0-9+.\- ]{2,24}?)\s+Phones\b/.exec(stripTags(html)) || [])[1]
    || '';
  const brand = (rawBrand && rawBrand.toLowerCase() !== 'mobile') ? rawBrand : (h1.split(' ')[0] || '');

  const parsedPrice = parsePrice(heroText);
  const statusCandidates = ['Not Released in India', 'Upcoming', 'Rumoured', 'Rumored', 'Discontinued', 'Available'];
  const propStatus = brandIsland?.props?.marketStatus || '';
  let marketStatus = statusCandidates.find((s) => propStatus.toLowerCase() === s.toLowerCase())
    || statusCandidates.filter((s) => s !== 'Not Released in India').find((s) => heroText.includes(s))
    || null;
  if (marketStatus === 'Not Released in India' && parsedPrice?.currency === '₹') {
    marketStatus = null;
  }

  const scoreMatch = /(\d{1,3})\s*Beebom Score/.exec(heroText);
  const ratingMatch = /(\d\.\d)\s*\/\s*5/.exec(heroText);

  const records = {
    slug,
    url: `${ORIGIN}/mobile/${slug}`,
    name: h1,
    brand,
    price: parsedPrice,
    score: scoreMatch ? Number(scoreMatch[1]) : null,
    rating: ratingMatch ? Number(ratingMatch[1]) : null,
    marketStatus,
    highlights: parseHighlights(html),
    gallery: parseGallery(html),
    specs: parseSpecGroups(html),
    scrapedAt: new Date().toISOString(),
  };
  if (!records.name) throw new Error('no <h1> — page layout changed?');
  return records;
}

async function discover() {
  const urls = new Set();
  for (const page of ['', '/mobile-list', '/latest-mobile-phones', '/upcoming-mobile-phones']) {
    try {
      const html = await get(`${ORIGIN}${page}`);
      for (const m of html.matchAll(/href="\/mobile\/([a-z0-9-]+)"/g)) urls.add(m[1]);
    } catch (e) { console.error(`discover ${page || '/'} failed:`, e.message); }
  }
  return [...urls];
}

async function main() {
  let slugs = [];
  if (opt('--slug')) slugs = [opt('--slug')];
  else if (opt('--urls')) {
    slugs = fs.readFileSync(path.resolve(ROOT, opt('--urls')), 'utf8')
      .split('\n').map((l) => l.trim()).filter(Boolean)
      .map((l) => l.replace(/^.*\/mobile\//, '').replace(/\/.*$/, '').replace(/^\/+/, ''));
  } else if (flag('--discover')) slugs = await discover();
  else { console.error('Need --slug, --urls or --discover. See header.'); process.exit(1); }

  const refreshPrices = flag('--refresh-prices');
  const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { phones: [] };
  const bySlug = new Map(existing.phones.map((p) => [p.slug, p]));

  if (refreshPrices && flag('--discover') && slugs.length < LIMIT) {
    const stale = existing.phones
      .filter((p) => p.price?.currency === '₹' && !slugs.includes(p.slug))
      .sort((a, b) => (Date.parse(a.scrapedAt || '') || 0) - (Date.parse(b.scrapedAt || '') || 0))
      .map((p) => p.slug);
    slugs = [...slugs, ...stale];
  }

  slugs = [...new Set(slugs)].slice(0, LIMIT);

  if (flag('--dry')) {
    const html = await get(`${ORIGIN}/mobile/${slugs[0]}`);
    console.log(JSON.stringify(parseRecord(html, slugs[0]), null, 2));
    return;
  }

  let ok = 0, failed = 0, skipped = 0;

  for (const slug of slugs) {
    const cached = bySlug.get(slug);
    if (!refreshPrices && cached && cached.specs && Object.keys(cached.specs).length >= 8) { skipped++; continue; }
    try {
      const html = await get(`${ORIGIN}/mobile/${slug}`);
      const record = parseRecord(html, slug);
      bySlug.set(slug, record);
      ok++;
      process.stdout.write(`✓ ${slug} (${Object.keys(record.specs).length} groups, ${record.specs ? Object.values(record.specs).reduce((n, g) => n + g.length, 0) : 0} specs)\n`);
    } catch (error) {
      failed++;
      process.stdout.write(`✗ ${slug}: ${error.message}\n`);
    }
    if (slugs.indexOf(slug) < slugs.length - 1) await sleep(DELAY);
  }

  const phones = [...bySlug.values()].sort((a, b) => (a.brand || '').localeCompare(b.brand || '') || a.name.localeCompare(b.name));
  const payload = {
    source: `${ORIGIN} (factual specs/price data)`,
    generatedAt: new Date().toISOString(),
    count: phones.length,
    brands: [...new Set(phones.map((p) => p.brand).filter(Boolean))].sort(),
    phones,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(`\n${ok} new, ${skipped} cached, ${failed} failed → ${path.relative(ROOT, OUT)} (${phones.length} total)`);
}

main().catch((error) => { console.error(error); process.exit(1); });
