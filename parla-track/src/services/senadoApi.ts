import { Senador, SenadorDetalhado, Parlamentar, SenadoResponse } from '../types'
import { API_URLS, API_TIMEOUT } from '../utils/constants'
import { normalizarSenador } from '../utils/helpers'

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
 * Busca lista de senadores em exercício
 */
export async function fetchSenadores(): Promise<Parlamentar[]> {
  try {
    const url = `${API_URLS.senado.base}/senador/lista/atual.json`

    const response = await fetchWithTimeout(url)

    if (!response.ok) {
      throw new Error(`Erro na API do Senado: ${response.status}`)
    }

    const data: SenadoResponse<Senador> = await response.json()

    const senadores = data.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar || []

    return senadores.map(senador => normalizarSenador(senador))
  } catch (error) {
    console.error('Erro ao buscar senadores:', error)
    throw error
  }
}

/**
 * Busca detalhes de um senador específico
 */
export async function fetchSenador(codigo: string): Promise<Parlamentar> {
  try {
    const url = `${API_URLS.senado.base}/senador/${codigo}.json`

    const response = await fetchWithTimeout(url)

    if (!response.ok) {
      throw new Error(`Erro na API do Senado: ${response.status}`)
    }

    const data: SenadoResponse<SenadorDetalhado> = await response.json()

    const senador = data.DetalheParlamentar?.Parlamentar

    if (!senador) {
      throw new Error('Senador não encontrado')
    }

    return normalizarSenador(senador as SenadorDetalhado)
  } catch (error) {
    console.error(`Erro ao buscar senador ${codigo}:`, error)
    throw error
  }
}

/**
 * Filtra senadores por UF (client-side)
 */
export async function fetchSenadoresPorUF(uf: string): Promise<Parlamentar[]> {
  try {
    const senadores = await fetchSenadores()
    return senadores.filter(senador => senador.uf === uf)
  } catch (error) {
    console.error(`Erro ao buscar senadores de ${uf}:`, error)
    throw error
  }
}

/**
 * Filtra senadores por partido (client-side)
 */
export async function fetchSenadoresPorPartido(partido: string): Promise<Parlamentar[]> {
  try {
    const senadores = await fetchSenadores()
    return senadores.filter(senador => senador.partido === partido)
  } catch (error) {
    console.error(`Erro ao buscar senadores do ${partido}:`, error)
    throw error
  }
}

/**
 * Busca senadores por nome (client-side)
 */
export async function buscarSenadoresPorNome(nome: string): Promise<Parlamentar[]> {
  try {
    const senadores = await fetchSenadores()
    const nomeLower = nome.toLowerCase()

    return senadores.filter(senador =>
      senador.nome.toLowerCase().includes(nomeLower)
    )
  } catch (error) {
    console.error('Erro ao buscar senadores por nome:', error)
    throw error
  }
}
