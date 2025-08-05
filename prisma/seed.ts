import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// 35 99 creatina
// 39 99 ash
// 45 99 love
async function main() {
  await prisma.product.createMany({
    data: [
      {
        nume: 'Zebra Jersey',
        pret: 159.99,
        stocS: 8,
      stocM: 7,
      stocL: 5,
        categorie: 'vestimentar',
        imagine: '/tricouri/zebraJersey (2).jpg',
    },
    {
      nume: 'Galaxy Jersey',
      pret: 159.99,
      stocS: 6,
      stocM: 7,
      stocL: 4,
      categorie: 'vestimentar',
      imagine: '/tricouri/galaxyJersey (2).jpg',
    },
    {
      nume: 'Shorts Negri',
      pret: 179.99,
      stocS: 4,
      stocM: 6,
      stocL: 3,
      categorie: 'vestimentar',
      imagine: '/tricouri/shNegri (3).jpg',
    },
    {
      nume: 'Shorts Albastri',
      pret: 179.99,
      stocS: 5,
      stocM: 5,
      stocL: 3,
      categorie: 'vestimentar',
      imagine: 'shAlbi (1).jpg',
    },
    {
      nume: 'Maieu Negru',
      pret: 139.99,
      stocS: 4,
      stocM: 9,
      stocL: 7,
      categorie: 'vestimentar',
      imagine: '/tricouri/maieuNegru (3).jpg',
    },
    {
      nume: 'Honey Jersey',
      pret: 159.99,
      stocS: 8,
      stocM: 7,
      stocL: 4,
      categorie: 'vestimentar',
      imagine: '/tricouri/honeyJersey (4).jpg',
    },
    {
      nume: 'Compression t-shirt (negru)',
      pret: 149.99,
      stocS: 6,
      stocM: 12,
      stocL: 6,
      categorie: 'vestimentar',
      imagine: '/tricouri/comNegru (3).jpg',
    },
    {
      nume: 'Compression t-shirt (alb)',
      pret: 149.99,
      stocS: 7,
      stocM: 12,
      stocL: 10,
      categorie: 'vestimentar',
      imagine: '/tricouri/comAlb (5).jpg',
    },
    {
      nume: 'Hoodie Rocket',
      pret: 189.99,
      stocS: 4,
      stocM: 6,
      stocL: 4,
      categorie: 'vestimentar',
      imagine: '/tricouri/hoodie (1).jpg',
    },
    {
      nume: 'Maieu Alb',
      pret: 139.99,
      stocS: 7,
      stocM: 8,
      stocL: 6,
      categorie: 'vestimentar',
      imagine: '/tricouri/maieuAlb (3).jpg',
    },
    {
      nume: 'Loaded Honey cu Creatina',
      pret: 35,
      stocS: 99,
      stocM: 99,
      stocL: 99,
      categorie: 'alimentara',
      imagine: '/alimentara1.png',
    },
    {
      nume: 'Loaded Honey cu Ashwagandha',
      pret: 39,
      stocS: 99,
      stocM: 99,
      stocL: 99,
      categorie: 'alimentara',
      imagine: '/alimentara3.png',
    },
    {
      nume: 'Love Honey',
      pret: 45,
      stocS: 99,
      stocM: 99,
      stocL: 99,
      categorie: 'alimentara',
      imagine: '/alimentara2.png',
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
