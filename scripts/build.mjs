import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/site.config.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/products.json'), 'utf8'));

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function formatINR(num) {
  return '₹' + Number(num || 0).toLocaleString('en-IN');
}

function wrapAffiliateUrl(rawUrl, storeName) {
  try {
    const u = new URL(rawUrl);
    const store = (storeName || '').toLowerCase();
    const { amazonTag, cuelinksPublisherId, utmSource } = config.affiliates || {};
    if (store === 'amazon' && amazonTag && !u.searchParams.has('tag')) {
      u.searchParams.set('tag', amazonTag);
    }
    if (utmSource && !u.searchParams.has('utm_source')) {
      u.searchParams.set('utm_source', utmSource);
    }
    const finalUrl = u.toString();
    if (cuelinksPublisherId && store !== 'amazon') {
      return `https://linksredirect.com/?pub_id=${encodeURIComponent(cuelinksPublisherId)}&url=${encodeURIComponent(finalUrl)}`;
    }
    return finalUrl;
  } catch {
    return rawUrl || '#';
  }
}

function enrichProduct(p) {
  const stores = (p.stores || [])
    .filter((s) => s && s.price > 0)
    .map((s) => ({ ...s, url: wrapAffiliateUrl(s.url, s.store) }))
    .sort((a, b) => a.price - b.price);
  const best = stores[0] || { store: 'Amazon', price: p.mrp || 0, offer: '', url: '#' };
  const mrp = p.mrp && p.mrp > best.price ? p.mrp : best.price;
  const discount = mrp > best.price ? Math.round(((mrp - best.price) / mrp) * 100) : 0;
  return {
    ...p,
    stores,
    lowestPrice: best.price,
    bestStore: best.store,
    bestUrl: best.url,
    bestOffer: best.offer || '',
    mrp,
    discount
  };
}

function storeBadgeClass(store) {
  const s = (store || '').toLowerCase();
  if (s.includes('amazon')) return 'store-amazon';
  if (s.includes('flipkart')) return 'store-flipkart';
  if (s.includes('croma')) return 'store-croma';
  return 'store-jiomart';
}

function storeShortCode(store) {
  const s = (store || '').toLowerCase();
  if (s.includes('amazon')) return 'a';
  if (s.includes('flipkart')) return 'f';
  if (s.includes('croma')) return 'c';
  return 'j';
}

function deviceSvg(category) {
  if (category === 'laptops') {
    return `<svg viewBox="0 0 120 96" width="96" height="78" fill="none" aria-hidden="true">
      <rect x="18" y="14" width="84" height="54" rx="6" fill="#0f172a" stroke="#2563eb" stroke-width="3"/>
      <rect x="24" y="20" width="72" height="42" rx="3" fill="#dbeafe"/>
      <path d="M8 72h104l-6 10H14L8 72z" fill="#334155"/>
    </svg>`;
  }
  if (category === 'audio') {
    return `<svg viewBox="0 0 120 96" width="90" height="78" fill="none" aria-hidden="true">
      <rect x="28" y="24" width="64" height="52" rx="22" fill="#0f172a" stroke="#2563eb" stroke-width="3"/>
      <circle cx="48" cy="48" r="10" fill="#dbeafe"/>
      <circle cx="72" cy="48" r="10" fill="#dbeafe"/>
      <rect x="48" y="64" width="24" height="4" rx="2" fill="#22c55e"/>
    </svg>`;
  }
  if (category === 'smartwatches') {
    return `<svg viewBox="0 0 120 96" width="90" height="78" fill="none" aria-hidden="true">
      <rect x="44" y="8" width="32" height="16" rx="4" fill="#334155"/>
      <rect x="44" y="72" width="32" height="16" rx="4" fill="#334155"/>
      <rect x="34" y="22" width="52" height="52" rx="16" fill="#0f172a" stroke="#2563eb" stroke-width="3"/>
      <circle cx="60" cy="48" r="16" fill="#dbeafe"/>
      <path d="M60 39v9l6 4" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  }
  if (category === 'accessories') {
    return `<svg viewBox="0 0 120 96" width="90" height="78" fill="none" aria-hidden="true">
      <rect x="34" y="14" width="52" height="68" rx="10" fill="#0f172a" stroke="#2563eb" stroke-width="3"/>
      <rect x="42" y="24" width="36" height="14" rx="3" fill="#dbeafe"/>
      <path d="M62 46l-7 11h7l-2 10 9-12h-7l2-9z" fill="#f97316"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 96 120" width="76" height="96" fill="none" aria-hidden="true">
    <rect x="20" y="10" width="56" height="100" rx="10" fill="#0f172a" stroke="#2563eb" stroke-width="3"/>
    <rect x="26" y="18" width="44" height="82" rx="5" fill="#dbeafe"/>
    <circle cx="48" cy="14" r="2" fill="#94a3b8"/>
    <rect x="32" y="26" width="16" height="16" rx="4" fill="#1e293b"/>
  </svg>`;
}

function productThumb(p, rootPrefix) {
  if (!p.image) return deviceSvg(p.category);
  const src = /^https?:\/\//i.test(p.image) ? p.image : `${rootPrefix}${p.image}`;
  return `<img src="${esc(src)}" alt="${esc(p.name)}" class="product-photo" loading="lazy"/>`;
}

function formatMonthYear(iso) {
  try {
    return new Date(iso || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return 'Nov 2026';
  }
}

function renderHead({ title, description, canonicalUrl, jsonLdList, assetPrefix, image }) {
  const ogImage = image
    ? `\n  <meta property="og:image" content="${esc(image)}"/>\n  <meta property="og:image:alt" content="${esc(title)}"/>\n  <meta name="twitter:card" content="summary_large_image"/>\n  <meta name="twitter:image" content="${esc(image)}"/>`
    : '';
  const monetagMeta = config.monetag?.enabled && config.monetag.verificationMeta
    ? config.monetag.verificationMeta
    : '';
  const monetagScript = config.monetag?.enabled && config.monetag.zoneScriptUrl
    ? `<script src="${esc(config.monetag.zoneScriptUrl)}" async data-cfasync="false"></script>`
    : '';
  const gaScript = config.analytics?.gaMeasurementId
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(config.analytics.gaMeasurementId)}"></script>
       <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(config.analytics.gaMeasurementId)}');</script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}"/>
  <meta name="robots" content="INDEX,FOLLOW,max-snippet:-1,max-image-preview:large"/>
  <link rel="canonical" href="${esc(canonicalUrl)}"/>
  <meta property="og:title" content="${esc(title)}"/>
  <meta property="og:description" content="${esc(description)}"/>
  <meta property="og:url" content="${esc(canonicalUrl)}"/>
  <meta property="og:site_name" content="${esc(config.siteName)}"/>
  <meta property="og:type" content="website"/>${ogImage}
  <link rel="icon" type="image/jpeg" href="${assetPrefix}assets/icons/brand-icon.jpg"/>
  <link rel="apple-touch-icon" href="${assetPrefix}assets/icons/brand-icon.jpg"/>
  <link rel="alternate" type="application/rss+xml" title="${esc(config.siteName)} — News &amp; Reviews" href="${esc(config.siteUrl)}/rss.xml"/>
  ${monetagMeta}
  <link rel="stylesheet" href="${assetPrefix}assets/main.css"/>
  ${jsonLdList.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n  ')}
  ${gaScript}
  ${monetagScript}
</head>`;
}

const NAV_ICONS = {
  '': `<svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="gAll1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#6366f1"/></linearGradient><linearGradient id="gAll2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f472b6"/><stop offset="100%" stop-color="#fb923c"/></linearGradient></defs><rect x="6" y="6" width="16" height="16" rx="5" fill="url(#gAll1)"/><rect x="26" y="6" width="16" height="16" rx="5" fill="url(#gAll2)"/><rect x="6" y="26" width="16" height="16" rx="5" fill="#818cf8"/><rect x="26" y="26" width="16" height="16" rx="5" fill="#38bdf8"/></svg>`,
  mobile: `<svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="gPhBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#1d4ed8"/></linearGradient><linearGradient id="gPhScr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#67e8f9"/><stop offset="50%" stop-color="#a78bfa"/><stop offset="100%" stop-color="#fb7185"/></linearGradient></defs><rect x="11" y="4" width="26" height="40" rx="6" fill="url(#gPhBody)"/><rect x="14" y="7" width="20" height="34" rx="4" fill="url(#gPhScr)"/><rect x="17" y="12" width="6" height="6" rx="1.8" fill="#60a5fa"/><rect x="25" y="12" width="6" height="6" rx="1.8" fill="#fde047"/><rect x="17" y="20" width="6" height="6" rx="1.8" fill="#fb7185"/><rect x="29" y="16" width="13" height="8" rx="3" fill="#bfdbfe"/><rect x="27" y="26" width="11" height="7" rx="2.5" fill="#fecdd3"/></svg>`,
  earbuds: `<svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="gEbCase" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6d28d9"/></linearGradient><linearGradient id="gEbPod" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient></defs><rect x="10" y="22" width="28" height="20" rx="8" fill="url(#gEbCase)"/><ellipse cx="24" cy="22" rx="14" ry="5" fill="#3b82f6"/><ellipse cx="24" cy="18" rx="12" ry="4" fill="#a78bfa"/><circle cx="16" cy="12" r="5" fill="url(#gEbPod)"/><rect x="15" y="13" width="4" height="10" rx="2" fill="#818cf8"/><circle cx="32" cy="10" r="5" fill="url(#gEbPod)"/><rect x="29" y="11" width="4" height="10" rx="2" fill="#818cf8"/></svg>`,
  smartwatches: `<svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="gSwBand" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#818cf8"/><stop offset="100%" stop-color="#6366f1"/></linearGradient><linearGradient id="gSwScr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4c1d95"/><stop offset="100%" stop-color="#312e81"/></linearGradient></defs><rect x="16" y="3" width="16" height="42" rx="6" fill="url(#gSwBand)"/><rect x="10" y="11" width="28" height="26" rx="7" fill="#a78bfa"/><rect x="13" y="14" width="22" height="20" rx="5" fill="url(#gSwScr)"/><path d="M21 20c0-1.5 1.8-2.2 3-0.8 1.2-1.4 3-0.7 3 0.8 0 2-3 4-3 4s-3-2-3-4z" fill="#fb7185"/><rect x="16" y="27" width="16" height="3" rx="1.5" fill="#4ade80"/></svg>`,
  laptops: `<svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="gLpScr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="50%" stop-color="#818cf8"/><stop offset="100%" stop-color="#f472b6"/></linearGradient></defs><rect x="9" y="9" width="30" height="20" rx="4" fill="#8b5cf6"/><rect x="12" y="12" width="24" height="14" rx="2.5" fill="url(#gLpScr)"/><rect x="15" y="15" width="5" height="5" rx="1.5" fill="#a78bfa"/><rect x="21.5" y="15" width="5" height="5" rx="1.5" fill="#60a5fa"/><rect x="28" y="15" width="5" height="5" rx="1.5" fill="#fecdd3"/><path d="M5 31h38l-3 8H8l-3-8z" fill="#a78bfa"/><rect x="19" y="34" width="10" height="3" rx="1.5" fill="#7c3aed"/></svg>`,
  'mobile-brands': `<svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="gBr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#f97316"/></linearGradient></defs><path d="M24 5l5.5 11.2 12.3 1.8-8.9 8.7 2.1 12.3L24 33.2 13 39l2.1-12.3-8.9-8.7 12.3-1.8L24 5z" fill="url(#gBr)"/></svg>`,
  compare: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="15" height="28" rx="4" fill="#3b82f6"/><rect x="27" y="10" width="15" height="28" rx="4" fill="#ec4899"/><circle cx="24" cy="24" r="7" fill="#ffffff"/><path d="M20 24h8M24 20l4 4-4 4" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'mobile-price-list': `<svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="gPr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#34d399"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs><circle cx="24" cy="24" r="19" fill="url(#gPr)"/><path d="M17 15h14M17 21h14M17 27l10 9M17 27h6a5 5 0 0 0 0-12" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  news: `<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="8" width="34" height="32" rx="6" fill="#6366f1"/><rect x="12" y="13" width="12" height="10" rx="2.5" fill="#38bdf8"/><rect x="27" y="14" width="9" height="3" rx="1.5" fill="#e0e7ff"/><rect x="27" y="20" width="9" height="3" rx="1.5" fill="#e0e7ff"/><rect x="12" y="27" width="24" height="3.5" rx="1.5" fill="#c7d2fe"/><rect x="12" y="33" width="18" height="3.5" rx="1.5" fill="#c7d2fe"/></svg>`,
  reviews: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="8" width="36" height="26" rx="7" fill="#8b5cf6"/><path d="M16 34l-6 7v-7h6z" fill="#8b5cf6"/><path d="M24 14l2.4 4.8 5.3.8-3.8 3.7.9 5.3L24 26.1l-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L24 14z" fill="#fde047"/></svg>`,
  guides: `<svg viewBox="0 0 48 48" fill="none"><rect x="9" y="6" width="30" height="36" rx="5" fill="#ec4899"/><rect x="13" y="6" width="5" height="36" fill="#be185d"/><rect x="22" y="14" width="12" height="4" rx="2" fill="#fce7f3"/><rect x="22" y="22" width="10" height="3.5" rx="1.75" fill="#fbcfe8"/></svg>`,
  budget: `<svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="gBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f472b6"/><stop offset="100%" stop-color="#fb923c"/></linearGradient></defs><path d="M26 7H11a4 4 0 0 0-4 4v15l16 16a4 4 0 0 0 5.7 0l12.3-12.3a4 4 0 0 0 0-5.7L26 7z" fill="url(#gBg)"/><circle cx="15" cy="15" r="3" fill="#ffffff"/></svg>`,
};

function renderHeader(rootPrefix, activeSlug = '') {
  const priceItems = [
    { href: `${rootPrefix}mobile-price-list/under-10000/`, amt: '₹10,000', slug: 'under-10000', tone: 'p10' },
    { href: `${rootPrefix}mobile-price-list/under-20000/`, amt: '₹20,000', slug: 'under-20000', tone: 'p20' },
    { href: `${rootPrefix}mobile-price-list/under-30000/`, amt: '₹30,000', slug: 'under-30000', tone: 'p30' },
    { href: `${rootPrefix}mobile-price-list/under-40000/`, amt: '₹40,000', slug: 'under-40000', tone: 'p40' },
    { href: `${rootPrefix}mobile-price-list/under-50000/`, amt: '₹50,000', slug: 'under-50000', tone: 'p50' },
  ];
  const navItems = [
    { href: `${rootPrefix}`, label: 'All', slug: '' },
    { href: `${rootPrefix}mobile/`, label: 'Phone', slug: 'mobile' },
    { href: `${rootPrefix}earbuds/`, label: 'Earbuds', slug: 'earbuds' },
    { href: `${rootPrefix}smartwatches/`, label: 'Smart Watch', slug: 'smartwatches' },
    { href: `${rootPrefix}laptops/`, label: 'Laptop', slug: 'laptops' },
    ...priceItems.map((p) => ({ ...p, isPrice: true, label: `Under ${p.amt}` })),
    { href: `${rootPrefix}mobile-brands/`, label: 'Brands', slug: 'mobile-brands' },
    { href: `${rootPrefix}compare/`, label: 'Compare', slug: 'compare' },
    { href: `${rootPrefix}mobile-price-list/`, label: 'Price List', slug: 'mobile-price-list' },
    { href: `${rootPrefix}news/`, label: 'News', slug: 'news' },
    { href: `${rootPrefix}reviews/`, label: 'Reviews', slug: 'reviews' },
    { href: `${rootPrefix}guides/`, label: 'Guides', slug: 'guides' },
  ];
  return `<header class="site-header">
  <div class="container">
    <div class="header-top">
      <a class="brand" href="${rootPrefix}" aria-label="${esc(config.siteName)}">
        <img class="brand-logo-img" src="${rootPrefix}assets/icons/header-logo.jpg" alt="${esc(config.siteName)}" height="42"/>
      </a>
      <div class="search-box">
        <span class="search-icon">✨</span>
        <input id="global-search" type="search" placeholder='AI Search "Poco", "Ryzen 5", "earbuds under 1000"...' aria-label="AI Search gadgets"/>
      </div>
      <a class="header-cta" href="${rootPrefix}best-gadgets-under-1000/">🔥 Deals Under ₹1,000</a>
    </div>
    <nav class="nav-strip" aria-label="Categories">
      ${navItems.map((n) => {
        if (n.isPrice) {
          return `<a class="nav-link nav-price ${n.slug === activeSlug ? 'active' : ''}" href="${n.href}" title="${esc(n.label)}" aria-label="${esc(n.label)}"><span class="nav-price-under">Under</span><span class="nav-price-amt ${n.tone}">${esc(n.amt)}</span></a>`;
        }
        const icon = NAV_ICONS[n.iconKey || n.slug] || NAV_ICONS.budget;
        return `<a class="nav-link ${n.slug === activeSlug ? 'active' : ''}" href="${n.href}" title="${esc(n.label)}" aria-label="${esc(n.label)}"><span class="nav-sticker">${icon}</span><span class="nav-lbl">${esc(n.label)}</span></a>`;
      }).join('')}
    </nav>
  </div>
</header>`;
}

function renderProductCard(p, index, rootPrefix) {
  const storeNames = p.stores.map((s) => s.store).join(',');
  const searchBlob = `${p.name} ${p.brand} ${p.category} ${p.tags?.join(' ')} ${Object.values(p.specs || {}).join(' ')}`;
  const offersPayload = JSON.stringify({ name: p.name, stores: p.stores });
  const comparePayload = JSON.stringify({
    id: p.id, name: p.name, score: p.score, lowestPrice: p.lowestPrice, bestStore: p.bestStore, specs: p.specs
  });

  return `<article class="product-card"
    data-id="${esc(p.id)}"
    data-category="${esc(p.category)}"
    data-price="${p.lowestPrice}"
    data-score="${p.score}"
    data-discount="${p.discount}"
    data-stores="${esc(storeNames)}"
    data-search="${esc(searchBlob)}"
    data-product-json="${esc(comparePayload)}">
    <div class="card-top">
      <div class="title-block">
        <span class="rank-badge">${index + 1}</span>
        <div>
          <h3 class="card-title"><a href="${rootPrefix}product/${esc(p.slug)}/">${esc(p.name)}</a></h3>
          <div class="status-row">
            <span>Market status: <span class="status-ok">${esc(p.status || 'In Stock')}</span></span>
            ${p.discount > 0 ? `<span class="discount-badge">${p.discount}% OFF</span>` : ''}
            <span>Updated: ${esc(formatMonthYear(p.updatedAt))}</span>
          </div>
        </div>
      </div>
      <div class="price-block">
        <div class="price-row">
          ${p.mrp > p.lowestPrice ? `<span class="mrp-strike">${formatINR(p.mrp)}</span>` : ''}
          <span class="lowest-price">${formatINR(p.lowestPrice)}</span>
          <a class="buy-btn" href="${esc(p.bestUrl)}" target="_blank" rel="nofollow sponsored noopener">
            <span class="store-dot ${storeBadgeClass(p.bestStore)}">${storeShortCode(p.bestStore)}</span>
            Buy on ${esc(p.bestStore)} &gt;
          </a>
        </div>
        <button type="button" class="offers-link" data-offers-json="${esc(offersPayload)}">
          ⓘ Check ${p.stores.length} stores &amp; bank offers
        </button>
      </div>
    </div>

    <div class="card-body">
      <div class="thumb-col">
        <a class="device-art" href="${rootPrefix}product/${esc(p.slug)}/">
          ${productThumb(p, rootPrefix)}
        </a>
        <span class="thumb-cat">${esc(p.category)}</span>
      </div>

      <div class="specs-col">
        <div class="meta-bar">
          <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
            <div class="score-wrap">
              <span class="score-num">${p.score}</span>
              <span class="score-lbl">Value<br/>Score</span>
            </div>
            <span class="launch-date">Launched: ${esc(p.launchedOn)}</span>
          </div>
          <button type="button" class="compare-toggle" data-compare-id="${esc(p.id)}">+ Compare</button>
        </div>

        <ul class="specs-list">
          <li><span class="spec-ico">⚙</span><span>${esc(p.specs?.processor)}</span></li>
          <li><span class="spec-ico">▣</span><span>${esc(p.specs?.display)}</span></li>
          <li><span class="spec-ico">◎</span><span>${esc(p.specs?.camera)}</span></li>
          <li><span class="spec-ico">⚡</span><span>${esc(p.specs?.battery)}</span></li>
          <li><span class="spec-ico">▤</span><span>${esc(p.specs?.memory)}</span></li>
        </ul>

        <div class="store-strip">
          ${p.stores.map((s, idx) => `
            <a class="store-pill ${idx === 0 ? 'cheapest' : ''}" href="${esc(s.url)}" target="_blank" rel="nofollow sponsored noopener" title="${esc(s.offer || '')}">
              <span class="store-dot ${storeBadgeClass(s.store)}">${storeShortCode(s.store)}</span>
              <span>${esc(s.store)}: <strong>${formatINR(s.price)}</strong></span>
            </a>
          `).join('')}
        </div>

        <div class="card-links-row">
          <span style="font-size:12.5px;color:#475569">🎁 Best offer: <strong>${esc(p.bestOffer || 'Check store page')}</strong></span>
          <a class="spec-full-link" href="${rootPrefix}product/${esc(p.slug)}/">View full Specification &gt;</a>
        </div>
      </div>
    </div>

    ${(p.pros?.length || p.cons?.length) ? `
      <div class="pros-cons-grid">
        <div class="pc-box pc-pros">
          <h4>Pros</h4>
          <ul>${(p.pros || []).map((x) => `<li><span>✓</span><span>${esc(x)}</span></li>`).join('')}</ul>
        </div>
        <div class="pc-box pc-cons">
          <h4>Cons</h4>
          <ul>${(p.cons || []).map((x) => `<li><span>✕</span><span>${esc(x)}</span></li>`).join('')}</ul>
        </div>
      </div>` : ''}

    ${p.expertVerdict ? `<div class="verdict-box"><strong>Expert Verdict:</strong> ${esc(p.expertVerdict)}</div>` : ''}
  </article>`;
}

function renderSidebar(allProducts, rootPrefix) {
  const topDrops = allProducts.slice().sort((a, b) => b.discount - a.discount).slice(0, 5);
  return `<aside class="sidebar">
    <div class="side-widget">
      <h3>🔥 Biggest Price Drops</h3>
      <div class="side-list">
        ${topDrops.map((p) => `
          <a class="side-item" href="${rootPrefix}product/${esc(p.slug)}/">
            <span>${esc(p.name)}</span>
            <span class="side-price">${formatINR(p.lowestPrice)}</span>
          </a>
        `).join('')}
      </div>
    </div>

    <div class="side-widget">
      <h3>💰 Browse By Budget</h3>
      <div class="budget-links">
        ${config.budgetPages.map((b) => `
          <a class="budget-link" href="${rootPrefix}${b.slug}/">
            <span>${esc(b.shortTitle)}</span>
            <span>→</span>
          </a>
        `).join('')}
      </div>
    </div>

    <div class="ad-slot">
      <strong>Ad / Monetag Zone</strong><br/>
      Configure <code>config/site.config.json</code> to activate Monetag ads safely.
    </div>
  </aside>`;
}

function renderFooter(rootPrefix) {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <strong>${esc(config.siteName)}</strong>
      <p style="margin:6px 0 0">${esc(config.tagline)}</p>
    </div>
    <div>
      <strong>Disclaimer:</strong> Prices and bank offers are synced automatically and may change on Amazon, Flipkart, Croma, or JioMart. Affiliate links may earn a small commission at no extra cost to you.
    </div>
  </div>
  <nav class="container footer-links" aria-label="Footer">
    <a href="${rootPrefix}mobile/">All Phones</a>
    <a href="${rootPrefix}mobile-brands/">Brands</a>
    <a href="${rootPrefix}mobile-list/">By Feature</a>
    <a href="${rootPrefix}mobile-price-list/">By Price</a>
    <a href="${rootPrefix}best-mobiles/">Best Lists</a>
    <a href="${rootPrefix}compare/">Compare</a>
    <a href="${rootPrefix}mobile-deals/">Deals</a>
    <a href="${rootPrefix}news/">News</a>
    <a href="${rootPrefix}reviews/">Reviews</a>
    <a href="${rootPrefix}guides/">Guides</a>
    <a href="${rootPrefix}stories/">Stories</a>
  </nav>
</footer>
<div class="compare-dock" id="compare-dock">
  <span id="compare-count-text">0 selected</span>
  <button type="button" class="compare-btn-go" id="compare-now-btn">Compare Side-by-Side</button>
  <button type="button" class="compare-clear" id="compare-clear-btn">Clear</button>
</div>
<div class="modal-backdrop" id="app-modal" role="dialog" aria-modal="true">
  <div class="modal-card">
    <div class="modal-head">
      <h3 id="modal-title">Offers</h3>
      <button type="button" class="modal-close" id="modal-close-btn">✕</button>
    </div>
    <div id="modal-body"></div>
  </div>
</div>
<script src="${rootPrefix}assets/app.js"></script>
</body>
</html>`;
}

function renderListPage({ title, headingHtml, description, products, allProducts, canonicalUrl, rootPrefix, activeSlug, defaultCategory = 'all', defaultMaxPrice = 0, breadcrumbs }) {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p, idx) => ({
      '@type': 'ListItem',
      additionalType: 'Product',
      position: idx + 1,
      name: p.name,
      url: `${config.siteUrl}/product/${p.slug}/`
    }))
  };
  const bcSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: b.url
    }))
  };

  const catButtons = [
    { key: 'all', label: 'All' },
    { key: 'smartphones', label: 'Smartphones' },
    { key: 'laptops', label: 'Laptops' },
    { key: 'audio', label: 'Earbuds & Audio' },
    { key: 'smartwatches', label: 'Smartwatches' },
    { key: 'accessories', label: 'Accessories' }
  ];
  const priceButtons = [
    { val: 0, label: 'All Budgets' },
    { val: 1000, label: 'Under ₹1,000' },
    { val: 5000, label: 'Under ₹5,000' },
    { val: 10000, label: 'Under ₹10,000' },
    { val: 20000, label: 'Under ₹20,000' },
    { val: 50000, label: 'Under ₹50,000' }
  ];

  const topFive = products.slice(0, 5);

  return `${renderHead({ title, description, canonicalUrl, jsonLdList: [bcSchema, itemListSchema], assetPrefix: rootPrefix })}
<body data-default-category="${esc(defaultCategory)}" data-default-max-price="${defaultMaxPrice || 0}">
${renderHeader(rootPrefix, activeSlug)}
<main class="container">
  <section class="page-hero">
    <nav class="breadcrumbs">${breadcrumbs.map((b, i) => i === breadcrumbs.length - 1 ? `<span>${esc(b.name)}</span>` : `<a href="${esc(b.href)}">${esc(b.name)}</a> <span>›</span>`).join(' ')}</nav>
    <h1>${headingHtml}</h1>
    <p class="hero-desc">${esc(description)}</p>
    <div class="hero-meta">
      <span class="meta-pill">Stores: Amazon · Flipkart · Croma · JioMart</span>
      <span class="meta-pill">Updated: ${esc(formatMonthYear(catalog.lastUpdated))}</span>
    </div>
  </section>

  <section class="filter-bar" aria-label="Filters">
    <div class="filter-group">
      ${catButtons.map((c) => `<button type="button" class="chip-btn ${c.key === defaultCategory ? 'active' : ''}" data-filter-cat="${c.key}">${esc(c.label)}</button>`).join('')}
    </div>
    <div class="filter-group">
      ${priceButtons.map((b) => `<button type="button" class="chip-btn ${b.val === defaultMaxPrice ? 'active' : ''}" data-filter-price="${b.val}">${esc(b.label)}</button>`).join('')}
    </div>
    <div class="filter-right">
      <select id="store-select" class="filter-select" aria-label="Filter by store">
        <option value="all">All Stores</option>
        <option value="Amazon">Amazon</option>
        <option value="Flipkart">Flipkart</option>
        <option value="Croma">Croma</option>
        <option value="JioMart">JioMart</option>
      </select>
      <select id="sort-select" class="filter-select" aria-label="Sort products">
        <option value="score">Sort: Best Value Score</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="discount">Biggest Discount %</option>
      </select>
      <span class="result-count" id="result-count">${products.length} products</span>
    </div>
  </section>

  <div class="layout-grid">
    <div>
      <div class="cards-stack" id="cards-list">
        ${products.map((p, i) => renderProductCard(p, i, rootPrefix)).join('')}
      </div>

      ${topFive.length ? `
      <section class="section-card">
        <h2>Top ${topFive.length} Quick Price Comparison Table</h2>
        <div class="table-wrap">
          <table class="summary-table">
            <thead>
              <tr><th>Product</th><th>Lowest Price</th><th>Best Store</th><th>Value Score</th><th>Top Offer</th></tr>
            </thead>
            <tbody>
              ${topFive.map((p) => `
                <tr>
                  <td><a href="${rootPrefix}product/${esc(p.slug)}/" style="color:var(--primary);font-weight:700">${esc(p.name)}</a></td>
                  <td><strong>${formatINR(p.lowestPrice)}</strong></td>
                  <td>${esc(p.bestStore)}</td>
                  <td>${p.score}/100</td>
                  <td>${esc(p.bestOffer)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>` : ''}
    </div>

    ${renderSidebar(allProducts, rootPrefix)}
  </div>
</main>
${renderFooter(rootPrefix)}`;
}

function renderProductPage(p, allProducts) {
  const rootPrefix = '../../';
  const canonicalUrl = `${config.siteUrl}/product/${p.slug}/`;
  const productImage = p.image ? `${config.siteUrl}/${String(p.image).replace(/^\//, '')}` : undefined;
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    brand: { '@type': 'Brand', name: p.brand },
    description: p.expertVerdict || `${p.name} specs and lowest prices across Amazon, Flipkart, Croma and JioMart.`,
    ...(productImage ? { image: [productImage] } : {}),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: p.lowestPrice,
      highPrice: Math.max(...p.stores.map((s) => s.price)),
      offerCount: p.stores.length
    }
  };
  const bcSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${config.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: p.name, item: canonicalUrl }
    ]
  };

  return `${renderHead({
    title: `${p.name} Price in India (${formatMonthYear(p.updatedAt)}) — Specs & Offers | ${config.siteName}`,
    description: `${p.name} lowest price is ${formatINR(p.lowestPrice)} on ${p.bestStore}. Compare Amazon, Flipkart, Croma & JioMart prices, bank offers, and full specifications.`,
    canonicalUrl,
    jsonLdList: [bcSchema, productSchema],
    assetPrefix: rootPrefix,
    image: productImage
  })}
<body>
${renderHeader(rootPrefix)}
<main class="container">
  <section class="page-hero product-hero">
    <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <span>${esc(p.name)}</span></nav>
    <div class="product-hero-main">
      <div class="product-hero-media">
        ${p.image
          ? `<img class="product-hero-photo" src="${esc(rootPrefix + p.image)}" alt="${esc(p.name)}" width="220" height="220" fetchpriority="high"/>`
          : `<div class="product-hero-photo">${deviceSvg(p.category)}</div>`}
      </div>
      <div class="product-hero-copy">
        <h1>${esc(p.name)} <span class="price-highlight">${formatINR(p.lowestPrice)}</span></h1>
        <p class="hero-desc">${esc(p.expertVerdict || '')}</p>
        <div class="hero-meta">
          <span class="meta-pill">Value Score ${p.score}/100</span>
          <span class="meta-pill">Best on ${esc(p.bestStore)}</span>
          <span class="meta-pill">Updated ${esc(formatMonthYear(p.updatedAt))}</span>
        </div>
      </div>
    </div>
  </section>

  <div class="layout-grid">
    <div>
      <section class="section-card" style="margin-top:0">
        <h2>Compare Prices &amp; Bank Offers Across All Stores</h2>
        ${p.stores.map((s, idx) => `
          <div class="offer-row ${idx === 0 ? 'best' : ''}">
            <div>
              <strong>${esc(s.store)}</strong> ${idx === 0 ? '<span class="discount-badge">Best Price</span>' : ''}
              <div style="font-size:13px;color:#475569;margin-top:4px">${esc(s.offer || 'Standard online price')}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <strong style="font-size:20px">${formatINR(s.price)}</strong>
              <a class="buy-btn" href="${esc(s.url)}" target="_blank" rel="nofollow sponsored noopener">Buy Now &gt;</a>
            </div>
          </div>
        `).join('')}
      </section>

      <section class="section-card">
        <h2>Key Specifications</h2>
        <div class="table-wrap">
          <table class="summary-table">
            <tbody>
              <tr><th>Processor / Core</th><td>${esc(p.specs?.processor)}</td></tr>
              <tr><th>Display / Audio</th><td>${esc(p.specs?.display)}</td></tr>
              <tr><th>Camera / Features</th><td>${esc(p.specs?.camera)}</td></tr>
              <tr><th>Battery / Charging</th><td>${esc(p.specs?.battery)}</td></tr>
              <tr><th>Memory / Build</th><td>${esc(p.specs?.memory)}</td></tr>
              <tr><th>Value Score</th><td><strong>${p.score}/100</strong></td></tr>
              <tr><th>Launch Date</th><td>${esc(p.launchedOn)}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      ${(p.pros?.length || p.cons?.length) ? `
      <section class="section-card">
        <h2>Pros &amp; Cons</h2>
        <div class="pros-cons-grid" style="margin-top:0">
          <div class="pc-box pc-pros"><h4>Pros</h4><ul>${(p.pros || []).map((x) => `<li><span>✓</span><span>${esc(x)}</span></li>`).join('')}</ul></div>
          <div class="pc-box pc-cons"><h4>Cons</h4><ul>${(p.cons || []).map((x) => `<li><span>✕</span><span>${esc(x)}</span></li>`).join('')}</ul></div>
        </div>
      </section>` : ''}
    </div>
    ${renderSidebar(allProducts, rootPrefix)}
  </div>
</main>
${renderFooter(rootPrefix)}`;
}

