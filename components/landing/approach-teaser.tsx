"use client"

import Link from "next/link"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { EditorialImage } from "@/components/practice/editorial-image"
import { localizePath } from "@/lib/i18n"

export function ApproachTeaser() {
  const { content, locale } = useLandingContent()
  const { approach } = content.home

  return (
    <section className="border-t border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
        {/* Photo brief — registre III "Accompagnement / Confiance": already
            available at /images/cabinet-antibes.png. */}
        <EditorialImage src={approach.imageSrc} alt={approach.imageAlt} ratio="4 / 5" />

        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {approach.eyebrow}
          </p>
          <h2 className="mb-5 font-display text-3xl text-heading sm:text-4xl">
            {approach.title}
          </h2>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-foreground/85">
            {approach.description}
          </p>
          <Link
            href={localizePath(approach.ctaHref, locale)}
            prefetch={false}
            className="inline-flex items-center border-b border-heading pb-0.5 text-sm font-medium text-heading transition-opacity hover:opacity-70"
          >
            {approach.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
