📚 DOCUMENTAÇÃO TÉCNICA COMPLETA - SafeHash TCC

Versão: 1.0.0
Data: 26 de Junho de 2026
Autor: luis gustavo bueno
Licença: MIT
Status: Pronto para Produção




📋 ÍNDICE

1.
Visão Geral do Projeto

2.
Stack Tecnológico Completo

3.
Arquitetura do Sistema

4.
Instalação & Setup

5.
Estrutura de Diretórios

6.
Banco de Dados

7.
Frontend - Detalhes Técnicos

8.
Backend - Detalhes Técnicos

9.
Variáveis   de Ambiente

10.
Scripts & Comandos

11.
Fluxos Principais

12.
Segurança

13.
Deploy & Produção

14.
Troubleshooting




🎯 Visão Geral do Projeto

SafeHash é uma plataforma profissional de custódia digital forense que implementa um sistema robusto para registro, verificação e auditoria de integridade de arquivos digitais.

Objetivos Principais

•
✅ Conformidade Legal: Art. 158-B do CPP (Código de Processo Penal Brasileiro)

•
✅ Padrões Internacionais: ISO 27037 (Diretrizes para Perícia Forense Digital)

•
✅ Privacidade Forense: Hash SHA-256 calculado 100% no cliente (arquivo nunca sai do PC)

•
✅ Rastreabilidade Total: Trilha de auditoria imutável de todas as operações

•
✅ UX Profissional: Interface intuitiva para peritos, advogados e investigadores

Números do Projeto

Métrica
Valor
Linhas de Código (Frontend)
3.788 linhas
Linhas de Código (Backend)
514 linhas
Linhas de Testes E2E
76 linhas
Total de Componentes
38+ componentes
Dependências Diretas
52 pacotes
DevDependencies
28 pacotes
Versão Node.js Mínima
18.0.0+
Versão TypeScript
5.6.3







🏗️ Stack Tecnológico Completo

Frontend (Client-Side)

Core Framework

Pacote
Versão
Propósito
react
19.2.1
Framework UI principal
react-dom
19.2.1
Renderização React no DOM
typescript
5.6.3
Tipagem estática (linguagem)




Build & Bundling

Pacote
Versão
Propósito
vite
8.0.3
Bundler e dev server ultra-rápido
@vitejs/plugin-react
5.0.4
Plugin React para Vite
@tailwindcss/vite
4.1.3
Plugin Tailwind para Vite (v4)
esbuild
0.25.0
Minificador de JavaScript (usado pelo Vite)




Styling & UI

Pacote
Versão
Propósito
tailwindcss
4.1.14
Framework CSS utility-first
autoprefixer
10.4.20
Adiciona prefixos CSS automáticos
postcss
8.4.47
Processador CSS com plugins
tailwind-merge
3.3.1
Merge inteligente de classes Tailwind
tailwindcss-animate
1.0.7
Animações prontas para Tailwind
class-variance-authority
0.7.1
Gerenciador de variantes de CSS
clsx
2.1.1
Utilitário para classes CSS condicionais




UI Components (Radix UI + Shadcn/UI)

Pacote
Versão
Propósito
@radix-ui/react-alert-dialog
1.1.15
Componente de diálogo de alerta
@radix-ui/react-aspect-ratio
1.1.7
Mantém proporção de aspecto
@radix-ui/react-avatar
1.1.10
Componente de avatar
@radix-ui/react-checkbox
1.3.3
Checkbox acessível
@radix-ui/react-collapsible
1.1.12
Componente expansível/colapsável
@radix-ui/react-context-menu
2.2.16
Menu de contexto (clique direito)
@radix-ui/react-dialog
1.1.15
Modal/diálogo acessível
@radix-ui/react-dropdown-menu
2.1.16
Menu dropdown
@radix-ui/react-hover-card
1.1.15
Card que aparece ao hover
@radix-ui/react-label
2.1.7
Label acessível
@radix-ui/react-menubar
1.1.16
Barra de menu (tipo desktop)
@radix-ui/react-navigation-menu
1.2.14
Menu de navegação
@radix-ui/react-popover
1.1.15
Popover flutuante
@radix-ui/react-progress
1.1.7
Barra de progresso
@radix-ui/react-radio-group
1.3.8
Grupo de radio buttons
@radix-ui/react-scroll-area
1.2.10
Área com scroll customizado
@radix-ui/react-select
2.2.6
Select/dropdown acessível
@radix-ui/react-separator
1.1.7
Separador visual
@radix-ui/react-slider
1.3.6
Slider/range input
@radix-ui/react-slot
1.2.3
Componente slot (composição)
@radix-ui/react-switch
1.2.6
Toggle switch
@radix-ui/react-tabs
1.1.13
Componente de abas
@radix-ui/react-toggle
1.1.10
Botão toggle
@radix-ui/react-toggle-group
1.1.11
Grupo de toggles
@radix-ui/react-tooltip
1.2.8
Tooltip flutuante




Animações & Motion

Pacote
Versão
Propósito
framer-motion
12.23.22
Biblioteca de animações React
tw-animate-css
1.4.0
Animações CSS customizadas




Roteamento & Navegação

Pacote
Versão
Propósito
wouter
3.3.5
Router minimalista (alternativa ao React Router)




Formulários & Validação

Pacote
Versão
Propósito
react-hook-form
7.64.0
Gerenciamento eficiente de formulários
@hookform/resolvers
5.2.2
Resolvers para validação (Zod, Yup, etc)
zod
4.1.12
Validação de schema TypeScript-first




Ícones

Pacote
Versão
Propósito
lucide-react
0.453.0
Biblioteca de ícones SVG




Notificações & Toasts

Pacote
Versão
Propósito
sonner
2.0.7
Toast notifications modernas




