/*
  Warnings:

  - You are about to drop the column `marimePantaloni` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `marimeTricou` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `stoc` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "marimePantaloni",
DROP COLUMN "marimeTricou";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "stoc",
ADD COLUMN     "stocL" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stocM" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stocS" INTEGER NOT NULL DEFAULT 0;
