import { type Event } from "@prisma/client"

import { createNanoId, createSlug } from "~/utils/string"

export function createEventSlug(title: Event["title"]) {
  return `${createSlug(title)}-${createNanoId()}`
}

export function extractEventSlug(slug: Event["slug"]) {
  return slug.split("-").slice(0, -1).join("-")
}
