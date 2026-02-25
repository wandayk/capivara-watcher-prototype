import {
  Deputado,
  DeputadoDetalhado,
  CamaraDeputadosListResponse,
  CamaraDeputadosResponse,
  Despesa,
  Orgao,
  Frente,
  Parlamentar,
} from '../types'
import { API_URLS, API_TIMEOUT } from '../utils/constants'
import { normalizarDeputado } from '../utils/helpers'

/**
 * Função auxiliar para fazer requisições com timeout
 */
async function fetchWithTimeout(url: string, timeout = API_TIMEOUT): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

/**
 * Busca lista de deputados com filtros opcionais
 */
export async function fetchDeputados(params?: {
  nome?: string
  siglaUf?: string
  siglaPartido?: string
  pagina?: number
  itens?: number
}): Promise<Parlamentar[]> {
  try {
    const queryParams = new URLSearchParams()

    if (params?.nome) queryParams.append('nome', params.nome)
    if (params?.siglaUf) queryParams.append('siglaUf', params.siglaUf)
    if (params?.siglaPartido) queryParams.append('siglaPartido', params.siglaPartido)
    if (params?.pagina) queryParams.append('pagina', String(params.pagina))
    if (params?.itens) queryParams.append('itens', String(params.itens))

    const url = `${API_URLS.camara.base}/deputados?${queryParams.toString()}&ordenarPor=nome`

    const response = await fetchWithTimeout(url)

    if (!response.ok) {
      throw new Error(`Erro na API da Câmara: ${response.status}`)
    }

    const data: CamaraDeputadosListResponse<Deputado> = await response.json()

    return data.dados.map(deputado => normalizarDeputado(deputado))
  } catch (error) {
    console.error('Erro ao buscar deputados:', error)
    throw error
  }
}

/**
 * Busca detalhes de um deputado específico
 */
export async function fetchDeputado(id: number): Promise<Parlamentar> {
  try {
    const url = `${API_URLS.camara.base}/deputados/${id}`

    const response = await fetchWithTimeout(url)

    if (!response.ok) {
      throw new Error(`Erro na API da Câmara: ${response.status}`)
    }

    const data: CamaraDeputadosResponse<DeputadoDetalhado> = await response.json()

    return normalizarDeputado(data.dados)
  } catch (error) {
    console.error(`Erro ao buscar deputado ${id}:`, error)
    throw error
  }
}

/**
 * Busca despesas de um deputado
 */
export async function fetchDeputadoDespesas(
  id: number,
  ano?: number,
  mes?: number
): Promise<Despesa[]> {
  try {
    const queryParams = new URLSearchParams()

    if (ano) queryParams.append('ano', String(ano))
    if (mes) queryParams.append('mes', String(mes))

    const url = `${API_URLS.camara.base}/deputados/${id}/despesas?${queryParams.toString()}&ordenarPor=dataDocumento&ordem=DESC`

    const response = await fetchWithTimeout(url)

    if (!response.ok) {
      throw new Error(`Erro na API da Câmara: ${response.status}`)
    }

    const data: CamaraDeputadosListResponse<Despesa> = await response.json()

    return data.dados
  } catch (error) {
    console.error(`Erro ao buscar despesas do deputado ${id}:`, error)
    throw error
  }
}

/**
 * Busca órgãos que o deputado participa
 */
export async function fetchDeputadoOrgaos(id: number): Promise<Orgao[]> {
  try {
    const url = `${API_URLS.camara.base}/deputados/${id}/orgaos`

    const response = await fetchWithTimeout(url)

    if (!response.ok) {
      throw new Error(`Erro na API da Câmara: ${response.status}`)
    }

    const data: CamaraDeputadosListResponse<Orgao> = await response.json()

    return data.dados
  } catch (error) {
    console.error(`Erro ao buscar órgãos do deputado ${id}:`, error)
    throw error
  }
}

/**
 * Busca frentes parlamentares que o deputado participa
 */
export async function fetchDeputadoFrentes(id: number): Promise<Frente[]> {
  try {
    const url = `${API_URLS.camara.base}/deputados/${id}/frentes`

    const response = await fetchWithTimeout(url)

    if (!response.ok) {
      throw new Error(`Erro na API da Câmara: ${response.status}`)
    }

    const data: CamaraDeputadosListResponse<Frente> = await response.json()

    return data.dados
  } catch (error) {
    console.error(`Erro ao buscar frentes do deputado ${id}:`, error)
    throw error
  }
}
