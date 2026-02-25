import { useState, ReactNode } from 'react'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-light-bg dark:bg-dark-bg">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
