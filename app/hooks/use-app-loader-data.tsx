import { type EventStatus, type PostStatus } from "@prisma/client"

import { useMatchesData } from "~/hooks/use-root-loader-data"

/**
 * Normal User can only access personal Posts
 */
export function useAppUserLoaderData() {
  const appUserData = useMatchesData("routes/user") as {
    postStatuses: PostStatus[]
  }

  return {
    postStatuses: appUserData?.postStatuses,
  }
}

/**
 * Admin User can access everything, Posts and Events
 */
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
