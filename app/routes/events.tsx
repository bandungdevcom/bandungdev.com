import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { prisma } from "~/libs";
import { EventsList } from "~/components";

export const meta: MetaFunction = () => [
  // your meta here
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const events = await prisma.event.findMany();

  return json({ events });
};

export default function EventsRoute() {
  const { events } = useLoaderData<typeof loader>();

  return (
    <div>
      <header>
        <h1>Events</h1>
      </header>

      <section>
        <h2>Public Events</h2>
        <EventsList events={events as any} />
      </section>
    </div>
  );
}
