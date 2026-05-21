import Link from 'next/link'
import { DocContentPage } from '@/components/docs/ApiReferencePage'
import { SANDBOX_ENDPOINT_URLS } from '@/lib/gateway-api'

export const metadata = { title: 'API Keys' }

export default function ApiKeysPage() {
  return (
    <DocContentPage
      title="API Keys"
      description="Gateway API keys for x-api-key authentication on /api/v1/gateway endpoints."
    >
      <h2 id="overview">Overview</h2>
      <p>
        API keys authenticate requests to the Gateway API. Keys are 32–64 character strings,
        stored hashed server-side. Send via <code>x-api-key</code> header on every request.
      </p>

      <h2 id="types">Partner auth modes</h2>
      <ul>
        <li>
          <code>API_KEY_ONLY</code> — only <code>x-api-key</code> required
        </li>
        <li>
          <code>API_KEY_AND_TOKEN</code> — also requires one-time bearer from{' '}
          <code>POST /api/v1/gateway/partners/generate-token</code>
        </li>
      </ul>

      <h2 id="create">Obtaining keys</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Partner account created via Gateway Admin or public signup</li>
        <li>API key issued in partner dashboard or admin console</li>
        <li>
          Use sandbox keys against{' '}
          <code className="break-all text-xs">{SANDBOX_ENDPOINT_URLS.processTransfer}</code> and{' '}
          <code className="break-all text-xs">{SANDBOX_ENDPOINT_URLS.validateBeneficiary}</code>{' '}
          (see <Link href="/environments">Environments</Link>)
        </li>
      </ol>

      <h2 id="security">Security</h2>
      <ul>
        <li>Never expose keys in mobile or browser code</li>
        <li>Rotate revoked or compromised keys immediately</li>
        <li>Use environment variables in production</li>
      </ul>

      <p>
        <Link href="/getting-started">Getting Started</Link> ·{' '}
        <Link href="/authentication">Authentication</Link>
      </p>
    </DocContentPage>
  )
}
