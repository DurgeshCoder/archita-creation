import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET_STRING = process.env.JWT_SECRET || "archita_secret_fallback_key_2026_xyz";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);
const COOKIE_NAME = "admin_session";

export interface AdminSessionPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Hashes a plaintext password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compares plaintext password against a hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generates a signed JWT session token valid for 7 days
 */
export async function signSessionToken(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

/**
 * Verifies a JWT session token and returns decoded payload
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/**
 * Retrieves the current admin session from incoming request cookies
 */
export async function getAdminSessionFromCookies(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Extracts and verifies token from request (header or cookie)
 */
export async function authenticateRequest(req: NextRequest): Promise<AdminSessionPayload | null> {
  const cookieToken = req.cookies.get(COOKIE_NAME)?.value;
  const authHeader = req.headers.get("Authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  const token = cookieToken || bearerToken;
  if (!token) return null;

  return verifySessionToken(token);
}

export { COOKIE_NAME };
