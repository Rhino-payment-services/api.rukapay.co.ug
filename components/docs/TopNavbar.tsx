'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, Menu, Search } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { NavbarBrand, MobileSidebar } from './Sidebar'
import { apiVersions, languages } from '@/lib/navigation'

export function TopNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [version, setVersion] = useState(apiVersions[0])
  const [language, setLanguage] = useState<string>(languages[0].code)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 h-[var(--navbar-height)] border-b border-border bg-surface/95 backdrop-blur-md lg:left-[var(--sidebar-width)] lg:border-l">
        <div className="flex h-full items-center gap-3 px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-content-muted hover:bg-surface-muted lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="lg:hidden">
            <NavbarBrand />
          </div>

          <div className="relative hidden min-w-0 flex-1 md:block md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-subtle" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full rounded-lg border border-border bg-surface-muted py-2 pl-9 pr-3 text-sm text-content placeholder:text-content-subtle focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as typeof version)}
              aria-label="API version"
              className="hidden rounded-lg border border-border bg-surface-elevated px-2 py-1.5 text-xs font-medium text-content sm:block"
            >
              {apiVersions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Language"
              className="hidden rounded-lg border border-border bg-surface-elevated px-2 py-1.5 text-xs font-medium text-content md:block"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>

            <ThemeToggle />

            <Link
              href="/"
              className="hidden rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-content-muted transition-colors hover:bg-surface-muted hover:text-content sm:inline-flex"
            >
              Home
            </Link>

            <Link
              href="https://github.com/rukapay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-3 text-sm font-medium text-content-muted transition-colors hover:bg-surface-muted hover:text-content"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </div>
        </div>
      </header>

      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
