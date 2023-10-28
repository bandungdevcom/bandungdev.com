import { type User } from "@prisma/client"

import { Card } from "~/components/ui/card"

export function TeamMembers({ teamMembers }: { teamMembers: User[] }) {
	if (teamMembers.length <= 0) {
		return <p>There are no members yet.</p>
	}

	return (
		<div className="space-y-4">
			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{teamMembers.map(member => (
					<li key={member.id}>
						<Card className="flex gap-4 p-4">
							<div className="h-28 w-24">
								<img
									className="h-full w-full rounded-lg object-cover"
									src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${
										member.fullname || "anonym"
									}`}
									alt={member.fullname || "anonym"}
								/>
							</div>

							<div className="line-clamp-2 flex-1 space-y-4">
								<h3>{member.fullname || "anonym"}</h3>
								<p className="text-muted-foreground">{`@${
									member.username || "anonym"
								}`}</p>
							</div>
						</Card>
					</li>
				))}
			</ul>
		</div>
	)
}
