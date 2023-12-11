import { type Event } from "@prisma/client"

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

    return prisma.event.create({
      data: {
        organizerId,
        slug: createEventSlug(title),
        title,
        description,
        content,
        statusId: status.id,
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

  update({
    organizerId,
    id,
    slug,
    title,
    description,
    content,
  }: Pick<Event, "organizerId" | "id" | "slug" | "title" | "description"> & {
    content?: Event["content"]
  }) {
    return prisma.event.update({
      where: { id },
      data: {
        organizerId,
        slug,
        title,
        description,
        content,
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
