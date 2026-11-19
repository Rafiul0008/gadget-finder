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

const CATEGORY_RULES = {
  tablets: {
    negatives: ['tempered', 'glass', 'guard', 'protector', 'cover', 'case', 'sleeve', 'bag', 'pouch', 'pencil', 'stylus', 'cable', 'film', 'paper', 'decal', 'stand', 'holder', 'keyboard', 'screen-protector'],
    positives: ['ipad', 'tablet', 'tab', 'pad']
  },
  laptops: {
    negatives: ['mouse', 'backpack', 'bag', 'sleeve', 'skin', 'cover', 'case', 'stand', 'charger', 'adapter', 'cooler', 'table', 'pad', 'dock', 'cable', 'keyboard cover', 'ram', 'ssd'],
    positives: ['laptop', 'notebook', 'macbook', 'zenbook', 'thinkpad', 'ideapad', 'aspire', 'vivobook', 'victus', 'nitro', 'legion', 'rog', 'tuf', 'yoga', 'book']
  },
  'smart-tv': {
    negatives: ['remote', 'wall mount', 'bracket', 'stand', 'cable', 'stabilizer', 'cover', 'battery', 'mount'],
    positives: ['tv', 'television', 'bravia', 'qled', 'oled', 'uhd', 'led']
  },
  refrigerators: {
    negatives: ['stand', 'cover', 'mat', 'tray', 'cleaner', 'handle', 'magnet', 'stabilizer', 'trolley', 'drawer'],
    positives: ['refrigerator', 'fridge']
  },
  audio: {
    negatives: ['case cover', 'silicone case', 'protective case', 'cable', 'cleaner', 'ear tip', 'eartip', 'strap', 'charging case only', 'replacement'],
    positives: ['earbuds', 'tws', 'earphone', 'airpods', 'buds', 'headphones', 'headset', 'audio', 'wireless']
  },
  smartwatches: {
    negatives: ['strap for', 'band for', 'replacement strap', 'replacement band', 'bumper', 'tempered glass', 'screen protector', 'screen guard', 'dock charger', 'charging cable', 'silicone strap', 'metal strap', 'chain strap', 'watch strap', 'watch band'],
    positives: ['watch', 'smartwatch']
  },
  'air-conditioners': {
    negatives: ['remote', 'cover', 'stand', 'stabilizer', 'pipe', 'bracket', 'drain'],
    positives: ['ac', 'air conditioner', 'inverter split', 'split ac']
  },
  smartphones: {
    negatives: ['cover', 'case', 'glass', 'guard', 'protector', 'film', 'skin', 'charger', 'cable', 'pouch', 'holder'],
    positives: ['5g', 'smartphone', 'phone', 'mobile']
  },
  accessories: {
    negatives: [],
    positives: []
  }
};

