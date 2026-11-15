(() => {
  'use strict';

  const state = {
    category: document.body.dataset.defaultCategory || 'all',
    maxPrice: Number(document.body.dataset.defaultMaxPrice || 0) || Infinity,
    store: 'all',
    sort: 'score',
    query: '',
    compare: []
  };

  const cards = Array.from(document.querySelectorAll('.product-card'));
  const cardsContainer = document.getElementById('cards-list');
  const resultCount = document.getElementById('result-count');
  const searchInput = document.getElementById('global-search');
  const sortSelect = document.getElementById('sort-select');
  const storeSelect = document.getElementById('store-select');
  const modal = document.getElementById('app-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const compareDock = document.getElementById('compare-dock');
  const compareText = document.getElementById('compare-count-text');

  function formatINR(num) {
    return '₹' + Number(num).toLocaleString('en-IN');
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function applyFilters() {
    if (!cardsContainer) return;
    const q = state.query.trim().toLowerCase();

    const filtered = cards.filter((card) => {
      const cat = card.dataset.category || '';
      const price = Number(card.dataset.price || 0);
      const stores = (card.dataset.stores || '').toLowerCase().split(',');
      const text = (card.dataset.search || '').toLowerCase();

      if (state.category !== 'all' && cat !== state.category) return false;
      if (Number.isFinite(state.maxPrice) && price > state.maxPrice) return false;
      if (state.store !== 'all' && !stores.includes(state.store.toLowerCase())) return false;
      if (q && !text.includes(q)) return false;
      return true;
    });

    filtered.sort((a, b) => {
      if (state.sort === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
      if (state.sort === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
      if (state.sort === 'discount') return Number(b.dataset.discount) - Number(a.dataset.discount);
      return Number(b.dataset.score) - Number(a.dataset.score);
    });

    cards.forEach((c) => { c.style.display = 'none'; });
    filtered.forEach((c, idx) => {
      c.style.display = '';
      const badge = c.querySelector('.rank-badge');
      if (badge) badge.textContent = String(idx + 1);
      cardsContainer.appendChild(c);
    });

    if (resultCount) {
      resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'} found`;
    }

    let empty = document.getElementById('empty-state');
    if (filtered.length === 0) {
      if (!empty) {
        empty = document.createElement('div');
        empty.id = 'empty-state';
        empty.className = 'product-card';
        empty.innerHTML = '<strong>No matching gadgets found.</strong><p style="margin:6px 0 0;color:#64748b">Try raising your price limit or clearing the search filter.</p>';
        cardsContainer.appendChild(empty);
      }
      empty.style.display = '';
    } else if (empty) {
      empty.style.display = 'none';
    }
  }

  document.querySelectorAll('[data-filter-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-cat]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.category = btn.dataset.filterCat;
      applyFilters();
    });
  });

  document.querySelectorAll('[data-filter-price]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-price]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const p = Number(btn.dataset.filterPrice);
      state.maxPrice = p > 0 ? p : Infinity;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.query = e.target.value;
      applyFilters();
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      applyFilters();
    });
  }
  if (storeSelect) {
    storeSelect.addEventListener('change', (e) => {
      state.store = e.target.value;
      applyFilters();
    });
  }

  function openModal(title, html) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modal.classList.add('open');
  }

  function closeModal() {
    if (modal) modal.classList.remove('open');
  }

  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  document.addEventListener('click', (e) => {
    const offerBtn = e.target.closest('[data-offers-json]');
    if (offerBtn) {
      const data = JSON.parse(offerBtn.dataset.offersJson);
      const minPrice = Math.min(...data.stores.map((s) => s.price));
      const rows = data.stores
        .slice()
        .sort((a, b) => a.price - b.price)
        .map((s) => `
          <div class="offer-row ${s.price === minPrice ? 'best' : ''}">
            <div>
              <strong>${escapeHtml(s.store)}</strong> ${s.price === minPrice ? '<span class="discount-badge">Lowest Price</span>' : ''}
              <div style="font-size:12.5px;color:#475569;margin-top:4px">${escapeHtml(s.offer || 'Standard store listing')}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <strong style="font-size:18px">${formatINR(s.price)}</strong>
              <a class="buy-btn" href="${escapeHtml(s.url)}" target="_blank" rel="nofollow sponsored noopener">Buy Now &gt;</a>
            </div>
          </div>
        `).join('');
      openModal(`${data.name} — All Stores & Bank Offers`, rows);
      return;
    }

    const cmpBtn = e.target.closest('[data-compare-id]');
    if (cmpBtn) {
      const id = cmpBtn.dataset.compareId;
      const idx = state.compare.indexOf(id);
      if (idx >= 0) {
        state.compare.splice(idx, 1);
        cmpBtn.classList.remove('selected');
        cmpBtn.textContent = '+ Compare';
      } else {
        if (state.compare.length >= 3) {
          alert('You can compare up to 3 products at once.');
          return;
        }
        state.compare.push(id);
        cmpBtn.classList.add('selected');
        cmpBtn.textContent = '✓ Added';
      }
      updateCompareDock();
    }
  });

  function updateCompareDock() {
    if (!compareDock) return;
    if (state.compare.length > 0) {
      compareDock.classList.add('visible');
      compareText.textContent = `${state.compare.length} selected for comparison`;
    } else {
      compareDock.classList.remove('visible');
    }
  }

  document.getElementById('compare-now-btn')?.addEventListener('click', () => {
    const items = state.compare
      .map((id) => document.querySelector(`.product-card[data-id="${id}"]`)?.dataset.productJson)
      .filter(Boolean)
      .map((raw) => JSON.parse(raw));
    if (!items.length) return;
    const cols = items.map((p) => `<th>${escapeHtml(p.name)}</th>`).join('');
    const row = (label, fn) => `<tr><td><strong>${label}</strong></td>${items.map((p) => `<td>${fn(p)}</td>`).join('')}</tr>`;
    const html = `
      <div class="table-wrap">
        <table class="summary-table">
          <thead><tr><th>Spec</th>${cols}</tr></thead>
          <tbody>
            ${row('Lowest Price', (p) => `<strong>${formatINR(p.lowestPrice)}</strong> (${escapeHtml(p.bestStore)})`)}
            ${row('Value Score', (p) => `${p.score}/100`)}
            ${row('Processor', (p) => escapeHtml(p.specs.processor))}
            ${row('Display', (p) => escapeHtml(p.specs.display))}
            ${row('Camera / Features', (p) => escapeHtml(p.specs.camera))}
            ${row('Battery / Power', (p) => escapeHtml(p.specs.battery))}
            ${row('Memory / Build', (p) => escapeHtml(p.specs.memory))}
          </tbody>
        </table>
      </div>
    `;
    openModal('Side-by-Side Comparison', html);
  });

  document.getElementById('compare-clear-btn')?.addEventListener('click', () => {
    state.compare = [];
    document.querySelectorAll('[data-compare-id]').forEach((b) => {
      b.classList.remove('selected');
      b.textContent = '+ Compare';
    });
    updateCompareDock();
  });

  applyFilters();
})();

