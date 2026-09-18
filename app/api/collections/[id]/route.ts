import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const collection = await prisma.collection.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json(collection);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collection" }, { status: 500 });
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
    const { name, slug, description, theme, image, displayOrder, isActive } = body;

    const updatedCollection = await prisma.collection.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-") }),
        ...(description !== undefined && { description }),
        ...(theme !== undefined && { theme }),
        ...(image !== undefined && { image }),
        ...(displayOrder !== undefined && { displayOrder: Number(displayOrder) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
    });

    return NextResponse.json(updatedCollection);
  } catch (error: any) {
    console.error("Update collection error:", error);
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.collection.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Collection deleted successfully" });
  } catch (error: any) {
    console.error("Delete collection error:", error);
    return NextResponse.json({ error: "Failed to delete collection" }, { status: 500 });
  }
}
