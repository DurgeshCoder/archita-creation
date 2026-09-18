import prisma from "./prisma";
import { PRODUCTS, COLLECTIONS, Product, Collection } from "@/constants";

/**
 * Normalizes a database Product row into the application Product interface
 */
function normalizeDbProduct(p: any): Product {
  let images: string[] = [];
  if (Array.isArray(p.images)) {
    images = p.images;
  } else if (typeof p.images === "string") {
    try {
      images = JSON.parse(p.images);
    } catch {
      images = [p.image];
    }
  } else {
    images = [p.image];
  }

  return {
    id: p.slug || p.id,
    name: p.name,
    category: (p.category?.slug || p.categoryId || "bedsheets") as any,
    categoryLabel: p.category?.name || "Bedsheets",
    collection: p.collection?.name || p.collectionId || "Signature Collection",
    price: p.price,
    rating: p.rating,
    image: p.image,
    images: images.length > 0 ? images : [p.image],
    description: p.description,
    shortDescription: p.shortDescription || "",
    specifications: (p.specifications as Record<string, string>) || {},
    features: (p.features as string[]) || [],
    careInstructions: (p.careInstructions as string[]) || [],
    packageIncludes: (p.packageIncludes as string[]) || [],
  };
}

/**
 * Normalizes a database Collection row into the application Collection interface
 */
function normalizeDbCollection(c: any): Collection {
  return {
    id: c.slug || c.id,
    name: c.name,
    image: c.image || "/images/hero_bedroom.jpg",
    description: c.description || "",
    theme: c.theme || "Luxury",
  };
}

/**
 * Fetches all products (from Prisma MySQL with fallback to static constants)
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        category: true,
        collection: true,
      },
    });

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map(normalizeDbProduct);
    }
  } catch (error) {
    console.warn("Prisma query fallback to static constants for products:", (error as Error).message);
  }

  return PRODUCTS;
}

/**
 * Fetches products by category slug
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      orderBy: { displayOrder: "asc" },
      include: {
        category: true,
        collection: true,
      },
    });

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map(normalizeDbProduct);
    }
  } catch (error) {
    console.warn("Prisma query fallback to static constants for category:", (error as Error).message);
  }

  return PRODUCTS.filter((p) => p.category === categorySlug);
}

/**
 * Fetches a single product by slug/id
 */
export async function getProductById(idOrSlug: string): Promise<Product | null> {
  try {
    const dbProduct = await prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        category: true,
        collection: true,
      },
    });

    if (dbProduct) {
      return normalizeDbProduct(dbProduct);
    }
  } catch (error) {
    console.warn("Prisma query fallback to static constants for single product:", (error as Error).message);
  }

  const staticProduct = PRODUCTS.find((p) => p.id === idOrSlug);
  return staticProduct || null;
}

/**
 * Fetches all collections
 */
export async function getAllCollections(): Promise<Collection[]> {
  try {
    const dbCollections = await prisma.collection.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    if (dbCollections && dbCollections.length > 0) {
      return dbCollections.map(normalizeDbCollection);
    }
  } catch (error) {
    console.warn("Prisma query fallback to static constants for collections:", (error as Error).message);
  }

  return COLLECTIONS;
}

/**
 * Fetches all categories
 */
export async function getAllCategories() {
  try {
    const dbCategories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (dbCategories && dbCategories.length > 0) {
      return dbCategories;
    }
  } catch (error) {
    console.warn("Prisma query fallback for categories:", (error as Error).message);
  }

  return [
    { id: "1", slug: "bedsheets", name: "Luxury Bedsheets", description: "100% Giza & Egyptian cotton sheets", image: "/images/archita_bedding_01.jpg", _count: { products: 2 } },
    { id: "2", slug: "blankets", name: "AC & Winter Blankets", description: "Featherweight embossed coral fleece", image: "/images/archita_bedding_04.jpg", _count: { products: 2 } },
    { id: "3", slug: "comforters", name: "Microfiber Comforters", description: "Hypoallergenic box-stitched duvets", image: "/images/archita_bedding_05.jpg", _count: { products: 2 } },
    { id: "4", slug: "dohars", name: "Handcrafted Dohars", description: "Triple-layer pure cotton mulmul dohars", image: "/images/archita_bedding_08.jpg", _count: { products: 2 } },
    { id: "5", slug: "bedding-sets", name: "Complete Bedding Sets", description: "5-piece and 7-piece master suites", image: "/images/archita_bedding_06.jpg", _count: { products: 2 } },
  ];
}

