import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');

const newWatches = [
  {
    id: "apple-watch-ultra-2",
    slug: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2 (GPS + Cellular 49mm Titanium / S9 SiP / 3000 nits / Oceanic)",
    brand: "Apple",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "apple", "ultra-2", "titanium", "cellular", "rugged", "3000-nits"],
    status: "In Stock",
    score: 98,
    launchedOn: "22 Sep 2023",
    updatedAt: new Date().toISOString(),
    mrp: 89900,
    specs: {
      display: "49mm Always-On Retina Display | 3000 nits Peak Brightness | Sapphire Crystal",
      processor: "Apple S9 SiP with 4-Core Neural Engine & Double Tap Gesture",
      sensors: "Precision Dual-Frequency GPS (L1 & L5) | Depth Gauge with Water Temp | ECG & Blood Oxygen",
      batteryLife: "Up to 36 Hours normal use (72 Hours in Low Power Mode) | Fast Charging",
      waterResistance: "100m Water Resistant | EN13319 Certified Dive Computer up to 40m"
    },
    pros: ["Indestructible aerospace-grade titanium case with raised sapphire crystal edges", "Blinding 3000 nits display readable under intense blazing sunlight", "Precision dual-frequency GPS tracks trails and marathons with zero drift"],
    cons: ["Very large 49mm footprint on slender wrists", "iPhone requirement (no Android compatibility)"],
    expertVerdict: "The undisputed ultimate adventure and endurance smartwatch with 3000-nit visibility, titanium armor, and precision GPS.",
    stores: [
      { store: "Amazon", price: 84900, offer: "₹5,000 instant discount with HDFC/ICICI Cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+Watch+Ultra+2&tag=teachunder-21" },
      { store: "Flipkart", price: 85900, offer: "₹4,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Apple+Watch+Ultra+2" },
      { store: "Croma", price: 87900, offer: "Free Apple Ocean Band or Alpine Loop exchange offer", inStock: true, url: "https://www.croma.com/searchB?q=Apple%20Watch%20Ultra%202" },
      { store: "JioMart", price: 88900, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Apple%20Watch%20Ultra%202" }
    ]
  },
  {
    id: "apple-watch-se-2nd-gen",
    slug: "apple-watch-se-2nd-gen",
    name: "Apple Watch SE 2nd Gen (GPS 44mm / Midnight Aluminum / S8 SiP / Crash Detection)",
    brand: "Apple",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "apple", "watch-se", "budget-apple", "fitness", "retina"],
    status: "In Stock",
    score: 92,
    launchedOn: "16 Sep 2022",
    updatedAt: new Date().toISOString(),
    mrp: 32900,
    specs: {
      display: "44mm Retina LTPO OLED Display | 1000 nits Brightness | Ion-X Front Glass",
      processor: "Apple S8 SiP Dual-Core 64-bit (20% faster than previous generation)",
      sensors: "High & Low Heart Rate Notifications | Fall Detection & Crash Detection | Sleep Stages",
      batteryLife: "Up to 18 Hours All-Day Battery (Low Power Mode up to 36 Hours)",
      waterResistance: "50m Water Resistant (Swimproof)"
    },
    pros: ["Full watchOS ecosystem experience with Apple Pay, fitness rings, and notifications", "Life-saving Car Crash Detection and Emergency SOS", "Super-smooth performance powered by Apple S8 SiP"],
    cons: ["No Always-On Display (requires wrist raise)", "Requires iPhone"],
    expertVerdict: "The best value entry point into the Apple Watch ecosystem, offering all essential fitness and safety tracking at half the flagship price.",
    stores: [
      { store: "Amazon", price: 27900, offer: "₹2,500 instant bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=Apple+Watch+SE+44mm&tag=teachunder-21" },
      { store: "Flipkart", price: 28490, offer: "₹2,000 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Apple+Watch+SE+44mm" },
      { store: "Croma", price: 29900, offer: "Free Apple Watch Screen Guard & Strap", inStock: true, url: "https://www.croma.com/searchB?q=Apple%20Watch%20SE" },
      { store: "JioMart", price: 30490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Apple%20Watch%20SE" }
    ]
  },
  {
    id: "samsung-galaxy-watch-ultra",
    slug: "samsung-galaxy-watch-ultra",
    name: "Samsung Galaxy Watch Ultra (47mm Titanium / LTE / 3nm Processor / Dual GPS / 100H)",
    brand: "Samsung",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "samsung", "watch-ultra", "titanium", "lte", "3nm", "rugged"],
    status: "In Stock",
    score: 97,
    launchedOn: "10 Jul 2024",
    updatedAt: new Date().toISOString(),
    mrp: 69999,
    specs: {
      display: "1.5\" Super AMOLED (480x480) | 3000 nits Peak | Sapphire Crystal | Cushion Design",
      processor: "Exynos W1000 (3nm Pentacore Processor / 3x Faster)",
      sensors: "BioActive Sensor (ECG, Blood Pressure, BIA, Sleep Apnea) | Dual-Frequency L1+L5 GPS",
      batteryLife: "Up to 100 Hours in Power Saving Mode (48 Hours Exercise Mode) | 590mAh",
      waterResistance: "10ATM + IP68 Water Resistance | MIL-STD-810H Military Standard"
    },
    pros: ["Flagship 3nm processor delivers instantaneous Wear OS 5 app responsiveness", "Blinding 3000-nit display and ultra-rugged Grade 4 Titanium cushion case", "Comprehensive BioActive sensor tracks body composition, ECG, and blood pressure"],
    cons: ["Distinct cushion-case styling is polarizing", "Blood pressure/ECG features require paired Galaxy phone"],
    expertVerdict: "The ultimate Android smartwatch, combining military Grade 4 titanium durability, a blazing 3nm chip, and 100-hour battery stamina.",
    stores: [
      { store: "Amazon", price: 59999, offer: "₹6,000 instant bank discount on HDFC/ICICI", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Watch+Ultra&tag=teachunder-21" },
      { store: "Flipkart", price: 61999, offer: "₹4,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Watch+Ultra" },
      { store: "Croma", price: 63990, offer: "Free Samsung Trail Band worth ₹5,999", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Watch%20Ultra" },
      { store: "JioMart", price: 65490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Watch%20Ultra" }
    ]
  },
  {
    id: "samsung-galaxy-watch-6-classic",
    slug: "samsung-galaxy-watch-6-classic",
    name: "Samsung Galaxy Watch 6 Classic (47mm Bluetooth / Physical Rotating Bezel / Sapphire)",
    brand: "Samsung",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "samsung", "watch-6-classic", "rotating-bezel", "stainless-steel"],
    status: "In Stock",
    score: 94,
    launchedOn: "11 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 40999,
    specs: {
      display: "1.5\" Super AMOLED (480x480) | 2000 nits | Sapphire Crystal Glass",
      processor: "Exynos W930 Dual-Core 1.4 GHz with 2GB RAM & 16GB Storage",
      sensors: "Samsung BioActive Sensor (Optical Heart Rate + Electrical Heart + Bioelectrical Impedance)",
      batteryLife: "Up to 40 Hours All-Day Battery (30 Hours with AOD on) | WPC Wireless Fast Charging",
      waterResistance: "5ATM + IP68 Water and Dust Resistance | MIL-STD-810H"
    },
    pros: ["Physical rotating bezel offers the most satisfying, precise tactile navigation in smartwatches", "Premium stainless steel luxury chronometer aesthetic", "Detailed sleep coaching and body composition metrics"],
    cons: ["Battery requires daily or every-other-day charging", "Slightly heavier on the wrist at 59g"],
    expertVerdict: "A modern classic featuring the beloved tactile rotating bezel, luxurious stainless steel craftsmanship, and comprehensive health monitoring.",
    stores: [
      { store: "Amazon", price: 28999, offer: "₹3,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Watch+6+Classic&tag=teachunder-21" },
      { store: "Flipkart", price: 29999, offer: "₹2,000 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Watch+6+Classic" },
      { store: "Croma", price: 31490, offer: "Free Leather Hybrid D-Buckle Band", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Watch%206%20Classic" },
      { store: "JioMart", price: 32490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Watch%206" }
    ]
  },
  {
    id: "samsung-galaxy-watch-fe",
    slug: "samsung-galaxy-watch-fe",
    name: "Samsung Galaxy Watch FE (40mm Bluetooth / Sapphire Crystal / Body Composition / Wear OS)",
    brand: "Samsung",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "samsung", "watch-fe", "budget-wear-os", "sapphire-crystal"],
    status: "In Stock",
    score: 90,
    launchedOn: "24 Jun 2024",
    updatedAt: new Date().toISOString(),
    mrp: 19999,
    specs: {
      display: "1.2\" Super AMOLED (396x396) | Sapphire Crystal Glass | Always-On Display",
      processor: "Exynos W920 Dual Core 1.18 GHz with 1.5GB RAM & 16GB Storage",
      sensors: "BioActive Sensor (HRM, ECG, BIA Body Composition) | 100+ Workout Modes",
      batteryLife: "Up to 40 Hours Battery | Magnetic Fast Wireless Charging",
      waterResistance: "5ATM + IP68 Water Resistance | MIL-STD-810H"
    },
    pros: ["Premium scratch-resistant Sapphire Crystal glass at an entry price point", "Full Google Wear OS ecosystem with Google Maps, Play Store, and WhatsApp", "Advanced body composition analysis (BMI, skeletal muscle, body fat percentage)"],
    cons: ["Thicker black bezels around the 1.2-inch screen", "Smaller 247mAh battery requires daily top-up"],
    expertVerdict: "The most affordable gateway into Samsung's Wear OS smartwatch world, fortified with scratch-resistant Sapphire Crystal.",
    stores: [
      { store: "Amazon", price: 14999, offer: "₹2,000 instant discount with Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Watch+FE&tag=teachunder-21" },
      { store: "Flipkart", price: 15499, offer: "₹1,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Watch+FE" },
      { store: "Croma", price: 16490, offer: "Free Silicone Band with stitch design", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Watch%20FE" },
      { store: "JioMart", price: 16990, offer: "₹1,000 cashback on net banking", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Watch%20FE" }
    ]
  },
  {
    id: "oneplus-watch-2r",
    slug: "oneplus-watch-2r",
    name: "OnePlus Watch 2R (Dual-Engine Architecture / 100H Battery / Wear OS by Google / 500 nits)",
    brand: "OnePlus",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "oneplus", "watch-2r", "100h-battery", "dual-chip", "wear-os"],
    status: "In Stock",
    score: 95,
    launchedOn: "16 Jul 2024",
    updatedAt: new Date().toISOString(),
    mrp: 22999,
    specs: {
      display: "1.43\" AMOLED Display (466x466) | 1000 nits High Brightness Mode | 2.5D Glass",
      processor: "Dual-Engine: Snapdragon W5 Gen 1 (Wear OS 4) + BES2700 (RTOS Background Processor)",
      sensors: "Dual-Frequency L1+L5 GPS | Optical Heart Rate & SpO2 | VO2 Max & Running Metrics",
      batteryLife: "Incredible 100 Hours in Smart Mode (Up to 12 Days in Power Saver Mode) | 500mAh",
      waterResistance: "5ATM + IP68 Water and Dust Resistance"
    },
    pros: ["Mind-blowing 100-hour battery life runs full Google Wear OS for 4 days straight", "Lightweight aluminum alloy case is 25% lighter than stainless steel Watch 2", "Dual-frequency GPS accurately maps runs through dense high-rise corridors"],
    cons: ["Does not support iOS (Android only)", "No rotating crown scrolling (crown is a push button)"],
    expertVerdict: "A battery miracle for Wear OS users, lasting 4 full days with Google Maps, Play Store, and notifications running continuously.",
    stores: [
      { store: "Amazon", price: 17999, offer: "₹2,000 instant discount with ICICI/OneCard", inStock: true, url: "https://www.amazon.in/s?k=OnePlus+Watch+2R&tag=teachunder-21" },
      { store: "Flipkart", price: 18499, offer: "₹1,500 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=OnePlus+Watch+2R" },
      { store: "Croma", price: 19490, offer: "Free OnePlus Watch Strap", inStock: true, url: "https://www.croma.com/searchB?q=OnePlus%20Watch%202R" },
      { store: "JioMart", price: 19990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/OnePlus%20Watch%202R" }
    ]
  },
  {
    id: "amazfit-balance",
    slug: "amazfit-balance",
    name: "Amazfit Balance (1.5\" AMOLED / AI Body Composition / Readiness Score / 14-Day Battery)",
    brand: "Amazfit",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "amazfit", "balance", "body-composition", "ai-coach", "14-day-battery"],
    status: "In Stock",
    score: 93,
    launchedOn: "01 Sep 2023",
    updatedAt: new Date().toISOString(),
    mrp: 27999,
    specs: {
      display: "1.5\" HD AMOLED Display (480x480) | 1500 nits Peak | Anti-glare Glass Bezel",
      processor: "Zepp OS 3.5 with Zepp Flow AI Natural Language Assistant",
      sensors: "BioTracker 5.0 Dual-LED Sensor | BIA Body Composition | Dual-Band Circularly-Polarized GPS",
      batteryLife: "Up to 14 Days Typical Usage (Up to 25 Days in Battery Saver Mode) | 475mAh",
      waterResistance: "5ATM Water Resistance (up to 50 meters)"
    },
    pros: ["Daily Morning Readiness score balances sleep quality with physical recovery", "Full BIA body composition analysis measuring fat, muscle, and hydration levels", "14-day battery life with dual-band circular GPS tracking"],
    cons: ["Cannot reply to third-party messages with custom voice on iOS", "App ecosystem is smaller than Wear OS"],
    expertVerdict: "A holistic health and wellness smartwatch offering professional body composition analysis and 14-day battery freedom.",
    stores: [
      { store: "Amazon", price: 21999, offer: "₹2,000 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Amazfit+Balance&tag=teachunder-21" },
      { store: "Flipkart", price: 22999, offer: "₹1,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Amazfit+Balance" },
      { store: "Croma", price: 23990, offer: "Free Amazfit Sports Strap", inStock: true, url: "https://www.croma.com/searchB?q=Amazfit%20Balance" },
      { store: "JioMart", price: 24490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Amazfit%20Balance" }
    ]
  },
  {
    id: "amazfit-gtr-4",
    slug: "amazfit-gtr-4",
    name: "Amazfit GTR 4 (1.43\" AMOLED / Dual-Band GPS / Bluetooth Calling / 14-Day Battery)",
    brand: "Amazfit",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "amazfit", "gtr-4", "dual-band-gps", "bluetooth-calling", "long-battery"],
    status: "In Stock",
    score: 92,
    launchedOn: "15 Sep 2022",
    updatedAt: new Date().toISOString(),
    mrp: 23999,
    specs: {
      display: "1.43\" HD AMOLED Display (466x466) | Anti-fingerprint Coating & AG Glass Bezel",
      processor: "Zepp OS 2.0 with Mini Apps Ecosystem & Alexa Built-in",
      sensors: "Industry-First Dual-Band Circularly Polarized GPS Antenna | BioTracker 4.0 PPG Sensor",
      batteryLife: "Up to 14 Days Typical Usage (Up to 24 Days in Battery Saver Mode) | 475mAh",
      waterResistance: "5ATM Water Resistance (Swimproof)"
    },
    pros: ["Aircraft-inspired dual-band GPS antenna provides pinpoint outdoor tracking", "Built-in microphone and speaker for crisp Bluetooth calls and onboard music storage", "Classy metallic classic chronometer styling with rotatable crown"],
    cons: ["Voice assistant Alexa requires internet connection via phone", "Cannot reply with full keyboard on iOS"],
    expertVerdict: "A classic round smartwatch pairing sports car design with elite dual-band GPS accuracy and 2-week battery endurance.",
    stores: [
      { store: "Amazon", price: 16999, offer: "₹1,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Amazfit+GTR+4&tag=teachunder-21" },
      { store: "Flipkart", price: 17499, offer: "₹1,000 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Amazfit+GTR+4" },
      { store: "Croma", price: 18490, offer: "Free Charging Dock", inStock: true, url: "https://www.croma.com/searchB?q=Amazfit%20GTR%204" },
      { store: "JioMart", price: 18990, offer: "₹800 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Amazfit%20GTR%204" }
    ]
  },
  {
    id: "amazfit-bip-5-unity",
    slug: "amazfit-bip-5-unity",
    name: "Amazfit Bip 5 Unity (1.91\" High-Res Display / Stainless Steel Frame / 11-Day Battery)",
    brand: "Amazfit",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "amazfit", "bip-5-unity", "large-display", "budget-fitness", "bluetooth-calling"],
    status: "In Stock",
    score: 88,
    launchedOn: "25 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 8999,
    specs: {
      display: "1.91\" Large Color Touchscreen (320x380) | 2.5D Tempered Glass | Stainless Steel Frame",
      processor: "Zepp OS 3.0 with 70+ Downloadable Mini Apps & Games",
      sensors: "BioTracker PPG Biometric Sensor | 120+ Sports Modes | Smart Health Alerts",
      batteryLife: "Up to 11 Days Typical Usage (Up to 26 Days in Battery Saver Mode) | 300mAh",
      waterResistance: "IP68 Water Resistant"
    },
    pros: ["Sleek stainless steel middle frame elevates budget smartwatch looks", "Huge 1.91-inch clear display with rich Zepp OS 3.0 downloadable mini-apps", "Reliable 11-day battery life with Bluetooth phone calling"],
    cons: ["TFT screen rather than AMOLED", "No built-in standalone GPS (uses phone GPS)"],
    expertVerdict: "A sleek stainless steel fitness smartwatch delivering a massive screen, smooth Zepp OS mini-apps, and nearly two weeks of battery.",
    stores: [
      { store: "Amazon", price: 5999, offer: "₹500 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Amazfit+Bip+5+Unity&tag=teachunder-21" },
      { store: "Flipkart", price: 6299, offer: "₹400 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Amazfit+Bip+5+Unity" },
      { store: "Croma", price: 6599, offer: "Free Extra Strap", inStock: true, url: "https://www.croma.com/searchB?q=Amazfit%20Bip%205" },
      { store: "JioMart", price: 6799, offer: "₹300 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Amazfit%20Bip%205" }
    ]
  },
  {
    id: "noise-colorfit-ultra-3",
    slug: "noise-colorfit-ultra-3",
    name: "Noise ColorFit Ultra 3 (1.96\" AMOLED / Metallic Finish / Gesture Control / 7-Day Battery)",
    brand: "Noise",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "noise", "ultra-3", "amoled", "metallic", "bluetooth-calling"],
    status: "In Stock",
    score: 90,
    launchedOn: "02 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 8999,
    specs: {
      display: "1.96\" AMOLED Display (410x502) | 500 nits | Always-On Display with 4 AOD Styles",
      processor: "Single Chip Bluetooth 5.3 with Tru Sync Calling Technology",
      sensors: "Noise Health Suite (24x7 Heart Rate, SpO2, Stress, Sleep Monitoring) | 100+ Sports Modes",
      batteryLife: "Up to 7 Days Battery (Up to 2 Days with Bluetooth Calling Enabled)",
      waterResistance: "IP68 Water and Dust Resistant"
    },
    pros: ["Vibrant 1.96-inch AMOLED display with deep blacks and sharp resolution", "Premium metallic chassis with functional crown navigation", "Tru Sync single-chip calling pairs instantly with low battery draw"],
    cons: ["No standalone GPS", "Always-On Display reduces battery to ~2.5 days"],
    expertVerdict: "A best-selling premium budget smartwatch pairing a vivid 1.96-inch AMOLED screen with metallic finish and reliable Bluetooth calling.",
    stores: [
      { store: "Amazon", price: 2999, offer: "₹300 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Noise+ColorFit+Ultra+3&tag=teachunder-21" },
      { store: "Flipkart", price: 3199, offer: "₹250 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Noise+ColorFit+Ultra+3" },
      { store: "Croma", price: 3399, offer: "Free Noise Silicone Strap", inStock: true, url: "https://www.croma.com/searchB?q=Noise%20Ultra%203" },
      { store: "JioMart", price: 3499, offer: "₹200 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Noise%20Ultra%203" }
    ]
  },
  {
    id: "noise-colorfit-pro-5-max",
    slug: "noise-colorfit-pro-5-max",
    name: "Noise ColorFit Pro 5 Max (1.96\" AMOLED / Post-Training Metric / VO2 Max / Rapid SOS)",
    brand: "Noise",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "noise", "pro-5-max", "vo2-max", "amoled", "training-metrics"],
    status: "In Stock",
    score: 91,
    launchedOn: "15 Dec 2023",
    updatedAt: new Date().toISOString(),
    mrp: 9999,
    specs: {
      display: "1.96\" AMOLED Display (410x502) | 600 nits Peak | Always-On Display",
      processor: "Next-Gen SoC with Tru Sync Calling & Noise OS",
      sensors: "Post-Training Metrics (VO2 Max, Recovery Time, Training Load) | 24x7 Heart Rate & SpO2",
      batteryLife: "Up to 7 Days Battery Life | Fast Charging Support",
      waterResistance: "IP68 Water Resistant"
    },
    pros: ["Athletic-grade post-training metrics including VO2 Max and recovery countdowns", "Bright 600 nits AMOLED panel readable outdoors", "Rapid SOS dialer and emoji response support"],
    cons: ["Requires phone GPS for running pace tracking", "Crown wheel is slightly sensitive to accidental touches"],
    expertVerdict: "A sport-focused smartwatch designed for fitness enthusiasts who want athlete training recovery metrics without spending a fortune.",
    stores: [
      { store: "Amazon", price: 4499, offer: "₹500 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Noise+ColorFit+Pro+5+Max&tag=teachunder-21" },
      { store: "Flipkart", price: 4699, offer: "₹400 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Noise+ColorFit+Pro+5+Max" },
      { store: "Croma", price: 4999, offer: "Free Tempered Glass Protector", inStock: true, url: "https://www.croma.com/searchB?q=Noise%20Pro%205%20Max" },
      { store: "JioMart", price: 5199, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Noise%20Pro%205%20Max" }
    ]
  },
  {
    id: "noise-halo-plus",
    slug: "noise-halo-plus",
    name: "Noise Halo Plus (1.46\" Elite AMOLED / Metallic Finish / Luxury Round / 7-Day Battery)",
    brand: "Noise",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "noise", "halo-plus", "round-dial", "metallic", "luxury-watch"],
    status: "In Stock",
    score: 89,
    launchedOn: "20 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 8999,
    specs: {
      display: "1.46\" AMOLED Round Display (466x466) | 550 nits | Always-On Display",
      processor: "Single Chip Bluetooth 5.3 with Tru Sync Calling",
      sensors: "Noise Health Suite (HR, SpO2, Sleep Tracker, Female Cycle Tracking)",
      batteryLife: "Up to 7 Days Battery Life (Up to 2 Days with BT Calling)",
      waterResistance: "IP68 Water and Dust Resistant"
    },
    pros: ["Sophisticated round metallic chronometer design with stainless steel link strap", "Vibrant 466x466 high-resolution AMOLED screen", "Clear Bluetooth calling with dial pad and contact storage"],
    cons: ["Slightly heavier with the metal link strap", "No standalone GPS"],
    expertVerdict: "A sharp, executive-style round smartwatch that looks and feels like a traditional luxury timepiece with modern smart capabilities.",
    stores: [
      { store: "Amazon", price: 2999, offer: "₹300 instant discount with Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Noise+Halo+Plus&tag=teachunder-21" },
      { store: "Flipkart", price: 3199, offer: "₹250 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Noise+Halo+Plus" },
      { store: "Croma", price: 3499, offer: "Free Strap Adjustment Tool", inStock: true, url: "https://www.croma.com/searchB?q=Noise%20Halo%20Plus" },
      { store: "JioMart", price: 3599, offer: "₹200 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Noise%20Halo%20Plus" }
    ]
  },
  {
    id: "boat-storm-call-3",
    slug: "boat-storm-call-3",
    name: "boAt Storm Call 3 (1.83\" HD Display / Crest OS / Turn-by-Turn Map Navigation / QR Tray)",
    brand: "boAt",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "boat", "storm-call-3", "turn-by-turn-navigation", "crest-os", "budget"],
    status: "In Stock",
    score: 87,
    launchedOn: "18 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 7990,
    specs: {
      display: "1.83\" HD Square Display (240x296) | 550 nits High Brightness | 2.5D Curved Glass",
      processor: "Crest App OS with Navigation Powered by MapmyIndia",
      sensors: "Heart Rate & SpO2 Monitoring | Sleep Tracking | 700+ Active Modes",
      batteryLife: "Up to 7 Days Battery (Up to 2 Days with Calling) | ASAP Charge",
      waterResistance: "IP67 Dust, Sweat and Splash Resistant"
    },
    pros: ["Turn-by-turn MapmyIndia navigation right on your wrist", "Store digital payment and ticket QR codes directly in watch's QR Tray", "Crest OS allows creating personalized fitness workout plans with friends"],
    cons: ["LCD display rather than AMOLED", "IP67 is splashproof rather than full swimproof"],
    expertVerdict: "An innovative budget smartwatch bringing turn-by-turn navigation and QR payment storage to the sub-₹1,500 segment.",
    stores: [
      { store: "Amazon", price: 1399, offer: "₹150 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=boAt+Storm+Call+3&tag=teachunder-21" },
      { store: "Flipkart", price: 1449, offer: "₹100 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=boAt+Storm+Call+3" },
      { store: "Croma", price: 1599, offer: "Free boAt Lanyard Strap", inStock: true, url: "https://www.croma.com/searchB?q=boAt%20Storm%20Call%203" },
      { store: "JioMart", price: 1699, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/boAt%20Storm%20Call%203" }
    ]
  },
  {
    id: "boat-lunar-orb",
    slug: "boat-lunar-orb",
    name: "boAt Lunar Orb (1.45\" Round AMOLED / 650 nits / Bluetooth Calling / DIY Watch Faces)",
    brand: "boAt",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "boat", "lunar-orb", "round-amoled", "650-nits", "diy-faces"],
    status: "In Stock",
    score: 88,
    launchedOn: "25 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 8990,
    specs: {
      display: "1.45\" Round AMOLED Display (466x466) | 650 nits Peak | Always-On Display",
      processor: "Single-Chip Bluetooth 5.3 Calling with ENx Voice Algorithm",
      sensors: "Heart Rate, SpO2, Sleep Tracking & Stress Levels | 100+ Sports Modes",
      batteryLife: "Up to 7 Days Battery (Up to 2 Days with Active Bluetooth Calling)",
      waterResistance: "IP67 Splash Resistant"
    },
    pros: ["Bright 650 nits round AMOLED panel delivers rich contrast and vivid colors", "Customizable DIY watch face studio inside the companion app", "Sleek metallic circular bezel with functional rotating dial"],
    cons: ["Battery life drops to 2 days with Always-On Display", "No standalone GPS"],
    expertVerdict: "A stylish circular AMOLED smartwatch offering sharp 466x466 resolution, rich custom watch faces, and loud Bluetooth calling.",
    stores: [
      { store: "Amazon", price: 1899, offer: "₹200 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=boAt+Lunar+Orb&tag=teachunder-21" },
      { store: "Flipkart", price: 1999, offer: "₹150 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=boAt+Lunar+Orb" },
      { store: "Croma", price: 2199, offer: "Free boAt Keyring", inStock: true, url: "https://www.croma.com/searchB?q=boAt%20Lunar%20Orb" },
      { store: "JioMart", price: 2299, offer: "₹100 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/boAt%20Lunar%20Orb" }
    ]
  },
  {
    id: "boat-wave-elevate",
    slug: "boat-wave-elevate",
    name: "boAt Wave Elevate (1.96\" Curved Display / Metallic Body / Bluetooth Calling / 500 nits)",
    brand: "boAt",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "boat", "wave-elevate", "curved-display", "metallic", "budget"],
    status: "In Stock",
    score: 87,
    launchedOn: "05 Sep 2023",
    updatedAt: new Date().toISOString(),
    mrp: 7990,
    specs: {
      display: "1.96\" HD Curved Glass Display (240x282) | 500 nits | Metal Body Case",
      processor: "Bluetooth 5.3 with ENx Noise-free Calling Microphone",
      sensors: "Live Heart Rate & SpO2 Monitor | Sedentary & Hydration Alerts",
      batteryLife: "Up to 5 Days Battery Life | Magnetic Fast Charger",
      waterResistance: "IP67 Water and Dust Resistant"
    },
    pros: ["Gentle 2.5D curved glass flows seamlessly into the metallic zinc alloy frame", "Large 1.96-inch expansive screen view", "Clear speaker and microphone for phone calls on the go"],
    cons: ["TFT screen (not AMOLED)", "No GPS tracker"],
    expertVerdict: "A comfortable, curved-glass metallic smartwatch built for effortless daily calling and fitness tracking on a budget.",
    stores: [
      { store: "Amazon", price: 1499, offer: "₹150 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=boAt+Wave+Elevate&tag=teachunder-21" },
      { store: "Flipkart", price: 1549, offer: "₹100 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=boAt+Wave+Elevate" },
      { store: "Croma", price: 1699, offer: "Free Protective Silicone Guard", inStock: true, url: "https://www.croma.com/searchB?q=boAt%20Wave%20Elevate" },
      { store: "JioMart", price: 1799, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/boAt%20Wave%20Elevate" }
    ]
  },
  {
    id: "fire-boltt-phoenix-ultra",
    slug: "fire-boltt-phoenix-ultra",
    name: "Fire-Boltt Phoenix Ultra (1.39\" Luxury Stainless Steel / Bluetooth Calling / 120+ Sports)",
    brand: "Fire-Boltt",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "fire-boltt", "phoenix-ultra", "stainless-steel", "luxury-round"],
    status: "In Stock",
    score: 88,
    launchedOn: "01 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 12999,
    specs: {
      display: "1.39\" Full Touch High Resolution Round Display (240x240) | Steel Case",
      processor: "Single Chipset Bluetooth 5.1 with AI Voice Assistant",
      sensors: "SpO2 & Heart Rate Tracking | Sleep Monitoring | 120+ Sports Modes",
      batteryLife: "Up to 7 Days Normal Use (Up to 4 Days with Calling)",
      waterResistance: "IP67 Water Resistant"
    },
    pros: ["Heavyweight stainless steel mesh and link strap design gives royal look", "Loud built-in speaker and mic for phone calls", "Built-in games and calculator directly on watch"],
    cons: ["240x240 display resolution is modest compared to AMOLED options", "No standalone GPS"],
    expertVerdict: "A royal stainless steel chronometer watch that delivers luxury traditional wrist appeal with full Bluetooth smart calling.",
    stores: [
      { store: "Amazon", price: 1699, offer: "₹200 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Fire+Boltt+Phoenix+Ultra&tag=teachunder-21" },
      { store: "Flipkart", price: 1799, offer: "₹150 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Fire+Boltt+Phoenix+Ultra" },
      { store: "Croma", price: 1999, offer: "Free Strap Adjuster Tool", inStock: true, url: "https://www.croma.com/searchB?q=Fire%20Boltt%20Phoenix" },
      { store: "JioMart", price: 2099, offer: "₹100 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Fire%20Boltt%20Phoenix" }
    ]
  },
  {
    id: "fire-boltt-invincible-plus",
    slug: "fire-boltt-invincible-plus",
    name: "Fire-Boltt Invincible Plus (1.43\" AMOLED / 4GB Local Storage / TWS Earbuds Connect / 110+ Sports)",
    brand: "Fire-Boltt",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "fire-boltt", "invincible-plus", "4gb-storage", "tws-connect", "amoled"],
    status: "In Stock",
    score: 91,
    launchedOn: "15 Mar 2023",
    updatedAt: new Date().toISOString(),
    mrp: 21000,
    specs: {
      display: "1.43\" AMOLED Display (460x460) | 600 nits | Always-On Display",
      processor: "Advanced Dual Core Chip with 4GB Onboard Music Storage",
      sensors: "Heart Rate, SpO2, Sleep Tracker, 300+ Sports Modes",
      batteryLife: "Up to 5 Days Battery Life | Magnetic Fast Charging",
      waterResistance: "IP67 Water Resistant"
    },
    pros: ["4GB built-in storage allows saving hundreds of MP3 songs directly on the watch", "Pair Bluetooth earbuds directly to the watch without needing your phone on runs", "Sharp 460x460 round AMOLED panel with rich Always-On display dials"],
    cons: ["Transferring music via app takes time for large playlists", "Case is relatively chunky"],
    expertVerdict: "A phone-free workout companion with 4GB of onboard music storage that connects directly to your wireless earbuds.",
    stores: [
      { store: "Amazon", price: 3999, offer: "₹400 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Fire+Boltt+Invincible+Plus&tag=teachunder-21" },
      { store: "Flipkart", price: 4199, offer: "₹300 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Fire+Boltt+Invincible+Plus" },
      { store: "Croma", price: 4490, offer: "Free Stainless Steel Extra Strap", inStock: true, url: "https://www.croma.com/searchB?q=Fire%20Boltt%20Invincible" },
      { store: "JioMart", price: 4690, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Fire%20Boltt%20Invincible" }
    ]
  },
  {
    id: "fastrack-limitless-fs1-pro",
    slug: "fastrack-limitless-fs1-pro",
    name: "Fastrack Limitless FS1 Pro (1.96\" Super AMOLED / Arched Curve / SingleSync BT Calling)",
    brand: "Fastrack",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "fastrack", "limitless-fs1-pro", "super-amoled", "titan-trust"],
    status: "In Stock",
    score: 89,
    launchedOn: "25 Apr 2023",
    updatedAt: new Date().toISOString(),
    mrp: 7995,
    specs: {
      display: "1.96\" Super AMOLED Arched Curved Display (410x502) | Always-On Display",
      processor: "SingleSync Bluetooth Calling powered by Titan Electronics",
      sensors: "Auto Stress Monitor, 24x7 Heart Rate, SpO2, Sleep Tracker | 110+ Sports",
      batteryLife: "Up to 7 Days Battery (NitroFast Charging 10 mins = 1 Day)",
      waterResistance: "IP68 Water Resistant"
    },
    pros: ["Ergonomic arched display curves naturally around the wrist contour", "Vibrant Super AMOLED panel with deep saturation", "Backed by Titan's nationwide service network"],
    cons: ["Always-On display reduces battery to 2 days", "App notification sync can occasionally need refresh"],
    expertVerdict: "A youthful, curved Super AMOLED smartwatch crafted by Fastrack with Titan's trusted build reliability.",
    stores: [
      { store: "Amazon", price: 2799, offer: "₹300 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Fastrack+Limitless+FS1+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 2999, offer: "₹200 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Fastrack+Limitless+FS1+Pro" },
      { store: "Croma", price: 3199, offer: "Tata Neu Special Cashback & Free Setup", inStock: true, url: "https://www.croma.com/searchB?q=Fastrack%20Limitless%20FS1" },
      { store: "JioMart", price: 3299, offer: "₹150 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Fastrack%20FS1%20Pro" }
    ]
  },
  {
    id: "titan-crest-smartwatch",
    slug: "titan-crest-smartwatch",
    name: "Titan Crest (1.43\" AMOLED / Premium Mesh Strap / SingleSync BT Calling / AI Coach)",
    brand: "Titan",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "titan", "crest", "luxury-smartwatch", "mesh-strap", "amoled"],
    status: "In Stock",
    score: 92,
    launchedOn: "12 Oct 2023",
    updatedAt: new Date().toISOString(),
    mrp: 12995,
    specs: {
      display: "1.43\" AMOLED Display (466x466) | Always-On Display | Rotating Functional Crown",
      processor: "SingleSync Bluetooth 5.2 Calling with Superb Audio Clarity",
      sensors: "Titan Health Suite (Heart Rate, SpO2, Sleep with REM, Stress Tracker)",
      batteryLife: "Up to 7 Days Battery (Up to 3 Days with Heavy BT Calling)",
      waterResistance: "IP68 Water and Dust Resistant"
    },
    pros: ["Authentic Titan horological design with exquisite stainless steel Milanese mesh strap", "Crisp 466x466 round AMOLED screen with elegant watch faces", "Titan's gold standard customer service across India"],
    cons: ["Premium price compared to start-up brands", "No built-in standalone GPS"],
    expertVerdict: "An elegant blend of classic Indian horology and modern smartwatch intelligence, perfect for boardroom meetings and formal occasions.",
    stores: [
      { store: "Amazon", price: 6995, offer: "₹1,000 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Titan+Crest+Smartwatch&tag=teachunder-21" },
      { store: "Flipkart", price: 7295, offer: "₹750 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Titan+Crest+Smartwatch" },
      { store: "Croma", price: 7495, offer: "Tata Neu Special Cashback & Titan Gift Box", inStock: true, url: "https://www.croma.com/searchB?q=Titan%20Crest" },
      { store: "JioMart", price: 7795, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Titan%20Crest" }
    ]
  },
  {
    id: "titan-talk-s",
    slug: "titan-talk-s",
    name: "Titan Talk S (1.78\" AMOLED Display / Advanced Bluetooth Calling / 100+ Sports Modes)",
    brand: "Titan",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "titan", "talk-s", "amoled", "titan-quality"],
    status: "In Stock",
    score: 90,
    launchedOn: "18 May 2023",
    updatedAt: new Date().toISOString(),
    mrp: 11995,
    specs: {
      display: "1.78\" AMOLED Display (368x448) | Always-On Display | 500 nits",
      processor: "Advanced Audio SoC with SingleSync BT Calling & Voice Assistant",
      sensors: "Continuous Heart Rate & SpO2 Monitoring | Sleep & Hydration Tracker",
      batteryLife: "Up to 5 Days Battery Life | Magnetic Fast Charging",
      waterResistance: "IP68 Water Resistant"
    },
    pros: ["Sleek rectangular AMOLED display with rich contrast and deep blacks", "Crystal-clear microphone audio tuned for outdoor conversations", "Titan brand trust and build longevity"],
    cons: ["Battery lasts ~3 days under active calling", "Basic step tracking algorithm sensitivity"],
    expertVerdict: "A refined rectangular AMOLED smartwatch combining modern smartphone calling convenience with classic Titan sophistication.",
    stores: [
      { store: "Amazon", price: 4995, offer: "₹750 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Titan+Talk+S&tag=teachunder-21" },
      { store: "Flipkart", price: 5295, offer: "₹500 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Titan+Talk+S" },
      { store: "Croma", price: 5495, offer: "Tata Neu 5% NeuCoins Cashback", inStock: true, url: "https://www.croma.com/searchB?q=Titan%20Talk%20S" },
      { store: "JioMart", price: 5695, offer: "₹300 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Titan%20Talk%20S" }
    ]
  },
  {
    id: "garmin-forerunner-55",
    slug: "garmin-forerunner-55",
    name: "Garmin Forerunner 55 (Built-in GPS / Daily Suggested Workouts / PacePro / 14-Day Battery)",
    brand: "Garmin",
    category: "smartwatches",
    categoryLabel: "GPS Running Watch",
    tags: ["smartwatch", "garmin", "forerunner-55", "runners", "gps", "marathon"],
    status: "In Stock",
    score: 96,
    launchedOn: "02 Jun 2021",
    updatedAt: new Date().toISOString(),
    mrp: 22990,
    specs: {
      display: "1.04\" Sunlight-Visible Transflective Memory-in-Pixel (MIP) | Chemically Strengthened Glass",
      processor: "Garmin Custom Ultra-Low Power GPS Sports Processor",
      sensors: "Built-in GPS, GLONASS, Galileo | Garmin Elevate Wrist Heart Rate | PacePro Pacing Strategies",
      batteryLife: "Up to 14 Days in Smartwatch Mode (Up to 20 Hours in continuous GPS tracking mode)",
      waterResistance: "5ATM Water Resistance (Swimproof up to 50m)"
    },
    pros: ["Transflective MIP display shines even brighter under blistering direct outdoor sun", "Legendary Garmin GPS accuracy and PacePro dynamic race pacing", "Real 14-day battery life without touch screen battery drain"],
    cons: ["Physical button navigation (no touchscreen)", "No Bluetooth phone calling or speaker"],
    expertVerdict: "The undisputed holy grail running watch for 5K, 10K, half, and full marathon runners, providing surgical training data.",
    stores: [
      { store: "Amazon", price: 18990, offer: "₹2,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Garmin+Forerunner+55&tag=teachunder-21" },
      { store: "Flipkart", price: 19490, offer: "₹1,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Garmin+Forerunner+55" },
      { store: "Croma", price: 20490, offer: "Free Garmin Quick Release Sports Band", inStock: true, url: "https://www.croma.com/searchB?q=Garmin%20Forerunner%2055" },
      { store: "JioMart", price: 20990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Garmin%20Forerunner%2055" }
    ]
  },
  {
    id: "garmin-venu-3",
    slug: "garmin-venu-3",
    name: "Garmin Venu 3 (1.4\" AMOLED / Body Battery / Sleep Coach / Built-in Mic & Speaker / 14-Day)",
    brand: "Garmin",
    category: "smartwatches",
    categoryLabel: "GPS Smartwatch",
    tags: ["smartwatch", "garmin", "venu-3", "body-battery", "amoled", "sleep-coach"],
    status: "In Stock",
    score: 97,
    launchedOn: "30 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 50990,
    specs: {
      display: "1.4\" AMOLED Touchscreen (454x454) | Corning Gorilla Glass 3 | Stainless Steel Bezel",
      processor: "Next-Gen Garmin Processor with On-Wrist Speaker & Microphone",
      sensors: "Garmin Elevate Gen 5 Optical HRM | Pulse Ox | Body Battery Energy Monitoring | Nap Detection",
      batteryLife: "Up to 14 Days in Smartwatch Mode (Up to 26 Hours in GPS Mode)",
      waterResistance: "5ATM Water Resistance (Swimproof up to 50m)"
    },
    pros: ["Garmin's renowned fitness tracking combined with a vivid AMOLED touchscreen and on-wrist calling", "Body Battery and Sleep Coach with automatic nap detection", "14-day battery life leaves Apple Watch and Wear OS in the dust"],
    cons: ["Premium investment for fitness tracking", "App store has fewer casual lifestyle apps than Apple or Google"],
    expertVerdict: "The ultimate lifestyle fitness smartwatch in the world, combining Garmin's elite physiological sensors with AMOLED beauty and 14-day battery.",
    stores: [
      { store: "Amazon", price: 44990, offer: "₹3,500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Garmin+Venu+3&tag=teachunder-21" },
      { store: "Flipkart", price: 46490, offer: "₹2,500 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Garmin+Venu+3" },
      { store: "Croma", price: 47990, offer: "Free Garmin Charging Cable and Silicone Band", inStock: true, url: "https://www.croma.com/searchB?q=Garmin%20Venu%203" },
      { store: "JioMart", price: 48990, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Garmin%20Venu%203" }
    ]
  },
  {
    id: "boult-crown-r-pro",
    slug: "boult-crown-r-pro",
    name: "Boult Crown R Pro (1.43\" Round Super AMOLED / Zinc Alloy Metallic Frame / 600 nits)",
    brand: "Boult",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "boult", "crown-r-pro", "super-amoled", "zinc-alloy", "budget-round"],
    status: "In Stock",
    score: 88,
    launchedOn: "20 Jun 2023",
    updatedAt: new Date().toISOString(),
    mrp: 8999,
    specs: {
      display: "1.43\" Round Super AMOLED (466x466) | 600 nits Peak | Always-On Display",
      processor: "Single Chip Bluetooth 5.2 Calling with Dedicated Mic & Speaker",
      sensors: "SpO2, 24x7 Heart Rate, Blood Pressure & Sleep Monitor | 120+ Sports Modes",
      batteryLife: "Up to 5 Days Battery Life | Fast Charging",
      waterResistance: "IP67 Water and Dust Resistant"
    },
    pros: ["Heavyweight zinc alloy metallic frame with knurled rotating crown", "Vibrant 466x466 Super AMOLED round screen", "Dual strap option in the box (metal mesh + silicone)"],
    cons: ["No standalone GPS", "Blood pressure monitor is software estimated"],
    expertVerdict: "A high-shine metallic round AMOLED smartwatch that punches far above its price tag with bundled dual straps.",
    stores: [
      { store: "Amazon", price: 2199, offer: "₹200 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Boult+Crown+R+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 2299, offer: "₹150 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Boult+Crown+R+Pro" },
      { store: "Croma", price: 2490, offer: "Free Extra Mesh Strap", inStock: true, url: "https://www.croma.com/searchB?q=Boult%20Crown%20R" },
      { store: "JioMart", price: 2590, offer: "₹100 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Boult%20Crown%20R" }
    ]
  },
  {
    id: "boult-mirage",
    slug: "boult-mirage",
    name: "Boult Mirage (1.39\" Luxury Stainless Steel Chain / Bluetooth Calling / 300+ Faces)",
    brand: "Boult",
    category: "smartwatches",
    categoryLabel: "Smartwatch",
    tags: ["smartwatch", "boult", "mirage", "stainless-steel-chain", "luxury", "dial-pad"],
    status: "In Stock",
    score: 87,
    launchedOn: "15 Oct 2023",
    updatedAt: new Date().toISOString(),
    mrp: 7999,
    specs: {
      display: "1.39\" HD Display (360x360) | High Brightness | Zinc Alloy + Stainless Steel Strap",
      processor: "Bluetooth 5.2 with Noise-free Calling Microphone",
      sensors: "24x7 Heart Rate, SpO2 & Female Cycle Tracker | 120+ Sports Modes",
      batteryLife: "Up to 7 Days Battery Life (Up to 2 Days with BT Calling)",
      waterResistance: "IP67 Water Resistant"
    },
    pros: ["Traditional luxury watch styling with interlocking stainless steel chain links", "Crisp phone call audio and dedicated quick dialer pad", "Over 300 cloud-based watch dials available in companion app"],
    cons: ["LCD screen rather than AMOLED", "No standalone GPS tracker"],
    expertVerdict: "A luxury stainless-steel chain smartwatch for users who prioritize classic dress-watch appearance and convenient wrist calling.",
    stores: [
      { store: "Amazon", price: 1799, offer: "₹150 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Boult+Mirage+Smartwatch&tag=teachunder-21" },
      { store: "Flipkart", price: 1849, offer: "₹100 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Boult+Mirage+Smartwatch" },
      { store: "Croma", price: 1999, offer: "Free Strap Sizing Tool", inStock: true, url: "https://www.croma.com/searchB?q=Boult%20Mirage" },
      { store: "JioMart", price: 2099, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Boult%20Mirage" }
    ]
  }
];

const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const existingSlugs = new Set(catalog.products.map(p => p.slug));

let addedCount = 0;
for (const p of newWatches) {
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
console.log(`Successfully added ${addedCount} smartwatches! Total products: ${catalog.products.length}`);
