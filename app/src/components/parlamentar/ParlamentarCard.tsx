import { Check, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Parlamentar } from '../../types'
import { Avatar } from '@/components/ui/AvatarWithImage'
import { Button } from '@/components/ui/ButtonCompat'
import { Card } from '@/components/ui/CardWithPadding'
import { PARTIDO_CORES } from '../../utils/constants'
import { obterIniciais } from '../../utils/helpers'

interface ParlamentarCardProps {
  parlamentar: Parlamentar
  isAdded: boolean
  onAdd: () => void
}

export function ParlamentarCard({ parlamentar, isAdded, onAdd }: ParlamentarCardProps) {
  const corPartido = PARTIDO_CORES[parlamentar.partido] || '#808080'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card padding="md" hover>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar
            src={parlamentar.foto}
            alt={parlamentar.nome}
            size="md"
            fallback={obterIniciais(parlamentar.nome)}
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-light-text dark:text-dark-text mb-1 truncate">
              {parlamentar.nome}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold text-white"
                style={{ backgroundColor: corPartido }}
              >
                {parlamentar.partido}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
                {parlamentar.uf}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brazil-green/10 text-brazil-green capitalize">
                {parlamentar.tipo}
              </span>
            </div>

            {parlamentar.email && (
              <p className="text-xs text-light-muted dark:text-dark-muted truncate">
                {parlamentar.email}
              </p>
            )}
          </div>

          {/* Add Button */}
          <Button
            variant={isAdded ? 'secondary' : 'primary'}
            size="sm"
            onClick={onAdd}
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                Adicionado
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Adicionar
              </>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
