# Paradise Seafood — Website Build Brief

## Project Overview

Build a production Next.js website for Paradise Seafood (paradiseseafood.co.uk), London's premium B2B seafood wholesaler. The site replaces a basic WordPress site where products are hidden in downloadable PDFs.

**Two core objectives:**
1. **SEO dominance** — Every product gets its own indexable page. Target: #1 for "seafood wholesaler London" and hundreds of long-tail product queries.
2. **AI product checker** — A Claude-powered search bar where customers ask natural language questions about products, with WhatsApp fallback for unlisted items.

## Business Details

- **Name:** Paradise Seafood Ltd
- **Founded:** 2007
- **Location:** Unit 17, Fishers Industrial Estate, Wiggenhall Road, Watford WD18 0FN
- **Phone:** +44 (0) 207 859 4099
- **Email:** inquiries@paradiseseafood.co.uk
- **Industry:** B2B Seafood Wholesale
- **Customers:** Fine dining restaurants, hotels, caterers, Premier League training grounds
- **Delivery:** Central London (Mon-Sat), Greater London (Mon-Sat), Birmingham (Tue/Thu/Sat), Outside M25 (expanding)
- **Scale:** 500+ products, 2,500+ pallet frozen storage, daily fresh deliveries Mon-Sat

## Tech Stack

- **Framework:** Next.js 14+ (App Router) — SSR for SEO
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Product Data:** `/data/products.json` (585 products, provided)
- **AI Backend:** Claude API via Next.js API route (product catalogue in system prompt)
- **WhatsApp:** wa.me deep links with pre-filled messages
- **Analytics:** Google Analytics 4 + Google Search Console
- **Domain:** paradiseseafood.co.uk

## Product Data

The file `products.json` contains 585 structured products with this schema:

```json
{
  "id": "fresh-cod-loin-msc-140-160",
  "name": "Cod Loin MSC 140/160g",
  "slug": "cod-loin-msc-140-160g",
  "category": "Fresh Fish",
  "subcategory": "Cod",
  "format": "Loin",
  "size_grade": "140/160g",
  "unit": "EACH",
  "origin": "UK/Iceland",
  "certifications": ["MSC"],
  "fresh_or_frozen": "fresh",
  "case_packing": "",
  "keywords": ["cod", "loin", "sustainable", "msc"]
}
```

**Categories:** Fresh Fish (288), Shellfish (90), Smoked Fish (48), Deli (62), Frozen Seafood (97)

## Design Direction

Reference the prototype file `prototype.jsx` for the approved design. Key design decisions:

- **Colour palette:** Dark navy `#060a12` background, ocean teal `#0a7e8c` accents, gold `#c9a84c` highlights, light text `#f0f4f8`
- **Typography:** Cormorant Garamond (serif) for headings, DM Sans (sans-serif) for body
- **Tone:** Premium, editorial, confident. Think luxury food brand, not commodity marketplace.
- **Icons:** SVG line icons throughout, no emojis
- **No external images for now:** Use CSS gradients, patterns, and SVG illustrations. Professional photography comes later.
- **Google Fonts import:**
  ```
  Cormorant Garamond: 400, 400i, 600, 700
  DM Sans: 400, 500, 600, 700
  ```

## Site Architecture

### Primary Pages
- `/` — Homepage (hero with AI search bar, trust stats, category cards, why paradise, delivery areas, Google reviews, CTA)
- `/about` — About Paradise Seafood (story, team, values)
- `/why-paradise` — Key differentiators
- `/products` — Full filterable product catalogue
- `/delivery` — Delivery areas overview
- `/delivery/central-london` — Central London delivery details
- `/delivery/greater-london` — Greater London details
- `/delivery/birmingham` — Birmingham details
- `/delivery/outside-m25` — Extended coverage
- `/open-account` — Trade account application form
- `/contact` — Contact page with WhatsApp, phone, map
- `/blog` — Content hub (Phase 2)

