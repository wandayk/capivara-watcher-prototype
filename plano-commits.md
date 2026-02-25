# 🏛️ ParlaTrack — Plano de Desenvolvimento por Commits

## Visão Geral do Projeto

**ParlaTrack** é um protótipo de aplicação React para visualização de dados de parlamentares brasileiros (Deputados e Senadores), consumindo as APIs públicas da Câmara dos Deputados e do Senado Federal.

---

## APIs Utilizadas

### Câmara dos Deputados
- **Base URL:** `https://dadosabertos.camara.leg.br/api/v2`
- `GET /deputados` — Lista deputados (aceita filtros: nome, siglaUf, siglaPartido, idLegislatura)
- `GET /deputados/{id}` — Detalhes de um deputado
- `GET /deputados/{id}/despesas` — Despesas do deputado
- `GET /deputados/{id}/orgaos` — Órgãos que o deputado participa
- `GET /deputados/{id}/frentes` — Frentes parlamentares

### Senado Federal
- **Base URL:** `https://legis.senado.leg.br/dadosabertos`
- `GET /senador/lista/atual.json` — Lista senadores em exercício
- `GET /senador/{codigo}.json` — Detalhes de um senador
- `GET /senador/{codigo}/votacoes.json` — Votações do senador
- `GET /senador/{codigo}/discursos.json` — Discursos do senador

---

## Stack Tecnológica

| Camada          | Tecnologia                                |
| --------------- | ----------------------------------------- |
| Framework       | React 18 + Vite                           |
| Linguagem       | TypeScript                                |
| Roteamento      | React Router v6                           |
| Estilização     | Tailwind CSS + shadcn/ui                  |
| Estado global   | Context API (localStorage para persistir) |
| Mapa do Brasil  | SVG interativo customizado (sem lib)      |
| Ícones          | Lucide React                              |
| HTTP Client     | Fetch API nativo                          |
| Animações       | Framer Motion                             |
| Gráficos        | Recharts                                  |

---

## Estrutura de Pastas (Objetivo Final)

