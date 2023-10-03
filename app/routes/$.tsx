import type { LoaderFunctionArgs } from "@remix-run/node";

import { redirectRouteToURL } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToURL(request);
};
