import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { FormActionItemNew } from "~/components/shared/form-action-item"
import { FormDelete } from "~/components/shared/form-delete"

import { EventItemAction } from "~/components/shared/event-item-action"
import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { getActionItem } from "~/configs/action-item"
import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Events`,
    description: `Manage user events`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // IDEA: Refactor this into a model
  const config = getPaginationConfigs({ request })
  const { userId } = await requireUser(request)

  const where = !config.queryParam
    ? {}
    : {
        OR: [
          { slug: { contains: config.queryParam } },
          { title: { contains: config.queryParam } },
        ],
      }

  const [totalItems, events] = await prisma.$transaction([
    prisma.event.count({ where }),
    prisma.event.findMany({
      where,
      skip: config.skip,
      take: config.limitParam,
      orderBy: { updatedAt: "desc" },
      include: {
        status: { select: { symbol: true, name: true } },
        image: { select: { url: true } },
      },
    }),
  ])

  return json({
    userId,
    events,
    ...getPaginationOptions({ request, totalItems }),
  })
}

export default function UserEventsRoute() {
  const { userId, events, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header justify-between gap-4">
        <h2>Events</h2>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <FormActionItemNew item={getActionItem("Event")} />
          <ButtonLink to="/events" variant="outline" size="xs">
            <Iconify icon="ph:arrow-square-out-duotone" />
            <span>View Events</span>
          </ButtonLink>
          <FormDelete
            action="/admin/events/delete"
            intentValue="user-delete-all-events"
            itemText="all events"
            buttonText="Delete Events"
            requireUser
            userId={userId}
            disabled={events.length <= 0}
          />
        </div>
      </header>

      <section className="app-section">
        <PaginationSearch
          itemName="event"
          searchPlaceholder="Search events with keyword..."
          count={events.length}
          {...loaderData}
        />
      </section>

      <section className="app-section">
        {events.length > 0 && (
          <ul className="divide-y">
            {events.map(event => (
              <EventItemAction key={event.id} event={event as any} />
            ))}
          </ul>
        )}
      </section>

      <section className="app-section">
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}
