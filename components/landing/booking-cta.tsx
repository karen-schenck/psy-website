import Link from 'next/link';
import { localizePath, type Locale } from '@/lib/i18n';
import { Reveal } from '@/components/shared/reveal';
import { ParallaxImage } from '@/components/shared/parallax';

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
    <section className="relative overflow-hidden border-t border-border bg-secondary/40 py-20 lg:py-28">
      <ParallaxImage
        src="/images/accompagnement-mains.webp"
        speed={0.12}
        overshoot="35%"
        className="opacity-[0.08]"
      />
      <Reveal className="site-container relative text-center">
        <div className="mx-auto max-w-[42rem]">
          <h2 className="mb-3 font-display text-[clamp(1.5rem,1.1rem+1.3vw,2.25rem)] leading-[1.18] text-heading">
            {title}
          </h2>
          <p className="mb-7 text-base leading-relaxed text-foreground/85 sm:text-lg">{description}</p>
          <Link
            href={localizePath(ctaHref, locale)}
            prefetch={false}
            className="inline-flex items-center bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            {ctaLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
