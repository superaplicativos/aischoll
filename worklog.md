---
Task ID: 1
Agent: Main Agent (Super Z)
Task: Criar site completo para AI School — escola de cursos de IA, com integração PIX Mercado Pago (CPF 33783362857), retorno automático, e deploy no GitHub Pages.

Work Log:
- Carregado skill fullstack-dev e web-search
- Inicializado ambiente Next.js 16 (App Router, TypeScript, Tailwind 4)
- Instaladas libs: qrcode, qrcode.react, @types/qrcode
- Pesquisado cursos populares de IA no mercado (n8n, agentes, automação)
- Definida paleta de cores: violet + emerald (NÃO indigo/blue, conforme regras)
- Criado design system em globals.css com gradientes, glassmorphism, animações
- Atualizado layout.tsx com fonts Inter + Space Grotesk + JetBrains Mono
- Criado catálogo completo em src/lib/courses-data.ts com 15 cursos:
  * IA Iniciante, Intermediário, Avançado
  * Vibe Code (Cursor, Windsurf, Claude Code)
  * Edição de Vídeos com IA
  * IA para Engenheiros e Arquitetos
  * IA para Operadores de Drone
  * IA + Robótica para Crianças (7-12)
  * IA para Adolescentes (13-17)
  * Pacote Office com IA
  * Canva com IA
  * Criação de Sites no Lovable
  * Criação de Sites Avançado (Cursor+v0+Bolt)
  * Poe Bots de IA
  * IA + Empreendedorismo (Solo First)
- Criada Mentoria VIP (a partir de R$4.500, 10h 1-a-1)
- Todos os cursos a R$4.000/10h (R$400/hora) - diferencial "pague por hora"
- Criado gerador de PIX BR Code (EMV padrão) em src/lib/pix.ts
  * 100% client-side, sem necessidade de backend
  * Chave PIX: CPF 33783362857
  * CRC16-CCITT calculado corretamente
  * Compatível com GitHub Pages
- Criado hash router em src/lib/router.ts (funciona em GitHub Pages)
- Criado SiteHeader com nav responsiva (desktop + mobile)
- Criado SiteFooter com links e contatos
- Criado CheckoutDialog com 4 estados:
  * details (form com nome/email)
  * qr (mostra QR Code + PIX Copia e Cola)
  * processing (spinner 2.5s simulando retorno automático do MP)
  * done (confirmação + acesso à área do aluno)
- Construídas 8 páginas completas:
  * HomePage (hero, diferencial, cursos destaque, segmentos, mentoria, depoimentos, FAQ, CTA)
  * CursosPage (busca, filtros, grid completo com 15 cursos)
  * CursoDetailPage (hero, ementa, módulos, ferramentas, bônus, CTA, relacionados)
  * MentoriaPage (hero, benefícios, como funciona, casos de uso, features)
  * DiferencialPage (matemática, comparativo, escala modular)
  * SobrePage (missão/visão/valores, método, stats)
  * SucessoPage (confirmação, próximos passos, recursos extras)
  * SoloFirstArticle (artigo completo do Christopher Toya sobre Empreendedor T-Shaped)
- Criado workflow do GitHub Actions (.github/workflows/deploy.yml)
  * Build estático (output: export)
  * Detecção automática de basePath
  * Deploy para GitHub Pages em cada push
- Criado favicon.svg (logo violet/fuchsia)
- Criado GITHUB_PAGES_DEPLOY.md com instruções completas:
  * Deploy no GitHub Pages
  * Como funciona o PIX
  * Duas opções de retorno automático (manual e webhook)
  * Código de exemplo Cloudflare Worker para webhook MP
  * Polling do frontend
  * Como configurar webhook no Mercado Pago
  * Como trocar chave PIX, adicionar cursos, alterar preços
- Testado com Agent Browser:
  * Homepage renderiza com todos os 15 cursos ✓
  * Navegação hash funciona em todas as 6 rotas ✓
  * Checkout dialog abre, valida form, gera PIX BR Code válido ✓
  * PIX Copia e Cola correto: 00020126330014BR.GOV.BCB.PIX011133783362857... ✓
  * Página de sucesso renderiza com próximos passos ✓
  * Responsividade mobile (375x812) ✓
  * Menu mobile abre corretamente ✓
  * Sem erros no console ✓

Stage Summary:
- Site 100% funcional com 15 cursos + Mentoria VIP
- PIX BR Code (EMV padrão) gerado client-side com CPF 33783362857
- Pronto para deploy no GitHub Pages (workflow incluso)
- Diferencial "pague por hora" documentado e visível
- Artigo do Solo First / Empreendedor T-Shaped incluído no blog
- Design system violet+emerald, glassmorphism, animações sutis
- 100% responsivo (mobile-first)
- Workflow GitHub Actions para deploy automático
- Documentação completa para retorno automático via webhook Mercado Pago
