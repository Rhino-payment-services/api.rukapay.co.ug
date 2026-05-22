import { DocContentPage } from '@/components/docs/ApiReferencePage'
import { CodeBlockStatic } from '@/components/docs/CodeBlock'
import { errorCodes } from '@/lib/api-content'
import { errorResponseExample } from '@/lib/code-samples'

export const metadata = { title: 'Error Codes' }

export default function ErrorCodesPage() {
  return (
    <DocContentPage
      title="Error Codes"
      description="HTTP status codes and application error codes from the Gateway API."
    >
      <h2 id="format">Error format</h2>
      <p>
        Failed <code>process-transfer</code> calls return <code>success: false</code> with an{' '}
        <code>error</code> object. Validation errors use Nest&apos;s standard format.
      </p>
      <CodeBlockStatic code={errorResponseExample} language="json" title="Transfer error" />
      <CodeBlockStatic
        code={`{
  "statusCode": 400,
  "message": ["phoneNumber: Phone number must be a valid Uganda number (256XXXXXXXXX)"],
  "error": "Validation Failed"
}`}
        language="json"
        title="Validation error"
      />

      <h2 id="codes">Error reference</h2>
      <div className="not-prose overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface-muted">
            <tr>
              <th className="px-4 py-3 font-semibold text-content">Code</th>
              <th className="px-4 py-3 font-semibold text-content">HTTP</th>
              <th className="px-4 py-3 font-semibold text-content">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {errorCodes.map((err) => (
              <tr key={err.code}>
                <td className="px-4 py-3 font-mono text-xs text-content">{err.code}</td>
                <td className="px-4 py-3 text-content-muted">{err.http}</td>
                <td className="px-4 py-3 text-content-muted">{err.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocContentPage>
  )
}
