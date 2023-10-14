import { formatDateTimeRelative } from "~/utils";

export function EventsList({
  events,
}: {
  events: {
    title: string;
    id: string;
    description: string | null;
    datetime: Date | null;
  }[];
}) {
  return (
    <div>
      <ul className="space-y-10">
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <time>{formatDateTimeRelative(event.datetime)}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}
