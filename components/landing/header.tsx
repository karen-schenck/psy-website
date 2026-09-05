"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ChevronRight, Menu } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { localizePath } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/**
 * Native anchor for in-page hash targets: fires `hashchange`, which
 * `LazySection` listens for to eagerly render lazily-loaded sections.
 */
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string
  className?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} prefetch={false} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

const LocaleSwitcher = dynamic(
  () =>
    import("@/components/landing/locale-switcher").then(
      (mod) => mod.LocaleSwitcher
    ),
  {
    ssr: false,
    loading: () => (
      <div aria-hidden="true" className="h-8 min-w-16 border border-border" />
    ),
  }
)

type NavItem = {
  label: string
  href?: string
  children?: Array<{
    label: string
    href: string
  }>
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMobileGroup, setActiveMobileGroup] = useState<NavItem | null>(null)
  const { content, locale } = useLandingContent()
  const navItems = content.header.navLinks as NavItem[]
  const ctaHref = localizePath(content.header.ctaHref, locale)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="site-container flex h-16 items-center justify-between">
        <Link
          href={localizePath("/", locale)}
          prefetch={false}
          aria-label={content.header.brand.name}
          className="shrink-0 font-display text-xl italic tracking-tight text-heading"
        >
          {content.header.brand.name}
        </Link>

        <NavigationMenu viewport={false} className="hidden lg:flex lg:flex-none">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.children?.length ? (
                  <>
                    <NavigationMenuTrigger className="h-9 bg-transparent px-3 text-[13px] font-medium uppercase tracking-[0.08em] text-foreground/80">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-64">
                      <div className="flex flex-col gap-1 p-1">
                        {item.children.map((child) => (
                          <NavigationMenuLink key={child.label} asChild>
                            <Link
                              href={localizePath(child.href, locale)}
                              prefetch={false}
                              className="px-3 py-2 text-[13px] text-foreground/80 hover:text-accent"
                            >
                              {child.label}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : item.href ? (
                  <NavigationMenuLink asChild>
                    <Link
                      href={localizePath(item.href, locale)}
                      prefetch={false}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "h-9 bg-transparent px-3 text-[13px] font-medium uppercase tracking-[0.08em] text-foreground/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                ) : null}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <Button size="sm" className="text-[13px] font-semibold" asChild>
            <Link href={ctaHref} prefetch={false}>
              {content.header.ctaLabel}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher />
          <Drawer
            direction="left"
            open={mobileMenuOpen}
            onOpenChange={(open) => {
              setMobileMenuOpen(open)
              if (!open) setActiveMobileGroup(null)
            }}
          >
            <DrawerTrigger
              aria-label={content.header.mobileMenu.openAriaLabel}
              className="p-2"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </DrawerTrigger>
            <DrawerContent className="max-w-sm">
              <DrawerHeader className="border-b border-border">
                <DrawerTitle className="font-display text-lg italic text-heading">
                  {content.header.brand.name}
                </DrawerTitle>
                <DrawerDescription className="sr-only">
                  Navigation
                </DrawerDescription>
              </DrawerHeader>
              <nav className="flex flex-col p-4">
                {navItems.map((item) =>
                  item.children?.length ? (
                    <button
                      key={item.label}
                      type="button"
                      className="flex items-center justify-between border-b border-border py-3 text-left text-[13px] font-medium uppercase tracking-[0.08em] text-foreground/80"
                      onClick={() => {
                        setActiveMobileGroup(item)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : item.href ? (
                    <NavLink
                      key={item.label}
                      href={localizePath(item.href, locale)}
                      className="border-b border-border py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-foreground/80"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ) : null
                )}
                <Button size="sm" className="mt-4 text-[13px] font-semibold" asChild>
                  <Link href={ctaHref} prefetch={false}>
                    {content.header.ctaLabel}
                  </Link>
                </Button>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <Drawer
        direction="right"
        open={Boolean(activeMobileGroup)}
        onOpenChange={(open) => {
          if (!open) setActiveMobileGroup(null)
        }}
      >
        <DrawerContent className="max-w-sm">
          <DrawerHeader className="border-b border-border">
            <DrawerTitle className="font-display text-lg italic text-heading">
              {activeMobileGroup?.label}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              {activeMobileGroup?.label}
            </DrawerDescription>
          </DrawerHeader>
          <nav className="flex flex-col p-4">
            {activeMobileGroup?.children?.map((child) => (
              <NavLink
                key={child.label}
                href={localizePath(child.href, locale)}
                className="border-b border-border py-3 text-[13px] text-foreground/80"
                onClick={() => {
                  setActiveMobileGroup(null)
                  setMobileMenuOpen(false)
                }}
              >
                {child.label}
              </NavLink>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  )
}
