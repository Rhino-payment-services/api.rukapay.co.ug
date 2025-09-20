import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle, Users, Database, Key, Server } from 'lucide-react'

export default function SecurityPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">Security</h1>
            <p className="text-gray-600 mt-2">Our commitment to protecting your data and ensuring secure API access</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Security Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-primary-950" />
              Security Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At Rukapay, security is our top priority. We implement industry-leading security measures to protect your data, 
              transactions, and API access. Our security framework is built on multiple layers of protection, continuous monitoring, 
              and regular security assessments.
            </p>
          </div>

          {/* Data Encryption */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-3 text-primary-950" />
              Data Encryption
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Encryption in Transit</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>TLS 1.3 for all API communications</li>
                  <li>Perfect Forward Secrecy (PFS)</li>
                  <li>Certificate pinning for mobile apps</li>
                  <li>HSTS headers for web clients</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Encryption at Rest</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>AES-256 encryption for all stored data</li>
                  <li>Separate encryption keys per customer</li>
                  <li>Hardware Security Modules (HSMs)</li>
                  <li>Regular key rotation policies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Authentication & Authorization */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Key className="h-6 w-6 mr-3 text-primary-950" />
              Authentication & Authorization
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">API Key Security</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Cryptographically secure API key generation</li>
                  <li>Hashed storage of API keys</li>
                  <li>Key rotation and revocation capabilities</li>
                  <li>Rate limiting per API key</li>
                  <li>Usage monitoring and anomaly detection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Multi-Factor Authentication</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Required for all administrative access</li>
                  <li>TOTP (Time-based One-Time Password) support</li>
                  <li>Hardware token compatibility</li>
                  <li>Biometric authentication for mobile apps</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Infrastructure Security */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Server className="h-6 w-6 mr-3 text-primary-950" />
              Infrastructure Security
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Network Security</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Private cloud infrastructure</li>
                  <li>Network segmentation and isolation</li>
                  <li>DDoS protection and mitigation</li>
                  <li>Intrusion detection systems (IDS)</li>
                  <li>Web Application Firewall (WAF)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Server Security</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Hardened operating systems</li>
                  <li>Regular security patches and updates</li>
                  <li>Container security scanning</li>
                  <li>Vulnerability assessments</li>
                  <li>Secure configuration management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="h-6 w-6 mr-3 text-primary-950" />
              Data Protection
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Classification</h3>
                <p className="text-gray-700 mb-3">All data is classified based on sensitivity levels:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Public:</strong> General information, documentation</li>
                  <li><strong>Internal:</strong> Business operations, non-sensitive logs</li>
                  <li><strong>Confidential:</strong> Customer data, transaction details</li>
                  <li><strong>Restricted:</strong> Financial records, personal identifiers</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Handling</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Principle of least privilege access</li>
                  <li>Data minimization and retention policies</li>
                  <li>Secure data disposal procedures</li>
                  <li>Cross-border data transfer controls</li>
                  <li>Regular data audits and assessments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Monitoring & Incident Response */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-3 text-primary-950" />
              Monitoring & Incident Response
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Continuous Monitoring</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>24/7 security operations center (SOC)</li>
                  <li>Real-time threat detection</li>
                  <li>Behavioral analytics and AI monitoring</li>
                  <li>Log aggregation and analysis</li>
                  <li>Performance and availability monitoring</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Incident Response</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Dedicated incident response team</li>
                  <li>Automated incident detection and alerting</li>
                  <li>Escalation procedures and communication plans</li>
                  <li>Forensic analysis capabilities</li>
                  <li>Post-incident review and improvement</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Compliance & Certifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 mr-3 text-primary-950" />
              Compliance & Certifications
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Regulatory Compliance</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Bank of Uganda (BoU) regulations compliance</li>
                  <li>Anti-Money Laundering (AML) procedures</li>
                  <li>Know Your Customer (KYC) requirements</li>
                  <li>Data Protection Act compliance</li>
                  <li>Financial Services Act adherence</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Security Standards</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>ISO 27001 Information Security Management</li>
                  <li>PCI DSS Level 1 compliance</li>
                  <li>OWASP security guidelines</li>
                  <li>NIST Cybersecurity Framework</li>
                  <li>Regular third-party security audits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security Best Practices */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 mr-3 text-primary-950" />
              Security Best Practices for API Users
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">API Key Management</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Store API keys securely (environment variables, key vaults)</li>
                  <li>Never expose keys in client-side code or logs</li>
                  <li>Rotate keys regularly (every 90 days recommended)</li>
                  <li>Use different keys for different environments</li>
                  <li>Monitor key usage and revoke unused keys</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Secure Integration</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Always use HTTPS for API calls</li>
                  <li>Implement proper error handling</li>
                  <li>Validate all input data</li>
                  <li>Use secure coding practices</li>
                  <li>Regularly update your integration code</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Monitoring & Logging</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Implement comprehensive logging</li>
                  <li>Monitor for unusual API usage patterns</li>
                  <li>Set up alerts for failed authentication attempts</li>
                  <li>Regularly review access logs</li>
                  <li>Implement rate limiting on your side</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security Incident Reporting */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3 text-primary-950" />
              Security Incident Reporting
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you discover a security vulnerability or suspect a security incident, please report it immediately:
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Contact</h3>
              <p className="text-red-700">
                <strong>Email:</strong> security@rukapay.co.ug<br />
                <strong>Phone:</strong> +256 XXX XXX XXX (24/7)<br />
                <strong>Response Time:</strong> Within 1 hour for critical issues
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What to Include in Your Report</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Description of the vulnerability or incident</li>
                <li>Steps to reproduce (if applicable)</li>
                <li>Potential impact assessment</li>
                <li>Your contact information</li>
                <li>Any supporting evidence or logs</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For general security questions or concerns, please contact our security team:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> security@rukapay.co.ug<br />
                <strong>Address:</strong> Rukapay Limited, Kampala, Uganda<br />
                <strong>Phone:</strong> +256 XXX XXX XXX<br />
                <strong>Response Time:</strong> Within 24 hours for non-critical issues
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
