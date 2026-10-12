import { ArrowRight, Camera, Check, Layers, Package, Users } from "lucide-react";

import { GlassCard, SectionContainer, SectionHeading } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { glassMorphism } from "@/lib/glass-morphism";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Camera,
    title: "Smart capture engine",
    description:
      "Send a voice note, a photo of a receipt, or a plain text message. Oga Plug reads it, extracts the data, asks you to confirm, then logs everything. Handwritten receipts, waybills and bank transfer screenshots all work.",
    capabilities: [
      "Voice notes in Pidgin or English",
      "Receipt photo scanning (OCR)",
      "Bank transfer alert reading",
      "Confirmation before every entry",
    ],
    accent: "primary" as const,
  },
  {
    icon: Package,
    title: "Inventory & stock management",
    description:
      "The web dashboard shows current stock, low-stock alerts and movement history. WhatsApp sends the daily low-stock summary. Pharmacy users get expiry date tracking on every drug.",
    capabilities: [
      "Real-time stock levels",
      "Low stock WhatsApp alerts",
      "Stock movement history",
      "Expiry tracking for pharmacy",
    ],
    accent: "ember" as const,
  },
  {
    icon: Users,
    title: "Customer debt ledger",
    description:
      "Log a credit sale by voice. Check any customer's balance instantly. Automated WhatsApp reminders go out on the due date, and every overdue balance is sorted by amount and days late.",
    capabilities: [
      "Log credit sales in seconds",
      "Automatic WhatsApp reminders",
      "See who owes you, and how much",
      "Payment matching and reconciliation",
    ],
    accent: "teal" as const,
  },
];

const ACCENT = {
  primary: "border-primary/30 bg-primary/12 text-primary-ink",
  ember: "border-brand-ember/30 bg-brand-ember/12 text-brand-ember",
  teal: "border-brand-teal/35 bg-brand-teal/12 text-brand-teal",
} as const;

export function Features() {
  return (
    <section id="features" aria-label="Features">
      <SectionContainer>
        <Reveal>
          <SectionHeading
            badge="MVP features"
            title="Three core functions, built excellently"
            subtitle="WhatsApp captures your data. The web dashboard manages your business. Both read and write the same records, so nothing is entered twice."
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, capabilities, accent }) => (
            <StaggerItem key={title} className="h-full">
              <GlassCard
                intensity="card"
                className="group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/40"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-2xl border",
                    ACCENT[accent],
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                </span>

                <h3 className="mt-5 text-xl font-extrabold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

                <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                  {capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden />
                      <span className="text-foreground/80">{capability}</span>
                    </li>
                  ))}
                </ul>

                {/*
                  `min-h-11` so the link is a full-width 44px row rather than a
                  20px text line. Every card ends in one of these, so on a phone
                  they are the most-used controls on the page.
                */}
                <a
                  href="#how-it-works"
                  className="mt-4 -mx-2 inline-flex min-h-11 items-center gap-2 px-2 text-sm font-bold text-primary-ink transition-colors hover:text-primary"
                >
                  See it in action
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </a>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-8">
          <GlassCard
            intensity="card"
            className={cn(
              glassMorphism.card,
              "flex flex-col gap-4 p-6 sm:flex-row sm:items-start",
            )}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/12 text-primary-ink">
              <Layers className="size-5" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="font-bold text-foreground">The hybrid architecture:</strong>{" "}
              WhatsApp handles everything conversational and fast: voice notes, quick checks,
              notifications. The web dashboard handles everything that needs proper navigation: 
              full reports, inventory management, customer lists. You get the best interface for
              each task, and one set of books underneath both.
            </p>
          </GlassCard>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export default Features;
