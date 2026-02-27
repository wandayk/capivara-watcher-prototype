import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useParlamentares } from "../../hooks/useParlamentares";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { Button } from "@/components/ui/ButtonCompat";
import { Avatar } from "@/components/ui/AvatarWithImage";
import { ROUTES, PARTIDO_CORES } from "../../utils/constants";
import { obterIniciais } from "../../utils/helpers";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { parlamentares, selectedParlamentar, selectParlamentar } =
    useParlamentares();

  const handleSelectParlamentar = (parlamentar: typeof selectedParlamentar) => {
    selectParlamentar(parlamentar);
    // Fecha sidebar em mobile
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleAddClick = () => {
    navigate(ROUTES.add);
    // Fecha sidebar em mobile
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-screen w-70 bg-white flex flex-col z-50 md:relative md:translate-x-0"
      >
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <SidebarHeader />

        {/* Add Button */}
        <div className="p-4">
          <button
            onClick={handleAddClick}
            className="w-full h-10 text-sm shadow-md font-semibold transition-all bg-green-600/70 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600/80"
          >
            Adicionar Parlamentar
          </button>
        </div>

        {/* Parlamentares List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {parlamentares.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                Nenhum parlamentar adicionado
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Clique no botão acima para adicionar
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {parlamentares.map((parlamentar) => {
                const isSelected = selectedParlamentar?.id === parlamentar.id;
                const corPartido =
                  PARTIDO_CORES[parlamentar.partido] || "#808080";

                return (
                  <motion.button
                    key={parlamentar.id}
                    onClick={() => handleSelectParlamentar(parlamentar)}
                    className={`
                      w-full p-3 rounded-lg text-left transition-all
                      ${
                        isSelected
                          ? "bg-brazil-green/20 border-2 border-brazil-green shadow-md ring-2 ring-brazil-green/50"
                          : "bg-muted border-2 border-transparent hover:border-border"
                      }
                    `}
                    whileHover={{ scale: isSelected ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={
                      isSelected
                        ? {
                            boxShadow: [
                              "0 0 0 0 rgba(0, 155, 58, 0)",
                              "0 0 0 4px rgba(0, 155, 58, 0.1)",
                              "0 0 0 0 rgba(0, 155, 58, 0)",
                            ],
                          }
                        : {}
                    }
                    transition={
                      isSelected ? { duration: 2, repeat: Infinity } : {}
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={parlamentar.foto}
                        alt={parlamentar.nome}
                        size="sm"
                        fallback={obterIniciais(parlamentar.nome)}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {parlamentar.nome}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: corPartido }}
                          />
                          <p className="text-xs text-muted-foreground">
                            {parlamentar.partido} - {parlamentar.uf}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <SidebarFooter />
      </motion.aside>
    </>
  );
}
