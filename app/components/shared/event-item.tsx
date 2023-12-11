import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"

import { ImageCover } from "~/components/shared/image-cover"
import { ButtonLink } from "~/components/ui/button-link"
import { type modelEvent } from "~/models/event.server"
import { formatPublished } from "~/utils/datetime"

export function EventItem({
  event,
}: {
  event: Prisma.PromiseReturnType<typeof modelEvent.getBySlug>
}) {
  if (!event) return null

  return (
    <div className="flex justify-between gap-4">
      <Link
        className="focus-ring block basis-8/12 transition hover:opacity-75"
        to={`/events/${event.slug}`}
      >
        <ImageCover src={event.image?.url} />
      </Link>

      <div className="basis-4/12 space-y-2">
        <div>
          <h3>
            <Link
              to={`/events/${event.slug}`}
              className="focus-ring transition hover:text-primary"
            >
              {event.title}
            </Link>
          </h3>

          <p className="hidden sm:block">{event.description}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          <time>{formatPublished(event.updatedAt)}</time>
        </p>

        <ButtonLink variant="secondary" size="sm" to={`/events/${event.slug}`}>
          View Event
        </ButtonLink>
      </div>
    </div>
  )
}
