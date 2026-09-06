"use client"

import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { PetalMark } from "@/components/landing/petal-mark"
import { Reveal } from "@/components/shared/reveal"
import { localizePath, type Locale } from "@/lib/i18n"

/**
 * The closing invitation, shared by the one-pager and every inner page: a
 * rounded sand panel with the booking action and the two direct lines to the
 * practice underneath it, so "prendre rendez-vous" never dead-ends on a single
 * button. Sand rather than night blue — the footer directly below it is the
 * page's one dark block, and two stacked would weigh the ending down.
 */
export function BookingCta({
  locale,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  locale: Locale
  eyebrow?: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}) {
  const { content } = useLandingContent()
  const { phone, email } = content.footer.practicalInfo

  return (
    <section id="contact" className="site-container py-10 lg:py-14">
      <Reveal className="relative overflow-hidden rounded-[var(--radius-panel)] bg-panel-strong px-6 py-16 text-center sm:px-12 lg:py-20">
        <PetalMark
          className="pointer-events-none absolute -right-14 -top-16 h-56 w-56 text-accent/12"
          strokeWidth={1.6}
        />

        <div className="relative mx-auto max-w-[44rem]">
          {eyebrow ? (
            <p className="section-eyebrow mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mb-4 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.4rem)] leading-[1.18] text-heading">
            {title}
          </h2>
          <p className="mb-9 text-base leading-relaxed text-foreground/80 sm:text-lg">
            {description}
          </p>

          <Link
            href={localizePath(ctaHref, locale)}
            prefetch={false}
            className="btn btn-primary"
          >
            {ctaLabel}
          </Link>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-heading/15 pt-8 text-sm">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.6} />
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />
              {email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