function formatPhonePrice(p) {
  if (!p?.price?.amount) return '';
  const { currency, amount } = p.price;
  return currency === '₹' ? formatINR(amount) : `${currency}${Number(amount).toLocaleString('en-IN')}`;
}

const slugifyGroup = (name) => String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const PHONE_IMAGE_EXTS = ['png', 'jpg', 'webp', 'jpeg'];

/** Local asset first (`src/assets/phones/<slug>.<ext>`), then opt-in remote gallery. */
function phoneImageSrc(phone, rootPrefix, config) {
  const local = PHONE_IMAGE_EXTS
    .map((ext) => `assets/phones/${phone.slug}.${ext}`)
    .find((rel) => fs.existsSync(path.join(ROOT, 'src', rel)));
  if (local) return `${rootPrefix}${local}`;
  if (!config?.useRemoteImages) return '';
  const gallery = (phone.gallery || [])
    .filter((g) => g.url && /^https?:/.test(g.url) && !/watch\?|youtu/.test(g.url))
    .sort((a, b) => (/design/i.test(a.category || '') ? -1 : 0) - (/design/i.test(b.category || '') ? -1 : 0));
  return gallery[0]?.url || '';
}

function phoneImageAbs(phone, config) {
  const local = PHONE_IMAGE_EXTS
    .map((ext) => `assets/phones/${phone.slug}.${ext}`)
    .find((rel) => fs.existsSync(path.join(ROOT, 'src', rel)));
  if (local) return `${config.siteUrl}/${local}`;
  if (!config?.useRemoteImages) return null;
  return phone.gallery?.[0]?.url || null;
}

function renderPhoneCard(phone, rootPrefix, config, compact = false) {
  const src = phoneImageSrc(phone, rootPrefix, config);
  const facts = phoneFacts(phone);
  const search = [phone.name, phone.brand, phone.highlights?.Processor, phone.highlights?.Display,
    phone.highlights?.['Rear Camera'], facts.ramText, facts.storageText, facts.has5G ? '5G' : ''].filter(Boolean).join(' ');
  return `<a class="mini-card${compact ? ' mini-card-compact' : ''}" href="${rootPrefix}mobile/${esc(phone.slug)}/"
        data-brand="${esc(phone.brand || '')}" data-price="${facts.price}" data-ram="${facts.ram}"
        data-storage="${facts.storage}" data-5g="${facts.has5G ? '1' : '0'}" data-score="${phone.score || 0}"
        data-camera="${facts.cameraMP}" data-battery="${facts.battery}" data-refresh="${facts.refreshHz}"
        data-name="${esc(phone.name)}" data-search="${esc(search)}">
        <span class="mini-thumb">${src
          ? `<img src="${esc(src)}" alt="${esc(phone.name)}" width="96" height="96" loading="lazy" decoding="async"/>`
          : deviceSvg('Smartphones')}</span>
        <span class="mini-card-copy"><strong>${esc(phone.name)}</strong><span>${esc(formatPhonePrice(phone) || '—')}</span></span></a>`;
}

/* ---------------------------------------------------------------------------
 * Phone taxonomy helpers: facts, brands, price bands, comparisons
 * ------------------------------------------------------------------------- */

const PHONE_GROUPS = ['General', 'Display', 'Body', 'Processor', 'Operating System', 'Main Camera',
  'Selfie Camera', 'Battery', 'Memory', 'Network', 'Connectivity', 'Features'];

const brandSlug = (brand) => String(brand).toLowerCase().replace(/\+/g, '-plus')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const brandInitials = (brand) => String(brand).replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();

const inrPrice = (phone) => (phone.price?.currency === '₹' ? phone.price.amount : 0);

function specValue(phone, group, labels) {
  const list = phone.specs?.[group] || [];
  const wanted = Array.isArray(labels) ? labels : [labels];
  for (const label of wanted) {
    for (const entry of list) {
      if (entry.label === label && entry.value) return entry.value;
      const child = (entry.children || []).find((c) => c.label === label && c.value);
      if (child) return child.value;
    }
  }
  return '';
}

const firstMatch = (text, re) => {
  const match = re.exec(text || '');
  return match ? match[1] : '';
};

const parseDate = (text) => {
  if (!text) return 0;
  const ts = Date.parse(text);
  return Number.isNaN(ts) ? 0 : ts;
};

