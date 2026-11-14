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
