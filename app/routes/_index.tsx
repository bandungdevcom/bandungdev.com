import { type MetaFunction } from "@remix-run/node"
import { ContentIntro } from "~/components/contents/intro"
import { cn } from "~/utils/cn"
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
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4">
      <div
        className={cn(
          "absolute -z-10 block h-96 w-11/12",
          "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
          "from-slate-300 via-slate-200/25 to-slate-100/20",
          "dark:from-slate-800 dark:via-slate-900/25 dark:to-slate-950/20",
        )}
      />

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
