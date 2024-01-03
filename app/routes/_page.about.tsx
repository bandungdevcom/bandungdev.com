import { json, type MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { ContentAbout } from "~/components/contents/about"
import { ContentTeam } from "~/components/contents/team"
import { modelUser } from "~/models/user.server"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `About BandungDev and Team`,
    description: `Story and team of the curated Bandung developer community.`,
  })

export const loader = async () => {
  const teamUsers = await modelUser.getAllByTag({ tag: "TEAM" })
  return json({ teamUsers })
}

export default function AboutRoute() {
  const { teamUsers } = useLoaderData<typeof loader>()

  return (
    <div className="site-container space-y-12">
      <section className="site-section">
        <ContentAbout />
      </section>

      <section>
        <ContentTeam title="Our Team" users={teamUsers} />
      </section>
    </div>
  )
}
