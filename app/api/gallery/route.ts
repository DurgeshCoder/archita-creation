import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const galleryItems = await prisma.galleryItem.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "desc" },
      ],
    });
    return NextResponse.json(galleryItems);
  } catch (error) {
    console.error("Failed to fetch gallery items:", error);
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
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
      title,
      category,
      categoryKey,
      image,
      aspectRatio = "h-[300px] md:h-[380px]",
      displayOrder = 0,
      isActive = true,
    } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Title and Image are required" }, { status: 400 });
    }

    const calculatedKey = categoryKey || (category ? category.toLowerCase().replace(/[^a-z0-9]/g, "-") : "all");
    const calculatedCategory = category || "Master Bedroom";

    const item = await prisma.galleryItem.create({
      data: {
        title,
        category: calculatedCategory,
        categoryKey: calculatedKey,
        image,
        aspectRatio: aspectRatio || "h-[300px] md:h-[380px]",
        displayOrder: Number(displayOrder) || 0,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Create gallery item error:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
