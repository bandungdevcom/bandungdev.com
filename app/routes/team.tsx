import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { stringify } from "~/utils/string"

export const meta: MetaFunction = () => [
	{ title: "BandungDev Team" },
	{ name: "description", content: "Community team members of BandungDev." },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const [teamMembers] = await prisma.$transaction([
		prisma.user.findMany({
			where: { tags: { some: { symbol: "TEAM" } } },
			include: { tags: true },
		}),
	])
	return json({ teamMembers })
}

export default function EventsRoute() {
	const { teamMembers } = useLoaderData<typeof loader>()

	return (
		<div>
			<section className="section-auto">
				<header className="space-y-4">
					<h1>Team Members</h1>
					<p>Will be updated soon</p>
				</header>
			</section>

			<section className="section-auto space-y-4">
				<pre>{stringify(teamMembers)}</pre>
			</section>
		</div>
	)
}
