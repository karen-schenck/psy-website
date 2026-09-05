"use client"

import { SiteShell } from "@/components/shared/site-shell"
import { Hero } from "@/components/landing/hero"
import { ApproachTeaser } from "@/components/landing/approach-teaser"
import { WhyConsultSection } from "@/components/landing/why-consult-section"
import { ModalitiesSection } from "@/components/landing/modalities-section"
import { AboutSection } from "@/components/landing/about-section"
import { QuoteBlock } from "@/components/landing/quote-block"
import { PracticalInfoSection } from "@/components/landing/practical-info-section"
import { BookingCta } from "@/components/landing/booking-cta"
import { useLandingContent } from "@/components/providers/landing-content-provider"

/**
 * The home page is a one-pager: everything a visitor needs to decide — who
 * Karen is, how she works, what she works on, what it costs and how to book —
 * in a single scroll inside the shell. The inner routes stay published for
 * search and for the depth the sections only summarise; the header's nav
 * points at the sections here, its dropdown at those pages.
 */
export function LandingPageContent({
  structuredData: _structuredData,
}: {
  structuredData?: unknown[]
}) {
  const { content, locale } = useLandingContent()
  const { booking } = content.home

  return (
    <SiteShell>
      <Hero />
      <ApproachTeaser />
      <WhyConsultSection />
      <ModalitiesSection />
      <AboutSection />
      <QuoteBlock />
      <PracticalInfoSection />
      <BookingCta
        locale={locale}
        eyebrow={booking.eyebrow}
        title={booking.title}
        description={booking.description}
        ctaLabel={booking.ctaLabel}
        ctaHref={booking.ctaHref}
      />
    </SiteShell>
  )
}
