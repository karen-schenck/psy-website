"use client"

import Link from "next/link"
import { Brain, Flame, Users, Compass, ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/shared/site-shell"
import { PageHeader } from "@/components/shared/page-header"
import { BookingCta } from "@/components/landing/booking-cta"
import { Reveal } from "@/components/shared/reveal"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { localizePath } from "@/lib/i18n"
import { assetPath } from "@/lib/asset-path"

const ICONS = {
  anxiete: Brain,
  "burn-out": Flame,
  "difficultes-relationnelles": Users,
  "transitions-de-vie": Compass,
} as const

export function WhyConsultIndexContent() {
  const { content, locale } = useLandingContent()
  const { whyConsultPage } = content

  return (
    <SiteShell>
      <PageHeader
        eyebrow={whyConsultPage.badge}
        title={whyConsultPage.title}
        intro={whyConsultPage.intro}
      />

      <section className="site-container py-14 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {whyConsultPage.motifs.map((motif, index) => {
            const Icon = ICONS[motif.slug as keyof typeof ICONS]
            return (
              <Reveal key={motif.slug} delay={index * 90}>
                <Link
                  href={localizePath(`/pourquoi-consulter/${motif.slug}`, locale)}
                  prefetch={false}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-panel transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(63,83,107,0.65)] sm:flex-row"
                >
                  <div
                    role="presentation"
                    className="aspect-[4/3] w-full shrink-0 bg-secondary bg-cover bg-center sm:aspect-auto sm:w-2/5"
                    style={{ backgroundImage: `url(${assetPath(motif.imageSrc)})` }}
                  />
                  <div className="flex flex-1 flex-col justify-between gap-6 p-7 lg:p-9">
                    <Icon className="h-7 w-7 text-accent" strokeWidth={1.4} />
                    <div>
                      <h2 className="mb-2 font-display text-xl text-heading">{motif.title}</h2>
                      <p className="text-[13.5px] leading-relaxed text-foreground/75">{motif.teaser}</p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 -translate-x-1 text-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={1.75}
                    />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <BookingCta
        locale={locale}
        eyebrow={content.home.booking.eyebrow}
        title={content.home.practicalInfo.title}
        description={content.home.approach.description}
        ctaLabel={whyConsultPage.bookingLabel}
        ctaHref={whyConsultPage.bookingHref}
      />
    </SiteShell>
  )
}
