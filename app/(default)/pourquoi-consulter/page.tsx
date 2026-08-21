import type { Metadata } from 'next';
import { WhyConsultIndexContent } from '@/components/why-consult-index-content';
import { DefaultLocaleContentProvider } from '@/components/default-locale-content-provider';
import { DEFAULT_LOCALE, getSiteContent } from '@/lib/i18n';
import { buildSubpageMetadata } from '@/lib/seo';

const content = getSiteContent(DEFAULT_LOCALE);

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...buildSubpageMetadata(
    DEFAULT_LOCALE,
    '/pourquoi-consulter',
    content.whyConsultPage.metadata.title,
    content.whyConsultPage.metadata.description
  ),
};

export default function WhyConsultPage() {
  return (
    <DefaultLocaleContentProvider content={content}>
      <WhyConsultIndexContent />
    </DefaultLocaleContentProvider>
  );
}
