import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
    return NextResponse.json(collections);
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, slug, description, theme, image, displayOrder = 0, isActive = true } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const formattedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");

    const collection = await prisma.collection.create({
      data: {
        name,
        slug: formattedSlug,
        description,
        theme,
        image,
        displayOrder: Number(displayOrder) || 0,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(collection, { status: 201 });
  } catch (error: any) {
    console.error("Create collection error:", error);
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "A collection with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create collection" }, { status: 500 });
  }
}
