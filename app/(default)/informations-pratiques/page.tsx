import type { Metadata } from "next"
import { DefaultLocaleContentProvider } from "@/components/default-locale-content-provider"
import { PracticalInfoPageContent } from "@/components/practical-info-page-content"
import { DEFAULT_LOCALE, getSiteContent } from "@/lib/i18n"
import { buildSubpageMetadata } from "@/lib/seo"

const content = getSiteContent(DEFAULT_LOCALE)

export const dynamic = "force-static"

export const metadata: Metadata = buildSubpageMetadata(
  DEFAULT_LOCALE,
  "/informations-pratiques",
  content.practicalInfoPage.metadata.title,
  content.practicalInfoPage.metadata.description
)

export default function InformationsPratiquesPage() {
  return (
    <DefaultLocaleContentProvider content={content}>
      <PracticalInfoPageContent />
    </DefaultLocaleContentProvider>
  )
}