### Product Pages (auto-generated from data)
- `/products/fresh-fish` — Fresh fish category page
- `/products/frozen-seafood` — Frozen category
- `/products/shellfish` — Shellfish category
- `/products/smoked-fish` — Smoked category
- `/products/deli` — Deli category
- `/products/fresh-fish/cod` — All cod products (subcategory page)
- `/products/fresh-fish/cod/cod-loin-msc-140-160g` — Individual product page

**Every product page must have:** unique `<title>`, unique `<meta description>`, schema.org/Product markup, breadcrumbs, related products, WhatsApp order button.

## AI Product Checker — `/api/product-check`

### Architecture
A Next.js API route that calls the Claude API with the full product catalogue in the system prompt.

### System Prompt Structure
```
You are Paradise Seafood's product assistant. You help customers find products from our catalogue.

RULES:
- If products match the query, return them as structured JSON
- If the query is a dish name (e.g. "lobster thermidor"), identify it as a dish and suggest the raw ingredients from our catalogue
- If no products match, set found=false so we can offer WhatsApp fallback
- Be helpful and knowledgeable about seafood
- Never make up products that aren't in the catalogue

PRODUCT CATALOGUE:
[... full JSON catalogue embedded here ...]
```

### Response Schema
```json
{
  "found": true,
  "type": "product_match" | "dish_suggestion" | "not_found",
  "message": "We carry 6 monkfish products:",
  "products": [...matching product objects...],
  "whatsapp_query": null | "the original query for WhatsApp prefill"
}
```

### WhatsApp Fallback
When `found=false`, the frontend shows: "We don't currently list that in our catalogue. Our range changes regularly — tap below to ask our team directly." Button opens `wa.me/442078594099?text=Hi Paradise Seafood, I'm looking for [query]. Do you carry this?`

### Query Logging
Log every query with: timestamp, query text, match status, products returned, WhatsApp fallback triggered. Store in a simple JSON file or Vercel KV for market intelligence.

## SEO Requirements

### Technical
- Server-side rendering on ALL pages
- Dynamic `<title>` and `<meta description>` per page, auto-generated from product data
- `<title>` format: `{Product Name} | Paradise Seafood — London's Premium Seafood Wholesaler`
- Schema.org markup: `LocalBusiness` on all pages, `Product` on product pages, `BreadcrumbList` for navigation
- Auto-generated XML sitemap at `/sitemap.xml`
- `robots.txt` allowing all crawlers
- Canonical tags on every page
- Next.js `<Image>` component with WebP, lazy loading, proper alt text
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Mobile-first responsive design
- 301 redirects from old WordPress URLs (handle `/our-products/`, `/paradise4home/`, `/why-paradise/`, `/contact-us/`, `/open-an-account/`)

### Content SEO
- Category pages have 200-300 word introductions with target keywords
- Subcategory pages (e.g. /products/fresh-fish/cod) have species-specific copy
- Delivery area pages have unique content about service in each area
- Internal linking: every product links to its category, subcategory, and related products

### Target Keywords
- **Tier 1:** seafood wholesaler London, fresh fish supplier London, frozen seafood wholesale London
- **Tier 2:** buy fresh cod wholesale London, king prawns supplier London, live lobster wholesale London, halibut supplier Birmingham
- **Tier 3:** MSC certified cod supplier London, sushi grade tuna wholesale UK, diver scallops wholesale London
- **Tier 4:** seafood supplier Birmingham, fish wholesale outside M25

## Page Sections (Homepage)

