import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { EventItem } from "~/components/shared/event-item"
import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { Iconify } from "~/components/ui/iconify"
import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `Events`,
    description: `Various events`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // IDEA: Refactor this into a model
  const config = getPaginationConfigs({ request })
  const contains = config.queryParam

  /**
   * Custom query config, can be different for any cases
   * This show the 1st page result even if there's no query
   */
  const where = !contains
    ? {
        status: {
          OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }],
        },
      }
    : {
        OR: [{ title: { contains } }, { slug: { contains } }],
        status: {
          OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }],
        },
      }

  /**
   * As searching and filtering might be complex,
   * use Prisma directly, it might be refactored later into the models
   */
  const [totalItems, events] = await prisma.$transaction([
    prisma.event.count({ where }),
    prisma.event.findMany({
      where,
      skip: config.skip,
      take: config.limitParam,
      orderBy: { updatedAt: "desc" },
      include: {
        image: { select: { id: true, url: true } },
      },
    }),
  ])

  return json({
    ...getPaginationOptions({ request, totalItems }),
    events,
  })
}

export default function SearchRoute() {
  const { events, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="site-container space-y-12">
      <header className="site-header">
        <h1 className="inline-flex items-center gap-2">
          <Iconify icon="ph:scroll-duotone" />
          <span className="text-gradient">Events</span>
        </h1>
      </header>

      <section className="site-section">
        <PaginationSearch
          itemName="event"
          searchPlaceholder="Search events with keyword..."
          count={events.length}
          {...loaderData}
        />
      </section>

      <section className="site-section">
        <ul className="space-y-12">
          {events.map(event => (
            <li key={event.id}>
              <EventItem event={event as any} />
            </li>
          ))}
        </ul>
      </section>

      <section className="site-section">
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}
