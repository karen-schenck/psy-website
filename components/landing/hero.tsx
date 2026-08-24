"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { EditorialImage } from "@/components/practice/editorial-image"
import { OrganicBlobs } from "@/components/landing/organic-blobs"
import { LineArtSprig } from "@/components/landing/line-art-sprig"
import { localizePath } from "@/lib/i18n"

export function Hero() {
  const { content, locale } = useLandingContent()
  const { hero } = content.home

  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      <OrganicBlobs variant="soft" className="opacity-70" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <div
            className="mb-5 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
          >
            <LineArtSprig className="h-8 w-6 shrink-0" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {hero.eyebrow}
            </p>
          </div>

          <h1
            className="mb-5 font-display text-5xl leading-[1.1] text-heading sm:text-6xl animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
            style={{ animationDelay: "120ms" }}
          >
            {hero.title}
          </h1>

          <p
            className="mb-8 max-w-xl text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
            style={{ animationDelay: "220ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="mb-9 flex flex-wrap gap-x-6 gap-y-2 text-[13px] uppercase tracking-[0.06em] text-muted-foreground animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
            style={{ animationDelay: "320ms" }}
          >
            {hero.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div
            className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
            style={{ animationDelay: "420ms" }}
          >
            <Link
              href={localizePath(hero.primaryCtaHref, locale)}
              prefetch={false}
              className="inline-flex items-center bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
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

        <div
          className="relative animate-in fade-in zoom-in-95 fill-mode-both duration-1000 lg:justify-self-end lg:max-w-md"
          style={{ animationDelay: "180ms" }}
        >
          <div className="pointer-events-none absolute -inset-6 -z-10 hidden sm:block">
            <OrganicBlobs variant="hero" />
          </div>
          <div className="animate-float-slow">
            <EditorialImage
              src={hero.imageSrc}
              alt={hero.imageAlt}
              ratio="4 / 5"
              className="shadow-[0_24px_60px_-24px_rgba(63,83,107,0.35)]"
            />
          </div>
        </div>
      </div>

      <div className="relative hidden justify-center pb-8 lg:flex">
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 animate-bounce text-muted-foreground/60"
        />
      </div>
    </section>
  )
}
