"use client"

import Link from "next/link"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { Reveal } from "@/components/shared/reveal"
import { localizePath } from "@/lib/i18n"

/**
 * The four therapeutic traditions, numbered, on the one-pager. The full
 * write-up still lives on /ma-pratique — this band carries the same text in a
 * two-up card grid so a visitor who never leaves the home page still learns
 * what an integrative practice actually means.
 */
export function ModalitiesSection() {
  const { content, locale } = useLandingContent()
  const { modalities } = content.home
  const items = content.practicePage.modalities

  return (
    <section id="approches" className="site-container py-10 lg:py-14">
      <Reveal className="site-panel-strong p-6 sm:p-10 lg:p-14">
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-x-[clamp(2.5rem,4vw,5rem)]">
          <div>
            <p className="section-eyebrow mb-4">{modalities.eyebrow}</p>
            <h2 className="max-w-[18ch] font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-[1.16] text-heading">
              {modalities.title}
            </h2>
          </div>
          <p className="max-w-[48ch] text-base leading-relaxed text-foreground/85">
            {modalities.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((modality, index) => (
            <Reveal key={modality.title} delay={index * 80}>
              <article className="flex h-full flex-col gap-4 rounded-2xl bg-shell p-7 lg:p-8">
                <span
                  aria-hidden="true"
                  className="font-display text-sm text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg leading-snug text-heading">{modality.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-foreground/75">
                  {modality.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={localizePath(modalities.ctaHref, locale)}
            prefetch={false}
            className="btn btn-primary"
          >
            {modalities.ctaLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