Tema & Modo Escuro

Pacote
Versão
Propósito
next-themes
0.4.6
Gerenciador de tema (light/dark)




Geração de Documentos

Pacote
Versão
Propósito
jspdf
4.2.1
Geração de PDFs em JavaScript
jspdf-autotable
5.0.8
Plugin para tabelas em jsPDF




Layout & Painéis

Pacote
Versão
Propósito
react-resizable-panels
3.0.6
Painéis redimensionáveis




Gráficos & Visualização

Pacote
Versão
Propósito
recharts
2.15.2
Biblioteca de gráficos React




Metadados & EXIF

Pacote
Versão
Propósito
exif-js
2.3.0
Extração de dados EXIF de imagens




HTTP & Requisições

Pacote
Versão
Propósito
axios
1.12.0
Cliente HTTP (alternativa a fetch)







Backend (Server-Side)

Core Runtime

Pacote
Versão
Propósito
express
4.21.2
Framework web minimalista
typescript
5.6.3
Tipagem estática




Segurança & Autenticação

Pacote
Versão
Propósito
jsonwebtoken
9.0.3
Geração e verificação de JWT
bcryptjs
3.0.3
Hash de senhas com bcrypt
cors
2.8.6
Middleware CORS para Express




Banco de Dados

Pacote
Versão
Propósito
mysql2
3.20.0
Driver MySQL com suporte a Promises




Validação

Pacote
Versão
Propósito
zod
4.1.12
Validação de schema TypeScript-first




Variáveis de Ambiente

Pacote
Versão
Propósito
dotenv
17.4.2
Carregamento de variáveis .env







DevDependencies (Desenvolvimento)

Tipagem

Pacote
Versão
Propósito
@types/node
24.13.2
Tipos TypeScript para Node.js
@types/react
19.2.1
Tipos TypeScript para React
@types/react-dom
19.2.1
Tipos TypeScript para React DOM
@types/express
4.17.21
Tipos TypeScript para Express
@types/cors
2.8.19
Tipos TypeScript para CORS
@types/jsonwebtoken
9.0.10
Tipos TypeScript para JWT
@types/bcrypt
6.0.0
Tipos TypeScript para Bcrypt
@types/bcryptjs
3.0.0
Tipos TypeScript para Bcryptjs
@types/supertest
7.2.0
Tipos TypeScript para Supertest




Testes

Pacote
Versão
Propósito
@playwright/test
1.61.0
Framework de testes E2E
vitest
2.1.9
Framework de testes unitários
supertest
7.2.2
Testes de API HTTP




Formatação & Linting

Pacote
Versão
Propósito
prettier
3.6.2
Formatador de código




Tailwind Extensions

Pacote
Versão
Propósito
@tailwindcss/typography
0.5.15
Plugin de tipografia para Tailwind




Bundling & Compilation

Pacote
Versão
Propósito
tsx
4.19.1
Executor TypeScript para Node.js




Package Manager

Pacote
Versão
Propósito
pnpm
10.15.1
Package manager rápido e eficiente
add
2.0.6
Utilitário para adicionar pacotes







🏛️ Arquitetura do Sistema

Padrão Arquitetural: Monolito Modular

Plain Text


┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                │
│                    (Frontend - React)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Landing Page │  │  Dashboard   │  │ Verify Page  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                    HTTP/REST (Axios)
                           │
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE API                         │
│                  (Backend - Express)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Auth Routes  │  │ Evidence API │  │  Middleware  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                      MySQL Protocol
                           │
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE DADOS                       │
│                   (MySQL Database)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │    Users     │  │  Evidences   │  │ Verify Logs  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘



Separação de Responsabilidades

Frontend (Client)

•
Apresentação: Componentes React com TailwindCSS

•
Lógica de Negócio: Validações, cálculos de hash

•
Comunicação: Requisições HTTP via Axios

•
Estado: localStorage para autenticação

Backend (Server)

•
Roteamento: Express routes para endpoints

•
Controladores: Lógica de negócio centralizada

•
Validação: Schemas Zod para inputs

•
Autenticação: JWT + Bcrypt

•
Persistência: MySQL via mysql2/promise

Banco de Dados

•
Relacional: MySQL 8.0

•
Integridade: Foreign keys, constraints

•
Auditoria: Timestamps automáticos




📦 Instalação & Setup

Pré-requisitos

Bash


# Node.js 18+
node --version  # v18.0.0 ou superior

# pnpm (package manager)
npm install -g pnpm@10.4.1

# MySQL 8.0
mysql --version  # Ver. 8.0+

# Git
git --version



Passo 1: Clonar o Repositório

Bash


git clone <seu-repositorio> SafeHash
cd SafeHash



Passo 2: Instalar Dependências

Bash


# Instalar todas as dependências (frontend + backend)
pnpm install

# Ou se preferir npm
npm install

# Ou se preferir yarn
yarn install



O que acontece:

•
pnpm install lê package.json

•
Instala 52 dependências diretas

•
Instala 28 devDependencies

•
Cria pnpm-lock.yaml (lock file)

•
Popula node_modules/

Passo 3: Configurar Banco de Dados

3.1 Criar Banco de Dados

Bash


# Conectar ao MySQL
mysql -u root -p

# Dentro do MySQL, executar:
CREATE DATABASE IF NOT EXISTS safehash_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

# Sair
EXIT;



3.2 Executar Schema SQL

Bash


# Importar o arquivo init.sql
mysql -u root -p safehash_db < server/database/init.sql

# Ou manualmente:
mysql -u root -p
USE safehash_db;
SOURCE server/database/init.sql;



Tabelas criadas:

•
users - Dados de peritos/advogados

•
evidences - Registros de custódia

•
verification_logs - Trilha de auditoria

