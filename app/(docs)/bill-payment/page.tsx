import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { billPaymentEndpoints } from '@/lib/api-content'
import { TRANSACTION_MODES } from '@/lib/gateway-api'

export const metadata = { title: 'Bill Payment API' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'process-transfer', title: 'Pay bill' },
  { id: 'validate-beneficiary', title: 'Validate account' },
  { id: 'transactions-transactionIdOrReference-status', title: 'Status' },
]

const billExample = {
  curl: `curl -X POST https://api.rukapay.net/api/v1/gateway/process-transfer \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transactionMode": "PARTNER_PAY_BILL_PAYMENT",
    "amount": 85000,
    "currency": "UGX",
    "billerCode": "NWSC",
    "accountNumber": "04151234567",
    "narration": "Water bill",
    "partnerReference": "BILL-NWSC-001"
  }'`,
}

export default function BillPaymentPage() {
  return (
    <ApiReferencePage
      badge="Gateway API"
      title="Bill Payment API"
      description={`Pay utilities and subscriptions with ${TRANSACTION_MODES.PARTNER_PAY_BILL_PAYMENT.code}.`}
      toc={toc}
      codeSnippets={billExample}
      defaultLanguage="curl"
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Bill payments use <code>billerCode</code> (e.g. NWSC, UMEME) and customer{' '}
            <code>accountNumber</code>. Aliases <code>biller_code</code> and{' '}
            <code>account_number</code> are accepted on validate-beneficiary.
          </p>
        </>
      }
      endpoints={billPaymentEndpoints}
    />
  )
}
