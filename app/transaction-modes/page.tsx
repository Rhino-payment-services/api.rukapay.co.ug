import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertTriangle, Clock, Info, XCircle } from 'lucide-react'
import CollapsibleCard from '@/components/CollapsibleCard'

const TransactionModesPage = () => {
  const getIcon = (iconType: string) => {
    const iconProps = "h-6 w-6 text-green-600"
    switch (iconType) {
      case 'CheckCircle':
        return <CheckCircle className={iconProps} />
      case 'AlertTriangle':
        return <AlertTriangle className={iconProps} />
      case 'Clock':
        return <Clock className={iconProps} />
      case 'Info':
        return <Info className={iconProps} />
      case 'XCircle':
        return <XCircle className={iconProps} />
      default:
        return <CheckCircle className={iconProps} />
    }
  }

  const transactionModes = [
    {
      name: 'WALLET_TO_WALLET',
      displayName: 'Wallet to Wallet',
      description: 'Transfer funds between Rukapay wallets instantly',
      status: 'active',
      iconType: 'CheckCircle',
      mandatoryFields: [
        { name: 'senderUserId', type: 'string', description: 'ID of the user sending funds', example: 'user_123456789' },
        { name: 'recipientUserId', type: 'string', description: 'ID of the user receiving funds', example: 'user_987654321' },
        { name: 'amount', type: 'number', description: 'Amount to transfer (in smallest currency unit)', example: 50000 },
        { name: 'currency', type: 'string', description: 'Currency code', example: 'UGX' }
      ],
      optionalFields: [
        { name: 'description', type: 'string', description: 'Transaction description or memo', example: 'Payment for services' },
        { name: 'externalReference', type: 'string', description: 'External reference ID for tracking', example: 'ref_001' }
      ],
      examples: {
        request: `{
  "mode": "WALLET_TO_WALLET",
  "senderUserId": "user_123456789",
  "recipientUserId": "user_987654321",
  "amount": 50000,
  "currency": "UGX",
  "description": "Payment for services"
}`,
        responses: {
          success: `{
  "success": true,
  "transactionId": "txn_abc123def456",
  "status": "COMPLETED",
  "amount": 50000,
  "currency": "UGX",
  "fee": 1500,
  "netAmount": 48500,
  "createdAt": "2024-01-20T15:45:00Z",
  "updatedAt": "2024-01-20T15:45:05Z"
}`,
          pending: `{
  "success": true,
  "transactionId": "txn_abc123def456",
  "status": "PENDING",
  "amount": 50000,
  "currency": "UGX",
  "fee": 1500,
  "netAmount": 48500,
  "createdAt": "2024-01-20T15:45:00Z",
  "message": "Transaction is being processed"
}`,
          failed: `{
  "success": false,
  "transactionId": "txn_abc123def456",
  "status": "FAILED",
  "amount": 50000,
  "currency": "UGX",
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "Insufficient wallet balance",
    "details": "Available balance: 30000 UGX, Required: 50000 UGX"
  },
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          validation_error: `{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be greater than 0"
      },
      {
        "field": "currency",
        "message": "Currency is required"
      }
    ]
  }
}`
        }
      }
    },
    {
      name: 'WALLET_TO_MNO',
      displayName: 'Wallet to Mobile Money',
      description: 'Send funds from Rukapay wallet to mobile money accounts (MTN, Airtel, etc.)',
      status: 'active',
      iconType: 'CheckCircle',
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user sending funds', example: 'user_123456789' },
        { name: 'amount', type: 'number', description: 'Amount to send (in smallest currency unit)', example: 25000 },
        { name: 'phoneNumber', type: 'string', description: 'Recipient phone number (with country code)', example: '+256700000001' },
        { name: 'mnoProvider', type: 'string', description: 'Mobile Network Operator', example: 'MTN' }
      ],
      optionalFields: [
        { name: 'description', type: 'string', description: 'Transaction description', example: 'Mobile money transfer' },
        { name: 'externalReference', type: 'string', description: 'External reference ID', example: 'ref_002' }
      ],
      examples: {
        request: `{
  "mode": "WALLET_TO_MNO",
  "userId": "user_123456789",
  "amount": 25000,
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN",
  "description": "Mobile money transfer"
}`,
        responses: {
          success: `{
  "success": true,
  "transactionId": "txn_mno123456",
  "status": "COMPLETED",
  "amount": 25000,
  "currency": "UGX",
  "fee": 500,
  "netAmount": 24500,
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN",
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          pending: `{
  "success": true,
  "transactionId": "txn_mno123456",
  "status": "PENDING",
  "amount": 25000,
  "currency": "UGX",
  "fee": 500,
  "netAmount": 24500,
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN",
  "createdAt": "2024-01-20T15:45:00Z",
  "message": "Transaction sent to mobile money provider"
}`,
          failed: `{
  "success": false,
  "transactionId": "txn_mno123456",
  "status": "FAILED",
  "amount": 25000,
  "currency": "UGX",
  "error": {
    "code": "INVALID_PHONE_NUMBER",
    "message": "Invalid phone number format",
    "details": "Phone number must be in international format (+256XXXXXXXXX)"
  },
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          validation_error: `{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "mnoProvider",
        "message": "Invalid MNO provider. Supported: MTN, AIRTEL, UTL"
      }
    ]
  }
}`
        }
      }
    },
    {
      name: 'MNO_TO_WALLET',
      displayName: 'Mobile Money to Wallet',
      description: 'Top up Rukapay wallet from mobile money accounts',
      status: 'active',
      iconType: 'CheckCircle',
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user receiving funds', example: 'user_123456789' },
        { name: 'amount', type: 'number', description: 'Amount to top up (in smallest currency unit)', example: 100000 },
        { name: 'phoneNumber', type: 'string', description: 'Phone number with mobile money account', example: '+256700000001' },
        { name: 'mnoProvider', type: 'string', description: 'Mobile Network Operator', example: 'MTN' }
      ],
      optionalFields: [
        { name: 'description', type: 'string', description: 'Transaction description', example: 'Wallet top-up' },
        { name: 'externalReference', type: 'string', description: 'External reference ID', example: 'ref_003' }
      ],
      examples: {
        request: `{
  "mode": "MNO_TO_WALLET",
  "userId": "user_123456789",
  "amount": 100000,
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN",
  "description": "Wallet top-up"
}`,
        responses: {
          success: `{
  "success": true,
  "transactionId": "txn_topup123456",
  "status": "COMPLETED",
  "amount": 100000,
  "currency": "UGX",
  "fee": 0,
  "netAmount": 100000,
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN",
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          pending: `{
  "success": true,
  "transactionId": "txn_topup123456",
  "status": "PENDING",
  "amount": 100000,
  "currency": "UGX",
  "fee": 0,
  "netAmount": 100000,
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN",
  "createdAt": "2024-01-20T15:45:00Z",
  "message": "Waiting for mobile money confirmation"
}`,
          failed: `{
  "success": false,
  "transactionId": "txn_topup123456",
  "status": "FAILED",
  "amount": 100000,
  "currency": "UGX",
  "error": {
    "code": "MNO_SERVICE_UNAVAILABLE",
    "message": "Mobile money service temporarily unavailable",
    "details": "Please try again later"
  },
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          validation_error: `{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "phoneNumber",
        "message": "Phone number is required"
      }
    ]
  }
}`
        }
      }
    },
    {
      name: 'BANK_TRANSFER',
      displayName: 'Bank Transfer',
      description: 'Transfer funds from wallet to bank accounts',
      status: 'active',
      iconType: 'CheckCircle',
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user sending funds', example: 'user_123456789' },
        { name: 'amount', type: 'number', description: 'Amount to transfer', example: 500000 },
        { name: 'bankCode', type: 'string', description: 'Bank code', example: 'STANBIC' },
        { name: 'accountNumber', type: 'string', description: 'Recipient bank account number', example: '1234567890' }
      ],
      optionalFields: [
        { name: 'accountHolderName', type: 'string', description: 'Name of account holder', example: 'John Doe' },
        { name: 'description', type: 'string', description: 'Transaction description', example: 'Bank transfer' }
      ],
      examples: {
        request: `{
  "mode": "BANK_TRANSFER",
  "userId": "user_123456789",
  "amount": 500000,
  "bankCode": "STANBIC",
  "accountNumber": "1234567890",
  "accountHolderName": "John Doe",
  "description": "Bank transfer"
}`,
        responses: {
          success: `{
  "success": true,
  "transactionId": "txn_bank123456",
  "status": "COMPLETED",
  "amount": 500000,
  "currency": "UGX",
  "fee": 2500,
  "netAmount": 497500,
  "bankCode": "STANBIC",
  "accountNumber": "1234567890",
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          pending: `{
  "success": true,
  "transactionId": "txn_bank123456",
  "status": "PENDING",
  "amount": 500000,
  "currency": "UGX",
  "fee": 2500,
  "netAmount": 497500,
  "bankCode": "STANBIC",
  "accountNumber": "1234567890",
  "createdAt": "2024-01-20T15:45:00Z",
  "message": "Bank transfer initiated"
}`,
          failed: `{
  "success": false,
  "transactionId": "txn_bank123456",
  "status": "FAILED",
  "amount": 500000,
  "currency": "UGX",
  "error": {
    "code": "INVALID_ACCOUNT",
    "message": "Invalid bank account number",
    "details": "Account number does not exist"
  },
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          validation_error: `{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "bankCode",
        "message": "Bank code is required"
      }
    ]
  }
}`
        }
      }
    },
    {
      name: 'MERCHANT_PAYMENT',
      displayName: 'Merchant Payment',
      description: 'Pay merchants and service providers',
      status: 'active',
      iconType: 'CheckCircle',
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user making payment', example: 'user_123456789' },
        { name: 'amount', type: 'number', description: 'Payment amount', example: 15000 },
        { name: 'merchantId', type: 'string', description: 'ID of the merchant', example: 'merchant_abc123' },
        { name: 'description', type: 'string', description: 'Payment description', example: 'Payment for groceries' }
      ],
      optionalFields: [
        { name: 'externalReference', type: 'string', description: 'External reference ID', example: 'order_12345' },
        { name: 'metadata', type: 'object', description: 'Additional payment metadata', example: '{"orderId": "12345", "items": 3}' }
      ],
      examples: {
        request: `{
  "mode": "MERCHANT_PAYMENT",
  "userId": "user_123456789",
  "amount": 15000,
  "merchantId": "merchant_abc123",
  "description": "Payment for groceries",
  "externalReference": "order_12345"
}`,
        responses: {
          success: `{
  "success": true,
  "transactionId": "txn_merchant123456",
  "status": "COMPLETED",
  "amount": 15000,
  "currency": "UGX",
  "fee": 300,
  "netAmount": 14700,
  "merchantId": "merchant_abc123",
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          pending: `{
  "success": true,
  "transactionId": "txn_merchant123456",
  "status": "PENDING",
  "amount": 15000,
  "currency": "UGX",
  "fee": 300,
  "netAmount": 14700,
  "merchantId": "merchant_abc123",
  "createdAt": "2024-01-20T15:45:00Z",
  "message": "Payment processing"
}`,
          failed: `{
  "success": false,
  "transactionId": "txn_merchant123456",
  "status": "FAILED",
  "amount": 15000,
  "currency": "UGX",
  "error": {
    "code": "MERCHANT_UNAVAILABLE",
    "message": "Merchant service unavailable",
    "details": "Please try again later"
  },
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          validation_error: `{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "merchantId",
        "message": "Merchant ID is required"
      }
    ]
  }
}`
        }
      }
    },
    {
      name: 'WALLET_TOPUP',
      displayName: 'Wallet Top-up',
      description: 'Add funds to wallet from external payment methods (cards, bank transfers)',
      status: 'active',
      iconType: 'CheckCircle',
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user adding funds', example: 'user_123456789' },
        { name: 'amount', type: 'number', description: 'Amount to add to wallet', example: 200000 },
        { name: 'paymentMethod', type: 'string', description: 'Payment method', example: 'CARD' },
        { name: 'currency', type: 'string', description: 'Currency code', example: 'UGX' }
      ],
      optionalFields: [
        { name: 'description', type: 'string', description: 'Top-up description', example: 'Wallet top-up via card' },
        { name: 'externalReference', type: 'string', description: 'External reference ID', example: 'ref_004' }
      ],
      examples: {
        request: `{
  "mode": "WALLET_TOPUP",
  "userId": "user_123456789",
  "amount": 200000,
  "paymentMethod": "CARD",
  "currency": "UGX",
  "description": "Wallet top-up via card"
}`,
        responses: {
          success: `{
  "success": true,
  "transactionId": "txn_topup123456",
  "status": "COMPLETED",
  "amount": 200000,
  "currency": "UGX",
  "fee": 0,
  "netAmount": 200000,
  "paymentMethod": "CARD",
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          pending: `{
  "success": true,
  "transactionId": "txn_topup123456",
  "status": "PENDING",
  "amount": 200000,
  "currency": "UGX",
  "fee": 0,
  "netAmount": 200000,
  "paymentMethod": "CARD",
  "createdAt": "2024-01-20T15:45:00Z",
  "message": "Payment gateway processing"
}`,
          failed: `{
  "success": false,
  "transactionId": "txn_topup123456",
  "status": "FAILED",
  "amount": 200000,
  "currency": "UGX",
  "error": {
    "code": "PAYMENT_DECLINED",
    "message": "Payment declined by bank",
    "details": "Insufficient funds or card blocked"
  },
  "createdAt": "2024-01-20T15:45:00Z"
}`,
          validation_error: `{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "paymentMethod",
        "message": "Payment method is required"
      }
    ]
  }
}`
        }
      }
    }
  ]


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transaction Modes
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Comprehensive guide to all supported transaction modes in the Rukapay Partner API. 
              Learn about mandatory fields, examples, and integration requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Transaction Modes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {transactionModes.map((mode) => (
              <CollapsibleCard
                key={mode.name}
                title={mode.displayName}
                description={mode.description}
                icon={getIcon(mode.iconType)}
                defaultOpen={false}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                  {/* Fields */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Mandatory Fields</h3>
                      <div className="space-y-3">
                        {mode.mandatoryFields.map((field) => (
                          <div key={`${mode.name}-mandatory-${field.name}`} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-sm font-medium text-gray-900">{field.name}</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{field.type}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{field.description}</p>
                            <p className="text-xs text-gray-500 font-mono">Example: {field.example}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {mode.optionalFields && mode.optionalFields.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Optional Fields</h3>
                        <div className="space-y-3">
                          {mode.optionalFields.map((field) => (
                            <div key={`${mode.name}-optional-${field.name}`} className="border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-sm font-medium text-gray-900">{field.name}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{field.type}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{field.description}</p>
                              <p className="text-xs text-gray-500 font-mono">Example: {field.example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Examples */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Example</h3>
                      <div className="code-block">
                        <pre className="text-sm overflow-x-auto">
                          <code>{mode.examples.request}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Examples</h3>
                      <div className="space-y-4">
                        {/* Success Response */}
                        <div key={`${mode.name}-success-response`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Success (200)</span>
                          </div>
                          <div className="code-block">
                            <pre className="text-sm overflow-x-auto text-green-600">
                              <code>{mode.examples.responses.success}</code>
                            </pre>
                          </div>
                        </div>

                        {/* Pending Response */}
                        <div key={`${mode.name}-pending-response`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">Pending (200)</span>
                          </div>
                          <div className="code-block">
                            <pre className="text-sm overflow-x-auto text-yellow-600">
                              <code>{mode.examples.responses.pending}</code>
                            </pre>
                          </div>
                        </div>

                        {/* Failed Response */}
                        <div key={`${mode.name}-failed-response`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-800">Failed (400)</span>
                          </div>
                          <div className="code-block">
                            <pre className="text-sm overflow-x-auto text-red-600">
                              <code>{mode.examples.responses.failed}</code>
                            </pre>
                          </div>
                        </div>

                        {/* Validation Error Response */}
                        <div key={`${mode.name}-validation-response`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-800">Validation Error (422)</span>
                          </div>
                          <div className="code-block">
                            <pre className="text-sm overflow-x-auto text-orange-600">
                              <code>{mode.examples.responses.validation_error}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleCard>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoint Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use these endpoints to work with transaction modes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Transaction Modes</h3>
              <p className="text-gray-600 text-sm mb-4">Retrieve all available transaction modes</p>
              <div className="code-block">
                <pre className="text-sm">GET /partner/v1/transactions/modes</pre>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Process Transaction</h3>
              <p className="text-gray-600 text-sm mb-4">Process a transaction using any supported mode</p>
              <div className="code-block">
                <pre className="text-sm">POST /partner/v1/transactions/transact</pre>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Fees</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate fees before processing</p>
              <div className="code-block">
                <pre className="text-sm">POST /partner/v1/transactions/preview-fees</pre>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive Partner API documentation and start integrating today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apis/partner" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
              View Partner API
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/get-started" className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-950 transition-colors duration-200">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TransactionModesPage
