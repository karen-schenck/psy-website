"use client"

import { CalendarDays, CreditCard, Info } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { OrganicBlobs } from "@/components/landing/organic-blobs"
import { Reveal } from "@/components/shared/reveal"

export function ContactContent() {
  const { content } = useLandingContent()
  const { contactPage } = content

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-28 lg:px-8">
      <OrganicBlobs variant="soft" className="opacity-40" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {contactPage.badge}
          </p>
          <h1 className="mb-5 font-display text-4xl text-heading md:text-5xl">
            {contactPage.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
            {contactPage.intro}
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border border-border bg-card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2.5">
              <CalendarDays className="h-5 w-5 text-heading" strokeWidth={1.5} />
              <h2 className="font-display text-xl text-heading">{contactPage.booking.title}</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {contactPage.booking.description}
            </p>
            {/* Calendly inline embed — replace calendlyUrl in contactPage.booking
                once the real scheduling link is available. */}
            <div className="border border-border bg-secondary/30 p-4">
              <iframe
                title="Calendly"
                src={`${contactPage.booking.calendlyUrl}?embed_domain=karen-schenck.fr&embed_type=Inline&background_color=F7F3EC&text_color=3F3A37&primary_color=3F536B`}
                className="h-[640px] w-full border-0"
                loading="lazy"
              />
            </div>
            <a
              href={contactPage.booking.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {contactPage.booking.ctaLabel}
            </a>
          </div>

          <div className="space-y-8">
            <div className="border border-border bg-card p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <Info className="h-4 w-4 text-heading" strokeWidth={1.5} />
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
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
            </div>

            <div className="border border-border bg-card p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <CreditCard className="h-4 w-4 text-heading" strokeWidth={1.5} />
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {contactPage.paymentTitle}
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-foreground">
                {contactPage.payment.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-10 border-t border-border pt-8">
          <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {contactPage.policyTitle}
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
            {contactPage.policy.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