In this exact order:
1. **Hero** — Dark background with CSS radial gradients, gold wave SVG accent. Headline "Supplying London's Finest Kitchens". AI search bar as primary CTA with example query chips below.
2. **Trust Bar** — Est. 2007 | 500+ Products | 6 Days Fresh Deliveries | 2,500+ Pallet Storage
3. **Product Categories** — 5 cards with CSS gradient backgrounds and faded SVG icons (Fresh Fish, Shellfish, Frozen, Smoked, Deli)
4. **Why Paradise** — 6 cards with SVG icons: Superior Quality, Fresh Is Always Fresh, Scale & Reliability, Expanding Reach, Industry Expertise, Competitive Pricing
5. **Delivery Areas** — 4 cards: Central London, Greater London, Birmingham, Outside M25 (with CORE/NEW badges)
6. **Google Reviews** — 3 real reviews: Sara Yassine (5 stars), Jai Chan (5 stars), Gunalingam Jegathas (5 stars). Google "G" logo on each. "See All Reviews" link.
7. **CTA** — "Ready to Elevate Your Menu?" with Open Account and WhatsApp buttons
8. **Footer** — 4 columns: brand, products, company links, contact details with SVG icons

## Google Reviews (real data)

```json
[
  {"name": "Sara Yassine", "date": "December 2020", "rating": 5, "text": "Fantastic service, quality and reasonable prices. I highly recommend buying your seafood from them. I cannot wait to try all their products. The best seafood I have had!"},
  {"name": "Jai Chan", "date": "December 2020", "rating": 5, "text": "First time ordering from them. Cooked the lobster in ginger & spring onion Chinese style and white wine with cream mussels, it was very fresh and the whole experience was amazing."},
  {"name": "Gunalingam Jegathas", "date": "December 2020", "rating": 5, "text": "Amazing, delivery was on time and the overall experience was great. I would strongly recommend buying seafood from them especially black cod. 10/10"}
]
```

## Build Order

### Phase 1: Foundation (build this first)
1. Scaffold Next.js project with App Router + Tailwind
2. Create shared layout (nav, footer) with the approved design
3. Build homepage with all 7 sections
4. Build product catalogue pages (category → subcategory → product) auto-generated from JSON
5. Build AI product checker API route + frontend component
6. Build delivery area pages
7. Build contact page with WhatsApp integration
8. Build trade account signup form
9. SEO: meta tags, schema.org, sitemap, robots.txt, 301 redirects
10. Deploy to Vercel

### Phase 2: Content & Polish (later)
- Blog/content section
- Seasonal fish calendar
- Species guide pages
- AI query logging dashboard
- Professional photography swap-in
- Performance optimisation

## Important Notes

- This is a B2B site — no shopping cart, no prices on site. Ordering is via WhatsApp or phone.
- No Paradise4Home section (home delivery arm exists but is not part of this site).
- No emojis anywhere. Use SVG icons only.
- The approved prototype is in `prototype.jsx` — match its look and feel exactly.
- WhatsApp number for all links: `442078594099`
- The products.json file is the single source of truth for all product data. Both the catalogue pages and the AI system prompt read from this file.

---

## UPDATED: Product Data Source — Google Sheets (replaces static JSON)

Instead of reading from a static JSON file, the site reads product data from a published Google Sheet CSV. This lets the Paradise Seafood team update products without touching code.

### Setup
- Google Sheet with columns: active, name, category, subcategory, format, size_grade, unit, origin, certifications, fresh_or_frozen, case_packing, description, image_key
- Published as CSV via File → Share → Publish to web
- Next.js fetches the CSV at build time using `fetch()` in `generateStaticParams` and page server components
- Parse CSV using Papaparse or a simple split
- Vercel Deploy Hook triggers a rebuild when the sheet is edited (via Google Apps Script)

### Caching Strategy
- Fetch CSV at build time (SSG) — pages are static and fast
- Revalidate every 1 hour as a fallback: `export const revalidate = 3600`
- Manual rebuild via Vercel Deploy Hook when products change

### The AI Product Checker also reads from this data
- On each API call, read the cached product data
- Embed the full catalogue in the Claude system prompt
- This means the AI always knows about the latest products

---

## UPDATED: Product Images — Gemini-Generated

Product images are AI-generated via the Gemini API, one image per subcategory/species (not per individual product). Stored in `/public/images/products/`.

