import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  Boxes,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Mic,
  Package,
  Settings,
  Store,
  Users,
} from "lucide-react";

import { UserProfileSidebar, SectionBadge } from "@/components/ui";
import { DarkGradientBg } from "@/components/ui/elegant-dark-pattern";
import { AnimatedCounter } from "@/components/animated-counter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { glassMorphism } from "@/lib/glass-morphism";
import { cn, formatNaira, initialsAvatar } from "@/lib/utils";

/* --------------------------------------------------------------- shared UI */

/** The browser chrome the console preview sits in. */
function ConsoleFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        glassMorphism.cardStrong,
        "overflow-hidden rounded-3xl p-0 ring-1 ring-white/10",
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto hidden max-w-[16rem] flex-1 truncate rounded-full bg-black/40 px-3 py-1 text-center text-[11px] text-white/45 sm:block">
          app.ogaplug.com/dashboard
        </span>
      </div>
      {children}
    </div>
  );
}

/** A single KPI tile in the console preview. */
function StatTile({
  icon,
  label,
  value,
  hint,
  tone = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  tone?: "primary" | "ember" | "plain";
}) {
  const toneClass =
    tone === "ember"
      ? "border-brand-ember/30 bg-brand-ember/10 text-brand-ember"
      : tone === "primary"
        ? "border-primary/30 bg-primary/10 text-primary-ink"
        : "border-white/15 bg-white/5 text-foreground/80";

  /*
   * The label sits beside the icon and the figure gets a line to itself.
   *
   * All three used to share one row, which left the figure about seventy pixels
   * wide in a three-column grid inside the console; `truncate` then turned
   * "₦184,500" into "₦184,…" on exactly the laptop widths the section is meant
   * to show off. Nothing is truncated now, because nothing has to shrink.
   */
  return (
    <GlassCard intensity="card" className="p-3.5">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border",
            toneClass,
          )}
        >
          {icon}
        </span>
        <p className="min-w-0 truncate text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>

      <p className="mt-2.5 text-lg font-extrabold leading-none tracking-tight">{value}</p>

      {hint ? (
        <p className="mt-1.5 truncate text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </GlassCard>
  );
}

/* -------------------------------------------------------------- #top hero */

