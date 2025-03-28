import { parse } from "@conform-to/zod"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"

import { prisma } from "~/libs/db.server"
import { schemaPostDeleteAll, schemaPostDeleteById } from "~/schemas/post"
import { createTimer } from "~/utils/timer"

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "admin-delete-all-posts") {
    const submission = parse(formData, { schema: schemaPostDeleteAll })
    if (!submission.value) return json(submission)
    await prisma.post.deleteMany()
    await timer.delay()
    return redirect(`/admin/posts`)
  }

  if (intent === "admin-delete-post-by-id") {
    const submission = parse(formData, { schema: schemaPostDeleteById })
    if (!submission.value) return json(submission)
    await prisma.post.delete({ where: { id: submission.value.id } })
    await timer.delay()
    return redirect(`/admin/posts`)
  }

  await timer.delay()
  return null
}
