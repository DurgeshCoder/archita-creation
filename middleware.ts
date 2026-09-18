import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET_STRING = process.env.JWT_SECRET || "archita_secret_fallback_key_2026_xyz";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);
const COOKIE_NAME = "admin_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin routes except the login page and static assets
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(url);
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  // If user is logged in and visits /admin/login, redirect to /admin
  if (pathname === "/admin/login") {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        return NextResponse.redirect(new URL("/admin", req.url));
      } catch {
        // Token invalid, let them view login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
