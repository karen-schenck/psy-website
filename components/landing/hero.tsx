"use client"

import Link from "next/link"
import { ArrowUpRight, ChevronDown, MapPin, Phone } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { OrganicBlobs } from "@/components/landing/organic-blobs"
import { LineArtSprig } from "@/components/landing/line-art-sprig"
import { Parallax } from "@/components/shared/parallax"
import { localizePath } from "@/lib/i18n"

/**
 * Full-height hero: value proposition on the left, Karen's cutout portrait
 * standing in a soft arch on the right — the same arch/blob vocabulary used
 * elsewhere on the site. The portrait deliberately breaks out of the arch at
 * the bottom so it reads as part of the composition rather than a photo in a
 * frame.
 *
 * Everything floating around her is a real affordance, not decoration: the
 * chips open the matching "pourquoi consulter" page, the location card opens
 * the practice in Maps, and the pill dials the practice.
 *
 * The section is full-bleed: copy sits against the left gutter, the portrait
 * against the right one, and from `lg` up the portrait is sized off the
 * viewport *height* rather than its column, so widening the screen can never
 * push it past the fold.
 *
 * Depth comes from two layers drifting at different rates against the scroll —
 * the blob backdrop furthest away, the portrait just behind the page. The copy
 * itself never moves: text under a live transform loses its subpixel grid.
 *
 * Source order is the mobile order — copy, portrait, contact, practical facts
 * — and explicit row/column placement rebuilds the split layout from `lg` up,
 * where the chips and contact cards become floating layers (`lg:contents` lets
 * the stacked contact row dissolve so each card can position on its own).
 */
export function Hero() {
  const { content, locale } = useLandingContent()
  const { hero } = content.home
  const phone = content.footer.practicalInfo.phone

  return (
    <section id="hero" className="relative flex min-h-svh flex-col overflow-hidden pt-16">
      <Parallax speed={0.16} className="pointer-events-none absolute inset-x-0 -top-[20%] h-[140%]">
        <OrganicBlobs variant="soft" className="opacity-60" />
      </Parallax>

      <div className="site-container relative flex w-full flex-1 flex-col justify-center pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-6 lg:pb-10">
        <div className="grid gap-y-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-[clamp(2.5rem,5vw,7rem)] lg:gap-y-10">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="mb-5 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
              <LineArtSprig className="h-8 w-6 shrink-0" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                {hero.name}
                <span className="mx-1.5 text-muted-foreground">·</span>
                <span className="text-muted-foreground">{hero.eyebrow}</span>
              </p>
            </div>

            <h1
              className="mb-5 max-w-[38rem] font-display text-[clamp(1.75rem,1.2rem+2.2vw,3.25rem)] leading-[1.14] text-heading lg:leading-[1.08] animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: "120ms" }}
            >
              {hero.title}
            </h1>

            <p
              className="mb-8 max-w-[34rem] text-base leading-relaxed text-foreground/90 sm:text-lg animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: "220ms" }}
            >
              {hero.subtitle}
            </p>

            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-4 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: "320ms" }}
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

          {/* ── Portrait ─────────────────────────────────────────── */}
          <Parallax
            speed={0.06}
            className="relative w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-auto lg:justify-self-end"
          >
            {/* What she helps with — a wrapped row above the portrait while
                the layout is stacked, a floating stack over the arch from
                `lg` up. Each chip opens its own page. */}
            <div className="mb-6 lg:absolute lg:right-0 lg:top-[7%] lg:z-20 lg:mb-0 lg:max-w-[62%]">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:text-right">
                {hero.focusLabel}
              </p>
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                {hero.focusItems.map((item, index) => (
                  <li
                    key={item.href}
                    className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700"
                    style={{ animationDelay: `${520 + index * 110}ms` }}
                  >
                    <div className="chip-float" style={{ animationDelay: `${index * 800}ms` }}>
                      <Link
                        href={localizePath(item.href, locale)}
                        prefetch={false}
                        className="group flex min-h-11 items-center gap-2.5 border border-border bg-card/80 px-3.5 py-2.5 text-[12px] lg:min-h-0 leading-none text-foreground shadow-[0_12px_28px_-20px_rgba(63,83,107,0.6)] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-heading/45 hover:shadow-[0_18px_34px_-20px_rgba(63,83,107,0.55)] focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 shrink-0 bg-accent transition-transform duration-300 group-hover:scale-[2]"
                        />
                        {item.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          strokeWidth={1.75}
                        />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-[21rem] sm:max-w-[24rem] md:max-w-[26rem] lg:mx-0 lg:h-[min(70svh,48rem)] lg:w-[min(56svh,38.4rem)] lg:max-w-none animate-in fade-in fill-mode-both duration-1000"
              style={{ animationDelay: "180ms" }}
            >
              {/* Soft arch ground and its offset outline — the moodboard's arch
                  motif in beige sable and slate blue. The outline's own bottom
                  edge doubles as the horizon line Karen stands on. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-[1%] top-[4%] bottom-[14%] rounded-t-full border border-heading/20"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-[6%] top-0 bottom-[14%] rounded-t-full bg-secondary"
              />

              <img
                src={hero.imageSrc}
                alt={hero.imageAlt}
                width={920}
                height={1311}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-x-0 bottom-0 top-[7%] h-[93%] w-full object-contain object-bottom drop-shadow-[0_24px_36px_rgba(63,83,107,0.18)] [mask-image:linear-gradient(to_bottom,#000_86%,transparent_99%)]"
              />
            </div>

            {/* Contact affordances — a row under the portrait while stacked,
                two floating layers over the arch from `lg` up. */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:contents">
              <a
                href={hero.note.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.note.linkLabel}
                className="group flex items-start gap-3 border border-border bg-card px-4 py-3.5 shadow-[0_22px_44px_-26px_rgba(63,83,107,0.55)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-heading/45 hover:shadow-[0_26px_48px_-24px_rgba(63,83,107,0.5)] focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:absolute lg:bottom-[7%] lg:left-[-7%] lg:z-20 animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700"
                style={{ animationDelay: "760ms" }}
              >
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="font-display text-[13px] leading-tight text-heading">{hero.note.title}</p>
                  <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{hero.note.text}</p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 -translate-x-1 text-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  strokeWidth={1.75}
                />
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 border border-border bg-card px-4 py-3 shadow-[0_22px_44px_-26px_rgba(63,83,107,0.55)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-heading/45 hover:shadow-[0_26px_48px_-24px_rgba(63,83,107,0.5)] focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:absolute lg:bottom-[-1%] lg:right-[-2%] lg:z-20 animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700"
                style={{ animationDelay: "880ms" }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-accent"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {hero.callLabel}
                  </span>
                  <span className="mt-0.5 block font-display text-[13px] leading-tight text-heading">{phone}</span>
                </span>
              </a>
            </div>
          </Parallax>

          {/* ── Practical facts ──────────────────────────────────── */}
          <dl
            className="flex max-w-[38rem] flex-wrap gap-x-10 gap-y-5 border-t border-border pt-6 lg:col-start-1 lg:row-start-2 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
            style={{ animationDelay: "420ms" }}
          >
            {hero.trust.map((item) => (
              <div key={item.label}>
                <dt className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="font-display text-base text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative hidden justify-center pb-5 lg:flex">
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 animate-bounce text-muted-foreground/60"
        />
      </div>
    </section>
  )
}
