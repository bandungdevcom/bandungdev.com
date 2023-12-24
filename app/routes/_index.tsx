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
  // FIXME: Use Prisma transactions to concurrently get all 3 arrays

  const upcomingEvents = await prisma.event.findMany({
    where: {
      status: { OR: [{ symbol: "PUBLISHED" }] },
      date: { gte: new Date() },
    },
    take: 4,
    orderBy: { updatedAt: "desc" },
    include: { image: { select: { url: true } } },
  })

  const pastEvents = await prisma.event.findMany({
    where: {
      status: { OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }] },
      date: { lte: new Date() },
    },
    take: 3,
    orderBy: { updatedAt: "desc" },
    include: { image: { select: { url: true } } },
  })

  const users = await prisma.user.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { images: { select: { url: true } } },
  })

  return json({ upcomingEvents, pastEvents, users })
}

export default function IndexRoute() {
  const { pastEvents, upcomingEvents, users } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl space-y-20 px-4 sm:space-y-32">
      <BackgroundGradient />

      <section className="site-section py-32 sm:py-40">
        <ContentIntro />
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

      <section>
        <ContentEvents
          events={upcomingEvents as any}
          title="Upcoming Events"
          subtitle="See our upcoming events and join us!"
          emptyText="There are no upcoming events again yet"
        />
      </section>

      <section>
        <ContentEvents
          events={pastEvents as any}
          title="Past Events"
          subtitle="Some of the finished events"
          emptyText="There are no past events"
          withSeeMore
        />
      </section>

      <section>
        <ContentMembers
          title="Newly Joined Community Members"
          subtitle="Join our community and meet other developers in Bandung"
          users={users as any}
          withSeeMore
        />
      </section>
    </div>
  )
}
