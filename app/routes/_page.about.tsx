import { json, type MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { ContentAbout } from "~/components/contents/about"
import ContentTeam from "~/components/contents/team"
import { BackgroundGradientFullHeight } from "~/components/shared/background-gradient-full-height"
import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `About`,
    description: `About BandungDev Remix web app template kit`,
  })

export const loader = async () => {
  const [teamCommitee, teamDeveloper] = await prisma.$transaction([
    prisma.user.findMany({
      where: {
        tags: {
          some: {
            symbol: "TEAM"
          }
        }
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
        profile: {
          select: {
            headline: true,
            bio: true
          }
        }
      }
    }),
    prisma.user.findMany({
      where: {
        tags: {
          some: {
            symbol: "DEVELOPER"
          }
        }
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
        profile: {
          select: {
            headline: true,
            bio: true
          }
        }
      }
    })
  ])

  return json({
    teamCommitee,
    teamDeveloper
  })
}

export default function AboutRoute() {
  const { teamCommitee, teamDeveloper } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4">
      <BackgroundGradientFullHeight/>

      <section className="site-section py-32 sm:py-40">
        <ContentAbout />
      </section>

      <section className="site-container py-32 sm:py-40">
        <ContentTeam title="Main Committee Team" team={teamCommitee} />
      </section>

      <section className="site-container py-32 sm:py-40">
        <ContentTeam title="Website Team" team={teamDeveloper} />
      </section>
    </div>
  )
}