/**
 * Fetches a single category by slug
 */
export async function getCategoryBySlug(slug: string) {
  try {
    const dbCat = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (dbCat) {
      return dbCat;
    }
  } catch (error) {
    console.warn("Prisma query fallback for category slug:", (error as Error).message);
  }

  const all = await getAllCategories();
  return all.find((c) => c.slug === slug) || null;
}

/**
 * Fetches all gallery items
 */
export async function getAllGalleryItems() {
  try {
    const dbGallery = await prisma.galleryItem.findMany({
      where: { isActive: true },
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    if (dbGallery && dbGallery.length > 0) {
      return dbGallery;
    }
  } catch (error) {
    console.warn("Prisma query fallback for gallery items:", (error as Error).message);
  }

  return [
    {
      id: "1",
      title: "Presidential Bedroom Suite Decor",
      category: "Master Bedroom",
      categoryKey: "bedding-sets",
      image: "/images/archita_bedding_01.jpg",
      aspectRatio: "h-[320px] md:h-[400px]",
      displayOrder: 1,
      isActive: true,
    },
    {
      id: "2",
      title: "Folded Excellence Cotton Sateen Weave",
      category: "Bedsheets",
      categoryKey: "bedsheets",
      image: "/images/archita_bedding_07.jpg",
      aspectRatio: "h-[250px] md:h-[300px]",
      displayOrder: 2,
      isActive: true,
    },
    {
      id: "3",
      title: "Royal Palace Jacquard Detail",
      category: "Bedding Sets",
      categoryKey: "bedding-sets",
      image: "/images/archita_bedding_12.jpg",
      aspectRatio: "h-[350px] md:h-[450px]",
      displayOrder: 3,
      isActive: true,
    },
    {
      id: "4",
      title: "Fluffy Down-Alternative Loft",
      category: "Comforters",
      categoryKey: "comforters",
      image: "/images/archita_bedding_18.jpg",
      aspectRatio: "h-[220px] md:h-[280px]",
      displayOrder: 4,
      isActive: true,
    },
    {
      id: "5",
      title: "Traditional Floral Mulmul Dohar Print",
      category: "Dohars",
      categoryKey: "dohars",
      image: "/images/archita_bedding_14.jpg",
      aspectRatio: "h-[300px] md:h-[380px]",
      displayOrder: 5,
      isActive: true,
    },
    {
      id: "6",
      title: "Anti-Pilling Coral Fleece Texture",
      category: "AC Blankets",
      categoryKey: "blankets",
      image: "/images/archita_bedding_22.jpg",
      aspectRatio: "h-[280px] md:h-[350px]",
      displayOrder: 6,
      isActive: true,
    },
    {
      id: "7",
      title: "Italian Monogram Embroidered Percale",
      category: "Bedsheets",
      categoryKey: "bedsheets",
      image: "/images/archita_bedding_06.jpg",
      aspectRatio: "h-[320px] md:h-[380px]",
      displayOrder: 7,
      isActive: true,
    },
    {
      id: "8",
      title: "Handcrafted Sanganeri Indigo Dohar",
      category: "Dohars",
      categoryKey: "dohars",
      image: "/images/archita_bedding_08.jpg",
      aspectRatio: "h-[260px] md:h-[320px]",
      displayOrder: 8,
      isActive: true,
    },
  ];
}


