import { EventItem, type Event } from "../shared/event-item"

const LatestEvents = ({ events }: { events: Event[] }) => {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold">Latest Events</h2>

      <div className="grid grid-cols-1 gap-8">
        <ul className="space-y-12">
          {events.map(event => (
            <li key={event.title}>
              <EventItem event={event} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LatestEvents
