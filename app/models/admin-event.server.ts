import { Location, type Event } from "@prisma/client"
import { createEventSlug } from "~/helpers/event"
import { prisma } from "~/libs/db.server"
import { type EventStatusSymbol } from "~/types/event-status"

export const modelAdminEvent = {
  count({ organizerId }: Pick<Event, "organizerId">) {
    return prisma.event.count({
      where: { organizerId },
    })
  },

  getAll({ organizerId }: Pick<Event, "organizerId">) {
    return prisma.event.findMany({
      where: { organizerId },
      include: {
        image: { select: { url: true } },
      },
    })
  },

  getById({ id, organizerId }: Pick<Event, "id" | "organizerId">) {
    return prisma.event.findUnique({
      where: { id, organizerId },
      include: {
        status: { select: { symbol: true, name: true } },
        image: { select: { url: true } },
        location: { select: { label: true, address: true } }
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
        // FIXME: Default dates
        date: new Date(),
        timeStart: new Date(),
        timeEnd: new Date(),
      },
      include: {
        status: true,
      },
    })
  },

  async update({
    organizerId,
    id,
    slug,
    title,
    description,
    content,
    url,
    address
  }: Pick<Event, "organizerId" | "id" | "slug" | "title" | "description"> & {
    content?: Event["content"]
    url?: Event["url"]
    address?: Location["address"]
  }) {
    const event = await prisma.event.findUnique({
      where: {
        id
      },
      include: {
        location: true
      }
    })

    let locationId;

    if (event?.location) {
      locationId = event.location.id
      await prisma.location.update({
        where: {
          id: event.location.id
        },
        data: {
          address
        }
      })
    } else {
      const location = await prisma.location.create({
        data: {
          label: "",
          address
        }
      })
      locationId = location.id
    }

    return prisma.event.update({
      where: { id },
      data: {
        organizerId,
        slug,
        title,
        description,
        content,
        url,
        locationId
      },
    })
  },

  deleteAll({ organizerId }: Pick<Event, "organizerId">) {
    return prisma.event.deleteMany({ where: { organizerId } })
  },

  deleteById({ organizerId, id }: Pick<Event, "organizerId" | "id">) {
    return prisma.event.delete({ where: { id, organizerId } })
  },
}
