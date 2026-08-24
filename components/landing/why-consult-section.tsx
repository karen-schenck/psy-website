"use client"

import Link from "next/link"
import { Brain, Flame, Users, Compass, ArrowRight } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { Reveal } from "@/components/shared/reveal"
import { localizePath } from "@/lib/i18n"

const ICONS = { brain: Brain, flame: Flame, users: Users, compass: Compass } as const

const THUMBNAILS: Record<string, string> = {
  anxiete: "/images/pourquoi-anxiete.webp",
  "burn-out": "/images/pourquoi-burn-out.webp",
  "difficultes-relationnelles": "/images/pourquoi-difficultes-relationnelles.webp",
  "transitions-de-vie": "/images/pourquoi-transitions-de-vie.webp",
}

export function WhyConsultSection() {
  const { content, locale } = useLandingContent()
  const { whyConsult } = content.home

  return (
    <section className="border-t border-border py-20 lg:py-28" id="pourquoi-consulter">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {whyConsult.eyebrow}
          </p>
          <h2 className="mb-4 font-display text-3xl text-heading sm:text-4xl">
            {whyConsult.title}
          </h2>
          <p className="text-base leading-relaxed text-foreground/85">
            {whyConsult.description}
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyConsult.items.map((item, index) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS]
            return (
              <Reveal key={item.slug} delay={index * 90}>
                <Link
                  href={localizePath(`/pourquoi-consulter/${item.slug}`, locale)}
                  prefetch={false}
                  className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all hover:-translate-y-1 hover:border-heading/40 hover:shadow-[0_20px_40px_-24px_rgba(63,83,107,0.35)]"
                >
                  <div
                    className="relative aspect-[4/3] w-full bg-secondary bg-cover bg-center"
                    style={{ backgroundImage: `url(${THUMBNAILS[item.slug]})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                    <Icon
                      className="absolute bottom-3 left-3 h-6 w-6 text-heading"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                    <div>
                      <h3 className="mb-1.5 font-display text-lg text-foreground">{item.title}</h3>
                      <p className="text-[13px] leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-accent opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
