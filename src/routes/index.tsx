import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, CircleDot } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import { FloatingSidebar, type BookingCategory } from "@/components/FloatingSidebar";
import {
  OurServicesSection,
  WhatWeOfferSection,
  PricingSection,
  QrDownloadSection,
} from "@/components/HomeSections";

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_IMAGES: Record<BookingCategory, string> = {
  taxi: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80",
  bus: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1400&q=80",
  flight: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80",
  auto: "https://images.unsplash.com/photo-1583249598754-b7a2f59651fa?auto=format&fit=crop&w=1400&q=80",
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  bike: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
};

const SECONDARY_IMAGE =
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80";

const OVERLAY_CHIPS = [
  "Easy Booking",
  "Flexible Plans",
  "Verified Guides",
  "24/7 Support",
  "Custom Itineraries",
];

const RIDE_TABS = ["Reserve a ride", "Request a ride", "Bike Pooling"] as const;
type RideTab = (typeof RIDE_TABS)[number];

const SPECIAL_FARES = [
  "Students",
  "Senior Citizen",
  "Doctor & Nurses",
  "School Girls",
];

function Index() {
  const [category, setCategory] = useState<BookingCategory>("bus");
  const [tab, setTab] = useState<RideTab>("Request a ride");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingSidebar active={category} onChange={setCategory} />

      <main className="mx-auto max-w-[1320px] px-6 pt-10 pb-16">
        {/* Headline row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pl-0 md:pl-16">
          <div className="lg:col-span-8">
            <AnimatedHeadline />
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="text-sm leading-relaxed text-foreground/55 max-w-sm">
              Plan seamless rides with real-time booking, transparent pricing,
              and smooth journeys designed for comfort from pickup to
              destination.
            </p>
          </div>
        </section>

        {/* Hero composition */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5 pl-0 md:pl-16">
          {/* Featured image card */}
          <motion.div
            layout
            className="lg:col-span-6 relative rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(60,60,90,0.10)] bg-secondary"
          >
            <motion.img
              key={category}
              src={HERO_IMAGES[category]}
              alt={category}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-[360px] w-full object-cover"
              loading="eager"
            />

            {/* Floating quote card */}
            <div className="absolute top-5 right-5 max-w-[200px] rounded-2xl bg-white/85 backdrop-blur-md px-4 py-3 shadow-[0_4px_20px_rgba(60,60,90,0.10)]">
              <p className="text-[11px] leading-snug text-foreground/70">
                Travel is about the stories you collect along the way and also
                make the memories.
              </p>
            </div>

            {/* Overlay chip buttons */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {OVERLAY_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="text-[11px] font-medium text-foreground/80 rounded-full px-3 py-1 bg-white/80 backdrop-blur border border-white/60 hover:bg-white transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Booking form */}
          <div className="lg:col-span-4 rounded-[28px] bg-white shadow-[0_10px_40px_rgba(60,60,90,0.08)] p-5 flex flex-col">
            {/* Segmented tabs */}
            <div className="flex flex-wrap gap-1.5">
              {RIDE_TABS.map((t) => {
                const active = tab === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={
                      "text-[11px] font-medium rounded-full px-3 py-1 border transition-colors " +
                      (active
                        ? "bg-foreground text-background border-foreground"
                        : "bg-secondary/60 text-foreground/70 border-transparent hover:bg-secondary")
                    }
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <h2 className="mt-4 text-2xl font-light leading-snug text-foreground/85">
              Request a ride for now or later.... <span className="font-medium">!!</span>
            </h2>

            {/* Pickup */}
            <div className="mt-4 flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-2.5">
              <CircleDot className="h-4 w-4 text-foreground/40" />
              <input
                type="text"
                placeholder="Enter Your Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
              />
            </div>

            {/* Dropoff */}
            <div className="mt-2 flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-2.5">
              <MapPin className="h-4 w-4 text-foreground/40" />
              <input
                type="text"
                placeholder="Dropoff Location"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
              />
            </div>

            {/* CTAs */}
            <div className="mt-4 flex gap-2">
              <button className="flex-1 h-10 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                Book Ride
              </button>
              <button className="flex-1 h-10 rounded-full bg-secondary text-foreground/80 text-sm font-medium hover:bg-secondary/80 transition-colors">
                Schedule a ride
              </button>
            </div>

            <p className="mt-3 text-[10px] text-foreground/40">Best offers</p>
          </div>

          {/* Right column: special fares + secondary image */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-[24px] bg-white shadow-[0_10px_40px_rgba(60,60,90,0.08)] p-4">
              <p className="text-[12px] font-medium text-foreground/80">
                Special Fares
              </p>
              <ul className="mt-2 space-y-1.5">
                {SPECIAL_FARES.map((f) => (
                  <li
                    key={f}
                    className="flex items-center justify-between gap-1 text-[11px] text-foreground/70 hover:text-foreground cursor-pointer"
                  >
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
                      {f}
                    </span>
                    <ChevronRight className="h-3 w-3 text-foreground/40" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(60,60,90,0.10)]">
              <img
                src={SECONDARY_IMAGE}
                alt="Featured ride"
                className="h-[160px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <OurServicesSection />
        <WhatWeOfferSection />
        <PricingSection />
        <QrDownloadSection />
      </main>
    </div>
  );
}
