"use client"

import Link from "next/link"
import { ArrowUpRight, MapPin, Phone } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { PetalBloom } from "@/components/landing/petal-mark"
import { Parallax } from "@/components/shared/parallax"
import { Button } from "@/components/ui/button"
import { localizePath } from "@/lib/i18n"

/**
 * Opening band of the one-pager: value proposition on the left, Karen's
 * cutout portrait on the right, standing in front of an oversized outline of
 * the botanical mark. The bloom drifts slowly against the scroll so the
 * composition has depth; the copy itself never moves, since text under a live
 * transform loses its subpixel grid.
 *
 * The portrait deliberately runs past the bottom padding of the band so she
 * reads as standing in the page rather than sitting in a frame, and from `lg`
 * up she is sized off the viewport *height*, so widening the screen can never
 * push the fold away.
 */
export function Hero() {
  const { content, locale } = useLandingContent()
  const { hero } = content.home
  const phone = content.footer.practicalInfo.phone

  return (
    <section id="accueil" className="relative overflow-hidden">
      {/* Sand arch behind the portrait half, echoing the reference's warm
          right-hand field. It dissolves into the shell at the foot of the
          band, so the portrait stands on air rather than on a seam. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] rounded-l-[14rem] bg-panel/70 [mask-image:linear-gradient(to_bottom,#000_72%,transparent_99%)] lg:block"
      />

      <div className="site-container relative pt-12 pb-0 lg:pt-16">
        <div className="grid items-center gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-x-[clamp(2rem,4vw,5rem)]">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div className="lg:pb-16">
            <p className="section-eyebrow mb-5 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
              {hero.name}
              <span className="mx-2 text-muted-foreground/60">·</span>
              <span className="text-muted-foreground">{hero.eyebrow}</span>
            </p>

            <h1
              className="mb-6 max-w-[16ch] font-display text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] leading-[1.1] text-heading animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: "120ms" }}
            >
              {hero.title}
            </h1>

            <p
              className="mb-9 max-w-[36rem] text-base leading-relaxed text-foreground/85 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: "220ms" }}
            >
              {hero.subtitle}
            </p>

            <div
              className="flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: "320ms" }}
            >
              <a href={localizePath(hero.secondaryCtaHref, locale)} className="btn btn-outline">
                {hero.secondaryCtaLabel}
              </a>
              <Link
                href={localizePath(hero.primaryCtaHref, locale)}
                prefetch={false}
                className="btn btn-sand"
              >
                {hero.primaryCtaLabel}
              </Link>
            </div>

            {/* Practical facts and the two live affordances — the cabinet on
                Maps and the phone — kept in one quiet row under the buttons. */}
            <dl
              className="mt-10 hidden flex-wrap gap-x-10 gap-y-5 border-t border-border pt-7 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 lg:flex"
              style={{ animationDelay: "420ms" }}
            >
              {hero.trust.map((item) => (
                <div key={item.label}>
                  <dt className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="font-display text-base text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div
              className="mt-7 hidden flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 lg:flex"
              style={{ animationDelay: "520ms" }}
            >
              <a
                href={hero.note.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.note.linkLabel}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-heading/40 hover:bg-card focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                <span>
                  <span className="block font-display text-[13px] leading-tight text-heading">
                    {hero.note.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-tight text-muted-foreground">
                    {hero.note.text}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  strokeWidth={1.75}
                />
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-heading/40 hover:bg-card focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-accent"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {hero.callLabel}
                  </span>
                  <span className="mt-0.5 block font-display text-[13px] leading-tight text-heading">
                    {phone}
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* ── Portrait ─────────────────────────────────────────── */}
          <div className="relative flex justify-center self-end lg:justify-end">
            <div
              className="relative aspect-[4/5] w-full max-w-[21rem] sm:max-w-[24rem] lg:h-[min(62svh,42rem)] lg:w-[min(50svh,34rem)] lg:max-w-none animate-in fade-in fill-mode-both duration-1000"
              style={{ animationDelay: "180ms" }}
            >
              {/* The bloom lives inside the portrait's own box and drifts only
                  gently, so it frames her head instead of wandering over the
                  cards stacked above her on narrow screens. */}
              <Parallax
                speed={0.03}
                className="pointer-events-none absolute inset-0 flex items-start justify-center"
              >
                <PetalBloom className="h-[78%] w-[108%] max-w-none lg:w-[126%]" />
              </Parallax>

              <img
                src={hero.imageSrc}
                alt={hero.imageAlt}
                width={920}
                height={1311}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_28px_40px_rgba(63,83,107,0.16)]"
              />

              <div className="absolute bottom-6 right-2 z-10 flex flex-col gap-3 sm:right-4 lg:hidden">
                <Button
                  asChild
                  size="icon-lg"
                  className="size-12 rounded-full border border-border bg-card/90 text-accent shadow-lg backdrop-blur-sm hover:bg-card"
                >
                  <a
                    href={hero.note.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={hero.note.linkLabel}
                  >
                    <MapPin aria-hidden="true" strokeWidth={1.75} />
                  </a>
                </Button>

                <Button
                  asChild
                  size="icon-lg"
                  className="size-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-accent"
                >
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    aria-label={`${hero.callLabel} : ${phone}`}
                  >
                    <Phone aria-hidden="true" strokeWidth={1.75} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
