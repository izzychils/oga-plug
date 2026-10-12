import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { glassMorphism } from "@/lib/glass-morphism";

/** The frosted surface every panel on the page is built from. */
export function GlassCard({
  className,
  children,
  intensity = "card",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  intensity?: "base" | "card" | "cardStrong" | "modal" | "light" | "tab";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        glassMorphism[intensity],
        intensity === "card" && "rounded-2xl",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Small pill used above every section heading. */
export function SectionBadge({
  children,
  className,
  icon,
}: {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-ink",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/**
 * The heading block every section opens with: badge, display title and a lede
 * that is capped at a comfortable measure.
 */
export function SectionHeading({
  badge,
  badgeIcon,
  title,
  subtitle,
  className,
  id,
  align = "center",
}: {
  badge?: ReactNode;
  badgeIcon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  id?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {badge ? <SectionBadge icon={badgeIcon}>{badge}</SectionBadge> : null}
      <h2
        id={id}
        className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/** Shared page container so every section lines up on the same grid. */
export function SectionContainer({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn("mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:py-24", className)}
    >
      {children}
    </div>
  );
}
