// eslint-disable-next-line import/consistent-type-specifier-style
import type { Jsonify } from "node_modules/.pnpm/@remix-run+server-runtime@2.4.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/jsonify.d.ts"

export type JsonifyValues<T> = {
  [K in keyof T]: Jsonify<T[K]>
}
