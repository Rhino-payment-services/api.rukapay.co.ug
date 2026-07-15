'use client'

import { useState } from 'react'
import { ChevronDown, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MethodBadge, type HttpMethod } from './MethodBadge'
import { ParameterTable, type Parameter } from './ParameterTable'
import { CodeBlockStatic } from './CodeBlock'
import { GATEWAY_FULL_URL } from '@/lib/gateway-api'

export type StatusCode = {
  code: number
  label: string
  description: string
}

export type EndpointDefinition = {
  method: HttpMethod
  path: string
  title: string
  description: string
  /** Defaults to Gateway full URL when omitted */
  baseUrl?: string
  pathParams?: Parameter[]
  queryParams?: Parameter[]
  bodyParams?: Parameter[]
  requestBody?: string
  responseBody?: string
  statusCodes?: StatusCode[]
}

export function EndpointCard({ endpoint }: { endpoint: EndpointDefinition }) {
  const [expanded, setExpanded] = useState(true)
  const [copied, setCopied] = useState(false)
  const fullPath = `${endpoint.baseUrl ?? GATEWAY_FULL_URL}${endpoint.path}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${endpoint.method} ${fullPath}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id={`${endpoint.method.toLowerCase()}${endpoint.path.replace(/\//g, '-').replace(/[{}]/g, '')}`}
      className="scroll-mt-28 overflow-hidden rounded-xl border border-border bg-surface-elevated"
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-surface-muted/50"
      >
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <MethodBadge method={endpoint.method} />
            <code className="break-all font-mono text-sm text-content">{endpoint.path}</code>
          </div>
          <div>
            <h3 className="text-base font-semibold text-content">{endpoint.title}</h3>
            <p className="mt-1 text-sm leading-6 text-content-muted">{endpoint.description}</p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-content-subtle transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-4">
          <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-surface-muted px-3 py-2">
            <code className="break-all font-mono text-xs text-content-muted">{fullPath}</code>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-2 inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs text-content-muted hover:bg-surface-elevated hover:text-content"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>

          {endpoint.pathParams && endpoint.pathParams.length > 0 && (
            <div className="mb-4">
              <ParameterTable title="Path parameters" parameters={endpoint.pathParams} />
            </div>
          )}

          {endpoint.queryParams && endpoint.queryParams.length > 0 && (
            <div className="mb-4">
              <ParameterTable title="Query parameters" parameters={endpoint.queryParams} />
            </div>
          )}

          {endpoint.bodyParams && endpoint.bodyParams.length > 0 && (
            <div className="mb-4">
              <ParameterTable title="Request body" parameters={endpoint.bodyParams} />
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            {endpoint.requestBody && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-content">Request example</h4>
                <CodeBlockStatic code={endpoint.requestBody} language="json" title="JSON" />
              </div>
            )}
            {endpoint.responseBody && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-content">Response example</h4>
                <CodeBlockStatic code={endpoint.responseBody} language="json" title="JSON" />
              </div>
            )}
          </div>

          {endpoint.statusCodes && endpoint.statusCodes.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold text-content">Status codes</h4>
              <div className="space-y-2">
                {endpoint.statusCodes.map((status) => (
                  <div
                    key={status.code}
                    className="flex gap-3 rounded-lg border border-border px-3 py-2"
                  >
                    <span
                      className={cn(
                        'font-mono text-sm font-semibold',
                        status.code < 300
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : status.code < 500
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-red-600 dark:text-red-400'
                      )}
                    >
                      {status.code}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-content">{status.label}</p>
                      <p className="text-sm text-content-muted">{status.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
