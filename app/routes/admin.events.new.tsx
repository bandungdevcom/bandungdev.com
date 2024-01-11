import { redirect, type ActionFunctionArgs } from "@remix-run/node"

import { requireUser } from "~/helpers/auth"
import { modelAdminEvent } from "~/models/admin-event.server"
import { invariantResponse } from "~/utils/invariant"
import { createSitemap } from "~/utils/sitemap"
import { createTimer } from "~/utils/timer"

export const handle = createSitemap()

export const loader = () => {
  return redirect(`/admin/events`)
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const { userId: organizerId } = await requireUser(request)

  const event = await modelAdminEvent.create({
    organizerId,
    title: "Upcoming Event",
    description: "Short description about the event",
    content: "Insert some detail content for the event...",
    statusSymbol: "DRAFT",
  })
  invariantResponse(event, "Event cannot be created", { status: 400 })

  await timer.delay()
  return redirect(`/admin/events/${event.id}`)
}
