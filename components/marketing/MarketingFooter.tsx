import Link from 'next/link'
import Image from 'next/image'

const footerGroups = [
  {
    title: 'Documentation',
    links: [
      { label: 'API Overview', href: '/docs' },
      { label: 'Getting Started', href: '/getting-started' },
      { label: 'Authentication', href: '/authentication' },
      { label: 'Environments', href: '/environments' },
    ],
  },
  {
    title: 'Gateway API',
    links: [
      { label: 'Collections', href: '/collections' },
      { label: 'Payouts', href: '/payout' },
      { label: 'Bank Transfer', href: '/bank-transfer' },
      { label: 'Webhooks', href: '/webhooks' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'API Keys', href: '/api-keys' },
      { label: 'Error Codes', href: '/error-codes' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Rate Limits', href: '/rate-limits' },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/rukapay_logo.png"
                alt="RukaPay"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="text-sm font-semibold text-content">RukaPay</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-content-muted">
              Gateway APIs for mobile money, bank transfers, bill payments, and airtime across
              Uganda.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-content-subtle">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-content-muted transition-colors hover:text-content"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-8 text-sm text-content-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RukaPay. All rights reserved.</p>
          <p className="font-mono text-xs">Gateway API · /api/v1/gateway</p>
        </div>
      </div>
    </footer>
  )
}
