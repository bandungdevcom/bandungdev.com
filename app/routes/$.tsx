import type { LoaderFunctionArgs } from "@remix-run/node"

import { redirectRouteToURL } from "~/utils/route-redirect"

export const loader = ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToURL(request)
}