Passo 4: Configurar Variáveis de Ambiente

4.1 Backend (server/.env)

Plain Text


PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=safehash_db
DB_PORT=3306
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000



4.2 Frontend (client/.env )

Plain Text


VITE_API_URL=http://localhost:5000/api



Passo 5: Testar Instalação

Bash


# Verificar TypeScript
pnpm run check

# Resultado esperado: "No errors"






📁 Estrutura de Diretórios

Plain Text


SafeHash/
├── 📂 client/                          # Frontend React + Vite
│   ├── 📂 src/
│   │   ├── 📂 pages/                   # Páginas principais
│   │   │   ├── Home.tsx                # Landing page
│   │   │   ├── Dashboard.tsx           # Painel de controle (protegido )
│   │   │   ├── Login.tsx               # Tela de login
│   │   │   ├── Register.tsx            # Tela de cadastro
│   │   │   ├── Verify.tsx              # Verificação pública
│   │   │   ├── Logs.tsx                # Histórico de logs (protegido)
│   │   │   ├── Profile.tsx             # Perfil do usuário (protegido)
│   │   │   └── NotFound.tsx            # Página 404
│   │   ├── 📂 components/              # Componentes reutilizáveis
│   │   │   ├── 📂 ui/                  # Componentes Radix/Shadcn
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── sonner.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   └── tooltip.tsx
│   │   │   ├── 📂 layout/              # Componentes de layout
│   │   │   │   ├── DashboardHeader.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── Header.tsx              # Cabeçalho público
│   │   │   ├── Footer.tsx              # Rodapé público
│   │   │   ├── HeroSection.tsx         # Seção hero da landing
│   │   │   ├── ProductOverview.tsx     # Visão geral do produto
│   │   │   ├── CapabilitiesSection.tsx # Capacidades/features
│   │   │   ├── FAQSection.tsx          # Perguntas frequentes
│   │   │   ├── SolucoesSection.tsx     # Casos de uso
│   │   │   ├── ConformidadeSection.tsx # Conformidade legal
│   │   │   ├── RecursosSection.tsx     # Recursos/documentação
│   │   │   ├── ErrorBoundary.tsx       # Captura de erros
│   │   │   └── ErrorBoundary.tsx       # Fallback de erro
│   │   ├── 📂 contexts/                # Context API
│   │   │   └── ThemeContext.tsx        # Tema light/dark
│   │   ├── 📂 hooks/                   # Custom hooks
│   │   │   └── useExifExtraction.ts    # Extração de EXIF
│   │   ├── 📂 lib/                     # Utilitários
│   │   │   └── generateCertificate.ts  # Geração de PDF
│   │   ├── 📂 data/                    # Dados estáticos
│   │   │   ├── config.json
│   │   │   ├── faq.json
│   │   │   ├── features.json
│   │   │   └── resources.json
│   │   ├── App.tsx                     # Componente raiz + roteador
│   │   ├── main.tsx                    # Entry point
│   │   └── const.ts                    # Constantes
│   ├── index.html                      # HTML template
│   └── .env                            # Variáveis de ambiente
│
├── 📂 server/                          # Backend Node.js + Express
│   ├── 📂 src/
│   │   ├── 📂 routes/                  # Definição de rotas
│   │   │   ├── auth.ts                 # Rotas de autenticação
│   │   │   └── evidence.ts             # Rotas de evidências
│   │   ├── 📂 controllers/             # Lógica de negócio
│   │   │   ├── authController.ts       # Registro, login, perfil
│   │   │   └── evidenceController.ts   # CRUD de evidências
│   │   ├── 📂 middlewares/             # Middlewares Express
│   │   │   └── authMiddleware.ts       # Verificação de JWT
│   │   ├── 📂 schemas/                 # Validação Zod
│   │   │   └── validation.ts           # Schemas de validação
│   │   └── 📂 lib/                     # Utilitários
│   │       └── db.ts                   # Pool de conexão MySQL
│   ├── 📂 database/                    # Scripts SQL
│   │   └── init.sql                    # Schema inicial
│   ├── index.ts                        # Entry point Express
│   └── .env                            # Variáveis de ambiente
│
├── 📂 shared/                          # Código compartilhado
│   └── const.ts                        # Constantes globais
│
├── 📂 tests-e2e/                       # Testes end-to-end
│   ├── auth_robust.spec.ts             # Testes de autenticação
│   ├── dashboard_flow.spec.ts          # Testes do dashboard
│   └── test-evidence.txt               # Evidência de testes
│
├── 📂 playwright-report/               # Relatório de testes
│
├── 📂 .logs/                           # Logs de desenvolvimento
│
├── 📄 package.json                     # Dependências e scripts
├── 📄 pnpm-lock.yaml                   # Lock file pnpm
├── 📄 tsconfig.json                    # Configuração TypeScript
├── 📄 tsconfig.node.json               # TypeScript para Node
├── 📄 vite.config.ts                   # Configuração Vite
├── 📄 playwright.config.ts             # Configuração Playwright
├── 📄 components.json                  # Configuração Shadcn
├── 📄 .gitignore                       # Git ignore
├── 📄 .env.example                     # Template de .env
├── 📄 README.md                        # Documentação principal
└── 📄 DOCUMENTACAO_TECNICA_SAFEHASH.md # Documentação técnica






🗄️ Banco de Dados

Modelo de Dados (DER)

Plain Text