function phoneFacts(phone) {
  const ramText = specValue(phone, 'Memory', ['RAM Size', 'RAM']) || (phone.highlights?.['RAM/Storage'] || '').split('/')[0] || '';
  const storageText = specValue(phone, 'Memory', ['Storage Size', 'Storage']) || (phone.highlights?.['RAM/Storage'] || '').split('/')[1] || '';
  const network = specValue(phone, 'Network', ['Technology']);
  const has5G = /5G/i.test(network) || /5G/i.test(phone.name) || phone.specs?.Network?.some((s) => s.label === '5G Bands');
  const availability = specValue(phone, 'General', ['Availability']);
  return {
    price: inrPrice(phone),
    ram: Number(firstMatch(ramText, /(\d+)\s*GB/i)) || 0,
    ramText,
    storage: Number(firstMatch(storageText, /(\d+)\s*GB/i)) || 0,
    storageText,
    has5G: !!has5G,
    battery: Number(firstMatch(specValue(phone, 'Battery', ['Battery Capacity', 'Capacity']), /(\d{3,5})\s*mAh/i)) || 0,
    chargingW: Number(firstMatch(specValue(phone, 'Battery', ['Charging Speed Wired', 'Charging']), /(\d+(?:\.\d+)?)\s*W/i)) || 0,
    cameraMP: Number(firstMatch(specValue(phone, 'Main Camera', ['Megapixel', 'Rear Camera #1 Megapixel']), /(\d+(?:\.\d+)?)\s*MP/i)) || 0,
    weightG: Number(firstMatch(specValue(phone, 'Body', ['Weight']), /([\d.]+)\s*(g|grams)/i)) || 0,
    screenIn: Number(firstMatch(specValue(phone, 'Display', ['Display Size', 'Size']), /([\d.]+)\s*inch/i)) || 0,
    refreshHz: Number(firstMatch(specValue(phone, 'Display', ['Refresh Rate']), /(\d+)\s*Hz/i)) || 0,
    chipset: specValue(phone, 'Processor', ['Chipset']),
    os: specValue(phone, 'Operating System', ['OS']),
    availability,
    availabilityTs: parseDate(availability),
  };
}

const PRICE_BANDS = [
  { slug: 'under-10000', label: 'Under ₹10,000', short: 'Under ₹10k', min: 0, max: 9999 },
  { slug: '10000-15000', label: 'Between ₹10,000 and ₹15,000', short: '₹10k – ₹15k', min: 10000, max: 14999 },
  { slug: '15000-20000', label: 'Between ₹15,000 and ₹20,000', short: '₹15k – ₹20k', min: 15000, max: 19999 },
  { slug: '20000-30000', label: 'Between ₹20,000 and ₹30,000', short: '₹20k – ₹30k', min: 20000, max: 29999 },
  { slug: '30000-50000', label: 'Between ₹30,000 and ₹50,000', short: '₹30k – ₹50k', min: 30000, max: 49999 },
  { slug: '50000-100000', label: 'Between ₹50,000 and ₹1,00,000', short: '₹50k – ₹1L', min: 50000, max: 99999 },
  { slug: 'above-100000', label: 'Above ₹1,00,000', short: 'Above ₹1L', min: 100000, max: Infinity }
];

const EXTRA_UNDER_BANDS = [
  { slug: 'under-20000', label: 'Under ₹20,000', short: 'Under ₹20k', min: 0, max: 19999 },
  { slug: 'under-30000', label: 'Under ₹30,000', short: 'Under ₹30k', min: 0, max: 29999 },
  { slug: 'under-40000', label: 'Under ₹40,000', short: 'Under ₹40k', min: 0, max: 39999 },
  { slug: 'under-50000', label: 'Under ₹50,000', short: 'Under ₹50k', min: 0, max: 49999 },
];

function phonesInBand(phones, band) {
  return phones
    .filter((p) => inrPrice(p) >= Math.max(band.min, 1) && inrPrice(p) <= band.max)
    .sort((a, b) => (b.score || 0) - (a.score || 0) || inrPrice(b) - inrPrice(a));
}

const priceRange = (list) => {
  const prices = list.map(inrPrice).filter(Boolean).sort((a, b) => a - b);
  if (!prices.length) return '';
  return prices[0] === prices[prices.length - 1]
    ? formatINR(prices[0])
    : `${formatINR(prices[0])} – ${formatINR(prices[prices.length - 1])}`;
};

function buildComparePairs(phones) {
  const pairs = new Map();
  const add = (a, b) => {
    if (!a || !b || a.slug === b.slug) return;
    const [first, second] = [a.slug, b.slug].sort();
    const key = `${first}-vs-${second}`;
    if (!pairs.has(key)) pairs.set(key, { key, a: first === a.slug ? a : b, b: first === a.slug ? b : a });
  };
  for (const phone of phones) {
    const sameCurrency = phones.filter((p) => p !== phone && p.price?.currency === phone.price?.currency && p.price?.amount);
    if (phone.price?.amount) {
      sameCurrency
        .map((p) => ({ p, gap: Math.abs(p.price.amount - phone.price.amount) }))
        .filter((x) => x.gap <= Math.max(phone.price.amount * 0.6, 4000))
        .sort((x, y) => x.gap - y.gap)
        .slice(0, 3)
        .forEach((x) => add(phone, x.p));
    }
    phones
      .filter((p) => p !== phone && p.brand === phone.brand)
      .sort((x, y) => (inrPrice(x) || x.price?.amount || 0) - (inrPrice(y) || y.price?.amount || 0))
      .slice(0, 2)
      .forEach((p) => add(phone, p));
  }
  return [...pairs.values()].sort((x, y) => {
    const sameBrand = (x.a.brand === x.b.brand ? 1 : 0) - (y.a.brand === y.b.brand ? 1 : 0);
    if (sameBrand) return -sameBrand;
    return (y.a.score || 0) + (y.b.score || 0) - ((x.a.score || 0) + (x.b.score || 0));
  });
}

function compareSpecRows(a, b) {
  const groups = [...PHONE_GROUPS, ...Object.keys(a.specs || {}), ...Object.keys(b.specs || {})];
  const seen = new Set();
  const out = [];
  for (const group of groups) {
    if (seen.has(group)) continue;
    seen.add(group);
    const left = a.specs?.[group] || [];
    const right = b.specs?.[group] || [];
    if (!left.length && !right.length) continue;
    const labels = [...new Set([...left.map((s) => s.label), ...right.map((s) => s.label)])];
    const rows = labels.map((label) => {
      const av = left.find((s) => s.label === label)?.value || '';
      const bv = right.find((s) => s.label === label)?.value || '';
      const norm = (v) => v.toLowerCase().replace(/\s+/g, ' ').trim();
      return { label, a: av, b: bv, diff: !!(av && bv) && norm(av) !== norm(bv) };
    });
    if (rows.length) out.push({ group, rows });
  }
  return out;
}

function compareHighlights(a, b) {
  const fa = phoneFacts(a);
  const fb = phoneFacts(b);
  const facts = [];
  const pa = inrPrice(a);
  const pb = inrPrice(b);
  if (pa && pb) {
    facts.push(pa === pb
      ? `Both listed at ${formatINR(pa)}.`
      : `${pa < pb ? a.name : b.name} is cheaper by ${formatINR(Math.abs(pa - pb))}.`);
  }
  if (a.score && b.score && a.score !== b.score) {
    facts.push(`Editorial score: ${a.name} ${a.score}, ${b.name} ${b.score}.`);
  }
  if (fa.battery && fb.battery && fa.battery !== fb.battery) {
    facts.push(`${fa.battery > fb.battery ? a.name : b.name} has the larger battery (${Math.max(fa.battery, fb.battery)}mAh vs ${Math.min(fa.battery, fb.battery)}mAh).`);
  }
  if (fa.chargingW && fb.chargingW && fa.chargingW !== fb.chargingW) {
    facts.push(`${fa.chargingW > fb.chargingW ? a.name : b.name} charges faster (${Math.max(fa.chargingW, fb.chargingW)}W vs ${Math.min(fa.chargingW, fb.chargingW)}W wired).`);
  }
  if (fa.ram !== fb.ram && fa.ram && fb.ram) {
    facts.push(`${fa.ram > fb.ram ? a.name : b.name} offers more RAM (${Math.max(fa.ram, fb.ram)}GB vs ${Math.min(fa.ram, fb.ram)}GB).`);
  }
  if (fa.storage !== fb.storage && fa.storage && fb.storage) {
    facts.push(`${fa.storage > fb.storage ? a.name : b.name} offers more storage (${Math.max(fa.storage, fb.storage)}GB vs ${Math.min(fa.storage, fb.storage)}GB).`);
  }
  if (fa.screenIn && fb.screenIn && fa.screenIn !== fb.screenIn) {
    facts.push(`Display: ${fa.screenIn}" on ${a.name} vs ${fb.screenIn}" on ${b.name}.`);
  }
  if (fa.weightG && fb.weightG && fa.weightG !== fb.weightG) {
    facts.push(`${fa.weightG < fb.weightG ? a.name : b.name} is lighter (${Math.min(fa.weightG, fb.weightG)}g vs ${Math.max(fa.weightG, fb.weightG)}g).`);
  }
  if (fa.has5G !== fb.has5G) {
    facts.push(`${fa.has5G ? a.name : b.name} supports 5G; the other does not.`);
  }
  if (fa.refreshHz && fb.refreshHz && fa.refreshHz !== fb.refreshHz) {
    facts.push(`Refresh rate: ${fa.refreshHz}Hz on ${a.name} vs ${fb.refreshHz}Hz on ${b.name}.`);
  }
  return facts;
}


/* ---------------------------------------------------------------------------
 * Brand hubs, comparison pages and price lists
 * ------------------------------------------------------------------------- */

const compareKey = (a, b) => {
  const [first, second] = [a.slug, b.slug].sort();
  return `${first}-vs-${second}`;
};

function brandStats(list) {
  const withPrice = list.filter((p) => inrPrice(p));
  const cheapest = withPrice.slice().sort((a, b) => inrPrice(a) - inrPrice(b))[0];
  const priciest = withPrice.slice().sort((a, b) => inrPrice(b) - inrPrice(a))[0];
  const fiveG = list.filter((p) => phoneFacts(p).has5G).length;
  return { cheapest, priciest, fiveG, withPrice };
}

function renderBrandLogo(brand, rootPrefix = '../', large = false) {
  const slug = brandSlug(brand);
  for (const ext of ['png', 'webp', 'svg', 'jpg']) {
    if (fs.existsSync(path.join(ROOT, `src/assets/brands/${slug}.${ext}`))) {
      return `<img class="brand-logo${large ? ' brand-logo-lg' : ''}" src="${rootPrefix}assets/brands/${slug}.${ext}" alt="${esc(brand)} logo" loading="lazy"/>`;
    }
  }
  return `<span class="brand-monogram${large ? ' brand-monogram-lg' : ''}">${esc(brandInitials(brand))}</span>`;
}

function renderBrandIndex(phones, config) {
  const brands = [...new Set(phones.map((p) => p.brand).filter(Boolean))]
    .map((brand) => ({ brand, list: phones.filter((p) => p.brand === brand) }))
    .sort((a, b) => b.list.length - a.list.length || a.brand.localeCompare(b.brand));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Mobile Phone Brands | ${config.siteName}`,
    url: `${config.siteUrl}/mobile-brands/`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: brands.length,
      itemListElement: brands.map(({ brand, list }, i) => ({
        '@type': 'ListItem', position: i + 1, name: brand,
        url: `${config.siteUrl}/mobile-brands/${brandSlug(brand)}/`,
      })),
    },
  };

  return `${renderHead({
    title: `Mobile Phone Brands — Specs & Prices | ${config.siteName}`,
    description: `Browse ${brands.length} mobile phone brands and ${phones.length} models with full specifications and prices.`,
    canonicalUrl: `${config.siteUrl}/mobile-brands/`,
    jsonLdList: [schema],
    assetPrefix: '../',
  })}
<body>
${renderHeader('../', 'mobile-brands')}
<main class="container">
  <nav class="breadcrumbs"><a href="../">Home</a> › <a href="../mobile/">Phones</a> › <span>Brands</span></nav>
  <section class="page-hero">
    <h1>Mobile Phone <span class="price-highlight">Brands</span></h1>
    <p class="hero-desc">${brands.length} brands · ${phones.length} models with full specifications and prices.</p>
  </section>
  <div class="brand-grid">
    ${brands.map(({ brand, list }) => {
      const stats = brandStats(list);
      return `<a class="brand-card" href="${brandSlug(brand)}/">
        ${renderBrandLogo(brand, '../')}
        <span class="brand-card-body">
          <strong>${esc(brand)}</strong>
          <span>${list.length} ${list.length === 1 ? 'model' : 'models'}${stats.fiveG ? ` · ${stats.fiveG} with 5G` : ''}</span>
          ${priceRange(list) ? `<span class="brand-range">${priceRange(list)}</span>` : ''}
        </span>
      </a>`;
    }).join('')}
  </div>
</main>
${renderFooter('../')}`;
}

function renderBrandPage(brand, list, allPhones, config, pairs = []) {
  const rootPrefix = '../../';
  const slug = brandSlug(brand);
  const canonicalUrl = `${config.siteUrl}/mobile-brands/${slug}/`;
  const byPrice = list.slice().sort((a, b) => (inrPrice(a) || Infinity) - (inrPrice(b) || Infinity));
  const latest = list.slice().sort((a, b) => phoneFacts(b).availabilityTs - phoneFacts(a).availabilityTs).slice(0, 8);
  const stats = brandStats(list);
  const compareLinks = pairs
    .filter((p) => p.a.brand === brand && p.b.brand === brand)
    .slice(0, 4)
    .map((p) => ({ a: p.a, b: p.b, key: p.key }));
  const otherBrands = [...new Set(allPhones.map((p) => p.brand).filter((b) => b && b !== brand))].sort();
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${brand} Phones — Specs & Prices`,
      url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: list.length,
        itemListElement: byPrice.map((p, i) => ({
          '@type': 'ListItem', position: i + 1, name: p.name,
          url: `${config.siteUrl}/mobile/${p.slug}/`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${config.siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: `${config.siteUrl}/mobile-brands/` },
        { '@type': 'ListItem', position: 3, name: brand, item: canonicalUrl },
      ],
    },
  ];

  return `${renderHead({
    title: `${brand} Phones — Specs, Prices & Models | ${config.siteName}`,
    description: `All ${list.length} ${brand} mobile phones with full specifications and prices${priceRange(list) ? `, from ${priceRange(list)}` : ''}.`,
    canonicalUrl,
    jsonLdList: schema,
    assetPrefix: rootPrefix,
  })}
<body>
${renderHeader(rootPrefix, 'mobile-brands')}
<main class="container">
  <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <a href="${rootPrefix}mobile-brands/">Brands</a> › <span>${esc(brand)}</span></nav>
  <section class="brand-hero">
    ${renderBrandLogo(brand, rootPrefix, true)}
    <div>
      <h1>${esc(brand)} <span class="price-highlight">Phones</span></h1>
      <p class="hero-desc">${list.length} ${list.length === 1 ? 'model' : 'models'}${priceRange(list) ? ` · ${priceRange(list)}` : ''}${stats.fiveG ? ` · ${stats.fiveG} with 5G` : ''}</p>
    </div>
  </section>

  <div class="stat-strip">
    <div class="stat-cell"><strong>${list.length}</strong><span>Models</span></div>
    <div class="stat-cell"><strong>${stats.fiveG}</strong><span>5G models</span></div>
    <div class="stat-cell"><strong>${stats.cheapest ? formatINR(inrPrice(stats.cheapest)) : '—'}</strong><span>Cheapest</span></div>
    <div class="stat-cell"><strong>${stats.priciest ? formatINR(inrPrice(stats.priciest)) : '—'}</strong><span>Most expensive</span></div>
  </div>

  ${latest.length ? `
  <section class="section-card">
    <h2>Latest ${esc(brand)} Phones</h2>
    <div class="mini-grid">
      ${latest.map((p) => renderPhoneCard(p, rootPrefix, config, true)).join('')}
    </div>
  </section>` : ''}

  <section class="section-card">
    <h2>All ${esc(brand)} Phones by Price</h2>
    <div class="mini-grid">
      ${byPrice.map((p) => renderPhoneCard(p, rootPrefix, config)).join('')}
    </div>
  </section>

  ${compareLinks.length ? `
  <section class="section-card">
    <h2>Compare ${esc(brand)} Phones</h2>
    <div class="compare-link-list">
      ${compareLinks.map(({ a, b, key }) => `<a class="compare-link" href="${rootPrefix}compare/${key}/">
        <span>${esc(a.name)}</span><em>vs</em><span>${esc(b.name)}</span></a>`).join('')}
    </div>
  </section>` : ''}

  <section class="section-card">
    <h2>Other Brands</h2>
    <div class="chip-row">
      ${otherBrands.map((b) => `<a class="chip" href="${rootPrefix}mobile-brands/${brandSlug(b)}/">${esc(b)}</a>`).join('')}
    </div>
  </section>
</main>
${renderFooter(rootPrefix)}`;
}

