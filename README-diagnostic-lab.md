# Diagnostic Lab Website

Mobile-first website for a diagnostic lab and health checkup centre. Visitors search for a test, see the price, compare packages, then call, WhatsApp, or request home sample collection. Built as a **reusable template**: each lab changes only the data files and brand colours.

## Stack (fixed — do not add others)

- Next.js (App Router), **JavaScript only** (`.js`/`.jsx`, no TypeScript)
- Tailwind CSS
- Framer Motion (only package added beyond the defaults)
- Data: local JS files in `/data`. No database. One API route only for the booking request (Step 6).

```bash
npx create-next-app@latest diagnostic-lab --js --tailwind --app --eslint --no-src-dir --import-alias "@/*"
cd diagnostic-lab && npm i framer-motion
```

## Rules for the AI agent (token-saving)

1. Build in the order of **Build Steps** below. One step per prompt. Do not re-read the whole repo.
2. Only edit the files named in the current step. No refactors, no extra features, no extra libraries.
3. Reply with code only. No long explanations.
4. Reuse components. Never duplicate markup.
5. All lab details come from `data/site.js`. Never hardcode them in components.
6. **Medical content safety:** never invent prices, test details, preparation instructions, turnaround times, accreditations, discounts, reviews, or "100% accurate" claims. Use `null` and the fallback text for anything unverified. Never interpret results or suggest a test is right for everyone.
7. Mobile first: write base classes for ~375px, then enhance with `md:` / `lg:`.

## Design tokens

Add to `tailwind.config.js` under `theme.extend.colors`. These are defaults; if the lab already has brand colours, use those instead.

| Name | Hex | Use |
|---|---|---|
| `mist` | `#F4F8F5` | page background |
| `sage` | `#244C40` | headings, dark sections |
| `care` | `#2F8068` | buttons, links, accents |
| `ink` | `#26352F` | body text |
| `soft` | `#E8F1EB` | card and section surfaces |
| `white` | `#FFFFFF` | cards |

Font: **Inter** only, via `next/font/google`.

Style: calm and reassuring. Generous spacing, subtle borders, soft green surfaces, consistent button shape. No gradients on headings, no heavy shadows, no dramatic medical imagery, no all-blue look, no stock doctor photos. Use real lab photos when available.

## Mobile-first requirements

- No horizontal scroll at 320px; touch targets at least 44px high.
- Compact header: logo, menu icon, and a visible Call or Book action. Menu closes after a link is tapped.
- The hero has a prominent **test search** field.
- Category cards: 2 columns. Package prices and included tests must be easy to scan.
- Filters open in a **bottom sheet** on mobile (Apply and Clear), sidebar on desktop.
- Compact sticky bottom bar (Call + WhatsApp + Book) on mobile only, with page bottom padding so it never covers content.
- No auto-rotating carousels or hero videos. Reserve image space (`aspect-*`) to avoid layout jumps.

## Folder structure

```
app/
  layout.js
  page.js                      Home
  tests/page.js                All tests + search
  tests/[slug]/page.js         Test detail
  packages/page.js
  packages/[slug]/page.js
  home-collection/page.js
  about/page.js
  contact/page.js
  faqs/page.js
  privacy/page.js
  api/booking/route.js         Step 6 only
components/
  Header.jsx  MobileMenu.jsx  Footer.jsx  MobileBookingBar.jsx
  Hero.jsx  TestSearch.jsx  TestCategories.jsx  FeaturedPackages.jsx
  HomeCollection.jsx  WhyChooseUs.jsx  Steps.jsx  Reviews.jsx  LabLocation.jsx
  TestCard.jsx  TestFilters.jsx  PreparationInfo.jsx
  PackageCard.jsx  PackageInclusions.jsx
  BookingForm.jsx  BookingConfirmation.jsx
  Reveal.jsx
data/
  site.js  categories.js  tests.js  packages.js  faqs.js
lib/
  whatsapp.js  formatPrice.js  searchTests.js
public/images/
```

## Data files

**`data/site.js`** (placeholders; confirm all with the lab owner)

```js
export const site = {
  name: "Lab Name",                 // TODO
  tagline: "Know your health. Take the next step.",
  phone: "91XXXXXXXXXX",            // digits only
  whatsapp: "91XXXXXXXXXX",
  address: "TODO verified lab address",
  hours: "TODO",
  mapsUrl: "TODO",
  serviceAreas: [],                 // home collection areas, separate from lab address
  collectionCharge: null,           // number or null
  url: "https://example.com",
};
```

**`data/tests.js`** — 8 dummy entries, same shape:

```js
export const tests = [
  {
    slug: "cbc",
    name: "Complete Blood Count (CBC)",
    synonyms: ["cbc", "complete blood count", "hemogram", "blood count"],
    category: "blood-tests",
    sampleType: null,        // verified only, else null
    price: null,             // number or null → "Confirm price with lab"
    preparation: null,       // verified only, else null → "Confirm test-specific instructions"
    reportTime: null,
    summary: "Measures components of blood including red cells, white cells and platelets.",
  },
];
```

**`data/packages.js`**

