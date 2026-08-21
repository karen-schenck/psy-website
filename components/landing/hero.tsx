"use client"

import Link from "next/link"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { EditorialImage } from "@/components/practice/editorial-image"
import { localizePath } from "@/lib/i18n"

export function Hero() {
  const { content, locale } = useLandingContent()
  const { hero } = content.home

  return (
    <section id="hero" className="relative pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {hero.eyebrow}
          </p>
          <h1 className="mb-5 font-display text-5xl leading-[1.1] text-heading sm:text-6xl">
            {hero.title}
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-foreground/90">
            {hero.subtitle}
          </p>

          <div className="mb-9 flex flex-wrap gap-x-6 gap-y-2 text-[13px] uppercase tracking-[0.06em] text-muted-foreground">
            {hero.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={localizePath(hero.primaryCtaHref, locale)}
              prefetch={false}
              className="inline-flex items-center bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {hero.primaryCtaLabel}
            </Link>
            <Link
              href={localizePath(hero.secondaryCtaHref, locale)}
              prefetch={false}
              className="inline-flex items-center border-b border-heading pb-0.5 text-sm font-medium text-heading transition-opacity hover:opacity-70"
            >
              {hero.secondaryCtaLabel}
            </Link>
          </div>
        </div>

        {/* Photo brief — registre I "Accueil / Ambiance générale": vase et
            branches, lumière douce, intérieur ivoire. */}
        <EditorialImage
          src={hero.imageSrc}
          alt={hero.imageAlt}
          ratio="4 / 5"
          className="lg:justify-self-end lg:max-w-md"
        />
      </div>
    </section>
  )
}
