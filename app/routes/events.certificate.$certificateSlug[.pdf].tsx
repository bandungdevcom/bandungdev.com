import { renderToStream } from "@react-pdf/renderer"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { Certificate } from "~/components/contents/certificate"
import { imgJpegToBase64, imgPngToBase64 } from "~/helpers/image-to-base64"
import { modelCertificate } from "~/models/certificate.server"
import { formatCertificateDate } from "~/utils/datetime"
import { parsedEnv } from "~/utils/env.server"
import { invariant, invariantResponse } from "~/utils/invariant"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.certificateSlug, "params.certificateSlug unavailable")

  const certificate = await modelCertificate.getByGlug({
    slug: params.certificateSlug,
  })

  invariantResponse(certificate, "Certificate not found", { status: 404 })

  invariantResponse(
    certificate?.user,
    `${certificate.email} isn't registered`,
    { status: 404 },
  )

  const dateTimeFormatted = formatCertificateDate(
    certificate.event.dateTimeStart,
    certificate.event.dateTimeEnd,
  )

  const { APP_URL } = parsedEnv

  const backgroundImgBase64 = imgPngToBase64(
    "public/images/logos/png/bandungdev-icon-white.png",
  )
  const logoImgBase64 = imgPngToBase64(
    "public/images/logos/png/bandungdev-logo-text.png",
  )
  const signatureImgBase64 = imgJpegToBase64(
    "public/images/signatures/haidar.jpeg",
  )

  const stream = await renderToStream(
    <Certificate
      eventName={certificate.event.title}
      fullName={certificate.user.fullname}
      date={dateTimeFormatted}
      url={`${APP_URL}/events/certificate/${certificate.slug}.pdf`}
      backgroundImgBase64={backgroundImgBase64}
      logoImgBase64={logoImgBase64}
      signatureImgBase64={signatureImgBase64}
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