### Image Mapping
Each product has an `image_key` field (lowercase subcategory name). The site maps this to the image file:
- `image_key: "cod"` → `/images/products/cod.jpg`
- `image_key: "lobster"` → `/images/products/lobster.jpg`
- `image_key: "smoked-salmon"` → `/images/products/smoked-salmon.jpg`

### Fallback
If no image exists for a subcategory, display the CSS gradient card with SVG icon (same as the current prototype).

### Image Style
All images follow the same style: product on dark slate board with "PARADISE SEAFOOD" engraved in gold, premium restaurant kitchen background, warm copper lighting, professional food photography, dark moody atmosphere.

---

## NEW SECTION: Chef Quiz — /quiz

A "How Well Do You Know Your Seafood?" quiz for chefs. This is the launch marketing campaign and lead generation tool.

### URL: /quiz

### Flow
1. Landing page: "Think You Know Seafood? Prove It." — Paradise Seafood branding, hero image, "Start Quiz" button
2. 10 multiple-choice questions, one at a time, with product images as backgrounds
3. Score reveal page: "You scored X/10 — [Title]!"
   - 0-3: "Kitchen Porter" 
   - 4-6: "Commis Chef"
   - 7-8: "Sous Chef"
   - 9-10: "Executive Chef"
4. CTA: "Enter your WhatsApp number to receive your result and claim your free [gift]"
5. WhatsApp number stored in a Google Sheet for follow-up
6. Share buttons: "Challenge your kitchen team" with auto-generated share link

### Quiz Questions
```json
[
  {"q": "What size grade means 'under 5 per kg'?", "options": ["U5", "5/0", "Sub-5", "Grade 5"], "answer": 0},
  {"q": "What does MSC certification stand for?", "options": ["Marine Safety Commission", "Marine Stewardship Council", "Maritime Seafood Council", "Marine Standards Certificate"], "answer": 1},
  {"q": "Which country are Fines de Claire oysters from?", "options": ["UK", "Ireland", "France", "Spain"], "answer": 2},
  {"q": "What's the Japanese name for yellowtail?", "options": ["Maguro", "Hamachi", "Unagi", "Hirame"], "answer": 1},
  {"q": "What cut of tuna is the fattiest belly portion?", "options": ["Akami", "Chutoro", "Toro", "Saku"], "answer": 2},
  {"q": "What does IQF stand for?", "options": ["Instant Quick Freeze", "Individually Quick Frozen", "Industrial Quality Fish", "International Quality Frozen"], "answer": 1},
  {"q": "Langoustines are also known as?", "options": ["Rock Lobster", "Dublin Bay Prawns", "Tiger Prawns", "Crevettes"], "answer": 1},
  {"q": "Which fish is also called 'rock eel' or 'huss'?", "options": ["Conger Eel", "Dogfish", "Monkfish", "Catfish"], "answer": 1},
  {"q": "What makes diver-caught scallops premium?", "options": ["They're bigger", "Less environmental damage and grit", "They're from deeper water", "They're always organic"], "answer": 1},
  {"q": "What does 'H&G' mean in fish preparation?", "options": ["Halved and Grilled", "Hand-picked and Graded", "Headed and Gutted", "Hooked and Gathered"], "answer": 2}
]
```

### Technical
- Built as a React component within the Next.js app
- No login required
- WhatsApp numbers stored via a simple API route that appends to a Google Sheet
- Share link generates a URL with UTM parameters for tracking
- Quiz results page includes a CTA to explore the product catalogue and try the AI checker

### SEO
- Meta title: "How Well Do You Know Your Seafood? | Paradise Seafood Quiz"
- Meta description: "Test your seafood knowledge with London's premium seafood wholesaler. 10 questions, instant results. Challenge your kitchen team!"
- Open Graph image: A branded quiz card for social sharing

---

## NEW: Gallery Section on Homepage

Add a gallery section between "Product Categories" and "Why Paradise" on the homepage.

