import { PrismaClient, Prisma } from '../app/generated/prisma';

const prisma = new PrismaClient();

const clientData: Prisma.ClientCreateInput[] = [
  {
    email: 'test@client.com',
    nume: 'Ion Popescu',
    codPostal: '123456',
    numarTelefon: '0712345678',
    cart: {
      create: {
        status: 'in desfasurare',
        haine: {
          create: [
            {
              nume: 'Geaca iarna',
              cantitate: 1,
              marime: 'L',
              descriere: 'Geaca groasă, albastră',
              cumparator: {
                connect: { email: 'test@client.com' },
              },
            },
          ],
        },
        mancare: {
          create: [
            {
              nume: 'Conserve',
              cantitate: 5,
              descriere: 'Conserve de fasole',
              cumparator: {
                connect: { email: 'test@client.com' },
              },
            },
          ],
        },
      },
    },
  },
];

export async function main() {
  for (const u of clientData) {
    await prisma.client.create({ data: u });
  }
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
