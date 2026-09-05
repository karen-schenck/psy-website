"use client"

import Link from "next/link"
import { Brain, Flame, Users, Compass, ArrowRight } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { Reveal } from "@/components/shared/reveal"
import { ParallaxImage } from "@/components/shared/parallax"
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
      <div className="site-container">
        {/* At full width the section head reads better split than stacked: the
            title holds the left gutter, the description answers it across the
            page rather than trailing underneath. */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-[clamp(2.5rem,5vw,7rem)] lg:mb-20">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {whyConsult.eyebrow}
            </p>
            <h2 className="max-w-[20ch] font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] leading-[1.15] text-heading">
              {whyConsult.title}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="max-w-[46ch] text-base leading-relaxed text-foreground/85 lg:pb-1">
              {whyConsult.description}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-7">
          {whyConsult.items.map((item, index) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS]
            return (
              <Reveal key={item.slug} delay={index * 90}>
                <Link
                  href={localizePath(`/pourquoi-consulter/${item.slug}`, locale)}
                  prefetch={false}
                  className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all hover:-translate-y-1 hover:border-heading/40 hover:shadow-[0_20px_40px_-24px_rgba(63,83,107,0.35)]"
                >
                  {/* The photo drifts inside its own frame as the row crosses
                      the viewport — enough to give the grid depth, far too
                      little to notice as motion. */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                    <ParallaxImage src={THUMBNAILS[item.slug]} speed={0.07} overshoot="24%" />
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
