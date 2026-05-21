import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  compact = false,
  sidebar = false,
  href = '/',
  tagline = 'Payment API Docs',
  onClick,
}: {
  className?: string
  compact?: boolean
  sidebar?: boolean
  href?: string
  tagline?: string
  onClick?: () => void
}) {
  const size = sidebar || compact ? 32 : 36

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn('flex items-center gap-2 transition-opacity hover:opacity-90', className)}
    >
      <Image
        src="/rukapay_logo.png"
        alt="RukaPay"
        width={size}
        height={size}
        className="shrink-0 rounded-md"
        priority
      />
      <div className="min-w-0 leading-tight">
        <span className="block text-sm font-semibold text-content">RukaPay</span>
        {!compact && !sidebar && tagline && (
          <span className="block text-[11px] text-content-subtle">{tagline}</span>
        )}
      </div>
    </Link>
  )
}
