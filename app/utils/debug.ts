import util from "util"

export function debugCode(code: unknown, isShown = true) {
  console.info(util.inspect(code, false, null, true))
}
