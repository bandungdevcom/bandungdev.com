import { type MetaFunction } from "@remix-run/node"
import { ContentAbout } from "~/components/contents/about"
import { BackgroundGradientFullHeight } from "~/components/shared/background-gradient-full-height"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `About`,
    description: `About BandungDev Remix web app template kit`,
  })

export default function AboutRoute() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4">
      <BackgroundGradientFullHeight/>

      <section className="site-section py-32 sm:py-40">
        <ContentAbout />
      </section>
    </div>
  )
}
