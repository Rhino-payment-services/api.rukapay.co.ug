/**
 * Bill payment API reference — sourced from rdbs_core gateway bill payment contract.
 * @see rdbs_core/src/gateway/utils/partner-bill-payment-fields.util.ts
 * @see rdbs_core/integrations/pegasus/config/field-mappings.ts
 */

import { TRANSACTION_MODES } from './gateway-api'

export type BillerCode = 'UMEME' | 'NWSC' | 'URA' | 'DSTV' | 'GOTV' | 'STARTIMES'

export type BillerDefinition = {
  code: BillerCode
  label: string
  description: string
  /** Extra required fields on process-transfer beyond customerName + phoneNumber */
  extraFields: string[]
  /** Human-readable note shown below pay example */
  payNotes: string
  sandboxAccount?: string
  sandboxName?: string
}

export const NWSC_AREAS = [
  'Kampala',
  'Entebbe',
  'Jinja',
  'Mukono',
  'Iganga',
  'Lugazi',
  'Kawuku',
  'Kajjansi',
  'Others',
] as const

export const BILLERS: BillerDefinition[] = [
  {
    code: 'UMEME',
    label: 'UMEME',
    description: 'Uganda Electricity Distribution Company',
    extraFields: ['customerType'],
    payNotes:
      'customerType must be PREPAID or POSTPAID — use the value returned by validate-beneficiary (beneficiary.customerType). Aliases: area, meterNumber.',
    sandboxAccount: '1111222233',
    sandboxName: 'Mary Nakato',
  },
  {
    code: 'NWSC',
    label: 'NWSC',
    description: 'National Water and Sewerage Corporation',
    extraFields: ['area'],
    payNotes: `area is required — one of: ${NWSC_AREAS.join(', ')}. Aliases: customerType, meterNumber.`,
    sandboxAccount: '123456789',
    sandboxName: 'John Doe',
  },
  {
    code: 'URA',
    label: 'URA',
    description: 'Uganda Revenue Authority',
    extraFields: [],
    payNotes: 'No biller-specific fields beyond customerName and phoneNumber.',
    sandboxAccount: '2222333344',
    sandboxName: 'James Mukasa',
  },
  {
    code: 'DSTV',
    label: 'DSTV',
    description: 'DSTV Pay-TV subscription',
    extraFields: [],
    payNotes: 'area/bouquet is optional. Include if returned by validate-beneficiary.',
    sandboxAccount: '3333444455',
    sandboxName: 'Robert Ssemwogerere',
  },
  {
    code: 'GOTV',
    label: 'GOTV',
    description: 'GOtv Pay-TV subscription',
    extraFields: [],
    payNotes: 'area/bouquet is optional. Include if returned by validate-beneficiary.',
  },
  {
    code: 'STARTIMES',
    label: 'STARTIMES',
    description: 'StarTimes Pay-TV subscription',
    extraFields: [],
    payNotes: 'area/bouquet is optional. Include if returned by validate-beneficiary.',
  },
]

export const BILL_PAYMENT_FIELDS = [
  {
    name: 'transactionMode',
    type: 'string',
    required: true,
    description: 'PARTNER_PAY_BILL_PAYMENT',
  },
  {
    name: 'amount',
    type: 'number',
    required: true,
    description: 'Amount in UGX (minimum 100).',
  },
  {
    name: 'currency',
    type: 'string',
    required: true,
    description: 'Currency code. Default UGX.',
  },
  {
    name: 'narration',
    type: 'string',
    required: true,
    description: 'Transfer description shown in records.',
  },
  {
    name: 'partnerReference',
    type: 'string',
    required: true,
    description: 'Unique partner reference for idempotency and tracking.',
  },
  {
    name: 'billerCode',
    type: 'string',
    required: true,
    description: 'Biller code: NWSC, UMEME, URA, DSTV, GOTV, or STARTIMES. Alias: biller_code.',
  },
  {
    name: 'accountNumber',
    type: 'string',
    required: true,
    description: 'Customer account or meter number. Alias: account_number.',
  },
  {
    name: 'customerName',
    type: 'string',
    required: true,
    description:
      'Account holder name from validate-beneficiary (beneficiary.name). Aliases: accountName, recipientName.',
  },
  {
    name: 'phoneNumber',
    type: 'string',
    required: true,
    description:
      'Uganda MSISDN 256XXXXXXXXX. Dummy numbers such as 256700000000 are not allowed. Aliases: customer_phone, customerPhone.',
  },
  {
    name: 'customerType',
    type: 'string',
    required: false,
    description: 'Required for UMEME: PREPAID or POSTPAID (from validate). Aliases: area, meterNumber.',
  },
  {
    name: 'area',
    type: 'string',
    required: false,
    description: `Required for NWSC: service area (e.g. Kampala). Valid values: ${NWSC_AREAS.join(', ')}. Aliases: customerType, meterNumber.`,
  },
  {
    name: 'walletType',
    type: 'string',
    required: false,
    description: 'ESCROW or COMMISSION. Default ESCROW.',
  },
  {
    name: 'metadata',
    type: 'object',
    required: false,
    description: 'Custom data returned in partner callback.',
  },
]

