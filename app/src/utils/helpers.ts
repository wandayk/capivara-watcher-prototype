import { Deputado, DeputadoDetalhado, Parlamentar, Senador, SenadorDetalhado } from '../types'

/**
 * Normaliza dados de deputado para o formato Parlamentar unificado
 */
export function normalizarDeputado(deputado: Deputado | DeputadoDetalhado): Parlamentar {
  const isDetalhado = 'cpf' in deputado

  return {
    id: `deputado-${deputado.id}`,
    tipo: 'deputado',
    codigoExterno: String(deputado.id),
    nome: deputado.nome,
    nomeCivil: isDetalhado ? (deputado as DeputadoDetalhado).nomeCivil : undefined,
    partido: deputado.siglaPartido,
    uf: deputado.siglaUf,
    foto: deputado.urlFoto,
    email: deputado.email,
    telefone: isDetalhado ? (deputado as DeputadoDetalhado).gabinete?.telefone : undefined,
    sexo: isDetalhado ? (deputado as DeputadoDetalhado).sexo : undefined,
    dataNascimento: isDetalhado ? (deputado as DeputadoDetalhado).dataNascimento : undefined,
    ufNascimento: isDetalhado ? (deputado as DeputadoDetalhado).ufNascimento : undefined,
    municipioNascimento: isDetalhado ? (deputado as DeputadoDetalhado).municipioNascimento : undefined,
    escolaridade: isDetalhado ? (deputado as DeputadoDetalhado).escolaridade : undefined,
    situacao: isDetalhado ? (deputado as DeputadoDetalhado).situacao : undefined,
    condicaoEleitoral: isDetalhado ? (deputado as DeputadoDetalhado).condicaoEleitoral : undefined,
    url: deputado.uri,
    redeSocial: isDetalhado ? (deputado as DeputadoDetalhado).redeSocial : undefined,
    dadosOriginais: deputado,
  }
}

/**
 * Normaliza dados de senador para o formato Parlamentar unificado
 */
export function normalizarSenador(senador: Senador | SenadorDetalhado): Parlamentar {
  const isDetalhado = 'SexoParlamentar' in senador

  return {
    id: `senador-${senador.CodigoParlamentar}`,
    tipo: 'senador',
    codigoExterno: senador.CodigoParlamentar,
    nome: senador.NomeParlamentar,
    nomeCivil: senador.NomeCompleto,
    partido: senador.SiglaPartido,
    uf: senador.UfParlamentar,
    foto: senador.UrlFoto,
    email: senador.Email,
    telefone: isDetalhado ? (senador as SenadorDetalhado).Telefone : undefined,
    sexo: isDetalhado ? (senador as SenadorDetalhado).SexoParlamentar : undefined,
    dataNascimento: isDetalhado ? (senador as SenadorDetalhado).DataNascimento : undefined,
    ufNascimento: isDetalhado ? (senador as SenadorDetalhado).UfNascimento : undefined,
    municipioNascimento: isDetalhado ? (senador as SenadorDetalhado).Naturalidade : undefined,
    escolaridade: isDetalhado ? (senador as SenadorDetalhado).FormacaoAcademica : undefined,
    situacao: isDetalhado ? (senador as SenadorDetalhado).Situacao : undefined,
    url: senador.UrlPagina,
    dadosOriginais: senador,
  }
}

/**
 * Formata data brasileira (DD/MM/YYYY)
 */
export function formatarData(data: string | undefined): string {
  if (!data) return '-'

  try {
    const date = new Date(data)
    return date.toLocaleDateString('pt-BR')
  } catch {
    return data
  }
}

/**
 * Formata valor monetário em R$
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

/**
 * Gera ID único
 */
export function gerarId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Obtém região de um estado pela sigla
 */
export function obterRegiaoPorUf(uf: string): string {
  const regioes = {
    Norte: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
    Nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
    'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
    Sudeste: ['ES', 'MG', 'RJ', 'SP'],
    Sul: ['PR', 'RS', 'SC'],
  }

  for (const [regiao, estados] of Object.entries(regioes)) {
    if (estados.includes(uf)) {
      return regiao
    }
  }

  return 'Desconhecida'
}

/**
 * Valida email
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Valida senha (mínimo 6 caracteres)
 */
export function validarSenha(senha: string): boolean {
  return senha.length >= 6
}

/**
 * Remove acentos de uma string
 */
export function removerAcentos(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Busca case-insensitive e sem acentos
 */
export function buscarTexto(texto: string, busca: string): boolean {
  const textoNormalizado = removerAcentos(texto.toLowerCase())
  const buscaNormalizada = removerAcentos(busca.toLowerCase())
  return textoNormalizado.includes(buscaNormalizada)
}

/**
 * Capitaliza primeira letra de cada palavra
 */
export function capitalizarNome(nome: string): string {
  return nome
    .toLowerCase()
    .split(' ')
    .map(palavra => {
      // Palavras que devem permanecer em minúsculas
      const minusculas = ['de', 'da', 'do', 'das', 'dos', 'e']
      if (minusculas.includes(palavra)) return palavra
      return palavra.charAt(0).toUpperCase() + palavra.slice(1)
    })
    .join(' ')
}

/**
 * Trunca texto com reticências
 */
export function truncarTexto(texto: string, maxLength: number): string {
  if (texto.length <= maxLength) return texto
  return texto.substring(0, maxLength) + '...'
}

/**
 * Obtém iniciais de um nome
 */
export function obterIniciais(nome: string): string {
  return nome
    .split(' ')
    .filter(palavra => palavra.length > 2) // Ignora preposições
    .slice(0, 2)
    .map(palavra => palavra[0])
    .join('')
    .toUpperCase()
}

/**
 * Salva no localStorage com tratamento de erro
 */
export function salvarLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Erro ao salvar no localStorage (${key}):`, error)
  }
}

/**
 * Lê do localStorage com tratamento de erro
 */
export function lerLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Erro ao ler do localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Remove do localStorage
 */
export function removerLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Erro ao remover do localStorage (${key}):`, error)
  }
}
