/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Haina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mancare` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_clientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Haina" DROP CONSTRAINT "Haina_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Haina" DROP CONSTRAINT "Haina_idCumparator_fkey";

-- DropForeignKey
ALTER TABLE "public"."Mancare" DROP CONSTRAINT "Mancare_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Mancare" DROP CONSTRAINT "Mancare_idCumparator_fkey";

-- DropTable
DROP TABLE "public"."Cart";

-- DropTable
DROP TABLE "public"."Client";

-- DropTable
DROP TABLE "public"."Haina";

-- DropTable
DROP TABLE "public"."Mancare";

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "pret" DOUBLE PRECISION NOT NULL,
    "stoc" INTEGER NOT NULL DEFAULT 0,
    "imagine" TEXT,
    "categorie" TEXT NOT NULL,
    "descriere" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "numeClient" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "marimeTricou" TEXT,
    "marimePantaloni" TEXT,
    "codPostal" TEXT NOT NULL,
    "iteme" JSONB NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Nelivrat',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_OrderToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderToProduct_B_index" ON "public"."_OrderToProduct"("B");

-- AddForeignKey
ALTER TABLE "public"."_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
