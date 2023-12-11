import { type Prisma } from "@prisma/client"

import { FormChangeStatus } from "~/components/shared/form-change-status"
import { FormDelete } from "~/components/shared/form-delete"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { useAppUserLoaderData } from "~/hooks/use-app-loader-data"
import { type modelEvent } from "~/models/event.server"
import { cn } from "~/utils/cn"
import { truncateText } from "~/utils/string"

export function EventItemAction({
  event,
}: {
  event: Prisma.PromiseReturnType<typeof modelEvent.getWithStatus>
}) {
  const { eventStatuses } = useAppUserLoaderData()
  if (!event) return null

  // Only can View event if PRIVATE, UNLISTED, PUBLISHED, ARCHIVED
  const isViewDisabled = event.status.symbol === "DRAFT"

  return (
    <li
      key={event.id}
      className={cn(
        "flex flex-col flex-wrap items-start justify-between gap-1 py-2",
        "sm:flex-row",
        "lg:items-center lg:gap-2",
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex flex-col gap-1",
            "lg:flex-row-reverse lg:items-center",
          )}
        >
          <h4>{truncateText(event.title)}</h4>

          <div className="space-x-1">
            <ButtonLink
              variant="outline"
              size="xs"
              to={`/admin/events/${event.id}`}
            >
              <Iconify icon="ph:note-pencil" />
              <span>Edit</span>
            </ButtonLink>
            <FormDelete
              action="/admin/events/delete"
              intentValue="delete-event-by-id"
              itemText={`a event: ${event.title} (${event.slug})`}
              defaultValue={event.id}
              requireUser
            />
            <ButtonLink
              variant="outline"
              size="xs"
              to={`/events/${event.slug}`}
              disabled={isViewDisabled}
            >
              <Iconify icon="ph:arrow-square-out-duotone" />
              <span>View</span>
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 lg:flex-row-reverse">
        <FormChangeStatus
          itemId="eventId"
          action="/admin/events/patch"
          intentValue="change-event-status"
          dialogTitle="Change event's status"
          dialogDescription={`Change the status of event: ${event.title} (${event.slug})`}
          itemStatuses={eventStatuses}
          item={event}
        />

        <code className="hidden text-xs text-muted-foreground lg:inline-flex">
          {event.slug}
        </code>
      </div>
    </li>
  )
}
