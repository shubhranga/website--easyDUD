import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Check, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
import { ServiceImage } from "@/components/ServiceImage";
import { SERVICE_IMAGES, CATEGORY_META } from "@/lib/service-images";


function SectionEyebrow({ children }: { children: string }) {
  return (
    <h2 className="inline-block border-b border-foreground/80 pb-1 text-sm font-medium text-foreground/90">
      {children}
    </h2>
  );
}



const SERVICE_GRID = [
  { key: "taxi", cls: "col-span-12 sm:col-span-6 md:col-span-3 h-[200px]" },
  { key: "auto", cls: "col-span-12 sm:col-span-6 md:col-span-3 h-[200px]" },
  { key: "hotel", cls: "col-span-12 sm:col-span-6 md:col-span-3 h-[200px]" },
  { key: "bikePooling", cls: "col-span-12 sm:col-span-6 md:col-span-3 h-[200px]" },
  { key: "bus", cls: "col-span-12 md:col-span-7 h-[240px]" },
  { key: "flight", cls: "col-span-12 md:col-span-5 h-[240px]" },
] as const;

export function OurServicesSection() {
  return (
    <section className="mt-20">
      <SectionEyebrow>Our Services</SectionEyebrow>
      <h3 className="mt-6 text-3xl md:text-4xl font-light text-foreground/85">
        Travel Solutions for Every Journey
        <span className="opacity-60">.....</span>
      </h3>

      <div className="mt-8 grid grid-cols-12 gap-4">
        {SERVICE_GRID.map(({ key, cls }) => {
          const meta = CATEGORY_META[key];
          return (
            <ServiceImage
              key={key}
              images={SERVICE_IMAGES[key]}
              alt={meta.label}
              label={meta.label}
              to={meta.route}
              className={cls}
            />
          );
        })}
      </div>
    </section>
  );
}



export function WhatWeOfferSection() {
  return (
    <section className="mt-20">
      <SectionEyebrow>What we Offer</SectionEyebrow>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <h3 className="lg:col-span-7 text-3xl md:text-4xl font-light text-foreground/85 leading-tight">
          Book taxis, buses, flights, hotels, and more
        </h3>
        <p className="lg:col-span-5 text-sm text-foreground/55 leading-relaxed max-w-md">
          Explore seamless booking services for every journey from daily rides
          to long-distance travel, all in one convenient platform.
        </p>
      </div>

      <div className="mt-5">
        <Link
          to="/taxi"
          className="inline-block rounded-full bg-white border border-foreground/10 px-5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          Book a ride
        </Link>
      </div>

      {/* FIX: equal col-span-4 for all three (4+4+4=12), uniform height, items-stretch */}
      <div className="mt-6 grid grid-cols-12 gap-4 items-stretch">
        <ServiceImage
          images={SERVICE_IMAGES.flight}
          alt="Flights"
          label="Flights"
          to="/flights"
          className="col-span-12 sm:col-span-6 md:col-span-4 h-[280px]"
        />
        <ServiceImage
          images={SERVICE_IMAGES.hotel}
          alt="Hotels"
          label="Hotels"
          to="/hotels"
          className="col-span-12 sm:col-span-6 md:col-span-4 h-[280px]"
        />
        <ServiceImage
          images={SERVICE_IMAGES.bus}
          alt="Bus"
          label="Bus"
          to="/bus"
          className="col-span-12 sm:col-span-12 md:col-span-4 h-[280px]"
        />
      </div>
    </section>
  );
}


export type BillingCycle = "monthly" | "yearly";