export function Hero() {
  const week = [42, 58, 35, 71, 63, 88, 54];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <section id="top" aria-label="Oga Plug overview">
      <DarkGradientBg className="min-h-0 pb-20 pt-14 sm:pt-20 lg:pb-28">
        {/* Brand glow, so the dark pattern is not a flat black field. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="liquid-blob left-[-10%] top-[-12%] h-[26rem] w-[26rem] bg-primary/25" />
          <div
            className="liquid-blob right-[-6%] top-[8%] h-[22rem] w-[22rem] bg-brand-teal/30"
            style={{ animationDelay: "6s" }}
          />
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* ---------------------------------------------------------- copy */}
          <div className="relative">
            <Reveal>
              <SectionBadge icon={<MessageCircle className="size-3.5" />}>
                Business operating system for Africa
              </SectionBadge>
            </Reveal>

            <Reveal delay={0.06}>
              {/*
                `text-3xl` at the base, not `text-4xl`: at 320px a 36px display
                line fits about sixteen characters, so the headline broke into
                five cramped lines. The leading opens up on small screens too: 
                1.08 is right for one or two display lines and wrong for five.
              */}
              <h1 className="mt-5 max-w-2xl text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl sm:leading-[1.08] lg:text-6xl">
                <span className="text-primary-ink">
                  <AnimatedCounter end={41} /> million Nigerian businesses
                </span>{" "}
                have no financial records
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Not because they are bad at business. Because no tool was built for how they
                actually operate. Oga Plug changes that: WhatsApp for input, a web dashboard for
                management, built for how you already work.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#whatsapp"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-transform duration-300 hover:scale-[1.03] sm:text-base"
                >
                  <MessageCircle className="size-5" aria-hidden />
                  Try the live demo
                  <ArrowRight className="size-4" aria-hidden />
                </a>
                <a
                  href="#how-it-works"
                  className={cn(
                    glassMorphism.tab,
                    glassMorphism.hover,
                    "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white sm:text-base",
                  )}
                >
                  See how it works
                </a>
              </div>
            </Reveal>

            <StaggerGroup className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Store, title: "Port Harcourt & Owerri", note: "Launch markets" },
                { icon: Mic, title: "Voice, photo, text", note: "Any way you send it" },
                { icon: Package, title: "Zero behaviour change", note: "Same app, real books" },
              ].map(({ icon: Icon, title, note }) => (
                <StaggerItem key={title}>
                  <GlassCard intensity="card" className="flex items-start gap-3 p-3.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <Icon className="size-4 text-primary-ink" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">{title}</span>
                      <span className="block text-[11px] text-white/55">{note}</span>
                    </span>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* -------------------------------------------------------- console */}
          <Reveal delay={0.1} y={30} className="relative">
            <ConsoleFrame>
              <div className="flex min-h-[26rem] flex-col gap-3 bg-black/25 p-3 lg:flex-row lg:p-4">
                <UserProfileSidebar
                  className="max-w-none shrink-0 border-white/10 bg-black/25 backdrop-blur-xl lg:w-[13.5rem]"
                  user={{
                    name: "Ngozi Okafor",
                    email: "Ngozi Community Pharmacy",
                    avatarUrl: initialsAvatar("Ngozi Okafor", "#0f3a2e"),
                  }}
                  navItems={[
                    {
                      icon: <LayoutDashboard className="size-5" aria-hidden />,
                      label: "Dashboard",
                      href: "#top",
                    },
                    {
                      icon: <BadgeDollarSign className="size-5" aria-hidden />,
                      label: "Sales",
                      href: "#features",
                    },
                    {
                      icon: <Boxes className="size-5" aria-hidden />,
                      label: "Inventory",
                      href: "#features",
                    },
                    {
                      icon: <CreditCard className="size-5" aria-hidden />,
                      label: "Debts",
                      href: "#features",
                      isSeparator: true,
                    },
                    {
                      icon: <FileText className="size-5" aria-hidden />,
                      label: "Reports",
                      href: "#how-it-works",
                    },
                    {
                      icon: <Users className="size-5" aria-hidden />,
                      label: "Staff",
                      href: "#pricing",
                    },
                    {
                      icon: <Settings className="size-5" aria-hidden />,
                      label: "Settings",
                      href: "#cta",
                    },
                  ]}
                  logoutItem={{
                    icon: <LogOut className="size-5" aria-hidden />,
                    label: "Sign out",
                    onClick: () => undefined,
                  }}
                />

                <div className="grid flex-1 content-start gap-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <StatTile
                      icon={<BarChart3 className="size-4" aria-hidden />}
                      label="Today's sales"
                      value={formatNaira(184500)}
                      hint="+12% vs yesterday"
                    />
                    <StatTile
                      icon={<AlertTriangle className="size-4" aria-hidden />}
                      label="Low stock"
                      value="8 products"
                      hint="3 expiring in 30 days"
                    />
                    <StatTile
                      icon={<CreditCard className="size-4" aria-hidden />}
                      label="Overdue debts"
                      value={formatNaira(309000)}
                      hint="4 customers"
                      tone="ember"
                    />
                  </div>

                  <GlassCard intensity="card" className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        This week
                      </p>
                      <p className="text-sm font-bold text-primary-ink">{formatNaira(1243000)}</p>
                    </div>
                    <div className="mt-4 flex h-28 items-end gap-2">
                      {week.map((height, index) => (
                        <div key={index} className="flex flex-1 flex-col items-center gap-2">
                          <div
                            className="w-full rounded-t-md bg-gradient-to-t from-primary/25 to-primary transition-all duration-700"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-[10px] text-muted-foreground">{days[index]}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            </ConsoleFrame>

            {/* The WhatsApp half of the product, floating over the console. */}
            <div className="animate-float absolute -bottom-6 -left-3 w-[15rem] sm:-left-6 sm:w-[16.5rem]">
              <GlassCard
                intensity="cardStrong"
                className="border-primary/25 bg-black/60 p-3 text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary-ink">
                    <Mic className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold">Voice note · 10:42</p>
                    <p className="truncate text-[11px] text-white/60">
                      "I sell 4 carton Malt, ₦7,200, cash"
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 rounded-xl bg-primary/15 px-2.5 py-2 text-[11px] leading-relaxed text-primary-ink">
                  Sale logged. Stock updated: 16 cartons remaining.
                </div>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </DarkGradientBg>
    </section>
  );
}

export default Hero;
