import Link from 'next/link'
import { ArrowRight, Shield, Zap, Users, Code, ExternalLink } from 'lucide-react'
import CodeExample from '@/components/CodeExample'
import EndpointCard from '@/components/EndpointCard'

const PartnerApiPage = () => {
  const endpoints = [
    {
      title: 'External Wallet APIs',
      description: 'APIs for external partners to manage wallets, check balances, and view transaction summaries',
      baseUrl: '/partner/v1/wallet',
      methods: [
        {
          method: 'GET',
          path: '/me',
          description: 'Get authenticated user\'s wallet details',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "walletId": "wallet_abc123def456",
    "userId": "user_xyz789",
    "currency": "UGX",
    "balance": 1000.50,
    "availableBalance": 950.00,
    "status": "ACTIVE",
    "isActive": true,
    "createdAt": "2023-01-01T10:00:00Z",
    "updatedAt": "2023-01-05T15:30:00Z"
  }
}`,
              color: 'text-green-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            },
            notFound: {
              code: 404,
              description: 'Not Found',
              example: `{
  "success": false,
  "error": {
    "code": 404,
    "message": "Wallet not found",
    "details": "The specified wallet does not exist or is not accessible"
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'GET',
          path: '/me/balance',
          description: 'Get wallet balance information',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "walletId": "wallet_abc123def456",
    "currency": "UGX",
    "balance": 1000.50,
    "availableBalance": 950.00,
    "pendingBalance": 50.50,
    "lockedBalance": 0.00,
    "lastUpdated": "2023-01-05T15:30:00Z"
  }
}`,
              color: 'text-green-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            },
            serverError: {
              code: 500,
              description: 'Server Error',
              example: `{
  "success": false,
  "error": {
    "code": 500,
    "message": "Internal server error",
    "requestId": "req_123456789"
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'GET',
          path: '/me/transactions/summary',
          description: 'Get transaction summary statistics',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "walletId": "wallet_abc123def456",
    "period": "30_days",
    "summary": {
      "totalTransactions": 45,
      "totalVolume": 2500000.00,
      "totalFees": 12500.00,
      "netVolume": 2487500.00,
      "averageTransaction": 55555.56
    },
    "breakdown": {
      "deposits": {
        "count": 20,
        "volume": 1500000.00,
        "fees": 7500.00
      },
      "withdrawals": {
        "count": 15,
        "volume": 800000.00,
        "fees": 4000.00
      },
      "transfers": {
        "count": 10,
        "volume": 200000.00,
        "fees": 1000.00
      }
    },
    "currency": "UGX",
    "generatedAt": "2023-01-05T15:30:00Z"
  }
}`,
              color: 'text-green-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            },
            badRequest: {
              code: 400,
              description: 'Bad Request',
              example: `{
  "success": false,
  "error": {
    "code": 400,
    "message": "Invalid request parameters",
    "details": "Invalid period parameter. Must be one of: 7_days, 30_days, 90_days"
  }
}`,
              color: 'text-yellow-600'
            }
          }
        }
      ]
    },
    {
      title: 'Transact APIs',
      description: 'Process various types of transactions including wallet-to-wallet, mobile money, and bank transfers',
      baseUrl: '/partner/v1/transactions',
      methods: [
        {
          method: 'POST',
          path: '/transact',
          description: 'Process a unified transaction',
          auth: 'API Key Required'
        },
        {
          method: 'GET',
          path: '/modes',
          description: 'Get available transaction modes',
          auth: 'API Key Required'
        },
        {
          method: 'POST',
          path: '/preview-fees',
          description: 'Preview transaction fees before processing',
          auth: 'API Key Required'
        },
        {
          method: 'GET',
          path: '/my-transactions',
          description: 'Get user\'s transaction history',
          auth: 'API Key Required'
        },
        {
          method: 'POST',
          path: '/validate',
          description: 'Validate transaction before processing',
          auth: 'API Key Required'
        }
      ]
    },
    {
      title: 'Bulk Transactions',
      description: 'Process multiple transactions in a single batch for efficiency',
      baseUrl: '/partner/v1/transactions/bulk',
      methods: [
        {
          method: 'POST',
          path: '/',
          description: 'Create a new bulk transaction batch',
          auth: 'API Key Required'
        },
        {
          method: 'GET',
          path: '/:batchId/status',
          description: 'Get bulk transaction status',
          auth: 'API Key Required'
        },
        {
          method: 'POST',
          path: '/validate',
          description: 'Validate bulk transaction batch',
          auth: 'API Key Required'
        }
      ]
    }
  ]

  const codeExamples = {
    authentication: {
      title: 'Authentication',
      description: 'All requests require an API key in the Authorization header',
      code: `curl -X GET "https://api.rukapay.co.ug/partner/v1/wallet/me" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json"`
    },
    walletRequest: {
      title: 'Get Wallet Information',
      description: 'Retrieve wallet details for a user',
      code: `curl -X GET "https://api.rukapay.co.ug/partner/v1/wallet/me?userId=user_123456789" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json"`
    },
    transactionRequest: {
      title: 'Process Transaction',
      description: 'Send funds from wallet to mobile money',
      code: `curl -X POST "https://api.rukapay.co.ug/partner/v1/transactions/transact" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123456789",
    "mode": "WALLET_TO_MNO",
    "amount": 50000,
    "currency": "UGX",
    "description": "Payment for services",
    "phoneNumber": "+256700000001",
    "mnoProvider": "MTN"
  }'`
    },
    bulkTransactionRequest: {
      title: 'Bulk Transaction',
      description: 'Process multiple transactions in a single batch',
      code: `curl -X POST "https://api.rukapay.co.ug/partner/v1/transactions/bulk" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123456789",
    "batchReference": "salary_payment_2024_01",
    "mode": "WALLET_TO_MNO",
    "currency": "UGX",
    "description": "Monthly salary payments",
    "items": [
      {
        "referenceId": "emp_001",
        "amount": 500000,
        "description": "Salary - John Doe",
        "phoneNumber": "+256700000001",
        "mnoProvider": "MTN"
      }
    ]
  }'`
    }
  }

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-secondary-600" />,
      title: 'Secure API Keys',
      description: 'Bank-grade security with encrypted API keys and comprehensive access controls'
    },
    {
      icon: <Zap className="h-6 w-6 text-secondary-600" />,
      title: 'Real-Time Processing',
      description: 'Instant transaction processing with real-time status updates and webhooks'
    },
    {
      icon: <Users className="h-6 w-6 text-secondary-600" />,
      title: 'Partner Management',
      description: 'Comprehensive partner account management with granular permissions'
    },
    {
      icon: <Code className="h-6 w-6 text-secondary-600" />,
      title: 'Developer Friendly',
      description: 'RESTful APIs with comprehensive documentation and SDKs'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partner API
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Comprehensive APIs for wallet management, transaction processing, and bulk operations. 
              Designed specifically for third-party partners and integrators.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <div className="relative inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg opacity-50 cursor-not-allowed">
                  Try Sandbox
                  <span className="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for scale, security, and developer experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Wallet APIs Section */}
      <section id="external-wallet-apis" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">External Wallet APIs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              APIs for external partners to manage wallets, check balances, and view transaction summaries
            </p>
          </div>
          <div className="space-y-8">
            {endpoints.filter(endpoint => endpoint.title === 'External Wallet APIs').map((endpoint, index) => (
              <EndpointCard key={index} {...endpoint} />
            ))}
          </div>
        </div>
      </section>

      {/* Transact APIs Section */}
      <section id="transact-apis" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transact APIs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Process various transaction types including wallet-to-wallet, mobile money, and bank transfers
            </p>
          </div>
          <div className="space-y-8">
            {endpoints.filter(endpoint => endpoint.title === 'Transact APIs').map((endpoint, index) => (
              <EndpointCard key={index} {...endpoint} />
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Operations Section */}
      <section id="bulk-operations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bulk Operations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Efficiently process multiple transactions in a single batch for payroll and bulk payments
            </p>
          </div>
          <div className="space-y-8">
            {endpoints.filter(endpoint => endpoint.title === 'Bulk Transactions').map((endpoint, index) => (
              <EndpointCard key={index} {...endpoint} />
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Code Examples</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started quickly with these practical examples
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(codeExamples).map(([key, example]) => (
              <CodeExample key={key} {...example} />
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transaction Modes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive support for various transaction types with clear requirements and examples
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Wallet to Wallet',
                description: 'Transfer funds between Rukapay wallets',
                mandatoryFields: ['senderUserId', 'recipientUserId', 'amount', 'currency'],
                status: 'active'
              },
              {
                name: 'Wallet to Mobile Money',
                description: 'Send funds from wallet to mobile money accounts',
                mandatoryFields: ['userId', 'amount', 'phoneNumber', 'mnoProvider'],
                status: 'active'
              },
              {
                name: 'Mobile Money to Wallet',
                description: 'Top up wallet from mobile money',
                mandatoryFields: ['userId', 'amount', 'phoneNumber', 'mnoProvider'],
                status: 'active'
              },
              {
                name: 'Bank Transfer',
                description: 'Transfer funds to bank accounts',
                mandatoryFields: ['userId', 'amount', 'bankCode', 'accountNumber'],
                status: 'beta'
              },
              {
                name: 'Merchant Payment',
                description: 'Pay merchants and service providers',
                mandatoryFields: ['userId', 'amount', 'merchantId', 'description'],
                status: 'active'
              },
              {
                name: 'Wallet Top-up',
                description: 'Add funds to wallet from external sources',
                mandatoryFields: ['userId', 'amount', 'paymentMethod', 'currency'],
                status: 'active'
              }
            ].map((transaction, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{transaction.name}</h3>
                  <span className={`status-badge ${
                    transaction.status === 'active' ? 'status-success' : 'status-warning'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{transaction.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Mandatory Fields:</h4>
                  <div className="flex flex-wrap gap-2">
                    {transaction.mandatoryFields.map((field) => (
                      <span
                        key={field}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/transaction-modes"
                  className="inline-flex items-center text-primary-950 hover:text-primary-800 font-medium mt-4 text-sm"
                >
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/transaction-modes"
              className="inline-flex items-center px-6 py-3 bg-primary-950 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors duration-200"
            >
              View Complete Transaction Modes Guide
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Integrate?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Start building with our Partner API today. Get your API keys and begin integration in minutes.
          </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get API Keys
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <div className="relative inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg opacity-50 cursor-not-allowed">
                  Try Sandbox
                  <span className="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>
        </div>
      </section>
    </div>
  )
}

export default PartnerApiPage