export interface PricingPlan {
  id: string;
  name: string;
  desc: string;
  monthly: number;
  yearly: number; // per month when billed yearly
  popular?: boolean;
  highlights: string[];
  advanced: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    desc: "A great solution for city people.",
    monthly: 69,
    yearly: 49,
    highlights: [
      "15 km per day",
      "Instant booking confirmation",
      "No hidden charges",
    ],
    advanced: ["Email support", "Pay-as-you-go upgrades"],
  },
  {
    id: "basic",
    name: "Basic",
    desc: "Perfect for regular bookings and short trips.",
    monthly: 99,
    yearly: 69,
    popular: true,
    highlights: [
      "25 km per day",
      "Instant booking confirmation",
      "Child seat available",
      "Priority pickup",
    ],
    advanced: ["Chat support", "Free cancellation up to 1h", "Ride credits"],
  },
  {
    id: "standard",
    name: "Standard",
    desc: "Best for frequent riders with added benefits.",
    monthly: 169,
    yearly: 119,
    highlights: [
      "50 km per day",
      "Instant booking confirmation",
      "Premium drivers",
      "Lounge access on flights",
    ],
    advanced: ["24/7 support", "Free reschedule", "Insurance included"],
  },
  {
    id: "premium",
    name: "Premium",
    desc: "Premium comfort with priority booking perks.",
    monthly: 269,
    yearly: 189,
    highlights: [
      "Unlimited km",
      "Concierge booking",
      "Hotel & flight upgrades",
      "Dedicated relationship manager",
    ],
    advanced: ["Phone concierge", "Priority claims", "Bring +1 free"],
  },
];

