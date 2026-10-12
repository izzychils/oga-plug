import {
  ArrowRight,
  ArrowRightLeft,
  Camera,
  CheckCircle2,
  CreditCard,
  Mic,
  Package,
  Pill,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SectionLink } from "@/components/layout/section-link";
import { SECTION_LINKS } from "@/lib/routes";
import { glassMorphism } from "@/lib/glass-morphism";
import { cn } from "@/lib/utils";

/**
 * The mega-menu behind the desktop header nav. Two panels:
 *  - "Product": the three MVP capabilities and the hybrid architecture.
 *  - "Industries": the two launch verticals plus the roadmap list.
 *
 * The panels use `glassMorphism.overlay`, not `cardStrong`. `cardStrong` is 40%
 * opaque, and these panels open on top of the hero: at 40% black the headline,
 * the section badge and the stat tiles behind them read straight through the
 * panel, so the menu's own labels appeared to be overlapping page text. While
 * Radix animated between the two panels the outgoing one was still mounted, and
 * through that same 60% the two sets of items were visible at once. The overlay
 * surface is a near-solid ink tile, so nothing behind it is legible and only the
 * incoming panel is ever seen.
 */

const TRIGGER_CLASS = cn(
  glassMorphism.tab,
  glassMorphism.hover,
  "h-auto rounded-full px-4 py-2.5 text-[15px] font-semibold text-foreground/80",
  "hover:text-foreground data-[state=open]:bg-primary/12 data-[state=open]:text-primary",
);

function PanelLink({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <SectionLink
      to={href}
      className="flex select-none items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-primary/10"
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-ink">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-tight">{title}</span>
        <span className="mt-1 block text-xs leading-snug text-muted-foreground">
          {description}
        </span>
      </span>
    </SectionLink>
  );
}

const PRODUCT_LINKS = [
  {
    href: SECTION_LINKS.features,
    title: "Smart capture engine",
    description: "Voice notes, receipt photos and transfer alerts, read and logged.",
    icon: <Camera className="size-4" aria-hidden />,
  },
  {
    href: SECTION_LINKS.features,
    title: "Inventory & stock",
    description: "Live stock levels, low-stock alerts and expiry tracking.",
    icon: <Package className="size-4" aria-hidden />,
  },
  {
    href: SECTION_LINKS.features,
    title: "Debt ledger",
    description: "Credit sales logged by voice, with automatic reminders.",
    icon: <CreditCard className="size-4" aria-hidden />,
  },
];

const CAPTURE_NOTES = [
  { icon: Mic, label: "Voice notes in Pidgin or English" },
  { icon: Camera, label: "Handwritten receipts and waybills" },
  { icon: ArrowRightLeft, label: "Bank transfer screenshots" },
  { icon: CheckCircle2, label: "You confirm before anything is saved" },
];

export function HeaderProductMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={TRIGGER_CLASS}>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div
              className={cn(
                glassMorphism.overlay,
                "grid w-[min(90vw,760px)] gap-4 p-4 lg:grid-cols-[1.05fr_1fr]",
              )}
            >
              <div className="space-y-1">
                <p className="px-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  What it does
                </p>
                {PRODUCT_LINKS.map((link) => (
                  <PanelLink key={link.title} {...link} />
                ))}
                <SectionLink
                  to={SECTION_LINKS.howItWorks}
                  className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2.5 text-sm font-bold text-primary-ink transition-colors hover:bg-primary/15"
                >
                  See every flow end to end
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </SectionLink>
              </div>

              <div className="space-y-3 rounded-xl border border-white/10 bg-black/25 p-3.5">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="size-3.5 shrink-0 text-primary-ink" aria-hidden />
                  One message, fully logged
                </p>
                <ul className="space-y-2.5">
                  {CAPTURE_NOTES.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Icon className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden />
                      <span className="min-w-0">{label}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  A sale you record today shows up in tomorrow's summary without you typing a single
                  figure.
                </p>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={TRIGGER_CLASS}>Industries</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div
              className={cn(
                glassMorphism.overlay,
                "grid w-[min(90vw,560px)] gap-1 p-3 sm:grid-cols-2",
              )}
            >
              <PanelLink
                href={SECTION_LINKS.industries}
                title="General trade"
                description="FMCG shops, market stalls and provisions stores."
                icon={<Store className="size-4" aria-hidden />}
              />
              <PanelLink
                href={SECTION_LINKS.industries}
                title="Pharmacy"
                description="Registered pharmacies with batch and expiry control."
                icon={<Pill className="size-4" aria-hidden />}
              />
              <PanelLink
                href={SECTION_LINKS.industries}
                title="Phase 2 verticals"
                description="Agriculture, bookshops, hardware, food vendors and more."
                icon={<Users className="size-4" aria-hidden />}
              />
              <PanelLink
                href={SECTION_LINKS.pricing}
                title="Pricing by business"
                description="Four plans, from a free plan to full pharmacy compliance."
                icon={<CreditCard className="size-4" aria-hidden />}
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default HeaderProductMenu;
