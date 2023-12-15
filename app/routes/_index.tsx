import { type MetaFunction } from "@remix-run/node"
import { ContentIntro } from "~/components/contents/intro"
import { BackgroundGradient } from "~/components/shared/background-gradient"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/", 1)

export const meta: MetaFunction = () =>
  createMeta({
    title: "BandungDev",
    description: "Developer community in Bandung, West Java, Indonesia.",
  })

export default function IndexRoute() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4">
      <BackgroundGradient />

      <section className="site-section py-32 sm:py-40">
        <ContentIntro />
      </section>

      <section className="mx-auto w-full max-w-7xl">
        <img
          src="/photos/bandungdev-photo-collage.jpg"
          alt="BandungDev Collage"
          width={2000}
          height={1300}
          className="select-none rounded-md"
        />
      </section>
    </div>
  )
}