### Design
- Section title: "A Selection of What We Do" (subhead: "Premium seafood, beautifully presented")
- Grid of 6-9 product images from the Gemini-generated library
- Each image card has a label (e.g. "Sushi Grade Tuna Loin", "Live Native Lobster")
- Dark card style matching the rest of the site
- Clicking an image card navigates to that product's subcategory page

---

## CRITICAL UPDATE: Exact Brand Colours (from official logo SVGs)

The prototype used approximate colours. These are the EXACT values from the Paradise Seafood logo files. USE THESE EVERYWHERE:

```
--brand-dark: #0C1117        (primary background — NOT #060a12)
--brand-gold: #B89B5E        (gold accent — NOT #c9a84c)
--brand-cream: #F0ECE2       (primary text on dark — NOT #f0f4f8)
--brand-light-bg: #F5F2EB    (light mode background, used in light logo)
--brand-muted: #94a3b8       (secondary text — keep as-is)
--brand-teal: #0A7E8C        (teal accent — keep as-is)
```

The typography in the logo is Georgia serif with wide letter-spacing. The site should use Georgia (not Cormorant Garamond) for the brand name in the nav and hero, but Cormorant Garamond is fine for section headings since it's a similar serif family.

## CRITICAL UPDATE: Official Logo Files

Two SVG logo files are provided in the project root:
- `paradise_seafood_dark_logo.svg` — for use on dark backgrounds (cream text, gold accents)
- `paradise_seafood_light_logo.svg` — for use on light backgrounds (dark text, gold accents)

### Logo Usage in the Site
- **Navigation bar:** Use a simplified version — just "PARADISE SEAFOOD" text in the logo font style with "EST. 2007" above it in gold. The full logo with icons is too complex for the nav.
- **Footer:** Use the full dark logo SVG
- **Loading/splash states:** Full dark logo
- **About page:** Both versions
- **Favicon:** Extract just the fish icon from the logo

### Seafood Icons from the Logo
The logo contains four hand-drawn seafood icons: fish, crab, lobster, prawn. These should be extracted and used as design elements throughout the site:
- Section dividers (a subtle line with one of the icons centered)
- Category card accents (fish icon for Fresh Fish, crab for Shellfish, etc.)
- Loading animation (rotating through the four icons)
- Footer decoration
- Quiz page backgrounds
- 404 page illustration

---

## NEW FEATURE: "Request Price List" CTA

Add alongside the WhatsApp CTA on product pages and the homepage. This captures hotel groups and corporate buyers who prefer email over WhatsApp.

### Button
Text: "Request Full Price List"
Style: Outlined button in gold (same style as the phone number button)

### Flow
1. Button opens a minimal modal/form
2. Fields: Business Name, Contact Name, Email, Phone (optional), Which categories are you interested in? (checkboxes)
3. Submit sends an email to inquiries@paradiseseafood.co.uk with the details
4. Also logs to a simple data store for follow-up tracking
5. Confirmation message: "We'll send your price list within 2 hours during business hours."

### Placement
- Homepage hero section (third CTA after WhatsApp and phone)
- Every product category page
- Every subcategory/species page
- Contact page

---

## NEW FEATURE: Seasonal Availability Badges

Add a `seasonal` field to the product data that can be: "year-round", "seasonal", or "limited".

### Display
- **Year Round:** No badge needed (default assumption)
- **Seasonal:** Gold badge: "Seasonal" with a small calendar icon
- **Limited:** Amber/orange badge: "Limited Availability"

### Where it shows
- Product cards in the catalogue
- Individual product pages (in the specs grid)
- AI product checker results

The Google Sheet / JSON can include this field. Default to "year-round" if blank.

---

## DESIGN SYSTEM: Detailed Specifications for Build Quality

