import { type EventStatus } from "@prisma/client"
import { match } from "ts-pattern"

import { Iconify } from "~/components/ui/iconify"

// FIXME: Change icons
const getIconName = (symbol: string) =>
  match(symbol)
    .with("DRAFT", () => "ph:notebook-fill")
    .with("UNLISTED", () => "ph:book-bookmark-fill")
    .with("PUBLISHED", () => "ph:book-open-text-fill")
    .with("ARCHIVED", () => "ph:books-fill")
    .otherwise(() => "simple-line-icons:question")

export function IconEventStatus({
  status,
}: {
  status: Pick<EventStatus, "symbol">
}) {
  return <Iconify className="inline" icon={getIconName(status.symbol)} />
}
