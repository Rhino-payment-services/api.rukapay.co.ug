import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, KeyRound, FlaskConical } from 'lucide-react'
import { GATEWAY_API_PATH } from '@/lib/gateway-api'

export function DocsHero() {
  return (
    <header className="mb-10 border-b border-border pb-10">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Gateway API
        </span>
        <span className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-content-muted">
          {GATEWAY_API_PATH}
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
        RukaPay Gateway API
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-content-muted">
        RukaPay provides secure and scalable payment APIs for businesses to collect payments,
        process payouts, transfer money, pay bills, and purchase airtime across mobile money
        networks and banks.
      </p>
      <p className="mt-2 max-w-3xl text-sm text-content-subtle">
        Money transfer API — send to MNO (MTN/Airtel), banks, bill payments, and airtime via{' '}
        <code>POST process-transfer</code>.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/getting-started"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700"
        >
          <BookOpen className="h-4 w-4" />
          Getting started
        </Link>
        <Link
          href="/getting-started"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium text-content transition-colors hover:bg-surface-muted"
        >
          Start Integration
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/api-keys"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-content-muted transition-colors hover:bg-surface-muted hover:text-content"
        >
          <KeyRound className="h-4 w-4" />
          Generate API Keys
        </Link>
        <Link
          href="/environments"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-content-muted transition-colors hover:bg-surface-muted hover:text-content"
        >
          <FlaskConical className="h-4 w-4" />
          Test APIs
        </Link>
      </div>
    </header>
  )
}
