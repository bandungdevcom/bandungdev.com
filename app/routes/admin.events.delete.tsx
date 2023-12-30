import { parse } from "@conform-to/zod"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"

import { modelAdminEvent } from "~/models/admin-event.server"
import { schemaEventDeleteAll, schemaEventDeleteById } from "~/schemas/event"
import { createTimer } from "~/utils/timer"

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "admin-delete-all-events") {
    const submission = parse(formData, { schema: schemaEventDeleteAll })
    if (!submission.value) return json(submission, { status: 400 })
    await modelAdminEvent.deleteAll()
    await timer.delay()
    return redirect(`/admin/events`)
  }

  if (intent === "admin-delete-event-by-id") {
    const submission = parse(formData, { schema: schemaEventDeleteById })
    if (!submission.value) return json(submission, { status: 400 })
    await modelAdminEvent.deleteById(submission.value)
    await timer.delay()
    return redirect(`/admin/events`)
  }

  await timer.delay()
  return null
}
