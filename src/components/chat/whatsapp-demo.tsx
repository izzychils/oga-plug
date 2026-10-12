import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Camera,
  CheckCheck,
  Info,
  Mic,
  Package,
  Phone,
  RotateCcw,
  Search,
  Send,
  ShoppingCart,
  Sparkles,
  Video,
} from "lucide-react";

import {
  Chat,
  ChatInputArea,
  ChatInputField,
  ChatInputSubmit,
  ChatMessageAddon,
  ChatMessageAvatar,
  ChatMessageBubble,
  ChatMessageRow,
  ChatMessageTime,
  ChatMessages,
  ChatViewport,
  type ChatSubmitEvent,
} from "@/components/ui/chat";
import { GlassCard, SectionContainer, SectionHeading } from "@/components/ui";
import { BrandAvatar } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { cn, formatNaira } from "@/lib/utils";

/* ------------------------------------------------------------------ types */

type WaMessage = {
  id: string;
  role: "self" | "peer" | "system";
  content: string;
  timestamp: Date;
};

const SUPPORT_FEATURES = [
  {
    icon: Mic,
    title: 'Send "Hi" to start',
    description: "Message the Oga Plug number and you are connected instantly.",
    prompt: "Hi",
  },
  {
    icon: Camera,
    title: "Snap or dictate",
    description: "Voice notes, receipt photos and transfer screenshots all log themselves.",
    prompt: "I sell 4 carton Malt, 7,200 naira, customer pay cash",
  },
  {
    icon: Package,
    title: "Check stock",
    description: "Ask for stock at any time and get the live figure back.",
    prompt: "Check my stock",
  },
  {
    icon: Search,
    title: "Chase debts",
    description: "See every overdue balance, sorted by amount and days late.",
    prompt: "Who is owing me?",
  },
];

/**
 * The suggested replies that sit at the bottom of the thread.
 *
 * They used to live in their own bordered bar between the messages and the
 * composer, which made the panel look like it had two input fields; the bar is
 * gone and they are now plainly suggested replies inside the conversation.
 */
const QUICK_REPLIES = [
  "Record a sale",
  "Check stock",
  "Who is owing me?",
  "Today's report",
];

/* ------------------------------------------------------------- assistant */

type Reply = { content: string; chips?: string[] };

let sequence = 0;
const nextId = (prefix: string) => `${prefix}-${Date.now()}-${sequence++}`;

/**
 * The scripted assistant behind the demo.
 *
 * This is a front-end showcase: the answers are keyword-matched, so the panel
 * responds to what a visitor actually types without pretending to be a live
 * backend. Anything unmatched gets an honest "I did not catch that" and a menu
 * of what it can do.
 */
