import { BrazilState } from '../types'

/**
 * Dados dos estados brasileiros
 * Número de deputados baseado na população (proporcional, min 8 e max 70)
 * Todos os estados têm 3 senadores
 */
export const brazilStates: BrazilState[] = [
  // Norte
  { sigla: 'AC', nome: 'Acre', regiao: 'Norte', deputados: 8, senadores: 3 },
  { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', deputados: 8, senadores: 3 },
  { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', deputados: 8, senadores: 3 },
  { sigla: 'PA', nome: 'Pará', regiao: 'Norte', deputados: 17, senadores: 3 },
  { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', deputados: 8, senadores: 3 },
  { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', deputados: 8, senadores: 3 },
  { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', deputados: 8, senadores: 3 },

  // Nordeste
  { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', deputados: 9, senadores: 3 },
  { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', deputados: 39, senadores: 3 },
  { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', deputados: 22, senadores: 3 },
  { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', deputados: 18, senadores: 3 },
  { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', deputados: 12, senadores: 3 },
  { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', deputados: 25, senadores: 3 },
  { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', deputados: 10, senadores: 3 },
  { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', deputados: 8, senadores: 3 },
  { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', deputados: 8, senadores: 3 },

  // Centro-Oeste
  { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', deputados: 8, senadores: 3 },
  { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', deputados: 17, senadores: 3 },
  { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', deputados: 8, senadores: 3 },
  { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', deputados: 8, senadores: 3 },

  // Sudeste
  { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', deputados: 10, senadores: 3 },
  { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', deputados: 53, senadores: 3 },
  { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', deputados: 46, senadores: 3 },
  { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', deputados: 70, senadores: 3 },

  // Sul
  { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', deputados: 30, senadores: 3 },
  { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', deputados: 31, senadores: 3 },
  { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', deputados: 16, senadores: 3 },
]

/**
 * Retorna dados de um estado pela sigla
 */
export function obterEstado(sigla: string): BrazilState | undefined {
  return brazilStates.find(state => state.sigla === sigla)
}

/**
 * Retorna todos os estados de uma região
 */
export function obterEstadosPorRegiao(regiao: BrazilState['regiao']): BrazilState[] {
  return brazilStates.filter(state => state.regiao === regiao)
}

/**
 * Retorna total de deputados
 */
export function totalDeputados(): number {
  return brazilStates.reduce((sum, state) => sum + state.deputados, 0)
}

/**
 * Retorna total de senadores (sempre 81 - 3 por estado)
 */
export function totalSenadores(): number {
  return brazilStates.reduce((sum, state) => sum + state.senadores, 0)
}
