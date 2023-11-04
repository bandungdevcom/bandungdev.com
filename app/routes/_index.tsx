import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { EventsList } from "~/components/shared/events"
import { ButtonLink } from "~/components/ui/button-link"

export const meta: MetaFunction = () => {
  return [
    { title: "BandungDev" },
    {
      name: "description",
      content: "Komunitas developer Bandung yang terkurasi.",
    },
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [upcomingEvents, pastEvents] = await prisma.$transaction([
    prisma.event.findMany({
      where: {
        datetime: { gte: new Date() },
        isFeatured: true,
      },
    }),
    prisma.event.findMany({
      where: {
        datetime: { lte: new Date() },
        isFeatured: true,
      },
    }),
  ])

  return json({ upcomingEvents, pastEvents })
}

export default function Index() {
  const { upcomingEvents, pastEvents } = useLoaderData<typeof loader>()

  return (
    <div>
      <section className="section-auto sm:py-16 md:py-28">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 transition-all hover:ring-slate-900/20">
            BandungDev website is a work in progress
          </div>
        </div>

        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-7xl">
            BandungDev
          </h1>

          <p className="text-base text-secondary-foreground sm:text-lg">
            The curated software developer and engineering community in Bandung,
            Indonesia. BandungDev is collaborating with various other tech
            communities. We aim to improve the educational activities.{" "}
            <code>#HelloHelloBandungDev</code>
          </p>

          <div className="flex-center flex-wrap gap-4">
            <ButtonLink size="lg" to="/signup">
              Sign Up
            </ButtonLink>
            <ButtonLink size="lg" to="/events" variant="secondary">
              Explore Events
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-content space-y-8">
        <h2>Upcoming Events</h2>
        <EventsList events={upcomingEvents} />
      </section>

      <section className="section-content space-y-8">
        <h2>Past Events</h2>
        <EventsList events={pastEvents} />
      </section>
    </div>
  )
}
