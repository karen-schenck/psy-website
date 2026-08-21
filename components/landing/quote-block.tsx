"use client"

import { useLandingContent } from "@/components/providers/landing-content-provider"

export function QuoteBlock() {
  const { content } = useLandingContent()

  return (
    <section className="bg-accent py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <p className="font-display text-2xl italic leading-snug text-accent-foreground sm:text-3xl">
          &ldquo;{content.home.quote.text}&rdquo;
        </p>
      </div>
    </section>
  )
}
