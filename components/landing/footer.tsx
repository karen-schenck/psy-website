"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { LineArtSprig } from "@/components/landing/line-art-sprig"
import { localizePath } from "@/lib/i18n"

export function Footer() {
  const { content, locale } = useLandingContent()
  const { footer } = content

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="site-container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <LineArtSprig color="#F7F3EC" className="mb-4 h-10 w-7 opacity-70" />
            <Link
              href={localizePath("/", locale)}
              prefetch={false}
              aria-label={content.header.brand.name}
              className="font-display text-xl italic"
            >
              {content.header.brand.name}
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-primary-foreground/75">
              {footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">
              {footer.practicalInfo.title}
            </h3>
            <ul className="space-y-3 text-[13px] text-primary-foreground/85">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-foreground/50" />
                <span>{footer.practicalInfo.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-foreground/50" />
                <a href={`tel:${footer.practicalInfo.phone.replace(/\s/g, "")}`} className="hover:text-primary-foreground">
                  {footer.practicalInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-foreground/50" />
                <a href={`mailto:${footer.practicalInfo.email}`} className="hover:text-primary-foreground">
                  {footer.practicalInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={localizePath(link.href, locale)}
                      prefetch={false}
                      className="text-[13px] text-primary-foreground/85 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
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
      </div>
    </footer>
  )
}
