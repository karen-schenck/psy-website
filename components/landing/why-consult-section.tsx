"use client"

import Link from "next/link"
import { Brain, Flame, Users, Compass, ArrowRight } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { localizePath } from "@/lib/i18n"

const ICONS = { brain: Brain, flame: Flame, users: Users, compass: Compass } as const

export function WhyConsultSection() {
  const { content, locale } = useLandingContent()
  const { whyConsult } = content.home

  return (
    <section className="border-t border-border py-20 lg:py-28" id="pourquoi-consulter">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {whyConsult.eyebrow}
          </p>
          <h2 className="mb-4 font-display text-3xl text-heading sm:text-4xl">
            {whyConsult.title}
          </h2>
          <p className="text-base leading-relaxed text-foreground/85">
            {whyConsult.description}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {whyConsult.items.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS]
            return (
              <Link
                key={item.slug}
                href={localizePath(`/pourquoi-consulter/${item.slug}`, locale)}
                prefetch={false}
                className="group flex flex-col justify-between gap-6 bg-background p-7 transition-colors hover:bg-secondary/60"
              >
                <Icon className="h-6 w-6 text-heading" strokeWidth={1.5} />
                <div>
                  <h3 className="mb-1.5 font-display text-lg text-foreground">{item.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
