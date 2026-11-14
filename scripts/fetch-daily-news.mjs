#!/usr/bin/env node
/**
 * Daily Top 5 Trending Electronic Gadgets & Tech News Fetcher
 *
 * Fetches live RSS/Atom feeds across smartphones, laptops, wearables, audio,
 * and consumer electronics, selects the top 5 freshest stories, downloads
 * each article's relevant visual image locally into src/assets/news/, and
 * writes data/daily-news.json for scripts/build.mjs.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_JSON = path.join(ROOT, 'data/daily-news.json');
const NEWS_IMG_DIR = path.join(ROOT, 'src/assets/news');
const UA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Mobile Safari/537.36';

const FEEDS = [
  { name: 'GSMArena', url: 'https://www.gsmarena.com/rss-news-reviews.php3', weight: 10 },
  { name: 'Beebom', url: 'https://beebom.com/feed/', weight: 9 },
  { name: '91mobiles', url: 'https://www.91mobiles.com/hub/feed/', weight: 9 },
  { name: 'The Verge Tech', url: 'https://www.theverge.com/rss/tech/index.xml', weight: 8 },
  { name: 'TechRadar', url: 'https://www.techradar.com/rss', weight: 7 },
  { name: 'Android Authority', url: 'https://www.androidauthority.com/feed/', weight: 8 },
];

const GADGET_KEYWORDS = /\b(phone|smartphone|iphone|samsung|galaxy|pixel|oneplus|xiaomi|redmi|poco|vivo|oppo|realme|nothing|motorola|laptop|macbook|ipad|tablet|earbuds|headphone|smartwatch|watch|chip|snapdragon|dimensity|exynos|amoled|oled|camera|5g|battery|charger|gadget|android|ios|ai|gpu|nvidia|amd|intel|sony|lg)\b/i;

function decodeXml(str) {
  return String(str || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || 'tech-news';
}

function extractTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? decodeXml(m[1]) : '';
}

function extractImageFromBlock(block) {
  const media = block.match(/<(?:media:content|media:thumbnail|enclosure)\b[^>]*\burl=["']([^"']+)["']/i);
  if (media) return media[1];
  const img = block.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  if (img) return img[1];
  return '';
}

function parseFeed(xml, sourceName, weight) {
  const items = [];
  const isAtom = /<feed\b/i.test(xml) && /<entry\b/i.test(xml);
  const chunks = xml.split(isAtom ? /<entry\b[^>]*>/i : /<item\b[^>]*>/i).slice(1);
  for (const raw of chunks) {
    const block = raw.split(isAtom ? /<\/entry>/i : /<\/item>/i)[0] || raw;
    const title = extractTag(block, 'title');
    let link = extractTag(block, 'link');
    if (!link) {
      const hrefMatch = block.match(/<link\b[^>]*\bhref=["']([^"']+)["']/i);
      if (hrefMatch) link = hrefMatch[1];
    }
    const rawDesc = (block.match(/<(?:description|summary|content:encoded|content)[^>]*>([\s\S]*?)<\/(?:description|summary|content:encoded|content)>/i) || [])[1] || '';
    const desc = decodeXml(rawDesc).slice(0, 260);
    const pubStr = extractTag(block, 'pubDate') || extractTag(block, 'published') || extractTag(block, 'updated');
    const ts = pubStr ? Date.parse(pubStr) : Date.now();
    const imageUrl = extractImageFromBlock(block) || extractImageFromBlock(rawDesc);
    if (!title || !link || !/^https?:\/\//i.test(link)) continue;
    const text = `${title} ${desc}`;
    if (!GADGET_KEYWORDS.test(text)) continue;
    const ageHours = Math.max(0, (Date.now() - (Number.isFinite(ts) ? ts : Date.now())) / 36e5);
    const relevance = (title.match(new RegExp(GADGET_KEYWORDS.source, 'gi')) || []).length * 2;
    const score = weight + relevance - Math.min(ageHours / 12, 12);
    items.push({
      title,
      link,
      desc: desc || `${title} — latest update from ${sourceName}.`,
      source: sourceName,
      dateIso: Number.isFinite(ts) ? new Date(ts).toISOString() : new Date().toISOString(),
      imageUrl: imageUrl.replace(/&amp;/g, '&'),
      score,
    });
  }
  return items;
}

async function fetchOgImage(articleUrl) {
  try {
    const res = await fetch(articleUrl, {
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return '';
    const html = await res.text();
    const og = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image|og:image:secure_url)["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/i);
    return og ? og[1].replace(/&amp;/g, '&') : '';
  } catch {
    return '';
  }
}

function extFromBufferOrType(buf, contentType = '') {
  if (buf[0] === 0x89 && buf[1] === 0x50) return '.png';
  if (buf[0] === 0xff && buf[1] === 0xd8) return '.jpg';
  if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') return '.webp';
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg';
  return '';
}

async function downloadImage(url, slug) {
  if (!url || !/^https?:\/\//i.test(url)) return '';
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'image/*,*/*' },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return '';
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 4096) return '';
    const ext = extFromBufferOrType(buf, ct);
    if (!ext) return '';
    const filename = `${slug}${ext}`;
    fs.writeFileSync(path.join(NEWS_IMG_DIR, filename), buf);
    return `assets/news/${filename}`;
  } catch {
    return '';
  }
}

