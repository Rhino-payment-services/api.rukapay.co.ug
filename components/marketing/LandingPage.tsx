import Link from 'next/link'
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Code2,
  FlaskConical,
  KeyRound,
  Receipt,
  Shield,
  Smartphone,
  Webhook,
  Zap,
} from 'lucide-react'
import {
  GATEWAY_API_PATH,
  SANDBOX_ENDPOINT_URLS,
  TRANSACTION_MODES,
} from '@/lib/gateway-api'

const capabilities = [
  {
    icon: ArrowDownLeft,
    title: 'Collections',
    description: 'Collect from MTN and Airtel wallets. Funds credit your partner wallet with webhook callbacks.',
    href: '/collections',
    mode: TRANSACTION_MODES.PARTNER_COLLECT_MNO.code,
  },
  {
    icon: ArrowUpRight,
    title: 'Payouts',
    description: 'Disburse to mobile money instantly. Validate beneficiaries before your first live payout.',
    href: '/payout',
    mode: TRANSACTION_MODES.PARTNER_SEND_MNO.code,
  },
  {
    icon: Building2,
    title: 'Bank transfers',
    description: 'Send to Ugandan bank accounts with a single transaction mode and partner reference.',
    href: '/bank-transfer',
    mode: TRANSACTION_MODES.PARTNER_SEND_BANK.code,
  },
  {
    icon: Receipt,
    title: 'Bill payments',
    description: 'Pay utilities and subscriptions — NWSC, UMEME, TV, and more through one API.',
    href: '/bill-payment',
    mode: TRANSACTION_MODES.PARTNER_PAY_BILL_PAYMENT.code,
  },
  {
    icon: Smartphone,
    title: 'Airtime',
    description: 'Top up MTN and Airtel numbers programmatically for your customers or agents.',
    href: '/airtime',
    mode: TRANSACTION_MODES.PARTNER_PAY_AIRTIME.code,
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Receive SUCCESS and FAILED callbacks on your HTTPS endpoint for collections and async flows.',
    href: '/webhooks',
    mode: 'callbackUrl',
  },
]

const steps = [
  {
    step: '01',
    title: 'Get API credentials',
    description: 'Create a partner account and generate sandbox keys for dev-api.rukapay.net.',
    icon: KeyRound,
  },
  {
    step: '02',
    title: 'Integrate in sandbox',
    description: 'Use -sandbox endpoints to validate flows without moving real funds.',
    icon: FlaskConical,
  },
  {
    step: '03',
    title: 'Go live',
    description: 'Switch to production URLs on api.rukapay.net with live keys and webhooks.',
    icon: Zap,
  },
]

const heroSnippet = `curl -X POST \\
  https://dev-api.rukapay.net/api/v1/gateway/process-transfer-sandbox \\
  -H "x-api-key: YOUR_SANDBOX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transactionMode": "PARTNER_COLLECT_MNO",
    "amount": 50000,
    "currency": "UGX",
    "phoneNumber": "256700000000",
    "mnoProvider": "MTN",
    "partnerReference": "INV-1001",
    "callbackUrl": "https://your-app.com/webhooks/rukapay"
  }'`

