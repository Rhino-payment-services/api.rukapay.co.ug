import Link from 'next/link'
import { DocContentPage } from '@/components/docs/ApiReferencePage'
import { SplitContent } from '@/components/docs/SplitContent'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { TransactionModesTable } from '@/components/docs/TransactionModesTable'
import { SandboxDevNotice } from '@/components/docs/SandboxDevNotice'
import { sandboxTransferExamples, authExamples, API_ENVIRONMENTS } from '@/lib/code-samples'
import {
  GATEWAY_ENDPOINTS,
  PRODUCTION_ENDPOINT_URLS,
  SANDBOX_ENDPOINT_URLS,
} from '@/lib/gateway-api'

export const metadata = { title: 'Getting Started' }

export default function GettingStartedPage() {
  return (
    <DocContentPage
      title="Getting Started"
      description="Integrate the RukaPay Gateway API — use -sandbox endpoints in development."
    >
      <SandboxDevNotice />

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>Active RukaPay gateway partner account</li>
        <li>Sandbox API key for dev; live key for production</li>
        <li>HTTPS endpoint for <code>callbackUrl</code> (required for collections)</li>
      </ul>

      <h2 id="environments">Which endpoint should I use?</h2>
      <div className="not-prose overflow-hidden rounded-xl border border-border text-sm">
        <table className="w-full text-left">
          <thead className="bg-surface-muted">
            <tr>
              <th className="px-4 py-2 font-semibold">Environment</th>
              <th className="px-4 py-2 font-semibold">Process transfer</th>
              <th className="px-4 py-2 font-semibold">Validate beneficiary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-2 align-top text-content-muted">Development</td>
              <td className="px-4 py-2 align-top font-mono text-xs break-all text-amber-800 dark:text-amber-300">
                {SANDBOX_ENDPOINT_URLS.processTransfer}
              </td>
              <td className="px-4 py-2 align-top font-mono text-xs break-all text-amber-800 dark:text-amber-300">
                {SANDBOX_ENDPOINT_URLS.validateBeneficiary}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 align-top text-content-muted">Production</td>
              <td className="px-4 py-2 align-top font-mono text-xs break-all">
                {PRODUCTION_ENDPOINT_URLS.processTransfer}
              </td>
              <td className="px-4 py-2 align-top font-mono text-xs break-all">
                {PRODUCTION_ENDPOINT_URLS.validateBeneficiary}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-content-muted">
        Dev base URL: <code>{API_ENVIRONMENTS.sandbox.baseUrl}</code> · Production:{' '}
        <code>{API_ENVIRONMENTS.production.baseUrl}</code>
      </p>

      <h2 id="transaction-modes">Transaction modes</h2>
      <p>
        Same <code>transactionMode</code> values for sandbox and production — only the URL path
        changes in dev.
      </p>
      <TransactionModesTable />

      <h2 id="steps">Integration steps</h2>
      <ol className="list-decimal space-y-4 pl-5">
        <li>
          <strong className="text-content">Get sandbox API keys</strong> —{' '}
          <Link href="/api-keys">API Keys</Link>
        </li>
        <li>
          <strong className="text-content">Validate beneficiary (dev)</strong> —{' '}
          <code className="break-all text-xs">{SANDBOX_ENDPOINT_URLS.validateBeneficiary}</code>
        </li>
        <li>
          <strong className="text-content">Process transfer (dev)</strong> —{' '}
          <code className="break-all text-xs">{SANDBOX_ENDPOINT_URLS.processTransfer}</code>
        </li>
        <li>
          <strong className="text-content">Handle callback</strong> — POST to your{' '}
          <code>callbackUrl</code> on SUCCESS / FAILED
        </li>
        <li>
          <strong className="text-content">Go live</strong> — swap to production paths on{' '}
          api.rukapay.net
        </li>
      </ol>

      <div className="mt-8">
        <SplitContent code={<CodeBlock snippets={sandboxTransferExamples} defaultLanguage="curl" />}>
          <h2 id="first-request">First request (development)</h2>
          <p>
            Example collection against{' '}
            <code className="break-all text-xs">{SANDBOX_ENDPOINT_URLS.processTransfer}</code>.
            Include <code>callbackUrl</code> for{' '}
            <code>PARTNER_COLLECT_MNO</code>.
          </p>
        </SplitContent>
      </div>

      <div className="mt-8">
        <h2 id="production-example">Production example</h2>
        <p className="mb-4 text-sm text-content-muted">
          After testing, use the same body against{' '}
          <code>{GATEWAY_ENDPOINTS.processTransfer.path}</code>:
        </p>
        <CodeBlock snippets={authExamples} defaultLanguage="curl" />
      </div>

      <h2 id="explore">Explore</h2>
      <ul>
        <li>
          <Link href="/environments">Environments</Link> — full sandbox vs production guide
        </li>
        <li>
          <Link href="/collections">Collections</Link>
        </li>
        <li>
          <Link href="/payout">Payouts</Link>
        </li>
      </ul>
    </DocContentPage>
  )
}
