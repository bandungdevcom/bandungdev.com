import { createPostSlug, extractPostSlug, getPostExcerpt } from "~/helpers/post"
import { prisma } from "~/libs/db.server"
import { hashPassword } from "~/utils/encryption.server"
import { logEnv } from "~/utils/log.server"
import { createSlug } from "~/utils/string"

import dataCredentialUsers from "./credentials/users.json"
import dataEventStatuses from "./data/event-statuses.json"
import { dataEvents } from "./data/events"
import dataPostStatuses from "./data/post-statuses.json"
import dataPosts from "./data/posts.json"
import dataRoles from "./data/roles.json"
import dataTags from "./data/tags.json"

/**
 * Enable and disable seed items by commenting them
 */
const enabledSeedItems = [
  "permissions",
  "tags",
  "roles",
  "users",
  "postStatuses",
  "posts",
  "eventStatuses",
  "events",
]

async function main() {
  logEnv()

  const seeds: { [key: string]: () => Promise<any> } = {
    permissions: seedPermissions,
    tags: seedTags,
    roles: seedRoles,
    users: seedUsers,
    postStatuses: seedPostStatuses,
    posts: seedPosts,
    eventStatuses: seedEventStatuses,
    events: seedEvents,
  }

  for (const seedName of enabledSeedItems) {
    const seed = seeds[seedName]
    if (seed) {
      await seed()
    }
  }
}

async function seedPermissions() {
  console.info("\n🔑 Seed permissions")
  console.info("🔑 Count permissions", await prisma.permission.count())
  console.info("🔑 Deleted permissions", await prisma.permission.deleteMany())

  console.time("🔑 Created permissions")

  const entities = ["USER", "NOTE"]
  const actions = ["CREATE", "READ", "UPDATE", "DELETE"]
  const accesses = ["OWN", "ANY"] as const

  for (const entity of entities) {
    for (const action of actions) {
      for (const access of accesses) {
        await prisma.permission.create({
          data: { entity, action, access },
        })
      }
    }
  }

  console.timeEnd("🔑 Created permissions")
}

async function seedTags() {
  console.info("\n🪧 Seed tags")
  console.info("🪧 Count tags", await prisma.userTag.count())
  console.info("🪧 Deleted tags", await prisma.userTag.deleteMany())

  console.time("🪧 Created tags")

  const userTags = await prisma.userTag.createMany({
    data: dataTags,
  })

  console.timeEnd(`🪧 Created User Tags: ${userTags.count} tags`)
}

async function seedRoles() {
  console.info("\n👑 Seed roles")
  console.info("👑 Count roles", await prisma.role.count())
  // console.info("👑 Deleted roles", await prisma.role.deleteMany())
  console.time("👑 Upserted roles")

  for (const roleRaw of dataRoles) {
    const roleData = {
      symbol: roleRaw.symbol,
      name: roleRaw.name,
      permissions: {
        connect: await prisma.permission.findMany({
          select: { id: true },
          where: { access: roleRaw.permissionsAccess },
        }),
      },
    }

    const role = await prisma.role.upsert({
      where: { symbol: roleRaw.symbol },
      create: roleData,
      update: roleData,
    })

    console.info(`👑 Upserted role ${role.symbol} / ${role.name}`)
  }

  console.timeEnd("👑 Upserted roles")
}

async function seedUsers() {
  console.info("\n👤 Seed users")
  console.info("👤 Count users", await prisma.user.count())
  // console.info("👤 Deleted users", await prisma.user.deleteMany())

  if (!Array.isArray(dataCredentialUsers)) {
    console.error(`🔴 Please create prisma/credentials/users.json file`)
    console.error(`🔴 Check README for the guide`)
    return null
  }

  const userTags = await prisma.userTag.findMany()

  const TEAM = userTags.find(tag => tag.symbol === "TEAM")
  const ADVISOR = userTags.find(tag => tag.symbol === "ADVISOR")
  const DEVELOPER = userTags.find(tag => tag.symbol === "DEVELOPER")
  const SPEAKER = userTags.find(tag => tag.symbol === "SPEAKER")
  const MEMBER = userTags.find(tag => tag.symbol === "MEMBER")
  const UNKNOWN = userTags.find(tag => tag.symbol === "UNKNOWN")
  if (!TEAM || !ADVISOR || !DEVELOPER || !SPEAKER || !MEMBER || !UNKNOWN)
    return null

  const dataCredentialUsersSeed = dataCredentialUsers.map(user => {
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

  for (const userCredential of dataCredentialUsersSeed) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, profile, roleSymbol, ...userRaw } = userCredential

    const userData = {
      ...userRaw,
      roles: { connect: { symbol: userCredential.roleSymbol } },
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
      include: { password: { select: { hash: true } } },
    })

    const userHasPassword = Boolean(existingUser?.password?.hash)

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        ...userData,
        password: userHasPassword
          ? { update: { hash: await hashPassword(userCredential.password) } }
          : undefined,
        profile: profile ? {
          update: {
            ...profile
          }
        } : undefined
      },
      create: {
        ...userData,
        password: {
          create: { hash: await hashPassword(userCredential.password) },
        },
        profile: profile ? {
          create: {
            ...profile
          }
        } : undefined
      },
    })

    if (!user) return null

    console.info(`👤 Upserted user ${user.email} / @${user.username}`)
  }
}

