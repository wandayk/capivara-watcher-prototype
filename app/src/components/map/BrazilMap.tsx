import { useState } from "react";
import { brazilStates } from "../../data/brazilStates";
import { StateTooltip } from "./StateTooltip";
import { BrazilState } from "../../types";
import { REGIOES } from "../../utils/constants";

interface BrazilMapProps {
  selectedUF?: string | null;
  onSelectUF?: (uf: string) => void;
}

export function BrazilMap({ selectedUF, onSelectUF }: BrazilMapProps) {
  const [hoveredState, setHoveredState] = useState<BrazilState | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleStateHover = (sigla: string) => {
    const state = brazilStates.find((s) => s.sigla === sigla);
    setHoveredState(state || null);
  };

  const handleStateLeave = () => {
    setHoveredState(null);
  };

  const handleStateClick = (sigla: string) => {
    if (onSelectUF) {
      onSelectUF(sigla === selectedUF ? "" : sigla);
    }
  };

  const getStateColor = (sigla: string) => {
    const state = brazilStates.find((s) => s.sigla === sigla);
    if (!state) return "#808080";

    const isSelected = selectedUF === sigla;
    const isHovered = hoveredState?.sigla === sigla;

    if (isSelected) return "#009B3A"; // Brazil green
    if (isHovered) return "#00BF4D"; // Brazil green light

    // Color by region
    const regiao = Object.entries(REGIOES).find(([, data]) =>
      (data.estados as readonly string[]).includes(sigla),
    );

    return regiao ? regiao[1].cor : "#808080";
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <StateTooltip state={hoveredState} position={mousePosition} />

      <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-display text-brazil-green">
            Mapa do Brasil
          </h3>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Clique em um estado para filtrar
          </p>
        </div>

        {/* Placeholder - O SVG real está no AddParlamentar.tsx */}
        <div className="w-full h-auto max-w-2xl mx-auto flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Mapa do Brasil
            <br />
            <span className="text-sm">SVG renderizado inline</span>
          </p>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
          <div className="flex flex-wrap gap-3 justify-center text-xs">
            {Object.entries(REGIOES).map(([nome, data]) => (
              <div key={nome} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: data.cor }}
                />
                <span className="text-light-muted dark:text-dark-muted">
                  {nome}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-light-muted dark:text-dark-muted text-center mt-2">
            Clique em um estado para ver informações
          </p>
        </div>
      </div>
    </div>
  );
}
