import { motion, AnimatePresence } from 'framer-motion'
import { BrazilState } from '../../types'

interface StateTooltipProps {
  state: BrazilState | null
  position: { x: number; y: number }
}

export function StateTooltip({ state, position }: StateTooltipProps) {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="fixed pointer-events-none z-50"
          style={{
            left: position.x + 15,
            top: position.y - 10,
          }}
        >
          <div className="bg-light-card dark:bg-dark-card border-2 border-brazil-green rounded-lg shadow-2xl p-4 min-w-[200px]">
            <h3 className="font-display font-bold text-light-text dark:text-dark-text mb-2">
              {state.nome} - {state.sigla}
            </h3>
            <div className="space-y-1 text-sm">
              <p className="text-light-muted dark:text-dark-muted">
                Região: <span className="text-light-text dark:text-dark-text font-semibold">{state.regiao}</span>
              </p>
              <p className="text-light-muted dark:text-dark-muted">
                Deputados: <span className="text-light-text dark:text-dark-text font-semibold">{state.deputados}</span>
              </p>
              <p className="text-light-muted dark:text-dark-muted">
                Senadores: <span className="text-light-text dark:text-dark-text font-semibold">{state.senadores}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
