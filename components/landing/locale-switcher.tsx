'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LOCALE_LABELS, SUPPORTED_LOCALES, localizePath, stripLocalePrefix } from '@/lib/i18n';
import { persistPreferredLocale } from '@/lib/i18n-client';
import { useLandingContent } from '@/components/providers/landing-content-provider';
import { cn } from '@/lib/utils';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const { locale } = useLandingContent();
  const normalizedPath = stripLocalePrefix(pathname || '/');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 min-w-16 justify-between gap-2 border-border/70 bg-card/60 px-3 text-[10px] uppercase tracking-[0.18em] hover:bg-panel hover:text-foreground data-[state=open]:bg-panel data-[state=open]:text-foreground"
        >
          <span>{LOCALE_LABELS[locale]}</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-16">
        {SUPPORTED_LOCALES.map((targetLocale) => {
          const href = localizePath(normalizedPath, targetLocale);
          const isActive = targetLocale === locale;

          return (
            <DropdownMenuItem
              key={targetLocale}
              asChild
              className={cn(
                'justify-center px-3 text-[10px] uppercase tracking-[0.18em] focus:bg-panel focus:text-foreground',
                isActive ? 'bg-panel text-accent' : 'text-muted-foreground'
              )}
            >
              <Link
                href={href}
                prefetch={false}
                onClick={() => persistPreferredLocale(targetLocale)}
              >
                {LOCALE_LABELS[targetLocale]}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
