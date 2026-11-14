# TechPick Gadgets — Free & Automated Price Comparison Site

A **Beebom Gadgets-inspired** static electronics & price-comparison site comparing **Smartphones, Laptops, Audio, Smartwatches & Accessories** across **Amazon, Flipkart, Croma, and JioMart**—hosted and automated **$0/month** on **GitHub Pages + GitHub Actions**.

---

## Features Included
- **Beebom-Style Product Cards:** Rank badge, Value Score, Market Status, 5 scannable spec rows, Pros & Cons, Expert Verdict, and direct `Buy Now` links.
- **Multi-Store Price & Offer Comparison:** Displays Amazon, Flipkart, Croma, and JioMart side-by-side with lowest-price highlighting and a *"Check stores & bank offers"* modal.
- **Programmatic SEO Landing Pages:** Auto-generates `/best-gadgets-under-1000/`, `/best-gadgets-under-5000/`, `/best-phones-under-10000/`, `/best-phones-under-20000/`, `/best-laptops-under-40000/`, `/best-laptops-under-60000/`, plus individual `/product/<slug>/` pages, `sitemap.xml`, and JSON-LD schemas (`ItemList`, `Product`, `AggregateOffer`, `BreadcrumbList`).
- **Side-by-Side Comparison:** Sticky compare bar supporting up to 3 products at once.
- **Zero-Cost Automation (`scripts/auto-update.mjs`):** Fetches new deals every 6 hours via official **Cuelinks API** and/or public **RSS deal feeds**, structures specs/pros/cons using the **free Gemini API**, wraps your affiliate tags, rebuilds, and deploys automatically.

---

## Local Commands (Zero Dependencies Required)
```bash
pnpm run build       # Build static site into dist/
pnpm run update:dry  # Test deal fetcher without modifying data/products.json
pnpm run preview     # Preview locally on http://127.0.0.1:4173/
```

---

## Deploy Free & Fully Automated in 5 Minutes

1. **Create a GitHub Repository** and push this `gadget-finder` folder to the `main` branch.
2. **Enable GitHub Pages:**
   - Go to **Repo Settings → Pages → Source → GitHub Actions**.
3. **Add Free Automation Secrets (Repo Settings → Secrets and variables → Actions):**
   - `GEMINI_API_KEY`: Free key from [aistudio.google.com](https://aistudio.google.com) (lets the updater classify new deals into specs, Pros/Cons, and Value Scores).
   - `CUELINKS_API_KEY` *(optional)*: Free publisher API key from Cuelinks (aggregates live Flipkart, Amazon, Croma, and JioMart offers legally).
4. **Configure Affiliates & Monetag (`config/site.config.json`):**
   - Set `siteUrl` to your `https://<username>.github.io/<repo-name>` URL.
   - Add your `amazonTag` / `cuelinksPublisherId`.
   - Set `monetag.enabled: true` and paste your Monetag `verificationMeta` and `zoneScriptUrl`.
5. **Trigger First Run:**
   - Open **Actions → Auto-Update Deals & Deploy to GitHub Pages → Run workflow**. After that, it runs automatically every 6 hours for $0.
