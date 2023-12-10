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
          "absolute -z-10 block h-96 w-full",
          "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
          "from-slate-300 via-slate-200/25 to-slate-100/20",
          "dark:from-slate-800 dark:via-slate-900/25 dark:to-slate-950/20",
        )}
      />

      <div className="site-section pt-32 sm:pt-40">
        <ContentIntro />
      </div>
    </div>
  )
}
