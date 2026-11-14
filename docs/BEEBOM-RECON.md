# Beebom Gadgets — reverse-engineering notes

Source: https://gadgets.beebom.com/ (recon 2026-11-14). Findings only — no copied prose/assets.

## Stack
- **Astro** SSR + islands (`astro-island`, `cdn.beebom.com/_astro/*.js`), CDN-hosted.
- Custom analytics attributes on every clickable node (`dbe`/`dbt`/`dge`/`dgms`, base64 values).
- `robots.txt`: `Disallow /_next/`, `/brand/*`, `/brands/*`, `/filter/*`, `/*?s=`, `/*?sortOrder=`, `/mobile/*?view=*`.
- Sitemap index → 12 child sitemaps.

## Scale (13,501 URLs)
| sitemap | urls | page type |
|---|---|---|
| news_articles.xml | 5,044 | news |
| compare-mobiles.xml | 4,725 | comparison (`a-vs-b`) |
| all_mobiles.xml | 2,526 | phone PDP |
| articles.xml | 722 | guides/features |
| mobile_price_list.xml | 265 | price list |
| mobile_reviews.xml | 110 | reviews |
| best_mobiles.xml | 52 | ranked lists |
| mobile_brands.xml | 36 | brand hubs |
| google_mobile_news.xml | 16 | news (mobile) |
| upcoming_mobile_list.xml | 2 | upcoming |
| store.xml, mobile-deals.xml | 3 | commerce |

## URL taxonomy
```
/                                  home
/mobile/<slug>                     phone PDP (2,526)
/compare, /compare/<a>-vs-<b>      comparison hub + pairs (4,725)
/mobile-brands, /mobile-list       brand hubs + listings
/mobile-list/<brand>               per-brand listing
/best-phones-under-{10000..60000}  budget lists (N per price band)
/best-{camera,gaming,display}-phones
/{popular,latest,global,rumored,upcoming}-mobile-phones
/mobile-price-list[/<range>]       265 price-list pages
/mobile-deals, /news, /reviews, /guides, /stories
```

## Phone PDP template (section order)
1. H1 + price / market status (e.g. "Not Released in India") + **Beebom Score** (0–100) and/or star rating.
2. **Key Highlights** — Processor, Display, Battery, Rear Camera, Front Camera, RAM/Storage.
3. **Benchmarks**.
4. **Alternative Comparisons** (links into /compare/).
5. **Ask Beebom** — AI Q&A block.
6. **Timeline** — release/price history.
7. **Full Specifications** — sticky category nav + "Expanded View" toggle.
8. **Explore <Brand> Phones** — Latest / Upcoming / Global tabs.
9. **Explore Mobile Phones** — Latest / Upcoming / Popular tabs.
10. **Tech News** — latest 5 items with author + date.

## Spec data model (12 groups, ~70 fields)
- **General**: Box Contents, Availability, Launch Price
- **Display**: Display Type, Refresh Rate, Playback Quality, LTPO, LTPS, Touch Sampling Rate, Anti Reflection Coating, Display Size, Screen-to-Body, Form Factor, Resolution (+W/H), Aspect Ratio, Pixel Density, Contrast Ratio, Colour Gamut (+Range), Bit Rate, Colour Depth, Eye Protection, High Brightness
- **Body**: Dimensions, Weight, Front/Back/Side materials, Build Quality, Ports, IP Rating, Speaker
- **Processor**: Chipset Manufacturer, Chipset, Fabrication Size, Number of Cores, Clock Speed, GPU
- **Operating System**: OS, Software Updates policy
- **Main Camera**: Megapixel, Lens Type, Aperture, Auto Focus Type, Dynamic Video Recording, Max Zoom, Features, Video Recording, HDR Recording, Video Features
- **Selfie Camera**: Front Camera #1 Megapixel / Lens Type / Aperture, Auto Focus, Features, Video
- **Battery**: Capacity, Wired Charging, Wireless Charging, Reverse Wireless, Reverse Wired, Bypass Charging
- **Memory**: Storage Size, Storage Type, RAM Size, RAM Type
- **Network**: SIM, Technology, 2G/3G/4G/5G Bands, Speed
- **Connectivity**: Wi-Fi Version, Wi-Fi Standards, Bluetooth Version, Bluetooth Codecs, Positioning
- **Features**: Fingerprint Scanner, Sensors on Board, Additional Features

