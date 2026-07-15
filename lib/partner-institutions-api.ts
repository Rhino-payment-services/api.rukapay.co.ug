/**
 * Partner - Institutions API — sourced from rdbs_core PartnerInstitutionsController
 * @see rdbs_core/src/gateway/controllers/partner-institutions.controller.ts
 */

import type { EndpointDefinition } from '@/components/docs/EndpointCard'
import { API_ENVIRONMENTS } from './gateway-api'

export const PARTNER_INSTITUTIONS_PATH = '/partner-institutions'

export const PARTNER_INSTITUTIONS_BASE = {
  production: `${API_ENVIRONMENTS.production.baseUrl}${PARTNER_INSTITUTIONS_PATH}`,
  sandbox: `${API_ENVIRONMENTS.sandbox.baseUrl}${PARTNER_INSTITUTIONS_PATH}`,
} as const

/** Host only — paths below include /partner-institutions */
export const PARTNER_API_HOST = API_ENVIRONMENTS.production.baseUrl

export const INSTITUTION_TX_TYPES = [
  { type: 'DEPOSIT', label: 'Savings deposit' },
  { type: 'WITHDRAWAL', label: 'Savings withdrawal' },
  { type: 'PURCHASE_SHARES', label: 'Buy shares' },
  { type: 'WITHDRAW_SHARES', label: 'Withdraw shares' },
  { type: 'GIVE_LOAN', label: 'Disburse loan' },
  { type: 'LOAN_REPAYMENT', label: 'Repay loan' },
  { type: 'MEMBER_TO_MEMBER', label: 'Member transfer' },
  { type: 'LIQUIDATION', label: 'Liquidation' },
] as const

export const STAFF_ROLES = ['OWNER', 'ADMIN', 'OPERATOR', 'VIEWER'] as const

const authCodes = [
  { code: 200, label: 'OK', description: 'Request succeeded.' },
  { code: 201, label: 'Created', description: 'Resource created.' },
  { code: 401, label: 'Unauthorized', description: 'Missing or invalid x-api-key.' },
  { code: 403, label: 'Forbidden', description: 'Partner or role cannot perform this action.' },
]

function hostBase(path: string): Pick<EndpointDefinition, 'baseUrl' | 'path'> {
  return { baseUrl: PARTNER_API_HOST, path }
}

