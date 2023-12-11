import { type SEOHandle } from "@nasa-gcn/remix-seo"

import { modelEvent } from "~/models/event.server"
import { formatDateYMD } from "~/utils/datetime"

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const events = await modelEvent.getAllSlugs()
    return events.map(event => {
      return {
        route: `/events/${event.slug}`,
        priority: 0.8,
        lastmod: formatDateYMD(event.updatedAt),
      }
    })
  },
}
