import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className merge (same helper used across `fds-fe`). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ------------------------------------------------------------- currency */

/** Naira amounts are whole numbers. `₦184,500`. */
export function formatNaira(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  return `₦${safe.toLocaleString("en-NG")}`;
}

/* ------------------------------------------------------------ identities */

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/** `18:04`: the timestamp style used in the chat previews. */
export function formatClock(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * A real image for surfaces that need one (the console avatar) when there is no
 * uploaded photo: an inline SVG with the person's initials. No network request,
 * no invented photograph.
 */
export function initialsAvatar(name: string, tint = "#0f3a2e"): string {
  const text = initials(name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="${tint}"/><text x="48" y="61" font-family="Outfit,Segoe UI,sans-serif" font-size="34" font-weight="700" fill="#25d366" text-anchor="middle">${text}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Collision-resistant client id. */
export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
