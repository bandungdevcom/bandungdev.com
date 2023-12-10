/**
 * EDITME: Config Action Items: New and Manage
 */

export type ConfigActionItem = {
  actionNew: string
  actionManage: string
  icon: string
  name: string
  isEnabled: boolean
}

export function getActionItem(name: string) {
  return configActionItems.find(actionItem => actionItem.name === name)
}

export const configActionItems: ConfigActionItem[] = [
  {
    actionNew: "/user/posts/new",
    actionManage: "/user/posts",
    name: "Post",
    icon: "ph:scroll-duotone",
    isEnabled: true,
  },
  {
    actionNew: "/admin/events/new",
    actionManage: "/admin/events",
    name: "Event",
    icon: "ph:calendar-blank-duotone",
    isEnabled: true,
  },
  {
    actionNew: "/user/images/new",
    actionManage: "/user/images",
    name: "Image",
    icon: "ph:image-duotone",
    isEnabled: false,
  },
]