function renderCompareHub(pairs, phones, config) {
  const featured = pairs
    .slice()
    .sort((x, y) => (y.a.score || 0) + (y.b.score || 0) - ((x.a.score || 0) + (x.b.score || 0)))
    .slice(0, 12);

  const grouped = PRICE_BANDS.map((band) => ({
    band,
    items: pairs.filter((p) => {
      const price = Math.min(inrPrice(p.a) || Infinity, inrPrice(p.b) || Infinity);
      return price >= Math.max(band.min, 1) && price <= band.max;
    }),
  })).filter((g) => g.items.length);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Mobile Phone Comparisons | ${config.siteName}`,
    url: `${config.siteUrl}/compare/`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: pairs.length,
      itemListElement: featured.map((p, i) => ({
        '@type': 'ListItem', position: i + 1, name: `${p.a.name} vs ${p.b.name}`,
        url: `${config.siteUrl}/compare/${p.key}/`,
      })),
    },
  };

  return `${renderHead({
    title: `Mobile Phone Comparisons — Spec by Spec | ${config.siteName}`,
    description: `Compare ${pairs.length} mobile phone pairings side by side: price, processor, display, camera, battery and every listed specification.`,
    canonicalUrl: `${config.siteUrl}/compare/`,
    jsonLdList: [schema],
    assetPrefix: '../',
  })}
<body>
${renderHeader('../', 'compare')}
<main class="container">
  <nav class="breadcrumbs"><a href="../">Home</a> › <a href="../mobile/">Phones</a> › <span>Compare</span></nav>
  <section class="page-hero">
    <h1>Compare <span class="price-highlight">Mobile Phones</span></h1>
    <p class="hero-desc">${pairs.length} head-to-head pages covering price, performance, cameras, battery and every listed specification.</p>
  </section>

  <section class="section-card">
    <h2>Featured Comparisons</h2>
    <div class="compare-link-list">
      ${featured.map((p) => `<a class="compare-link" href="${p.key}/">
        <span>${esc(p.a.name)}</span><em>vs</em><span>${esc(p.b.name)}</span></a>`).join('')}
    </div>
  </section>

  ${grouped.map(({ band, items }) => `
  <section class="section-card">
    <h2>${esc(band.label)}</h2>
    <div class="compare-link-list">
      ${items.map((p) => `<a class="compare-link" href="${p.key}/">
        <span>${esc(p.a.name)}</span><em>vs</em><span>${esc(p.b.name)}</span></a>`).join('')}
    </div>
  </section>`).join('')}
</main>
${renderFooter('../')}`;
}

function renderComparePage(pair, allPairs, config) {
  const { a, b } = pair;
  const rootPrefix = '../../';
  const canonicalUrl = `${config.siteUrl}/compare/${pair.key}/`;
  const rows = compareSpecRows(a, b);
  const facts = compareHighlights(a, b);
  const diffCount = rows.reduce((n, g) => n + g.rows.filter((r) => r.diff).length, 0);
  const similar = allPairs
    .filter((p) => p.key !== pair.key)
    .map((p) => ({ p, score: (p.a.brand === a.brand ? 1 : 0) + (p.b.brand === b.brand ? 1 : 0) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, 5)
    .map((x) => x.p);

  const card = (phone) => {
    const src = phoneImageSrc(phone, rootPrefix, config);
    return `<div class="compare-card">
      <a class="compare-card-media" href="${rootPrefix}mobile/${esc(phone.slug)}/">${src
        ? `<img src="${esc(src)}" alt="${esc(phone.name)}" width="180" height="180" loading="lazy"/>`
        : deviceSvg('Smartphones')}</a>
      <h2><a href="${rootPrefix}mobile/${esc(phone.slug)}/">${esc(phone.name)}</a></h2>
      <div class="compare-price">${esc(formatPhonePrice(phone) || 'Price not listed')}</div>
      <div class="hero-meta">
        ${phone.brand ? `<span class="meta-pill">${esc(phone.brand)}</span>` : ''}
        ${phone.score ? `<span class="meta-pill">Score ${phone.score}</span>` : ''}
        ${phoneFacts(phone).has5G ? '<span class="meta-pill">5G</span>' : ''}
      </div>
      <ul class="compare-quick">
        ${['Processor', 'Display', 'Battery', 'Rear Camera'].map((key) => phone.highlights?.[key]
          ? `<li><span>${esc(key)}</span><strong>${formatSpecHtml(phone.highlights[key], rootPrefix)}</strong></li>` : '').join('')}
      </ul>
      <a class="spec-full-link" href="${rootPrefix}mobile/${esc(phone.slug)}/">Full specifications ›</a>
    </div>`;
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${a.name} vs ${b.name}`,
    url: canonicalUrl,
    mainEntity: [a, b].map((p) => ({
      '@type': 'Product',
      name: p.name,
      brand: { '@type': 'Brand', name: p.brand },
      url: `${config.siteUrl}/mobile/${p.slug}/`,
      ...(phoneImageAbs(p, config) ? { image: [phoneImageAbs(p, config)] } : {}),
      ...(p.price?.amount ? { offers: { '@type': 'Offer', price: p.price.amount, priceCurrency: p.price.currency === '₹' ? 'INR' : p.price.currency === '¥' ? 'CNY' : 'USD' } } : {}),
    })),
  };

  return `${renderHead({
    title: `${a.name} vs ${b.name} — Specs & Price Comparison | ${config.siteName}`,
    description: `${a.name} vs ${b.name}: compare prices, processor, display, camera, battery and full specifications side by side.`,
    canonicalUrl,
    jsonLdList: [schema],
    assetPrefix: rootPrefix,
  })}
<body>
${renderHeader(rootPrefix, 'compare')}
<main class="container">
  <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <a href="${rootPrefix}compare/">Compare</a> › <span>${esc(a.name)} vs ${esc(b.name)}</span></nav>
  <section class="page-hero compare-hero">
    <h1>${esc(a.name)} <span class="vs-word">vs</span> ${esc(b.name)}</h1>
    <p class="hero-desc">${diffCount} specification ${diffCount === 1 ? 'difference' : 'differences'} across ${rows.length} sections.</p>
  </section>

  <div class="compare-grid">
    ${card(a)}
    ${card(b)}
  </div>

  ${facts.length ? `
  <section class="section-card">
    <h2>At a Glance</h2>
    <ul class="fact-list">${facts.map((f) => `<li>${formatSpecHtml(f, rootPrefix)}</li>`).join('')}</ul>
  </section>` : ''}

  <section class="section-card">
    <h2>Specifications Compared</h2>
    <div class="compare-legend"><span class="legend-diff"></span> rows that differ</div>
    ${rows.map((group) => `
      <div class="compare-group">
        <h3>${esc(group.group)}</h3>
        <table class="compare-table">
          <thead><tr><th>Specification</th><th><a href="${rootPrefix}mobile/${esc(a.slug)}/">${esc(a.name)}</a></th><th><a href="${rootPrefix}mobile/${esc(b.slug)}/">${esc(b.name)}</a></th></tr></thead>
          <tbody>
            ${group.rows.map((row) => `<tr class="${row.diff ? 'is-diff' : ''}">
              <th>${esc(row.label)}</th>
              <td>${row.a ? formatSpecHtml(row.a, rootPrefix) : '<span class="na">—</span>'}</td>
              <td>${row.b ? formatSpecHtml(row.b, rootPrefix) : '<span class="na">—</span>'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`).join('')}
  </section>

  ${similar.length ? `
  <section class="section-card">
    <h2>Similar Comparisons</h2>
    <div class="compare-link-list">
      ${similar.map((p) => `<a class="compare-link" href="${rootPrefix}compare/${p.key}/">
        <span>${esc(p.a.name)}</span><em>vs</em><span>${esc(p.b.name)}</span></a>`).join('')}
    </div>
  </section>` : ''}
</main>
${renderFooter(rootPrefix)}`;
}

function renderPriceListIndex(phones, config) {
  const bands = PRICE_BANDS.map((band) => ({ band, list: phonesInBand(phones, band) })).filter((x) => x.list.length);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Mobile Phone Price List | ${config.siteName}`,
    url: `${config.siteUrl}/mobile-price-list/`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: bands.length,
      itemListElement: bands.map(({ band, list }, i) => ({
        '@type': 'ListItem', position: i + 1, name: band.label,
        url: `${config.siteUrl}/mobile-price-list/${band.slug}/`,
      })),
    },
  };
  return `${renderHead({
    title: `Mobile Phone Price List — Every Budget | ${config.siteName}`,
    description: `Browse mobile phones by price band from under ₹10,000 to above ₹1,00,000, with full specifications and prices.`,
    canonicalUrl: `${config.siteUrl}/mobile-price-list/`,
    jsonLdList: [schema],
    assetPrefix: '../',
  })}
<body>
${renderHeader('../', 'mobile-price-list')}
<main class="container">
  <nav class="breadcrumbs"><a href="../">Home</a> › <a href="../mobile/">Phones</a> › <span>Price List</span></nav>
  <section class="page-hero">
    <h1>Mobile Phone <span class="price-highlight">Price List</span></h1>
    <p class="hero-desc">Pick a budget and see every model we track, cheapest first.</p>
  </section>
  <div class="band-grid">
    ${bands.map(({ band, list }) => `<a class="band-card" href="${band.slug}/">
      <strong>${esc(band.label)}</strong>
      <span>${list.length} ${list.length === 1 ? 'phone' : 'phones'}</span>
      <small>${list.slice(0, 3).map((p) => esc(p.name)).join(' · ')}${list.length > 3 ? ' …' : ''}</small>
    </a>`).join('')}
  </div>
</main>
${renderFooter('../')}`;
}

