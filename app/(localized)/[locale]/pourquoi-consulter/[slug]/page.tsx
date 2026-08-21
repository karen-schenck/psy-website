import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MotifDetailContent } from '@/components/motif-detail-content';
import { LocalizedContentProvider } from '@/components/localized-content-provider';
import { getSiteContent, isLocale, NON_DEFAULT_LOCALES, type Locale } from '@/lib/i18n';
import { buildSubpageMetadata } from '@/lib/seo';

export const dynamic = 'force-static';

export function generateStaticParams() {
  const content = getSiteContent(NON_DEFAULT_LOCALES[0]);
  return NON_DEFAULT_LOCALES.flatMap((locale) =>
    content.whyConsultPage.motifs.map((motif) => ({ locale, slug: motif.slug }))
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
  const motif = content.whyConsultPage.motifs.find((item) => item.slug === slug);
  if (!motif) notFound();

  return buildSubpageMetadata(
    locale as Locale,
    `/pourquoi-consulter/${slug}`,
    `${motif.title} | ${content.whyConsultPage.title} — ${content.header.brand.name}`,
    motif.intro
  );
}

export default async function LocaleMotifDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const motif = content.whyConsultPage.motifs.find((item) => item.slug === slug);
  if (!motif) notFound();

  return (
    <LocalizedContentProvider locale={locale as Locale}>
      <MotifDetailContent slug={slug} />
    </LocalizedContentProvider>
  );
}