┌─────────────────────────────────────────────────────────┐
│                       USERS                             │
├─────────────────────────────────────────────────────────┤
│ id (PK)                    INT AUTO_INCREMENT            │
│ full_name                  VARCHAR(255)                  │
│ email (UNIQUE)             VARCHAR(255)                  │
│ cpf (UNIQUE)               VARCHAR(14)                   │
│ password_hash              VARCHAR(255)                  │
│ professional_type          VARCHAR(50)                   │
│ professional_id            VARCHAR(50)                   │
│ professional_uf            CHAR(2)                       │
│ created_at                 TIMESTAMP                     │
│ updated_at                 TIMESTAMP                     │
└─────────────────────────────────────────────────────────┘
                            │
                    1 : N (hasMany)
                            │
┌─────────────────────────────────────────────────────────┐
│                     EVIDENCES                           │
├─────────────────────────────────────────────────────────┤
│ id (PK)                    INT AUTO_INCREMENT            │
│ user_id (FK)               INT                           │
│ file_name                  VARCHAR(255)                  │
│ file_hash                  CHAR(64)                      │
│ file_size                  BIGINT                        │
│ mime_type                  VARCHAR(100)                  │
│ description                TEXT                         │
│ exif_metadata              JSON                         │
│ timestamp_signature        VARCHAR(255)                  │
│ gps_location               VARCHAR(255)                  │
│ iso_compliance             BOOLEAN                       │
│ client_name                VARCHAR(255)                  │
│ professional_title         VARCHAR(50)                   │
│ professional_registry      VARCHAR(50)                   │
│ professional_id            VARCHAR(50)                   │
│ professional_uf            CHAR(2)                       │
│ created_at                 TIMESTAMP                     │
└─────────────────────────────────────────────────────────┘
                            │
                    1 : N (hasMany)
                            │
┌─────────────────────────────────────────────────────────┐
│                  VERIFICATION_LOGS                      │
├─────────────────────────────────────────────────────────┤
│ id (PK)                    INT AUTO_INCREMENT            │
│ evidence_id (FK)           INT                           │
│ is_valid                   BOOLEAN                       │
│ ip_address                 VARCHAR(45)                   │
│ verified_at                TIMESTAMP                     │
└─────────────────────────────────────────────────────────┘



Descrição Detalhada das Tabelas

Tabela: users

Armazena dados dos usuários autenticados (peritos, advogados, investigadores).

Campo
Tipo
Constraints
Descrição
id
INT
PK, AUTO_INCREMENT
Identificador único
full_name
VARCHAR(255)
NOT NULL
Nome completo do usuário
email
VARCHAR(255)
NOT NULL, UNIQUE
Email único para login
cpf
VARCHAR(14)
NOT NULL, UNIQUE
CPF formatado (XXX.XXX.XXX-XX)
password_hash
VARCHAR(255)
NOT NULL
Senha com hash bcrypt
professional_type
VARCHAR(50)
DEFAULT 'Perito'
Tipo profissional (Perito, Advogado)
professional_id
VARCHAR(50)
NULL
OAB (advogado) ou Matrícula (perito)
professional_uf
CHAR(2)
NULL
UF do registro profissional
created_at
TIMESTAMP
DEFAULT CURRENT_TIMESTAMP
Data de criação
updated_at
TIMESTAMP
DEFAULT CURRENT_TIMESTAMP ON UPDATE
Última atualização




Índices:

•
PRIMARY KEY: id

•
UNIQUE: email

•
UNIQUE: cpf




Tabela: evidences

Armazena registros de custódia digital com metadados de integridade.

Campo
Tipo
Constraints
Descrição
id
INT
PK, AUTO_INCREMENT
Identificador único
user_id
INT
NOT NULL, FK
Referência ao usuário que registrou
file_name
VARCHAR(255)
NOT NULL
Nome original do arquivo
file_hash
CHAR(64)
NOT NULL
Hash SHA-256 (256 bits = 64 hex chars)
file_size
BIGINT
NOT NULL
Tamanho em bytes
mime_type
VARCHAR(100)
NULL
Tipo MIME (image/jpeg, etc)
description
TEXT
NULL
Descrição do caso/evidência
exif_metadata
JSON
NULL
Metadados EXIF extraídos
timestamp_signature
VARCHAR(255)
NULL
Assinatura temporal (SAFEHASH-AUTH-...)
gps_location
VARCHAR(255)
NULL
Coordenadas GPS (se disponível)
iso_compliance
BOOLEAN
DEFAULT 1
Status ISO 27037
client_name
VARCHAR(255)
NULL
Nome do cliente/caso
professional_title
VARCHAR(50)
NULL
Título profissional no laudo
professional_registry
VARCHAR(50)
NULL
Registro profissional
professional_id
VARCHAR(50)
NULL
ID do profissional
professional_uf
CHAR(2)
NULL
UF de atuação
created_at
TIMESTAMP
DEFAULT CURRENT_TIMESTAMP
Data de registro




Índices:

•
PRIMARY KEY: id

•
FOREIGN KEY: user_id → users.id (ON DELETE CASCADE, ON UPDATE CASCADE)




Tabela: verification_logs

Trilha de auditoria de todas as verificações de integridade.

Campo
Tipo
Constraints
Descrição
id
INT
PK, AUTO_INCREMENT
Identificador único
evidence_id
INT
NOT NULL, FK
Referência à evidência verificada
is_valid
BOOLEAN
NOT NULL
Resultado: true (íntegro), false (violado)
ip_address
VARCHAR(45)
NULL
IP de quem verificou (IPv4 ou IPv6)
verified_at
TIMESTAMP
DEFAULT CURRENT_TIMESTAMP
Momento da verificação




Índices:

•
PRIMARY KEY: id

•
FOREIGN KEY: evidence_id → evidences.id (ON DELETE CASCADE, ON UPDATE CASCADE)




Executar Schema SQL

Bash


# Opção 1: Importar arquivo
mysql -u root -p safehash_db < server/database/init.sql

# Opção 2: Manualmente
mysql -u root -p
USE safehash_db;
SOURCE server/database/init.sql;
EXIT;