function writeSvgFallback(slug, title, source) {
  const safeTitle = String(title).replace(/&/g, '&amp;').replace(/</g, '&lt;').slice(0, 72);
  const safeSource = String(source).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="640" height="400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f2b6b"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
  </defs>
  <rect width="640" height="400" fill="url(#g)" rx="20"/>
  <circle cx="560" cy="70" r="110" fill="#3b82f6" opacity="0.22"/>
  <circle cx="90" cy="340" r="90" fill="#38bdf8" opacity="0.16"/>
  <rect x="44" y="44" width="140" height="32" rx="16" fill="#ffffff" opacity="0.16"/>
  <text x="114" y="65" text-anchor="middle" fill="#e0f2fe" font-family="system-ui,sans-serif" font-size="14" font-weight="700">${safeSource.toUpperCase()}</text>
  <foreignObject x="44" y="110" width="552" height="220">
    <div xmlns="http://www.w3.org/1999/xhtml" style="color:#ffffff;font-family:system-ui,sans-serif;font-size:28px;font-weight:800;line-height:1.28;">${safeTitle}</div>
  </foreignObject>
</svg>`;
  const filename = `${slug}.svg`;
  fs.writeFileSync(path.join(NEWS_IMG_DIR, filename), svg);
  return `assets/news/${filename}`;
}

async function main() {
  fs.mkdirSync(NEWS_IMG_DIR, { recursive: true });
  const all = [];
  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': UA, Accept: 'application/rss+xml, application/xml, text/xml, */*' },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) {
        console.warn(`Feed ${feed.name}: HTTP ${res.status}`);
        continue;
      }
      const xml = await res.text();
      const parsed = parseFeed(xml, feed.name, feed.weight);
      all.push(...parsed);
      console.log(`Fetched ${parsed.length} gadget stories from ${feed.name}`);
    } catch (err) {
      console.warn(`Feed ${feed.name} failed:`, err.message);
    }
  }

  // Deduplicate by normalized title and pick top 5
  const seen = new Set();
  const top = [];
  for (const item of all.sort((a, b) => b.score - a.score)) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 42);
    if (seen.has(key)) continue;
    seen.add(key);
    top.push(item);
    if (top.length >= 5) break;
  }

  if (!top.length) {
    console.warn('No live news items fetched; keeping existing data/daily-news.json if present.');
    return;
  }

  const now = new Date();
  const dateText = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const finalItems = [];

  for (let i = 0; i < top.length; i++) {
    const item = top[i];
    const slug = `${slugify(item.title)}-${i + 1}`;
    let imgUrl = item.imageUrl;
    if (!imgUrl) imgUrl = await fetchOgImage(item.link);
    let localImage = await downloadImage(imgUrl, slug);
    if (!localImage && imgUrl !== item.imageUrl) {
      const og = await fetchOgImage(item.link);
      localImage = await downloadImage(og, slug);
    }
    if (!localImage) localImage = writeSvgFallback(slug, item.title, item.source);

    finalItems.push({
      slug,
      kind: 'news',
      title: item.title,
      excerpt: item.desc,
      author: `${item.source} · Trending`,
      dateText,
      dateIso: item.dateIso,
      image: localImage,
      sourceUrl: item.link,
      body: `<p>${item.desc}</p><p>Read the full coverage on <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.source}</a>.</p>`,
    });
    console.log(`✓ [${i + 1}/5] ${item.title} → ${localImage}`);
  }

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify({
    updatedAt: now.toISOString(),
    dateText,
    count: finalItems.length,
    items: finalItems,
  }, null, 2));
  console.log(`Saved ${finalItems.length} daily trending gadget news items to data/daily-news.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
