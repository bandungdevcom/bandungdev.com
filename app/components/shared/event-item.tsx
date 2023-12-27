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
  const imageUrl =
    event.image?.url || "/images/covers/bandungdev-cover-luma-sharing.png"

  return (
    <div className="flex flex-col justify-between gap-4 overflow-hidden md:flex-row md:gap-8">
      <div>
        <Link
          className="focus-ring block transition hover:opacity-75 "
          to={`/events/${event.slug}`}
        >
          <img
            className="aspect-video w-full bg-cover object-cover md:h-60 md:max-w-xl lg:h-80"
            alt={event.title}
            src={imageUrl}
          />
        </Link>
      </div>

      <div className="flex-1 shrink-0 space-y-2">
        <div>
          <h3>
            <Link
              to={`/events/${event.slug}`}
              className="focus-ring transition hover:text-primary"
            >
              {event.title}
            </Link>
          </h3>

          <p>{event.description}</p>
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
