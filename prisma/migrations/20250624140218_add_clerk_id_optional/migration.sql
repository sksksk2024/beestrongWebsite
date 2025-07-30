/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "clerkId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Client_clerkId_key" ON "Client"("clerkId");
