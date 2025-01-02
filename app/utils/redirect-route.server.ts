import { redirect } from "@remix-run/node"

export type ConfigRedirect = {
  path: string
  url?: string
  to?: string
}

export function redirectRouteToUrl(
  request: Request,
  configRedirects: ConfigRedirect[],
) {
  const url = new URL(request.url)
  const { pathname } = url

  const foundItem = configRedirects.find(item => item.path.trim() === pathname)

  if (!foundItem) return redirect(`https://a.bandungdev.com${pathname}`, 307)
  if (foundItem.url && !foundItem.to) return redirect(foundItem.url)
  if (!foundItem.url && foundItem.to) return redirect(foundItem.to)

  return redirect(`https://a.bandungdev.com${pathname}`, 307)
}
