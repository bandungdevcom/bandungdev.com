import { type Event, type Location } from "@prisma/client"
import { createEventSlug } from "~/helpers/event"
import { prisma } from "~/libs/db.server"
import { type EventStatusSymbol } from "~/types/event-status"

export const modelAdminEvent = {
  count() {
    return prisma.event.count()
  },

  getAll() {
    return prisma.event.findMany({
      include: {
        image: { select: { url: true } },
      },
    })
  },

  getById({ id }: Pick<Event, "id">) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        status: { select: { symbol: true, name: true } },
        image: { select: { url: true } },
        location: { select: { label: true, address: true, mapsUrl: true } },
      },
    })
  },

  async create({
    organizerId,
    title,
    description,
    content,
    statusSymbol,
  }: Pick<Event, "organizerId" | "title" | "description"> & {
    content?: Event["content"]
    statusSymbol: EventStatusSymbol
  }) {
    const status = await prisma.eventStatus.findUnique({
      where: { symbol: statusSymbol },
    })
    if (!status) return null

    const eventCategory = await prisma.eventCategory.findUnique({
      where: {
        symbol: "IN_PERSON",
      },
    })

    return prisma.event.create({
      data: {
        organizerId,
        slug: createEventSlug(title),
        title,
        description,
        content,
        statusId: status.id,
        categoryId: eventCategory?.id,
        dateTimeStart: new Date(),
        dateTimeEnd: new Date(),
      },
      include: {
        status: true,
      },
    })
  },

  async update({
    id,
    slug,
    title,
    description,
    content,
    url,
    label,
    address,
    mapsUrl,
    mediaId,
    formatId,
  }: Pick<Event, "id" | "slug" | "title" | "description" | "formatId"> & {
    content?: Event["content"]
    mediaId?: Event["mediaId"]
    url?: Event["url"]
    label?: Location["label"]
    address?: Location["address"]
    mapsUrl?: Location["mapsUrl"]
  }) {
    const event = await prisma.event.findUnique({
      where: { id },
      include: { location: true },
    })

    let locationId

    if (event?.location) {
      locationId = event.location.id
      await prisma.location.update({
        where: {
          id: event.location.id,
        },
        data: {
          label,
          address,
          mapsUrl,
        },
      })
    } else {
      const location = await prisma.location.create({
        data: {
          label: label ?? "",
          address,
          mapsUrl,
        },
      })
      locationId = location.id
    }

    return prisma.event.update({
      where: { id },
      data: {
        slug,
        title,
        description,
        content,
        url,
        locationId,
        mediaId,
        formatId,
      },
    })
  },

  deleteAll() {
    return prisma.event.deleteMany()
  },

  deleteById({ id }: Pick<Event, "id">) {
    return prisma.event.delete({ where: { id } })
  },
}
