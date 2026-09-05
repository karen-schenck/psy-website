"use client"

import Link from "next/link"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { Reveal } from "@/components/shared/reveal"
import { localizePath } from "@/lib/i18n"

/**
 * The reference layout's inset band: one rounded sand panel holding a picture
 * wall on the left and the approach copy on the right. The wall is a two-up
 * collage — a tall frame beside two stacked ones — so three images read as a
 * single composition rather than a row of thumbnails.
 */
export function ApproachTeaser() {
  const { content, locale } = useLandingContent()
  const { approach } = content.home
  const [tall, ...stacked] = approach.gallery

  return (
    <section id="approche" className="site-container scroll-mt-28 py-10 lg:py-14">
      <Reveal className="site-panel overflow-hidden p-6 sm:p-10 lg:p-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-[clamp(2.5rem,4vw,5rem)]">
          <div className="grid grid-cols-2 gap-4">
            <div
              role="img"
              aria-label={tall.alt}
              className="row-span-2 h-full min-h-[16rem] rounded-xl bg-secondary bg-cover bg-center shadow-[0_24px_50px_-32px_rgba(63,83,107,0.6)]"
              style={{ backgroundImage: `url(${tall.src})` }}
            />
            {stacked.map((image) => (
              <div
                key={image.src}
                role="img"
                aria-label={image.alt}
                className="aspect-[4/3] rounded-xl bg-secondary bg-cover bg-center shadow-[0_24px_50px_-32px_rgba(63,83,107,0.6)]"
                style={{ backgroundImage: `url(${image.src})` }}
              />
            ))}
          </div>

          <div>
            <p className="section-eyebrow mb-4">{approach.eyebrow}</p>
            <h2 className="mb-5 max-w-[18ch] font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-[1.16] text-heading">
              {approach.title}
            </h2>
            <p className="mb-8 max-w-[46ch] text-base leading-relaxed text-foreground/85">
              {approach.description}
            </p>
            <Link
              href={localizePath(approach.ctaHref, locale)}
              prefetch={false}
              className="btn btn-sand"
            >
              {approach.ctaLabel}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
