"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import Link from "next/link"
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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"
import { useLandingContent } from "@/components/providers/landing-content-provider"
import { PetalMark } from "@/components/landing/petal-mark"
import { localizePath } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/**
 * Native anchor for in-page hash targets — the one-pager's nav is mostly
 * hashes, and a client-side <Link> would swallow the scroll.
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
      <div aria-hidden="true" className="h-9 min-w-16 rounded-md border border-border" />
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

/**
 * The bar riding the top edge of the shell: botanical mark and two-line name
 * on the left, the section nav in the middle, a sand-filled booking button on
 * the right. It sticks to the top of the viewport, not of a scroll container —
 * the shell clips rather than scrolls precisely so this keeps working.
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMobileGroup, setActiveMobileGroup] = useState<NavItem | null>(null)
  const { content, locale } = useLandingContent()
  const navItems = content.header.navLinks as NavItem[]
  const ctaHref = localizePath(content.header.ctaHref, locale)
  const [firstName, ...restOfName] = content.header.brand.name.split(" ")

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-shell/90 backdrop-blur-md">
      <div className="site-container flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href={localizePath("/", locale)}
          prefetch={false}
          aria-label={content.header.brand.name}
          className="group flex shrink-0 items-center gap-3"
        >
          <PetalMark className="h-8 w-8 shrink-0 text-accent transition-transform duration-500 group-hover:rotate-45" />
          <span className="font-display text-[15px] leading-[1.15] text-heading">
            {firstName}
            <br />
            {restOfName.join(" ")}
          </span>
        </Link>

        <NavigationMenu viewport={false} className="hidden lg:flex lg:flex-none">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.children?.length ? (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="group inline-flex h-9 items-center rounded-md bg-transparent px-3.5 text-[13px] font-medium text-foreground/75 outline-none transition-colors hover:bg-panel hover:text-heading focus:bg-panel focus:text-heading focus-visible:ring-2 focus-visible:ring-ring/50 data-[state=open]:bg-panel data-[state=open]:text-heading"
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          className="ml-1 size-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" sideOffset={6} className="w-72 rounded-xl p-1.5">
                      <DropdownMenuGroup className="flex flex-col gap-0.5">
                        {item.children.map((child) => (
                          <DropdownMenuItem
                            key={child.label}
                            asChild
                            className="p-0 focus:bg-panel focus:text-foreground"
                          >
                            <Link
                              href={localizePath(child.href, locale)}
                              prefetch={false}
                              className="rounded-md px-3 py-2 text-[13px] text-foreground/80 transition-colors hover:bg-panel hover:text-accent"
                            >
                              {child.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : item.href ? (
                  <NavigationMenuLink asChild>
                    <NavLink
                      href={localizePath(item.href, locale)}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "h-9 rounded-md bg-transparent px-3.5 text-[13px] font-medium text-foreground/75 hover:bg-panel hover:text-heading focus:bg-panel focus:text-heading data-[active=true]:bg-panel data-[active=true]:text-heading"
                      )}
                    >
                      {item.label}
                    </NavLink>
                  </NavigationMenuLink>
                ) : null}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <Link href={ctaHref} prefetch={false} className="btn btn-sand px-6 py-3">
            {content.header.ctaLabel}
          </Link>
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
              className="rounded-md p-2 transition-colors hover:bg-panel"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </DrawerTrigger>
            <DrawerContent className="max-w-sm">
              <DrawerHeader className="border-b border-border">
                <DrawerTitle className="flex items-center gap-2.5 font-display text-lg text-heading">
                  <PetalMark className="h-6 w-6 text-accent" />
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
                      className="flex items-center justify-between border-b border-border py-3.5 text-left text-sm font-medium text-foreground/80"
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
                      className="border-b border-border py-3.5 text-sm font-medium text-foreground/80"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ) : null
                )}
                <Link
                  href={ctaHref}
                  prefetch={false}
                  className="btn btn-primary mt-6 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {content.header.ctaLabel}
                </Link>
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
            <DrawerTitle className="font-display text-lg text-heading">
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
                className="border-b border-border py-3.5 text-sm text-foreground/80"
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
