import { prisma } from "~/db.server";

import { dataSeedEvents } from "./data";

async function main() {
  console.info("NODE_ENV", process.env.NODE_ENV);

  await seedEvents();
}

async function seedEvents() {
  const createdEvents = await prisma.event.createMany({
    data: dataSeedEvents,
  });

  console.info(`🟢 Created Events: ${createdEvents.count} events`);
}

main()
  .then(async () => {
    console.log("Seeding complete");
    await prisma.$disconnect();
  })
  .catch(e => {
    console.error(e);
    console.log("Seeding failed");
    prisma.$disconnect();
    process.exit(1);
  });
