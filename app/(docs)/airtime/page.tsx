import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { airtimeEndpoints } from '@/lib/api-content'
import { TRANSACTION_MODES } from '@/lib/gateway-api'

export const metadata = { title: 'Airtime API' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'post-process-transfer', title: 'Purchase airtime' },
  { id: 'post-validate-beneficiary', title: 'Validate number' },
  { id: 'get-transactions-transactionIdOrReference-status', title: 'Status' },
]

const airtimeExample = {
  curl: `curl -X POST https://api.rukapay.net/api/v1/gateway/process-transfer \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transactionMode": "PARTNER_PAY_AIRTIME",
    "amount": 5000,
    "currency": "UGX",
    "phoneNumber": "256700000000",
    "mnoProvider": "MTN",
    "narration": "Airtime top-up",
    "partnerReference": "AIRTIME-001"
  }'`,
}

export default function AirtimePage() {
  return (
    <ApiReferencePage
      badge="Gateway API"
      title="Airtime API"
      description={`Top up phone numbers with ${TRANSACTION_MODES.PARTNER_PAY_AIRTIME.code} — ABC routing.`}
      toc={toc}
      codeSnippets={airtimeExample}
      defaultLanguage="curl"
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Airtime purchases require <code>phoneNumber</code> (256XXXXXXXXX) and{' '}
            <code>mnoProvider</code> (or alias <code>network</code>). Routed through configured
            airtime partner integration.
          </p>
        </>
      }
      endpoints={airtimeEndpoints}
    />
  )
}
