import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";

import { GlassCard } from "@/components/ui";
import { BrandAvatar } from "@/components/brand/logo";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The floating chat button.
 *
 * Hidden until the visitor has moved past the hero, so it never competes with
 * the hero's own call to action. The panel it opens is a sibling of the button,
 * not a child, for the same reason the header's mobile menu is: a parent with
 * `backdrop-filter` traps its children in its own blur.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-7 sm:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="w-[17.5rem]"
          >
            {/*
              `overlay-panel` rather than the translucent `cardStrong`: this
              panel opens on top of whatever section the visitor has scrolled to,
              and at 40% the body copy behind it stayed readable through the chat.
            */}
            <GlassCard className={cn("overlay-panel overflow-hidden rounded-2xl p-0")}>
              <div className="flex items-center gap-3 border-b border-white/10 bg-black/30 px-3.5 py-3">
                <BrandAvatar size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">Oga Plug</p>
                  <p className="truncate text-[11px] text-primary-ink">Typically replies instantly</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat panel"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <div className="p-3.5">
                <p className="rounded-2xl rounded-tl-none bg-white/10 px-3.5 py-2.5 text-sm leading-relaxed text-foreground/90">
                  Hi there! How can we help your business today?
                </p>

                <a
                  href={waLink("Hi")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Start chat
                  <ArrowRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </GlassCard>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close WhatsApp panel" : "Chat on WhatsApp"}
        aria-expanded={open}
        className={cn(
          "relative flex size-14 items-center justify-center rounded-full border border-white/25 bg-primary text-primary-foreground shadow-2xl shadow-primary/30 transition-transform duration-300 hover:scale-105",
          !open && "animate-pulse-ring",
        )}
      >
        {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
      </button>
    </div>
  );
}

export default WhatsAppFab;
