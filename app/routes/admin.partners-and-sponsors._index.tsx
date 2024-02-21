import { Link, json, useLoaderData } from "@remix-run/react"
import { type LoaderFunctionArgs } from "@remix-run/server-runtime"
import { z } from "zod"
import { zx } from "zodix"
import { PaginationNavigation } from "~/components/shared/pagination"
import { Button } from "~/components/ui/button"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { prisma } from "~/libs/db.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { page: pageQuery, limit: pageSizeQuery } = zx.parseQuery(request, {
    page: z.string().default("1"),
    limit: z.string().default("5"),
  })

  const page = parseInt(pageQuery)
  const pageSize = parseInt(pageSizeQuery)
  if (!page || !pageSize) {
    return json({
      page,
      pageSize,
      count: 0,
      pageCount: 0,
      partnersAndSponsors: [],
      validationError: [{ message: "invalid query param" }],
    })
  }

  const skip = (page - 1) * pageSize
  const take = pageSize

  const partnersAndSponsors = await prisma.partnerAndSponsor.findMany({
    include: {
      partnerAndSponsorType: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip,
    take,
  })

  const count = await prisma.partnerAndSponsor.count()
  const pageCount = Math.ceil(count / pageSize)

  return json({
    page,
    pageSize,
    count,
    pageCount,
    partnersAndSponsors,
    validationError: [],
  })
}

export default function PartnersAndSponsorsRoute() {
  const {
    partnersAndSponsors,
    page,
    pageSize,
    count,
    pageCount,
    validationError,
  } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h2>Partners and Sponsors</h2>
        </div>
      </header>

      <section className="app-section">
        {validationError.length > 0 ? (
          <p className="text-red-500">{validationError[0]?.message}</p>
        ) : (
          <>
            <div className="flex w-full flex-wrap justify-end">
              <ButtonLink
                to="/admin/partners-and-sponsors/new/"
                variant="outline"
                size="xs"
              >
                <Iconify icon="ph:plus" />
                <span>Add Partner or Sponsor</span>
              </ButtonLink>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnersAndSponsors.map(item => (
                  <TableRow key={item?.id}>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.url}</TableCell>
                    <TableCell>{item?.partnerAndSponsorType.name}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button>
                        <Link
                          to={`/admin/partners-and-sponsors/${item?.id}/edit/`}
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button variant="destructive">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationNavigation
              limitParam={pageSize}
              paginationItems={Array.from({ length: pageCount }, (_, i) => ({
                pageNumber: i + 1,
                to: `/admin/partners-and-sponsors/?page=${i + 1}&limit=5`,
              }))}
              totalItems={count}
              totalPages={pageCount}
              queryParam="/"
              pageParam={page}
            />
          </>
        )}
      </section>
    </div>
  )
}
