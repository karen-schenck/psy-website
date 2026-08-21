"use client"

import Link from "next/link"
import { Brain, Flame, Users, Compass, ArrowRight } from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { BookingCta } from "@/components/landing/booking-cta"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { localizePath } from "@/lib/i18n"

const ICONS = { anxiete: Brain, "burn-out": Flame, "difficultes-relationnelles": Users, "transitions-de-vie": Compass } as const

export function WhyConsultIndexContent() {
  const { content, locale } = useLandingContent()
  const { whyConsultPage } = content

  return (
    <main className="relative min-h-screen bg-background">
      <Header />

      <section className="px-4 pb-16 pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {whyConsultPage.badge}
          </p>
          <h1 className="mb-6 font-display text-4xl text-heading md:text-5xl">
            {whyConsultPage.title}
          </h1>
          <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
            {whyConsultPage.intro}
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border border-border bg-border px-4 sm:grid-cols-2 lg:px-8">
          {whyConsultPage.motifs.map((motif) => {
            const Icon = ICONS[motif.slug as keyof typeof ICONS]
            return (
              <Link
                key={motif.slug}
                href={localizePath(`/pourquoi-consulter/${motif.slug}`, locale)}
                prefetch={false}
                className="group flex flex-col justify-between gap-8 bg-background p-8 transition-colors hover:bg-secondary/60 sm:p-10"
              >
                <Icon className="h-7 w-7 text-heading" strokeWidth={1.5} />
                <div>
                  <h2 className="mb-2 font-display text-2xl text-foreground">{motif.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{motif.teaser}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
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
