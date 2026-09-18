# Development & Deployment Guide

This guide covers local development, content management, builds, and deployment instructions.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 20+ (or Node 18 LTS)
- npm / pnpm / yarn

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run development server (http://localhost:3000)
npm run dev

# 3. Lint check
npm run lint

# 4. Production static build (generates static output in /out)
npm run build
```

---

## 📝 Managing Content

### Adding a New Product
1. Open `constants/index.ts`.
2. Add a new object to the `PRODUCTS` array following the `Product` interface:
   - Provide a unique `id` (slugified, e.g. `royal-velvet-quilt`).
   - Add image paths (located under `public/images/` or external Unsplash URLs).
   - Define `specifications`, `features`, and `packageIncludes`.
3. The new product will automatically render on its category page, search/filter, and at `/products/<id>`.

### Adding a New Blog Post
1. Open `constants/index.ts`.
2. Add an entry to the `BLOG_POSTS` array with a unique `slug`.
3. Fill in the article `content`, `excerpt`, and `tableOfContents`.
4. The post is instantly available on `/blog` and `/blog/<slug>`.

---

## 🌐 Deployment (Static Export)

Because `next.config.ts` has `output: "export"`, running `npm run build` generates a standalone static site inside the `out/` folder:

- **Vercel:** Auto-detects Next.js export. Push to git repository or run `vercel`.
- **Netlify / Cloudflare Pages / AWS S3 / GitHub Pages:** Point the publish directory to `out`.
- No Node.js runtime or server database is required in production.
