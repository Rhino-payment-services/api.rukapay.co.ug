import { TRANSACTION_MODES } from '@/lib/gateway-api'

export function TransactionModesTable() {
  const modes = Object.values(TRANSACTION_MODES)

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-surface-muted">
          <tr>
            <th className="px-4 py-3 font-semibold text-content">transactionMode</th>
            <th className="px-4 py-3 font-semibold text-content">Product</th>
            <th className="px-4 py-3 font-semibold text-content">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {modes.map((mode) => (
            <tr key={mode.code}>
              <td className="px-4 py-3 font-mono text-xs text-accent-600 dark:text-accent-400">
                {mode.code}
              </td>
              <td className="px-4 py-3 font-medium text-content">{mode.label}</td>
              <td className="px-4 py-3 text-content-muted">{mode.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
