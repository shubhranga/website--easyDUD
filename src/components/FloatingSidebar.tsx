import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import {
  CarTaxiFront,
  Bus,
  Plane,
  Car,
  Hotel,
  Bike,
  type LucideIcon,
} from "lucide-react";

export type BookingCategory =
  | "taxi"
  | "bus"
  | "flight"
  | "auto"
  | "hotel"
  | "bike";

type Item = {
  id: BookingCategory;
  label: string;
  to: string;
  Icon: LucideIcon;
};

const items: Item[] = [
  { id: "taxi",   label: "Taxi",   to: "/taxi",         Icon: CarTaxiFront },
  { id: "bus",    label: "Bus",    to: "/bus",          Icon: Bus          },
  { id: "flight", label: "Flight", to: "/flights",      Icon: Plane        },
  { id: "auto",   label: "Auto",   to: "/auto",         Icon: Car          },
  { id: "hotel",  label: "Hotel",  to: "/hotels",       Icon: Hotel        },
  { id: "bike",   label: "Bike",   to: "/bike-pooling", Icon: Bike         },
];

interface FloatingSidebarProps {
  /** Optional override; otherwise derived from current route. Home (/) defaults to "bus". */
  active?: BookingCategory;
  onChange?: (id: BookingCategory) => void;
}

function deriveActive(pathname: string): BookingCategory {
  const match = items.find((i) => pathname.startsWith(i.to));
  return match?.id ?? "bus";
}

export function FloatingSidebar({ active: controlled, onChange }: FloatingSidebarProps) {
  const { pathname } = useLocation();
  const active = controlled ?? deriveActive(pathname);

  return (
    <motion.aside
      className="fixed left-3 top-1/2 z-30 hidden md:block"
      style={{ translateY: "-50%" }}
      // Entrance: slide in from the left
      initial={{ opacity: 0, x: -24 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 0.4, ease: "easeOut" },
        x: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        // idle float runs after entrance
        y: {
          delay: 0.4,
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
        transition: {
          type: "spring",
          stiffness: 280,
          damping: 18,
        },
      }}
    >
      <div
        className="flex flex-col items-center gap-1 rounded-3xl border border-white/40 bg-white/40 backdrop-blur-xl px-2 py-3 shadow-[0_20px_60px_-20px_rgba(60,60,90,0.25),inset_0_1px_0_rgba(255,255,255,0.6)]"
        role="navigation"
        aria-label="Travel categories"
      >
        {items.map(({ id, label, to, Icon }, index) => {
          const isActive = active === id;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.05 + index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={to}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onChange?.(id)}
                className="group relative flex flex-col items-center gap-0.5 px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
              >
                <motion.span
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="relative flex h-11 w-11 items-center justify-center rounded-2xl"
                >
                  {/* Active background pill — animates between items with layoutId */}
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/15 via-indigo-500/15 to-purple-500/15 ring-1 ring-indigo-500/30 shadow-[0_8px_24px_-8px_rgba(99,102,241,0.5)]"
                      transition={{ type: "spring", damping: 26, stiffness: 260 }}
                    />
                  )}

                  {/* Hover glow */}
                  <span className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10" />

                  <Icon
                    className={
                      "relative h-5 w-5 transition-colors duration-200 " +
                      (isActive
                        ? "text-indigo-600"
                        : "text-foreground/60 group-hover:text-foreground")
                    }
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </motion.span>

                <span
                  className={
                    "text-[10px] font-medium transition-colors duration-200 " +
                    (isActive ? "text-foreground" : "text-foreground/50")
                  }
                >
                  {label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.aside>
  );
}
