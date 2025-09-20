import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Database, Users, FileText } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
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
                <Shield className="h-6 w-6 mr-3 text-primary-950" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At Rukapay, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                API services and documentation platform.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 mr-3 text-primary-950" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company information and business details</li>
                <li>API usage data and transaction information</li>
                <li>Account credentials and authentication data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>IP addresses and device information</li>
                <li>API request logs and response data</li>
                <li>Usage patterns and performance metrics</li>
                <li>Error logs and debugging information</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 mr-3 text-primary-950" />
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide and maintain our API services</li>
                <li>Process transactions and financial operations</li>
                <li>Authenticate users and prevent fraud</li>
                <li>Improve our services and develop new features</li>
                <li>Provide customer support and technical assistance</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Send important service updates and notifications</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-3 text-primary-950" />
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure data storage with access controls</li>
                <li>Regular security audits and penetration testing</li>
                <li>Multi-factor authentication for sensitive operations</li>
                <li>Employee training on data protection best practices</li>
                <li>Incident response procedures for security breaches</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-3 text-primary-950" />
                Information Sharing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist in our operations</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-primary-950" />
                Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access and review your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                comply with legal obligations, resolve disputes, and enforce our agreements. Transaction data may be retained for up to 
                7 years as required by financial regulations.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that 
                such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@rukapay.co.ug<br />
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
