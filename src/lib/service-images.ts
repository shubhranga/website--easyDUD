export type ServiceCategory =
  | "taxi"
  | "bus"
  | "flight"
  | "hotel"
  | "bikePooling"
  | "auto";

export const SERVICE_IMAGES: Record<ServiceCategory, string[]> = {
  taxi: [
    "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80",
  ],
  bus: [
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1200&q=80",
  ],
  flight: [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1200&q=80",
  ],
  hotel: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  ],
  bikePooling: [
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
  ],
  auto: [
    "https://images.unsplash.com/photo-1599054735388-bcb07bdd3574?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582547094329-bef03cb0e2d2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
  ],
};

export const CATEGORY_META: Record<
  ServiceCategory,
  { label: string; tagline: string; route: string }
> = {
  taxi: { label: "Taxi", tagline: "City cabs, airport rides & luxury rideshare.", route: "/taxi" },
  bus: { label: "Bus", tagline: "Sleeper buses, terminals & highway coaches.", route: "/bus" },
  flight: { label: "Flights", tagline: "Airports, cabins & seamless departures.", route: "/flights" },
  hotel: { label: "Hotels", tagline: "Luxury rooms, resorts & modern lobbies.", route: "/hotels" },
  bikePooling: {
    label: "Bike pooling",
    tagline: "Urban commuters, helmets & electric bikes.",
    route: "/bike-pooling",
  },
  auto: { label: "Auto", tagline: "Auto-rickshaws, metro pickups & street mobility.", route: "/auto" },
};