function extractCleanQuery(p) {
  let name = p.name;
  name = name.replace(/\([^)]*\)/g, ' ').replace(/"/g, ' ').replace(/\s+/g, ' ').trim();
  const brands = [
    'Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Redmi', 'Realme', 'boAt',
    'Noise', 'Amazfit', 'ASUS', 'Lenovo', 'HP', 'Acer', 'Dell', 'Sony', 'LG',
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
  if (!brand) brand = name.split(' ')[0];

  let model = name.replace(new RegExp(`^${brand}\\s*`, 'i'), '').trim();
  model = model.replace(/\b(laptop|tablet|smartwatch|refrigerator|fridge|tv|television|earbuds|tws|split ac)\b/gi, '').trim();

  // Add category keyword if not present
  let query = `${brand} ${model}`.trim();
  if (p.category === 'laptops' && !/laptop|macbook/i.test(query)) query += ' laptop';
  if (p.category === 'tablets' && !/tablet|ipad|pad/i.test(query)) query += ' tablet';
  if (p.category === 'smart-tv' && !/tv/i.test(query)) query += ' TV';
  if (p.category === 'refrigerators' && !/refrigerator|fridge/i.test(query)) query += ' refrigerator';
  if (p.category === 'smartwatches' && !/watch/i.test(query)) query += ' smartwatch';
  if (p.category === 'audio' && !/earbuds|tws|headphones/i.test(query)) query += ' earbuds';

  return { brand, model, query };
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

async function searchAmazonDeviceImage(brand, query, category) {
  const rules = CATEGORY_RULES[category] || { negatives: [], positives: [] };
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
      // Combine all h2 text to capture brand and model
      const h2s = [...card.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
      const title = h2s.join(' ');
      const lower = title.toLowerCase();

      // Check negative words
      if (rules.negatives.some(w => lower.includes(w))) continue;

      // Brand must match (if brand provided)
      if (brand && !lower.includes(brand.toLowerCase())) continue;

      // Must match at least one positive category term if defined
      if (rules.positives.length > 0 && !rules.positives.some(w => lower.includes(w))) continue;

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

async function searchDuckDuckGoDeviceImage(brand, model, category) {
  const rules = CATEGORY_RULES[category] || { negatives: [], positives: [] };
  const cleanQ = `"${brand}" "${model}" official product -case -cover -guard -protector -film -tempered -strap -mouse -backpack -sleeve`;

  try {
    const tokenUrl = `https://duckduckgo.com/?q=${encodeURIComponent(cleanQ)}`;
    const r1 = await fetchWithTimeout(tokenUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, 5000);
    if (!r1.ok) return null;
    const text = await r1.text();
    const vqdMatch = text.match(/vqd=([^&"\x27]+)/) || text.match(/vqd=([\d-]+)/);
    if (!vqdMatch) return null;
    const vqd = vqdMatch[1];

    const imgApi = `https://duckduckgo.com/i.js?l=in-en&o=json&q=${encodeURIComponent(cleanQ)}&vqd=${vqd}&f=,,,`;
    const r2 = await fetchWithTimeout(imgApi, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, 5000);
    if (!r2.ok) return null;
    const json = await r2.json();

    if (json.results && json.results.length > 0) {
      for (const item of json.results) {
        const lower = (item.title + ' ' + item.image).toLowerCase();
        if (rules.negatives.some(w => lower.includes(w))) continue;
        if (brand && !lower.includes(brand.toLowerCase())) continue;

        try {
          const testRes = await fetchWithTimeout(item.image, { method: 'HEAD' }, 4000);
          if (testRes.ok && Number(testRes.headers.get('content-length') || 0) > 4000) {
            return { url: item.image, title: item.title };
          }
        } catch {}
      }
    }
  } catch (e) {
    // DDG failed
  }
  return null;
}

async function downloadImageToFile(url, destPath) {
  try {
    const res = await fetchWithTimeout(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, 8000);
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 4000) return false;
    fs.writeFileSync(destPath, buf);
    return true;
  } catch {
    return false;
  }
}

// Curated verified fallbacks for prominent flagship models if search engines fail
const KNOWN_AUTHENTIC = {
  'apple-ipad-air-13-m2': 'https://m.media-amazon.com/images/I/71b1G2BiwfL.jpg',
  'apple-ipad-pro-11-m4': 'https://m.media-amazon.com/images/I/71iqic7sLGL.jpg',
  'apple-macbook-air-m1': 'https://m.media-amazon.com/images/I/71jG+e7roXL.jpg',
  'hp-victus-gaming-laptop': 'https://m.media-amazon.com/images/I/61j-1aJgDDL.jpg',
  'hp-victus-15-intel-i5': 'https://m.media-amazon.com/images/I/61j-1aJgDDL.jpg',
  'samsung-galaxy-tab-s9-ultra': 'https://m.media-amazon.com/images/I/719Dv4Gy2kL.jpg',
  'redmi-pad-se': 'https://m.media-amazon.com/images/I/71t0olqGsFL.jpg',
  'samsung-galaxy-watch-6-classic': 'https://m.media-amazon.com/images/I/71162EQnpKL.jpg',
  'sony-bravia-65-x82l-4k': 'https://m.media-amazon.com/images/I/81I2HBFYwsL.jpg'
};

async function main() {
  const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  console.log(`Auditing and replacing images for ALL ${catalog.products.length} products (ZERO SKIPPING)...\n`);

  let replacedCount = 0;
  let fallbackCount = 0;
  const failed = [];

  for (let i = 0; i < catalog.products.length; i++) {
    const p = catalog.products[i];
    const destPath = path.join(PRODUCTS_IMG_DIR, `${p.slug}.jpg`);
    p.image = `assets/products/${p.slug}.jpg`;

    const { brand, model, query } = extractCleanQuery(p);
    process.stdout.write(`[${i + 1}/${catalog.products.length}] (${p.category}) ${p.slug}... `);

    // 1. Check known authentic direct image first
    if (KNOWN_AUTHENTIC[p.slug]) {
      const ok = await downloadImageToFile(KNOWN_AUTHENTIC[p.slug], destPath);
      if (ok) {
        console.log(`✓ Curated Flagship (${(fs.statSync(destPath).size / 1024).toFixed(1)} KB)`);
        replacedCount++;
        continue;
      }
    }

    // 2. Try Amazon card search with strict positive and negative rules
    let match = await searchAmazonDeviceImage(brand, query, p.category);
    let source = 'Amazon';

    // 3. Try DuckDuckGo if Amazon had no clean match
    if (!match) {
      match = await searchDuckDuckGoDeviceImage(brand, model, p.category);
      source = 'DDG';
    }

    if (match) {
      const tempPath = `${destPath}.tmp`;
      const ok = await downloadImageToFile(match.url, tempPath);
      if (ok) {
        fs.renameSync(tempPath, destPath);
        const sz = (fs.statSync(destPath).size / 1024).toFixed(1);
        console.log(`✓ ${source} (${sz} KB) -> ${match.title.substring(0, 45)}...`);
        replacedCount++;
      } else {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        console.log(`✗ Download failed`);
        failed.push(p.slug);
      }
    } else {
      // If still no clean match, check if existing image is already genuine or note for inspection
      console.log(`⚠ No clean match found`);
      failed.push(p.slug);
    }

    // Courteous pause
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n========================================`);
  console.log(`Definitive Image Retrieval Summary:`);
  console.log(`- Total Catalog Products: ${catalog.products.length}`);
  console.log(`- Successfully Replaced: ${replacedCount}`);
  console.log(`- Failed/Unmatched: ${failed.length}`);
  if (failed.length > 0) {
    console.log(`Unmatched slugs:`, failed);
  }
  console.log(`========================================\n`);
}

main().catch(console.error);
