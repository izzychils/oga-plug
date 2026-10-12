/**
 * Glass morphism utility classes
 * Provides reusable glass morphism styling for UI components
 *
 * Ported verbatim from `fds-fe/src/lib/glass-morphism.ts` so the header, cards
 * and panels here are frosted exactly the same way as that project.
 */

export const glassMorphism = {
  base: "backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10",

  card: "backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/30 dark:border-white/20 shadow-xl shadow-black/10",

  cardStrong:
    "backdrop-blur-xl bg-white/30 dark:bg-black/40 border border-white/40 dark:border-white/30 shadow-2xl shadow-black/20 dark:shadow-black/50 rounded-2xl",

  tab: "backdrop-blur-lg bg-white/15 dark:bg-black/25 border border-white/25 dark:border-white/15",

  input: "backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10",

  modal: "backdrop-blur-2xl bg-white/25 dark:bg-black/40 border border-white/30 dark:border-white/25 shadow-2xl",

  light: "backdrop-blur-xl bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/20",

  dark: "backdrop-blur-xl bg-black/30 dark:bg-black/40 border border-white/20 dark:border-white/30",

  hover:
    "hover:bg-white/25 dark:hover:bg-black/40 hover:border-white/40 dark:hover:border-white/30 transition-all duration-300",

  shadow: "shadow-lg shadow-black/10 dark:shadow-black/30",
  shadowStrong: "shadow-2xl shadow-black/20 dark:shadow-black/40",

  /**
   * The opaque end of the system, for anything that floats over live content:
   * menus, popovers and chat docks. Declared in `globals.css` because it needs a
   * gradient and a composited border to stay legible, and because the classes
   * there beat the Tailwind utilities on the same element without `!important`.
   *
   * The rule is simple: a surface that overlays something else must be opaque
   * enough that what is underneath cannot be read through it. Frosted glass is
   * for panels sitting on the ambient background, not for panels sitting on
   * other people's text.
   */
  overlay: "overlay-panel rounded-2xl",
  overlaySheet: "overlay-sheet rounded-2xl",
};
