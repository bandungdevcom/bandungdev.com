import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { TeamMembers } from "~/components/shared/team-members"

export const meta: MetaFunction = () => [
	{ title: "BandungDev Team" },
	{ name: "description", content: "Community team members of BandungDev." },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const [mainTeamMembers] = await prisma.$transaction([
		prisma.user.findMany({
			where: { tags: { some: { symbol: "TEAM" } } },
			include: { tags: true },
		}),
	])
	return json({ mainTeamMembers })
}

export default function TeamRoute() {
	const { mainTeamMembers } = useLoaderData<typeof loader>()

	return (
		<div>
			<section className="section-auto">
				<header className="space-y-4">
					<h1>Team Members</h1>
				</header>
			</section>

			<section className="section-auto space-y-4">
				<h2>Main Committe Team</h2>
				<TeamMembers teamMembers={mainTeamMembers as any} />
			</section>
		</div>
	)
}
