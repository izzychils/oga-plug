import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, type LucideIcon } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { GlassCard, SectionBadge } from "@/components/ui";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * The shell the sign-in and sign-up screens share.
 *
 * These are the only two pages that render without the site header and footer
 * (see `App.tsx`). That is not a styling preference: the brief is that someone
 * signing in must see the whole form — every field, the button, the way to the
 * other screen — without scrolling, and the sticky header plus the footer are
 * together taller than a phone viewport. So the page owns the full viewport and
 * carries its own compact brand row instead.
 *
 * The value rail is `hidden lg:block` for the same reason: on a phone it would
 * be content stacked above the form, pushing the fields below the fold.
 */
export function AuthLayout({
  badge,
  railTitle,
  railLede,
  points,
  title,
  subtitle,
  aside,
  children,
  altAction,
}: {
  badge: string;
  railTitle: ReactNode;
  railLede: string;
  /** Value props for the desktop rail. Never shown on a phone. */
  points: { icon: LucideIcon; text: string }[];
  /** The form card's own heading. */
  title: string;
  subtitle: string;
  /** Optional line under the form: terms, privacy, support. */
  aside?: ReactNode;
  children: ReactNode;
  /** The link across to the other screen. */
  altAction: ReactNode;
}) {
  return (
    <div className="auth-page mx-auto flex min-h-dvh w-full max-w-6xl flex-1 items-center px-4 py-5 sm:px-6 sm:py-8">
      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-center">
        <section className="hidden lg:block">
          <SectionBadge>{badge}</SectionBadge>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight xl:text-5xl">
            {railTitle}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {railLede}
          </p>
          <ul className="mt-7 grid gap-3">
            {points.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/78"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </section>

        <GlassCard intensity="cardStrong" className="auth-panel w-full p-5 sm:p-7">
          {/* Compact brand row. On desktop the rail above already carries the
              brand, but keeping it here as well means the form never floats
              unanchored, and it is the only way home on a phone. */}
          <div className="auth-brand mb-4 flex items-center justify-between gap-3 sm:mb-5">
            <Link to={ROUTES.home} className="inline-flex items-center gap-2.5" aria-label="Oga Plug home">
              <Logo showText={false} className="sm:hidden" />
              <Logo className="hidden sm:flex" />
            </Link>
            <Link
              to={ROUTES.home}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-white/5 hover:text-primary-ink"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Back to home
            </Link>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
          <p className="auth-sub mt-1.5 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>

          <div className="mt-4 sm:mt-5">{children}</div>

          {aside ? <div className="mt-3">{aside}</div> : null}

          <p className="auth-alt mt-4 text-sm text-muted-foreground">{altAction}</p>
        </GlassCard>
      </div>
    </div>
  );
}

/**
 * A labelled text field.
 *
 * The reveal toggle lives inside the component so neither page has to own
 * "shown or hidden" state, and the input is set at 16px: Safari on iOS zooms
 * the page when it focuses anything smaller, which would break the one-screen
 * promise the moment a thumb lands in the first field.
 */
export function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  icon: Icon,
  error,
  hint,
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  icon: LucideIcon;
  error?: string;
  hint?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-foreground/85">
        {label}
      </label>

      <div
        className={cn(
          "relative flex items-center rounded-xl border bg-white/5 transition-colors focus-within:border-primary/60",
          error ? "border-destructive/60" : "border-white/15",
        )}
      >
        <Icon className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" aria-hidden />
        <input
          id={id}
          type={isPassword && revealed ? "text" : type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-11 w-full min-w-0 bg-transparent pl-10 pr-2 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((shown) => !shown)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="mr-1.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            {revealed ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

/** The primary action of both forms. */
export function AuthSubmit({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <button
      type="submit"
      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-[1.01]"
    >
      {children}
      {icon}
    </button>
  );
}

/**
 * The line the form shows after a valid submission.
 *
 * Deliberately a status, not an error: nothing failed, there is simply no
 * account service connected yet, and the copy says so instead of pretending the
 * details were accepted.
 */
export function AuthNotice({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      className="rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2.5 text-xs leading-relaxed text-primary-ink"
    >
      {children}
    </p>
  );
}
