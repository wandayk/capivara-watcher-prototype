import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Avatar } from '@/components/ui/AvatarWithImage'
import { Button } from '@/components/ui/ButtonCompat'
import { ROUTES } from '../../utils/constants'
import { obterIniciais } from '../../utils/helpers'

export function SidebarFooter() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login)
  }

  if (!user) return null

  return (
    <div className="p-4 border-t border-light-border space-y-3">
      {/* User Info */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Avatar
          src=""
          alt={user.name}
          size="md"
          fallback={obterIniciais(user.name)}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {user.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            @{user.username}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full"
          title="Sair"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
