import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  CreditCard,
  Handshake,
  Mail,
  MessageCircle,
  Scale,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import { GlassCard } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Callout, ContentCard, H2, PageBody, PageHero, Prose } from "@/components/layout/page-shell";
import { CONTACT, SITE, WHATSAPP, mailto, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ data */

const CHANNELS = [
  {
    icon: MessageCircle,
    need: "General support",
    action: "Chat on WhatsApp",
    detail: WHATSAPP.display,
    href: waLink("Hi"),
    external: true,
    primary: true,
    hint: "Fastest route to an answer.",
  },
  {
    icon: Mail,
    need: "General support",
    action: "Email support",
    detail: CONTACT.support,
    href: mailto(CONTACT.support),
    primary: false,
    hint: "For anything that needs a paper trail.",
  },
  {
    icon: CreditCard,
    need: "Billing and subscriptions",
    action: "Email billing",
    detail: CONTACT.billing,
    href: mailto(CONTACT.billing, "Billing question"),
    primary: false,
  },
  {
    icon: ShieldCheck,
    need: "Privacy and data requests",
    action: "Email privacy",
    detail: CONTACT.privacy,
    href: mailto(CONTACT.privacy, "Data Request"),
    primary: false,
    hint: "Subject line: “Data Request”.",
  },
  {
    icon: Handshake,
    need: "Partnerships, MFBs and distributors",
    action: "Email partnerships",
    detail: CONTACT.partnerships,
    href: mailto(CONTACT.partnerships, "Partnership enquiry"),
    primary: false,
  },
  {
    icon: Scale,
    need: "Legal notices",
    action: "Email legal",
    detail: CONTACT.legal,
    href: mailto(CONTACT.legal, "Legal notice"),
    primary: false,
  },
];

const INCLUDE = [
  "The phone number registered to your Oga Plug account",
  "Your business name",
  "A short description of the issue, and what you expected instead",
];

const NEVER = [
  "Your password or a one-time code",
  "Your card number, CVV or bank PIN",
  "A photo of your debit card or ID",
];

/* ------------------------------------------------------------- copy chip */

/**
 * A copy control beside each address.
 *
 * On a phone, tapping a long email address is a fiddly way to get a reply: the
 * address is also the thing people retype from memory and get wrong. Copying it
 * is one tap, and the button confirms with words rather than only a colour, so
 * it still makes sense to someone who cannot see the tick.
 */
function CopyAddress({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the address is already visible to copy by hand.
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${value}`}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary-ink"
    >
      {copied ? (
        <>
          <Check className="size-3" aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3" aria-hidden />
          Copy
        </>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ page */

export function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact us"
        title="We are here to help you run your business better"
        lede="Reach us through any channel below and we will reply as quickly as we can. WhatsApp is usually the fastest."
        meta={
          <>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="size-3.5" aria-hidden />
              {SITE.supportHours}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="size-3.5" aria-hidden />
              {SITE.registered}
            </span>
          </>
        }
        actions={
          <a
            href={waLink("Hi, I need help with Oga Plug")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-transform duration-300 hover:scale-[1.03] sm:text-base"
          >
            <MessageCircle className="size-5" aria-hidden />
            Start on WhatsApp
            <ArrowRight className="size-4" aria-hidden />
          </a>
        }
      />

      <PageBody>
        <div id="data-request" className="scroll-mt-28">
          <Reveal>
            <H2>Pick the right desk</H2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Each need has its own inbox, so your message reaches someone who can act on it.
            </p>
          </Reveal>

          <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map(({ icon: Icon, need, action, detail, href, external, primary, hint }) => (
              <StaggerItem key={detail + action} className="h-full">
                <GlassCard
                  intensity="card"
                  className={cn(
                    "flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1",
                    primary ? "border-primary/40 hover:border-primary/60" : "hover:border-white/40",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-2xl border",
                      primary
                        ? "border-primary/40 bg-primary/15 text-primary-ink"
                        : "border-white/15 bg-white/5 text-foreground/80",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>

                  <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {need}
                  </p>

                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="-mx-1 mt-1.5 inline-flex min-h-9 items-center px-1 text-sm font-bold text-foreground transition-colors hover:text-primary-ink"
                  >
                    {action}
                  </a>

                  <p className="mt-1 break-all text-xs text-muted-foreground">{detail}</p>

                  {hint ? (
                    <p className="mt-2 text-[11px] text-muted-foreground/80">{hint}</p>
                  ) : null}

                  <div className="mt-auto pt-4">
                    <CopyAddress value={detail} />
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* ------------------------------------------ what to include */}
        <Reveal className="mt-12">
          <ContentCard>
            <H2>For faster help</H2>
            <Prose className="mt-3">
              <p>Send us these three things and we can usually solve it in one reply:</p>
            </Prose>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {INCLUDE.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/8 p-3.5 text-sm"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Callout
                icon={<TriangleAlert className="size-4" aria-hidden />}
                title="Please never send us these"
              >
                We will never ask for them, and anyone who does is not us.
                <ul className="mt-3 space-y-2">
                  {NEVER.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-ember"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Callout>
            </div>
          </ContentCard>
        </Reveal>

        {/* -------------------------------------------------- the company */}
        <Reveal className="mt-8">
          <GlassCard intensity="card" className="p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Company
                </p>
                <p className="mt-2 text-sm text-foreground/85">{SITE.registered}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Trading as {SITE.name} · {SITE.domain}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Serving
                </p>
                <p className="mt-2 text-sm text-foreground/85">{SITE.regions}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Support {SITE.supportHours.toLowerCase()}
                </p>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </PageBody>
    </>
  );
}

export default ContactPage;
