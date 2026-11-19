import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');
const PRODUCTS_IMG_DIR = path.join(ROOT, 'src/assets/products');

const NEGATIVE_WORDS = [
  'tempered', 'glass', 'guard', 'protector', 'cover', 'case', 'strap',
  'skin', 'film', 'cable', 'pouch', 'sleeve', 'dock', 'stand', 'charger',
  'adapter', 'replacement', 'battery', 'silicone', 'tpu', 'armour', 'armor',
  'bumper', 'keyboard cover', 'screen-protector', 'decal', 'holder'
];

function extractBrandAndModel(p) {
  let name = p.name;
  // Clean specs in parentheses
  name = name.replace(/\([^)]*\)/g, ' ').replace(/"/g, ' ').replace(/\s+/g, ' ').trim();

  // Known brand detection
  const brands = [
    'Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Redmi', 'Realme', 'realme', 'boAt', 'Boat',
    'Noise', 'Amazfit', 'ASUS', 'Asus', 'Lenovo', 'HP', 'Acer', 'Dell', 'Sony', 'LG',
    'Haier', 'Whirlpool', 'Godrej', 'Panasonic', 'Bosch', 'Voltas', 'Hisense', 'TCL',
    'Vu', 'Toshiba', 'Motorola', 'Sansui', 'Blaupunkt', 'Thomson', 'Kodak', 'Bose',
    'Sennheiser', 'Marshall', 'JBL', 'Fastrack', 'Titan', 'Garmin', 'Boult', 'Nothing',
    'CMF', 'Infinix', 'iQOO', 'Oppo', 'Nokia', 'Vivo', 'Ambrane', 'Kelvinator', 'MarQ', 'Croma'
  ];

  let brand = '';
  for (const b of brands) {
    const rx = new RegExp(`^${b}\\b`, 'i');
    if (rx.test(name)) {
      brand = b;
      break;
    }
  }

  if (!brand) {
    brand = name.split(' ')[0];
  }

  // Model is rest of string without category filler
  let model = name.replace(new RegExp(`^${brand}\\s*`, 'i'), '').trim();
  model = model.replace(/\b(laptop|tablet|smartwatch|refrigerator|fridge|tv|television|earbuds|tws|split ac)\b/gi, '').trim();

  return { brand, model, query: `${brand} ${model}`.trim() };
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

async function searchAmazonDeviceImage(brand, model, category) {
  const query = `${brand} ${model}`;
  const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;

  try {
    const res = await fetchWithTimeout(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-IN,en;q=0.9'
      }
    }, 7000);

    if (!res.ok) return null;
    const html = await res.text();
    const cards = html.split(/data-component-type="s-search-result"/);

    for (let i = 1; i < cards.length; i++) {
      const card = cards[i];
      const titleMatch = card.match(/<h2[\s\S]*?<span[^>]*>(.*?)<\/span>/);
      if (!titleMatch) continue;
      const title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      const lower = title.toLowerCase();

      // Check negative accessory words
      if (NEGATIVE_WORDS.some(w => lower.includes(w))) continue;

      // Brand must match
      if (!lower.includes(brand.toLowerCase())) continue;

      // Check image
      const imgMatch = card.match(/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+_-]+)\._AC_[^"]+\.jpg/);
      if (imgMatch) {
        const id = imgMatch[1];
        if (id.length >= 7 && !id.startsWith('11') && !id.startsWith('21')) {
          const testUrl = `https://m.media-amazon.com/images/I/${id}.jpg`;
          const testRes = await fetchWithTimeout(testUrl, { method: 'HEAD' }, 3500);
          if (testRes.ok && Number(testRes.headers.get('content-length') || 0) > 4000) {
            return { url: testUrl, title };
          }
        }
      }
    }
  } catch (e) {
    // Amazon timeout or block
  }
  return null;
}

