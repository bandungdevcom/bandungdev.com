import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { TeamMembers } from "~/components/shared/team-members"

export const meta: MetaFunction = () => [
  { title: "BandungDev Members" },
  { name: "description", content: "Community members of BandungDev." },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const members = await prisma.user.findMany({
    where: {
      tags: {
        some: {
          symbol: "MEMBER",
        },
      },
    },
  })

  return json({ members })
}

export default function EventsRoute() {
  const { members } = useLoaderData<typeof loader>()

  return (
    <div>
      <section className="section-team">
        <header className="space-y-4">
          <h1>Community Members</h1>
        </header>
      </section>

      <section className="section-team space-y-4">
        <TeamMembers teamMembers={members} />
      </section>
    </div>
  )
}
