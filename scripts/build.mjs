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

function formatMonthYear(iso) {
  try {
    return new Date(iso || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return 'Nov 2026';
  }
}

function renderHead({ title, description, canonicalUrl, jsonLdList, assetPrefix }) {
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
  <meta property="og:type" content="website"/>
  ${monetagMeta}
  <link rel="stylesheet" href="${assetPrefix}assets/main.css"/>
  ${jsonLdList.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n  ')}
  ${gaScript}
  ${monetagScript}
</head>`;
}

function renderHeader(rootPrefix, activeSlug = '') {
  const navItems = [
    { href: `${rootPrefix}`, label: 'All Gadgets', slug: '' },
    ...config.budgetPages.map((b) => ({ href: `${rootPrefix}${b.slug}/`, label: b.shortTitle, slug: b.slug }))
  ];
  return `<header class="site-header">
  <div class="container">
    <div class="header-top">
      <a class="brand" href="${rootPrefix}">
        <span class="brand-mark">${esc(config.siteName.split(' ')[0])}</span>
        <span class="brand-sep">|</span>
        <span class="brand-sub">${esc(config.siteName.split(' ').slice(1).join(' ') || 'Gadgets')}</span>
      </a>
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input id="global-search" type="search" placeholder='Search "Poco", "Ryzen 5", "earbuds under 1000"...' aria-label="Search gadgets"/>
      </div>
      <a class="header-cta" href="${rootPrefix}best-gadgets-under-1000/">🔥 Deals Under ₹1,000</a>
    </div>
    <nav class="nav-strip" aria-label="Budget Categories">
      ${navItems.map((n) => `<a class="nav-link ${n.slug === activeSlug ? 'active' : ''}" href="${n.href}">${esc(n.label)}</a>`).join('')}
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
          ${deviceSvg(p.category)}
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
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    brand: { '@type': 'Brand', name: p.brand },
    description: p.expertVerdict || `${p.name} specs and lowest prices across Amazon, Flipkart, Croma and JioMart.`,
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
    assetPrefix: rootPrefix
  })}
<body>
${renderHeader(rootPrefix)}
<main class="container">
  <section class="page-hero">
    <nav class="breadcrumbs"><a href="${rootPrefix}">Home</a> › <span>${esc(p.name)}</span></nav>
    <h1>${esc(p.name)} <span class="price-highlight">${formatINR(p.lowestPrice)}</span></h1>
    <p class="hero-desc">${esc(p.expertVerdict || '')}</p>
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

function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(path.join(DIST, 'assets'));

  fs.copyFileSync(path.join(ROOT, 'src/styles/main.css'), path.join(DIST, 'assets/main.css'));
  fs.copyFileSync(path.join(ROOT, 'src/scripts/app.js'), path.join(DIST, 'assets/app.js'));

  const products = (catalog.products || []).map(enrichProduct).sort((a, b) => b.score - a.score);
  const urls = [`${config.siteUrl}/`];

  // Home page
  const monthYear = formatMonthYear(catalog.lastUpdated);
  const homeHtml = renderListPage({
    title: `Best Smartphones, Laptops & Electronic Gadgets (${monthYear}) | ${config.siteName}`,
    headingHtml: `Best Smartphones, Laptops &amp; Gadgets <span class="price-highlight">Under ₹1,000 to ₹60,000</span>`,
    description: 'Compare verified lowest prices, specs, Value Scores, and latest bank offers across Amazon, Flipkart, Croma, and JioMart.',
    products,
    allProducts: products,
    canonicalUrl: `${config.siteUrl}/`,
    rootPrefix: './',
    activeSlug: '',
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

  // Product detail pages
  for (const p of products) {
    const dir = path.join(DIST, 'product', p.slug);
    ensureDir(dir);
    fs.writeFileSync(path.join(dir, 'index.html'), renderProductPage(p, products));
    urls.push(`${config.siteUrl}/product/${p.slug}/`);
  }

  // Sitemap & Robots
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);

  console.log(`Built ${urls.length} pages (${products.length} products) into dist/`);
}

build();
