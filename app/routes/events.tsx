import { useState } from "react"
import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { EventsList } from "~/components/shared/events"
import { SearchInput } from "~/components/ui/search-input"

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
	const [searchValue, setSearchValue] = useState("")

	return (
		<div>
			<div className="spectrum-background" />

			<section className="section-auto relative">
				<header className="space-y-4">
					<h1 className="mb-10 text-center">Event</h1>
					<SearchInput
						className="mx-auto block max-w-md"
						placeholder="Cari event, contoh: Javascript"
						value={searchValue}
						setValue={evt => setSearchValue(evt.target.value)}
					/>
				</header>
			</section>

			<section className="section-content relative space-y-4">
				<EventsList events={events} />
			</section>
		</div>
	)
}
