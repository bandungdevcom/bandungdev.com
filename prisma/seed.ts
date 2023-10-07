import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed your database here
}

main()
  .then(async () => {
    console.log('Seeding complete');
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    console.log('Seeding failed');
    prisma.$disconnect();
    process.exit(1);
  });
