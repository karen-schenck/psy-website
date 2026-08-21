import Link from 'next/link';
import { localizePath, type Locale } from '@/lib/i18n';

export function BookingCta({
  locale,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  locale: Locale;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="border-t border-border bg-secondary/40 py-16 lg:py-20">
      <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
        <h2 className="mb-3 font-display text-2xl text-heading sm:text-3xl">{title}</h2>
        <p className="mb-7 text-base leading-relaxed text-foreground/85">{description}</p>
        <Link
          href={localizePath(ctaHref, locale)}
          prefetch={false}
          className="inline-flex items-center bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
