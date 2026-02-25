import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Theme } from '../types'
import { STORAGE_KEYS } from '../utils/constants'
import { lerLocalStorage, salvarLocalStorage } from '../utils/helpers'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Inicializa tema do localStorage ou detecta preferência do sistema
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = lerLocalStorage<Theme | null>(STORAGE_KEYS.theme, null)

    if (savedTheme) {
      return savedTheme
    }

    // Detecta preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })

  // Aplica o tema no HTML
  useEffect(() => {
    const root = window.document.documentElement

    // Remove ambos os temas
    root.classList.remove('light', 'dark')

    // Adiciona o tema atual
    root.classList.add(theme)

    // Salva preferência
    salvarLocalStorage(STORAGE_KEYS.theme, theme)
  }, [theme])

  // Escuta mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      // Só atualiza se não houver preferência salva
      const savedTheme = lerLocalStorage<Theme | null>(STORAGE_KEYS.theme, null)
      if (!savedTheme) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }

    // Adiciona listener (com fallback para navegadores antigos)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // @ts-ignore - fallback para Safari antigo
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // @ts-ignore - fallback para Safari antigo
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }

  return context
}
