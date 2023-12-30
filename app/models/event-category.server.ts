import { type EventCategory } from "@prisma/client"

import { prisma } from "~/libs/db.server"

export const modelEventCategory = {
  count() {
    return prisma.eventCategory.count()
  },

  getAll() {
    return prisma.eventCategory.findMany()
  },

  getById({ id }: Pick<EventCategory, "id">) {
    return prisma.eventCategory.findUnique({
      where: { id },
    })
  },

  getBySymbol({ symbol }: Pick<EventCategory, "symbol">) {
    return prisma.eventCategory.findUnique({
      where: { symbol },
    })
  },

  create({
    sequence,
    symbol,
    name,
    description,
  }: Pick<EventCategory, "sequence" | "symbol" | "name" | "description">) {
    return prisma.eventCategory.create({
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
  }: Pick<
    EventCategory,
    "id" | "sequence" | "symbol" | "name" | "description"
  >) {
    return prisma.eventCategory.update({
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
    return prisma.eventCategory.deleteMany()
  },

  deleteById({ id }: Pick<EventCategory, "id">) {
    return prisma.eventCategory.delete({
      where: { id },
    })
  },
}
