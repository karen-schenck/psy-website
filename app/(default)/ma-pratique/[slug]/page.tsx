import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TherapyPageContent } from '@/components/therapy-page-content';
import { DefaultLocaleContentProvider } from '@/components/default-locale-content-provider';
import { DEFAULT_LOCALE, getSiteContent } from '@/lib/i18n';
import { buildSubpageMetadata } from '@/lib/seo';

const content = getSiteContent(DEFAULT_LOCALE);

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return content.practicePage.modalities.map((modality) => ({ slug: modality.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const modality = content.practicePage.modalities.find((item) => item.id === slug);
  if (!modality) notFound();

  return buildSubpageMetadata(
    DEFAULT_LOCALE,
    `/ma-pratique/${slug}`,
    `${modality.title} | ${content.practicePage.title} — ${content.header.brand.name}`,
    modality.summary
  );
}

export default async function TherapyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modality = content.practicePage.modalities.find((item) => item.id === slug);
  if (!modality) notFound();

  return (
    <DefaultLocaleContentProvider content={content}>
      <TherapyPageContent slug={slug} />
    </DefaultLocaleContentProvider>
  );
}
