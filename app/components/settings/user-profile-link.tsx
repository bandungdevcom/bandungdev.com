import {
  conform,
  list,
  useFieldList,
  useFieldset,
  useForm,
  type FieldsetConfig,
} from "@conform-to/react"
import { parse } from "@conform-to/zod"
import { useFetcher } from "@remix-run/react"
import { useRef } from "react"

import { Icon } from "@iconify/react"
import { FormDescription, FormField } from "~/components/ui/form"
import { Alert } from "../ui/alert"
import { Button } from "../ui/button"
import { ButtonLoading } from "../ui/button-loading"
import { Input } from "../ui/input"

import { schemaUserProfileLinks, type schemaLink } from "~/schemas/user"
import { cn } from "~/utils/cn"

import { type UserProfile } from "@prisma/client"
import { type z } from "zod"
import { type SubmissionResult } from "~/types/submission"

export function UserProfileLinksForm({
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
  const isAllowAddLink = linksItems.length < 10

  return (
    <fetcher.Form {...form.props} method="PUT" className="space-y-6">
      <fieldset
        disabled={isSubmitting}
        className="space-y-2 disabled:opacity-80"
      >
        <input hidden {...conform.input(id)} defaultValue={userProfile?.id} />

        <FormField>
          <h6 id="links">Links</h6>
          <FormDescription>
            To link your websites, social media, and projects/products. Limited
            to 10 items.
          </FormDescription>

          <ol className="space-y-2">
            {linksItems.map((linkItem, index) => (
              <li key={linkItem.key}>
                <section className="flex items-center gap-2">
                  <span className="hidden w-4 text-sm sm:block">
                    {index + 1}
                  </span>
                  <LinkItemFieldset {...linkItem} />
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={index === 0}
                      {...list.reorder(links.name, {
                        from: index,
                        to: index > 0 ? index - 1 : index,
                      })}
                    >
                      <Icon icon={"tabler:arrow-move-up"} />
                      {/* <IconArrowMoveUp className="icon-xs" /> */}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={index === linksItems.length - 1}
                      {...list.reorder(links.name, {
                        from: index,
                        to: index < 9 ? index + 1 : index,
                      })}
                    >
                      <Icon icon={"tabler:arrow-move-down"} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      {...list.replace(links.name, {
                        index,
                        defaultValue: { url: "", text: "" },
                      })}
                    >
                      {/* <IconBackspaceFilled className="icon-xs" /> */}
                      <Icon icon={"tabler:backspace-filled"} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      {...list.remove(links.name, { index })}
                    >
                      {/* <IconTrashXFilled className="icon-xs" /> */}
                      <Icon icon={"tabler:trash-x"} />
                    </Button>
                  </div>
                </section>
              </li>
            ))}
          </ol>

          <Button
            size="sm"
            variant="secondary"
            disabled={!isAllowAddLink}
            {...list.insert(links.name)}
          >
            {/* <IconPlus className="icon-xs" /> */}
            <Icon icon={"tabler:plus"} />
            <span>Add link</span>
          </Button>

          {links.error && (
            <Alert variant="destructive" id={links.errorId}>
              {links.error}
            </Alert>
          )}
        </FormField>

        <ButtonLoading
          name="intent"
          value="update-user-profile-links"
          size="sm"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          loadingText="Saving All Links..."
        >
          Save All Links
        </ButtonLoading>
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
    <fieldset ref={ref} className="flex w-full gap-2">
      <div className="w-full">
        <Input
          placeholder="https://example.com"
          className={cn(url.error && "error")}
          {...conform.input(url)}
        />
        {url.error && <Alert variant="destructive">{url.error}</Alert>}
      </div>
      <div>
        <Input
          placeholder="Example Name"
          className={cn(text.error && "error")}
          {...conform.input(text)}
        />
        {text.error && <Alert variant="destructive">{text.error}</Alert>}
      </div>
    </fieldset>
  )
}
