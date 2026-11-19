import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');

const newTVs = [
  {
    id: "sony-bravia-65-x82l-4k",
    slug: "sony-bravia-65-x82l-4k",
    name: "Sony Bravia 65\" 4K Ultra HD Smart LED Google TV (KD-65X82L / Dolby Vision & Atmos)",
    brand: "Sony",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "sony", "bravia", "65-inch", "4k", "google-tv"],
    status: "In Stock",
    score: 95,
    launchedOn: "12 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 149900,
    specs: {
      display: "65\" 4K Ultra HD (3840x2160) | Triluminos Pro | 4K X-Reality PRO | Dolby Vision",
      processor: "Sony 4K HDR Processor X1 with Motionflow XR 200",
      sound: "20W Bass Reflex Speakers + X-Balanced Speaker | Dolby Atmos",
      operatingSystem: "Google TV with Hands-free Voice Search & Apple AirPlay 2",
      connectivity: "4x HDMI 2.1 (eARC, ALLM) | 2x USB | Dual Band Wi-Fi | Bluetooth 5.0"
    },
    pros: ["Class-leading Triluminos Pro true-to-life color calibration", "Powerful X1 4K processor upscales HD content cleanly", "Seamless Google TV UI with hands-free microphone"],
    cons: ["60Hz panel refresh rate", "Premium price compared to budget brands"],
    expertVerdict: "Sony's unmatched image processing and cinematic color grading make this 65-inch Google TV a living room masterpiece.",
    stores: [
      { store: "Amazon", price: 89990, offer: "₹5,000 instant bank discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Sony+Bravia+65+X82L&tag=teachunder-21" },
      { store: "Flipkart", price: 91990, offer: "₹4,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Sony+Bravia+65+X82L" },
      { store: "Croma", price: 93990, offer: "Free Sony HDMI 2.1 High Speed Cable & Installation", inStock: true, url: "https://www.croma.com/searchB?q=Sony%20Bravia%2065%20X82L" },
      { store: "JioMart", price: 95490, offer: "5% cashback with JioPay", inStock: true, url: "https://www.jiomart.com/search/Sony%20Bravia%2065" }
    ]
  },
  {
    id: "lg-65-oled-c4-4k",
    slug: "lg-65-oled-c4-4k",
    name: "LG 65\" 4K OLED evo C4 Series Smart WebOS TV (OLED65C4PSA / 144Hz / G-Sync)",
    brand: "LG",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "lg", "oled", "c4", "144hz", "flagship-tv", "gaming-tv"],
    status: "In Stock",
    score: 98,
    launchedOn: "10 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 239990,
    specs: {
      display: "65\" 4K Ultra HD (3840x2160) OLED evo | Self-lit Pixels | 144Hz | Dolby Vision | Brightness Booster",
      processor: "α9 Gen7 AI Processor 4K with AI Picture Pro & AI Super Upscaling",
      sound: "40W 2.2 Channel Audio | AI Sound Pro 9.1.2 Virtual Up-mix | Dolby Atmos",
      operatingSystem: "webOS 24 with 4 Years of Guaranteed OS Upgrades (webOS Re:New)",
      connectivity: "4x Full Bandwidth HDMI 2.1 (4K 144Hz, VRR, ALLM, FreeSync Premium, G-Sync)"
    },
    pros: ["Infinite contrast ratio and absolute pure blacks with zero light bleed", "Elite 144Hz PC and console gaming with sub-1ms response times", "webOS 24 with 4 guaranteed OS version upgrades"],
    cons: ["Expensive flagship investment", "Requires caution in rooms with direct uncontrolled sunlight"],
    expertVerdict: "The undisputed gold standard in television technology. Infinite black levels, astonishing HDR impact, and world-class gaming specs.",
    stores: [
      { store: "Amazon", price: 184990, offer: "₹10,000 instant bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=LG+65+OLED+C4&tag=teachunder-21" },
      { store: "Flipkart", price: 187990, offer: "₹8,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=LG+65+OLED+C4" },
      { store: "Croma", price: 189990, offer: "Free LG Soundbar worth ₹19,990 bundle deal", inStock: true, url: "https://www.croma.com/searchB?q=LG%2065%20OLED%20C4" },
      { store: "JioMart", price: 192990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/LG%2065%20OLED%20C4" }
    ]
  },
  {
    id: "samsung-55-qled-q60d-4k",
    slug: "samsung-55-qled-q60d-4k",
    name: "Samsung 55\" QLED 4K Smart TV (QA55Q60DAULXL / Quantum Dot / 100% Color Volume)",
    brand: "Samsung",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "samsung", "qled", "55-inch", "4k", "quantum-dot"],
    status: "In Stock",
    score: 93,
    launchedOn: "18 May 2024",
    updatedAt: new Date().toISOString(),
    mrp: 96900,
    specs: {
      display: "55\" 4K Ultra HD (3840x2160) Quantum Dot QLED | 100% Color Volume with DCI-P3 | Quantum HDR",
      processor: "Quantum Processor Lite 4K with 4K AI Upscaling",
      sound: "20W 2 Channel Speakers | OTS Lite (Object Tracking Sound) | Q-Symphony",
      operatingSystem: "Tizen Smart TV OS with SmartThings Hub & Samsung TV Plus Free Channels",
      connectivity: "3x HDMI (eARC, ALLM) | 2x USB | SolarCell Remote Control"
    },
    pros: ["100% Color Volume with Quantum Dot technology produces punchy, vibrant highlights", "Ultra-slim 25.7mm AirSlim profile with zero bezel look", "SolarCell remote eliminates AAA disposable battery waste"],
    cons: ["No Dolby Vision support (uses HDR10+)", "60Hz native refresh rate"],
    expertVerdict: "A gorgeous, super-slim 4K QLED television with rich colors, excellent daytime brightness, and eco-friendly solar remote.",
    stores: [
      { store: "Amazon", price: 61990, offer: "₹4,000 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+55+QLED+Q60D&tag=teachunder-21" },
      { store: "Flipkart", price: 62990, offer: "₹3,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+55+QLED+Q60D" },
      { store: "Croma", price: 64990, offer: "Free Samsung Wall Mount and Installation", inStock: true, url: "https://www.croma.com/searchB?q=Samsung%2055%20QLED%20Q60D" },
      { store: "JioMart", price: 65990, offer: "₹2,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Samsung%2055%20QLED" }
    ]
  },
  {
    id: "tcl-65-mini-led-c755",
    slug: "tcl-65-mini-led-c755",
    name: "TCL 65\" 4K QD-Mini LED Google TV (65C755 / 144Hz / 500+ Local Dimming Zones)",
    brand: "TCL",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "tcl", "mini-led", "65-inch", "144hz", "c755"],
    status: "In Stock",
    score: 94,
    launchedOn: "15 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 149990,
    specs: {
      display: "65\" 4K Ultra HD QD-Mini LED | 500+ Dimming Zones | 144Hz VRR | 1300 nits Peak | Dolby Vision IQ",
      processor: "AiPQ Processor 3.0 with AI-Contrast, AI-Color & AI-Clarity",
      sound: "50W 2.1 Channel ONKYO Audio System with Built-in Subwoofer | Dolby Atmos",
      operatingSystem: "Google TV with Hands-free Voice Control & Game Master 2.0",
      connectivity: "4x HDMI 2.1 (4K 144Hz, AMD FreeSync Premium Pro, eARC) | USB 3.0"
    },
    pros: ["Astonishing 1300 nits peak brightness overcomes sunny rooms effortlessly", "Deep black levels with 500+ precise Mini-LED local dimming zones", "Integrated 50W 2.1 ONKYO subwoofer produces theater-grade bass"],
    cons: ["Slight blooming on white subtitles against black backgrounds", "Heavy 22kg TV unit"],
    expertVerdict: "A high-end Mini-LED marvel offering eye-searing brightness, built-in subwoofer bass, and 144Hz gaming at a competitive price.",
    stores: [
      { store: "Amazon", price: 89990, offer: "₹5,000 bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=TCL+65+Mini+LED+C755&tag=teachunder-21" },
      { store: "Flipkart", price: 91490, offer: "₹4,000 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=TCL+65+Mini+LED+C755" },
      { store: "Croma", price: 93990, offer: "Free Installation & Premium Wall Bracket", inStock: true, url: "https://www.croma.com/searchB?q=TCL%2065%20Mini%20LED" },
      { store: "JioMart", price: 95000, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/TCL%2065%20Mini%20LED" }
    ]
  },
  {
    id: "hisense-55-tornado-qled-4k",
    slug: "hisense-55-tornado-qled-4k",
    name: "Hisense 55\" 4K QLED Smart Google TV (55E7K Pro / 144Hz / 49W Subwoofer Audio)",
    brand: "Hisense",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "hisense", "tornado", "144hz", "built-in-subwoofer", "qled"],
    status: "In Stock",
    score: 92,
    launchedOn: "25 Sep 2023",
    updatedAt: new Date().toISOString(),
    mrp: 79999,
    specs: {
      display: "55\" 4K Ultra HD (3840x2160) Quantum Dot QLED | 144Hz Native Refresh Rate | Dolby Vision IQ",
      processor: "Hi-View Engine with AI Picture Optimization & Dynamic Tone Mapping",
      sound: "49W 2.1 Channel Sound with Built-in Woofer | Dolby Atmos",
      operatingSystem: "Google TV with Voice Remote & Apple AirPlay",
      connectivity: "4x HDMI 2.1 (4K 144Hz VRR, ALLM, AMD FreeSync Premium) | 2x USB"
    },
    pros: ["Real 144Hz refresh rate for super-smooth sports and console gaming", "Built-in rear subwoofer provides real rumbling bass without a separate soundbar", "Quantum Dot color purity with Dolby Vision IQ ambient light adjustment"],
    cons: ["Viewing angles fade slightly when viewing from wide sides", "Remote control buttons feel plasticky"],
    expertVerdict: "An absolute bang-for-the-buck TV combining 144Hz high-refresh gaming, QLED colors, and an explosive built-in subwoofer.",
    stores: [
      { store: "Amazon", price: 44990, offer: "₹3,000 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Hisense+55+Tornado+QLED&tag=teachunder-21" },
      { store: "Flipkart", price: 45990, offer: "₹2,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Hisense+55+Tornado+QLED" },
      { store: "Croma", price: 47990, offer: "Free Wall Mount Kit & Installation", inStock: true, url: "https://www.croma.com/searchB?q=Hisense%2055%20Tornado" },
      { store: "JioMart", price: 48990, offer: "₹1,500 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Hisense%2055" }
    ]
  },
  {
    id: "xiaomi-55-x-pro-4k-qled",
    slug: "xiaomi-55-x-pro-4k-qled",
    name: "Xiaomi 55\" X Pro 4K Dolby Vision Smart Google TV (L55M8-A2IN / 34W Audio)",
    brand: "Xiaomi",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "xiaomi", "x-pro", "55-inch", "dolby-vision", "google-tv"],
    status: "In Stock",
    score: 91,
    launchedOn: "19 Apr 2023",
    updatedAt: new Date().toISOString(),
    mrp: 54999,
    specs: {
      display: "55\" 4K Ultra HD (3840x2160) | Dolby Vision IQ | HDR10+ | Vivid Picture Engine 2 | 96% DCI-P3",
      processor: "Quad Core Cortex A55 64-bit with Mali G52 MP2 GPU",
      sound: "34W Speaker System | Dolby Audio | DTS-X | DTS Virtual:X",
      operatingSystem: "Google TV with PatchWall+ (200+ Free Live Channels)",
      connectivity: "3x HDMI 2.1 (eARC, ALLM) | 2x USB | Dual Band Wi-Fi | Bluetooth 5.0"
    },
    pros: ["Premium aluminum alloy metallic bezel frame design", "PatchWall+ integration aggregates 200+ free live channels", "Punchy 34W speaker setup with clear vocal dialogs"],
    cons: ["60Hz panel refresh rate", "Pre-loaded promotional apps on first boot"],
    expertVerdict: "A feature-packed 55-inch 4K TV combining premium metal styling, punchy audio, and seamless Google TV entertainment.",
    stores: [
      { store: "Amazon", price: 39999, offer: "₹2,500 instant discount with ICICI/HDFC Cards", inStock: true, url: "https://www.amazon.in/s?k=Xiaomi+55+X+Pro+4K&tag=teachunder-21" },
      { store: "Flipkart", price: 40999, offer: "₹2,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Xiaomi+55+X+Pro+4K" },
      { store: "Croma", price: 42490, offer: "Free Mi Dual Driver Earphones", inStock: true, url: "https://www.croma.com/searchB?q=Xiaomi%2055%20X%20Pro" },
      { store: "JioMart", price: 43490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Xiaomi%2055%20X%20Pro" }
    ]
  },
  {
    id: "vu-55-the-gloled-4k",
    slug: "vu-55-the-gloled-4k",
    name: "Vu 55\" The GloLED 4K Smart Google TV (55GloLED / 104W DJ Subwoofer Soundbar)",
    brand: "Vu",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "vu", "gloled", "55-inch", "104w-sound", "cricket-mode"],
    status: "In Stock",
    score: 90,
    launchedOn: "12 Sep 2022",
    updatedAt: new Date().toISOString(),
    mrp: 65000,
    specs: {
      display: "55\" 4K Glo Panel | 400 nits Nits | 94% NTSC Color Gamut | Dolby Vision & HDR10",
      processor: "Vu Glo AI Processor with Advanced Cricket Mode & Cinema Mode",
      sound: "104W Integrated Soundbar (4 Speakers + 1 Built-in Subwoofer) | Dolby Atmos",
      operatingSystem: "Google TV with Hands-free Voice Search & ActiVoice Remote",
      connectivity: "3x HDMI (eARC) | 2x USB | Optical Out | Bluetooth 5.1"
    },
    pros: ["Massive 104W integrated soundbar eliminates the need for external speakers", "Glo Panel technology amplifies brightness by 60% with energy efficiency", "Dedicated Cricket Mode enhances ball tracking and stadium atmosphere"],
    cons: ["Slightly thicker bottom bezel to house the 104W soundbar", "60Hz refresh rate"],
    expertVerdict: "The best sounding 55-inch TV on a budget, featuring a roaring 104W built-in subwoofer system that shakes the room.",
    stores: [
      { store: "Amazon", price: 37990, offer: "₹2,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Vu+55+GloLED+4K&tag=teachunder-21" },
      { store: "Flipkart", price: 38990, offer: "₹1,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Vu+55+GloLED+4K" },
      { store: "Croma", price: 40990, offer: "Free Wall Mount and Installation", inStock: true, url: "https://www.croma.com/searchB?q=Vu%2055%20GloLED" },
      { store: "JioMart", price: 41990, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Vu%2055%20GloLED" }
    ]
  },
  {
    id: "sony-bravia-50-x75l-4k",
    slug: "sony-bravia-50-x75l-4k",
    name: "Sony Bravia 50\" 4K Ultra HD Smart Google TV (KD-50X75L / X1 4K Processor)",
    brand: "Sony",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "sony", "bravia", "50-inch", "4k", "x75l"],
    status: "In Stock",
    score: 92,
    launchedOn: "15 Apr 2023",
    updatedAt: new Date().toISOString(),
    mrp: 85900,
    specs: {
      display: "50\" 4K Ultra HD (3840x2160) | Live Color | 4K X-Reality PRO Upscaling",
      processor: "Sony X1 4K Processor with Motionflow XR 200",
      sound: "20W Open Baffle Down Firing Speakers | Dolby Audio",
      operatingSystem: "Google TV with Voice Search & Chromecast Built-in",
      connectivity: "3x HDMI (ALLM, eARC) | 2x USB | Ethernet | Dual Band Wi-Fi"
    },
    pros: ["Renowned Sony natural skin tone reproduction and motion handling", "X-Protection PRO defends against dust, humidity, and lightning surges", "Clean Google TV interface with fast app loading"],
    cons: ["Basic 20W speakers sound plain in larger rooms", "No Dolby Vision on this specific entry X75 tier (HDR10/HLG)"],
    expertVerdict: "A reliable 50-inch Sony Bravia engineered with surge protection, realistic color accuracy, and clean 4K upscaling.",
    stores: [
      { store: "Amazon", price: 54990, offer: "₹3,500 instant discount with Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Sony+Bravia+50+X75L&tag=teachunder-21" },
      { store: "Flipkart", price: 56490, offer: "₹2,500 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Sony+Bravia+50+X75L" },
      { store: "Croma", price: 57990, offer: "Free Sony HDMI Cable and Standard Installation", inStock: true, url: "https://www.croma.com/searchB?q=Sony%20Bravia%2050%20X75L" },
      { store: "JioMart", price: 58990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Sony%2050%20X75L" }
    ]
  },
  {
    id: "lg-50-4k-uhd-nanocell",
    slug: "lg-50-4k-uhd-nanocell",
    name: "LG 50\" 4K Ultra HD NanoCell Smart WebOS TV (50NANO77SRA / Pure Colors)",
    brand: "LG",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "lg", "nanocell", "50-inch", "webos", "magic-remote"],
    status: "In Stock",
    score: 91,
    launchedOn: "20 Jun 2023",
    updatedAt: new Date().toISOString(),
    mrp: 74990,
    specs: {
      display: "50\" 4K Ultra HD (3840x2160) NanoCell Panel | Pure Colors Filtering | HDR10 Pro | Filmmaker Mode",
      processor: "α5 AI Processor 4K Gen6 with AI Brightness Control",
      sound: "20W 2.0 Channel | AI Sound Pro 5.1.2 Virtual Sound | Clear Voice Pro",
      operatingSystem: "webOS 23 with Magic Remote Control & ThinQ AI",
      connectivity: "3x HDMI 2.0 (eARC, ALLM) | 2x USB | Apple AirPlay 2"
    },
    pros: ["NanoCell nanoparticles filter impure colors for vivid natural richness", "Ergonomic Magic Remote with point-and-click air mouse navigation", "Apple AirPlay 2 and HomeKit integration"],
    cons: ["60Hz panel refresh rate", "Edge-lit dimming has moderate black levels"],
    expertVerdict: "A high-clarity 50-inch 4K TV distinguished by NanoCell color filtering and LG's legendary Magic Remote.",
    stores: [
      { store: "Amazon", price: 46990, offer: "₹3,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=LG+50+NanoCell+4K&tag=teachunder-21" },
      { store: "Flipkart", price: 47990, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=LG+50+NanoCell+4K" },
      { store: "Croma", price: 49490, offer: "Free Magic Remote Batteries and Wall Bracket", inStock: true, url: "https://www.croma.com/searchB?q=LG%2050%20NanoCell" },
      { store: "JioMart", price: 50490, offer: "₹1,000 cashback with net banking", inStock: true, url: "https://www.jiomart.com/search/LG%2050%20NanoCell" }
    ]
  },
  {
    id: "samsung-65-crystal-4k-vivid",
    slug: "samsung-65-crystal-4k-vivid",
    name: "Samsung 65\" Crystal 4K Vivid Pro Smart TV (UA65DUE77AKLXL / 4K Upscaling)",
    brand: "Samsung",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "samsung", "crystal-4k", "65-inch", "big-screen", "hdr10-plus"],
    status: "In Stock",
    score: 93,
    launchedOn: "12 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 99900,
    specs: {
      display: "65\" 4K Ultra HD (3840x2160) PurColor Display | HDR10+ | Mega Contrast | Contrast Enhancer",
      processor: "Crystal Processor 4K with Motion Xcelerator",
      sound: "20W 2 Channel | Q-Symphony | OTS Lite | Adaptive Sound",
      operatingSystem: "Tizen OS with Knox Security & Samsung TV Plus Free Channels",
      connectivity: "3x HDMI (eARC, ALLM) | 1x USB | Wi-Fi 5 | Bluetooth 5.2"
    },
    pros: ["Gigantic 65-inch cinema canvas under ₹65,000", "PurColor technology renders balanced realistic skin tones", "Samsung Knox Security protects smart home connected devices"],
    cons: ["Only 1 USB port on the back", "Peak HDR brightness is moderate"],
    expertVerdict: "A high-impact 65-inch living room television from a tier-1 brand offering massive screen estate without breaking the bank.",
    stores: [
      { store: "Amazon", price: 62990, offer: "₹4,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+65+Crystal+4K+Vivid&tag=teachunder-21" },
      { store: "Flipkart", price: 63990, offer: "₹3,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+65+Crystal+4K+Vivid" },
      { store: "Croma", price: 65990, offer: "Free Installation & 1-Year Extended Warranty", inStock: true, url: "https://www.croma.com/searchB?q=Samsung%2065%20Crystal%204K" },
      { store: "JioMart", price: 66990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Samsung%2065%20Crystal" }
    ]
  },
  {
    id: "tcl-43-4k-uhd-google-tv",
    slug: "tcl-43-4k-uhd-google-tv",
    name: "TCL 43\" 4K Metallic Bezel-Less Google TV (43V6B / HDR10 / 24W Dolby Audio)",
    brand: "TCL",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "tcl", "43-inch", "budget-4k", "google-tv", "bezel-less"],
    status: "In Stock",
    score: 88,
    launchedOn: "10 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 45990,
    specs: {
      display: "43\" 4K Ultra HD (3840x2160) | HDR10 | Micro Dimming | Dynamic Color Enhancement",
      processor: "64-bit Quad Core Processor with AiPQ Engine",
      sound: "24W Stereo Speakers with Dolby Audio",
      operatingSystem: "Google TV with Google Assistant & Chromecast Built-in",
      connectivity: "3x HDMI 2.1 (eARC) | 1x USB 2.0 | Dual Band Wi-Fi | Bluetooth 5.0"
    },
    pros: ["Extremely affordable 4K resolution under ₹22,000", "Ultra-thin metallic bezel-less aesthetic", "Fast and responsive Google TV interface"],
    cons: ["Viewing angles fade at sharp 45-degree angles", "Basic 60Hz panel"],
    expertVerdict: "The best starting budget 43-inch 4K Google TV for bedrooms and compact living rooms.",
    stores: [
      { store: "Amazon", price: 21990, offer: "₹1,500 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=TCL+43+4K+Google+TV+V6B&tag=teachunder-21" },
      { store: "Flipkart", price: 22490, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=TCL+43+4K+Google+TV+V6B" },
      { store: "Croma", price: 23990, offer: "Free Wall Mount Bracket", inStock: true, url: "https://www.croma.com/searchB?q=TCL%2043%204K%20Google%20TV" },
      { store: "JioMart", price: 24490, offer: "₹800 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/TCL%2043%204K" }
    ]
  },
  {
    id: "xiaomi-32-a-series-hd",
    slug: "xiaomi-32-a-series-hd",
    name: "Xiaomi 32\" A Series HD Ready Smart Google TV (L32M8-5AIN / 20W Dolby Audio)",
    brand: "Xiaomi",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "xiaomi", "32-inch", "budget-tv", "google-tv", "bedroom"],
    status: "In Stock",
    score: 87,
    launchedOn: "12 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 24999,
    specs: {
      display: "32\" HD Ready (1366x768) | Vivid Picture Engine | 178° Wide Viewing Angle",
      processor: "Quad Core A35 Processor with Mali G31 MP2 GPU",
      sound: "20W Stereo Speakers with Dolby Audio and DTS Virtual:X",
      operatingSystem: "Google TV with PatchWall+ & Free Live TV",
      connectivity: "2x HDMI (1 with eARC) | 2x USB | Ethernet | Bluetooth 5.0"
    },
    pros: ["Unbeatable price point around ₹12,000 from a reputable brand", "Clean bezel-less metallic frame design", "20W punchy audio with Dolby Audio support"],
    cons: ["HD Ready (768p) rather than 1080p Full HD", "1GB RAM means light app multitasking only"],
    expertVerdict: "The default budget choice for bedroom walls, kitchens, and rental rooms needing reliable Google TV streaming.",
    stores: [
      { store: "Amazon", price: 11999, offer: "₹1,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Xiaomi+32+A+Series+Google+TV&tag=teachunder-21" },
      { store: "Flipkart", price: 12499, offer: "₹750 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Xiaomi+32+A+Series+Google+TV" },
      { store: "Croma", price: 13490, offer: "Free Standard Wall Mount", inStock: true, url: "https://www.croma.com/searchB?q=Xiaomi%2032%20A%20Series" },
      { store: "JioMart", price: 13990, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Xiaomi%2032%20A%20Series" }
    ]
  },
  {
    id: "oneplus-32-y-series-hd",
    slug: "oneplus-32-y-series-hd",
    name: "OnePlus 32\" Y Series HD Ready Smart Android TV (32Y1 / Gamma Engine / 20W Audio)",
    brand: "OnePlus",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "oneplus", "32-inch", "android-tv", "budget-tv", "gamma-engine"],
    status: "In Stock",
    score: 86,
    launchedOn: "02 Jul 2020",
    updatedAt: new Date().toISOString(),
    mrp: 19999,
    specs: {
      display: "32\" HD Ready (1366x768) | Gamma Engine Color Optimization | 93% DCI-P3",
      processor: "64-bit Powerful Processor with Mali-470 GPU",
      sound: "20W Box Speakers with Dolby Audio",
      operatingSystem: "Android TV 9.0 with OxygenPlay & Google Assistant",
      connectivity: "2x HDMI | 2x USB | Optical Audio Out | Bluetooth 5.0"
    },
    pros: ["Over 90% DCI-P3 color coverage for vibrant pictures", "OnePlus Connect app lets phone act as remote and trackpad", "Bezel-less border design"],
    cons: ["Android TV 9.0 interface is older than Google TV", "1GB RAM requires periodic cache clearing"],
    expertVerdict: "A tried-and-tested budget 32-inch Android TV known for vibrant display tuning and OnePlus smartphone pairing.",
    stores: [
      { store: "Amazon", price: 12499, offer: "₹1,000 instant discount with SBI Cards", inStock: true, url: "https://www.amazon.in/s?k=OnePlus+32+Y+Series+TV&tag=teachunder-21" },
      { store: "Flipkart", price: 12999, offer: "₹750 off on HDFC Bank", inStock: true, url: "https://www.flipkart.com/search?q=OnePlus+32+Y+Series+TV" },
      { store: "Croma", price: 13990, offer: "Free Wall Mount Kit", inStock: true, url: "https://www.croma.com/searchB?q=OnePlus%2032%20Y%20Series" },
      { store: "JioMart", price: 14490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/OnePlus%2032%20Y" }
    ]
  },
  {
    id: "acer-55-halo-qled-4k",
    slug: "acer-55-halo-qled-4k",
    name: "Acer 55\" Halo Series 4K Ultra HD QLED Google TV (AR55QDXGU2841 / 38W Audio)",
    brand: "Acer",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "acer", "qled", "halo", "55-inch", "dolby-vision"],
    status: "In Stock",
    score: 90,
    launchedOn: "15 Jun 2024",
    updatedAt: new Date().toISOString(),
    mrp: 69999,
    specs: {
      display: "55\" 4K Ultra HD QLED | 1.07 Billion Colors | Quantum Dot | Dolby Vision & Atmos",
      processor: "64-bit Quad Core Processor with 2GB RAM & 16GB Storage",
      sound: "38W High Fidelity Speakers with Dolby Atmos & Stadium Mode",
      operatingSystem: "Google TV with Personalized Profiles & Kid's Space",
      connectivity: "3x HDMI 2.1 (eARC) | 2x USB | Dual Band Wi-Fi"
    },
    pros: ["Rich Quantum Dot colors with Dolby Vision at an accessible price", "Booming 38W built-in speaker system", "Generous 16GB internal storage for apps and games"],
    cons: ["60Hz refresh rate", "Glossy screen has light reflections"],
    expertVerdict: "A competitive 55-inch QLED alternative offering powerful 38W speakers, ample storage, and vibrant Quantum Dot visuals.",
    stores: [
      { store: "Amazon", price: 34999, offer: "₹2,500 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Acer+55+Halo+QLED&tag=teachunder-21" },
      { store: "Flipkart", price: 35999, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Acer+55+Halo+QLED" },
      { store: "Croma", price: 37490, offer: "Free Wall Mount Bracket", inStock: true, url: "https://www.croma.com/searchB?q=Acer%2055%20Halo%20QLED" },
      { store: "JioMart", price: 38490, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Acer%2055%20QLED" }
    ]
  },
  {
    id: "kodak-43-capro-4k",
    slug: "kodak-43-capro-4k",
    name: "Kodak 43\" CAPRO Series 4K Ultra HD Google TV (43CAPRO5022 / 40W Dolby Audio)",
    brand: "Kodak",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "kodak", "capro", "43-inch", "4k", "loud-audio"],
    status: "In Stock",
    score: 87,
    launchedOn: "10 Jan 2023",
    updatedAt: new Date().toISOString(),
    mrp: 39999,
    specs: {
      display: "43\" 4K Ultra HD (3840x2160) | 500 nits Brightness | HDR10+ | Bezel-less Design",
      processor: "Amlogic Quad Core 2.0 GHz Processor with Mali G31 GPU",
      sound: "40W Box Speakers with Dolby Digital Plus & DTS TruSurround",
      operatingSystem: "Google TV with Google Assistant Voice Remote",
      connectivity: "3x HDMI (ARC) | 2x USB | Optical Audio | Wi-Fi"
    },
    pros: ["Loud and punchy 40W built-in box speakers", "High 500 nits brightness outclasses most budget 43-inch TVs", "Slim bezel-less aesthetic"],
    cons: ["Viewing angles have slight gamma shift", "Plastic rear build"],
    expertVerdict: "An ultra-bright 43-inch 4K TV armed with thunderous 40W speakers, perfect for noisy household environments.",
    stores: [
      { store: "Amazon", price: 19999, offer: "₹1,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Kodak+43+CAPRO+4K&tag=teachunder-21" },
      { store: "Flipkart", price: 20499, offer: "₹1,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Kodak+43+CAPRO+4K" },
      { store: "Croma", price: 21990, offer: "Free Wall Mount Kit", inStock: true, url: "https://www.croma.com/searchB?q=Kodak%2043%20CAPRO" },
      { store: "JioMart", price: 22490, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Kodak%2043%20CAPRO" }
    ]
  },
  {
    id: "toshiba-55-m550-qled",
    slug: "toshiba-55-m550-qled",
    name: "Toshiba 55\" M550 Series 4K QLED Google TV (55M550LN / Built-in Woofer 49W)",
    brand: "Toshiba",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "toshiba", "m550", "qled", "woofer", "dolby-vision-atmos"],
    status: "In Stock",
    score: 91,
    launchedOn: "14 Jul 2022",
    updatedAt: new Date().toISOString(),
    mrp: 79990,
    specs: {
      display: "55\" 4K QLED Ultra HD | Full Array Local Dimming | Quantum Dot | Dolby Vision & Atmos",
      processor: "REGZA Engine 4K Pro with AI 4K Upscaling & Ultra-essential PQ Technology",
      sound: "49W REGZA Power Audio Pro with 25W Built-in Subwoofer",
      operatingSystem: "Google TV with Hands-free Voice Control",
      connectivity: "3x HDMI (eARC, ALLM, VRR) | 2x USB | Optical Port | Bluetooth 5.0"
    },
    pros: ["Japanese REGZA Engine picture processor delivers pristine clarity", "Integrated 25W subwoofer gives cinema rumble without extra wiring", "Full Array Local Dimming enhances contrast in dark scenes"],
    cons: ["60Hz panel refresh rate", "Heavy metal stand requires wide TV cabinet"],
    expertVerdict: "A refined television powered by Japanese REGZA processing, Full Array Local Dimming, and a thunderous built-in woofer.",
    stores: [
      { store: "Amazon", price: 42990, offer: "₹3,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Toshiba+55+M550+QLED&tag=teachunder-21" },
      { store: "Flipkart", price: 43990, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Toshiba+55+M550+QLED" },
      { store: "Croma", price: 45990, offer: "Free Standard Wall Mount & Installation", inStock: true, url: "https://www.croma.com/searchB?q=Toshiba%2055%20M550" },
      { store: "JioMart", price: 46990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Toshiba%2055%20M550" }
    ]
  },
  {
    id: "motorola-envisionx-55-qled",
    slug: "motorola-envisionx-55-qled",
    name: "Motorola EnvisionX 55\" 4K QLED Google TV (55UHDGQMNTGW / Dolby Vision / 20W)",
    brand: "Motorola",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "motorola", "envisionx", "55-inch", "qled", "dolby-vision"],
    status: "In Stock",
    score: 89,
    launchedOn: "12 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 61990,
    specs: {
      display: "55\" 4K Ultra HD Quantum Dot QLED | 1.07 Billion Colors | Dolby Vision & HDR10",
      processor: "MediaTek Quad Core Processor with 2GB RAM & 16GB Storage",
      sound: "20W Box Speakers with Dolby Audio 3D Sound",
      operatingSystem: "Google TV with Personalized Profiles & Kids Mode",
      connectivity: "3x HDMI (eARC) | 2x USB | Dual Band Wi-Fi | Bluetooth 5.0"
    },
    pros: ["Crisp Quantum Dot colors and Dolby Vision for under ₹33,000", "Generous 2GB RAM keeps Google TV menus snappy", "Minimalist sleek bezel-less styling"],
    cons: ["Audio is standard 20W (soundbar recommended for deep bass)", "60Hz refresh rate"],
    expertVerdict: "A high-value 55-inch 4K QLED that brings Dolby Vision and Quantum Dot color accuracy to a highly attractive price.",
    stores: [
      { store: "Amazon", price: 31999, offer: "₹2,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Motorola+EnvisionX+55+QLED&tag=teachunder-21" },
      { store: "Flipkart", price: 32999, offer: "₹1,500 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Motorola+EnvisionX+55+QLED" },
      { store: "Croma", price: 34990, offer: "Free Wall Mount Bracket", inStock: true, url: "https://www.croma.com/searchB?q=Motorola%20EnvisionX%2055" },
      { store: "JioMart", price: 35990, offer: "₹1,000 cashback with net banking", inStock: true, url: "https://www.jiomart.com/search/Motorola%2055%20QLED" }
    ]
  },
  {
    id: "sansui-55-4k-google-tv",
    slug: "sansui-55-4k-google-tv",
    name: "Sansui 55\" 4K Ultra HD Smart Google TV (JSW55GSUHD / 20W Dolby Audio / Bezel-less)",
    brand: "Sansui",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "sansui", "55-inch", "budget-4k", "google-tv"],
    status: "In Stock",
    score: 86,
    launchedOn: "18 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 52990,
    specs: {
      display: "55\" 4K Ultra HD (3840x2160) | Wide Color Gamut | HDR10 | Micro Dimming",
      processor: "Quad Core Processor with 2GB RAM & 16GB Storage",
      sound: "20W Stereo Speakers with Dolby Audio",
      operatingSystem: "Google TV with Google Assistant & Chromecast",
      connectivity: "3x HDMI | 2x USB | Optical Port | Dual Band Wi-Fi"
    },
    pros: ["Large 55-inch 4K display priced well under ₹30,000", "2GB RAM prevents UI lagging and stutters", "Japanese heritage sound and video tuning"],
    cons: ["Brightness maxes out at around 350 nits", "Remote response can occasionally feel sluggish"],
    expertVerdict: "A pocket-friendly 55-inch 4K solution for buyers seeking maximum screen size per rupee spent.",
    stores: [
      { store: "Amazon", price: 27990, offer: "₹1,500 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Sansui+55+4K+Google+TV&tag=teachunder-21" },
      { store: "Flipkart", price: 28490, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Sansui+55+4K+Google+TV" },
      { store: "Croma", price: 29990, offer: "Free Wall Mount and Installation", inStock: true, url: "https://www.croma.com/searchB?q=Sansui%2055%204K" },
      { store: "JioMart", price: 30490, offer: "₹750 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Sansui%2055%204K" }
    ]
  },
  {
    id: "blaupunkt-55-cyber-sound-4k",
    slug: "blaupunkt-55-cyber-sound-4k",
    name: "Blaupunkt 55\" CyberSound G2 4K Google TV (55CSGT7023 / 60W Built-in Speakers)",
    brand: "Blaupunkt",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "blaupunkt", "cybersound", "60w-audio", "4k", "loud-speakers"],
    status: "In Stock",
    score: 89,
    launchedOn: "10 Jun 2023",
    updatedAt: new Date().toISOString(),
    mrp: 59999,
    specs: {
      display: "55\" 4K Ultra HD (3840x2160) | 550 nits High Brightness | HDR10+ | Bezel-less",
      processor: "Realtek Quad Core Processor with 2GB RAM & 16GB Storage",
      sound: "60W CyberSound Box Speakers with Dolby Atmos & DTS TruSurround",
      operatingSystem: "Google TV with Hands-free Voice Search",
      connectivity: "3x HDMI (eARC) | 2x USB | Optical Port | Bluetooth 5.0"
    },
    pros: ["Massive 60W sound output fills large open living rooms easily", "High 550 nits brightness out-performs standard budget LED TVs", "Solid German audio engineering heritage"],
    cons: ["Bass can distort slightly at maximum 100% volume", "Plastic stand feet feel basic"],
    expertVerdict: "A sonic powerhouse with 60W of built-in audio punch and a remarkably bright 550-nit 4K display.",
    stores: [
      { store: "Amazon", price: 29999, offer: "₹2,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Blaupunkt+55+CyberSound+4K&tag=teachunder-21" },
      { store: "Flipkart", price: 30999, offer: "₹1,500 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Blaupunkt+55+CyberSound+4K" },
      { store: "Croma", price: 32490, offer: "Free Wall Mount Bracket", inStock: true, url: "https://www.croma.com/searchB?q=Blaupunkt%2055%20CyberSound" },
      { store: "JioMart", price: 33490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Blaupunkt%2055" }
    ]
  },
  {
    id: "thomson-50-oath-pro-max-4k",
    slug: "thomson-50-oath-pro-max-4k",
    name: "Thomson 50\" Oath Pro Max 4K Ultra HD Google TV (50OPMAX9055 / 40W Dolby Audio)",
    brand: "Thomson",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "thomson", "50-inch", "4k", "google-tv", "rose-gold"],
    status: "In Stock",
    score: 87,
    launchedOn: "18 Nov 2022",
    updatedAt: new Date().toISOString(),
    mrp: 44999,
    specs: {
      display: "50\" 4K Ultra HD (3840x2160) | 500 nits | HDR10+ | Dolby Vision | Rose Gold Accents",
      processor: "Amlogic Quad Core Processor with 2GB RAM & 16GB Storage",
      sound: "40W Box Speakers with Dolby Atmos & Dolby Digital Plus",
      operatingSystem: "Google TV with Google Assistant Remote",
      connectivity: "3x HDMI (ARC) | 2x USB | Dual Band Wi-Fi"
    },
    pros: ["Elegant Rose Gold bottom alloy trim design", "40W punchy audio system with Dolby Atmos decoding", "Bright 500-nit panel handles well-lit rooms"],
    cons: ["Slightly reflective screen finish", "60Hz standard refresh rate"],
    expertVerdict: "A stylish 50-inch 4K TV with chic rose gold accents, punchy 40W sound, and fluid Google TV navigation.",
    stores: [
      { store: "Amazon", price: 24999, offer: "₹1,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Thomson+50+Oath+Pro+Max&tag=teachunder-21" },
      { store: "Flipkart", price: 25499, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Thomson+50+Oath+Pro+Max" },
      { store: "Croma", price: 26990, offer: "Free Wall Mount and Installation", inStock: true, url: "https://www.croma.com/searchB?q=Thomson%2050%20Oath%20Pro" },
      { store: "JioMart", price: 27490, offer: "₹800 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Thomson%2050" }
    ]
  },
  {
    id: "sony-bravia-43-x74l-4k",
    slug: "sony-bravia-43-x74l-4k",
    name: "Sony Bravia 43\" 4K Ultra HD Smart Google TV (KD-43X74L / X1 Processor / Motionflow)",
    brand: "Sony",
    category: "smart-tv",
    categoryLabel: "Smart TV",
    tags: ["smart-tv", "sony", "bravia", "43-inch", "4k", "reliable"],
    status: "In Stock",
    score: 93,
    launchedOn: "15 Apr 2023",
    updatedAt: new Date().toISOString(),
    mrp: 69900,
    specs: {
      display: "43\" 4K Ultra HD (3840x2160) | Live Color | 4K X-Reality PRO Upscaling",
      processor: "Sony X1 4K Processor with Motionflow XR 100",
      sound: "20W Open Baffle Down Firing Speakers | Dolby Audio",
      operatingSystem: "Google TV with Voice Remote & Apple HomeKit / AirPlay",
      connectivity: "3x HDMI (ALLM, eARC) | 2x USB | Ethernet | Dual Band Wi-Fi"
    },
    pros: ["Top-tier natural color calibration and clean scaling of cable/satellite TV", "X-Protection PRO safeguards against power surges and humidity", "Premium build quality and long operational lifespan"],
    cons: ["Costs more than budget 43-inch models", "No Dolby Vision (uses HDR10/HLG)"],
    expertVerdict: "The undisputed gold standard for a 43-inch bedroom television, offering Sony's legendary reliability, realistic skin tones, and build quality.",
    stores: [
      { store: "Amazon", price: 39990, offer: "₹3,000 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Sony+Bravia+43+X74L&tag=teachunder-21" },
      { store: "Flipkart", price: 41490, offer: "₹2,000 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Sony+Bravia+43+X74L" },
      { store: "Croma", price: 42990, offer: "Free Sony Original Wall Mount & Installation", inStock: true, url: "https://www.croma.com/searchB?q=Sony%20Bravia%2043%20X74L" },
      { store: "JioMart", price: 43990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Sony%2043%20X74L" }
    ]
  }
];

const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const existingSlugs = new Set(catalog.products.map(p => p.slug));

let addedCount = 0;
for (const p of newTVs) {
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
console.log(`Successfully added ${addedCount} smart TVs! Total products: ${catalog.products.length}`);
