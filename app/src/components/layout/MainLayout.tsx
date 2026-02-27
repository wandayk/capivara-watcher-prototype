import { useState, useEffect, ReactNode } from 'react'
import {
  Menu,
  Info,
  Target,
  Database,
  AlertCircle,
  BookOpen,
  User,
  Mail,
  Calendar,
  Building,
  ExternalLink,
} from 'lucide-react'
import { Sidebar } from './Sidebar'
import { RightSidebar } from './RightSidebar'
import { useParlamentares } from '../../hooks/useParlamentares'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState<string>('')
  const { selectedParlamentar } = useParlamentares()

  // Define sections based on content
  const projectSections = [
    { id: 'sobre', title: 'Sobre o Projeto', icon: Info },
    { id: 'objetivos', title: 'Objetivos', icon: Target },
    { id: 'fontes', title: 'Fontes de Dados', icon: Database },
    { id: 'importancia', title: 'Importância', icon: AlertCircle },
    { id: 'como-usar', title: 'Como Usar', icon: BookOpen },
  ]

  const parlamentarSections = [
    { id: 'hero', title: 'Informações Básicas', icon: User },
    { id: 'contato', title: 'Contato', icon: Mail },
    { id: 'dados-pessoais', title: 'Dados Pessoais', icon: Calendar },
    { id: 'mandato', title: 'Mandato', icon: Building },
    { id: 'links', title: 'Links Externos', icon: ExternalLink },
  ]

  const currentSections = selectedParlamentar
    ? parlamentarSections
    : projectSections

  // Intersection Observer for active section detection
  useEffect(() => {
    const mainElement = document.querySelector('main')

    if (!mainElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: mainElement,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0,
      }
    )

    // Observe all sections
    const sections = mainElement.querySelectorAll('[id]')
    sections.forEach((section) => {
      if (section.id) {
        observer.observe(section)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [selectedParlamentar])

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-card border-b border-border p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Content Area with Right Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto scrollbar-hide">{children}</main>

          {/* Right Sidebar */}
          <RightSidebar
            sections={currentSections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        </div>
      </div>
    </div>
  )
}
