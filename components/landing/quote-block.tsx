"use client"

import { useLandingContent } from "@/components/providers/landing-content-provider"
import { LineArtSprig } from "@/components/landing/line-art-sprig"
import { Reveal } from "@/components/shared/reveal"
import { Parallax } from "@/components/shared/parallax"

/**
 * Full-bleed burgundy band. The two sprigs drift against the scroll in
 * opposite directions, so the band opens up as it crosses the viewport; the
 * quote itself stays still and readable.
 */
export function QuoteBlock() {
  const { content } = useLandingContent()

  return (
    <section className="relative overflow-hidden bg-accent py-20 lg:py-28">
      <Parallax
        speed={0.2}
        className="pointer-events-none absolute -top-8 left-[clamp(1rem,4vw,7rem)] h-32 w-20 opacity-[0.14]"
      >
        <LineArtSprig color="#F7F3EC" className="h-full w-full" />
      </Parallax>
      <Parallax
        speed={-0.16}
        className="pointer-events-none absolute -bottom-10 right-[clamp(1rem,4vw,7rem)] h-36 w-24 rotate-180 opacity-[0.14]"
      >
        <LineArtSprig color="#F7F3EC" className="h-full w-full" />
      </Parallax>

      <div className="site-container relative">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <p className="font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.5rem)] italic leading-[1.3] text-accent-foreground">
            &ldquo;{content.home.quote.text}&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  )
}
