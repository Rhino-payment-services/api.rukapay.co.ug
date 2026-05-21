import { cn } from '@/lib/utils'

export type Parameter = {
  name: string
  type: string
  required?: boolean
  description: string
}

export function ParameterTable({
  title,
  parameters,
  className,
}: {
  title: string
  parameters: Parameter[]
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border', className)}>
      <div className="border-b border-border bg-surface-muted px-4 py-3">
        <h4 className="text-sm font-semibold text-content">{title}</h4>
      </div>
      <div className="divide-y divide-border">
        {parameters.map((param) => (
          <div
            key={param.name}
            className="grid gap-2 px-4 py-3 sm:grid-cols-[minmax(140px,1fr)_minmax(80px,auto)_1fr]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <code className="rounded-md bg-surface-muted px-1.5 py-0.5 font-mono text-[13px] text-content">
                {param.name}
              </code>
              {param.required && (
                <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-600 dark:text-accent-400">
                  Required
                </span>
              )}
            </div>
            <span className="font-mono text-xs text-content-subtle">{param.type}</span>
            <p className="text-sm leading-6 text-content-muted sm:col-span-1">{param.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
