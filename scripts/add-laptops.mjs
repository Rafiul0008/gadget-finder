import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');

const newProducts = [
  /* ==========================================================================
   * LAPTOPS (17 new models to reach 30)
   * ======================================================================== */
  {
    id: "apple-macbook-pro-14-m3",
    slug: "apple-macbook-pro-14-m3",
    name: "Apple MacBook Pro 14\" M3 (8GB/512GB SSD / Liquid Retina XDR)",
    brand: "Apple",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "m3", "apple", "macbook-pro", "creators", "xdr"],
    status: "In Stock",
    score: 96,
    launchedOn: "07 Nov 2023",
    updatedAt: new Date().toISOString(),
    mrp: 169900,
    specs: {
      processor: "Apple M3 Chip (8-Core CPU / 10-Core GPU / 16-Core Neural Engine)",
      display: "14.2\" Liquid Retina XDR Display (3024x1964) | 120Hz ProMotion | 1000 nits XDR",
      camera: "1080p FaceTime HD Camera with advanced image signal processor",
      battery: "70Wh Lithium-Polymer | Up to 22 Hours Battery Life | 70W USB-C Power Adapter",
      memory: "8GB Unified Memory | 512GB High-Speed NVMe SSD"
    },
    pros: ["Industry-leading Liquid Retina XDR mini-LED 120Hz display", "Astounding up to 22 hours battery endurance", "MagSafe 3, HDMI 2.1 port, and SDXC card slot built-in"],
    cons: ["Base 8GB RAM is modest for intensive 8K multi-stream editing", "High starting price tag"],
    expertVerdict: "The undisputed champion of portable professional workstations, combining unmatched battery life with a breathtaking mini-LED display.",
    stores: [
      { store: "Amazon", price: 154990, offer: "₹5,000 instant discount with ICICI/HDFC Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+MacBook+Pro+14+M3&tag=teachunder-21" },
      { store: "Flipkart", price: 156990, offer: "₹4,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Apple+MacBook+Pro+14+M3" },
      { store: "Croma", price: 159900, offer: "Free Apple Magic Mouse worth ₹7,500 with store coupon", inStock: true, url: "https://www.croma.com/searchB?q=Apple%20MacBook%20Pro%2014%20M3" },
      { store: "JioMart", price: 161900, offer: "5% cashback on JioPay UPI", inStock: true, url: "https://www.jiomart.com/search/MacBook%20Pro%2014%20M3" }
    ]
  },
  {
    id: "asus-rog-zephyrus-g14",
    slug: "asus-rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14 (AMD Ryzen 9 8945HS / RTX 4060 / 16GB/1TB)",
    brand: "ASUS",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "gaming", "asus", "rog", "zephyrus", "oled"],
    status: "In Stock",
    score: 93,
    launchedOn: "18 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 174990,
    specs: {
      processor: "AMD Ryzen 9 8945HS (8 Cores / 16 Threads / Up to 5.2 GHz with Ryzen AI)",
      display: "14\" 3K (2880x1800) 120Hz ROG Nebula OLED | 0.2ms | 100% DCI-P3 | G-Sync",
      camera: "1080p FHD IR Camera with Windows Hello Support",
      battery: "73Wh 4-cell Li-ion | 100W Type-C Fast Charging",
      memory: "16GB LPDDR5X 6400MHz | 1TB PCIe 4.0 NVMe M.2 SSD"
    },
    pros: ["Gorgeous 3K 120Hz OLED panel with vibrant colors", "Ultra-thin 1.59cm CNC aluminum chassis", "Massive gaming performance in a 1.5kg body"],
    cons: ["Soldered RAM cannot be upgraded", "Surface temperatures warm up under full GPU loads"],
    expertVerdict: "The best 14-inch compact gaming and creator laptop in the world, with peerless OLED visuals and sleek styling.",
    stores: [
      { store: "Amazon", price: 159990, offer: "₹7,500 bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=ASUS+ROG+Zephyrus+G14&tag=teachunder-21" },
      { store: "Flipkart", price: 161990, offer: "₹5,000 off on Axis Bank Cards", inStock: true, url: "https://www.flipkart.com/search?q=ASUS+ROG+Zephyrus+G14" },
      { store: "Croma", price: 163990, offer: "Free ROG gaming headset worth ₹4,999", inStock: true, url: "https://www.croma.com/searchB?q=ASUS%20ROG%20Zephyrus%20G14" },
      { store: "JioMart", price: 165000, offer: "Flat ₹2,500 cashback on debit cards", inStock: true, url: "https://www.jiomart.com/search/ASUS%20ROG%20Zephyrus%20G14" }
    ]
  },
  {
    id: "hp-victus-15-intel-i5",
    slug: "hp-victus-15-intel-i5",
    name: "HP Victus 15 (12th Gen Intel Core i5-12450H / RTX 2050 4GB / 16GB/512GB)",
    brand: "HP",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "gaming", "hp", "victus", "budget-gaming", "i5"],
    status: "In Stock",
    score: 86,
    launchedOn: "12 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 73500,
    specs: {
      processor: "12th Gen Intel Core i5-12450H (8 Cores / 12 Threads / Up to 4.4 GHz)",
      display: "15.6\" FHD (1920x1080) 144Hz | 9ms Response | IPS Anti-glare",
      camera: "HP Wide Vision 720p HD Camera with temporal noise reduction",
      battery: "52.5Wh 3-cell Li-ion polymer | Fast Charge 50% in 30 mins",
      memory: "16GB DDR4 3200MHz RAM | 512GB PCIe Gen4 NVMe M.2 SSD"
    },
    pros: ["Smooth 144Hz high-refresh IPS panel", "Dual-speaker audio tuned by B&O", "Upgradable dual-slot RAM configuration"],
    cons: ["Screen brightness maxes out at 250 nits", "Noticeable fan noise during intense AAA gaming sessions"],
    expertVerdict: "A dependable and affordable entry into PC gaming with reliable thermal management and good keyboard ergonomics.",
    stores: [
      { store: "Amazon", price: 54990, offer: "₹2,000 instant discount with SBI Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=HP+Victus+15+Intel+i5&tag=teachunder-21" },
      { store: "Flipkart", price: 55990, offer: "₹1,500 HDFC Card discount", inStock: true, url: "https://www.flipkart.com/search?q=HP+Victus+15+Intel+i5" },
      { store: "Croma", price: 56990, offer: "Free HP Wireless Mouse worth ₹999", inStock: true, url: "https://www.croma.com/searchB?q=HP%20Victus%2015%20Intel%20i5" },
      { store: "JioMart", price: 57490, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/HP%20Victus%2015" }
    ]
  },
  {
    id: "lenovo-thinkpad-e14-gen-5",
    slug: "lenovo-thinkpad-e14-gen-5",
    name: "Lenovo ThinkPad E14 Gen 5 (13th Gen Intel Core i5-1335U / 16GB/512GB)",
    brand: "Lenovo",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "business", "thinkpad", "lenovo", "durable", "keyboard"],
    status: "In Stock",
    score: 89,
    launchedOn: "20 Sep 2023",
    updatedAt: new Date().toISOString(),
    mrp: 84900,
    specs: {
      processor: "13th Gen Intel Core i5-1335U (10 Cores / 12 Threads / Up to 4.6 GHz)",
      display: "14\" WUXGA (1920x1200) 16:10 IPS | 300 nits | Anti-glare",
      camera: "FHD 1080p with Privacy Shutter",
      battery: "47Wh Li-ion | Rapid Charge 80% in 1 Hour | 65W USB-C Adapter",
      memory: "16GB DDR4 3200MHz RAM | 512GB PCIe 4.0 NVMe SSD"
    },
    pros: ["Legendary spill-resistant ThinkPad keyboard with TrackPoint", "Rugged MIL-STD-810H military durability certification", "Modern 16:10 productivity aspect ratio"],
    cons: ["Basic 60Hz display refresh rate", "Speakers sound average without deep bass"],
    expertVerdict: "The undisputed corporate and developer workhorse. Exceptional keyboard, military ruggedness, and rock-solid Linux compatibility.",
    stores: [
      { store: "Amazon", price: 61990, offer: "₹3,000 off on Corporate & Business Cards", inStock: true, url: "https://www.amazon.in/s?k=Lenovo+ThinkPad+E14+Gen+5&tag=teachunder-21" },
      { store: "Flipkart", price: 63490, offer: "₹2,000 ICICI Bank discount", inStock: true, url: "https://www.flipkart.com/search?q=Lenovo+ThinkPad+E14+Gen+5" },
      { store: "Croma", price: 64990, offer: "Free 1-Year Extended Warranty", inStock: true, url: "https://www.croma.com/searchB?q=Lenovo%20ThinkPad%20E14" },
      { store: "JioMart", price: 65900, offer: "5% cashback with JioPay", inStock: true, url: "https://www.jiomart.com/search/ThinkPad%20E14" }
    ]
  },
  {
    id: "acer-nitro-v-15-rtx-4050",
    slug: "acer-nitro-v-15-rtx-4050",
    name: "Acer Nitro V 15 (13th Gen Intel Core i5-13420H / RTX 4050 6GB / 16GB/512GB)",
    brand: "Acer",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "gaming", "acer", "nitro", "rtx-4050", "high-fps"],
    status: "In Stock",
    score: 91,
    launchedOn: "15 Oct 2023",
    updatedAt: new Date().toISOString(),
    mrp: 89999,
    specs: {
      processor: "13th Gen Intel Core i5-13420H (8 Cores / 12 Threads / Up to 4.6 GHz)",
      display: "15.6\" FHD (1920x1080) 144Hz IPS | 16:9 | ComfyView LED",
      camera: "720p HD Camera with Temporal Noise Reduction",
      battery: "57Wh 4-cell Li-ion | 135W AC Adapter",
      memory: "16GB DDR5 5200MHz RAM | 512GB PCIe Gen4 NVMe SSD"
    },
    pros: ["Full-powered RTX 4050 6GB GPU with DLSS 3 support", "Fast DDR5 RAM with dual M.2 expansion slots", "Dual fan cooling system with quad exhaust ports"],
    cons: ["Chassis made mostly of plastic", "Average battery life under gaming"],
    expertVerdict: "The most affordable gateway to DLSS 3 frame generation and ray tracing in competitive PC gaming.",
    stores: [
      { store: "Amazon", price: 67990, offer: "₹3,500 off on OneCard & Axis Bank", inStock: true, url: "https://www.amazon.in/s?k=Acer+Nitro+V+15+RTX+4050&tag=teachunder-21" },
      { store: "Flipkart", price: 68990, offer: "₹2,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Acer+Nitro+V+15+RTX+4050" },
      { store: "Croma", price: 70990, offer: "Free Nitro Gaming Headset", inStock: true, url: "https://www.croma.com/searchB?q=Acer%20Nitro%20V%2015" },
      { store: "JioMart", price: 71990, offer: "₹1,500 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Acer%20Nitro%20V" }
    ]
  },
  {
    id: "dell-g15-5530-gaming",
    slug: "dell-g15-5530-gaming",
    name: "Dell G15 5530 Gaming (13th Gen Intel Core i5-13450HX / RTX 3050 6GB / 16GB/1TB)",
    brand: "Dell",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "gaming", "dell", "g15", "hx-series", "thermal"],
    status: "In Stock",
    score: 88,
    launchedOn: "25 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 95400,
    specs: {
      processor: "13th Gen Intel Core i5-13450HX (10 Cores / 16 Threads / Up to 4.6 GHz)",
      display: "15.6\" FHD (1920x1080) 120Hz 250 nits WVA Anti-glare",
      camera: "720p at 30 fps HD RGB camera with digital-array microphones",
      battery: "56Wh 3-cell Li-ion | ExpressCharge 240W Adapter",
      memory: "16GB DDR5 4800MHz RAM | 1TB M.2 PCIe NVMe SSD"
    },
    pros: ["Alienware-inspired thermal cooling architecture", "High-performance HX series desktop-class silicon", "Generous 1TB high-speed NVMe storage out of the box"],
    cons: ["Heavyweight 2.81kg laptop body and bulky power brick", "Screen color gamut is limited to 45% NTSC"],
    expertVerdict: "A tank-like gaming laptop boasting alienware-inspired thermals and powerful multi-core processing.",
    stores: [
      { store: "Amazon", price: 71990, offer: "₹4,000 instant discount with ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Dell+G15+5530+Gaming&tag=teachunder-21" },
      { store: "Flipkart", price: 73490, offer: "₹3,000 HDFC Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Dell+G15+5530+Gaming" },
      { store: "Croma", price: 74990, offer: "Free Dell Gaming Mouse worth ₹1,499", inStock: true, url: "https://www.croma.com/searchB?q=Dell%20G15%205530" },
      { store: "JioMart", price: 76000, offer: "5% cashback on UPI", inStock: true, url: "https://www.jiomart.com/search/Dell%20G15" }
    ]
  },
  {
    id: "asus-zenbook-14-oled",
    slug: "asus-zenbook-14-oled",
    name: "ASUS Zenbook 14 OLED (Intel Core Ultra 5 125H / 16GB/1TB / 3K 120Hz)",
    brand: "ASUS",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "ultrabook", "asus", "zenbook", "oled", "intel-core-ultra"],
    status: "In Stock",
    score: 92,
    launchedOn: "15 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 114990,
    specs: {
      processor: "Intel Core Ultra 5 125H (14 Cores / 18 Threads / Up to 4.5 GHz with Intel AI Boost NPU)",
      display: "14\" 3K (2880x1800) 120Hz Lumina OLED | 0.2ms | 500 nits HDR | 100% DCI-P3",
      camera: "FHD Camera with IR function for Windows Hello and physical shutter",
      battery: "75Wh 4-cell Li-ion | Up to 15 Hours Battery | 65W Type-C Easy Charge",
      memory: "16GB LPDDR5X 7467MHz RAM | 1TB PCIe 4.0 NVMe M.2 SSD"
    },
    pros: ["Peerless 3K 120Hz Lumina OLED panel with deep blacks", "Integrated Intel AI NPU for on-device copilot workflows", "Impressive 75Wh battery in a slim 1.2kg body"],
    cons: ["Glossy screen prone to reflections outdoors", "RAM is non-upgradable"],
    expertVerdict: "One of the finest Windows ultraportables on the market, combining extraordinary OLED visuals with new AI efficiency.",
    stores: [
      { store: "Amazon", price: 96990, offer: "₹4,500 bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=ASUS+Zenbook+14+OLED&tag=teachunder-21" },
      { store: "Flipkart", price: 98990, offer: "₹3,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=ASUS+Zenbook+14+OLED" },
      { store: "Croma", price: 99990, offer: "Free ASUS Sleeve & Wireless Mouse", inStock: true, url: "https://www.croma.com/searchB?q=ASUS%20Zenbook%2014%20OLED" },
      { store: "JioMart", price: 101490, offer: "₹2,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Zenbook%2014%20OLED" }
    ]
  },
  {
    id: "hp-envy-x360-2-in-1",
    slug: "hp-envy-x360-2-in-1",
    name: "HP Envy x360 2-in-1 (AMD Ryzen 5 7530U / 16GB/512GB / Touch OLED)",
    brand: "HP",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "2-in-1", "hp", "envy", "touch", "stylus"],
    status: "In Stock",
    score: 90,
    launchedOn: "10 Jun 2023",
    updatedAt: new Date().toISOString(),
    mrp: 91400,
    specs: {
      processor: "AMD Ryzen 5 7530U (6 Cores / 12 Threads / Up to 4.5 GHz)",
      display: "15.6\" FHD (1920x1080) OLED Touchscreen | 400 nits | 100% DCI-P3 | Stylus Support",
      camera: "HP Wide Vision 5MP IR camera with camera shutter and temporal noise reduction",
      battery: "51Wh 4-cell Li-ion polymer | Fast Charge 50% in 30 mins",
      memory: "16GB DDR4 3200MHz RAM | 512GB PCIe NVMe M.2 SSD"
    },
    pros: ["Flexible 360-degree convertible hinge for tent/tablet modes", "Vibrant OLED touch panel with pen input", "5MP IR webcam with sharp auto-framing"],
    cons: ["Slightly heavier in tablet mode at 1.82kg", "DDR4 RAM rather than DDR5"],
    expertVerdict: "A versatile creator 2-in-1 laptop that transforms into a drawing canvas with vibrant OLED color reproduction.",
    stores: [
      { store: "Amazon", price: 74990, offer: "₹3,000 instant discount with HDFC/ICICI", inStock: true, url: "https://www.amazon.in/s?k=HP+Envy+x360+2-in-1&tag=teachunder-21" },
      { store: "Flipkart", price: 76490, offer: "₹2,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=HP+Envy+x360+2-in-1" },
      { store: "Croma", price: 77990, offer: "Free HP Rechargeable Tilt Pen", inStock: true, url: "https://www.croma.com/searchB?q=HP%20Envy%20x360" },
      { store: "JioMart", price: 78900, offer: "5% cashback with JioPay", inStock: true, url: "https://www.jiomart.com/search/HP%20Envy%20x360" }
    ]
  },
  {
    id: "lenovo-ideapad-gaming-3-ryzen-5",
    slug: "lenovo-ideapad-gaming-3-ryzen-5",
    name: "Lenovo IdeaPad Gaming 3 (AMD Ryzen 5 5500H / RTX 2050 / 8GB/512GB)",
    brand: "Lenovo",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "gaming", "lenovo", "ideapad", "budget-pc"],
    status: "In Stock",
    score: 85,
    launchedOn: "14 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 68900,
    specs: {
      processor: "AMD Ryzen 5 5500H (4 Cores / 8 Threads / Up to 4.2 GHz)",
      display: "15.6\" FHD (1920x1080) 144Hz IPS | 250 nits | 45% NTSC",
      camera: "HD 720p with Privacy Shutter",
      battery: "45Wh Li-ion | Rapid Charge Pro 50% in 30 mins",
      memory: "8GB DDR4 3200MHz (Expandable to 16GB) | 512GB SSD M.2 PCIe"
    },
    pros: ["Incredible budget entry price under ₹48,000", "Smooth 144Hz display for esports gaming", "Comfortable Lenovo signature curved keycaps"],
    cons: ["Only 8GB base RAM (upgrade recommended)", "45Wh battery requires charger for gaming"],
    expertVerdict: "The best starting gaming notebook for college students on a strict budget who want to play GTA V and Valorant smoothly.",
    stores: [
      { store: "Amazon", price: 46990, offer: "₹2,000 off on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Lenovo+IdeaPad+Gaming+3+Ryzen+5&tag=teachunder-21" },
      { store: "Flipkart", price: 47990, offer: "₹1,500 off on Axis Bank Cards", inStock: true, url: "https://www.flipkart.com/search?q=Lenovo+IdeaPad+Gaming+3+Ryzen+5" },
      { store: "Croma", price: 49490, offer: "Free Lenovo Backpack", inStock: true, url: "https://www.croma.com/searchB?q=Lenovo%20IdeaPad%20Gaming%203" },
      { store: "JioMart", price: 50490, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/IdeaPad%20Gaming%203" }
    ]
  },
  {
    id: "xiaomi-notebook-pro-120g",
    slug: "xiaomi-notebook-pro-120g",
    name: "Xiaomi Notebook Pro 120G (Intel Core i5-12450H / GeForce MX550 / 16GB/512GB)",
    brand: "Xiaomi",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "xiaomi", "ultrabook", "120hz", "thin-light"],
    status: "In Stock",
    score: 88,
    launchedOn: "20 Sep 2022",
    updatedAt: new Date().toISOString(),
    mrp: 78999,
    specs: {
      processor: "12th Gen Intel Core i5-12450H (8 Cores / 12 Threads / Up to 4.4 GHz)",
      display: "14\" 2.5K (2560x1600) 120Hz Mi-TrueLife Display | 16:10 | 100% sRGB",
      camera: "720p HD Camera with Dual Microphones",
      battery: "56Wh battery | 100W Type-C Fast Charger (50% in 35 mins)",
      memory: "16GB LPDDR5 5200MHz RAM | 512GB PCIe Gen4 SSD"
    },
    pros: ["Superb 2.5K 120Hz display with 16:10 aspect ratio", "Aerospace-grade Series 6 aluminum body", "100W fast Type-C charging in box"],
    cons: ["NVIDIA MX550 GPU is suited for light editing rather than heavy AAA games", "Webcam is only 720p"],
    expertVerdict: "A MacBook-like metal unibody ultrabook running Windows with a razor-sharp 2.5K 120Hz screen.",
    stores: [
      { store: "Amazon", price: 58990, offer: "₹2,500 off on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Xiaomi+Notebook+Pro+120G&tag=teachunder-21" },
      { store: "Flipkart", price: 59990, offer: "₹1,500 ICICI discount", inStock: true, url: "https://www.flipkart.com/search?q=Xiaomi+Notebook+Pro+120G" },
      { store: "Croma", price: 61990, offer: "Free Laptop bag worth ₹1,299", inStock: true, url: "https://www.croma.com/searchB?q=Xiaomi%20Notebook%20Pro" },
      { store: "JioMart", price: 62900, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Xiaomi%20Notebook%20Pro" }
    ]
  },
  {
    id: "realme-book-slim-intel-i5",
    slug: "realme-book-slim-intel-i5",
    name: "Realme Book Slim (11th Gen Intel Core i5-1135G7 / 8GB/512GB / 2K Display)",
    brand: "Realme",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "realme", "slim", "2k", "student"],
    status: "In Stock",
    score: 86,
    launchedOn: "30 Aug 2021",
    updatedAt: new Date().toISOString(),
    mrp: 59999,
    specs: {
      processor: "11th Gen Intel Core i5-1135G7 (4 Cores / 8 Threads / Up to 4.2 GHz with Iris Xe)",
      display: "14\" 2K (2160x1440) IPS Full Vision | 3:2 Aspect Ratio | 400 nits | 100% sRGB",
      camera: "720p HD Camera with Dual Mic Vocplus AI Noise Cancellation",
      battery: "54Wh Battery | 65W PD Super-Fast Charge (50% in 30 mins)",
      memory: "8GB LPDDR4x 4266MHz RAM | 512GB PCIe SSD"
    },
    pros: ["Class-leading 2K 3:2 aspect ratio screen for productivity", "Lightweight 1.38kg all-metal CNC body", "65W USB-PD super-fast charging"],
    cons: ["Older 11th Gen processor", "No RAM expansion slot"],
    expertVerdict: "A crowd favorite for students and writers who want a premium 2K screen at an affordable price.",
    stores: [
      { store: "Amazon", price: 41990, offer: "₹2,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Realme+Book+Slim+Intel+i5&tag=teachunder-21" },
      { store: "Flipkart", price: 42990, offer: "₹1,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Realme+Book+Slim+Intel+i5" },
      { store: "Croma", price: 44990, offer: "Free wireless mouse", inStock: true, url: "https://www.croma.com/searchB?q=Realme%20Book%20Slim" },
      { store: "JioMart", price: 45900, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Realme%20Book%20Slim" }
    ]
  },
  {
    id: "acer-swift-go-14-oled",
    slug: "acer-swift-go-14-oled",
    name: "Acer Swift Go 14 OLED (Intel Core Ultra 7 155H / 16GB/1TB / 2.8K 90Hz)",
    brand: "Acer",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "ultrabook", "acer", "swift", "oled", "intel-evo"],
    status: "In Stock",
    score: 93,
    launchedOn: "10 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 104999,
    specs: {
      processor: "Intel Core Ultra 7 155H (16 Cores / 22 Threads / Up to 4.8 GHz with Intel AI Boost)",
      display: "14\" 2.8K (2880x1800) 90Hz CineCrystal OLED | 400 nits | 100% DCI-P3 | DisplayHDR 500",
      camera: "1440p QHD Camera with Acer PurifiedView AI Background Blur",
      battery: "65Wh 3-cell Li-ion | 100W USB Type-C Charging",
      memory: "16GB LPDDR5X 6400MHz RAM | 1TB PCIe Gen4 SSD"
    },
    pros: ["Stunning 2.8K OLED with true deep blacks and 90Hz fluidity", "Ultra-crisp 1440p QHD webcam with AI framing", "Powerful 16-core Intel Core Ultra 7 processor"],
    cons: ["Battery life drops under continuous high brightness", "Cooling fans spin aggressively under peak loads"],
    expertVerdict: "An absolute powerhouse for mobile video editing and programming with a breathtaking 2.8K OLED screen.",
    stores: [
      { store: "Amazon", price: 84990, offer: "₹5,000 instant bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=Acer+Swift+Go+14+OLED&tag=teachunder-21" },
      { store: "Flipkart", price: 86490, offer: "₹3,500 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Acer+Swift+Go+14+OLED" },
      { store: "Croma", price: 88990, offer: "Free 1-Year Norton Security", inStock: true, url: "https://www.croma.com/searchB?q=Acer%20Swift%20Go%2014" },
      { store: "JioMart", price: 89900, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Acer%20Swift%20Go" }
    ]
  },
  {
    id: "infinix-zerobook-13th-gen-i9",
    slug: "infinix-zerobook-13th-gen-i9",
    name: "Infinix ZEROBOOK (13th Gen Intel Core i9-13900H / 32GB/1TB / 15.6\" FHD)",
    brand: "Infinix",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "i9", "infinix", "zerobook", "32gb-ram", "budget-flagship"],
    status: "In Stock",
    score: 87,
    launchedOn: "15 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 99990,
    specs: {
      processor: "13th Gen Intel Core i9-13900H (14 Cores / 20 Threads / Up to 5.4 GHz)",
      display: "15.6\" FHD (1920x1080) IPS | 400 nits | 100% sRGB Color Gamut",
      camera: "FHD AI Webcam with dual array microphones",
      battery: "70Wh Battery | 100W Hyper Charge Adapter",
      memory: "32GB LPDDR5X 6400MHz RAM | 1TB PCIe Gen4 NVMe SSD"
    },
    pros: ["Unbeatable raw Core i9 + 32GB RAM specs under ₹65,000", "Physical Overboost switch for instant maximum performance", "Large 70Wh battery with 100W USB-C brick"],
    cons: ["Only 60Hz display refresh rate", "Trackpad feel is average"],
    expertVerdict: "Remarkable compute value for data analysts, software developers, and virtual machine users needing 32GB RAM without paying enterprise prices.",
    stores: [
      { store: "Amazon", price: 62990, offer: "₹2,500 off on Credit Card EMI", inStock: true, url: "https://www.amazon.in/s?k=Infinix+ZEROBOOK+i9&tag=teachunder-21" },
      { store: "Flipkart", price: 63990, offer: "₹2,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Infinix+ZEROBOOK+i9" },
      { store: "Croma", price: 65990, offer: "Free Laptop backpack", inStock: true, url: "https://www.croma.com/searchB?q=Infinix%20ZEROBOOK" },
      { store: "JioMart", price: 66900, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Infinix%20ZEROBOOK" }
    ]
  },
  {
    id: "asus-tuf-gaming-a15-ryzen-7",
    slug: "asus-tuf-gaming-a15-ryzen-7",
    name: "ASUS TUF Gaming A15 (AMD Ryzen 7 7735HS / RTX 4060 8GB / 16GB/512GB / 144Hz)",
    brand: "ASUS",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "gaming", "asus", "tuf", "rtx-4060", "ryzen-7"],
    status: "In Stock",
    score: 93,
    launchedOn: "12 Apr 2023",
    updatedAt: new Date().toISOString(),
    mrp: 115990,
    specs: {
      processor: "AMD Ryzen 7 7735HS (8 Cores / 16 Threads / Up to 4.75 GHz)",
      display: "15.6\" FHD (1920x1080) 144Hz IPS | 100% sRGB | G-Sync | MUX Switch + NVIDIA Advanced Optimus",
      camera: "720p HD Camera with built-in array microphone",
      battery: "90Wh 4-cell Li-ion | Fast Charge 50% in 30 mins | 240W AC Adapter",
      memory: "16GB DDR5 4800MHz RAM | 512GB PCIe 4.0 NVMe SSD"
    },
    pros: ["Full 140W TGP NVIDIA RTX 4060 8GB GPU", "Gigantic 90Wh battery offering 8+ hours non-gaming endurance", "Dedicated MUX Switch with Advanced Optimus for maximum gaming FPS"],
    cons: ["Bulky 2.2kg gaming weight", "512GB SSD fills up fast with modern game sizes"],
    expertVerdict: "A mid-range gaming powerhouse with high-TGP graphics, exceptional battery life for a gaming rig, and rock-solid military reliability.",
    stores: [
      { store: "Amazon", price: 89990, offer: "₹4,000 instant discount with HDFC/ICICI", inStock: true, url: "https://www.amazon.in/s?k=ASUS+TUF+Gaming+A15+RTX+4060&tag=teachunder-21" },
      { store: "Flipkart", price: 91490, offer: "₹3,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=ASUS+TUF+Gaming+A15+RTX+4060" },
      { store: "Croma", price: 93990, offer: "Free TUF Gaming Mouse and Pad", inStock: true, url: "https://www.croma.com/searchB?q=ASUS%20TUF%20Gaming%20A15" },
      { store: "JioMart", price: 94900, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/ASUS%20TUF%20A15" }
    ]
  },
  {
    id: "hp-14s-ryzen-5",
    slug: "hp-14s-ryzen-5",
    name: "HP 14s (AMD Ryzen 5 5500U / 16GB/512GB SSD / FHD 14\")",
    brand: "HP",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "hp", "student", "thin-light", "work-from-home"],
    status: "In Stock",
    score: 87,
    launchedOn: "15 Jan 2023",
    updatedAt: new Date().toISOString(),
    mrp: 59100,
    specs: {
      processor: "AMD Ryzen 5 5500U (6 Cores / 12 Threads / Up to 4.0 GHz with Radeon Graphics)",
      display: "14\" FHD (1920x1080) Micro-edge Anti-glare | 250 nits",
      camera: "HP True Vision 720p HD Camera with integrated dual array digital microphones",
      battery: "41Wh 3-cell Li-ion | Fast Charge 50% in 45 mins",
      memory: "16GB DDR4 3200MHz RAM | 512GB PCIe NVMe M.2 SSD"
    },
    pros: ["Smooth 6-core 12-thread multitasking with 16GB RAM", "Lightweight 1.46kg portable form factor", "Built-in Alexa support and backlit keyboard"],
    cons: ["Display color accuracy is basic 45% NTSC", "Plastic palm-rest build"],
    expertVerdict: "One of India's best-selling budget office and study laptops, offering 16GB RAM and reliable Ryzen performance.",
    stores: [
      { store: "Amazon", price: 42990, offer: "₹2,000 instant discount with SBI Card", inStock: true, url: "https://www.amazon.in/s?k=HP+14s+Ryzen+5&tag=teachunder-21" },
      { store: "Flipkart", price: 43990, offer: "₹1,500 off on HDFC Bank", inStock: true, url: "https://www.flipkart.com/search?q=HP+14s+Ryzen+5" },
      { store: "Croma", price: 45490, offer: "Free HP Basic Wireless Mouse", inStock: true, url: "https://www.croma.com/searchB?q=HP%2014s%20Ryzen%205" },
      { store: "JioMart", price: 46200, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/HP%2014s" }
    ]
  },
  {
    id: "lenovo-yoga-slim-7x",
    slug: "lenovo-yoga-slim-7x",
    name: "Lenovo Yoga Slim 7x (Snapdragon X Elite / 16GB/1TB / 3K 90Hz OLED Copilot+)",
    brand: "Lenovo",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "snapdragon-x-elite", "copilot-plus", "oled", "ai-pc", "battery-beast"],
    status: "In Stock",
    score: 95,
    launchedOn: "18 Jun 2024",
    updatedAt: new Date().toISOString(),
    mrp: 172900,
    specs: {
      processor: "Snapdragon X Elite X1E-78-100 (12 Cores / Up to 3.4 GHz with 45 TOPS Qualcomm Hexagon NPU)",
      display: "14.5\" 3K (2944x1840) 90Hz PureSight OLED Touch | 1000 nits Peak | 100% DCI-P3",
      camera: "FHD 1080p + IR Camera with E-shutter and Windows Hello",
      battery: "70Wh Battery | Up to 20 Hours Web Browsing | 65W USB-C Slim GaN Adapter",
      memory: "16GB LPDDR5X 8448MHz RAM | 1TB PCIe 4.0 NVMe SSD"
    },
    pros: ["Incredible up to 20 hours battery life rivaling Apple silicon", "Gorgeous 3K 90Hz 1000-nit OLED touchscreen", "Whisper quiet operation and 45 TOPS on-device Copilot+ AI"],
    cons: ["Windows on ARM compatibility check needed for legacy anti-cheat games", "Soldered RAM"],
    expertVerdict: "A historic breakthrough for Windows laptops: multi-day battery life, zero fan noise in normal use, and an elite 3K OLED screen.",
    stores: [
      { store: "Amazon", price: 139990, offer: "₹7,000 bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=Lenovo+Yoga+Slim+7x&tag=teachunder-21" },
      { store: "Flipkart", price: 141990, offer: "₹5,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Lenovo+Yoga+Slim+7x" },
      { store: "Croma", price: 144990, offer: "Free Lenovo Yoga Mouse & 1-Year Warranty", inStock: true, url: "https://www.croma.com/searchB?q=Lenovo%20Yoga%20Slim%207x" },
      { store: "JioMart", price: 146000, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Yoga%20Slim%207x" }
    ]
  },
  {
    id: "dell-inspiron-14-intel-i5",
    slug: "dell-inspiron-14-intel-i5",
    name: "Dell Inspiron 14 5430 (13th Gen Intel Core i5-1335U / 16GB/512GB SSD / 16:10 FHD+)",
    brand: "Dell",
    category: "laptops",
    categoryLabel: "Laptops",
    tags: ["laptop", "dell", "inspiron", "business", "student", "metal"],
    status: "In Stock",
    score: 88,
    launchedOn: "18 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 78900,
    specs: {
      processor: "13th Gen Intel Core i5-1335U (10 Cores / 12 Threads / Up to 4.6 GHz)",
      display: "14\" FHD+ (1920x1200) 16:10 WVA Anti-glare | 250 nits | ComfortView",
      camera: "FHD 1080p Camera with dual-array microphones and physical privacy shutter",
      battery: "54Wh 4-cell Li-ion | ExpressCharge 65W Type-C Adapter",
      memory: "16GB LPDDR5 4800MHz RAM | 512GB M.2 PCIe NVMe SSD"
    },
    pros: ["Premium aluminum exterior with lift hinge design", "Dolby Atmos spatial audio with up-firing speakers", "Crisp 1080p FHD camera with privacy shutter"],
    cons: ["Display brightness could be higher for direct sunlight", "No dedicated GPU for heavy gaming"],
    expertVerdict: "A refined, premium everyday work laptop built with high-quality aluminum and great acoustics.",
    stores: [
      { store: "Amazon", price: 58990, offer: "₹2,500 instant discount with ICICI/HDFC Cards", inStock: true, url: "https://www.amazon.in/s?k=Dell+Inspiron+14+5430&tag=teachunder-21" },
      { store: "Flipkart", price: 60490, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Dell+Inspiron+14+5430" },
      { store: "Croma", price: 61990, offer: "Free Dell Laptop Carry Case", inStock: true, url: "https://www.croma.com/searchB?q=Dell%20Inspiron%2014" },
      { store: "JioMart", price: 62900, offer: "₹1,200 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Dell%20Inspiron%2014" }
    ]
  }
];

const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const existingSlugs = new Set(catalog.products.map(p => p.slug));

let addedCount = 0;
for (const p of newProducts) {
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
console.log(`Successfully added ${addedCount} laptops! Total products: ${catalog.products.length}`);
