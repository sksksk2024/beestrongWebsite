import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        nume: 'Jersey Zebra',
        pret: 150,
        stoc: 10,
        categorie: 'vestimentar',
        imagine: '/tigru1.jpg',
    },
    {
      nume: 'Jersey Galaxy',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: '/rocket1.jpg',
    },
    {
      nume: 'Shorts Negri',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: '/pantaloniNegri2.jpg',
    },
    {
      nume: 'Shorts Albastri',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: 'pantaloniAlbastri2.jpg',
    },
    {
      nume: 'Maieu Negru',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: '/maieu1.jpg',
    },
    {
      nume: 'Jersey Honey',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: '/jeAlb1.jpg',
    },
    {
      nume: 'Jersey Honey (Negru)',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: '/je1.jpg',
    },
    {
      nume: 'Fire',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: '/fire1.jpg',
    },
    {
      nume: 'Hoodie Rocket',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: '/beast1.jpg',
    },
    {
      nume: 'Compression T-shirt alb',
      pret: 150,
      stoc: 10,
      categorie: 'vestimentar',
      imagine: '/albRocket2.jpg',
    },
    ],
    skipDuplicates: true,
  })  
}

main()
  .then(() => {
    console.log('✅ Seed complet!');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
