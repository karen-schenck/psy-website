"use client"

import Link from "next/link"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { Reveal } from "@/components/shared/reveal"
import { localizePath } from "@/lib/i18n"

export function PracticalInfoSection() {
  const { content, locale } = useLandingContent()
  const { practicalInfo } = content.home

  return (
    <section className="border-t border-border py-20 lg:py-28" id="rendez-vous">
      <Reveal className="site-container text-center">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          {practicalInfo.eyebrow}
        </p>
        <h2 className="mb-12 font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] leading-[1.15] text-heading">
          {practicalInfo.title}
        </h2>

        {/* One row of facts across the full page, rather than a narrow block
            floating in the middle of it. */}
        <dl className="mb-12 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-border py-10 sm:grid-cols-3 lg:grid-cols-5">
          {practicalInfo.items.map((item) => (
            <div key={item.label}>
              <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {item.label}
              </dt>
              <dd className="font-display text-base text-foreground lg:text-lg">{item.value}</dd>
            </div>
          ))}
        </dl>

        <Link
          href={localizePath(practicalInfo.ctaHref, locale)}
          prefetch={false}
          className="inline-flex items-center bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
        >
          {practicalInfo.ctaLabel}
        </Link>
      </Reveal>
    </section>
  )
}
