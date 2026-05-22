'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function RedirectPage({ to }: { to: string }) {
  const router = useRouter()

  useEffect(() => {
    router.replace(to)
  }, [router, to])

  return (
    <p className="px-4 py-8 text-sm text-content-muted">Redirecting…</p>
  )
}
