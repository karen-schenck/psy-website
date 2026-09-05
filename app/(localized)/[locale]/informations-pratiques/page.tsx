import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LocalizedContentProvider } from "@/components/localized-content-provider"
import { PracticalInfoPageContent } from "@/components/practical-info-page-content"
import {
  getSiteContent,
  isLocale,
  NON_DEFAULT_LOCALES,
  type Locale,
} from "@/lib/i18n"
import { buildSubpageMetadata } from "@/lib/seo"

export const dynamic = "force-static"

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const content = getSiteContent(locale)

  return buildSubpageMetadata(
    locale as Locale,
    "/informations-pratiques",
    content.practicalInfoPage.metadata.title,
    content.practicalInfoPage.metadata.description
  )
}

export default async function LocaleInformationsPratiquesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <LocalizedContentProvider locale={locale as Locale}>
      <PracticalInfoPageContent />
    </LocalizedContentProvider>
  )
}
