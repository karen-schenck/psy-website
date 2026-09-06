"use client"

import { SiteShell } from "@/components/shared/site-shell"
import { Hero } from "@/components/landing/hero"
import { ApproachTeaser } from "@/components/landing/approach-teaser"
import { WhyConsultSection } from "@/components/landing/why-consult-section"
import { ModalitiesSection } from "@/components/landing/modalities-section"
import { AboutSection } from "@/components/landing/about-section"
import { QuoteBlock } from "@/components/landing/quote-block"
import { BookingCta } from "@/components/landing/booking-cta"
import { useLandingContent } from "@/components/providers/landing-content-provider"

/**
 * The home page introduces Karen, her approach and the reasons to consult.
 * Detailed practice and practical information live on their own routes.
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
      <QuoteBlock />

      <ModalitiesSection />
      <AboutSection />
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
