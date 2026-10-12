import { cn } from "@/lib/utils";

/**
 * The brand, built from the supplied asset in `src/assets/logo.jpg`.
 *
 * The source is a dark mark on an opaque white square. That white ground is
 * gone: it read as a sticker dropped onto the ink chrome, so the mark now sits
 * on a brand-green tile instead. The artwork itself is untouched, and the same
 * tile works on the header and on the footer's near-black surface, which is why
 * one component covers both.
 *
 * `public/brand-mark.png` is the same mark with its ground knocked out
 * completely, for the round chat avatars where even a tile would be wrong. The
 * favicon, the touch icon and the social card are the same green tile; see the
 * Brand assets table in the README.
 */

/** The rounded appliance tile the mark sits in. */
function LogoMark({
  className,
  onInk = false,
}: {
  className?: string;
  onInk?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl",
        "bg-[linear-gradient(140deg,#2ee06f,#17a552)] shadow-lg shadow-black/30 ring-1",
        onInk ? "ring-white/20" : "ring-black/15",
        className,
      )}
    >
      {/*
        The mark is drawn in the source's own near-black, so it is rendered here
        from the knocked-out PNG over the green rather than from the JPEG, which
        would paint its white ground over the tile.
      */}
      <img
        src="/brand-mark.png"
        alt=""
        width={512}
        height={512}
        aria-hidden
        className="size-[62%] object-contain"
      />
    </span>
  );
}

/** The full lockup: mark plus the product name and its one-line positioning. */
export function Logo({
  className,
  showText = true,
  onInk = false,
}: {
  className?: string;
  showText?: boolean;
  onInk?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark onInk={onInk} />
      {showText ? (
        <span className="flex min-w-0 flex-col leading-tight">
          <span
            className={cn(
              "truncate text-base font-extrabold tracking-tight",
              onInk ? "text-white" : "text-foreground",
            )}
          >
            Oga Plug
          </span>
          <span
            className={cn(
              "truncate text-[11px] font-medium",
              onInk ? "text-white/55" : "text-muted-foreground",
            )}
          >
            Business OS for Africa
          </span>
        </span>
      ) : null}
    </span>
  );
}

/**
 * The mark on its own, with no ground at all.
 *
 * It is dark artwork, so it needs a light or brand surface behind it; put it on
 * one directly, or use `BrandMarkOnGreen`.
 */
export function BrandMark({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <img
      src="/brand-mark.png"
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      className={cn("size-5 shrink-0 object-contain", className)}
    />
  );
}

/**
 * The chat avatars throughout the page. They used to render the letters "OP" in
 * a tinted circle; the real mark is more useful at that size because it is what
 * a customer actually sees in their WhatsApp thread.
 *
 * The circle is solid brand green rather than a 15% tint, which is what makes
 * the dark artwork legible on the dark chat surfaces: the previous tinted disc
 * was close enough to the mark's own colour that the logo disappeared into it.
 */
export function BrandAvatar({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        "bg-[linear-gradient(140deg,#2ee06f,#17a552)] ring-1 ring-black/20",
        size === "sm" ? "size-8" : "size-10",
        className,
      )}
    >
      <BrandMark className={size === "sm" ? "size-[62%]" : "size-[60%]"} />
    </span>
  );
}
