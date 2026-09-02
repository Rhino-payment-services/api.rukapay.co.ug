'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CodeBlockStatic } from '@/components/docs/CodeBlock'
import {
  BILLERS,
  BILLER_EXAMPLES,
  buildBillCurl,
  type BillerCode,
} from '@/lib/bill-payment-api'
import {
  PRODUCTION_ENDPOINT_URLS,
  SANDBOX_ENDPOINT_URLS,
} from '@/lib/gateway-api'

export function BillerExamples() {
  const [activeBiller, setActiveBiller] = useState<BillerCode>('UMEME')
  const biller = BILLERS.find((b) => b.code === activeBiller)!
  const examples = BILLER_EXAMPLES[activeBiller]

  const validateCurl = buildBillCurl(
    PRODUCTION_ENDPOINT_URLS.validateBeneficiary,
    examples.validate
  )
  const payCurl = buildBillCurl(
    PRODUCTION_ENDPOINT_URLS.processTransfer,
    examples.pay
  )
  const sandboxValidateCurl = buildBillCurl(
    SANDBOX_ENDPOINT_URLS.validateBeneficiary,
    examples.validate
  )

  return (
    <div className="not-prose space-y-4">
      <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-surface-muted p-1">
        {BILLERS.map((b) => (
          <button
            key={b.code}
            type="button"
            onClick={() => setActiveBiller(b.code)}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              activeBiller === b.code
                ? 'bg-surface-elevated text-content shadow-sm'
                : 'text-content-muted hover:text-content'
            )}
          >
            {b.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-content-muted">
        <strong className="text-content">{biller.label}</strong> — {biller.description}
        {biller.sandboxAccount && (
          <>
            {' '}
            · Sandbox test account:{' '}
            <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs">
              {biller.sandboxAccount}
            </code>
          </>
        )}
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="mb-2 text-sm font-semibold text-content">
            Step 1 — Validate account
          </h4>
          <CodeBlockStatic code={validateCurl} language="bash" title="Production" />
          <p className="mt-2 text-xs text-content-muted">
            On sandbox use{' '}
            <code className="font-mono">validate-beneficiary-sandbox</code> instead.
          </p>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-content">
            Step 2 — Pay bill
          </h4>
          <CodeBlockStatic code={payCurl} language="bash" title="Production" />
          <div className="mt-3 rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-content-muted">
            <p className="font-medium text-content">Required fields for {biller.label}</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>
                <code>customerName</code> — from validate response{' '}
                <code>beneficiary.name</code>
              </li>
              <li>
                <code>phoneNumber</code> — real Uganda MSISDN (256XXXXXXXXX)
              </li>
              {biller.extraFields.map((field) => (
                <li key={field}>
                  <code>{field}</code> — {biller.payNotes.split('.')[0]}
                </li>
              ))}
            </ul>
            {biller.extraFields.length === 0 && (
              <p className="mt-2">{biller.payNotes}</p>
            )}
          </div>
        </div>
      </div>

      <details className="rounded-lg border border-border bg-surface-muted">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-content">
          Sandbox validate example
        </summary>
        <div className="border-t border-border p-4">
          <CodeBlockStatic code={sandboxValidateCurl} language="bash" title="Sandbox" />
        </div>
      </details>
    </div>
  )
}

export function SupportedBillersTable() {
  return (
    <div className="not-prose overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-2 pr-4 font-semibold text-content">Code</th>
            <th className="py-2 pr-4 font-semibold text-content">Biller</th>
            <th className="py-2 pr-4 font-semibold text-content">Extra pay fields</th>
            <th className="py-2 font-semibold text-content">Sandbox account</th>
          </tr>
        </thead>
        <tbody>
          {BILLERS.map((biller) => (
            <tr key={biller.code} className="border-b border-border">
              <td className="py-2.5 pr-4">
                <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs">
                  {biller.code}
                </code>
              </td>
              <td className="py-2.5 pr-4 text-content-muted">{biller.description}</td>
              <td className="py-2.5 pr-4 text-content-muted">
                {biller.extraFields.length > 0 ? (
                  biller.extraFields.map((f) => (
                    <code key={f} className="mr-1 font-mono text-xs">
                      {f}
                    </code>
                  ))
                ) : (
                  <span className="text-content-subtle">—</span>
                )}
              </td>
              <td className="py-2.5 text-content-muted">
                {biller.sandboxAccount ? (
                  <code className="font-mono text-xs">{biller.sandboxAccount}</code>
                ) : (
                  <span className="text-content-subtle">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
