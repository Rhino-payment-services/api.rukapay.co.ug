import type { EndpointDefinition } from '@/components/docs/EndpointCard'
import {
  GATEWAY_API_PATH,
  GATEWAY_ENDPOINTS,
  TRANSACTION_MODES,
  TRANSFER_REQUEST_FIELDS,
  TRANSFER_RESPONSE_EXAMPLE,
  STATUS_RESPONSE_EXAMPLE,
  GATEWAY_ERROR_CODES,
  MNO_PROVIDERS,
} from './gateway-api'

export const transactionStatuses = [
  { status: 'SUCCESS', description: 'Transaction completed successfully.' },
  { status: 'PENDING', description: 'Awaiting customer approval or provider processing.' },
  { status: 'FAILED', description: 'Transaction failed. See failureReason or callback errorMessage.' },
  { status: 'PROCESSING', description: 'Transaction is being processed by the payment network.' },
]

export const providers = {
  mobileMoney: [...MNO_PROVIDERS],
  banks: ['STANBIC', 'DFCU', 'EQUITY', 'CENTENARY', 'ABSA'],
  bills: ['NWSC', 'UMEME', 'DSTV', 'GOTV', 'STARTIMES'],
  airtime: [...MNO_PROVIDERS],
}

const processTransferPath = '/process-transfer'
const validatePath = '/validate-beneficiary'
const statusPath = '/transactions/{transactionIdOrReference}/status'

function modeBody(mode: string, extra: Record<string, unknown>) {
  return JSON.stringify(
    {
      transactionMode: mode,
      amount: 50000,
      currency: 'UGX',
      narration: 'Payment description',
      partnerReference: 'PARTNER-REF-123456',
      ...extra,
    },
    null,
    2
  )
}

export const processTransferEndpoint: EndpointDefinition = {
  method: 'POST',
  path: processTransferPath,
  title: 'Process transfer',
  description:
    'Unified Gateway endpoint for all money movements. Set transactionMode to route payouts, collections, bank transfers, bill payments, or airtime purchases.',
  bodyParams: TRANSFER_REQUEST_FIELDS,
  requestBody: modeBody(TRANSACTION_MODES.PARTNER_SEND_MNO.code, {
    phoneNumber: '256700000000',
    mnoProvider: 'MTN',
    recipientName: 'John Doe',
  }),
  responseBody: TRANSFER_RESPONSE_EXAMPLE,
  statusCodes: [
    { code: 200, label: 'OK', description: 'Transfer accepted (may be PENDING for async flows).' },
    { code: 400, label: 'Bad Request', description: 'Validation error, insufficient balance, or duplicate partnerReference.' },
    { code: 401, label: 'Unauthorized', description: 'Invalid or missing x-api-key.' },
    { code: 429, label: 'Too Many Requests', description: 'Rate limit exceeded.' },
  ],
}

export const validateBeneficiaryEndpoint: EndpointDefinition = {
  method: 'POST',
  path: validatePath,
  title: 'Validate beneficiary',
  description:
    'Verify recipient details before processing a transfer. Required fields depend on transactionMode.',
  bodyParams: [
    { name: 'transactionMode', type: 'string', required: true, description: 'PARTNER_SEND_MNO, PARTNER_SEND_BANK, PARTNER_PAY_BILL_PAYMENT, or PARTNER_PAY_AIRTIME.' },
    { name: 'phoneNumber', type: 'string', required: false, description: '256XXXXXXXXX for MNO or airtime modes.' },
    { name: 'mnoProvider', type: 'string', required: false, description: 'MTN or AIRTEL.' },
    { name: 'accountNumber', type: 'string', required: false, description: 'Bank or bill account number.' },
    { name: 'bankCode', type: 'string', required: false, description: 'Required for PARTNER_SEND_BANK.' },
    { name: 'billerCode', type: 'string', required: false, description: 'Required for PARTNER_PAY_BILL_PAYMENT (e.g. NWSC).' },
  ],
  requestBody: JSON.stringify(
    {
      transactionMode: 'PARTNER_SEND_MNO',
      phoneNumber: '256700000000',
      mnoProvider: 'MTN',
    },
    null,
    2
  ),
  responseBody: `{
  "success": true,
  "message": "Beneficiary validated",
  "beneficiary": {
    "name": "John Doe",
    "phoneNumber": "256700000000",
    "provider": "MTN",
    "isValid": true
  }
}`,
  statusCodes: [{ code: 200, label: 'OK', description: 'Validation result returned.' }],
}

