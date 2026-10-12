import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { GlassCard, SectionContainer, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { cn, initials } from "@/lib/utils";

/* ------------------------------------------------------------------ data */

type Testimonial = {
  name: string;
  business: string;
  location: string;
  rating: number;
  text: string;
  painPoint: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alhaji Musa Ibrahim",
    business: "Musa General Merchants",
    location: "Mile 3 Market, Port Harcourt",
    rating: 5,
    painPoint: "Uncollected debts",
    text: 'Before Oga Plug, I no know who dey owe me money well well. Now when customer say "Alhaji I go pay next week," I just send reminder through WhatsApp. I don collect ₦340,000 wey I for forget since I start to use am.',
  },
  {
    name: "Mrs. Ngozi Okafor",
    business: "Ngozi Community Pharmacy",
    location: "GRA Phase 2, Port Harcourt",
    rating: 5,
    painPoint: "Drug expiry losses",
    text: "The expiry tracking saved my business. Last month, Oga Plug alert me say 15 drugs dey expire in 30 days. I run clearance sale sharp sharp. ₦180,000 I would have thrown away, I still sell ₦120,000. That one pain pass.",
  },
  {
    name: "Emeka Okonkwo",
    business: "Emeka Provisions",
    location: "Rumuola Market, Port Harcourt",
    rating: 5,
    painPoint: "Manual stock entry",
    text: "I just snap the waybill when Dangote delivery come. Oga Plug read all the 50 items, update my stock. Wetin go take me 2 hours with pen and paper, I don finish in 3 minutes. My wife sef shock when she see am.",
  },
  {
    name: "Mama Chioma",
    business: "Chioma Food Supplies",
    location: "New Owerri Market",
    rating: 5,
    painPoint: "Unknown profit margins",
    text: 'I dey sell tomato and pepper. Every evening, Oga Plug send me message say "you sell ₦45,000 today, your profit na ₦12,500." For the first time in 8 years, I sabi how much I dey really make. Na so business suppose be.',
  },
  {
    name: "Dr. Chukwudi Nwosu",
    business: "MedPlus Pharmacy",
    location: "Ikenegbu, Owerri",
    rating: 5,
    painPoint: "Regulatory compliance",
    text: "PCN came for inspection last week. I open my Oga Plug dashboard, show them controlled substance log, batch numbers, everything correct. 15 minutes, inspection done. My colleague wey no get system, them spend 3 hours with her and still give query.",
  },
];

/* ------------------------------------------------------------------ card */

const NOTCH = 44;
const NOTCH_DIAGONAL = Math.sqrt(NOTCH * NOTCH * 2);

/**
 * One card in the stack.
 *
 * The corner notch is cut with `clip-path` and a hairline redrawn along the
 * diagonal, which is the treatment the `tms-fe` testimonial stack uses: the
 * centre card sits square and inked, the ones behind it tilt away.
 */
