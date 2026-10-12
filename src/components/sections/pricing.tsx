import { ArrowRight, Check, Crown, MessageCircle, X } from "lucide-react";

import { GlassCard, SectionContainer, SectionHeading } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { glassMorphism } from "@/lib/glass-morphism";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  target: string;
  popular: boolean;
  features: Array<{ text: string; included: boolean }>;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "₦0",
    period: "forever",
    description: "Try before you commit: 30-day trial with limits",
    target: "Trial users",
    popular: false,
    features: [
      { text: "50 product limit", included: true },
      { text: "100 transactions / month", included: true },
      { text: "Basic debt tracking", included: true },
      { text: "WhatsApp capture", included: true },
      { text: "No reports", included: false },
      { text: "No staff accounts", included: false },
      { text: "No daily summaries", included: false },
      { text: "No expiry tracking", included: false },
    ],
  },
  {
    name: "Trader",
    price: "₦3,500",
    period: "/month",
    description: "For single-location shops and market traders",
    target: "General trade owners",
    popular: true,
    features: [
      { text: "Unlimited products", included: true },
      { text: "Unlimited transactions", included: true },
      { text: "Full debt ledger + auto-reminders", included: true },
      { text: "WhatsApp + web dashboard", included: true },
      { text: "Daily sales summary", included: true },
      { text: "1 staff account", included: true },
      { text: "Monthly report", included: true },
      { text: "Expiry tracking", included: false },
    ],
  },
  {
    name: "Business",
    price: "₦8,500",
    period: "/month",
    description: "For growing businesses with staff and multiple locations",
    target: "Multi-location businesses",
    popular: false,
    features: [
      { text: "Everything in Trader", included: true },
      { text: "5 staff accounts", included: true },
      { text: "Multi-location view", included: true },
      { text: "Cash flow summary", included: true },
      { text: "Export to Excel & PDF", included: true },
      { text: "Supplier directory", included: true },
      { text: "Priority support", included: true },
      { text: "Expiry tracking", included: false },
    ],
  },
  {
    name: "Pharmacy",
    price: "₦15,000",
    period: "/month",
    description: "Specialised plan for registered pharmacies",
    target: "Registered pharmacies",
    popular: false,
    features: [
      { text: "Everything in Business", included: true },
      { text: "Batch & expiry tracking", included: true },
      { text: "NAFDAC compliance fields", included: true },
      { text: "PCN compliance log", included: true },
      { text: "Near-expiry WhatsApp alerts", included: true },
      { text: "Shift-based sales tracking", included: true },
      { text: "Supplier invoice OCR (200+ items)", included: true },
      { text: "Dedicated pharmacy support", included: true },
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing">
      <SectionContainer>
        <Reveal>
          <SectionHeading
            badge="Pricing"
            title="Honest, transparent pricing"
            subtitle="Start with a free trial. Upgrade when you see the value: one recovered debt pays for the year."
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => (
            <StaggerItem key={plan.name} className="h-full">
              <GlassCard
                intensity={plan.popular ? "cardStrong" : "card"}
                className={cn(
                  "relative flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1",
                  plan.popular
                    ? "border-primary/45 ring-1 ring-primary/30 hover:border-primary/60"
                    : "hover:border-white/40",
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30">
                    <Crown className="size-3" aria-hidden />
                    Most popular
                  </span>
                ) : null}

                <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
                  {plan.name}
                </h3>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </p>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-primary-ink">
                  {plan.target}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={cn(
                        "flex items-start gap-2.5 text-sm",
                        !feature.included && "text-muted-foreground/70",
                      )}
                    >
                      {feature.included ? (
                        <Check className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden />
                      ) : (
                        <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" aria-hidden />
                      )}
                      <span className={feature.included ? "text-foreground/80" : undefined}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className={cn(
                    "mt-6 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-transform duration-300 hover:scale-[1.02]",
                    plan.popular
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : cn(glassMorphism.tab, "text-foreground"),
                  )}
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Get started
                  <ArrowRight className="size-3.5" aria-hidden />
                </a>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-center text-xs text-muted-foreground">
            Prices in Nigerian naira. Cancel any time from WhatsApp: reply{" "}
            <span className="font-semibold text-foreground/80">STOP</span> and billing ends at the
            close of the cycle.
          </p>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export default Pricing;
