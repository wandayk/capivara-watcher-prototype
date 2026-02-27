import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "@/components/ui/AvatarWithImage";
import { Button } from "@/components/ui/ButtonCompat";
import { Card } from "@/components/ui/CardWithPadding";
import { ROUTES } from "../../utils/constants";
import { obterIniciais } from "../../utils/helpers";

export function SidebarFooter() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  if (!user) return null;

  return (
    <div className="p-4">
      <Card
        padding="md"
        className="shadow-md flex items-center justify-between"
      >
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar
            src=""
            alt={user.name}
            size="md"
            fallback={obterIniciais(user.name)}
            className="bg-gray-400/20"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="p-0"
          title="Sair"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </Card>
    </div>
  );
}
