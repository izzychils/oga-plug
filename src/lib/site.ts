/**
 * Every public-facing fact about the company, in one place.
 *
 * The contact addresses and the WhatsApp number used to be typed out separately
 * in the footer, the floating chat button and the call to action, so changing
 * one meant remembering the others. They live here now and every surface reads
 * from this module.
 *
 * The addresses below are role addresses on the product domain, matching the
 * `user@ogaplug.com` the footer already published. Swap them here if the real
 * mailboxes differ: nothing else needs to change.
 */

export const SITE = {
  name: "Oga Plug",
  tagline: "Business OS for Africa",
  shortDescription:
    "Africa's smartest business assistant. Record sales, manage stock and chase debts entirely from WhatsApp.",
  company: "Oga Plug",
  /** Registered address line used in the footer and on the legal pages. */
  registered: "Rivers State, Nigeria",
  origin: "https://ogaplug.com",
  domain: "ogaplug.com",
  /** The markets the MVP actually launches in. */
  regions: "Port Harcourt & Owerri, Nigeria",
  supportHours: "Monday to Saturday, 8:00 am to 7:00 pm WAT",
  legalUpdated: "October 2025",
} as const;

/* ------------------------------------------------------------------ people */

export const CONTACT = {
  general: "user@ogaplug.com",
  support: "user@ogaplug.com",
  billing: "user@ogaplug.com",
  privacy: "user@ogaplug.com",
  partnerships: "user@ogaplug.com",
  legal: "user@ogaplug.com",
} as const;

/* ------------------------------------------------------------------- phone */

/**
 * WhatsApp is the product's front door, so the number is part of the interface
 * rather than a contact detail. `waLink()` builds a click-to-chat URL with the
 * message pre-filled, which is what every "get started" control points at.
 */
export const WHATSAPP = {
  display: "+234 800 123 4567",
  e164: "2348001234567",
} as const;

export function waLink(message = "Hi"): string {
  return `https://wa.me/${WHATSAPP.e164}?text=${encodeURIComponent(message)}`;
}

export function mailto(address: string, subject?: string): string {
  return subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;
}
