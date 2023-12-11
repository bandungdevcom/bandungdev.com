import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData, type Params } from "@remix-run/react"
import { BadgeEventStatus } from "~/components/shared/badge-event-status"
import { ViewHTML } from "~/components/shared/view-html"

import {
  ErrorHelpInformation,
  GeneralErrorBoundary,
} from "~/components/shared/error-boundary"
import { FormChangeStatus } from "~/components/shared/form-change-status"
import { ImageCover } from "~/components/shared/image-cover"
import { Timestamp } from "~/components/shared/timestamp"
import { Alert } from "~/components/ui/alert"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { Separator } from "~/components/ui/separator"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { prisma } from "~/libs/db.server"
import { modelEventStatus } from "~/models/event-status.server"
import { modelEvent } from "~/models/event.server"
import { formatDateDMY, formatTime } from "~/utils/datetime"
import { invariant, invariantResponse } from "~/utils/invariant"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const event = data?.event

  if (!event) {
    return createMeta({
      title: "Event not found",
      description: `Cannot find event with slug ${params.eventSlug}`,
    })
  }
  return createMeta({
    title: event.title,
    description: event.description,
  })
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.eventSlug, "params.eventSlug unavailable")

  const [event, eventStatuses] = await prisma.$transaction([
    modelEvent.getBySlug({ slug: params.eventSlug }),
    modelEventStatus.getAll(),
  ])

  invariantResponse(event, "Event not found", { status: 404 })
  invariantResponse(eventStatuses, "Event statuses unavailable", {
    status: 404,
  })

  return json({ event, eventStatuses })
}

export default function EventSlugRoute() {
  const { userSession } = useRootLoaderData()
  const { event, eventStatuses } = useLoaderData<typeof loader>()

  const isOwner = event.organizerId === userSession?.id
  const isUpdated = event.createdAt !== event.updatedAt
  const isArchived = event.status.symbol === "ARCHIVED"

  return (
    <div className="site-container space-y-8 pt-20 sm:pt-20">
      <ImageCover
        src={event.image?.url}
        className="mx-auto w-full max-w-4xl object-contain"
        width={900}
        height={450}
      />

      <section className="site-section flex flex-wrap justify-between gap-4">
        <div>
          {!isOwner && (
            <div>
              <BadgeEventStatus status={event.status} />
            </div>
          )}

          {isOwner && (
            <div className="flex flex-wrap gap-2">
              <FormChangeStatus
                itemId="eventId"
                action="/admin/events/patch"
                intentValue="change-event-status"
                dialogTitle="Change event's status"
                dialogDescription={`Change the status of event: ${event.title} (${event.slug})`}
                itemStatuses={eventStatuses}
                item={event as any}
              />
              <ButtonLink
                to={`/admin/events/${event.id}`}
                variant="outline"
                size="xs"
              >
                <Iconify icon="ph:note-pencil" />
                <span>Edit Event</span>
              </ButtonLink>
            </div>
          )}
        </div>

        <Timestamp
          className="text-xs text-muted-foreground"
          isUpdated={isUpdated}
          createdAt={event.createdAt}
          updatedAt={event.updatedAt}
        />
      </section>

      <header className="site-header">
        {isArchived && (
          <Alert>
            This event has been archived by on {formatDateDMY(event.updatedAt)}
          </Alert>
        )}

        <h1>{event.title}</h1>
        <h2 className="text-xl">{event.description}</h2>

        <div className="space-y-2">
          <p className="flex justify-between gap-4">
            <b className="basis-2/12">Date:</b>
            <span className="basis-10/12">{formatDateDMY(event.date)}</span>
          </p>
          <p className="flex justify-between gap-4">
            <b className="basis-2/12">Time:</b>
            <span className="basis-10/12">
              {formatTime(event.timeStart)} – {formatTime(event.timeEnd)}
            </span>
          </p>
          <p className="flex justify-between gap-4">
            <b className="basis-2/12">Location:</b>
            <span className="basis-10/12">{event.locationId} (FIXME)</span>
          </p>
        </div>
      </header>

      <section className="site-section">
        <Separator />
      </section>

      <section className="site-section pb-20 pt-4">
        {event.content && <ViewHTML>{event.content}</ViewHTML>}
        {!event.content && <p>No content details yet</p>}
      </section>

      <section className="site-section">
        <Separator />
      </section>

      <section className="site-section">
        <div>
          <ButtonLink to="/events" size="sm" variant="secondary">
            <Iconify icon="ph:caret-left" />
            <span>All events</span>
          </ButtonLink>
        </div>
      </section>
    </div>
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => <EventSlugErrorMessage params={params} />,
      }}
    />
  )
}

function EventSlugErrorMessage({ params }: { params: Params }) {
  return (
    <>
      <section className="site-section prose-config">
        <h1>Sorry, this event could not be found</h1>
        <p>Cannot find event with the slug "{params.eventSlug}"</p>
        <p>
          The requested event either doesn’t exist or you don’t have access to
          it.
        </p>
      </section>

      <ErrorHelpInformation
        extraButtonLinks={
          <ButtonLink size="sm" variant="secondary" to="/events">
            <Iconify icon="ph:scroll-duotone" />
            <span>Go to All Events</span>
          </ButtonLink>
        }
      />
    </>
  )
}
