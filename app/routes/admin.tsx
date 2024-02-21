import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node"
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react"

import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Separator } from "~/components/ui/separator"
import { configNavigationItems } from "~/configs/navigation"
import { requireUser } from "~/helpers/auth"
import { modelEventStatus } from "~/models/event-status.server"
import { invariantResponse } from "~/utils/invariant"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

/**
 * RBAC for certain roles in the layout route
 */

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { userIsAllowed } = await requireUser(request, ["ADMIN", "MANAGER"])
  if (!userIsAllowed) return redirect("/")

  const eventStatuses = await modelEventStatus.getAll()
  invariantResponse(eventStatuses, "Event statuses are unavailable", {
    status: 404,
  })

  return json({ eventStatuses })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { userIsAllowed } = await requireUser(request, ["ADMIN", "MANAGER"])
  if (!userIsAllowed) return redirect("/")
  return null
}

export default function AdminLayoutRoute() {
  // Configure in app/configs/navigation.ts
  const navItems = [
    "/admin/dashboard",
    "/admin/users",
    "/admin/events",
    "/admin/posts",
    "/admin/settings",
    "/admin/partners-and-sponsors",
  ]

  return (
    <div className="flex pb-20">
      <nav className="select-none border-r border-r-border p-2 lg:p-4">
        <SidebarNavItems
          items={configNavigationItems.filter(item =>
            navItems.includes(item.path),
          )}
        />

        <Separator className="my-2" />
        <SidebarNavItems
          items={configNavigationItems.filter(item =>
            ["/user"].includes(item.path),
          )}
        />
      </nav>

      <Outlet />
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return <div />
  }
  return <div />
}
