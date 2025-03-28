import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { FormActionItemNew } from "~/components/shared/form-action-item"
import { FormDelete } from "~/components/shared/form-delete"

import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { PostItemAction } from "~/components/shared/post-item-action"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { getActionItem } from "~/configs/action-item"
import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `Admin Posts`,
    description: `Manage all posts`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { userId } = await requireUser(request)

  const { searchParams } = new URL(request.url)
  const config = getPaginationConfigs({ request })
  const search = searchParams.get("search")

  const where = search
    ? {
        OR: [
          { title: { contains: search } },
          { slug: { contains: search } },
          { content: { contains: search } },
        ],
      }
    : {}

  const [totalItems, posts] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      include: {
        status: true,
      },
      orderBy: { updatedAt: "desc" },
      take: config.limitParam,
      skip: config.skip,
    }),
  ])

  return json({
    userId,
    posts,
    ...getPaginationOptions({ request, totalItems }),
  })
}

export default function AdminPostsRoute() {
  const { userId, posts, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header justify-between gap-4">
        <h2>Posts</h2>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <FormActionItemNew item={getActionItem("Post")} />
          <ButtonLink to="/posts" variant="outline" size="xs">
            <Iconify icon="ph:arrow-square-out-duotone" />
            <span>View Posts</span>
          </ButtonLink>
          <FormDelete
            action="/admin/posts/delete"
            intentValue="admin-delete-all-posts"
            itemText="all posts"
            buttonText="Delete Posts"
            requireUser
            userId={userId}
            disabled={posts.length <= 0}
          />
        </div>
      </header>

      <section className="app-section">
        <PaginationSearch
          itemName="post"
          searchPlaceholder="Search posts with keyword..."
          count={posts.length}
          {...loaderData}
        />
      </section>

      <section className="app-section">
        {posts.length > 0 && (
          <ul className="divide-y">
            {posts.map(post => (
              <PostItemAction key={post.id} post={post as any} />
            ))}
          </ul>
        )}
      </section>

      <section className="app-section">
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}
