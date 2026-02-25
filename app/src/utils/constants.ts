// ===== API URLs =====
export const API_URLS = {
  camara: {
    base: 'https://dadosabertos.camara.leg.br/api/v2',
    proxy: '/api/camara', // Para uso com proxy do Vite
  },
  senado: {
    base: 'https://legis.senado.leg.br/dadosabertos',
    proxy: '/api/senado', // Para uso com proxy do Vite
  },
} as const

// ===== Estados Brasileiros =====
export const UF_SIGLAS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

export const UF_NOMES: Record<string, string> = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
}

// ===== Partidos Políticos =====
export const PARTIDOS = [
  'AVANTE', 'CIDADANIA', 'DC', 'MDB', 'NOVO', 'PATRIOTA', 'PCdoB',
  'PDT', 'PL', 'PODE', 'PP', 'PRD', 'PROS', 'PSB', 'PSC', 'PSD',
  'PSDB', 'PSOL', 'PT', 'PTB', 'PV', 'REDE', 'REPUBLICANOS',
  'SOLIDARIEDADE', 'UNIÃO', 'S.PART.',
] as const

// Cores por partido (cores aproximadas baseadas nas identidades visuais)
export const PARTIDO_CORES: Record<string, string> = {
  PT: '#e20000',
  PSDB: '#0080ff',
  MDB: '#006400',
  PP: '#000080',
  PSD: '#ffa500',
  UNIÃO: '#1e3a8a',
  REPUBLICANOS: '#4169e1',
  PL: '#1e40af',
  PDT: '#ff6347',
  PSB: '#ffd700',
  PSOL: '#ffa500',
  PCdoB: '#8b0000',
  PODE: '#9370db',
  PTB: '#000000',
  CIDADANIA: '#ff1493',
  PV: '#228b22',
  AVANTE: '#ff8c00',
  NOVO: '#ff8c00',
  SOLIDARIEDADE: '#4682b4',
  REDE: '#32cd32',
  PSC: '#006400',
  PATRIOTA: '#008000',
  PROS: '#ffa500',
  DC: '#0000cd',
  PRD: '#4169e1',
  'S.PART.': '#808080',
}

// ===== Regiões do Brasil =====
export const REGIOES = {
  Norte: {
    nome: 'Norte',
    cor: '#10b981', // green-500
    estados: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
  },
  Nordeste: {
    nome: 'Nordeste',
    cor: '#f59e0b', // amber-500
    estados: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  },
  'Centro-Oeste': {
    nome: 'Centro-Oeste',
    cor: '#8b5cf6', // violet-500
    estados: ['DF', 'GO', 'MT', 'MS'],
  },
  Sudeste: {
    nome: 'Sudeste',
    cor: '#3b82f6', // blue-500
    estados: ['ES', 'MG', 'RJ', 'SP'],
  },
  Sul: {
    nome: 'Sul',
    cor: '#ec4899', // pink-500
    estados: ['PR', 'RS', 'SC'],
  },
} as const

// ===== Local Storage Keys =====
export const STORAGE_KEYS = {
  theme: 'parlatrack_theme',
  user: 'parlatrack_user',
  users: 'parlatrack_users',
  parlamentares: 'parlatrack_parlamentares',
  selectedParlamentar: 'parlatrack_selected',
} as const

// ===== Auth Constants =====
export const DEFAULT_USER = {
  username: 'pucminas',
  password: 'pucminas',
} as const

// ===== Pagination =====
export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const

// ===== API Timeouts =====
export const API_TIMEOUT = 10000 // 10 seconds

// ===== Routes =====
export const ROUTES = {
  login: '/login',
  createAccount: '/create-account',
  changePassword: '/change-password',
  redirecting: '/redirecting',
  home: '/',
  add: '/add',
  logout: '/logout',
} as const
