import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { payoutEndpoints } from '@/lib/api-content'
import { payoutExamples } from '@/lib/code-samples'
import { TRANSACTION_MODES } from '@/lib/gateway-api'

export const metadata = { title: 'Payout API' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'post-process-transfer', title: 'Payout (process-transfer)' },
  { id: 'post-validate-beneficiary', title: 'Validate beneficiary' },
  { id: 'get-transactions-transactionIdOrReference-status', title: 'Status' },
]

export default function PayoutPage() {
  return (
    <ApiReferencePage
      badge="Gateway API"
      title="Payout API"
      description={`Send money to MTN and Airtel wallets using ${TRANSACTION_MODES.PARTNER_SEND_MNO.code}. Routed via ABC integration.`}
      toc={toc}
      codeSnippets={payoutExamples}
      defaultLanguage="curl"
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Payouts debit your partner <code>ESCROW</code> or <code>COMMISSION</code> wallet and
            credit the recipient&apos;s mobile money account. Minimum amount: 100 UGX.
          </p>
          <p>
            Validate the recipient first with <code>POST validate-beneficiary</code> using the
            same transactionMode.
          </p>
        </>
      }
      endpoints={payoutEndpoints}
    />
  )
}
