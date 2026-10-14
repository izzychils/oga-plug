import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail, MessageCircle, ShieldCheck, User } from "lucide-react";

import { AuthField, AuthLayout, AuthNotice, AuthSubmit } from "@/components/layout/auth-layout";
import { ROUTES } from "@/lib/routes";
import { waLink } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignUpErrors = {
  name?: string;
  email?: string;
  password?: string;
  terms?: string;
};

/**
 * Creating an account.
 *
 * Three fields and a checkbox, on purpose: every extra row is height on a phone
 * screen, and this page has to fit one viewport without scrolling. Everything
 * else the business needs — the shop name, the product list — is captured inside
 * the WhatsApp onboarding once there is a number to attach it to.
 */
export function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [note, setNote] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const next: SignUpErrors = {};
    if (!name.trim()) {
      next.name = "Tell us your name.";
    }
    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "That email address does not look right.";
    }
    if (!password) {
      next.password = "Choose a password.";
    } else if (password.length < 8) {
      next.password = "Use at least 8 characters.";
    }
    if (!acceptedTerms) {
      next.terms = "Please accept the terms to continue.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setNote(null);
      return;
    }

    /*
     * No account service is connected yet. Rather than faking a signup, the page
     * points at the WhatsApp onboarding that already exists, which is how the
     * first customers are actually being set up.
     */
    setNote("Accounts are not live yet — start on WhatsApp and we will set your business up.");
  };

  return (
    <AuthLayout
      badge="Create account"
      railTitle={
        <>
          Start with WhatsApp, <span className="text-primary-ink">grow into the dashboard</span>
        </>
      }
      railLede="Set up a login now and your sales, stock and debt records will be waiting in the web console whenever you want the bigger picture."
      points={[
        { icon: MessageCircle, text: "Onboard in the chat you already use, no new app to learn." },
        { icon: ShieldCheck, text: "One account for every operator in the business." },
        { icon: Lock, text: "Free to start; the paid plans are opt-in." },
      ]}
      title="Create your account"
      subtitle="Free to start. No card, no download."
      aside={
        <p className="text-xs leading-relaxed text-muted-foreground">
          Already selling with us?{" "}
          <a
            href={waLink("Hi, I want to create an Oga Plug account")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-ink hover:underline"
          >
            Start on WhatsApp
          </a>{" "}
          and we will set the account up with you.
        </p>
      }
      altAction={
        <>
          Already have an account?{" "}
          <Link to={ROUTES.signIn} className="font-semibold text-primary-ink hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="grid gap-3.5" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="signup-name"
          label="Full name"
          icon={User}
          value={name}
          onChange={setName}
          placeholder="Your name"
          autoComplete="name"
          error={errors.name}
        />

        <AuthField
          id="signup-email"
          label="Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={setEmail}
          placeholder="you@business.com"
          autoComplete="email"
          error={errors.email}
        />

        <AuthField
          id="signup-password"
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={setPassword}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password}
        />

        <div className="grid gap-1.5">
          <label className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              aria-invalid={Boolean(errors.terms)}
              className="mt-0.5 size-4 shrink-0 accent-[hsl(var(--primary))]"
            />
            <span>
              I agree to the{" "}
              <Link to={ROUTES.termsOfUse} className="font-semibold text-primary-ink hover:underline">
                terms of use
              </Link>{" "}
              and the{" "}
              <Link to={ROUTES.privacy} className="font-semibold text-primary-ink hover:underline">
                privacy policy
              </Link>
              .
            </span>
          </label>
          {errors.terms ? <p className="text-xs font-medium text-destructive">{errors.terms}</p> : null}
        </div>

        <AuthSubmit icon={<ArrowRight className="size-4" aria-hidden />}>Create account</AuthSubmit>
      </form>

      {note ? <AuthNotice>{note}</AuthNotice> : null}
    </AuthLayout>
  );
}

export default SignUpPage;
