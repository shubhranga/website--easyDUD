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

/* Map label strings to icons so each card has a matching icon */
const LABEL_ICONS: Record<string, LucideIcon> = {
  Taxi: CarTaxiFront,
  Bus: Bus,
  Flights: Plane,
  Flight: Plane,
  Auto: Car,
  Hotels: Hotel,
  Hotel: Hotel,
  Bike: Bike,
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
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={
        "group relative rounded-[20px] overflow-hidden shadow-[0_8px_28px_rgba(60,60,90,0.10)] bg-secondary cursor-pointer " +
        className
      }
    >
      {/* Skeleton loader */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary to-secondary/60" />
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
          className="absolute inset-0 h-full w-full object-cover will-change-transform transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </AnimatePresence>

      {/* Stronger gradient so label is always legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/0 transition-opacity duration-300 group-hover:from-black/85" />

      {overlay}

      {/* Always-visible label at the bottom */}
      {label && (
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          {/* Left: icon + label name */}
          <div className="flex items-center gap-1.5">
            {Icon && (
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2} />
              </span>
            )}
            <span className="text-white font-semibold text-sm drop-shadow-md tracking-wide">
              {label}
            </span>
          </div>

          {/* Right: "Go →" arrow, slides in on hover */}
          {to && (
            <motion.span
              initial={false}
              className="flex items-center justify-center h-7 w-7 rounded-full bg-white text-foreground opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-md"
            >
              <span className="text-xs font-bold">→</span>
            </motion.span>
          )}
        </div>
      )}

      {/* Subtle top-right dot indicator showing image count */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={
                "h-1 rounded-full transition-all duration-500 " +
                (i === index ? "w-4 bg-white" : "w-1 bg-white/50")
              }
            />
          ))}
        </div>
      )}

      {/* Preload next image */}
      {images.length > 1 && (
        <link
          rel="preload"
          as="image"
          href={images[(index + 1) % images.length]}
        />
      )}
    </motion.div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-[20px]"
      >
        {Inner}
      </Link>
    );
  }

  return Inner;
}
