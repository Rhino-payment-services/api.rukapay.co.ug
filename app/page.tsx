import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe, Code, Users, CheckCircle } from 'lucide-react'
import ApiCard from '@/components/ApiCard'

const HomePage = () => {
  const partnerApiFeatures = [
    {
      title: 'Wallet Management',
      description: 'Complete wallet operations including balance checks, transaction history, and account management',
      icon: <Users className="h-8 w-8 text-primary-950" />,
      href: '/apis/partner#external-wallet-apis',
      endpoints: ['Get Wallet', 'Check Balance', 'Transaction Summary']
    },
    {
      title: 'Transaction Processing',
      description: 'Process various transaction types including wallet-to-wallet, mobile money, and bank transfers',
      icon: <Zap className="h-8 w-8 text-primary-950" />,
      href: '/apis/partner#transact-apis',
      endpoints: ['Process Transaction', 'Preview Fees', 'Validate Transaction']
    },
    {
      title: 'Bulk Operations',
      description: 'Efficiently process multiple transactions in a single batch for payroll and bulk payments',
      icon: <Globe className="h-8 w-8 text-primary-950" />,
      href: '/apis/partner#bulk-operations',
      endpoints: ['Create Bulk Transaction', 'Check Status', 'Validate Batch']
    },
    {
      title: 'Transaction Modes',
      description: 'Comprehensive guide to all supported transaction modes and their requirements',
      icon: <Code className="h-8 w-8 text-primary-950" />,
      href: '/transaction-modes',
      endpoints: ['Wallet to Wallet', 'Mobile Money', 'Bank Transfer', 'Merchant Payment']
    }
  ]

  const transactionTypes = [
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
    }
  ]

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-secondary-600" />,
      title: 'Bank-Grade Security',
      description: 'End-to-end encryption, PCI DSS compliance, and fraud protection'
    },
    {
      icon: <Zap className="h-6 w-6 text-secondary-600" />,
      title: 'Real-Time Processing',
      description: 'Instant transaction processing with real-time status updates'
    },
    {
      icon: <Globe className="h-6 w-6 text-secondary-600" />,
      title: 'Multi-Channel Support',
      description: 'Support for mobile money, bank transfers, and digital wallets'
    },
    {
      icon: <Code className="h-6 w-6 text-secondary-600" />,
      title: 'Developer Friendly',
      description: 'RESTful APIs, comprehensive documentation, and SDKs'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Rukapay API Documentation
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto text-balance">
              Comprehensive APIs for payment processing, wallet management, and financial services integration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/apis/partner" className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-950 transition-colors duration-200">
                Explore APIs
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Partner API Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner API Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive APIs for wallet management, transaction processing, and bulk operations. 
              Everything you need to integrate with Rukapay.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerApiFeatures.map((feature) => (
              <ApiCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transaction Types</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Support for various transaction types with clear mandatory fields and status indicators.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactionTypes.map((transaction) => (
              <div key={transaction.name} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{transaction.name}</h3>
                  <span className={`status-badge ${
                    transaction.status === 'active' ? 'status-success' : 'status-warning'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{transaction.description}</p>
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
                  className="inline-flex items-center text-primary-950 hover:text-primary-800 font-medium mt-4"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Rukapay?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for developers, trusted by businesses, designed for scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Integrate?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building the future of payments in Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Start Building
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

export default HomePage