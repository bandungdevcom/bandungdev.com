import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import LatestEvents from "~/components/contents/event-latest"
import { ContentIntro } from "~/components/contents/intro"
import { BackgroundGradient } from "~/components/shared/background-gradient"
import { prisma } from "~/libs/db.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/", 1)

export const loader = async ({ request }: LoaderFunctionArgs) => {
  /**
   * As searching and filtering might be complex,
   * use Prisma directly, it might be refactored later into the models
   */
  const events = await prisma.event.findMany({
    where: {
      status: {
        OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }],
      },
    },
    take: 3,
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      image: { select: { id: true, url: true } },
    },
  })

  return json({
    events,
  })
}

export default function IndexRoute() {
  const { events } = useLoaderData<typeof loader>()
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
      <section className="mt-20">
        <LatestEvents
          events={
            events?.map(event => ({
              description: event.description,
              image: {
                url: event.image?.url ?? "",
              },
              slug: event.slug,
              title: event.title,
              updatedAt: event.updatedAt,
            })) ?? []
          }
        />
      </section>
    </div>
  )
}
