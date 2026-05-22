import {
  GATEWAY_FULL_URL,
  SANDBOX_GATEWAY_FULL_URL,
  API_ENVIRONMENTS,
  TRANSACTION_MODES,
} from './gateway-api'

export type CodeLanguage =
  | 'javascript'
  | 'typescript'
  | 'php'
  | 'python'
  | 'go'
  | 'curl'

export const codeLanguages: { id: CodeLanguage; label: string }[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'php', label: 'PHP' },
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'curl', label: 'cURL' },
]

export const API_BASE = GATEWAY_FULL_URL

const collectBody = `{
  "transactionMode": "${TRANSACTION_MODES.PARTNER_COLLECT_MNO.code}",
  "amount": 50000,
  "currency": "UGX",
  "phoneNumber": "256700000000",
  "mnoProvider": "MTN",
  "narration": "Invoice payment #1001",
  "partnerReference": "PARTNER-REF-123456",
  "callbackUrl": "https://your-app.com/webhooks/rukapay"
}`

const payoutMnoBody = `{
  "transactionMode": "${TRANSACTION_MODES.PARTNER_SEND_MNO.code}",
  "amount": 25000,
  "currency": "UGX",
  "phoneNumber": "256700000001",
  "mnoProvider": "AIRTEL",
  "recipientName": "Jane Doe",
  "narration": "Salary payout",
  "partnerReference": "PAYROLL-042"
}`

export const authExamples: Record<CodeLanguage, string> = {
  javascript: `const response = await fetch('${GATEWAY_FULL_URL}/process-transfer', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.RUKAPAY_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${collectBody.replace(/\n/g, '\n  ')}),
});

const result = await response.json();`,
  typescript: `const response = await fetch('${GATEWAY_FULL_URL}/process-transfer', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.RUKAPAY_API_KEY!,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${collectBody.replace(/\n/g, '\n  ')} as ProcessTransferRequest),
});

const result = await response.json();`,
  php: `<?php
$ch = curl_init('${GATEWAY_FULL_URL}/process-transfer');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'x-api-key: ' . getenv('RUKAPAY_API_KEY'),
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => '${collectBody.replace(/\n/g, '').replace(/'/g, "\\'")}',
    CURLOPT_RETURNTRANSFER => true,
]);
$result = json_decode(curl_exec($ch), true);`,
  python: `import os, requests

response = requests.post(
    "${GATEWAY_FULL_URL}/process-transfer",
    headers={
        "x-api-key": os.environ["RUKAPAY_API_KEY"],
        "Content-Type": "application/json",
    },
    json={
        "transactionMode": "PARTNER_COLLECT_MNO",
        "amount": 50000,
        "currency": "UGX",
        "phoneNumber": "256700000000",
        "mnoProvider": "MTN",
        "narration": "Invoice payment #1001",
        "partnerReference": "PARTNER-REF-123456",
        "callbackUrl": "https://your-app.com/webhooks/rukapay",
    },
)
result = response.json()`,
  go: `payload := strings.NewReader(\`${collectBody}\`)
req, _ := http.NewRequest("POST", "${GATEWAY_FULL_URL}/process-transfer", payload)
req.Header.Set("x-api-key", os.Getenv("RUKAPAY_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, _ := http.DefaultClient.Do(req)`,
  curl: `curl -X POST ${GATEWAY_FULL_URL}/process-transfer \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${collectBody}'`,
}

export const payoutExamples: Record<CodeLanguage, string> = {
  javascript: `const response = await fetch('${GATEWAY_FULL_URL}/process-transfer', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.RUKAPAY_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${payoutMnoBody.replace(/\n/g, '\n  ')}),
});`,
  typescript: authExamples.typescript
    .replace('PARTNER_COLLECT_MNO', 'PARTNER_SEND_MNO')
    .replace('Invoice payment #1001', 'Salary payout')
    .replace('PARTNER-REF-123456', 'PAYROLL-042'),
  php: authExamples.php.replace('PARTNER_COLLECT_MNO', 'PARTNER_SEND_MNO'),
  python: `import requests

requests.post(
    "${GATEWAY_FULL_URL}/process-transfer",
    headers={"x-api-key": api_key},
    json={
        "transactionMode": "PARTNER_SEND_MNO",
        "amount": 25000,
        "currency": "UGX",
        "phoneNumber": "256700000001",
        "mnoProvider": "AIRTEL",
        "recipientName": "Jane Doe",
        "narration": "Salary payout",
        "partnerReference": "PAYROLL-042",
    },
)`,
  go: authExamples.go.replace('PARTNER_COLLECT_MNO', 'PARTNER_SEND_MNO'),
  curl: `curl -X POST ${GATEWAY_FULL_URL}/process-transfer \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${payoutMnoBody}'`,
}

export const validateBeneficiaryExample = `{
  "transactionMode": "PARTNER_SEND_MNO",
  "phoneNumber": "256700000000",
  "mnoProvider": "MTN"
}`

export {
  TRANSFER_RESPONSE_EXAMPLE as transactionResponseExample,
  CALLBACK_PAYLOAD_EXAMPLE as webhookExample,
} from './gateway-api'

export const errorResponseExample = `{
  "success": false,
  "message": "Insufficient wallet balance",
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Partner escrow wallet balance is insufficient"
  }
}`

/** Use on dev-api.rukapay.net — same request body as production, path ends with -sandbox */
export const sandboxTransferExamples: Record<CodeLanguage, string> = {
  curl: `curl -X POST ${SANDBOX_GATEWAY_FULL_URL}/process-transfer-sandbox \\
  -H "x-api-key: YOUR_SANDBOX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${collectBody}'`,
  javascript: `// Dev only: ${SANDBOX_GATEWAY_FULL_URL}/process-transfer-sandbox
const response = await fetch('${SANDBOX_GATEWAY_FULL_URL}/process-transfer-sandbox', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.RUKAPAY_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${collectBody.replace(/\n/g, '\n  ')}),
});`,
  typescript: `fetch('${SANDBOX_GATEWAY_FULL_URL}/process-transfer-sandbox', { /* same as production */ })`,
  php: `curl_init('${SANDBOX_GATEWAY_FULL_URL}/process-transfer-sandbox');`,
  python: `requests.post("${SANDBOX_GATEWAY_FULL_URL}/process-transfer-sandbox", ...)`,
  go: `http.NewRequest("POST", "${SANDBOX_GATEWAY_FULL_URL}/process-transfer-sandbox", payload)`,
}

export const sandboxValidateExamples = {
  curl: `curl -X POST ${SANDBOX_GATEWAY_FULL_URL}/validate-beneficiary-sandbox \\
  -H "x-api-key: YOUR_SANDBOX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"transactionMode":"PARTNER_SEND_MNO","phoneNumber":"256700000000","mnoProvider":"MTN"}'`,
}

export { API_ENVIRONMENTS }
