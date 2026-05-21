/**
 * Gateway API reference — sourced from rdbs_core/src/gateway
 * @see rdbs_core Gateway API tag: money transfer to MNO, Banks, Bills, Airtime
 */

export const GATEWAY_API_PATH = '/api/v1/gateway'

export const API_ENVIRONMENTS = {
  production: {
    label: 'Production',
    baseUrl: 'https://api.rukapay.net',
  },
  sandbox: {
    label: 'Sandbox',
    baseUrl: 'https://dev-api.rukapay.net',
  },
} as const

export const GATEWAY_BASE_URL = API_ENVIRONMENTS.production.baseUrl
export const GATEWAY_FULL_URL = `${GATEWAY_BASE_URL}${GATEWAY_API_PATH}`
export const SANDBOX_GATEWAY_FULL_URL = `${API_ENVIRONMENTS.sandbox.baseUrl}${GATEWAY_API_PATH}`

/** Full sandbox URLs for dev-api.rukapay.net */
export const SANDBOX_ENDPOINT_URLS = {
  processTransfer: `${SANDBOX_GATEWAY_FULL_URL}/process-transfer-sandbox`,
  validateBeneficiary: `${SANDBOX_GATEWAY_FULL_URL}/validate-beneficiary-sandbox`,
} as const

/** Full production URLs for api.rukapay.net */
export const PRODUCTION_ENDPOINT_URLS = {
  processTransfer: `${GATEWAY_FULL_URL}/process-transfer`,
  validateBeneficiary: `${GATEWAY_FULL_URL}/validate-beneficiary`,
} as const

/** In dev/sandbox, partners must use -sandbox suffixed endpoints (not production paths). */
export const SANDBOX_DEV_NOTE =
  `On dev, use ${SANDBOX_ENDPOINT_URLS.processTransfer} and ${SANDBOX_ENDPOINT_URLS.validateBeneficiary} instead of the production URLs.`

/** Transaction modes from ProcessTransferDto / transaction_modes seed */
export const TRANSACTION_MODES = {
  PARTNER_SEND_MNO: {
    code: 'PARTNER_SEND_MNO',
    label: 'Mobile Money Payout',
    description: 'Send money to MTN or Airtel mobile money wallets.',
    type: 'WALLET_TO_MNO',
  },
  PARTNER_COLLECT_MNO: {
    code: 'PARTNER_COLLECT_MNO',
    label: 'Mobile Money Collection',
    description: 'Collect payment from customer MTN/Airtel. Credits partner wallet. callbackUrl required.',
    type: 'MNO_TO_WALLET',
  },
  PARTNER_SEND_BANK: {
    code: 'PARTNER_SEND_BANK',
    label: 'Bank Transfer',
    description: 'Send money to a Ugandan bank account.',
    type: 'WALLET_TO_BANK',
  },
  PARTNER_PAY_BILL_PAYMENT: {
    code: 'PARTNER_PAY_BILL_PAYMENT',
    label: 'Bill Payment',
    description: 'Pay utility and subscription bills (NWSC, UMEME, DSTV, etc.).',
    type: 'BILL_PAYMENT',
  },
  PARTNER_PAY_AIRTIME: {
    code: 'PARTNER_PAY_AIRTIME',
    label: 'Airtime Purchase',
    description: 'Purchase airtime on MTN or Airtel.',
    type: 'AIRTIME',
  },
} as const

export type TransactionModeCode = keyof typeof TRANSACTION_MODES

export const MNO_PROVIDERS = ['MTN', 'AIRTEL'] as const

export const GATEWAY_ENDPOINTS = {
  processTransfer: {
    method: 'POST' as const,
    path: `${GATEWAY_API_PATH}/process-transfer`,
    summary: 'Process transfer (payout, collection, bank, bill, airtime)',
  },
  validateBeneficiary: {
    method: 'POST' as const,
    path: `${GATEWAY_API_PATH}/validate-beneficiary`,
    summary: 'Validate beneficiary before transfer',
  },
  transactionStatus: {
    method: 'GET' as const,
    path: `${GATEWAY_API_PATH}/transactions/{transactionIdOrReference}/status`,
    summary: 'Get transaction status by ID or partner reference',
  },
  generateToken: {
    method: 'POST' as const,
    path: `${GATEWAY_API_PATH}/partners/generate-token`,
    summary: 'Generate one-time bearer token (API_KEY_AND_TOKEN partners)',
  },
  health: {
    method: 'GET' as const,
    path: `${GATEWAY_API_PATH}/health`,
    summary: 'Gateway health check',
  },
  processTransferSandbox: {
    method: 'POST' as const,
    path: `${GATEWAY_API_PATH}/process-transfer-sandbox`,
    summary: 'Sandbox transfer simulation (development only)',
  },
  validateBeneficiarySandbox: {
    method: 'POST' as const,
    path: `${GATEWAY_API_PATH}/validate-beneficiary-sandbox`,
    summary: 'Sandbox beneficiary validation (development only)',
  },
}

