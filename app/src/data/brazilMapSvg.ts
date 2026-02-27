/**
 * Coordenadas SVG dos estados brasileiros
 * Mapa simplificado usando retângulos organizados geograficamente
 * ViewBox: 0 0 400 500
 */

export interface StatePath {
  sigla: string
  path: string
  x?: number
  y?: number
  width?: number
  height?: number
}

export const brazilMapPaths: StatePath[] = [
  // Região Norte - Linha superior
  { sigla: 'RR', x: 80, y: 10, width: 50, height: 45, path: '' },
  { sigla: 'AP', x: 135, y: 10, width: 35, height: 45, path: '' },
  { sigla: 'PA', x: 135, y: 60, width: 90, height: 60, path: '' },
  { sigla: 'AM', x: 20, y: 60, width: 110, height: 75, path: '' },
  { sigla: 'AC', x: 20, y: 140, width: 45, height: 40, path: '' },
  { sigla: 'RO', x: 70, y: 140, width: 45, height: 40, path: '' },
  { sigla: 'TO', x: 175, y: 125, width: 50, height: 70, path: '' },
  { sigla: 'MA', x: 230, y: 60, width: 75, height: 60, path: '' },
  
  // Região Nordeste
  { sigla: 'PI', x: 230, y: 125, width: 55, height: 70, path: '' },
  { sigla: 'CE', x: 290, y: 125, width: 60, height: 35, path: '' },
  { sigla: 'RN', x: 355, y: 125, width: 35, height: 30, path: '' },
  { sigla: 'PB', x: 355, y: 160, width: 35, height: 25, path: '' },
  { sigla: 'PE', x: 310, y: 165, width: 65, height: 30, path: '' },
  { sigla: 'AL', x: 355, y: 190, width: 35, height: 30, path: '' },
  { sigla: 'SE', x: 330, y: 200, width: 30, height: 25, path: '' },
  { sigla: 'BA', x: 245, y: 200, width: 110, height: 95, path: '' },
  
  // Região Centro-Oeste
  { sigla: 'MT', x: 115, y: 185, width: 85, height: 110, path: '' },
  { sigla: 'GO', x: 205, y: 300, width: 70, height: 70, path: '' },
  { sigla: 'DF', x: 245, y: 325, width: 15, height: 15, path: '' },
  { sigla: 'MS', x: 145, y: 300, width: 75, height: 90, path: '' },
  
  // Região Sudeste
  { sigla: 'MG', x: 225, y: 335, width: 85, height: 90, path: '' },
  { sigla: 'ES', x: 315, y: 360, width: 30, height: 45, path: '' },
  { sigla: 'RJ', x: 290, y: 400, width: 40, height: 35, path: '' },
  { sigla: 'SP', x: 215, y: 400, width: 70, height: 60, path: '' },
  
  // Região Sul
  { sigla: 'PR', x: 215, y: 425, width: 70, height: 55, path: '' },
  { sigla: 'SC', x: 245, y: 445, width: 60, height: 40, path: '' },
  { sigla: 'RS', x: 225, y: 450, width: 65, height: 75, path: '' }
]

export const mapViewBox = '0 0 400 530'
