import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useRotatingIndex } from "@/hooks/use-rotating-index";
import { useState, type ReactNode } from "react";
import {
  CarTaxiFront,
  Bus,
  Plane,
  Car,
  Hotel,
  Bike,
  type LucideIcon,
} from "lucide-react";

const LABEL_ICONS: Record<string, LucideIcon> = {
  Taxi: CarTaxiFront,
  Bus: Bus,
  Flights: Plane,
  Flight: Plane,
  Auto: Car,
  Hotels: Hotel,
  Hotel: Hotel,
  Bike: Bike,
  "Bike pooling": Bike,
  "Bike Pooling": Bike,
};

interface ServiceImageProps {
  images: string[];
  alt: string;
  label?: string;
  to?: string;
  className?: string;
  intervalMs?: number;
  overlay?: ReactNode;
  eager?: boolean;
}

export function ServiceImage({
  images,
  alt,
  label,
  to,
  className = "",
  intervalMs = 4000,
  overlay,
  eager = false,
}: ServiceImageProps) {
  const index = useRotatingIndex(images.length, intervalMs);
  const [loaded, setLoaded] = useState(false);

  const Icon = label ? LABEL_ICONS[label] : undefined;

  const Inner = (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={
        "group relative rounded-[20px] overflow-hidden cursor-pointer " +
        className
      }
      style={{
        boxShadow:
          "0 8px 28px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)",
        background: "#0d1b2e",
      }}
    >
      {/* Skeleton */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, #112240 0%, #0a1628 100%)",
          }}
        />
      )}

      {/* Rotating image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Gradient overlay — deepens on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.25) 50%, rgba(10,22,40,0.05) 100%)",
        }}
      />

      {/* Amber glow edge on hover */}
      <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1.5px rgba(251,191,36,0.35)",
        }}
      />

      {overlay}

      {/* Label */}
      {label && (
        <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-end justify-between">
          <div className="flex items-center gap-2">
            {Icon && (
              <span
                className="flex items-center justify-center h-7 w-7 rounded-full backdrop-blur-sm"
                style={{
                  background: "rgba(251,191,36,0.18)",
                  border: "1px solid rgba(251,191,36,0.35)",
                }}
              >
                <Icon className="h-3.5 w-3.5 text-amber-300" strokeWidth={2} />
              </span>
            )}
            <span className="text-white font-semibold text-sm drop-shadow-md tracking-wide">
              {label}
            </span>
          </div>
          {to && (
            <motion.span
              initial={false}
              className="flex items-center justify-center h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-md text-xs font-bold"
              style={{
                background: "#fbbf24",
                color: "#0d1b2e",
              }}
            >
              →
            </motion.span>
          )}
        </div>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={
                "h-1 rounded-full transition-all duration-500 " +
                (i === index ? "w-4 bg-amber-400" : "w-1 bg-white/30")
              }
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  if (to) {
    return (
      <Link
        to={to}
        style={{ display: "block" }}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 rounded-[20px]"
      >
        {Inner}
      </Link>
    );
  }

  return Inner;
}
