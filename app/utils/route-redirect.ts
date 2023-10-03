import { json, redirect } from "@remix-run/node";

import { configRedirects } from "~/configs";

export function redirectRouteToURL(request: Request) {
  const url = new URL(request.url);

  const foundItem = configRedirects.find(
    (item) => item.path.trim() === url.pathname
  );

  if (!foundItem) {
    return json(null);
  }
  if (foundItem.url) {
    return redirect(foundItem.url);
  }
  if (!foundItem.url && foundItem.to) {
    return redirect(foundItem.to);
  }
  return json(null);
}
