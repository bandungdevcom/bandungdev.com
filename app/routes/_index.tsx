import type { MetaFunction } from "@vercel/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "BandungDev" },
    { name: "description", content: "Welcome to BandungDev." },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>BandungDev</h1>
    </div>
  );
}