function renderPriceBandPage(band, list, allBands, config) {
  const rootPrefix = '../../';
  const canonicalUrl = `${config.siteUrl}/mobile-price-list/${band.slug}/`;
  const monthYear = formatMonthYear(new Date().toISOString());
  const priced = list.filter((p) => inrPrice(p));
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Phones ${band.label}`,
    itemListElement: priced.map((p, i) => ({
      '@type': 'ListItem', position: i + 1, name: p.name, url: `${config.siteUrl}/mobile/${p.slug}/`,
    })),
  };
  return `${renderHead({
    title: `Phones ${band.label} (${monthYear}) — Specs & Prices | ${config.siteName}`,
    description: `${priced.length} mobile phones ${band.label.toLowerCase()}, cheapest first, with full specifications and listed prices.`,
    canonicalUrl,
    jsonLdList: [schema],
    assetPrefix: rootPrefix,
  })}
<body>
${renderHeader(rootPrefix, band.slug.startsWith('under-') ? band.slug : 'mobile-price-list')}
<main class="container">
  <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <a href="${rootPrefix}mobile-price-list/">Price List</a> › <span>${esc(band.short)}</span></nav>
  <section class="page-hero">
    <h1><span class="price-highlight">${priced.length}</span> Phones ${esc(band.label)}</h1>
    <p class="hero-desc">Sorted by highest overall score first. Use the sort menu below to arrange by price.</p>
  </section>
  <div class="chip-row band-chips">
    ${allBands.map((b) => `<a class="chip ${b.slug === band.slug ? 'chip-active' : ''}" href="${rootPrefix}mobile-price-list/${b.slug}/">${esc(b.short)}</a>`).join('')}
  </div>
  <div class="listing-toolbar">
    <div class="listing-sort-wrap">
      <label class="muted" for="listing-sort">Sort:</label>
      <select id="listing-sort" class="sort-select">
        <option value="default">Best Score</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="refresh">Refresh Rate</option>
      </select>
      <span class="muted" id="listing-count">${priced.length} phones</span>
    </div>
  </div>
  <section class="section-card">
    <div class="mini-grid" data-listing-grid>
      ${priced.map((p) => renderPhoneCard(p, rootPrefix, config)).join('')}
    </div>
  </section>
</main>
${renderFooter(rootPrefix)}`;
}

const SPEC_ICONS = {
  processor: `<svg viewBox="0 0 32 32" fill="none"><rect x="7" y="7" width="18" height="18" rx="4" fill="#6366f1"/><rect x="11" y="11" width="10" height="10" rx="2" fill="#38bdf8"/><path d="M12 3v4M20 3v4M12 25v4M20 25v4M3 12h4M3 20h4M25 12h4M25 20h4" stroke="#818cf8" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  display: `<svg viewBox="0 0 32 32" fill="none"><rect x="7" y="3" width="18" height="26" rx="4" fill="#3b82f6"/><rect x="9.5" y="5.5" width="13" height="21" rx="2" fill="#38bdf8"/><path d="M12 10l8 8M12 16l5 5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".9"/></svg>`,
  battery: `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="9" width="22" height="14" rx="3.5" fill="#10b981"/><rect x="26" y="13" width="3" height="6" rx="1.5" fill="#059669"/><path d="M16 11.5l-3.5 5h3l-1 4 4-5.5h-3l.5-3.5z" fill="#fde047"/></svg>`,
  'rear camera': `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="7" width="24" height="18" rx="5" fill="#8b5cf6"/><circle cx="15" cy="16" r="5.5" fill="#1e1b4b"/><circle cx="15" cy="16" r="3" fill="#38bdf8"/><circle cx="23" cy="11" r="1.5" fill="#fde047"/></svg>`,
  'main camera': `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="7" width="24" height="18" rx="5" fill="#8b5cf6"/><circle cx="15" cy="16" r="5.5" fill="#1e1b4b"/><circle cx="15" cy="16" r="3" fill="#38bdf8"/><circle cx="23" cy="11" r="1.5" fill="#fde047"/></svg>`,
  'front camera': `<svg viewBox="0 0 32 32" fill="none"><rect x="8" y="3" width="16" height="26" rx="4" fill="#ec4899"/><rect x="10.5" y="5.5" width="11" height="21" rx="2" fill="#fdf2f8"/><circle cx="16" cy="9" r="2.2" fill="#db2777"/><circle cx="16" cy="17.5" r="4" fill="#f472b6"/></svg>`,
  'selfie camera': `<svg viewBox="0 0 32 32" fill="none"><rect x="8" y="3" width="16" height="26" rx="4" fill="#ec4899"/><rect x="10.5" y="5.5" width="11" height="21" rx="2" fill="#fdf2f8"/><circle cx="16" cy="9" r="2.2" fill="#db2777"/><circle cx="16" cy="17.5" r="4" fill="#f472b6"/></svg>`,
  'ram/storage': `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="8" width="24" height="15" rx="3" fill="#f59e0b"/><rect x="7" y="11" width="4" height="7" rx="1" fill="#fef3c7"/><rect x="14" y="11" width="4" height="7" rx="1" fill="#fef3c7"/><rect x="21" y="11" width="4" height="7" rx="1" fill="#fef3c7"/><path d="M8 23v3M13 23v3M19 23v3M24 23v3" stroke="#d97706" stroke-width="2" stroke-linecap="round"/></svg>`,
  memory: `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="8" width="24" height="15" rx="3" fill="#f59e0b"/><rect x="7" y="11" width="4" height="7" rx="1" fill="#fef3c7"/><rect x="14" y="11" width="4" height="7" rx="1" fill="#fef3c7"/><rect x="21" y="11" width="4" height="7" rx="1" fill="#fef3c7"/><path d="M8 23v3M13 23v3M19 23v3M24 23v3" stroke="#d97706" stroke-width="2" stroke-linecap="round"/></svg>`,
  general: `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill="#0ea5e9"/><rect x="14.5" y="13" width="3" height="9" rx="1.5" fill="#ffffff"/><circle cx="16" cy="9.5" r="1.8" fill="#ffffff"/></svg>`,
  body: `<svg viewBox="0 0 32 32" fill="none"><rect x="8" y="3" width="16" height="26" rx="4" fill="#64748b"/><rect x="10" y="5" width="12" height="22" rx="2.5" fill="#cbd5e1"/><path d="M13 7.5h6" stroke="#475569" stroke-width="2" stroke-linecap="round"/></svg>`,
  'operating system': `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill="#22c55e"/><path d="M11 18c0-2.8 2.2-5 5-5s5 2.2 5 5v3H11v-3z" fill="#ffffff"/><path d="M12.5 12l-1.5-2.5M19.5 12l1.5-2.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>`,
  network: `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="20" width="4" height="7" rx="1.5" fill="#38bdf8"/><rect x="10.5" y="15" width="4" height="12" rx="1.5" fill="#3b82f6"/><rect x="17" y="10" width="4" height="17" rx="1.5" fill="#6366f1"/><rect x="23.5" y="5" width="4" height="22" rx="1.5" fill="#8b5cf6"/></svg>`,
  connectivity: `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="23" r="2.8" fill="#06b6d4"/><path d="M10.5 18a7.8 7.8 0 0 1 11 0M6.5 13.5a13.5 13.5 0 0 1 19 0" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  features: `<svg viewBox="0 0 32 32" fill="none"><path d="M16 4l3.3 6.8 7.5 1.1-5.4 5.3 1.3 7.5L16 21.1l-6.7 3.6 1.3-7.5-5.4-5.3 7.5-1.1L16 4z" fill="#f43f5e"/><circle cx="16" cy="15.5" r="3" fill="#fde047"/></svg>`,
};

function specIcon(label) {
  return SPEC_ICONS[String(label || '').trim().toLowerCase()] || SPEC_ICONS.features;
}

function formatSpecHtml(val, rootPrefix = './') {
  const safe = esc(val);
  if (!/antutu/i.test(safe)) return safe;
  const icon = `<img class="antutu-badge-icon" src="${rootPrefix}assets/icons/antutu.jpg" alt="AnTuTu" width="16" height="16" loading="lazy"/>`;
  return safe.replace(/\b(antutu(?:\s+score)?)\b/gi, `${icon} $1`);
}

function renderSpecGroup(group, entries, rootPrefix = '../../') {
  return `
      <section class="section-card spec-group" id="spec-${esc(slugifyGroup(group))}">
        <h2 class="spec-group-title"><span class="spec-ico spec-ico-lg">${specIcon(group)}</span><span>${esc(group)}</span></h2>
        <table class="spec-table">
          <tbody>
            ${entries.map((entry) => `
              <tr><th>${esc(entry.label)}</th><td>${formatSpecHtml(entry.value, rootPrefix)}${(entry.children || []).map((child) => `
                <span class="spec-sub"><span class="spec-sub-label">${esc(child.label)}</span> <span class="spec-sub-value">${formatSpecHtml(child.value, rootPrefix)}</span></span>`).join('')}</td></tr>`).join('')}
          </tbody>
        </table>
      </section>`;
}

function renderPhonePage(phone, allPhones, config, pairs = []) {
  const rootPrefix = '../../';
  const canonicalUrl = `${config.siteUrl}/mobile/${phone.slug}/`;
  const groups = Object.keys(phone.specs || {});
  const priceText = formatPhonePrice(phone);
  const localRel = PHONE_IMAGE_EXTS
    .map((ext) => `assets/phones/${phone.slug}.${ext}`)
    .find((rel) => fs.existsSync(path.join(ROOT, 'src', rel)));
  const remoteImage = config.useRemoteImages
    ? (phone.gallery || []).find((g) => /design/i.test(g.category || '') && g.url)?.url || phone.gallery?.[0]?.url || null
    : null;
  const image = localRel ? `${config.siteUrl}/${localRel}` : remoteImage;
  const imageSrc = localRel ? `${rootPrefix}${localRel}` : remoteImage || '';
  const sameBrand = allPhones.filter((p) => p.slug !== phone.slug && p.brand && p.brand === phone.brand).slice(0, 6);
  const priceBand = phone.price?.amount
    ? allPhones.filter((p) => p.slug !== phone.slug && p.price?.currency === phone.price.currency
        && Math.abs(p.price.amount - phone.price.amount) <= Math.max(phone.price.amount * 0.25, 3000)).slice(0, 6)
    : [];
  const compareWith = pairs
    .filter((p) => p.a.slug === phone.slug || p.b.slug === phone.slug)
    .map((p) => ({ key: p.key, other: p.a.slug === phone.slug ? p.b : p.a }))
    .sort((x, y) => {
      if (!phone.price?.amount) return 0;
      const gap = (o) => (o.price?.currency === phone.price.currency ? Math.abs(o.price.amount - phone.price.amount) : Infinity);
      return gap(x.other) - gap(y.other);
    })
    .slice(0, 4);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: phone.name,
    brand: { '@type': 'Brand', name: phone.brand },
    ...(phone.score ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: (phone.score / 20).toFixed(1), bestRating: '5', ratingCount: 1 } } : {}),
    ...(image ? { image: [image] } : {}),
    ...(phone.price?.amount ? {
      offers: { '@type': 'Offer', priceCurrency: phone.price.currency === '₹' ? 'INR' : phone.price.currency, price: phone.price.amount, availability: 'https://schema.org/InStock' }
    } : {}),
    additionalProperty: groups.flatMap((g) => phone.specs[g].filter((s) => s.value).slice(0, 6).map((s) => ({
      '@type': 'PropertyValue', name: s.label, value: s.value,
    }))),
  };

  return `${renderHead({
    title: `${phone.name} Price${priceText ? ` (${priceText})` : ''} — Full Specs | ${config.siteName}`,
    description: `${phone.name} specifications and price. ${Object.entries(phone.highlights || {}).slice(0, 4).map(([k, v]) => `${k}: ${v}`).join(', ')}.`,
    canonicalUrl,
    jsonLdList: [schema],
    assetPrefix: rootPrefix,
    image,
  })}
<body>
${renderHeader(rootPrefix)}
<main class="container">
  <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <a href="${rootPrefix}mobile/">Phones</a> › <span>${esc(phone.name)}</span></nav>

  <section class="phone-hero">
    <div class="phone-hero-media">
      ${imageSrc
        ? `<img src="${esc(imageSrc)}" alt="${esc(phone.name)}" width="220" height="220" fetchpriority="high"/>`
        : deviceSvg('Smartphones')}
    </div>
    <div class="phone-hero-copy">
      <h1>${esc(phone.name)}${priceText ? ` <span class="price-highlight">${esc(priceText)}</span>` : ''}</h1>
      <div class="hero-meta">
        ${phone.marketStatus ? `<span class="status-badge">${esc(phone.marketStatus)}</span>` : ''}
        ${phone.brand ? `<span class="meta-pill">${esc(phone.brand)}</span>` : ''}
      </div>
    </div>
    ${phone.score ? `<div class="score-ring" style="background: conic-gradient(var(--primary) 0 ${Number(phone.score)}%, var(--border) ${Number(phone.score)}% 100%)" title="Score out of 100"><strong>${phone.score}</strong><span>Score</span></div>` : ''}
  </section>

  ${Object.keys(phone.highlights || {}).length ? `
  <section class="section-card">
    <h2>Key Highlights</h2>
    <table class="highlight-table"><tbody>
      ${Object.entries(phone.highlights).map(([k, v]) => `<tr><th><span class="spec-lbl-wrap"><span class="spec-ico">${specIcon(k)}</span><span class="spec-lbl">${esc(k)}</span></span></th><td>${formatSpecHtml(v, rootPrefix)}</td></tr>`).join('')}
    </tbody></table>
  </section>` : ''}

  <div class="spec-layout">
    <nav class="spec-nav" aria-label="Specification sections">
      ${groups.map((g) => `<a href="#spec-${esc(slugifyGroup(g))}" title="${esc(g)}"><span class="spec-ico">${specIcon(g)}</span><span>${esc(g)}</span></a>`).join('')}
    </nav>
    <div class="spec-body">
      ${groups.length ? groups.map((g) => renderSpecGroup(g, phone.specs[g], rootPrefix)).join('') : '<section class="section-card"><p>No specifications captured for this model yet.</p></section>'}
    </div>
  </div>

  ${sameBrand.length ? `
  <section class="section-card">
    <h2>More ${esc(phone.brand)} Phones</h2>
    <div class="mini-grid">
      ${sameBrand.map((p) => renderPhoneCard(p, rootPrefix, config, true)).join('')}
    </div>
  </section>` : ''}

  ${priceBand.length ? `
  <section class="section-card">
    <h2>Alternatives in a Similar Price Range</h2>
    <div class="mini-grid">
      ${priceBand.map((p) => renderPhoneCard(p, rootPrefix, config, true)).join('')}
    </div>
  </section>` : ''}

  ${compareWith.length ? `
  <section class="section-card">
    <h2>Compare ${esc(phone.name)} With</h2>
    <div class="compare-link-list">
      ${compareWith.map(({ key, other }) => `<a class="compare-link" href="${rootPrefix}compare/${key}/">
        <span>${esc(phone.name)}</span><em>vs</em><span>${esc(other.name)}</span></a>`).join('')}
    </div>
  </section>` : ''}
</main>
${renderFooter(rootPrefix)}`;
}

function renderPhoneIndex(phones, config) {
  const canonicalUrl = `${config.siteUrl}/mobile/`;
  const facts = phones.map((p) => ({ p, f: phoneFacts(p) }));
  const brands = [...new Set(phones.map((p) => p.brand).filter(Boolean))]
    .map((brand) => ({ brand, count: phones.filter((p) => p.brand === brand).length }))
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));
  const ramOptions = [...new Set(facts.map((x) => x.f.ram).filter(Boolean))].sort((a, b) => a - b);
  const storageOptions = [...new Set(facts.map((x) => x.f.storage).filter(Boolean))].sort((a, b) => a - b);
  const fiveGCount = facts.filter((x) => x.f.has5G).length;
  const priced = facts.filter((x) => x.f.price);
  const cheapest = priced.slice().sort((a, b) => a.f.price - b.f.price)[0];
  const newest = phones.slice().sort((a, b) => phoneFacts(b).availabilityTs - phoneFacts(a).availabilityTs)[0];
  const sorted = phones.slice().sort((a, b) => (b.score || 0) - (a.score || 0));

  return `${renderHead({
    title: `All Mobile Phones — Specs & Prices (${phones.length} Models) | ${config.siteName}`,
    description: `Browse ${phones.length} mobile phones from ${brands.length} brands with full specifications, prices, 5G support and scores. Filter by brand, RAM, storage and budget.`,
    canonicalUrl,
    jsonLdList: [{
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      numberOfItems: phones.length,
      itemListElement: phones.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${config.siteUrl}/mobile/${p.slug}/` })),
    }],
    assetPrefix: '../',
  })}
<body>
${renderHeader('../', 'mobile')}
<main class="container">
  <nav class="breadcrumbs"><a href="../">Home</a> › <span>Phones</span></nav>
  <section class="page-hero">
    <h1>All Mobile Phones <span class="price-highlight">${phones.length}</span></h1>
    <p class="hero-desc">Full specifications and listed prices for ${phones.length} models from ${brands.length} brands. The cheapest tracked model is ${esc(cheapest ? cheapest.p.name : '—')} at ${esc(cheapest ? formatINR(cheapest.f.price) : '—')}.</p>
  </section>

  <div class="stat-strip">
    <div class="stat-cell"><strong>${phones.length}</strong><span>Models</span></div>
    <div class="stat-cell"><strong>${brands.length}</strong><span>Brands</span></div>
    <div class="stat-cell"><strong>${fiveGCount}</strong><span>5G models</span></div>
    <div class="stat-cell"><strong>${esc(newest ? newest.name.replace(/^[A-Za-z+.]+ /, '') : '—')}</strong><span>Latest launch</span></div>
  </div>

  <div class="chip-row directory-actions">
    <a class="chip" href="../mobile-brands/">Browse brands</a>
    <a class="chip" href="../compare/">Compare phones</a>
    <a class="chip" href="../mobile-price-list/">Price list</a>
  </div>

  <div class="phone-toolbar" id="phone-toolbar">
    <label class="filter-field">Budget
      <select id="phone-max">
        <option value="">Any budget</option>
        <option value="10000">Under ₹10,000</option>
        <option value="15000">Under ₹15,000</option>
        <option value="20000">Under ₹20,000</option>
        <option value="30000">Under ₹30,000</option>
        <option value="50000">Under ₹50,000</option>
        <option value="100000">Under ₹1,00,000</option>
      </select>
    </label>
    <label class="filter-field">Brand
      <select id="phone-brand">
        <option value="all">All brands</option>
        ${brands.map(({ brand, count }) => `<option value="${esc(brand)}">${esc(brand)} (${count})</option>`).join('')}
      </select>
    </label>
    <label class="filter-field">RAM
      <select id="phone-ram">
        <option value="all">Any RAM</option>
        ${ramOptions.map((ram) => `<option value="${ram}">${ram}GB+</option>`).join('')}
      </select>
    </label>
    <label class="filter-field">Storage
      <select id="phone-storage">
        <option value="all">Any storage</option>
        ${storageOptions.map((s) => `<option value="${s}">${s}GB+</option>`).join('')}
      </select>
    </label>
    <label class="filter-field">Network
      <select id="phone-5g">
        <option value="all">All networks</option>
        <option value="1">5G only</option>
        <option value="0">4G only</option>
      </select>
    </label>
    <label class="filter-field">Sort
      <select id="phone-sort">
        <option value="score">Highest score</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="camera">Best camera</option>
        <option value="battery">Biggest battery</option>
        <option value="display">Best display</option>
        <option value="name">Name A–Z</option>
      </select>
    </label>
    <button type="button" class="filter-reset" id="phone-reset">Reset</button>
    <span class="filter-count" id="phone-count">${phones.length} phones</span>
  </div>

  <div class="chip-row brand-chips">
    ${brands.map(({ brand, count }) => `<a class="chip" href="../mobile-brands/${brandSlug(brand)}/">${esc(brand)} <em>${count}</em></a>`).join('')}
  </div>

  <section class="section-card no-pad">
    <div class="mini-grid phone-directory" id="phone-directory">
      ${sorted.map((p) => renderPhoneCard(p, '../', config)).join('')}
    </div>
    <p class="empty-state" id="phone-empty" hidden>No phones match these filters. Try widening RAM, storage or network.</p>
  </section>
</main>
${renderFooter('../')}`;
}

/* ---------------------------------------------------------------------------
 * Editorial content generated from tracked specs (own wording, no copied prose)
 * ------------------------------------------------------------------------- */

const byAvailability = (a, b) => phoneFacts(b).availabilityTs - phoneFacts(a).availabilityTs;

function buildNewsArticle(phone, config) {
  const f = phoneFacts(phone);
  const price = formatPhonePrice(phone);
  const display = specValue(phone, 'Display', ['Display Size', 'Size']);
  const resolution = specValue(phone, 'Display', ['Display Resolution', 'Resolution']);
  const refresh = specValue(phone, 'Display', ['Refresh Rate']);
  const chipset = f.chipset || phone.highlights?.Processor || '';
  const mainCam = specValue(phone, 'Main Camera', ['Megapixel']);
  const selfie = specValue(phone, 'Selfie Camera', ['Front Camera #1 Megapixel', 'Megapixel']);
  const charging = specValue(phone, 'Battery', ['Charging Speed Wired', 'Charging']);
  const status = phone.marketStatus || '';
  const availability = f.availability;
  const state = /Upcoming/i.test(status)
    ? 'is listed as an upcoming launch'
    : /Not Released/i.test(status)
      ? 'has been listed online, but is not yet available in India'
      : 'is now listed';

  const title = `${phone.name} with ${chipset || 'new hardware'}${f.battery ? ` and ${f.battery}mAh battery` : ''} ${price ? `listed at ${price}` : 'listed online'}`;
  const excerpt = `${display ? `${display} display` : 'A new model'}${refresh ? ` at ${refresh}` : ''}, ${mainCam ? `${mainCam} main camera` : 'a multi-camera setup'} and ${f.battery ? `${f.battery}mAh` : 'a high-capacity'} battery.`;

  const paragraphs = [];
  paragraphs.push(`${phone.name} ${state}${availability ? ` with an availability date of ${availability}` : ''}${price ? `, carrying a listed price of ${price}` : ''}. It is a ${phone.brand} model with ${f.has5G ? '5G' : '4G'} connectivity.`);
  if (display || resolution) {
    paragraphs.push(`The display measures ${display || 'an unspecified size'}${resolution ? ` with a ${resolution} panel` : ''}${refresh ? ` and a ${refresh} refresh rate` : ''}. ${specValue(phone, 'Display', ['High Brightness']) ? `Peak brightness is listed at ${specValue(phone, 'Display', ['High Brightness'])}.` : ''}`);
  }
  if (chipset || f.ram) {
    paragraphs.push(`Powering the phone is ${chipset || 'an unspecified chipset'}${f.ram ? `, paired with ${f.ramText} of RAM` : ''}${f.storage ? ` and ${f.storageText} of storage` : ''}. ${specValue(phone, 'Operating System', ['OS']) ? `It runs ${specValue(phone, 'Operating System', ['OS'])}.` : ''}`);
  }
  if (mainCam || selfie) {
    paragraphs.push(`The rear camera setup is headlined by a ${mainCam || 'multi-lens'} sensor${selfie ? `, with a ${selfie} front camera` : ''}. ${specValue(phone, 'Main Camera', ['Video Recording']) ? `Video recording is listed at ${specValue(phone, 'Main Camera', ['Video Recording'])}.` : ''}`);
  }
  if (f.battery || f.chargingW) {
    paragraphs.push(`Inside is a ${f.battery ? `${f.battery}mAh` : 'high-capacity'} battery${f.chargingW ? ` with ${f.chargingW}W wired charging` : ''}${f.weightG ? `, in a body that weighs ${f.weightG}g` : ''}.`);
  }
  paragraphs.push(`Full specifications are available on the ${phone.name} page, and it can be lined up against similarly priced models in our comparison tool.`);

  return {
    slug: `${phone.slug}-launch`,
    kind: 'news',
    title,
    excerpt,
    author: 'Launch Desk',
    dateText: availability || formatMonthYear(new Date()),
    dateIso: new Date(f.availabilityTs || Date.now()).toISOString(),
    phone,
    imagePhone: phone,
    body: paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n'),
    keySpecs: [
      ['Display', display], ['Resolution', resolution], ['Refresh rate', refresh],
      ['Processor', chipset], ['RAM', f.ramText], ['Storage', f.storageText],
      ['Rear camera', mainCam], ['Front camera', selfie],
      ['Battery', f.battery ? `${f.battery}mAh` : ''], ['Charging', f.chargingW ? `${f.chargingW}W` : ''],
      ['Price', price],
    ].filter(([, v]) => v),
  };
}

function buildReviewArticle(phone, config) {
  const f = phoneFacts(phone);
  const price = formatPhonePrice(phone);
  const score = phone.score;
  const tier = score >= 90 ? 'flagship-grade' : score >= 80 ? 'well-rounded' : score >= 70 ? 'value-focused' : 'budget-first';
  const verdicts = {
    'flagship-grade': 'one of the strongest overall packages we track, with the price being the main thing to weigh up',
    'well-rounded': 'a balanced package that covers the important bases without obvious gaps in the listed specifications',
    'value-focused': 'a sensible pick when the listed price lines up with your budget, though some corners are visibly cut on paper',
    'budget-first': 'an entry-level option where the priority is the lowest possible price rather than headroom',
  };
  const title = `${phone.name} review: ${tier} ${price ? `at ${price}` : 'specs and price'}`;
  const excerpt = `Our data review of the ${phone.name}: ${phone.highlights?.Processor || 'processor'}, ${f.battery ? `${f.battery}mAh` : 'battery'} battery and a score of ${score}/100.`;
  const sections = [];
  if (specValue(phone, 'Display', ['Display Size', 'Size'])) {
    sections.push({ h: 'Display', p: `${specValue(phone, 'Display', ['Display Size', 'Size'])} ${specValue(phone, 'Display', ['Display Type']) || ''} panel${f.refreshHz ? ` running at ${f.refreshHz}Hz` : ''}${specValue(phone, 'Display', ['Display Resolution', 'Resolution']) ? `, ${specValue(phone, 'Display', ['Display Resolution', 'Resolution'])} resolution` : ''}. ${specValue(phone, 'Display', ['High Brightness']) ? `Brightness is listed up to ${specValue(phone, 'Display', ['High Brightness'])}.` : ''}`.replace(/\s+/g, ' ') });
  }
  if (f.chipset || specValue(phone, 'Processor', ['Number of Cores'])) {
    sections.push({ h: 'Performance', p: `${f.chipset || phone.highlights?.Processor || 'The chipset'} handles the compute side${specValue(phone, 'Processor', ['Number of Cores']) ? ` with ${specValue(phone, 'Processor', ['Number of Cores'])} cores` : ''}${specValue(phone, 'Processor', ['GPU']) ? ` and ${specValue(phone, 'Processor', ['GPU'])} graphics` : ''}. It ships with ${f.ramText || 'its listed memory'} RAM and ${f.storageText || 'its listed storage'} storage${specValue(phone, 'Memory', ['Storage Type']) ? ` (${specValue(phone, 'Memory', ['Storage Type'])})` : ''}.` });
  }
  const mainCam = specValue(phone, 'Main Camera', ['Megapixel']);
  if (mainCam) {
    sections.push({ h: 'Cameras', p: `The main sensor is listed at ${mainCam}${specValue(phone, 'Selfie Camera', ['Front Camera #1 Megapixel', 'Megapixel']) ? `, with a ${specValue(phone, 'Selfie Camera', ['Front Camera #1 Megapixel', 'Megapixel'])} selfie camera` : ''}. ${specValue(phone, 'Main Camera', ['Video Recording']) ? `Recording tops out at ${specValue(phone, 'Main Camera', ['Video Recording'])}.` : ''}` });
  }
  if (f.battery) {
    sections.push({ h: 'Battery and charging', p: `${f.battery}mAh capacity${f.chargingW ? ` with ${f.chargingW}W wired charging` : ''}${specValue(phone, 'Battery', ['Wireless Charging Support']) ? `; wireless charging support: ${specValue(phone, 'Battery', ['Wireless Charging Support'])}` : ''}.` });
  }
  if (price) {
    sections.push({ h: 'Price and value', p: `Listed at ${price}${f.has5G ? ' with 5G support' : ''}. At that price the package is ${verdicts[tier]}.` });
  }
  const body = [
    `<p>${esc(`${phone.name} is a ${phone.brand} ${f.has5G ? '5G' : '4G'} phone tracked at ${price || 'an unlisted price'}. This review is built from the specification data we hold for the model, updated as the listing changes.`)}</p>`,
    ...sections.map((s) => `<h3>${esc(s.h)}</h3>\n<p>${esc(s.p)}</p>`),
  ].join('\n');

  return {
    slug: `${phone.slug}-review`,
    kind: 'reviews',
    title,
    excerpt,
    author: 'Review Desk',
    dateText: formatMonthYear(new Date()),
    dateIso: new Date().toISOString(),
    score,
    phone,
    imagePhone: phone,
    body,
    keySpecs: [
      ['Score', `${score}/100`], ['Display', specValue(phone, 'Display', ['Display Size', 'Size'])],
      ['Processor', f.chipset], ['RAM', f.ramText], ['Storage', f.storageText],
      ['Main camera', mainCam], ['Battery', f.battery ? `${f.battery}mAh` : ''],
      ['Charging', f.chargingW ? `${f.chargingW}W` : ''], ['Price', price],
    ].filter(([, v]) => v),
    verdict: `At ${price || 'its listed price'}, the ${phone.name} is ${verdicts[tier]}.`,
  };
}

const GUIDE_ARTICLES = [
  {
    slug: 'how-much-ram-do-you-need',
    title: 'How much RAM does a phone actually need in 2026?',
    excerpt: '8GB is the comfortable baseline, 12GB buys headroom, and 4GB only makes sense on a strict budget. Here is how to choose.',
    author: 'Buying Desk',
    tags: ['RAM', 'Buying guide'],
    body: `<p>RAM decides how many apps a phone can keep in memory before it starts reloading them. It is not the same thing as storage, and it is one of the few specifications you cannot upgrade later.</p>
<h3>Start with 8GB</h3>
<p>For most people buying a phone in 2026, 8GB is the sensible baseline. It keeps a browser with several tabs, a messaging app, maps and a game in memory without constant reloads. Our <a href="../../mobile/?ram=8">8GB and above</a> listing is the easiest place to start.</p>
<h3>When 12GB or 16GB is worth it</h3>
<p>Heavier multitasking, on-device AI features and long gaming sessions benefit from 12GB. Beyond that, returns drop quickly: 16GB is a flagship extra, not a requirement. Filter our directory by <a href="../../mobile/?ram=12">12GB</a> to see what the premium buys.</p>
<h3>What about 4GB and 6GB?</h3>
<p>4GB is workable for calls, chat and light browsing, and it is common under ₹10,000. 6GB is the safer budget choice if you plan to keep the phone for three years. Check the <a href="../../mobile-price-list/under-10000/">under ₹10,000 price list</a> for current options.</p>
<h3>RAM type matters too</h3>
<p>LPDDR5X is faster and more efficient than LPDDR4X, but capacity affects day-to-day behaviour more than the generation. Use the specifications table on any phone page to check both.</p>`,
  },
  {
    slug: '5g-bands-explained',
    title: '5G bands explained: why the count matters less than you think',
    excerpt: 'A phone with twelve 5G bands is not automatically better than one with eight. What matters is whether your carrier’s bands are covered.',
    author: 'Buying Desk',
    tags: ['5G', 'Networks'],
    body: `<p>Every 5G phone lists a set of supported bands. More bands generally mean better roaming and more consistent coverage, but the headline number is not a quality score.</p>
<h3>What a band is</h3>
<p>A band is a slice of radio spectrum. Carriers own different slices in different countries, so a phone tuned for one market may not support another carrier's 5G at all. That is why imported models can show 5G hardware but fall back to 4G on your network.</p>
<h3>Which bands to look for</h3>
<p>In India, n78 (3.5GHz) carries most of the capacity, with n1, n3, n28 and n41 doing the coverage work. A phone that covers those is in good shape. Use our <a href="../../mobile-list/5g-phones/">5G phone list</a> and open any model to see its exact band support in the Network section.</p>
<h3>Sub-6GHz versus mmWave</h3>
<p>mmWave delivers very high speeds over short distances and is rare outside the US. Sub-6GHz is what most of the world uses, and it is what most listings mean when they advertise "5G".</p>
<h3>The practical check</h3>
<p>Match the phone's bands to your carrier before buying, especially if you travel. If the bands match, more bands mostly help with roaming rather than everyday speed.</p>`,
  },
  {
    slug: 'phone-charging-wattage-explained',
    title: 'Phone charging wattage explained: what 18W, 45W and 120W really mean',
    excerpt: 'Higher wattage charges faster only when the phone, cable and charger all support it — and only until the battery fills up.',
    author: 'Buying Desk',
    tags: ['Battery', 'Charging'],
    body: `<p>Charging speed is written as watts, but the number on the box is a peak, not a constant. A 120W phone does not charge twice as fast as a 60W phone in practice.</p>
<h3>The first half is fast</h3>
<p>Phones charge quickly up to roughly 50–60% and then taper to protect the battery. That is why a 45W phone can go from empty to half in about half an hour, while the last 20% takes much longer.</p>
<h3>Compatibility beats the headline</h3>
<p>You need a compatible charger and cable to hit the peak. A 120W phone with a 33W charger behaves like a 33W phone. Check the wired charging figure in the Battery section of any phone page — for example the <a href="../../mobile/?sort=battery">biggest-battery phones</a> in our directory.</p>
<h3>How much do you need?</h3>
<p>18–25W is fine for overnight charging. 45W is comfortable for a quick top-up before going out. Above 65W is convenience, not a necessity, and it often adds heat and charger bulk.</p>
<h3>Battery size still wins</h3>
<p>A 6,000mAh battery with 33W charging usually lasts longer per cycle than a 4,500mAh battery with 120W. Capacity first, wattage second.</p>`,
  },
  {
    slug: 'how-to-read-phone-specs',
    title: 'How to read a phone spec sheet without getting fooled',
    excerpt: 'Megapixels, refresh rates and “AI” labels are easy to inflate. Here are the numbers that actually change how a phone feels.',
    author: 'Buying Desk',
    tags: ['Buying guide', 'Specs'],
    body: `<p>Spec sheets are marketing documents. They are useful, but some numbers matter far more than others. This is the order we use when comparing models.</p>
<h3>1. Chipset and RAM</h3>
<p>The chipset sets the ceiling for performance, camera processing and software support. RAM decides how much stays open. A mid-range chipset with 12GB feels better than a flagship chipset throttled by 6GB.</p>
<h3>2. Display type and refresh rate</h3>
<p>AMOLED beats LCD for contrast and always-on features. 120Hz makes scrolling smoother; 90Hz is a reasonable compromise. Resolution matters most below 6.5 inches — at HD+ on a 6.7-inch panel, text is visibly softer.</p>
<h3>3. Battery capacity, then charging</h3>
<p>Look at mAh first. 5,000mAh is standard, 6,000mAh and above is a longevity play. Charging wattage is convenience, and it depends on the bundled charger.</p>
<h3>4. Camera hardware, not megapixel count</h3>
<p>Sensor size, aperture and optical stabilisation matter more than a 108MP badge. A 50MP main sensor with OIS usually beats a 108MP sensor without it.</p>
<h3>5. Software support</h3>
<p>Years of OS and security updates decide how long the phone stays safe and useful. Check the Operating System section on any phone page before you buy.</p>`,
  },
  {
    slug: 'choosing-a-phone-under-20000',
    title: 'How to choose a phone under ₹20,000 in 2026',
    excerpt: 'The ₹15,000–₹20,000 bracket is where 5G, AMOLED and 120Hz start overlapping. Here is what to prioritise.',
    author: 'Buying Desk',
    tags: ['Buying guide', 'Under ₹20,000'],
    body: `<p>Under ₹20,000 you can now get 5G, a high-refresh display and a 5,000mAh+ battery. The trade-offs move to camera quality, build materials and software support.</p>
<h3>Prioritise the display</h3>
<p>You look at the screen more than anything else. Prefer AMOLED at 120Hz, and check the resolution — some 6.7-inch phones in this bracket still ship HD+.</p>
<h3>Pick the chipset for your use</h3>
<p>Dimensity 7000-series and Snapdragon 6/7-series chips handle everyday apps and moderate gaming. If gaming is the priority, look at last year's flagship chipset instead of this year's mid-range one.</p>
<h3>Battery over charging speed</h3>
<p>5,000mAh is the floor, 6,000mAh+ is common in this bracket. 33W charging is adequate; faster charging is a bonus, not a reason to choose a phone.</p>
<h3>Check the camera basics</h3>
<p>A 50MP main sensor with OIS is the sweet spot. Ignore 2MP macro and depth sensors — they are there to fill the spec sheet.</p>
<h3>Shortlist from data</h3>
<p>Start with our <a href="../../mobile/?max=20000&amp;sort=score">phones under ₹20,000</a> directory, then use the <a href="../../compare/">comparison pages</a> to line up two or three finalists spec by spec.</p>`,
  },
];

const KIND_META = {
  news: { label: 'News', path: 'news', indexTitle: 'Latest News' },
  reviews: { label: 'Reviews', path: 'reviews', indexTitle: 'Latest Reviews' },
  guides: { label: 'Guides', path: 'guides', indexTitle: 'Latest Guides' },
};

function renderHomeSectionHead(titleHtml, href, linkLabel = 'View all') {
  return `<div class="home-head">
    <h2>${titleHtml}</h2>
    <a class="home-head-link" href="${href}">${esc(linkLabel)} <span aria-hidden="true">›</span></a>
  </div>`;
}

function renderStoryCard(item, rootPrefix, config, featured = false) {
  const meta = KIND_META[item.kind] || KIND_META.news;
  const src = item.image
    ? `${rootPrefix}${item.image}`
    : (item.imagePhone ? phoneImageSrc(item.imagePhone, rootPrefix, config) : '');
  const alt = item.imagePhone?.name || item.title;
  const media = src
    ? `<img src="${esc(src)}" alt="${esc(alt)}" width="320" height="200" loading="lazy" decoding="async"/>`
    : `<span class="story-placeholder" aria-hidden="true">${item.kind === 'guides' ? '📘' : '📰'}</span>`;
  return `<a class="story-card${featured ? ' story-featured' : ''}" href="${rootPrefix}${meta.path}/${item.slug}/">
    <span class="story-media">${media}</span>
    <span class="story-body">
      <span class="story-kicker">${esc(meta.label)}</span>
      <strong class="story-title">${esc(item.title)}</strong>
      ${featured && item.excerpt ? `<span class="story-excerpt">${esc(item.excerpt)}</span>` : ''}
      <span class="story-meta">${esc(item.author)} · ${esc(item.dateText)}</span>
    </span>
  </a>`;
}

function renderStoryRow(featured, rest, rootPrefix, config) {
  if (!featured) return '';
  return `<div class="story-layout">
    ${renderStoryCard(featured, rootPrefix, config, true)}
    <div class="story-list">${rest.map((item) => renderStoryCard(item, rootPrefix, config)).join('')}</div>
  </div>`;
}

function renderRail(list, rootPrefix, config, limit = 10) {
  return `<div class="rail">${list.slice(0, limit).map((p) => renderPhoneCard(p, rootPrefix, config)).join('')}</div>`;
}

const HOME_PRICE_TABS = [10000, 20000, 30000, 40000, 50000, 60000];

const HOME_FEATURES = [
  { label: 'Camera Phones', href: 'best-camera-phones/', icon: '📷' },
  { label: '5G Phones', href: 'mobile-list/5g-phones/', icon: '📶' },
  { label: 'AMOLED Display', href: 'best-amoled-display-phones/', icon: '✨' },
  { label: 'Display Phones', href: 'best-display-phones/', icon: '🖥️' },
  { label: 'Gaming Phones', href: 'best-gaming-phones/', icon: '🎮' },
  { label: 'Big Battery', href: 'mobile-list/big-battery-phones/', icon: '🔋' },
  { label: 'Fast Charging', href: 'mobile-list/fast-charging-phones/', icon: '⚡' },
];

function isAmoledPhone(p) {
  return /amoled/i.test(`${p.highlights?.Display || ''} ${JSON.stringify(p.specs?.Display || '')}`);
}

function renderHomePage(phones, config, content, pairs) {
  const monthYear = formatMonthYear(new Date().toISOString());
  const indiaPhones = phones.filter((p) => p.price?.currency === '₹');
  const latest = (indiaPhones.length ? indiaPhones : phones).slice().sort(byAvailability);
  const upcoming = phones.filter((p) => /Upcoming/i.test(p.marketStatus || '')).sort(byAvailability);
  const amoled = phones.filter(isAmoledPhone).sort((a, b) => (b.score || 0) - (a.score || 0) || byAvailability(a, b));
  const globalPhones = phones.filter((p) => p.price?.currency && p.price.currency !== '₹').sort(byAvailability);
  const popular = phones.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
  const trending = popular.slice(0, 5);
  const brands = [...new Set(phones.map((p) => p.brand).filter(Boolean))]
    .map((brand) => ({ brand, list: phones.filter((p) => p.brand === brand) }))
    .sort((a, b) => b.list.length - a.list.length)
    .slice(0, 10);
  const featuredComparisons = pairs
    .slice()
    .sort((x, y) => (y.a.score || 0) + (y.b.score || 0) - ((x.a.score || 0) + (x.b.score || 0)))
    .slice(0, 6);

  const priceTabs = HOME_PRICE_TABS.map((max) => ({
    max,
    list: phones
      .filter((p) => inrPrice(p) && inrPrice(p) <= max)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 4),
  })).filter((tab) => tab.list.length);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.siteName,
      url: `${config.siteUrl}/`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${config.siteUrl}/mobile/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Popular phones',
      itemListElement: popular.slice(0, 10).map((p, i) => ({
        '@type': 'ListItem', position: i + 1, name: p.name, url: `${config.siteUrl}/mobile/${p.slug}/`,
      })),
    },
  ];

  return `${renderHead({
    title: `Best Mobile Phones, Prices & Specs (${monthYear}) | ${config.siteName}`,
    description: `Find the right phone: ${phones.length} models, ${brands.length}+ brands, full specifications, price bands, head-to-head comparisons and buying guides.`,
    canonicalUrl: `${config.siteUrl}/`,
    jsonLdList: schema,
    assetPrefix: './',
  })}
<body class="home-body">
${renderHeader('./', 'home')}
<main class="container">
  <section class="finder-hero">
    <div class="finder-copy">
      <div class="hero-stores" aria-label="Supported stores">
        <span class="store-badge store-flipkart" title="Flipkart">
          <svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="6" fill="#2874f0"/><path d="M8 7h8l-1 11H9L8 7Z" fill="#ffe500"/><path d="M12.8 10.2h1.6v1.2h-1.2v1.1h1.1v1.2h-1.1V16h-1.4v-5.8h1Z" fill="#2874f0"/></svg>
          <span>Flipkart</span>
        </span>
        <span class="store-badge store-amazon" title="Amazon">
          <svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="6" fill="#131921"/><text x="12" y="13.5" text-anchor="middle" fill="#ffffff" font-family="system-ui,sans-serif" font-size="11" font-weight="800">a</text><path d="M7 16.5c3.5 2 6.8 2 10 0" fill="none" stroke="#ff9900" stroke-width="1.8" stroke-linecap="round"/><path d="M15.8 15.6l1.7.5-.7 1.6" fill="none" stroke="#ff9900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Amazon</span>
        </span>
        <span class="store-badge store-croma" title="Croma">
          <svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="6" fill="#121212"/><circle cx="12" cy="12" r="5.5" fill="none" stroke="#00e9bf" stroke-width="2.4" stroke-dasharray="26 8"/></svg>
          <span>Croma</span>
        </span>
        <span class="store-badge store-jiomart" title="JioMart">
          <svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="6" fill="#0078ad"/><circle cx="12" cy="12" r="7.5" fill="#e31837"/><text x="12" y="15.2" text-anchor="middle" fill="#ffffff" font-family="system-ui,sans-serif" font-size="10" font-weight="900">J</text></svg>
          <span>JioMart</span>
        </span>
      </div>
    </div>
    <form class="finder-form" action="./mobile/" method="get">
      <label class="finder-field">
        <span>I'm looking for</span>
        <select name="type" aria-label="Product type">
          <option value="mobile">Mobile</option>
        </select>
      </label>
      <label class="finder-field">
        <span>Price under</span>
        <select name="max" aria-label="Maximum price">
          <option value="">Any budget</option>
          <option value="10000">₹10,000</option>
          <option value="15000">₹15,000</option>
          <option value="20000">₹20,000</option>
          <option value="25000">₹25,000</option>
          <option value="30000">₹30,000</option>
          <option value="40000">₹40,000</option>
          <option value="50000">₹50,000</option>
          <option value="60000">₹60,000</option>
        </select>
      </label>
      <label class="finder-field">
        <span>Features</span>
        <select name="sort" aria-label="Priority">
          <option value="score">Overall</option>
          <option value="camera">Camera</option>
          <option value="display">Display</option>
          <option value="battery">Battery</option>
          <option value="score">Gaming</option>
        </select>
      </label>
      <button class="finder-btn" type="submit">✨ AI Search</button>
    </form>
    <div class="finder-trending">
      <span>Trending</span>
      ${trending.map((p) => `<a class="trend-chip" href="./mobile/${esc(p.slug)}/"><img class="trend-thumb" src="${esc(phoneImageSrc(p, './', config))}" alt="" width="22" height="22" loading="lazy" decoding="async"/><span>${esc(p.name)}</span></a>`).join('')}
    </div>
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">Upcoming</span> Phones', './upcoming-mobile-phones/')}
    ${renderRail(upcoming, './', config)}
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">Latest</span> Phones', './latest-mobile-phones/')}
    ${renderRail(latest, './', config)}
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">AMOLED</span> Display Phones', './best-amoled-display-phones/')}
    ${renderRail(amoled, './', config)}
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">Popular</span> Brands', './mobile-brands/')}
    <div class="brand-grid home-brand-grid">
      ${brands.map(({ brand, list }) => `<a class="brand-card" href="./mobile-brands/${brandSlug(brand)}/">
        ${renderBrandLogo(brand, './')}
        <span class="brand-card-body">
          <strong>${esc(brand)}</strong>
          <span>${list.length} ${list.length === 1 ? 'phone' : 'phones'}</span>
        </span>
      </a>`).join('')}
    </div>
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">Latest</span> News', './news/')}
    ${renderStoryRow(content.news[0], content.news.slice(1, 5), './', config)}
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">Latest</span> Reviews', './reviews/')}
    ${renderStoryRow(content.reviews[0], content.reviews.slice(1, 6), './', config)}
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('Browse Phones <span class="gradient-text">By Price</span>', './mobile-price-list/')}
    <div class="price-tabs" id="price-tabs">
      <div class="tab-row" role="tablist" aria-label="Price bands">
        ${priceTabs.map((tab, i) => `<button type="button" class="tab-btn${i === 0 ? ' active' : ''}" role="tab" aria-selected="${i === 0}" data-price-tab="${tab.max}"><span class="tab-under">✨ Under</span><span class="tab-amt">₹${tab.max.toLocaleString('en-IN')}</span></button>`).join('')}
      </div>
      ${priceTabs.map((tab, i) => `<div class="tab-panel${i === 0 ? ' active' : ''}" data-price-panel="${tab.max}" role="tabpanel">
        <div class="mini-grid">
          ${tab.list.map((p) => renderPhoneCard(p, './', config)).join('')}
        </div>
        <a class="home-head-link tab-link" href="./mobile/?max=${tab.max}&amp;sort=score">View all phones under ₹${tab.max.toLocaleString('en-IN')} ›</a>
      </div>`).join('')}
    </div>
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('Browse Phones by <span class="gradient-text">Features</span>', './mobile/')}
    <div class="feature-grid">
      ${HOME_FEATURES.map((f) => `<a class="feature-tile" href="./${f.href}">
        <span class="feature-icon" aria-hidden="true">${f.icon}</span>
        <strong>${esc(f.label)}</strong>
      </a>`).join('')}
    </div>
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">Latest</span> Guides', './guides/')}
    ${renderStoryRow(content.guides[0], content.guides.slice(1, 5), './', config)}
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">Global</span> Phones', './global-mobile-phones/')}
    ${renderRail(globalPhones, './', config)}
  </section>

  <section class="home-section">
    ${renderHomeSectionHead('<span class="gradient-text">Popular</span> Comparisons', './compare/')}
    <div class="compare-tile-grid">
      ${featuredComparisons.map((p) => `<a class="compare-tile" href="./compare/${p.key}/">
        <span class="compare-tile-media">
          <img src="${esc(phoneImageSrc(p.a, './', config))}" alt="${esc(p.a.name)}" width="68" height="68" loading="lazy" decoding="async"/>
          <span class="compare-vs">VS</span>
          <img src="${esc(phoneImageSrc(p.b, './', config))}" alt="${esc(p.b.name)}" width="68" height="68" loading="lazy" decoding="async"/>
        </span>
        <span class="compare-tile-names">${esc(p.a.name)} <em>vs</em> ${esc(p.b.name)}</span>
        <span class="compare-tile-meta">${esc(formatPhonePrice(p.a) || '—')} · ${esc(formatPhonePrice(p.b) || '—')}</span>
        <span class="compare-tile-score">${p.a.score || '—'} / ${p.b.score || '—'}</span>
      </a>`).join('')}
    </div>
  </section>

  <section class="home-section home-footer-links">
    <div class="chip-row">
      <a class="chip" href="./mobile/">All ${phones.length} phones</a>
      <a class="chip" href="./mobile-brands/">${phones.length ? new Set(phones.map((p) => p.brand)).size : 0} brands</a>
      <a class="chip" href="./compare/">${pairs.length} comparisons</a>
      <a class="chip" href="./mobile-price-list/">Price list</a>
      <a class="chip" href="./latest-mobile-phones/">Latest</a>
      <a class="chip" href="./popular-mobile-phones/">Popular</a>
    </div>
  </section>
</main>
${renderFooter('./')}`;
}

function renderPhoneListingPage({ slug, h1Html, title, description, list, config, note, sortNote }) {
  const depth = slug.split('/').length;
  const rootPrefix = '../'.repeat(depth);
  const canonicalUrl = `${config.siteUrl}/${slug}/`;
  const top = list.slice(0, 5);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: title,
      numberOfItems: list.length,
      itemListElement: list.map((p, i) => ({
        '@type': 'ListItem', position: i + 1, name: p.name, url: `${config.siteUrl}/mobile/${p.slug}/`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${config.siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Phones', item: `${config.siteUrl}/mobile/` },
        { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
      ],
    },
  ];
  return `${renderHead({
    title, description, canonicalUrl, jsonLdList: schema, assetPrefix: rootPrefix,
  })}
<body>
${renderHeader(rootPrefix, 'mobile')}
<main class="container">
  <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <a href="${rootPrefix}mobile/">Phones</a> › <span>${esc(h1Html.replace(/<[^>]+>/g, ''))}</span></nav>
  <section class="page-hero">
    <h1>${h1Html}</h1>
    <p class="hero-desc">${esc(note || '')}</p>
  </section>
  ${sortNote ? `<p class="sort-note">${esc(sortNote)}</p>` : ''}

  <div class="listing-toolbar">
    <div class="listing-filters" role="group" aria-label="Filter by budget">
      <button class="chip active" type="button" data-listing-max="0">All</button>
      <button class="chip" type="button" data-listing-max="15000">Under ₹15,000</button>
      <button class="chip" type="button" data-listing-max="20000">Under ₹20,000</button>
      <button class="chip" type="button" data-listing-max="30000">Under ₹30,000</button>
      <button class="chip" type="button" data-listing-max="50000">Under ₹50,000</button>
    </div>
    <div class="listing-sort-wrap">
      <label class="muted" for="listing-sort">Sort:</label>
      <select id="listing-sort" class="sort-select">
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="score">Best Score</option>
        <option value="refresh">Refresh Rate</option>
      </select>
      <span class="muted" id="listing-count">${list.length} phones</span>
    </div>
  </div>

  ${top.length ? `
  <section class="section-card">
    <h2>Top ${top.length} ${esc(title.split('|')[0].trim())}</h2>
    <div class="ranked-grid">
      ${top.map((p, i) => `<div class="ranked-item">
        <span class="rank-no">${i + 1}</span>
        ${renderPhoneCard(p, rootPrefix, config)}
      </div>`).join('')}
    </div>
  </section>` : ''}

  <section class="section-card">
    <h2>Browse All ${list.length} Models</h2>
    <div class="mini-grid" data-listing-grid>
      ${list.map((p) => renderPhoneCard(p, rootPrefix, config)).join('')}
    </div>
  </section>

  <section class="section-card">
    <h2>More Phone Lists</h2>
    <div class="chip-row">
      <a class="chip" href="${rootPrefix}latest-mobile-phones/">Latest phones</a>
      <a class="chip" href="${rootPrefix}popular-mobile-phones/">Popular phones</a>
      <a class="chip" href="${rootPrefix}upcoming-mobile-phones/">Upcoming phones</a>
      <a class="chip" href="${rootPrefix}global-mobile-phones/">Global phones</a>
      <a class="chip" href="${rootPrefix}best-amoled-display-phones/">AMOLED display</a>
      <a class="chip" href="${rootPrefix}best-camera-phones/">Best camera</a>
      <a class="chip" href="${rootPrefix}best-gaming-phones/">Best gaming</a>
      <a class="chip" href="${rootPrefix}best-display-phones/">Best display</a>
      <a class="chip" href="${rootPrefix}mobile-brands/">All brands</a>
    </div>
  </section>
</main>
${renderFooter(rootPrefix)}`;
}

function renderStoryIndex(kind, items, config) {
  const meta = KIND_META[kind];
  const canonicalUrl = `${config.siteUrl}/${meta.path}/`;
  const featured = items[0];
  const rest = items.slice(1);
  return `${renderHead({
    title: `${meta.indexTitle} — Phone Coverage | ${config.siteName}`,
    description: `The latest ${meta.label.toLowerCase()} from ${config.siteName}: launches, spec breakdowns and buying context for every tracked phone.`,
    canonicalUrl,
    jsonLdList: [{
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: meta.indexTitle,
      url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem', position: i + 1, name: item.title,
          url: `${config.siteUrl}/${meta.path}/${item.slug}/`,
        })),
      },
    }],
    assetPrefix: '../',
  })}
<body>
${renderHeader('../', kind)}
<main class="container">
  <nav class="breadcrumbs"><a href="../">Home</a> › <span>${esc(meta.label)}</span></nav>
  <section class="page-hero">
    <h1>${esc(meta.indexTitle).replace('Latest ', '<span class="price-highlight">Latest</span> ')}</h1>
    <p class="hero-desc">${items.length} ${meta.label.toLowerCase()} entries, generated from the specifications we track.</p>
  </section>
  ${renderStoryRow(featured, rest.slice(0, 6), '../', config)}
  <section class="section-card">
    <h2>All ${esc(meta.label)}</h2>
    <div class="story-grid">
      ${items.slice(7).map((item) => renderStoryCard(item, '../', config)).join('')}
    </div>
  </section>
  <section class="section-card">
    <h2>Explore</h2>
    <div class="chip-row">
      <a class="chip" href="../mobile/">All phones</a>
      <a class="chip" href="../news/">News</a>
      <a class="chip" href="../reviews/">Reviews</a>
      <a class="chip" href="../guides/">Guides</a>
      <a class="chip" href="../compare/">Comparisons</a>
    </div>
  </section>
</main>
${renderFooter('../')}`;
}

function renderStoryPage(item, config, related) {
  const meta = KIND_META[item.kind];
  const rootPrefix = '../../';
  const canonicalUrl = `${config.siteUrl}/${meta.path}/${item.slug}/`;
  const imageSrc = item.image
    ? `${rootPrefix}${item.image}`
    : (item.imagePhone ? phoneImageSrc(item.imagePhone, rootPrefix, config) : '');
  const image = item.image
    ? `${config.siteUrl}/${item.image}`
    : (item.imagePhone ? phoneImageAbs(item.imagePhone, config) : null);
  const schema = [{
    '@context': 'https://schema.org',
    '@type': item.kind === 'reviews' ? 'Review' : item.kind === 'guides' ? 'Article' : 'NewsArticle',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    headline: item.title,
    description: item.excerpt,
    datePublished: item.dateIso,
    dateModified: item.dateIso,
    author: { '@type': 'Organization', name: item.author, url: config.siteUrl },
    publisher: { '@type': 'Organization', name: config.siteName, url: config.siteUrl },
    url: canonicalUrl,
    ...(image ? { image: [image] } : {}),
    ...(item.kind === 'reviews' && item.score ? {
      itemReviewed: { '@type': 'Product', name: item.phone.name, brand: { '@type': 'Brand', name: item.phone.brand } },
      reviewRating: { '@type': 'Rating', ratingValue: (item.score / 20).toFixed(1), bestRating: '5', worstRating: '1' },
    } : {}),
  }];
  return `${renderHead({
    title: `${item.title} | ${config.siteName}`,
    description: item.excerpt,
    canonicalUrl,
    jsonLdList: schema,
    assetPrefix: rootPrefix,
    image,
  })}
<body>
${renderHeader(rootPrefix, meta.path)}
<main class="container">
  <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <a href="${rootPrefix}${meta.path}/">${esc(meta.label)}</a> › <span>${esc(item.phone?.name || item.title)}</span></nav>
  <article class="story-page">
    <header class="story-page-head">
      <span class="story-kicker">${esc(meta.label)}</span>
      <h1>${esc(item.title)}</h1>
      <p class="story-page-meta">${esc(item.author)} · ${esc(item.dateText)}${item.phone ? ` · <a href="${rootPrefix}mobile/${esc(item.phone.slug)}/">${esc(item.phone.name)} specs</a>` : ''}</p>
    </header>
    ${imageSrc ? `<div class="story-page-media"><img src="${esc(imageSrc)}" alt="${esc(item.imagePhone?.name || item.title)}" width="1000" height="1000" loading="eager"/></div>` : ''}
    ${item.kind === 'reviews' && item.score ? `<div class="verdict-box"><strong>${item.score}<span>/100</span></strong><p>${esc(item.verdict || '')}</p></div>` : ''}
    <div class="story-body-text">${item.body}</div>
    ${item.keySpecs?.length ? `
    <section class="section-card">
      <h2>Key Specifications</h2>
      <table class="spec-table"><tbody>
        ${item.keySpecs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}
      </tbody></table>
    </section>` : ''}
    ${item.phone ? `
    <section class="section-card">
      <h2>Go Deeper</h2>
      <div class="chip-row">
        <a class="chip" href="${rootPrefix}mobile/${esc(item.phone.slug)}/">Full specifications</a>
        <a class="chip" href="${rootPrefix}mobile-brands/${brandSlug(item.phone.brand)}/">More ${esc(item.phone.brand)} phones</a>
        <a class="chip" href="${rootPrefix}compare/">Compare with another phone</a>
      </div>
    </section>` : ''}
  </article>
  ${related.length ? `
  <section class="section-card">
    <h2>More ${esc(meta.label)}</h2>
    <div class="story-grid">
      ${related.map((r) => renderStoryCard(r, rootPrefix, config)).join('')}
    </div>
  </section>` : ''}
</main>
${renderFooter(rootPrefix)}`;
}

function renderHubPage({ slug, h1Html, title, description, cards, config, intro }) {
  const rootPrefix = '../';
  const canonicalUrl = `${config.siteUrl}/${slug}/`;
  const schema = [{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: cards.length,
      itemListElement: cards.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, url: `${config.siteUrl}${c.href.replace(/^\.\./, '')}` })),
    },
  }];
  return `${renderHead({ title, description, canonicalUrl, jsonLdList: schema, assetPrefix: rootPrefix })}
<body>
${renderHeader(rootPrefix, slug)}
<main class="container">
  <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <span>${esc(h1Html.replace(/<[^>]+>/g, ''))}</span></nav>
  <section class="page-hero">
    <h1>${h1Html}</h1>
    <p class="hero-desc">${esc(intro || '')}</p>
  </section>
  <div class="hub-grid">
    ${cards.map((c) => `<a class="hub-card" href="${c.href}">
      <strong>${esc(c.label)}</strong>
      <span class="hub-meta">${esc(c.meta || '')}</span>
      ${c.text ? `<span class="hub-text">${esc(c.text)}</span>` : ''}
    </a>`).join('')}
  </div>
</main>
${renderFooter(rootPrefix)}`;
}

