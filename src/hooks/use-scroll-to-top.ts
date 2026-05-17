import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Scrolls the window to the top whenever the pathname changes.
 * Mount this once inside any layout or root component.
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use instant scroll so it doesn't fight the page-enter animation
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
}
