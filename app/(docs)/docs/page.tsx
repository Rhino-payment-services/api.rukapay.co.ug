import Link from 'next/link'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  KeyRound,
  BookOpen,
  FlaskConical,
  Receipt,
  Smartphone,
  Wallet,
  Zap,
} from 'lucide-react'
import { DocsHero } from '@/components/docs/DocsHero'
import { QuickAccessCard } from '@/components/docs/QuickAccessCard'
import { PaymentModuleCard } from '@/components/docs/PaymentModuleCard'
import { SplitContent } from '@/components/docs/SplitContent'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { TransactionModesTable } from '@/components/docs/TransactionModesTable'
import { authExamples } from '@/lib/code-samples'
import { GATEWAY_FULL_URL, GATEWAY_API_PATH } from '@/lib/gateway-api'
import { providers } from '@/lib/api-content'

export const metadata = { title: 'API Overview' }

export default function DocsHomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 xl:max-w-6xl">
      <DocsHero />

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-content">Quick access</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAccessCard
            title="View Documentation"
            description="Gateway API reference from rdbs_core — process-transfer, validation, status."
            href="/getting-started"
            icon={BookOpen}
          />
          <QuickAccessCard
            title="Generate API Keys"
            description="Obtain x-api-key credentials from your RukaPay partner dashboard."
            href="/api-keys"
            icon={KeyRound}
          />
          <QuickAccessCard
            title="Start Integration"
            description="POST to process-transfer with the correct transactionMode."
            href="/getting-started"
            icon={Zap}
          />
          <QuickAccessCard
            title="Test APIs"
            description="Full dev URLs for validate-beneficiary-sandbox and process-transfer-sandbox."
            href="/environments"
            icon={FlaskConical}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-lg font-semibold text-content">Gateway API</h2>
        <p className="mb-6 max-w-3xl text-sm text-content-muted">
          All payment flows use the <strong className="text-content">Gateway API</strong> tag in
          RukaPay — one endpoint (<code>POST process-transfer</code>) with different{' '}
          <code>transactionMode</code> values for MNO, banks, bills, and airtime.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PaymentModuleCard
            title="Collections"
            description="PARTNER_COLLECT_MNO — collect from MTN/Airtel (callbackUrl required)."
            href="/collections"
            icon={ArrowDownLeft}
            providers={providers.mobileMoney}
          />
          <PaymentModuleCard
            title="Payouts"
            description="PARTNER_SEND_MNO — send money to MTN or Airtel wallets."
            href="/payout"
            icon={ArrowUpRight}
            providers={providers.mobileMoney}
          />
          <PaymentModuleCard
            title="Bank Transfer"
            description="PARTNER_SEND_BANK — disburse to Ugandan bank accounts."
            href="/bank-transfer"
            icon={Building2}
            providers={providers.banks.slice(0, 3)}
          />
          <PaymentModuleCard
            title="Bill Payment"
            description="PARTNER_PAY_BILL_PAYMENT — NWSC, UMEME, TV, and more."
            href="/bill-payment"
            icon={Receipt}
            providers={providers.bills.slice(0, 3)}
          />
          <PaymentModuleCard
            title="Airtime"
            description="PARTNER_PAY_AIRTIME — top up MTN and Airtel numbers."
            href="/airtime"
            icon={Smartphone}
            providers={providers.airtime}
          />
          <PaymentModuleCard
            title="Transaction Status"
            description="Poll status by transaction ID or partnerReference."
            href="/transaction-status"
            icon={Wallet}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-content">Transaction modes</h2>
        <TransactionModesTable />
      </section>

      <section className="mb-12">
        <SplitContent code={<CodeBlock snippets={authExamples} defaultLanguage="curl" />}>
          <h2 id="introduction">Introduction</h2>
          <p>
            The RukaPay Gateway API lets partners collect payments, send payouts, pay bills, and
            purchase airtime through a single REST integration. Implementation lives in{' '}
            <code>rdbs_core</code> under <code>src/gateway/</code>, Swagger-tagged{' '}
            <strong>Gateway API</strong>.
          </p>
          <p>
            Authenticate with <code>x-api-key</code>. All transfers go to:
          </p>
          <code>{GATEWAY_FULL_URL}/process-transfer</code>
          <p className="mt-4 text-sm text-content-subtle">
            Base path: <code>{GATEWAY_API_PATH}</code>
          </p>
        </SplitContent>
      </section>

      <section>
        <h2 id="next-steps" className="mb-4 text-xl font-semibold text-content">
          Next steps
        </h2>
        <ul className="space-y-2 text-[15px] text-content-muted">
          <li>
            <Link href="/authentication" className="text-accent-600 dark:text-accent-400">
              Authentication
            </Link>{' '}
            — x-api-key and optional bearer token
          </li>
          <li>
            <Link href="/collections" className="text-accent-600 dark:text-accent-400">
              Collections
            </Link>{' '}
            — PARTNER_COLLECT_MNO
          </li>
          <li>
            <Link href="/webhooks" className="text-accent-600 dark:text-accent-400">
              Webhooks
            </Link>{' '}
            — callbackUrl payloads on completion
          </li>
        </ul>
      </section>
    </div>
  )
}