function renderStoriesHub(content, config) {
  const all = [...content.news, ...content.reviews, ...content.guides]
    .sort((a, b) => new Date(b.dateIso) - new Date(a.dateIso));
  const canonicalUrl = `${config.siteUrl}/stories/`;
  return `${renderHead({
    title: `Latest Stories — News, Reviews & Guides | ${config.siteName}`,
    description: 'Every launch brief, data review and buying guide in one feed.',
    canonicalUrl,
    jsonLdList: [{
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Latest Stories', url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList', numberOfItems: all.length,
        itemListElement: all.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.title, url: `${config.siteUrl}/${KIND_META[item.kind].path}/${item.slug}/` })),
      },
    }],
    assetPrefix: '../',
  })}
<body>
${renderHeader('../', 'stories')}
<main class="container">
  <nav class="breadcrumbs"><a href="../">Home</a> › <span>Stories</span></nav>
  <section class="page-hero">
    <h1><span class="price-highlight">Latest</span> Stories</h1>
    <p class="hero-desc">${all.length} entries across news, reviews and guides.</p>
  </section>
  <div class="chip-row">
    <a class="chip" href="../news/">News</a>
    <a class="chip" href="../reviews/">Reviews</a>
    <a class="chip" href="../guides/">Guides</a>
  </div>
  <div class="story-grid">
    ${all.map((item) => renderStoryCard(item, '../', config)).join('')}
  </div>
</main>
${renderFooter('../')}`;
}

