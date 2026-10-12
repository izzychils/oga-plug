import type { ReactNode } from "react";
import { CalendarClock, FileText } from "lucide-react";

import { Link } from "react-router-dom";

import {
  ContentCard,
  LegalSection,
  PageBody,
  PageHero,
} from "@/components/layout/page-shell";
import { SITE } from "@/lib/site";

/**
 * A legal document.
 *
 * The three policy pages share one layout so they cannot drift apart: the same
 * heading treatment, the same numbered sections, the same "last updated" line,
 * and the same table of contents. The contents rail is not decoration: these
 * documents are long, and a reader looking for the retention clause should be
 * able to jump straight to it on a phone as easily as on a desktop.
 */

export type LegalDocSection = {
  title: string;
  /** Paragraphs of the section. */
  paras?: ReactNode[];
  /** Sub-points, rendered as a ticked list. */
  bullets?: ReactNode[];
  /** A closing paragraph, set apart from the numbered points. */
  note?: ReactNode;
  /** A table or other block that belongs inside the section, after its list. */
  extra?: ReactNode;
};

export function LegalPage({
  badge,
  title,
  lede,
  sections,
  contactEmail,
  children,
}: {
  badge: string;
  title: string;
  lede: string;
  sections: LegalDocSection[];
  /** Where a reader should write about this document. */
  contactEmail: string;
  /** Extra blocks rendered after the numbered sections. */
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero
        narrow
        badge={badge}
        title={title}
        lede={lede}
        meta={
          <>
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="size-3.5" aria-hidden />
              Last updated {SITE.legalUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="size-3.5" aria-hidden />
              {SITE.company}
            </span>
          </>
        }
      />

      <PageBody narrow>
        <nav
          aria-label="On this page"
          className="mb-10 rounded-2xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5"
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary-ink">
            On this page
          </p>
          <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.title}>
                {/*
                  A contents row is a real control: 36px tall, and the whole row
                  is the target rather than the words inside it. These documents
                  are long, and on a phone the contents rail is how a reader
                  reaches the clause they came for.
                */}
                <a
                  href={`#section-${index + 1}`}
                  className="flex min-h-9 items-baseline gap-2 rounded-lg py-2 text-sm text-foreground/70 transition-colors hover:text-primary-ink"
                >
                  <span className="tabular-nums text-muted-foreground">
                    {index + 1}.
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <ContentCard>
          <article className="space-y-7">
            {sections.map((section, index) => (
              <LegalSection key={section.title} index={index + 1} title={section.title}>
                {section.paras?.map((para, i) => <p key={i}>{para}</p>)}

                {section.bullets ? (
                  <ul className="space-y-2">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.extra}

                {section.note ? (
                  <p className="text-[15px] text-white/70 sm:text-base">{section.note}</p>
                ) : null}
              </LegalSection>
            ))}
          </article>
        </ContentCard>

        {children}

        {/*
          The closing ask is a pair of controls, not two links buried in a
          sentence: both are the only way off this document, and an 18px-tall
          inline link is not something to aim a thumb at.
        */}
        <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.04] p-4 sm:p-5">
          <p className="text-sm text-muted-foreground">Questions about this document?</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-foreground/85 transition-colors hover:border-primary/35 hover:text-primary-ink"
            >
              Contact us
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex min-h-11 items-center rounded-full border border-primary/25 bg-primary/10 px-4 text-sm font-semibold text-primary-ink transition-colors hover:bg-primary/15"
            >
              {contactEmail}
            </a>
          </div>
        </div>
      </PageBody>
    </>
  );
}

export default LegalPage;
