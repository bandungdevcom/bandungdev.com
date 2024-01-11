import { type EventStatus } from "@prisma/client"

import { prisma } from "~/libs/db.server"

export const modelEventStatus = {
  count() {
    return prisma.eventStatus.count()
  },

  getAll() {
    return prisma.eventStatus.findMany()
  },

  getById({ id }: Pick<EventStatus, "id">) {
    return prisma.eventStatus.findUnique({
      where: { id },
    })
  },

  getBySymbol({ symbol }: Pick<EventStatus, "symbol">) {
    return prisma.eventStatus.findUnique({
      where: { symbol },
    })
  },

  create({
    sequence,
    symbol,
    name,
    description,
  }: Pick<EventStatus, "sequence" | "symbol" | "name" | "description">) {
    return prisma.eventStatus.create({
      data: {
        sequence,
        symbol,
        name,
        description,
      },
    })
  },

  update({
    id,
    sequence,
    symbol,
    name,
    description,
  }: Pick<EventStatus, "id" | "sequence" | "symbol" | "name" | "description">) {
    return prisma.eventStatus.update({
      where: { id },
      data: {
        sequence,
        symbol,
        name,
        description,
      },
    })
  },

  deleteAll() {
    return prisma.eventStatus.deleteMany()
  },

  deleteById({ id }: Pick<EventStatus, "id">) {
    return prisma.eventStatus.delete({
      where: { id },
    })
  },
}
