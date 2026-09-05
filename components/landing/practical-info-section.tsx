"use client"

import Link from "next/link"
import { CreditCard, Info } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { Reveal } from "@/components/shared/reveal"
import { localizePath } from "@/lib/i18n"

/**
 * Everything a visitor needs before booking, in one panel: the practical
 * facts as a grid, then payment methods and the cancellation terms — the same
 * copy the contact page carries, so the one-pager answers the question without
 * a second hop.
 */
export function PracticalInfoSection() {
  const { content, locale } = useLandingContent()
  const { practicalInfo } = content.home
  const { contactPage } = content

  return (
    <section id="informations" className="site-container py-10 lg:py-14">
      <Reveal className="site-panel p-6 sm:p-10 lg:p-14">
        <div className="mb-10 text-center">
          <p className="section-eyebrow mb-4">{practicalInfo.eyebrow}</p>
          <h2 className="font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-[1.16] text-heading">
            {practicalInfo.title}
          </h2>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl bg-shell p-8 sm:grid-cols-3 lg:grid-cols-5 lg:p-10">
          {practicalInfo.items.map((item) => (
            <div key={item.label}>
              <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {item.label}
              </dt>
              <dd className="font-display text-base text-foreground lg:text-lg">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div className="rounded-2xl bg-shell p-8">
            <div className="mb-5 flex items-center gap-2.5">
              <CreditCard className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {contactPage.paymentTitle}
              </h3>
            </div>
            <ul className="space-y-2.5 text-sm text-foreground/85">
              {contactPage.payment.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-shell p-8">
            <div className="mb-5 flex items-center gap-2.5">
              <Info className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {contactPage.policyTitle}
              </h3>
            </div>
            <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/75">
              {contactPage.policy.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href={localizePath(practicalInfo.ctaHref, locale)}
            prefetch={false}
            className="btn btn-primary"
          >
            {practicalInfo.ctaLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
