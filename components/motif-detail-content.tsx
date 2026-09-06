"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SiteShell } from "@/components/shared/site-shell"
import { PageHeader } from "@/components/shared/page-header"
import { BookingCta } from "@/components/landing/booking-cta"
import { Reveal } from "@/components/shared/reveal"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { localizePath } from "@/lib/i18n"
import { assetPath } from "@/lib/asset-path"

export function MotifDetailContent({ slug }: { slug: string }) {
  const { content, locale } = useLandingContent()
  const { whyConsultPage } = content
  const motif = whyConsultPage.motifs.find((item) => item.slug === slug)

  if (!motif) return null

  return (
    <SiteShell>
      <PageHeader eyebrow={whyConsultPage.badge} title={motif.title} intro={motif.intro}>
        <nav
          className="mb-7 flex items-center gap-2 text-[13px] text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link
            href={localizePath("/pourquoi-consulter", locale)}
            prefetch={false}
            className="transition-colors hover:text-foreground"
          >
            {whyConsultPage.badge}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{motif.title}</span>
        </nav>
      </PageHeader>

      <article className="site-container py-14 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-[clamp(2.5rem,4vw,4.5rem)]">
          <Reveal>
            <div
              role="img"
              aria-label={motif.imageAlt}
              className="aspect-[4/3] rounded-[var(--radius-panel)] bg-panel bg-cover bg-center shadow-[0_30px_60px_-40px_rgba(63,83,107,0.7)] lg:aspect-[5/4]"
              style={{ backgroundImage: `url(${assetPath(motif.imageSrc)})` }}
            />
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={100}>
              <div className="rounded-2xl bg-panel p-7 lg:p-9">
                <h2 className="mb-3 font-display text-xl text-heading">{motif.whenTitle}</h2>
                <p className="text-[14px] leading-relaxed text-foreground/80">{motif.whenText}</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="rounded-2xl bg-panel p-7 lg:p-9">
                <h2 className="mb-3 font-display text-xl text-heading">{motif.supportTitle}</h2>
                <p className="text-[14px] leading-relaxed text-foreground/80">{motif.supportText}</p>
              </div>
            </Reveal>
          </div>
        </div>

        {whyConsultPage.motifs.length > 1 && (
          <div className="mt-14 border-t border-border pt-10">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {whyConsultPage.badge}
            </p>
            <div className="flex flex-wrap gap-3">
              {whyConsultPage.motifs
                .filter((item) => item.slug !== slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={localizePath(`/pourquoi-consulter/${item.slug}`, locale)}
                    prefetch={false}
                    className="rounded-lg bg-panel px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-panel-strong hover:text-heading"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </article>

      <BookingCta
        locale={locale}
        eyebrow={content.home.booking.eyebrow}
        title={content.home.approach.title}
        description={content.home.approach.description}
        ctaLabel={whyConsultPage.ctaLabel}
        ctaHref={whyConsultPage.ctaHref}
      />
    </SiteShell>
  )
}