# Opção 3: Verificar tabelas criadas
mysql -u root -p safehash_db -e "SHOW TABLES;"



Saída esperada:

Plain Text


+---------------------+
| Tables_in_safehash_db |
+---------------------+
| evidences           |
| users               |
| verification_logs   |
+---------------------+






💻 Frontend - Detalhes Técnicos

Arquitetura do Frontend

Plain Text


client/src/
├── App.tsx (Roteador principal)
├── main.tsx (Entry point)
├── pages/ (Componentes de página)
├── components/ (Componentes reutilizáveis)
├── contexts/ (Context API)
├── hooks/ (Custom hooks)
├── lib/ (Utilitários)
├── data/ (Dados estáticos)
└── const.ts (Constantes)



Roteamento

Usando Wouter (router minimalista):

TypeScript


// App.tsx
<Switch>
  <Route path="/" component={Home} />                    // Landing page (público)
  <Route path="/login" component={Login} />              // Login (público)
  <Route path="/register" component={Register} />        // Cadastro (público)
  <Route path="/verify" component={Verify} />            // Verificação (público)
  <ProtectedRoute path="/dashboard" component={Dashboard} /> // Painel (privado)
  <ProtectedRoute path="/logs" component={Logs} />       // Logs (privado)
  <ProtectedRoute path="/profile" component={Profile} /> // Perfil (privado)
</Switch>



ProtectedRoute: Verifica token no localStorage antes de renderizar.

Fluxo de Autenticação (Frontend)

Plain Text


1. Usuário acessa /register
   ↓
2. Preenche formulário (nome, email, CPF, senha)
   ↓
3. Validação local (Zod)
   ↓
4. POST /api/auth/register
   ↓
5. Backend valida e cria usuário
   ↓
6. Resposta com sucesso
   ↓
7. Redireciona para /login
   ↓
8. Usuário faz login
   ↓
9. POST /api/auth/login (email + senha)
   ↓
10. Backend verifica credenciais
    ↓
11. Retorna JWT + userId + userName
    ↓
12. Frontend armazena em localStorage
    ↓
13. Redireciona para /dashboard



Fluxo de Registro de Custódia (Frontend)

Plain Text


1. Usuário acessa /dashboard
   ↓
2. Clica em "Selecionar Arquivo"
   ↓
3. Escolhe arquivo (qualquer tipo)
   ↓
4. Frontend calcula SHA-256 (Web Crypto API)
   ↓
5. Extrai EXIF (se imagem)
   ↓
6. Preenche formulário (cliente, profissional, etc)
   ↓
7. Clica "Registrar Custódia"
   ↓
8. POST /api/evidence/register-hash
   ↓
9. Backend valida e salva no banco
   ↓
10. Retorna sucesso
    ↓
11. Toast notifica usuário
    ↓
12. Atualiza lista de evidências



Componentes Principais

Home.tsx (Landing Page)

TypeScript


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductOverview />
        <CapabilitiesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}



Dashboard.tsx (Painel Principal)

Funcionalidades:

•
KPIs (total de evidências, integridade)

•
Formulário de nova custódia

•
Cálculo de hash SHA-256

•
Tabela com histórico

•
Geração de PDF

Hooks usados:

•
useState - Estado local

•
useEffect - Efeitos colaterais

•
useLocation - Navegação (Wouter)

Login.tsx & Register.tsx

Validações:

•
Email válido

•
CPF com checksum

•
Senha forte (8+ caracteres, maiúscula, número, especial)

•
Confirmação de senha

Feedback visual:

•
Ícones de status (✓ válido, ✗ inválido)

•
Cores dinâmicas (verde, vermelho)

•
Tooltips informativos

Estilização (TailwindCSS)

Configuração:

•
Tailwind v4 (latest)

•
Modo JIT (Just-In-Time)

•
Dark mode suportado

•
Animações customizadas

Exemplo:

TypeScript


<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
  Conteúdo
</div>



Temas (Light/Dark)

Usando next-themes:

TypeScript


// ThemeContext.tsx
export function ThemeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}






🔧 Backend - Detalhes Técnicos

Arquitetura do Backend

Plain Text


server/
├── index.ts (Entry point Express)
├── src/
│   ├── routes/ (Definição de rotas)
│   ├── controllers/ (Lógica de negócio)
│   ├── middlewares/ (Middlewares)
│   ├── schemas/ (Validação)
│   └── lib/ (Utilitários)
└── database/ (Scripts SQL)



Entry Point (server/index.ts)

TypeScript


import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.ts";
import evidenceRoutes from "./src/routes/evidence.ts";

const app = express();

// Middleware CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));

// Middleware JSON
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/evidence", evidenceRoutes);

// Servir frontend
app.use(express.static(staticPath));
app.get("*", (req, res) => res.sendFile(path.join(staticPath, "index.html")));

// Iniciar servidor
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`🚀 Backend rodando na porta ${port}`));



Rotas da API

Autenticação (/api/auth)

Método
Endpoint
Autenticação
Descrição
POST
/register
❌ Não
Registrar novo usuário
POST
/login
❌ Não
Login e obter JWT
GET
/profile
✅ JWT
Obter perfil do usuário




Exemplo: POST /api/auth/register

JSON


{
  "fullName": "João Silva",
  "email": "joao@example.com",
  "cpf": "123.456.789-10",
  "password": "Senha@123",
  "professionalType": "Perito",
  "professionalId": "12345",
  "professionalUf": "SP"
}



Resposta (201 Created):

JSON


{
  "message": "Usuário criado com sucesso!"
}






Evidências (/api/evidence)

