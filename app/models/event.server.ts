import { type Event } from "@prisma/client"

import { prisma } from "~/libs/db.server"

export const modelEvent = {
  count() {
    return prisma.event.count()
  },

  getAll() {
    return prisma.event.findMany({
      where: {
        status: { symbol: "PUBLISHED" },
      },
      include: {
        image: { select: { url: true } },
      },
    })
  },

  getAllSlugs() {
    return prisma.event.findMany({
      where: {
        status: { symbol: "PUBLISHED" },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })
  },

  getById({ id }: Pick<Event, "id">) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        status: { select: { symbol: true, name: true } },
        image: { select: { url: true } },
      },
    })
  },

  getWithStatus() {
    return prisma.event.findFirst({
      include: {
        status: { select: { symbol: true, name: true } },
        image: { select: { id: true, url: true } },
      },
    })
  },

  getBySlug({ slug }: Pick<Event, "slug">) {
    return prisma.event.findUnique({
      where: {
        slug,
        status: {
          OR: [
            { symbol: "PUBLISHED" },
            { symbol: "ARCHIVED" },
            { symbol: "UNLISTED" },
          ],
        },
      },
      include: {
        status: { select: { symbol: true, name: true } },
        image: { select: { url: true } },
      },
    })
  },

  search({ q }: { q: string | undefined }) {
    return prisma.event.findMany({
      where: {
        OR: [{ title: { contains: q } }, { slug: { contains: q } }],
        status: {
          OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }],
        },
      },
      include: {
        image: { select: { url: true } },
      },
      orderBy: [{ updatedAt: "asc" }],
    })
  },
}
