import { type OutputFileEntry } from "@uploadcare/blocks"
import { useState } from "react"
import { Theme, useTheme } from "remix-themes"

import {
  UploaderSwitcher,
  UploaderWithOutput,
  UploaderWithProvider,
  defaultLRConfig,
} from "~/components/libs/uploader-uploadcare"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

export function ExampleUploadcare() {
  const { ENV } = useRootLoaderData()

  const [filesA, setFilesA] = useState<OutputFileEntry[]>([])
  const [filesB, setFilesB] = useState<OutputFileEntry[]>([])

  const [themeSymbol] = useTheme()
  const theme = themeSymbol === Theme.DARK ? "dark" : "light"

  if (!ENV.UPLOADCARE_PUBLIC_KEY) return null

  return (
    <div className="space-y-8">
      <header>
        <h2>Uploadcare</h2>
        <p>File upload, especially image.</p>
      </header>

      <div className="max-w-2xl space-y-8">
        <div>
          <header className="mb-2">
            <h3>Regular</h3>
            <p>With modal, no preview.</p>
          </header>
          <UploaderSwitcher
            pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
            contextName="uploader-regular"
            mode="regular"
            theme={theme}
          />
        </div>

        <div>
          <header className="mb-2">
            <h3>Minimal</h3>
            <p>Without modal, no preview.</p>
          </header>
          <UploaderSwitcher
            pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
            contextName="uploader-minimal"
            mode="minimal"
            theme={theme}
          />
        </div>

        <div>
          <header className="mb-2">
            <h3>Inline</h3>
            <p>Without modal, more straightforward, no preview.</p>
          </header>
          <UploaderSwitcher
            pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
            contextName="uploader-inline"
            mode="inline"
            theme={theme}
          />
        </div>
      </div>

      <div className="max-w-2xl space-y-2">
        <div className="space-y-2">
          <header>
            <h3>Preview with Data Output</h3>
            <p>With modal, preview files immediately.</p>
          </header>
          <UploaderWithOutput
            pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
            contextName="my-uploader-output"
            theme={theme}
            files={filesA}
            setFiles={setFilesA}
            config={{ ...defaultLRConfig, multiple: true }}
          />
        </div>
      </div>

      <div className="max-w-2xl space-y-2">
        <header>
          <h3>Preview with Upload Provider</h3>
          <p>
            With modal, edit with crop ratio 1:1, then preview file after done.
          </p>
        </header>
        <UploaderWithProvider
          pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
          contextName="my-uploader-provider"
          theme={theme}
          files={filesB}
          setFiles={setFilesB}
          config={{ ...defaultLRConfig, cropPreset: "1:1" }}
        />
      </div>
    </div>
  )
}
