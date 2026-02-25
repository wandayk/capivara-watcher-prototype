import { Search, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { ROUTES } from '../../utils/constants'

export function EmptyState() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] p-8"
    >
      <div className="relative mb-8">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-32 h-32 bg-brazil-green/10 rounded-full flex items-center justify-center"
        >
          <Search className="w-16 h-16 text-brazil-green/40" />
        </motion.div>
      </div>

      <h2 className="text-2xl font-display text-light-text dark:text-dark-text mb-2 text-center">
        Nenhum parlamentar selecionado
      </h2>
      <p className="text-light-muted dark:text-dark-muted text-center mb-8 max-w-md">
        Adicione parlamentares à sua lista para acompanhar suas atividades, despesas e participações
      </p>

      <Button
        variant="primary"
        size="lg"
        onClick={() => navigate(ROUTES.add)}
      >
        <Plus className="w-5 h-5" />
        Pesquisar Parlamentares
      </Button>
    </motion.div>
  )
}
