import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'data/products.json');

const newAudio = [
  {
    id: "bose-quietcomfort-ultra-earbuds",
    slug: "bose-quietcomfort-ultra-earbuds",
    name: "Bose QuietComfort Ultra Earbuds (World-Class ANC / Spatial Audio / CustomTune)",
    brand: "Bose",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "bose", "anc", "spatial-audio", "flagship-audio", "comfort"],
    status: "In Stock",
    score: 97,
    launchedOn: "15 Sep 2023",
    updatedAt: new Date().toISOString(),
    mrp: 29900,
    specs: {
      anc: "World-Class Active Noise Cancellation with CustomTune sound personalization",
      batteryLife: "Up to 6 Hours per charge (24 Hours with USB-C Charging Case)",
      drivers: "High-Excursion Transducers with Bose Immersive Spatial Audio",
      connectivity: "Bluetooth 5.3 | Snapdragon Sound with aptX Adaptive | Multipoint",
      waterResistance: "IPX4 Sweat and Water Resistant"
    },
    pros: ["Undisputed best-in-class active noise cancellation silences engine and crowd roar", "CustomTune technology automatically analyzes user ear canal shape", "Superb spatial audio immersion with head tracking"],
    cons: ["Case lacks Qi wireless charging out of the box (requires special cover)", "Premium flagship price tag"],
    expertVerdict: "The undisputed champion of noise cancellation. If silence is your top priority on flights or commutes, Bose is peerless.",
    stores: [
      { store: "Amazon", price: 23900, offer: "₹2,500 instant discount with ICICI/HDFC Cards", inStock: true, url: "https://www.amazon.in/s?k=Bose+QuietComfort+Ultra+Earbuds&tag=teachunder-21" },
      { store: "Flipkart", price: 24900, offer: "₹1,500 SBI Card discount", inStock: true, url: "https://www.flipkart.com/search?q=Bose+QuietComfort+Ultra+Earbuds" },
      { store: "Croma", price: 25900, offer: "Free Bose Leatherette Protective Case", inStock: true, url: "https://www.croma.com/searchB?q=Bose%20QuietComfort%20Ultra" },
      { store: "JioMart", price: 26500, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Bose%20QuietComfort%20Ultra" }
    ]
  },
  {
    id: "samsung-galaxy-buds-3-pro",
    slug: "samsung-galaxy-buds-3-pro",
    name: "Samsung Galaxy Buds 3 Pro (Galaxy AI / Adaptive Noise Control / Blade Lights / 24-bit Hi-Fi)",
    brand: "Samsung",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "samsung", "galaxy-buds", "galaxy-ai", "hi-res", "blade-lights"],
    status: "In Stock",
    score: 95,
    launchedOn: "10 Jul 2024",
    updatedAt: new Date().toISOString(),
    mrp: 19999,
    specs: {
      anc: "Adaptive Noise Control with Galaxy AI real-time siren/voice detection",
      batteryLife: "Up to 7 Hours playback (30 Hours total with wireless charging case)",
      drivers: "2-Way Speaker (10.5mm Dynamic Driver + 6.1mm Planar Tweeter)",
      connectivity: "Bluetooth 5.4 | Samsung Seamless Codec Ultra High Quality 24-bit/96kHz",
      waterResistance: "IP57 Dust and Water Resistance"
    },
    pros: ["Dual-amplifier 2-way planar tweeter setup produces breathtaking acoustic detail", "Futuristic Blade Lights on stems indicate charging and status", "Galaxy AI live interpreter translates speech directly into your ear"],
    cons: ["Full 24-bit UHQ codec requires paired Samsung Galaxy smartphone", "Pinch controls require initial adjustment"],
    expertVerdict: "Samsung's finest acoustic achievement to date, pairing dual planar drivers with futuristic Blade Lights and AI translation.",
    stores: [
      { store: "Amazon", price: 17999, offer: "₹2,000 instant bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Buds+3+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 18499, offer: "₹1,500 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Buds+3+Pro" },
      { store: "Croma", price: 18990, offer: "Free Wireless Charging Pad worth ₹1,999", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Buds%203%20Pro" },
      { store: "JioMart", price: 19490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Buds%203%20Pro" }
    ]
  },
  {
    id: "samsung-galaxy-buds-fe",
    slug: "samsung-galaxy-buds-fe",
    name: "Samsung Galaxy Buds FE (Active Noise Cancellation / Deep Bass / Wingtip Fit)",
    brand: "Samsung",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "samsung", "buds-fe", "anc", "wingtip", "secure-fit"],
    status: "In Stock",
    score: 91,
    launchedOn: "04 Oct 2023",
    updatedAt: new Date().toISOString(),
    mrp: 9999,
    specs: {
      anc: "Active Noise Cancellation + Ambient Sound Mode",
      batteryLife: "Up to 8.5 Hours on buds (30 Hours total with charging case)",
      drivers: "New 1-Way Deep Bass Dynamic Driver",
      connectivity: "Bluetooth 5.2 | Auto Switch between Galaxy Devices | SmartThings Find",
      waterResistance: "IPX2 Splash Resistant"
    },
    pros: ["Ergonomic silicone wingtips provide an unbreakable, secure fit during running", "Strong Active Noise Cancellation under ₹6,000", "Long 8.5-hour single charge battery endurance"],
    cons: ["Case lacks Qi wireless charging", "IPX2 splash resistance is basic"],
    expertVerdict: "The best value branded ANC earbuds for gym lovers, runners, and everyday users who prioritize a rock-solid secure fit.",
    stores: [
      { store: "Amazon", price: 5499, offer: "₹1,000 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Samsung+Galaxy+Buds+FE&tag=teachunder-21" },
      { store: "Flipkart", price: 5999, offer: "₹750 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Buds+FE" },
      { store: "Croma", price: 6490, offer: "Free Silicone Protective Case", inStock: true, url: "https://www.croma.com/searchB?q=Galaxy%20Buds%20FE" },
      { store: "JioMart", price: 6990, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Galaxy%20Buds%20FE" }
    ]
  },
  {
    id: "nothing-ear-a",
    slug: "nothing-ear-a",
    name: "Nothing Ear (a) (45dB Smart ANC / LDAC Hi-Res Audio / ChatGPT Integration / 42.5H Playtime)",
    brand: "Nothing",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "nothing", "ear-a", "transparent", "ldac", "chatgpt"],
    status: "In Stock",
    score: 93,
    launchedOn: "18 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 9999,
    specs: {
      anc: "Smart Active Noise Cancellation up to 45dB with Smart Adaptive algorithm",
      batteryLife: "Up to 9.5 Hours playback (42.5 Hours total with case, ANC off)",
      drivers: "11mm Custom Dynamic Driver with PMI + TPU Diaphragm & Bass Enhance",
      connectivity: "Bluetooth 5.3 | LDAC Hi-Res Audio Certified | Dual Connection | Pinch to talk to ChatGPT",
      waterResistance: "IP54 (buds) / IPX2 (case)"
    },
    pros: ["Iconic transparent design with striking pop-yellow or classic white/black colorways", "Certified Hi-Res LDAC high-fidelity audio decoding", "Direct voice access to ChatGPT via earbud pinch controls"],
    cons: ["Case does not support wireless charging", "High-frequency treble can be bright out of the box (tweakable via in-app EQ)"],
    expertVerdict: "A style icon that delivers phenomenal Hi-Res sound, deep 45dB noise cancelling, and ChatGPT smarts under ₹8,000.",
    stores: [
      { store: "Amazon", price: 6999, offer: "₹1,000 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Nothing+Ear+a&tag=teachunder-21" },
      { store: "Flipkart", price: 7499, offer: "₹750 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Nothing+Ear+a" },
      { store: "Croma", price: 7990, offer: "Free Nothing protective pouch", inStock: true, url: "https://www.croma.com/searchB?q=Nothing%20Ear%20a" },
      { store: "JioMart", price: 8290, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Nothing%20Ear%20a" }
    ]
  },
  {
    id: "nothing-ear-2024",
    slug: "nothing-ear-2024",
    name: "Nothing Ear 2024 (Ceramic Drivers / 45dB Smart ANC / LHDC & LDAC / Advanced EQ)",
    brand: "Nothing",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "nothing", "flagship", "ceramic-driver", "audiophile", "wireless-charging"],
    status: "In Stock",
    score: 95,
    launchedOn: "18 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 14999,
    specs: {
      anc: "45dB Smart Active Noise Cancellation with real-time ear canal leakage check",
      batteryLife: "Up to 8.5 Hours on buds (40.5 Hours total with case) | 2.5W Qi Wireless Charging",
      drivers: "Custom 11mm Ceramic Diaphragm for ultra-low distortion and crisp acoustics",
      connectivity: "Bluetooth 5.3 | LHDC 5.0 & LDAC 24-bit Hi-Res | Dual Connection Multipoint",
      waterResistance: "IP54 (buds) / IP55 (case) High Water & Dust Resistance"
    },
    pros: ["Custom Ceramic dynamic driver delivers audiophile-grade separation and punch", "Full parametric in-app equalizer allows sharing custom sound profiles with community", "Both earbuds (IP54) and transparent charging case (IP55) are water resistant"],
    cons: ["Battery life reduces significantly with LDAC/LHDC high bitrate streaming enabled", "Glossy case lid shows micro-scratches if carried with keys"],
    expertVerdict: "An audiophile's dream in transparent clothing. Ceramic diaphragm drivers deliver breathtaking acoustic detail and soundstage.",
    stores: [
      { store: "Amazon", price: 11999, offer: "₹1,500 instant discount with Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Nothing+Ear+2024&tag=teachunder-21" },
      { store: "Flipkart", price: 12499, offer: "₹1,000 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Nothing+Ear+2024" },
      { store: "Croma", price: 12990, offer: "Free Qi Wireless Charger", inStock: true, url: "https://www.croma.com/searchB?q=Nothing%20Ear" },
      { store: "JioMart", price: 13490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Nothing%20Ear" }
    ]
  },
  {
    id: "oneplus-nord-buds-3-pro",
    slug: "oneplus-nord-buds-3-pro",
    name: "OnePlus Nord Buds 3 Pro (49dB Hybrid ANC / Basswave 2.0 / 12.4mm Titanized Driver)",
    brand: "OnePlus",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "oneplus", "nord-buds-3-pro", "49db-anc", "basswave", "pebble-case"],
    status: "In Stock",
    score: 92,
    launchedOn: "16 Jul 2024",
    updatedAt: new Date().toISOString(),
    mrp: 3799,
    specs: {
      anc: "49dB Hybrid Active Noise Cancellation with Ultra-Wide 4,000Hz frequency range",
      batteryLife: "Up to 12 Hours on buds (44 Hours total with case, ANC off) | 10 min charge = 11 Hours",
      drivers: "12.4mm Titanized Diaphragm with Basswave 2.0 algorithm",
      connectivity: "Bluetooth 5.4 | Dual Device Fast Pair | Crystal Clear 3-Mic AI Call Noise Cancellation",
      waterResistance: "IP55 Dust and Water Resistance"
    },
    pros: ["Massive 49dB hybrid noise cancellation shuts out urban traffic and metro noise", "Class-leading 44-hour total battery endurance with blisteringly fast charging", "Sleek matte pebble case with dual-tone aesthetic"],
    cons: ["No LDAC codec support (AAC/SBC only)", "Bass can be overpowering on default EQ setting"],
    expertVerdict: "The undisputed value king under ₹3,000. 49dB ANC, 44 hours of battery life, and powerful titanized bass.",
    stores: [
      { store: "Amazon", price: 2999, offer: "₹300 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=OnePlus+Nord+Buds+3+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 3099, offer: "₹250 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=OnePlus+Nord+Buds+3+Pro" },
      { store: "Croma", price: 3199, offer: "Free Protective Silicone Sleeve", inStock: true, url: "https://www.croma.com/searchB?q=Nord%20Buds%203%20Pro" },
      { store: "JioMart", price: 3299, offer: "₹200 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Nord%20Buds%203%20Pro" }
    ]
  },
  {
    id: "oneplus-nord-buds-2r",
    slug: "oneplus-nord-buds-2r",
    name: "OnePlus Nord Buds 2r (12.4mm Drivers / Dual Mic AI Clear Calls / 38H Playtime / IP55)",
    brand: "OnePlus",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "oneplus", "nord-buds-2r", "budget-tws", "deep-bass"],
    status: "In Stock",
    score: 89,
    launchedOn: "05 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 2299,
    specs: {
      anc: "No Active Noise Cancellation (AI Noise Reduction for Calls only)",
      batteryLife: "Up to 8 Hours on single charge (38 Hours total with charging case)",
      drivers: "12.4mm Extra-Large Dynamic Titanium Diaphragm Drivers",
      connectivity: "Bluetooth 5.3 | 94ms Ultra-Low Gaming Latency | Fast Pair",
      waterResistance: "IP55 Dust and Water Resistant"
    },
    pros: ["Thumping punchy bass powered by extra-large 12.4mm titanium drivers", "Rock-solid IP55 rating withstands heavy workouts and sweat", "Exceptionally comfortable for all-day listening"],
    cons: ["Lacks Active Noise Cancellation", "No volume gesture controls on stems"],
    expertVerdict: "The best ultra-reliable daily driver earbuds under ₹2,000 for pure audio clarity, durable build, and booming bass.",
    stores: [
      { store: "Amazon", price: 1799, offer: "₹200 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=OnePlus+Nord+Buds+2r&tag=teachunder-21" },
      { store: "Flipkart", price: 1899, offer: "₹150 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=OnePlus+Nord+Buds+2r" },
      { store: "Croma", price: 1999, offer: "Free Silicone Lanyard Case", inStock: true, url: "https://www.croma.com/searchB?q=OnePlus%20Nord%20Buds%202r" },
      { store: "JioMart", price: 2049, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Nord%20Buds%202r" }
    ]
  },
  {
    id: "realme-buds-t310",
    slug: "realme-buds-t310",
    name: "Realme Buds T310 (46dB Hybrid ANC / 360° Spatial Audio / 12.4mm Bass Driver / 40H Battery)",
    brand: "Realme",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "realme", "t310", "46db-anc", "spatial-audio", "value-beast"],
    status: "In Stock",
    score: 91,
    launchedOn: "30 Jul 2024",
    updatedAt: new Date().toISOString(),
    mrp: 3999,
    specs: {
      anc: "46dB Hybrid Active Noise Cancellation with 3-Level Smart Noise Reduction",
      batteryLife: "Up to 9 Hours playback (40 Hours total with charging case)",
      drivers: "12.4mm Dynamic Bass Driver with Titanium Diaphragm",
      connectivity: "Bluetooth 5.4 | 360° Spatial Audio Effect | 45ms Low Latency Gaming",
      waterResistance: "IP55 Dust and Water Resistance"
    },
    pros: ["Impressive 46dB noise cancellation at an aggressive sub-₹2,500 price", "360-degree spatial audio adds immersive depth to movies", "Low 45ms latency for lag-free gaming"],
    cons: ["Spatial audio effect works best on stereo content only", "Glossy finish on stems shows oil"],
    expertVerdict: "An absolute feature-packed champion in the sub-₹2,500 category, delivering high-tier 46dB ANC and 40 hours of battery life.",
    stores: [
      { store: "Amazon", price: 2199, offer: "₹250 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Realme+Buds+T310&tag=teachunder-21" },
      { store: "Flipkart", price: 2299, offer: "₹200 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Realme+Buds+T310" },
      { store: "Croma", price: 2490, offer: "Free Protective Pouch", inStock: true, url: "https://www.croma.com/searchB?q=Realme%20Buds%20T310" },
      { store: "JioMart", price: 2590, offer: "₹150 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Realme%20Buds%20T310" }
    ]
  },
  {
    id: "realme-buds-air-6",
    slug: "realme-buds-air-6",
    name: "Realme Buds Air 6 (50dB Deep Sea ANC / Hi-Res LHDC 5.0 / 12.4mm Mega Titanizing Driver)",
    brand: "Realme",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "realme", "air-6", "50db-anc", "lhdc", "hi-res"],
    status: "In Stock",
    score: 93,
    launchedOn: "22 May 2024",
    updatedAt: new Date().toISOString(),
    mrp: 4999,
    specs: {
      anc: "50dB Deep Sea Active Noise Cancellation with Smart Adaptive 4,000Hz Ultra-Wideband",
      batteryLife: "Up to 10 Hours on buds (40 Hours total with charging case)",
      drivers: "12.4mm Mega Titanizing Driver with Dynamic Bass Boost",
      connectivity: "Bluetooth 5.3 | LHDC 5.0 24-bit/192kHz Hi-Res Certified | Dual Device Connection",
      waterResistance: "IP55 Water and Dust Resistance"
    },
    pros: ["Class-leading 50dB deep sea active noise cancellation", "Hi-Res Audio Certified with 24-bit LHDC 5.0 master-tape quality", "Dual-device seamless switching between laptop and phone"],
    cons: ["LHDC codec requires a compatible Android smartphone", "Touch controls can occasionally trigger accidental pauses"],
    expertVerdict: "A true budget flagship earbud boasting 50dB ANC and 24-bit LHDC 5.0 Hi-Res audio certification under ₹3,500.",
    stores: [
      { store: "Amazon", price: 3299, offer: "₹300 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Realme+Buds+Air+6&tag=teachunder-21" },
      { store: "Flipkart", price: 3399, offer: "₹250 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Realme+Buds+Air+6" },
      { store: "Croma", price: 3599, offer: "Free Realme Protective Case", inStock: true, url: "https://www.croma.com/searchB?q=Realme%20Buds%20Air%206" },
      { store: "JioMart", price: 3699, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Realme%20Buds%20Air%206" }
    ]
  },
  {
    id: "boat-nirvana-ion",
    slug: "boat-nirvana-ion",
    name: "boAt Nirvana Ion (120H Incredible Playtime / Dual EQ Modes / Crystal Bionic Sound / HiFi)",
    brand: "boAt",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "boat", "nirvana-ion", "120h-battery", "crystal-bionic", "beast-mode"],
    status: "In Stock",
    score: 89,
    launchedOn: "25 Mar 2023",
    updatedAt: new Date().toISOString(),
    mrp: 7990,
    specs: {
      anc: "Quad Mics with ENx Technology for Environmental Noise Cancellation on Calls",
      batteryLife: "Insane 24 Hours on single charge (120 Hours total with charging case)",
      drivers: "10mm Crystal Bionic Sound Drivers with Dual EQ Modes (boAt Signature / Balanced)",
      connectivity: "Bluetooth 5.2 | BEAST Mode with 60ms Low Latency | In-Ear Detection",
      waterResistance: "IPX4 Sweat and Splash Resistant"
    },
    pros: ["Unmatched 24-hour non-stop battery on a single charge without needing the case", "Total 120 hours battery life lasts over a month on moderate daily use", "In-ear detection pauses and resumes playback automatically"],
    cons: ["Lacks Active Noise Cancellation for background ambient noise", "Case is slightly bulkier to house the giant battery"],
    expertVerdict: "The undisputed battery king of true wireless earbuds, offering an astounding 120 hours of total playtime on a single charge cycle.",
    stores: [
      { store: "Amazon", price: 1999, offer: "₹200 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=boAt+Nirvana+Ion&tag=teachunder-21" },
      { store: "Flipkart", price: 2099, offer: "₹150 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=boAt+Nirvana+Ion" },
      { store: "Croma", price: 2299, offer: "Free boAt Lanyard Strap", inStock: true, url: "https://www.croma.com/searchB?q=boAt%20Nirvana%20Ion" },
      { store: "JioMart", price: 2399, offer: "₹150 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/boAt%20Nirvana%20Ion" }
    ]
  },
  {
    id: "boat-airdopes-311-pro",
    slug: "boat-airdopes-311-pro",
    name: "boAt Airdopes 311 Pro (50H Playtime / ASAP Fast Charge / Dual Mics ENx / BEAST Mode)",
    brand: "boAt",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "boat", "airdopes-311-pro", "asap-charge", "50h", "budget-tws"],
    status: "In Stock",
    score: 87,
    launchedOn: "12 May 2024",
    updatedAt: new Date().toISOString(),
    mrp: 4990,
    specs: {
      anc: "ENx Environmental Noise Cancellation with Dual Mics for Clear Voice Calls",
      batteryLife: "Up to 50 Hours Total Playtime | ASAP Charge (10 mins = 150 mins playtime)",
      drivers: "10mm Dynamic Audio Drivers with boAt Signature Sound",
      connectivity: "Bluetooth 5.3 | BEAST Mode with 50ms Low Latency | IWP Technology",
      waterResistance: "IPX4 Splash and Sweat Resistant"
    },
    pros: ["Extremely affordable under ₹1,200", "ASAP Charge gives 2.5 hours of playback in a 10-minute coffee break", "Insta Wake N' Pair connects instantly when the lid opens"],
    cons: ["Plastic build quality", "No active noise cancellation"],
    expertVerdict: "An ultra-affordable crowd pleaser delivering punchy Indian bass tuning, 50-hour battery, and fast USB-C charging.",
    stores: [
      { store: "Amazon", price: 1199, offer: "₹100 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=boAt+Airdopes+311+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 1249, offer: "₹75 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=boAt+Airdopes+311+Pro" },
      { store: "Croma", price: 1399, offer: "Free Keyring Lanyard", inStock: true, url: "https://www.croma.com/searchB?q=boAt%20Airdopes%20311" },
      { store: "JioMart", price: 1449, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/boAt%20311%20Pro" }
    ]
  },
  {
    id: "noise-buds-vs102-pro",
    slug: "noise-buds-vs102-pro",
    name: "Noise Buds VS102 Pro (Active Noise Cancellation up to 25dB / 40H Playtime / Quad Mic ENC)",
    brand: "Noise",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "noise", "vs102-pro", "anc", "glitter-finish", "instacharge"],
    status: "In Stock",
    score: 88,
    launchedOn: "15 Jan 2023",
    updatedAt: new Date().toISOString(),
    mrp: 3999,
    specs: {
      anc: "Active Noise Cancellation up to 25dB + Transparency Mode",
      batteryLife: "Up to 40 Hours Total Playtime | Instacharge (10 mins = 150 mins)",
      drivers: "11mm Dynamic Speaker Drivers with Tru Bass Technology",
      connectivity: "Bluetooth 5.3 | Quad Mic with Environmental Noise Cancellation",
      waterResistance: "IPX5 Water Resistant"
    },
    pros: ["Real Active Noise Cancellation for under ₹1,800", "Attractive curved pebble case with metallic flybird accents", "IPX5 water resistance protects against light rain and heavy workout sweat"],
    cons: ["25dB ANC is gentle compared to 40dB+ premium rivals", "App customization is basic"],
    expertVerdict: "A dependable, well-styled budget ANC earbud bringing active noise suppression and 40 hours of playback to the mass market.",
    stores: [
      { store: "Amazon", price: 1699, offer: "₹150 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Noise+Buds+VS102+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 1749, offer: "₹100 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Noise+Buds+VS102+Pro" },
      { store: "Croma", price: 1899, offer: "Free Noise Silicone Pouch", inStock: true, url: "https://www.croma.com/searchB?q=Noise%20Buds%20VS102%20Pro" },
      { store: "JioMart", price: 1999, offer: "₹100 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Noise%20VS102%20Pro" }
    ]
  },
  {
    id: "noise-buds-trance",
    slug: "noise-buds-trance",
    name: "Noise Buds Trance (45H Playtime / 40ms Ultra-Low Gaming Latency / 13mm Drivers)",
    brand: "Noise",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "noise", "buds-trance", "gaming", "low-latency", "budget"],
    status: "In Stock",
    score: 86,
    launchedOn: "18 Jun 2023",
    updatedAt: new Date().toISOString(),
    mrp: 2999,
    specs: {
      anc: "Environmental Noise Cancellation for voice calls",
      batteryLife: "Up to 45 Hours Playtime | Instacharge (10 mins = 200 mins)",
      drivers: "13mm Large Dynamic Drivers with Deep Bass",
      connectivity: "Bluetooth 5.3 | 40ms Ultra-Low Latency Dedicated Gaming Mode",
      waterResistance: "IPX5 Water Resistant"
    },
    pros: ["Dedicated 40ms low-latency mode for gaming and streaming sync", "Large 13mm drivers deliver punchy, bass-heavy acoustic profile", "Fast Instacharge gives over 3 hours playtime in 10 minutes"],
    cons: ["No Active Noise Cancellation", "Call quality in windy outdoor environments is average"],
    expertVerdict: "A low-cost gaming favorite offering ultra-low 40ms latency and large 13mm drivers for gaming and movie watching.",
    stores: [
      { store: "Amazon", price: 999, offer: "₹100 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Noise+Buds+Trance&tag=teachunder-21" },
      { store: "Flipkart", price: 1049, offer: "₹50 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Noise+Buds+Trance" },
      { store: "Croma", price: 1199, offer: "Free Carry Pouch", inStock: true, url: "https://www.croma.com/searchB?q=Noise%20Buds%20Trance" },
      { store: "JioMart", price: 1249, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Noise%20Buds%20Trance" }
    ]
  },
  {
    id: "boult-audio-z40-ultra",
    slug: "boult-audio-z40-ultra",
    name: "Boult Audio Z40 Ultra (32dB Active Noise Cancellation / 100H Playtime / Sonic Core AI)",
    brand: "Boult",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "boult", "z40-ultra", "32db-anc", "100h-battery", "dual-device"],
    status: "In Stock",
    score: 90,
    launchedOn: "12 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 5999,
    specs: {
      anc: "32dB Active Noise Cancellation with Transparency Mode",
      batteryLife: "Massive 100 Hours Total Playtime | Lightning Type-C Fast Charging",
      drivers: "10mm BoomX Bass Drivers with Sonic Core AI Processing",
      connectivity: "Bluetooth 5.3 | Dual Device Connectivity | 45ms Combat Gaming Mode",
      waterResistance: "IPX5 Water Resistant"
    },
    pros: ["Colossal 100-hour battery life with luxury prism case finish", "32dB Active Noise Cancellation and Dual Device pairing under ₹2,000", "Zen Quad Mic ENC suppresses background voice chatter during calls"],
    cons: ["Treble response can feel compressed on high volumes", "Prism case is slightly chunky"],
    expertVerdict: "A battery titan combining 100 hours of endurance, 32dB active noise cancellation, and dual device switching under ₹2,000.",
    stores: [
      { store: "Amazon", price: 1799, offer: "₹200 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Boult+Audio+Z40+Ultra&tag=teachunder-21" },
      { store: "Flipkart", price: 1899, offer: "₹150 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Boult+Audio+Z40+Ultra" },
      { store: "Croma", price: 1999, offer: "Free Boult Lanyard Strap", inStock: true, url: "https://www.croma.com/searchB?q=Boult%20Z40%20Ultra" },
      { store: "JioMart", price: 2099, offer: "₹100 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Boult%20Z40%20Ultra" }
    ]
  },
  {
    id: "boult-audio-ufo",
    slug: "boult-audio-ufo",
    name: "Boult Audio UFO (45ms Low Latency Gaming / Breathing RGB LEDs / 48H Battery / BoomX)",
    brand: "Boult",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "boult", "ufo", "gaming-tws", "rgb-lights", "combat-mode"],
    status: "In Stock",
    score: 87,
    launchedOn: "18 Aug 2023",
    updatedAt: new Date().toISOString(),
    mrp: 3499,
    specs: {
      anc: "Zen Mode Environmental Noise Cancellation with 4 Microphones",
      batteryLife: "Up to 48 Hours Playtime | Type-C Fast Charging",
      drivers: "13mm BoomX Dynamic Drivers with Rich Bass Response",
      connectivity: "Bluetooth 5.3 | 45ms Combat Gaming Mode | Breathing Gaming LEDs",
      waterResistance: "IPX5 Water Resistant"
    },
    pros: ["Futuristic sci-fi UFO case design with breathing gaming RGB light effects", "Ultra-responsive 45ms combat mode matches footsteps and gunshots accurately", "Large 13mm BoomX drivers provide cinema-style bass"],
    cons: ["Flashy RGB styling may not appeal to corporate settings", "No active noise cancellation"],
    expertVerdict: "A wildly fun gaming earbud featuring glowing alien RGB aesthetics, 45ms zero-lag audio, and hard-hitting bass.",
    stores: [
      { store: "Amazon", price: 1299, offer: "₹100 instant bank discount", inStock: true, url: "https://www.amazon.in/s?k=Boult+Audio+UFO&tag=teachunder-21" },
      { store: "Flipkart", price: 1349, offer: "₹75 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Boult+Audio+UFO" },
      { store: "Croma", price: 1499, offer: "Free Gaming Sticker Pack", inStock: true, url: "https://www.croma.com/searchB?q=Boult%20Audio%20UFO" },
      { store: "JioMart", price: 1549, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Boult%20UFO" }
    ]
  },
  {
    id: "oppo-enco-air-3-pro",
    slug: "oppo-enco-air-3-pro",
    name: "OPPO Enco Air 3 Pro (World's First Bamboo Fiber Diaphragm / 49dB ANC / LDAC Hi-Res)",
    brand: "OPPO",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "oppo", "enco-air-3-pro", "bamboo-fiber", "ldac", "49db-anc"],
    status: "In Stock",
    score: 95,
    launchedOn: "10 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 7999,
    specs: {
      anc: "49dB Ultra-Deep Smart Adaptive Active Noise Cancellation",
      batteryLife: "Up to 7 Hours on buds (30 Hours total with charging case)",
      drivers: "12.4mm Natural Bamboo-Fiber Diaphragm with Golden Sound 2.0",
      connectivity: "Bluetooth 5.3 | LDAC Hi-Res Audio | Dual-Device Connection",
      waterResistance: "IP55 Dust and Water Resistant"
    },
    pros: ["World-first natural bamboo fiber diaphragm produces organic, silky vocals and instruments", "Massive 49dB ANC rivals earbuds double its price tag", "LDAC Hi-Res Audio certification with customized ear canal Golden Sound tuning"],
    cons: ["Battery life drops to ~4 hours with LDAC and ANC concurrently enabled", "Translucent case lid can accumulate fine dust inside the rim"],
    expertVerdict: "Widely regarded by audio critics as the best-sounding true wireless earbuds under ₹5,000 thanks to its natural bamboo diaphragm.",
    stores: [
      { store: "Amazon", price: 3999, offer: "₹500 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=OPPO+Enco+Air+3+Pro&tag=teachunder-21" },
      { store: "Flipkart", price: 4199, offer: "₹400 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=OPPO+Enco+Air+3+Pro" },
      { store: "Croma", price: 4490, offer: "Free OPPO Silicone Case Cover", inStock: true, url: "https://www.croma.com/searchB?q=OPPO%20Enco%20Air%203%20Pro" },
      { store: "JioMart", price: 4690, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/OPPO%20Enco%20Air%203" }
    ]
  },
  {
    id: "jbl-tune-230nc-tws",
    slug: "jbl-tune-230nc-tws",
    name: "JBL Tune 230NC TWS (Active Noise Cancelling / Pure Bass Sound / 40H Battery / 4 Mics)",
    brand: "JBL",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "jbl", "tune-230nc", "pure-bass", "anc", "harman"],
    status: "In Stock",
    score: 91,
    launchedOn: "02 May 2022",
    updatedAt: new Date().toISOString(),
    mrp: 7999,
    specs: {
      anc: "Active Noise Cancelling with Smart Ambient & TalkThru Technology",
      batteryLife: "Up to 10 Hours on single charge (40 Hours total with charging case)",
      drivers: "6.0mm Dynamic Drivers powered by JBL Pure Bass Sound",
      connectivity: "Bluetooth 5.2 | JBL Headphones App Support with Custom EQ",
      waterResistance: "IPX4 Water and Sweat Resistant"
    },
    pros: ["Signature JBL Pure Bass sound with customizable in-app 10-band equalizer", "Outstanding 10-hour single charge endurance on earbuds", "4 beamforming microphones deliver exceptional phone call clarity"],
    cons: ["Earbud stems are on the longer side", "No wireless Qi charging support"],
    expertVerdict: "A punchy, bass-driven daily driver backed by JBL's renowned Harman acoustic tuning and great mic clarity.",
    stores: [
      { store: "Amazon", price: 4499, offer: "₹500 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=JBL+Tune+230NC+TWS&tag=teachunder-21" },
      { store: "Flipkart", price: 4699, offer: "₹400 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=JBL+Tune+230NC+TWS" },
      { store: "Croma", price: 4999, offer: "Free JBL Protective Pouch", inStock: true, url: "https://www.croma.com/searchB?q=JBL%20Tune%20230NC" },
      { store: "JioMart", price: 5199, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/JBL%20Tune%20230NC" }
    ]
  },
  {
    id: "jbl-wave-beam",
    slug: "jbl-wave-beam",
    name: "JBL Wave Beam (JBL Deep Bass Sound / 32H Battery / Ambient Aware / IP54 Water Resistant)",
    brand: "JBL",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "jbl", "wave-beam", "deep-bass", "daily-driver"],
    status: "In Stock",
    score: 88,
    launchedOn: "14 Feb 2023",
    updatedAt: new Date().toISOString(),
    mrp: 4999,
    specs: {
      anc: "Smart Ambient and TalkThru technology (No ANC)",
      batteryLife: "Up to 8 Hours on earbuds (32 Hours total with case) | Speed Charge",
      drivers: "8.0mm Drivers with JBL Deep Bass Sound",
      connectivity: "Bluetooth 5.2 | JBL Headphones App Compatible | VoiceAware Calls",
      waterResistance: "IP54 Certified Earbuds / IPX2 Charging Case"
    },
    pros: ["JBL Deep Bass profile gives hip-hop and electronic music serious energy", "IP54 dust and splash proof rating handles outdoor monsoons", "Full companion app support with customizable sound curves"],
    cons: ["Lacks Active Noise Cancellation", "Case plastic finish can feel lightweight"],
    expertVerdict: "A reliable entry into the JBL ecosystem, delivering satisfying deep bass and durable IP54 dust and water resistance.",
    stores: [
      { store: "Amazon", price: 2999, offer: "₹300 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=JBL+Wave+Beam&tag=teachunder-21" },
      { store: "Flipkart", price: 3199, offer: "₹250 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=JBL+Wave+Beam" },
      { store: "Croma", price: 3499, offer: "Free JBL Keychain Lanyard", inStock: true, url: "https://www.croma.com/searchB?q=JBL%20Wave%20Beam" },
      { store: "JioMart", price: 3599, offer: "₹150 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/JBL%20Wave%20Beam" }
    ]
  },
  {
    id: "sony-wf-c700n",
    slug: "sony-wf-c700n",
    name: "Sony WF-C700N Truly Wireless ANC Earbuds (Noise Cancelling / Multipoint / DSEE / 15H)",
    brand: "Sony",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "sony", "wf-c700n", "anc", "dsee", "multipoint", "compact"],
    status: "In Stock",
    score: 93,
    launchedOn: "12 Jul 2023",
    updatedAt: new Date().toISOString(),
    mrp: 12990,
    specs: {
      anc: "Digital Noise Cancelling with Ambient Sound Mode & Wind Noise Reduction Structure",
      batteryLife: "Up to 7.5 Hours on earbuds (15 Hours total with charging case with ANC on)",
      drivers: "5mm High-Compliance Dynamic Driver with Sony DSEE Audio Upscaling",
      connectivity: "Bluetooth 5.2 | Multipoint Connection to 2 Devices Simultaneously | Sony Headphones Connect",
      waterResistance: "IPX4 Water Resistant"
    },
    pros: ["Incredibly small, ultra-lightweight ergonomic capsule design fits smaller ears effortlessly", "Sony DSEE audio engine restores compressed MP3 frequencies cleanly", "Seamless Bluetooth multipoint pairing to both phone and laptop"],
    cons: ["Total 15-hour battery life with case is moderate", "Case lid feels basic without metal hinges"],
    expertVerdict: "Sony's most comfortable noise-cancelling earbuds, offering featherlight ear fit, DSEE audio upscaling, and multipoint convenience.",
    stores: [
      { store: "Amazon", price: 7990, offer: "₹1,000 instant bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=Sony+WF+C700N&tag=teachunder-21" },
      { store: "Flipkart", price: 8290, offer: "₹750 off on SBI Cards", inStock: true, url: "https://www.flipkart.com/search?q=Sony+WF+C700N" },
      { store: "Croma", price: 8490, offer: "Free Sony Silicon Case Cover", inStock: true, url: "https://www.croma.com/searchB?q=Sony%20WF-C700N" },
      { store: "JioMart", price: 8790, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Sony%20WF-C700N" }
    ]
  },
  {
    id: "sony-wh-ch720n-headphones",
    slug: "sony-wh-ch720n-headphones",
    name: "Sony WH-CH720N Wireless Over-Ear ANC Headphones (V1 Processor / 50H Battery / Lightweight 192g)",
    brand: "Sony",
    category: "audio",
    categoryLabel: "Over-Ear Headphones",
    tags: ["headphones", "sony", "wh-ch720n", "over-ear", "50h-battery", "v1-chip"],
    status: "In Stock",
    score: 94,
    launchedOn: "15 Mar 2023",
    updatedAt: new Date().toISOString(),
    mrp: 14990,
    specs: {
      anc: "Dual Noise Sensor technology powered by Sony Integrated Processor V1 (from 1000XM5)",
      batteryLife: "Up to 35 Hours (ANC ON) / 50 Hours (ANC OFF) | 3 mins charge = 1 Hour playtime",
      drivers: "30mm Dynamic Drivers with DSEE sound enhancement",
      connectivity: "Bluetooth 5.2 | Multipoint Connection | 3.5mm AUX Cable Included",
      waterResistance: "Indoor / Commute use (Non-waterproof)"
    },
    pros: ["Inherits Sony's flagship V1 noise-cancelling processor for extraordinary cabin silence", "Featherlight 192g design with plush memory foam earcups for zero skull fatigue", "Huge 50-hour battery life with rapid emergency charging"],
    cons: ["Earcups do not fold inward into a ball (swivel flat only)", "Plastic exterior construction"],
    expertVerdict: "The best lightweight over-ear noise-cancelling headphones under ₹10,000, packing flagship 1000XM5 silicon and 50-hour battery.",
    stores: [
      { store: "Amazon", price: 9990, offer: "₹1,000 instant discount on Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Sony+WH+CH720N&tag=teachunder-21" },
      { store: "Flipkart", price: 10490, offer: "₹750 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Sony+WH+CH720N" },
      { store: "Croma", price: 10990, offer: "Free Headphone Hard Case worth ₹1,499", inStock: true, url: "https://www.croma.com/searchB?q=Sony%20WH-CH720N" },
      { store: "JioMart", price: 11290, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Sony%20WH-CH720N" }
    ]
  },
  {
    id: "anker-soundcore-liberty-4-nc",
    slug: "anker-soundcore-liberty-4-nc",
    name: "Anker Soundcore Liberty 4 NC (98.5% Noise Reduction / Hi-Res LDAC / 50H Battery / Wireless Charge)",
    brand: "Anker",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "anker", "soundcore", "liberty-4-nc", "98-percent-anc", "ldac"],
    status: "In Stock",
    score: 93,
    launchedOn: "29 Jun 2023",
    updatedAt: new Date().toISOString(),
    mrp: 9999,
    specs: {
      anc: "Adaptive ANC 2.0 cancels up to 98.5% of external noise with real-time in-ear sensors",
      batteryLife: "Up to 10 Hours on single charge (50 Hours total with wireless charging case)",
      drivers: "11mm Custom Drivers with HearID 2.0 tailored sound profile",
      connectivity: "Bluetooth 5.3 | LDAC Hi-Res Audio Certified | Qi Wireless Charging Case",
      waterResistance: "IPX4 Water Resistant"
    },
    pros: ["Verified 98.5% noise cancellation beats almost every rival under ₹8,000", "HearID 2.0 performs an audiologist-style hearing test to tune sound specifically for your ears", "Case supports both fast USB-C and wireless Qi pad charging"],
    cons: ["Case pop-up button mechanism requires care", "Default sound signature is bass-heavy (needs HearID tuning)"],
    expertVerdict: "A technical powerhouse boasting 98.5% noise reduction, Hi-Res LDAC, wireless charging, and custom HearID sound.",
    stores: [
      { store: "Amazon", price: 6999, offer: "₹1,000 instant discount on Credit Cards", inStock: true, url: "https://www.amazon.in/s?k=Anker+Soundcore+Liberty+4+NC&tag=teachunder-21" },
      { store: "Flipkart", price: 7499, offer: "₹750 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Anker+Soundcore+Liberty+4+NC" },
      { store: "Croma", price: 7990, offer: "Free Anker Type-C Braided Cable", inStock: true, url: "https://www.croma.com/searchB?q=Soundcore%20Liberty%204" },
      { store: "JioMart", price: 8290, offer: "₹500 cashback with UPI", inStock: true, url: "https://www.jiomart.com/search/Liberty%204%20NC" }
    ]
  },
  {
    id: "marshall-minor-iv",
    slug: "marshall-minor-iv",
    name: "Marshall Minor IV True Wireless Earbuds (Marshall Signature Sound / 30+ Hours / Bluetooth LE)",
    brand: "Marshall",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "marshall", "minor-iv", "rock-audio", "leatherette", "vintage"],
    status: "In Stock",
    score: 92,
    launchedOn: "16 Apr 2024",
    updatedAt: new Date().toISOString(),
    mrp: 14999,
    specs: {
      anc: "Open-fit acoustic design (No ANC / Natural environmental awareness)",
      batteryLife: "Up to 7 Hours on buds (30+ Hours total with wireless charging case)",
      drivers: "12mm Custom-tuned Dynamic Drivers with Marshall Signature Sound",
      connectivity: "Bluetooth 5.3 LE Audio-ready | Multipoint Connectivity | Marshall Bluetooth App",
      waterResistance: "IPX4 Water Resistant"
    },
    pros: ["Iconic textured black leatherette finish with knurled brass details", "Open-fit design sits gently in the ear without clogging the ear canal", "Signature rock-and-roll guitar tuning with crisp acoustic attack"],
    cons: ["No Active Noise Cancellation due to open-fit design", "Sub-bass roll-off compared to sealed in-ear tips"],
    expertVerdict: "Timeless vintage Marshall aesthetic meeting modern Bluetooth LE audio, crafted for lovers of rock, jazz, and open-ear comfort.",
    stores: [
      { store: "Amazon", price: 11999, offer: "₹1,500 instant discount with Bank Cards", inStock: true, url: "https://www.amazon.in/s?k=Marshall+Minor+IV&tag=teachunder-21" },
      { store: "Flipkart", price: 12499, offer: "₹1,000 off on Axis Bank", inStock: true, url: "https://www.flipkart.com/search?q=Marshall+Minor+IV" },
      { store: "Croma", price: 12990, offer: "Free Marshall Guitar Pick Keyring", inStock: true, url: "https://www.croma.com/searchB?q=Marshall%20Minor%20IV" },
      { store: "JioMart", price: 13490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Marshall%20Minor%20IV" }
    ]
  },
  {
    id: "sennheiser-momentum-true-wireless-4",
    slug: "sennheiser-momentum-true-wireless-4",
    name: "Sennheiser Momentum True Wireless 4 (Lossless Audio / Adaptive ANC / Auracast / 30H)",
    brand: "Sennheiser",
    category: "audio",
    categoryLabel: "Wireless Earbuds",
    tags: ["earbuds", "sennheiser", "momentum-4", "lossless", "audiophile", "aptx-lossless"],
    status: "In Stock",
    score: 96,
    launchedOn: "15 Feb 2024",
    updatedAt: new Date().toISOString(),
    mrp: 29990,
    specs: {
      anc: "Next-Gen Adaptive Active Noise Cancellation with Auto Wind Mitigation",
      batteryLife: "Up to 7.5 Hours on buds (30 Hours total with premium fabric case) | Qi Wireless",
      drivers: "7mm TrueResponse Transducers engineered in Germany",
      connectivity: "Bluetooth 5.4 | Qualcomm aptX Lossless & LE Audio with Auracast Broadcast",
      waterResistance: "IP54 Dust and Splash Resistance"
    },
    pros: ["German TrueResponse 7mm dynamic transducers produce unrivaled acoustic transparency", "Qualcomm aptX Lossless bit-for-bit uncompressed studio sound", "Luxurious textured woven fabric charging case with Qi wireless charging"],
    cons: ["Premium flagship pricing", "Adaptive ANC is very good but slightly behind Bose in raw train engine suppression"],
    expertVerdict: "The undisputed gold standard for wireless audiophile sound quality, offering bit-for-bit lossless clarity and German acoustic mastery.",
    stores: [
      { store: "Amazon", price: 24990, offer: "₹3,000 instant bank discount on credit cards", inStock: true, url: "https://www.amazon.in/s?k=Sennheiser+Momentum+True+Wireless+4&tag=teachunder-21" },
      { store: "Flipkart", price: 25990, offer: "₹2,000 off on SBI Card", inStock: true, url: "https://www.flipkart.com/search?q=Sennheiser+Momentum+True+Wireless+4" },
      { store: "Croma", price: 26990, offer: "Free Sennheiser Cleaning & Maintenance Kit", inStock: true, url: "https://www.croma.com/searchB?q=Sennheiser%20Momentum%204" },
      { store: "JioMart", price: 27490, offer: "5% cashback on JioPay", inStock: true, url: "https://www.jiomart.com/search/Sennheiser%20Momentum%204" }
    ]
  }
];

const catalog = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const existingSlugs = new Set(catalog.products.map(p => p.slug));

let addedCount = 0;
for (const p of newAudio) {
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
console.log(`Successfully added ${addedCount} audio products! Total products: ${catalog.products.length}`);