function replyTo(input: string): Reply {
  const text = input.toLowerCase();

  /*
   * Whole-word matching, not `includes`. A substring test made "hi" match
   * "something" and "this", so unrelated messages were answered as greetings.
   * Multi-word needles are escaped and still matched as phrases.
   */
  const has = (...needles: string[]) =>
    needles.some((needle) => {
      const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(text);
    });

  /*
   * Confirmations are tested before the sale request itself, because "yes,
   * record it" contains "record" and would otherwise re-ask for a sale that
   * has already been described.
   */
  if (
    has("yes, record", "yes record", "yes, correct", "confirm", "correct", "edit the price", "edit")
  ) {
    return {
      content: `Sale recorded. Books updated ✅

Today's running total: ${formatNaira(45200)}
Profit so far: ${formatNaira(12500)}`,
      chips: ["Send me today's report", "Check stock"],
    };
  }

  if (has("hi", "hello", "hey", "good morning", "good afternoon", "good evening")) {
    return {
      content: `Welcome back, Ngozi 👋

Here is this morning's position:
• Yesterday's sales: ${formatNaira(184500)}
• Low stock: 8 products
• Overdue debts: ${formatNaira(309000)}

What would you like to do?`,
      chips: ["Record a sale", "Check stock", "Who is owing me?", "Send me today's report"],
    };
  }

  if (has("sell", "sale", "sold", "record")) {
    return {
      content: `Reading that sale…

4 cartons Malt: ${formatNaira(7200)}
Payment: Cash
Stock updated: 16 cartons remaining

Confirm and I will record it.`,
      chips: ["Yes, record it", "Edit the price"],
    };
  }

  if (has("stock", "inventory", "remaining", "how many")) {
    return {
      content: `Live stock: Ngozi Community Pharmacy

• Paracetamol 500mg: 340 packs
• Amoxicillin 250mg: 48 packs ⚠️ low
• Vitamin C 1000mg: 210 packs
• Coartem 20/120: 12 packs ⚠️ low
• 15 batches expire within 30 days

Want the expiry breakdown?`,
      chips: ["Show expiring batches", "Set a reorder level"],
    };
  }

  if (has("expir")) {
    return {
      content: `Near-expiry batches (30 days)

• Amoxicillin 250mg: batch A2291, 21 Apr, 18 packs
• Coartem 20/120: batch C8814, 29 Apr, 12 packs
• ORS sachets: batch O5510, 04 May, 96 sachets

Value at risk: ${formatNaira(180000)}

Put them on a clearance sale?`,
      chips: ["Yes, price the clearance", "Remind me in a week"],
    };
  }

  if (has("owe", "debt", "owing", "credit", "balance")) {
    return {
      content: `Overdue balances: 4 customers

• Emeka Okonkwo: ${formatNaira(24000)}, 3 days late
• Alhaji Musa: ${formatNaira(184000)}, 11 days late
• Blessing Stores: ${formatNaira(76000)}, 19 days late
• Dr. Chidi: ${formatNaira(25000)}, 2 days late

Total: ${formatNaira(309000)}

Shall I send reminders to all four?`,
      chips: ["Yes, send reminders", "Show only 10+ days"],
    };
  }

  if (has("10+", "ten days", "over ten")) {
    return {
      content: `Overdue by 10 days or more: 2 customers

• Alhaji Musa: ${formatNaira(184000)}, 11 days late
• Blessing Stores: ${formatNaira(76000)}, 19 days late

Total: ${formatNaira(260000)}

Shall I send reminders to both?`,
      chips: ["Yes, send reminders", "Who is owing me?"],
    };
  }

  if (has("remind")) {
    return {
      content: `Reminders queued ✉️

• Emeka Okonkwo: today, 6:00 pm
• Alhaji Musa: today, 6:00 pm
• Blessing Stores: today, 6:00 pm

I will tell you the moment any of them transfers.`,
      chips: ["Who is owing me?", "Send me today's report"],
    };
  }

  if (has("report", "summary", "profit", "today", "daily")) {
    return {
      content: `Daily summary: today so far

Sales: ${formatNaira(45200)}
Profit: ${formatNaira(12500)} (27.7%)
Transactions: 31
Cash: ${formatNaira(31200)} · Transfer: ${formatNaira(14000)}

Top seller: Paracetamol 500mg (9 packs)
Debt collected today: ${formatNaira(24000)}`,
      chips: ["Show me this week", "Check stock"],
    };
  }

  if (has("week", "month", "trend")) {
    return {
      content: `This week

Monday ${formatNaira(142000)}
Tuesday ${formatNaira(168000)}
Wednesday ${formatNaira(121000)}
Thursday ${formatNaira(196000)}
Friday ${formatNaira(174000)}

Week to date: ${formatNaira(801000)}
Best day: Thursday`,
      chips: ["Send me today's report", "Who is owing me?"],
    };
  }

  if (has("price", "plan", "cost", "subscription", "pay")) {
    return {
      content: `Plans

• Free: ₦0, 50 products, 100 transactions a month
• Trader: ₦3,500 a month
• Business: ₦8,500 a month
• Pharmacy: ₦15,000 a month

Your account is on Trial until 12 May. Reply TRADER and I will switch you over.`,
      chips: ["Switch to Trader", "Send me today's report"],
    };
  }

  if (has("trader", "upgrade", "switch")) {
    return {
      content: `Switched to TRADER ✅

Unlimited products and transactions, the full debt ledger with automatic reminders, and your daily summary at 8:00 pm every evening.`,
      chips: ["Send me today's report", "Check stock"],
    };
  }

  if (has("help", "what can you do", "menu", "option")) {
    return {
      content: `I can do four things well:

1. Record a sale or a purchase from a voice note, photo or message
2. Tell you your live stock, including what is about to expire
3. Track who owes you and chase them automatically
4. Send your daily, weekly and monthly numbers

Say "check my stock" and I will show you.`,
      chips: ["Record a sale", "Check stock", "Who is owing me?"],
    };
  }

  return {
    content: `I did not catch that one.

Try asking me to record a sale, check stock, chase a debt or send today's report, or tap one of the options below.`,
    chips: ["Record a sale", "Check stock", "Who is owing me?", "Send me today's report"],
  };
}