```
parla-track/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── brazil-map.svg
│   ├── components/
│   │   ├── ui/                  # componentes shadcn
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarHeader.tsx
│   │   │   ├── SidebarFooter.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── map/
│   │   │   ├── BrazilMap.tsx
│   │   │   └── StateTooltip.tsx
│   │   ├── parlamentar/
│   │   │   ├── ParlamentarCard.tsx
│   │   │   ├── ParlamentarDetail.tsx
│   │   │   ├── ParlamentarList.tsx
│   │   │   └── EmptyState.tsx
│   │   └── common/
│   │       ├── Logo.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ThemeToggle.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── ParlamentarContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useParlamentares.ts
│   │   └── useDebounce.ts
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── CreateAccount.tsx
│   │   ├── ChangePassword.tsx
│   │   ├── Redirecting.tsx
│   │   ├── Home.tsx
│   │   └── AddParlamentar.tsx
│   ├── services/
│   │   ├── camaraApi.ts
│   │   └── senadoApi.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── data/
│   │   └── brazilStates.ts    # paths SVG e metadados dos estados
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🔀 Plano de Commits (16 commits)

---

### COMMIT 1 — `chore: scaffold projeto React + Vite + TypeScript + Tailwind`

**Escopo:** Inicialização do projeto com todas as dependências base.

**Tarefas:**
- `npm create vite@latest parla-track -- --template react-ts`
- Instalar: `tailwindcss`, `postcss`, `autoprefixer`, `react-router-dom`, `lucide-react`, `framer-motion`, `recharts`
- Configurar `tailwind.config.js` com tema customizado (cores institucionais: verde, amarelo, azul escuro)
- Configurar CSS variables para dark/light theme no `index.css`
- Criar `vite.config.ts` com proxy CORS para as APIs (ou configurar para uso direto)
- Criar `README.md` com descrição do projeto, stack e instruções de execução

**Arquivos criados/modificados:**
- `package.json`, `vite.config.ts`, `tsconfig.json`
- `tailwind.config.js`, `postcss.config.js`
- `src/index.css`, `src/main.tsx`, `src/App.tsx`
- `index.html`, `README.md`

---

### COMMIT 2 — `feat: definir tipos TypeScript e constantes globais`

**Escopo:** Tipar todo o domínio da aplicação e criar constantes reutilizáveis.

**Tarefas:**
- Criar interfaces para `Deputado`, `Senador`, `Parlamentar` (tipo unificado)
- Criar interfaces para respostas das APIs (`CamaraResponse`, `SenadoResponse`)
- Criar tipo `User` para autenticação mockada
- Criar constantes: siglas dos estados, partidos, cores por partido, URLs base das APIs
- Criar `brazilStates.ts` com dados por estado (sigla, nome, região, nº de deputados/senadores)

**Arquivos criados:**
- `src/types/index.ts`
- `src/utils/constants.ts`
- `src/utils/helpers.ts`
- `src/data/brazilStates.ts`

---

### COMMIT 3 — `feat: implementar ThemeContext com dark/light mode`

**Escopo:** Sistema de temas persistido em localStorage.

**Tarefas:**
- Criar `ThemeContext.tsx` com Provider que gerencia `dark` | `light`
- Aplicar classe `dark` no `<html>` via `useEffect`
- Persistir preferência em `localStorage`
- Criar componente `ThemeToggle.tsx` com ícone sol/lua animado
- Garantir todas as cores do Tailwind respondem ao dark mode

**Arquivos criados:**
- `src/contexts/ThemeContext.tsx`
- `src/components/common/ThemeToggle.tsx`

---

### COMMIT 4 — `feat: implementar AuthContext e lógica de autenticação mock`

**Escopo:** Autenticação simulada (sem backend) com persistência em sessionStorage.

**Tarefas:**
- Criar `AuthContext.tsx` com estados: `user`, `isAuthenticated`, `login()`, `logout()`, `register()`, `changePassword()`
- Credenciais válidas hardcoded: `pucminas` / `pucminas`
- Suportar criação de contas adicionais em memória (sessionStorage)
- Criar hook `useAuth.ts` como atalho para o contexto
- Implementar route guard (`ProtectedRoute`) que redireciona para `/login`

**Arquivos criados:**
- `src/contexts/AuthContext.tsx`
- `src/hooks/useAuth.ts`

---

### COMMIT 5 — `feat: implementar ParlamentarContext para estado global dos favoritos`

**Escopo:** Gerenciar a lista de parlamentares adicionados pelo usuário e o parlamentar selecionado.

**Tarefas:**
- Criar `ParlamentarContext.tsx` com estados:
  - `parlamentares: Parlamentar[]` (lista adicionada pelo usuário)
  - `selectedParlamentar: Parlamentar | null`
  - `addParlamentar()`, `removeParlamentar()`, `selectParlamentar()`
- Persistir lista em `localStorage` por usuário
- Criar hook `useParlamentares.ts`

**Arquivos criados:**
- `src/contexts/ParlamentarContext.tsx`
- `src/hooks/useParlamentares.ts`

---

### COMMIT 6 — `feat: configurar React Router com todas as rotas`

**Escopo:** Estrutura de roteamento completa com proteção de rotas.

**Tarefas:**
- Configurar `BrowserRouter` em `App.tsx`
- Definir rotas:
  - `/login` → `Login.tsx` (pública)
  - `/create-account` → `CreateAccount.tsx` (pública)
  - `/change-password` → `ChangePassword.tsx` (pública)
  - `/redirecting` → `Redirecting.tsx` (pública)
  - `/` → `Home.tsx` (protegida)
  - `/add` → `AddParlamentar.tsx` (protegida)
  - `/logout` → handler que chama `logout()` e redireciona
- Criar componente `ProtectedRoute.tsx`
- Criar páginas placeholder para cada rota

**Arquivos criados/modificados:**
- `src/App.tsx`
- `src/pages/Login.tsx` (placeholder)
- `src/pages/CreateAccount.tsx` (placeholder)
- `src/pages/ChangePassword.tsx` (placeholder)
- `src/pages/Redirecting.tsx` (placeholder)
- `src/pages/Home.tsx` (placeholder)
- `src/pages/AddParlamentar.tsx` (placeholder)
- `src/components/common/ProtectedRoute.tsx`

---

### COMMIT 7 — `feat: criar componente Logo e componentes UI base`

**Escopo:** Componentes visuais reutilizáveis (design system mínimo).

**Tarefas:**
- Criar `Logo.tsx` — ícone SVG estilizado do Congresso + nome "ParlaTrack"
- Criar `LoadingSpinner.tsx` — animação CSS de loading
- Criar `Input.tsx`, `Button.tsx`, `Card.tsx` — componentes UI estilizados com variantes
- Criar `Avatar.tsx` — componente para foto do parlamentar
- Definir estética: tons institucionais (verde escuro, dourado, branco) com toques modernos

**Arquivos criados:**
- `src/components/common/Logo.tsx`
- `src/components/common/LoadingSpinner.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Avatar.tsx`
- `src/components/ui/DropdownMenu.tsx`

---

### COMMIT 8 — `feat: implementar página de Login`

**Escopo:** Tela de login completa com validação e feedback visual.

**Tarefas:**
- Layout: card centralizado com fundo com textura sutil (pattern de linhas do Congresso)
- Campos: username e password com validação inline
- Botão de login com loading state
- Links para `/create-account` e `/change-password`
- Toast de erro em credenciais inválidas
- Animação de entrada (fade + slide) com Framer Motion
- Após login com sucesso → redirecionar para `/redirecting`

**Arquivos modificados:**
- `src/pages/Login.tsx`

---

### COMMIT 9 — `feat: implementar páginas de criação de conta e troca de senha`

**Escopo:** Formulários de registro e recuperação de senha.

**Tarefas:**
- **CreateAccount.tsx:**
  - Campos: nome, email, username, senha, confirmar senha
  - Validação: senha mínima 6 chars, senhas coincidem, username único
  - Após criar → redirecionar para `/redirecting` → `/login`
- **ChangePassword.tsx:**
  - Campos: username/email, nova senha, confirmar nova senha
  - Validação similar
  - Mensagem de sucesso e redirecionamento para `/login`
- Ambas com mesmo estilo visual do Login

**Arquivos modificados:**
- `src/pages/CreateAccount.tsx`
- `src/pages/ChangePassword.tsx`

---

### COMMIT 10 — `feat: implementar página de redirecionamento animada`

**Escopo:** Tela animada intermediária para transições.

**Tarefas:**
- Logo animada (scale + rotate + pulse) no centro da tela
- Texto dinâmico com reticências animadas: "Redirecionando..."
- Barra de progresso animada
- Auto-redirect após 2s para o destino (via query param `?to=/`)
- Fundo com gradiente animado nas cores do tema
- Partículas ou formas geométricas sutis flutuando no background

**Arquivos modificados:**
- `src/pages/Redirecting.tsx`

---

### COMMIT 11 — `feat: criar serviços de API (Câmara e Senado)`

**Escopo:** Camada de serviços para comunicação com as APIs externas.

**Tarefas:**
- `camaraApi.ts`:
  - `fetchDeputados(params?)` — lista com filtros (nome, UF, partido)
  - `fetchDeputado(id)` — detalhes completos
  - `fetchDeputadoDespesas(id)` — gastos
  - `fetchDeputadoOrgaos(id)` — comissões
  - Tratamento de paginação e erros
- `senadoApi.ts`:
  - `fetchSenadores()` — lista atual
  - `fetchSenador(codigo)` — detalhes
  - `fetchSenadorVotacoes(codigo)`
  - Tratamento de formato XML→JSON (senado pode retornar XML)
- Ambos com timeout, retry e error handling
- Helper `normalizeParlamenter()` para unificar formatos em `Parlamentar`

**Arquivos criados:**
- `src/services/camaraApi.ts`
- `src/services/senadoApi.ts`

---

### COMMIT 12 — `feat: implementar layout principal com Sidebar`

**Escopo:** Layout da Home com sidebar à esquerda e área de conteúdo à direita.

**Tarefas:**
- `MainLayout.tsx` — wrapper com sidebar + content area
- `Sidebar.tsx` — container da sidebar com 3 seções:
  1. **Header:** Logo + nome do projeto
  2. **Body:** Botão "Adicionar Parlamentar" (→ `/add`) + lista scrollável dos parlamentares adicionados pelo usuário, cada item clicável (mini card com foto, nome, partido, UF)
  3. **Footer:** Dados do usuário logado (avatar + nome) + DropdownMenu com opções: "Mudar Tema" (toggle dark/light) e "Sair" (logout)
- Sidebar responsiva: colapsa em mobile com hamburger menu
- Item selecionado destacado visualmente

**Arquivos criados:**
- `src/components/layout/MainLayout.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/SidebarHeader.tsx`
- `src/components/layout/SidebarFooter.tsx`

---

### COMMIT 13 — `feat: implementar página Home com detalhe do parlamentar`

**Escopo:** Área de conteúdo principal que exibe dados detalhados do parlamentar selecionado.

**Tarefas:**
- **EmptyState.tsx** — exibido quando nenhum parlamentar está selecionado:
  - Ilustração SVG de um parlamento vazio
  - Texto: "Nenhum parlamentar selecionado"
  - Botão CTA: "Pesquisar parlamentares" → `/add`
- **ParlamentarDetail.tsx** — exibido quando há seleção:
  - **Seção hero:** Foto grande, nome, partido, UF, tipo (Deputado/Senador)
  - **Seção dados pessoais:** data nascimento, escolaridade, email, telefone
  - **Seção informações do mandato:** legislatura, condição eleitoral, situação
  - **Seção despesas** (se deputado): gráfico de barras (Recharts) com despesas por categoria
  - **Seção comissões/órgãos:** lista dos órgãos que participa
  - Animações de entrada staggered nos cards de dados
  - Botão de remover parlamentar da lista

**Arquivos criados/modificados:**
- `src/pages/Home.tsx`
- `src/components/parlamentar/ParlamentarDetail.tsx`
- `src/components/parlamentar/EmptyState.tsx`

---

### COMMIT 14 — `feat: implementar mapa interativo do Brasil em SVG`

**Escopo:** Mapa SVG do Brasil com interatividade por estado — a peça visual central.

**Tarefas:**
- `BrazilMap.tsx`:
  - SVG com paths de todos os 26 estados + DF
  - Cada estado com `onMouseEnter`, `onMouseLeave`, `onClick`
  - Cores por região (Norte, Nordeste, Centro-Oeste, Sudeste, Sul) com intensidade baseada em nº de parlamentares
  - Animação de hover: scale-up sutil + brilho + elevation
  - Ao clicar em um estado: filtrar a lista de parlamentares ao lado
- `StateTooltip.tsx`:
  - Tooltip flutuante seguindo o mouse
  - Exibe: nome do estado, nº de deputados, nº de senadores, partidos predominantes
  - Fade-in/out suave
- Dados por estado pré-calculados a partir das APIs

**Arquivos criados:**
- `src/components/map/BrazilMap.tsx`
- `src/components/map/StateTooltip.tsx`
- `src/data/brazilStates.ts` (atualizado com paths SVG)

---

### COMMIT 15 — `feat: implementar página /add com mapa + busca de parlamentares`

**Escopo:** Página completa de pesquisa e adição de parlamentares — a tela mais inovadora.

**Tarefas:**
- Layout dividido: ~65% mapa (esquerda) + ~35% sidebar de busca (direita)
- **Lado esquerdo (mapa):**
  - Mapa do Brasil interativo (componente do commit 14)
  - Ao clicar num estado: filtra a lista à direita por UF
  - Badge no estado mostrando total de parlamentares
  - Legenda com cores por região
- **Lado direito (sidebar de busca):**
  - Input de busca com ícone de lupa e debounce (300ms)
  - Filtros: tipo (Deputado/Senador/Todos), partido (dropdown)
  - Indicador de UF selecionada (clicável para limpar filtro)
  - Lista scrollável de `ParlamentarCard.tsx`:
    - Foto, nome, partido-UF, tipo
    - Botão "Adicionar" (ou "Adicionado" se já está na lista)
    - Animação de entrada em cascade
  - Loading skeleton enquanto carrega
  - Paginação ou infinite scroll
- Busca consume ambas APIs simultaneamente (Câmara + Senado)
- Estado selecionado no mapa sincroniza com filtros da busca
- Responsivo: em mobile, mapa fica acima da lista

**Arquivos criados/modificados:**
- `src/pages/AddParlamentar.tsx`
- `src/components/parlamentar/ParlamentarCard.tsx`
- `src/components/parlamentar/ParlamentarList.tsx`
- `src/hooks/useDebounce.ts`

---

### COMMIT 16 — `fix: polimento final, responsividade, README e tratamento de erros`

**Escopo:** Revisão completa, testes manuais, ajustes finais.

**Tarefas:**
- Ajustar responsividade em todas as telas (mobile, tablet, desktop)
- Adicionar tratamento de erro global (API offline, timeout, CORS)
- Adicionar fallback de imagem para fotos de parlamentares
- Verificar e corrigir acessibilidade (aria-labels, tab navigation, contrast)
- Garantir que dark mode funciona em todas as telas
- Otimizar performance (lazy loading de páginas com `React.lazy`)
- Atualizar `README.md` com:
  - Screenshots/GIFs
  - Instruções de build e deploy
  - Documentação das APIs consumidas
  - Créditos e licença
- Adicionar `.github/` com template de issues e PR (opcional)
- Build final: `npm run build` sem erros

**Arquivos modificados:**
- Diversos ajustes em componentes existentes
- `README.md`
- `src/App.tsx` (lazy loading)

---

## 📊 Resumo do Plano

| #  | Commit                                          | Tipo  | Complexidade |
| -- | ----------------------------------------------- | ----- | ------------ |
| 1  | Scaffold projeto                                | chore | 🟢 Baixa     |
| 2  | Tipos e constantes                              | feat  | 🟢 Baixa     |
| 3  | ThemeContext                                     | feat  | 🟢 Baixa     |
| 4  | AuthContext                                      | feat  | 🟡 Média     |
| 5  | ParlamentarContext                               | feat  | 🟡 Média     |
| 6  | React Router + rotas                            | feat  | 🟡 Média     |
| 7  | Logo + UI base                                  | feat  | 🟡 Média     |
| 8  | Página Login                                    | feat  | 🟡 Média     |
| 9  | Páginas CreateAccount + ChangePassword          | feat  | 🟡 Média     |
| 10 | Página Redirecting                              | feat  | 🟢 Baixa     |
| 11 | Serviços de API                                 | feat  | 🔴 Alta      |
| 12 | Layout + Sidebar                                | feat  | 🔴 Alta      |
| 13 | Página Home + detalhes parlamentar              | feat  | 🔴 Alta      |
| 14 | Mapa SVG interativo                             | feat  | 🔴 Alta      |
| 15 | Página /add (mapa + busca)                      | feat  | 🔴 Alta      |
| 16 | Polimento + responsividade + README             | fix   | 🟡 Média     |

---

## 🎨 Diretrizes de Design

- **Estética:** Institucional-moderna. Tons escuros com acentos dourados/verdes. Inspiração em dashboards governamentais europeus.
- **Tipografia:** `DM Sans` (body) + `Playfair Display` (headings) — combinação séria mas elegante.
- **Animações:** Sutis e funcionais — transições de página, hover em cards, tooltip do mapa. Nada exagerado.
- **Dark mode:** Fundo `#0f1117` com cards `#1a1d26`. Light mode com fundo off-white `#f8f7f4`.

---

## 🚀 Como usar este plano no Claude Code

Cada commit pode ser solicitado individualmente ao Claude Code, por exemplo:

```
"Execute o Commit 1 do plano: scaffold do projeto React + Vite + TypeScript + Tailwind."
```

Ou em lotes:

```
"Execute os Commits 1 a 4 do plano."
```

O plano foi desenhado para que cada commit seja **auto-contido** e **não quebre a aplicação** — a cada commit o projeto deve estar funcional.
