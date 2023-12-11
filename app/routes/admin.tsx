import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react"
import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Separator } from "~/components/ui/separator"
import { configNavigationItems } from "~/configs/navigation"
import { useAppMode } from "~/hooks/use-app-mode"
import { modelEventStatus } from "~/models/event-status.server"

import { authenticator } from "~/services/auth.server"
import { invariantResponse } from "~/utils/invariant"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // TODO: Check for role of admin, not only a user
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })

  const eventStatuses = await modelEventStatus.getAll()
  invariantResponse(eventStatuses, "Event statuses are unavailable", {
    status: 404,
  })

  return json({ eventStatuses })
}

export default function AdminLayoutRoute() {
  const { isModeDevelopment } = useAppMode()

  // Configure in app/configs/navigation.ts
  const navItems = [
    "/admin/dashboard",
    "/admin/users",
    "/admin/events",
    "/admin/posts",
    "/admin/settings",
    "/logout",
  ]
  const extraNavItems = ["/user"]

  return (
    <div className="flex pb-20">
      <nav className="select-none border-r border-r-border p-2 lg:p-4">
        <SidebarNavItems
          items={configNavigationItems.filter(item =>
            navItems.includes(item.path),
          )}
        />

        {isModeDevelopment && <Separator className="my-2" />}
        {isModeDevelopment && (
          <SidebarNavItems
            items={configNavigationItems.filter(item =>
              extraNavItems.includes(item.path),
            )}
          />
        )}
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
