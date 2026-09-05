"use client"

import Link from "next/link"
import { Brain, Flame, Users, Compass, ArrowRight } from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { BookingCta } from "@/components/landing/booking-cta"
import { OrganicBlobs } from "@/components/landing/organic-blobs"
import { Reveal } from "@/components/shared/reveal"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { localizePath } from "@/lib/i18n"

const ICONS = { anxiete: Brain, "burn-out": Flame, "difficultes-relationnelles": Users, "transitions-de-vie": Compass } as const

export function WhyConsultIndexContent() {
  const { content, locale } = useLandingContent()
  const { whyConsultPage } = content

  return (
    <main className="relative min-h-screen bg-background">
      <Header />

      <section className="site-gutter relative overflow-hidden pb-16 pt-28">
        <OrganicBlobs variant="soft" className="opacity-50" />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {whyConsultPage.badge}
            </p>
            <h1 className="mb-6 font-display text-4xl text-heading md:text-5xl">
              {whyConsultPage.title}
            </h1>
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              {whyConsultPage.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="site-gutter grid gap-6 sm:grid-cols-2 xl:gap-8">
          {whyConsultPage.motifs.map((motif, index) => {
            const Icon = ICONS[motif.slug as keyof typeof ICONS]
            return (
              <Reveal key={motif.slug} delay={index * 90}>
                <Link
                  href={localizePath(`/pourquoi-consulter/${motif.slug}`, locale)}
                  prefetch={false}
                  className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all hover:-translate-y-1 hover:border-heading/40 hover:shadow-[0_24px_48px_-28px_rgba(63,83,107,0.35)] sm:flex-row"
                >
                  <div
                    className="relative aspect-[4/3] w-full shrink-0 bg-secondary bg-cover bg-center sm:aspect-auto sm:w-2/5"
                    style={{ backgroundImage: `url(${motif.imageSrc})` }}
                  />
                  <div className="flex flex-1 flex-col justify-between gap-8 p-8 sm:p-10">
                    <Icon className="h-7 w-7 text-heading" strokeWidth={1.5} />
                    <div>
                      <h2 className="mb-2 font-display text-2xl text-foreground">{motif.title}</h2>
                      <p className="text-sm leading-relaxed text-muted-foreground">{motif.teaser}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-accent opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <BookingCta
        locale={locale}
        title={content.home.practicalInfo.title}
        description={content.home.approach.description}
        ctaLabel={whyConsultPage.bookingLabel}
        ctaHref={whyConsultPage.bookingHref}
      />

      <Footer />
    </main>
  )
}
