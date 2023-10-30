import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { EventsList } from "~/components/shared/events"

export const meta: MetaFunction = () => [
	{ title: "BandungDev Events" },
	{ name: "description", content: "Community events by BandungDev." },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const events = await prisma.event.findMany()
	return json({ events })
}

export default function EventsRoute() {
	const { events } = useLoaderData<typeof loader>()

	return (
		<div>
			<section className="section-auto">
				<header className="space-y-4">
					<h1>Events</h1>
					<p>More info coming soon</p>
				</header>
			</section>

			<section className="section-auto space-y-4">
				<h2>Public Events</h2>
				<EventsList events={events} />
			</section>
		</div>
	)
}
