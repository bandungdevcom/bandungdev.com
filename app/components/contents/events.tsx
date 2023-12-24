import clsx from "clsx"
import { EventItem, type Event } from "~/components/shared/event-item"
import { ButtonLink } from "~/components/ui/button-link"

const Events = ({
  events,
  title,
  withSeeMore,
  subtitle,
}: {
  events: Event[]
  title: string
  withSeeMore?: boolean
  subtitle?: string
}) => {
  return (
    <div>
      <h2 className={clsx("text-3xl font-bold", subtitle ? "mb-4" : "mb-10")}>
        {title}
      </h2>
      {subtitle && <p className="mb-10 sm:text-lg">{subtitle}</p>}
      <div className="grid grid-cols-1 gap-8">
        <ul className="space-y-12">
          {events.map(event => (
            <li key={event.title}>
              <EventItem event={event} />
            </li>
          ))}
        </ul>
      </div>
      {withSeeMore && (
        <div className="mt-20 flex justify-center">
          <ButtonLink to="/events" variant="default" size="lg">
            See More Events
          </ButtonLink>
        </div>
      )}
    </div>
  )
}

export default Events
