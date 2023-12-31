import { useFetcher } from "@remix-run/react"
import { useState } from "react"
import { Theme, useTheme } from "remix-themes"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

import { defaultLRConfig } from "../libs/uploader-uploadcare"
import { AvatarAuto } from "../ui/avatar-auto"
import { ButtonLoading } from "../ui/button-loading"
import { Iconify } from "../ui/iconify"
import { UploaderWithProvider } from "./avatar-uploader"

import { type OutputFileEntry } from "@uploadcare/blocks"
import { type requireUser } from "~/helpers/auth"

export function AvatarChangeField({
  user,
  intentValue,
}: {
  user: Awaited<ReturnType<typeof requireUser>>["user"]
  intentValue: string
}) {
  const fetcher = useFetcher()
  const { ENV } = useRootLoaderData()

  const [avatarFile, setAvatarFile] = useState<OutputFileEntry | null>(null)

  const [themeSymbol] = useTheme()
  const theme = themeSymbol === Theme.DARK ? "dark" : "light"

  if (!ENV.UPLOADCARE_PUBLIC_KEY) return null

  const isSubmitting = fetcher.state === "submitting"

  let avatarUrl = user.images[0]?.url
  if (!!avatarFile && !!avatarFile.cdnUrl) {
    avatarUrl = avatarFile.cdnUrl
  }

  return (
    <fetcher.Form
      method="POST"
      className="flex flex-col items-center justify-center gap-4"
    >
      <input type="hidden" name="avatarUrl" value={avatarUrl} />
      <input type="hidden" name="id" value={user.id} />

      <AvatarAuto user={user} imageUrl={avatarUrl} size="xl" />
      <div className="flex flex-row items-center gap-4">
        <UploaderWithProvider
          pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
          contextName="my-uploader-provider"
          theme={theme}
          setFile={setAvatarFile}
          config={{ ...defaultLRConfig, cropPreset: "1:1" }}
        />

        <ButtonLoading
          name="intent"
          value={intentValue}
          isLoading={isSubmitting}
          variant="outline"
          size="xs"
          loadingText="Saving"
          iconComponent={<Iconify icon="ph:floppy-disk-duotone" />}
          disabled={!avatarFile}
        >
          Save
        </ButtonLoading>
      </div>
    </fetcher.Form>
  )
}
