import { TableOfContents, type TocItem } from './TableOfContents'

export function DocsPageLayout({
  children,
  toc,
}: {
  children: React.ReactNode
  toc?: TocItem[]
}) {
  const hasToc = toc && toc.length > 0

  return (
    <div className="relative w-full">
      <div
        className={
          hasToc
            ? 'w-full px-4 py-8 sm:px-6 lg:px-10 xl:pr-[calc(var(--toc-width)+2rem)]'
            : 'mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8'
        }
      >
        {children}
      </div>

      {hasToc && (
        <aside
          className="fixed right-0 top-[var(--navbar-height)] z-10 hidden w-[var(--toc-width)] overflow-y-auto border-l border-border bg-surface/95 px-5 py-8 backdrop-blur-sm xl:block pointer-events-auto"
          style={{ height: 'calc(100vh - var(--navbar-height))' }}
          aria-label="On this page"
        >
          <TableOfContents items={toc} />
        </aside>
      )}
    </div>
  )
}
