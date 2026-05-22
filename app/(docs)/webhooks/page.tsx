import { DocContentPage } from '@/components/docs/ApiReferencePage'
import { CodeBlockStatic } from '@/components/docs/CodeBlock'
import { CALLBACK_PAYLOAD_EXAMPLE } from '@/lib/gateway-api'

export const metadata = { title: 'Webhooks' }

export default function WebhooksPage() {
  return (
    <DocContentPage
      title="Webhooks"
      description="Partner callbacks from GatewayCallbackService when transactions complete."
      toc={[
        { id: 'overview', title: 'Overview' },
        { id: 'payload', title: 'Payload' },
        { id: 'when', title: 'When sent' },
      ]}
    >
      <h2 id="overview">Overview</h2>
      <p>
        Provide <code>callbackUrl</code> on <code>process-transfer</code> requests. RukaPay POSTs
        JSON to your URL when a transaction reaches SUCCESS or FAILED. Collections require{' '}
        <code>callbackUrl</code>.
      </p>
      <p>
        Headers: <code>Content-Type: application/json</code>,{' '}
        <code>User-Agent: RukaPay-Gateway/1.0</code>. Timeout: 10 seconds.
      </p>

      <h2 id="when">When callbacks are sent</h2>
      <ul>
        <li>Immediately after process-transfer completes (SUCCESS or FAILED)</li>
        <li>
          When MTN/Airtel inbound webhooks finalize a collection (
          <code>webhook-processing.service</code>)
        </li>
      </ul>

      <h2 id="payload">Callback payload</h2>
      <CodeBlockStatic code={CALLBACK_PAYLOAD_EXAMPLE} language="json" title="Partner callback" />

      <h3>Fields</h3>
      <ul>
        <li>
          <code>partnerReference</code> — your reference from the request
        </li>
        <li>
          <code>status</code> — SUCCESS or FAILED
        </li>
        <li>
          <code>transactionId</code> — RukaPay transaction ID
        </li>
        <li>
          <code>mnoTransactionId</code> — MTN/Airtel financial ID when applicable
        </li>
        <li>
          <code>amount</code>, <code>fee</code>, <code>totalCharged</code>
        </li>
        <li>
          <code>metadata</code> — echoed from your request
        </li>
        <li>
          <code>errorMessage</code> — present on FAILED
        </li>
      </ul>
    </DocContentPage>
  )
}
