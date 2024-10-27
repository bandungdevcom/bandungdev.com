import { renderToStream } from "@react-pdf/renderer"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { Certificate } from "~/components/contents/certificate"
import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { modelCertificate } from "~/models/certificate.server"
import { modelEvent } from "~/models/event.server"
import { formatCertificateDate } from "~/utils/datetime"
import { invariant, invariantResponse } from "~/utils/invariant"

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { user } = await requireUser(request)

  invariant(params.eventSlug, "params.eventSlug unavailable")

  const [event, certificate] = await prisma.$transaction([
    modelEvent.getBySlug({ slug: params.eventSlug }),
    modelCertificate.getBySlugEventAndEmail({
      slugEvent: params.eventSlug,
      email: user.email,
    }),
  ])

  invariantResponse(event, "Event not found", { status: 404 })

  invariantResponse(certificate, "Certificate not found", { status: 404 })

  const dateTimeFormatted = formatCertificateDate(
    event.dateTimeStart,
    event.dateTimeEnd,
  )

  const stream = await renderToStream(
    <Certificate
      eventName={event.title}
      fullName={user.fullname}
      date={dateTimeFormatted}
    />,
  )

  const body: Buffer = await new Promise((resolve, reject) => {
    const buffers: Uint8Array[] = []
    stream.on("data", data => {
      buffers.push(data)
    })
    stream.on("end", () => {
      resolve(Buffer.concat(buffers))
    })
    stream.on("error", reject)
  })

  const headers = new Headers({ "Content-Type": "application/pdf" })
  return new Response(body, { status: 200, headers })
}