## Listing template (`/best-phones-under-20000`)
- H1 pattern: `Top N Phones Under 20000 (Nov 2026)`.
- Facets observed in markup: **brand** (142 hits), **RAM** (83), **storage** (32), **5G** (1,150), price range, plus `sortOrder`.
- Card: score badge, price, star rating when reviewed.

## Compare template
`/compare/<a>-vs-<b>` → "A vs B Comparison Overview", spec-by-spec diff, plus per-section grouping.

## Feature inventory
Global search, faceted filtering, sorting, Beebom Score, star ratings, price-history timeline,
market status (released/upcoming/rumored/not-in-India), AI Q&A ("Ask Beebom"), benchmarks,
brand hubs with latest/upcoming/global tabs, affiliate store links, news feed injection.

## Reality check on "clone everything"
- Page **counts** are generated from data: 2,526 PDPs are not hand-written; 4,725 comparisons are pair permutations. A generator can emit the same *shape* at the same scale.
- Product **specs and prices are facts** — importable.
- Editorial **text, photos, logo and brand** are copyright — must be replaced with own copy and imagery.
- 5,044 news + 722 articles are editorial content; only an own-content feed is viable.

## Mapping to this repo (gadget-finder → "Best Phone Under")
| Beebom | Current repo | Needed |
|---|---|---|
| /mobile/<slug> specs groups | `data/products.json` flat `specs` | grouped spec model, ~70 fields |
| /best-phones-under-N | `config.budgetPages` | add facet filters + sort |
| /compare/<a>-vs-<b> | compare bar (3 products, client-side) | generated static pair pages |
| /mobile-brands/<b> | — | brand hub pages |
| /mobile-price-list | — | price-band index |
| news/reviews/guides | — | own-content collections |
| Beebom Score | `score` + `valueScore` | align scale (0–100) |

## Implementation status
**Done**
- `scripts/scrape-phones.mjs` — parses Astro island props (12 spec groups + sub-specs), highlights
  table, gallery, score, rating, market status, price. Resumable, rate-limited, `--dry` mode.
- `data/phones.json` — 78 phones, 20 brands, ~45 spec entries each (3,483 total), 99% with price,
  97% with the full 12 groups.
- `scripts/build.mjs` — `renderPhonePage` + `renderPhoneIndex`: `/mobile/<slug>/` and `/mobile/`.
  Sections: hero (image/score/status/price), Key Highlights, sticky spec nav + 12 spec groups
  (parent rows + indented sub-specs), "More <brand> phones", "Alternatives in a similar price range",
  Product JSON-LD with `additionalProperty`, sitemap entries.
- `src/styles/main.css` — phone hero, score ring, spec layout/nav/table, mini-card grid, mobile breakpoints.
- Local image override: drop `src/assets/phones/<slug>.jpg|png|webp` and it wins over everything.
  `config.useRemoteImages` (default `false`) opts into third-party gallery URLs — replace before publishing.
- `scripts/fetch-images.mjs` (`npm run images`) — downloads the best product render for every phone.
  Ranks gallery candidates so `Design` front-and-back renders beat benchmark screenshots, camera
  samples and video links; measures real pixel size from PNG/JPEG/WebP headers (no image tools
  needed); stores `src/assets/phones/<slug>.<ext>` (1000×1000, 59 MB total) and records
  `phone.image {file,width,height,bytes,source,fetchedAt}` + `imageStats` in `data/phones.json`.
  Flags: `--limit`, `--slug`, `--force`, `--min-width`, `--delay`, `--dry`.
  Phone cards on `/mobile/` and the "More \<brand\>" / "Alternatives" rails now render thumbnails
  with `loading="lazy"`.

