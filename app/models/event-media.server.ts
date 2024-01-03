import { type EventMedia } from "@prisma/client"

import { prisma } from "~/libs/db.server"

export const modelEventMedia = {
  getAll() {
    return prisma.eventMedia.findMany()
  },

  create({ symbol, name }: Pick<EventMedia, "symbol" | "name">) {
    return prisma.eventMedia.create({
      data: {
        symbol,
        name,
      },
    })
  },
}
