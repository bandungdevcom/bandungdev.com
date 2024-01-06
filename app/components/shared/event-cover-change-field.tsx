import { type OutputFileEntry } from "@uploadcare/blocks"
import { useState } from "react"
import { Theme, useTheme } from "remix-themes"

import { defaultLRConfig } from "~/components/libs/uploader-uploadcare"
import { AvatarUploader } from "~/components/shared/avatar-uploader"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

const DEFAULT_IMAGE = "/images/covers/bandungdev-cover-luma-sharing.png"

export function EventCoverChangeField({
  alt,
  imageUrl = DEFAULT_IMAGE,
}: {
  imageUrl?: string
  alt: string
}) {
  const { ENV } = useRootLoaderData()
  const [eventCoverFile, setEventCoverFile] = useState<OutputFileEntry | null>(
    null,
  )

  const [themeSymbol] = useTheme()
  const theme = themeSymbol === Theme.DARK ? "dark" : "light"

  if (!ENV.UPLOADCARE_PUBLIC_KEY) return null

  let url = imageUrl

  if (!!eventCoverFile && !!eventCoverFile.cdnUrl) {
    url = eventCoverFile.cdnUrl
  }

  return (
    <div className="relative">
      <input type="hidden" name="imageUrl" value={url} />

      <img
        className="aspect-video w-full bg-cover object-cover"
        alt={alt}
        src={url}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = DEFAULT_IMAGE
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <AvatarUploader
          pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
          contextName="my-uploader-provider"
          theme={theme}
          setFile={setEventCoverFile}
          config={{ ...defaultLRConfig, cropPreset: "16:9" }}
        />
      </div>
    </div>
  )
}
