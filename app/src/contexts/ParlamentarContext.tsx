import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Parlamentar } from '../types'
import { STORAGE_KEYS } from '../utils/constants'
import { lerLocalStorage, salvarLocalStorage } from '../utils/helpers'
import { useAuth } from './AuthContext'

interface ParlamentarContextType {
  parlamentares: Parlamentar[]
  selectedParlamentar: Parlamentar | null
  addParlamentar: (parlamentar: Parlamentar) => boolean
  removeParlamentar: (parlamentarId: string) => void
  selectParlamentar: (parlamentar: Parlamentar | null) => void
  isParlamentarAdded: (parlamentarId: string) => boolean
  clearParlamentares: () => void
}

const ParlamentarContext = createContext<ParlamentarContextType | undefined>(undefined)

interface ParlamentarProviderProps {
  children: ReactNode
}

export function ParlamentarProvider({ children }: ParlamentarProviderProps) {
  const { user } = useAuth()
  const [parlamentares, setParlamentares] = useState<Parlamentar[]>([])
  const [selectedParlamentar, setSelectedParlamentar] = useState<Parlamentar | null>(null)

  // Storage key específico por usuário
  const getStorageKey = () => {
    return user ? `${STORAGE_KEYS.parlamentares}_${user.id}` : STORAGE_KEYS.parlamentares
  }

  const getSelectedStorageKey = () => {
    return user ? `${STORAGE_KEYS.selectedParlamentar}_${user.id}` : STORAGE_KEYS.selectedParlamentar
  }

  // Carrega parlamentares do localStorage quando usuário muda
  useEffect(() => {
    if (user) {
      const saved = lerLocalStorage<Parlamentar[]>(getStorageKey(), [])
      setParlamentares(saved)

      const savedSelected = lerLocalStorage<Parlamentar | null>(getSelectedStorageKey(), null)
      setSelectedParlamentar(savedSelected)
    } else {
      // Limpa quando deslogado
      setParlamentares([])
      setSelectedParlamentar(null)
    }
  }, [user])

  // Salva parlamentares no localStorage quando mudam
  useEffect(() => {
    if (user) {
      salvarLocalStorage(getStorageKey(), parlamentares)
    }
  }, [parlamentares, user])

  // Salva parlamentar selecionado no localStorage
  useEffect(() => {
    if (user) {
      salvarLocalStorage(getSelectedStorageKey(), selectedParlamentar)
    }
  }, [selectedParlamentar, user])

  /**
   * Adiciona parlamentar à lista
   * Retorna false se já existir
   */
  const addParlamentar = (parlamentar: Parlamentar): boolean => {
    // Verifica se já existe
    const exists = parlamentares.some(p => p.id === parlamentar.id)
    if (exists) {
      return false
    }

    setParlamentares(prev => [...prev, parlamentar])
    return true
  }

  /**
   * Remove parlamentar da lista
   */
  const removeParlamentar = (parlamentarId: string) => {
    setParlamentares(prev => prev.filter(p => p.id !== parlamentarId))

    // Se o parlamentar removido era o selecionado, limpa seleção
    if (selectedParlamentar?.id === parlamentarId) {
      setSelectedParlamentar(null)
    }
  }

  /**
   * Seleciona um parlamentar para visualização
   */
  const selectParlamentar = (parlamentar: Parlamentar | null) => {
    setSelectedParlamentar(parlamentar)
  }

  /**
   * Verifica se parlamentar já foi adicionado
   */
  const isParlamentarAdded = (parlamentarId: string): boolean => {
    return parlamentares.some(p => p.id === parlamentarId)
  }

  /**
   * Limpa todos os parlamentares
   */
  const clearParlamentares = () => {
    setParlamentares([])
    setSelectedParlamentar(null)
  }

  return (
    <ParlamentarContext.Provider
      value={{
        parlamentares,
        selectedParlamentar,
        addParlamentar,
        removeParlamentar,
        selectParlamentar,
        isParlamentarAdded,
        clearParlamentares,
      }}
    >
      {children}
    </ParlamentarContext.Provider>
  )
}

export function useParlamentares() {
  const context = useContext(ParlamentarContext)

  if (context === undefined) {
    throw new Error('useParlamentares deve ser usado dentro de um ParlamentarProvider')
  }

  return context
}
