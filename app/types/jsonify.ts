// eslint-disable-next-line import/consistent-type-specifier-style
import type { Jsonify } from "@remix-run/server-runtime/dist/jsonify.d.ts"

export type JsonifyValues<T> = {
  [K in keyof T]: Jsonify<T[K]>
}
