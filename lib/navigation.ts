export type NavItem = {
  title: string
  href?: string
  items?: NavItem[]
}

export const docsNavigation: NavItem[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Getting Started', href: '/getting-started' },
      { title: 'Authentication', href: '/authentication' },
      { title: 'API Keys', href: '/api-keys' },
    ],
  },
  {
    title: 'Gateway API',
    items: [
      { title: 'Collections API', href: '/collections' },
      { title: 'Payout API', href: '/payout' },
      { title: 'Wallet API', href: '/wallet' },
      { title: 'Bank Transfer API', href: '/bank-transfer' },
      { title: 'Bill Payment API', href: '/bill-payment' },
      { title: 'Airtime API', href: '/airtime' },
    ],
  },
  {
    title: 'Partner - Institutions',
    items: [
      { title: 'Overview', href: '/partner-institutions' },
      { title: 'Onboarding', href: '/partner-institutions/onboarding' },
      { title: 'Members', href: '/partner-institutions/members' },
      { title: 'Staff', href: '/partner-institutions/staff' },
      { title: 'Transactions', href: '/partner-institutions/transactions' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { title: 'Transaction Status', href: '/transaction-status' },
      { title: 'Webhooks', href: '/webhooks' },
      { title: 'Error Codes', href: '/error-codes' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { title: 'Environments', href: '/environments' },
      { title: 'Rate Limits', href: '/rate-limits' },
      { title: 'Changelog', href: '/changelog' },
    ],
  },
]

export const apiVersions = ['v2.1', 'v2.0', 'v1.0'] as const

export const languages = [
  { code: 'en', label: 'English' },
] as const
