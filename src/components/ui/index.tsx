/**
 * The `@/components/ui` barrel, following the convention in `fds-fe` where
 * shared surfaces are imported from `@/components/ui` rather than deep paths.
 *
 * The shadcn primitives (button, input, avatar, dropdown-menu, navigation-menu,
 * input-group, chat, …) keep their own files so they stay drop-in replacements
 * for upstream shadcn output.
 */

export { GlassCard, SectionBadge, SectionHeading, SectionContainer } from "@/components/ui/glass-card";
export { DarkGradientBg } from "@/components/ui/elegant-dark-pattern";
export { UserProfileSidebar } from "@/components/ui/menu";
