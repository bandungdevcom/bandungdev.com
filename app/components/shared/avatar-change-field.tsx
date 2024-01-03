import { type Prisma } from "@prisma/client"
import { useFetcher } from "@remix-run/react"
import { type OutputFileEntry } from "@uploadcare/blocks"
import { useState } from "react"
import { Theme, useTheme } from "remix-themes"

import { defaultLRConfig } from "~/components/libs/uploader-uploadcare"
import { AvatarUploader } from "~/components/shared/avatar-uploader"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLoading } from "~/components/ui/button-loading"
import { Iconify } from "~/components/ui/iconify"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { type modelUser } from "~/models/user.server"

export function AvatarChangeField({
  user,
  intentValue,
}: {
  user: Prisma.PromiseReturnType<typeof modelUser.getForSession>
  intentValue: string
}) {
  const { ENV } = useRootLoaderData()
  const [avatarFile, setAvatarFile] = useState<OutputFileEntry | null>(null)
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  const [themeSymbol] = useTheme()
  const theme = themeSymbol === Theme.DARK ? "dark" : "light"

  if (!user) return null
  if (!ENV.UPLOADCARE_PUBLIC_KEY) return null

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
        <AvatarUploader
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
