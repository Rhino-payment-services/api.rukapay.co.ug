'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Copy, Check, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react'

interface ResponseExample {
  code: number
  description: string
  example: string
  color: string
}

interface RequestExample {
  description: string
  example: string
  requiredFields: string[]
  optionalFields: string[]
}

interface Method {
  method: string
  path: string
  description: string
  auth: string
  request?: RequestExample
  responses?: {
    [key: string]: ResponseExample
  }
}

interface EndpointCardProps {
  title: string
  description: string
  baseUrl: string
  methods: Method[]
}

const EndpointCard = ({ title, description, baseUrl, methods }: EndpointCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (text: string, method: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(method)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800'
      case 'POST':
        return 'bg-blue-100 text-blue-800'
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800'
      case 'DELETE':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card p-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
          <p className="text-sm text-gray-500 mt-2 font-mono">{baseUrl}</p>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          {methods.map((method, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(method.method)}`}>
                    {method.method}
                  </span>
                  <span className="font-mono text-sm text-gray-900">{method.path}</span>
                </div>
                <button
                  onClick={() => handleCopy(`${method.method} ${baseUrl}${method.path}`, `${method.method}-${index}`)}
                  className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                >
                  {copied === `${method.method}-${index}` ? (
                    <>
                      <Check className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{method.description}</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs text-gray-500">Authentication:</span>
                <span className="text-xs font-medium text-gray-700">{method.auth}</span>
              </div>

              {/* Request Example */}
              {method.request && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Request Example</h4>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-2">{method.request.description}</p>
                    <div className="code-block">
                      <pre className="text-xs overflow-x-auto text-blue-600">
                        <code>{method.request.example}</code>
                      </pre>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h5 className="text-xs font-medium text-gray-700 mb-1">Required Fields</h5>
                        <div className="flex flex-wrap gap-1">
                          {method.request.requiredFields.map((field, idx) => (
                            <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-700 mb-1">Optional Fields</h5>
                        <div className="flex flex-wrap gap-1">
                          {method.request.optionalFields.map((field, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Response Examples */}
              {method.responses && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Response Examples</h4>
                  <div className="space-y-3">
                    {Object.entries(method.responses).map(([key, response]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          {response.code >= 200 && response.code < 300 ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : response.code >= 400 && response.code < 500 ? (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          ) : response.code >= 500 ? (
                            <XCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {response.code} - {response.description}
                          </span>
                        </div>
                        <div className="code-block">
                          <pre className={`text-xs overflow-x-auto ${response.color}`}>
                            <code>{response.example}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EndpointCard
