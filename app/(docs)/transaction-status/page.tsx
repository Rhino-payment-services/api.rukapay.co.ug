import { ApiReferencePage, StatusBadgeList } from '@/components/docs/ApiReferencePage'
import { CodeBlockStatic } from '@/components/docs/CodeBlock'
import {
  transactionStatusEndpoints,
  transactionStatuses,
} from '@/lib/api-content'
import { STATUS_RESPONSE_EXAMPLE } from '@/lib/gateway-api'

export const metadata = { title: 'Transaction Status' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'statuses', title: 'Status values' },
  { id: 'transactions-transactionIdOrReference-status', title: 'Get status' },
  { id: 'process-transfer', title: 'Process transfer' },
]

export default function TransactionStatusPage() {
  return (
    <ApiReferencePage
      badge="Gateway API"
      title="Transaction Status"
      description="Query transaction status by RukaPay ID, partnerReference, reference, or externalReference."
      toc={toc}
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Use callbacks (<code>callbackUrl</code>) for real-time updates. Poll status when you need
            to reconcile or recover from missed webhooks.
          </p>
          <h3 id="statuses">Status values</h3>
          <StatusBadgeList statuses={transactionStatuses} />
          <h3>Example response</h3>
          <CodeBlockStatic code={STATUS_RESPONSE_EXAMPLE} language="json" title="Status response" />
        </>
      }
      endpoints={transactionStatusEndpoints}
    />
  )
}