export const transactionStatusEndpoint: EndpointDefinition = {
  method: 'GET',
  path: statusPath,
  title: 'Get transaction status',
  description:
    'Look up a transaction by RukaPay ID, partnerReference, reference, or externalReference. Results are scoped to your partner account.',
  pathParams: [
    { name: 'transactionIdOrReference', type: 'string', required: true, description: 'Transaction ID or your partnerReference.' },
  ],
  responseBody: STATUS_RESPONSE_EXAMPLE,
  statusCodes: [
    { code: 200, label: 'OK', description: 'Transaction found.' },
    { code: 404, label: 'Not Found', description: 'TRANSACTION_NOT_FOUND.' },
  ],
}

export const collectionEndpoints: EndpointDefinition[] = [
  {
    method: 'POST',
    path: processTransferPath,
    title: 'Collect from mobile money',
    description: `Use transactionMode ${TRANSACTION_MODES.PARTNER_COLLECT_MNO.code}. Customer receives a prompt on their phone. callbackUrl is required.`,
    bodyParams: TRANSFER_REQUEST_FIELDS.filter((f) =>
      ['transactionMode', 'amount', 'currency', 'phoneNumber', 'mnoProvider', 'narration', 'partnerReference', 'callbackUrl', 'metadata'].includes(f.name)
    ),
    requestBody: modeBody(TRANSACTION_MODES.PARTNER_COLLECT_MNO.code, {
      phoneNumber: '256700000000',
      mnoProvider: 'MTN',
      callbackUrl: 'https://your-app.com/webhooks/rukapay',
    }),
    responseBody: TRANSFER_RESPONSE_EXAMPLE,
    statusCodes: [
      { code: 200, label: 'OK', description: 'Collection initiated (status may be PENDING until customer approves).' },
      { code: 400, label: 'Bad Request', description: 'Missing callbackUrl or invalid phone number.' },
    ],
  },
  validateBeneficiaryEndpoint,
  transactionStatusEndpoint,
]

export const payoutEndpoints: EndpointDefinition[] = [
  {
    method: 'POST',
    path: processTransferPath,
    title: 'Payout to mobile money',
    description: `Use transactionMode ${TRANSACTION_MODES.PARTNER_SEND_MNO.code}. Debits your partner ESCROW or COMMISSION wallet.`,
    bodyParams: TRANSFER_REQUEST_FIELDS,
    requestBody: modeBody(TRANSACTION_MODES.PARTNER_SEND_MNO.code, {
      phoneNumber: '256700000001',
      mnoProvider: 'AIRTEL',
      recipientName: 'Jane Doe',
    }),
    responseBody: TRANSFER_RESPONSE_EXAMPLE,
    statusCodes: [
      { code: 200, label: 'OK', description: 'Payout submitted.' },
      { code: 400, label: 'Bad Request', description: 'INSUFFICIENT_BALANCE or validation error.' },
    ],
  },
  validateBeneficiaryEndpoint,
  transactionStatusEndpoint,
]

export const walletEndpoints: EndpointDefinition[] = [
  {
    method: 'GET',
    path: '/balance',
    title: 'Wallet balance',
    description:
      'Returns partner wallet balance. Note: this endpoint may return placeholder data; contact RukaPay for production wallet reporting.',
    responseBody: `{
  "success": true,
  "message": "Balance retrieved",
  "balance": 0,
  "currency": "UGX"
}`,
    statusCodes: [{ code: 200, label: 'OK', description: 'Balance response (verify with RukaPay support).' }],
  },
]

