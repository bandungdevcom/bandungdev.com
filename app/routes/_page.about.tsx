import { type MetaFunction } from "@remix-run/node"

import { Iconify } from "~/components/ui/iconify"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `About`,
    description: `About BandungDev Remix web app template kit`,
  })

export default function AboutRoute() {
  return (
    <div className="site-container space-y-12">
      <header className="site-header">
        <h1 className="inline-flex items-center gap-2">
          <Iconify icon="ph:info-duotone" />
          <span className="text-gradient">About</span>
        </h1>
      </header>

      <section className="site-section prose-config">
        <h1>The story of BandungDev</h1>
        <p>This is the paragraph after heading one.</p>
      </section>
    </div>
  )
}
