import Link from 'next/link'
import { ArrowLeft, FileText, Scale, AlertTriangle, Shield, Users, CreditCard } from 'lucide-react'

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to API Docs
            </Link>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
            <p className="text-gray-600 mt-2">Last updated: January 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-primary-950" />
                Agreement to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Rukapay&apos;s API services, you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our services. These terms constitute a legally 
                binding agreement between you and Rukapay Limited.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 mr-3 text-primary-950" />
                Definitions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">&quot;API&quot;</h3>
                  <p className="text-gray-700">Application Programming Interface provided by Rukapay for financial services integration.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">&quot;Service&quot;</h3>
                  <p className="text-gray-700">All services, features, and functionality provided through our API platform.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">&quot;User&quot; or &quot;You&quot;</h3>
                  <p className="text-gray-700">Any individual or entity that accesses or uses our API services.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">&quot;Account&quot;</h3>
                  <p className="text-gray-700">Your registered account with Rukapay that provides access to API services.</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-6 w-6 mr-3 text-primary-950" />
                Service Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Rukapay provides API services for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Wallet management and balance inquiries</li>
                <li>Transaction processing and payment processing</li>
                <li>Mobile money integration</li>
                <li>Bank transfer services</li>
                <li>Bulk transaction processing</li>
                <li>Financial data analytics and reporting</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-primary-950" />
                User Responsibilities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of our API services, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your API keys and credentials</li>
                <li>Use the services only for lawful purposes</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not attempt to reverse engineer or compromise our systems</li>
                <li>Respect rate limits and usage guidelines</li>
                <li>Report any security vulnerabilities or suspicious activity</li>
                <li>Keep your account information up to date</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-primary-950" />
                Prohibited Uses
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use our API services for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Money laundering or terrorist financing</li>
                <li>Fraudulent or illegal activities</li>
                <li>Violation of any applicable laws or regulations</li>
                <li>Transmission of malicious code or viruses</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with the proper functioning of our services</li>
                <li>Reselling or redistributing our services without permission</li>
                <li>Any activity that could harm our reputation or business</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Usage and Limits</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Rate Limits</h3>
                  <p className="text-gray-700">We implement rate limits to ensure fair usage and system stability. Exceeding these limits may result in temporary or permanent suspension of access.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">API Keys</h3>
                  <p className="text-gray-700">You are responsible for maintaining the confidentiality of your API keys. Any unauthorized use of your keys is your responsibility.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Usage</h3>
                  <p className="text-gray-700">You may only use data obtained through our API for legitimate business purposes and in compliance with applicable data protection laws.</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fees and Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our API services may be subject to fees as outlined in our pricing schedule. You agree to pay all applicable fees 
                in accordance with the terms specified in your service agreement. Failure to pay fees may result in service suspension.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Transaction fees are charged per successful transaction</li>
                <li>Monthly subscription fees may apply for premium features</li>
                <li>Overage charges may apply for usage beyond included limits</li>
                <li>All fees are non-refundable unless otherwise specified</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, trademarks, and intellectual property rights in our API services remain the property of Rukapay Limited. 
                You may not copy, modify, distribute, or create derivative works based on our services without explicit written permission.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability</h2>
              <p className="text-gray-700 leading-relaxed">
                While we strive to maintain high service availability, we do not guarantee uninterrupted access to our API services. 
                We may perform maintenance, updates, or modifications that may temporarily affect service availability.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Scale className="h-6 w-6 mr-3 text-primary-950" />
                Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Rukapay shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising from your use of our API services. Our total liability shall not 
                exceed the amount you have paid us in the twelve months preceding the claim.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your access to our API services at any time, with or without notice, for any reason, 
                including violation of these terms. Upon termination:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Your right to use the services will cease immediately</li>
                <li>We may delete your account and associated data</li>
                <li>You remain liable for any outstanding fees or obligations</li>
                <li>Certain provisions of these terms will survive termination</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions are governed by the laws of Uganda. Any disputes arising from these terms or your use 
                of our services will be subject to the exclusive jurisdiction of the courts of Uganda.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. We will notify users of significant changes 
                via email or through our service. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@rukapay.co.ug<br />
                  <strong>Address:</strong> Rukapay Limited, Kampala, Uganda<br />
                  <strong>Phone:</strong> +256 XXX XXX XXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
