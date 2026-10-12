import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Globe,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { SectionLink } from "@/components/layout/section-link";
import {
  COMPANY_LINKS,
  LEGAL_LINKS,
  PRODUCT_LINKS,
  ROUTES,
  SECTION_LINKS,
  type PageLink,
} from "@/lib/routes";
import { CONTACT, SITE, WHATSAPP, mailto, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ parts */

/**
 * One column of footer links.
 *
 * Every row is at least 44px tall and the whole row is the target, not just the
 * word inside it. The footer sits directly above the thumb zone on a phone, and
 * a 20px-tall text link there is a coin toss to hit.
 */
function LinkColumn({
  title,
  icon,
  links,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  links: PageLink[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-primary">
        {icon}
        {title}
      </h3>
      <ul className="mt-2 space-y-0.5 text-sm text-white/65">
        {links.map((link) => (
          <li key={link.to + link.label}>
            <SectionLink
              to={link.to}
              className="-mx-2 flex min-h-11 items-center rounded-lg px-2 py-2 transition-colors hover:bg-white/5 hover:text-primary"
            >
              {link.label}
            </SectionLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

const CONTACT_ROWS = [
  {
    icon: MessageCircle,
    label: WHATSAPP.display,
    hint: "WhatsApp",
    href: waLink("Hi"),
    external: true,
  },
  {
    icon: Mail,
    label: CONTACT.general,
    hint: "Email",
    href: mailto(CONTACT.general),
    external: false,
  },
  {
    icon: Phone,
    label: SITE.supportHours,
    hint: "Support hours",
    href: null,
    external: false,
  },
  {
    icon: MapPin,
    label: SITE.regions,
    hint: "Launch markets",
    href: null,
    external: false,
  },
];

/* ----------------------------------------------------------------- footer */

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState<string | null>(null);

  /**
   * There is no mailing provider wired up, so the form validates the address and
   * says plainly that nothing was sent instead of pretending to subscribe.
   */
  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setNote("Enter an email address first.");
      return;
    }
    setNote("Newsletters are not connected yet: nothing was sent.");
    setEmail("");
  };

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(4,10,9,0.6),rgba(2,6,6,0.95))]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-0 size-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-brand-teal/15 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-6">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onInk />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {SITE.shortDescription}
            </p>

            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: Globe, label: "Website", href: ROUTES.home },
                { icon: MessageCircle, label: "WhatsApp", href: waLink("Hi") },
                { icon: ShieldCheck, label: "Privacy policy", href: ROUTES.privacy },
                { icon: Scale, label: "Terms of use", href: ROUTES.termsOfUse },
              ].map(({ icon: Icon, label, href }) =>
                href.startsWith("http") ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                ) : (
                  <SectionLink
                    key={label}
                    to={href}
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-4" aria-hidden />
                  </SectionLink>
                ),
              )}
            </div>
          </div>

          <LinkColumn
            className="lg:col-span-2"
            title="Product"
            icon={<MessageCircle className="size-4" aria-hidden />}
            links={PRODUCT_LINKS}
          />

          <LinkColumn
            className="lg:col-span-2"
            title="Company"
            icon={<Globe className="size-4" aria-hidden />}
            links={COMPANY_LINKS}
          />

          <LinkColumn
            className="lg:col-span-2"
            title="Legal"
            icon={<Scale className="size-4" aria-hidden />}
            links={LEGAL_LINKS}
          />

          <div className="lg:col-span-2">
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-primary">
              <Clock className="size-4" aria-hidden />
              Contact
            </h3>
            <ul className="mt-2 space-y-2.5 text-sm text-white/65">
              {CONTACT_ROWS.map(({ icon: Icon, label, hint, href, external }) => (
                <li key={hint} className="flex items-start gap-2.5">
                  <Icon className="mt-1 size-3.5 shrink-0" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-white/40">
                      {hint}
                    </span>
                    {href ? (
                      /*
                       * `min-h-9` on the link itself, not just the row: an
                       * email address set at 18px is a 18px-tall tap target,
                       * which is a coin toss with a thumb.
                       */
                      <a
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="-mx-1 inline-flex min-h-9 items-center break-all px-1 transition-colors hover:text-primary"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="inline-flex min-h-9 items-center break-words">{label}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <SectionLink
              to={ROUTES.contact}
              className="mt-2 inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-primary-ink transition-colors hover:text-primary"
            >
              All contact channels
              <ExternalLink className="size-3" aria-hidden />
            </SectionLink>
          </div>
        </div>

        {/* ------------------------------------------------------ newsletter */}
        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-[1fr_minmax(0,24rem)] sm:items-center">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-primary">
              <Send className="size-4" aria-hidden />
              Keep in touch
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
              Product updates and new verticals, at most once a month.
            </p>
          </div>

          <form onSubmit={subscribe} className="w-full">
            {/*
              `min-w-0` on the field and `shrink-0` on the button: without them
              the flex row refuses to shrink below the input's intrinsic width
              and the button is pushed out of the rounded frame on a narrow
              screen.
            */}
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-4 pr-1.5 backdrop-blur-xl">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
            {note ? (
              <p aria-live="polite" className="mt-2 text-[11px] text-white/50">
                {note}
              </p>
            ) : null}
          </form>
        </div>

        {/* --------------------------------------------------------- sitemap */}
        <nav
          aria-label="Footer"
          className="mt-10 border-t border-white/10 pt-4"
        >
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-sm">
            {[
              { to: ROUTES.about, label: "About us" },
              { to: ROUTES.contact, label: "Contact us" },
              { to: ROUTES.privacy, label: "Privacy policy" },
              { to: ROUTES.termsOfUse, label: "Terms of use" },
              { to: ROUTES.termsAndConditions, label: "Terms & conditions" },
              { to: SECTION_LINKS.top, label: "Back to top" },
            ].map((link) => (
              <li key={link.to}>
                <SectionLink
                  to={link.to}
                  className="flex min-h-11 items-center rounded-lg px-2.5 py-2 text-white/60 transition-colors hover:bg-white/5 hover:text-primary"
                >
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.company}. All rights reserved.
            <span className="mt-1 block sm:mt-0 sm:ml-2 sm:inline">
              Registered in Rivers State, Nigeria.
            </span>
          </p>
          <p className="inline-flex flex-wrap items-center gap-1.5">
            Made with
            <Heart className="size-3.5 fill-brand-ember text-brand-ember" aria-label="love" />
            in Africa
            <span className={cn("hidden sm:inline")}>· Prices in Nigerian naira</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
