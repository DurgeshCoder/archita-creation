import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        category: true,
        collection: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const {
      name,
      slug,
      categoryId,
      collectionId,
      price,
      originalPrice,
      rating,
      image,
      images,
      description,
      shortDescription,
      specifications,
      features,
      careInstructions,
      packageIncludes,
      inStock,
      isFeatured,
      displayOrder,
    } = body;

    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (slug !== undefined) dataToUpdate.slug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    if (categoryId !== undefined) dataToUpdate.categoryId = categoryId;
    if (collectionId !== undefined) dataToUpdate.collectionId = collectionId || null;
    if (price !== undefined) dataToUpdate.price = price;
    if (originalPrice !== undefined) dataToUpdate.originalPrice = originalPrice;
    if (rating !== undefined) dataToUpdate.rating = Number(rating);
    if (image !== undefined) dataToUpdate.image = image;
    if (images !== undefined) dataToUpdate.images = Array.isArray(images) ? images : [image];
    if (description !== undefined) dataToUpdate.description = description;
    if (shortDescription !== undefined) dataToUpdate.shortDescription = shortDescription;
    if (specifications !== undefined) dataToUpdate.specifications = specifications;
    if (features !== undefined) dataToUpdate.features = features;
    if (careInstructions !== undefined) dataToUpdate.careInstructions = careInstructions;
    if (packageIncludes !== undefined) dataToUpdate.packageIncludes = packageIncludes;
    if (inStock !== undefined) dataToUpdate.inStock = Boolean(inStock);
    if (isFeatured !== undefined) dataToUpdate.isFeatured = Boolean(isFeatured);
    if (displayOrder !== undefined) dataToUpdate.displayOrder = Number(displayOrder);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
      include: {
        category: true,
        collection: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
