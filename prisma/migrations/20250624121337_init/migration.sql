-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "codPostal" TEXT NOT NULL,
    "numarTelefon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Haina" (
    "id" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "cantitate" INTEGER NOT NULL,
    "marime" TEXT NOT NULL,
    "descriere" TEXT,
    "idCumparator" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "Haina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mancare" (
    "id" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "cantitate" INTEGER NOT NULL,
    "descriere" TEXT,
    "idCumparator" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "Mancare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'in desfasurare',

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Haina" ADD CONSTRAINT "Haina_idCumparator_fkey" FOREIGN KEY ("idCumparator") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Haina" ADD CONSTRAINT "Haina_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mancare" ADD CONSTRAINT "Mancare_idCumparator_fkey" FOREIGN KEY ("idCumparator") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mancare" ADD CONSTRAINT "Mancare_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
