import { LogOut, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../contexts/ThemeContext'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { ROUTES } from '../../utils/constants'
import { obterIniciais } from '../../utils/helpers'

export function SidebarFooter() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login)
  }

  if (!user) return null

  return (
    <div className="p-4 border-t border-light-border dark:border-dark-border space-y-3">
      {/* User Info */}
      <div className="flex items-center gap-3 p-3 bg-light-bg dark:bg-dark-bg rounded-lg">
        <Avatar
          src=""
          alt={user.name}
          size="md"
          fallback={obterIniciais(user.name)}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-light-text dark:text-dark-text truncate">
            {user.name}
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted truncate">
            @{user.username}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="flex-1"
          title={`Tema ${theme === 'light' ? 'claro' : 'escuro'}`}
        >
          {theme === 'light' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex-1"
          title="Sair"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
