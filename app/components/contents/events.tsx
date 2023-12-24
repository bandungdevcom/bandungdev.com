import { EventItem, type Event } from "~/components/shared/event-item"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"

export function ContentEvents({
  events,
  title = "Events",
  subtitle,
  emptyText = "No events",
  withSeeMore,
}: {
  events: Event[]
  title: string
  subtitle?: string
  emptyText?: string
  withSeeMore?: boolean
}) {
  const hasEvents = events.length > 0

  return (
    <div>
      <h2 className={cn("text-3xl font-bold", subtitle ? "mb-4" : "mb-10")}>
        {title}
      </h2>

      {subtitle && <h3 className="mb-10 sm:text-lg">{subtitle}</h3>}

      <div className="grid grid-cols-1 gap-8">
        {!hasEvents && <p className="text-muted-foreground">{emptyText}</p>}
        {hasEvents && (
          <ul className="space-y-10 md:space-y-20">
            {events.map(event => (
              <li key={event.title}>
                <EventItem event={event} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {withSeeMore && (
        <div className="mt-20 flex justify-center">
          <ButtonLink to="/events" variant="default" size="lg">
            <Iconify icon="ph:calendar-blank" />
            <span>See More Events</span>
          </ButtonLink>
        </div>
      )}
    </div>
  )
}