async function searchDuckDuckGoDeviceImage(brand, model) {
  const cleanQuery = `"${brand}" "${model}" official product -case -cover -guard -protector -film -tempered -strap -skin -cable`;
  try {
    const tokenUrl = `https://duckduckgo.com/?q=${encodeURIComponent(cleanQuery)}`;
    const r1 = await fetchWithTimeout(tokenUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, 5000);
    if (!r1.ok) return null;
    const text = await r1.text();
    const vqdMatch = text.match(/vqd=([^&"\x27]+)/) || text.match(/vqd=([\d-]+)/);
    if (!vqdMatch) return null;
    const vqd = vqdMatch[1];

    const imgApi = `https://duckduckgo.com/i.js?l=in-en&o=json&q=${encodeURIComponent(cleanQuery)}&vqd=${vqd}&f=,,,`;
    const r2 = await fetchWithTimeout(imgApi, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, 5000);
    if (!r2.ok) return null;
    const json = await r2.json();

    if (json.results && json.results.length > 0) {
      for (const item of json.results) {
        const itemUrl = (item.image || '').toLowerCase();
        const itemTitle = (item.title || '').toLowerCase();
        if (NEGATIVE_WORDS.some(w => itemUrl.includes(w) || itemTitle.includes(w))) continue;
        if (!itemTitle.includes(brand.toLowerCase()) && !itemUrl.includes(brand.toLowerCase())) continue;

        const testRes = await fetchWithTimeout(item.image, { method: 'HEAD' }, 4000);
        if (testRes.ok && Number(testRes.headers.get('content-length') || 0) > 4000) {
          return { url: item.image, title: item.title };
        }
      }
    }
  } catch (e) {
    // DDG failed
  }
  return null;
}

async function downloadToFile(url, destPath) {
  try {
    const res = await fetchWithTimeout(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, 8000);
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 3500) return false;
    fs.writeFileSync(destPath, buf);
    return true;
  } catch (err) {
    return false;
  }
}

async function run() {
  const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  console.log(`Auditing and replacing images for ${catalog.products.length} products...\n`);

  // Compute existing MD5 hashes to detect duplicate/shared images
  const hashes = {};
  for (const p of catalog.products) {
    const fp = path.join(PRODUCTS_IMG_DIR, `${p.slug}.jpg`);
    if (fs.existsSync(fp)) {
      const h = crypto.createHash('md5').update(fs.readFileSync(fp)).digest('hex');
      if (!hashes[h]) hashes[h] = [];
      hashes[h].push(p.slug);
    }
  }

  let replacedCount = 0;
  let skippedCount = 0;
  const failed = [];

  for (let i = 0; i < catalog.products.length; i++) {
    const p = catalog.products[i];
    const destPath = path.join(PRODUCTS_IMG_DIR, `${p.slug}.jpg`);
    p.image = `assets/products/${p.slug}.jpg`;

    let currentHash = null;
    if (fs.existsSync(destPath)) {
      currentHash = crypto.createHash('md5').update(fs.readFileSync(destPath)).digest('hex');
    }

    const isDuplicate = currentHash && hashes[currentHash] && hashes[currentHash].length > 1;
    const isSmall = !fs.existsSync(destPath) || fs.statSync(destPath).size < 3500;

    // Target duplicate images or missing/corrupt ones
    if (!isDuplicate && !isSmall) {
      skippedCount++;
      continue;
    }

    const { brand, model, query } = extractBrandAndModel(p);
    process.stdout.write(`[${i + 1}/${catalog.products.length}] ${p.slug} (${brand} - ${model})... `);

    let match = await searchAmazonDeviceImage(brand, model, p.category);
    let source = 'Amazon';

    if (!match) {
      match = await searchDuckDuckGoDeviceImage(brand, model);
      source = 'DDG';
    }

    if (match) {
      const tempPath = `${destPath}.tmp`;
      const ok = await downloadToFile(match.url, tempPath);
      if (ok) {
        fs.renameSync(tempPath, destPath);
        const sizeKb = (fs.statSync(destPath).size / 1024).toFixed(1);
        console.log(`✓ ${source} (${sizeKb} KB) -> ${match.title.substring(0, 40)}...`);
        replacedCount++;
      } else {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        console.log(`✗ Download failed`);
        failed.push(p.slug);
      }
    } else {
      console.log(`⚠ No clean match found`);
      failed.push(p.slug);
    }

    // Small courteous pause
    await new Promise(r => setTimeout(r, 250));
  }

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n========================================`);
  console.log(`Replacement Pass Complete:`);
  console.log(`- Total Catalog Products: ${catalog.products.length}`);
  console.log(`- Authentic Images Retained: ${skippedCount}`);
  console.log(`- Replaced with Genuine Photos: ${replacedCount}`);
  console.log(`- Remaining Unmatched: ${failed.length}`);
  if (failed.length > 0) {
    console.log(`Unmatched slugs:`, failed);
  }
  console.log(`========================================\n`);
}

run().catch(console.error);
