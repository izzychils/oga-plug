import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhatsAppDemo } from "@/components/chat/whatsapp-demo";
import { BusinessTypes } from "@/components/sections/business-types";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Reveal } from "@/components/motion/reveal";
import { SectionLink } from "@/components/layout/section-link";
import { ROUTES } from "@/lib/routes";

/**
 * The marketing page.
 *
 * The sections here use plain `#anchor` links, which is correct: this is the
 * only route they are mounted on, so an anchor always resolves on the page it
 * belongs to. The shared chrome (header, mega-menu and footer) is what has to
 * be route-aware, and it is.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <WhatsAppDemo />
      <BusinessTypes />
      <Pricing />
      <Testimonials />
      <CTA />

      {/*
        A small signpost between the conversion panel and the footer, so the
        company pages are reachable by reading rather than only through the
        footer's sitemap.
      */}
      <Reveal className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-5 pb-6 text-center sm:px-6">
        <p className="text-sm text-muted-foreground">Want the longer version first?</p>
        {/*
          Two chips rather than two links inside that sentence: a link mid-
          sentence is an 18px-tall tap target, and this is the only route to the
          company pages from the bottom of the home page.
        */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { to: ROUTES.about, label: "Read about us" },
            { to: ROUTES.privacy, label: "Privacy policy" },
            { to: ROUTES.contact, label: "Contact us" },
          ].map((link) => (
            <SectionLink
              key={link.to}
              to={link.to}
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-foreground/85 transition-colors hover:border-primary/35 hover:text-primary-ink"
            >
              {link.label}
            </SectionLink>
          ))}
        </div>
      </Reveal>
    </>
  );
}

export default HomePage;
