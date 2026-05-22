export function DocPageStub({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mx-auto max-w-docs px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-content">{title}</h1>
      <p className="mt-3 text-content-muted">{description}</p>
      <p className="mt-6 rounded-xl border border-dashed border-border bg-surface-muted px-4 py-6 text-sm text-content-subtle">
        Full documentation for this section is coming soon.
      </p>
    </div>
  )
}
