"use client"

import { useLandingContent } from "@/components/providers/landing-content-provider"
import { LineArtSprig } from "@/components/landing/line-art-sprig"
import { Reveal } from "@/components/shared/reveal"

export function QuoteBlock() {
  const { content } = useLandingContent()

  return (
    <section className="relative overflow-hidden bg-accent py-16 lg:py-20">
      <LineArtSprig
        color="#F7F3EC"
        className="pointer-events-none absolute -top-4 left-6 h-24 w-16 opacity-[0.14] sm:left-12"
      />
      <LineArtSprig
        color="#F7F3EC"
        className="pointer-events-none absolute -bottom-6 right-6 h-28 w-20 rotate-180 opacity-[0.14] sm:right-12"
      />
      <Reveal className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
        <p className="font-display text-2xl italic leading-snug text-accent-foreground sm:text-3xl">
          &ldquo;{content.home.quote.text}&rdquo;
        </p>
      </Reveal>
    </section>
  )
}
