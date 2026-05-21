import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PaymentModuleCard({
  title,
  description,
  href,
  icon: Icon,
  providers,
}: {
  title: string
  description: string
  href: string
  icon: LucideIcon
  providers?: string[]
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col rounded-xl border border-border bg-surface-elevated p-5 transition-all',
        'hover:border-accent-500/30 hover:shadow-card'
      )}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-muted text-accent-600 dark:text-accent-400">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-content">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-content-muted">{description}</p>
      {providers && providers.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {providers.map((p) => (
            <span
              key={p}
              className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-[10px] text-content-subtle"
            >
              {p}
            </span>
          ))}
        </div>
      )}
      <span className="mt-4 text-xs font-medium text-accent-600 group-hover:underline dark:text-accent-400">
        View API →
      </span>
    </Link>
  )
}
