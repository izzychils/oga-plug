import { useEffect, useState } from "react";
import { ArrowRight, Menu as MenuIcon, MessageCircle, X } from "lucide-react";

import { GlassCard } from "@/components/ui";
import { Logo } from "@/components/brand/logo";
import { HeaderProductMenu } from "@/components/layout/nav-mega";
import { SectionLink } from "@/components/layout/section-link";
import { ROUTES, SECTION_LINKS } from "@/lib/routes";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------- header */

/**
 * The header's own link row.
 *
 * Deliberately three items. The mega-menu already carries Product and
 * Industries, and the row used to repeat itself with a Stories link pointing at
 * a section the page scrolls past anyway, plus an About link that duplicated
 * the footer's. Three centred links plus the two menu triggers is the whole
 * primary navigation.
 */
const NAV_LINKS = [
  { to: SECTION_LINKS.howItWorks, label: "How it works" },
  { to: SECTION_LINKS.whatsapp, label: "WhatsApp" },
  { to: SECTION_LINKS.pricing, label: "Pricing" },
];

/** Where the mega-menu is dropped into the row. */
const MEGA_MENU_INDEX = 0;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /*
   * Navigating closes the panel. It is done on the click rather than in an
   * effect watching the location: setting state from an effect body schedules a
   * second render pass on every navigation, for a value that is already known
   * at the moment the link is used.
   */
  const closeMenu = () => setMenuOpen(false);

  /**
   * The glass gets denser once the page has moved, so the header stays legible
   * over the hero's dark pattern and the lighter sections further down.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the panel.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /*
   * The panel is absolutely positioned, so it does not push the document and
   * cannot trigger a scroll event when it opens. Locking the body while it is
   * open is what keeps the page behind it from scrolling under a thumb drag.
   */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full">
      <GlassCard
        intensity="cardStrong"
        className={cn(
          "flex w-full flex-col rounded-none border-x-0 border-t-0 py-3 transition-colors duration-300",
          scrolled && "border-b-white/20 dark:border-b-white/15",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 sm:px-6 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
          <SectionLink to={ROUTES.home} aria-label="Oga Plug home" className="shrink-0">
            {/* The wordmark needs room; the tile alone carries the brand below `sm`. */}
            <Logo showText={false} className="sm:hidden" />
            <Logo className="hidden sm:flex" />
          </SectionLink>

          {/*
            Centred between the brand and the actions. A three-column grid does
            this properly: the middle column hugs its content and sits mid-page
            whatever the logo and buttons measure, which `flex-1` plus a margin
            cannot guarantee.
          */}
          {/*
            `xl:justify-self-center` pins the row to the middle of the grid's
            centre column instead of leaving it wherever the column starts, which
            is what made it look off-centre once the row was short enough for the
            offset to be visible.
          */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 xl:flex xl:justify-self-center"
          >
            {NAV_LINKS.map((link, index) => (
              <span key={link.to} className="flex items-center">
                {index === MEGA_MENU_INDEX ? <HeaderProductMenu /> : null}
                <SectionLink
                  to={link.to}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-foreground/75 transition-colors hover:bg-white/70 hover:text-foreground dark:hover:bg-white/10"
                >
                  {link.label}
                </SectionLink>
              </span>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0 xl:justify-end">
            <SectionLink
              to={ROUTES.signIn}
              className="hidden items-center rounded-full px-3.5 py-2 text-sm font-semibold text-foreground/75 transition-colors hover:bg-white/10 hover:text-foreground sm:inline-flex"
            >
              Sign in
            </SectionLink>

            <SectionLink
              to={SECTION_LINKS.cta}
              className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Get started free
              <ArrowRight className="size-3.5" aria-hidden />
            </SectionLink>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-xl transition-colors hover:bg-white/20 xl:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>
      </GlassCard>

      {/*
        The panel is a SIBLING of the glass card, never a child. The card applies
        `backdrop-filter`, which makes it both a containing block and a backdrop
        root: nested inside it the panel was trapped under the navbar's own
        glass, so it read as sitting behind the navbar and its blur had nothing
        behind it to sample. Out here its backdrop is the page, so the frosted
        blur is real and the panel paints above the card. It stays out of flow,
        so opening it never changes the sticky header's height.

        `overlay-sheet` rather than a translucent wash for the same reason the
        mega-menu uses `overlay-panel`: this sits on top of the hero, and at 55%
        black the headline behind it was legible through the menu.
      */}
      {menuOpen ? (
        <>
          {/*
            A tap-anywhere backdrop. It sits under the panel and over the page,
            which is what a phone user expects from a menu that slides over the
            content.
          */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-0 z-10 h-dvh w-full cursor-default bg-black/40 xl:hidden"
          />

          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full z-20 mx-auto w-full px-4 pb-3 xl:hidden"
          >
            <div className="overlay-sheet ml-auto grid w-full max-w-sm gap-1 rounded-2xl p-2 text-foreground sm:w-2/3">
              {NAV_LINKS.map((link) => (
                <SectionLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className="flex min-h-11 w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  {link.label}
                  <ArrowRight className="size-3.5 opacity-40" aria-hidden />
                </SectionLink>
              ))}

              {/* The company pages, so they are one tap from the top of any page. */}
              <SectionLink
                to={ROUTES.contact}
                onClick={closeMenu}
                className="flex min-h-11 w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-colors hover:bg-white/10"
              >
                Contact us
                <ArrowRight className="size-3.5 opacity-40" aria-hidden />
              </SectionLink>

              {/*
                The account screens. One row, two columns: two stacked rows
                pushed the WhatsApp actions off the bottom of a 640px phone
                viewport, and the panel cannot scroll.
              */}
              <div className="mt-1 grid grid-cols-2 gap-1">
                <SectionLink
                  to={ROUTES.signIn}
                  onClick={closeMenu}
                  className="flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
                >
                  Sign in
                </SectionLink>
                <SectionLink
                  to={ROUTES.signUp}
                  onClick={closeMenu}
                  className="flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
                >
                  Create account
                </SectionLink>
              </div>

              <div className="my-1 h-px bg-white/10" />

              <SectionLink
                to={SECTION_LINKS.cta}
                onClick={closeMenu}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-bold text-primary-foreground"
              >
                Get started free
                <ArrowRight className="size-3.5" aria-hidden />
              </SectionLink>

              <a
                href={waLink("Hi")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm font-semibold"
              >
                <MessageCircle className="size-4" aria-hidden />
                Chat on WhatsApp
              </a>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}

export default SiteHeader;
