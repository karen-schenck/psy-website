"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { BookingCta } from "@/components/landing/booking-cta"
import { EditorialImage } from "@/components/practice/editorial-image"
import { AnxietyIllustration } from "@/components/anxiety-illustration"
import { OrganicBlobs } from "@/components/landing/organic-blobs"
import { Reveal } from "@/components/shared/reveal"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { localizePath } from "@/lib/i18n"

export function MotifDetailContent({ slug }: { slug: string }) {
  const { content, locale } = useLandingContent()
  const { whyConsultPage } = content
  const motif = whyConsultPage.motifs.find((item) => item.slug === slug)

  if (!motif) return null

  return (
    <main className="relative min-h-screen bg-background">
      <Header />

      <article className="relative overflow-hidden px-4 pb-20 pt-28 lg:px-8">
        <OrganicBlobs variant="soft" className="opacity-40" />
        <div className="relative mx-auto max-w-5xl">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href={localizePath("/pourquoi-consulter", locale)} prefetch={false} className="transition-colors hover:text-foreground">
              {whyConsultPage.badge}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{motif.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Reveal>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                {whyConsultPage.badge}
              </p>
              <h1 className="mb-6 font-display text-4xl text-heading md:text-5xl">
                {motif.title}
              </h1>
              <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
                {motif.intro}
              </p>
            </Reveal>

            <Reveal delay={150}>
              {motif.slug === "anxiete" ? (
                <AnxietyIllustration alt={motif.imageAlt} />
              ) : (
                <div className="animate-float-slow">
                  <EditorialImage
                    src={motif.imageSrc}
                    alt={motif.imageAlt}
                    ratio="4 / 5"
                    className="shadow-[0_24px_60px_-28px_rgba(63,83,107,0.3)]"
                  />
                </div>
              )}
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 border-t border-border pt-14 sm:grid-cols-2">
            <Reveal>
              <h2 className="mb-3 font-display text-2xl text-heading">{motif.whenTitle}</h2>
              <p className="text-sm leading-relaxed text-foreground/85">{motif.whenText}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mb-3 font-display text-2xl text-heading">{motif.supportTitle}</h2>
              <p className="text-sm leading-relaxed text-foreground/85">{motif.supportText}</p>
            </Reveal>
          </div>

          {whyConsultPage.motifs.length > 1 && (
            <div className="mt-14 border-t border-border pt-8">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
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
                      className="border border-border px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-heading hover:text-heading"
                    >
                      {item.title}
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <BookingCta
        locale={locale}
        title={content.home.approach.title}
        description={content.home.approach.description}
        ctaLabel={whyConsultPage.ctaLabel}
        ctaHref={whyConsultPage.ctaHref}
      />

      <Footer />
    </main>
  )
}
