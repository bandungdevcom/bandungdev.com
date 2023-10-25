import { type Event } from '@prisma/client'

import { formatDateTimeRelative } from '~/utils/datetime'
import { Card } from '~/components/ui/card'

export function EventsList({ events }: { events: Event[] }) {
	if (events.length <= 0) {
		return <p>No events or still in planning.</p>
	}

	return (
		<ul className="space-y-4">
			{events.map(event => (
				<li key={event.id}>
					<Card className="flex gap-4 p-4">
						<div>
							<img
								className="rounded-lg"
								src="https://picsum.photos/300/200"
								alt={event.title}
							/>
						</div>

						<div className="space-y-4">
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