/* Phone directory filters (/mobile/) */
(() => {
  'use strict';

  const grid = document.getElementById('phone-directory');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.mini-card'));
  const brandSelect = document.getElementById('phone-brand');
  const ramSelect = document.getElementById('phone-ram');
  const storageSelect = document.getElementById('phone-storage');
  const networkSelect = document.getElementById('phone-5g');
  const sortSelect = document.getElementById('phone-sort');
  const maxSelect = document.getElementById('phone-max');
  const resetBtn = document.getElementById('phone-reset');
  const countEl = document.getElementById('phone-count');
  const emptyEl = document.getElementById('phone-empty');
  const searchEl = document.getElementById('global-search');

  function apply() {
    const brand = brandSelect?.value || 'all';
    const minRam = Number(ramSelect?.value || 0) || 0;
    const minStorage = Number(storageSelect?.value || 0) || 0;
    const network = networkSelect?.value || 'all';
    const maxPrice = Number(maxSelect?.value || 0) || 0;
    const sort = sortSelect?.value || 'score';
    const query = (searchEl?.value || '').trim().toLowerCase();

    const visible = cards.filter((card) => {
      if (brand !== 'all' && card.dataset.brand !== brand) return false;
      if (minRam && Number(card.dataset.ram || 0) < minRam) return false;
      if (minStorage && Number(card.dataset.storage || 0) < minStorage) return false;
      if (network !== 'all' && card.dataset['5g'] !== network) return false;
      const cardPrice = Number(card.dataset.price || 0);
      if (maxPrice && (cardPrice <= 0 || cardPrice > maxPrice)) return false;
      if (query && !(card.dataset.search || '').toLowerCase().includes(query)) return false;
      return true;
    });

    visible.sort((a, b) => {
      if (sort === 'price-asc') return (Number(a.dataset.price) || Infinity) - (Number(b.dataset.price) || Infinity);
      if (sort === 'price-desc') return (Number(b.dataset.price) || 0) - (Number(a.dataset.price) || 0);
      if (sort === 'camera') return Number(b.dataset.camera || 0) - Number(a.dataset.camera || 0) || Number(b.dataset.score || 0) - Number(a.dataset.score || 0);
      if (sort === 'battery') return Number(b.dataset.battery || 0) - Number(a.dataset.battery || 0);
      if (sort === 'display') return Number(b.dataset.refresh || 0) - Number(a.dataset.refresh || 0);
      if (sort === 'name') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
      return Number(b.dataset.score || 0) - Number(a.dataset.score || 0);
    });

    cards.forEach((card) => { card.hidden = true; });
    visible.forEach((card) => {
      card.hidden = false;
      grid.appendChild(card);
    });

    if (countEl) countEl.textContent = `${visible.length} of ${cards.length} phones`;
    if (emptyEl) emptyEl.hidden = visible.length > 0;
  }

  [brandSelect, ramSelect, storageSelect, networkSelect, sortSelect, maxSelect].forEach((el) => {
    el?.addEventListener('change', apply);
  });
  searchEl?.addEventListener('input', apply);
  resetBtn?.addEventListener('click', () => {
    if (brandSelect) brandSelect.value = 'all';
    if (ramSelect) ramSelect.value = 'all';
    if (storageSelect) storageSelect.value = 'all';
    if (networkSelect) networkSelect.value = 'all';
    if (maxSelect) maxSelect.value = '';
    if (sortSelect) sortSelect.value = 'score';
    if (searchEl) searchEl.value = '';
    apply();
  });

  // Deep links from the home finder: /mobile/?max=20000&sort=camera&brand=Vivo
  const params = new URLSearchParams(location.search);
  const assign = (el, value) => {
    if (!el || !value) return;
    const exists = [...el.options].some((o) => o.value === value);
    if (exists) el.value = value;
  };
  assign(maxSelect, params.get('max'));
  assign(sortSelect, params.get('sort'));
  assign(brandSelect, params.get('brand'));
  assign(ramSelect, params.get('ram'));
  assign(storageSelect, params.get('storage'));
  assign(networkSelect, params.get('5g'));
  if (searchEl && params.get('q')) searchEl.value = params.get('q');

  apply();
})();

