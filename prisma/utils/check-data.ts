import { prisma } from "~/libs/db.server"
import { logEnv } from "~/utils/log.server"

async function checkData() {
  logEnv()

  console.info("👑 Count roles", await prisma.role.count())
  console.info("🔑 Count permissions", await prisma.permission.count())
  console.info("👤 Count user tags", await prisma.userTag.count())
  console.info("👤 Count users", await prisma.user.count())
  console.info("👤 Count user images", await prisma.userImage.count())
  console.info("👤 Count user profiles", await prisma.userProfile.count())
  console.info("📜 Count posts", await prisma.post.count())
  console.info("🪧 Count post statuses", await prisma.postStatus.count())
  console.info(
    "🪧 Count location categories",
    await prisma.locationCategory.count(),
  )
  console.info("📅 Count events", await prisma.event.count())
  console.info("🗓️ Count event statuses", await prisma.eventStatus.count())
}

checkData()
