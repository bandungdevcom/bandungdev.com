import { type EventStatus as EventFormat } from "@prisma/client"

import { prisma } from "~/libs/db.server"

export const modelEventFormat = {
  count() {
    return prisma.eventFormat.count()
  },

  getAll() {
    return prisma.eventFormat.findMany()
  },

  getById({ id }: Pick<EventFormat, "id">) {
    return prisma.eventFormat.findUnique({
      where: { id },
    })
  },

  getBySymbol({ symbol }: Pick<EventFormat, "symbol">) {
    return prisma.eventFormat.findUnique({
      where: { symbol },
    })
  },

  create({
    sequence,
    symbol,
    name,
    description,
  }: Pick<EventFormat, "sequence" | "symbol" | "name" | "description">) {
    return prisma.eventFormat.create({
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
  }: Pick<EventFormat, "id" | "sequence" | "symbol" | "name" | "description">) {
    return prisma.eventFormat.update({
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
    return prisma.eventFormat.deleteMany()
  },

  deleteById({ id }: Pick<EventFormat, "id">) {
    return prisma.eventFormat.delete({
      where: { id },
    })
  },
}
