import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "About" }];

export default function Route() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
