import { prisma } from "~/libs/db.server"

import { dataEvents } from "./seed-data/events"

async function main() {
	console.info("NODE_ENV", process.env.NODE_ENV)

	await seedEvents()
}

async function seedEvents() {
	const deletedEvents = await prisma.event.deleteMany()
	console.info(`🟡 Deleted Events: ${deletedEvents.count} events`)

	const createdEvents = await prisma.event.createMany({
		data: dataEvents,
	})

	console.info(`🟢 Created Events: ${createdEvents.count} events`)
}

main()
	.then(async () => {
		console.log("🔵 Seeding complete")
		await prisma.$disconnect()
	})
	.catch(e => {
		console.error(e)
		console.log("🔴 Seeding failed")
		prisma.$disconnect()
		process.exit(1)
	})
