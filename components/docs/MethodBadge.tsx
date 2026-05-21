import { cn } from '@/lib/utils'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const methodStyles: Record<HttpMethod, string> = {
  GET: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  POST: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  PUT: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  PATCH: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  DELETE: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
}

export function MethodBadge({
  method,
  className,
}: {
  method: HttpMethod
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide',
        methodStyles[method],
        className
      )}
    >
      {method}
    </span>
  )
}