export const onboardingEndpoints: EndpointDefinition[] = [
  {
    method: 'GET',
    ...hostBase('/partner-institutions'),
    title: 'List institutions',
    description: 'Returns SACCOs linked to your partner API key.',
    responseBody: `{
  "success": true,
  "data": [
    {
      "id": "inst_abc123",
      "code": "NAMASUBA",
      "name": "Namasuba SACCO",
      "status": "ACTIVE",
      "externalOrgId": "12",
      "settlementMode": "NEXEN_LEDGER"
    }
  ]
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions'),
    title: 'Create institution',
    description:
      'Onboard a SACCO under your partner. Optionally create a settlement wallet and first staff login.',
    bodyParams: [
      { name: 'code', type: 'string', required: true, description: 'Unique SACCO code (e.g. NAMASUBA).' },
      { name: 'name', type: 'string', required: true, description: 'Display name.' },
      { name: 'externalOrgId', type: 'string', required: false, description: 'Core-banking org id (e.g. Nexen).' },
      { name: 'licenseNumber', type: 'string', required: false, description: 'Alphanumeric license number.' },
      { name: 'settlementMode', type: 'string', required: false, description: 'Default NEXEN_LEDGER.' },
      { name: 'createSettlementWallet', type: 'boolean', required: false, description: 'Create settlement wallet (default true).' },
      { name: 'createInitialStaffLogin', type: 'boolean', required: false, description: 'Invite first staff user.' },
      { name: 'initialStaffEmail', type: 'string', required: false, description: 'Required if createInitialStaffLogin is true.' },
      { name: 'initialStaffPhone', type: 'string', required: false, description: 'Required if createInitialStaffLogin is true.' },
      { name: 'initialStaffRole', type: 'string', required: false, description: 'OWNER | ADMIN | OPERATOR | VIEWER.' },
    ],
    requestBody: `{
  "code": "NAMASUBA",
  "name": "Namasuba SACCO",
  "externalOrgId": "12",
  "createSettlementWallet": true,
  "createInitialStaffLogin": true,
  "initialStaffEmail": "admin@namasuba.ug",
  "initialStaffPhone": "+256701234567",
  "initialStaffFirstName": "Jane",
  "initialStaffLastName": "Doe",
  "initialStaffRole": "OWNER"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "id": "inst_abc123",
    "code": "NAMASUBA",
    "name": "Namasuba SACCO",
    "status": "ACTIVE"
  }
}`,
    statusCodes: [
      { code: 201, label: 'Created', description: 'SACCO created.' },
      { code: 409, label: 'Conflict', description: 'Duplicate code or externalOrgId.' },
      ...authCodes.filter((c) => c.code === 401 || c.code === 403),
    ],
  },
  {
    method: 'PATCH',
    ...hostBase('/partner-institutions/{institutionId}/withdrawal-settings'),
    title: 'Withdrawal settings',
    description: 'Enable or restrict savings and shares withdrawals for the SACCO.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id from create/list.' },
    ],
    bodyParams: [
      { name: 'enabled', type: 'boolean', required: false, description: 'Master switch for withdrawals.' },
      { name: 'savings', type: 'boolean', required: false, description: 'Allow savings withdrawals.' },
      { name: 'shares', type: 'boolean', required: false, description: 'Allow shares withdrawals.' },
    ],
    requestBody: `{
  "enabled": true,
  "savings": true,
  "shares": false
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
]

export const memberEndpoints: EndpointDefinition[] = [
  {
    method: 'GET',
    ...hostBase('/partner-institutions/{institutionId}/users'),
    title: 'List members',
    description: 'All members registered for this SACCO.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/users'),
    title: 'Create member',
    description: 'Register a SACCO member. Phone is required; accountNo / clientId link to core banking.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    bodyParams: [
      { name: 'firstName', type: 'string', required: true, description: 'Legal first name.' },
      { name: 'lastName', type: 'string', required: true, description: 'Legal last name.' },
      { name: 'phone', type: 'string', required: true, description: 'E.g. +256701234567.' },
      { name: 'displayName', type: 'string', required: false, description: 'Public name (editable later).' },
      { name: 'email', type: 'string', required: false, description: 'Optional email.' },
      { name: 'nationalId', type: 'string', required: false, description: 'Uganda NIN, unless not applicable.' },
      { name: 'nationalIdNotApplicable', type: 'boolean', required: false, description: 'Skip NIN when true.' },
      { name: 'accountNo', type: 'string', required: false, description: 'Core-banking account number.' },
      { name: 'clientId', type: 'string', required: false, description: 'Core-banking client id.' },
      { name: 'acknowledgePhoneNameMismatch', type: 'boolean', required: false, description: 'Accept MNO name mismatch.' },
    ],
    requestBody: `{
  "firstName": "John",
  "lastName": "Doe",
  "displayName": "John D.",
  "phone": "+256701234567",
  "nationalId": "CF12345678901234",
  "accountNo": "AC001",
  "clientId": "1001",
  "status": "ACTIVE"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "id": "mem_xyz789",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+256701234567",
    "accountNo": "AC001",
    "status": "ACTIVE"
  }
}`,
    statusCodes: [
      { code: 201, label: 'Created', description: 'Member created.' },
      ...authCodes.filter((c) => c.code !== 200 && c.code !== 201),
    ],
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/users/validate-phone'),
    title: 'Validate phone',
    description: 'Check phone against MNO account name before creating a member.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    bodyParams: [
      { name: 'phone', type: 'string', required: true, description: 'Member phone to validate.' },
      { name: 'firstName', type: 'string', required: true, description: 'Expected first name.' },
      { name: 'lastName', type: 'string', required: true, description: 'Expected last name.' },
    ],
    requestBody: `{
  "phone": "+256701234567",
  "firstName": "John",
  "lastName": "Doe"
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'PATCH',
    ...hostBase('/partner-institutions/{institutionId}/users/{memberId}'),
    title: 'Update member',
    description: 'Update display name, email, account, or status. Legal names cannot change.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
      { name: 'memberId', type: 'string', required: true, description: 'Member id.' },
    ],
    bodyParams: [
      { name: 'displayName', type: 'string', required: false, description: 'Public display name.' },
      { name: 'email', type: 'string', required: false, description: 'Email.' },
      { name: 'accountNo', type: 'string', required: false, description: 'Account number.' },
      { name: 'clientId', type: 'string', required: false, description: 'Client id.' },
      { name: 'status', type: 'string', required: false, description: 'e.g. ACTIVE.' },
    ],
    requestBody: `{
  "displayName": "John D.",
  "accountNo": "AC001",
  "status": "ACTIVE"
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'DELETE',
    ...hostBase('/partner-institutions/{institutionId}/users/{memberId}'),
    title: 'Remove member',
    description: 'Delete a member. Blocked if they already have transactions.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
      { name: 'memberId', type: 'string', required: true, description: 'Member id.' },
    ],
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/users/upload'),
    title: 'Bulk upload members',
    description: 'Upload an Excel file (field name: file). Download the template first.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'GET',
    ...hostBase('/partner-institutions/users/template'),
    title: 'Download Excel template',
    description: 'Empty template for bulk member upload.',
    statusCodes: [{ code: 200, label: 'OK', description: 'xlsx file returned.' }],
  },
]

