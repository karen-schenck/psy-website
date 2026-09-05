"use client"

import { CalendarDays, CreditCard, Info, Mail, MapPin, Phone } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { PageHeader } from "@/components/shared/page-header"
import { Reveal } from "@/components/shared/reveal"

/**
 * Booking page: the scheduler on the left, everything a visitor checks before
 * booking — facts, payment, terms and the direct lines to the practice — in
 * rounded cards down the right.
 */
export function ContactContent() {
  const { content } = useLandingContent()
  const { contactPage, footer } = content

  return (
    <>
      <PageHeader
        eyebrow={contactPage.badge}
        title={contactPage.title}
        intro={contactPage.intro}
      />

      <section className="site-container py-14 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Reveal className="rounded-[var(--radius-panel)] bg-panel p-6 sm:p-8 lg:p-10">
            <div className="mb-5 flex items-center gap-2.5">
              <CalendarDays className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <h2 className="font-display text-xl text-heading">{contactPage.booking.title}</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-foreground/75">
              {contactPage.booking.description}
            </p>
            {/* Calendly inline embed — replace calendlyUrl in contactPage.booking
                once the real scheduling link is available. */}
            <div className="overflow-hidden rounded-2xl bg-shell p-3">
              <iframe
                title="Calendly"
                src={`${contactPage.booking.calendlyUrl}?embed_domain=karen-schenck.fr&embed_type=Inline&background_color=F7F3EC&text_color=3F3A37&primary_color=3F536B`}
                className="h-[640px] w-full rounded-xl border-0"
                loading="lazy"
              />
            </div>
            <a
              href={contactPage.booking.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6"
            >
              {contactPage.booking.ctaLabel}
            </a>
          </Reveal>

          <div className="grid content-start gap-4">
            <Reveal delay={80} className="rounded-[var(--radius-panel)] bg-panel p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <Info className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {contactPage.practicalInfoTitle}
                </h2>
              </div>
              <dl className="space-y-3.5">
                {contactPage.practicalInfo.map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{item.label}</dt>
                    <dd className="text-right font-medium text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={140} className="rounded-[var(--radius-panel)] bg-panel p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <CreditCard className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {contactPage.paymentTitle}
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-foreground/85">
                {contactPage.payment.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200} className="rounded-[var(--radius-panel)] bg-panel-strong p-6 sm:p-8">
              <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {footer.practicalInfo.title}
              </h2>
              <ul className="space-y-3 text-sm text-foreground/85">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  <span>{footer.practicalInfo.address}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  <a
                    href={`tel:${footer.practicalInfo.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-heading"
                  >
                    {footer.practicalInfo.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  <a
                    href={`mailto:${footer.practicalInfo.email}`}
                    className="transition-colors hover:text-heading"
                  >
                    {footer.practicalInfo.email}
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160} className="mt-4 rounded-[var(--radius-panel)] bg-panel p-6 sm:p-8 lg:p-10">
          <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {contactPage.policyTitle}
          </h2>
          <ul className="grid gap-3 text-sm leading-relaxed text-foreground/75 sm:grid-cols-3">
            {contactPage.policy.map((line) => (
              <li key={line} className="rounded-xl bg-shell p-5">
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  )
}
