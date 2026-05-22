import Link from 'next/link'
import { FlaskConical } from 'lucide-react'
import {
  API_ENVIRONMENTS,
  PRODUCTION_ENDPOINT_URLS,
  SANDBOX_ENDPOINT_URLS,
} from '@/lib/gateway-api'

function SandboxUrlLine({ label, url }: { label: string; url: string }) {
  return (
    <li className="break-all">
      <span className="text-content-muted">{label}:</span>{' '}
      <code className="text-xs text-amber-900 dark:text-amber-200">{url}</code>
    </li>
  )
}

export function SandboxDevNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="not-prose mb-6 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-4"
      role="note"
    >
      <div className="flex gap-3">
        <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="min-w-0 space-y-2 text-sm">
          <p className="font-semibold text-content">
            Development / sandbox: use <code>-sandbox</code> endpoints
          </p>
          <p className="text-content-muted">
            On <code>{API_ENVIRONMENTS.sandbox.baseUrl}</code> (dev), do{' '}
            <strong className="text-content">not</strong> call the production paths. Use the full
            sandbox URLs below — same request body, simulated responses, no real money movement.
          </p>
          <ul className="space-y-2 font-mono text-content">
            <SandboxUrlLine label="Validate beneficiary" url={SANDBOX_ENDPOINT_URLS.validateBeneficiary} />
            <SandboxUrlLine label="Process transfer" url={SANDBOX_ENDPOINT_URLS.processTransfer} />
          </ul>
          {!compact && (
            <p className="text-xs text-content-subtle">
              Production:{' '}
              <code className="break-all">{PRODUCTION_ENDPOINT_URLS.validateBeneficiary}</code>
              {' · '}
              <code className="break-all">{PRODUCTION_ENDPOINT_URLS.processTransfer}</code>
            </p>
          )}
          <p className="text-xs text-content-subtle">
            <Link href="/environments" className="text-accent-600 hover:underline dark:text-accent-400">
              Environments — full examples →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

/** Side-by-side production vs sandbox endpoint table */
export function SandboxEndpointTable() {
  const rows = [
    {
      action: 'Validate beneficiary',
      production: PRODUCTION_ENDPOINT_URLS.validateBeneficiary,
      sandbox: SANDBOX_ENDPOINT_URLS.validateBeneficiary,
    },
    {
      action: 'Process transfer',
      production: PRODUCTION_ENDPOINT_URLS.processTransfer,
      sandbox: SANDBOX_ENDPOINT_URLS.processTransfer,
    },
  ]

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-surface-muted">
          <tr>
            <th className="px-4 py-3 font-semibold text-content">Action</th>
            <th className="px-4 py-3 font-semibold text-content">Production</th>
            <th className="px-4 py-3 font-semibold text-amber-700 dark:text-amber-400">
              Development (sandbox)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.action}>
              <td className="px-4 py-3 align-top text-content-muted">{row.action}</td>
              <td className="px-4 py-3 align-top font-mono text-xs break-all text-content">
                {row.production}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs break-all text-amber-800 dark:text-amber-300">
                {row.sandbox}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-border bg-surface-muted px-4 py-2 text-xs text-content-subtle">
        Sandbox host: <code>{API_ENVIRONMENTS.sandbox.baseUrl}</code>
      </p>
    </div>
  )
}
