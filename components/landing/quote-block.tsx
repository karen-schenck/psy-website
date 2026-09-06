"use client"

import { useLandingContent } from "@/components/providers/landing-content-provider"
import { PetalMark } from "@/components/landing/petal-mark"
import { Reveal } from "@/components/shared/reveal"

/**
 * The one burgundy note in the page: a rounded panel carrying Karen's line,
 * with two blown-up petal marks bleeding off its corners.
 */
export function QuoteBlock() {
  const { content } = useLandingContent()

  return (
    <section className="site-container py-10 lg:py-14">
      <Reveal className="relative overflow-hidden rounded-[var(--radius-panel)] bg-accent px-6 py-16 text-center sm:px-12 lg:py-24">
        <PetalMark
          className="pointer-events-none absolute -left-10 -top-12 h-44 w-44 text-accent-foreground/10"
          strokeWidth={1.6}
        />
        <PetalMark
          className="pointer-events-none absolute -bottom-16 -right-12 h-52 w-52 text-accent-foreground/10"
          strokeWidth={1.6}
        />
        <p className="relative mx-auto max-w-[44rem] font-display text-[clamp(1.35rem,1rem+1.4vw,2.25rem)] italic leading-[1.32] text-accent-foreground">
          &ldquo;{content.home.quote.text}&rdquo;
        </p>
      </Reveal>
    </section>
  )
}
