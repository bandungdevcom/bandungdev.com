import { type EventStatus } from "@prisma/client"

import { IconEventStatus } from "~/components/shared/icon-event-status"
import { Badge, type BadgeProps } from "~/components/ui/badge"
import { cn } from "~/utils/cn"

export function BadgeEventStatus({
  status,
  className,
}: BadgeProps & {
  status: Pick<EventStatus, "symbol" | "name">
}) {
  return (
    <Badge
      variant="secondary"
      className={cn("inline-flex items-center gap-1", className)}
    >
      <IconEventStatus status={status} />
      <span>{status.name}</span>
    </Badge>
  )
}
