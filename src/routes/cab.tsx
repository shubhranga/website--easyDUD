import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Flag,
  ArrowUpDown,
  Calendar,
  Clock,
  Tag,
  Phone,
  Star,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/cab")({
  head: () => ({
    meta: [
      { title: "Book a Cab — DUD Travel" },
      { name: "description", content: "Fast, reliable cabs across the city — Mini, Sedan, SUV and Electric options." },
    ],
  }),
  component: CabPage,
});

type CabType = "mini" | "sedan" | "suv" | "electric";

const CAB_TYPES: { id: CabType; emoji: string; name: string; price: string; seats: string }[] = [
  { id: "mini", emoji: "🚗", name: "Mini", price: "₹8/km", seats: "1–4 seats" },
  { id: "sedan", emoji: "🚕", name: "Sedan", price: "₹12/km", seats: "1–4 seats" },
  { id: "suv", emoji: "🚙", name: "SUV", price: "₹18/km", seats: "1–6 seats" },
  { id: "electric", emoji: "🔋", name: "Electric", price: "₹10/km", seats: "1–4 seats" },
];

const RECENT_RIDES = [
  { date: "May 16, 2026 · 9:14 AM", from: "Bandra W", to: "BKC", fare: "₹245", status: "Completed" as const },
  { date: "May 12, 2026 · 6:42 PM", from: "Colaba", to: "Powai", fare: "₹680", status: "Completed" as const },
  { date: "May 09, 2026 · 11:20 AM", from: "Andheri E", to: "Airport T2", fare: "₹180", status: "Cancelled" as const },
  { date: "May 03, 2026 · 4:55 PM", from: "Worli", to: "Marine Drive", fare: "₹210", status: "Completed" as const },
];

const POPULAR = [
  { from: "Mumbai Airport", to: "Bandra", fare: "₹350", dur: "35 min" },
  { from: "Colaba", to: "Powai", fare: "₹680", dur: "55 min" },
  { from: "BKC", to: "Andheri", fare: "₹420", dur: "40 min" },
  { from: "Pune", to: "Mumbai", fare: "₹2,400", dur: "3h 30m" },
];

