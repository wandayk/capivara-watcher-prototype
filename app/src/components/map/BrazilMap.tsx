import { useState } from 'react'
import { motion } from 'framer-motion'
import { brazilStates } from '../../data/brazilStates'
import { StateTooltip } from './StateTooltip'
import { BrazilState } from '../../types'
import { REGIOES } from '../../utils/constants'

interface BrazilMapProps {
  selectedUF?: string | null
  onSelectUF?: (uf: string) => void
}

export function BrazilMap({ selectedUF, onSelectUF }: BrazilMapProps) {
  const [hoveredState, setHoveredState] = useState<BrazilState | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleStateHover = (sigla: string) => {
    const state = brazilStates.find(s => s.sigla === sigla)
    setHoveredState(state || null)
  }

  const handleStateLeave = () => {
    setHoveredState(null)
  }

  const handleStateClick = (sigla: string) => {
    if (onSelectUF) {
      onSelectUF(sigla === selectedUF ? '' : sigla)
    }
  }

  const getStateColor = (sigla: string) => {
    const state = brazilStates.find(s => s.sigla === sigla)
    if (!state) return '#808080'

    const isSelected = selectedUF === sigla
    const isHovered = hoveredState?.sigla === sigla

    if (isSelected) return '#009B3A' // Brazil green
    if (isHovered) return '#00BF4D' // Brazil green light

    // Color by region
    const regiao = Object.entries(REGIOES).find(([_, data]) =>
      (data.estados as readonly string[]).includes(sigla)
    )

    return regiao ? regiao[1].cor : '#808080'
  }

  // Simplified Brazil map - Grid representation
  const statesByRegion = {
    Norte: ['RR', 'AP', 'AM', 'PA', 'AC', 'RO', 'TO'],
    Nordeste: ['MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA'],
    CentroOeste: ['MT', 'MS', 'GO', 'DF'],
    Sudeste: ['MG', 'ES', 'RJ', 'SP'],
    Sul: ['PR', 'SC', 'RS'],
  }

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <StateTooltip state={hoveredState} position={mousePosition} />

      <div className="grid grid-cols-4 gap-2 p-4 bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border">
        {/* Grid-based layout for simplicity */}
        <div className="col-span-4 text-center mb-4">
          <h3 className="text-2xl font-display text-brazil-green">
            Mapa do Brasil
          </h3>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Clique em um estado para filtrar
          </p>
        </div>

        {/* Norte */}
        <div className="col-span-4">
          <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
            Norte
          </h4>
          <div className="grid grid-cols-7 gap-1">
            {statesByRegion.Norte.map((sigla) => (
              <motion.button
                key={sigla}
                onClick={() => handleStateClick(sigla)}
                onMouseEnter={() => handleStateHover(sigla)}
                onMouseLeave={handleStateLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square rounded flex items-center justify-center text-xs font-bold text-white border-2 transition-all"
                style={{
                  backgroundColor: getStateColor(sigla),
                  borderColor: selectedUF === sigla ? '#FEDF00' : 'transparent',
                }}
              >
                {sigla}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Nordeste */}
        <div className="col-span-4">
          <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2 mt-4">
            Nordeste
          </h4>
          <div className="grid grid-cols-9 gap-1">
            {statesByRegion.Nordeste.map((sigla) => (
              <motion.button
                key={sigla}
                onClick={() => handleStateClick(sigla)}
                onMouseEnter={() => handleStateHover(sigla)}
                onMouseLeave={handleStateLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square rounded flex items-center justify-center text-xs font-bold text-white border-2 transition-all"
                style={{
                  backgroundColor: getStateColor(sigla),
                  borderColor: selectedUF === sigla ? '#FEDF00' : 'transparent',
                }}
              >
                {sigla}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Centro-Oeste */}
        <div className="col-span-2">
          <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2 mt-4">
            Centro-Oeste
          </h4>
          <div className="grid grid-cols-2 gap-1">
            {statesByRegion.CentroOeste.map((sigla) => (
              <motion.button
                key={sigla}
                onClick={() => handleStateClick(sigla)}
                onMouseEnter={() => handleStateHover(sigla)}
                onMouseLeave={handleStateLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square rounded flex items-center justify-center text-xs font-bold text-white border-2 transition-all"
                style={{
                  backgroundColor: getStateColor(sigla),
                  borderColor: selectedUF === sigla ? '#FEDF00' : 'transparent',
                }}
              >
                {sigla}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sudeste */}
        <div className="col-span-2">
          <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2 mt-4">
            Sudeste
          </h4>
          <div className="grid grid-cols-2 gap-1">
            {statesByRegion.Sudeste.map((sigla) => (
              <motion.button
                key={sigla}
                onClick={() => handleStateClick(sigla)}
                onMouseEnter={() => handleStateHover(sigla)}
                onMouseLeave={handleStateLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square rounded flex items-center justify-center text-xs font-bold text-white border-2 transition-all"
                style={{
                  backgroundColor: getStateColor(sigla),
                  borderColor: selectedUF === sigla ? '#FEDF00' : 'transparent',
                }}
              >
                {sigla}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sul */}
        <div className="col-span-4">
          <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2 mt-4">
            Sul
          </h4>
          <div className="grid grid-cols-3 gap-1 max-w-xs">
            {statesByRegion.Sul.map((sigla) => (
              <motion.button
                key={sigla}
                onClick={() => handleStateClick(sigla)}
                onMouseEnter={() => handleStateHover(sigla)}
                onMouseLeave={handleStateLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square rounded flex items-center justify-center text-xs font-bold text-white border-2 transition-all"
                style={{
                  backgroundColor: getStateColor(sigla),
                  borderColor: selectedUF === sigla ? '#FEDF00' : 'transparent',
                }}
              >
                {sigla}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="col-span-4 mt-4 pt-4 border-t border-light-border dark:border-dark-border">
          <p className="text-xs text-light-muted dark:text-dark-muted text-center">
            <span className="font-semibold">Legenda:</span> Cores por região |
            Borda amarela = selecionado | Hover para detalhes
          </p>
        </div>
      </div>
    </div>
  )
}
