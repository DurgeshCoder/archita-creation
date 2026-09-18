# Architecture & Tech Stack

This document outlines the codebase structure, routing, styling architecture, and component design patterns.

---

## 🏗 Directory Structure

```
archita_creation/
├── app/                        # Next.js App Router
│   ├── about/page.tsx          # Brand story, manufacturing & craftsmanship
│   ├── bedding-sets/page.tsx   # Bedding sets category page
│   ├── bedsheets/page.tsx      # Bedsheets category page
│   ├── blankets/page.tsx       # Blankets category page
│   ├── blog/                   # Blog index & dynamic [slug] reader
│   ├── collections/page.tsx    # Curated collections browser
│   ├── comforters/page.tsx     # Comforters category page
│   ├── contact/page.tsx        # Contact & custom inquiry form
│   ├── dohars/page.tsx         # Dohars category page
│   ├── gallery/page.tsx        # Filterable masonry product gallery
│   ├── products/[id]/page.tsx  # Dynamic static product details
│   ├── privacy/ & terms/       # Legal pages
│   ├── globals.css             # Tailwind v4 theme variables & styles
│   ├── layout.tsx              # Root HTML shell, fonts, navbar & footer
│   ├── page.tsx                # Homepage composition
│   ├── robots.ts & sitemap.ts  # Dynamic SEO search engine files
├── components/                 # Reusable UI & section blocks
├── constants/
│   └── index.ts                # Master static data (Products, Collections, FAQs, Blogs)
├── lib/
│   └── utils.ts                # Utility functions (cn / clsx / tailwind-merge)
├── public/                     # Static media & icons
├── docs/                       # Project documentation
└── next.config.ts              # Next.js export & image configuration
```

---

## 🎨 Design & Styling System

### 1. Palette & Typography
- **Theme Variables (`app/globals.css`):**
  - Primary: `#6A4E42` (Warm Earthy Brown)
  - Secondary: `#B88A5A` (Rich Muted Gold)
  - Accent: `#F4EFE9` (Ivory Linen)
  - Luxury Dark: `#2C2C2C` & `#1C1C1C`
- **Fonts:**
  - `Playfair Display` (`--font-playfair` / `font-serif`) for titles, branding, and luxury accents.
  - `Inter` (`--font-inter` / `font-sans`) for legible descriptions, UI labels, and specifications.

### 2. Dark Mode Support
- Pre-hydration script in `app/layout.tsx` checks `localStorage.theme` and OS `prefers-color-scheme`.
- Styled using Tailwind's `@custom-variant dark (&:where(.dark, .dark *));`.

---

## 🧩 Component Architecture

| Component Group | Components | Responsibility |
| :--- | :--- | :--- |
| **Global Layout** | `Navbar`, `Footer`, `BackToTop`, `WhatsAppCall` | Site navigation, persistent floating contact actions, and quick scroll helper. |
| **Home Sections** | `Hero`, `TrustedBy`, `FeaturedCollections`, `ProductCategories`, `WhyChooseUs`, `ManufacturingTimeline`, `QualityPromise`, `Testimonials`, `MasonryGallery`, `FAQAccordion`, `BlogPreview`, `CTABanner` | Homepage marketing story and product teasers. |
| **Listing & Details** | `ProductCard`, `ProductGallery`, `PageHeader`, `CollectionsBrowser`, `BlogBrowser` | Catalog views, multi-image product viewer, and category filtering. |

---

## ⚡ Static Site Generation (SSG)

- `next.config.ts` sets `output: "export"`.
- Dynamic routes (`/products/[id]` and `/blog/[slug]`) implement `generateStaticParams()` to pre-render all static HTML pages at build time.
- No server-side runtime database is required, making hosting fast, secure, and low-cost (Vercel, Cloudflare Pages, S3/CloudFront, GitHub Pages, or Netlify).
