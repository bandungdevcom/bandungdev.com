import { parse } from "@conform-to/zod"
import { json, type ActionFunctionArgs } from "@remix-run/node"
import { z } from "zod"

import { prisma } from "~/libs/db.server"
import { modelEventStatus } from "~/models/event-status.server"
import { invariantResponse } from "~/utils/invariant"
import { createTimer } from "~/utils/timer"

export async function action({ request }: ActionFunctionArgs) {
  const timer = createTimer()
  const formData = await request.formData()

  const submission = parse(formData, {
    schema: z.object({
      eventId: z.string(),
      statusSymbol: z.string(),
    }),
  })

  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 })
  }

  const id = submission.value.eventId
  const eventStatus = await modelEventStatus.getBySymbol({
    symbol: submission.value.statusSymbol,
  })
  invariantResponse(eventStatus, "Event status is unavailable", { status: 404 })

  await prisma.event.update({
    where: { id },
    data: { statusId: eventStatus.id },
  })

  await timer.delay()
  return json(submission)
}
