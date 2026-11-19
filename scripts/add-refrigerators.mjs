import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');

const newFridges = [
  {
    id: "lg-322l-3-star-double-door",
    slug: "lg-322l-3-star-double-door",
    name: "LG 322L 3-Star Smart Inverter Frost-Free Double Door Refrigerator (GL-S342SPZY / Door Cooling+)",
    brand: "LG",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "lg", "double-door", "frost-free", "door-cooling", "family"],
    status: "In Stock",
    score: 93,
    launchedOn: "15 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 47999,
    specs: {
      capacity: "322 Litres (Suitable for families with 3 to 5 members)",
      energyRating: "3 Star Energy Efficiency Rating (212 kWh/year)",
      coolingType: "Door Cooling+ & Multi Air Flow for uniform 360° temperature",
      compressor: "Smart Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Express Freeze | Auto Smart Connect | Toughened Glass Shelves (175kg test)"
    },
    pros: ["Door Cooling+ vents keep milk and bottles in door baskets extra cold", "Smart Inverter compressor operates quietly under 36 dB", "Spacious 322L capacity easily accommodates weekly family groceries"],
    cons: ["Slightly wider dimensions require ample kitchen clearance", "No external temperature display panel"],
    expertVerdict: "A dependable, well-proportioned 322L double-door refrigerator offering uniform Door Cooling+ airflow and whisper-quiet operation.",
    stores: [
      { store: "Amazon", price: 35990, offer: "₹2,500 instant discount with ICICI/HDFC Cards", inStock: true, url: "https://www.amazon.in/s?k=LG+322L+Double+Door+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 36990, offer: "₹2,000 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=LG+322L+Double+Door+Refrigerator" },
      { store: "Croma", price: 38490, offer: "Free Home Delivery and Unboxing Inspection", inStock: true, url: "https://www.croma.com/searchB?q=LG%20322L%20Refrigerator" },
      { store: "JioMart", price: 39490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/LG%20322L%20Refrigerator" }
    ]
  },
  {
    id: "samsung-253l-3-star-double-door",
    slug: "samsung-253l-3-star-double-door",
    name: "Samsung 253L 3-Star Digital Inverter Frost-Free Double Door Refrigerator (RT28C3733S8)",
    brand: "Samsung",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "samsung", "double-door", "frost-free", "digital-inverter", "compact"],
    status: "In Stock",
    score: 92,
    launchedOn: "12 Feb 2023",
    updatedAt: new Date().toISOString(),
    mrp: 37990,
    specs: {
      capacity: "253 Litres (Ideal for families with 2 to 3 members)",
      energyRating: "3 Star Rating (193 kWh/year annual power consumption)",
      coolingType: "All-Round Cooling with strategically placed vents",
      compressor: "Digital Inverter Compressor with 20-Year Warranty",
      specialFeatures: "MoistFresh Zone | Easy Slide Shelf | Deodorizing Filter"
    },
    pros: ["Industry-leading 20-year warranty on Digital Inverter compressor", "Built-in deodorizing filter prevents mixed food smells", "Stabilizer-free operation protects from voltage fluctuations between 100V and 300V"],
    cons: ["Freezer capacity (69L) is on the smaller side for frozen bulk storage", "Freezer light is absent"],
    expertVerdict: "One of India's most popular 253L double-door refrigerators, offering unmatched 20-year compressor peace of mind.",
    stores: [
      { store: "Amazon", price: 25990, offer: "₹2,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+253L+Double+Door+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 26490, offer: "₹1,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+253L+Double+Door+Refrigerator" },
      { store: "Croma", price: 27990, offer: "Free Installation & Free Stand", inStock: true, url: "https://www.croma.com/searchB?q=Samsung%20253L%20Refrigerator" },
      { store: "JioMart", price: 28490, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Samsung%20253L%20Refrigerator" }
    ]
  },
  {
    id: "whirlpool-265l-3-star-intellifresh",
    slug: "whirlpool-265l-3-star-intellifresh",
    name: "Whirlpool 265L 3-Star IntelliFresh Inverter Frost-Free Double Door Refrigerator (IF CNV 278)",
    brand: "Whirlpool",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "whirlpool", "intellifresh", "convertible", "zeolite"],
    status: "In Stock",
    score: 90,
    launchedOn: "18 Mar 2023",
    updatedAt: new Date().toISOString(),
    mrp: 39950,
    specs: {
      capacity: "265 Litres (Suitable for 3 to 4 family members)",
      energyRating: "3 Star Inverter Rating",
      coolingType: "Microblock Technology with Zeolite Technology | Freshflow Air Tower",
      compressor: "IntelliSense Inverter Technology with 10-Year Warranty",
      specialFeatures: "5-in-1 Convertible Modes | Up to 15 Days Garden Freshness"
    },
    pros: ["5-in-1 convertible modes (All Season, Chef, Dessert, Party, Deep Freeze)", "Zeolite technology prevents excessive fruit and vegetable ripening", "Honeycomb moisture lock crisper cover keeps greens crisp"],
    cons: ["Slightly louder compressor start cycle compared to LG", "Stainless steel surface shows fingerprint smudges"],
    expertVerdict: "A feature-packed convertible double-door refrigerator designed specifically to extend the shelf life of fresh Indian produce.",
    stores: [
      { store: "Amazon", price: 26990, offer: "₹2,000 off on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Whirlpool+265L+IntelliFresh&tag=teachunder-21" },
      { store: "Flipkart", price: 27490, offer: "₹1,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Whirlpool+265L+IntelliFresh" },
      { store: "Croma", price: 28990, offer: "Free Home Delivery & Standard Setup", inStock: true, url: "https://www.croma.com/searchB?q=Whirlpool%20265L%20Refrigerator" },
      { store: "JioMart", price: 29490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Whirlpool%20265L" }
    ]
  },
  {
    id: "haier-190l-5-star-direct-cool",
    slug: "haier-190l-5-star-direct-cool",
    name: "Haier 190L 5-Star Direct-Cool Single Door Refrigerator (HED-205DS-P / 1 Hour Icing)",
    brand: "Haier",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "haier", "single-door", "5-star", "energy-saver", "1-hour-icing"],
    status: "In Stock",
    score: 91,
    launchedOn: "10 Apr 2023",
    updatedAt: new Date().toISOString(),
    mrp: 20990,
    specs: {
      capacity: "190 Litres (Ideal for singles, bachelors, and couples)",
      energyRating: "5 Star Maximum Energy Efficiency (Consumes only 131 kWh/year)",
      coolingType: "Direct-Cool with 1 Hour Icing Technology (1HIT)",
      compressor: "Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Heavy Duty Toughened Glass Shelves | Anti-Bacterial Gasket | Base Stand Drawer"
    },
    pros: ["Maximum 5-star energy rating saves massive electricity on monthly bills", "1 Hour Icing Technology drops freezer temperature rapidly to -5°C", "Base stand drawer provides extra non-refrigerated dry storage for onions and potatoes"],
    cons: ["Direct-cool technology requires manual defrosting every couple of weeks", "190L capacity is compact for larger families"],
    expertVerdict: "The ultimate electricity-saving direct-cool refrigerator for bachelors, couples, and rental homes.",
    stores: [
      { store: "Amazon", price: 15490, offer: "₹1,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Haier+190L+5+Star+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 15990, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Haier+190L+5+Star+Refrigerator" },
      { store: "Croma", price: 16990, offer: "Free Home Delivery", inStock: true, url: "https://www.croma.com/searchB?q=Haier%20190L%205%20Star" },
      { store: "JioMart", price: 17490, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Haier%20190L" }
    ]
  },
  {
    id: "godrej-244l-3-star-inverter-frost-free",
    slug: "godrej-244l-3-star-inverter-frost-free",
    name: "Godrej 244L 3-Star 6-in-1 Convertible Inverter Frost-Free Double Door (RT EONVALOR 260C)",
    brand: "Godrej",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "godrej", "double-door", "convertible", "cool-shower"],
    status: "In Stock",
    score: 89,
    launchedOn: "14 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 35990,
    specs: {
      capacity: "244 Litres (Suitable for 2 to 3 members)",
      energyRating: "3 Star Inverter Rating",
      coolingType: "Cool Shower Technology with 360 Degree Airflow",
      compressor: "Advanced Inverter Compressor with 10-Year Warranty",
      specialFeatures: "6-in-1 Convertible Modes | Farm Fresh Crisper | Aroma Lock"
    },
    pros: ["Cool Shower Technology circulates cold air evenly from top ceiling vents", "6 flexible conversion modes adapt to parties and vacations", "100% CFC, HCFC, and HFC free environmentally friendly refrigerant"],
    cons: ["Crisper drawer handle requires gentle handling", "Slightly taller body profile"],
    expertVerdict: "An eco-friendly, made-in-India double door refrigerator with unique ceiling-shower cooling and 6 versatile convertible modes.",
    stores: [
      { store: "Amazon", price: 23990, offer: "₹2,000 instant discount with Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Godrej+244L+Double+Door+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 24490, offer: "₹1,500 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Godrej+244L+Double+Door+Refrigerator" },
      { store: "Croma", price: 25990, offer: "Free Installation & Extended Warranty offer", inStock: true, url: "https://www.croma.com/searchB?q=Godrej%20244L%20Refrigerator" },
      { store: "JioMart", price: 26490, offer: "₹800 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Godrej%20244L" }
    ]
  },
  {
    id: "lg-655l-side-by-side-inverter",
    slug: "lg-655l-side-by-side-inverter",
    name: "LG 655L Frost-Free Inverter Side-by-Side Refrigerator (GL-B257HDSY / Multi Air Flow)",
    brand: "LG",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "lg", "side-by-side", "large-capacity", "luxury", "smart-inverter"],
    status: "In Stock",
    score: 95,
    launchedOn: "20 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 104999,
    specs: {
      capacity: "655 Litres (Massive capacity for families with 5 or more members)",
      energyRating: "Inverter Energy Efficient Rating",
      coolingType: "Multi Air Flow with Express Freeze & Door Cooling",
      compressor: "Smart Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Smart Diagnosis | Toughened Glass Shelves | Deodorizer | Child Lock"
    },
    pros: ["Gigantic 655L interior with side-by-side wide shelves", "Express Freeze freezes desserts and meats rapidly", "Premium Dazzle Steel finish elevates luxury kitchen decor"],
    cons: ["Requires a dedicated 913mm wide kitchen space", "High initial investment"],
    expertVerdict: "A premium luxury side-by-side refrigerator that accommodates weeks of groceries and frozen foods with ease.",
    stores: [
      { store: "Amazon", price: 74990, offer: "₹5,000 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=LG+655L+Side+by+Side+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 76490, offer: "₹4,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=LG+655L+Side+by+Side+Refrigerator" },
      { store: "Croma", price: 78990, offer: "Free Premium Delivery, Unboxing and Leveling", inStock: true, url: "https://www.croma.com/searchB?q=LG%20655L%20Side%20by%20Side" },
      { store: "JioMart", price: 79990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/LG%20655L" }
    ]
  },
  {
    id: "haier-628l-triple-door-side-by-side",
    slug: "haier-628l-triple-door-side-by-side",
    name: "Haier 628L Triple Door Convertible Side-by-Side Refrigerator (HRT-683KG / 83% Fridge)",
    brand: "Haier",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "haier", "triple-door", "side-by-side", "convertible", "black-glass"],
    status: "In Stock",
    score: 94,
    launchedOn: "15 Oct 2023",
    updatedAt: new Date().toISOString(),
    mrp: 124990,
    specs: {
      capacity: "628 Litres (Expert Inverter / 83% Fridge Space Convertible)",
      energyRating: "Energy Efficient Triple Inverter System",
      coolingType: "Twin Inverter & 360° Multi Air Flow with Deo Fresh",
      compressor: "Dual Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Black Mirror Glass Finish | Digital Touch Display on Door | 3 Separate Temperature Zones"
    },
    pros: ["Stunning Black Mirror Glass exterior transforms kitchen ambience", "Convertible bottom zone expands standard fridge space up to 83%", "Triple independent cooling loops eliminate cross-odor contamination"],
    cons: ["Glass finish requires routine microfiber wiping to remove finger marks", "Requires two people for safe positioning and transport"],
    expertVerdict: "A head-turning Black Glass masterpiece offering 3 independent cooling zones and customizable convertible storage.",
    stores: [
      { store: "Amazon", price: 84990, offer: "₹6,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Haier+628L+Side+by+Side+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 86990, offer: "₹4,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Haier+628L+Side+by+Side+Refrigerator" },
      { store: "Croma", price: 89990, offer: "Free Glass Care Kit & Professional Setup", inStock: true, url: "https://www.croma.com/searchB?q=Haier%20628L" },
      { store: "JioMart", price: 91490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Haier%20628L" }
    ]
  },
  {
    id: "samsung-322l-3-star-convertible-5in1",
    slug: "samsung-322l-3-star-convertible-5in1",
    name: "Samsung 322L 3-Star 5-in-1 Convertible Inverter Double Door Refrigerator (RT34C4513S8)",
    brand: "Samsung",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "samsung", "322l", "convertible-5in1", "curd-maestro", "family"],
    status: "In Stock",
    score: 93,
    launchedOn: "18 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 46990,
    specs: {
      capacity: "322 Litres (Suitable for families with 3 to 5 members)",
      energyRating: "3 Star Energy Rating (206 kWh/year)",
      coolingType: "Twin Cooling Plus with separate airflow for fridge and freezer",
      compressor: "Digital Inverter Compressor with 20-Year Warranty",
      specialFeatures: "5-in-1 Conversion Modes | Power Freeze & Power Cool | Toughened Glass"
    },
    pros: ["Twin Cooling Plus preserves up to 70% humidity compared to standard 30%", "Digital Inverter backed by a massive 20-year warranty", "Convertible freezer turns into extra fridge storage at the touch of a button"],
    cons: ["Premium price over standard non-convertible double door models", "Door shelves are fixed and not height-adjustable"],
    expertVerdict: "The best-in-class family refrigerator for keeping produce fresh longer thanks to Twin Cooling Plus separate evaporators.",
    stores: [
      { store: "Amazon", price: 34990, offer: "₹2,500 instant discount with ICICI/HDFC Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+322L+Convertible+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 35990, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+322L+Convertible+Refrigerator" },
      { store: "Croma", price: 37490, offer: "Free Home Delivery and Installation", inStock: true, url: "https://www.croma.com/searchB?q=Samsung%20322L%20Refrigerator" },
      { store: "JioMart", price: 38490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Samsung%20322L" }
    ]
  },
  {
    id: "whirlpool-192l-4-star-single-door",
    slug: "whirlpool-192l-4-star-single-door",
    name: "Whirlpool 192L 4-Star Inverter Direct-Cool Single Door Refrigerator (205 WDE CLS 4S)",
    brand: "Whirlpool",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "whirlpool", "single-door", "4-star", "quick-chill"],
    status: "In Stock",
    score: 89,
    launchedOn: "12 Mar 2023",
    updatedAt: new Date().toISOString(),
    mrp: 19450,
    specs: {
      capacity: "192 Litres (Suitable for small families or bachelors)",
      energyRating: "4 Star High Efficiency Rating",
      coolingType: "Direct-Cool with Insulated Capillary Technology",
      compressor: "IntelliSense Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Up to 9 Hours Cooling Retention during power cuts | Large Vegetable Crisper"
    },
    pros: ["Insulated Capillary Technology preserves cooling for 9 hours during load-shedding", "Sturdy pocket handle and sleek modern floral or solid finish", "Stabilizer-free operation handles voltage dips between 130V and 300V"],
    cons: ["Manual defrost push button required", "Compact internal freezer box"],
    expertVerdict: "A high-efficiency 4-star single-door refrigerator offering reliable 9-hour cold retention during prolonged power outages.",
    stores: [
      { store: "Amazon", price: 14490, offer: "₹1,250 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Whirlpool+192L+Single+Door+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 14990, offer: "₹1,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Whirlpool+192L+Single+Door+Refrigerator" },
      { store: "Croma", price: 15990, offer: "Free Home Delivery", inStock: true, url: "https://www.croma.com/searchB?q=Whirlpool%20192L%20Refrigerator" },
      { store: "JioMart", price: 16490, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Whirlpool%20192L" }
    ]
  },
  {
    id: "panasonic-338l-3-star-double-door",
    slug: "panasonic-338l-3-star-double-door",
    name: "Panasonic 338L 3-Star Prime Convertible Inverter Double Door Refrigerator (NR-TG351CUSN)",
    brand: "Panasonic",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "panasonic", "prime-convertible", "ai-econavi", "double-door"],
    status: "In Stock",
    score: 93,
    launchedOn: "10 Jun 2023",
    updatedAt: new Date().toISOString(),
    mrp: 47990,
    specs: {
      capacity: "338 Litres (Suitable for families with 3 to 5 members)",
      energyRating: "3 Star Inverter Rating (212 kWh/year)",
      coolingType: "Surround Airflow with AG Clean Silver Ion Protection",
      compressor: "6-Stage Intelligent Inverter with Econavi AI Sensors",
      specialFeatures: "Prime Convertible with Pro Delicacy Mode | AG Clean (99.9% Bacteria Deactivation)"
    },
    pros: ["AI Econavi intelligent sensors monitor room temp and door usage to cut electricity", "AG Clean silver ion filter eliminates 99.9% of bacteria and foul odors", "Jumbo vegetable box accommodates bulky cabbages and melons easily"],
    cons: ["Slightly heavier unit weight", "Brand service reach is stronger in urban cities"],
    expertVerdict: "A Japanese-engineered, AI-smart refrigerator featuring antibacterial AG Clean protection and generous fresh food capacity.",
    stores: [
      { store: "Amazon", price: 34990, offer: "₹2,500 instant discount with HDFC/ICICI", inStock: true, url: "https://www.amazon.in/s?k=Panasonic+338L+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 35990, offer: "₹2,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Panasonic+338L+Refrigerator" },
      { store: "Croma", price: 37490, offer: "Free Installation & Extended Warranty coupon", inStock: true, url: "https://www.croma.com/searchB?q=Panasonic%20338L%20Refrigerator" },
      { store: "JioMart", price: 38490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Panasonic%20338L" }
    ]
  },
  {
    id: "bosch-269l-3-star-frost-free",
    slug: "bosch-269l-3-star-frost-free",
    name: "Bosch 269L 3-Star MaxFlex Convertible Inverter Double Door Refrigerator (CTC29S031I)",
    brand: "Bosch",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "bosch", "german-engineering", "maxflex", "convertible"],
    status: "In Stock",
    score: 92,
    launchedOn: "15 Sep 2022",
    updatedAt: new Date().toISOString(),
    mrp: 41990,
    specs: {
      capacity: "269 Litres (Designed for 2 to 4 member households)",
      energyRating: "3 Star Inverter Rating",
      coolingType: "MultiAirFlow Cooling with AirFresh Filter",
      compressor: "VarioInverter Compressor with 10-Year Warranty",
      specialFeatures: "MaxFlex 3rd Flexible Temperature Compartment | EasyAccess Shelves"
    },
    pros: ["Precision German thermal engineering keeps interior temperatures rock-solid", "Exclusive MaxFlex convertible zone adjusts between fridge, freezer, and chill", "EasyAccess pull-out glass shelves for effortless back-shelf item retrieval"],
    cons: ["Higher replacement parts cost", "Firm door seal requires a firm pull to open"],
    expertVerdict: "Exceptional build quality with thick insulated walls, German VarioInverter efficiency, and flexible multi-zone temperature control.",
    stores: [
      { store: "Amazon", price: 29990, offer: "₹2,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Bosch+269L+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 30990, offer: "₹1,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Bosch+269L+Refrigerator" },
      { store: "Croma", price: 32490, offer: "Free Home Delivery and Setup", inStock: true, url: "https://www.croma.com/searchB?q=Bosch%20269L%20Refrigerator" },
      { store: "JioMart", price: 33490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Bosch%20269L" }
    ]
  },
  {
    id: "voltas-beko-250l-3-star-double-door",
    slug: "voltas-beko-250l-3-star-double-door",
    name: "Voltas Beko 250L 3-Star Inverter Frost-Free Double Door Refrigerator (RFF273IF / NeoFrost)",
    brand: "Voltas Beko",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "voltas-beko", "tata-product", "neofrost", "inverter"],
    status: "In Stock",
    score: 88,
    launchedOn: "12 Jan 2023",
    updatedAt: new Date().toISOString(),
    mrp: 34990,
    specs: {
      capacity: "250 Litres (Ideal for small and medium families)",
      energyRating: "3 Star Inverter Rating",
      coolingType: "NeoFrost Dual Cooling with separate cooling circuits",
      compressor: "ProSmart Inverter Compressor with 12-Year Warranty",
      specialFeatures: "Active Fresh Blue Light keeps vitamin C in produce | StoreFresh+ crisper"
    },
    pros: ["Backed by Tata & European appliance giant Beko partnership", "Active Fresh Blue Light technology simulates natural photosynthesis", "12-Year ProSmart inverter compressor warranty"],
    cons: ["Limited brand service centers in remote tier-3 towns", "Interior LED light could be slightly brighter"],
    expertVerdict: "A high-value Tata-backed refrigerator offering dual-circuit NeoFrost cooling and produce-freshening Blue Light technology.",
    stores: [
      { store: "Amazon", price: 22990, offer: "₹1,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Voltas+Beko+250L+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 23490, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Voltas+Beko+250L+Refrigerator" },
      { store: "Croma", price: 24990, offer: "Tata Neu Special Cashback & Free Setup", inStock: true, url: "https://www.croma.com/searchB?q=Voltas%20Beko%20250L" },
      { store: "JioMart", price: 25490, offer: "₹800 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Voltas%20Beko%20250L" }
    ]
  },
  {
    id: "godrej-180l-4-star-turbo-cooling",
    slug: "godrej-180l-4-star-turbo-cooling",
    name: "Godrej 180L 4-Star Turbo Cooling Direct Cool Single Door (RD EDGE 205D / Made in India)",
    brand: "Godrej",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "godrej", "single-door", "turbo-cooling", "made-in-india"],
    status: "In Stock",
    score: 87,
    launchedOn: "10 Feb 2023",
    updatedAt: new Date().toISOString(),
    mrp: 18500,
    specs: {
      capacity: "180 Litres (Ideal for singles, bachelors, or small bedrooms)",
      energyRating: "4 Star Energy Saving Rating (149 kWh/year)",
      coolingType: "Turbo Cooling Technology with 20% Faster Ice Making",
      compressor: "Advanced Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Thickest PUF insulation (54mm) | Toughened Glass (150kg) | Large 2.25L Bottle Shelf"
    },
    pros: ["Thick 54mm PUF insulation locks in coolness during power outages", "20% faster ice making with Turbo Cooling airflow", "100% environment-safe green refrigerant"],
    cons: ["Manual defrosting required", "Basic egg tray capacity"],
    expertVerdict: "A proud Made-in-India budget single door refrigerator engineered with thick insulation to combat heavy summer heat.",
    stores: [
      { store: "Amazon", price: 13990, offer: "₹1,000 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Godrej+180L+Single+Door+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 14490, offer: "₹750 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Godrej+180L+Single+Door+Refrigerator" },
      { store: "Croma", price: 15290, offer: "Free Home Delivery", inStock: true, url: "https://www.croma.com/searchB?q=Godrej%20180L%20Refrigerator" },
      { store: "JioMart", price: 15790, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Godrej%20180L" }
    ]
  },
  {
    id: "haier-240l-2-star-frost-free",
    slug: "haier-240l-2-star-frost-free",
    name: "Haier 240L 2-Star Frost Free Double Door Twin Inverter Refrigerator (HRF-2902BBS-P)",
    brand: "Haier",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "haier", "double-door", "twin-inverter", "budget-double-door"],
    status: "In Stock",
    score: 86,
    launchedOn: "15 Apr 2023",
    updatedAt: new Date().toISOString(),
    mrp: 31990,
    specs: {
      capacity: "240 Litres (Suitable for 2 to 3 members)",
      energyRating: "2 Star Inverter Rating",
      coolingType: "360 Degree Airflow with Multi Flow Duct",
      compressor: "Twin Inverter Technology with 10-Year Warranty",
      specialFeatures: "Turbo Icing in 49 Minutes | Large Veg Box | Clean Back Design"
    },
    pros: ["Extremely aggressive pricing for a frost-free double door unit", "Twin Inverter technology synchronizes fan and compressor speeds", "Turbo Icing makes ice trays ready in under 50 minutes"],
    cons: ["2-Star energy rating consumes slightly more power per year", "Basic exterior door finish"],
    expertVerdict: "One of the most affordable full-sized double-door refrigerators in India, making frost-free convenience accessible to everyone.",
    stores: [
      { store: "Amazon", price: 20990, offer: "₹1,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Haier+240L+Double+Door+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 21490, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Haier+240L+Double+Door+Refrigerator" },
      { store: "Croma", price: 22990, offer: "Free Installation & Unboxing", inStock: true, url: "https://www.croma.com/searchB?q=Haier%20240L%20Refrigerator" },
      { store: "JioMart", price: 23490, offer: "₹750 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Haier%20240L" }
    ]
  },
  {
    id: "samsung-189l-5-star-digital-inverter",
    slug: "samsung-189l-5-star-digital-inverter",
    name: "Samsung 189L 5-Star Digital Inverter Direct-Cool Single Door (RR21C2H25S8 / 20Y Warranty)",
    brand: "Samsung",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "samsung", "5-star", "single-door", "low-power", "digital-inverter"],
    status: "In Stock",
    score: 93,
    launchedOn: "12 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 23999,
    specs: {
      capacity: "189 Litres (Ideal for bachelors and nuclear families)",
      energyRating: "5 Star Maximum Energy Rating (131 kWh/year)",
      coolingType: "Direct-Cool with All-Round Air Circulation",
      compressor: "Digital Inverter Compressor with 20-Year Warranty",
      specialFeatures: "Grandé Door Design | Base Stand Drawer | Safe Clean Back (Coil Protected)"
    },
    pros: ["Top 5-Star energy efficiency draws minimal electricity", "Industry-best 20-year Digital Inverter compressor warranty", "Included base stand drawer stores dry groceries neatly"],
    cons: ["Requires occasional manual defrosting", "Compact single door layout"],
    expertVerdict: "A premier 5-star single-door refrigerator backed by Samsung's 20-year compressor warranty and exceptionally low electricity bills.",
    stores: [
      { store: "Amazon", price: 16990, offer: "₹1,500 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+189L+5+Star+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 17490, offer: "₹1,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+189L+5+Star+Refrigerator" },
      { store: "Croma", price: 18490, offer: "Free Home Delivery and Setup", inStock: true, url: "https://www.croma.com/searchB?q=Samsung%20189L%205%20Star" },
      { store: "JioMart", price: 18990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Samsung%20189L" }
    ]
  },
  {
    id: "lg-272l-3-star-convertible-frost-free",
    slug: "lg-272l-3-star-convertible-frost-free",
    name: "LG 272L 3-Star Smart Inverter Double Door Refrigerator (GL-S312SPZX / Convertible)",
    brand: "LG",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "lg", "convertible", "door-cooling", "double-door", "frost-free"],
    status: "In Stock",
    score: 92,
    launchedOn: "18 Mar 2024",
    updatedAt: new Date().toISOString(),
    mrp: 41999,
    specs: {
      capacity: "272 Litres (Suitable for 3 to 4 member families)",
      energyRating: "3 Star Inverter Rating (200 kWh/year)",
      coolingType: "Door Cooling+ with Multi Air Flow",
      compressor: "Smart Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Dual Fridge Convertible Mode | Moist 'N' Fresh Crisper | Smart Diagnosis"
    },
    pros: ["Converts the entire freezer to additional fridge space on demand", "Door Cooling+ keeps items in door shelves equally chilled", "Quiet operation and low energy draw"],
    cons: ["Freezer light is not provided", "Ice twister mechanism takes up some top tray space"],
    expertVerdict: "A well-balanced 272L convertible refrigerator offering flexible storage modes, Door Cooling+, and LG's renowned reliability.",
    stores: [
      { store: "Amazon", price: 29990, offer: "₹2,500 instant discount with Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=LG+272L+Convertible+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 30990, offer: "₹1,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=LG+272L+Convertible+Refrigerator" },
      { store: "Croma", price: 32490, offer: "Free Home Delivery and Installation", inStock: true, url: "https://www.croma.com/searchB?q=LG%20272L%20Refrigerator" },
      { store: "JioMart", price: 33490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/LG%20272L" }
    ]
  },
  {
    id: "whirlpool-207l-5-star-single-door",
    slug: "whirlpool-207l-5-star-single-door",
    name: "Whirlpool 207L 5-Star Inverter Direct-Cool Single Door Refrigerator (215 IMPC PRM 5S)",
    brand: "Whirlpool",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "whirlpool", "5-star", "single-door", "energy-saver"],
    status: "In Stock",
    score: 91,
    launchedOn: "10 Jan 2024",
    updatedAt: new Date().toISOString(),
    mrp: 23700,
    specs: {
      capacity: "207 Litres (Generous single door volume for up to 3 members)",
      energyRating: "5 Star Maximum Efficiency Rating (Consumes only 134 kWh/year)",
      coolingType: "Direct-Cool with 6th Sense QuickChill Technology",
      compressor: "IntelliSense Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Laminar Airflow | Crescent Door Design | Base Drawer"
    },
    pros: ["Ultra-efficient 5-star rating consumes less power than a ceiling fan", "Spacious 207L single-door volume accommodates large pots and bowls", "Pedestal base drawer included for room-temperature root vegetables"],
    cons: ["Manual defrost button", "Direct-cool frost buildup over time"],
    expertVerdict: "A high-capacity 207L single door refrigerator featuring 5-star power thriftiness and a convenient built-in vegetable base drawer.",
    stores: [
      { store: "Amazon", price: 17490, offer: "₹1,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Whirlpool+207L+5+Star+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 17990, offer: "₹1,000 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Whirlpool+207L+5+Star+Refrigerator" },
      { store: "Croma", price: 18990, offer: "Free Home Delivery", inStock: true, url: "https://www.croma.com/searchB?q=Whirlpool%20207L%205%20Star" },
      { store: "JioMart", price: 19490, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Whirlpool%20207L" }
    ]
  },
  {
    id: "hisense-507l-french-door-multi-door",
    slug: "hisense-507l-french-door-multi-door",
    name: "Hisense 507L French Door Inverter Multi-Door Refrigerator (RQ507N4SBV / PureFlat)",
    brand: "Hisense",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "hisense", "french-door", "multi-door", "pureflat", "luxury"],
    status: "In Stock",
    score: 93,
    launchedOn: "15 Jun 2023",
    updatedAt: new Date().toISOString(),
    mrp: 89999,
    specs: {
      capacity: "507 Litres (Multi-Door French Door layout for medium and large families)",
      energyRating: "Inverter High Efficiency",
      coolingType: "Triple Zone Independent Cooling with Dual Tech Cooling",
      compressor: "Durable Inverter Compressor with 10-Year Warranty",
      specialFeatures: "PureFlat Minimalist Design | My Fresh Choice Zone (-18°C to +5°C) | Electronic Touch Display"
    },
    pros: ["Luxurious 4-door French door layout at a price lower than typical side-by-side units", "My Fresh Choice zone allows converting bottom-right quadrant between freezer and fridge", "PureFlat sleek brushed steel appearance"],
    cons: ["Requires a minimum 80cm doorway for delivery and positioning", "Weight is 98kg"],
    expertVerdict: "A stunning 4-door French door refrigerator bringing multi-zone luxury and customizable cooling to an accessible price point.",
    stores: [
      { store: "Amazon", price: 58990, offer: "₹4,000 instant discount with Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Hisense+507L+French+Door+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 59990, offer: "₹3,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Hisense+507L+French+Door+Refrigerator" },
      { store: "Croma", price: 62490, offer: "Free Premium Delivery & Setup", inStock: true, url: "https://www.croma.com/searchB?q=Hisense%20507L" },
      { store: "JioMart", price: 63990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Hisense%20507L" }
    ]
  },
  {
    id: "panasonic-280l-3-star-double-door",
    slug: "panasonic-280l-3-star-double-door",
    name: "Panasonic 280L 3-Star 6-Stage Inverter Frost-Free Double Door Refrigerator (NR-TH301CPMN)",
    brand: "Panasonic",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "panasonic", "double-door", "frost-free", "ag-clean"],
    status: "In Stock",
    score: 90,
    launchedOn: "14 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 38990,
    specs: {
      capacity: "280 Litres (Ideal for 3 to 4 member households)",
      energyRating: "3 Star Inverter Rating",
      coolingType: "Surround Airflow with AG Clean Protection",
      compressor: "Intelligent 6-Stage Inverter with 10-Year Warranty",
      specialFeatures: "Double Twist Ice Tray | Big Door Pockets | 35L Jumbo Vegetable Basket"
    },
    pros: ["Huge 35L vegetable crisper holds abundant fresh market greens", "AG Clean filter neutralizes mold and bacteria", "Smooth Japanese engineering with low vibration and noise"],
    cons: ["No external temperature control display", "Standard freezer compartment size"],
    expertVerdict: "A reliable 280L double-door refrigerator offering generous vegetable storage, hygienic AG Clean filtration, and quiet operation.",
    stores: [
      { store: "Amazon", price: 28990, offer: "₹2,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Panasonic+280L+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 29490, offer: "₹1,500 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Panasonic+280L+Refrigerator" },
      { store: "Croma", price: 30990, offer: "Free Home Delivery and Setup", inStock: true, url: "https://www.croma.com/searchB?q=Panasonic%20280L" },
      { store: "JioMart", price: 31490, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Panasonic%20280L" }
    ]
  },
  {
    id: "marq-by-flipkart-200l-direct-cool",
    slug: "marq-by-flipkart-200l-direct-cool",
    name: "MarQ by Flipkart 200L 4-Star Direct Cool Inverter Single Door (200DCL4S / Budget King)",
    brand: "MarQ",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "marq", "single-door", "budget", "4-star"],
    status: "In Stock",
    score: 85,
    launchedOn: "10 Feb 2023",
    updatedAt: new Date().toISOString(),
    mrp: 17999,
    specs: {
      capacity: "200 Litres (Great for students and small apartments)",
      energyRating: "4 Star Energy Saving Rating",
      coolingType: "Direct-Cool with Advanced Insulated Capillary Technology",
      compressor: "Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Toughened Glass Shelves | Anti-Bacterial Door Gasket | Recessed Handle"
    },
    pros: ["Extremely aggressive price under ₹13,000 for a 4-star 200L unit", "Solid 10-year compressor warranty", "Sturdy toughened glass interior shelves"],
    cons: ["Manual defrost button", "Basic plastic door pockets"],
    expertVerdict: "The budget king of single-door refrigerators, delivering 4-star energy savings and 200L storage at an unbeatable price.",
    stores: [
      { store: "Amazon", price: 12990, offer: "₹1,000 discount with Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=MarQ+200L+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 12490, offer: "₹1,250 instant discount on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=MarQ+200L+Refrigerator" },
      { store: "Croma", price: 13990, offer: "Free Delivery to doorstep", inStock: true, url: "https://www.croma.com/searchB?q=MarQ%20Refrigerator" },
      { store: "JioMart", price: 14490, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/200L%20Refrigerator" }
    ]
  },
  {
    id: "croma-190l-3-star-single-door",
    slug: "croma-190l-3-star-single-door",
    name: "Croma 190L 3-Star Direct Cool Single Door Refrigerator (CRLR01901 / Tata Assured)",
    brand: "Croma",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "croma", "single-door", "tata-assured", "compact"],
    status: "In Stock",
    score: 86,
    launchedOn: "15 Apr 2023",
    updatedAt: new Date().toISOString(),
    mrp: 17000,
    specs: {
      capacity: "190 Litres (Ideal for small families, bachelors, or guest rooms)",
      energyRating: "3 Star Rating (168 kWh/year)",
      coolingType: "Direct-Cool with High Efficiency Cooling Coil",
      compressor: "Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Toughened Glass Shelves | Anti-Fungal Gasket | Lock and Key Feature"
    },
    pros: ["Backed by Tata Croma in-house warranty and customer service", "Lock and key prevents curious kids from opening the door", "Toughened glass shelves hold heavy cooking vessels up to 150kg"],
    cons: ["Direct-cool manual defrosting", "Standard 3-star rating"],
    expertVerdict: "A dependable Tata Croma in-house single-door refrigerator offering reliable cooling, child lock, and great post-sales service.",
    stores: [
      { store: "Amazon", price: 12990, offer: "₹1,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Croma+190L+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 13490, offer: "₹750 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Croma+190L+Refrigerator" },
      { store: "Croma", price: 12490, offer: "Tata Neu Special Cashback & Free Setup", inStock: true, url: "https://www.croma.com/searchB?q=Croma%20190L%20Refrigerator" },
      { store: "JioMart", price: 13990, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Croma%20190L" }
    ]
  },
  {
    id: "kelvinator-275l-3-star-double-door",
    slug: "kelvinator-275l-3-star-double-door",
    name: "Kelvinator 275L 3-Star Inverter Frost-Free Double Door Refrigerator (KRD-B290HR)",
    brand: "Kelvinator",
    category: "refrigerators",
    categoryLabel: "Refrigerator",
    tags: ["refrigerator", "kelvinator", "double-door", "heritage", "frost-free"],
    status: "In Stock",
    score: 87,
    launchedOn: "12 Mar 2023",
    updatedAt: new Date().toISOString(),
    mrp: 35990,
    specs: {
      capacity: "275 Litres (Suitable for 3 to 4 family members)",
      energyRating: "3 Star Inverter Rating",
      coolingType: "360 Degree Airflow with Fresh Food Multi-Vent",
      compressor: "Inverter Compressor with 10-Year Warranty",
      specialFeatures: "Tough Glass Shelves | Humidity Controller | Deodorizer System"
    },
    pros: ["Heritage cooling brand known for deep chilling performance", "Spacious 275L double door volume under ₹25,000", "Humidity controller keeps fresh cilantro and spinach crisp"],
    cons: ["Exterior styling is traditional", "Service network in smaller towns is developing"],
    expertVerdict: "A classic, durable double-door refrigerator from legendary cooling brand Kelvinator, providing reliable frost-free chilling.",
    stores: [
      { store: "Amazon", price: 24490, offer: "₹1,500 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Kelvinator+275L+Refrigerator&tag=teachunder-21" },
      { store: "Flipkart", price: 24990, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Kelvinator+275L+Refrigerator" },
      { store: "Croma", price: 26490, offer: "Free Home Delivery and Setup", inStock: true, url: "https://www.croma.com/searchB?q=Kelvinator%20275L" },
      { store: "JioMart", price: 26990, offer: "₹800 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Kelvinator%20275L" }
    ]
  }
];

const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const existingSlugs = new Set(catalog.products.map(p => p.slug));

let addedCount = 0;
for (const p of newFridges) {
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
console.log(`Successfully added ${addedCount} refrigerators! Total products: ${catalog.products.length}`);
