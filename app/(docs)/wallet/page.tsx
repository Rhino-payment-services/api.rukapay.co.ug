import { DocContentPage } from '@/components/docs/ApiReferencePage'
import { walletEndpoints } from '@/lib/api-content'
export const metadata = { title: 'Wallet API' }

export default function WalletPage() {
  return (
    <DocContentPage
      title="Partner wallet"
      description="Partner escrow/commission wallets and balance behaviour on Gateway transfers."
    >
      <h2 id="overview">Overview</h2>
      <p>
        Gateway transfers debit or credit your partner wallet. Use <code>walletType</code> on
        process-transfer:
      </p>
      <ul>
        <li>
          <code>ESCROW</code> — default settlement wallet
        </li>
        <li>
          <code>COMMISSION</code> — commission wallet when configured
        </li>
      </ul>
      <p>
        Successful transfers return <code>walletBalance</code> with{' '}
        <code>balanceBefore</code> and <code>balanceAfter</code> in the response.
      </p>

      <h2 id="collect">Collections</h2>
      <p>
        <code>PARTNER_COLLECT_MNO</code> credits your wallet when the customer approves — balance
        check is skipped for collect modes.
      </p>

      <h2 id="send">Payouts &amp; sends</h2>
      <p>
        Send modes (<code>PARTNER_SEND_MNO</code>, <code>PARTNER_SEND_BANK</code>, bills, airtime)
        require sufficient balance or return <code>INSUFFICIENT_BALANCE</code>.
      </p>

      <h2 id="balance-endpoint">Balance endpoint</h2>
      {walletEndpoints.map((ep) => (
        <p key={ep.path}>
          <code>GET /api/v1/gateway{ep.path}</code> — {ep.description}
        </p>
      ))}
      <p className="text-sm text-content-subtle">
        For admin wallet operations, see Gateway Admin API in rdbs_core (
        <code>/api/v1/admin/gateway-partners</code>).
      </p>
    </DocContentPage>
  )
}
