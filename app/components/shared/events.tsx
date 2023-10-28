import { type Event } from "@prisma/client"

import { formatDateTimeRelative } from "~/utils/datetime"
import { Card } from "~/components/ui/card"

export function EventsList({ events }: { events: Event[] }) {
	if (events.length <= 0) {
		return <p>No events or still in planning.</p>
	}

	return (
		<ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{events.map(event => (
				<li key={event.id}>
					<Card className="h-full rounded-xl p-6">
						<div className="w-full overflow-hidden rounded-lg">
							<img
								className="aspect-video w-full rounded-lg"
								src="https://picsum.photos/300/200"
								alt={event.title}
							/>
						</div>

						<div className="mt-5 space-y-4">
							<h3>{event.title}</h3>
							<p className="text-muted-foreground">{event.description}</p>
							<p>
								<time>{formatDateTimeRelative(event.datetime)}</time>
							</p>
						</div>
					</Card>
				</li>
			))}
		</ul>
	)
}
