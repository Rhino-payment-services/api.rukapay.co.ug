'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { docsNavigation, type NavItem } from '@/lib/navigation'
import { BrandLogo } from './BrandLogo'

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const pathname = usePathname()
  const isActive = item.href === pathname

  if (!item.href) return null

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'block rounded-lg px-3 py-2 text-sm transition-colors',
        isActive
          ? 'bg-accent-500/10 font-medium text-accent-700 dark:text-accent-400'
          : 'text-content-muted hover:bg-surface-muted hover:text-content'
      )}
    >
      {item.title}
    </Link>
  )
}

function NavGroup({ group, onNavigate }: { group: NavItem; onNavigate?: () => void }) {
  const pathname = usePathname()
  const hasActiveChild = group.items?.some((item) => item.href === pathname)
  const [open, setOpen] = useState(hasActiveChild ?? true)

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-content-subtle hover:text-content"
      >
        {group.title}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="mt-1 space-y-0.5">
          {group.items?.map((item) => (
            <NavLink key={item.href ?? item.title} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const [query, setQuery] = useState('')

  const filtered = docsNavigation
    .map((group) => ({
      ...group,
      items: group.items?.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => (group.items?.length ?? 0) > 0)

  return (
    <>
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-subtle" />
        <input
          type="search"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface-muted py-2 pl-9 pr-3 text-sm text-content placeholder:text-content-subtle focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        />
      </div>
      <nav>
        {filtered.map((group) => (
          <NavGroup key={group.title} group={group} onNavigate={onNavigate} />
        ))}
      </nav>
    </>
  )
}

function SidebarLogoHeader({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-[var(--navbar-height)] shrink-0 items-center border-b border-border bg-surface px-3">
      <BrandLogo sidebar href="/docs" onClick={onNavigate} className="min-w-0" />
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[var(--sidebar-width)] lg:flex-col lg:border-r lg:border-border lg:bg-surface">
      <SidebarLogoHeader />
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <SidebarContent />
      </div>
    </aside>
  )
}

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <aside className="absolute inset-y-0 left-0 flex w-[min(100%,var(--sidebar-width))] flex-col border-r border-border bg-surface shadow-xl">
        <div className="flex h-[var(--navbar-height)] shrink-0 items-center justify-between border-b border-border px-4">
          <BrandLogo href="/docs" onClick={onClose} compact />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-content-muted hover:bg-surface-muted"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <SidebarContent onNavigate={onClose} />
        </div>
      </aside>
    </div>
  )
}

/** Logo for mobile top bar only (desktop logo lives in sidebar) */
export function NavbarBrand() {
  return <BrandLogo href="/docs" compact className="shrink-0" />
}