export function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-in">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/25 bg-accent-500/10 px-3 py-1 text-xs font-medium text-accent-700 dark:text-accent-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Gateway API · Uganda fintech infrastructure
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-content sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Payment APIs built for{' '}
                <span className="text-accent-600 dark:text-accent-400">scale</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-content-muted">
                Integrate collections, payouts, bank transfers, bill payments, and airtime through
                one secure Gateway API — designed for partners who need reliability across MTN,
                Airtel, and Ugandan banks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/getting-started"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-700"
                >
                  Start integrating
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-5 py-3 text-sm font-semibold text-content transition-colors hover:bg-surface-muted"
                >
                  <Code2 className="h-4 w-4" />
                  View API reference
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-content-subtle">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  x-api-key authentication
                </span>
                <span className="font-mono text-xs">{GATEWAY_API_PATH}</span>
              </div>
            </div>

            <div className="relative animate-fade-in lg:pl-4">
              <div className="overflow-hidden rounded-xl border border-border bg-code-bg shadow-card dark:shadow-none">
                <div className="flex items-center gap-2 border-b border-code-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">sandbox · process-transfer</span>
                </div>
                <pre className="max-h-[320px] overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-300">
                  <code>{heroSnippet}</code>
                </pre>
              </div>
              <p className="mt-3 text-center text-xs text-content-subtle lg:text-left">
                Development uses{' '}
                <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[11px]">
                  process-transfer-sandbox
                </code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-surface-muted/50 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 text-sm font-medium text-content-muted sm:px-6 lg:px-8">
          <span>MTN Mobile Money</span>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <span>Airtel Money</span>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <span>Bank disbursements</span>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <span>Bill &amp; utility networks</span>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <span>REST · JSON · Webhooks</span>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
              One API, every payment flow
            </h2>
            <p className="mt-4 text-lg text-content-muted">
              A single <code className="rounded-md border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-sm text-content">process-transfer</code>{' '}
              endpoint powers all transaction types. Choose the right{' '}
              <code className="rounded-md border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-sm text-content">transactionMode</code>{' '}
              and go.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex flex-col rounded-2xl border border-border bg-surface-elevated p-6 transition-all hover:border-accent-500/30 hover:shadow-card"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-content group-hover:text-accent-600 dark:group-hover:text-accent-400">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-content-muted">
                  {item.description}
                </p>
                <p className="mt-4 font-mono text-[11px] text-content-subtle">{item.mode}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-600 dark:text-accent-400">
                  Read docs
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-20 border-y border-border bg-surface-muted/40 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
              From sandbox to production
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-content-muted">
              Test safely on dev, then ship with the same request shapes on production.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-border bg-surface p-6 shadow-soft"
              >
                <span className="font-mono text-xs font-semibold text-accent-600 dark:text-accent-400">
                  {item.step}
                </span>
                <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-content">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-content">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers */}
      <section id="developers" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
                Built for developers
              </h2>
              <p className="mt-4 text-lg text-content-muted">
                Clear REST contracts, predictable errors, and documentation aligned with the live{' '}
                <strong className="font-medium text-content">rdbs_core</strong> Gateway API
                implementation.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Idempotent partnerReference on every transfer',
                  'Validate beneficiaries before payouts',
                  'Poll transaction status by ID or reference',
                  'HTTPS callbacks for collection completion',
                ].map((text) => (
                  <li key={text} className="flex gap-3 text-sm text-content-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    {text}
                  </li>
                ))}
              </ul>
              <Link
                href="/environments"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
              >
                <FlaskConical className="h-4 w-4" />
                Sandbox environment guide
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6">
              <p className="text-sm font-semibold text-content">Development endpoints</p>
              <p className="mt-2 text-sm text-content-muted">
                On dev-api.rukapay.net, always use the full sandbox URLs:
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <p className="text-xs text-content-subtle">Validate beneficiary</p>
                  <code className="mt-1 block break-all rounded-lg border border-border bg-surface px-3 py-2 font-mono text-[11px] text-content">
                    {SANDBOX_ENDPOINT_URLS.validateBeneficiary}
                  </code>
                </li>
                <li>
                  <p className="text-xs text-content-subtle">Process transfer</p>
                  <code className="mt-1 block break-all rounded-lg border border-border bg-surface px-3 py-2 font-mono text-[11px] text-content">
                    {SANDBOX_ENDPOINT_URLS.processTransfer}
                  </code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-accent-600 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to build?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Explore the full API reference, generate keys, and ship your first integration in the
            sandbox.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-50"
            >
              Open documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/api-keys"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <KeyRound className="h-4 w-4" />
              API keys
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
