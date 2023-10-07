import prisma from './client.js';
import { roles, titles } from '../data/seedData.js';

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
