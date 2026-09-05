"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { PetalMark } from "@/components/landing/petal-mark"
import { localizePath } from "@/lib/i18n"

/**
 * Closes the shell: one rounded night-blue panel inset on the same gutter as
 * every other band, rather than a full-bleed slab under the page.
 */
export function Footer() {
  const { content, locale } = useLandingContent()
  const { footer } = content

  return (
    <div className="site-container pb-6 lg:pb-8">
      <footer className="rounded-[var(--radius-panel)] bg-primary px-6 py-14 text-primary-foreground sm:px-10 lg:px-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={localizePath("/", locale)}
              prefetch={false}
              aria-label={content.header.brand.name}
              className="inline-flex items-center gap-3"
            >
              <PetalMark className="h-8 w-8 text-primary-foreground/80" />
              <span className="font-display text-lg">{content.header.brand.name}</span>
            </Link>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-primary-foreground/70">
              {footer.tagline}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/55">
              {footer.practicalInfo.title}
            </h2>
            <ul className="space-y-3 text-[13px] text-primary-foreground/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-foreground/50" />
                <span>{footer.practicalInfo.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-foreground/50" />
                <a
                  href={`tel:${footer.practicalInfo.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {footer.practicalInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-foreground/50" />
                <a
                  href={`mailto:${footer.practicalInfo.email}`}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {footer.practicalInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/55">
                {column.title}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.includes("#") ? (
                      <a
                        href={localizePath(link.href, locale)}
                        className="text-[13px] text-primary-foreground/85 transition-colors hover:text-primary-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={localizePath(link.href, locale)}
                        prefetch={false}
                        className="text-[13px] text-primary-foreground/85 transition-colors hover:text-primary-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 sm:flex-row">
          <p className="text-[12px] text-primary-foreground/60">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <div className="flex gap-5">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={localizePath(link.href, locale)}
                prefetch={false}
                className="text-[12px] text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