function TestimonialCard({
  testimonial,
  position,
  offset,
  onSelect,
}: {
  testimonial: Testimonial;
  position: number;
  offset: number;
  onSelect: (position: number) => void;
}) {
  const isCenter = position === 0;
  const distance = Math.abs(position);

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`Read the story from ${testimonial.name}`}
      onClick={() => onSelect(position)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(position);
        }
      }}
      animate={{
        x: position * offset,
        y: isCenter ? 0 : position % 2 ? 14 : -14,
        rotate: isCenter ? 0 : position % 2 ? 3 : -3,
        scale: isCenter ? 1 : 0.9,
        opacity: distance > 2 ? 0 : isCenter ? 1 : 0.55,
        zIndex: 10 - distance,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      style={{
        clipPath: `polygon(${NOTCH}px 0%, calc(100% - ${NOTCH}px) 0%, 100% ${NOTCH}px, 100% 100%, calc(100% - ${NOTCH}px) 100%, ${NOTCH}px 100%, 0 100%, 0 0)`,
        pointerEvents: distance > 2 ? "none" : "auto",
      }}
      className={cn(
        "absolute inset-x-0 top-0 mx-auto flex h-[21rem] max-w-[32rem] cursor-pointer flex-col p-7 sm:p-9",
        isCenter
          ? "border border-white/15 bg-[linear-gradient(150deg,rgba(0,0,0,0.86),rgba(8,26,22,0.94))] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border border-white/10 bg-black/40 backdrop-blur-md",
      )}
    >
      <span
        aria-hidden
        className="absolute bg-white/15"
        style={{ right: -2, top: NOTCH - 2, width: NOTCH_DIAGONAL, height: 2 }}
      />

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-ink">
          {testimonial.painPoint}
        </span>
        <Quote className="size-6 text-white/15" aria-hidden />
      </div>

      <p className="mt-5 flex-1 overflow-y-auto pr-1 text-[15px] leading-relaxed text-white/85 sm:text-base">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="mt-4 flex items-center gap-1 text-brand-ember">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="size-4 fill-current" aria-hidden />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-sm font-extrabold text-primary-ink">
          {initials(testimonial.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-white">{testimonial.name}</span>
          <span className="block truncate text-xs text-white/60">
            {testimonial.business} · {testimonial.location}
          </span>
        </span>
      </div>
    </motion.article>
  );
}

/* --------------------------------------------------------------- section */

export function Testimonials() {
  // `active` is the index of the card at the centre of the stack.
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;

  /**
   * How far the cards behind the centre one are pushed out. A fixed 108px
   * pushed a phone-width card past the viewport and grew the document's scroll
   * width, so the spread follows the viewport.
   */
  const [offset, setOffset] = useState(108);

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      /*
       * Four steps, not three. At the 640 to 1023px range a fixed 108px spread
       * pushed the rotated side cards past the viewport edge, so they were
       * sliced by the clip rather than peeking out from behind the centre card.
       */
      setOffset(width < 420 ? 52 : width < 640 ? 76 : width < 1024 ? 92 : 108);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /**
   * `steps` is the position of the clicked card relative to the centre, so a
   * card two to the right of centre moves the stack on by two.
   */
  const handleMove = (steps: number) => {
    setActive((prev) => (prev + steps + total) % total);
  };

  /** Signed distance from the centre, wrapped so the stack never runs out. */
  const positionOf = (index: number) => {
    let position = index - active;
    if (position > total / 2) position -= total;
    if (position < -total / 2) position += total;
    return position;
  };

  return (
    <section id="testimonials" aria-label="Customer stories">
      <SectionContainer>
        <Reveal>
          <SectionHeading
            badge="Real stories"
            title="Built for Nigerian business reality"
            subtitle="Real businesses, real pain solved, real money recovered or saved. Tap a card to bring it forward."
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          {/*
            `overflow-x-clip` rather than `hidden`: clip does not create a scroll
            container, so the tilted cards at the edges are trimmed instead of
            adding a second scrollbar, and nothing is pulled sideways.
          */}
          <div className="relative mx-auto h-[23rem] w-full max-w-[34rem] overflow-x-clip px-2 sm:px-4">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                position={positionOf(index)}
                offset={offset}
                onSelect={handleMove}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleMove(-1)}
              aria-label="Previous story"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/80 backdrop-blur-xl transition-colors hover:bg-white/10"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>

            {/*
              The indicators keep their 6px look but not a 6px hit area: the
              drawn bar is a child of a 36px-tall button, which is the smallest
              target that is comfortable to tap next to the arrows.
            */}
            <div className="flex items-center gap-1">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => handleMove(positionOf(index))}
                  aria-label={`Show the story from ${testimonial.name}`}
                  aria-current={index === active}
                  className="group/dot flex h-9 items-center px-1.5"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300",
                      index === active
                        ? "w-7 bg-primary"
                        : "w-2.5 bg-white/25 group-hover/dot:bg-white/40",
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleMove(1)}
              aria-label="Next story"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/80 backdrop-blur-xl transition-colors hover:bg-white/10"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>

          <GlassCard intensity="card" className="mx-auto mt-10 max-w-3xl p-6 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Across the pilot shops, Oga Plug has recorded{" "}
              <strong className="font-bold text-foreground">₦4.2M in recovered credit</strong> and{" "}
              <strong className="font-bold text-foreground">₦1.8M in stock that would have
              expired</strong>, because the numbers finally live somewhere you can find them.
            </p>
          </GlassCard>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export default Testimonials;
