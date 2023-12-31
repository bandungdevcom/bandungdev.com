import {
  type OutputFileEntry,
  type UploadCtxProvider,
} from "@uploadcare/blocks"
import { useEffect, useRef } from "react"

import {
  LRConfig,
  LRFileUploaderRegular,
  defaultLRConfig,
  type UploaderConfigProps,
} from "../libs/uploader-uploadcare"

export interface UploaderWithPreviewProps extends UploaderConfigProps {
  setFile: (files: OutputFileEntry | null) => void
}

export function UploaderWithProvider({
  pubkey = "demopublickey",
  contextName = "my-uploader",
  theme = "light",
  config = defaultLRConfig,
  setFile,
  ...props
}: UploaderWithPreviewProps) {
  const ctxProviderRef = useRef<
    typeof UploadCtxProvider.prototype & UploadCtxProvider
  >(null)

  useEffect(() => {
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      if (e.detail) {
        setFile(e.detail[0] ?? null)
      }
    }

    ctxProviderRef.current?.addEventListener("data-output", handleUploadEvent)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctxProviderRef.current?.removeEventListener(
        "data-output",
        handleUploadEvent,
      )
    }
  }, [setFile])

  return (
    <div className="space-y-2">
      <div>
        <LRConfig
          pubkey={pubkey}
          contextName={contextName}
          config={config}
          {...props}
        />
        <LRFileUploaderRegular contextName={contextName} theme={theme} />

        {/* @ts-ignore */}
        <lr-upload-ctx-provider ctx-name={contextName} ref={ctxProviderRef} />
      </div>
    </div>
  )
}
