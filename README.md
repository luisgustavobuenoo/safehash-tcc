# Exterro FTK Imager Clone - Projeto React + Tailwind CSS

Uma cópia fiel e profissional do site Exterro FTK Imager, construída com React 19, TypeScript, Tailwind CSS 4 e componentes shadcn/ui. Projeto completo com documentação, componentes reutilizáveis e estrutura escalável.

## 🎯 Características

✅ **Replica fiel** do site original com layout, cores e conteúdo  
✅ **React 19** com TypeScript para type safety  
✅ **Tailwind CSS 4** para styling moderno  
✅ **shadcn/ui** componentes prontos para uso  
✅ **Componentes reutilizáveis** bem estruturados  
✅ **Dados em JSON** para fácil manutenção  
✅ **Documentação completa** (ARCHITECTURE.md, COMPONENTS.md)  
✅ **Responsivo** mobile-first  
✅ **Acessível** com semântica HTML correta  
✅ **Animações suaves** com Framer Motion  

## 📋 Pré-requisitos

- Node.js 18+
- pnpm 10+

## 🚀 Quick Start

### 1. Instalar Dependências
```bash
cd exterro-ftk-imager-clone
pnpm install
```

### 2. Iniciar Servidor de Desenvolvimento
```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### 3. Build para Produção
```bash
pnpm build
```

### 4. Preview da Build
```bash
pnpm preview
```

## 📁 Estrutura do Projeto

```
exterro-ftk-imager-clone/
├── client/
│   ├── public/                 # Arquivos estáticos (favicon, robots.txt)
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── CapabilitiesSection.tsx
│   │   │   ├── TestimonialSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── ResourcesSection.tsx
│   │   │   ├── ComparisonSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── pages/              # Páginas
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── data/               # Dados JSON
│   │   │   ├── features.json
│   │   │   ├── faq.json
│   │   │   ├── resources.json
│   │   │   └── config.json
│   │   ├── hooks/              # Custom hooks
│   │   ├── contexts/           # React contexts
│   │   ├── lib/                # Utilitários
│   │   ├── App.tsx             # Componente raiz
│   │   ├── main.tsx            # Entrada React
│   │   └── index.css           # Estilos globais
│   ├── index.html
│   └── vite.config.ts
├── server/                     # Servidor Express (placeholder)
├── shared/                     # Código compartilhado
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── ARCHITECTURE.md             # Documentação de arquitetura
├── COMPONENTS.md               # Documentação de componentes
└── README.md                   # Este arquivo
```

## 🎨 Seções Implementadas

### 1. Header
- Navegação com dropdowns
- Logo Exterro
- Botões "Get Demo" e "Free Download"
- Menu responsivo

### 2. Hero Section
- Banner com imagem de fundo
- Título e subtítulo
- Botões de ação
- Breadcrumb de categoria

### 3. Features Section
- Grid de 3 features principais
- Ícones dinâmicos (Lucide)
- Descrições

### 4. Capabilities Section
- 7 capacidades detalhadas
- Layout alternado (imagem + texto)
- Descrições expandidas

### 5. Testimonial Section
- Depoimento de cliente
- Autor e cargo
- Imagem de fundo

### 6. FAQ Section
- Accordion com 6 perguntas
- Dados de `faq.json`
- Animações suaves

### 7. Resources Section
- 3 tipos de recursos
- Product Brief, Infographic, Whitepaper
- Cards com descrição

### 8. Comparison Section
- Comparação Free vs Pro
- 3 casos de uso
- CTA para versão Pro

### 9. CTA Section
- Seção de conversão final
- Botão de download
- Mensagem de urgência

### 10. Footer
- Links de navegação
- Informações legais
- Copyright

## 📊 Dados Estruturados

Todos os dados estão em arquivos JSON em `client/src/data/`:

### features.json
```json
{
  "features": [...],
  "capabilities": [...]
}
```

### faq.json
```json
{
  "faqs": [...]
}
```

### resources.json
```json
{
  "resources": [...],
  "useCases": [...]
}
```

### config.json
```json
{
  "app": {...},
  "hero": {...},
  "overview": {...},
  "testimonial": {...},
  "comparison": {...},
  "footer": {...}
}
```

## 🎨 Customização

### Modificar Cores
Edite `client/src/index.css` para alterar a paleta de cores:

```css
:root {
  --primary: #0066CC;
  --secondary: #F5F5F5;
  --accent: #FF6B35;
  /* ... outras cores */
}
```

### Modificar Conteúdo
Edite os arquivos JSON em `client/src/data/`:

```json
{
  "features": [
    {
      "id": 1,
      "title": "Seu título",
      "description": "Sua descrição",
      "icon": "IconName"
    }
  ]
}
```

### Adicionar Componente
1. Crie novo arquivo em `client/src/components/`
2. Importe em `client/src/pages/Home.tsx`
3. Adicione à página

### Adicionar Página
1. Crie novo arquivo em `client/src/pages/`
2. Adicione rota em `client/src/App.tsx`

## 🔧 Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 19.2.1 | Framework UI |
| TypeScript | 5.6.3 | Type safety |
| Tailwind CSS | 4.1.14 | Styling |
| Vite | 7.1.7 | Build tool |
| Wouter | 3.3.5 | Roteamento |
| shadcn/ui | Latest | Componentes |
| Lucide React | 0.453.0 | Ícones |
| Framer Motion | 12.23.22 | Animações |
| Sonner | 2.0.7 | Toasts |

## 📱 Responsividade

Breakpoints Tailwind:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

Todos os componentes são mobile-first e responsivos.

## ♿ Acessibilidade

- Semântica HTML correta
- ARIA labels onde necessário
- Contraste de cores adequado
- Navegação por teclado
- Focus rings visíveis

## 🚀 Deploy

### Opção 1: Manus Hosting
```bash
# Criar checkpoint
pnpm build

# Publicar via UI Manus
```

### Opção 2: Vercel
```bash
npm install -g vercel
vercel
```

### Opção 3: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 📚 Documentação

- **ARCHITECTURE.md**: Visão geral da arquitetura
- **COMPONENTS.md**: Documentação detalhada de componentes
- **README.md**: Este arquivo

## 🐛 Troubleshooting

### Porta 3000 já está em uso
```bash
# Usar porta diferente
pnpm dev -- --port 3001
```

### Estilos Tailwind não aplicam
```bash
# Limpar cache
rm -rf node_modules/.vite
pnpm dev
```

### Erro de TypeScript
```bash
# Verificar tipos
pnpm check
```

## 📝 Scripts Disponíveis

```bash
pnpm dev          # Iniciar servidor de desenvolvimento
pnpm build        # Build para produção
pnpm preview      # Preview da build
pnpm check        # Verificar tipos TypeScript
pnpm format       # Formatar código com Prettier
```

## 🤝 Contribuindo

Para modificar o projeto:

1. Crie uma branch
2. Faça suas alterações
3. Teste localmente
4. Commit com mensagens claras

## 📄 Licença

Este projeto é uma cópia educacional do site Exterro FTK Imager.

## 🔗 Links Úteis

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)

## 📧 Suporte

Para dúvidas ou problemas, consulte:
- ARCHITECTURE.md
- COMPONENTS.md
- Código comentado

## ✨ Próximos Passos

1. Personalizar com sua marca
2. Adicionar mais páginas
3. Integrar com backend (opcional)
4. Adicionar dark mode
5. Implementar analytics

---

**Desenvolvido com ❤️ usando React + Tailwind CSS**
