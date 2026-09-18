import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PRODUCTS, COLLECTIONS } from "../constants";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Archita Creation database seed...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@architacreation.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin12345";
  const adminName = process.env.ADMIN_NAME || "Archita Admin";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      passwordHash,
    },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: "SUPERADMIN",
    },
  });

  console.log(`✅ Admin seeded: ${admin.email} (Password: ${adminPassword})`);

  // 2. Seed Categories
  const defaultCategories = [
    {
      slug: "bedsheets",
      name: "Luxury Bedsheets",
      description: "100% Giza and Egyptian long-staple cotton sheets, 300 to 1000 Thread Count sateen and percale weaves.",
      image: "/images/archita_bedding_01.jpg",
      displayOrder: 1,
    },
    {
      slug: "blankets",
      name: "AC & Winter Blankets",
      description: "Featherweight embossed coral fleece and ultra-soft flannel blankets crafted for year-round climate control.",
      image: "/images/archita_bedding_04.jpg",
      displayOrder: 2,
    },
    {
      slug: "comforters",
      name: "Microfiber Comforters",
      description: "Box-stitched all-season microfiber duvets and comforters with down-alternative hypoallergenic filling.",
      image: "/images/archita_bedding_05.jpg",
      displayOrder: 3,
    },
    {
      slug: "dohars",
      name: "Handcrafted Dohars",
      description: "Triple-layer pure cotton mulmul dohars with traditional Sanganeri & Bagru wooden block prints.",
      image: "/images/archita_bedding_08.jpg",
      displayOrder: 4,
    },
    {
      slug: "bedding-sets",
      name: "Complete Bedding Sets",
      description: "Curated 5-piece and 7-piece matching master bedroom suites including fitted sheets, flat sheets, and shams.",
      image: "/images/archita_bedding_06.jpg",
      displayOrder: 5,
    },
  ];

  const categoryMap = new Map<string, string>();

  for (const cat of defaultCategories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        image: cat.image,
        displayOrder: cat.displayOrder,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        image: cat.image,
        displayOrder: cat.displayOrder,
      },
    });
    categoryMap.set(cat.slug, createdCategory.id);
  }
  console.log(`✅ Seeded ${defaultCategories.length} categories`);

  // 3. Seed Collections
  const collectionMap = new Map<string, string>();

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const col = COLLECTIONS[i];
    const createdCol = await prisma.collection.upsert({
      where: { slug: col.id },
      update: {
        name: col.name,
        description: col.description,
        theme: col.theme,
        image: col.image,
        displayOrder: i + 1,
      },
      create: {
        slug: col.id,
        name: col.name,
        description: col.description,
        theme: col.theme,
        image: col.image,
        displayOrder: i + 1,
      },
    });
    collectionMap.set(col.name, createdCol.id);
    collectionMap.set(col.id, createdCol.id);
  }
  console.log(`✅ Seeded ${COLLECTIONS.length} collections`);

  // 4. Seed Products
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    const categoryId = categoryMap.get(p.category);
    if (!categoryId) continue;

    const collectionId = collectionMap.get(p.collection) || null;

    await prisma.product.upsert({
      where: { slug: p.id },
      update: {
        name: p.name,
        categoryId,
        collectionId,
        price: p.price,
        rating: p.rating,
        image: p.image,
        images: p.images,
        description: p.description,
        shortDescription: p.shortDescription,
        specifications: p.specifications,
        features: p.features,
        careInstructions: p.careInstructions,
        packageIncludes: p.packageIncludes,
        isFeatured: i < 4,
        displayOrder: i + 1,
      },
      create: {
        slug: p.id,
        name: p.name,
        categoryId,
        collectionId,
        price: p.price,
        rating: p.rating,
        image: p.image,
        images: p.images,
        description: p.description,
        shortDescription: p.shortDescription,
        specifications: p.specifications,
        features: p.features,
        careInstructions: p.careInstructions,
        packageIncludes: p.packageIncludes,
        isFeatured: i < 4,
        displayOrder: i + 1,
      },
    });
  }
  console.log(`✅ Seeded ${PRODUCTS.length} products`);

  // 5. Seed Gallery Items
  const defaultGallery = [
    {
      title: "Presidential Bedroom Suite Decor",
      category: "Master Bedroom",
      categoryKey: "bedding-sets",
      image: "/images/archita_bedding_01.jpg",
      aspectRatio: "h-[320px] md:h-[400px]",
      displayOrder: 1,
    },
    {
      title: "Folded Excellence Cotton Sateen Weave",
      category: "Bedsheets",
      categoryKey: "bedsheets",
      image: "/images/archita_bedding_07.jpg",
      aspectRatio: "h-[250px] md:h-[300px]",
      displayOrder: 2,
    },
    {
      title: "Royal Palace Jacquard Detail",
      category: "Bedding Sets",
      categoryKey: "bedding-sets",
      image: "/images/archita_bedding_12.jpg",
      aspectRatio: "h-[350px] md:h-[450px]",
      displayOrder: 3,
    },
    {
      title: "Fluffy Down-Alternative Loft",
      category: "Comforters",
      categoryKey: "comforters",
      image: "/images/archita_bedding_18.jpg",
      aspectRatio: "h-[220px] md:h-[280px]",
      displayOrder: 4,
    },
    {
      title: "Traditional Floral Mulmul Dohar Print",
      category: "Dohars",
      categoryKey: "dohars",
      image: "/images/archita_bedding_14.jpg",
      aspectRatio: "h-[300px] md:h-[380px]",
      displayOrder: 5,
    },
    {
      title: "Anti-Pilling Coral Fleece Texture",
      category: "AC Blankets",
      categoryKey: "blankets",
      image: "/images/archita_bedding_22.jpg",
      aspectRatio: "h-[280px] md:h-[350px]",
      displayOrder: 6,
    },
    {
      title: "Italian Monogram Embroidered Percale",
      category: "Bedsheets",
      categoryKey: "bedsheets",
      image: "/images/archita_bedding_06.jpg",
      aspectRatio: "h-[320px] md:h-[380px]",
      displayOrder: 7,
    },
    {
      title: "Handcrafted Sanganeri Indigo Dohar",
      category: "Dohars",
      categoryKey: "dohars",
      image: "/images/archita_bedding_08.jpg",
      aspectRatio: "h-[260px] md:h-[320px]",
      displayOrder: 8,
    },
  ];

  for (const item of defaultGallery) {
    const existing = await prisma.galleryItem.findFirst({
      where: { title: item.title },
    });
    if (!existing) {
      await prisma.galleryItem.create({
        data: item,
      });
    }
  }
  console.log(`✅ Seeded ${defaultGallery.length} gallery items`);

  console.log("🎉 Database seeding completed successfully!");
}


main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
