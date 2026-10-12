import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { GlassCard, SectionBadge } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * The furniture shared by every page that is not the marketing home page:
 * About, Contact and the three legal documents.
 *
 * They are deliberately plain. A legal page has to be readable on a ₦20,000
 * Android phone in daylight, so the measure is narrow, the body copy is set at
 * a comfortable size and nothing important is hidden behind an interaction.
 */

/** The opening block: badge, page title, standfirst and optional actions. */
export function PageHero({
  badge,
  title,
  lede,
  meta,
  actions,
  narrow = false,
}: {
  badge?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  narrow?: boolean;
}) {
  return (
    <section className="relative pt-12 sm:pt-16 lg:pt-20">
      <div
        className={cn(
          "mx-auto w-full px-5 sm:px-6",
          narrow ? "max-w-3xl" : "max-w-5xl",
        )}
      >
        {badge ? <SectionBadge>{badge}</SectionBadge> : null}

        <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {lede ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lede}
          </p>
        ) : null}

        {meta ? (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {meta}
          </div>
        ) : null}

        {actions ? (
          <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div>
        ) : null}
      </div>
    </section>
  );
}

/** The width-constrained body column under a `PageHero`. */
export function PageBody({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 pb-16 pt-12 sm:px-6 lg:pb-24",
        narrow ? "max-w-3xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A block of body copy with a heading, used across the About and legal pages. */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-4 text-[15px] leading-relaxed text-foreground/78 sm:text-base",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-xl font-extrabold tracking-tight sm:text-2xl"
    >
      {children}
    </h2>
  );
}

/** A ticked list. The check is the same one the marketing cards use. */
export function Bullets({
  items,
  className,
  tone = "primary",
}: {
  items: ReactNode[];
  className?: string;
  tone?: "primary" | "plain";
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
          <Check
            className={cn(
              "mt-1 size-4 shrink-0",
              tone === "primary" ? "text-primary-ink" : "text-muted-foreground",
            )}
            aria-hidden
          />
          <span className="text-foreground/78">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A numbered band of a legal document. The number is generated from the order
 * of the sections, so inserting one never renumbers the rest by hand.
 */
export function LegalSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  const id = `section-${index}`;
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/10 pt-7 first:border-t-0 first:pt-0">
      <h2 className="flex items-baseline gap-3 text-lg font-extrabold tracking-tight sm:text-xl">
        <span className="text-primary-ink tabular-nums">{index}.</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 pl-0 text-[15px] leading-relaxed text-foreground/78 sm:text-base sm:pl-8">
        {children}
      </div>
    </section>
  );
}

/** A glass panel that groups a page's copy. */
export function ContentCard({
  children,
  className,
  strong = false,
}: {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return (
    <GlassCard
      intensity={strong ? "cardStrong" : "card"}
      className={cn("p-6 sm:p-8", className)}
    >
      {children}
    </GlassCard>
  );
}

/** A short, bordered aside for the things a reader must not miss. */
export function Callout({
  icon,
  title,
  children,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/8 p-4 sm:p-5">
      <p className="flex items-center gap-2 text-sm font-bold text-primary-ink">
        {icon}
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-foreground/78">{children}</div>
    </div>
  );
}
