import { ArrowRight, Check, Globe, MessageCircle, Shield, Zap } from "lucide-react";

import { GlassCard, SectionContainer } from "@/components/ui";
import { BrandAvatar } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { glassMorphism } from "@/lib/glass-morphism";
import { cn } from "@/lib/utils";

const ASSURANCES = [
  { icon: Zap, label: "2-minute setup" },
  { icon: Shield, label: "No credit card required" },
  { icon: Globe, label: "Works on any phone" },
];

/** A small, static slice of the conversation, kept simple on purpose. */
const PREVIEW = [
  { role: "self", text: "Hi" },
  { role: "peer", text: "Welcome to Oga Plug! Let's set up your business in 2 minutes." },
  { role: "peer", text: "What is your business name?" },
  { role: "self", text: "Emeka General Stores" },
  { role: "peer", text: "Business account created 🎉 Your ID is OGA-PH-00847." },
] as const;

export function CTA() {
  return (
    <section id="cta" aria-label="Get started">
      <SectionContainer>
        <Reveal>
          <GlassCard
            intensity="cardStrong"
            className="relative overflow-hidden p-7 sm:p-10 lg:p-14"
          >
            {/* Brand wash behind the panel content. */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -left-24 -top-32 size-80 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-32 -right-16 size-72 rounded-full bg-brand-teal/25 blur-3xl" />
            </div>

            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div>
                <span
                  className={cn(
                    glassMorphism.tab,
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-ink",
                  )}
                >
                  Get started today
                </span>

                <h2 className="mt-5 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
                  Ready to put your business in order?
                </h2>

                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Set up in two minutes from the WhatsApp you already have. No download, no
                  dashboard to learn, no credit card.
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {ASSURANCES.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Icon className="size-4 text-primary-ink" aria-hidden />
                      {label}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/2348001234567?text=Hi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-transform duration-300 hover:scale-[1.03] sm:text-base"
                  >
                    <MessageCircle className="size-5" aria-hidden />
                    Start on WhatsApp
                    <ArrowRight className="size-4" aria-hidden />
                  </a>
                  <a
                    href="#pricing"
                    className={cn(
                      glassMorphism.tab,
                      glassMorphism.hover,
                      "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold sm:text-base",
                    )}
                  >
                    Compare plans
                  </a>
                </div>
              </div>

              {/* --------------------------------------------------- preview */}
              <div className="mx-auto w-full max-w-[19rem]">
                <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-wa-panel shadow-2xl shadow-black/50">
                  <div className="flex items-center gap-3 border-b border-black/40 px-3.5 py-3">
                    <BrandAvatar size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-wa-text">Oga Plug</p>
                      <p className="truncate text-[11px] text-primary-ink">online</p>
                    </div>
                  </div>

                  <div className="wa-wallpaper flex flex-col gap-2.5 px-3 py-4">
                    {PREVIEW.map((message, index) => {
                      const outgoing = message.role === "self";
                      return (
                        <div
                          key={index}
                          className={cn("flex", outgoing ? "justify-end" : "justify-start")}
                        >
                          <p
                            className={cn(
                              "relative max-w-[85%] rounded-2xl px-3.5 py-2 text-[12.5px] leading-relaxed",
                              outgoing
                                ? "wa-bubble-out rounded-tr-none bg-wa-out text-wa-text"
                                : "wa-bubble-in rounded-tl-none bg-wa-in text-wa-text",
                            )}
                          >
                            {message.text}
                          </p>
                        </div>
                      );
                    })}
                    <p className="mx-auto mt-1 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10px] text-wa-meta">
                      <Check className="size-3" aria-hidden />
                      Account live · start recording sales
                    </p>
                  </div>

                  <div className="flex items-center gap-2 border-t border-black/40 bg-wa-input/60 px-3 py-2.5">
                    <span className="flex-1 truncate rounded-full bg-black/30 px-3.5 py-2 text-[12px] text-wa-meta">
                      Message
                    </span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export default CTA;
