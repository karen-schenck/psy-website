"use client"

import Link from "next/link"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { Reveal } from "@/components/shared/reveal"
import { ParallaxImage } from "@/components/shared/parallax"
import { localizePath } from "@/lib/i18n"

/**
 * Full-bleed editorial band: the cabinet photo runs off the left edge of the
 * viewport and drifts inside its frame, the copy sits in the right half behind
 * the page gutter. Stacked below `lg`, photo first.
 */
export function ApproachTeaser() {
  const { content, locale } = useLandingContent()
  const { approach } = content.home

  return (
    <section className="relative border-t border-border bg-secondary/40">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <div
          role="img"
          aria-label={approach.imageAlt}
          className="relative min-h-[16rem] overflow-hidden sm:min-h-[22rem] lg:min-h-[36rem]"
        >
          <ParallaxImage src={approach.imageSrc} speed={0.12} overshoot="20%" />
        </div>

        <div className="site-gutter flex items-center py-16 lg:py-24">
          <Reveal className="max-w-[38rem]">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {approach.eyebrow}
            </p>
            <h2 className="mb-5 font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] leading-[1.15] text-heading">
              {approach.title}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-foreground/85 sm:text-lg">
              {approach.description}
            </p>
            <Link
              href={localizePath(approach.ctaHref, locale)}
              prefetch={false}
              className="inline-flex items-center border-b border-heading pb-0.5 text-sm font-medium text-heading transition-opacity hover:opacity-70"
            >
              {approach.ctaLabel}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
