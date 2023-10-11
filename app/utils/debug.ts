import util from "util";

export function debug(code: unknown, isShown = true) {
  if (process.env.NODE_ENV !== "development" || isShown !== true) return null;
  console.info(util.inspect(code, false, null, true));
}
