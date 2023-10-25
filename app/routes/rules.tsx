import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { stringify } from "~/utils/string"

export const meta: MetaFunction = () => [
	{ title: "BandungDev Community Rules" },
	{ name: "description", content: "Community rules for BandungDev." },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const rules = await prisma.user.findMany()
	return json({ rules })
}

export default function EventsRoute() {
	const { rules } = useLoaderData<typeof loader>()

	return (
		<div>
			<section className="section-auto">
				<header className="space-y-4">
					<h1>Community Rules</h1>
					<p>Still in progress</p>
				</header>
			</section>

			<section className="section-auto space-y-4">
				<pre>{stringify(rules)}</pre>
			</section>
		</div>
	)
}
