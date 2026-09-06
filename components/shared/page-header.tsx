"use client"

import { PetalMark } from "@/components/landing/petal-mark"
import { Reveal } from "@/components/shared/reveal"

/**
 * Opening panel of every inner route, so a page that is not the one-pager
 * still starts on the same rounded sand band the home page uses.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  children?: React.ReactNode
}) {
  return (
    <section className="site-container pt-10 lg:pt-14">
      <Reveal className="site-panel relative overflow-hidden p-6 sm:p-10 lg:p-14">
        <PetalMark
          className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 text-accent/10"
          strokeWidth={2}
        />
        <div className="relative">
          {children}
          <p className="section-eyebrow mb-4">{eyebrow}</p>
          <h1 className="mb-5 max-w-[20ch] font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.1] text-heading">
            {title}
          </h1>
          {intro ? (
            <p className="max-w-[62ch] text-base leading-relaxed text-foreground/85 md:text-lg">
              {intro}
            </p>
          ) : null}
        </div>
      </Reveal>
    </section>
  )
}
