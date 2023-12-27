import { z } from "zod"
import { zfd } from "zod-form-data"

import { userId } from "~/schemas/general"

const organizerId = userId

const id = z.string({ required_error: "Event ID is required" })

// IDEA: Prepare trim slug function
const slug = z
  .string({ required_error: "Slug is required" })
  .min(1, "Slug require at least 1 character")
  .max(100, "Slug limited to 100 characters")

const title = z.string({ required_error: "Title is required" })

const description = z.string({ required_error: "Description is required" })

const content = z.string().optional()

const readingTime = zfd.numeric(z.number().min(0).max(1000)).optional()

const categoryId = z.string({ required_error: "Category is required" })

const address = z.string().optional()

const url = z.string().optional()

const mapUrl = z.string().optional()

export const schemaEvent = z.object({
  organizerId,
  id,
  slug,
  title,
  description,
  content,
  readingTime,
  categoryId,
  address,
  url,
  mapUrl,
})

export const schemaEventCategory = z.object({ id, categoryId })

export const schemaEventDeleteAll = z.object({ organizerId })

export const schemaEventDeleteById = z.object({ organizerId, id })
