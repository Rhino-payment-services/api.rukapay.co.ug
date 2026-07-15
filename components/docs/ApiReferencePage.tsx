import { EndpointCard, type EndpointDefinition } from '@/components/docs/EndpointCard'
import { SplitContent } from '@/components/docs/SplitContent'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { SandboxDevNotice } from '@/components/docs/SandboxDevNotice'
import { DocsPageLayout } from '@/components/docs/DocsPageLayout'
import type { TocItem } from '@/components/docs/TableOfContents'
import type { CodeLanguage } from '@/lib/code-samples'

type ApiReferencePageProps = {
  badge?: string
  title: string
  description: string
  toc: TocItem[]
  overview: React.ReactNode
  endpoints: EndpointDefinition[]
  codeSnippets?: Partial<Record<CodeLanguage, string>>
  defaultLanguage?: CodeLanguage
  /** Gateway sandbox notice — hide for non-Gateway APIs */
  showSandboxNotice?: boolean
  extraSections?: {
    id: string
    title: string
    content: React.ReactNode
  }[]
}

export function ApiReferencePage({
  badge = 'Payment API',
  title,
  description,
  toc,
  overview,
  endpoints,
  codeSnippets,
  defaultLanguage = 'curl',
  showSandboxNotice = true,
  extraSections,
}: ApiReferencePageProps) {
  return (
    <DocsPageLayout toc={toc}>
      <article className="min-w-0 w-full max-w-none">
        <header className="mb-8 border-b border-border pb-8">
          <p className="mb-2 text-sm font-medium text-accent-600 dark:text-accent-400">
            {badge}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-content">{title}</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-content-muted">
            {description}
          </p>
        </header>

        {showSandboxNotice && <SandboxDevNotice compact />}

        <section id="overview" className="docs-prose mb-12 scroll-mt-28">
          {overview}
          {codeSnippets && (
            <div className="mt-6">
              <SplitContent
                code={<CodeBlock snippets={codeSnippets} defaultLanguage={defaultLanguage} />}
              >
                <h3>Example request</h3>
                <p>
                  Authenticate with your secret API key. All requests are made over HTTPS to
                  the RukaPay API base URL.
                </p>
              </SplitContent>
            </div>
          )}
        </section>

        {endpoints.map((endpoint) => (
          <section
            key={endpoint.path + endpoint.method}
            id={`${endpoint.method.toLowerCase()}${endpoint.path.replace(/\//g, '-').replace(/[{}]/g, '')}`}
            className="mb-10 scroll-mt-28 space-y-4"
          >
            <EndpointCard endpoint={endpoint} />
          </section>
        ))}

        {extraSections?.map((section) => (
          <section key={section.id} id={section.id} className="docs-prose mb-10 scroll-mt-28">
            <h2>{section.title}</h2>
            {section.content}
          </section>
        ))}
      </article>
    </DocsPageLayout>
  )
}

export function DocContentPage({
  title,
  description,
  children,
  toc,
}: {
  title: string
  description: string
  children: React.ReactNode
  toc?: TocItem[]
}) {
  return (
    <DocsPageLayout toc={toc}>
      <article className="min-w-0 w-full max-w-none">
        <header className="mb-8 border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-content">{title}</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-content-muted">
            {description}
          </p>
        </header>
        <div className="docs-prose">{children}</div>
      </article>
    </DocsPageLayout>
  )
}

export function StatusBadgeList({
  statuses,
}: {
  statuses: { status: string; description: string }[]
}) {
  return (
    <div className="not-prose space-y-2">
      {statuses.map((item) => (
        <div
          key={item.status}
          className="flex gap-3 rounded-lg border border-border px-4 py-3"
        >
          <code className="shrink-0 rounded-md bg-surface-muted px-2 py-0.5 font-mono text-xs text-content">
            {item.status}
          </code>
          <p className="text-sm text-content-muted">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
