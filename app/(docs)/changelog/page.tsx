import { DocContentPage } from '@/components/docs/ApiReferencePage'

export const metadata = { title: 'Changelog' }

const releases = [
  {
    version: 'v2.1',
    date: '2026-05-01',
    items: [
      'Added bulk payout endpoint with batch status tracking',
      'Bill payment validation endpoint for UMEME and NWSC',
      'Improved webhook signature verification',
    ],
  },
  {
    version: 'v2.0',
    date: '2026-01-15',
    items: [
      'Unified transaction object across all payment APIs',
      'Bank transfer API for major Ugandan banks',
      'Airtime API for MTN and Airtel',
    ],
  },
  {
    version: 'v1.0',
    date: '2025-06-01',
    items: [
      'Initial release: Collections, Payouts, and Wallet APIs',
      'MTN and Airtel Mobile Money support',
    ],
  },
]

export default function ChangelogPage() {
  return (
    <DocContentPage
      title="Changelog"
      description="API version history, new endpoints, and breaking changes."
    >
      {releases.map((release) => (
        <div key={release.version} className="mb-8 border-b border-border pb-8 last:border-0">
          <div className="mb-3 flex items-baseline gap-3">
            <h2 className="!mt-0 text-lg font-semibold text-content">{release.version}</h2>
            <span className="text-sm text-content-subtle">{release.date}</span>
          </div>
          <ul>
            {release.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </DocContentPage>
  )
}
