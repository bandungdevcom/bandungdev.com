import { Link } from "@remix-run/react"

import { ButtonLink } from "~/components/ui/button-link"
import {
  formatPublished,
  formatPublishedWithTime,
  formatTime,
} from "~/utils/datetime"
import { Iconify } from "../ui/iconify"

export interface Event {
  slug: string
  title: string
  description: string
  dateTimeStart: string
  dateTimeEnd: string
  image: {
    url: string
  } | null
  location: {
    label: string
  } | null
  media: {
    name: string
  } | null
  category: {
    symbol: string
  } | null
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
          <time>
            <span>{formatPublished(event.dateTimeStart)}</span>
            <br />
            <span className="text-muted-foreground">
              {formatTime(event.dateTimeStart)} –{" "}
              {formatPublished(event.dateTimeStart) !==
              formatPublished(event.dateTimeEnd)
                ? formatPublishedWithTime(event.dateTimeEnd)
                : formatTime(event.dateTimeEnd)}{" "}
              WIB
            </span>
          </time>
        </p>

        {event.category?.symbol === "HYBRID" ? (
          <p className="flex flex-row items-center gap-1">
            <Iconify className="text-2xl" icon="ph:map-pin" />{" "}
            {`${event.location?.label} / ${event.media?.name}`}
          </p>
        ) : event.category?.symbol === "IN_PERSON" ? (
          <p className="flex flex-row items-center gap-1">
            <Iconify className="text-2xl" icon="ph:map-pin" />{" "}
            {event.location?.label}
          </p>
        ) : event.category?.symbol === "ONLINE" ? (
          <p className="flex flex-row items-center gap-1">
            <Iconify className="text-2xl" icon="ph:map-pin" />{" "}
            {event.media?.name}{" "}
          </p>
        ) : (
          <div />
        )}

        <ButtonLink variant="secondary" size="sm" to={`/events/${event.slug}`}>
          View Event
        </ButtonLink>
      </div>
    </div>
  )
}
