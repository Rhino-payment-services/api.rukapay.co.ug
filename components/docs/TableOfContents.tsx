'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export type TocItem = {
  id: string
  title: string
  level?: 2 | 3
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(item.id)
        },
        { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="hidden xl:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-content-subtle">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block border-l-2 py-0.5 pl-3 text-sm transition-colors -ml-px',
                item.level === 3 && 'pl-5',
                activeId === item.id
                  ? 'border-accent-500 font-medium text-accent-600 dark:text-accent-400'
                  : 'border-transparent text-content-muted hover:text-content'
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
