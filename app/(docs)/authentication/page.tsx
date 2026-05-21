import Link from 'next/link'
import { DocContentPage } from '@/components/docs/ApiReferencePage'
import { SplitContent } from '@/components/docs/SplitContent'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { GATEWAY_FULL_URL, GATEWAY_ENDPOINTS } from '@/lib/gateway-api'

export const metadata = { title: 'Authentication' }

const authExample = {
  curl: `curl ${GATEWAY_FULL_URL}/process-transfer \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"transactionMode":"PARTNER_SEND_MNO","amount":50000,"currency":"UGX","phoneNumber":"256700000000","mnoProvider":"MTN","narration":"Test","partnerReference":"REF-001"}'`,
}

export default function AuthenticationPage() {
  return (
    <DocContentPage
      title="Authentication"
      description="Gateway API authentication using x-api-key. Optional one-time bearer token for API_KEY_AND_TOKEN partners."
    >
      <p>
        The Gateway API (<code>src/gateway</code> in rdbs_core) uses{' '}
        <code>GatewayApiKeyGuard</code> on all protected routes. There is no SDK — integrate via
        HTTPS from your server.
      </p>

      <SplitContent code={<CodeBlock snippets={authExample} showTabs={false} title="cURL" />}>
        <h2 id="api-key">API key (primary)</h2>
        <p>Send your partner API key using the preferred header:</p>
        <code>x-api-key: YOUR_API_KEY</code>
        <p className="mt-4">Also accepted:</p>
        <ul>
          <li>
            <code>Authorization: Bearer YOUR_API_KEY</code> (treated as API key for API_KEY_ONLY
            partners)
          </li>
          <li>
            Query <code>?api_key=</code> or body field <code>apiKey</code>
          </li>
        </ul>
      </SplitContent>

      <h2 id="token">One-time bearer token</h2>
      <p>
        Partners configured with <code>API_KEY_AND_TOKEN</code> must also send a short-lived JWT:
      </p>
      <ol className="list-decimal pl-5">
        <li>
          <code>POST {GATEWAY_ENDPOINTS.generateToken.path}</code> — returns token (5 min, single
          use)
        </li>
        <li>
          Subsequent calls: both <code>x-api-key</code> and{' '}
          <code>Authorization: Bearer &lt;token&gt;</code>
        </li>
      </ol>

      <h2 id="rate-limits">Rate limits</h2>
      <p>
        <code>GatewayRateLimitGuard</code> enforces per-partner limits. Returns HTTP 429 when
        exceeded. See <Link href="/rate-limits">Rate Limits</Link>.
      </p>

      <p>
        Manage keys via <Link href="/api-keys">API Keys</Link> or the partner dashboard.
      </p>
    </DocContentPage>
  )
}
