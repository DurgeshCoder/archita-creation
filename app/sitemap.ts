import { MetadataRoute } from "next";
import { PRODUCTS, BLOG_POSTS } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.achtiacreation.com";

  // Core website pages
  const routes = [
    "",
    "/about",
    "/collections",
    "/bedsheets",
    "/blankets",
    "/comforters",
    "/dohars",
    "/bedding-sets",
    "/gallery",
    "/blog",
    "/contact",
    "/privacy",
    "/terms"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Product detail pages
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog articles
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes, ...blogRoutes];
}
