import { prisma } from "~/libs/db.server"
import { debugCode } from "~/utils/debug"

import { dataEvents } from "./seed-data/events"
import { dataTeamMembers } from "./seed-data/team-members"
import { dataUserTags } from "./seed-data/user-tags"

async function main() {
	console.info("NODE_ENV", process.env.NODE_ENV)

	// await seedEvents()
	await seedUserTags()
	await seedTeamMembers()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function seedEvents() {
	const deletedEvents = await prisma.event.deleteMany()
	console.info(`🟡 Deleted Events: ${deletedEvents.count} events`)

	const createdEvents = await prisma.event.createMany({
		data: dataEvents,
	})

	console.info(`🟢 Created Events: ${createdEvents.count} events`)
}

async function seedUserTags() {
	const deletedUserTags = await prisma.userTag.deleteMany()
	console.info(`🟡 Deleted User Tags: ${deletedUserTags.count} tags`)

	const userTags = await prisma.userTag.createMany({
		data: dataUserTags,
	})

	console.info(`🟢 Created User Tags: ${userTags.count} tags`)
}

async function seedTeamMembers() {
	const deletedTeamMembers = await prisma.user.deleteMany()
	console.info(`🟡 Deleted Team Members: ${deletedTeamMembers.count} members`)

	const [TEAM, UNKNOWN] = await prisma.$transaction([
		prisma.userTag.findUnique({ where: { symbol: "TEAM" } }),
		prisma.userTag.findUnique({ where: { symbol: "UNKNOWN" } }),
	])
	if (!TEAM || !UNKNOWN) return null

	const dataTeamMembersSeed = dataTeamMembers.map(teamMember => {
		const tagsIds = teamMember.tags.map(tag => {
			if (tag === "TEAM") return { id: TEAM.id }
			return { id: UNKNOWN.id }
		})

		return {
			...teamMember,
			tags: { connect: tagsIds },
		}
	})

	debugCode({ dataTeamMembersSeed })

	for (const teamMember of dataTeamMembersSeed) {
		const newTeamMember = await prisma.user.create({
			data: teamMember,
		})
		console.info(`🟢 Created Team Member: ${newTeamMember.fullname}`)
	}
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