**Image sourcing note:** the CDN renders are third-party assets — fine for local prototyping, but
replace with your own affiliate-feed or licensed photography before publishing. Drop your own file
at the same path and every page picks it up on the next build.

**Done — phone hubs, comparisons, price lists**
- `renderBrandIndex` / `renderBrandPage`: `/mobile-brands/` (20 brands) and
  `/mobile-brands/<brand>/` with stat strip (models, 5G models, cheapest, priciest),
  "Latest <brand> phones" by availability date, all models by price, brand-local comparison
  links, and cross-brand chips.
- `buildComparePairs` / `renderCompareHub` / `renderComparePage`: **234 generated**
  `/compare/<a>-vs-<b>/` pages from nearest-price and same-brand pairs (deduped, canonical
  alphabetical key). Each page: two summary cards (image, price, score, highlights), an
  auto-generated factual "At a Glance" list (cheaper, battery, charging, RAM, storage, display,
  weight, 5G, refresh), a per-group spec table with differing rows highlighted, and similar
  comparisons. Hub groups pairs by price band.
- `renderPriceListIndex` / `renderPriceBandPage`: `/mobile-price-list/` plus 7 INR bands
  (under ₹10k → above ₹1L), cheapest first, band chips, ItemList schema.
- Faceted phone directory on `/mobile/`: brand, RAM (min), storage (min), 5G-only/4G-only,
  sort (score / price / name), live count, reset, empty state. Filters re-order the same grid
  in `app.js`; global search also filters it. Cards expose `data-brand/price/ram/storage/5g/score/name/search`.
- Site nav now carries Phones · Brands · Compare · Price List · News · Reviews · Guides.

**Done — home parity + discovery + editorial**
- `renderHomePage` mirrors the Beebom home section order exactly: finder hero (product type, price
  under, priority, Search) with trending chips → Upcoming Phones rail → Latest Phones rail →
  Popular Brands grid → Latest News (featured + list) → Latest Reviews → Browse Phones By Price
  (tabs ₹10k/20k/30k/40k/50k/60k, top 4 by score each, JS tab switch) → Browse Phones by Features
  (6 tiles: camera, 5G, display, gaming, big battery, fast charging) → Latest Guides → Global
  Phones rail → Popular Comparisons tiles.
- Finder form does a GET to `./mobile/`; directory reads `max`, `sort`, `brand`, `ram`, `storage`,
  `5g` and `q` from the URL, so deep links like `/mobile/?max=20000&sort=score` work.
- Discovery listings (10): `latest-mobile-phones`, `upcoming-mobile-phones`,
  `popular-mobile-phones`, `global-mobile-phones` (non-INR), `best-camera-phones`,
  `best-gaming-phones`, `best-display-phones`, `mobile-list/5g-phones`,
  `mobile-list/big-battery-phones`, `mobile-list/fast-charging-phones`. Each has a top-5 ranked
  block, full grid, ItemList + Breadcrumb JSON-LD and cross-links.
- Generated editorial (own wording, factual specs only): 12 launch briefs (`/news/`),
  12 data reviews (`/reviews/`, Review JSON-LD with rating), 5 static buying guides (`/guides/`),
  plus the three collection indexes. Story pages carry a featured image, key-spec table,
  verdict box for reviews, related cards and Product/Brand/Compare links.
- Build output: **404 pages**, 405 HTML files, 22,209 internal refs, **0 broken** (full-dist crawl).
  Verified in-browser: home section order/counts, price tabs, finder deep link (33 of 78 under
  ₹20k), nested listing asset paths, news/review/guide pages, 0 horizontal overflow at mobile width.

**Next**
- Crawl depth: 78 → 300 → full 2,526 catalog (`npm run scrape` is resumable).
- Optional: compare-page pagination/sitemap splitting once the catalog grows past a few hundred.
- Replace generated briefs with real affiliate/editorial feeds when available.

