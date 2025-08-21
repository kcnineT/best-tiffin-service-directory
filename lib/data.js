import rawMumbai from '@/data/listings.mumbai.raw.json';
import rawPune from '@/data/listings.pune.raw.json';
import rawBlr from '@/data/listings.bengaluru.raw.json';
import citiesCfg from '@/data/cities.json';

// Locality lists for each city to guess area from street or city name
const CITY_LOCALITIES = {
  mumbai: [
    "Andheri", "Andheri East", "Andheri West", "Bandra", "Khar", "Santacruz", "Vile Parle", "Juhu", "Goregaon", "Malad", "Kandivali", "Borivali", "Dahisar", "Jogeshwari", "Powai", "Ghatkopar", "Vikhroli", "Bhandup", "Mulund", "Kurla", "Sion", "Wadala", "Dadar", "Mahim", "Worli", "Lower Parel", "Parel", "Byculla", "Fort", "Colaba", "Chembur", "Mira Bhayandar", "Navi Mumbai", "Vashi", "Ghansoli", "Airoli", "Koparkhairane", "Thane", "Thane West", "Thane East", "Parel", "Marol"
  ],
  pune: [
    "Kothrud", "Hinjewadi", "Hinjawadi", "Wakad", "Baner", "Balewadi", "Koregaon Park", "KP", "Kalyani Nagar", "Camp", "Magarpatta", "Viman Nagar", "Hadapsar", "Aundh", "Pashan", "Yerawada"
  ],
  bengaluru: [
    "Indiranagar", "Koramangala", "Whitefield", "HSR", "HSR Layout", "Jayanagar", "JP Nagar", "BTM", "Yelahanka", "Hebbal", "Marathahalli", "Bellandur", "Electronic City", "Malleshwaram", "Rajajinagar", "HSR Layout"
  ]
};

// Placeholder images (real food shots from Unsplash)
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604908176997-431609c44b7b?w=1200&q=60&auto=format&fit=crop"
];

function slugify(input) {
  return (input || "")
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizePhone(raw) {
  if (!raw) return null;
  const digits = String(raw).replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return null;
  return "+91" + digits;
}

function maskPhone(e164) {
  if (!e164) return null;
  const d = e164.replace(/\D/g, "").slice(-10);
  if (d.length !== 10) return null;
  return `(+91) ${d.slice(0,2)}xx-xx-${d.slice(6)}`;
}

function extractArea(street, cityName, cityKey) {
  const hay = `${street || ""} ${cityName || ""}`.toLowerCase();
  const dict = CITY_LOCALITIES[cityKey] || [];
  for (const k of dict) {
    if (hay.includes(k.toLowerCase())) return k;
  }
  // fallback: return cityName capitalized
  return cityName || (cityKey.charAt(0).toUpperCase() + cityKey.slice(1));
}

function validateWebsite(url) {
  if (!url) return null;
  let u = url.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  try { new URL(u); return u; } catch { return null; }
}

function extractTags(title, category) {
  const t = `${title || ""} ${category || ""}`.toLowerCase();
  const diet = new Set();
  const cuisine = new Set();
  if (/jain/.test(t)) diet.add("Jain");
  if (/vegan/.test(t)) diet.add("Vegan");
  if (/(^|)veg(etable|)/.test(t)) diet.add("Veg");
  if (/non[-\s]?veg|chicken|mutton|fish|egg/.test(t)) diet.add("Non-Veg");
  if (/south indian|idli|dosa|sambar/.test(t)) cuisine.add("South Indian");
  if (/north indian|roti|sabzi|dal/.test(t)) cuisine.add("North Indian");
  if (/gujarati|undhiyu|thepla/.test(t)) cuisine.add("Gujarati");
  if (/maharashtrian|poha|sabudana|kolhapuri/.test(t)) cuisine.add("Maharashtrian");
  if (/karnataka|udupi|bisi bele|ragi/.test(t)) cuisine.add("Karnataka");
  return { diet: Array.from(diet), cuisine: Array.from(cuisine) };
}

function toDescription(name, area, diet, cuisine, cityName) {
  const d = diet?.[0] ? `${diet[0]} ` : "";
  const c = cuisine?.[0] ? `${cuisine[0]} ` : "";
  const locality = area || cityName;
  return `Homestyle ${d || c || ""}tiffin service delivering fresh meals across ${locality}, ${cityName}. Simple flavours and reliable portions.`;
}

function mapRowToListing(row, idx, cityKey, cityName) {
  if (!row?.title) return null;
  const name = String(row.title).trim();
  const rating = typeof row.totalScore === "number" ? Math.max(0, Math.min(5, row.totalScore)) : null;
  const reviews = Number.isFinite(row.reviewsCount) ? row.reviewsCount : null;
  const address = [row.street, row.city, row.state].filter(Boolean).join(", ");
  const area = extractArea(row.street, row.city, cityKey);
  const phone = normalizePhone(row.phone);
  const website = validateWebsite(row.website);
  const mapsUrl = row.url && row.url.startsWith("http") ? row.url : null;
  const { diet, cuisine } = extractTags(name, row.categoryName);
  const slug = slugify(`${name}-${area}`);
  const image = PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];
  const description = toDescription(name, area, diet, cuisine, cityName);
  return {
    id: `${cityKey}__${slug}`,
    cityKey,
    cityName,
    name,
    slug,
    rating,
    reviews,
    area,
    address,
    phone,
    phoneMasked: maskPhone(phone),
    website,
    mapsUrl: mapsUrl || `https://www.google.com/maps?q=${encodeURIComponent(address)}`,
    category: row.categoryName || null,
    dietTags: diet.length ? diet : ["Unknown"],
    cuisineTags: cuisine,
    image,
    description
  };
}

function allRaw() {
  return [
    ['mumbai','Mumbai', rawMumbai],
    ['pune','Pune', rawPune],
    ['bengaluru','Bengaluru', rawBlr]
  ];
}

export function getCities() {
  return citiesCfg;
}

export function getAllListings(cityKey) {
  const rows = allRaw();
  const out = [];
  rows.forEach(([ck, cn, arr]) => {
    if (cityKey && ck !== cityKey) return;
    arr.forEach((row, i) => {
      const mapped = mapRowToListing(row, i, ck, cn);
      if (mapped) out.push(mapped);
    });
  });
  // de-dup within each city based on name+phone or name+address
  const seen = new Set();
  const deduped = [];
  for (const x of out) {
    const key = (x.cityKey + '|' + x.name + '|' + (x.phone || x.address || '')).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(x);
  }
  return deduped;
}

export function getListingBySlug(cityKey, slug) {
  return getAllListings(cityKey).find(l => l.slug === slug) || null;
}

export function getAreas(cityKey) {
  const s = new Set(getAllListings(cityKey).map(l => l.area));
  return Array.from(s).sort();
}

export function getDiets(cityKey) {
  const s = new Set();
  getAllListings(cityKey).forEach(l => (l.dietTags || []).forEach(d => s.add(d)));
  return Array.from(s).filter(d => d !== 'Unknown').sort();
}

export function getCategories(cityKey) {
  const s = new Set(getAllListings(cityKey).map(l => l.category).filter(Boolean));
  return Array.from(s).sort();
}

export function getFeatured(cityKey) {
  const all = getAllListings(cityKey);
  const top = all.filter(d => (d.rating || 0) >= 4.6).sort((a,b)=> (b.reviews||0)-(a.reviews||0));
  return (top.length ? top : all.slice().sort((a,b)=> (b.reviews||0)-(a.reviews||0))).slice(0,3);
}