export const bankTransferEndpoints: EndpointDefinition[] = [
  {
    method: 'POST',
    path: processTransferPath,
    title: 'Send to bank account',
    description: `Use transactionMode ${TRANSACTION_MODES.PARTNER_SEND_BANK.code}. Routed via ABC or Pegasus depending on configuration.`,
    bodyParams: TRANSFER_REQUEST_FIELDS,
    requestBody: modeBody(TRANSACTION_MODES.PARTNER_SEND_BANK.code, {
      accountNumber: '1234567890',
      bankCode: 'STANBIC',
      accountName: 'John Doe',
    }),
    responseBody: TRANSFER_RESPONSE_EXAMPLE,
    statusCodes: [
      { code: 200, label: 'OK', description: 'Bank transfer initiated.' },
      { code: 400, label: 'Bad Request', description: 'Invalid bank details or insufficient balance.' },
    ],
  },
  validateBeneficiaryEndpoint,
  transactionStatusEndpoint,
]

export const billPaymentEndpoints: EndpointDefinition[] = [
  {
    method: 'POST',
    path: processTransferPath,
    title: 'Pay bill',
    description: `Use transactionMode ${TRANSACTION_MODES.PARTNER_PAY_BILL_PAYMENT.code}. Supports billers such as NWSC, UMEME, DSTV.`,
    bodyParams: TRANSFER_REQUEST_FIELDS,
    requestBody: modeBody(TRANSACTION_MODES.PARTNER_PAY_BILL_PAYMENT.code, {
      billerCode: 'NWSC',
      accountNumber: '04151234567',
    }),
    responseBody: TRANSFER_RESPONSE_EXAMPLE,
    statusCodes: [{ code: 200, label: 'OK', description: 'Bill payment processed or pending.' }],
  },
  {
    method: 'POST',
    path: validatePath,
    title: 'Validate bill account',
    description: 'Validate biller account before payment using PARTNER_PAY_BILL_PAYMENT mode with billerCode and accountNumber.',
    bodyParams: [
      { name: 'transactionMode', type: 'string', required: true, description: 'PARTNER_PAY_BILL_PAYMENT' },
      { name: 'billerCode', type: 'string', required: true, description: 'e.g. NWSC, UMEME' },
      { name: 'accountNumber', type: 'string', required: true, description: 'Customer account or meter number.' },
    ],
    requestBody: modeBody(TRANSACTION_MODES.PARTNER_PAY_BILL_PAYMENT.code, {
      billerCode: 'NWSC',
      accountNumber: '04151234567',
    }),
    responseBody: `{
  "success": true,
  "beneficiary": { "name": "Jane Customer", "accountNumber": "04151234567", "provider": "NWSC", "isValid": true }
}`,
    statusCodes: [{ code: 200, label: 'OK', description: 'Account validated.' }],
  },
  transactionStatusEndpoint,
]

export const airtimeEndpoints: EndpointDefinition[] = [
  {
    method: 'POST',
    path: processTransferPath,
    title: 'Purchase airtime',
    description: `Use transactionMode ${TRANSACTION_MODES.PARTNER_PAY_AIRTIME.code}. Top up MTN or Airtel numbers.`,
    bodyParams: TRANSFER_REQUEST_FIELDS,
    requestBody: modeBody(TRANSACTION_MODES.PARTNER_PAY_AIRTIME.code, {
      phoneNumber: '256700000000',
      mnoProvider: 'MTN',
    }),
    responseBody: TRANSFER_RESPONSE_EXAMPLE,
    statusCodes: [{ code: 200, label: 'OK', description: 'Airtime purchase completed or pending.' }],
  },
  validateBeneficiaryEndpoint,
  transactionStatusEndpoint,
]

export const transactionStatusEndpoints: EndpointDefinition[] = [
  transactionStatusEndpoint,
  processTransferEndpoint,
]

export const errorCodes = GATEWAY_ERROR_CODES

export { TRANSACTION_MODES, GATEWAY_ENDPOINTS, GATEWAY_API_PATH }