function CabPage() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [cab, setCab] = useState<CabType>("sedan");
  const [promoOpen, setPromoOpen] = useState(false);

  const fareReady = pickup && drop;
  const estimate = useMemo(() => {
    const base = { mini: [180, 220], sedan: [245, 280], suv: [380, 420], electric: [210, 250] }[cab];
    return base;
  }, [cab]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero strip */}
      <section className="relative h-[280px] mt-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600&q=80"
          alt="city street"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
        <div className="relative z-10 mx-auto max-w-[1320px] h-full px-6 flex flex-col justify-end pb-8">
          <h1 className="text-white text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Book a Cab
          </h1>
          <p className="text-white/80 mt-2 text-sm md:text-base">
            Fast, reliable, and affordable rides across the city.
          </p>
        </div>
      </section>

      {/* Split layout */}
      <section className="mx-auto max-w-[1320px] px-6 mt-10 grid gap-6 lg:grid-cols-5">
        {/* Left: form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        >
          {/* From / To */}
          <div className="relative">
            <Input icon={<MapPin className="h-4 w-4 text-emerald-500" />} placeholder="Pickup location" value={pickup} onChange={setPickup} />
            <div className="my-1 ml-6 h-5 border-l-2 border-dotted border-foreground/20" />
            <Input icon={<Flag className="h-4 w-4 text-rose-500" />} placeholder="Drop location" value={drop} onChange={setDrop} />
            <button
              type="button"
              aria-label="Swap"
              onClick={() => {
                setPickup(drop);
                setDrop(pickup);
              }}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground/60"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Date / Time */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Input icon={<Calendar className="h-4 w-4 text-foreground/50" />} placeholder="Date" type="date" />
            <Input icon={<Clock className="h-4 w-4 text-foreground/50" />} placeholder="Time" type="time" />
          </div>

          {/* Cab types */}
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-foreground/60">Choose your cab</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {CAB_TYPES.map((c) => {
              const active = cab === c.id;
              return (
                <motion.button
                  key={c.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setCab(c.id)}
                  className={
                    "text-left rounded-2xl p-3 border-2 transition-all " +
                    (active
                      ? "border-[#2563EB] bg-[#EFF6FF]"
                      : "border-transparent bg-secondary/50 hover:bg-secondary")
                  }
                >
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="mt-1 text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-foreground/60">{c.price} · {c.seats}</div>
                </motion.button>
              );
            })}
          </div>

          {/* Promo */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setPromoOpen((v) => !v)}
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground"
            >
              <Tag className="h-4 w-4" />
              Have a promo code?
            </button>
            <AnimatePresence>
              {promoOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    placeholder="Enter code"
                    className="mt-2 w-full bg-secondary/60 rounded-full px-4 py-2.5 text-sm focus:outline-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fare estimate */}
          {fareReady && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl bg-[#EFF6FF] border-l-4 border-[#2563EB] p-4"
            >
              <div className="text-sm font-semibold text-foreground">
                Estimated fare: ₹{estimate[0]} – ₹{estimate[1]}
              </div>
              <div className="text-xs text-foreground/60 mt-1">Distance: ~12 km · ETA: 22 min</div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() =>
              fareReady
                ? toast.success(`Ride booked: ${pickup} → ${drop}`)
                : toast.error("Enter pickup and drop locations.")
            }
            className="mt-5 w-full h-14 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-[0_8px_24px_rgba(37,99,235,0.4)] inline-flex items-center justify-center gap-2"
          >
            Book My Ride <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>

        {/* Right: map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-3 relative rounded-3xl overflow-hidden min-h-[600px] bg-[#1a1f2e]"
        >
          {/* Stylized street grid */}
          <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Pulsing pin */}
          <div className="absolute top-1/2 left-1/3">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-[#2563EB] border-2 border-white" />
            </span>
          </div>

          {/* Dotted path */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            <path
              d="M 33% 50% Q 50% 30% 70% 35%"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
          </svg>

          {/* Top card */}
          <div className="absolute top-4 left-4 bg-white rounded-2xl px-4 py-3 shadow-lg">
            <div className="text-sm font-semibold">🚗 3 cabs nearby</div>
            <div className="text-xs text-foreground/60">Avg. wait: 4 min</div>
          </div>

          {/* Bottom driver card */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                RK
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Rajesh K.</span>
                  <span className="inline-flex items-center gap-0.5 text-xs text-amber-600">
                    <Star className="h-3 w-3 fill-amber-400" /> 4.8
                  </span>
                </div>
                <div className="text-xs text-foreground/60">MH 02 AB 1234 · Maruti Alto</div>
              </div>
              <button className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Phone className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-indigo-500" />
              </div>
              <span className="text-xs text-foreground/60">2 min away</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Recent rides */}
      <section className="mx-auto max-w-[1320px] px-6 mt-16">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Recent Rides
        </h2>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-4 snap-x">
          {RECENT_RIDES.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="snap-start min-w-[280px] bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="text-xs text-foreground/60">{r.date}</div>
              <div className="mt-2 text-sm font-medium truncate">{r.from} → {r.to}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold">{r.fare}</span>
                <span
                  className={
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full " +
                    (r.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700")
                  }
                >
                  {r.status}
                </span>
              </div>
              <button className="mt-2 text-xs text-[#2563EB] hover:underline">Rebook</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular routes */}
      <section className="mx-auto max-w-[1320px] px-6 mt-12">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Popular Cab Routes
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-2xl p-5 text-white bg-gradient-to-br from-[#0F172A] to-[#2563EB] shadow-[0_8px_24px_rgba(37,99,235,0.25)]"
            >
              <div className="text-sm font-semibold">{p.from} → {p.to}</div>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-2xl font-bold">{p.fare}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{p.dur}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/" className="text-sm text-[#2563EB] hover:underline">← Back home</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Input({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-3">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-foreground/40"
      />
    </div>
  );
}
