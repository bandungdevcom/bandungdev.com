import { type MetaFunction } from "@remix-run/node"
import { ContentIntro } from "~/components/contents/intro"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/", 1)

export const meta: MetaFunction = () =>
  createMeta({
    title: "BandungDev",
    description:
      "Web app template kit using Remix, React, Tailwind CSS, Radix UI, Prisma ORM, and more.",
  })

export default function IndexRoute() {
  return (
    <div className="site-container space-y-12">
      <section className="site-section">
        <ContentIntro />
      </section>
    </div>
  )
}
