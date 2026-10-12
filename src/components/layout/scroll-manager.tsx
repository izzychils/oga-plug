import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Owns scrolling for every route change.
 *
 * Without this the browser keeps the previous scroll offset when a new route
 * mounts, so following "Pricing" from halfway down a legal page dropped the
 * visitor into the middle of the home page. Hash navigation is handled here too,
 * because the sections are mounted *after* the router commits: a plain browser
 * anchor jump resolves before the target exists and lands at the top of the
 * document instead.
 *
 * `scroll-margin-top` on the targets (set in globals.css) is what keeps the
 * sticky glass header from covering the heading it just scrolled to.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Honour a hash only once the target is in the document.
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, behavior: "auto" });
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default ScrollManager;
