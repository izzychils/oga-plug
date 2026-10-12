import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  CreditCard,
  Mic,
  Play,
  RotateCcw,
  Send,
  UserPlus,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

import { GlassCard, SectionContainer, SectionHeading } from "@/components/ui";
import { BrandAvatar } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { glassMorphism } from "@/lib/glass-morphism";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ data */

type Step = {
  actor: "user" | "bot" | "system" | "customer";
  message?: string;
  details?: string;
  actions?: string[];
  action?: string;
  type?: "voice" | "image" | "processing" | "success" | "system" | "reminder" | "action";
  icon?: typeof Mic;
  name?: string;
};

type Flow = {
  id: string;
  icon: typeof Mic;
  title: string;
  subtitle: string;
  steps: Step[];
};

const FLOWS: Flow[] = [
  {
    id: "voice",
    icon: Mic,
    title: "Voice note sale",
    subtitle: "Record a sale in ten seconds",
    steps: [
      {
        actor: "user",
        message: "I sell 4 carton Malt, 7,200 naira, customer pay cash",
        type: "voice",
      },
      {
        actor: "bot",
        message: "Got it",
        details:
          "4 cartons Malt sold: ₦7,200\nPayment: Cash\nStock updated: 16 cartons remaining\n\nConfirm?",
        actions: ["Yes, correct", "Edit"],
      },
      { actor: "user", action: 'Taps "Yes, correct"', type: "action" },
      {
        actor: "bot",
        message: "Sale recorded. Books updated.",
        type: "success",
      },
    ],
  },
  {
    id: "receipt",
    icon: Camera,
    title: "Receipt scanning",
    subtitle: "Photograph a waybill, update stock instantly",
    steps: [
      { actor: "user", message: "[Photo of Dangote delivery waybill]", type: "image" },
      { actor: "bot", message: "Reading waybill…", type: "processing" },
      {
        actor: "bot",
        message: "FOUND:",
        details:
          "Supplier: Dangote Flour Mills\nDate: 12 Apr 2026\nItems:\n• 50kg bag cement × 40 = ₦280,000\n• 50kg Dangote Sugar × 20 = ₦94,000\nTotal: ₦374,000\n\nLog as purchase? Stock will be added.",
        actions: ["Log it", "Edit first"],
      },
      { actor: "user", action: 'Taps "Log it"', type: "action" },
      {
        actor: "bot",
        message: "Purchase logged",
        details:
          "40 bags cement added to stock\n20 bags sugar added to stock\nExpense: ₦374,000 recorded",
        type: "success",
      },
    ],
  },
  {
    id: "debt",
    icon: CreditCard,
    title: "Debt collection",
    subtitle: "Automated WhatsApp reminders, matched payments",
    steps: [
      {
        actor: "user",
        message: "Emeka collect 2 bags rice on credit, ₦24,000",
        type: "voice",
      },
      {
        actor: "bot",
        message: "Credit sale recorded",
        details: "Emeka owes: ₦24,000\nDue date: 19 Apr 2026\n\nI will remind him on due date.",
        type: "success",
      },
      { actor: "system", message: "[7 days later, automatic reminder sent]", type: "system" },
      {
        actor: "customer",
        name: "To: Emeka",
        message:
          "Hello Emeka, hope you are well. This is a reminder from Alhaji Store. Your balance is ₦24,000. Kindly settle by Friday. Thank you.",
        type: "reminder",
      },
      { actor: "system", message: "[Customer sends bank transfer]", type: "system" },
      { actor: "user", message: "[Forwards transfer screenshot]", type: "image" },
      {
        actor: "bot",
        message: "Payment detected",
        details:
          "₦24,000 received from Emeka\n\nMatch to outstanding invoice?\nInvoice #INV-0031: ₦24,000 (overdue 3 days)",
        actions: ["Yes, match it"],
      },
      { actor: "user", action: 'Taps "Yes, match it"', type: "action" },
      {
        actor: "bot",
        message: "Debt cleared",
        details: "Emeka's balance: ₦0",
        type: "success",
      },
    ],
  },
];

const ONBOARDING_STEPS = [
  { icon: MessageCircle, title: 'Send "Hi"', text: "Message the Oga Plug WhatsApp number" },
  { icon: UserPlus, title: "Quick registration", text: "Answer 3 questions about your business" },
  { icon: CheckCircle2, title: "Account live", text: "Start recording sales immediately" },
];

/* ------------------------------------------------------------- rendering */

