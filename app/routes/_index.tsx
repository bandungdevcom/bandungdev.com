import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { prisma } from "~/libs";
import { EventsList } from "~/components";

export const meta: MetaFunction = () => {
  return [
    { title: "BandungDev" },
    { name: "description", content: "Welcome to BandungDev." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const events = await prisma.event.findMany();

  return json({ events });
};

export default function Index() {
  const { events } = useLoaderData<typeof loader>();

  return (
    <div>
      <header>
        <h1>BandungDev</h1>
        <p>Bandung Developer Community</p>
      </header>

      <section>
        <h2>Public Events</h2>
        <EventsList events={events as any} />
      </section>
    </div>
  );
}
