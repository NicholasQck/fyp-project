import { PrismaClient } from '@prisma/client';
import { roles, titles } from '../data/seedData.js';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.title.createMany({
    data: titles,
  });
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
