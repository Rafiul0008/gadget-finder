import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'data/products.json');
const CONFIG_PATH = path.join(ROOT, 'config/site.config.json');

const DRY_RUN = process.env.DRY_RUN === '1';
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const CUELINKS_KEY = process.env.CUELINKS_API_KEY || '';

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
}

function decodeXml(str) {
  return String(str || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseRssItems(xmlText) {
  const items = [];
  const chunks = xmlText.split(/<item\b[^>]*>/i).slice(1);
  for (const raw of chunks) {
    const endIdx = raw.search(/<\/item>/i);
    const block = endIdx >= 0 ? raw.slice(0, endIdx) : raw;
    const title = decodeXml((block.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]);
    const link = decodeXml((block.match(/<link[^>]*>([\s\S]*?)<\/link>/i) || [])[1]);
    const desc = decodeXml((block.match(/<description[^>]*>([\s\S]*?)<\/description>/i) || [])[1]);
    if (title && link) items.push({ title, link, desc: desc.slice(0, 500) });
  }
  return items;
}

function detectStore(textOrUrl) {
  const s = (textOrUrl || '').toLowerCase();
  if (s.includes('flipkart')) return 'Flipkart';
  if (s.includes('croma')) return 'Croma';
  if (s.includes('jiomart')) return 'JioMart';
  if (s.includes('amazon')) return 'Amazon';
  return null;
}

function extractPriceINR(text) {
  const m = String(text || '').match(/(?:₹|Rs\.?\s*)([\d,]{3,7})/i);
  if (!m) return 0;
  return Number(m[1].replace(/,/g, '')) || 0;
}

async function fetchCuelinksDeals() {
  if (!CUELINKS_KEY) return [];
  try {
    const res = await fetch('https://www.cuelinks.com/api/v2/offers.json?per_page=30', {
      headers: { Authorization: `Token token=${CUELINKS_KEY}`, 'User-Agent': 'TechPickAutoUpdater/1.0' }
    });
    if (!res.ok) {
      console.warn(`Cuelinks API returned HTTP ${res.status}`);
      return [];
    }
    const json = await res.json();
    const offers = json.offers || [];
    return offers
      .map((o) => ({
        title: o.title || '',
        desc: o.description || '',
        link: o.affiliate_url || o.url || '',
        store: detectStore(o.campaign || o.merchant || o.url) || 'Amazon',
        price: extractPriceINR(`${o.title} ${o.description}`),
        offer: o.coupon_code ? `Coupon: ${o.coupon_code}` : (o.title || '').slice(0, 90)
      }))
      .filter((x) => x.title && x.link);
  } catch (err) {
    console.warn('Cuelinks fetch failed:', err.message);
    return [];
  }
}

async function fetchRssDeals() {
  const feeds = config.automation?.rssFeeds || [];
  const collected = [];
  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        console.warn(`RSS feed "${feed.name}" HTTP ${res.status}`);
        continue;
      }
      const xml = await res.text();
      const parsed = parseRssItems(xml).slice(0, 30);
      for (const item of parsed) {
        const store = detectStore(`${item.title} ${item.link} ${item.desc}`) || 'Amazon';
        const price = extractPriceINR(`${item.title} ${item.desc}`);
        if (price < 150) continue;
        collected.push({
          title: item.title,
          desc: item.desc,
          link: item.link,
          store,
          price,
          offer: item.desc.slice(0, 100),
          fromNewsFeed: true
        });
      }
    } catch (err) {
      console.warn(`RSS fetch failed (${feed.name}):`, err.message);
    }
  }
  return collected;
}

async function structureWithGemini(rawDeal) {
  if (!GEMINI_KEY) return null;
  const models = config.automation?.geminiModels || ['gemini-2.5-flash', 'gemini-2.0-flash'];
  const prompt = [
    'Convert this Indian electronics deal into clean structured product JSON.',
    `Title: ${rawDeal.title}`,
    `Store: ${rawDeal.store}`,
    `Price INR: ${rawDeal.price}`,
    `Details: ${rawDeal.desc}`,
    'Only return electronics & appliances (smartphones, laptops, tablets, smart-tv, refrigerators, air-conditioners, audio, smartwatches, accessories). If NOT in these categories, return {"skip": true}.',
    'Otherwise return JSON strictly matching:',
    '{"skip":false,"name":"Clean product name","brand":"Brand","category":"smartphones|laptops|tablets|smart-tv|refrigerators|air-conditioners|audio|smartwatches|accessories","mrp":number,"score":65-92,"specs":{"processor":"...","display":"...","camera":"...","battery":"...","memory":"..."},"pros":["...","..."],"cons":["...","..."],"expertVerdict":"1 sentence honest summary","offer":"Short bank/discount summary"}'
  ].join('\n');

  for (const model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_KEY },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
        })
      });
      if (!res.ok) continue;
      const body = await res.json();
      const text = body?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return JSON.parse(text);
    } catch {
      // Try next fallback model
    }
  }
  return null;
}