```js
export const packages = [
  {
    slug: "essential-checkup",
    name: "Essential Health Checkup",
    description: "TODO verified description",
    price: null,
    testSlugs: ["cbc"],      // test count is calculated from this array, never typed by hand
    popular: false,          // only true if supported by real data
  },
];
```

**`data/categories.js`** — only categories the lab actually offers (e.g. Blood Tests, Diabetes, Thyroid, Vitamins, Liver and Kidney, Infection, Full Body Checkups). Each has `slug`, `title`, `icon`.

## Core helpers

**`lib/whatsapp.js`**

```js
export function whatsappLink({ phone, text }) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
// Example text: `Hi, I'd like to know the price and preparation for ${testName}.`
```

**`lib/formatPrice.js`** — returns `₹ 1,999` (en-IN format) or `"Confirm price with lab"` when `null`.

**`lib/searchTests.js`** — client-side search over `name` and `synonyms` (case-insensitive, partial match, ranked: exact synonym, then name starts-with, then contains). Must find "complete blood count" and "CBC", "hba1c", "tsh", and so on. Empty state: "We couldn't find that test. Contact our lab team for assistance." with Call and WhatsApp buttons.

**`components/Reveal.jsx`** — `"use client"` wrapper with `motion.div`: `initial={{opacity:0,y:16}}`, `whileInView={{opacity:1,y:0}}`, `viewport={{once:true}}`, `transition={{duration:0.4}}`. Use `useReducedMotion()` to skip movement. No other animations except subtle button and card press feedback.

## Build steps (one per prompt)

1. **Setup** — Tailwind tokens, Inter font, `layout.js`, `data/` and `lib/` files, `Reveal.jsx`.
2. **Layout** — `Header`, `MobileMenu`, `Footer`, `MobileBookingBar`. Header nav: Tests, Health Packages, Home Collection, About, Contact, plus a Book a Test action.
3. **Home** — in order: `Hero` (headline "Your health deserves clear answers."; CTAs "Find a Test" and "Book Home Collection"; includes `TestSearch` with placeholder "Search CBC, thyroid, vitamin D…"), `TestCategories`, `FeaturedPackages` (3 to 4), `HomeCollection` (distinct background; "Get tested from the comfort of home."; note that requests are subject to availability and confirmation), `WhyChooseUs` (only verifiable points), `Steps` (select test, contact lab, follow instructions and receive results), `Reviews` (empty structure, no fake reviews), `LabLocation`.
4. **Tests** — `/tests` with search, category filter, `TestCard`, Load more. Card shows name, `category`, price (or fallback), a short summary, preparation text (or "Confirm test-specific instructions"), plus "Book / Ask on WhatsApp". `/tests/[slug]`: name, summary, price and what it includes, what it measures, sample and preparation (if verified), report time (if verified), home collection info, CTA, related tests, FAQs, and a disclaimer: "This information is general and not medical advice. Consult a healthcare professional." Use `generateStaticParams`.
5. **Packages** — `PackageCard` (name, description, price, calculated test count, expandable "View all tests", "Book this package"). `/packages/[slug]` with full inclusions. No "best for men/women" or age-based claims.
6. **Home collection and booking** — `BookingForm` with fields: name, mobile, locality, service (test / package / help choosing), preferred date, notes. Validate on the client and again on the server in `api/booking/route.js`, which for now logs the request and returns success (a TODO hook for email or WhatsApp to the lab). `BookingConfirmation` says "Request received. The lab will contact you to confirm time, availability, price and preparation." **Never** say the appointment is confirmed. Collect no medical history and no uploads.
7. **About, Contact, FAQs, Privacy** — About uses real lab photos. Contact has address, hours, tel link, WhatsApp, and "Get directions". Keep the physical lab address separate from the home-collection service areas.
8. **SEO and polish** — `metadata` per page (unique titles, e.g. "CBC Test Price in {city}"), `MedicalLaboratory`/`LocalBusiness` JSON-LD from `site.js`, canonical URLs, `sitemap.js`, `robots.js`, alt text, Lighthouse mobile check.

## Microcopy

Use specific labels: "Find a Test", "Book this package", "Request Home Collection", "Get directions". Never "Submit". Calm, practical wording, no alarming language.

## Security and privacy

- Collect only the minimum fields listed in Step 6.
- Validate every input server-side. Never expose booking records publicly.
- **No public report-retrieval page** keyed by name or guessable ID. If online reports are needed later, they need proper authentication.
- Add a Privacy page explaining what is collected and why.

## Accessibility checklist

Semantic HTML, one `h1` per page, labelled form fields and icon-only buttons, keyboard-operable menu, search and filter sheet (focus trap, `Esc` closes), sufficient contrast, reduced-motion respected.

## Before launch

- [ ] Replace placeholders in `data/site.js`
- [ ] Add the real test catalogue, approved prices, package inclusions, and verified preparation instructions
- [ ] Confirm home collection areas and charges, and who receives booking requests
- [ ] Real lab photos and genuine, approved reviews
- [ ] Test search, booking form, tel and WhatsApp links on a real Android phone
- [ ] Domain, HTTPS, Google Search Console, link from the Google Business Profile

## Later (only if requested)

Admin panel and database for tests and prices, health guides blog, local service pages, secure online report access.

## Run

```bash
npm run dev      # http://localhost:3000
npm run build
```
