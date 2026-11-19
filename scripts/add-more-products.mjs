import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');

const newProducts = [
  // Laptops
  {
    id: "apple-macbook-air-m2",
    slug: "apple-macbook-air-m2",
    name: "Apple MacBook Air M2 13.6\" (8GB/256GB SSD)",
    brand: "Apple",
    category: "laptops",
    tags: ["laptop", "m2", "apple", "macbook", "ultrabook", "battery"],
    status: "In Stock",
    score: 94,
    launchedOn: "15 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 99900,
    specs: {
      processor: "Apple M2 Chip (8-Core CPU / 8-Core GPU / 16-Core Neural Engine)",
      display: "13.6\" Liquid Retina Display (2560x1664) | 500 nits | True Tone",
      camera: "1080p FaceTime HD Camera with computational video",
      battery: "52.6Wh Lithium-Polymer | Up to 18 Hours Battery | MagSafe 3 Charging",
      memory: "8GB Unified Memory | 256GB High-Speed SSD"
    },
    pros: [
      "Stunning thin & light all-aluminum design with MagSafe 3",
      "Exceptional battery life exceeding 15+ hours real-world",
      "Crisp Liquid Retina 500-nit display with 1080p camera"
    ],
    cons: [
      "Base 256GB SSD read/write speeds slower than 512GB model",
      "Memory is unified and non-upgradable"
    ],
    expertVerdict: "The gold standard for everyday premium computing. Ultra-portable, completely silent, and exceptionally long-lasting.",
    stores: [
      { store: "Amazon", price: 84990, offer: "₹5,000 instant bank discount with HDFC/ICICI Card", inStock: true, url: "https://www.amazon.in/s?k=Apple+MacBook+Air+M2&tag=teachunder-21" },
      { store: "Flipkart", price: 85990, offer: "₹4,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Apple+MacBook+Air+M2" },
      { store: "Croma", price: 86990, offer: "Free Apple 30W USB-C Adapter", inStock: true, url: "https://www.croma.com/searchB?q=Apple%20MacBook%20Air%20M2" },
      { store: "JioMart", price: 87900, offer: "₹2,000 Cashback on UPI", inStock: true, url: "https://www.jiomart.com/search/Apple%20MacBook%20Air%20M2" }
    ]
  },
  {
    id: "asus-tuf-gaming-f15",
    slug: "asus-tuf-gaming-f15",
    name: "ASUS TUF Gaming F15 (Intel Core i5-11400H / RTX 2050 4GB / 16GB/512GB)",
    brand: "ASUS",
    category: "laptops",
    tags: ["laptop", "gaming", "asus", "tuf", "rtx", "high-performance"],
    status: "In Stock",
    score: 87,
    launchedOn: "10 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 75990,
    specs: {
      processor: "11th Gen Intel Core i5-11400H (6 Cores / 12 Threads / Up to 4.5 GHz)",
      display: "15.6\" FHD (1920x1080) 144Hz | vIPS-level Anti-glare | Adaptive-Sync",
      camera: "720p HD Camera with Array Microphone",
      battery: "48Wh 3-cell Li-ion | 150W AC Adapter Fast Charging",
      memory: "16GB DDR4 3200MHz (Expandable to 32GB) | 512GB PCIe 3.0 NVMe M.2 SSD"
    },
    pros: [
      "Military-grade MIL-STD-810H durability",
      "High refresh rate 144Hz display for smooth competitive gaming",
      "Dedicated NVIDIA RTX 2050 4GB GPU at budget price point"
    ],
    cons: [
      "Average battery endurance during heavy 3D rendering",
      "48Wh battery is on the smaller side"
    ],
    expertVerdict: "One of the best value-for-money entry-level gaming laptops with solid build quality and upgradeable dual-channel RAM.",
    stores: [
      { store: "Amazon", price: 49990, offer: "₹2,500 off on OneCard & Federal Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=ASUS+TUF+Gaming+F15&tag=teachunder-21" },
      { store: "Flipkart", price: 50990, offer: "₹1,500 Axis Bank discount", inStock: true, url: "https://www.flipkart.com/search?q=ASUS+TUF+Gaming+F15" },
      { store: "Croma", price: 52490, offer: "Free Gaming Backpack worth ₹1,999", inStock: true, url: "https://www.croma.com/searchB?q=ASUS%20TUF%20Gaming%20F15" },
      { store: "JioMart", price: 52999, offer: "Standard Bank Offers", inStock: true, url: "https://www.jiomart.com/search/ASUS%20TUF%20Gaming%20F15" }
    ]
  },
  {
    id: "hp-victus-gaming-laptop",
    slug: "hp-victus-gaming-laptop",
    name: "HP Victus Gaming Laptop (AMD Ryzen 5 5600H / RTX 3050 4GB / 16GB/512GB)",
    brand: "HP",
    category: "laptops",
    tags: ["laptop", "gaming", "hp", "victus", "rtx", "ryzen"],
    status: "In Stock",
    score: 89,
    launchedOn: "18 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 82990,
    specs: {
      processor: "AMD Ryzen 5 5600H (6 Cores / 12 Threads / Up to 4.2 GHz Turbo)",
      display: "15.6\" FHD (1920x1080) IPS 144Hz 9ms response time | Micro-edge",
      camera: "HP Wide Vision 720p HD with temporal noise reduction",
      battery: "70Wh 4-cell Li-ion polymer | Fast charge (50% in 30 mins)",
      memory: "16GB DDR4-3200 SDRAM | 512GB PCIe Gen4 NVMe TLC M.2 SSD"
    },
    pros: [
      "Large 70Wh battery provides superior gaming runtime",
      "Full-powered NVIDIA GeForce RTX 3050 4GB GDDR6",
      "Subtle, sleek aesthetic suitable for both college and office"
    ],
    cons: [
      "Slight screen wobble under forceful keystrokes",
      "Display color gamut is standard 45% NTSC"
    ],
    expertVerdict: "A balanced powerhouse combining Ryzen 5 5600H efficiency with RTX 3050 graphics and large battery capacity.",
    stores: [
      { store: "Amazon", price: 58990, offer: "₹3,000 instant discount with ICICI/HDFC Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=HP+Victus+Gaming+Ryzen+5&tag=teachunder-21" },
      { store: "Flipkart", price: 59990, offer: "₹2,000 off with Flipkart Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=HP+Victus+Gaming+Ryzen+5" },
      { store: "Croma", price: 61990, offer: "Complimentary HP Gaming Mouse", inStock: true, url: "https://www.croma.com/searchB?q=HP%20Victus%20Ryzen%205" },
      { store: "JioMart", price: 61499, offer: "₹1,000 UPI discount", inStock: true, url: "https://www.jiomart.com/search/HP%20Victus%20Gaming" }
    ]
  },
  {
    id: "dell-inspiron-3530",
    slug: "dell-inspiron-3530",
    name: "Dell Inspiron 3530 15.6\" (Intel Core i5 13th Gen / 16GB/512GB SSD / 120Hz)",
    brand: "Dell",
    category: "laptops",
    tags: ["laptop", "dell", "inspiron", "intel", "workstation", "student"],
    status: "In Stock",
    score: 86,
    launchedOn: "25 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 72990,
    specs: {
      processor: "Intel Core i5-1334U (10 Cores / 12 Threads / Up to 4.60 GHz)",
      display: "15.6\" FHD (1920x1080) 120Hz 250 nits WVA Anti-Glare LED",
      camera: "FHD RGB camera with dual digital microphone array",
      battery: "54Wh 4-Cell Integrated | ExpressCharge supported",
      memory: "16GB (2x8GB) DDR4 2666MHz | 512GB M.2 PCIe NVMe SSD"
    },
    pros: [
      "120Hz high refresh rate screen makes scrolling silky smooth",
      "Ergonomic lift hinge design promotes comfortable typing angle",
      "Full numeric keypad and massive touchpad"
    ],
    cons: [
      "Plastic chassis construction",
      "DDR4 2666MHz speeds rather than 3200MHz"
    ],
    expertVerdict: "A dependable and durable daily driver for office productivity, students, and light content creation.",
    stores: [
      { store: "Amazon", price: 52990, offer: "Flat ₹2,500 off on All Major Bank Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Dell+Inspiron+3530+i5&tag=teachunder-21" },
      { store: "Flipkart", price: 53990, offer: "₹1,500 HDFC Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Dell+Inspiron+3530+i5" },
      { store: "Croma", price: 54990, offer: "1 Year Extended Warranty bundle at ₹999", inStock: true, url: "https://www.croma.com/searchB?q=Dell%20Inspiron%203530" },
      { store: "JioMart", price: 54499, offer: "Special JioMart electronic voucher", inStock: true, url: "https://www.jiomart.com/search/Dell%20Inspiron%203530" }
    ]
  },

  // Tablets
  {
    id: "apple-ipad-air-m2",
    slug: "apple-ipad-air-m2",
    name: "Apple iPad Air 11\" M2 (128GB Wi-Fi / Liquid Retina)",
    brand: "Apple",
    category: "tablets",
    tags: ["tablet", "apple", "ipad", "m2", "creators", "stylus"],
    status: "In Stock",
    score: 95,
    launchedOn: "07 May 2024",
    updatedAt: new Date().toISOString(),
    mrp: 59900,
    specs: {
      processor: "Apple M2 Chip (8-core CPU / 9-core GPU / 16-core Neural Engine)",
      display: "11\" Liquid Retina (2360x1640) | P3 Wide Color | True Tone | Antireflective",
      camera: "12MP Wide back camera | Landscape 12MP Ultra Wide front camera with Center Stage",
      battery: "28.93Wh Rechargeable Lithium-Polymer | Up to 10 Hours Web Surfing",
      memory: "8GB RAM | 128GB Internal Storage"
    },
    pros: [
      "Phenomenal M2 processing speed handles 4K video editing effortlessly",
      "Landscape front camera orientation ideal for video conferencing",
      "Supports Apple Pencil Pro and Magic Keyboard"
    ],
    cons: [
      "60Hz refresh rate rather than 120Hz ProMotion",
      "Accessories sold separately at high cost"
    ],
    expertVerdict: "The ultimate tablet for digital artists, students, and mobile power users seeking Pro-level performance under ₹60K.",
    stores: [
      { store: "Amazon", price: 54900, offer: "₹4,000 instant discount with ICICI/HDFC Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+iPad+Air+11+M2&tag=teachunder-21" },
      { store: "Flipkart", price: 55900, offer: "₹3,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Apple+iPad+Air+11+M2" },
      { store: "Croma", price: 56900, offer: "Free Apple Pencil 25% discount voucher", inStock: true, url: "https://www.croma.com/searchB?q=iPad%20Air%20M2" },
      { store: "JioMart", price: 56490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/iPad%20Air%20M2" }
    ]
  },
  {
    id: "samsung-galaxy-tab-a9-plus",
    slug: "samsung-galaxy-tab-a9-plus",
    name: "Samsung Galaxy Tab A9+ 11\" 90Hz (8GB/128GB Wi-Fi / Quad Speakers)",
    brand: "Samsung",
    category: "tablets",
    tags: ["tablet", "samsung", "budget", "entertainment", "kids", "quad-speakers"],
    status: "In Stock",
    score: 86,
    launchedOn: "15 Oct 2023",
    updatedAt: new Date().toISOString(),
    mrp: 27999,
    specs: {
      processor: "Qualcomm Snapdragon 695 5G (Octa-Core 2.2GHz)",
      display: "11.0\" WUXGA (1920x1200) | 90Hz Refresh Rate | 16M Colors",
      camera: "8MP AF Rear Camera | 5MP Front Camera",
      battery: "7040mAh Long-lasting Battery | 15W Fast Charging",
      memory: "8GB RAM | 128GB ROM (MicroSD Expandable up to 1TB)"
    },
    pros: [
      "Smooth 90Hz 11-inch display with rich quad Dolby Atmos speakers",
      "Samsung DeX mode provides PC-like productivity multi-windowing",
      "Generous 8GB RAM ensures smooth app multitasking"
    ],
    cons: [
      "Does not support active S-Pen stylus input",
      "Charger not included in retail packaging"
    ],
    expertVerdict: "Best entertainment and study tablet under ₹20,000 with premium quad speakers and Samsung DeX support.",
    stores: [
      { store: "Amazon", price: 18999, offer: "₹2,000 instant discount on HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Tab+A9+Plus&tag=teachunder-21" },
      { store: "Flipkart", price: 19499, offer: "5% cashback on Flipkart Axis Card", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Tab+A9+Plus" },
      { store: "Croma", price: 19999, offer: "Book Cover combo at ₹499", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Tab%20A9%20Plus" },
      { store: "JioMart", price: 19790, offer: "₹500 instant UPI discount", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Tab%20A9%20Plus" }
    ]
  },
  {
    id: "lenovo-tab-m11",
    slug: "lenovo-tab-m11",
    name: "Lenovo Tab M11 11\" WUXGA 90Hz (4GB/128GB Wi-Fi with Pen Included)",
    brand: "Lenovo",
    category: "tablets",
    tags: ["tablet", "lenovo", "stylus", "study", "notes", "budget"],
    status: "In Stock",
    score: 83,
    launchedOn: "12 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 23000,
    specs: {
      processor: "MediaTek Helio G88 (Octa-core 2.0GHz)",
      display: "11\" WUXGA (1920x1200) IPS | 90Hz | 400 nits | 72% NTSC",
      camera: "13MP Rear Camera | 8MP Front Camera",
      battery: "7040mAh Battery | Up to 10 Hours Video Playback",
      memory: "4GB LPDDR4x | 128GB eMMC 5.1 (Expandable to 1TB)"
    },
    pros: [
      "Lenovo Tab Pen included in box at no extra charge",
      "TUV Rheinland Low Blue Light certified for eye safety",
      "Quad speakers optimized with Dolby Atmos"
    ],
    cons: [
      "Helio G88 processor is strictly for casual use, not heavy 3D gaming",
      "Charging speed capped at 15W"
    ],
    expertVerdict: "An unbeatable study companion for students who need digital handwriting and PDF annotations right out of the box.",
    stores: [
      { store: "Amazon", price: 14999, offer: "₹1,500 off on Bank Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Lenovo+Tab+M11+with+pen&tag=teachunder-21" },
      { store: "Flipkart", price: 15499, offer: "No Cost EMI up to 6 months", inStock: true, url: "https://www.flipkart.com/search?q=Lenovo+Tab+M11" },
      { store: "Croma", price: 15999, offer: "Free Tablet Sleeve pouch", inStock: true, url: "https://www.croma.com/searchB?q=Lenovo%20Tab%20M11" },
      { store: "JioMart", price: 15790, offer: "Standard Card Offers", inStock: true, url: "https://www.jiomart.com/search/Lenovo%20Tab%20M11" }
    ]
  },
  {
    id: "oneplus-pad-2",
    slug: "oneplus-pad-2",
    name: "OnePlus Pad 2 12.1\" 3K 144Hz (Snapdragon 8 Gen 3 / 12GB/256GB)",
    brand: "OnePlus",
    category: "tablets",
    tags: ["tablet", "oneplus", "flagship", "snapdragon", "gaming", "3k-display"],
    status: "In Stock",
    score: 93,
    launchedOn: "16 Jul 2024",
    updatedAt: new Date().toISOString(),
    mrp: 47999,
    specs: {
      processor: "Qualcomm Snapdragon 8 Gen 3 Flagship (4nm TSMC)",
      display: "12.1\" 3K (3000x2120) | 144Hz Adaptive | 900 nits Peak | 7:5 ReadFit Ratio",
      camera: "13MP Rear Camera | 8MP Front Facing Camera",
      battery: "9510mAh Massive Battery | 67W SUPERVOOC Fast Charging",
      memory: "12GB LPDDR5X | 256GB UFS 3.1"
    },
    pros: [
      "Industry-leading Snapdragon 8 Gen 3 performance in Android tablet",
      "Gorgeous 3K 144Hz panel with unique 7:5 aspect ratio",
      "67W ultra-fast charging fuels massive 9510mAh battery in ~80 minutes"
    ],
    cons: [
      "No cellular LTE/5G variant available",
      "No fingerprint sensor (face unlock only)"
    ],
    expertVerdict: "The undisputed Android flagship tablet champion of 2024-2026, combining bleeding-edge silicon with unmatched display fidelity.",
    stores: [
      { store: "Amazon", price: 39999, offer: "₹3,000 instant bank discount with ICICI/OneCard", inStock: true, url: "https://www.amazon.in/s?k=OnePlus+Pad+2&tag=teachunder-21" },
      { store: "Flipkart", price: 40999, offer: "₹2,000 off on Axis Bank Cards", inStock: true, url: "https://www.flipkart.com/search?q=OnePlus+Pad+2" },
      { store: "Croma", price: 41999, offer: "Free OnePlus Stylo 2 at special bundle price", inStock: true, url: "https://www.croma.com/searchB?q=OnePlus%20Pad%202" },
      { store: "JioMart", price: 41490, offer: "₹1,500 cashback on UPI", inStock: true, url: "https://www.jiomart.com/search/OnePlus%20Pad%202" }
    ]
  },

  // Smart TV
  {
    id: "sony-bravia-65-4k-kd65x74l",
    slug: "sony-bravia-65-4k-kd65x74l",
    name: "Sony Bravia 65\" 4K Ultra HD Smart LED Google TV (KD-65X74L)",
    brand: "Sony",
    category: "smart-tv",
    tags: ["smart-tv", "sony", "bravia", "4k", "65-inch", "google-tv", "cinematic"],
    status: "In Stock",
    score: 93,
    launchedOn: "12 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 139900,
    specs: {
      processor: "X1 4K Processor with 4K X-Reality PRO upscaling",
      display: "65\" 4K Ultra HD (3840x2160) | Live Color | Motionflow XR 100",
      audio: "20W Open Baffle Speaker | Dolby Audio | Clear Phase",
      connectivity: "3 HDMI ports | 2 USB ports | Dual-Band Wi-Fi | Bluetooth 5.0",
      smartFeatures: "Google TV | Apple AirPlay 2 | HomeKit | Voice Search Remote"
    },
    pros: [
      "Sony X1 processor provides top-tier color accuracy and SDR-to-4K upscaling",
      "Seamless Google TV interface with voice-enabled remote control",
      "X-Protection PRO defends against dust, humidity, and lightning surges"
    ],
    cons: [
      "60Hz refresh rate (not 120Hz HDMI 2.1 for PS5)",
      "Standard LED backlight rather than full-array local dimming"
    ],
    expertVerdict: "A grand 65-inch cinematic viewing experience with Sony's revered image post-processing engine at a realistic price.",
    stores: [
      { store: "Amazon", price: 74990, offer: "₹5,000 instant discount with ICICI/HDFC Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Sony+Bravia+65+inch+4K+KD-65X74L&tag=teachunder-21" },
      { store: "Flipkart", price: 75990, offer: "₹4,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Sony+Bravia+65+inch+4K+KD-65X74L" },
      { store: "Croma", price: 76990, offer: "Free Wall Mount & Standard Installation", inStock: true, url: "https://www.croma.com/searchB?q=Sony%20Bravia%2065%20inch%20KD-65X74L" },
      { store: "JioMart", price: 77490, offer: "Special electronic discount voucher", inStock: true, url: "https://www.jiomart.com/search/Sony%20Bravia%2065%20inch" }
    ]
  },
  {
    id: "samsung-55-crystal-4k",
    slug: "samsung-55-crystal-4k",
    name: "Samsung 55\" Crystal 4K Vivid Pro Ultra HD Smart TV (55DU7700)",
    brand: "Samsung",
    category: "smart-tv",
    tags: ["smart-tv", "samsung", "crystal-4k", "55-inch", "tizen", "hdr10"],
    status: "In Stock",
    score: 90,
    launchedOn: "10 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 68900,
    specs: {
      processor: "Crystal Processor 4K with 4K Upscaling & PurColor",
      display: "55\" 4K UHD (3840x2160) | HDR 10+ | Motion Xcelerator | Mega Contrast",
      audio: "20W 2-Channel Speakers | Q-Symphony | OTS Lite (Object Tracking Sound)",
      connectivity: "3 HDMI ports | 1 USB port | Wi-Fi 5 | Bluetooth 5.2",
      smartFeatures: "Tizen OS | Samsung TV Plus | Knox Security | SmartThings Hub"
    },
    pros: [
      "Vivid and saturated PurColor palette optimized for sports and movies",
      "Q-Symphony pairs perfectly with Samsung soundbars for synchronized audio",
      "Clean AirSlim design with 3-side bezel-less frame"
    ],
    cons: [
      "Tizen OS interface occasionally stutters on initial boot",
      "Viewing angles are average on VA panel"
    ],
    expertVerdict: "Samsung's most popular 55-inch 4K TV combining high-contrast panel tech with Samsung Knox security and SmartThings integration.",
    stores: [
      { store: "Amazon", price: 43990, offer: "₹3,000 instant discount on HDFC/ICICI Bank", inStock: true, url: "https://www.amazon.in/s?k=Samsung+55+inch+Crystal+4K+55DU7700&tag=teachunder-21" },
      { store: "Flipkart", price: 44490, offer: "5% cashback on Flipkart Axis Card", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+55+inch+Crystal+4K+55DU7700" },
      { store: "Croma", price: 45990, offer: "Free Standard Installation within 48 hours", inStock: true, url: "https://www.croma.com/searchB?q=Samsung%2055%20inch%20Crystal%204K" },
      { store: "JioMart", price: 45490, offer: "₹1,500 UPI discount", inStock: true, url: "https://www.jiomart.com/search/Samsung%2055%20inch%20Crystal%204K" }
    ]
  },
  {
    id: "tcl-55-qled-4k",
    slug: "tcl-55-qled-4k",
    name: "TCL 55\" 4K Ultra HD Bezel-Less Smart QLED Google TV (55V6B)",
    brand: "TCL",
    category: "smart-tv",
    tags: ["smart-tv", "tcl", "qled", "55-inch", "google-tv", "dolby-vision"],
    status: "In Stock",
    score: 88,
    launchedOn: "15 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 64990,
    specs: {
      processor: "AIPQ Engine Gen 3 Quad-Core 64-bit",
      display: "55\" 4K Quantum Dot QLED (3840x2160) | Dolby Vision | HDR10+ | 93% DCI-P3",
      audio: "24W Stereo Speakers | Dolby Atmos | DTS Virtual:X",
      connectivity: "3 HDMI ports (HDMI 2.1 eARC) | 1 USB | Dual-Band Wi-Fi",
      smartFeatures: "Google TV | Hands-Free Voice Control | Game Master Mode"
    },
    pros: [
      "True Quantum Dot (QLED) panel delivers over 1 billion vibrant colors",
      "Support for premium HDR formats including Dolby Vision & Dolby Atmos",
      "Unmatched price point for a genuine 55-inch QLED"
    ],
    cons: [
      "Peak HDR brightness capped around 350 nits",
      "Factory audio tuning lacks deep sub-bass"
    ],
    expertVerdict: "The most affordable gateway into Quantum Dot color brilliance with Google TV convenience and Dolby Vision support.",
    stores: [
      { store: "Amazon", price: 34990, offer: "₹2,500 instant discount on Bank Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=TCL+55+inch+QLED+4K+TV&tag=teachunder-21" },
      { store: "Flipkart", price: 35990, offer: "₹1,500 Axis Bank discount", inStock: true, url: "https://www.flipkart.com/search?q=TCL+55+inch+QLED+4K+TV" },
      { store: "Croma", price: 36990, offer: "Free Installation & Demo", inStock: true, url: "https://www.croma.com/searchB?q=TCL%2055%20inch%20QLED" },
      { store: "JioMart", price: 36490, offer: "₹1,000 instant cashback", inStock: true, url: "https://www.jiomart.com/search/TCL%2055%20inch%20QLED" }
    ]
  },
  {
    id: "vu-55-gloled-4k",
    slug: "vu-55-gloled-4k",
    name: "Vu 55\" GloLED 4K Ultra HD Smart LED Google TV (55GloLED)",
    brand: "Vu",
    category: "smart-tv",
    tags: ["smart-tv", "vu", "gloled", "55-inch", "google-tv", "subwoofer"],
    status: "In Stock",
    score: 87,
    launchedOn: "05 Nov 2023",
    updatedAt: new Date().toISOString(),
    mrp: 55000,
    specs: {
      processor: "Vu Glo AI Processor with Dual-Core GPU",
      display: "55\" 4K GloPanel (3840x2160) | 400 nits Brightness | 94% NTSC | Dolby Vision",
      audio: "104W DJ Sound with Built-in Subwoofer | Dolby Atmos",
      connectivity: "3 HDMI (eARC) | 2 USB | Dual-Band Wi-Fi | Bluetooth 5.1",
      smartFeatures: "Google TV | Cricket Mode | Cinema Day/Night Mode | Ambient Light Sensor"
    },
    pros: [
      "Incredible 104W sound output with integrated subwoofer eliminates need for soundbar",
      "GloPanel provides 400 nits high brightness punchy highlights",
      "Dedicated Cricket Mode optimizes green pitch grass and stadium audio"
    ],
    cons: [
      "Thicker chassis due to the rear woofer enclosure",
      "Software update frequency is slower than Sony/Samsung"
    ],
    expertVerdict: "Built specifically for Indian living rooms with booming 104W built-in subwoofer audio and high-brightness anti-glare panel.",
    stores: [
      { store: "Amazon", price: 37990, offer: "₹2,000 off with Major Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Vu+55+inch+GloLED+4K+TV&tag=teachunder-21" },
      { store: "Flipkart", price: 37990, offer: "₹2,000 HDFC Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Vu+55+inch+GloLED+4K+TV" },
      { store: "Croma", price: 39490, offer: "Standard Wall Mount included", inStock: true, url: "https://www.croma.com/searchB?q=Vu%2055%20inch%20GloLED" },
      { store: "JioMart", price: 39990, offer: "Special Bank Offers", inStock: true, url: "https://www.jiomart.com/search/Vu%2055%20inch%20GloLED" }
    ]
  },

  // Refrigerators
  {
    id: "samsung-345l-convertible-double-door",
    slug: "samsung-345l-convertible-double-door",
    name: "Samsung 345L 3-Star Convertible 5-in-1 Frost Free Double Door Refrigerator",
    brand: "Samsung",
    category: "refrigerators",
    tags: ["refrigerator", "samsung", "double-door", "convertible", "inverter", "large-family"],
    status: "In Stock",
    score: 92,
    launchedOn: "14 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 52990,
    specs: {
      capacity: "345 Litres (Fresh Food: 265L / Freezer: 80L)",
      compressor: "Digital Inverter Compressor with 20-Year Warranty",
      energyRating: "3 Star Energy Efficiency (2024 BEE Norms)",
      features: "Convertible 5-in-1 Modes | Twin Cooling Plus | Power Freeze & Power Cool",
      dimensions: "67.2 x 60 x 171.5 cm | Elegant Inox Finish"
    },
    pros: [
      "Twin Cooling Plus prevents odor mixing between fridge and freezer",
      "Convertible 5-in-1 modes allow turning freezer into extra fridge space",
      "Whisper-quiet Digital Inverter operation consumes up to 50% less energy"
    ],
    cons: [
      "Requires ample clearance space around top and sides",
      "Heavier footprint requires 2 people to relocate"
    ],
    expertVerdict: "The ultimate family refrigerator offering unmatched storage flexibility with Twin Cooling Plus freshness tech.",
    stores: [
      { store: "Amazon", price: 38990, offer: "₹3,500 instant discount on All Bank Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+345L+Convertible+5-in-1+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 39490, offer: "₹2,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+345L+Convertible+5-in-1+Refrigerator" },
      { store: "Croma", price: 40990, offer: "Free Refrigerator Stand + Installation", inStock: true, url: "https://www.croma.com/searchB?q=Samsung%20345L%20Refrigerator" },
      { store: "JioMart", price: 40490, offer: "₹1,500 JioPay Cashback", inStock: true, url: "https://www.jiomart.com/search/Samsung%20345L%20Refrigerator" }
    ]
  },
  {
    id: "godrej-180l-4star-single-door",
    slug: "godrej-180l-4star-single-door",
    name: "Godrej 180L 4-Star Advanced Inverter Direct Cool Single Door Refrigerator",
    brand: "Godrej",
    category: "refrigerators",
    tags: ["refrigerator", "godrej", "single-door", "budget", "energy-efficient", "bachelor"],
    status: "In Stock",
    score: 85,
    launchedOn: "08 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 20500,
    specs: {
      capacity: "180 Litres (Fresh Food: 165L / Freezer: 15L)",
      compressor: "Advanced Inverter Compressor with 10-Year Warranty",
      energyRating: "4 Star Energy Rating (Lowest electricity consumption in class)",
      features: "Turbo Cooling Technology | 20L Large Vegetable Tray | Toughened Glass Shelves",
      dimensions: "66.5 x 57.5 x 119 cm | Farm Fresh Lattice Moisture Lock"
    },
    pros: [
      "Highly energy-efficient 4-star rating saves money on electric bills",
      "Deep bottom chiller tray fits large 2.25L water and soda bottles",
      "Runs smoothly on home inverter during power outages"
    ],
    cons: [
      "Direct cool requires manual push-button defrosting periodically",
      "Compact freezer section best for ice cubes and small frozen packets"
    ],
    expertVerdict: "Budget-friendly, ultra-reliable cooling for bachelors, couples, or as a secondary bedroom refrigerator.",
    stores: [
      { store: "Amazon", price: 14490, offer: "₹1,250 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Godrej+180L+4+Star+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 14790, offer: "5% cashback on Flipkart Axis Card", inStock: true, url: "https://www.flipkart.com/search?q=Godrej+180L+4+Star+Refrigerator" },
      { store: "Croma", price: 15490, offer: "Free Standard Delivery", inStock: true, url: "https://www.croma.com/searchB?q=Godrej%20180L%20Refrigerator" },
      { store: "JioMart", price: 15290, offer: "₹500 instant UPI discount", inStock: true, url: "https://www.jiomart.com/search/Godrej%20180L%20Refrigerator" }
    ]
  },
  {
    id: "whirlpool-265l-double-door",
    slug: "whirlpool-265l-double-door",
    name: "Whirlpool 265L 3-Star IntelliFresh Inverter Frost-Free Double Door Refrigerator",
    brand: "Whirlpool",
    category: "refrigerators",
    tags: ["refrigerator", "whirlpool", "double-door", "intellifresh", "frost-free"],
    status: "In Stock",
    score: 88,
    launchedOn: "19 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 37990,
    specs: {
      capacity: "265 Litres (Fresh Food: 190L / Freezer: 75L)",
      compressor: "IntelliSense Inverter Compressor with Auto-Connect to Home Inverter",
      energyRating: "3 Star BEE Rating (2024 Standard)",
      features: "6th Sense DeepFreeze Tech | Microblock Anti-bacterial | 15 Days Garden Freshness",
      dimensions: "67 x 57 x 159 cm | German Steel Finish"
    },
    pros: [
      "6th Sense DeepFreeze ensures circular airflow to prevent cold loss",
      "Zeolite technology absorbs ethylene to prevent vegetable over-ripening",
      "Sturdy toughened glass shelves withstand heavy cooking vessels up to 100kg"
    ],
    cons: [
      "Standard ice twister takes up noticeable freezer door space",
      "Door handle is recessed rather than protruding bar"
    ],
    expertVerdict: "A dependable mid-sized frost-free refrigerator celebrated for keeping fruits and vegetables crisp for up to 15 days.",
    stores: [
      { store: "Amazon", price: 26990, offer: "₹2,000 instant discount on Bank Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Whirlpool+265L+3+Star+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 27490, offer: "₹1,500 HDFC Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Whirlpool+265L+3+Star+Refrigerator" },
      { store: "Croma", price: 28490, offer: "Free Installation & Old Fridge Exchange Bonus", inStock: true, url: "https://www.croma.com/searchB?q=Whirlpool%20265L%20Refrigerator" },
      { store: "JioMart", price: 27990, offer: "Special electronic discount", inStock: true, url: "https://www.jiomart.com/search/Whirlpool%20265L%20Refrigerator" }
    ]
  },
  {
    id: "lg-260l-3star-double-door",
    slug: "lg-260l-3star-double-door",
    name: "LG 260L 3-Star Smart Inverter Frost-Free Double Door Refrigerator",
    brand: "LG",
    category: "refrigerators",
    tags: ["refrigerator", "lg", "double-door", "smart-inverter", "door-cooling"],
    status: "In Stock",
    score: 91,
    launchedOn: "05 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 39999,
    specs: {
      capacity: "260 Litres (Fresh Food: 185L / Freezer: 75L)",
      compressor: "Smart Inverter Compressor with 10-Year Warranty",
      energyRating: "3 Star Energy Rating",
      features: "Door Cooling+ | Multi Air Flow | Smart Diagnosis | Auto Smart Connect",
      dimensions: "70.3 x 58.5 x 147.5 cm | Dazzle Steel Finish"
    },
    pros: [
      "Door Cooling+ provides specialized vents directly cooling milk bottles in door bins",
      "Extremely quiet operation and exceptional energy conservation",
      "Smart Diagnosis allows troubleshooting issues directly via phone app"
    ],
    cons: [
      "Glossy finish is prone to fingerprint smudges",
      "Light inside freezer compartment is absent"
    ],
    expertVerdict: "LG's benchmark double door refrigerator loved for its Door Cooling+ performance and unmatched durability.",
    stores: [
      { store: "Amazon", price: 25990, offer: "₹2,500 instant discount with ICICI/HDFC Cards", inStock: true, url: "https://www.amazon.in/s?k=LG+260L+3+Star+Double+Door+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 26490, offer: "₹2,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=LG+260L+3+Star+Double+Door+Refrigerator" },
      { store: "Croma", price: 27490, offer: "Free Installation & Demo within 48h", inStock: true, url: "https://www.croma.com/searchB?q=LG%20260L%20Double%20Door%20Refrigerator" },
      { store: "JioMart", price: 26990, offer: "₹1,000 JioPay Cashback", inStock: true, url: "https://www.jiomart.com/search/LG%20260L%20Double%20Door%20Refrigerator" }
    ]
  },

  // Air Conditioners
  {
    id: "voltas-1-5ton-3star-inverter",
    slug: "voltas-1-5ton-3star-inverter",
    name: "Voltas 1.5 Ton 3-Star Inverter Split AC (4-in-1 Adjustable Cooling)",
    brand: "Voltas",
    category: "air-conditioners",
    tags: ["air-conditioners", "ac", "voltas", "split-ac", "inverter", "copper"],
    status: "In Stock",
    score: 87,
    launchedOn: "12 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 62990,
    specs: {
      capacity: "1.5 Ton (Suitable for medium rooms 111 to 150 sq.ft)",
      compressor: "High Ambient Variable Speed Inverter Compressor (Cools up to 52°C)",
      energyRating: "3 Star Rating (ISEER: 3.81 / Annual Electricity: 975.26 kWh)",
      condenser: "100% Copper Condenser Tubes with Blue Fin Anti-Corrosion Coating",
      features: "4-in-1 Adjustable Modes | Anti-Microbial Air Filter | Superdry Dehumidifier"
    },
    pros: [
      "Engineered specifically for extreme Indian summer temperatures up to 52°C",
      "4-in-1 adjustable cooling optimizes tonnage based on room occupancy",
      "Extensive nationwide service support network across Tier 1, 2, and 3 cities"
    ],
    cons: [
      "Indoor unit aesthetic is traditional and utilitarian",
      "Remote control lacks backlighting for night operation"
    ],
    expertVerdict: "A true workhorse air conditioner engineered to survive brutal Indian heatwaves with high ambient cooling.",
    stores: [
      { store: "Amazon", price: 32990, offer: "₹2,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Voltas+1.5+Ton+3+Star+Inverter+Split+AC&tag=teachunder-21" },
      { store: "Flipkart", price: 33490, offer: "₹2,000 off on Axis/HDFC Bank", inStock: true, url: "https://www.flipkart.com/search?q=Voltas+1.5+Ton+3+Star+Inverter+Split+AC" },
      { store: "Croma", price: 34990, offer: "Standard Installation at ₹1,199 bundle", inStock: true, url: "https://www.croma.com/searchB?q=Voltas%201.5%20Ton%20Inverter%20AC" },
      { store: "JioMart", price: 34490, offer: "₹1,500 UPI discount", inStock: true, url: "https://www.jiomart.com/search/Voltas%201.5%20Ton%20AC" }
    ]
  },
  {
    id: "panasonic-1-5ton-5star-wifi-inverter",
    slug: "panasonic-1-5ton-5star-wifi-inverter",
    name: "Panasonic 1.5 Ton 5-Star Wi-Fi Inverter Split AC (Matter Enabled / 7-in-1 Convertible)",
    brand: "Panasonic",
    category: "air-conditioners",
    tags: ["air-conditioners", "ac", "panasonic", "5-star", "wifi", "smart-ac", "matter"],
    status: "In Stock",
    score: 93,
    launchedOn: "18 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 66990,
    specs: {
      capacity: "1.5 Ton (Ideal for rooms 120 to 180 sq.ft)",
      compressor: "Twin Rotary Inverter Compressor with Shield Blu+ Coating",
      energyRating: "5 Star BEE Rating (ISEER: 5.10 / Annual Energy: 774.19 kWh)",
      condenser: "100% Pure Copper Tubing with Anti-Corrosive Blue Fins",
      features: "Miraie Smart App | Matter Enabled | Alexa & Google Assistant | PM 0.1 Air Purifier Filter"
    },
    pros: [
      "Ultra-low electricity consumption with 5.10 ISEER 5-Star efficiency",
      "Seamless Miraie App lets you set custom sleep profiles temperature degree-by-degree",
      "First AC in India with native Matter smart home protocol support"
    ],
    cons: [
      "Initial purchase cost is higher than 3-star alternatives",
      "Requires active 2.4GHz Wi-Fi for smart scheduling features"
    ],
    expertVerdict: "The smartest, most power-efficient air conditioner available, combining PM 0.1 air purification with Matter IoT connectivity.",
    stores: [
      { store: "Amazon", price: 44990, offer: "₹4,000 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Panasonic+1.5+Ton+5+Star+WiFi+Inverter+AC&tag=teachunder-21" },
      { store: "Flipkart", price: 45490, offer: "₹3,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Panasonic+1.5+Ton+5+Star+WiFi+Inverter+AC" },
      { store: "Croma", price: 46990, offer: "Free Copper Pipe Extension Kit", inStock: true, url: "https://www.croma.com/searchB?q=Panasonic%201.5%20Ton%205%20Star%20AC" },
      { store: "JioMart", price: 46490, offer: "₹2,000 JioPay Cashback", inStock: true, url: "https://www.jiomart.com/search/Panasonic%201.5%20Ton%205%20Star%20AC" }
    ]
  },
  {
    id: "carrier-1-5ton-5star-inverter",
    slug: "carrier-1-5ton-5star-inverter",
    name: "Carrier 1.5 Ton 5-Star AI Flexicool Inverter Split AC (6-in-1 Convertible)",
    brand: "Carrier",
    category: "air-conditioners",
    tags: ["air-conditioners", "ac", "carrier", "5-star", "inverter", "flexicool"],
    status: "In Stock",
    score: 90,
    launchedOn: "10 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 76990,
    specs: {
      capacity: "1.5 Ton (Coverage: 111 to 150 sq.ft)",
      compressor: "Variable Speed Inverter Compressor with Hydrophilic Blue Fins",
      energyRating: "5 Star Rating (ISEER: 5.05 / Annual Power: 754 kWh)",
      condenser: "100% Copper with Aqua Clear Protective Coating",
      features: "Flexicool 6-in-1 Convertible | Dual Filtration (HD & PM 2.5) | Insta Cool Mode"
    },
    pros: [
      "Flexicool technology reduces energy usage by up to 50% at the touch of a button",
      "Aqua Clear protective coating resists salt and industrial atmospheric corrosion",
      "Insta Cool mode accelerates fan speed to drop room temperature rapidly"
    ],
    cons: [
      "Wi-Fi dongle sold separately as optional add-on",
      "Display light on indoor unit can be slightly bright in dark bedrooms"
    ],
    expertVerdict: "A premium 5-star cooling machine engineered with Carrier's century-old refrigeration heritage and high energy efficiency.",
    stores: [
      { store: "Amazon", price: 41990, offer: "₹3,500 off on Bank Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Carrier+1.5+Ton+5+Star+Inverter+Split+AC&tag=teachunder-21" },
      { store: "Flipkart", price: 42490, offer: "₹2,500 off with Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Carrier+1.5+Ton+5+Star+Inverter+Split+AC" },
      { store: "Croma", price: 43990, offer: "Free Standard Installation bundle", inStock: true, url: "https://www.croma.com/searchB?q=Carrier%201.5%20Ton%205%20Star%20AC" },
      { store: "JioMart", price: 43490, offer: "₹1,500 electronic discount voucher", inStock: true, url: "https://www.jiomart.com/search/Carrier%201.5%20Ton%205%20Star%20AC" }
    ]
  },
  {
    id: "blue-star-1-5ton-3star-inverter",
    slug: "blue-star-1-5ton-3star-inverter",
    name: "Blue Star 1.5 Ton 3-Star Inverter Split AC (5-in-1 Convertible / Turbo Cool)",
    brand: "Blue Star",
    category: "air-conditioners",
    tags: ["air-conditioners", "ac", "blue-star", "split-ac", "turbo-cool", "copper"],
    status: "In Stock",
    score: 88,
    launchedOn: "15 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 64990,
    specs: {
      capacity: "1.5 Ton (Ideal for rooms up to 150 sq.ft)",
      compressor: "Inverter Rotary Compressor with Acoustic Jacket for Silent Operation",
      energyRating: "3 Star Rating (ISEER: 3.90)",
      condenser: "100% Copper Condenser with Anti-Corrosive Blue Fins",
      features: "5-in-1 Convertible | Turbo Cool | Self-Diagnosis | Comfort Sleep Mode"
    },
    pros: [
      "Acoustic jacket around compressor provides whisper-quiet operation",
      "Turbo Cool rapidly brings down room temperature within minutes",
      "Heavy-duty build quality with precision temperature regulation"
    ],
    cons: [
      "No built-in Wi-Fi connectivity",
      "3-Star energy rating consumes slightly more than 5-Star models"
    ],
    expertVerdict: "Commercial-grade cooling reliability in a residential split AC package, celebrated for quiet operation and fast cooling.",
    stores: [
      { store: "Amazon", price: 35990, offer: "₹2,500 instant discount with ICICI/HDFC Bank", inStock: true, url: "https://www.amazon.in/s?k=Blue+Star+1.5+Ton+3+Star+Inverter+Split+AC&tag=teachunder-21" },
      { store: "Flipkart", price: 36490, offer: "₹2,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Blue+Star+1.5+Ton+3+Star+Inverter+Split+AC" },
      { store: "Croma", price: 37990, offer: "Standard Installation assistance", inStock: true, url: "https://www.croma.com/searchB?q=Blue%20Star%201.5%20Ton%20AC" },
      { store: "JioMart", price: 37490, offer: "₹1,000 UPI discount", inStock: true, url: "https://www.jiomart.com/search/Blue%20Star%201.5%20Ton%20AC" }
    ]
  },

  // Audio
  {
    id: "apple-airpods-pro-2",
    slug: "apple-airpods-pro-2",
    name: "Apple AirPods Pro (2nd Generation) with USB-C MagSafe Case",
    brand: "Apple",
    category: "audio",
    tags: ["audio", "apple", "airpods", "anc", "tws", "usb-c", "spatial-audio"],
    status: "In Stock",
    score: 96,
    launchedOn: "12 Sep 2023",
    updatedAt: new Date().toISOString(),
    mrp: 24900,
    specs: {
      chipset: "Apple H2 Headphone Chip | U1 Chip in MagSafe Charging Case",
      noiseCancellation: "Up to 2x more Active Noise Cancellation | Adaptive Audio | Transparency Mode",
      battery: "Up to 6 hours listening with ANC (Up to 30 hours total with Case)",
      waterResistance: "IP54 Dust, Sweat, and Water Resistant (Earbuds & Case)",
      connectivity: "Bluetooth 5.3 | USB-C MagSafe Case with Precision Finding Speaker"
    },
    pros: [
      "World-class Active Noise Cancellation and Adaptive Transparency",
      "Personalized Spatial Audio with dynamic head tracking creates theater sound",
      "MagSafe Case features built-in speaker for Find My precision tracking"
    ],
    cons: [
      "Premium price tag",
      "Advanced features restricted to Apple ecosystem devices"
    ],
    expertVerdict: "The benchmark truly wireless earbuds for Apple users, delivering peerless active noise cancellation and spatial sound immersion.",
    stores: [
      { store: "Amazon", price: 18999, offer: "₹2,000 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+AirPods+Pro+2nd+Gen+USB-C&tag=teachunder-21" },
      { store: "Flipkart", price: 19499, offer: "5% cashback on Flipkart Axis Card", inStock: true, url: "https://www.flipkart.com/search?q=Apple+AirPods+Pro+2nd+Gen+USB-C" },
      { store: "Croma", price: 20900, offer: "Complimentary Protective Silicon Case", inStock: true, url: "https://www.croma.com/searchB?q=AirPods%20Pro%202" },
      { store: "JioMart", price: 20490, offer: "₹1,000 JioPay Cashback", inStock: true, url: "https://www.jiomart.com/search/AirPods%20Pro%202" }
    ]
  },
  {
    id: "sony-wh-1000xm5",
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Over-Ear Headphones",
    brand: "Sony",
    category: "audio",
    tags: ["audio", "sony", "headphones", "anc", "hi-res", "over-ear", "audiophile"],
    status: "In Stock",
    score: 95,
    launchedOn: "20 May 2022",
    updatedAt: new Date().toISOString(),
    mrp: 34990,
    specs: {
      drivers: "30mm Specially Designed Carbon Fiber Composite Drivers",
      noiseCancellation: "Dual Processors (Integrated Processor V1 & QN1) with 8 Microphones",
      battery: "Up to 30 Hours Battery Life | 3-Min Quick Charge for 3 Hours Playback",
      codecs: "LDAC (Hi-Res Audio Wireless), AAC, SBC | DSEE Extreme Upscaling",
      connectivity: "Bluetooth 5.2 | Multipoint Connection (Connect 2 devices simultaneously)"
    },
    pros: [
      "Industry-leading active noise cancellation silences aircraft and café rumble completely",
      "Featherlight soft-fit leather headband ensures all-day fatigue-free wearing",
      "Crisp voice calls powered by 4 beamforming microphones with AI noise reduction"
    ],
    cons: [
      "Non-folding headband makes carrying case bulkier than older XM4",
      "No official IP water resistance rating"
    ],
    expertVerdict: "The undisputed champion of noise cancelling headphones, offering magnificent LDAC audio quality and plush all-day comfort.",
    stores: [
      { store: "Amazon", price: 26990, offer: "₹3,000 instant discount on Major Bank Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Sony+WH-1000XM5+Wireless+Headphones&tag=teachunder-21" },
      { store: "Flipkart", price: 27990, offer: "₹2,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Sony+WH-1000XM5" },
      { store: "Croma", price: 28990, offer: "Free Headphone Stand worth ₹1,499", inStock: true, url: "https://www.croma.com/searchB?q=Sony%20WH-1000XM5" },
      { store: "JioMart", price: 28490, offer: "Special Electronic Voucher", inStock: true, url: "https://www.jiomart.com/search/Sony%20WH-1000XM5" }
    ]
  },
  {
    id: "oneplus-bullets-wireless-z2-anc",
    slug: "oneplus-bullets-wireless-z2-anc",
    name: "OnePlus Bullets Wireless Z2 ANC Bluetooth Neckband Earphones",
    brand: "OnePlus",
    category: "audio",
    tags: ["audio", "oneplus", "neckband", "anc", "fast-charging", "budget"],
    status: "In Stock",
    score: 87,
    launchedOn: "10 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 2999,
    specs: {
      drivers: "12.4mm Deep Bass Dynamic Drivers with Titanium Coating",
      noiseCancellation: "45dB Hybrid Active Noise Cancellation with 3-Mic AI Call Noise Cancellation",
      battery: "Up to 28 Hours Battery (ANC Off) | 10-Min Charge for 20 Hours Music",
      waterResistance: "IP55 Sweat and Water Resistance",
      connectivity: "Bluetooth 5.2 | Magnetic Control (Clip together to pause)"
    },
    pros: [
      "Remarkable 45dB hybrid ANC at an accessible sub-₹2,500 price point",
      "Legendary Warp Charge delivers 20 hours playback on a 10-minute charge",
      "Snug magnetic earbuds automatically pause playback when attached"
    ],
    cons: [
      "Neckband form factor less compact than TWS earbuds",
      "No custom equalizer app for non-OnePlus smartphones"
    ],
    expertVerdict: "The best-selling wireless neckband in India, combining punchy 12.4mm bass with 45dB hybrid active noise cancellation.",
    stores: [
      { store: "Amazon", price: 1999, offer: "10% cashback on Amazon Pay ICICI Card", inStock: true, url: "https://www.amazon.in/s?k=OnePlus+Bullets+Wireless+Z2+ANC&tag=teachunder-21" },
      { store: "Flipkart", price: 2099, offer: "5% cashback on Flipkart Axis Card", inStock: true, url: "https://www.flipkart.com/search?q=OnePlus+Bullets+Wireless+Z2+ANC" },
      { store: "Croma", price: 2299, offer: "Store pickup available", inStock: true, url: "https://www.croma.com/searchB?q=OnePlus%20Bullets%20Z2%20ANC" },
      { store: "JioMart", price: 2199, offer: "Standard discounts", inStock: true, url: "https://www.jiomart.com/search/OnePlus%20Bullets%20Z2%20ANC" }
    ]
  },

  // Smartwatches
  {
    id: "apple-watch-se-2nd-gen",
    slug: "apple-watch-se-2nd-gen",
    name: "Apple Watch SE (2nd Gen) GPS 40mm Smartwatch",
    brand: "Apple",
    category: "smartwatches",
    tags: ["smartwatches", "apple", "watch-se", "fitness", "retina", "heart-rate"],
    status: "In Stock",
    score: 91,
    launchedOn: "16 Sep 2022",
    updatedAt: new Date().toISOString(),
    mrp: 29900,
    specs: {
      processor: "S8 SiP with 64-bit dual-core processor (Up to 20% faster)",
      display: "Retina LTPO OLED Display (1000 nits Peak)",
      sensors: "Second-generation optical heart sensor | High-g accelerometer | Compass | Gyroscope",
      safety: "Crash Detection | Fall Detection | Emergency SOS | International Emergency Calling",
      battery: "Built-in rechargeable lithium-ion battery | Up to 18 hours (Low Power Mode up to 36 hours)"
    },
    pros: [
      "Flawless integration with iPhone, Apple Fitness+, and Apple Pay",
      "Crucial health safety features including Crash Detection and Fall Detection",
      "Swimproof 50m water resistance with comprehensive workout tracking"
    ],
    cons: [
      "No Always-On Display",
      "Requires daily charging (18-hour battery life)"
    ],
    expertVerdict: "The smartest, most sensible smartwatch choice for iPhone users, offering core Apple Watch health features at half the price.",
    stores: [
      { store: "Amazon", price: 23999, offer: "₹2,500 instant discount on HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+Watch+SE+2nd+Gen+40mm&tag=teachunder-21" },
      { store: "Flipkart", price: 24499, offer: "₹1,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Apple+Watch+SE+2nd+Gen+40mm" },
      { store: "Croma", price: 25900, offer: "Free Apple Watch Sports Band promo", inStock: true, url: "https://www.croma.com/searchB?q=Apple%20Watch%20SE" },
      { store: "JioMart", price: 25490, offer: "₹1,000 JioPay Cashback", inStock: true, url: "https://www.jiomart.com/search/Apple%20Watch%20SE" }
    ]
  },
  {
    id: "oneplus-watch-2",
    slug: "oneplus-watch-2",
    name: "OnePlus Watch 2 with Wear OS (Dual-Engine / 100-Hour Battery / 1.43\" AMOLED)",
    brand: "OnePlus",
    category: "smartwatches",
    tags: ["smartwatches", "oneplus", "wear-os", "amoled", "long-battery", "flagship"],
    status: "In Stock",
    score: 92,
    launchedOn: "26 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 27999,
    specs: {
      processor: "Dual-Engine Architecture: Snapdragon W5 Gen 1 + BES2700 Efficiency Chip",
      display: "1.43\" High-Res AMOLED (466x466) | Sapphire Crystal Glass | 1000 nits Peak",
      os: "Wear OS by Google 4 + RTOS for background health tracking",
      battery: "500mAh Battery | Up to 100 Hours Smart Mode (12 Days in Power Saver) | 7.5W VOOC Fast Charge",
      durability: "MIL-STD-810H Military Standard | 5ATM + IP68 Water Resistance | Stainless Steel Chassis"
    },
    pros: [
      "Industry-first 100-hour battery life with full Google Wear OS functionality",
      "Sapphire crystal face resists scratches against keys and abrasive surfaces",
      "Independent Dual-Frequency GPS (L1+L5) provides pinpoint running route tracking"
    ],
    cons: [
      "46mm dial size is large and heavy on smaller wrists",
      "Does not support iOS (Android smartphones only)"
    ],
    expertVerdict: "Finally, a full Google Wear OS smartwatch that you only need to charge twice a week. A game changer for Android users.",
    stores: [
      { store: "Amazon", price: 21999, offer: "₹2,000 instant discount on Major Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=OnePlus+Watch+2&tag=teachunder-21" },
      { store: "Flipkart", price: 22499, offer: "5% cashback on Flipkart Axis Card", inStock: true, url: "https://www.flipkart.com/search?q=OnePlus+Watch+2" },
      { store: "Croma", price: 23999, offer: "Special Store discount coupon", inStock: true, url: "https://www.croma.com/searchB?q=OnePlus%20Watch%202" },
      { store: "JioMart", price: 23490, offer: "Standard Bank discounts", inStock: true, url: "https://www.jiomart.com/search/OnePlus%20Watch%202" }
    ]
  },
  {
    id: "amazfit-active-smartwatch",
    slug: "amazfit-active-smartwatch",
    name: "Amazfit Active 1.75\" AMOLED Smartwatch with Bluetooth Calling & GPS",
    brand: "Amazfit",
    category: "smartwatches",
    tags: ["smartwatches", "amazfit", "amoled", "gps", "bluetooth-calling", "battery"],
    status: "In Stock",
    score: 88,
    launchedOn: "20 Dec 2023",
    updatedAt: new Date().toISOString(),
    mrp: 19999,
    specs: {
      display: "1.75\" HD AMOLED (390x450) | 73% Screen-to-Body Ratio | Tempered Glass",
      battery: "300mAh Battery | Up to 14 Days Typical Use (30 Days Battery Saver)",
      gps: "5 Satellite Positioning Systems with Route Import & Real-time Navigation",
      health: "BioTracker PPG Biometric Sensor | Readiness Score | 24H Heart Rate, SpO2 & Stress",
      features: "Bluetooth Phone Calls | Zepp Coach AI Training | Amazon Alexa Built-in | 5 ATM Water Resistance"
    },
    pros: [
      "Superb 14-day battery life eliminates charging anxiety",
      "Accurate 5-satellite GPS navigation with offline route imports",
      "Readiness Score analyzes sleep heart rate variability to guide daily fatigue"
    ],
    cons: [
      "No third-party app store like Wear OS or watchOS",
      "Voice replies restricted to canned template messages"
    ],
    expertVerdict: "The best lightweight fitness smartwatch under ₹15,000 combining brilliant AMOLED visuals, GPS accuracy, and 14-day battery life.",
    stores: [
      { store: "Amazon", price: 11999, offer: "₹1,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Amazfit+Active+Smartwatch&tag=teachunder-21" },
      { store: "Flipkart", price: 12499, offer: "No-Cost EMI up to 6 months", inStock: true, url: "https://www.flipkart.com/search?q=Amazfit+Active+Smartwatch" },
      { store: "Croma", price: 12999, offer: "Free Extra Silicone Strap", inStock: true, url: "https://www.croma.com/searchB?q=Amazfit%20Active" },
      { store: "JioMart", price: 12790, offer: "₹500 UPI discount", inStock: true, url: "https://www.jiomart.com/search/Amazfit%20Active" }
    ]
  },

  // Accessories
  {
    id: "xiaomi-20000mah-powerbank-3i",
    slug: "xiaomi-20000mah-powerbank-3i",
    name: "Xiaomi 20000mAh Power Bank 3i (18W Fast Charging / Triple Port Output)",
    brand: "Xiaomi",
    category: "accessories",
    tags: ["accessories", "xiaomi", "powerbank", "fast-charging", "20000mah", "travel"],
    status: "In Stock",
    score: 90,
    launchedOn: "15 Oct 2022",
    updatedAt: new Date().toISOString(),
    mrp: 2999,
    specs: {
      capacity: "20000mAh (74Wh 3.7V) High-Density Lithium Polymer Battery",
      output: "18W Max Fast Charging via Dual USB-A and USB Type-C",
      input: "Dual Input: Micro-USB & Type-C (Recharges in 6.9 hours with 18W adapter)",
      protection: "12-Layer Advanced Circuit Protection against short circuit and overheating",
      features: "Low Power Charging Mode for Bluetooth headsets and fitness trackers"
    },
    pros: [
      "Massive 20000mAh capacity recharges modern 5000mAh phones up to 3.5 times",
      "Triple port output enables simultaneous charging of three devices",
      "Approved for flight cabin carry-on travel"
    ],
    cons: [
      "Charging speed capped at 18W (not 33W or 65W)",
      "Bulky 434g weight in pocket"
    ],
    expertVerdict: "The most trusted, reliable travel power bank in India with 12 layers of circuit protection and triple port output.",
    stores: [
      { store: "Amazon", price: 2049, offer: "5% cashback on Amazon Pay ICICI Card", inStock: true, url: "https://www.amazon.in/s?k=Xiaomi+20000mAh+Power+Bank+3i&tag=teachunder-21" },
      { store: "Flipkart", price: 2099, offer: "₹100 off on UPI payments", inStock: true, url: "https://www.flipkart.com/search?q=Xiaomi+20000mAh+Power+Bank+3i" },
      { store: "Croma", price: 2199, offer: "Standard delivery", inStock: true, url: "https://www.croma.com/searchB?q=Mi%20Power%20Bank%2020000mAh" },
      { store: "JioMart", price: 2149, offer: "Standard discount", inStock: true, url: "https://www.jiomart.com/search/Mi%20Power%20Bank%2020000mAh" }
    ]
  },
  {
    id: "esr-halolock-magsafe-car-charger",
    slug: "esr-halolock-magsafe-car-charger",
    name: "ESR HaloLock MagSafe Wireless Car Charger Mount (15W Fast Charging)",
    brand: "ESR",
    category: "accessories",
    tags: ["accessories", "esr", "magsafe", "car-charger", "wireless-charging", "iphone"],
    status: "In Stock",
    score: 89,
    launchedOn: "10 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 3999,
    specs: {
      chargingTech: "Qi Certified Fast Wireless Charging (Up to 15W Max Output)",
      magneticStrength: "1,400g Magnetic Holding Force (Ultra-strong N52 neodymium magnets)",
      mountingType: "Sturdy Air Vent Clamp with 3-Point Support Arm",
      compatibility: "iPhone 16 / 15 / 14 / 13 / 12 Series & MagSafe Cases",
      adjustability: "Full 360-Degree Ball Joint for Portrait and Landscape Navigation"
    },
    pros: [
      "Unshakeable 1,400g magnetic grip keeps iPhone secure over speed bumps and rough roads",
      "Fast 15W wireless charging prevents phone battery draining while running GPS maps",
      "One-handed snap-on convenience with effortless portrait-to-landscape rotation"
    ],
    cons: [
      "Requires high-wattage 18W+ USB car cigarette lighter adapter",
      "Not compatible with round rotary air vent slats"
    ],
    expertVerdict: "The best MagSafe car mount for iPhone drivers, providing rock-solid magnetic grip and active wireless charging.",
    stores: [
      { store: "Amazon", price: 2499, offer: "₹300 coupon discount at checkout", inStock: true, url: "https://www.amazon.in/s?k=ESR+HaloLock+MagSafe+Car+Mount+Charger&tag=teachunder-21" },
      { store: "Flipkart", price: 2699, offer: "5% cashback with Axis Card", inStock: true, url: "https://www.flipkart.com/search?q=ESR+HaloLock+MagSafe+Car+Mount" },
      { store: "Croma", price: 2999, offer: "Premium accessory warranty", inStock: true, url: "https://www.croma.com/searchB?q=ESR%20HaloLock%20Car%20Mount" },
      { store: "JioMart", price: 2899, offer: "Special electronic voucher", inStock: true, url: "https://www.jiomart.com/search/ESR%20Car%20Mount" }
    ]
  }
];

function appendProducts() {
  const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  const existingSlugs = new Set(catalog.products.map(p => p.slug));

  let added = 0;
  for (const p of newProducts) {
    if (!existingSlugs.has(p.slug)) {
      catalog.products.push(p);
      existingSlugs.add(p.slug);
      added++;
    }
  }

  catalog.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`Successfully added ${added} new products. Total catalog size: ${catalog.products.length}`);
}

appendProducts();
