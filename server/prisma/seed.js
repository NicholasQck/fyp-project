import { PrismaClient } from '@prisma/client';
import { roles, users } from '../data/seedData.js';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: users,
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
