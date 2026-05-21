'use client'

import { useEffect, useMemo, useState } from 'react'
import Prism from 'prismjs'
// Load in dependency order (extend chains + PHP templating)
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  codeLanguages,
  type CodeLanguage,
} from '@/lib/code-samples'

const languageMap: Record<CodeLanguage | 'json', string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  php: 'php',
  python: 'python',
  go: 'go',
  curl: 'bash',
  json: 'json',
}

function highlightCode(code: string, language: string): string | null {
  const grammar = Prism.languages[language]
  if (!grammar) return null
  try {
    return Prism.highlight(code, grammar, language)
  } catch {
    return null
  }
}

function HighlightedCode({
  code,
  language,
}: {
  code: string
  language: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const highlightedHtml = useMemo(() => {
    if (!mounted) return null
    return highlightCode(code, language)
  }, [mounted, code, language])

  return (
    <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
      <code className={cn('font-mono', `language-${language}`)}>
        {highlightedHtml !== null ? (
          <span dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          code
        )}
      </code>
    </pre>
  )
}

interface CodeBlockProps {
  snippets: Partial<Record<CodeLanguage, string>>
  defaultLanguage?: CodeLanguage
  title?: string
  showTabs?: boolean
  className?: string
}

export function CodeBlock({
  snippets,
  defaultLanguage = 'javascript',
  title,
  showTabs = true,
  className,
}: CodeBlockProps) {
  const available = codeLanguages.filter((l) => snippets[l.id])
  const [active, setActive] = useState<CodeLanguage>(
    available.find((l) => l.id === defaultLanguage)?.id ?? available[0]?.id ?? 'javascript'
  )
  const [copied, setCopied] = useState(false)

  const code = snippets[active] ?? ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-code-border bg-code-bg shadow-soft',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-code-border bg-[#131820] px-3">
        {showTabs && available.length > 1 ? (
          <div className="flex overflow-x-auto">
            {available.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setActive(lang.id)}
                className={cn(
                  'shrink-0 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors',
                  active === lang.id
                    ? 'border-accent-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="py-2.5 text-xs font-medium text-slate-400">
            {title ?? available[0]?.label ?? 'Code'}
          </span>
        )}
        <button
          type="button"
          onClick={handleCopy}
          className="ml-2 inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
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
      <HighlightedCode code={code} language={languageMap[active]} />
    </div>
  )
}

export function CodeBlockStatic({
  code,
  language = 'json',
  title,
  className,
}: {
  code: string
  language?: string
  title?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-code-border bg-code-bg shadow-soft',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-code-border bg-[#131820] px-3 py-2">
        <span className="text-xs font-medium text-slate-400">{title ?? language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-white/5 hover:text-slate-200"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <HighlightedCode code={code} language={languageMap[language as CodeLanguage] ?? language} />
    </div>
  )
}