Método
Endpoint
Autenticação
Descrição
POST
/register-hash
✅ JWT
Registrar nova custódia
GET
/list
✅ JWT
Listar evidências do usuário
POST
/verify
❌ Não
Verificar integridade
GET
/logs
✅ JWT
Listar logs de verificação




Exemplo: POST /api/evidence/register-hash

JSON


{
  "userId": 1,
  "fileName": "foto.jpg",
  "fileHash": "abc123...",
  "fileSize": 2048576,
  "mimeType": "image/jpeg",
  "clientName": "Caso #001",
  "professionalTitle": "Perito Forense",
  "professionalRegistry": "12345",
  "professionalUf": "SP"
}



Resposta (201 Created):

JSON


{
  "message": "Custódia registrada com sucesso!",
  "evidenceId": 42,
  "timestampSignature": "SAFEHASH-AUTH-20260626T143000Z"
}






Controladores

authController.ts

Funções:

1.
register(req, res)

•
Valida input com Zod

•
Verifica se email/CPF já existem

•
Hash de senha com bcrypt

•
Insere no banco

•
Retorna 201



2.
login(req, res)

•
Valida input com Zod

•
Busca usuário por email

•
Compara senha com bcrypt

•
Gera JWT com userId

•
Retorna token + dados



3.
profile(req, res)

•
Requer autenticação JWT

•
Busca dados do usuário

•
Conta total de evidências

•
Retorna perfil completo






evidenceController.ts

Funções:

1.
registerEvidence(req, res)

•
Valida input com Zod

•
Gera timestamp signature

•
Insere no banco

•
Retorna ID da evidência



2.
verifyIntegrity(req, res)

•
Recebe hash original e hash atual

•
Compara SHA-256

•
Registra log de verificação

•
Retorna resultado (válido/inválido)



3.
listEvidences(req, res)

•
Busca evidências por userId

•
Retorna array com todos os registros



4.
listLogs(req, res)

•
Busca logs de verificação

•
Retorna histórico de auditoria






Middlewares

authMiddleware.ts

Verifica JWT em requisições protegidas:

TypeScript


export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer token"
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Injeta dados do usuário
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};



Uso:

TypeScript


router.get('/profile', authenticateToken, profile);






Validação com Zod

validation.ts

TypeScript


import { z } from 'zod';

// Schema de registro
export const RegisterSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter 3+ caracteres"),
  email: z.string().email("Email inválido"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  password: z.string().min(8, "Senha deve ter 8+ caracteres"),
  professionalType: z.enum(['Perito', 'Advogado']),
  professionalId: z.string().optional(),
  professionalUf: z.string().length(2, "UF deve ter 2 caracteres")
});

// Schema de login
export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória")
});

// Schema de evidência
export const EvidenceSchema = z.object({
  userId: z.number().positive(),
  fileName: z.string().min(1),
  fileHash: z.string().length(64, "Hash deve ter 64 caracteres"),
  fileSize: z.number().positive(),
  mimeType: z.string(),
  clientName: z.string().optional(),
  professionalTitle: z.string().optional(),
  professionalRegistry: z.string().optional(),
  professionalUf: z.string().length(2).optional()
});



Uso:

TypeScript


const parsed = RegisterSchema.safeParse(req.body);
if (!parsed.success) {
  return res.status(400).json({ error: parsed.error.flatten() });
}
const { email, password } = parsed.data;






Banco de Dados (db.ts)

TypeScript


import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'safehash_db',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.getConnection()
  .then(() => console.log('✅ Conectado ao MySQL'))
  .catch((err) => console.error('❌ Erro MySQL:', err.message));

export default connection;



Uso:

TypeScript


const [rows] = await connection.execute(
  'SELECT * FROM users WHERE email = ?',
  [email]
);






🔐 Variáveis de Ambiente

Backend (server/.env)

Plain Text


# ============================================
# SERVIDOR
# ============================================
PORT=5000
NODE_ENV=development

# ============================================
# AUTENTICAÇÃO JWT
# ============================================
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# ============================================
# BANCO DE DADOS MYSQL
# ============================================
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=safehash_db
DB_PORT=3306

# ============================================
# CORS - ORIGENS PERMITIDAS
# ============================================
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000



Frontend (client/.env )

Plain Text


# ============================================
# FRONTEND - VITE
# ============================================
VITE_API_URL=http://localhost:5000/api

# ============================================
# OAUTH (Opcional - para integração futura )
# ============================================
# VITE_OAUTH_PORTAL_URL=https://oauth.example.com
# VITE_APP_ID=your-app-id-here



Descrição Detalhada

