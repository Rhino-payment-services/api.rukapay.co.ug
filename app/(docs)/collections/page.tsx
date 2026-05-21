import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { collectionEndpoints } from '@/lib/api-content'
import { authExamples } from '@/lib/code-samples'
import { TRANSACTION_MODES } from '@/lib/gateway-api'

export const metadata = { title: 'Collections API' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'process-transfer', title: 'Collect (process-transfer)' },
  { id: 'validate-beneficiary', title: 'Validate beneficiary' },
  { id: 'transactions-transactionIdOrReference-status', title: 'Status' },
]

export default function CollectionsPage() {
  return (
    <ApiReferencePage
      badge="Gateway API"
      title="Collections API"
      description={`Collect payments from MTN and Airtel using transactionMode ${TRANSACTION_MODES.PARTNER_COLLECT_MNO.code} on POST /api/v1/gateway/process-transfer.`}
      toc={toc}
      codeSnippets={authExamples}
      defaultLanguage="curl"
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Mobile money collections debit the customer&apos;s phone and credit your partner wallet.
            The customer receives a USSD/push prompt to approve. You must supply{' '}
            <code>callbackUrl</code> — collections fail validation without it.
          </p>
          <p>
            <code>mnoProvider</code> can be auto-detected from <code>phoneNumber</code> if omitted.
            Providers: <code>MTN</code>, <code>AIRTEL</code>.
          </p>
        </>
      }
      endpoints={collectionEndpoints}
    />
  )
}
