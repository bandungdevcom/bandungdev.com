import { Link } from "@remix-run/react"

import { ButtonLink } from "~/components/ui/button-link"
import { formatPublished } from "~/utils/datetime"
export interface Event {
  slug: string
  title: string
  description: string
  date: string
  image: {
    url: string
  }
}
export function EventItem({ event }: { event: Event }) {
  if (!event) return null

  return (
    <div className="flex flex-col justify-between gap-4 overflow-hidden rounded-lg shadow-xl sm:flex-row">
      <div>
        <Link
          className="focus-ring block basis-8/12 transition hover:opacity-75 "
          to={`/events/${event.slug}`}
        >
          <img
            className=" aspect-video w-full bg-cover sm:h-40 lg:h-80"
            alt={event.title}
            onError={e => {
              e.currentTarget.src =
                "images/covers/bandungdev-cover-luma-sharing.png"
            }}
            src={
              event.image?.url ||
              "images/covers/bandungdev-cover-luma-sharing.png"
            }
          />
        </Link>
      </div>

      <div className="flex-1 shrink-0 basis-44 space-y-2 p-6">
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
          <time>{formatPublished(event.date)}</time>
        </p>

        <ButtonLink variant="secondary" size="sm" to={`/events/${event.slug}`}>
          View Event
        </ButtonLink>
      </div>
    </div>
  )
}
