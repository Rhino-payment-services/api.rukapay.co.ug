import Link from 'next/link'
import { DocContentPage } from '@/components/docs/ApiReferencePage'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { SandboxDevNotice, SandboxEndpointTable } from '@/components/docs/SandboxDevNotice'
import {
  API_ENVIRONMENTS,
  GATEWAY_API_PATH,
  PRODUCTION_ENDPOINT_URLS,
  SANDBOX_ENDPOINT_URLS,
} from '@/lib/gateway-api'
import { sandboxTransferExamples, sandboxValidateExamples } from '@/lib/code-samples'

export const metadata = { title: 'Environments' }

export default function EnvironmentsPage() {
  return (
    <DocContentPage
      title="Environments"
      description="Production vs development URLs. In dev you must use -sandbox endpoints."
    >
      <SandboxDevNotice />

      <h2 id="comparison">Production vs development endpoints</h2>
      <SandboxEndpointTable />

      <h2 id="production">Production</h2>
      <p>
        Base URL: <code>{API_ENVIRONMENTS.production.baseUrl}{GATEWAY_API_PATH}</code>
      </p>
      <ul className="space-y-2 break-all font-mono text-sm">
        <li>
          <code>{PRODUCTION_ENDPOINT_URLS.processTransfer}</code>
        </li>
        <li>
          <code>{PRODUCTION_ENDPOINT_URLS.validateBeneficiary}</code>
        </li>
      </ul>
      <p>Live API keys only. Real funds move on MTN, Airtel, banks, and bill networks.</p>

      <h2 id="sandbox">Development / sandbox</h2>
      <p>
        Base URL: <code>{API_ENVIRONMENTS.sandbox.baseUrl}{GATEWAY_API_PATH}</code>
      </p>
      <p className="font-medium text-content">
        While integrating against dev, always call the <code>-sandbox</code> paths — not{' '}
        <code>process-transfer</code> or <code>validate-beneficiary</code>.
      </p>
      <ul className="space-y-2 break-all font-mono text-sm">
        <li>
          <code>{SANDBOX_ENDPOINT_URLS.processTransfer}</code>
          <span className="block font-sans text-content-muted">
            — simulated transfers (send, collect, bank, bill, airtime)
          </span>
        </li>
        <li>
          <code>{SANDBOX_ENDPOINT_URLS.validateBeneficiary}</code>
          <span className="block font-sans text-content-muted">— dummy beneficiary validation</span>
        </li>
      </ul>
      <p className="text-sm text-content-muted">
        Request and response bodies are the same as production. Sandbox endpoints are only
        available in the development environment.
      </p>

      <h3 id="sandbox-transfer-example">Sandbox transfer example</h3>
      <CodeBlock snippets={sandboxTransferExamples} defaultLanguage="curl" />

      <h3 id="sandbox-validate-example">Sandbox validate example</h3>
      <CodeBlock snippets={sandboxValidateExamples} showTabs={false} title="cURL" />

      <h2 id="swagger">Partner Swagger</h2>
      <p>
        Interactive API docs (when enabled): <code>{'{PARTNER_API_URL}'}/partner/docs</code>
      </p>

      <h2 id="testing">Testing checklist (dev)</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Use sandbox API key against dev-api.rukapay.net</li>
        <li>
          Call <code className="break-all">{SANDBOX_ENDPOINT_URLS.validateBeneficiary}</code>{' '}
          before first payout test
        </li>
        <li>
          Call <code className="break-all">{SANDBOX_ENDPOINT_URLS.processTransfer}</code> with{' '}
          <code>PARTNER_COLLECT_MNO</code> and a test <code>callbackUrl</code>
        </li>
        <li>Switch to production paths only when going live on api.rukapay.net</li>
      </ol>

      <p>
        <Link href="/api-keys">API Keys</Link> ·{' '}
        <Link href="/getting-started">Getting Started</Link>
      </p>
    </DocContentPage>
  )
}
