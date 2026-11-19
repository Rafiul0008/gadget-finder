import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');
const PRODUCTS_IMG_DIR = path.join(ROOT, 'src/assets/products');

if (!fs.existsSync(PRODUCTS_IMG_DIR)) {
  fs.mkdirSync(PRODUCTS_IMG_DIR, { recursive: true });
}

function getCleanSearchQuery(p) {
  let name = p.name;
  name = name.replace(/\([^)]*\)/g, ' ').replace(/"/g, ' inch ').replace(/\s+/g, ' ').trim();
  if (p.category === 'laptops' && !/laptop/i.test(name)) name += ' laptop';
  if (p.category === 'smart-tv' && !/tv/i.test(name)) name += ' TV';
  if (p.category === 'refrigerators' && !/refrigerator|fridge/i.test(name)) name += ' refrigerator';
  if (p.category === 'air-conditioners' && !/ac|air conditioner/i.test(name)) name += ' split ac';
  if (p.category === 'tablets' && !/tablet|pad/i.test(name)) name += ' tablet';
  if (p.category === 'audio' && !/earbuds|tws|earphones|headphone/i.test(name)) name += ' TWS earbuds';
  if (p.category === 'smartwatches' && !/smartwatch|watch/i.test(name)) name += ' smartwatch';
  return name;
}

async function fetchWithTimeout(url, opts = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function searchAmazonImage(query) {
  try {
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    const res = await fetchWithTimeout(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-IN,en;q=0.9'
      }
    }, 6000);
    if (!res.ok) return null;
    const html = await res.text();
    const rawMatches = [...html.matchAll(/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+_-]+)\._AC_[^"]+\.jpg/g)].map(m => m[1]);
    const uniqueIds = [...new Set(rawMatches)].filter(id => id.length >= 7 && !id.startsWith('11') && !id.startsWith('21'));

    for (const id of uniqueIds.slice(0, 5)) {
      const testUrls = [
        `https://m.media-amazon.com/images/I/${id}.jpg`,
        `https://m.media-amazon.com/images/I/${id}._AC_SL800_.jpg`
      ];
      for (const tUrl of testUrls) {
        try {
          const testRes = await fetchWithTimeout(tUrl, { method: 'HEAD' }, 3500);
          if (testRes.ok && Number(testRes.headers.get('content-length') || 0) > 4000) {
            return tUrl;
          }
        } catch {}
      }
    }
  } catch (err) {
    // Amazon search failed or timed out
  }
  return null;
}

async function searchDuckDuckGoImage(query) {
  try {
    const tokenUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query + ' product')}`;
    const r1 = await fetchWithTimeout(tokenUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, 5000);
    if (!r1.ok) return null;
    const text = await r1.text();
    const vqdMatch = text.match(/vqd=([^&"\x27]+)/) || text.match(/vqd=([\d-]+)/);
    if (!vqdMatch) return null;
    const vqd = vqdMatch[1];

    const imgApi = `https://duckduckgo.com/i.js?l=in-en&o=json&q=${encodeURIComponent(query + ' product')}&vqd=${vqd}&f=,,,`;
    const r2 = await fetchWithTimeout(imgApi, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, 5000);
    if (!r2.ok) return null;
    const json = await r2.json();
    if (json.results && json.results.length > 0) {
      for (const item of json.results.slice(0, 3)) {
        if (item.image && (item.image.endsWith('.jpg') || item.image.endsWith('.png') || item.image.endsWith('.webp') || item.image.includes('images'))) {
          return item.image;
        }
      }
    }
  } catch (err) {
    // DDG failed
  }
  return null;
}

async function downloadToFile(url, destPath) {
  try {
    const res = await fetchWithTimeout(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, 7000);
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2500) return false;
    fs.writeFileSync(destPath, buf);
    return true;
  } catch (err) {
    return false;
  }
}

async function main() {
  const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  console.log(`Checking images for all ${catalog.products.length} products...`);

  // Find all category images already available as fallback bank
  const categorySamples = {};
  for (const p of catalog.products) {
    const pPath = path.join(ROOT, 'src', p.image || '');
    if (fs.existsSync(pPath) && fs.statSync(pPath).size > 3000) {
      if (!categorySamples[p.category]) categorySamples[p.category] = [];
      categorySamples[p.category].push(pPath);
    }
  }

  let downloaded = 0;
  let alreadyExist = 0;
  let fallbackCopied = 0;

  for (let i = 0; i < catalog.products.length; i++) {
    const p = catalog.products[i];
    const targetFile = path.join(PRODUCTS_IMG_DIR, `${p.slug}.jpg`);
    p.image = `assets/products/${p.slug}.jpg`;

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 2500) {
      alreadyExist++;
      continue;
    }

    const query = getCleanSearchQuery(p);
    process.stdout.write(`[${i + 1}/${catalog.products.length}] ${p.slug}... `);

    let success = false;

    // 1. Try Amazon search
    const amzUrl = await searchAmazonImage(query);
    if (amzUrl) {
      success = await downloadToFile(amzUrl, targetFile);
      if (success) {
        console.log(`✓ Amazon (${(fs.statSync(targetFile).size / 1024).toFixed(1)} KB)`);
        downloaded++;
      }
    }

    // 2. Try DuckDuckGo Image search if Amazon failed
    if (!success) {
      const ddgUrl = await searchDuckDuckGoImage(query);
      if (ddgUrl) {
        success = await downloadToFile(ddgUrl, targetFile);
        if (success) {
          console.log(`✓ DDG (${(fs.statSync(targetFile).size / 1024).toFixed(1)} KB)`);
          downloaded++;
        }
      }
    }

    // 3. Fallback to similar category product image
    if (!success) {
      const bank = categorySamples[p.category] || [];
      if (bank.length > 0) {
        const sampleSource = bank[i % bank.length];
        fs.copyFileSync(sampleSource, targetFile);
        console.log(`✓ Category Sample (${(fs.statSync(targetFile).size / 1024).toFixed(1)} KB)`);
        fallbackCopied++;
      } else {
        console.log(`✗ No image found`);
      }
    }

    // Small delay between network queries
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n========================================`);
  console.log(`Image Download Summary:`);
  console.log(`- Total products: ${catalog.products.length}`);
  console.log(`- Already existing: ${alreadyExist}`);
  console.log(`- Downloaded fresh: ${downloaded}`);
  console.log(`- Category fallbacks: ${fallbackCopied}`);
  console.log(`========================================\n`);
}

main().catch(console.error);
