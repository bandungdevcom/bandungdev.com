import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"
import { type modelEvent } from "~/models/event.server"
import { type JsonifyValues } from "~/types/jsonify"

import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import {
  formatPublished,
  formatPublishedWithTime,
  formatTime,
} from "~/utils/datetime"

export function EventItem({
  event,
}: {
  event: JsonifyValues<Prisma.PromiseReturnType<typeof modelEvent.getBySlug>>
}) {
  const imageUrl =
    event?.image?.url || "/images/covers/bandungdev-cover-luma-sharing.png"

  const isHybrid = event?.category?.symbol === "HYBRID"
  const isInPerson = event?.category?.symbol === "IN_PERSON"
  const isOnline = event?.category?.symbol === "ONLINE"

  const hybridLocationText = `${event?.location?.label} ${
    Boolean(event?.location?.label) && Boolean(event?.media?.name) && "/"
  } ${event?.media?.name}`

  return (
    <div className="flex flex-col justify-between gap-4 overflow-hidden md:flex-row md:gap-8">
      <div>
        <Link
          className="focus-ring block transition hover:opacity-75 "
          to={`/events/${event?.slug}`}
        >
          <img
            className="aspect-video w-full bg-cover object-cover md:h-60 md:max-w-xl lg:h-80"
            alt={event?.title}
            src={imageUrl}
          />
        </Link>
      </div>

      <div className="flex-1 shrink-0 space-y-2">
        <div>
          <h3>
            <Link
              to={`/events/${event?.slug}`}
              className="focus-ring transition hover:text-primary"
            >
              {event?.title}
            </Link>
          </h3>

          <p>{event?.description}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          <time>
            <span>{formatPublished(event?.dateTimeStart)}</span>
            <br />
            <span className="text-muted-foreground">
              {formatTime(event?.dateTimeStart)} –{" "}
              {formatPublished(event?.dateTimeStart) !==
              formatPublished(event?.dateTimeEnd)
                ? formatPublishedWithTime(event?.dateTimeEnd)
                : formatTime(event?.dateTimeEnd)}{" "}
              WIB
            </span>
          </time>
        </p>

        {isHybrid && (
          <p className="flex flex-row items-center gap-1">
            <Iconify className="text-2xl" icon="ph:map-pin" />{" "}
            {hybridLocationText}
          </p>
        )}

        {isInPerson && (
          <p className="flex flex-row items-center gap-1">
            <Iconify className="text-2xl" icon="ph:map-pin" />{" "}
            {event?.location?.label}
          </p>
        )}

        {isOnline && (
          <p className="flex flex-row items-center gap-1">
            <Iconify className="text-2xl" icon="ph:map-pin" />{" "}
            {event?.media?.name}{" "}
          </p>
        )}

        <ButtonLink variant="secondary" size="sm" to={`/events/${event?.slug}`}>
          View Event
        </ButtonLink>
      </div>
    </div>
  )
}