export const TRANSFER_REQUEST_FIELDS = [
  { name: 'transactionMode', type: 'string', required: true, description: 'Mode code e.g. PARTNER_SEND_MNO, PARTNER_COLLECT_MNO.' },
  { name: 'amount', type: 'number', required: true, description: 'Amount in UGX (minimum 100).' },
  { name: 'currency', type: 'string', required: true, description: 'Currency code. Default UGX.' },
  { name: 'narration', type: 'string', required: true, description: 'Transfer description shown in records.' },
  { name: 'partnerReference', type: 'string', required: true, description: 'Unique partner reference for idempotency and tracking.' },
  { name: 'walletType', type: 'string', required: false, description: 'ESCROW or COMMISSION. Default ESCROW.' },
  { name: 'phoneNumber', type: 'string', required: false, description: 'Uganda MSISDN 256XXXXXXXXX (MNO send/collect/airtime).' },
  { name: 'mnoProvider', type: 'string', required: false, description: 'MTN or AIRTEL. Aliases: network.' },
  { name: 'accountNumber', type: 'string', required: false, description: 'Bank or bill account number.' },
  { name: 'bankCode', type: 'string', required: false, description: 'Bank code e.g. STANBIC (bank send).' },
  { name: 'accountName', type: 'string', required: false, description: 'Account holder name (bank send).' },
  { name: 'recipientName', type: 'string', required: false, description: 'Recipient name (MNO send).' },
  { name: 'billerCode', type: 'string', required: false, description: 'Biller code e.g. NWSC, UMEME (bill payment).' },
  { name: 'callbackUrl', type: 'string', required: false, description: 'Webhook URL. Required for PARTNER_COLLECT_MNO.' },
  { name: 'metadata', type: 'object', required: false, description: 'Custom data returned in partner callback.' },
]

export const TRANSFER_RESPONSE_EXAMPLE = `{
  "success": true,
  "message": "Transfer processed successfully",
  "transaction": {
    "transactionId": "cm5abc123xyz",
    "reference": "RKP-20260521-001",
    "amount": 50000,
    "fee": 1000,
    "totalCharged": 51000,
    "status": "SUCCESS",
    "recipient": {
      "name": "John Doe",
      "account": "256700000000",
      "provider": "MTN"
    },
    "createdAt": "2026-05-21T10:30:00.000Z"
  },
  "walletBalance": {
    "walletId": "wal_partner_escrow",
    "walletType": "ESCROW",
    "balanceBefore": 1000000,
    "balanceAfter": 949000,
    "currency": "UGX"
  }
}`

export const CALLBACK_PAYLOAD_EXAMPLE = `{
  "partnerReference": "PARTNER-REF-123456",
  "status": "SUCCESS",
  "transactionId": "cm5abc123xyz",
  "mnoId": "MTN-FIN-987654",
  "mnoTransactionId": "MTN-FIN-987654",
  "amount": 50000,
  "fee": 1000,
  "totalCharged": 51000,
  "metadata": { "customerId": "12345", "orderId": "ORD-789" },
  "timestamp": "2026-05-21T10:30:45.000Z"
}`

export const STATUS_RESPONSE_EXAMPLE = `{
  "success": true,
  "message": "Transaction found",
  "transaction": {
    "id": "cm5abc123xyz",
    "partnerReference": "PARTNER-REF-123456",
    "mnoId": "MTN-FIN-987654",
    "mnoTransactionId": "MTN-FIN-987654",
    "amount": 50000,
    "fee": 1000,
    "totalAmount": 51000,
    "currency": "UGX",
    "status": "SUCCESS",
    "destinationType": "MNO",
    "destination": { "phoneNumber": "256700000000", "provider": "MTN" },
    "createdAt": "2026-05-21T10:30:00.000Z",
    "completedAt": "2026-05-21T10:30:45.000Z"
  }
}`

export const GATEWAY_ERROR_CODES = [
  { code: 'TRANSACTION_NOT_FOUND', http: 404, description: 'No transaction matches the given ID or partner reference.' },
  { code: 'INSUFFICIENT_BALANCE', http: 400, description: 'Partner wallet balance too low for send modes.' },
  { code: 'TRANSFER_FAILED', http: 400, description: 'Transfer rejected by provider or internal processing.' },
  { code: 'INVALID_REQUEST', http: 400, description: 'Invalid transaction mode or missing required fields.' },
  { code: 'Validation Failed', http: 400, description: 'Request body failed class-validator checks.' },
  { code: 'Unauthorized', http: 401, description: 'Missing, invalid, expired, or revoked API key.' },
  { code: 'Too Many Requests', http: 429, description: 'Partner rate limit exceeded.' },
]
