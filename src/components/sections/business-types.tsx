import { ArrowRight, Check, Clock, MapPin, Pill, Store, TrendingUp } from "lucide-react";

import { GlassCard, SectionContainer, SectionHeading } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const PRIMARY_BUSINESSES = [
  {
    icon: Store,
    name: "General trade",
    color: "primary" as const,
    description: "Fast-moving consumer goods, market stalls and provision shops",
    features: [
      "Voice note sales in Pidgin",
      "Receipt scanning for purchases",
      "Customer debt tracking",
      "Daily profit summaries",
    ],
    location: "Mile 3 Port Harcourt, Ariaria Aba, New Owerri",
    revenue: "₦500K to ₦5M monthly",
  },
  {
    icon: Pill,
    name: "Pharmacy",
    color: "ember" as const,
    description: "Registered pharmacies with 500 to 2,000 product lines",
    features: [
      "Batch & expiry date tracking",
      "Supplier invoice OCR (200+ items)",
      "NAFDAC & PCN compliance",
      "Near-expiry WhatsApp alerts",
    ],
    location: "GRA Port Harcourt, commercial areas Owerri",
    revenue: "₦1M to ₦10M monthly",
  },
];

const PHASE_TWO = [
  "Agriculture: produce sellers, farm cooperatives",
  "Bookshops: termly supply to schools",
  "Hardware stores: cement, building materials",
  "Restaurants & food vendors",
  "Fashion designers & textile merchants",
  "Healthcare clinics",
  "Wholesale distribution",
  "Microfinance banks",
];

const ACCENT = {
  primary: "border-primary/30 bg-primary/12 text-primary-ink",
  ember: "border-brand-ember/30 bg-brand-ember/12 text-brand-ember",
} as const;

export function BusinessTypes() {
  return (
    <section id="industries" aria-label="Industries">
      <SectionContainer>
        <Reveal>
          <SectionHeading
            badge="MVP target users"
            title="Built for two businesses first"
            subtitle="The MVP launches in Port Harcourt and Owerri, targeting the users with the clearest pain and the highest transaction frequency."
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 lg:grid-cols-2">
          {PRIMARY_BUSINESSES.map(
            ({ icon: Icon, name, description, features, location, revenue, color }) => (
              <StaggerItem key={name} className="h-full">
                <GlassCard
                  intensity="card"
                  className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/40"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "flex size-14 shrink-0 items-center justify-center rounded-2xl border",
                        ACCENT[color],
                      )}
                    >
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-extrabold tracking-tight">{name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>

                  <dl className="mt-6 grid gap-3 border-y border-white/10 py-5 sm:grid-cols-2">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden />
                      <div className="min-w-0">
                        <dt className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          Location
                        </dt>
                        <dd className="text-sm text-foreground/85">{location}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <TrendingUp className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden />
                      <div className="min-w-0">
                        <dt className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          Typical revenue
                        </dt>
                        <dd className="text-sm text-foreground/85">{revenue}</dd>
                      </div>
                    </div>
                  </dl>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#pricing"
                    className="mt-4 -mx-2 inline-flex min-h-11 items-center gap-2 px-2 text-sm font-bold text-primary-ink transition-colors hover:text-primary"
                  >
                    See pricing
                    <ArrowRight className="size-4" aria-hidden />
                  </a>
                </GlassCard>
              </StaggerItem>
            ),
          )}
        </StaggerGroup>

        {/* -------------------------------------------------------- roadmap */}
        <Reveal delay={0.1} className="mt-8">
          <GlassCard intensity="card" className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/35 bg-brand-teal/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-teal">
                <Clock className="size-3.5" aria-hidden />
                Phase 2: post-MVP
              </span>
              <h3 className="text-xl font-extrabold tracking-tight">
                More industries on the roadmap
              </h3>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              After validating the core product with general trade and pharmacy users, we expand to:
            </p>

            {/*
              A snap rail on small screens, a plain wrap grid from `sm` up. The
              rail keeps the list from looking stretched when it is long and the
              viewport is narrow.
            */}
            <ul className="no-scrollbar mt-5 flex snap-rail gap-2.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
              {PHASE_TWO.map((industry) => (
                <li
                  key={industry}
                  className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/35 hover:text-primary-ink"
                >
                  {industry}
                </li>
              ))}
            </ul>

            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              <strong className="font-bold text-foreground">Why wait?</strong> Each industry has
              unique workflows. The MVP proves the core system works before adding industry-specific
              complexity.
            </p>
          </GlassCard>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export default BusinessTypes;
