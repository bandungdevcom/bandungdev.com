import {
  conform,
  list,
  useFieldList,
  useFieldset,
  useForm,
  type FieldsetConfig,
} from "@conform-to/react"
import { parse } from "@conform-to/zod"
import { type UserProfile } from "@prisma/client"
import { useFetcher } from "@remix-run/react"
import { useRef } from "react"
import { type z } from "zod"

import { Alert } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { ButtonIcon } from "~/components/ui/button-icon"
import { ButtonLoading } from "~/components/ui/button-loading"
import { FormDescription, FormField, FormLabel } from "~/components/ui/form"
import { Iconify } from "~/components/ui/iconify"
import { Input } from "~/components/ui/input"
import { schemaUserProfileLinks, type schemaLink } from "~/schemas/user"
import { type SubmissionResult } from "~/types/submission"

export function FormChangeLinks({
  userProfile,
}: {
  userProfile?: Pick<UserProfile, "id" | "links">
}) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  const [form, { id, links }] = useForm<z.infer<typeof schemaUserProfileLinks>>(
    {
      shouldValidate: "onSubmit",
      lastSubmission: fetcher.data as SubmissionResult,
      onValidate({ formData }) {
        return parse(formData, { schema: schemaUserProfileLinks })
      },
      defaultValue: {
        links: userProfile?.links,
      },
    },
  )

  const linksItems = useFieldList(form.ref, links)
  const hasLinksItems = linksItems.length > 0
  const isAllowAddLink = linksItems.length < 10

  return (
    <fetcher.Form {...form.props} method="PUT" className="space-y-6">
      <fieldset
        disabled={isSubmitting}
        className="space-y-2 disabled:opacity-80"
      >
        <input hidden {...conform.input(id)} defaultValue={userProfile?.id} />

        <FormField className="space-y-2">
          <div>
            <FormLabel id="links">Links</FormLabel>
            <FormDescription>
              To link your websites, social media, and projects/products.
              Limited to 10 items.
            </FormDescription>
          </div>

          <div className="flex justify-between gap-2">
            <Button
              size="xs"
              variant="outline"
              disabled={!isAllowAddLink}
              {...list.insert(links.name)}
            >
              <Iconify icon="ph:plus" />
              <span>Add</span>
            </Button>

            <ButtonLoading
              type="submit"
              name="intent"
              value="update-user-profile-links"
              variant="outline"
              size="xs"
              isLoading={isSubmitting}
              loadingText="Saving"
              iconComponent={<Iconify icon="ph:floppy-disk-duotone" />}
            >
              Save
            </ButtonLoading>
          </div>

          <ol>
            {!hasLinksItems && <Alert>No links yet, add one.</Alert>}
            {hasLinksItems &&
              linksItems.map((linkItem, index) => (
                <li key={linkItem.key} className="flex gap-2 py-1">
                  <LinkItemFieldset {...linkItem} />

                  <div className="flex gap-1">
                    <ButtonIcon
                      size="sm"
                      variant="outline"
                      disabled={index === 0}
                      {...list.reorder(links.name, {
                        from: index,
                        to: index > 0 ? index - 1 : index,
                      })}
                    >
                      <Iconify icon="ph:arrow-fat-line-up-duotone" />
                    </ButtonIcon>
                    <ButtonIcon
                      size="sm"
                      variant="outline"
                      disabled={index === linksItems.length - 1}
                      {...list.reorder(links.name, {
                        from: index,
                        to: index < 9 ? index + 1 : index,
                      })}
                    >
                      <Iconify icon="ph:arrow-fat-line-down-duotone" />
                    </ButtonIcon>
                    <ButtonIcon
                      size="sm"
                      variant="outline"
                      {...list.replace(links.name, {
                        index,
                        defaultValue: { url: "", text: "" },
                      })}
                    >
                      <Iconify icon="ph:backspace-duotone" />
                    </ButtonIcon>
                    <ButtonIcon
                      size="sm"
                      variant="destructive"
                      {...list.remove(links.name, { index })}
                    >
                      <Iconify icon="ph:trash-duotone" />
                    </ButtonIcon>
                  </div>
                </li>
              ))}
          </ol>
        </FormField>

        {links.error && (
          <Alert variant="destructive" id={links.errorId}>
            {links.error}
          </Alert>
        )}
      </fieldset>
    </fetcher.Form>
  )
}

interface LinkItemFieldsetProps
  extends FieldsetConfig<z.input<typeof schemaLink>> {}

function LinkItemFieldset({ ...config }: LinkItemFieldsetProps) {
  const ref = useRef<HTMLFieldSetElement>(null)
  const { url, text } = useFieldset(ref, config)

  return (
    <fieldset
      ref={ref}
      className="flex w-full flex-col gap-1 sm:flex-row sm:gap-2"
    >
      <div>
        <Input
          placeholder="https://example.com"
          className="w-full sm:w-auto"
          {...conform.input(url)}
        />
        {url.error && <Alert variant="destructive">{url.error}</Alert>}
      </div>

      <div>
        <Input
          placeholder="Example Name"
          className="w-full sm:w-auto"
          {...conform.input(text)}
        />
        {text.error && <Alert variant="destructive">{text.error}</Alert>}
      </div>
    </fieldset>
  )
}
