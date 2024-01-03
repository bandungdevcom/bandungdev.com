import { json } from "@remix-run/node"

import { useLoaderData } from "@remix-run/react"
import { ContentEvents } from "~/components/contents/events"
import { ContentIntro } from "~/components/contents/intro"
import { ContentMembers } from "~/components/contents/members"
import { BackgroundGradient } from "~/components/shared/background-gradient"
import { prisma } from "~/libs/db.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/", 1)

export const loader = async () => {
  const [upcomingEvents, pastEvents, users] = await prisma.$transaction([
    prisma.event.findMany({
      where: {
        status: { OR: [{ symbol: "PUBLISHED" }] },
        dateTimeEnd: { gte: new Date() },
      },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { image: { select: { url: true } } },
    }),
    prisma.event.findMany({
      where: {
        status: { OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }] },
        dateTimeEnd: { lte: new Date() },
      },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { image: { select: { url: true } } },
    }),
    prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { images: { select: { url: true } } },
    }),
  ])

  return json({ upcomingEvents, pastEvents, users })
}

export default function IndexRoute() {
  const { pastEvents, upcomingEvents, users } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl space-y-20 px-4 sm:space-y-32">
      <section>
        <BackgroundGradient />
        <div className="site-section pb-16 pt-32 sm:pb-20 sm:pt-40">
          <ContentIntro />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl">
        <img
          src="/photos/bandungdev-photo-collage.jpg"
          alt="BandungDev Collage"
          width={2000}
          height={1300}
          className="select-none rounded-md"
        />
      </section>

      <section className="site-section max-w-4xl">
        <ContentEvents
          events={upcomingEvents}
          title="Upcoming Events"
          subtitle="See our upcoming events and join us!"
          emptyText="There are no upcoming events again yet"
        />
      </section>

      <section className="site-section max-w-4xl">
        <ContentEvents
          events={pastEvents}
          title="Past Events"
          subtitle="Some of the finished events"
          emptyText="There are no past events"
          withSeeMore
        />
      </section>

      <section className="site-section max-w-4xl">
        <ContentMembers
          title="Newly Joined Community Members"
          subtitle="Join our community and meet other developers in Bandung"
          users={users}
          withSeeMore
        />
      </section>
    </div>
  )
}
