import { parse } from "@conform-to/zod"
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import type * as reactTable from "@tanstack/react-table"
import { match } from "ts-pattern"
import { FormDelete } from "~/components/shared/form-delete"
import {
  PaginationNavigation,
  PaginationSearch,
  getPaginationConfigs,
  getPaginationOptions,
} from "~/components/shared/pagination"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLink } from "~/components/ui/button-link"
import { DataTable } from "~/components/ui/data-table"
import { Iconify } from "~/components/ui/iconify"

import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { schemaGeneralId } from "~/schemas/general"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({ title: `Users`, description: `Manage users` })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const config = getPaginationConfigs({ request })
  const { userId } = await requireUser(request)

  const where = !config.queryParam
    ? {}
    : { fullname: { contains: config.queryParam } }

  const [totalItems, users] = await prisma.$transaction([
    prisma.post.count(),
    prisma.user.findMany({
      where,
      skip: config.skip,
      take: config.limitParam,
      orderBy: { updatedAt: "desc" },
      include: {
        images: { select: { url: true, id: true, altText: true } },
      },
    }),
  ])

  return json({
    userId,
    users,
    ...getPaginationOptions({ request, totalItems }),
  })
}

export default function AdminUsersRoute() {
  const { users, ...loaderData } = useLoaderData<typeof loader>()

  const columns: reactTable.ColumnDef<(typeof users)[0]>[] = [
    {
      header: "Avatar",
      accessorKey: "images",
      cell: ({ row }) => {
        const images = row.original?.images
        return match(images)
          .with([], () => (
            <Link to={`/${row.original.username}`}>
              <AvatarAuto size="sm" user={row.original} />
            </Link>
          ))
          .otherwise(() => (
            <Link to={`/${row.original.username}`}>
              <img
                className="rounded-full"
                width={30}
                alt={images?.at(-1)?.altText as string}
                src={images?.at(-1)?.url}
              />
            </Link>
          ))
      },
    },
    {
      header: "Username",
      accessorKey: "username",
      cell: ({ row }) => {
        const username = row.original.username
        return (
          <Link to={`/${username}`}>
            <span>{username}</span>
          </Link>
        )
      },
    },
    {
      header: "Fullname",
      accessorKey: "fullname",
    },

    {
      header: "Nickname",
      accessorKey: "nickname",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },

    {
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id
        const name = row.original.fullname
        return (
          // TODO Make it re-usable
          <section className="flex items-center gap-x-2">
            <ButtonLink
              variant="outline"
              size="xs"
              to={`/admin/users/edit/${id}`}
            >
              <Iconify icon="ph:pencil" />
              <span>Edit</span>
            </ButtonLink>
            <FormDelete
              action="/admin/users/delete"
              intentValue="admin-delete-user-by-id"
              itemText={`user ${name}`}
              defaultValue={id}
              requireUser
            />
            <ButtonLink variant="outline" size="xs" to={`/admin/users/${id}`}>
              <Iconify icon="ph:arrow-square-out-duotone" />
              <span>View</span>
            </ButtonLink>
          </section>
        )
      },
    },
  ]

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h2>Users</h2>
        </div>
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
        <DataTable data={users} columns={columns} />
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parse(formData, { schema: schemaGeneralId })
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 })
  }
  return json(submission)
}
