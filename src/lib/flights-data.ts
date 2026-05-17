export type TripType = "round" | "oneway" | "multicity";

export type CabinClass = "economy" | "premium" | "business" | "first";

export interface Airline {
  code: string;
  name: string;
  colorClass: string;
  bgFrom: string;
  bgTo: string;
  textColor: string;
}

export interface FlightDeal {
  airline: Airline;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: string;
  price: string;
  badge: "best" | "fast" | "cheap" | "nonstop";
  dayOffset?: string;
}

export interface RouteChip {
  from: string;
  to: string;
  price: string;
}

export interface InspirationCard {
  emoji: string;
  title: string;
  subtitle: string;
  price: string;
}

export interface CalendarDay {
  day: number | null;
  price: number | null;
  type: "cheap" | "normal" | "expensive" | "empty";
}

export const AIRLINES: Record<string, Airline> = {
  indigo: {
    code: "6E",
    name: "IndiGo",
    colorClass: "indigo",
    bgFrom: "#1a3fa8",
    bgTo: "#2563eb",
    textColor: "#fff",
  },
  airindia: {
    code: "AI",
    name: "Air India",
    colorClass: "airindia",
    bgFrom: "#7f1d1d",
    bgTo: "#dc2626",
    textColor: "#fff",
  },
  vistara: {
    code: "UK",
    name: "Vistara",
    colorClass: "vistara",
    bgFrom: "#2d1b69",
    bgTo: "#7c3aed",
    textColor: "#fff",
  },
  spicejet: {
    code: "SG",
    name: "SpiceJet",
    colorClass: "spicejet",
    bgFrom: "#c2410c",
    bgTo: "#f97316",
    textColor: "#fff",
  },
  akasa: {
    code: "QP",
    name: "Akasa Air",
    colorClass: "akasa",
    bgFrom: "#b45309",
    bgTo: "#f59e0b",
    textColor: "#1a0a00",
  },
};

export const FLIGHT_DEALS: FlightDeal[] = [
  {
    airline: AIRLINES.indigo,
    from: "Mumbai",
    fromCode: "BOM",
    to: "Delhi",
    toCode: "DEL",
    departure: "06:10",
    arrival: "08:20",
    duration: "2h 10m",
    stops: "Non-stop",
    price: "₹3,299",
    badge: "best",
  },
  {
    airline: AIRLINES.airindia,
    from: "Delhi",
    fromCode: "DEL",
    to: "London Heathrow",
    toCode: "LHR",
    departure: "14:30",
    arrival: "19:05",
    duration: "9h 35m",
    stops: "Non-stop",
    price: "₹45,800",
    badge: "nonstop",
    dayOffset: "+1",
  },
  {
    airline: AIRLINES.vistara,
    from: "Bengaluru",
    fromCode: "BLR",
    to: "Singapore",
    toCode: "SIN",
    departure: "10:45",
    arrival: "17:30",
    duration: "4h 45m",
    stops: "Non-stop",
    price: "₹18,400",
    badge: "cheap",
  },
  {
    airline: AIRLINES.spicejet,
    from: "Chennai",
    fromCode: "MAA",
    to: "Dubai",
    toCode: "DXB",
    departure: "21:15",
    arrival: "23:30",
    duration: "3h 15m",
    stops: "Non-stop",
    price: "₹9,200",
    badge: "fast",
  },
];

export const COMPARE_DATA = [
  {
    airline: AIRLINES.indigo,
    price: "₹3,299",
    baggage: "15 kg",
    meal: false,
    flexible: false,
  },
  {
    airline: AIRLINES.airindia,
    price: "₹4,850",
    baggage: "25 kg",
    meal: true,
    flexible: true,
  },
  {
    airline: AIRLINES.vistara,
    price: "₹5,100",
    baggage: "20 kg",
    meal: true,
    flexible: false,
  },
  {
    airline: AIRLINES.akasa,
    price: "₹3,599",
    baggage: "15 kg",
    meal: false,
    flexible: true,
  },
];

export const POPULAR_ROUTES: RouteChip[] = [
  { from: "Mumbai", to: "Delhi", price: "₹3.2k" },
  { from: "Bengaluru", to: "Hyderabad", price: "₹2.1k" },
  { from: "Delhi", to: "Dubai", price: "₹11k" },
  { from: "Mumbai", to: "Singapore", price: "₹14k" },
  { from: "Kolkata", to: "Bangkok", price: "₹8.5k" },
  { from: "Chennai", to: "London", price: "₹42k" },
  { from: "Pune", to: "Goa", price: "₹1.8k" },
];

export const INSPIRATION: InspirationCard[] = [
  {
    emoji: "🏖️",
    title: "Goa getaway",
    subtitle: "Fri – Sun · 2 nights · Beach vibes",
    price: "from ₹2,900",
  },
  {
    emoji: "