/* Home page price tabs */
(() => {
  'use strict';
  const tabs = document.getElementById('price-tabs');
  if (!tabs) return;
  const buttons = Array.from(tabs.querySelectorAll('[data-price-tab]'));
  const panels = Array.from(tabs.querySelectorAll('[data-price-panel]'));
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.pricePanel === btn.dataset.priceTab);
      });
    });
  });
})();

/* Listing page price sort & budget filter */
(() => {
  'use strict';
  const grid = document.querySelector('[data-listing-grid]');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.mini-card'));
  const sortEl = document.getElementById('listing-sort');
  const countEl = document.getElementById('listing-count');
  const pills = Array.from(document.querySelectorAll('[data-listing-max]'));
  let maxPrice = 0;

  function update() {
    const sort = sortEl?.value || 'default';
    const visible = cards.filter((card) => {
      const p = Number(card.dataset.price || 0);
      if (maxPrice > 0 && (p <= 0 || p > maxPrice)) return false;
      return true;
    });
    if (sort === 'price-asc') {
      visible.sort((a, b) => (Number(a.dataset.price) || Infinity) - (Number(b.dataset.price) || Infinity));
    } else if (sort === 'price-desc') {
      visible.sort((a, b) => (Number(b.dataset.price) || 0) - (Number(a.dataset.price) || 0));
    } else if (sort === 'score') {
      visible.sort((a, b) => Number(b.dataset.score || 0) - Number(a.dataset.score || 0));
    } else if (sort === 'refresh') {
      visible.sort((a, b) => Number(b.dataset.refresh || 0) - Number(a.dataset.refresh || 0));
    }
    cards.forEach((c) => { c.hidden = true; });
    visible.forEach((c) => { c.hidden = false; grid.appendChild(c); });
    if (countEl) countEl.textContent = `${visible.length} ${visible.length === 1 ? 'model' : 'models'}`;
  }

  pills.forEach((btn) => {
    btn.addEventListener('click', () => {
      pills.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      maxPrice = Number(btn.dataset.listingMax || 0) || 0;
      update();
    });
  });
  sortEl?.addEventListener('change', update);
})();

