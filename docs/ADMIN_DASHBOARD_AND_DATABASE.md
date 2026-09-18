# Admin Dashboard, Database & ImageKit Guide

This guide details the dynamic Admin Dashboard, MySQL database integration with Prisma ORM, and ImageKit image asset management.

---

## 🛡️ Admin Dashboard Overview

- **Login Route:** `/admin/login`
- **Dashboard Overview:** `/admin`
- **Products Manager:** `/admin/products`
- **Product Creator:** `/admin/products/new`
- **Product Editor:** `/admin/products/[id]/edit`
- **Category Manager:** `/admin/categories`
- **Collection Manager:** `/admin/collections`
- **Inquiries & Orders Inbox:** `/admin/inquiries`

### Default Admin Credentials
- **Email:** `admin@architacreation.com`
- **Password:** `admin12345`
*(Configurable via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`)*

### Dashboard UI & Theme Features
- **Fixed Sidebar & Scrollable Viewport:** The sidebar is locked to the full viewport height (`h-screen`), while the main dashboard content scrolls independently (`overflow-y-auto`).
- **Interactive Dark / Light Theme Toggle:** Instant theme switcher available in both the top navigation header and sidebar footer, persisting preferences to `localStorage.theme`.

---

## 🗄️ MySQL Database & Prisma ORM

### Connection Setup
Set your MySQL connection URL in `.env`:
```env
DATABASE_URL="mysql://username:password@localhost:3306/archita_creation"
```

### Prisma Commands
```bash
# Push schema changes to MySQL
npx prisma db push

# Seed initial admin, categories, collections, and products
npx prisma db seed

# Open visual database browser
npx prisma studio
```

### Database Schema Models
1. **`Admin`**: Stores administrator credentials (bcrypt hashed) and session metadata.
2. **`Category`**: Manages product categories (`bedsheets`, `blankets`, `comforters`, `dohars`, `bedding-sets`).
3. **`Collection`**: Manages curated bedding themes (`Excellence Collection`, `Royal Heritage`, etc.).
4. **`Product`**: Full product details, pricing, JSON specifications, bullet features, care instructions, stock flags, and image arrays.
5. **`Inquiry`**: Stores buyer inquiries submitted from website forms.

---

## 📸 ImageKit Integration

The website uses **ImageKit CDN** for fast, high-resolution product and banner image delivery.

### Environment Setup
```env
IMAGEKIT_PUBLIC_KEY="public_your_imagekit_public_key"
IMAGEKIT_PRIVATE_KEY="private_your_imagekit_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id"
```

### Features & Folder Organization
- **Dedicated Folder Paths in ImageKit:**
  - Products by Category: `/archita-creation/products/bedsheets`, `/archita-creation/products/blankets`, `/archita-creation/products/comforters`, `/archita-creation/products/dohars`, `/archita-creation/products/bedding-sets`
  - Category Banners: `/archita-creation/categories`
  - Collection Covers: `/archita-creation/collections`
- **Dynamic Folder Selector in Admin UI:**
  - The [`ImageKitUploader`](file:///Users/durgesh_mac/Documents/Workspace/Development/archita_creation/components/admin/ImageKitUploader.tsx) displays the target ImageKit folder badge, lets you click **Edit** to type any custom folder path, or click preset shortcuts before uploading.
- **Server-side Upload Routing:**
  - The `/api/upload` API receives the folder name parameter and passes it directly to the ImageKit SDK `folder` argument (`cleanFolder`), ensuring files are organized cleanly within your ImageKit Media Library.
- Multi-image support (primary image selector and gallery thumbnails).
- Drag-and-drop file upload + external URL paste option.
