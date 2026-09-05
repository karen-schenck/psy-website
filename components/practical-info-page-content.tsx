"use client"

import { MapPin, Phone } from "lucide-react"
import { PracticalInfoSection } from "@/components/landing/practical-info-section"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { PageHeader } from "@/components/shared/page-header"
import { Reveal } from "@/components/shared/reveal"
import { SiteShell } from "@/components/shared/site-shell"

export function PracticalInfoPageContent() {
  const { content } = useLandingContent()
  const { practicalInfoPage } = content
  const { practicalInfo: cabinet } = content.footer
  const { note } = content.home.hero
  const mapQuery = encodeURIComponent(cabinet.address)

  return (
    <SiteShell>
      <PageHeader
        eyebrow={practicalInfoPage.badge}
        title={practicalInfoPage.title}
        intro={practicalInfoPage.intro}
      />
      <PracticalInfoSection />

      <section className="site-container pb-14 lg:pb-20">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <Reveal className="rounded-[var(--radius-panel)] bg-panel p-7 sm:p-10">
            <h2 className="mb-8 font-display text-2xl text-heading">
              {practicalInfoPage.locationTitle}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {practicalInfoPage.phoneLabel}
                  </p>
                  <a
                    href={`tel:${cabinet.phone.replace(/\s/g, "")}`}
                    className="font-display text-lg text-heading transition-colors hover:text-accent"
                  >
                    {cabinet.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {practicalInfoPage.mapTitle}
                  </p>
                  <p className="text-sm text-foreground/85">{cabinet.address}</p>
                  <a
                    href={note.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {note.linkLabel}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="overflow-hidden rounded-[var(--radius-panel)] bg-panel">
            <iframe
              title={practicalInfoPage.mapTitle}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[360px] w-full border-0 lg:h-full lg:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </SiteShell>
  )
}
