// ===== User & Auth Types =====
export interface User {
  id: string
  username: string
  email: string
  name: string
  createdAt: string
}

// ===== Parlamentar Types =====
export type TipoParlamentar = 'deputado' | 'senador'

export interface Deputado {
  id: number
  uri: string
  nome: string
  siglaPartido: string
  uriPartido: string
  siglaUf: string
  idLegislatura: number
  urlFoto: string
  email?: string
}

export interface DeputadoDetalhado extends Deputado {
  cpf: string
  sexo: string
  dataNascimento: string
  dataFalecimento?: string
  ufNascimento: string
  municipioNascimento: string
  escolaridade: string
  nomeCivil: string
  redeSocial?: string[]
  telefone?: string
  gabinete?: {
    nome: string
    predio: string
    sala: string
    andar: string
    telefone: string
    email: string
  }
  situacao: string
  condicaoEleitoral: string
  descricaoStatus?: string
}

export interface Senador {
  CodigoParlamentar?: string
  NomeParlamentar?: string
  NomeCompleto?: string
  SiglaPartido?: string
  UfParlamentar?: string
  UrlFoto?: string
  UrlPagina?: string
  Email?: string
  // Estrutura aninhada da API do Senado
  IdentificacaoParlamentar?: {
    CodigoParlamentar: string
    NomeParlamentar: string
    NomeCompletoParlamentar: string
    SiglaPartidoParlamentar: string
    UfParlamentar: string
    UrlFotoParlamentar: string
    UrlPaginaParlamentar: string
    EmailParlamentar?: string
    SexoParlamentar?: string
  }
  Mandato?: any
}

export interface SenadorDetalhado extends Senador {
  SexoParlamentar?: string
  DataNascimento?: string
  UfNascimento?: string
  Naturalidade?: string
  Telefone?: string
  FormacaoAcademica?: string
  Situacao?: string
}

// Tipo unificado para uso na aplicação
export interface Parlamentar {
  id: string // ID único gerado
  tipo: TipoParlamentar
  codigoExterno: string // ID da API original
  nome: string
  nomeCivil?: string
  partido: string
  uf: string
  foto: string
  email?: string
  telefone?: string
  sexo?: string
  dataNascimento?: string
  ufNascimento?: string
  municipioNascimento?: string
  escolaridade?: string
  situacao?: string
  condicaoEleitoral?: string
  url?: string
  redeSocial?: string[]
  // Dados específicos
  dadosOriginais: Deputado | DeputadoDetalhado | Senador | SenadorDetalhado
}

// ===== API Response Types =====
export interface CamaraDeputadosResponse<T> {
  dados: T
  links: Array<{
    rel: string
    href: string
  }>
}

export interface CamaraDeputadosListResponse<T> {
  dados: T[]
  links: Array<{
    rel: string
    href: string
  }>
}

export interface SenadoResponse<T> {
  ListaParlamentarEmExercicio?: {
    Parlamentares: {
      Parlamentar: T[]
    }
    Metadados?: any
  }
  DetalheParlamentar?: {
    Parlamentar: T
  }
}

// ===== Despesas Types =====
export interface Despesa {
  ano: number
  mes: number
  tipoDespesa: string
  codDocumento: number
  tipoDocumento: string
  codTipoDocumento: number
  dataDocumento: string
  numDocumento: string
  valorDocumento: number
  urlDocumento: string
  nomeFornecedor: string
  cnpjCpfFornecedor: string
  valorLiquido: number
  valorGlosa: number
  numRessarcimento?: string
  codLote: number
  parcela: number
}

// ===== Órgãos Types =====
export interface Orgao {
  id: number
  uri: string
  sigla: string
  nome: string
  nomePublicacao: string
  tipoOrgao: string
}

export interface Frente {
  id: number
  uri: string
  titulo: string
  urlLogo?: string
}

// ===== Filters =====
export interface ParlamentarFilters {
  tipo?: TipoParlamentar | 'todos'
  nome?: string
  uf?: string
  partido?: string
  page?: number
  limit?: number
}

// ===== State Types =====
export interface BrazilState {
  sigla: string
  nome: string
  regiao: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul'
  deputados: number
  senadores: number
}

// ===== Theme Types =====
export type Theme = 'light' | 'dark'
