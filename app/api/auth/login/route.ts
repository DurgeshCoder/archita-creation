import { NextRequest, NextResponse } from "next/server";
import { comparePassword, signSessionToken, COOKIE_NAME } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    let admin = null;

    try {
      admin = await prisma.admin.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
    } catch (dbError) {
      console.warn("Database lookup failed, checking environment fallback:", dbError);
    }

    // Default fallback admin check if DB is being initialized
    const defaultEmail = (process.env.ADMIN_EMAIL || "admin@architacreation.com").toLowerCase().trim();
    const defaultPassword = process.env.ADMIN_PASSWORD || "admin12345";

    let isValid = false;
    let payload = null;

    if (admin) {
      isValid = await comparePassword(password, admin.passwordHash);
      if (isValid) {
        payload = {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };
      }
    } else if (email.toLowerCase().trim() === defaultEmail && password === defaultPassword) {
      isValid = true;
      payload = {
        id: "default-admin-id",
        email: defaultEmail,
        name: process.env.ADMIN_NAME || "Archita Admin",
        role: "SUPERADMIN",
      };
    }

    if (!isValid || !payload) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signSessionToken(payload);

    const response = NextResponse.json({
      success: true,
      user: payload,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
