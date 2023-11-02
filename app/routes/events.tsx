import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node"
import {
	Form,
	useLoaderData,
	useNavigation,
	useSearchParams,
} from "@remix-run/react"
import type { Prisma } from "@prisma/client"
import type { DefaultArgs } from "@prisma/client/runtime/library"

import { prisma } from "~/libs/db.server"
import { EventsList } from "~/components/shared/events"
import { SearchInput } from "~/components/ui/search-input"

export const meta: MetaFunction = () => [
	{ title: "BandungDev Events" },
	{ name: "description", content: "Community events by BandungDev." },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const routeUrl = new URL(request.url)
	const keyword = routeUrl.searchParams.get("keyword")

	let filterArgs: Prisma.EventFindManyArgs<DefaultArgs> = {}

	if (keyword) {
		filterArgs = {
			where: {
				OR: [
					{
						title: {
							contains: keyword,
						},
					},
					{
						description: {
							contains: keyword,
						},
					},
				],
			},
		}
	}

	const events = await prisma.event.findMany(filterArgs)
	return json({ events })
}

export default function EventsRoute() {
	const { events } = useLoaderData<typeof loader>()
	const [searchParams] = useSearchParams()
	const { state } = useNavigation()

	const isSearching = state === "loading"

	return (
		<div>
			<div className="spectrum-background" />

			<section className="section-auto relative">
				<header className="space-y-4">
					<h1 className="mb-10 text-center">Event</h1>
					<Form className="relative w-full">
						<SearchInput
							className="block w-full pr-12"
							placeholder="Cari event, contoh: Javascript"
							name="keyword"
							defaultValue={searchParams.get("keyword") || ""}
						/>

						<button className="absolute right-5 top-3 md:top-4" type="submit">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</button>
					</Form>
				</header>
			</section>

			<section className="section-content relative space-y-4">
				{isSearching ? <p>Searching...</p> : <EventsList events={events} />}
			</section>
		</div>
	)
}
