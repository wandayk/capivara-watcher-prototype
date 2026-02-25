import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'
import { DEFAULT_USER, STORAGE_KEYS } from '../utils/constants'
import { gerarId, lerLocalStorage, removerLocalStorage, salvarLocalStorage } from '../utils/helpers'

interface UserCredentials {
  username: string
  password: string
}

interface RegisterData extends UserCredentials {
  email: string
  name: string
}

interface ChangePasswordData {
  username: string
  newPassword: string
}

interface StoredUser extends UserCredentials {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: UserCredentials) => Promise<boolean>
  logout: () => void
  register: (data: RegisterData) => Promise<boolean>
  changePassword: (data: ChangePasswordData) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  // Carrega usuário do sessionStorage ao montar
  useEffect(() => {
    const savedUser = lerLocalStorage<User | null>(STORAGE_KEYS.user, null)
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  /**
   * Obtém todos os usuários registrados
   */
  const getUsers = (): StoredUser[] => {
    const users = lerLocalStorage<StoredUser[]>(STORAGE_KEYS.users, [])

    // Adiciona usuário padrão se não existir
    const hasDefaultUser = users.some(u => u.username === DEFAULT_USER.username)
    if (!hasDefaultUser) {
      users.push({
        id: 'default-user',
        username: DEFAULT_USER.username,
        password: DEFAULT_USER.password,
        email: 'pucminas@example.com',
        name: 'Usuário PUC Minas',
        createdAt: new Date().toISOString(),
      })
      salvarLocalStorage(STORAGE_KEYS.users, users)
    }

    return users
  }

  /**
   * Salva lista de usuários
   */
  const saveUsers = (users: StoredUser[]) => {
    salvarLocalStorage(STORAGE_KEYS.users, users)
  }

  /**
   * Login - autentica usuário
   */
  const login = async (credentials: UserCredentials): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simula delay de rede
      setTimeout(() => {
        const users = getUsers()
        const foundUser = users.find(
          u => u.username === credentials.username && u.password === credentials.password
        )

        if (foundUser) {
          const userData: User = {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            name: foundUser.name,
            createdAt: foundUser.createdAt,
          }

          setUser(userData)
          salvarLocalStorage(STORAGE_KEYS.user, userData)
          resolve(true)
        } else {
          resolve(false)
        }
      }, 500) // Simula delay
    })
  }

  /**
   * Logout - desloga usuário
   */
  const logout = () => {
    setUser(null)
    removerLocalStorage(STORAGE_KEYS.user)
  }

  /**
   * Register - registra novo usuário
   */
  const register = async (data: RegisterData): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getUsers()

        // Verifica se username já existe
        const usernameExists = users.some(u => u.username === data.username)
        if (usernameExists) {
          resolve(false)
          return
        }

        // Verifica se email já existe
        const emailExists = users.some(u => u.email === data.email)
        if (emailExists) {
          resolve(false)
          return
        }

        // Cria novo usuário
        const newUser: StoredUser = {
          id: gerarId(),
          username: data.username,
          password: data.password,
          email: data.email,
          name: data.name,
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        saveUsers(users)

        resolve(true)
      }, 500)
    })
  }

  /**
   * Change Password - troca senha de usuário
   */
  const changePassword = async (data: ChangePasswordData): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getUsers()
        const userIndex = users.findIndex(u => u.username === data.username)

        if (userIndex === -1) {
          resolve(false)
          return
        }

        // Atualiza senha
        users[userIndex].password = data.newPassword
        saveUsers(users)

        resolve(true)
      }, 500)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