/* Global Live Search across all pages */
(() => {
  'use strict';
  const input = document.getElementById('global-search');
  if (!input) return;
  const box = input.closest('.search-box');
  if (!box) return;
  const header = document.querySelector('.site-header');
  const rootPrefix = header?.dataset.root || './';

  let indexPromise = null;
  let indexData = null;

  const dropdown = document.createElement('div');
  dropdown.id = 'global-search-results';
  dropdown.className = 'search-dropdown';
  dropdown.hidden = true;
  box.appendChild(dropdown);

  function loadIndex() {
    if (indexData) return Promise.resolve(indexData);
    if (!indexPromise) {
      indexPromise = fetch(`${rootPrefix}assets/search-index.json`)
        .then((r) => (r.ok ? r.json() : []))
        .then((data) => {
          indexData = Array.isArray(data) ? data : [];
          return indexData;
        })
        .catch(() => []);
    }
    return indexPromise;
  }

  function escHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function parseQuery(raw) {
    const clean = raw.trim().toLowerCase();
    let maxPrice = 0;
    const underMatch = clean.match(/\b(?:under|below|<)\s*(?:rs\.?|₹)?\s*(\d{3,6})\b/);
    if (underMatch) maxPrice = Number(underMatch[1]);
    const text = clean
      .replace(/\b(?:under|below|<)\s*(?:rs\.?|₹)?\s*\d{3,6}\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const tokens = text ? text.split(' ').filter(Boolean) : [];
    return { tokens, maxPrice, rawClean: clean };
  }

  async function renderResults() {
    const q = input.value.trim();
    if (!q) {
      dropdown.hidden = true;
      dropdown.innerHTML = '';
      return;
    }
    const items = await loadIndex();
    const { tokens, maxPrice } = parseQuery(q);
    const matches = items.filter((it) => {
      if (maxPrice > 0 && (it.a <= 0 || it.a > maxPrice)) return false;
      for (const tok of tokens) {
        if (!it.t.includes(tok)) return false;
      }
      return true;
    }).slice(0, 8);

    if (!matches.length) {
      dropdown.innerHTML = `<div class="search-empty">No matches for "${escHtml(q)}"</div><a class="search-all-link" href="${rootPrefix}mobile/?q=${encodeURIComponent(q)}">Browse all phones ›</a>`;
      dropdown.hidden = false;
      return;
    }

    dropdown.innerHTML = matches.map((m) => `
      <a class="search-result-item" href="${rootPrefix}${escHtml(m.u)}">
        <span class="search-result-main">
          <span class="search-result-name">${escHtml(m.n)}</span>
          <span class="search-result-sub">${escHtml(m.b)}</span>
        </span>
        ${m.p ? `<span class="search-result-price">${escHtml(m.p)}</span>` : ''}
      </a>`).join('') + `<a class="search-all-link" href="${rootPrefix}mobile/?q=${encodeURIComponent(q)}">See all results for "${escHtml(q)}" ›</a>`;
    dropdown.hidden = false;
  }

  let timer = null;
  input.addEventListener('focus', () => {
    loadIndex();
    if (input.value.trim()) renderResults();
  });
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(renderResults, 90);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.hidden = true;
      return;
    }
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (!q) return;
      e.preventDefault();
      const first = dropdown.querySelector('.search-result-item');
      if (first && first.getAttribute('href')) {
        location.href = first.getAttribute('href');
      } else {
        location.href = `${rootPrefix}mobile/?q=${encodeURIComponent(q)}`;
      }
    }
  });
  document.addEventListener('click', (e) => {
    if (!box.contains(e.target)) dropdown.hidden = true;
  });
})();

/* Home Finder Form Category Routing (Mobile, Laptops, Earbuds, Smart Watch) */
(() => {
  'use strict';
  const form = document.querySelector('.finder-form');
  const typeEl = document.getElementById('finder-type');
  if (!form || !typeEl) return;
  const syncAction = () => {
    const val = typeEl.value || 'mobile';
    form.setAttribute('action', `./${val}/`);
  };
  typeEl.addEventListener('change', syncAction);
  form.addEventListener('submit', syncAction);
  syncAction();
})();


