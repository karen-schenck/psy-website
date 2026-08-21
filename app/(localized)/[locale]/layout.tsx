import type { Metadata, Viewport } from 'next';
import { Libre_Baskerville, Lato } from 'next/font/google';
import { notFound } from 'next/navigation';
import HtmlLangSync from '@/components/html-lang-sync';
import { getSiteContent, isLocale, NON_DEFAULT_LOCALES } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import '../../globals.css';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

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
  return buildMetadata(locale, getSiteContent(locale));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${libreBaskerville.variable} ${lato.variable} font-sans antialiased bg-background`}>
        <HtmlLangSync />
        {children}
      </body>
    </html>
  );
}
