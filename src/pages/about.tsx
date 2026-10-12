import {
  ArrowRight,
  BadgeDollarSign,
  Camera,
  CreditCard,
  Landmark,
  LineChart,
  Package,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

import { GlassCard, SectionContainer } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import {
  Bullets,
  Callout,
  ContentCard,
  H2,
  PageBody,
  PageHero,
  Prose,
} from "@/components/layout/page-shell";
import { SectionLink } from "@/components/layout/section-link";
import { SECTION_LINKS } from "@/lib/routes";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ data */

const CAPABILITIES = [
  {
    icon: Camera,
    title: "Smart capture",
    body: "Snap a receipt, invoice, waybill or transfer alert, or send a voice note or text in Pidgin or any local language, and Oga Plug logs it for you.",
  },
  {
    icon: Package,
    title: "Inventory management",
    body: "Real-time stock, batch and expiry tracking, multiple units of measure, low-stock alerts and stock transfers between branches.",
  },
  {
    icon: CreditCard,
    title: "Sales, POS and invoicing",
    body: "Record sales, send invoices on WhatsApp (including negotiable invoices), and keep a customer debt ledger.",
  },
  {
    icon: LineChart,
    title: "Financial intelligence",
    body: "Automatic profit and loss, cash flow tracking, tax estimates and loan-ready financial statements.",
  },
  {
    icon: Sparkles,
    title: "AI assistant",
    body: "Ask questions such as “wetin be my profit this month?” and get answers in your own language, plus demand forecasting and theft and fraud alerts.",
  },
  {
    icon: Users,
    title: "Supplier linking and marketplace",
    body: "Connect with your suppliers and buyers, share delivery records, and discover new trading partners.",
  },
];

const WHO_WE_SERVE = [
  "Market traders",
  "Pharmacies",
  "Clinics",
  "Bookshops",
  "Hardware and building materials dealers",
  "Farmers and cooperatives",
  "Wholesalers and distributors",
  "Microfinance institutions",
];

/* ------------------------------------------------------------------ page */

export function AboutPage() {
  return (
    <>
      <PageHero
        badge="About us"
        title="Built for how Nigerians actually do business"
        lede="Oga Plug is a WhatsApp-native inventory and business intelligence platform, built for everyone from a pharmacy in GRA to a tomato seller in Mile 3 Market."
        actions={
          <>
            <SectionLink
              to={SECTION_LINKS.cta}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-[1.03]"
            >
              Get started free
              <ArrowRight className="size-4" aria-hidden />
            </SectionLink>
            <SectionLink
              to={SECTION_LINKS.whatsapp}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/14"
            >
              Try the live demo
            </SectionLink>
          </>
        }
      />

      <PageBody>
        {/* ------------------------------------------------------ mission */}
        <Reveal>
          <ContentCard>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div>
                <H2>Our mission</H2>
                <Prose className="mt-4">
                  <p>
                    To give every business, whatever its size or industry, the same clear view of
                    its stock, sales, debts and profit that large companies take for granted: 
                    without forms, training or a new app to download.
                  </p>
                </Prose>
              </div>

              <div>
                <H2>The problem we solve</H2>
                <Prose className="mt-4">
                  <p>
                    Many businesses still run on paper. Receipts get lost or soaked, stockouts are
                    discovered only after sales are lost, staff theft goes unnoticed, and owners
                    have no financial history to show a bank or the tax authority.
                  </p>
                  <p className="font-semibold text-foreground">
                    Oga Plug replaces all of that with a simple chat.
                  </p>
                </Prose>
              </div>
            </div>
          </ContentCard>
        </Reveal>

        {/* ------------------------------------------------ what it does */}
        <div className="mt-14">
          <Reveal>
            <H2>What Oga Plug does</H2>
          </Reveal>

          <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="h-full">
                <GlassCard
                  intensity="card"
                  className="flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/40"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/12 text-primary-ink">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* ----------------------------------------------- who we serve */}
        <Reveal className="mt-14">
          <ContentCard>
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Who we serve</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {WHO_WE_SERVE.map((group) => (
                <li
                  key={group}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-foreground/80"
                >
                  {group}
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
              {[
                {
                  icon: Store,
                  title: "Low-cost Android",
                  body: "Runs on the phone already in your pocket.",
                },
                {
                  icon: ShieldCheck,
                  title: "Works offline",
                  body: "Records sync when the network comes back.",
                },
                {
                  icon: Landmark,
                  title: "USSD option",
                  body: "For feature phones without a browser.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary-ink">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </Reveal>

        {/* ----------------------------------------------------- promise */}
        <Reveal className="mt-10">
          <Callout icon={<BadgeDollarSign className="size-4" aria-hidden />} title="Our promise">
            Your business records belong to you. We build Oga Plug to be simple, affordable and
            trustworthy, so that more Nigerian businesses can grow, access credit and stay
            compliant.
          </Callout>
        </Reveal>

        <Reveal className="mt-10">
          <ContentCard>
            <H2>Where we are starting</H2>
            <Prose className="mt-4">
              <p>
                The MVP launches in Port Harcourt and Owerri, with two verticals: general trade and
                registered pharmacies. Those are the users with the clearest pain and the highest
                transaction frequency.
              </p>
            </Prose>
            <Bullets
              className="mt-5"
              items={[
                "General trade: FMCG shops, market stalls and provisions stores in Mile 3 Port Harcourt, Ariaria Aba and New Owerri.",
                "Pharmacy: registered pharmacies in GRA Port Harcourt and the commercial areas of Owerri, with batch and expiry control.",
                "Phase two: agriculture, bookshops, hardware, food vendors, clinics, wholesale distribution and microfinance banks.",
              ]}
            />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SectionLink
                to={SECTION_LINKS.pricing}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold",
                  "text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-[1.03]",
                )}
              >
                See pricing
                <ArrowRight className="size-4" aria-hidden />
              </SectionLink>
              <SectionLink
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/14"
              >
                Talk to us
              </SectionLink>
            </div>
          </ContentCard>
        </Reveal>
      </PageBody>

      {/* ------------------------------------------------------- closing */}
      <SectionContainer className="pb-8 pt-0">
        <Reveal>
          <ContentCard strong className="text-center">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl">
              Set up in two minutes, from the WhatsApp you already have
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              No download, no dashboard to learn, no credit card.
            </p>
            <div className="mt-6 flex justify-center">
              <SectionLink
                to={SECTION_LINKS.cta}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-transform duration-300 hover:scale-[1.03]"
              >
                Get started free
                <ArrowRight className="size-4" aria-hidden />
              </SectionLink>
            </div>
          </ContentCard>
        </Reveal>
      </SectionContainer>
    </>
  );
}

export default AboutPage;
