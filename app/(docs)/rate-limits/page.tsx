import { DocContentPage } from '@/components/docs/ApiReferencePage'

export const metadata = { title: 'Rate Limits' }

export default function RateLimitsPage() {
  return (
    <DocContentPage
      title="Rate Limits"
      description="GatewayRateLimitGuard enforces per-partner API rate limits."
    >
      <h2 id="limits">Documented tiers</h2>
      <div className="not-prose overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface-muted">
            <tr>
              <th className="px-4 py-3 font-semibold text-content">Tier</th>
              <th className="px-4 py-3 font-semibold text-content">Limit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-3 text-content-muted">Basic</td>
              <td className="px-4 py-3 font-mono text-xs">50 requests / minute</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-content-muted">Standard</td>
              <td className="px-4 py-3 font-mono text-xs">100 requests / minute</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-content-muted">Premium</td>
              <td className="px-4 py-3 font-mono text-xs">500 requests / minute</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-content-muted">Enterprise</td>
              <td className="px-4 py-3 text-content-muted">Custom</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="response">When exceeded</h2>
      <p>
        HTTP <code>429 Too Many Requests</code>. If the rate-limit service is unavailable, you may
        receive <code>503</code>.
      </p>
    </DocContentPage>
  )
}