export const VALIDATE_BILL_FIELDS = [
  {
    name: 'transactionMode',
    type: 'string',
    required: true,
    description: 'PARTNER_PAY_BILL_PAYMENT',
  },
  {
    name: 'billerCode',
    type: 'string',
    required: true,
    description: 'Biller code: NWSC, UMEME, URA, DSTV, GOTV, or STARTIMES. Alias: biller_code.',
  },
  {
    name: 'accountNumber',
    type: 'string',
    required: true,
    description: 'Customer account or meter number. Alias: account_number.',
  },
]

const BILL_MODE = TRANSACTION_MODES.PARTNER_PAY_BILL_PAYMENT.code

type BillerExampleBodies = {
  validate: Record<string, unknown>
  pay: Record<string, unknown>
}

function buildPayBody(biller: BillerDefinition): Record<string, unknown> {
  const base: Record<string, unknown> = {
    transactionMode: BILL_MODE,
    amount: 50000,
    currency: 'UGX',
    billerCode: biller.code,
    accountNumber: biller.sandboxAccount ?? '0000000000',
    customerName: biller.sandboxName ?? 'Jane Customer',
    phoneNumber: '256770123456',
    narration: `${biller.label} bill payment`,
    partnerReference: `BILL-${biller.code}-001`,
  }

  if (biller.code === 'UMEME') {
    base.customerType = 'PREPAID'
  }
  if (biller.code === 'NWSC') {
    base.area = 'Kampala'
  }

  return base
}

function buildValidateBody(biller: BillerDefinition): Record<string, unknown> {
  return {
    transactionMode: BILL_MODE,
    billerCode: biller.code,
    accountNumber: biller.sandboxAccount ?? '0000000000',
  }
}

export const BILLER_EXAMPLES: Record<BillerCode, BillerExampleBodies> = Object.fromEntries(
  BILLERS.map((biller) => [
    biller.code,
    {
      validate: buildValidateBody(biller),
      pay: buildPayBody(biller),
    },
  ])
) as Record<BillerCode, BillerExampleBodies>

export const VALIDATE_RESPONSE_UMEME = `{
  "success": true,
  "message": "Beneficiary validated successfully",
  "beneficiary": {
    "billerCode": "UMEME",
    "accountNumber": "1111222233",
    "name": "Mary Nakato",
    "customerType": "PREPAID",
    "area": "PREPAID",
    "isValid": true
  }
}`

export const VALIDATE_RESPONSE_NWSC = `{
  "success": true,
  "message": "Beneficiary validated successfully",
  "beneficiary": {
    "billerCode": "NWSC",
    "accountNumber": "123456789",
    "name": "John Doe",
    "provider": "National Water and Sewerage Corporation",
    "isValid": true
  }
}`

export function buildBillCurl(
  url: string,
  body: Record<string, unknown>,
  apiKey = 'YOUR_API_KEY'
): string {
  return `curl -X POST ${url} \\
  -H "x-api-key: ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(body, null, 2)}'`
}
