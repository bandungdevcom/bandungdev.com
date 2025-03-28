import { parse } from "@conform-to/zod"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"
import { z } from "zod"

import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { createTimer } from "~/utils/timer"

const schemaUserDelete = z.object({
  id: z.string(),
  userId: z.string(),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireUser(request)
  const timer = createTimer()
  const formData = await request.formData()
  const submission = parse(formData, { schema: schemaUserDelete })

  if (!submission.value) {
    return json(submission)
  }

  await prisma.user.delete({ where: { id: submission.value.id } })
  await timer.delay()
  return redirect(`/admin/users`)
}