async function main() {
  console.log(`Starting automated update (dryRun=${DRY_RUN}, gemini=${Boolean(GEMINI_KEY)}, cuelinks=${Boolean(CUELINKS_KEY)})`);
  const candidates = [
    ...(await fetchCuelinksDeals()),
    ...(await fetchRssDeals())
  ];

  console.log(`Fetched ${candidates.length} candidate electronics deals.`);
  const existingBySlug = new Map((catalog.products || []).map((p) => [p.slug, p]));
  let added = 0;
  let updated = 0;
  const maxPerRun = config.automation?.maxProductsPerRun || 10;

  for (const deal of candidates) {
    if (added + updated >= maxPerRun) break;
    const baseSlug = slugify(deal.title.replace(/₹.*$/, ''));
    if (!baseSlug) continue;

    if (existingBySlug.has(baseSlug)) {
      const p = existingBySlug.get(baseSlug);
      const storeEntry = (p.stores || []).find((s) => s.store === deal.store);
      if (storeEntry && deal.price > 0 && storeEntry.price !== deal.price) {
        storeEntry.price = deal.price;
        storeEntry.offer = deal.offer || storeEntry.offer;
        p.updatedAt = new Date().toISOString();
        updated++;
      }
      continue;
    }

    if (!GEMINI_KEY) continue; // Without Gemini, preserve clean seed catalog rather than adding noisy RSS titles
    const ai = await structureWithGemini(deal);
    if (!ai || ai.skip || !ai.name) continue;
    const slug = slugify(ai.name);
    if (!slug || existingBySlug.has(slug)) continue;

    const q = encodeURIComponent(ai.name);
    const tagParam = config.affiliates?.amazonTag ? `&tag=${encodeURIComponent(config.affiliates.amazonTag)}` : '';
    const defaultStores = [
      { store: 'Amazon', price: deal.price, offer: ai.offer || 'Check Amazon bank offers', inStock: true, url: `https://www.amazon.in/s?k=${q}${tagParam}` },
      { store: 'Flipkart', price: deal.price, offer: 'Check Flipkart Axis/UPI offers', inStock: true, url: `https://www.flipkart.com/search?q=${q}` },
      { store: 'Croma', price: deal.price, offer: 'Check Croma store deals', inStock: true, url: `https://www.croma.com/searchB?q=${q}%3Arelevance` },
      { store: 'JioMart', price: deal.price, offer: 'Check JioMart wallet cashback', inStock: true, url: `https://www.jiomart.com/search/${q}` }
    ];
    const stores = deal.fromNewsFeed
      ? defaultStores
      : [{ store: deal.store, price: deal.price, offer: ai.offer || deal.offer, inStock: true, url: deal.link }];

    const validCategories = ['smartphones', 'laptops', 'tablets', 'smart-tv', 'refrigerators', 'air-conditioners', 'audio', 'smartwatches', 'accessories'];
    const category = validCategories.includes(ai.category) ? ai.category : 'accessories';

    const product = {
      id: slug,
      slug,
      name: ai.name,
      brand: ai.brand || ai.name.split(' ')[0],
      category,
      tags: ['deal', deal.price <= 1000 ? 'under-1000' : deal.price <= 10000 ? 'under-10000' : 'featured'],
      status: 'In Stock',
      score: Math.min(95, Math.max(60, Number(ai.score) || 78)),
      launchedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      updatedAt: new Date().toISOString(),
      mrp: Math.max(deal.price, Number(ai.mrp) || Math.round(deal.price * 1.15)),
      specs: ai.specs || {},
      pros: Array.isArray(ai.pros) ? ai.pros.slice(0, 3) : [],
      cons: Array.isArray(ai.cons) ? ai.cons.slice(0, 2) : [],
      expertVerdict: ai.expertVerdict || '',
      stores
    };
    catalog.products.unshift(product);
    existingBySlug.set(slug, product);
    added++;
  }

  catalog.lastUpdated = new Date().toISOString();
  if (!DRY_RUN) {
    fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2) + '\n');
  }
  console.log(`Update complete: +${added} new products, ${updated} price updates.`);
}

main();