Variável
Tipo
Obrigatória
Descrição
PORT
number
Não
Porta do servidor (default: 5000 )
NODE_ENV
string
Não
Ambiente (development/production)
JWT_SECRET
string
SIM
Chave para assinar JWT (mude em produção!)
DB_HOST
string
Não
Host do MySQL (default: 127.0.0.1)
DB_USER
string
Não
Usuário MySQL (default: root)
DB_PASS
string
Não
Senha MySQL (default: vazio)
DB_NAME
string
Não
Nome do banco (default: safehash_db)
DB_PORT
number
Não
Porta MySQL (default: 3306)
ALLOWED_ORIGINS
string
Não
Origins CORS (separadas por vírgula)
VITE_API_URL
string
Não
URL da API (default: http://localhost:5000/api )







🚀 Scripts & Comandos

Desenvolvimento

Bash


# Instalar dependências
pnpm install

# Iniciar dev server (frontend + backend)
pnpm run dev

# Resultado esperado:
# ✓ Frontend rodando em http://localhost:3000
# ✓ Backend rodando em http://localhost:5000



Build & Produção

Bash


# Verificar TypeScript
pnpm run check

# Build para produção
pnpm run build

# Resultado: dist/public/ com frontend compilado + dist/index.js com backend

# Iniciar servidor em produção
pnpm run start

# Resultado: Backend rodando em http://localhost:5000



Testes

Bash


# Rodar testes E2E (Playwright )
pnpm exec playwright test

# Rodar testes com UI
pnpm exec playwright test --ui

# Rodar teste específico
pnpm exec playwright test tests-e2e/auth_robust.spec.ts



Formatação

Bash


# Formatar código com Prettier
pnpm run format

# Resultado: Todos os arquivos formatados






🔄 Fluxos Principais

1. Fluxo de Registro de Usuário

Plain Text


┌─────────────────────────────────────────────────────────┐
│ 1. Usuário acessa /register                             │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Preenche formulário (nome, email, CPF, senha)       │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Frontend valida com Zod                              │
│    - Email válido?                                      │
│    - CPF com checksum?                                  │
│    - Senha forte?                                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓ (Válido)
┌─────────────────────────────────────────────────────────┐
│ 4. POST /api/auth/register                              │
│    {fullName, email, cpf, password, ...}               │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Backend valida novamente com Zod                     │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 6. Verifica se email/CPF já existem                     │
│    SELECT * FROM users WHERE email = ? OR cpf = ?      │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓ (Não existe)
┌─────────────────────────────────────────────────────────┐
│ 7. Hash de senha com bcrypt (10 rounds)                 │
│    password_hash = await bcrypt.hash(password, 10)     │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 8. Insere no banco de dados                             │
│    INSERT INTO users (...)                              │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 9. Retorna 201 Created                                  │
│    { message: "Usuário criado com sucesso!" }          │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 10. Frontend redireciona para /login                    │
└─────────────────────────────────────────────────────────┘






2. Fluxo de Login

Plain Text


┌─────────────────────────────────────────────────────────┐
│ 1. Usuário acessa /login                                │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Preenche email e senha                               │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 3. POST /api/auth/login                                 │
│    { email, password }                                  │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Backend busca usuário por email                      │
│    SELECT * FROM users WHERE email = ?                 │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓ (Encontrado)
┌─────────────────────────────────────────────────────────┐
│ 5. Compara senha com bcrypt                             │
│    const match = await bcrypt.compare(password, hash)  │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓ (Válida)
┌─────────────────────────────────────────────────────────┐
│ 6. Gera JWT com userId                                  │
│    const token = jwt.sign(                              │
│      { userId, email },                                 │
│      JWT_SECRET,                                        │
│      { expiresIn: '24h' }                               │
│    )                                                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 7. Retorna 200 OK                                       │
│    { token, userId, userName }                          │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 8. Frontend armazena em localStorage                    │
│    localStorage.setItem('token', token)                │
│    localStorage.setItem('userId', userId)              │
│    localStorage.setItem('userName', userName)          │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 9. Redireciona para /dashboard                          │
└─────────────────────────────────────────────────────────┘






3. Fluxo de Registro de Custódia

Plain Text


┌─────────────────────────────────────────────────────────┐
│ 1. Usuário autenticado acessa /dashboard                │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Clica em "Selecionar Arquivo"                        │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Escolhe arquivo do computador                        │
│    const file = event.target.files[0]                  │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Frontend calcula SHA-256 (100% local)               │
│    const arrayBuffer = await file.arrayBuffer()        │
│    const hashBuffer = await crypto.subtle.digest(      │
│      'SHA-256',                                         │
│      arrayBuffer                                        │
│    )                                                    │
│    const hashHex = Array.from(hashBuffer)              │
│      .map(b => b.toString(16).padStart(2, '0'))       │
│      .join('')                                         │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Extrai metadados EXIF (se imagem)                   │
│    const exif = EXIF.getAllTags(image)                 │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 6. Preenche formulário com dados profissionais          │
│    - Cliente/Caso                                       │
│    - Título profissional                                │
│    - Registro profissional                              │
│    - UF                                                 │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 7. Clica "Registrar Custódia"                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 8. POST /api/evidence/register-hash                     │
│    Authorization: Bearer {token}                        │
│    {                                                    │
│      userId, fileName, fileHash, fileSize,             │
│      mimeType, clientName, professionalTitle, ...      │
│    }                                                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 9. Backend verifica autenticação                        │
│    const decoded = jwt.verify(token, JWT_SECRET)       │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓ (Válido)
┌─────────────────────────────────────────────────────────┐
│ 10. Valida input com Zod                                │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓ (Válido)
┌─────────────────────────────────────────────────────────┐
│ 11. Gera timestamp signature                            │
│     const ts = new Date().toISOString()                 │
│     const sig = `SAFEHASH-AUTH-${ts}`                   │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 12. Insere no banco de dados                            │
│     INSERT INTO evidences (...)                         │
│     VALUES (...)                                        │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 13. Retorna 201 Created                                 │
│     { message: "Custódia registrada!", evidenceId }    │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 14. Frontend mostra toast de sucesso                    │
│     toast.success("Custódia registrada com sucesso!")   │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 15. Atualiza lista de evidências                        │
│     fetchEvidences()                                    │
└─────────────────────────────────────────────────────────┘






4. Fluxo de Verificação de Integridade

Plain Text


┌─────────────────────────────────────────────────────────┐
│ 1. Usuário (qualquer pessoa) acessa /verify             │
│    (Não requer autenticação)                            │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Seleciona arquivo original                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Frontend calcula SHA-256 do arquivo                  │
│    (Mesmo processo do registro)                         │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Insere o hash registrado (do protocolo)              │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Clica "Verificar Integridade"                        │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 6. POST /api/evidence/verify                            │
│    {                                                    │
│      currentHash: "abc123...",                          │
│      originalHash: "abc123..."                          │
│    }                                                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 7. Backend compara hashes                               │
│    if (currentHash === originalHash) {                  │
│      isValid = true                                     │
│    } else {                                             │
│      isValid = false                                    │
│    }                                                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 8. Registra log de verificação                          │
│    INSERT INTO verification_logs (                      │
│      evidence_id, is_valid, ip_address                  │
│    )                                                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 9. Retorna resultado                                    │
│    { isValid: true/false, message: "..." }             │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 10. Frontend mostra resultado visual                    │
│     ✅ Íntegro (verde)                                  │
│     ❌ Violado (vermelho)                               │
└─────────────────────────────────────────────────────────┘






🔒 Segurança

Autenticação

•
JWT (JSON Web Tokens): Stateless, sem sessões no servidor

•
Expiração: 24 horas (configurável)

•
Algoritmo: HS256 (HMAC SHA-256)

•
Secret: Deve ser forte e único por ambiente

Criptografia de Senhas

•
Bcrypt: Hash com salt automático

•
Rounds: 10 (padrão seguro)

•
Comparação: Timing-safe (resiste a timing attacks)

Validação

•
Zod: Validação de schema rigorosa

•
Client-side: Feedback imediato

•
Server-side: Validação obrigatória (nunca confiar no cliente)

CORS

•
Whitelist: Apenas origens permitidas

•
Credentials: Suportado para cookies

•
Methods: GET, POST, PUT, DELETE, OPTIONS

Hash SHA-256

•
Client-side: Arquivo NUNCA sai do PC

•
Algoritmo: FIPS 180-4 (padrão NIST)

•
Tamanho: 256 bits (64 caracteres hexadecimais)

•
Colisão: Computacionalmente impossível

Trilha de Auditoria

•
Logs: Cada verificação é registrada

•
IP: Rastreabilidade de quem verificou

•
Timestamp: Momento exato da operação

•
Imutável: Não pode ser alterada (constraints FK)




🚀 Deploy & Produção

Preparação para Deploy

1. Gerar JWT_SECRET Forte

Bash


openssl rand -base64 32
# Resultado: abc123xyz789...



2. Configurar Variáveis de Produção

Plain Text


# server/.env (produção)
PORT=5000
NODE_ENV=production
JWT_SECRET=<valor-gerado-acima>
DB_HOST=<seu-host-mysql>
DB_USER=<seu-usuario>
DB_PASS=<sua-senha>
DB_NAME=safehash_db
DB_PORT=3306
ALLOWED_ORIGINS=https://seu-dominio.com,https://www.seu-dominio.com



3. Build para Produção

Bash


pnpm run build

# Resultado:
# ✓ dist/public/ - Frontend compilado (HTML, CSS, JS )
# ✓ dist/index.js - Backend bundled



4. Testar Localmente

Bash


NODE_ENV=production pnpm run start

# Acessar: http://localhost:5000



Deploy em Vercel

Pré-requisitos

•
Conta Vercel (https://vercel.com )

•
Repositório GitHub

•
Banco de dados MySQL externo (PlanetScale, Aiven, etc)

Passos

1.
Conectar GitHub

•
Ir em https://vercel.com/new

•
Selecionar repositório



2.
Configurar Build

•
Build Command: pnpm run build

•
Output Directory: dist/public

•
Install Command: pnpm install



3.
Configurar Variáveis de Ambiente

•
Adicionar todas as variáveis do .env

•
Especialmente: JWT_SECRET, DB_*, ALLOWED_ORIGINS



4.
Deploy

•
Clicar em "Deploy"

•
Aguardar build (2-5 minutos )

•
Acessar URL gerada



Deploy em Railway / Render

Similar a Vercel, mas com suporte melhor a servidores Node.js de longa duração.




🐛 Troubleshooting

Problema: "Erro ao conectar no banco de dados"

Causa: MySQL não está rodando ou credenciais incorretas

Solução:

Bash


# Verificar se MySQL está rodando
mysql -u root -p

# Testar conexão
mysql -h 127.0.0.1 -u root -p safehash_db -e "SELECT 1;"






Problema: "JWT_SECRET não definido"

Causa: Variável de ambiente não configurada

Solução:

Bash


# Adicionar ao server/.env
JWT_SECRET=seu-valor-aqui

# Reiniciar servidor
pnpm run dev






Problema: "CORS não permitido"

Causa: Frontend e backend em origens diferentes

Solução:

Plain Text


# server/.env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000,https://seu-dominio.com






Problema: "Hash SHA-256 diferente"

Causa: Arquivo foi modificado

Solução:

•
Verificar se arquivo original está íntegro

•
Recarregar página e tentar novamente

•
Verificar se não há corrupção de dados




Problema: "Erro 401 Unauthorized"

Causa: Token JWT inválido ou expirado

Solução:

Bash


# Fazer login novamente
# Token será renovado automaticamente






📚 Referências & Documentação

Documentação Oficial

•
React: https://react.dev

•
TypeScript: https://www.typescriptlang.org

•
Vite: https://vitejs.dev

•
TailwindCSS: https://tailwindcss.com

•
Express: https://expressjs.com

•
MySQL: https://dev.mysql.com

•
Zod: https://zod.dev

•
JWT: https://jwt.io

Padrões & Conformidade

•
ISO 27037: Diretrizes para Perícia Forense Digital

•
Art. 158-B CPP: Código de Processo Penal Brasileiro

•
FIPS 180-4: Padrão SHA-256

•
RFC 3161: Timestamp Protocol




📞 Suporte & Contato

Para dúvidas ou problemas:

1.
Verificar esta documentação

2.
Consultar README.md

3.
Revisar código comentado

4.
Abrir issue no GitHub




Documentação Completa - SafeHash TCC v1.0.0
Última atualização: 26 de Junho de 2026
Status: ✅ Pronto para Produção

