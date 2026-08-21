import type { Metadata } from 'next';
import { PracticeContent } from '@/components/practice-content';
import { DefaultLocaleContentProvider } from '@/components/default-locale-content-provider';
import { DEFAULT_LOCALE, getSiteContent } from '@/lib/i18n';
import { buildSubpageMetadata } from '@/lib/seo';

const content = getSiteContent(DEFAULT_LOCALE);

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...buildSubpageMetadata(
    DEFAULT_LOCALE,
    '/ma-pratique',
    content.practicePage.metadata.title,
    content.practicePage.metadata.description
  ),
};

export default function MaPratiquePage() {
  return (
    <DefaultLocaleContentProvider content={content}>
      <PracticeContent />
    </DefaultLocaleContentProvider>
  );
}
