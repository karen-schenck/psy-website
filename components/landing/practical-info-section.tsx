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
      <Reveal className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          {practicalInfo.eyebrow}
        </p>
        <h2 className="mb-10 font-display text-3xl text-heading sm:text-4xl">
          {practicalInfo.title}
        </h2>

        <dl className="mx-auto mb-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-8 sm:grid-cols-5">
          {practicalInfo.items.map((item) => (
            <div key={item.label}>
              <dt className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {item.label}
              </dt>
              <dd className="font-display text-base text-foreground">{item.value}</dd>
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
