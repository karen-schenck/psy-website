"use client"

import { useLandingContent } from "@/components/providers/landing-content-provider"
import { PetalMark } from "@/components/landing/petal-mark"
import { Reveal } from "@/components/shared/reveal"

/**
 * Who Karen is, on the one-pager: her own words from /ma-pratique beside a
 * portrait in a rounded frame, with the botanical mark tucked into the corner
 * of the image the way the reference layout signs its panels.
 */
export function AboutSection() {
  const { content } = useLandingContent()
  const { about } = content.home
  const { journey } = content.practicePage

  return (
    <section id="a-propos" className="site-container py-10 lg:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-x-[clamp(2.5rem,5vw,6rem)]">
        <Reveal className="relative">
          <div
            role="img"
            aria-label={about.imageAlt}
            className="aspect-[5/4] rounded-[var(--radius-panel)] bg-panel-strong bg-cover bg-center shadow-[0_30px_60px_-40px_rgba(63,83,107,0.7)]"
            style={{ backgroundImage: `url(${about.imageSrc})` }}
          />
          <PetalMark
            className="absolute -bottom-5 -right-4 h-16 w-16 text-accent/70 lg:-right-6 lg:h-20 lg:w-20"
            strokeWidth={2}
          />
        </Reveal>

        <Reveal delay={120}>
          <p className="section-eyebrow mb-4">{about.eyebrow}</p>
          <h2 className="mb-6 max-w-[18ch] font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-[1.16] text-heading">
            {journey.title}
          </h2>
          {journey.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5 max-w-[52ch] text-base leading-relaxed text-foreground/85">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
