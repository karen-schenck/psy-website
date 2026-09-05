"use client"

import { SiteShell } from "@/components/shared/site-shell"
import { PageHeader } from "@/components/shared/page-header"
import { BookingCta } from "@/components/landing/booking-cta"
import { Reveal } from "@/components/shared/reveal"
import { useLandingContent } from "@/components/providers/landing-content-provider"

export function PracticeContent() {
  const { content, locale } = useLandingContent()
  const { practicePage } = content

  return (
    <SiteShell>
      <PageHeader
        eyebrow={practicePage.badge}
        title={practicePage.title}
        intro={practicePage.intro}
      />

      {/* The approaches, in the same numbered grid the one-pager uses. */}
      <section className="site-container py-14 lg:py-20">
        <Reveal className="site-panel-strong p-6 sm:p-10 lg:p-14">
          <h2 className="mb-10 max-w-[20ch] font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-[1.16] text-heading">
            {practicePage.modalitiesTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {practicePage.modalities.map((modality, index) => (
              <Reveal key={modality.title} delay={index * 80}>
                <article className="flex h-full flex-col gap-4 rounded-2xl bg-shell p-7 lg:p-8">
                  <span aria-hidden="true" className="font-display text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg leading-snug text-heading">{modality.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-foreground/75">
                    {modality.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Journey and first session, beside the cabinet photograph. */}
      <section className="site-container pb-14 lg:pb-20">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-x-[clamp(2.5rem,5vw,6rem)]">
          <Reveal className="lg:sticky lg:top-28">
            <div
              role="img"
              aria-label={practicePage.imageAlt}
              className="aspect-[4/5] rounded-[var(--radius-panel)] bg-panel bg-cover bg-center shadow-[0_30px_60px_-40px_rgba(63,83,107,0.7)]"
              style={{ backgroundImage: `url(${practicePage.imageSrc})` }}
            />
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={100}>
              <div className="rounded-2xl bg-panel p-7 lg:p-10">
                <h2 className="mb-4 font-display text-xl text-heading sm:text-2xl">
                  {practicePage.journey.title}
                </h2>
                {practicePage.journey.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-4 text-[15px] leading-relaxed text-foreground/85 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="rounded-2xl bg-panel p-7 lg:p-10">
                <h2 className="mb-4 font-display text-xl text-heading sm:text-2xl">
                  {practicePage.firstSession.title}
                </h2>
                {practicePage.firstSession.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-4 text-[15px] leading-relaxed text-foreground/85 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <BookingCta
        locale={locale}
        eyebrow={content.home.booking.eyebrow}
        title={content.home.booking.title}
        description={content.home.booking.description}
        ctaLabel={practicePage.firstSession.ctaLabel}
        ctaHref={practicePage.firstSession.ctaHref}
      />
    </SiteShell>
  )
}