function Bubble({ step }: { step: Step }) {
  if (step.type === "system") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto my-3 w-fit rounded-full bg-black/40 px-3 py-1 text-center text-[11px] text-wa-meta"
      >
        {step.message}
      </motion.p>
    );
  }

  const outgoing = step.actor === "user";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className={cn("flex w-full", outgoing ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "relative max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm sm:max-w-[85%]",
          outgoing
            ? "wa-bubble-out rounded-tr-none bg-wa-out text-wa-text"
            : "wa-bubble-in rounded-tl-none bg-wa-in text-wa-text",
        )}
      >
        {step.actor === "customer" && step.name ? (
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-primary-ink">
            {step.name}
          </p>
        ) : null}

        {step.type === "action" ? (
          <p className="text-[12px] italic text-wa-meta">{step.action}</p>
        ) : null}

        {step.message && !step.type?.includes("action") ? (
          <p className="whitespace-pre-wrap">{step.message}</p>
        ) : null}

        {step.type === "voice" ? (
          <span className="mt-2 flex items-center gap-2 text-[11px] text-wa-meta">
            <Mic className="size-3.5" aria-hidden />
            <span className="flex items-end gap-0.5">
              {[6, 10, 4, 12, 8, 5, 11, 7].map((height, index) => (
                <span
                  key={index}
                  className="w-[3px] rounded-full bg-current opacity-60"
                  style={{ height }}
                />
              ))}
            </span>
            0:07
          </span>
        ) : null}

        {step.type === "image" ? (
          <span className="mt-2 flex h-20 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-wa-meta">
            <Camera className="size-6" aria-hidden />
          </span>
        ) : null}

        {step.type === "processing" ? (
          <span className="mt-2 flex items-center gap-1">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="typing-dot size-1.5 rounded-full bg-wa-meta"
                style={{ animationDelay: `${dot * 0.15}s` }}
              />
            ))}
          </span>
        ) : null}

        {step.details ? (
          <p className="mt-2 whitespace-pre-wrap rounded-xl bg-black/25 px-3 py-2 text-[12px] text-wa-text/85">
            {step.details}
          </p>
        ) : null}

        {step.actions ? (
          <span className="mt-2 flex flex-wrap gap-2">
            {step.actions.map((action, index) => (
              <span
                key={action}
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-semibold",
                  index === 0
                    ? "border-primary/40 bg-primary/15 text-primary-ink"
                    : "border-white/15 bg-white/5 text-wa-meta",
                )}
              >
                {action}
              </span>
            ))}
          </span>
        ) : null}

        {step.type === "success" ? (
          <span className="mt-2 flex items-center gap-1.5 text-[11px] text-primary-ink">
            <Check className="size-3.5" aria-hidden />
            saved
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- section */

export function HowItWorks() {
  const [activeFlow, setActiveFlow] = useState(FLOWS[0].id);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  const flow = FLOWS.find((entry) => entry.id === activeFlow) ?? FLOWS[0];

  /*
   * Follow the conversation.
   *
   * The player used to append a step every second or so and leave the viewport
   * where it was, so by the fourth or fifth bubble the newest one was below the
   * fold and the whole point of the demo, that it plays itself, was lost. This
   * keeps the newest message in view; the visitor can still scroll back, since
   * the next step re-pins the view.
   */
  useEffect(() => {
    const node = threadRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [visibleCount, activeFlow]);

  // Autoplay once, when the panel first comes into view.
  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          setIsPlaying(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Reveal one step at a time while the flow is playing.
  useEffect(() => {
    if (!isPlaying || visibleCount >= flow.steps.length) return;

    const delay = visibleCount === 0 ? 500 : 1150;
    const timer = setTimeout(() => setVisibleCount((prev) => prev + 1), delay);
    return () => clearTimeout(timer);
  }, [isPlaying, visibleCount, flow.steps.length]);

  const selectFlow = (id: string) => {
    setActiveFlow(id);
    setVisibleCount(0);
    setIsPlaying(true);
  };

  return (
    <section id="how-it-works" aria-label="How it works">
      <SectionContainer>
        <Reveal>
          <SectionHeading
            badge="How it works"
            title="From a WhatsApp message to clean books"
            subtitle="Pick a flow and watch it play. Every one of them starts with the same two taps you already make a hundred times a day."
            className="mx-auto"
          />
        </Reveal>

        {/* ------------------------------------------------------ onboarding */}
        <Reveal delay={0.05} className="mt-12">
          <div className="grid gap-3 sm:grid-cols-3">
            {ONBOARDING_STEPS.map(({ icon: Icon, title, text }, index) => (
              <GlassCard key={title} intensity="card" className="flex items-start gap-3 p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/12 text-primary-ink">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Step {index + 1}
                  </p>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </Reveal>

        {/* ------------------------------------------------------ flow player */}
        <Reveal delay={0.1} className="mt-8">
          <GlassCard intensity="cardStrong" className="overflow-hidden p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
              {/* Tabs + step list */}
              <div>
                <div
                  role="tablist"
                  aria-label="Demo flows"
                  className={cn(
                    glassMorphism.tab,
                    "flex flex-col gap-1 rounded-2xl p-1 sm:flex-row",
                  )}
                >
                  {FLOWS.map(({ id, icon: Icon, title }) => {
                    const active = id === activeFlow;
                    return (
                      <button
                        key={id}
                        role="tab"
                        aria-selected={active}
                        onClick={() => selectFlow(id)}
                        className={cn(
                          "relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors sm:text-sm",
                          active ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground",
                        )}
                      >
                        {active ? (
                          <motion.span
                            layoutId="activeFlow"
                            className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/25"
                            transition={{ type: "spring", stiffness: 320, damping: 30 }}
                          />
                        ) : null}
                        <span className="relative flex items-center gap-2">
                          <Icon className="size-4" aria-hidden />
                          {title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-sm text-muted-foreground">{flow.subtitle}</p>

                <ol className="mt-5 space-y-2.5">
                  {flow.steps.map((step, index) => {
                    const revealed = index < visibleCount;
                    return (
                      <li
                        key={index}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all duration-300",
                          revealed
                            ? "border-primary/25 bg-primary/8 text-foreground/85"
                            : "border-white/10 bg-white/[0.03] text-muted-foreground/70",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                            revealed
                              ? "bg-primary text-primary-foreground"
                              : "bg-white/10 text-muted-foreground",
                          )}
                        >
                          {revealed ? <Check className="size-3" aria-hidden /> : index + 1}
                        </span>
                        <span className="min-w-0">
                          {step.type === "action" ? step.action : step.message}
                          {step.details ? (
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {step.details.split("\n")[0]}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* The device that plays the flow */}
              <div ref={panelRef} className="flex flex-col">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-wa-panel shadow-2xl shadow-black/40">
                  <div className="flex items-center gap-3 border-b border-black/30 px-4 py-3">
                    <BrandAvatar size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-wa-text">Oga Plug</p>
                      <p className="truncate text-[11px] text-primary-ink">
                        {isPlaying && visibleCount < flow.steps.length ? "typing…" : "online"}
                      </p>
                    </div>
                    <span className="rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-wa-meta">
                      {flow.title}
                    </span>
                  </div>

                  {/* `no-scrollbar`: the green bar was visual noise on a thread
                      that follows itself. */}
                  <div
                    ref={threadRef}
                    className="wa-wallpaper no-scrollbar flex h-[24rem] flex-col gap-2.5 overflow-y-auto px-3.5 py-4"
                  >
                    <AnimatePresence initial={false}>
                      {flow.steps.slice(0, visibleCount).map((step, index) => (
                        <Bubble key={`${flow.id}-${index}`} step={step} />
                      ))}
                    </AnimatePresence>

                    {isPlaying && visibleCount < flow.steps.length ? (
                      <div className="flex justify-start">
                        <div className="wa-bubble-in relative flex items-center gap-1 rounded-2xl rounded-tl-none bg-wa-in px-4 py-3">
                          {[0, 1, 2].map((dot) => (
                            <span
                              key={dot}
                              className="typing-dot size-1.5 rounded-full bg-wa-meta"
                              style={{ animationDelay: `${dot * 0.15}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 border-t border-black/30 bg-wa-input/60 px-3 py-2.5">
                    <span className="flex-1 truncate rounded-full bg-black/30 px-4 py-2 text-[13px] text-wa-meta">
                      Message
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Send className="size-4" aria-hidden />
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVisibleCount(0);
                      setIsPlaying(true);
                    }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-xs font-bold transition-colors hover:bg-white/10"
                  >
                    <Play className="size-3.5" aria-hidden />
                    Play flow
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVisibleCount(0);
                      setIsPlaying(false);
                    }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-xs font-bold transition-colors hover:bg-white/10"
                  >
                    <RotateCcw className="size-3.5" aria-hidden />
                    Reset
                  </button>
                  <span className="text-[11px] text-muted-foreground">
                    Step {Math.min(visibleCount, flow.steps.length)} of {flow.steps.length}
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export default HowItWorks;
