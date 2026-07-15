import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import {
  transactionEndpoints,
  INSTITUTION_TX_TYPES,
} from '@/lib/partner-institutions-api'

export const metadata = { title: 'Institution Transactions' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'types', title: 'Transaction types' },
  { id: 'get-partner-institutions-institutionId-wallet', title: 'Wallet' },
  { id: 'post-partner-institutions-institutionId-wallet-fund-mno', title: 'Fund MNO' },
  { id: 'post-partner-institutions-institutionId-wallet-transfer-mno', title: 'Transfer MNO' },
  { id: 'post-partner-institutions-institutionId-wallet-transfer-bank', title: 'Transfer bank' },
  { id: 'get-partner-institutions-institutionId-transactions', title: 'List' },
  { id: 'post-partner-institutions-institutionId-transactions', title: 'Execute' },
  { id: 'post-partner-institutions-institutionId-transactions-bulk', title: 'Bulk' },
]

export default function PartnerInstitutionsTransactionsPage() {
  return (
    <ApiReferencePage
      badge="Partner - Institutions"
      title="Transactions"
      description="Settle via the SACCO wallet. Run deposits, loans, shares, and bulk operations with one type field."
      toc={toc}
      showSandboxNotice={false}
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Fund the settlement wallet (MNO collect), then call{' '}
            <code>POST …/transactions</code> with a <code>type</code>. Use{' '}
            <code>partnerReference</code> for idempotency.
          </p>
          <h3 id="types">Transaction types</h3>
          <div className="not-prose my-4 overflow-hidden rounded-xl border border-border text-sm">
            <table className="w-full text-left">
              <thead className="bg-surface-muted">
                <tr>
                  <th className="px-4 py-2 font-semibold text-content">type</th>
                  <th className="px-4 py-2 font-semibold text-content">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {INSTITUTION_TX_TYPES.map((row) => (
                  <tr key={row.type}>
                    <td className="px-4 py-2 font-mono text-xs text-content">{row.type}</td>
                    <td className="px-4 py-2 text-content-muted">{row.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-content-muted">
            Required fields depend on <code>type</code> — e.g. <code>productId</code> for{' '}
            <code>GIVE_LOAN</code>, <code>ledgerId</code> for shares,{' '}
            <code>disbursementId</code> for repayment.
          </p>
        </>
      }
      endpoints={transactionEndpoints}
    />
  )
}
