import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

const TransactionTypesPage = () => {
  const transactionTypes = [
    {
      name: 'Wallet to Wallet',
      description: 'Transfer funds between Rukapay wallets instantly',
      status: 'active',
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      mandatoryFields: [
        { name: 'senderUserId', type: 'string', description: 'ID of the user sending funds' },
        { name: 'recipientUserId', type: 'string', description: 'ID of the user receiving funds' },
        { name: 'amount', type: 'number', description: 'Amount to transfer (in smallest currency unit)' },
        { name: 'currency', type: 'string', description: 'Currency code (e.g., UGX, USD)' }
      ],
      optionalFields: [
        { name: 'description', type: 'string', description: 'Transaction description or memo' },
        { name: 'externalReference', type: 'string', description: 'External reference ID for tracking' }
      ],
      example: {
        request: `{
  "senderUserId": "user_123456789",
  "recipientUserId": "user_987654321",
  "amount": 50000,
  "currency": "UGX",
  "description": "Payment for services"
}`,
        response: `{
  "success": true,
  "transactionId": "txn_abc123def456",
  "status": "COMPLETED",
  "amount": 50000,
  "currency": "UGX",
  "fee": 1500,
  "netAmount": 48500,
  "createdAt": "2024-01-20T15:45:00Z"
}`
      }
    },
    {
      name: 'Wallet to Mobile Money',
      description: 'Send funds from Rukapay wallet to mobile money accounts',
      status: 'active',
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user sending funds' },
        { name: 'amount', type: 'number', description: 'Amount to send (in smallest currency unit)' },
        { name: 'phoneNumber', type: 'string', description: 'Recipient phone number (with country code)' },
        { name: 'mnoProvider', type: 'string', description: 'Mobile Network Operator (MTN, AIRTEL, etc.)' }
      ],
      optionalFields: [
        { name: 'description', type: 'string', description: 'Transaction description' },
        { name: 'externalReference', type: 'string', description: 'External reference ID' }
      ],
      example: {
        request: `{
  "userId": "user_123456789",
  "amount": 25000,
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN",
  "description": "Mobile money transfer"
}`,
        response: `{
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
}`
      }
    },
    {
      name: 'Mobile Money to Wallet',
      description: 'Top up Rukapay wallet from mobile money accounts',
      status: 'active',
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user receiving funds' },
        { name: 'amount', type: 'number', description: 'Amount to top up (in smallest currency unit)' },
        { name: 'phoneNumber', type: 'string', description: 'Phone number with mobile money account' },
        { name: 'mnoProvider', type: 'string', description: 'Mobile Network Operator' }
      ],
      optionalFields: [
        { name: 'description', type: 'string', description: 'Transaction description' },
        { name: 'externalReference', type: 'string', description: 'External reference ID' }
      ],
      example: {
        request: `{
  "userId": "user_123456789",
  "amount": 100000,
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN",
  "description": "Wallet top-up"
}`,
        response: `{
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
}`
      }
    },
    {
      name: 'Bank Transfer',
      description: 'Transfer funds from wallet to bank accounts',
      status: 'beta',
      icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user sending funds' },
        { name: 'amount', type: 'number', description: 'Amount to transfer' },
        { name: 'bankCode', type: 'string', description: 'Bank code (e.g., STANBIC, EQUITY)' },
        { name: 'accountNumber', type: 'string', description: 'Recipient bank account number' }
      ],
      optionalFields: [
        { name: 'accountHolderName', type: 'string', description: 'Name of account holder' },
        { name: 'description', type: 'string', description: 'Transaction description' }
      ],
      example: {
        request: `{
  "userId": "user_123456789",
  "amount": 500000,
  "bankCode": "STANBIC",
  "accountNumber": "1234567890",
  "accountHolderName": "John Doe",
  "description": "Bank transfer"
}`,
        response: `{
  "success": true,
  "transactionId": "txn_bank123456",
  "status": "PENDING",
  "amount": 500000,
  "currency": "UGX",
  "fee": 2500,
  "netAmount": 497500,
  "bankCode": "STANBIC",
  "accountNumber": "1234567890",
  "createdAt": "2024-01-20T15:45:00Z"
}`
      }
    },
    {
      name: 'Merchant Payment',
      description: 'Pay merchants and service providers',
      status: 'active',
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user making payment' },
        { name: 'amount', type: 'number', description: 'Payment amount' },
        { name: 'merchantId', type: 'string', description: 'ID of the merchant' },
        { name: 'description', type: 'string', description: 'Payment description' }
      ],
      optionalFields: [
        { name: 'externalReference', type: 'string', description: 'External reference ID' },
        { name: 'metadata', type: 'object', description: 'Additional payment metadata' }
      ],
      example: {
        request: `{
  "userId": "user_123456789",
  "amount": 15000,
  "merchantId": "merchant_abc123",
  "description": "Payment for groceries",
  "externalReference": "order_12345"
}`,
        response: `{
  "success": true,
  "transactionId": "txn_merchant123456",
  "status": "COMPLETED",
  "amount": 15000,
  "currency": "UGX",
  "fee": 300,
  "netAmount": 14700,
  "merchantId": "merchant_abc123",
  "createdAt": "2024-01-20T15:45:00Z"
}`
      }
    },
    {
      name: 'Wallet Top-up',
      description: 'Add funds to wallet from external payment methods',
      status: 'active',
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      mandatoryFields: [
        { name: 'userId', type: 'string', description: 'ID of the user adding funds' },
        { name: 'amount', type: 'number', description: 'Amount to add to wallet' },
        { name: 'paymentMethod', type: 'string', description: 'Payment method (CARD, BANK_TRANSFER, etc.)' },
        { name: 'currency', type: 'string', description: 'Currency code' }
      ],
      optionalFields: [
        { name: 'description', type: 'string', description: 'Top-up description' },
        { name: 'externalReference', type: 'string', description: 'External reference ID' }
      ],
      example: {
        request: `{
  "userId": "user_123456789",
  "amount": 200000,
  "paymentMethod": "CARD",
  "currency": "UGX",
  "description": "Wallet top-up via card"
}`,
        response: `{
  "success": true,
  "transactionId": "txn_topup123456",
  "status": "COMPLETED",
  "amount": 200000,
  "currency": "UGX",
  "fee": 0,
  "netAmount": 200000,
  "paymentMethod": "CARD",
  "createdAt": "2024-01-20T15:45:00Z"
}`
      }
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'beta':
        return 'bg-yellow-100 text-yellow-800'
      case 'deprecated':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transaction Types
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Comprehensive guide to all supported transaction types with mandatory fields, 
              examples, and status information.
            </p>
          </div>
        </div>
      </section>

      {/* Transaction Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {transactionTypes.map((transaction, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {transaction.icon}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{transaction.name}</h2>
                      <p className="text-gray-600 mt-1">{transaction.description}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Fields */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Mandatory Fields</h3>
                      <div className="space-y-3">
                        {transaction.mandatoryFields.map((field, fieldIndex) => (
                          <div key={fieldIndex} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-sm font-medium text-gray-900">{field.name}</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{field.type}</span>
                            </div>
                            <p className="text-sm text-gray-600">{field.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {transaction.optionalFields && transaction.optionalFields.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Optional Fields</h3>
                        <div className="space-y-3">
                          {transaction.optionalFields.map((field, fieldIndex) => (
                            <div key={fieldIndex} className="border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-sm font-medium text-gray-900">{field.name}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{field.type}</span>
                              </div>
                              <p className="text-sm text-gray-600">{field.description}</p>
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
                          <code>{transaction.example.request}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Example</h3>
                      <div className="code-block">
                        <pre className="text-sm overflow-x-auto">
                          <code>{transaction.example.response}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Legend */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Status Legend</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding the status indicators for each transaction type
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active</h3>
              <p className="text-gray-600">Fully supported and available for production use</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Beta</h3>
              <p className="text-gray-600">Available for testing with limited support</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deprecated</h3>
              <p className="text-gray-600">Being phased out, use alternative methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive API documentation and start integrating today.
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

export default TransactionTypesPage
