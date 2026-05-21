import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function QuickAccessCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}: {
  title: string
  description: string
  href: string
  icon: LucideIcon
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col rounded-xl border border-border bg-surface-elevated p-5 transition-all hover:border-accent-500/30 hover:shadow-card',
        className
      )}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-muted text-accent-600 transition-colors group-hover:border-accent-500/20 group-hover:bg-accent-500/10 dark:text-accent-400">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-content">{title}</h3>
      <p className="mt-1 flex-1 text-sm leading-6 text-content-muted">{description}</p>
      <span className="mt-3 text-xs font-medium text-accent-600 group-hover:underline dark:text-accent-400">
        Learn more →
      </span>
    </Link>
  )
}