function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(path.join(DIST, 'assets'));

  fs.copyFileSync(path.join(ROOT, 'src/styles/main.css'), path.join(DIST, 'assets/main.css'));
  fs.copyFileSync(path.join(ROOT, 'src/scripts/app.js'), path.join(DIST, 'assets/app.js'));
  const productsImgSrc = path.join(ROOT, 'src/assets/products');
  if (fs.existsSync(productsImgSrc)) {
    fs.cpSync(productsImgSrc, path.join(DIST, 'assets/products'), { recursive: true });
  }
  const phonesImgSrc = path.join(ROOT, 'src/assets/phones');
  if (fs.existsSync(phonesImgSrc)) {
    fs.cpSync(phonesImgSrc, path.join(DIST, 'assets/phones'), { recursive: true });
  }
  const brandsImgSrc = path.join(ROOT, 'src/assets/brands');
  if (fs.existsSync(brandsImgSrc)) {
    fs.cpSync(brandsImgSrc, path.join(DIST, 'assets/brands'), { recursive: true });
  }
  const guidesImgSrc = path.join(ROOT, 'src/assets/guides');
  if (fs.existsSync(guidesImgSrc)) {
    fs.cpSync(guidesImgSrc, path.join(DIST, 'assets/guides'), { recursive: true });
  }
  const newsImgSrc = path.join(ROOT, 'src/assets/news');
  if (fs.existsSync(newsImgSrc)) {
    fs.cpSync(newsImgSrc, path.join(DIST, 'assets/news'), { recursive: true });
  }
  const iconsImgSrc = path.join(ROOT, 'src/assets/icons');
  if (fs.existsSync(iconsImgSrc)) {
    fs.cpSync(iconsImgSrc, path.join(DIST, 'assets/icons'), { recursive: true });
  }

  const products = (catalog.products || []).map(enrichProduct).sort((a, b) => b.score - a.score);
  const phonesFile = path.join(ROOT, 'data/phones.json');
  const phones = fs.existsSync(phonesFile) ? (JSON.parse(fs.readFileSync(phonesFile, 'utf8')).phones || []) : [];
  const dailyNewsFile = path.join(ROOT, 'data/daily-news.json');
  const dailyNews = fs.existsSync(dailyNewsFile) ? (JSON.parse(fs.readFileSync(dailyNewsFile, 'utf8')).items || []) : [];
  const launchNews = (phones.filter((p) => p.price?.currency === '₹').length ? phones.filter((p) => p.price?.currency === '₹') : phones)
    .slice().sort(byAvailability).slice(0, 12).map((p) => buildNewsArticle(p, config));
  const pairs = phones.length ? buildComparePairs(phones) : [];
  const content = {
    news: [...dailyNews, ...launchNews],
    reviews: phones.filter((p) => p.score).sort((a, b) => b.score - a.score).slice(0, 12).map((p) => buildReviewArticle(p, config)),
    guides: GUIDE_ARTICLES.map((guide) => {
      const jpgPath = path.join(guidesImgSrc, `${guide.slug}.jpg`);
      const pngPath = path.join(guidesImgSrc, `${guide.slug}.png`);
      const image = fs.existsSync(jpgPath)
        ? `assets/guides/${guide.slug}.jpg`
        : (fs.existsSync(pngPath) ? `assets/guides/${guide.slug}.png` : null);
      return {
        ...guide, kind: 'guides', dateText: 'Nov 2026', dateIso: new Date().toISOString(),
        phone: null, imagePhone: null, image, keySpecs: [],
      };
    }),
  };
  const urls = [`${config.siteUrl}/`];
  const monthYear = formatMonthYear(catalog.lastUpdated);

  // Home page
  const homeHtml = phones.length
    ? renderHomePage(phones, config, content, pairs)
    : renderListPage({
      title: `Best Smartphones, Laptops & Electronic Gadgets | ${config.siteName}`,
      headingHtml: 'Best Smartphones, Laptops &amp; Gadgets',
      description: 'Compare verified lowest prices, specs, Value Scores, and latest bank offers across Amazon, Flipkart, Croma, and JioMart.',
      products, allProducts: products, canonicalUrl: `${config.siteUrl}/`,
      rootPrefix: './', activeSlug: '',
      breadcrumbs: [{ name: 'Home', href: './', url: `${config.siteUrl}/` }]
    });
  fs.writeFileSync(path.join(DIST, 'index.html'), homeHtml);

  // Programmatic budget pages
  for (const bp of config.budgetPages) {
    const dir = path.join(DIST, bp.slug);
    ensureDir(dir);
    const matching = products.filter((p) => {
      const catOk = bp.category === 'all' || p.category === bp.category;
      const priceOk = p.lowestPrice <= bp.maxPrice && p.lowestPrice >= (bp.minPrice || 0);
      return catOk && priceOk;
    });
    const highlighted = esc(bp.title).replace(/(₹[\d,]+)/, '<span class="price-highlight">$1</span>');
    const pageHtml = renderListPage({
      title: `${bp.title} in India (${monthYear}) | ${config.siteName}`,
      headingHtml: highlighted,
      description: bp.description,
      products: matching.length ? matching : products,
      allProducts: products,
      canonicalUrl: `${config.siteUrl}/${bp.slug}/`,
      rootPrefix: '../',
      activeSlug: bp.slug,
      defaultCategory: bp.category,
      defaultMaxPrice: bp.maxPrice,
      breadcrumbs: [
        { name: 'Home', href: '../', url: `${config.siteUrl}/` },
        { name: bp.shortTitle, href: './', url: `${config.siteUrl}/${bp.slug}/` }
      ]
    });
    fs.writeFileSync(path.join(dir, 'index.html'), pageHtml);
    urls.push(`${config.siteUrl}/${bp.slug}/`);
  }

  // Gadget category pages (Earbuds, Smartwatches, Laptops)
  const gadgetCategories = [
    {
      slug: 'earbuds',
      category: 'audio',
      shortTitle: 'Earbuds',
      headingHtml: 'Best <span class="price-highlight">Earbuds &amp; Audio</span>',
      title: `Best Earbuds & Wireless Audio (${monthYear}) | ${config.siteName}`,
      description: 'Compare top wireless earbuds, ANC headphones, specs, Value Scores, and lowest prices across stores.',
    },
    {
      slug: 'smartwatches',
      category: 'smartwatches',
      shortTitle: 'Smartwatch',
      headingHtml: 'Best <span class="price-highlight">Smartwatches</span>',
      title: `Best Smartwatches & Wearables (${monthYear}) | ${config.siteName}`,
      description: 'Compare top smartwatches with AMOLED displays, fitness tracking, Value Scores, and lowest prices.',
    },
    {
      slug: 'laptops',
      category: 'laptops',
      shortTitle: 'Laptops',
      headingHtml: 'Best <span class="price-highlight">Laptops</span>',
      title: `Best Laptops & Notebooks (${monthYear}) | ${config.siteName}`,
      description: 'Compare top student, creator, and gaming laptops, specs, Value Scores, and verified store offers.',
    },
  ];
  for (const gc of gadgetCategories) {
    const dir = path.join(DIST, gc.slug);
    ensureDir(dir);
    const matching = products.filter((p) => p.category === gc.category);
    const pageHtml = renderListPage({
      title: gc.title,
      headingHtml: gc.headingHtml,
      description: gc.description,
      products: matching.length ? matching : products,
      allProducts: products,
      canonicalUrl: `${config.siteUrl}/${gc.slug}/`,
      rootPrefix: '../',
      activeSlug: gc.slug,
      defaultCategory: gc.category,
      defaultMaxPrice: 200000,
      breadcrumbs: [
        { name: 'Home', href: '../', url: `${config.siteUrl}/` },
        { name: gc.shortTitle, href: './', url: `${config.siteUrl}/${gc.slug}/` }
      ]
    });
    fs.writeFileSync(path.join(dir, 'index.html'), pageHtml);
    urls.push(`${config.siteUrl}/${gc.slug}/`);
  }

  // Product detail pages
  for (const p of products) {
    const dir = path.join(DIST, 'product', p.slug);
    ensureDir(dir);
    fs.writeFileSync(path.join(dir, 'index.html'), renderProductPage(p, products));
    urls.push(`${config.siteUrl}/product/${p.slug}/`);
  }

  // Phone catalog (/mobile/<slug>/) — information architecture modelled on Beebom Gadgets
  if (phones.length) {
    const mobileDir = path.join(DIST, 'mobile');
    ensureDir(mobileDir);
    fs.writeFileSync(path.join(mobileDir, 'index.html'), renderPhoneIndex(phones, config));
    urls.push(`${config.siteUrl}/mobile/`);
    for (const phone of phones) {
      const dir = path.join(mobileDir, phone.slug);
      ensureDir(dir);
      fs.writeFileSync(path.join(dir, 'index.html'), renderPhonePage(phone, phones, config, pairs));
      urls.push(`${config.siteUrl}/mobile/${phone.slug}/`);
    }

    // Brand hubs
    const brandIndexDir = path.join(DIST, 'mobile-brands');
    ensureDir(brandIndexDir);
    fs.writeFileSync(path.join(brandIndexDir, 'index.html'), renderBrandIndex(phones, config));
    urls.push(`${config.siteUrl}/mobile-brands/`);
    const brands = [...new Set(phones.map((p) => p.brand).filter(Boolean))];
    for (const brand of brands) {
      const dir = path.join(brandIndexDir, brandSlug(brand));
      ensureDir(dir);
      const list = phones.filter((p) => p.brand === brand);
      fs.writeFileSync(path.join(dir, 'index.html'), renderBrandPage(brand, list, phones, config, pairs));
      urls.push(`${config.siteUrl}/mobile-brands/${brandSlug(brand)}/`);
    }

    // Generated head-to-head comparisons
    const compareDir = path.join(DIST, 'compare');
    ensureDir(compareDir);
    fs.writeFileSync(path.join(compareDir, 'index.html'), renderCompareHub(pairs, phones, config));
    urls.push(`${config.siteUrl}/compare/`);
    for (const pair of pairs) {
      const dir = path.join(compareDir, pair.key);
      ensureDir(dir);
      fs.writeFileSync(path.join(dir, 'index.html'), renderComparePage(pair, pairs, config));
      urls.push(`${config.siteUrl}/compare/${pair.key}/`);
    }

    // Price-list pages (INR bands + Under ₹20k–₹50k pages)
    const allBands = [...PRICE_BANDS, ...EXTRA_UNDER_BANDS];
    const bands = allBands.map((band) => ({ band, list: phonesInBand(phones, band) })).filter((x) => x.list.length);
    const priceDir = path.join(DIST, 'mobile-price-list');
    ensureDir(priceDir);
    fs.writeFileSync(path.join(priceDir, 'index.html'), renderPriceListIndex(phones, config));
    urls.push(`${config.siteUrl}/mobile-price-list/`);
    for (const { band, list } of bands) {
      const dir = path.join(priceDir, band.slug);
      ensureDir(dir);
      fs.writeFileSync(path.join(dir, 'index.html'), renderPriceBandPage(band, list, bands.map((b) => b.band), config));
      urls.push(`${config.siteUrl}/mobile-price-list/${band.slug}/`);
    }
    // Discovery / feature listing pages
    const upcoming = phones.filter((p) => /Upcoming/i.test(p.marketStatus || '')).sort(byAvailability);
    const nonIndia = phones.filter((p) => p.price?.currency && p.price.currency !== '₹').sort(byAvailability);
    const listings = [
      {
        slug: 'latest-mobile-phones', h1Html: '<span class="price-highlight">Latest</span> Mobile Phones',
        title: `Latest Mobile Phones (${formatMonthYear(new Date().toISOString())}) | ${config.siteName}`,
        description: `The newest mobile phones in our database, sorted by availability date. ${phones.length} models tracked with full specifications and prices.`,
        list: (phones.filter((p) => p.price?.currency === '₹').length ? phones.filter((p) => p.price?.currency === '₹') : phones).slice().sort(byAvailability),
        note: 'Newest India-priced models first, based on the availability date listed for each phone.',
        sortNote: 'Sorted by availability date, newest first.',
      },
      {
        slug: 'upcoming-mobile-phones', h1Html: '<span class="price-highlight">Upcoming</span> Mobile Phones',
        title: `Upcoming Mobile Phones (${formatMonthYear(new Date().toISOString())}) | ${config.siteName}`,
        description: 'Phones listed as upcoming launches, with the specifications and prices we have on record.',
        list: upcoming, note: `${upcoming.length} models currently listed as upcoming launches.`,
        sortNote: 'Only models marked as upcoming, newest availability date first.',
      },
      {
        slug: 'popular-mobile-phones', h1Html: '<span class="price-highlight">Popular</span> Mobile Phones',
        title: `Popular Mobile Phones — Ranked by Score | ${config.siteName}`,
        description: 'The highest-scoring phones in our database, with full specifications, prices and comparison links.',
        list: phones.slice().sort((a, b) => (b.score || 0) - (a.score || 0)),
        note: 'Ranked by our tracked score, highest first.', sortNote: 'Sorted by score, highest first.',
      },
      {
        slug: 'global-mobile-phones', h1Html: '<span class="price-highlight">Global</span> Mobile Phones',
        title: `Global Mobile Phones — Prices in CNY & USD | ${config.siteName}`,
        description: 'Models listed outside the Indian market, priced in CNY or USD, with full specifications.',
        list: nonIndia, note: 'Phones tracked with a non-INR list price, newest availability date first.',
        sortNote: 'Sorted by availability date, newest first.',
      },
      {
        slug: 'best-camera-phones', h1Html: 'Best <span class="price-highlight">Camera</span> Phones',
        title: `Best Camera Phones — Ranked by Main Sensor | ${config.siteName}`,
        description: 'Phones ranked by main camera resolution, with the rest of the camera hardware listed on each page.',
        list: phones.slice().sort((a, b) => phoneFacts(b).cameraMP - phoneFacts(a).cameraMP || (b.score || 0) - (a.score || 0)),
        note: 'Ranked by main camera megapixels, then score. Sensor size and processing still matter more than the count alone.',
        sortNote: 'Sorted by main camera resolution, highest first.',
      },
      {
        slug: 'best-gaming-phones', h1Html: 'Best <span class="price-highlight">Gaming</span> Phones',
        title: `Best Gaming Phones — Ranked by Score | ${config.siteName}`,
        description: 'High-scoring phones with 120Hz displays and flagship-class chipsets, ranked by our tracked score.',
        list: phones.slice().sort((a, b) => (b.score || 0) - (a.score || 0)),
        note: 'Ranked by overall score across phones with high-refresh displays.',
        sortNote: 'Sorted by score, highest first.',
      },
      {
        slug: 'best-amoled-display-phones', h1Html: 'Best <span class="price-highlight">AMOLED Display</span> Phones',
        title: `Best AMOLED Display Phones — Price & Specs | ${config.siteName}`,
        description: 'All AMOLED, Super AMOLED, pOLED and LTPO AMOLED smartphones with price sorting and budget filters.',
        list: phones.filter(isAmoledPhone).sort((a, b) => (b.score || 0) - (a.score || 0) || (inrPrice(a) || Infinity) - (inrPrice(b) || Infinity)),
        note: 'Filtered for AMOLED / Super AMOLED / LTPO AMOLED panels. Sort by price or filter by budget below.',
        sortNote: 'Sorted by overall score. Use the sort dropdown above to sort by price (low-to-high or high-to-low).',
      },
      {
        slug: 'best-display-phones', h1Html: 'Best <span class="price-highlight">Display</span> Phones',
        title: `Best Display Phones — Refresh Rate & Size | ${config.siteName}`,
        description: 'Phones ranked by refresh rate, panel size and score, with full display specifications.',
        list: phones.slice().sort((a, b) => {
          const fa = phoneFacts(a);
          const fb = phoneFacts(b);
          return fb.refreshHz - fa.refreshHz || fb.screenIn - fa.screenIn || (b.score || 0) - (a.score || 0);
        }),
        note: 'Ranked by refresh rate, then display size, then score.', sortNote: 'Sorted by refresh rate, highest first.',
      },
      {
        slug: 'mobile-list/5g-phones', h1Html: '5G <span class="price-highlight">Mobile Phones</span>',
        title: `5G Mobile Phones — Specs & Prices | ${config.siteName}`,
        description: 'Every 5G phone in our database, ranked by score, with band support and full specifications.',
        list: phones.filter((p) => phoneFacts(p).has5G).sort((a, b) => (b.score || 0) - (a.score || 0)),
        note: 'Every model with 5G listed in its network specifications.', sortNote: 'Sorted by score, highest first.',
      },
      {
        slug: 'mobile-list/big-battery-phones', h1Html: 'Big <span class="price-highlight">Battery</span> Phones',
        title: `Big Battery Phones — 6,000mAh and Above | ${config.siteName}`,
        description: 'Phones with 6,000mAh or larger batteries, sorted by capacity.',
        list: phones.filter((p) => phoneFacts(p).battery >= 6000).sort((a, b) => phoneFacts(b).battery - phoneFacts(a).battery),
        note: 'Only models with a listed capacity of 6,000mAh or more.', sortNote: 'Sorted by battery capacity, largest first.',
      },
      {
        slug: 'mobile-list/fast-charging-phones', h1Html: 'Fast <span class="price-highlight">Charging</span> Phones',
        title: `Fast Charging Phones — 45W and Above | ${config.siteName}`,
        description: 'Phones with 45W or faster wired charging, sorted by wattage.',
        list: phones.filter((p) => phoneFacts(p).chargingW >= 45).sort((a, b) => phoneFacts(b).chargingW - phoneFacts(a).chargingW),
        note: 'Only models listing 45W or higher wired charging.', sortNote: 'Sorted by wired charging wattage, highest first.',
      },
    ];
    for (const listing of listings) {
      const dir = path.join(DIST, listing.slug);
      ensureDir(dir);
      fs.writeFileSync(path.join(dir, 'index.html'), renderPhoneListingPage({ ...listing, config }));
      urls.push(`${config.siteUrl}/${listing.slug}/`);
    }

    // Extra hub / commerce / alias pages
    const listHubCards = [
      { href: './mobile-list/5g-phones/', label: '5G Phones', meta: `${phones.filter((p) => phoneFacts(p).has5G).length} models`, text: 'Every model with 5G in its network specs.' },
      { href: './mobile-list/big-battery-phones/', label: 'Big Battery Phones', meta: `${phones.filter((p) => phoneFacts(p).battery >= 6000).length} models`, text: '6,000mAh and above, largest first.' },
      { href: './mobile-list/fast-charging-phones/', label: 'Fast Charging Phones', meta: `${phones.filter((p) => phoneFacts(p).chargingW >= 45).length} models`, text: '45W and faster wired charging.' },
      { href: './best-camera-phones/', label: 'Best Camera Phones', meta: 'Ranked by main sensor', text: 'Highest main-camera resolution first.' },
      { href: './best-gaming-phones/', label: 'Best Gaming Phones', meta: 'Ranked by score', text: 'High-refresh displays and flagship chipsets.' },
      { href: './best-amoled-display-phones/', label: 'Best AMOLED Display Phones', meta: 'AMOLED + price sort', text: 'All AMOLED, Super AMOLED and LTPO AMOLED phones with price sorting.' },
      { href: './best-display-phones/', label: 'Best Display Phones', meta: 'Refresh rate + size', text: 'Panels ranked by refresh rate and size.' },
      { href: './latest-mobile-phones/', label: 'Latest Phones', meta: 'Newest first', text: 'Sorted by the listed availability date.' },
      { href: './upcoming-mobile-phones/', label: 'Upcoming Phones', meta: `${upcoming.length} launches`, text: 'Models marked as upcoming.' },
      { href: './global-mobile-phones/', label: 'Global Phones', meta: `${nonIndia.length} models`, text: 'Priced in CNY or USD outside India.' },
    ];
    const hubPages = [
      {
        slug: 'mobile-list',
        h1Html: 'Browse Phones by <span class="price-highlight">Feature</span>',
        title: `Browse Phones by Feature | ${config.siteName}`,
        description: 'Every phone listing on the site: 5G, battery, charging, camera, gaming, display and availability.',
        intro: 'Jump into a facet list built from the specifications we track for every model.',
        cards: listHubCards,
      },
      {
        slug: 'best-mobiles',
        h1Html: 'Best <span class="price-highlight">Mobile Phone</span> Lists',
        title: `Best Mobile Phone Lists — Budget, Camera, Gaming | ${config.siteName}`,
        description: 'All ranked phone lists: budget brackets, camera, gaming, display and price bands.',
        intro: 'Ranked shortlists and budget brackets, rebuilt from the catalogue on every update.',
        cards: [
          ...config.budgetPages.map((b) => ({
            href: `./${b.slug}/`, label: b.title, meta: `${phones.filter((p) => inrPrice(p) && inrPrice(p) <= b.maxPrice && inrPrice(p) >= (b.minPrice || 0)).length} models`,
            text: b.description,
          })),
          { href: './mobile-price-list/', label: 'All price bands', meta: '7 bands', text: 'From under ₹10,000 to above ₹1,00,000.' },
          ...listHubCards.slice(3, 6),
        ],
      },
    ];
    for (const hub of hubPages) {
      const dir = path.join(DIST, hub.slug);
      ensureDir(dir);
      fs.writeFileSync(path.join(dir, 'index.html'), renderHubPage({ ...hub, config }));
      urls.push(`${config.siteUrl}/${hub.slug}/`);
    }

    // Rumored alias of the upcoming list
    const rumorDir = path.join(DIST, 'rumored-mobile-phones');
    ensureDir(rumorDir);
    fs.writeFileSync(path.join(rumorDir, 'index.html'), renderPhoneListingPage({
      slug: 'rumored-mobile-phones',
      h1Html: '<span class="price-highlight">Rumored</span> Mobile Phones',
      title: `Rumored Mobile Phones — Unreleased Models | ${config.siteName}`,
      description: 'Phones that are listed but not yet launched, with the specifications and prices on record.',
      list: upcoming,
      note: `${upcoming.length} models listed as upcoming or unreleased.`,
      sortNote: 'Sorted by availability date, newest first.',
      config,
    }));
    urls.push(`${config.siteUrl}/rumored-mobile-phones/`);

    // Deals page built from the tracked product catalogue
    const dealsDir = path.join(DIST, 'mobile-deals');
    ensureDir(dealsDir);
    fs.writeFileSync(path.join(dealsDir, 'index.html'), renderListPage({
      title: `Best Smartphone Deals in India (${formatMonthYear(new Date().toISOString())}) | ${config.siteName}`,
      headingHtml: 'Best Smartphone <span class="price-highlight">Deals</span>',
      description: 'Tracked smartphone deals with store prices, offers and Value Scores.',
      products,
      allProducts: products,
      canonicalUrl: `${config.siteUrl}/mobile-deals/`,
      rootPrefix: '../',
      activeSlug: 'mobile-deals',
      defaultCategory: 'smartphones',
      breadcrumbs: [
        { name: 'Home', href: '../', url: `${config.siteUrl}/` },
        { name: 'Mobile Deals', href: './', url: `${config.siteUrl}/mobile-deals/` },
      ],
    }));
    urls.push(`${config.siteUrl}/mobile-deals/`);

    // Combined stories feed
    const storiesDir = path.join(DIST, 'stories');
    ensureDir(storiesDir);
    fs.writeFileSync(path.join(storiesDir, 'index.html'), renderStoriesHub(content, config));
    urls.push(`${config.siteUrl}/stories/`);

    // Generated news / reviews / guides
    let storyCount = 0;
    for (const kind of ['news', 'reviews', 'guides']) {
      const items = content[kind];
      if (!items.length) continue;
      const dir = path.join(DIST, kind);
      ensureDir(dir);
      fs.writeFileSync(path.join(dir, 'index.html'), renderStoryIndex(kind, items, config));
      urls.push(`${config.siteUrl}/${kind}/`);
      for (const item of items) {
        const sub = path.join(dir, item.slug);
        ensureDir(sub);
        const related = items
          .filter((x) => x.slug !== item.slug)
          .sort((x, y) => (item.phone && x.phone?.brand === item.phone.brand ? -1 : 0) - (item.phone && y.phone?.brand === item.phone.brand ? -1 : 0))
          .slice(0, 4);
        fs.writeFileSync(path.join(sub, 'index.html'), renderStoryPage(item, config, related));
        urls.push(`${config.siteUrl}/${kind}/${item.slug}/`);
        storyCount++;
      }
    }

    // Google News Sitemap (last 48h or latest 50 news stories)
    const nowMs = Date.now();
    const recentNews = content.news.filter((n) => {
      const t = Date.parse(n.dateIso || '');
      return Number.isFinite(t) && (nowMs - t) <= 48 * 3600 * 1000;
    });
    const newsForSitemap = (recentNews.length ? recentNews : content.news).slice(0, 100);
    const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${newsForSitemap.map((item) => {
      const pubDate = new Date(item.dateIso || Date.now()).toISOString();
      return `  <url>\n    <loc>${esc(`${config.siteUrl}/news/${item.slug}/`)}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>${esc(config.siteName)}</news:name>\n        <news:language>en</news:language>\n      </news:publication>\n      <news:publication_date>${esc(pubDate)}</news:publication_date>\n      <news:title>${esc(item.title)}</news:title>\n    </news:news>\n  </url>`;
    }).join('\n')}\n</urlset>\n`;
    fs.writeFileSync(path.join(DIST, 'news-sitemap.xml'), newsSitemap);

    // RSS 2.0 Feed for Google News Publisher Center & Google Discover Follow
    const feedItems = [...content.news, ...content.reviews, ...content.guides]
      .sort((a, b) => Date.parse(b.dateIso || 0) - Date.parse(a.dateIso || 0))
      .slice(0, 30);
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">\n<channel>\n  <title>${esc(config.siteName)} — Latest News, Reviews &amp; Guides</title>\n  <link>${esc(config.siteUrl)}/</link>\n  <description>${esc(config.tagline || 'Live mobile phone prices, deals, specs and daily gadget news.')}</description>\n  <language>en-in</language>\n  <atom:link href="${esc(config.siteUrl)}/rss.xml" rel="self" type="application/rss+xml"/>\n${feedItems.map((item) => {
      const link = `${config.siteUrl}/${item.kind}/${item.slug}/`;
      const imgUrl = item.image ? `${config.siteUrl}/${item.image}` : (item.imagePhone ? phoneImageAbs(item.imagePhone, config) : '');
      const pubDate = new Date(item.dateIso || Date.now()).toUTCString();
      return `  <item>\n    <title>${esc(item.title)}</title>\n    <link>${esc(link)}</link>\n    <guid isPermaLink="true">${esc(link)}</guid>\n    <pubDate>${esc(pubDate)}</pubDate>\n    <description>${esc(item.excerpt || '')}</description>${imgUrl ? `\n    <media:content url="${esc(imgUrl)}" medium="image"/>` : ''}\n  </item>`;
    }).join('\n')}\n</channel>\n</rss>\n`;
    fs.writeFileSync(path.join(DIST, 'rss.xml'), rssXml);

    console.log(`Phones: ${phones.length} PDPs · ${brands.length} brands · ${pairs.length} comparisons · ${bands.length} price bands · ${listings.length} listings · ${storyCount} stories`);
  }

  // Sitemap & Robots
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\nSitemap: ${config.siteUrl}/news-sitemap.xml\n`);
  fs.writeFileSync(path.join(DIST, 'google24b27f993d02a70a.html'), 'google-site-verification: google24b27f993d02a70a.html\n');

  console.log(`Built ${urls.length} pages (${products.length} products) into dist/`);
}

build();
