import { type User } from "@prisma/client"

import type { Jsonify } from "~/types/jsonify"
import { Card } from "~/components/ui/card"

export function TeamMembers({ teamMembers }: { teamMembers: Jsonify<User>[] }) {
	if (teamMembers.length <= 0) {
		return <p>There are no members yet.</p>
	}

	return (
		<div className="space-y-4">
			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{teamMembers.map(member => (
					<li key={member.id}>
						<Card className="flex h-full flex-col gap-4 p-4">
							<img
								className="h-24 w-24 rounded-full object-cover"
								src={
									member.imageURL ||
									`https://api.dicebear.com/7.x/thumbs/svg?seed=${
										member.fullname || "anonym"
									}`
								}
								alt={member.fullname || "anonym"}
							/>
							<div className="line-clamp-2 flex flex-1 flex-col gap-1 space-y-4">
								<div>
									<h3>{member.fullname || "anonym"}</h3>
									<p className="text-primary">{`@${
										member.username || "anonym"
									}`}</p>
								</div>
								<p className="font-medium text-muted-foreground">
									{member.role && (
										<>
											{member.role}
											<br />
										</>
									)}
									{member.affiliation && (
										<>
											{member.affiliation}
											<br />
										</>
									)}
									{member.bio && (
										<span className="font-normal">{member.bio}</span>
									)}
								</p>
							</div>
						</Card>
					</li>
				))}
			</ul>
		</div>
	)
}
