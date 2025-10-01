import { PrismaClient } from "@/app/generated/prisma";

declare global {
  var prisma: PrismaClient | undefined
}

const database = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = database;
}

export default database;