async function seedPostStatuses() {
  console.info("\n🪧 Seed post statuses")
  console.info("🪧 Count post statuses", await prisma.postStatus.count())
  // console.info("🪧 Deleted post statuses", await prisma.postStatus.deleteMany())
  console.time("🪧 Upserted post statuses")

  for (const statusRaw of dataPostStatuses) {
    const status = await prisma.postStatus.upsert({
      where: { symbol: statusRaw.symbol },
      create: statusRaw,
      update: statusRaw,
    })
    console.info(`🪧 Upserted post status ${status.symbol} / ${status.name}`)
  }
  console.timeEnd("🪧 Upserted post statuses")
}

async function seedPosts() {
  console.info("\n📜 Seed posts")
  console.info("📜 Count posts", await prisma.post.count())
  console.info("📜 Deleted posts", await prisma.post.deleteMany())

  const users = await prisma.user.findMany({
    select: { id: true, username: true },
  })

  const posts = await prisma.post.findMany({
    select: { id: true, slug: true },
  })

  const postStatuses = await prisma.postStatus.findMany({
    select: { id: true, symbol: true },
  })

  for (const postRaw of dataPosts) {
    const user = users.find(user => user.username === postRaw.username)
    if (!user) return null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, statusSymbol, ...postSanitized } = postRaw

    const slug = createSlug(postRaw.title) // original-slug
    const postSlug = createPostSlug(postRaw.title) // modified-slug-nanoid123
    const existingPost = posts.find(post => {
      return slug === extractPostSlug(post.slug)
    })
    const status = postStatuses.find(
      status => status.symbol === postRaw.statusSymbol,
    )
    if (!status) return null

    const postData = {
      ...postSanitized,
      // Reuse the same post slug if it already exists
      slug: existingPost?.slug || postSlug,
      excerpt: getPostExcerpt(postSanitized.content),
      userId: user.id,
      statusId: status.id,
    }

    const post = await prisma.post.upsert({
      where: { slug: postData.slug },
      update: postData,
      create: postData,
    })

    if (!post) return null

    console.info(`📜 Upserted post ${post.title} / ${post.slug}`)
  }
}

async function seedEventStatuses() {
  console.info("\n🪧 Seed event statuses")
  console.info("🪧 Count event statuses", await prisma.eventStatus.count())
  // console.info("🪧 Deleted event statuses", await prisma.eventStatus.deleteMany())
  console.time("🪧 Upserted event statuses")

  for (const statusRaw of dataEventStatuses) {
    const status = await prisma.eventStatus.upsert({
      where: { symbol: statusRaw.symbol },
      create: statusRaw,
      update: statusRaw,
    })
    console.info(`🪧 Upserted event status ${status.symbol} / ${status.name}`)
  }
  console.timeEnd("🪧 Upserted event statuses")
}

async function seedEvents() {
  console.info("\n📜 Seed events")
  console.info("📜 Count events", await prisma.event.count())
  console.info("📜 Deleted events", await prisma.event.deleteMany())

  const organizer = await prisma.user.findUnique({
    where: { username: "bandungdev" },
  })
  if (!organizer) return null
  const organizerId = organizer.id

  const eventStatuses = await prisma.eventStatus.findMany({
    select: { id: true, symbol: true },
  })

  for (const eventRaw of dataEvents) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { statusSymbol, ...eventSanitized } = eventRaw

    const status = eventStatuses.find(
      status => status.symbol === eventRaw.statusSymbol,
    )
    if (!status) return null

    const event = await prisma.event.upsert({
      where: { slug: eventRaw.slug },
      update: {
        ...eventSanitized,
        statusId: status.id,
        organizerId,
      },
      create: {
        ...eventSanitized,
        statusId: status.id,
        organizerId,
      },
    })

    if (!event) return null

    console.info(`📜 Upserted event ${event.title} / ${event.slug}`)
  }
}

main()
  .then(async () => {
    console.info("\n🏁 Seeding complete")
    await prisma.$disconnect()
  })
  .catch(e => {
    console.error(e)
    console.error("\n⛔ Seeding failed")
    prisma.$disconnect()
    process.exit(1)
  })