export const staffEndpoints: EndpointDefinition[] = [
  {
    method: 'GET',
    ...hostBase('/partner-institutions/{institutionId}/staff'),
    title: 'List staff',
    description: 'Staff logins for this SACCO.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/staff'),
    title: 'Create staff',
    description: 'Invite a staff user with role and permissions. Invitation email is sent.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    bodyParams: [
      { name: 'firstName', type: 'string', required: true, description: 'First name.' },
      { name: 'lastName', type: 'string', required: true, description: 'Last name.' },
      { name: 'email', type: 'string', required: true, description: 'Login email.' },
      { name: 'phone', type: 'string', required: false, description: 'Contact only — not used as wallet identity.' },
      { name: 'role', type: 'string', required: false, description: 'OWNER | ADMIN | OPERATOR | VIEWER.' },
      { name: 'canViewTransactions', type: 'boolean', required: false, description: 'View transaction history.' },
      { name: 'canManageMembers', type: 'boolean', required: false, description: 'Manage members and staff.' },
      { name: 'canManageInstitution', type: 'boolean', required: false, description: 'Edit SACCO settings.' },
      { name: 'canRequestLiquidation', type: 'boolean', required: false, description: 'Request liquidation.' },
    ],
    requestBody: `{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@sacco.com",
  "phone": "+256701234567",
  "role": "OPERATOR",
  "canViewTransactions": true,
  "canManageMembers": false,
  "canManageInstitution": false,
  "canRequestLiquidation": false
}`,
    statusCodes: [
      { code: 201, label: 'Created', description: 'Staff invited.' },
      ...authCodes.filter((c) => c.code === 401 || c.code === 403),
    ],
  },
  {
    method: 'PATCH',
    ...hostBase('/partner-institutions/{institutionId}/staff/{memberId}'),
    title: 'Update staff',
    description: 'Change role and permission flags.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
      { name: 'memberId', type: 'string', required: true, description: 'Staff member id.' },
    ],
    bodyParams: [
      { name: 'role', type: 'string', required: true, description: 'OWNER | ADMIN | OPERATOR | VIEWER.' },
      { name: 'canViewTransactions', type: 'boolean', required: false, description: 'Permission flag.' },
      { name: 'canManageMembers', type: 'boolean', required: false, description: 'Permission flag.' },
      { name: 'canManageInstitution', type: 'boolean', required: false, description: 'Permission flag.' },
      { name: 'canRequestLiquidation', type: 'boolean', required: false, description: 'Permission flag.' },
    ],
    requestBody: `{
  "role": "ADMIN",
  "canViewTransactions": true,
  "canManageMembers": true,
  "canManageInstitution": true
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/staff/{memberId}/resend-invitation'),
    title: 'Resend invitation',
    description: 'Resend staff invite email (rate limited).',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
      { name: 'memberId', type: 'string', required: true, description: 'Staff member id.' },
    ],
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
]

export const transactionEndpoints: EndpointDefinition[] = [
  {
    method: 'GET',
    ...hostBase('/partner-institutions/{institutionId}/wallet'),
    title: 'Get settlement wallet',
    description: 'Balance and public wallet account number for agent deposits.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    responseBody: `{
  "success": true,
  "data": {
    "walletId": "wal_abc",
    "currency": "UGX",
    "balance": 2500000,
    "availableBalance": 2500000,
    "publicAccountNumber": "RP-SACCO-001"
  }
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/wallet/fund-mno'),
    title: 'Fund wallet (MNO)',
    description: 'Collect from MTN/Airtel into the SACCO settlement wallet.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    bodyParams: [
      { name: 'amount', type: 'number', required: true, description: 'Amount in UGX.' },
      { name: 'phoneNumber', type: 'string', required: true, description: '256XXXXXXXXX or 0XXXXXXXXX.' },
      { name: 'mnoProvider', type: 'string', required: true, description: 'MTN or AIRTEL.' },
      { name: 'callbackUrl', type: 'string', required: false, description: 'Webhook for async status.' },
      { name: 'partnerReference', type: 'string', required: false, description: 'Idempotency key.' },
    ],
    requestBody: `{
  "amount": 500000,
  "phoneNumber": "256701234567",
  "mnoProvider": "MTN",
  "callbackUrl": "https://your-app.com/webhooks/rukapay",
  "partnerReference": "FUND-001"
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/wallet/transfer-mno'),
    title: 'Transfer wallet → MNO',
    description: 'Send settlement funds to a mobile money number.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    bodyParams: [
      { name: 'amount', type: 'number', required: true, description: 'Amount in UGX.' },
      { name: 'phoneNumber', type: 'string', required: true, description: 'Recipient MSISDN.' },
      { name: 'mnoProvider', type: 'string', required: true, description: 'MTN or AIRTEL.' },
    ],
    requestBody: `{
  "amount": 100000,
  "phoneNumber": "256701234567",
  "mnoProvider": "AIRTEL",
  "partnerReference": "PAYOUT-001"
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/wallet/transfer-bank'),
    title: 'Transfer wallet → bank',
    description: 'Send settlement funds to a bank account.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    bodyParams: [
      { name: 'amount', type: 'number', required: true, description: 'Amount in UGX.' },
      { name: 'accountNumber', type: 'string', required: true, description: 'Bank account number.' },
      { name: 'bankCode', type: 'string', required: true, description: 'Bank code e.g. STANBIC.' },
      { name: 'accountName', type: 'string', required: false, description: 'Account holder name.' },
    ],
    requestBody: `{
  "amount": 250000,
  "accountNumber": "1234567890",
  "bankCode": "STANBIC",
  "accountName": "Namasuba SACCO"
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'GET',
    ...hostBase('/partner-institutions/{institutionId}/transactions'),
    title: 'List transactions',
    description: 'Paginated history. Optional filters: type, status, dates. CSV via format=csv.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    queryParams: [
      { name: 'page', type: 'number', required: false, description: 'Page number.' },
      { name: 'limit', type: 'number', required: false, description: 'Page size.' },
      { name: 'type', type: 'string', required: false, description: 'Transaction type filter.' },
      { name: 'status', type: 'string', required: false, description: 'Status filter.' },
      { name: 'format', type: 'string', required: false, description: 'json (default) or csv.' },
    ],
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/transactions'),
    title: 'Execute transaction',
    description:
      'One endpoint for deposits, withdrawals, shares, loans, member transfers, and liquidation. Set type.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    bodyParams: [
      { name: 'type', type: 'string', required: true, description: 'See transaction types table.' },
      { name: 'accountNo', type: 'string', required: false, description: 'Member account number.' },
      { name: 'clientId', type: 'string', required: false, description: 'Core-banking client id.' },
      { name: 'amount', type: 'number', required: false, description: 'Amount in UGX.' },
      { name: 'productId', type: 'number', required: false, description: 'Loan product (GIVE_LOAN).' },
      { name: 'ledgerId', type: 'number', required: false, description: 'Shares ledger id.' },
      { name: 'savingsProductId', type: 'number', required: false, description: 'Savings product id.' },
      { name: 'disbursementId', type: 'number', required: false, description: 'Loan disbursement (repayment).' },
      { name: 'fundingSource', type: 'string', required: false, description: 'MNO or WALLET.' },
      { name: 'payoutMethod', type: 'string', required: false, description: 'RUKAPAY_WALLET | MTN | AIRTEL | BANK.' },
      { name: 'partnerReference', type: 'string', required: false, description: 'Idempotency key.' },
    ],
    requestBody: `{
  "type": "DEPOSIT",
  "accountNo": "AC001",
  "clientId": "1001",
  "amount": 50000,
  "savingsProductId": 3,
  "fundingSource": "MNO",
  "mnoProvider": "MTN",
  "phoneNumber": "256701234567",
  "partnerReference": "DEP-001"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "transactionId": "txn_abc123",
    "type": "DEPOSIT",
    "amount": 50000,
    "status": "PENDING",
    "partnerReference": "DEP-001"
  }
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
  {
    method: 'POST',
    ...hostBase('/partner-institutions/{institutionId}/transactions/bulk'),
    title: 'Bulk transactions',
    description: 'Process many items in one request. Each item succeeds or fails independently.',
    pathParams: [
      { name: 'institutionId', type: 'string', required: true, description: 'SACCO id.' },
    ],
    bodyParams: [
      { name: 'items', type: 'array', required: true, description: 'Array of transaction objects (same shape as single).' },
    ],
    requestBody: `{
  "items": [
    {
      "type": "DEPOSIT",
      "accountNo": "AC001",
      "amount": 20000,
      "savingsProductId": 3,
      "fundingSource": "WALLET",
      "partnerReference": "BULK-1"
    },
    {
      "type": "DEPOSIT",
      "accountNo": "AC002",
      "amount": 15000,
      "savingsProductId": 3,
      "fundingSource": "WALLET",
      "partnerReference": "BULK-2"
    }
  ]
}`,
    statusCodes: authCodes.filter((c) => c.code !== 201),
  },
]

export const partnerInstitutionsAuthCurl = `curl -X GET "${PARTNER_INSTITUTIONS_BASE.production}" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
