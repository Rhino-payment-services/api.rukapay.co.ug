import type { Metadata } from 'next'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { LandingPage } from '@/components/marketing/LandingPage'

export const metadata: Metadata = {
  title: 'RukaPay — Payment APIs for Uganda',
  description:
    'Professional payment infrastructure for collections, payouts, bank transfers, bills, and airtime. Gateway API documentation and integration guides.',
  openGraph: {
    title: 'RukaPay Payment APIs',
    description:
      'Secure Gateway APIs for MTN, Airtel, banks, and bill networks across Uganda.',
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <LandingPage />
      </main>
      <MarketingFooter />
    </div>
  )
}
