import { cn } from '@/lib/utils'

export function SplitContent({
  children,
  code,
  reverse = false,
  className,
}: {
  children: React.ReactNode
  code: React.ReactNode
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start',
        reverse && 'lg:[&>*:first-child]:order-2',
        className
      )}
    >
      <div className="docs-prose min-w-0">{children}</div>
      <div className="lg:sticky lg:top-28">{code}</div>
    </div>
  )
}
