import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollManager } from "@/components/layout/scroll-manager";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { HomePage } from "@/pages/home";
import { ROUTES } from "@/lib/routes";

/**
 * Every page except the landing page is split out.
 *
 * The marketing page is what most visitors arrive for and what the first paint
 * has to be fast on: this ships to low-cost Android phones on Nigerian mobile
 * data. The three legal documents alone are several thousand words of prose
 * that the home page never renders, so making the browser download and parse
 * them before the hero can paint is the wrong trade. The home page stays eager
 * so there is no fallback flash on the route that matters most.
 */
const AboutPage = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contact"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy"));
const TermsOfUsePage = lazy(() => import("@/pages/terms-of-use"));
const TermsAndConditionsPage = lazy(() => import("@/pages/terms-and-conditions"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

/** The placeholder while a split route is fetched. Sized like a page header so
 * the layout does not jump when the real content lands. */
function RouteFallback() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-6" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div className="h-8 w-40 animate-pulse rounded-full bg-white/10" />
      <div className="mt-6 h-11 w-3/4 animate-pulse rounded-2xl bg-white/10" />
      <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded-full bg-white/8" />
    </div>
  );
}

/**
 * The application shell.
 *
 * Three fixed background layers sit behind everything, all declared in
 * globals.css, so every frosted panel above them has something real to blur:
 * `app-surface::before` is the brand wash, `.ambient-streaks` the raking light,
 * and `app-surface::after` the dot grid and grain. `app-ambient` carries the ink
 * gradient at the base of the stack.
 *
 * The header, the footer and the floating chat button live outside `Routes` so
 * they persist across navigation, and `ScrollManager` is mounted inside the
 * router because it is the only component that needs the current location.
 */
export function App() {
  return (
    <BrowserRouter>
      <ScrollManager />

      <div className="app-surface app-ambient relative flex min-h-dvh flex-col">
        <div className="ambient-streaks" aria-hidden />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path={ROUTES.home} element={<HomePage />} />
              <Route path={ROUTES.about} element={<AboutPage />} />
              <Route path={ROUTES.contact} element={<ContactPage />} />
              <Route path={ROUTES.privacy} element={<PrivacyPolicyPage />} />
              <Route path={ROUTES.termsOfUse} element={<TermsOfUsePage />} />
              <Route path={ROUTES.termsAndConditions} element={<TermsAndConditionsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        <SiteFooter />
        <WhatsAppFab />
      </div>
    </BrowserRouter>
  );
}

export default App;
