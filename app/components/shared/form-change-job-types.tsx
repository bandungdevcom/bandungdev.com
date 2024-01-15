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
import { Alert } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { ButtonIcon } from "~/components/ui/button-icon"
import { ButtonLoading } from "~/components/ui/button-loading"
import { FormDescription, FormField, FormLabel } from "~/components/ui/form"
import { Iconify } from "~/components/ui/iconify"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { JOB_TYPES } from "~/configs/jobTypes"
import { schemaUserJobTypes, type schemaJobType } from "~/schemas/user"

import { type JobType } from "@prisma/client"
import { type z } from "zod"
import { type JsonifyValues } from "~/types/jsonify"
import { type SubmissionResult } from "~/types/submission"

export function FormChangeJobTypes({
  userProfile,
}: {
  userProfile?: JsonifyValues<{
    id: string
    jobTypes: JobType[]
  }>
}) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  const [form, { id, jobTypes }] = useForm<z.infer<typeof schemaUserJobTypes>>({
    shouldValidate: "onSubmit",
    lastSubmission: fetcher.data as SubmissionResult,
    onValidate({ formData }) {
      return parse(formData, { schema: schemaUserJobTypes })
    },
    defaultValue: {
      jobTypes: userProfile?.jobTypes,
    },
  })

  const jobTypesItems = useFieldList(form.ref, jobTypes)
  const hasjobTypesItems = jobTypesItems.length > 0
  const isAllowAddLink = jobTypesItems.length < 10

  return (
    <fetcher.Form {...form.props} method="PUT" className="space-y-6">
      <fieldset
        disabled={isSubmitting}
        className="space-y-2 disabled:opacity-80"
      >
        <input hidden {...conform.input(id)} defaultValue={userProfile?.id} />

        <FormField className="space-y-2">
          <div>
            <FormLabel id="jobTypes">Job Type</FormLabel>
            <FormDescription>
              Your Job Type. You can select multiple job.
            </FormDescription>
          </div>

          <div className="flex justify-between gap-2">
            <Button
              size="xs"
              variant="outline"
              disabled={!isAllowAddLink}
              {...list.insert(jobTypes.name)}
            >
              <Iconify icon="ph:plus" />
              <span>Add</span>
            </Button>

            <ButtonLoading
              type="submit"
              name="intent"
              value="user-change-job-types"
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
            {!hasjobTypesItems && <Alert>No JobTypes yet, add one.</Alert>}
            {hasjobTypesItems &&
              jobTypesItems.map((jobTypeItem, index) => (
                <li key={jobTypeItem.key} className="flex gap-2 py-1">
                  <JobTypeItemFieldset {...jobTypeItem} />

                  <div className="flex gap-1">
                    <ButtonIcon
                      size="sm"
                      variant="outline"
                      disabled={index === 0}
                      {...list.reorder(jobTypes.name, {
                        from: index,
                        to: index > 0 ? index - 1 : index,
                      })}
                    >
                      <Iconify icon="ph:arrow-fat-line-up-duotone" />
                    </ButtonIcon>
                    <ButtonIcon
                      size="sm"
                      variant="outline"
                      disabled={index === jobTypesItems.length - 1}
                      {...list.reorder(jobTypes.name, {
                        from: index,
                        to: index < 9 ? index + 1 : index,
                      })}
                    >
                      <Iconify icon="ph:arrow-fat-line-down-duotone" />
                    </ButtonIcon>
                    <ButtonIcon
                      size="sm"
                      variant="outline"
                      {...list.replace(jobTypes.name, {
                        index,
                        defaultValue: { url: "", text: "" },
                      })}
                    >
                      <Iconify icon="ph:backspace-duotone" />
                    </ButtonIcon>
                    <ButtonIcon
                      size="sm"
                      variant="destructive"
                      {...list.remove(jobTypes.name, { index })}
                    >
                      <Iconify icon="ph:trash-duotone" />
                    </ButtonIcon>
                  </div>
                </li>
              ))}
          </ol>
        </FormField>

        {jobTypes.error && (
          <Alert variant="destructive" id={jobTypes.errorId}>
            {jobTypes.error}
          </Alert>
        )}
      </fieldset>
    </fetcher.Form>
  )
}

interface JobTypeItemFieldsetProps
  extends FieldsetConfig<z.input<typeof schemaJobType>> {}

function JobTypeItemFieldset({ ...config }: JobTypeItemFieldsetProps) {
  const ref = useRef<HTMLFieldSetElement>(null)
  const { name } = useFieldset(ref, config)

  return (
    <fieldset
      ref={ref}
      className="flex w-full flex-col gap-1 sm:flex-row sm:gap-2"
    >
      <div>
        <Select {...conform.input(name)}>
          <SelectTrigger>
            <SelectValue placeholder="Select JobType" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {JOB_TYPES.map(job => (
                <SelectItem key={job.id} value={job.name}>
                  {job.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* <Input
          placeholder="https://example.com"
          className="w-full sm:w-auto"
          {...conform.input(name)}
        /> */}
        {name.error && <Alert variant="destructive">{name.error}</Alert>}
      </div>
    </fieldset>
  )
}
