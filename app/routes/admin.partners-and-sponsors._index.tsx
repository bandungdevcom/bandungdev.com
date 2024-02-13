import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

export default function PartnersAndSponsorsRoute() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h2>Partners and Sponsors</h2>
        </div>
      </header>

      <section className="app-section">
        <div className="flex w-full flex-wrap justify-end">
          <ButtonLink to="/events" variant="outline" size="xs">
            <Iconify icon="ph:plus" />
            <Link to="/admin/partners-and-sponsors/new/">
              <span>Add Partner or Sponsor</span>
            </Link>
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
            <TableRow>
              <TableCell>Web Programing UNPAS</TableCell>
              <TableCell>https://youtube.com/c/webprogrammingunpas</TableCell>
              <TableCell>Community Partners</TableCell>
              <TableCell className="flex gap-2">
                <Button>
                  <Link to="/admin/partners-and-sponsors/1/edit/">Edit</Link>
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bearmentor</TableCell>
              <TableCell>https://bearmentor.com/</TableCell>
              <TableCell>Community Partners</TableCell>
              <TableCell className="flex gap-2">
                <Button>
                  <Link to="/admin/partners-and-sponsors/1/edit/">Edit</Link>
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CodePolitan</TableCell>
              <TableCell>https://codepolitan.com/</TableCell>
              <TableCell>Sponsors</TableCell>
              <TableCell className="flex gap-2">
                <Button>
                  <Link to="/admin/partners-and-sponsors/1/edit/">Edit</Link>
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Programmer Zaman Now</TableCell>
              <TableCell>https://programmerzamannow.com/</TableCell>
              <TableCell>Community Partners</TableCell>
              <TableCell className="flex gap-2">
                <Button>
                  <Link to="/admin/partners-and-sponsors/1/edit/">Edit</Link>
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Allnimal</TableCell>
              <TableCell>https://allnimal.com/</TableCell>
              <TableCell>Sponsors</TableCell>
              <TableCell className="flex gap-2">
                <Button>
                  <Link to="/admin/partners-and-sponsors/1/edit/">Edit</Link>
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size="default" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="default" isActive={true}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="default">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" size="default" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  )
}
