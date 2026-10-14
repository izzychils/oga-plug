/**
 * The route table and the link groups every navigation surface is built from.
 *
 * Paths live here rather than being typed into the header and the footer
 * separately, so a page cannot end up published but unlinked: which is exactly
 * what happened to the legal pages before this site had a router.
 */

export const ROUTES = {
  home: "/",
  about: "/about",
  contact: "/contact",
  signIn: "/login",
  signUp: "/signup",
  privacy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
  termsAndConditions: "/terms-and-conditions",
} as const;

export type PageLink = {
  to: string;
  label: string;
  /** One line, shown under the label in the footer's legal column. */
  hint?: string;
};

/** In-page anchors on the home page. Root-relative so they work from anywhere. */
export const SECTION_LINKS = {
  top: "/#top",
  features: "/#features",
  howItWorks: "/#how-it-works",
  whatsapp: "/#whatsapp",
  industries: "/#industries",
  pricing: "/#pricing",
  testimonials: "/#testimonials",
  cta: "/#cta",
} as const;

/** The product column of the footer. */
export const PRODUCT_LINKS: PageLink[] = [
  { to: SECTION_LINKS.features, label: "Features" },
  { to: SECTION_LINKS.howItWorks, label: "How it works" },
  { to: SECTION_LINKS.whatsapp, label: "WhatsApp demo" },
  { to: SECTION_LINKS.industries, label: "Industries" },
  { to: SECTION_LINKS.pricing, label: "Pricing" },
];

/** The company column of the footer: real pages, not anchors. */
export const COMPANY_LINKS: PageLink[] = [
  { to: ROUTES.about, label: "About us" },
  { to: ROUTES.contact, label: "Contact us" },
  { to: SECTION_LINKS.testimonials, label: "Customer stories" },
  { to: SECTION_LINKS.cta, label: "Get started" },
];

/**
 * The account entry points.
 *
 * They are actions rather than content, so they stay out of the marketing
 * columns and are rendered in the header and in the footer's sitemap row.
 */
export const ACCOUNT_LINKS: PageLink[] = [
  { to: ROUTES.signIn, label: "Sign in" },
  { to: ROUTES.signUp, label: "Create account" },
];

/**
 * The legal column. Each entry is a real page because these documents are the
 * ones a customer, a bank or a regulator needs to be able to link to directly.
 */
export const LEGAL_LINKS: PageLink[] = [
  { to: ROUTES.privacy, label: "Privacy policy" },
  { to: ROUTES.termsOfUse, label: "Terms of use" },
  { to: ROUTES.termsAndConditions, label: "Terms & conditions" },
];

/** Everything the footer's sitemap row shows, in order. */
export const FOOTER_SITEMAP: PageLink[] = [
  ...COMPANY_LINKS,
  ...ACCOUNT_LINKS,
  ...LEGAL_LINKS,
  { to: "/contact#data-request", label: "Data requests" },
];
