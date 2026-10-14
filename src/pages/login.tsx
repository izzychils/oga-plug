import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail, ShieldCheck, TrendingUp } from "lucide-react";

import { AuthField, AuthLayout, AuthNotice, AuthSubmit } from "@/components/layout/auth-layout";
import { ROUTES } from "@/lib/routes";
import { waLink } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginErrors = {
  email?: string;
  password?: string;
};

/**
 * Signing in.
 *
 * Sized to one screen: on a phone the whole form — both fields, the button and
 * the link to the other screen — is visible without scrolling, which is why the
 * page renders outside the site header and footer (see `App.tsx`).
 */
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [note, setNote] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const next: LoginErrors = {};
    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "That email address does not look right.";
    }
    if (!password) {
      next.password = "Enter your password.";
    } else if (password.length < 8) {
      next.password = "Passwords are at least 8 characters.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setNote(null);
      return;
    }

    /*
     * No account service is connected to this site yet, so the page says so
     * plainly rather than pretending the details were accepted. Swap this line
     * for the real sign-in call when the backend exists.
     */
    setNote("Accounts are not live yet — start on WhatsApp and we will set your business up.");
  };

  return (
    <AuthLayout
      badge="Sign in"
      railTitle={
        <>
          Your business, <span className="text-primary-ink">wherever you left it</span>
        </>
      }
      railLede="The same ledger of sales, stock and debts follows you from the phone in your pocket to the laptop in the back office."
      points={[
        { icon: ShieldCheck, text: "Your records stay tied to your account, not to one handset." },
        { icon: TrendingUp, text: "Pick up today's sales, stock levels and who still owes you." },
        { icon: Lock, text: "Encrypted in transit and at rest, like the rest of Oga Plug." },
      ]}
      title="Sign in"
      subtitle="Use the details your business is registered with."
      aside={
        <p className="text-xs leading-relaxed text-muted-foreground">
          Prefer chatting?{" "}
          <a
            href={waLink("Hi, I need help signing in")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-ink hover:underline"
          >
            Message us on WhatsApp
          </a>{" "}
          and we will sort it out.
        </p>
      }
      altAction={
        <>
          New to Oga Plug?{" "}
          <Link to={ROUTES.signUp} className="font-semibold text-primary-ink hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="grid gap-3.5" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="signin-email"
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
          id="signin-password"
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={setPassword}
          placeholder="Your password"
          autoComplete="current-password"
          error={errors.password}
        />

        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(event) => setKeepSignedIn(event.target.checked)}
              className="size-4 accent-[hsl(var(--primary))]"
            />
            Keep me signed in
          </label>
          <a
            href={waLink("Hi, I forgot my Oga Plug password")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-primary-ink hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <AuthSubmit icon={<ArrowRight className="size-4" aria-hidden />}>Sign in</AuthSubmit>
      </form>

      {note ? <AuthNotice>{note}</AuthNotice> : null}
    </AuthLayout>
  );
}

export default LoginPage;
