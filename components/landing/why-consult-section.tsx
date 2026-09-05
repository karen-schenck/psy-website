"use client"

import Link from "next/link"
import { Brain, Flame, Users, Compass, ArrowUpRight } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { Reveal } from "@/components/shared/reveal"
import { localizePath } from "@/lib/i18n"

const ICONS = { brain: Brain, flame: Flame, users: Users, compass: Compass } as const

/**
 * "What I can help with" — a centred section head over a row of sand cards,
 * one per reason to consult. Each card is a link to its own page, so the
 * one-pager stays the entry point without swallowing the detail routes.
 */
export function WhyConsultSection() {
  const { content, locale } = useLandingContent()
  const { whyConsult } = content.home

  return (
    <section id="pourquoi-consulter" className="site-container py-10 lg:py-14">
      <Reveal className="mx-auto mb-12 max-w-[44rem] text-center lg:mb-16">
        <p className="section-eyebrow mb-4">{whyConsult.eyebrow}</p>
        <h2 className="mb-4 font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-[1.16] text-heading">
          {whyConsult.title}
        </h2>
        <p className="text-base leading-relaxed text-foreground/85">{whyConsult.description}</p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyConsult.items.map((item, index) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS]
          return (
            <Reveal key={item.slug} delay={index * 90}>
              <Link
                href={localizePath(`/pourquoi-consulter/${item.slug}`, locale)}
                prefetch={false}
                className="group flex h-full flex-col gap-5 rounded-2xl bg-panel-strong p-7 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-[#E3D4BC] hover:shadow-[0_28px_50px_-32px_rgba(63,83,107,0.65)] lg:p-8"
              >
                <Icon
                  className="h-7 w-7 text-accent transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.4}
                />
                <div className="flex-1">
                  <h3 className="mb-2 font-display text-lg leading-snug text-heading">{item.title}</h3>
                  <p className="text-[13px] leading-relaxed text-foreground/75">{item.description}</p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 -translate-x-1 text-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  strokeWidth={1.75}
                />
              </Link>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={200} className="mt-10 text-center">
        <Link
          href={localizePath(whyConsult.ctaHref, locale)}
          prefetch={false}
          className="btn btn-outline"
        >
          {whyConsult.ctaLabel}
        </Link>
      </Reveal>
    </section>
  )
}
