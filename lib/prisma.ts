import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Ensure in-memory cached Prisma client in dev mode has all latest models
const isCachedInstanceValid =
  globalForPrisma.prisma &&
  typeof (globalForPrisma.prisma as any).galleryItem !== "undefined";

export const prisma =
  globalForPrisma.prisma && isCachedInstanceValid
    ? globalForPrisma.prisma
    : new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
