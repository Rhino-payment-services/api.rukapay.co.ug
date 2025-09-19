import Link from 'next/link'
import { ArrowRight, CheckCircle, Copy, ExternalLink, Key, Shield, Zap } from 'lucide-react'
import InteractiveArrow from '@/components/InteractiveArrow'

const GetStartedPage = () => {
  const steps = [
    {
      number: 1,
      title: 'Create Partner Account',
      description: 'Contact our team to create your partner account and get access to the Partner API',
      icon: <Shield className="h-6 w-6 text-primary-950" />,
      details: [
        'Submit partner application form',
        'Provide business documentation',
        'Complete security verification',
        'Receive partner credentials'
      ]
    },
    {
      number: 2,
      title: 'Generate API Keys',
      description: 'Create API keys with specific permissions for your integration needs',
      icon: <Key className="h-6 w-6 text-primary-950" />,
      details: [
        'Access partner dashboard',
        'Create new API key',
        'Set permissions and expiration',
        'Download and store securely'
      ]
    },
    {
      number: 3,
      title: 'Test in Sandbox',
      description: 'Use our sandbox environment to test your integration before going live',
      icon: <Zap className="h-6 w-6 text-primary-950" />,
      details: [
        'Access sandbox environment',
        'Test API endpoints',
        'Validate transaction flows',
        'Review response formats'
      ]
    },
    {
      number: 4,
      title: 'Go Live',
      description: 'Deploy your integration to production with live API keys',
      icon: <CheckCircle className="h-6 w-6 text-primary-950" />,
      details: [
        'Switch to production API keys',
        'Monitor transaction flows',
        'Set up webhook endpoints',
        'Implement error handling'
      ]
    }
  ]

  const apiKeyExample = `ak_live_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

  const quickStartCode = `curl -X GET "https://api.rukapay.co.ug/partner/v1/wallet/me" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json"`

  const transactionExample = `curl -X POST "https://api.rukapay.co.ug/partner/v1/transactions/transact" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123456789",
    "mode": "WALLET_TO_WALLET",
    "amount": 50000,
    "currency": "UGX",
    "description": "Test transaction",
    "recipientUserId": "user_987654321"
  }'`

  const features = [
    {
      title: 'Quick Integration',
      description: 'Get up and running in minutes with our comprehensive documentation and SDKs',
      icon: <Zap className="h-6 w-6 text-secondary-600" />
    },
    {
      title: 'Secure by Design',
      description: 'Bank-grade security with encrypted API keys and comprehensive access controls',
      icon: <Shield className="h-6 w-6 text-secondary-600" />
    },
    {
      title: 'Real-Time Processing',
      description: 'Instant transaction processing with real-time status updates and webhooks',
      icon: <CheckCircle className="h-6 w-6 text-secondary-600" />
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support team available around the clock to help with your integration',
      icon: <ExternalLink className="h-6 w-6 text-secondary-600" />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get Started with Rukapay API
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Start building with our comprehensive payment APIs in just a few simple steps. 
              From account creation to production deployment, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Contact Sales
                <div className="ml-2 hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
              <Link href="/sandbox" className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-950 transition-colors duration-200">
                Try Sandbox
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started Steps</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to integrate with Rukapay API
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card p-6 h-full hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary-950 text-white rounded-full text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-950 transition-colors duration-300">{step.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <InteractiveArrow delay={index * 0.2} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Code */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with a simple API call to retrieve wallet information
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. API Key Format</h3>
                <div className="code-block">
                  <pre className="text-sm overflow-x-auto">
                    <code>{apiKeyExample}</code>
                  </pre>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  All API keys follow the format: <code className="bg-gray-100 px-1 rounded">ak_live_[timestamp]_[random]</code>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Authentication</h3>
                <div className="code-block">
                  <pre className="text-sm overflow-x-auto">
                    <code>{quickStartCode}</code>
                  </pre>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Include your API key in the Authorization header as a Bearer token
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Process Transaction</h3>
              <div className="code-block">
                <pre className="text-sm overflow-x-auto">
                  <code>{transactionExample}</code>
                </pre>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Send funds between wallets with a simple POST request
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Rukapay?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for developers, trusted by businesses, designed for scale
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

      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to build with Rukapay API
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/apis/partner" className="card p-6 hover:shadow-lg transition-shadow group">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-950">
                Partner API Documentation
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Comprehensive documentation for wallet management and transaction processing
              </p>
              <div className="flex items-center text-primary-950 group-hover:text-primary-800 font-medium">
                <span className="text-sm">View Documentation</span>
                <div className="ml-1 group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/transaction-modes" className="card p-6 hover:shadow-lg transition-shadow group">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-950">
                Transaction Types Guide
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn about all supported transaction types and their mandatory fields
              </p>
              <div className="flex items-center text-primary-950 group-hover:text-primary-800 font-medium">
                <span className="text-sm">Explore Types</span>
                <div className="ml-1 group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            <div className="card p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  SDKs & Libraries
                </h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  Coming Soon
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Official SDKs for Node.js, Python, PHP, and other popular languages
              </p>
              <div className="flex items-center text-gray-400 font-medium">
                <span className="text-sm">Download SDKs</span>
                <div className="ml-1">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="card p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Sandbox Environment
                </h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  Coming Soon
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Test your integration in a safe environment before going live
              </p>
              <div className="flex items-center text-gray-400 font-medium">
                <span className="text-sm">Access Sandbox</span>
                <div className="ml-1">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="card p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Support Center
                </h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  Coming Soon
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Get help from our support team and community resources
              </p>
              <div className="flex items-center text-gray-400 font-medium">
                <span className="text-sm">Get Support</span>
                <div className="ml-1">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact our team today to create your partner account and start building with Rukapay API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Contact Sales Team
              <div className="ml-2 hover:translate-x-1 transition-transform duration-200">
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>
            <Link href="/sandbox" className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-950 transition-colors duration-200">
              Try Sandbox First
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GetStartedPage
