import { parse } from "@conform-to/zod"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"

import { modelAdminEvent } from "~/models/admin-event.server"
import { schemaEventDeleteAll, schemaEventDeleteById } from "~/schemas/event"
import { createTimer } from "~/utils/timer"

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "user-delete-all-events") {
    const submission = parse(formData, { schema: schemaEventDeleteAll })
    if (!submission.value) return json(submission)
    await modelAdminEvent.deleteAll(submission.value)
    await timer.delay()
    return redirect(`/user/events`)
  }

  if (intent === "user-delete-event-by-id") {
    const submission = parse(formData, { schema: schemaEventDeleteById })
    if (!submission.value) return json(submission)
    await modelAdminEvent.deleteById(submission.value)
    await timer.delay()
    return redirect(`/user/events`)
  }

  await timer.delay()
  return null
}
