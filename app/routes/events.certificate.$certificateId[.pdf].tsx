import { renderToStream } from "@react-pdf/renderer"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { Certificate } from "~/components/contents/certificate"
import { modelCertificate } from "~/models/certificate.server"
import { formatCertificateDate } from "~/utils/datetime"
import { parsedEnv } from "~/utils/env.server"
import { invariant, invariantResponse } from "~/utils/invariant"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.certificateId, "params.certificateId unavailable")

  const certificate = await modelCertificate.getById({
    id: params.certificateId,
  })

  invariantResponse(certificate?.user, "Certificate not found", { status: 404 })

  invariantResponse(certificate, "Certificate not found", { status: 404 })

  const dateTimeFormatted = formatCertificateDate(
    certificate.event.dateTimeStart,
    certificate.event.dateTimeEnd,
  )

  const { APP_URL } = parsedEnv

  const stream = await renderToStream(
    <Certificate
      eventName={certificate.event.title}
      fullName={certificate.user.fullname}
      date={dateTimeFormatted}
      url={`${APP_URL}/events/certificate/${certificate.id}.pdf`}
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
