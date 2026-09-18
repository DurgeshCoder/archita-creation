# Features & Data Models

This document describes the core functional features, user journeys, and data schemas across the website.

---

## 📊 Central Data Models (`constants/index.ts`)

All content is managed in typed data structures in `constants/index.ts`:

### 1. `Product`
```typescript
interface Product {
  id: string;
  name: string;
  category: 'bedsheets' | 'blankets' | 'comforters' | 'dohars' | 'bedding-sets';
  categoryLabel: string;
  collection: string;
  price: string;
  rating: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  specifications: Record<string, string>; // e.g., Material, Thread Count, Weave, Origin
  features: string[];
  careInstructions: string[];
  packageIncludes: string[];
}
```

### 2. `Collection`
```typescript
interface Collection {
  id: string;
  name: string;
  image: string;
  description: string;
  theme: string;
}
```

### 3. `BlogPost`
```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; role: string; image: string };
  category: string;
  date: string;
  readTime: string;
  featuredImage: string;
  tableOfContents: { id: string; text: string }[];
}
```

---

## 🚀 Key Functional Features

### 1. Direct WhatsApp Inquiry & Order Flow
- **Product Page CTA:** Clicking *"Order / Inquire on WhatsApp"* opens a chat with phone number `+91 97958 72419` containing product name, ID, price, and URL.
- **Contact Form:** The contact page validates input fields (Retail, Wholesale, Boutique Hotel, Interior Designer) and encodes a structured message directly into a WhatsApp session upon submission.
- **Global Floating Widget:** `WhatsAppCall.tsx` offers one-click call and WhatsApp chat anytime.

### 2. Rich Category Pages & Product Filtering
- Dedicated routes for `/bedsheets`, `/blankets`, `/comforters`, `/dohars`, and `/bedding-sets`.
- Dynamic sub-filtering by fabric weave, thread count, size, or collection.

### 3. Media Gallery (`/gallery`)
- Masonry image grid with category filtering tabs (`All`, `Bedsheets`, `Dohars`, `Comforters`, `Craftsmanship`).

### 4. Blog & Educational Hub (`/blog`)
- High-intent SEO articles on bedsheet care, fabric guides (Giza cotton vs Egyptian cotton), thread counts, and sleep ergonomics.
- Markdown-style rich article pages with Table of Contents jump links.

### 5. SEO & Metadata
- OpenGraph tags, dynamic Twitter cards, canonical links, `robots.ts`, and dynamic `sitemap.ts` listing all static pages and product routes.
