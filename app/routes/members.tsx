import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { prisma } from '~/libs/db.server'
import { stringify } from '~/utils/string'

export const meta: MetaFunction = () => [
	{ title: 'BandungDev Members' },
	{ name: 'description', content: 'Community members of BandungDev.' },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const members = await prisma.user.findMany()
	return json({ members })
}

export default function EventsRoute() {
	const { members } = useLoaderData<typeof loader>()

	return (
		<div>
			<section className="section-auto">
				<header className="space-y-4">
					<h1>Community Members</h1>
					<p>Will be updated soon</p>
				</header>
			</section>

			<section className="section-auto space-y-4">
				<pre>{stringify(members)}</pre>
			</section>
		</div>
	)
}
