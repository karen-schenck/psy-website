import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { WhyConsultIndexContent } from '@/components/why-consult-index-content';
import { LocalizedContentProvider } from '@/components/localized-content-provider';
import { getSiteContent, isLocale, NON_DEFAULT_LOCALES, type Locale } from '@/lib/i18n';
import { buildSubpageMetadata } from '@/lib/seo';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);

  return buildSubpageMetadata(
    locale as Locale,
    '/pourquoi-consulter',
    content.whyConsultPage.metadata.title,
    content.whyConsultPage.metadata.description
  );
}

export default async function LocaleWhyConsultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <LocalizedContentProvider locale={locale as Locale}>
      <WhyConsultIndexContent />
    </LocalizedContentProvider>
  );
}
