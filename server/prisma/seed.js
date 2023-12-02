import prisma from './client.js';
import { roles, users, titles } from '../data/seedData.js';

const main = async () => {
  await prisma.role.createMany({
    data: roles,
  });

  await prisma.user.createMany({
    data: users,
  });

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
