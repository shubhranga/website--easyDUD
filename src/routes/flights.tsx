import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/flights")({
  head: () => ({
    meta: [
      { title: "Flights — DUD Travel" },
      { name: "description", content: "Search airports, cabins and seamless departures on DUD Travel." },
    ],
  }),
  component: () => <CategoryPage category="flight" />,
});
