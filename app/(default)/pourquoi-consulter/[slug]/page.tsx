import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MotifDetailContent } from '@/components/motif-detail-content';
import { DefaultLocaleContentProvider } from '@/components/default-locale-content-provider';
import { DEFAULT_LOCALE, getSiteContent } from '@/lib/i18n';
import { buildSubpageMetadata } from '@/lib/seo';

const content = getSiteContent(DEFAULT_LOCALE);

export const dynamic = 'force-static';

export function generateStaticParams() {
  return content.whyConsultPage.motifs.map((motif) => ({ slug: motif.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const motif = content.whyConsultPage.motifs.find((item) => item.slug === slug);
  if (!motif) notFound();

  return buildSubpageMetadata(
    DEFAULT_LOCALE,
    `/pourquoi-consulter/${slug}`,
    `${motif.title} | ${content.whyConsultPage.title} — ${content.header.brand.name}`,
    motif.intro
  );
}

export default async function MotifDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const motif = content.whyConsultPage.motifs.find((item) => item.slug === slug);
  if (!motif) notFound();

  return (
    <DefaultLocaleContentProvider content={content}>
      <MotifDetailContent slug={slug} />
    </DefaultLocaleContentProvider>
  );
}
