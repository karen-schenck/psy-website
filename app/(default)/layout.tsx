import type { Metadata, Viewport } from 'next';
import { Libre_Baskerville, Lato } from 'next/font/google';
import HtmlLangSync from '@/components/html-lang-sync';
import { DEFAULT_LOCALE, getSiteContent } from '@/lib/i18n';
import { buildRootMetadata } from '@/lib/seo';
import { assetPath } from '@/lib/asset-path';
import '../globals.css';

const baseMetadata = buildRootMetadata(getSiteContent(DEFAULT_LOCALE));

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

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: [{ url: assetPath('/icon-light-32x32.svg') }],
  },
};

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body className={`${libreBaskerville.variable} ${lato.variable} font-sans antialiased bg-background`}>
        <HtmlLangSync />
        {children}
      </body>
    </html>
  );
}
