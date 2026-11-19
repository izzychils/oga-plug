import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, X } from "lucide-react";

import { BrandAvatar } from "@/components/brand/logo";
import { WHATSAPP } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The WhatsApp lead gate.
 *
 * WhatsApp is the product's front door, and an unanswered chat is a lost
 * sign-up: nobody learns the business name, the market or what the person
 * actually sells before the conversation starts. Every `wa.me` link on the site
 * is intercepted here, the visitor answers four short questions, and the
 * answers travel with them into the chat as a pre-filled message.
 *
 * The interception is a capture-phase listener on the document rather than a
 * wrapper around each link. There are more than a dozen WhatsApp links across
 * the header, hero, pricing, footer, floating dock and auth screens, and a
 * wrapper has to be remembered on every new one. This way a link added later is
 * gated automatically.
 */

const STORAGE_KEY = "oga.whatsapp.lead";

const BUSINESS_TYPES = [
  "Retail shop",
  "Provision / supermarket",
  "Pharmacy",
  "Wholesale / distributor",
  "Restaurant / food",
  "Services",
  "Something else",
] as const;

type Lead = {
  name: string;
  business: string;
  type: string;
  phone: string;
  note: string;
  at: string;
};

/**
 * The message a link was going to send, e.g. "Hi, I need help signing in".
 * The lead form keeps it so the chat still opens on the right subject.
 */
function intentFrom(href: string) {
  try {
    return new URL(href, window.location.origin).searchParams.get("text")?.trim() || "Hi";
  } catch {
    return "Hi";
  }
}

export function WhatsAppGateProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"]',
      );
      if (!anchor) return;
      event.preventDefault();
      event.stopPropagation();
      setTarget(anchor.getAttribute("href"));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      {children}
      <GateDialog target={target} onClose={() => setTarget(null)} />
    </>
  );
}

/* ------------------------------------------------------------------ dialog */

function GateDialog({ target, onClose }: { target: string | null; onClose: () => void }) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [type, setType] = useState<string>(BUSINESS_TYPES[0]);
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  const firstField = useRef<HTMLInputElement>(null);
  const open = target !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => firstField.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanBusiness = business.trim();
    const cleanPhone = phone.trim();

    if (cleanName.length < 2) {
      setError("Enter your name so the team knows who they are talking to.");
      return;
    }
    if (cleanBusiness.length < 2) {
      setError("Enter your business name.");
      return;
    }
    if (cleanPhone.replace(/\D/g, "").length < 10) {
      setError("Enter the WhatsApp number we should reply on.");
      return;
    }

    setError(null);

    const lead: Lead = {
      name: cleanName,
      business: cleanBusiness,
      type,
      phone: cleanPhone,
      note: note.trim(),
      at: new Date().toISOString(),
    };

    /*
     * There is no backend in this build, so the lead is kept locally: it is the
     * record of what was asked, and it is what the pre-filled message is built
     * from. Nothing is silently discarded.
     */
    try {
      const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as Lead[];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing.slice(-19), lead]));
    } catch {
      /* private mode: carry on, the chat still opens */
    }

    const intent = intentFrom(target ?? "");
    const message = [
      `Hi, I'm ${lead.name} from ${lead.business}.`,
      `${lead.type} · ${lead.phone}`,
      lead.note || (intent === "Hi" ? "I'd like to start with Oga Plug." : intent),
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP.e164}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-gate-title"
            aria-describedby="wa-gate-copy"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="overlay-sheet relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/12 bg-[#0a1210] shadow-2xl shadow-black/60 sm:rounded-3xl"
          >
            <div className="flex items-start gap-3 border-b border-white/10 px-5 py-4">
              <BrandAvatar size="sm" />
              <div className="min-w-0 flex-1">
                <p id="wa-gate-title" className="text-sm font-bold text-foreground">
                  Before we open WhatsApp
                </p>
                <p id="wa-gate-copy" className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                  Four quick details so the team replies with the right setup for your business.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close form"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <form onSubmit={submit} className="px-5 py-5" noValidate>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Your name" htmlFor="wa-name">
                  <input
                    ref={firstField}
                    id="wa-name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    placeholder="Emeka Okafor"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Business name" htmlFor="wa-business">
                  <input
                    id="wa-business"
                    name="business"
                    value={business}
                    onChange={(event) => setBusiness(event.target.value)}
                    autoComplete="organization"
                    placeholder="Emeka General Stores"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="WhatsApp number" htmlFor="wa-phone">
                  <input
                    id="wa-phone"
                    name="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0803 000 0000"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Business type" htmlFor="wa-type">
                  <select
                    id="wa-type"
                    name="type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    className={cn(inputClass, "appearance-none pr-8")}
                  >
                    {BUSINESS_TYPES.map((option) => (
                      <option key={option} value={option} className="bg-[#0a1210]">
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-3">
                <Field
                  label="What do you want to sort out first?"
                  htmlFor="wa-note"
                  hint="Optional"
                >
                  <textarea
                    id="wa-note"
                    name="note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                    placeholder="Stock for two shops, and customers who owe me."
                    className={cn(inputClass, "min-h-[76px] resize-none py-2.5")}
                  />
                </Field>
              </div>

              {error ? (
                <p role="alert" className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11.5px] text-red-200">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-[1.01]"
              >
                <MessageCircle className="size-4" aria-hidden />
                Continue to WhatsApp
                <ArrowRight className="size-4" aria-hidden />
              </button>

              <p className="mt-3 flex items-start gap-1.5 text-[10.5px] leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary-ink" aria-hidden />
                Your details are used to answer this enquiry only. No marketing messages, no
                sharing with third parties.
              </p>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3 text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white/[0.06]";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-center justify-between text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground"
      >
        {label}
        {hint ? <span className="font-normal normal-case tracking-normal">{hint}</span> : null}
      </label>
      {children}
    </div>
  );
}
