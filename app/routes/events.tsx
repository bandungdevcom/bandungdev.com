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
import { Icon } from "@iconify/react"
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

						<button className="absolute right-5 top-0 h-full" type="submit">
							<Icon icon="octicon:search-24" width={20} height={20} />
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
