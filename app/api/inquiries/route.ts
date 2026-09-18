import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Fetch inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, enquiryType = "retail", message, productId, productName } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        company: company || null,
        enquiryType,
        message,
        productId: productId || null,
        productName: productName || null,
        status: "NEW",
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error: any) {
    console.error("Create inquiry error:", error);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
