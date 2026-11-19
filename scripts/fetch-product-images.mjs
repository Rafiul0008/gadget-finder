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

// Clean queries that target the specific device accurately on Amazon
function getSearchQuery(p) {
  let name = p.name;
  // Remove specs in parentheses e.g. (16GB/512GB SSD)
  name = name.replace(/\([^)]*\)/g, ' ').replace(/"/g, ' inch ').replace(/\s+/g, ' ').trim();
  if (p.category === 'laptops' && !/laptop/i.test(name)) name += ' laptop';
  if (p.category === 'smart-tv' && !/tv/i.test(name)) name += ' TV';
  if (p.category === 'refrigerators' && !/refrigerator|fridge/i.test(name)) name += ' refrigerator';
  if (p.category === 'air-conditioners' && !/ac|air conditioner/i.test(name)) name += ' split ac';
  if (p.category === 'tablets' && !/tablet|pad/i.test(name)) name += ' tablet';
  return name;
}

async function searchAmazonImage(searchQuery) {
  try {
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-IN,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Match Amazon media IDs
    const matches = [...html.matchAll(/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+_-]+)\._AC_[^"]+\.jpg/g)].map(m => m[1]);
    for (const id of matches) {
      if (id.length < 5) continue;
      const testUrl = `https://m.media-amazon.com/images/I/${id}._SL800_.jpg`;
      const testRes = await fetch(testUrl, { method: 'HEAD' });
      if (testRes.ok && Number(testRes.headers.get('content-length') || 0) > 3000) {
        return testUrl;
      }
    }
  } catch (err) {
    console.warn(`[Search Error] ${searchQuery}:`, err.message);
  }
  return null;
}

async function downloadImage(url, destPath) {
  try {
    const r = await fetch(url);
    if (!r.ok) return false;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 2000) return false;
    fs.writeFileSync(destPath, buf);
    return true;
  } catch (err) {
    return false;
  }
}

async function run() {
  const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  console.log(`Starting smart image retrieval for ${catalog.products.length} products...\n`);

  let successCount = 0;
  let alreadyHad = 0;
  let failed = [];

  for (let i = 0; i < catalog.products.length; i++) {
    const p = catalog.products[i];
    const destPath = path.join(PRODUCTS_IMG_DIR, `${p.slug}.jpg`);

    // Check if an image already exists and is non-empty
    const existingExt = ['jpg', 'png', 'webp'].find(ext => {
      const fp = path.join(PRODUCTS_IMG_DIR, `${p.slug}.${ext}`);
      return fs.existsSync(fp) && fs.statSync(fp).size > 2000;
    });

    if (existingExt) {
      p.image = `assets/products/${p.slug}.${existingExt}`;
      alreadyHad++;
      continue;
    }

    const query = getSearchQuery(p);
    process.stdout.write(`[${i + 1}/${catalog.products.length}] Fetching image for ${p.slug} (${query})... `);

    const imgUrl = await searchAmazonImage(query);
    if (imgUrl) {
      const ok = await downloadImage(imgUrl, destPath);
      if (ok) {
        p.image = `assets/products/${p.slug}.jpg`;
        successCount++;
        const sizeKb = (fs.statSync(destPath).size / 1024).toFixed(1);
        console.log(`✓ (${sizeKb} KB)`);
      } else {
        console.log(`✗ Download failed`);
        failed.push({ slug: p.slug, query });
      }
    } else {
      console.log(`⚠ No Amazon match`);
      failed.push({ slug: p.slug, query });
    }

    // Small delay to be polite
    await new Promise(r => setTimeout(r, 400));
  }

  // Enforce Amazon affiliate tag on all stores
  for (const p of catalog.products) {
    if (Array.isArray(p.stores)) {
      for (const st of p.stores) {
        if (/amazon\./i.test(st.store) || /amazon\./i.test(st.url)) {
          if (!st.url.includes('tag=teachunder-21')) {
            st.url = st.url.replace(/([?&])tag=[^&]+/i, '$1tag=teachunder-21');
            if (!st.url.includes('tag=')) {
              st.url += (st.url.includes('?') ? '&' : '?') + 'tag=teachunder-21';
            }
          }
        }
      }
    }
  }

  catalog.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n========================================`);
  console.log(`Finished Image Retrieval:`);
  console.log(`- Total products: ${catalog.products.length}`);
  console.log(`- Already present: ${alreadyHad}`);
  console.log(`- Successfully fetched: ${successCount}`);
  console.log(`- Products with images: ${catalog.products.filter(p => !!p.image).length}/${catalog.products.length}`);
  if (failed.length > 0) {
    console.log(`- Failed count: ${failed.length}`);
    console.log(failed);
  }
  console.log(`========================================\n`);
}

run().catch(console.error);