### Typography Scale
```
Hero headline:       Cormorant Garamond, 700, clamp(38px, 6vw, 68px), line-height 1.08
Section headline:    Cormorant Garamond, 700, clamp(30px, 4vw, 48px), line-height 1.15
Card heading:        Cormorant Garamond, 700, 22-28px
Body large:          DM Sans, 400, 17-18px, line-height 1.6-1.7
Body:                DM Sans, 400, 14-15px, line-height 1.6
Caption:             DM Sans, 500, 11-13px, uppercase, letter-spacing 1.5-5px
Nav links:           DM Sans, 500, 13px, uppercase, letter-spacing 0.5px
Brand name in nav:   Georgia, 700+400, 24-26px, letter-spacing -0.5px
```

### Spacing System
```
Section padding:     100px vertical, 24px horizontal
Container max-width: 1200px, centered
Card padding:        24-36px
Card border-radius:  12-16px
Card border:         1px solid rgba(255,255,255,0.05-0.06)
Card hover:          translateY(-4px), box-shadow 0 16px 48px rgba(0,0,0,0.5)
Grid gaps:           12-20px
```

### Interactive States
```
Gold buttons:        linear-gradient(135deg, #B89B5E, #96793E)
  Hover:             translateY(-2px), box-shadow 0 8px 30px rgba(184,155,94,0.3)
WhatsApp buttons:    #25D366 background
  Hover:             #1da851, translateY(-2px), box-shadow 0 8px 25px rgba(37,211,102,0.3)
Outline buttons:     transparent bg, 1px solid rgba(184,155,94,0.4), gold text
  Hover:             rgba(184,155,94,0.08) background
Cards:               translateY(-4px) on hover, border-color transition
Nav links:           color transition to #B89B5E on hover
```

### Background Treatments
```
Hero:                Radial gradients (teal at top, gold at bottom-left, blue at right)
                     SVG wave accent at bottom in gold, opacity 0.04
Between sections:    1px solid rgba(255,255,255,0.04-0.05) borders
Category cards:      Linear gradients per category (see prototype)
Section backgrounds: Subtle radial gradients, never flat #0C1117
Footer:              rgba(0,0,0,0.3) overlay
```

### Animation
```
Page load:           staggered fadeSlideUp (opacity 0→1, translateY 20px→0)
                     0.4-0.6s ease, stagger delay 0.06-0.1s per element
Hover transitions:   0.3-0.4s ease
Search loading:      Pulsing gold dot, 1s ease infinite
Counters:            Animated count-up on scroll intersection, 2s duration
```

### DO NOT
- Use emojis anywhere
- Use Inter, Roboto, Arial, or system fonts
- Use bright/saturated colours
- Use white (#FFFFFF) backgrounds
- Use generic placeholder text
- Create boxy, evenly-spaced layouts — use asymmetry and generous negative space
- Make it look like a generic template or "AI-generated" design
- Forget hover states on interactive elements
- Use thin light-grey text that's hard to read — muted text should be #94a3b8 minimum

### MUST DO
- Every page must feel like a premium food brand website
- Use the four seafood icons from the logo as design elements
- Generous whitespace between sections (100px padding)
- Subtle background gradients to create depth — never flat backgrounds
- Gold (#B89B5E) as the primary accent colour, used sparingly for maximum impact
- Dark moody atmosphere throughout
- All CTAs must include WhatsApp as the primary action
- Mobile-first: every section must work beautifully on phone screens
- Smooth scroll behaviour
- Consistent border-radius (6px buttons, 12-16px cards, 14-16px panels)

---

## QUALITY BENCHMARKS

The finished website should look and feel like these references:
- **Natoora** (natoora.co.uk) — premium food supplier, editorial design, dark photography
- **The Fish Society** (thefishsociety.co.uk) — premium seafood e-commerce
- **Dishoom** (dishoom.com) — restaurant site with premium brand feel
- **Ottolenghi** (ottolenghi.co.uk) — food brand with editorial design quality

The site should NOT look like:
- A generic WordPress theme
- A Shopify template
- A basic business listing
- Anything that feels mass-produced or templated
- Anything with stock photography watermarks or low-quality images

If any section looks generic, bland, or template-like — redesign it with more personality, texture, and the Paradise Seafood brand identity.
