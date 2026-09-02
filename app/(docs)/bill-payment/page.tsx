import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { BillerExamples, SupportedBillersTable } from '@/components/docs/BillerExamples'
import { billPaymentEndpoints } from '@/lib/api-content'
import { TRANSACTION_MODES } from '@/lib/gateway-api'

export const metadata = { title: 'Bill Payment API' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'biller-examples', title: 'Biller examples' },
  { id: 'post-process-transfer', title: 'Pay bill' },
  { id: 'post-validate-beneficiary', title: 'Validate account' },
  { id: 'get-transactions-transactionIdOrReference-status', title: 'Status' },
  { id: 'supported-billers', title: 'Supported billers' },
]

export default function BillPaymentPage() {
  return (
    <ApiReferencePage
      badge="Gateway API"
      title="Bill Payment API"
      description={`Pay utilities and subscriptions with ${TRANSACTION_MODES.PARTNER_PAY_BILL_PAYMENT.code}.`}
      toc={toc}
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Bill payments use <code>billerCode</code> (e.g. NWSC, UMEME, URA) and customer{' '}
            <code>accountNumber</code>. Aliases <code>biller_code</code> and{' '}
            <code>account_number</code> are accepted.
          </p>
          <h3>Two-step flow</h3>
          <ol>
            <li>
              <strong>Validate</strong> — call{' '}
              <code>POST /validate-beneficiary</code> with <code>billerCode</code> and{' '}
              <code>accountNumber</code> to confirm the account and retrieve{' '}
              <code>beneficiary.name</code>, <code>customerType</code> (UMEME), or{' '}
              <code>area</code> (NWSC).
            </li>
            <li>
              <strong>Pay</strong> — call <code>POST /process-transfer</code> with the amount,{' '}
              <code>customerName</code> (from validate), a real Uganda <code>phoneNumber</code>, and
              any biller-specific fields echoed from the validate response.
            </li>
          </ol>
          <section id="biller-examples" className="scroll-mt-28">
            <h3>Biller examples</h3>
            <p>
              Select a biller to see validate and pay request examples. Each biller has different
              required fields on the pay step.
            </p>
            <BillerExamples />
          </section>
        </>
      }
      endpoints={billPaymentEndpoints}
      extraSections={[
        {
          id: 'supported-billers',
          title: 'Supported billers',
          content: (
            <>
              <p>
                Pass the biller code in <code>billerCode</code>. There is no list-billers endpoint —
                use the codes below.
              </p>
              <SupportedBillersTable />
            </>
          ),
        },
      ]}
    />
  )
}
