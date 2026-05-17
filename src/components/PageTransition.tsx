import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a page in a smooth fade + upward-slide entrance animation and
 * resets the scroll position whenever the route changes.
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  useScrollToTop();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
