import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');

const newTablets = [
  {
    id: "apple-ipad-pro-11-m4",
    slug: "apple-ipad-pro-11-m4",
    name: "Apple iPad Pro 11\" M4 (Ultra Retina XDR Tandem OLED / 256GB Wi-Fi)",
    brand: "Apple",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "apple", "ipad-pro", "m4", "oled", "flagship"],
    status: "In Stock",
    score: 98,
    launchedOn: "15 May 2024",
    updatedAt: new Date().toISOString(),
    mrp: 99900,
    specs: {
      processor: "Apple M4 Chip (9-core CPU / 10-core GPU / 16-core Neural Engine 38 TOPS)",
      display: "11\" Ultra Retina XDR Tandem OLED (2420x1668) | 120Hz ProMotion | 1000 nits Full Screen",
      camera: "12MP Wide back camera with LiDAR scanner | Landscape 12MP Ultra Wide front camera",
      battery: "31.29Wh Rechargeable Lithium-Polymer | Up to 10 Hours Web Surfing",
      memory: "8GB RAM | 256GB High-Speed Storage"
    },
    pros: ["Groundbreaking Tandem OLED display with insane contrast and 1600 nits peak HDR", "Impossibly thin 5.3mm ultra-light design", "Colossal M4 processing power with hardware ray tracing"],
    cons: ["Very expensive with Pencil Pro and Magic Keyboard sold separately", "iPadOS still limits desktop multitasking"],
    expertVerdict: "The absolute pinnacle of tablet technology. The tandem OLED screen and M4 silicon set an unreachable benchmark.",
    stores: [
      { store: "Amazon", price: 94900, offer: "₹4,000 instant bank discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+iPad+Pro+11+M4&tag=teachunder-21" },
      { store: "Flipkart", price: 95900, offer: "₹3,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Apple+iPad+Pro+11+M4" },
      { store: "Croma", price: 97900, offer: "Free Apple 20W Power Adapter with store coupon", inStock: true, url: "https://www.croma.com/searchB?q=Apple%20iPad%20Pro%2011%20M4" },
      { store: "JioMart", price: 98900, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/iPad%20Pro%2011%20M4" }
    ]
  },
  {
    id: "apple-ipad-mini-7-a17-pro",
    slug: "apple-ipad-mini-7-a17-pro",
    name: "Apple iPad mini 7 8.3\" (A17 Pro Chip / 128GB Wi-Fi / Apple Intelligence)",
    brand: "Apple",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "apple", "ipad-mini", "a17-pro", "compact", "stylus"],
    status: "In Stock",
    score: 93,
    launchedOn: "23 Oct 2024",
    updatedAt: new Date().toISOString(),
    mrp: 49900,
    specs: {
      processor: "Apple A17 Pro Chip (6-Core CPU / 5-Core GPU / 16-Core Neural Engine with Apple Intelligence)",
      display: "8.3\" Liquid Retina Display (2266x1488) | 500 nits | P3 Wide Color | True Tone",
      camera: "12MP Wide back camera with Smart HDR 4 | 12MP Ultra Wide front camera with Center Stage",
      battery: "19.3Wh Rechargeable Lithium-Polymer | Up to 10 Hours Battery Life",
      memory: "8GB RAM | 128GB Internal Storage | Supports Apple Pencil Pro"
    },
    pros: ["Pocket-sized powerhouse with console-grade A17 Pro chip", "Apple Pencil Pro hover and barrel roll support", "Base storage doubled to 128GB"],
    cons: ["Display remains standard 60Hz without ProMotion", "No Face ID (uses Touch ID on top button)"],
    expertVerdict: "The best small tablet money can buy. Ultra-portable, blazing fast, and ideal for digital notebooks, gaming, and reading.",
    stores: [
      { store: "Amazon", price: 46900, offer: "₹3,000 bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+iPad+mini+A17+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 47900, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Apple+iPad+mini+A17+Pro" },
      { store: "Croma", price: 48900, offer: "Free Apple Pencil Case", inStock: true, url: "https://www.croma.com/searchB?q=Apple%20iPad%20mini%20A17" },
      { store: "JioMart", price: 49400, offer: "₹1,500 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/iPad%20mini%20A17" }
    ]
  },
  {
    id: "samsung-galaxy-tab-s9-ultra",
    slug: "samsung-galaxy-tab-s9-ultra",
    name: "Samsung Galaxy Tab S9 Ultra 14.6\" (Snapdragon 8 Gen 2 / 12GB/256GB / S-Pen Included)",
    brand: "Samsung",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "samsung", "tab-s9-ultra", "amoled", "s-pen", "dex"],
    status: "In Stock",
    score: 96,
    launchedOn: "11 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 121999,
    specs: {
      processor: "Qualcomm Snapdragon 8 Gen 2 for Galaxy (4nm / Up to 3.36 GHz)",
      display: "14.6\" Dynamic AMOLED 2X (2960x1848) 120Hz | HDR10+ | Vision Booster",
      camera: "Dual Rear: 13MP + 8MP Ultra Wide | Dual Front: 12MP Wide + 12MP Ultra Wide",
      battery: "11200mAh Massive Battery | 45W Super Fast Charging",
      memory: "12GB RAM | 256GB Storage (Expandable up to 1TB via microSD)"
    },
    pros: ["Colossal 14.6-inch Dynamic AMOLED 2X display with cinema aspect ratio", "IP68 water and dust resistance on both tablet and included S-Pen", "Samsung DeX turns it into a multi-window laptop replacement"],
    cons: ["Very large and heavy to hold with one hand", "45W charger must be purchased separately"],
    expertVerdict: "The undisputed king of Android tablets. A laptop-sized AMOLED canvas with an included low-latency S-Pen.",
    stores: [
      { store: "Amazon", price: 99999, offer: "₹9,000 instant bank discount with HDFC/ICICI", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Tab+S9+Ultra&tag=teachunder-21" },
      { store: "Flipkart", price: 101999, offer: "₹7,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Tab+S9+Ultra" },
      { store: "Croma", price: 104990, offer: "Free Book Cover Keyboard worth ₹14,999 on promo", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Tab%20S9%20Ultra" },
      { store: "JioMart", price: 106990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Tab%20S9%20Ultra" }
    ]
  },
  {
    id: "samsung-galaxy-tab-s9",
    slug: "samsung-galaxy-tab-s9",
    name: "Samsung Galaxy Tab S9 11\" (Snapdragon 8 Gen 2 / 8GB/128GB / AMOLED 120Hz)",
    brand: "Samsung",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "samsung", "tab-s9", "amoled", "s-pen", "ip68"],
    status: "In Stock",
    score: 94,
    launchedOn: "11 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 83999,
    specs: {
      processor: "Qualcomm Snapdragon 8 Gen 2 for Galaxy (4nm / Up to 3.36 GHz)",
      display: "11\" Dynamic AMOLED 2X (2560x1600) 120Hz | HDR10+ | 16:10",
      camera: "13MP AF Rear Camera | 12MP Ultra-Wide Front Camera",
      battery: "8400mAh Battery | 45W Fast Charging Support",
      memory: "8GB RAM | 128GB Internal Storage (microSD up to 1TB)"
    },
    pros: ["Flagship Dynamic AMOLED 2X panel on the standard 11-inch size", "IP68 water resistant build for peace of mind", "Included ultra-responsive S-Pen in the box"],
    cons: ["Base model starts with 128GB storage", "No headphone jack"],
    expertVerdict: "The best overall 11-inch Android tablet, offering a brilliant AMOLED 120Hz display, flagship performance, and bundled S-Pen.",
    stores: [
      { store: "Amazon", price: 62999, offer: "₹6,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Tab+S9&tag=teachunder-21" },
      { store: "Flipkart", price: 64999, offer: "₹5,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Tab+S9" },
      { store: "Croma", price: 66990, offer: "Free 45W Samsung Original Charger", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Tab%20S9" },
      { store: "JioMart", price: 68490, offer: "₹2,500 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Tab%20S9" }
    ]
  },
  {
    id: "samsung-galaxy-tab-s9-fe-plus",
    slug: "samsung-galaxy-tab-s9-fe-plus",
    name: "Samsung Galaxy Tab S9 FE+ 12.4\" (Exynos 1380 / 8GB/128GB / S-Pen Included)",
    brand: "Samsung",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "samsung", "fe-plus", "large-screen", "s-pen", "study"],
    status: "In Stock",
    score: 90,
    launchedOn: "04 Oct 2023",
    updatedAt: new Date().toISOString(),
    mrp: 54999,
    specs: {
      processor: "Samsung Exynos 1380 (5nm / Octa-core up to 2.4 GHz)",
      display: "12.4\" WQXGA (2560x1600) 90Hz LCD | Vision Booster",
      camera: "Dual Rear: 8MP + 8MP Ultra-wide | 12MP Ultra-wide Front Camera",
      battery: "10090mAh Long-lasting Battery | 45W Fast Charging",
      memory: "8GB RAM | 128GB Storage (microSD expandable up to 1TB)"
    },
    pros: ["Spacious 12.4-inch canvas at a mid-range price", "IP68 water and dust protection", "Bundled S-Pen with magnetic charging dock"],
    cons: ["LCD panel instead of AMOLED", "Exynos 1380 processor is good for productivity but not hardcore gaming"],
    expertVerdict: "A dream tablet for students and note-takers wanting a large 12.4-inch screen with bundled stylus under ₹45,000.",
    stores: [
      { store: "Amazon", price: 41999, offer: "₹4,000 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Tab+S9+FE+Plus&tag=teachunder-21" },
      { store: "Flipkart", price: 42999, offer: "₹3,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Tab+S9+FE+Plus" },
      { store: "Croma", price: 44990, offer: "Free Book Cover worth ₹3,499", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Tab%20S9%20FE%20Plus" },
      { store: "JioMart", price: 45900, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Tab%20S9%20FE%20Plus" }
    ]
  },
  {
    id: "samsung-galaxy-tab-a9",
    slug: "samsung-galaxy-tab-a9",
    name: "Samsung Galaxy Tab A9 8.7\" (Helio G99 / 4GB/64GB / Dual Speakers)",
    brand: "Samsung",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "samsung", "tab-a9", "compact", "budget", "kids"],
    status: "In Stock",
    score: 84,
    launchedOn: "23 Oct 2023",
    updatedAt: new Date().toISOString(),
    mrp: 14999,
    specs: {
      processor: "MediaTek Helio G99 (6nm / Octa-core up to 2.2 GHz)",
      display: "8.7\" WQXGA (1340x800) TFT LCD | 60Hz | 5:3 Aspect Ratio",
      camera: "8MP Auto-focus Rear Camera | 2MP Front Camera",
      battery: "5100mAh Battery | 15W Fast Charging",
      memory: "4GB RAM | 64GB Internal Storage (microSD expandable to 1TB)"
    },
    pros: ["Compact one-handed 8.7-inch form factor", "Smooth MediaTek Helio G99 processor", "Dual stereo speakers with Dolby Atmos"],
    cons: ["Sub-FHD screen resolution", "No S-Pen stylus support"],
    expertVerdict: "A dependable, pocket-friendly budget tablet ideal for reading Kindle books, watching YouTube, and kids' education.",
    stores: [
      { store: "Amazon", price: 9999, offer: "₹1,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Tab+A9&tag=teachunder-21" },
      { store: "Flipkart", price: 10499, offer: "₹750 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Tab+A9" },
      { store: "Croma", price: 11490, offer: "Free Protective Cover", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Tab%20A9" },
      { store: "JioMart", price: 11990, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Tab%20A9" }
    ]
  },
  {
    id: "redmi-pad-pro-5g",
    slug: "redmi-pad-pro-5g",
    name: "Redmi Pad Pro 5G 12.1\" (Snapdragon 7s Gen 2 / 8GB/256GB / 120Hz 2.5K)",
    brand: "Xiaomi",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "redmi", "pad-pro-5g", "xiaomi", "120hz", "2.5k"],
    status: "In Stock",
    score: 92,
    launchedOn: "29 Jul 2024",
    updatedAt: new Date().toISOString(),
    mrp: 29999,
    specs: {
      processor: "Snapdragon 7s Gen 2 (4nm / Octa-core up to 2.4 GHz with 5G Dual SIM)",
      display: "12.1\" 2.5K (2560x1600) 120Hz LCD | 600 nits | Dolby Vision | 16:10",
      camera: "8MP Rear Camera | 8MP Front-facing Camera",
      battery: "10000mAh Monster Battery | 33W Fast Charging in Box",
      memory: "8GB LPDDR4X RAM | 256GB UFS 2.2 (microSD up to 1.5TB)"
    },
    pros: ["Huge 12.1-inch 2.5K 120Hz screen with Dolby Vision", "True 5G cellular connectivity on a budget tablet", "Massive 10,000mAh battery with quad Dolby Atmos speakers"],
    cons: ["Stylus and keyboard sold separately", "Charging 10,000mAh at 33W takes over 2 hours"],
    expertVerdict: "The ultimate entertainment and media consumption tablet in the sub-₹25,000 segment with 5G SIM capability.",
    stores: [
      { store: "Amazon", price: 24999, offer: "₹2,000 instant bank discount with ICICI/HDFC", inStock: true, url: "https://www.amazon.in/s?k=Redmi+Pad+Pro+5G&tag=teachunder-21" },
      { store: "Flipkart", price: 25499, offer: "₹1,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Redmi+Pad+Pro+5G" },
      { store: "Croma", price: 26999, offer: "Free Mi Dual Driver Earphones", inStock: true, url: "https://www.croma.com/searchB?q=Redmi%20Pad%20Pro%205G" },
      { store: "JioMart", price: 27499, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Redmi%20Pad%20Pro" }
    ]
  },
  {
    id: "redmi-pad-se",
    slug: "redmi-pad-se",
    name: "Redmi Pad SE 11\" (Snapdragon 680 / 6GB/128GB / 90Hz FHD+ / Quad Speakers)",
    brand: "Xiaomi",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "redmi", "pad-se", "budget", "fhd", "quad-speakers"],
    status: "In Stock",
    score: 87,
    launchedOn: "24 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 16999,
    specs: {
      processor: "Qualcomm Snapdragon 680 (6nm / Octa-core up to 2.4 GHz)",
      display: "11\" FHD+ (1920x1200) 90Hz AdaptiveSync LCD | 400 nits | TÜV Rheinland",
      camera: "8MP f/2.0 Rear Camera | 5MP Front Camera",
      battery: "8000mAh Long Battery Life | 10W Charging Support",
      memory: "6GB LPDDR4X RAM | 128GB Storage (microSD up to 1TB)"
    },
    pros: ["Premium full-metal unibody chassis under ₹14,000", "Quad speakers with Dolby Atmos surround sound", "90Hz smooth eye-care certified display"],
    cons: ["Slow 10W bundled charger", "No cellular 4G/5G option"],
    expertVerdict: "The reigning champion of entry-level budget tablets, delivering high-end metal build quality and quad speakers at a great price.",
    stores: [
      { store: "Amazon", price: 12999, offer: "₹1,250 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Redmi+Pad+SE&tag=teachunder-21" },
      { store: "Flipkart", price: 13499, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Redmi+Pad+SE" },
      { store: "Croma", price: 14499, offer: "Free Redmi In-Ear Wired Headphones", inStock: true, url: "https://www.croma.com/searchB?q=Redmi%20Pad%20SE" },
      { store: "JioMart", price: 14999, offer: "₹500 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Redmi%20Pad%20SE" }
    ]
  },
  {
    id: "honor-pad-9",
    slug: "honor-pad-9",
    name: "Honor Pad 9 12.1\" (Snapdragon 6 Gen 1 / 8GB/256GB / 2.5K 120Hz / 8 Speakers)",
    brand: "Honor",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "honor", "pad-9", "8-speakers", "2.5k", "media"],
    status: "In Stock",
    score: 91,
    launchedOn: "28 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 34999,
    specs: {
      processor: "Qualcomm Snapdragon 6 Gen 1 (4nm / Octa-core up to 2.2 GHz)",
      display: "12.1\" 2.5K (2560x1600) 120Hz IPS LCD | 500 nits | Anti-glare Glass",
      camera: "13MP f/2.0 Rear Camera | 8MP Front Camera",
      battery: "8300mAh Battery | 35W SuperCharge Fast Charger Included",
      memory: "8GB RAM + 8GB Turbo RAM | 256GB Internal Storage"
    },
    pros: ["Incredible 8-speaker audio setup with bi-directional vocal enhancement", "Vibrant 12.1-inch 2.5K 120Hz matte display", "Free smart Bluetooth keyboard included in launch bundles"],
    cons: ["MagicOS update policy is average", "No 3.5mm headphone jack"],
    expertVerdict: "An acoustic marvel with 8 built-in speakers and an immersive 12.1-inch 2.5K display for movie and series buffs.",
    stores: [
      { store: "Amazon", price: 21999, offer: "₹2,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Honor+Pad+9&tag=teachunder-21" },
      { store: "Flipkart", price: 22999, offer: "₹1,500 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Honor+Pad+9" },
      { store: "Croma", price: 24490, offer: "Free Bluetooth Earbuds", inStock: true, url: "https://www.croma.com/searchB?q=Honor%20Pad%209" },
      { store: "JioMart", price: 25490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Honor%20Pad%209" }
    ]
  },
  {
    id: "honor-pad-x9",
    slug: "honor-pad-x9",
    name: "Honor Pad X9 11.5\" (Snapdragon 685 / 7GB/128GB / 2K 120Hz / 6 Speakers)",
    brand: "Honor",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "honor", "pad-x9", "6-speakers", "120hz", "budget-value"],
    status: "In Stock",
    score: 89,
    launchedOn: "10 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 25999,
    specs: {
      processor: "Qualcomm Snapdragon 685 (6nm / Octa-core up to 2.8 GHz)",
      display: "11.5\" 2K (2000x1200) 120Hz IPS Display | 400 nits | 86% Screen-to-Body Ratio",
      camera: "5MP Rear Camera | 5MP Front-facing Camera",
      battery: "7250mAh Battery | 22.5W Fast Charging",
      memory: "4GB RAM + 3GB Virtual RAM | 128GB Internal Storage"
    },
    pros: ["Unmatched 6-speaker cinema audio under ₹15,000", "Ultra-fluid 120Hz 2K resolution display", "Sleek all-metal 499g unibody design"],
    cons: ["Only 4GB physical RAM", "Cameras are basic for scanning documents only"],
    expertVerdict: "The best entertainment tablet under ₹15,000, pairing a fluid 120Hz 2K display with 6 booming speakers.",
    stores: [
      { store: "Amazon", price: 13999, offer: "₹1,500 instant discount with Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Honor+Pad+X9&tag=teachunder-21" },
      { store: "Flipkart", price: 14499, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Honor+Pad+X9" },
      { store: "Croma", price: 15490, offer: "Free Flip Case Cover", inStock: true, url: "https://www.croma.com/searchB?q=Honor%20Pad%20X9" },
      { store: "JioMart", price: 15990, offer: "₹750 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Honor%20Pad%20X9" }
    ]
  },
  {
    id: "lenovo-tab-p12",
    slug: "lenovo-tab-p12",
    name: "Lenovo Tab P12 12.7\" (Dimensity 7050 / 8GB/128GB / 3K Display / Stylus Included)",
    brand: "Lenovo",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "lenovo", "tab-p12", "3k", "stylus", "productivity"],
    status: "In Stock",
    score: 91,
    launchedOn: "05 Sep 2023",
    updatedAt: new Date().toISOString(),
    mrp: 34999,
    specs: {
      processor: "MediaTek Dimensity 7050 (6nm / Octa-core up to 2.6 GHz)",
      display: "12.7\" 3K (2944x1840) LTPS LCD | 400 nits | 100% sRGB | Split Screen 4 Apps",
      camera: "13MP AF Rear Camera with Flash | 8MP Ultra-wide Front Camera",
      battery: "10200mAh Massive Battery | 30W Fast Charging",
      memory: "8GB LPDDR4X RAM | 128GB UFS 2.2 (microSD up to 1TB)"
    },
    pros: ["Massive 12.7-inch razor-sharp 3K display", "Lenovo Tab Pen Plus stylus included in the retail box", "Quad JBL speakers tuned with Dolby Atmos"],
    cons: ["Screen refresh rate is 60Hz", "Noticeable bezels around the large panel"],
    expertVerdict: "A high-resolution 3K giant tablet with a bundled stylus, making it ideal for digital artists, architects, and students.",
    stores: [
      { store: "Amazon", price: 23999, offer: "₹2,000 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Lenovo+Tab+P12&tag=teachunder-21" },
      { store: "Flipkart", price: 24999, offer: "₹1,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Lenovo+Tab+P12" },
      { store: "Croma", price: 26490, offer: "Free Lenovo Earbuds worth ₹1,499", inStock: true, url: "https://www.croma.com/searchB?q=Lenovo%20Tab%20P12" },
      { store: "JioMart", price: 27490, offer: "5% cashback with JioPay", inStock: true, url: "https://www.jiomart.com/search/Lenovo%20Tab%20P12" }
    ]
  },
  {
    id: "lenovo-tab-p11-pro-gen-2",
    slug: "lenovo-tab-p11-pro-gen-2",
    name: "Lenovo Tab P11 Pro Gen 2 11.2\" (Kompanio 1300T / 8GB/256GB / 120Hz 2.5K OLED)",
    brand: "Lenovo",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "lenovo", "oled", "120hz", "hdr10-plus", "premium"],
    status: "In Stock",
    score: 93,
    launchedOn: "18 Jan 2023",
    updatedAt: new Date().toISOString(),
    mrp: 49999,
    specs: {
      processor: "MediaTek Kompanio 1300T (6nm / Octa-core up to 2.6 GHz with Mali-G77 GPU)",
      display: "11.2\" 2.5K (2560x1536) 120Hz OLED | 600 nits Peak | HDR10+ | Dolby Vision",
      camera: "13MP AF Rear Camera | 8MP Fixed-focus Front Camera",
      battery: "8200mAh Battery | 30W Quick Charge Support",
      memory: "8GB LPDDR4X RAM | 256GB UFS 3.1 Storage"
    },
    pros: ["Gorgeous 2.5K OLED panel with deep blacks and 120Hz fluidity", "Quad JBL speakers with Dolby Atmos sound", "Fast UFS 3.1 storage for seamless app launches"],
    cons: ["Battery life drains quicker at full 120Hz OLED brightness", "Precision Pen 3 sold separately on some variants"],
    expertVerdict: "One of the most affordable 120Hz OLED tablets in India, offering flagship movie contrast and vibrant colors.",
    stores: [
      { store: "Amazon", price: 34999, offer: "₹3,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Lenovo+Tab+P11+Pro+Gen+2&tag=teachunder-21" },
      { store: "Flipkart", price: 35999, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Lenovo+Tab+P11+Pro+Gen+2" },
      { store: "Croma", price: 37990, offer: "Free Lenovo Folio Case", inStock: true, url: "https://www.croma.com/searchB?q=Lenovo%20Tab%20P11%20Pro" },
      { store: "JioMart", price: 38900, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Tab%20P11%20Pro" }
    ]
  },
  {
    id: "lenovo-tab-m10-plus-3rd-gen",
    slug: "lenovo-tab-m10-plus-3rd-gen",
    name: "Lenovo Tab M10 Plus 3rd Gen 10.6\" (Snapdragon 680 / 6GB/128GB / 2K Display)",
    brand: "Lenovo",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "lenovo", "m10-plus", "student", "2k", "reading"],
    status: "In Stock",
    score: 86,
    launchedOn: "12 May 2022",
    updatedAt: new Date().toISOString(),
    mrp: 23999,
    specs: {
      processor: "Qualcomm Snapdragon 680 (6nm / Octa-core up to 2.4 GHz)",
      display: "10.61\" 2K (2000x1200) IPS LCD | 400 nits | 72% NTSC | TÜV Low Blue Light",
      camera: "8MP Auto-focus Rear Camera | 8MP Front Camera",
      battery: "7700mAh Battery | Up to 14 Hours Video Playback",
      memory: "6GB RAM | 128GB Storage (microSD expandable to 1TB)"
    },
    pros: ["Sharp 2K IPS display with dedicated Reading Mode", "Quad Dolby Atmos speakers", "Sturdy dual-tone aluminum chassis"],
    cons: ["Standard 60Hz refresh rate", "Bundled charger is 10W"],
    expertVerdict: "A trusty and durable study tablet with a sharp 2K screen and dedicated reading mode for ebooks and PDFs.",
    stores: [
      { store: "Amazon", price: 14499, offer: "₹1,500 off on Credit Card EMI", inStock: true, url: "https://www.amazon.in/s?k=Lenovo+Tab+M10+Plus+3rd+Gen&tag=teachunder-21" },
      { store: "Flipkart", price: 14999, offer: "₹1,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Lenovo+Tab+M10+Plus+3rd+Gen" },
      { store: "Croma", price: 15990, offer: "Free Protective Sleeve", inStock: true, url: "https://www.croma.com/searchB?q=Lenovo%20Tab%20M10%20Plus" },
      { store: "JioMart", price: 16490, offer: "₹800 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Tab%20M10%20Plus" }
    ]
  },
  {
    id: "motorola-moto-tab-g70",
    slug: "motorola-moto-tab-g70",
    name: "Motorola Moto Tab G70 11\" (Helio G90T / 4GB/64GB LTE / 2K Display / IP52)",
    brand: "Motorola",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "motorola", "g70", "lte", "2k", "clean-android"],
    status: "In Stock",
    score: 87,
    launchedOn: "18 Jan 2022",
    updatedAt: new Date().toISOString(),
    mrp: 30000,
    specs: {
      processor: "MediaTek Helio G90T (12nm / Octa-core up to 2.05 GHz)",
      display: "11\" 2K (2000x1200) IPS LCD | 400 nits | 10-point Multi-touch",
      camera: "13MP AF Rear Camera with Flash | 8MP Front Camera",
      battery: "7700mAh Battery | 20W TurboPower Fast Charging",
      memory: "4GB RAM | 64GB Storage (microSD expandable to 1TB) | 4G LTE SIM"
    },
    pros: ["Near-stock clean Android experience without bloatware", "Built-in 4G LTE SIM support for on-the-go data", "Quad speakers with Dolby Atmos tuning"],
    cons: ["64GB base storage is limited", "60Hz display refresh rate"],
    expertVerdict: "A clean, bloatware-free Android tablet with built-in 4G LTE connectivity and quad Dolby Atmos speakers.",
    stores: [
      { store: "Amazon", price: 16999, offer: "₹1,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Motorola+Moto+Tab+G70&tag=teachunder-21" },
      { store: "Flipkart", price: 17499, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Motorola+Moto+Tab+G70" },
      { store: "Croma", price: 18490, offer: "Free Moto in-ear headset", inStock: true, url: "https://www.croma.com/searchB?q=Motorola%20Moto%20Tab%20G70" },
      { store: "JioMart", price: 18990, offer: "₹1,000 cashback with net banking", inStock: true, url: "https://www.jiomart.com/search/Moto%20Tab%20G70" }
    ]
  },
  {
    id: "realme-pad-x-5g",
    slug: "realme-pad-x-5g",
    name: "Realme Pad X 5G 10.95\" (Snapdragon 695 5G / 6GB/128GB / 2K WUXGA+)",
    brand: "Realme",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "realme", "pad-x", "5g", "snapdragon", "quad-speakers"],
    status: "In Stock",
    score: 90,
    launchedOn: "26 Jul 2022",
    updatedAt: new Date().toISOString(),
    mrp: 34999,
    specs: {
      processor: "Qualcomm Snapdragon 695 5G (6nm / Octa-core up to 2.2 GHz)",
      display: "10.95\" 2K (2000x1200) WUXGA+ Full Vision IPS | 450 nits | Hardware Blue Light Filter",
      camera: "13MP Ultra Clear Rear Camera | 8MP 105° Ultra Wide Limelight Front Camera",
      battery: "8340mAh Massive Battery | 33W Dart Charge Support",
      memory: "6GB RAM + 5GB DRE Dynamic RAM | 128GB Storage (microSD up to 512GB)"
    },
    pros: ["Reliable 5G cellular speed and Snapdragon 695 efficiency", "Limelight 105-degree auto-centering camera for video calls", "Quad speakers with Dolby Atmos and Hi-Res Audio"],
    cons: ["60Hz display refresh rate", "Realme UI updates can be infrequent"],
    expertVerdict: "A well-rounded 5G tablet offering smooth performance, fast 33W charging, and great video call auto-framing.",
    stores: [
      { store: "Amazon", price: 21999, offer: "₹2,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Realme+Pad+X+5G&tag=teachunder-21" },
      { store: "Flipkart", price: 22499, offer: "₹1,500 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Realme+Pad+X+5G" },
      { store: "Croma", price: 23990, offer: "Free Realme Smart Stylus coupon", inStock: true, url: "https://www.croma.com/searchB?q=Realme%20Pad%20X" },
      { store: "JioMart", price: 24490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Realme%20Pad%20X" }
    ]
  },
  {
    id: "oppo-pad-air",
    slug: "oppo-pad-air",
    name: "OPPO Pad Air 10.36\" (Snapdragon 680 / 4GB/128GB / 2K Display / Sunset Dune 3D)",
    brand: "OPPO",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "oppo", "pad-air", "2k", "slim", "dolby-atmos"],
    status: "In Stock",
    score: 87,
    launchedOn: "18 Jul 2022",
    updatedAt: new Date().toISOString(),
    mrp: 22999,
    specs: {
      processor: "Qualcomm Snapdragon 680 (6nm / Octa-core up to 2.4 GHz)",
      display: "10.36\" 2K (2000x1200) IPS Eye-Care Display | 360 nits | 10-bit Color Depth",
      camera: "8MP f/2.0 Rear Camera | 5MP f/2.2 Front Camera",
      battery: "7100mAh Battery | 18W Fast Charging",
      memory: "4GB LPDDR4x RAM | 128GB UFS 2.2 Storage (microSD up to 512GB)"
    },
    pros: ["Unique Sunset Dune 3D textured rear panel", "Ultra-thin 6.94mm and lightweight 440g body", "Quad symmetric Dolby Atmos speakers"],
    cons: ["Only 4GB RAM base configuration", "Moderate screen brightness in outdoors"],
    expertVerdict: "One of the sleekest and most stylish tablets in its price bracket, boasting a 10-bit 2K display and eye-catching aesthetics.",
    stores: [
      { store: "Amazon", price: 14999, offer: "₹1,500 off on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=OPPO+Pad+Air&tag=teachunder-21" },
      { store: "Flipkart", price: 15499, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=OPPO+Pad+Air" },
      { store: "Croma", price: 16490, offer: "Free Protective Case", inStock: true, url: "https://www.croma.com/searchB?q=OPPO%20Pad%20Air" },
      { store: "JioMart", price: 16990, offer: "₹800 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/OPPO%20Pad%20Air" }
    ]
  },
  {
    id: "nokia-t21",
    slug: "nokia-t21",
    name: "Nokia T21 10.36\" (Unisoc T612 / 4GB/64GB LTE / 2K Display / 3-Day Battery)",
    brand: "Nokia",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "nokia", "t21", "lte", "clean-android", "durable"],
    status: "In Stock",
    score: 85,
    launchedOn: "17 Jan 2023",
    updatedAt: new Date().toISOString(),
    mrp: 19999,
    specs: {
      processor: "Unisoc T612 (12nm / Octa-core up to 1.8 GHz)",
      display: "10.36\" 2K (1200x2000) IPS LCD | 360 nits | Toughened Glass | Active Pen Support",
      camera: "8MP Auto-focus Rear Camera with LED flash | 8MP Front Camera",
      battery: "8200mAh Battery | 18W Fast Charging Support",
      memory: "4GB RAM | 64GB Internal Storage (microSD up to 512GB) | 4G LTE Calling"
    },
    pros: ["Rugged aluminum body with 60% recycled plastic antenna strip", "Voice calling and 4G LTE cellular support", "Clean stock Android with guaranteed OS and security patches"],
    cons: ["Unisoc T612 processor is strictly for casual tasks", "Only 64GB built-in storage"],
    expertVerdict: "A rugged, durable tablet with clean stock Android, 4G calling, and multi-day battery endurance.",
    stores: [
      { store: "Amazon", price: 13999, offer: "₹1,200 discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Nokia+T21&tag=teachunder-21" },
      { store: "Flipkart", price: 14499, offer: "₹1,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Nokia+T21" },
      { store: "Croma", price: 15290, offer: "Free Nokia wired earphones", inStock: true, url: "https://www.croma.com/searchB?q=Nokia%20T21" },
      { store: "JioMart", price: 15790, offer: "₹500 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Nokia%20T21" }
    ]
  },
  {
    id: "vivo-pad-air",
    slug: "vivo-pad-air",
    name: "Vivo Pad Air 11.5\" (Snapdragon 870 / 8GB/128GB / 144Hz 2.8K Display)",
    brand: "Vivo",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "vivo", "pad-air", "144hz", "gaming", "snapdragon-870"],
    status: "In Stock",
    score: 93,
    launchedOn: "18 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 32999,
    specs: {
      processor: "Qualcomm Snapdragon 870 (7nm / Octa-core up to 3.2 GHz)",
      display: "11.5\" 2.8K (2800x1840) 144Hz IPS LCD | 500 nits | 3:2 Aspect Ratio | HDR10",
      camera: "8MP Rear Camera | 5MP Front-facing Camera",
      battery: "8500mAh Battery | 44W FlashCharge Fast Charger",
      memory: "8GB LPDDR5 RAM | 128GB UFS 3.1 High-Speed Storage"
    },
    pros: ["Flagship-grade Snapdragon 870 chip delivering smooth 90FPS gaming", "Super-fast 144Hz 2.8K display with 3:2 productivity ratio", "Speedy 44W FlashCharge power delivery"],
    cons: ["No 3.5mm headphone jack", "No expandable microSD storage slot"],
    expertVerdict: "A high-performance gaming tablet that runs BGMI, COD, and Genshin Impact with remarkable sustained frame rates.",
    stores: [
      { store: "Amazon", price: 26999, offer: "₹2,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Vivo+Pad+Air&tag=teachunder-21" },
      { store: "Flipkart", price: 27999, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Vivo+Pad+Air" },
      { store: "Croma", price: 28990, offer: "Free Vivo Wireless Earphones", inStock: true, url: "https://www.croma.com/searchB?q=Vivo%20Pad%20Air" },
      { store: "JioMart", price: 29490, offer: "5% cashback with JioPay", inStock: true, url: "https://www.jiomart.com/search/Vivo%20Pad%20Air" }
    ]
  },
  {
    id: "iqoo-pad-2-pro",
    slug: "iqoo-pad-2-pro",
    name: "iQOO Pad 2 Pro 13\" (Dimensity 9300+ / 12GB/256GB / 144Hz 3.1K / Monster Gaming)",
    brand: "iQOO",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "iqoo", "pad-2-pro", "dimensity-9300", "monster-gaming", "144hz"],
    status: "In Stock",
    score: 96,
    launchedOn: "31 May 2024",
    updatedAt: new Date().toISOString(),
    mrp: 49999,
    specs: {
      processor: "MediaTek Dimensity 9300+ (4nm / All Big Core Architecture up to 3.4 GHz)",
      display: "13\" 3.1K (3096x2064) 144Hz LCD | 900 nits Peak | 3:2 | 10.7 Billion Colors",
      camera: "13MP AF Rear Camera | 8MP Front Camera",
      battery: "11500mAh Monster Battery | 66W FlashCharge in Box",
      memory: "12GB LPDDR5X RAM | 256GB UFS 4.0 Storage"
    },
    pros: ["Unmatched raw processing power with Dimensity 9300+ scoring 2M+ AnTuTu", "Huge 13-inch 3.1K 144Hz ultra-smooth display", "Massive 11,500mAh battery with 66W fast charging"],
    cons: ["LCD instead of OLED panel", "Heavier 679g weight due to large size and battery"],
    expertVerdict: "The undisputed most powerful Android gaming tablet on earth, offering unstoppable FPS and a massive 13-inch display.",
    stores: [
      { store: "Amazon", price: 41999, offer: "₹3,500 instant discount with ICICI/HDFC Cards", inStock: true, url: "https://www.amazon.in/s?k=iQOO+Pad+2+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 42999, offer: "₹2,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=iQOO+Pad+2+Pro" },
      { store: "Croma", price: 44490, offer: "Free Gaming Controller worth ₹2,999", inStock: true, url: "https://www.croma.com/searchB?q=iQOO%20Pad%202%20Pro" },
      { store: "JioMart", price: 45490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/iQOO%20Pad%202%20Pro" }
    ]
  },
  {
    id: "apple-ipad-air-13-m2",
    slug: "apple-ipad-air-13-m2",
    name: "Apple iPad Air 13\" M2 (128GB Wi-Fi / Liquid Retina / Apple Pencil Pro Support)",
    brand: "Apple",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "apple", "ipad-air-13", "m2", "creators", "large-canvas"],
    status: "In Stock",
    score: 95,
    launchedOn: "15 May 2024",
    updatedAt: new Date().toISOString(),
    mrp: 79900,
    specs: {
      processor: "Apple M2 Chip (8-Core CPU / 9-Core GPU / 16-Core Neural Engine)",
      display: "12.9\" Liquid Retina Display (2732x2048) | 600 nits | P3 Wide Color | True Tone",
      camera: "12MP Wide back camera with Smart HDR 4 | Landscape 12MP Ultra Wide front camera with Center Stage",
      battery: "36.59Wh Rechargeable Lithium-Polymer | Up to 10 Hours Web Surfing",
      memory: "8GB RAM | 128GB Storage | Supports Apple Pencil Pro & Magic Keyboard"
    },
    pros: ["Spacious 13-inch creative canvas at a far lower price than iPad Pro", "Blazing-fast Apple M2 performance for 4K video editing and Procreate", "Landscape center stage camera placement"],
    cons: ["60Hz refresh rate (no ProMotion)", "600 nits brightness is slightly dimmer than Pro model"],
    expertVerdict: "The dream tablet for digital illustrators and comic artists wanting a massive 13-inch iPad canvas without paying Pro prices.",
    stores: [
      { store: "Amazon", price: 74900, offer: "₹4,000 instant discount with ICICI/HDFC Cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+iPad+Air+13+M2&tag=teachunder-21" },
      { store: "Flipkart", price: 75900, offer: "₹3,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Apple+iPad+Air+13+M2" },
      { store: "Croma", price: 77900, offer: "Free Apple Pencil Pro Case Cover", inStock: true, url: "https://www.croma.com/searchB?q=Apple%20iPad%20Air%2013%20M2" },
      { store: "JioMart", price: 78900, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/iPad%20Air%2013%20M2" }
    ]
  },
  {
    id: "samsung-galaxy-tab-s6-lite",
    slug: "samsung-galaxy-tab-s6-lite",
    name: "Samsung Galaxy Tab S6 Lite (Exynos 1280 / 4GB/64GB / S-Pen Included / 10.4\" WUXGA+)",
    brand: "Samsung",
    category: "tablets",
    categoryLabel: "Tablets",
    tags: ["tablet", "samsung", "s6-lite", "s-pen", "student-choice", "budget-stylus"],
    status: "In Stock",
    score: 88,
    launchedOn: "28 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 30999,
    specs: {
      processor: "Samsung Exynos 1280 (5nm / Octa-core up to 2.4 GHz)",
      display: "10.4\" WUXGA+ (2000x1200) TFT LCD | 400 nits | 5:3 Aspect Ratio",
      camera: "8MP Auto-focus Rear Camera | 5MP Front-facing Camera",
      battery: "7040mAh Long Battery Life | 15W Fast Charging",
      memory: "4GB RAM | 64GB Internal Storage (microSD expandable to 1TB)"
    },
    pros: ["Best-selling budget student tablet with bundled S-Pen (battery-free)", "Slim and sturdy metallic unibody design", "Dual AKG stereo speakers with Dolby Atmos"],
    cons: ["4GB RAM limits heavy multitasking", "60Hz TFT display"],
    expertVerdict: "The undisputed default recommendation for university and medical students wanting handwritten PDF note-taking on a budget.",
    stores: [
      { store: "Amazon", price: 21999, offer: "₹2,500 instant bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Tab+S6+Lite&tag=teachunder-21" },
      { store: "Flipkart", price: 22499, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Tab+S6+Lite" },
      { store: "Croma", price: 23990, offer: "Free Book Cover with store voucher", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Tab%20S6%20Lite" },
      { store: "JioMart", price: 24490, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Tab%20S6%20Lite" }
    ]
  }
];

const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const existingSlugs = new Set(catalog.products.map(p => p.slug));

let addedCount = 0;
for (const p of newTablets) {
  if (!existingSlugs.has(p.slug)) {
    catalog.products.push({
      ...p,
      image: `assets/products/${p.slug}.jpg`
    });
    existingSlugs.add(p.slug);
    addedCount++;
  }
}

fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(catalog, null, 2));
console.log(`Successfully added ${addedCount} tablets! Total products: ${catalog.products.length}`);
