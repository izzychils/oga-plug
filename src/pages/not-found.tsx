import { ArrowRight, Compass, Home, MessageCircle } from "lucide-react";

import { ContentCard, PageBody, PageHero } from "@/components/layout/page-shell";
import { SectionLink } from "@/components/layout/section-link";
import { COMPANY_LINKS, LEGAL_LINKS, ROUTES, SECTION_LINKS } from "@/lib/routes";
import { waLink } from "@/lib/site";

/**
 * A dead end that is still useful: the routes people most often want, plus the
 * WhatsApp door, which is the one the product is actually built around.
 */
export function NotFoundPage() {
  return (
    <>
      <PageHero
        narrow
        badge={
          <>
            <Compass className="size-3.5" aria-hidden />
            404
          </>
        }
        title="That page has moved or never existed"
        lede="The link may be old, or the address may have a typo in it. Here is the way back."
        actions={
          <>
            <SectionLink
              to={ROUTES.home}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-[1.03]"
            >
              <Home className="size-4" aria-hidden />
              Back to the home page
            </SectionLink>
            <a
              href={waLink("Hi, I think a link on your site is broken")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/14"
            >
              <MessageCircle className="size-4" aria-hidden />
              Tell us on WhatsApp
            </a>
          </>
        }
      />

      <PageBody narrow>
        <ContentCard>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Explore
              </p>
              <ul className="mt-1 text-sm">
                {[
                  { to: SECTION_LINKS.features, label: "Features" },
                  { to: SECTION_LINKS.howItWorks, label: "How it works" },
                  { to: SECTION_LINKS.pricing, label: "Pricing" },
                  ...COMPANY_LINKS.slice(0, 2),
                ].map((link) => (
                  <li key={link.to}>
                    <SectionLink
                      to={link.to}
                      className="-mx-2 flex min-h-9 items-center rounded-lg px-2 text-foreground/75 transition-colors hover:bg-white/5 hover:text-primary-ink"
                    >
                      {link.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Legal
              </p>
              <ul className="mt-1 text-sm">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.to}>
                    <SectionLink
                      to={link.to}
                      className="-mx-2 flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-foreground/75 transition-colors hover:bg-white/5 hover:text-primary-ink"
                    >
                      {link.label}
                      <ArrowRight className="size-3.5 opacity-50" aria-hidden />
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentCard>
      </PageBody>
    </>
  );
}

export default NotFoundPage;
