import Link from 'next/link'
import {
  Building2,
  Users,
  UserCog,
  ArrowLeftRight,
  KeyRound,
} from 'lucide-react'
import { DocsPageLayout } from '@/components/docs/DocsPageLayout'
import { PaymentModuleCard } from '@/components/docs/PaymentModuleCard'
import { CodeBlockStatic } from '@/components/docs/CodeBlock'
import {
  PARTNER_INSTITUTIONS_BASE,
  PARTNER_INSTITUTIONS_PATH,
  partnerInstitutionsAuthCurl,
} from '@/lib/partner-institutions-api'

export const metadata = { title: 'Partner - Institutions' }

const toc = [
  { id: 'what', title: 'What it is' },
  { id: 'flow', title: 'Quick flow' },
  { id: 'auth', title: 'Auth' },
  { id: 'sections', title: 'Sections' },
]

export default function PartnerInstitutionsOverviewPage() {
  return (
    <DocsPageLayout toc={toc}>
      <article className="min-w-0 w-full max-w-none">
        <header className="mb-8 border-b border-border pb-8">
          <p className="mb-2 text-sm font-medium text-accent-600 dark:text-accent-400">
            Partner - Institutions
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-content">
            SACCO &amp; partner institutions
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-content-muted">
            Create a SACCO, add members and staff, then run savings, shares, and loan
            transactions — all under your partner API key.
          </p>
          <p className="mt-3 font-mono text-sm text-content-subtle">
            {PARTNER_INSTITUTIONS_PATH}
          </p>
        </header>

        <section id="what" className="docs-prose mb-10 scroll-mt-28">
          <h2>What it is</h2>
          <p>
            Use this API when you manage SACCOs (or similar institutions) on RukaPay — not for
            general Gateway payouts/collections.
          </p>
        </section>

        <section id="flow" className="mb-10 scroll-mt-28">
          <h2 className="mb-4 text-xl font-semibold text-content">Quick flow</h2>
          <ol className="not-prose space-y-3">
            {[
              { step: '1', title: 'Onboard', detail: 'Create the SACCO + optional settlement wallet' },
              { step: '2', title: 'Members', detail: 'Register members (phone + account / client id)' },
              { step: '3', title: 'Staff', detail: 'Invite operators with clear permissions' },
              { step: '4', title: 'Transact', detail: 'Deposit, withdraw, shares, loans, bulk ops' },
            ].map((item) => (
              <li
                key={item.step}
                className="flex gap-4 rounded-xl border border-border bg-surface-elevated px-4 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-sm font-semibold text-accent-700 dark:text-accent-400">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-content">{item.title}</p>
                  <p className="text-sm text-content-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="auth" className="mb-10 scroll-mt-28">
          <h2 className="mb-3 text-xl font-semibold text-content">Auth</h2>
          <p className="mb-4 text-sm text-content-muted">
            Send <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs">x-api-key</code> on every
            request. Same partner key as Gateway.
          </p>
          <div className="mb-3 flex flex-wrap gap-2 text-xs text-content-subtle">
            <span className="rounded-md border border-border px-2 py-1 font-mono">
              Live · {PARTNER_INSTITUTIONS_BASE.production}
            </span>
            <span className="rounded-md border border-border px-2 py-1 font-mono">
              Dev · {PARTNER_INSTITUTIONS_BASE.sandbox}
            </span>
          </div>
          <CodeBlockStatic code={partnerInstitutionsAuthCurl} language="bash" title="cURL" />
          <p className="mt-3 text-sm text-content-muted">
            <Link href="/api-keys" className="inline-flex items-center gap-1 text-accent-600 dark:text-accent-400">
              <KeyRound className="h-3.5 w-3.5" />
              Get API keys
            </Link>
          </p>
        </section>

        <section id="sections" className="scroll-mt-28">
          <h2 className="mb-4 text-xl font-semibold text-content">Sections</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <PaymentModuleCard
              title="Onboarding"
              description="Create and list SACCOs. Set withdrawal rules."
              href="/partner-institutions/onboarding"
              icon={Building2}
            />
            <PaymentModuleCard
              title="Members"
              description="Add, update, validate phone, or bulk-upload members."
              href="/partner-institutions/members"
              icon={Users}
            />
            <PaymentModuleCard
              title="Staff"
              description="Invite staff, set roles, resend invitations."
              href="/partner-institutions/staff"
              icon={UserCog}
            />
            <PaymentModuleCard
              title="Transactions"
              description="Wallet, deposits, loans, shares, and bulk runs."
              href="/partner-institutions/transactions"
              icon={ArrowLeftRight}
            />
          </div>
        </section>
      </article>
    </DocsPageLayout>
  )
}
