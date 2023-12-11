import { type EventStatus, type PostStatus } from "@prisma/client"

import { useMatchesData } from "~/hooks/use-root-loader-data"

export function useAppUserLoaderData() {
  const appUserData = useMatchesData("routes/user") as {
    postStatuses: PostStatus[]
    eventStatuses: EventStatus[]
  }

  return {
    postStatuses: appUserData?.postStatuses,
    eventStatuses: appUserData?.eventStatuses,
  }
}

export function useAppAdminLoaderData() {
  const appAdminData = useMatchesData("routes/admin") as {
    postStatuses: PostStatus[]
    eventStatuses: EventStatus[]
  }

  return {
    postStatuses: appAdminData?.postStatuses,
    eventStatuses: appAdminData?.eventStatuses,
  }
}
