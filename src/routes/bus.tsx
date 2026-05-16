import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/bus")({
  head: () => ({
    meta: [
      { title: "Bus — DUD Travel" },
      { name: "description", content: "Sleeper buses, terminals and highway coaches across the country." },
    ],
  }),
  component: () => <CategoryPage category="bus" />,
});