export function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <section className="mt-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <SectionEyebrow>Plans &amp; Pricing</SectionEyebrow>
          <h3 className="mt-6 text-3xl md:text-5xl font-light text-foreground/90 leading-tight">
            Pick the plan for your ride
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent font-medium">
              .
            </span>
          </h3>
          <p className="mt-3 max-w-xl text-sm text-foreground/55">
            Transparent pricing. Cancel any time. Upgrade or downgrade as your
            travel changes.
          </p>
        </div>

        <BillingToggle cycle={cycle} onChange={setCycle} />
      </div>

      <LayoutGroup>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} cycle={cycle} />
          ))}
        </div>
      </LayoutGroup>

      <TrustRow />
    </section>
  );
}

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Billing cycle"
      className="sticky top-4 z-10 inline-flex items-center self-start md:self-end rounded-full border border-foreground/10 bg-white/80 backdrop-blur-xl p-1 shadow-[0_8px_24px_rgba(60,60,90,0.08)]"
    >
      {(["monthly", "yearly"] as const).map((c) => {
        const active = cycle === c;
        return (
          <button
            key={c}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(c)}
            className={
              "relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors " +
              (active ? "text-white" : "text-foreground/65 hover:text-foreground")
            }
          >
            {active && (
              <motion.span
                layoutId="billing-pill"
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_4px_14px_rgba(99,102,241,0.45)]"
              />
            )}
            <span className="relative capitalize">{c}</span>
            {c === "yearly" && (
              <span className="relative ml-1 text-[10px] font-semibold">
                −30%
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PricingCard({ plan, cycle }: { plan: PricingPlan; cycle: BillingCycle }) {
  const [open, setOpen] = useState(false);
  const price = cycle === "monthly" ? plan.monthly : plan.yearly;
  const savings = useMemo(
    () => Math.round(((plan.monthly - plan.yearly) / plan.monthly) * 100),
    [plan],
  );

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={
        "relative rounded-[22px] p-5 flex flex-col bg-white " +
        (plan.popular
          ? "shadow-[0_18px_50px_-12px_rgba(99,102,241,0.35)] ring-1 ring-indigo-500/30"
          : "shadow-[0_8px_28px_rgba(60,60,90,0.08)] ring-1 ring-foreground/5 hover:ring-foreground/15")
      }
    >
      {plan.popular && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[22px] bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-purple-500/30 opacity-60 blur-md -z-10"
          />
          <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-md">
            <Sparkles className="h-3 w-3" /> Most Popular
          </span>
        </>
      )}

      {cycle === "yearly" && savings > 0 && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 right-4 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 ring-1 ring-emerald-200"
        >
          Save {savings}%
        </motion.span>
      )}

      <h4 className="text-base font-semibold text-foreground/90">{plan.name}</h4>
      <p className="mt-1 text-xs text-foreground/55 leading-relaxed min-h-[32px]">
        {plan.desc}
      </p>

      <div className="mt-4 flex items-baseline gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-4xl font-light text-foreground"
          >
            ₹{price}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-foreground/50">/mo</span>
      </div>
      <p className="mt-1 text-[10px] text-foreground/45">
        {cycle === "yearly"
          ? `Billed ₹${price * 12} yearly`
          : "Billed monthly"}
      </p>

      <button
        type="button"
        className={
          "group/btn relative mt-4 w-full rounded-full py-2.5 text-sm font-medium transition-all overflow-hidden " +
          (plan.popular
            ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-[0_8px_20px_-6px_rgba(99,102,241,0.6)] hover:shadow-[0_12px_28px_-6px_rgba(99,102,241,0.7)]"
            : "bg-white border border-foreground/15 text-foreground/85 hover:border-foreground/40 hover:bg-foreground/[0.03]")
        }
      >
        {plan.popular && (
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        )}
        <span className="relative">Choose {plan.name}</span>
      </button>

      <ul className="mt-5 space-y-2">
        {plan.highlights.map((h, i) => (
          <motion.li
            key={h}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-2 text-xs text-foreground/70"
          >
            <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/70">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span>{h}</span>
          </motion.li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-4 flex items-center justify-between text-[11px] font-medium text-foreground/60 hover:text-foreground transition-colors"
      >
        <span>Advanced benefits</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key="adv"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-2 space-y-1.5"
          >
            {plan.advanced.map((a) => (
              <li
                key={a}
                className="flex items-start gap-1.5 text-[11px] text-foreground/60"
              >
                <Check className="h-3 w-3 mt-0.5 text-indigo-500 shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TrustRow() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-foreground/55">
      <span className="inline-flex items-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        30-day money-back guarantee
      </span>
      <span>•</span>
      <span>No setup fees</span>
      <span>•</span>
      <span>Cancel anytime</span>
      <span>•</span>
      <span>Trusted by 2M+ riders</span>
    </div>
  );
}



const QR_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <rect width='100' height='100' fill='white'/>
      ${Array.from({ length: 100 })
        .map(() => {
          const x = Math.floor(Math.random() * 20) * 5;
          const y = Math.floor(Math.random() * 20) * 5;
          return `<rect x='${x}' y='${y}' width='5' height='5' fill='black'/>`;
        })
        .join("")}
      <rect x='0' y='0' width='25' height='25' fill='white' stroke='black' stroke-width='5'/>
      <rect x='75' y='0' width='25' height='25' fill='white' stroke='black' stroke-width='5'/>
      <rect x='0' y='75' width='25' height='25' fill='white' stroke='black' stroke-width='5'/>
      <rect x='8' y='8' width='9' height='9' fill='black'/>
      <rect x='83' y='8' width='9' height='9' fill='black'/>
      <rect x='8' y='83' width='9' height='9' fill='black'/>
    </svg>`,
  );

const QR_CARDS = [
  { title: "Download the app", subtitle: "Scan to download" },
  { title: "Download the Driver app", subtitle: "Scan to download" },
  { title: "Download the Bike pooling driver app", subtitle: "Scan to download" },
];

export function QrDownloadSection() {
  return (
    <section className="mt-20 mb-12">
      <SectionEyebrow>It&apos;s Easier in the app</SectionEyebrow>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {QR_CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-[20px] bg-white shadow-[0_8px_28px_rgba(60,60,90,0.08)] p-4 flex items-center gap-4"
          >
            <img
              src={QR_PLACEHOLDER}
              alt="QR code"
              loading="lazy"
              className="h-20 w-20 rounded-md"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-foreground/85">
                {card.title}
              </p>
              <p className="text-xs text-foreground/50 mt-1">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
