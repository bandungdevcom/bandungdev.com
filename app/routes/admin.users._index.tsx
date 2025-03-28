import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { FormDelete } from "~/components/shared/form-delete"
import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `Admin Users`,
    description: `Manage all users`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { userId } = await requireUser(request)

  const config = getPaginationConfigs({ request })
  const where = !config.queryParam
    ? {}
    : {
        OR: [
          { fullname: { contains: config.queryParam } },
          { username: { contains: config.queryParam } },
          { email: { contains: config.queryParam } },
        ],
      }

  const [totalItems, users] = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        images: {
          select: {
            url: true,
          },
        },
      },
      skip: config.skip,
      take: 500,
      orderBy: { updatedAt: "desc" },
    }),
  ])

  return json({
    userId,
    users,
    ...getPaginationOptions({ request, totalItems }),
  })
}

export default function AdminUsersRoute() {
  const { userId, users, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header justify-between gap-4">
        <h2>Users</h2>
      </header>

      <section className="app-section">
        <PaginationSearch
          itemName="user"
          searchPlaceholder="Search users with keyword..."
          count={users.length}
          {...loaderData}
        />
      </section>

      <section className="app-section">
        {users.length > 0 && (
          <div className="rounded-md border">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-4 border-b bg-muted/50 p-4 font-medium">
              <div>Avatar</div>
              <div>Full Name</div>
              <div>Username</div>
              <div>Email</div>
              <div className="text-right">Action</div>
            </div>
            <ul className="divide-y">
              {users.map(user => {
                const userImage = user.images?.[0]?.url
                const isCurrentUser = user.id === userId

                return (
                  <li
                    key={user.id}
                    className="grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-4 p-4"
                  >
                    <div>
                      <AvatarAuto
                        user={{
                          username: user.username,
                          fullname: user.fullname,
                        }}
                        imageUrl={userImage}
                        size="sm"
                      />
                    </div>
                    <div>{user.fullname}</div>
                    <div className="font-mono">@{user.username}</div>
                    <div>{user.email}</div>
                    <div className="text-right">
                      <FormDelete
                        action="/admin/users/delete"
                        intentValue="admin-delete-user"
                        itemText={`user ${user.fullname} (@${user.username})`}
                        defaultValue={user.id}
                        requireUser
                        userId={userId}
                        disabled={isCurrentUser}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </section>

      <section className="app-section">
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}
