# 🏛️ ParlaTrack

**ParlaTrack** é um protótipo de aplicação React para visualização de dados de parlamentares brasileiros (Deputados e Senadores), consumindo as APIs públicas da Câmara dos Deputados e do Senado Federal.

## 🎯 Objetivo

Permitir que usuários acompanhem parlamentares de seu interesse, visualizando dados como:
- Informações pessoais e de mandato
- Despesas parlamentares
- Participação em comissões e órgãos
- Votações e discursos

## 🛠️ Stack Tecnológica

| Camada          | Tecnologia                                |
| --------------- | ----------------------------------------- |
| Framework       | React 18 + Vite                           |
| Linguagem       | TypeScript                                |
| Roteamento      | React Router v6                           |
| Estilização     | Tailwind CSS                              |
| Estado global   | Context API (localStorage para persistir) |
| Mapa do Brasil  | SVG interativo customizado                |
| Ícones          | Lucide React                              |
| HTTP Client     | Fetch API nativo                          |
| Animações       | Framer Motion                             |
| Gráficos        | Recharts                                  |

## 🚀 Como Executar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

### Build

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 📡 APIs Utilizadas

### Câmara dos Deputados
- **Base URL:** `https://dadosabertos.camara.leg.br/api/v2`
- Documentação: [https://dadosabertos.camara.leg.br/swagger/api.html](https://dadosabertos.camara.leg.br/swagger/api.html)

### Senado Federal
- **Base URL:** `https://legis.senado.leg.br/dadosabertos`
- Documentação: [https://legis.senado.leg.br/dadosabertos/docs/](https://legis.senado.leg.br/dadosabertos/docs/)

## 🔐 Autenticação

A aplicação utiliza autenticação **mockada** (sem backend real).

**Credenciais padrão:**
- Usuário: `pucminas`
- Senha: `pucminas`

Você também pode criar novas contas através da tela de registro.

## 🎨 Features

- ✅ Autenticação mockada com persistência
- ✅ Tema claro/escuro
- ✅ Mapa interativo do Brasil
- ✅ Busca e filtro de parlamentares
- ✅ Visualização de dados detalhados
- ✅ Gráficos de despesas
- ✅ Interface responsiva
- ✅ Animações suaves

## 📁 Estrutura do Projeto

```
parla-track/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── map/
│   │   ├── parlamentar/
│   │   └── common/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── data/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## 📝 Licença

Este é um projeto educacional desenvolvido como protótipo.

## 👨‍💻 Desenvolvimento

Projeto desenvolvido como demonstração de integração com APIs públicas do governo brasileiro.

---

**Observação:** Esta aplicação consome dados públicos das APIs oficiais da Câmara dos Deputados e do Senado Federal. Todos os dados são de domínio público.
