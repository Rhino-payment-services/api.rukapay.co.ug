'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, BookOpen, Menu, X } from 'lucide-react'
import { BrandLogo } from '@/components/docs/BrandLogo'
import { ThemeToggle } from '@/components/docs/ThemeToggle'
const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Developers', href: '#developers' },
]

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo href="/" tagline="Payment APIs" />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-content-muted transition-colors hover:text-content"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href="/docs"
            className="hidden text-sm font-medium text-content-muted transition-colors hover:text-content sm:inline-block"
          >
            API Reference
          </Link>
          <Link
            href="/getting-started"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700 sm:px-4"
          >
            <BookOpen className="h-4 w-4" />
            Documentation
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-border p-2 text-content-muted md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-content-muted hover:bg-surface-muted hover:text-content"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-content-muted hover:bg-surface-muted hover:text-content"
            >
              API Reference
            </Link>
            <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
              <ThemeToggle />
              <span className="text-xs text-content-subtle">Theme</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
