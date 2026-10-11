import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TherapyPageContent } from '@/components/therapy-page-content';
import { LocalizedContentProvider } from '@/components/localized-content-provider';
import { getSiteContent, isLocale, NON_DEFAULT_LOCALES, type Locale } from '@/lib/i18n';
import { buildSubpageMetadata } from '@/lib/seo';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  const content = getSiteContent(NON_DEFAULT_LOCALES[0]);
  return NON_DEFAULT_LOCALES.flatMap((locale) =>
    content.practicePage.modalities.map((modality) => ({ locale, slug: modality.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const modality = content.practicePage.modalities.find((item) => item.id === slug);
  if (!modality) notFound();

  return buildSubpageMetadata(
    locale as Locale,
    `/ma-pratique/${slug}`,
    `${modality.title} | ${content.practicePage.title} — ${content.header.brand.name}`,
    modality.summary
  );
}

export default async function LocaleTherapyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const modality = content.practicePage.modalities.find((item) => item.id === slug);
  if (!modality) notFound();

  return (
    <LocalizedContentProvider locale={locale as Locale}>
      <TherapyPageContent slug={slug} />
    </LocalizedContentProvider>
  );
}
