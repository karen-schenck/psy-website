"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { BookingCta } from "@/components/landing/booking-cta"
import { EditorialImage } from "@/components/practice/editorial-image"
import { OrganicBlobs } from "@/components/landing/organic-blobs"
import { Reveal } from "@/components/shared/reveal"
import { useLandingContent } from "@/components/providers/landing-content-provider"

export function PracticeContent() {
  const { content, locale } = useLandingContent()
  const { practicePage } = content

  return (
    <main className="relative min-h-screen bg-background">
      <Header />

      <section className="site-gutter relative overflow-hidden pb-16 pt-28">
        <OrganicBlobs variant="soft" className="opacity-45" />
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center lg:gap-[clamp(2.5rem,5vw,7rem)]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {practicePage.badge}
            </p>
            <h1 className="mb-6 font-display text-4xl text-heading md:text-5xl">
              {practicePage.title}
            </h1>
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              {practicePage.intro}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="animate-float-slow">
              <EditorialImage
                src={practicePage.imageSrc}
                alt={practicePage.imageAlt}
                ratio="4 / 5"
                className="shadow-[0_24px_60px_-28px_rgba(63,83,107,0.3)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="site-gutter grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-[clamp(2.5rem,5vw,7rem)]">
          <Reveal className="hidden lg:block">
            <EditorialImage
              src="/images/pratique-outils.webp"
              alt="Bibliothèque de livres de thérapie et rameau dans un vase, ambiance de cabinet"
              ratio="4 / 5"
            />
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mb-10 font-display text-2xl text-heading sm:text-3xl">
              {practicePage.modalitiesTitle}
            </h2>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {practicePage.modalities.map((modality) => (
                <div key={modality.title} className="bg-background p-7 transition-colors hover:bg-secondary/50 sm:p-8">
                  <h3 className="mb-3 font-display text-xl text-foreground">{modality.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{modality.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-16 lg:py-24">
        <Reveal className="mx-auto max-w-[46rem] px-5 sm:px-8">
          <h2 className="mb-5 font-display text-2xl text-heading sm:text-3xl">
            {practicePage.journey.title}
          </h2>
          {practicePage.journey.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-4 text-base leading-relaxed text-foreground/85">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <Reveal className="mx-auto max-w-[46rem] px-5 sm:px-8">
          <h2 className="mb-5 font-display text-2xl text-heading sm:text-3xl">
            {practicePage.firstSession.title}
          </h2>
          {practicePage.firstSession.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-4 text-base leading-relaxed text-foreground/85">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      <BookingCta
        locale={locale}
        title={practicePage.firstSession.title}
        description={practicePage.firstSession.paragraphs[0]}
        ctaLabel={practicePage.firstSession.ctaLabel}
        ctaHref={practicePage.firstSession.ctaHref}
      />

      <Footer />
    </main>
  )
}
