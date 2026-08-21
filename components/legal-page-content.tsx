'use client';

import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { localizePath, type Locale, type SiteContent } from '@/lib/i18n';

type LegalPageContentProps = {
  locale: Locale;
  content: SiteContent;
  page: 'privacyPage' | 'termsPage';
};

export function LegalPageContent({
  locale,
  content,
  page,
}: LegalPageContentProps) {
  const pageContent = content[page];

  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      <section className="px-4 pb-20 pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {pageContent.badge}
          </p>
          <h1 className="mb-5 font-display text-4xl text-heading md:text-5xl">
            {pageContent.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-foreground/85 md:text-lg">
            {pageContent.intro}
          </p>

          <div className="mt-10 border border-border bg-card p-6 sm:p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5 text-sm text-muted-foreground">
              <span>
                {pageContent.lastUpdatedLabel}: {pageContent.lastUpdatedDate}
              </span>
              <Link
                href={localizePath('/', locale)}
                className="text-heading transition-opacity hover:opacity-70"
              >
                {pageContent.backToHomepageLabel}
              </Link>
            </div>

              {page === 'termsPage' ? (
                <div className="space-y-8">
                  {content.termsPage.sections.map((section) => (
                    <section key={section.title} className="space-y-3">
                      <h2 className="font-display text-2xl text-heading">{section.title}</h2>
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-muted-foreground md:text-base">
                          {paragraph}
                        </p>
                      ))}
                      {section.bullets ? (
                        <ul className="list-disc space-y-2 pl-6 text-sm leading-7 text-muted-foreground md:text-base">
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.values(content.privacyPage.sections).map((section) => (
                    <section key={section.title} className="space-y-3">
                      <h2 className="font-display text-2xl text-heading">{section.title}</h2>
                      {'intro' in section && section.intro ? (
                        <p className="text-sm leading-7 text-muted-foreground md:text-base">{section.intro}</p>
                      ) : null}
                      {section.bullets ? (
                        <ul className="list-disc space-y-2 pl-6 text-sm leading-7 text-muted-foreground md:text-base">
                          {section.bullets.map((bullet) =>
                            typeof bullet === 'string' ? (
                              <li key={bullet}>{bullet}</li>
                            ) : (
                              <li key={`${bullet.label}-${bullet.text}`}>
                                <strong className="text-foreground">{bullet.label}</strong> {bullet.text}
                              </li>
                            )
                          )}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
