import { conform, type FieldConfig } from "@conform-to/react"
import { type Prisma } from "@prisma/client"
import { useFetcher } from "@remix-run/react"
import { ClientOnly } from "remix-utils/client-only"

import { Card } from "~/components/ui/card"
import { FormErrors, FormLabel } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import {
  RadioGroup,
  RadioGroupLocationCategoryItem,
} from "~/components/ui/radio-group"
import { type modelEventCategory } from "~/models/event-category.server"
import { type modelEventFormat } from "~/models/event-format.server"
import { type modelEventMedia } from "~/models/event-media.server"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

interface EventDetailFormProps {
  eventId: string
  eventCategorySymbol: string
  categoryId: FieldConfig<string>
  formatId: FieldConfig<string>
  label: FieldConfig<string>
  address: FieldConfig<string>
  mapsUrl: FieldConfig<string>
  mediaId: FieldConfig<string>
  url: FieldConfig<string>
  eventFormats: Prisma.PromiseReturnType<typeof modelEventFormat.getAll>
  eventMedias: Prisma.PromiseReturnType<typeof modelEventMedia.getAll>
  eventCategories: Prisma.PromiseReturnType<typeof modelEventCategory.getAll>
}

export default function EventDetailForm({
  categoryId,
  eventId,
  eventCategorySymbol,
  formatId,
  label,
  address,
  mapsUrl,
  mediaId,
  url,
  eventFormats,
  eventMedias,
  eventCategories,
}: EventDetailFormProps) {
  const fetcher = useFetcher()

  return (
    <Card className="space-y-2 p-4">
      <input
        type="hidden"
        name="categoryId"
        defaultValue={categoryId.defaultValue}
      />
      <div className="space-y-2">
        <FormLabel htmlFor="formatId">Format</FormLabel>
        <ClientOnly>
          {() => (
            <Select {...conform.input(formatId)}>
              <SelectTrigger>
                <SelectValue placeholder="Select media" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {eventFormats.map(eventFormat => (
                    <SelectItem key={eventFormat.id} value={eventFormat.id}>
                      {eventFormat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </ClientOnly>
        <FormErrors>{formatId}</FormErrors>
      </div>
      <fetcher.Form
        method="POST"
        onChange={event => {
          fetcher.submit(event.currentTarget, { method: "POST" })
        }}
        className="space-y-2"
      >
        <input
          type="hidden"
          name="intent"
          defaultValue="change-event-category"
        />
        <input type="hidden" name="id" defaultValue={eventId} />
        <FormLabel htmlFor="categoryId">Category</FormLabel>
        <RadioGroup className="grid-cols-3" {...conform.input(categoryId)}>
          {eventCategories.map(eventCategory => (
            <RadioGroupLocationCategoryItem
              key={eventCategory.id}
              value={eventCategory.id}
            >
              {eventCategory.name}
            </RadioGroupLocationCategoryItem>
          ))}
        </RadioGroup>
      </fetcher.Form>

      {/* Field for IN_PERSON Event */}
      {(eventCategorySymbol === "IN_PERSON" ||
        eventCategorySymbol === "HYBRID") && (
        <>
          <div className="space-y-2">
            <FormLabel htmlFor="mapUrl">Location</FormLabel>
            <Input
              className="w-full"
              {...conform.input(label)}
              placeholder="Example: Nakama Coffee"
            />
            <FormErrors>{label}</FormErrors>
          </div>

          <div className="space-y-2">
            <FormLabel htmlFor="address">Address</FormLabel>
            <Textarea
              className="w-full"
              {...conform.input(address)}
              placeholder="Address of the location"
            />
            <FormErrors>{address}</FormErrors>
          </div>

          <div className="space-y-2">
            <FormLabel htmlFor="mapUrl">Map URL</FormLabel>
            <Input
              className="w-full"
              {...conform.input(mapsUrl)}
              placeholder="Google maps url"
            />
            <FormErrors>{mapsUrl}</FormErrors>
          </div>
        </>
      )}

      {/* Field for ONLINE Event */}
      {(eventCategorySymbol === "ONLINE" ||
        eventCategorySymbol === "HYBRID") && (
        <>
          <div className="space-y-2">
            <FormLabel htmlFor="Event Media">Media</FormLabel>
            <ClientOnly>
              {() => (
                <Select {...conform.input(mediaId)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select media" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {eventMedias.map(eventMedia => (
                        <SelectItem key={eventMedia.id} value={eventMedia.id}>
                          {eventMedia.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </ClientOnly>
            <FormErrors>{mediaId}</FormErrors>
          </div>

          <div className="space-y-2">
            <FormLabel htmlFor="url">URL</FormLabel>
            <Input
              className="w-full"
              {...conform.input(url)}
              placeholder="Example: around.co/bandungdev"
            />
            <FormErrors>{url}</FormErrors>
          </div>
        </>
      )}
    </Card>
  )
}
