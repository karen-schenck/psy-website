"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SiteShell } from "@/components/shared/site-shell"
import { PageHeader } from "@/components/shared/page-header"
import { TherapyDiagram } from "@/components/shared/therapy-diagram"
import { PetalMark } from "@/components/landing/petal-mark"
import { BookingCta } from "@/components/landing/booking-cta"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { localizePath } from "@/lib/i18n"
import diagrams from "@/data/therapy-pages.json"

export function TherapyPageContent({ slug }: { slug: string }) {
  const { content, locale } = useLandingContent()
  const modality = content.practicePage.modalities.find((item) => item.id === slug)
  const diagram = diagrams[locale][slug as keyof typeof diagrams.fr]
  if (!modality || !diagram) return null
  const labels = locale === "fr"
    ? { back: "Mon approche", visual: "Comprendre en images", example: "Un exemple du quotidien", deeper: "Pour aller plus loin", others: "Découvrir les autres approches" }
    : { back: "My approach", visual: "A visual guide", example: "An everyday example", deeper: "Understanding the approach", others: "Explore the other approaches" }

  return (
    <SiteShell>
      <PageHeader eyebrow={content.practicePage.badge} title={modality.title} intro={modality.summary}>
        <Link href={localizePath("/ma-pratique", locale)} className="mb-6 inline-flex min-h-11 items-center gap-2 rounded text-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
          <ArrowLeft aria-hidden="true" className="size-4" />{labels.back}
        </Link>
      </PageHeader>
      <section className="site-container py-10 lg:py-14" aria-labelledby={`${slug}-diagram-title`}>
        {/* The centrepiece: a full-width card like its neighbours, framed by hand-drawn brackets. */}
        <div className="site-panel relative isolate overflow-hidden px-6 py-10 sm:px-12 sm:py-14 xl:px-20 xl:py-16">
          <PetalMark className="pointer-events-none absolute -bottom-28 -left-28 -z-10 size-80 text-accent/[0.08]" strokeWidth={1.5} />
          <div className="mx-auto grid max-w-6xl gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] xl:items-center xl:gap-16">
            <div className="text-center xl:text-left">
              <p className="section-eyebrow mb-4">{labels.visual}</p>
              <h2 id={`${slug}-diagram-title`} className="mx-auto max-w-[30ch] font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-[1.2] text-heading xl:mx-0 xl:max-w-none">{diagram.diagramTitle}</h2>
              <span aria-hidden="true" className="mx-auto mt-6 block h-px w-16 bg-accent/50 xl:mx-0" />
              <p className="mx-auto mt-6 max-w-[65ch] text-base leading-relaxed text-foreground/85 xl:mx-0">{diagram.diagramIntro}</p>
            </div>
            <TherapyDiagram diagram={diagram} id={slug} />
          </div>
        </div>
      </section>
      <section className="site-container py-10 lg:py-14">
        <div className="site-panel-strong grid gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
          <div>
            <p className="section-eyebrow mb-4">{labels.example}</p>
            <h2 className="mb-5 font-display text-xl leading-snug text-heading sm:text-2xl">{diagram.example}</h2>
            <p className="max-w-[60ch] text-base leading-[1.75] text-foreground">{diagram.exampleText}</p>
          </div>
          <div className="rounded-2xl bg-shell p-6 sm:p-8">
            <h2 className="mb-4 font-display text-xl leading-snug text-heading">{diagram.support}</h2>
            <p className="text-base leading-[1.75] text-foreground">{diagram.supportText}</p>
          </div>
        </div>
      </section>
      <section className="site-container py-10 lg:py-14" aria-labelledby="therapy-detail-title">
        <article className="site-panel-strong grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)] lg:gap-14 lg:p-14">
          <header className="flex flex-col gap-5 lg:border-r lg:border-accent/20 lg:pr-10">
            <p className="section-eyebrow">{modality.title}</p>
            <h2 id="therapy-detail-title" className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.2rem)] leading-[1.2] text-heading">{labels.deeper}</h2>
            <span aria-hidden="true" className="block h-px w-16 bg-accent/50" />
          </header>
          <div className="flex flex-col gap-5 text-base leading-[1.8] text-foreground/85">
            {modality.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "font-display text-lg leading-[1.7] text-heading sm:text-xl" : undefined}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>
      <nav className="site-container py-10 lg:py-14" aria-label={labels.others}>
        <p className="section-eyebrow mb-5">{labels.others}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {content.practicePage.modalities.filter((item) => item.id !== slug).map((item) => (
            <Link key={item.id} href={localizePath(`/ma-pratique/${item.id}`, locale)} prefetch={false} className="flex items-center justify-between gap-4 rounded-2xl bg-panel p-6 font-display text-base text-primary hover:bg-panel-strong focus-visible:outline-2 focus-visible:outline-offset-4">
              {item.title}<ArrowRight aria-hidden="true" className="size-4 shrink-0" />
            </Link>
          ))}
        </div>
      </nav>
      <BookingCta locale={locale} {...content.home.booking} ctaLabel={content.practicePage.firstSession.ctaLabel} ctaHref={content.practicePage.firstSession.ctaHref} />
    </SiteShell>
  )
}
