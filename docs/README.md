# Archita Creation — Website Documentation

Welcome to the documentation for the **Archita Creation** luxury bedding and home furnishing dynamic web platform.

---

## 📌 Quick Overview

- **Project Type:** Next.js 16 (App Router) Dynamic Web Application with Admin CMS
- **Database & ORM:** MySQL + Prisma ORM
- **Media & CDN:** ImageKit Image CDN & Upload Integration
- **Security:** 256-bit JWT Session Cookies, Bcrypt Password Hashing, Edge Middleware
- **Brand Domain:** Premium Indian Textile Manufacturer (Panipat, Haryana) — Luxury Giza Cotton Bedsheets, Microfiber Comforters, AC Blankets, Hand-block Dohars, and Complete Bedding Sets.
- **Conversion Flow:** Direct inquiry & order generation via integrated WhatsApp messaging channels and interactive inquiry forms.

---

## 📂 Documentation Index

| Document | Purpose |
| :--- | :--- |
| **[Admin Dashboard, MySQL & ImageKit](./ADMIN_DASHBOARD_AND_DATABASE.md)** | Admin login, dashboard overview, category/collection/product management, MySQL Prisma schema, and ImageKit setup. |
| **[Architecture & Tech Stack](./ARCHITECTURE.md)** | Technical stack, App Router page structure, styling system, and component architecture. |
| **[Features & Data Models](./FEATURES_AND_DATA.md)** | Data structures (`Product`, `Category`, `Collection`, `BlogPost`), features, and page breakdowns. |
| **[Development & Deployment Guide](./DEVELOPMENT_GUIDE.md)** | Getting started, running locally, Prisma commands, and deployment. |

---

## 🛠 Core Tech Stack Summary

- **Framework:** Next.js 16.2.9 (App Router, Dynamic SSR & Static hybrid)
- **Database:** MySQL via Prisma ORM (`@prisma/client`)
- **Media CDN:** ImageKit (`imagekit`)
- **Authentication:** `jose` JWT cookies + `bcryptjs`
- **Runtime & Language:** React 19.2.4, TypeScript 5
- **Styling:** Tailwind CSS v4, Custom CSS Variables, Glassmorphism, Dark Mode Support
- **Typography:** Google Fonts (`Playfair Display` for serif luxury headings + `Inter` for clean body text)
- **Icons & Animations:** Lucide React, Framer Motion
