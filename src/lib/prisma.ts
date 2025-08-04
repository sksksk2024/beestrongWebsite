// src/lib/prisma.ts
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ['query'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global prisma in dev to avoid exhausting your database
  // @ts-ignore
  var __prisma: PrismaClient;
}

export const prisma = global.__prisma
  // if in prod, or if global isn’t set yet
  ? global.__prisma
  : new PrismaClient();

// only set on the global once
if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  global.__prisma = prisma;
}
