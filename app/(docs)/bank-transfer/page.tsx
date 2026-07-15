import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { bankTransferEndpoints } from '@/lib/api-content'
import { TRANSACTION_MODES } from '@/lib/gateway-api'

export const metadata = { title: 'Bank Transfer API' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'post-process-transfer', title: 'Bank send' },
  { id: 'post-validate-beneficiary', title: 'Validate account' },
  { id: 'get-transactions-transactionIdOrReference-status', title: 'Status' },
]

const bankExample = {
  curl: `curl -X POST https://api.rukapay.net/api/v1/gateway/process-transfer \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transactionMode": "PARTNER_SEND_BANK",
    "amount": 500000,
    "currency": "UGX",
    "accountNumber": "9030012345678",
    "bankCode": "STANBIC",
    "accountName": "John Doe",
    "narration": "Vendor payment",
    "partnerReference": "VENDOR-PAY-88"
  }'`,
}

export default function BankTransferPage() {
  return (
    <ApiReferencePage
      badge="Gateway API"
      title="Bank Transfer API"
      description={`Bank payouts via ${TRANSACTION_MODES.PARTNER_SEND_BANK.code} — ABC or Pegasus routing.`}
      toc={toc}
      codeSnippets={bankExample}
      defaultLanguage="curl"
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Send funds from your partner wallet to Ugandan bank accounts. Required fields:{' '}
            <code>accountNumber</code>, <code>bankCode</code>, <code>accountName</code>.
          </p>
        </>
      }
      endpoints={bankTransferEndpoints}
    />
  )
}
