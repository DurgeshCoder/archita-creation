import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const collection = searchParams.get("collection");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const where: any = {};

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (collection) {
      where.collection = {
        slug: collection,
      };
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { shortDescription: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { displayOrder: "asc" },
      include: {
        category: true,
        collection: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      categoryId,
      collectionId,
      price,
      originalPrice,
      rating = 5.0,
      image,
      images = [],
      description,
      shortDescription,
      specifications = {},
      features = [],
      careInstructions = [],
      packageIncludes = [],
      inStock = true,
      isFeatured = false,
      displayOrder = 0,
    } = body;

    if (!name || !categoryId || !price || !image || !description) {
      return NextResponse.json(
        { error: "Name, Category, Price, Image, and Description are required" },
        { status: 400 }
      );
    }

    const finalSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        categoryId,
        collectionId: collectionId || null,
        price,
        originalPrice: originalPrice || null,
        rating: Number(rating) || 5.0,
        image,
        images: Array.isArray(images) && images.length > 0 ? images : [image],
        description,
        shortDescription: shortDescription || description.slice(0, 120),
        specifications: specifications || {},
        features: Array.isArray(features) ? features : [],
        careInstructions: Array.isArray(careInstructions) ? careInstructions : [],
        packageIncludes: Array.isArray(packageIncludes) ? packageIncludes : [],
        inStock: Boolean(inStock),
        isFeatured: Boolean(isFeatured),
        displayOrder: Number(displayOrder) || 0,
      },
      include: {
        category: true,
        collection: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Create product error:", error);
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
