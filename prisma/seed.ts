import { prisma } from "~/libs/db.server"

import dataUsers from "./seed-credential/users.json"
import { dataEvents } from "./seed-data/events"
import { dataUserTags } from "./seed-data/user-tags"

async function main() {
  console.info("NODE_ENV", process.env.NODE_ENV)

  await seedEvents()
  await seedUserTags()
  await seedUsers()
}

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

async function seedUsers() {
  // const deletedUsers = await prisma.user.deleteMany()
  // console.info(`🟡 Deleted Users: ${deletedUsers.count} users`)

  const userTags = await prisma.userTag.findMany()

  const TEAM = userTags.find(tag => tag.symbol === "TEAM")
  const ADVISOR = userTags.find(tag => tag.symbol === "ADVISOR")
  const DEVELOPER = userTags.find(tag => tag.symbol === "DEVELOPER")
  const SPEAKER = userTags.find(tag => tag.symbol === "SPEAKER")
  const MEMBER = userTags.find(tag => tag.symbol === "MEMBER")
  const UNKNOWN = userTags.find(tag => tag.symbol === "UNKNOWN")
  if (!TEAM || !ADVISOR || !DEVELOPER || !SPEAKER || !MEMBER || !UNKNOWN)
    return null

  const dataUsersSeed = dataUsers.map(user => {
    const tagsIds = user.tags.map(tag => {
      if (tag === "TEAM") return { id: TEAM.id }
      if (tag === "ADVISOR") return { id: ADVISOR.id }
      if (tag === "DEVELOPER") return { id: DEVELOPER.id }
      if (tag === "SPEAKER") return { id: SPEAKER.id }
      if (tag === "MEMBER") return { id: MEMBER.id }
      if (tag === "UNKNOWN") return { id: UNKNOWN.id }
      return { id: UNKNOWN.id }
    })

    return {
      ...user,
      tags: { connect: tagsIds },
    }
  })

  for (const user of dataUsersSeed) {
    const newTeamMember = await prisma.user.upsert({
      where: { email: user.email },
      create: user,
      update: user,
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
