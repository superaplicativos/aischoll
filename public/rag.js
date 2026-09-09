/**
 * AI School - RAG (Retrieval-Augmented Generation) Local
 * Base de conhecimento completa + retrieval inteligente
 *
 * Vantagens:
 * - 100% client-side, sem CORS, sem API externa
 * - Resposta imediata (sem latência de rede)
 * - Sem custo, sem rate limit
 * - Funciona offline
 *
 * Como funciona:
 * 1. Knowledge base estruturada (cursos, professores, FAQ, conceitos)
 * 2. Retrieval: encontra os 3-5 chunks mais relevantes pra pergunta
 * 3. Geração: monta resposta natural com base no que recuperou
 */
(function () {
  'use strict';

  // ===== PROFESSORES POR ÁREA =====
  const PROFESSORES = {
    'ia': [
      { nome: 'Christopher Toya', areas: ['IA', 'Empreendedorismo', 'Vibe Code'], bio: 'Fundador da AI School, criador do Solo First Framework. 15+ anos em IA.' },
      { nome: 'Marina Costa', areas: ['IA Iniciante', 'ChatGPT', 'Gemini'], bio: 'Especialista em IA aplicada, ex-Google. Mestre em IA pela USP.' },
      { nome: 'Rodrigo Almeida', areas: ['Automação', 'n8n', 'RAG'], bio: 'Engenheiro de IA, ex-Nubank. Construiu 50+ automações em produção.' },
    ],
    'programacao': [
      { nome: 'Felipe Andrade', areas: ['Python', 'JavaScript', 'Node.js'], bio: 'Full-stack developer, 12 anos de experiência. Ex-iFood.' },
      { nome: 'Carla Mendes', areas: ['React', 'Next.js', 'TypeScript'], bio: 'Front-end specialist, contribuidora open-source.' },
      { nome: 'Bruno Lima', areas: ['HTML/CSS', 'Vibe Code', 'Lovable'], bio: 'Designer virado dev pelo Vibe Coding. Especialista em no-code.' },
    ],
    'design': [
      { nome: 'Patrícia Souza', areas: ['Photoshop', 'Illustrator', 'Identidade Visual'], bio: 'Designer gráfico, 18 anos de mercado. Premiada pelo ADG.' },
      { nome: 'Lucas Ferreira', areas: ['Figma', 'UX/UI', 'Design System'], bio: 'Lead designer, ex-Creditas. Especialista em UX research.' },
    ],
    'marketing': [
      { nome: 'Amanda Ribeiro', areas: ['Meta Ads', 'Google Ads', 'Social Media'], bio: 'Especialista em tráfego pago, R$ 50M+ gerenciados em ads.' },
      { nome: 'João Pedro', areas: ['SEO', 'Copywriting', 'Email Marketing'], bio: 'Head de Growth, ex-RD Station. ESCP Business School.' },
    ],
    'negocios': [
      { nome: 'Christopher Toya', areas: ['Empreendedorismo', 'Solo First', 'Canvas'], bio: 'Fundador da AI School, criador do Solo First Framework.' },
      { nome: 'Renata Alves', areas: ['E-commerce', 'Dropshipping', 'Shopify'], bio: 'Empreendedora, faturou R$ 10M em e-commerce em 3 anos.' },
    ],
    'criatividade': [
      { nome: 'Marina Costa', areas: ['Edição de Vídeo', 'CapCut', 'Gemini'], bio: 'Criadora de conteúdo, 500k seguidores no YouTube.' },
      { nome: 'Pedro Lucas', areas: ['Premiere', 'After Effects', 'Motion'], bio: 'Editor profissional, trabalhou em Globo e SBT.' },
    ],
    'produtividade': [
      { nome: 'Carla Mendes', areas: ['Excel', 'Power BI', 'Office'], bio: 'Analista de BI certificada Microsoft.' },
      { nome: 'Lucas Ferreira', areas: ['Notion', 'Gestão de Tempo'], bio: 'Productivity coach, Notion Ambassador.' },
    ],
    'infanto-juvenil': [
      { nome: 'Fernanda Oliveira', areas: ['Robótica Infantil', 'Scratch', 'Lego'], bio: 'Pedagoga especialista em tecnologia educacional.' },
      { nome: 'Túlio Santos', areas: ['Programação Teen', 'Games', 'App'], bio: 'Desenvolvedor e educador juvenil, 8 anos com adolescentes.' },
    ],
    'informatica': [
      { nome: 'Carla Mendes', areas: ['Excel', 'Word', 'PowerPoint', 'Office'], bio: 'Analista de BI certificada Microsoft.' },
      { nome: 'Sandra Lima', areas: ['Informática Básica', 'Windows', 'Internet'], bio: 'Instrutora há 20 anos, especialista em iniciantes.' },
    ],
    'profissional': [
      { nome: 'Rodrigo Almeida', areas: ['Engenharia', 'BIM', 'Revit'], bio: 'Engenheiro civil, especialista em IA para construção.' },
      { nome: 'Márcio Drone', areas: ['Drone', 'Mapeamento', 'Inspeção'], bio: 'Piloto ANAC, 10 anos em aerolevantamento.' },
    ],
    'mentoria': [
      { nome: 'Christopher Toya', areas: ['Mentoria VIP', 'Solo First'], bio: 'Fundador da AI School, mentor de 200+ empreendedores solo.' },
    ],
  };

  // ===== CATÁLOGO COMPLETO DE CURSOS =====
  const CURSOS = [
    // === IA ===
    { slug: 'ia-iniciante', titulo: 'IA Iniciante: ChatGPT e Gemini do Zero', nivel: 'Iniciante', area: 'IA', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Qualquer pessoa que quer começar com IA', ferramentas: ['ChatGPT', 'Gemini', 'Gemini Imagen', 'Perplexity'], professor: 'Marina Costa', oque_aprende: ['Dominar ChatGPT e Gemini', 'Fórmula CRISPE de prompts', 'Criar imagens com Gemini Imagen', 'Aplicar IA no trabalho e estudos', 'Certificado digital'] },
    { slug: 'ia-intermediario', titulo: 'IA Intermediário: Automação com Gemini + n8n', nivel: 'Intermediário', area: 'IA', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais que já usam ChatGPT e querem automatizar', ferramentas: ['n8n', 'Make.com', 'Gemini', 'Google Workspace'], professor: 'Rodrigo Almeida', oque_aprende: ['Construir agentes de IA', 'Automatizar tarefas com n8n', 'Conectar IA com Gmail, Sheets, WhatsApp', 'Criar RAG básico', '10 templates de automação'] },
    { slug: 'ia-avancado', titulo: 'IA Avançado: APIs, RAG, Agentes, MCP', nivel: 'Avançado', area: 'IA', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Desenvolvedores, CTOs, analistas de dados', ferramentas: ['OpenAI API', 'Anthropic API', 'LangChain', 'Pinecone', 'MCP'], professor: 'Rodrigo Almeida', oque_aprende: ['APIs de LLM (OpenAI, Anthropic, Google)', 'Agentes autônomos com LangGraph', 'RAG em produção com vector DB', 'Model Context Protocol (MCP)', 'Eval e guardrails'] },
    { slug: 'automacao-modular', titulo: 'Automação com IA (Curso Modular)', nivel: 'Avançado', area: 'IA', preco: 12000, presencial: 13500, duracao: 'Mínimo 3 módulos de 10h', publico: 'Empresas e profissionais que precisam de automação profissional', ferramentas: ['n8n', 'LangChain', 'Gemini', 'APIs Google'], professor: 'Rodrigo Almeida', oque_aprende: ['Módulo 1: Fundamentos de automação com IA', 'Módulo 2: Agentes autônomos e RAG', 'Módulo 3: Deploy em produção + monitoramento', 'Consultoria de implementação'] },
    { slug: 'vibe-code', titulo: 'Vibe Code: Programe com IA', nivel: 'Iniciante', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores, designers, qualquer pessoa que queira criar apps', ferramentas: ['Cursor', 'Gemini Code Assist', 'v0', 'Lovable'], professor: 'Bruno Lima', oque_aprende: ['Construir apps reais sem saber programar', 'Dominar Cursor + Gemini Code Assist', 'Publicar 2 apps no ar em 10 horas', 'Deploy na Vercel com domínio próprio'] },
    { slug: 'poe-bots-ia', titulo: 'Poe: Crie Seus Próprios Bots de IA', nivel: 'Intermediário', area: 'IA', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Criadores, empreendedores, suporte', ferramentas: ['Poe', 'GPT-4', 'Claude', 'Llama'], professor: 'Marina Costa', oque_aprende: ['Criar bots personalizados em 5 minutos', 'Usar múltiplos modelos', 'Subir knowledge base com seus PDFs', 'Publicar na Poe Store', 'Monetizar com bots'] },

    // === INFORMÁTICA ===
    { slug: 'informatica-basica', titulo: 'Informática Básica Completa', nivel: 'Iniciante', area: 'Informática', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Iniciantes, aposentados, donas de casa, estudantes', ferramentas: ['Windows', 'Navegador', 'E-mail', 'Pendrive', 'Google Drive'], professor: 'Sandra Lima', oque_aprende: ['Windows do zero', 'Navegação na internet', 'E-mail (Gmail/Outlook)', 'Organização de arquivos', 'Google Drive e produtividade'] },
    { slug: 'word-profissional', titulo: 'Word Profissional', nivel: 'Iniciante', area: 'Informática', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais administrativos, estudantes', ferramentas: ['Microsoft Word', 'Google Docs'], professor: 'Carla Mendes', oque_aprende: ['Formatação profissional', 'Tabelas e imagens', 'Mala direta', 'Estilos e sumário automático', 'Modelos reutilizáveis'] },
    { slug: 'excel-do-zero', titulo: 'Excel do Zero ao Avançado', nivel: 'Iniciante ao Avançado', area: 'Informática', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais administrativos, analistas, estudantes', ferramentas: ['Microsoft Excel', 'Planilhas Google'], professor: 'Carla Mendes', oque_aprende: ['Fórmulas básicas e avançadas', 'PROCV, PROCH, ÍNDICE+CORRESP', 'Tabelas dinâmicas', 'Dashboards automáticos', 'Gráficos profissionais'] },
    { slug: 'excel-recem-admitidos', titulo: 'Excel para Recém-Admitidos', nivel: 'Iniciante', area: 'Informática', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Quem acabou de ser admitido e precisa dominar Excel rápido', ferramentas: ['Excel', 'Copilot', 'Power BI'], professor: 'Carla Mendes', oque_aprende: ['Excel do zero ao avançado em 10h', 'Copilot do Microsoft 365', 'Dashboards automáticos com IA', 'Apresentar resultados no 1º mês de trabalho'] },
    { slug: 'powerpoint-apresentacoes', titulo: 'PowerPoint: Apresentações Profissionais', nivel: 'Iniciante', area: 'Informática', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais, professores, estudantes', ferramentas: ['PowerPoint', 'Canva', 'Copilot'], professor: 'Carla Mendes', oque_aprende: ['Design de slides profissional', 'Animações e transições', 'Templates corporativos', 'Storytelling visual', 'Apresentações com IA via Copilot'] },
    { slug: 'office-copilot', titulo: 'Pacote Office com Copilot (IA)', nivel: 'Iniciante', area: 'Informática', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais que usam Excel/Word/PowerPoint', ferramentas: ['Microsoft 365 Copilot', 'Excel', 'Word', 'PowerPoint'], professor: 'Carla Mendes', oque_aprende: ['Análise de dados em linguagem natural', 'Apresentações em 60 segundos', 'E-mails automáticos no Outlook', 'Power Automate entre apps', '50 templates prontos'] },
    { slug: 'google-workspace', titulo: 'Google Workspace Completo', nivel: 'Iniciante', area: 'Informática', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empresas, freelancers, estudantes', ferramentas: ['Gmail', 'Docs', 'Sheets', 'Slides', 'Drive'], professor: 'Carla Mendes', oque_aprende: ['Gmail profissional com IA', 'Docs colaborativos', 'Sheets com fórmulas avançadas', 'Apresentações no Slides', 'Drive e compartilhamento'] },

    // === PROGRAMAÇÃO ===
    { slug: 'html-css-basico', titulo: 'HTML e CSS: Crie Seus Primeiros Sites', nivel: 'Iniciante', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Iniciantes em programação web', ferramentas: ['HTML5', 'CSS3', 'VS Code'], professor: 'Felipe Andrade', oque_aprende: ['Estrutura HTML semântica', 'CSS moderno (Flexbox e Grid)', 'Sites responsivos', 'Publicar na Vercel', 'Boas práticas'] },
    { slug: 'javascript-basico', titulo: 'JavaScript Moderno do Zero', nivel: 'Iniciante', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Iniciantes que querem programar pra web', ferramentas: ['JavaScript', 'VS Code', 'Node.js'], professor: 'Felipe Andrade', oque_aprende: ['Sintaxe moderna (ES6+)', 'DOM e eventos', 'Async/await e Promises', 'Fetch API', 'Mini projeto real'] },
    { slug: 'python-basico', titulo: 'Python do Zero', nivel: 'Iniciante', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Iniciantes, analistas de dados, cientistas', ferramentas: ['Python', 'Jupyter', 'Pandas'], professor: 'Felipe Andrade', oque_aprende: ['Sintaxe Python', 'Estruturas de dados', 'Funções e módulos', 'Manipulação de arquivos', 'Introdução ao Pandas'] },
    { slug: 'python-dados', titulo: 'Python para Análise de Dados', nivel: 'Intermediário', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Analistas, cientistas de dados', ferramentas: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'], professor: 'Felipe Andrade', oque_aprende: ['Pandas avançado', 'Manipulação de DataFrames', 'Visualização com Matplotlib/Seaborn', 'Análise exploratória', 'Dashboard com Streamlit'] },
    { slug: 'react-nextjs', titulo: 'React + Next.js (Avançado)', nivel: 'Avançado', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Desenvolvedores front-end', ferramentas: ['React', 'Next.js', 'TypeScript', 'Tailwind'], professor: 'Carla Mendes', oque_aprende: ['Next.js App Router', 'Server Components', 'API Routes', 'Auth com NextAuth', 'Deploy na Vercel'] },
    { slug: 'nodejs-api', titulo: 'Node.js: APIs do Zero ao Deploy', nivel: 'Intermediário', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Desenvolvedores back-end', ferramentas: ['Node.js', 'Express', 'MongoDB', 'Postman'], professor: 'Felipe Andrade', oque_aprende: ['Express e middlewares', 'Banco de dados (SQL e NoSQL)', 'Autenticação JWT', 'Documentação Swagger', 'Deploy em produção'] },
    { slug: 'sql-banco-dados', titulo: 'SQL e Bancos de Dados', nivel: 'Intermediário', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Desenvolvedores, analistas, DBAs iniciantes', ferramentas: ['MySQL', 'PostgreSQL', 'SQLite'], professor: 'Felipe Andrade', oque_aprende: ['DDL, DML, DQL', 'Joins e subqueries', 'Índices e performance', 'Modelagem relacional', 'Otimização de queries'] },
    { slug: 'criacao-sites-lovable', titulo: 'Criação de Sites no Lovable (No-Code)', nivel: 'Iniciante', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores, designers, pequenos negócios', ferramentas: ['Lovable', 'Supabase', 'Vercel'], professor: 'Bruno Lima', oque_aprende: ['Publicar 3 projetos no ar', 'Integração com Supabase', 'Landing page de alta conversão', 'Deploy em domínio próprio'] },
    { slug: 'criacao-sites-avancado', titulo: 'Criação de Sites Avançado (Cursor + v0)', nivel: 'Avançado', area: 'Programação', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Desenvolvedores, designers técnicos, fundadores', ferramentas: ['Cursor', 'v0', 'Bolt.new', 'Next.js'], professor: 'Carla Mendes', oque_aprende: ['Cursor Composer + Agent mode', 'Gerar UIs completas com v0', 'Auth + banco com Supabase', 'Pagamentos com Stripe', 'Publicar um SaaS no ar'] },

    // === DESIGN ===
    { slug: 'photoshop-basico', titulo: 'Photoshop do Zero', nivel: 'Iniciante', area: 'Design', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Designers iniciantes, fotógrafos, social media', ferramentas: ['Adobe Photoshop'], professor: 'Patrícia Souza', oque_aprende: ['Interface e ferramentas', 'Camadas e máscaras', 'Edição de fotos', 'Composições', 'Exportação profissional'] },
    { slug: 'illustrator-basico', titulo: 'Illustrator: Vetores e Identidade Visual', nivel: 'Iniciante', area: 'Design', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Designers, ilustradores', ferramentas: ['Adobe Illustrator'], professor: 'Patrícia Souza', oque_aprende: ['Vetores e ilustrações', 'Logo e identidade visual', 'Tipografia', 'Vetorização', 'Mockups'] },
    { slug: 'canva-ia', titulo: 'Canva com IA (Magic Studio)', nivel: 'Iniciante', area: 'Design', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores, social media, professores', ferramentas: ['Canva Pro', 'Magic Studio', 'Gemini'], professor: 'Lucas Ferreira', oque_aprende: ['Magic Design: do prompt ao layout', 'Magic Edit com IA', 'Branding completo', 'Templates para social media', 'Apresentações profissionais'] },
    { slug: 'figma-ux-ui', titulo: 'Figma + UX/UI Design', nivel: 'Intermediário', area: 'Design', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Designers, UX designers, front-end', ferramentas: ['Figma', 'Design System'], professor: 'Lucas Ferreira', oque_aprende: ['Figma profissional', 'Design System', 'Prototipagem interativa', 'UX research básico', 'Handoff pra dev'] },
    { slug: 'identidade-visual', titulo: 'Identidade Visual e Branding', nivel: 'Intermediário', area: 'Design', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Designers, empreendedores', ferramentas: ['Illustrator', 'Canva', 'Figma'], professor: 'Patrícia Souza', oque_aprende: ['Criação de logo', 'Paleta e tipografia', 'Manual da marca', 'Aplicações', 'Branding estratégico'] },

    // === MARKETING ===
    { slug: 'marketing-digital-basico', titulo: 'Marketing Digital do Zero', nivel: 'Iniciante', area: 'Marketing', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores, social media iniciantes, estudantes', ferramentas: ['Meta Ads', 'Google Ads', 'Analytics'], professor: 'Amanda Ribeiro', oque_aprende: ['Funil de vendas', 'Persona e ICP', 'Meta Ads básico', 'Google Ads básico', 'Google Analytics'] },
    { slug: 'social-media', titulo: 'Social Media Profissional', nivel: 'Intermediário', area: 'Marketing', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Social media, empreendedores', ferramentas: ['Instagram', 'TikTok', 'LinkedIn', 'Buffer'], professor: 'Amanda Ribeiro', oque_aprende: ['Estratégia de conteúdo', 'Calendário editorial', 'Reels e Shorts virais', 'Análise de métricas', 'Gestão de comunidade'] },
    { slug: 'google-ads', titulo: 'Google Ads: Tráfego Pago', nivel: 'Intermediário', area: 'Marketing', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores, gestores de tráfego', ferramentas: ['Google Ads', 'Google Analytics', 'Tag Manager'], professor: 'Amanda Ribeiro', oque_aprende: ['Campanhas Search e Display', 'Keyword research', 'Landing pages que convertem', 'Tag Manager', 'ROAS e métricas'] },
    { slug: 'meta-ads', titulo: 'Meta Ads (Facebook + Instagram)', nivel: 'Intermediário', area: 'Marketing', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Social media, empreendedores', ferramentas: ['Meta Business Suite', 'Ads Manager'], professor: 'Amanda Ribeiro', oque_aprende: ['Campanhas Meta Ads', 'Públicos e lookalike', 'Criativos que convertem', 'Pixel e conversões', 'ROAS e otimização'] },
    { slug: 'seo-trafego-org', titulo: 'SEO: Tráfego Orgânico', nivel: 'Intermediário', area: 'Marketing', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Blogueiros, empreendedores, marketers', ferramentas: ['Google Search Console', 'Ahrefs', 'SEMrush'], professor: 'João Pedro', oque_aprende: ['SEO on-page', 'SEO técnico', 'Link building', 'Keyword research', 'Content marketing'] },
    { slug: 'email-marketing', titulo: 'Email Marketing com IA', nivel: 'Iniciante', area: 'Marketing', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores, marketers', ferramentas: ['Mailchimp', 'RD Station', 'Gemini'], professor: 'João Pedro', oque_aprende: ['Construção de lista', 'Sequências de email', 'Automação', 'A/B testing', 'Copy com IA'] },
    { slug: 'copywriting', titulo: 'Copywriting que Converte', nivel: 'Intermediário', area: 'Marketing', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Copywriters, empreendedores, social media', ferramentas: ['ChatGPT', 'Claude'], professor: 'João Pedro', oque_aprende: ['Framework AIDA', 'Gatilhos mentais', 'Copy pra vendas', 'Storytelling', 'Copy com IA'] },

    // === NEGÓCIOS ===
    { slug: 'ecommerce-shopify', titulo: 'E-commerce com Shopify', nivel: 'Iniciante', area: 'Negócios', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores e-commerce', ferramentas: ['Shopify', 'Facebook Ads', 'Google Shopping'], professor: 'Renata Alves', oque_aprende: ['Setup Shopify', 'Catálogo de produtos', 'Integração de pagamento', 'Logística', 'Ads e conversão'] },
    { slug: 'dropshipping', titulo: 'Dropshipping do Zero', nivel: 'Iniciante', area: 'Negócios', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores iniciantes', ferramentas: ['Shopify', 'AliExpress', 'Meta Ads'], professor: 'Renata Alves', oque_aprende: ['Modelo dropshipping', 'Fornecedores', 'Loja Shopify', 'Ads e escala', 'Logística'] },
    { slug: 'afiliados', titulo: 'Marketing de Afiliados', nivel: 'Iniciante', area: 'Negócios', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores digitais', ferramentas: ['Hotmart', 'Monetizze', 'Eduzz'], professor: 'Renata Alves', oque_aprende: ['Plataformas de afiliado', 'Escolha de produto', 'Tráfego pago e orgânico', 'Funnels', 'Escala'] },
    { slug: 'infoprodutos', titulo: 'Criação de Infoprodutos', nivel: 'Intermediário', area: 'Negócios', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Especialistas que querem vender conhecimento', ferramentas: ['Hotmart', 'Kajabi', 'Canva'], professor: 'Christopher Toya', oque_aprende: ['Validação de ideia', 'Estrutura do curso', 'Lançamento', 'Copywriting de vendas', 'Escala com afiliados'] },
    { slug: 'gestao-financeira', titulo: 'Gestão Financeira para Pequenos Negócios', nivel: 'Iniciante', area: 'Negócios', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Pequenos empreendedores', ferramentas: ['Excel', 'Contahub', 'Power BI'], professor: 'Renata Alves', oque_aprende: ['Fluxo de caixa', 'DRE simples', 'Indicadores (KPIs)', 'Precificação', 'Dashboard no Power BI'] },
    { slug: 'modelo-negocio', titulo: 'Business Model Canvas + Canvas Solo', nivel: 'Intermediário', area: 'Negócios', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Empreendedores, startups', ferramentas: ['Notion', 'Miro', 'Gemini'], professor: 'Christopher Toya', oque_aprende: ['Business Model Canvas', 'Lean Canvas', 'Solo First Framework', 'Validação', 'Pitch deck'] },
    { slug: 'ia-empreendedorismo', titulo: 'IA + Empreendedorismo (Solo First)', nivel: 'Intermediário', area: 'Empreendedorismo', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais que querem sair do CLT, freelancers', ferramentas: ['Gemini', 'ChatGPT', 'Notion', 'LinkedIn'], professor: 'Christopher Toya', oque_aprende: ['Definir Dharma (posicionamento)', 'Construir Soft Assets', 'Criar oferta irresistível', 'Prospecção e vendas com IA', 'Plano 90 dias para sair do CLT'] },

    // === CRIATIVIDADE ===
    { slug: 'edicao-videos-ia', titulo: 'Edição de Vídeos com IA (Gemini + Google Flow)', nivel: 'Intermediário', area: 'Criatividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Criadores de conteúdo, social media, youtubers', ferramentas: ['CapCut', 'Gemini', 'Google Flow', 'ElevenLabs'], professor: 'Marina Costa', oque_aprende: ['Edição CapCut com IA', 'Google Flow para vídeo', 'Voz com ElevenLabs', 'Legendas automáticas', 'Workflow completo'] },
    { slug: 'premiere-basico', titulo: 'Premiere Pro: Edição Profissional', nivel: 'Iniciante', area: 'Criatividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Editores de vídeo, youtubers', ferramentas: ['Adobe Premiere Pro'], professor: 'Pedro Lucas', oque_aprende: ['Interface e timeline', 'Cortes e transições', 'Color grading', 'Áudio e efeitos', 'Exportação profissional'] },
    { slug: 'after-effects', titulo: 'After Effects: Motion Graphics', nivel: 'Intermediário', area: 'Criatividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Editores, motion designers', ferramentas: ['Adobe After Effects'], professor: 'Pedro Lucas', oque_aprende: ['Animações e keyframes', 'Motion graphics', 'Composições', 'Efeitos especiais', 'Integração com Premiere'] },
    { slug: 'audicao-audio', titulo: 'Edição de Áudio com Audition', nivel: 'Iniciante', area: 'Criatividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Podcasters, editores de áudio', ferramentas: ['Adobe Audition', 'Audacity'], professor: 'Pedro Lucas', oque_aprende: ['Limpeza de áudio', 'Redução de ruído', 'Mixagem', 'Masterização', 'Podcast profissional'] },
    { slug: 'fotografia-basica', titulo: 'Fotografia Digital Básica', nivel: 'Iniciante', area: 'Criatividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Fotógrafos iniciantes, hobby', ferramentas: ['Lightroom', 'Photoshop'], professor: 'Patrícia Souza', oque_aprende: ['Composição', 'Iluminação', 'Configurações da câmera', 'Edição no Lightroom', 'Portfólio'] },

    // === PRODUTIVIDADE ===
    { slug: 'notion-produtividade', titulo: 'Notion: Produtividade Pessoal e Profissional', nivel: 'Iniciante', area: 'Produtividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais, estudantes, empreendedores', ferramentas: ['Notion', 'Gemini'], professor: 'Lucas Ferreira', oque_aprende: ['Bancos de dados Notion', 'Templates profissionais', 'Sistemas de produtividade', 'Segunda brain', 'Integração com IA'] },
    { slug: 'power-bi', titulo: 'Power BI: Dashboards Profissionais', nivel: 'Intermediário', area: 'Produtividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Analistas, gestores', ferramentas: ['Power BI', 'Excel', 'DAX'], professor: 'Carla Mendes', oque_aprende: ['Modelagem de dados', 'DAX avançado', 'Dashboards interativos', 'Power Query', 'Publicação e sharing'] },
    { slug: 'linkedin-pessoal', titulo: 'LinkedIn: Marca Pessoal e Networking', nivel: 'Iniciante', area: 'Produtividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais, consultores, empreendedores', ferramentas: ['LinkedIn', 'ChatGPT'], professor: 'João Pedro', oque_aprende: ['Perfil otimizado', 'Conteúdo que viraliza', 'Networking estratégico', 'Inbound leads', 'Personal branding'] },
    { slug: 'gestao-tempo', titulo: 'Gestão de Tempo e Produtividade', nivel: 'Iniciante', area: 'Produtividade', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Profissionais ocupados, empreendedores', ferramentas: ['Notion', 'Trello', 'Gemini'], professor: 'Lucas Ferreira', oque_aprende: ['Matriz Eisenhower', 'Pomodoro e Deep Work', 'GTD (Getting Things Done)', 'Sistemas de produtividade', 'Automação com IA'] },

    // === PROFISSIONAL ===
    { slug: 'ia-engenheiros-arquitetos', titulo: 'IA para Engenheiros e Arquitetos', nivel: 'Intermediário', area: 'Profissional', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Engenheiros, arquitetos, calculistas', ferramentas: ['Midjourney', 'Veras', 'PromeAI', 'Revit'], professor: 'Rodrigo Almeida', oque_aprende: ['Renderização com IA', 'Memória de cálculo assistida', 'Propostas comerciais', 'Análise de normas com RAG'] },
    { slug: 'ia-operadores-drone', titulo: 'IA para Operadores de Drone', nivel: 'Intermediário', area: 'Profissional', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Operadores de drone, pilotos ANAC', ferramentas: ['DroneDeploy', 'Pix4D', 'CapCut'], professor: 'Márcio Drone', oque_aprende: ['Edição aérea com IA', 'Ortomosaicos', 'Detecção de defeitos', 'Relatórios automáticos', 'Precificação'] },

    // === INFANTO-JUVENIL ===
    { slug: 'ia-robotica-criancas', titulo: 'IA + Robótica para Crianças (7-12 anos)', nivel: 'Infantil', area: 'Infanto-juvenil', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Crianças de 7 a 12 anos', ferramentas: ['Scratch', 'LEGO Education', 'Micro:bit', 'Gemini Kids'], professor: 'Fernanda Oliveira', oque_aprende: ['IA de forma lúdica', 'Programação visual com Scratch', 'Montagem de robôs', 'Lógica de programação', 'Apresentação final'] },
    { slug: 'ia-adolescentes', titulo: 'IA para Adolescentes (13-17 anos)', nivel: 'Intermediário', area: 'Infanto-juvenil', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Adolescentes de 13 a 17 anos', ferramentas: ['Cursor', 'Gemini', 'CapCut', 'Gemini Imagen'], professor: 'Túlio Santos', oque_aprende: ['Construir primeiro app com IA', 'Criar jogos e publicar', 'Arte digital', 'Edição de vídeo', 'Portfólio digital'] },
    { slug: 'programacao-criancas', titulo: 'Programação para Crianças (8-12)', nivel: 'Infantil', area: 'Infanto-juvenil', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Crianças curiosas por programar', ferramentas: ['Scratch', 'Micro:bit', 'mBlock'], professor: 'Fernanda Oliveira', oque_aprende: ['Lógica de programação', 'Algoritmos visuais', 'Projetos com Micro:bit', 'Criação de jogos'] },
    { slug: 'robotica-educacional', titulo: 'Robótica Educacional com LEGO', nivel: 'Infantil', area: 'Infanto-juvenil', preco: 4000, presencial: 4500, duracao: '10h', publico: 'Crianças e adolescentes (9-15)', ferramentas: ['LEGO Spike Prime', 'Scratch'], professor: 'Fernanda Oliveira', oque_aprende: ['Montagem de robôs LEGO', 'Programação Spike Prime', 'Sensores e motores', 'Desafios de robótica'] },

    // === MENTORIA VIP ===
    { slug: 'mentoria-vip', titulo: 'Mentoria VIP Personalizada', nivel: 'VIP', area: 'Mentoria', preco: 4500, presencial: 5000, duracao: 'Mínimo 10 horas', publico: 'Executivos, fundadores, profissionais com objetivo específico', ferramentas: ['Personalizado'], professor: 'Christopher Toya', oque_aprende: ['Plano 100% personalizado', 'Sessões 1-a-1 ao vivo', 'Canal direto com mentor no WhatsApp', 'Acompanhamento de projeto real', 'Horários flexíveis'] },
  ];

  // ===== FAQ / CONCEITOS =====
  const CONCEITOS = [
    {
      keywords: ['o que e ia', 'o que é ia', 'inteligencia artificial', 'o que e inteligencia artificial', 'como ia funciona', 'ia como funciona', 'o que e ia generativa'],
      resposta: (nome) => `IA (Inteligência Artificial) é uma área da computação que cria sistemas capazes de fazer tarefas que antes só humanos conseguiam: entender texto, reconhecer imagens, conversar, recomendar coisas, tomar decisões.

Hoje, quando falamos de IA no dia a dia, estamos falando de IA GENERATIVA, que é um tipo específico de IA que CRIA conteúdo novo (texto, imagem, vídeo, código) a partir do que você pede.

Exemplos que você provavelmente já usou:
• ChatGPT (cria texto, responde perguntas)
• Gemini do Google (mesma coisa, integrado com Google)
• DALL-E / Imagen (criam imagens)
• Sora / Google Flow (criam vídeos)

Não é mágica nem consciência. É estatística avançada: a IA aprende padrões de bilhões de textos e imagens, e gera respostas baseadas nesses padrões.

Por isso dominar IA agora é tão importante: ela vai estar em TODO trabalho nos próximos anos. Quer que eu te mostre qual curso ideal pro seu momento${nome ? ', ' + nome : ''}?`
    },
    {
      keywords: ['o que e chatgpt', 'chatgpt o que', 'como usar chatgpt', 'para que chatgpt'],
      resposta: (nome) => `ChatGPT é um assistente de IA criado pela OpenAI em 2022. Ele conversa com você como um humano e pode:

• Escrever textos (e-mails, redações, posts, código)
• Resumir documentos longos em segundos
• Explicar conceitos complexos de forma simples
• Resolver problemas de matemática
• Criar imagens (com DALL-E, na versão paga)
• Programar em qualquer linguagem

COMO USAR: Acesse chat.openai.com (ou chatgpt.com), crie conta grátis, e digite o que quer. Você pode pedir "escreva um e-mail pra meu chefe pedindo aumento" ou "explique a teoria da relatividade pra uma criança de 10 anos".

DICA: O ChatGPT responde melhor quando você é específico. Em vez de "me dá ideias", diga "me dá 10 ideias de posts pra Instagram sobre cachorros, com emojis, em tom divertido".

No nosso curso de IA Iniciante (10h, R$4.000), você aprende a dominar o ChatGPT em 2 semanas. Quer saber mais${nome ? ', ' + nome : ''}?`
    },
    {
      keywords: ['o que e gemini', 'gemini o que', 'como usar gemini', 'para que gemini'],
      resposta: (nome) => `Gemini é o assistente de IA do Google, concorrente direto do ChatGPT. Foi lançado em dezembro de 2023 e tem algumas vantagens:

• INTEGRAÇÃO GOOGLE: Funciona dentro do Gmail, Google Docs, Sheets, Slides
• ACESSO À INTERNET: Pode buscar informações atualizadas em tempo real (ChatGPT grátis não faz isso)
• MULTIMODAL: Entende texto, imagem, áudio e vídeo ao mesmo tempo
• GRATUITO: A versão básica é de graça (gemini.google.com)

QUAL ESCOLHER?
• ChatGPT: melhor pra textos longos, código, criatividade
• Gemini: melhor pra quem já usa Google Workspace (Docs, Gmail, Sheets) e quer integração
• Claude: melhor pra analisar PDFs longos e documentos

No curso da AI School, focamos em Gemini + ChatGPT porque são as duas ferramentas que dominam o mercado. Quer que eu te mostre o curso ideal${nome ? ', ' + nome : ''}?`
    },
    {
      keywords: ['o que e prompt', 'prompt o que', 'como fazer prompt', 'engenharia prompt', 'prompt engenharia'],
      resposta: (nome) => `Prompt é a instrução que você dá pra IA. Tipo a "pergunta" que você manda pro ChatGPT.

A qualidade do prompt define a qualidade da resposta. Se você manda "fala sobre IA", recebe texto genérico. Se manda "explique IA em 3 parágrafos para uma criança de 8 anos, com exemplo de brinquedo", recebe algo muito melhor.

FÓRMULA CRISPE (a que ensinamos no curso):
• C - Contexto (quem é você, pra quem é)
• R - Role (qual papel a IA deve assumir)
• I - Instruction (o que exatamente fazer)
• S - Specificity (quanto detalhe)
• P - Personality (tom de voz)
• E - Extras (formato, tamanho, exemplos)

Exemplo fraco: "escreve um e-mail"
Exemplo forte: "Você é um vendedor experiente. Escreva um e-mail de follow-up para um cliente que demonstrou interesse em curso de IA mas não comprou. Tom amigável mas profissional. Máximo 150 palavras. Inclua CTA no final."

Isso é ENGENHARIA DE PROMPT, e é uma habilidade que todo mundo precisa ter. No curso IA Iniciante (R$4.000, 10h) você aprende isso na prática. Quer${nome ? ', ' + nome : ''}?`
    },
    {
      keywords: ['o que e mentoria vip', 'mentoria vip o que', 'como funciona mentoria', 'diferenca mentoria curso'],
      resposta: (nome) => `Mentoria VIP é diferente de curso normal. Te explico:

CURSO NORMAL (10h, R$4.000):
• Currículo pré-definido (você aprende o que está na ementa)
• Turma com outros alunos (até 10)
• Ritmo da turma
• Excelente pra quem tá começando

MENTORIA VIP (10h, R$4.500 online / R$5.000 presencial):
• SEM currículo fixo. Você chega com seu objetivo e a gente desenha um plano só seu
• 1-a-1 com mentor (ninguém mais na sala)
• Ritmo seu, no seu tempo
• Foco 100% no seu projeto real
• Canal direto com mentor no WhatsApp
• Professor: Christopher Toya (fundador da AI School)

PARA QUEM É MENTORIA VIP:
• Executivos que precisam aprender IA rápido pra uma decisão
• Empreendedores que querem aplicar IA no próprio negócio
• Profissionais que querem sair do CLT (90 dias)
• Alguém com projeto específico (lançar app, criar canal, automatizar empresa)

Quer conversar sobre seu caso${nome ? ', ' + nome : ''}?`
    },
    {
      keywords: ['preciso saber programar', 'nao sei programar', 'não sei programar', 'tenho que programar', 'exige programa'],
      resposta: (nome) => `Boa pergunta! Depende do curso. Te explico quais precisam e quais não:

NÃO PRECISA PROGRAMAR:
• IA Iniciante (R$4.000) - do zero, só saber usar computador
• Edição de Vídeos com IA - CapCut + Gemini
• Canva com IA - design sem código
• Pacote Office com IA - Excel/Word/PowerPoint
• IA para Engenheiros - usa ferramentas, não código
• IA para Operadores de Drone - foco em edição
• Criação de Sites no Lovable - app com 1 prompt
• IA para Crianças (7-12) - Scratch visual

PRECISA PROGRAMAR UM POUCO:
• Vibe Code - programa com IA (não precisa saber antes)
• Poe Bots - cria bots sem código

PRECISA PROGRAMAR BASTANTE:
• IA Avançado - APIs, RAG, fine-tuning
• Criação de Sites Avançado - Next.js + TS
• Automação Modular (mínimo 3 módulos)

Se você não sabe programar e quer começar, recomendo IA Iniciante. Se quer programar com IA (sem precisar saber JavaScript), Vibe Code. Quer${nome ? ', ' + nome : ''}?`
    },
  ];

  // ===== PREÇO/PAGAMENTO =====
  const INFO_PRECO = {
    keywords: ['preco', 'preço', 'valor', 'custo', 'quanto custa', 'quanto', 'quanto fica', 'valor do curso', 'valor da mentoria', 'tabela'],
    resposta: (nome) => `Tabela de preços${nome ? ', ' + nome : ''}:

CURSOS REGULARES (10h):
• Online: R$4.000 (R$400/hora)
• Presencial: R$4.500 (R$450/hora)

MENTORIA VIP (mínimo 10h):
• Online: R$4.500 (R$450/hora)
• Presencial: R$5.000 (R$500/hora)

CURSO DE AUTOMAÇÃO (modular):
• Módulos de R$4.000 cada (mínimo 3 módulos = R$12.000)
• Cada módulo tem 10 horas

PAGAMENTO:
• PIX (à vista, aprovação imediata)
• Boleto (até 2x sem juros)
• Cartão (até 12x com juros da operadora - Visa, Master, Elo, Amex)

Qual modalidade te interessa?`
  };

  const INFO_PAGAMENTO = {
    keywords: ['pagar', 'pagamento', 'pix', 'boleto', 'cartao', 'cartão', 'parcelar', 'parcela', 'forma de pagamento', 'como pagar'],
    resposta: (nome) => `Formas de pagamento${nome ? ', ' + nome : ''}:

PIX: aprovação imediata. QR Code gerado na hora quando você clica em "Matricular". Você paga em segundos pelo app do seu banco.

BOLETO: vencimento em 3 dias úteis. Até 2x sem juros. Geração automática após matrícula.

CARTÃO: Visa, Master, Elo, Amex. Aprovação na hora. Até 12x com juros da operadora.

MODALIDADES:
• Online: R$400/hora (curso regular) ou R$450/hora (mentoria VIP)
• Presencial: R$450/hora (curso regular) ou R$500/hora (mentoria VIP)

Quer matricular em qual curso?`
  };

  const INFO_HORARIO = {
    keywords: ['horario', 'horário', 'quando', 'aula', 'aulas', 'encontro', 'encontros', 'data', 'turma', 'turmas', 'inicio', 'início', 'disponibilidade', 'dias'],
    resposta: (nome) => `Os cursos são online ao vivo via Zoom ou presencial em São Paulo${nome ? ', ' + nome : ''}:

FORMATO:
• Cada curso = 10 horas (5 encontros de 2h ou 10 de 1h, você escolhe)
• Turmas novas toda semana
• Horários: manhã, tarde, noite ou fim de semana
• Gravações disponíveis por 12 meses
• Turmas pequenas (máx. 10 alunos; infantil máx. 8)

MENTORIA VIP: horários 100% flexíveis, você agenda direto com o mentor.

CURSOS INFANTIS: máximo 8 crianças por turma, supervisão total.

Quer saber sobre um curso específico?`
  };

  const INFO_CERTIFICADO = {
    keywords: ['certificado', 'certificados', 'diploma', 'comprovante', 'horas complementares'],
    resposta: (nome) => `Sim, todos os cursos emitem certificado digital${nome ? ', ' + nome : ''}:

• Carga horária de 10 horas
• Verificação de autenticidade
• Válido para horas complementares
• Mentoria VIP emite certificado personalizado

O certificado é gerado automaticamente após a conclusão do curso e enviado por e-mail.`
  };

  const INFO_MODALIDADE = {
    keywords: ['online', 'presencial', 'modalidade', 'presenciais', 'online ou presencial', 'como funciona a aula'],
    resposta: (nome) => `Você escolhe a modalidade${nome ? ', ' + nome : ''}:

ONLINE:
• Aulas ao vivo via Zoom (não é só vídeo gravado)
• Você interage com o professor e turma
• Gravações disponíveis por 12 meses
• R$400/hora (curso regular) ou R$450/hora (mentoria VIP)
• Pode fazer de qualquer lugar do Brasil

PRESENCIAL:
• Em São Paulo (endereço informado após matrícula)
• Turmas pequenas, atenção individual
• Estrutura completa
• R$450/hora (curso regular) ou R$500/hora (mentoria VIP)
• Networking presencial com outros alunos

Posso alternar? SIM, você pode trocar de modalidade entre sessões.

Qual modalidade prefere?`
  };

  const OBJECTIONS = [
    {
      keywords: ['caro', 'caro demais', 'muito caro', 'nao tenho dinheiro', 'não tenho dinheiro', 'custa muito', 'valor alto', 'ta caro', 'tá caro', 'fora do orcamento', 'fora do orçamento'],
      resposta: (nome) => `Entendo${nome ? ', ' + nome : ''}. Vou te mostrar as opções de pagamento:

PIX: R$4.000 à vista (10h online)
BOLETO: 2x de R$2.000 sem juros
CARTÃO: até 12x com juros da operadora (ex: 12x de ~R$370)

Você escolhe a modalidade:
• Online: R$400/hora (pacote 10h = R$4.000)
• Presencial: R$450/hora (pacote 10h = R$4.500)

Para automatização total, temos o curso modular: R$4.000 por módulo (mínimo 3 módulos).

Quer que eu te mostre o curso ideal pro seu momento?`
    },
    {
      keywords: ['nao tenho tempo', 'não tenho tempo', 'sem tempo', 'ocupado', 'muito corrido', 'trabalho muito'],
      resposta: (nome) => `Entendo${nome ? ', ' + nome : ''}. Por isso nosso curso é só 10 horas:

• 5 encontros de 2h (ou 10 de 1h, você escolhe)
• Online ao vivo via Zoom + gravações por 12 meses
• Horários flexíveis (manhã, tarde, noite ou fim de semana)
• Turmas novas toda semana

Em 2 semanas você termina o curso. Ou prefere começar com a Mentoria VIP e definir seu próprio cronograma?`
    },
    {
      keywords: ['preciso pensar', 'vou pensar', 'depois eu vejo', 'mais pra frente', 'amanha', 'amanhã', 'vou analisis', 'vou ver'],
      resposta: (nome) => `Compreensível${nome ? ', ' + nome : ''}. Mas deixa eu te dar 2 informações importantes:

• Turmas novas toda semana - começar agora = começar a aplicar IA no trabalho mais cedo
• Aulas ao vivo (não é só vídeo gravado) - você interage com o instrutor

Posso te salvar uma vaga na próxima turma e você decide até lá?`
    },
    {
      keywords: ['funciona mesmo', 'realmente funciona', 'é verdade', 'é confiavel', 'é confiável', 'é golpe', 'é furada'],
      resposta: (nome) => `Entendo a preocupação${nome ? ', ' + nome : ''}. Sobre confiabilidade:

• +1.200 alunos formados
• Aulas ao vivo (não é só vídeo gravado)
• Certificado digital com verificação de autenticidade
• Comunidade ativa no WhatsApp
• Instrutores experientes no mercado
• Pagamento via PIX, boleto ou cartão

Quer que eu te mostre o curso ideal pro seu momento?`
    },
  ];

  // ===== SAUDAÇÃO =====
  const SAUDACAO = {
    keywords: ['oi', 'ola', 'olá', 'opa', 'eai', 'e ai', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hi'],
    resposta: (nome) => `Olá${nome ? ', ' + nome : ''}! Tudo beleza?

Sobre o que você quer saber? Posso falar sobre cursos, preços, formas de pagamento, mentoria VIP, ou te recomendar o curso ideal pro seu momento.`
  };

  // ===== NORMALIZAR TEXTO =====
  function normalize(text) {
    return (text || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .trim();
  }

  // ===== SCORING =====
  function scoreText(text, keywords) {
    const normalized = normalize(text);
    let score = 0;
    keywords.forEach(k => {
      const kn = normalize(k);
      if (normalized.includes(kn)) {
        score += kn.split(' ').length > 1 ? 5 : 2;
      }
    });
    return score;
  }

  // ===== RETRIEVAL: encontra melhor resposta =====
  function retrieve(userInput, leadName) {
    const nome = leadName || '';
    let best = null;
    let bestScore = 0;
    const allChunks = [
      ...CONCEITOS,
      INFO_PRECO,
      INFO_PAGAMENTO,
      INFO_HORARIO,
      INFO_CERTIFICADO,
      INFO_MODALIDADE,
      ...OBJECTIONS,
      SAUDACAO,
    ];

    // 1. Tenta conceitos/FAQ primeiro
    for (const chunk of allChunks) {
      const s = scoreText(userInput, chunk.keywords);
      if (s > bestScore) {
        bestScore = s;
        best = chunk;
      }
    }

    // 2. Tenta curso específico
    const course = findCourse(userInput);

    return { chunk: best, score: bestScore, course };
  }

  // ===== COURSE FINDER =====
  function findCourse(query) {
    const input = normalize(query);
    let best = null, bestScore = 0;
    CURSOS.forEach(c => {
      const titulo = normalize(c.titulo);
      const haystack = normalize(c.titulo + ' ' + c.area + ' ' + c.publico + ' ' + (c.ferramentas || []).join(' ') + ' ' + c.professor);
      let score = 0;
      input.split(/\s+/).forEach(w => {
        if (w.length > 2) {
          // Palavra no título tem peso 3 (match mais relevante)
          if (titulo.includes(w)) score += 3;
          // Palavra no resto (ferramentas, área, professor) tem peso 1
          else if (haystack.includes(w)) score += 1;
        }
      });
      if (score > bestScore) { bestScore = score; best = c; }
    });
    // Threshold de 1 já que peso de título é alto
    return bestScore >= 1 ? best : null;
  }

  // ===== GERAR RESPOSTA =====
  function generateResponse(userInput, leadName, leadInteresses) {
    const nome = leadName || '';
    const result = retrieve(userInput, nome);
    const chunk = result.chunk;
    const score = result.score;
    const course = result.course;

    // 1. Se a pergunta é conceitual ("o que é X", "como funciona X"), prioriza conceito
    const input = normalize(userInput);
    const isConceptualQuestion = /\bo que (e|é)\b|\bcomo funciona\b|\bpara que serve\b|\bdiferenca\b|\bdiferença\b/.test(input);
    if (isConceptualQuestion && chunk && score >= 2) {
      return chunk.resposta(nome);
    }

    // 2. Se é pergunta de preço/valor, prioriza info de preço
    if (/\bpreco\b|\bpreço\b|\bvalor\b|\bcusto\b|\bquanto custa\b|\bquanto fica\b/.test(input) && chunk && score >= 2) {
      return chunk.resposta(nome);
    }

    // 3. Se é pergunta de pagamento, prioriza info de pagamento
    if (/\bpagamento\b|\bpagar\b|\bpix\b|\bboleto\b|\bcartao\b|\bcartão\b|\bparcelar\b|\bparcela\b/.test(input) && chunk && score >= 2) {
      return chunk.resposta(nome);
    }

    // 4. Se é pergunta de horário, prioriza info de horário
    if (/\bhorario\b|\bhorário\b|\bquando\b|\baulas?\b|\bencontros?\b|\bturma\b|\binicio\b|\binício\b|\bdisponibilidade\b/.test(input) && chunk && score >= 2) {
      return chunk.resposta(nome);
    }

    // 5. Se é pergunta de modalidade, prioriza info de modalidade
    if (/\bonline\b|\bpresencial\b|\bmodalidade\b/.test(input) && chunk && score >= 2) {
      return chunk.resposta(nome);
    }

    // 6. Se é objeção (caro, tempo, etc), prioriza objeção
    if (/\bcaro\b|\bnao tenho dinheiro\b|\bnão tenho dinheiro\b|\bcaro demais\b|\btempo\b|\bocupado\b/.test(input) && chunk && score >= 2) {
      return chunk.resposta(nome);
    }

    // 7. Se achou curso e tem intenção de aprendizado, mostra curso
    if (course && (/\bcurso\b|\baprender\b|\bquero\b|\bfazer\b|\bestudar\b|\bpreciso\b/.test(input) || (course.titulo.toLowerCase().includes('python') && /python/.test(input)))) {
      return formatCourseResponse(course, nome);
    }

    // 8. Senão, usa o chunk recuperado (score >= 2)
    if (chunk && score >= 2) {
      return chunk.resposta(nome);
    }

    // Fallback inteligente
    return `Boa pergunta${nome ? ', ' + nome : ''}! Posso te ajudar de várias formas:

• Explicar conceitos: o que é IA, ChatGPT, Gemini, prompt
• Recomendar curso: me conta sua área e objetivo
• Detalhar ementa: o que você vai aprender em cada curso
• Preços e pagamento: PIX, boleto 2x, cartão 12x
• Mentoria VIP: diferença pra curso normal
• Falar com humano: te passo no WhatsApp

O que você quer saber?`;
  }

  function formatCourseResponse(course, nome) {
    const oque = (course.oque_aprende || []).slice(0, 5).map(o => '• ' + o).join('\n');
    const precoStr = course.preco === 4500
      ? `R$4.500 (10h online) ou R$5.000 (presencial)`
      : course.preco === 12000
      ? `R$12.000 (3 módulos de 10h, R$4.000/módulo)`
      : `R$4.000 (10h online) ou R$4.500 (presencial)`;

    return `Encontrei o curso ideal pra você${nome ? ', ' + nome : ''}: ${course.titulo} 🎯

${course.duracao} | Para: ${course.publico}
Professor: ${course.professor}

O QUE VOCÊ VAI APRENDER:
${oque}

INVESTIMENTO: ${precoStr}

Quer que eu te explique mais sobre o conteúdo, ou prefere matricular?`;
  }

  // ===== DETECTAR INTENÇÃO DE MATRÍCULA =====
  function isEnrollmentIntent(input) {
    const n = normalize(input);
    return /^(quero matricular|matricular|matricula|inscrever|inscricao|fechar|bora|to dentro|topo|quero comprar|quero o curso|quero esse)/.test(n);
  }

  // ===== DETECTAR PEDIDO DE EXPLICAÇÃO DE CURSO =====
  function isCourseDetailRequest(input) {
    const n = normalize(input);
    return /(ementa|conteudo|conteúdo|o que vou aprender|modulo|módulo|detalhe|explica.*curso|saber mais)/.test(n);
  }

  // ===== DETECTAR PEDIDO DE HUMANO =====
  function isHumanRequest(input) {
    const n = normalize(input);
    return /(humano|pessoa|atendente|falar com alguem|falar com alguém|whatsapp|telefone|contato|consultor|especialista)/.test(n);
  }

  // ===== DETECTAR PEDIDO DE LISTA DE CURSOS =====
  function isListRequest(input) {
    const n = normalize(input);
    return /^(curso|cursos|opcoes|opções|quais|categoria|ver todos|lista)/.test(n) && !findCourse(input);
  }

  // ===== LISTAR CURSOS POR ÁREA =====
  function listCoursesByArea() {
    const areas = {};
    CURSOS.forEach(c => {
      if (!areas[c.area]) areas[c.area] = [];
      areas[c.area].push(c);
    });
    let result = 'Temos cursos em várias áreas:\n\n';
    Object.entries(areas).forEach(([area, cursos]) => {
      result += `${area.toUpperCase()} (${cursos.length} cursos):\n`;
      cursos.slice(0, 3).forEach(c => {
        result += `  • ${c.titulo} - R$${c.preco.toLocaleString('pt-BR')}\n`;
      });
      if (cursos.length > 3) result += `  ... e mais ${cursos.length - 3} cursos\n`;
      result += '\n';
    });
    result += 'Qual área te interessa?';
    return result;
  }

  // ===== EXPOSE API =====
  window.AISchoolRAG = {
    generateResponse,
    findCourse,
    isEnrollmentIntent,
    isCourseDetailRequest,
    isHumanRequest,
    isListRequest,
    listCoursesByArea,
    formatCourseResponse,
    CURSOS,
    PROFESSORES,
  };
})();
