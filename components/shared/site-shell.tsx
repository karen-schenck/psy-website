"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

/**
 * The framed page. Every route renders inside one rounded ivory shell that
 * floats on the beige-sable ground — header riding its top edge, footer
 * closing it — so the whole site reads as a single card rather than a stack
 * of full-bleed bands.
 *
 * The shell clips (`overflow: clip`, not `hidden`) so decorative layers can
 * bleed to its rounded edges without turning it into a scroll container,
 * which would strand the sticky header.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-frame min-h-svh bg-sand">
      <main className="site-shell">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  )
}