const INITIAL_MESSAGES: WaMessage[] = [
  {
    id: "seed-1",
    role: "system",
    content: "Today",
    timestamp: new Date(),
  },
  {
    id: "seed-2",
    role: "peer",
    content:
      "Welcome back, Ngozi 👋\n\nYesterday's sales were ₦184,500 and 8 products are running low. What would you like to do?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
];

/* -------------------------------------------------------------- the panel */

export function WhatsAppDemo() {
  const [messages, setMessages] = useState<WaMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  // Clear any pending bot timer if the panel unmounts mid-typing.
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  // The feature list rotates on its own until the visitor picks one.
  useEffect(() => {
    const interval = setInterval(
      () => setActiveFeature((prev) => (prev + 1) % SUPPORT_FEATURES.length),
      4200,
    );
    return () => clearInterval(interval);
  }, []);

  const ask = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId("self"), role: "self", content: trimmed, timestamp: new Date() },
    ]);
    setInput("");
    setIsTyping(true);

    // Two beats: a short pause before the typing bubble, then the answer, so the
    // exchange reads like a conversation rather than an instant form submit.
    const reply = replyTo(trimmed);
    const timer = setTimeout(
      () => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: nextId("peer"), role: "peer", content: reply.content, timestamp: new Date() },
        ]);
      },
      700 + Math.min(reply.content.length * 6, 1400),
    );

    timers.current.push(timer);
  }, []);

  const handleSubmit = (event: ChatSubmitEvent) => {
    event.preventDefault();
    ask(event.message);
  };

  /**
   * Back to the opening state.
   *
   * Any reply that is already in flight is cancelled first: leaving the timer
   * running let a scripted answer land on top of a freshly emptied thread, which
   * looks like the reset did not work.
   */
  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setIsTyping(false);
    setInput("");
    setActiveFeature(0);
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <section id="whatsapp" aria-label="WhatsApp demo">
      <SectionContainer>
        {/**
         * `min-w-0` on both columns.
         *
         * A grid item's automatic minimum size is its min-content size, and the
         * chat panel's min-content is set by things that cannot shrink: the
         * composer's textarea carries a default `cols` width, and the app bar
         * holds a fixed-size avatar and a pair of icons. At 320px that came to
         * about 308px against 280px of available space, so the single implicit
         * column grew past the viewport and the whole document scrolled
         * sideways. Zeroing the automatic minimum lets the track stay at the
         * container width; the panel is `w-full`, so it follows.
         */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
          {/* ------------------------------------------------------- copy */}
          <div className="min-w-0">
            <Reveal>
              <SectionHeading
                align="start"
                badge="WhatsApp integration"
                badgeIcon={<Sparkles className="size-3.5" />}
                title="Your business, now on WhatsApp"
                subtitle="Run the whole business through the app you already open a hundred times a day. No download, no new password, no training. Type into the demo on the right, it answers."
              />
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {SUPPORT_FEATURES.map(({ icon: Icon, title, description, prompt }, index) => {
                const active = index === activeFeature;
                return (
                  <motion.button
                    key={title}
                    type="button"
                    onClick={() => {
                      setActiveFeature(index);
                      ask(prompt);
                    }}
                    animate={{ scale: active ? 1.015 : 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="text-left"
                  >
                    <GlassCard
                      intensity="card"
                      className={cn(
                        "flex h-full items-start gap-3 p-4 transition-colors duration-300",
                        active ? "border-primary/40 bg-primary/8" : "hover:border-white/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-colors",
                          active
                            ? "border-primary/40 bg-primary/20 text-primary-ink"
                            : "border-white/15 bg-white/5 text-foreground/70",
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold">{title}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {description}
                        </span>
                        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-primary-ink">
                          Try it
                          <ArrowRight className="size-3" aria-hidden />
                        </span>
                      </span>
                    </GlassCard>
                  </motion.button>
                );
              })}
            </div>

            <Reveal delay={0.12} className="mt-6">
              <p className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden />
                This demo runs entirely in your browser against a scripted assistant, so the figures
                it returns are examples. A real account answers from your own books.
              </p>
            </Reveal>
          </div>

          {/* ------------------------------------------------------ the app */}
          <Reveal delay={0.08} y={28} className="min-w-0">
            <div className="relative mx-auto w-full max-w-[32rem]">
              <div
                className="liquid-blob left-[-12%] top-[6%] h-[18rem] w-[18rem] bg-primary/25"
                aria-hidden
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-wa-panel shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">                    {/* App bar */}
                <div className="flex items-center gap-3 border-b border-black/40 bg-wa-panel px-4 py-3">
                  {/* The product's own face in the thread, as a customer sees it. */}
                  <BrandAvatar />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-wa-text">Oga Plug</p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={isTyping ? "typing" : "online"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={cn(
                          "truncate text-[11px]",
                          isTyping ? "text-primary-ink" : "text-wa-meta",
                        )}
                      >
                        {isTyping ? "typing…" : "online"}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <span className="flex items-center gap-4 text-wa-meta">
                    <Video className="size-4.5" aria-hidden />
                    <Phone className="size-4" aria-hidden />
                  </span>
                </div>

                {/* The chat itself. `chat.tsx` owns scrolling, the submit event
                    and the multiline composer; `wa-console` repoints the bubble
                    palette in globals.css. */}
                <Chat onSubmit={handleSubmit}>
                  <div className="wa-console contents">
                    {/*
                      `no-scrollbar`, not `custom-scrollbar`: the green bar was
                      pure noise next to a conversation that scrolls itself.
                    */}
                    <ChatViewport
                      className={cn(
                        "wa-wallpaper no-scrollbar h-[27rem] rounded-none border-0 bg-transparent px-3.5",
                      )}
                    >
                      <ChatMessages className="w-full">
                        {messages.map((message) => {
                          if (message.role === "system") {
                            return (
                              <ChatMessageRow key={message.id} variant="system" className="my-3">
                                <ChatMessageBubble className="mx-auto rounded-full bg-black/40 px-3 py-1 text-[11px] text-wa-meta">
                                  {message.content}
                                </ChatMessageBubble>
                              </ChatMessageRow>
                            );
                          }

                          const outgoing = message.role === "self";

                          return (
                            <ChatMessageRow key={message.id} variant={message.role} className="my-2.5">
                              {/*
                                The dark mark needs a light ground: on the chat's
                                own slate circle it disappeared entirely.
                              */}
                              {!outgoing ? (
                                <ChatMessageAvatar
                                  data-slot="wa-avatar"
                                  className="size-7 self-start bg-[linear-gradient(140deg,#2ee06f,#17a552)]"
                                  src="/brand-mark.png"
                                  fallback="OP"
                                  alt="Oga Plug"
                                />
                              ) : null}

                              <ChatMessageBubble
                                data-slot="wa-bubble"
                                className="max-w-[85%] rounded-2xl text-[13px] leading-relaxed shadow-sm"
                              >
                                {message.content}
                              </ChatMessageBubble>

                              <ChatMessageAddon
                                align="inline"
                                className="self-end pb-1 text-[10px] text-wa-meta"
                              >
                                <ChatMessageTime
                                  dateTime={message.timestamp}
                                  className="text-[10px] text-wa-meta"
                                />
                                {outgoing ? (
                                  <CheckCheck className="size-3.5 text-sky-400" aria-label="Read" />
                                ) : null}
                              </ChatMessageAddon>
                            </ChatMessageRow>
                          );
                        })}

                        {isTyping ? (
                          <ChatMessageRow variant="peer" className="my-2.5">
                            <ChatMessageAvatar
                              data-slot="wa-avatar"
                              className="size-7 self-start bg-[linear-gradient(140deg,#2ee06f,#17a552)]"
                              src="/brand-mark.png"
                              fallback="OP"
                              alt="Oga Plug"
                            />
                            <ChatMessageBubble
                              data-slot="wa-bubble"
                              className="flex items-center gap-1 rounded-2xl px-4 py-3"
                            >
                              {[0, 1, 2].map((dot) => (
                                <span
                                  key={dot}
                                  className="typing-dot size-1.5 rounded-full bg-wa-meta"
                                  style={{ animationDelay: `${dot * 0.15}s` }}
                                />
                              ))}
                              <span className="sr-only">Oga Plug is typing</span>
                            </ChatMessageBubble>
                          </ChatMessageRow>
                        ) : null}
                      </ChatMessages>

                      {/*
                        Suggested replies, in the thread. They keep a 40px hit
                        area rather than the 31px a `py-1.5` chip produces, and
                        they scroll sideways on one line so they never add
                        wrapping to a narrow panel.
                      */}
                      <div className="no-scrollbar mt-3 flex shrink-0 gap-2 overflow-x-auto pb-1">
                        {QUICK_REPLIES.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => ask(chip)}
                            className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-white/15 bg-black/30 px-3.5 text-[11px] font-semibold text-wa-text/85 transition-colors hover:border-primary/40 hover:text-primary-ink"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </ChatViewport>

                    {/* Composer, the panel's only input */}
                    <div className="border-t border-black/30 bg-wa-panel px-3 py-3">
                      <ChatInputArea className="h-auto items-end rounded-3xl border-white/10 bg-wa-input text-base text-wa-text md:text-[13px] dark:bg-wa-input">
                        {/*
                          `self-center`, because the group aligns its children to
                          the bottom (`items-end`) so the send button stays put
                          when the field grows: without this the cart icon rode
                          the baseline of the first line instead of the middle of
                          the pill.
                        */}
                        <span className="flex size-9 shrink-0 items-center justify-center self-center rounded-full text-wa-meta">
                          <ShoppingCart className="size-5" aria-hidden />
                        </span>
                        <ChatInputField
                          multiline
                          value={input}
                          onChange={(event) => setInput(event.target.value)}
                          placeholder="Message"
                          aria-label="Message Oga Plug"
                          /* The control keeps `flex-1` from the primitive, but
                             nothing in the chain sets its minimum width, so a
                             long message could still push the row open. */
                          className="min-w-0 text-wa-text placeholder:text-wa-meta"
                        />
                        <ChatInputSubmit
                          disabled={!input.trim()}
                          /*
                           * `has-[>button]:mr-0` cancels the addon's own
                           * `has-[>button]:mr-[-0.45rem]`. That negative margin
                           * is tuned for shadcn's small `xs` button inside a
                           * 36px group; this composer's button is the full
                           * height of the field, so the pull made the whole row
                           * wider than the frame it sits in. The variant
                           * prefix has to be repeated for the override to take
                           * effect: a bare `mr-0` loses to the `:has()`
                           * selector on specificity.
                           */
                          className="has-[>button]:mr-0 bg-[hsl(168_84%_34%)] text-white hover:bg-[hsl(168_84%_38%)]"
                        >
                          <Send className="size-4" aria-hidden />
                          <span className="sr-only">Send message</span>
                        </ChatInputSubmit>
                      </ChatInputArea>

                      <div className="mt-2 flex items-center justify-between gap-3 px-1 text-[10px] text-wa-meta">
                        <span className="inline-flex min-w-0 items-center gap-1.5">
                          <BadgeDollarSign className="size-3.5 shrink-0" aria-hidden />
                          <span className="truncate">Figures shown are examples</span>
                        </span>

                        {/*
                          The demo scripts its own answers, so once a visitor has
                          worked through a few they need a way back to the
                          opening state. It clears the pending reply timer as
                          well, so a reset mid-typing does not let the old
                          answer land on the fresh thread.
                        */}
                        <button
                          type="button"
                          onClick={reset}
                          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-[10px] font-bold uppercase tracking-wide text-wa-meta transition-colors hover:border-primary/35 hover:text-primary-ink"
                        >
                          <RotateCcw className="size-3" aria-hidden />
                          Reset demo
                        </button>
                      </div>
                    </div>
                  </div>
                </Chat>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}

export default WhatsAppDemo;
