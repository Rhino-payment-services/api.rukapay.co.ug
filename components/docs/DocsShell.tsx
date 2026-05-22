import { Sidebar } from './Sidebar'
import { TopNavbar } from './TopNavbar'

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopNavbar />
      <main className="relative z-0 min-h-screen pt-[var(--navbar-height)] lg:ml-[var(--sidebar-width)]">
        {children}
      </main>
    </div>
  )
}
