/**
 * AI School - Chatbot com DeepSeek API (respostas reais de IA)
 * v4.0 - Atende, tira dúvidas, vende de forma consultiva
 *
 * Comportamento:
 * - Atende como SDR sênior e consultor
 * - Conhece TODOS os cursos da escola (IA, informática, web, design, marketing, negócios digitais)
 * - Não menciona reembolso/devolução
 * - Não empurra WhatsApp a toda hora (só quando necessário)
 * - Responde perguntas técnicas com profundidade real (via DeepSeek)
 * - Salva lead no CRM automaticamente
 * - Fallback inteligente se API falhar
 */
(function () {
  'use strict';

  const CONFIG = {
    whatsappSchool: '55119666161611',
    appName: 'AI School',
    storageKey: 'aischool_leads_v3',
    sessionKey: 'aischool_session_v3',
    primaryColor: '#7c3aed',
    accentColor: '#10b981',
    botName: 'Aria',
    // DeepSeek API - lê a chave de um arquivo externo ou do localStorage
    // (não deixamos a chave hardcoded aqui para segurança do GitHub)
    deepseekUrl: 'https://api.deepseek.com/v1/chat/completions',
    deepseekModel: 'deepseek-chat',
  };

  // Carrega a chave da API dinamicamente (evita vazar no GitHub)
  async function getApiKey() {
    // 1. Tenta do localStorage (configurada pelo admin no CRM)
    try {
      const stored = localStorage.getItem('aischool_deepseek_key');
      if (stored) return stored;
    } catch (e) {}
    // 2. Tenta de arquivo externo (config.json)
    try {
      const base = window.location.pathname.replace(/\/+$/, '');
      const paths = [base + '/deepseek-key.json', './deepseek-key.json', '/deepseek-key.json'];
      for (const p of paths) {
        try {
          const r = await fetch(p);
          if (r.ok) {
            const data = await r.json();
            if (data.key) return data.key;
          }
        } catch (e) {}
      }
    } catch (e) {}
    // 3. Fallback: chave vazia (bot usa respostas locais sem DeepSeek)
    return '';
  }

  // ===== KNOWLEDGE BASE (CATÁLOGO COMPLETO) =====
  const CURSOS = [
    // === IA (já existentes) ===
    { slug: 'ia-iniciante', titulo: 'IA Iniciante: ChatGPT e Gemini do Zero', nivel: 'Iniciante', area: 'IA', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Qualquer pessoa que quer começar com IA', ferramentas: ['ChatGPT', 'Gemini', 'Gemini Imagen', 'Perplexity'] },
    { slug: 'ia-intermediario', titulo: 'IA Intermediário: Automação com Gemini + n8n', nivel: 'Intermediário', area: 'IA', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais que já usam ChatGPT e querem automatizar', ferramentas: ['n8n', 'Make.com', 'Gemini', 'Google Workspace'] },
    { slug: 'ia-avancado', titulo: 'IA Avançado: APIs, RAG, Agentes, MCP', nivel: 'Avançado', area: 'IA', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Desenvolvedores, CTOs, analistas de dados', ferramentas: ['OpenAI API', 'Anthropic API', 'LangChain', 'Pinecone', 'MCP'] },
    { slug: 'automacao-modular', titulo: 'Automação com IA (Curso Modular)', nivel: 'Avançado', area: 'IA', preco: 12000, modalidades: ['online', 'presencial'], duracao: 'Mínimo 3 módulos de 10h', publico: 'Empresas e profissionais que precisam de automação profissional', ferramentas: ['n8n', 'LangChain', 'Gemini', 'APIs Google'] },
    { slug: 'vibe-code', titulo: 'Vibe Code: Programe com IA', nivel: 'Iniciante', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores, designers, qualquer pessoa que queira criar apps', ferramentas: ['Cursor', 'Gemini Code Assist', 'v0', 'Lovable'] },
    { slug: 'edicao-videos-ia', titulo: 'Edição de Vídeos com IA (Gemini + Google Flow)', nivel: 'Intermediário', area: 'Criatividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Criadores de conteúdo, social media, youtubers', ferramentas: ['CapCut', 'Gemini', 'Google Flow', 'ElevenLabs'] },
    { slug: 'ia-imagens-gemini', titulo: 'IA para Imagens (Gemini + GPT)', nivel: 'Iniciante', area: 'Criatividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Designers, social media, criadores', ferramentas: ['Gemini Imagen', 'GPT/DALL-E', 'Canva IA'] },
    { slug: 'poe-bots-ia', titulo: 'Poe: Crie Seus Próprios Bots de IA', nivel: 'Intermediário', area: 'IA', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Criadores, empreendedores, suporte', ferramentas: ['Poe', 'GPT-4', 'Claude', 'Llama'] },
    { slug: 'ia-empreendedorismo', titulo: 'IA + Empreendedorismo (Solo First)', nivel: 'Intermediário', area: 'Empreendedorismo', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais que querem sair do CLT, freelancers', ferramentas: ['Gemini', 'ChatGPT', 'Notion', 'LinkedIn'] },

    // === INFORMÁTICA BÁSICA ===
    { slug: 'informatica-basica', titulo: 'Informática Básica Completa', nivel: 'Iniciante', area: 'Informática', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Iniciantes, aposentados, donas de casa, estudantes', ferramentas: ['Windows', 'Navegador', 'E-mail', 'Pendrive', 'Google Drive'] },
    { slug: 'word-profissional', titulo: 'Word Profissional', nivel: 'Iniciante', area: 'Informática', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais administrativos, estudantes', ferramentas: ['Microsoft Word', 'Google Docs'] },
    { slug: 'excel-do-zero', titulo: 'Excel do Zero ao Avançado', nivel: 'Iniciante ao Avançado', area: 'Informática', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais administrativos, analistas, estudantes', ferramentas: ['Microsoft Excel', 'Planilhas Google'] },
    { slug: 'excel-recem-admitidos', titulo: 'Excel para Recém-Admitidos', nivel: 'Iniciante', area: 'Informática', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Quem acabou de ser admitido e precisa dominar Excel rápido', ferramentas: ['Excel', 'Copilot', 'Power BI'] },
    { slug: 'powerpoint-apresentacoes', titulo: 'PowerPoint: Apresentações Profissionais', nivel: 'Iniciante', area: 'Informática', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais, professores, estudantes', ferramentas: ['PowerPoint', 'Canva', 'Copilot'] },
    { slug: 'office-copilot', titulo: 'Pacote Office com Copilot (IA)', nivel: 'Iniciante', area: 'Informática', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais que usam Excel/Word/PowerPoint', ferramentas: ['Microsoft 365 Copilot', 'Excel', 'Word', 'PowerPoint'] },
    { slug: 'google-workspace', titulo: 'Google Workspace Completo', nivel: 'Iniciante', area: 'Informática', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empresas, freelancers, estudantes', ferramentas: ['Gmail', 'Docs', 'Sheets', 'Slides', 'Drive'] },

    // === PROGRAMAÇÃO ===
    { slug: 'html-css-basico', titulo: 'HTML e CSS: Crie Seus Primeiros Sites', nivel: 'Iniciante', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Iniciantes em programação web', ferramentas: ['HTML5', 'CSS3', 'VS Code'] },
    { slug: 'javascript-basico', titulo: 'JavaScript Moderno do Zero', nivel: 'Iniciante', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Iniciantes que querem programar pra web', ferramentas: ['JavaScript', 'VS Code', 'Node.js'] },
    { slug: 'python-basico', titulo: 'Python do Zero', nivel: 'Iniciante', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Iniciantes, analistas de dados, cientistas', ferramentas: ['Python', 'Jupyter', 'Pandas'] },
    { slug: 'python-dados', titulo: 'Python para Análise de Dados', nivel: 'Intermediário', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Analistas, cientistas de dados', ferramentas: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'] },
    { slug: 'react-nextjs', titulo: 'React + Next.js (Avançado)', nivel: 'Avançado', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Desenvolvedores front-end', ferramentas: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
    { slug: 'nodejs-api', titulo: 'Node.js: APIs do Zero ao Deploy', nivel: 'Intermediário', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Desenvolvedores back-end', ferramentas: ['Node.js', 'Express', 'MongoDB', 'Postman'] },
    { slug: 'sql-banco-dados', titulo: 'SQL e Bancos de Dados', nivel: 'Intermediário', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Desenvolvedores, analistas, DBAs iniciantes', ferramentas: ['MySQL', 'PostgreSQL', 'SQLite'] },
    { slug: 'criacao-sites-lovable', titulo: 'Criação de Sites no Lovable (No-Code)', nivel: 'Iniciante', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores, designers, pequenos negócios', ferramentas: ['Lovable', 'Supabase', 'Vercel'] },
    { slug: 'criacao-sites-avancado', titulo: 'Criação de Sites Avançado (Cursor + v0)', nivel: 'Avançado', area: 'Programação', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Desenvolvedores, designers técnicos, fundadores', ferramentas: ['Cursor', 'v0', 'Bolt.new', 'Next.js'] },

    // === DESIGN ===
    { slug: 'photoshop-basico', titulo: 'Photoshop do Zero', nivel: 'Iniciante', area: 'Design', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Designers iniciantes, fotógrafos, social media', ferramentas: ['Adobe Photoshop'] },
    { slug: 'illustrator-basico', titulo: 'Illustrator: Vetores e Identidade Visual', nivel: 'Iniciante', area: 'Design', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Designers, ilustradores', ferramentas: ['Adobe Illustrator'] },
    { slug: 'canva-ia', titulo: 'Canva com IA (Magic Studio)', nivel: 'Iniciante', area: 'Design', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores, social media, professores', ferramentas: ['Canva Pro', 'Magic Studio', 'Gemini'] },
    { slug: 'figma-ux-ui', titulo: 'Figma + UX/UI Design', nivel: 'Intermediário', area: 'Design', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Designers, UX designers, front-end', ferramentas: ['Figma', 'Design System'] },
    { slug: 'identidade-visual', titulo: 'Identidade Visual e Branding', nivel: 'Intermediário', area: 'Design', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Designers, empreendedores que querem criar marca', ferramentas: ['Illustrator', 'Canva', 'Figma'] },

    // === MARKETING DIGITAL ===
    { slug: 'marketing-digital-basico', titulo: 'Marketing Digital do Zero', nivel: 'Iniciante', area: 'Marketing', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores, social media iniciantes, estudantes', ferramentas: ['Meta Ads', 'Google Ads', 'Analytics'] },
    { slug: 'social-media', titulo: 'Social Media Profissional', nivel: 'Intermediário', area: 'Marketing', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Social media, empreendedores', ferramentas: ['Instagram', 'TikTok', 'LinkedIn', 'Buffer'] },
    { slug: 'google-ads', titulo: 'Google Ads: Tráfego Pago', nivel: 'Intermediário', area: 'Marketing', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores, gestores de tráfego', ferramentas: ['Google Ads', 'Google Analytics', 'Tag Manager'] },
    { slug: 'meta-ads', titulo: 'Meta Ads (Facebook + Instagram)', nivel: 'Intermediário', area: 'Marketing', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Social media, empreendedores', ferramentas: ['Meta Business Suite', 'Ads Manager'] },
    { slug: 'seo-trafego-org', titulo: 'SEO: Tráfego Orgânico', nivel: 'Intermediário', area: 'Marketing', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Blogueiros, empreendedores, marketers', ferramentas: ['Google Search Console', 'Ahrefs', 'SEMrush'] },
    { slug: 'email-marketing', titulo: 'Email Marketing com IA', nivel: 'Iniciante', area: 'Marketing', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores, marketers', ferramentas: ['Mailchimp', 'RD Station', 'Gemini'] },
    { slug: 'copywriting', titulo: 'Copywriting que Converte', nivel: 'Intermediário', area: 'Marketing', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Copywriters, empreendedores, social media', ferramentas: ['ChatGPT', 'Claude'] },

    // === NEGÓCIOS DIGITAIS ===
    { slug: 'ecommerce-shopify', titulo: 'E-commerce com Shopify', nivel: 'Iniciante', area: 'Negócios', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores e-commerce', ferramentas: ['Shopify', 'Facebook Ads', 'Google Shopping'] },
    { slug: 'dropshipping', titulo: 'Dropshipping do Zero', nivel: 'Iniciante', area: 'Negócios', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores iniciantes', ferramentas: ['Shopify', 'AliExpress', 'Meta Ads'] },
    { slug: 'afiliados', titulo: 'Marketing de Afiliados', nivel: 'Iniciante', area: 'Negócios', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores digitais', ferramentas: ['Hotmart', 'Monetizze', 'Eduzz'] },
    { slug: 'infoprodutos', titulo: 'Criação de Infoprodutos', nivel: 'Intermediário', area: 'Negócios', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Especialistas que querem vender conhecimento', ferramentas: ['Hotmart', 'Kajabi', 'Canva'] },
    { slug: 'gestao-financeira', titulo: 'Gestão Financeira para Pequenos Negócios', nivel: 'Iniciante', area: 'Negócios', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Pequenos empreendedores', ferramentas: ['Excel', 'Contahub', 'Power BI'] },
    { slug: 'modelo-negocio', titulo: 'Business Model Canvas + Canvas Solo', nivel: 'Intermediário', area: 'Negócios', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Empreendedores, startups', ferramentas: ['Notion', 'Miro', 'Gemini'] },

    // === EDIÇÃO DE VÍDEO/ÁUDIO ===
    { slug: 'premiere-basico', titulo: 'Premiere Pro: Edição Profissional', nivel: 'Iniciante', area: 'Criatividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Editores de vídeo, youtubers', ferramentas: ['Adobe Premiere Pro'] },
    { slug: 'after-effects', titulo: 'After Effects: Motion Graphics', nivel: 'Intermediário', area: 'Criatividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Editores, motion designers', ferramentas: ['Adobe After Effects'] },
    { slug: 'audicao-audio', titulo: 'Edição de Áudio com Audition', nivel: 'Iniciante', area: 'Criatividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Podcasters, editores de áudio', ferramentas: ['Adobe Audition', 'Audacity'] },
    { slug: 'fotografia-basica', titulo: 'Fotografia Digital Básica', nivel: 'Iniciante', area: 'Criatividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Fotógrafos iniciantes, hobby', ferramentas: ['Lightroom', 'Photoshop'] },

    // === PRODUTIVIDADE E PROFISSIONAL ===
    { slug: 'notion-produtividade', titulo: 'Notion: Produtividade Pessoal e Profissional', nivel: 'Iniciante', area: 'Produtividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais, estudantes, empreendedores', ferramentas: ['Notion', 'Gemini'] },
    { slug: 'power-bi', titulo: 'Power BI: Dashboards Profissionais', nivel: 'Intermediário', area: 'Produtividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Analistas, gestores', ferramentas: ['Power BI', 'Excel', 'DAX'] },
    { slug: 'linkedin-pessoal', titulo: 'LinkedIn: Marca Pessoal e Networking', nivel: 'Iniciante', area: 'Produtividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais, consultores, empreendedores', ferramentas: ['LinkedIn', 'ChatGPT'] },
    { slug: 'gestao-tempo', titulo: 'Gestão de Tempo e Produtividade', nivel: 'Iniciante', area: 'Produtividade', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Profissionais ocupados, empreendedores', ferramentas: ['Notion', 'Trello', 'Gemini'] },

    // === PROFISSIONAL ===
    { slug: 'ia-engenheiros-arquitetos', titulo: 'IA para Engenheiros e Arquitetos', nivel: 'Intermediário', area: 'Profissional', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Engenheiros, arquitetos, calculistas', ferramentas: ['Midjourney', 'Veras', 'PromeAI', 'Revit'] },
    { slug: 'ia-operadores-drone', titulo: 'IA para Operadores de Drone', nivel: 'Intermediário', area: 'Profissional', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Operadores de drone, pilotos ANAC', ferramentas: ['DroneDeploy', 'Pix4D', 'CapCut'] },

    // === INFANTO-JUVENIL ===
    { slug: 'ia-robotica-criancas', titulo: 'IA + Robótica para Crianças (7-12 anos)', nivel: 'Infantil', area: 'Infanto-juvenil', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Crianças de 7 a 12 anos', ferramentas: ['Scratch', 'LEGO Education', 'Micro:bit', 'Gemini Kids'] },
    { slug: 'ia-adolescentes', titulo: 'IA para Adolescentes (13-17 anos)', nivel: 'Intermediário', area: 'Infanto-juvenil', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Adolescentes de 13 a 17 anos', ferramentas: ['Cursor', 'Gemini', 'CapCut', 'Gemini Imagen'] },
    { slug: 'programacao-criancas', titulo: 'Programação para Crianças (8-12)', nivel: 'Infantil', area: 'Infanto-juvenil', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Crianças curiosas por programar', ferramentas: ['Scratch', 'Micro:bit', 'mBlock'] },
    { slug: 'robotica-educacional', titulo: 'Robótica Educacional com LEGO', nivel: 'Infantil', area: 'Infanto-juvenil', preco: 4000, modalidades: ['online', 'presencial'], duracao: '10h', publico: 'Crianças e adolescentes (9-15)', ferramentas: ['LEGO Spike Prime', 'Scratch'] },

    // === MENTORIA VIP ===
    { slug: 'mentoria-vip', titulo: 'Mentoria VIP Personalizada', nivel: 'VIP', area: 'Mentoria', preco: 4500, modalidades: ['online', 'presencial'], duracao: 'Mínimo 10 horas', publico: 'Executivos, fundadores, profissionais com objetivo específico', ferramentas: ['Personalizado'] },
  ];

  // ===== STATE =====
  let state = {
    stage: 'greeting',
    lead: { name: '', whatsapp: '', startedAt: null, course_interest: [], lastIntent: null },
    messages: [],
    suggestedCourse: null,
    conversationHistory: [], // Para contexto da IA
  };

  // ===== STORAGE =====
  function loadSession() {
    try {
      const s = localStorage.getItem(CONFIG.sessionKey);
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed && parsed.lead && parsed.lead.name && parsed.lead.whatsapp) return parsed;
      }
    } catch (e) {}
    return null;
  }

  function saveSession() {
    try { localStorage.setItem(CONFIG.sessionKey, JSON.stringify(state)); } catch (e) {}
  }

  function saveLead() {
    if (!state.lead.name || !state.lead.whatsapp) return;
    try {
      // Salva no CRM via biblioteca leads.js
      if (window.AISchoolLeads) {
        const conversation = state.messages.map(m => ({
          from: m.from, text: m.text, timestamp: m.timestamp
        }));
        AISchoolLeads.addLead({
          name: state.lead.name,
          whatsapp: state.lead.whatsapp,
          source: 'chatbot',
          course_interest: state.lead.course_interest || [],
          conversation: conversation,
          status: 'novo',
        });
      }
    } catch (e) {}
  }

  // ===== TEXT HELPERS =====
  function normalize(text) {
    return (text || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  function formatBRL(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  // ===== COURSE FINDER =====
  function findCourse(query) {
    const input = normalize(query);
    let best = null, bestScore = 0;
    CURSOS.forEach(c => {
      const haystack = normalize(c.titulo + ' ' + c.area + ' ' + (c.publico || '') + ' ' + (c.ferramentas || []).join(' '));
      let score = 0;
      input.split(/\s+/).forEach(w => {
        if (w.length > 2 && haystack.includes(w)) score += 1;
      });
      if (score > bestScore) { bestScore = score; best = c; }
    });
    return bestScore >= 2 ? best : null;
  }

  function trackInterest(slug) {
    if (slug && !state.lead.course_interest.includes(slug)) {
      state.lead.course_interest.push(slug);
      saveSession();
      if (state.lead.name && state.lead.whatsapp) saveLead();
    }
  }

  // ===== DEEPSEEK API CALL =====
  async function callDeepSeek(userMessage) {
    const apiKey = await getApiKey();
    if (!apiKey) {
      // Sem chave: usa fallback local
      return getFallbackResponse(userMessage);
    }

    // Adiciona mensagem ao histórico
    state.conversationHistory.push({ role: 'user', content: userMessage });

    const systemPrompt = buildSystemPrompt();
    const messages = [
      { role: 'system', content: systemPrompt },
      ...state.conversationHistory.slice(-10),
    ];

    try {
      const response = await fetch(CONFIG.deepseekUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
          model: CONFIG.deepseekModel,
          messages: messages,
          max_tokens: 800,
          temperature: 0.7,
          stream: false,
        })
      });

      if (!response.ok) {
        throw new Error('DeepSeek API error: ' + response.status);
      }

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || '';

      state.conversationHistory.push({ role: 'assistant', content: reply });
      if (state.conversationHistory.length > 20) {
        state.conversationHistory = state.conversationHistory.slice(-20);
      }

      return reply;
    } catch (err) {
      console.error('[Aria] DeepSeek API falhou:', err);
      return getFallbackResponse(userMessage);
    }
  }

  // ===== SYSTEM PROMPT (define o comportamento) =====
  function buildSystemPrompt() {
    const catalogoResumido = CURSOS.map(c => `- ${c.titulo} | R$${c.preco.toLocaleString('pt-BR')} | ${c.duracao} | ${c.modalidades.join('/')} | Para: ${c.publico}`).join('\n');

    return `Você é a Aria, consultora e vendedora sênior da AI School, escola brasileira de tecnologia e negócios digitais.

SOBRE A ESCOLA:
A AI School oferece cursos de informática, web, programação, design, marketing digital, IA, edição de vídeo, negócios digitais e mais. Atende crianças (7-12), adolescentes (13-17), adultos e profissionais. Modalidades online e presencial (São Paulo).

PREÇOS (R$):
- Cursos regulares: R$4.000 por 10h online, R$4.500 presencial (R$400/h online, R$450/h presencial)
- Mentoria VIP: R$4.500 (10h online, R$450/h) ou R$5.000 (10h presencial, R$500/h)
- Automação Modular: R$4.000 por módulo, mínimo 3 módulos (R$12.000)
- Pagamento: PIX (à vista), Boleto (2x sem juros), Cartão (até 12x com juros da operadora)

PAGAMENTO: PIX, boleto 2x sem juros, cartão até 12x (juros da operadora). Não fale de reembolso ou devolução.

CATÁLOGO COMPLETO:
${catalogoResumido}

FORMA DE ATUAR (você é uma SDR consultiva):
1. Atenda com calma, sem pressa de vender
2. Tira dúvidas técnicas com profundidade (use seu conhecimento)
3. Quando o cliente perguntar sobre um tema, explique o conceito ANTES de oferecer curso
4. Recomende o curso ideal baseado no perfil e objetivo
5. Quando o cliente decidir, direciona pra matrícula (não empurra WhatsApp a toda hora)
6. Não mencione reembolso, devolução ou "garantia de 7 dias"
7. Não fale "falar com humano" o tempo todo, só se o cliente pedir explicitamente

REGRAS:
- Responda sempre em português brasileiro
- Use linguagem natural, não robótica
- Seja específico sobre os cursos (ementa, ferramentas, duração)
- Quando mencionar preço, use o formato "R$4.000 (10h)"
- Quando o cliente quiser matricular, diga que vai direcionar pro checkout
- Não invente cursos que não estão no catálogo
- Não use emojis em excesso (máximo 2-3 por mensagem)
- Não use bullet points demais, prefira parágrafos naturais
- Mantenha respostas concisas (máximo 200 palavras geralmente)

NOME DO LEAD ATUAL: ${state.lead.name || 'ainda não informou'}
INTERESSES JÁ DEMONSTRADOS: ${state.lead.course_interest.join(', ') || 'nenhum ainda'}`;
  }

  // ===== FALLBACK (se API falhar) =====
  function getFallbackResponse(userMessage) {
    const input = normalize(userMessage);
    const name = state.lead.name || '';

    // Saudação
    if (/^(oi|ola|olá|opa|bom dia|boa tarde|boa noite)/.test(input)) {
      return `Olá${name ? ', ' + name : ''}! Sou a Aria da AI School. Posso te ajudar a encontrar o curso ideal, tirar dúvidas sobre conteúdo, preços ou modalidades. O que você quer saber?`;
    }

    // Curso específico
    const course = findCourse(input);
    if (course) {
      trackInterest(course.slug);
      state.suggestedCourse = course;
      return `Encontrei o curso ideal pra você: ${course.titulo}.\n\n${course.duracao} | R$${course.preco.toLocaleString('pt-BR')} | ${course.modalidades.join(' ou ')}\n\nPara: ${course.publico}.\nFerramentas: ${(course.ferramentas || []).join(', ')}.\n\nQuer saber mais sobre o conteúdo, ou prefere matricular?`;
    }

    // Matricular
    if (/^(quero matricular|matricular|inscrever|fechar|bora|to dentro)/.test(input)) {
      const c = state.suggestedCourse || findCourse(input);
      if (c) {
        return `Boa! Vou te levar pro checkout de ${c.titulo}. Lá você gera o PIX e paga em segundos. Também aceitamos boleto 2x sem juros ou cartão em até 12x.`;
      }
      return 'Boa! Qual curso você quer? Posso te mostrar opções ou recomendar com base no seu objetivo.';
    }

    // Preço
    if (/(preco|preço|valor|custo|quanto)/.test(input)) {
      return `Tabela de preços:\n\nCursos regulares: R$4.000 (10h online) ou R$4.500 (presencial)\nMentoria VIP: R$4.500 (10h online) ou R$5.000 (presencial)\nAutomação Modular: R$4.000 por módulo (mínimo 3)\n\nPagamento: PIX, boleto 2x sem juros ou cartão 12x com juros da operadora.`;
    }

    return `Entendi${name ? ', ' + name : ''}. Posso te ajudar com:\n\n- Explicar conceitos de IA, programação, marketing, design\n- Recomendar curso ideal pro seu perfil\n- Detalhar ementa de qualquer curso\n- Informações de preço e pagamento\n\nO que você quer saber?`;
  }

  // ===== STYLES (mesma do v3) =====
  const STYLES = `
    .aria-fab { position: fixed; bottom: 24px; right: 24px; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #ec4899); border: none; cursor: pointer; z-index: 9998; box-shadow: 0 6px 24px rgba(124,58,237,0.4); display: flex; align-items: center; justify-content: center; transition: transform 0.2s ease; animation: aria-pulse 3s ease-in-out infinite; }
    .aria-fab:hover { transform: scale(1.06); }
    .aria-fab svg { width: 28px; height: 28px; color: #ffffff; }
    .aria-fab.open { transform: scale(0); opacity: 0; pointer-events: none; animation: none; }
    @keyframes aria-pulse { 0%,100% { box-shadow: 0 6px 24px rgba(124,58,237,0.4), 0 0 0 0 rgba(124,58,237,0.3); } 50% { box-shadow: 0 6px 24px rgba(124,58,237,0.4), 0 0 0 12px rgba(124,58,237,0); } }
    .aria-badge { position: absolute; top: -4px; right: -4px; background: #ef4444; color: #ffffff; font-size: 11px; font-weight: 700; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #0a0a14; }
    .aria-window { position: fixed; bottom: 96px; right: 24px; width: 380px; max-width: calc(100vw - 32px); height: 600px; max-height: calc(100vh - 130px); background: #15151f; border: 1px solid rgba(124,58,237,0.25); border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); z-index: 9999; display: none; flex-direction: column; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif; color: #f4f4fb; animation: aria-slideUp 0.3s cubic-bezier(0.4,0,0.2,1); }
    .aria-window.open { display: flex; }
    @keyframes aria-slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .aria-header { background: linear-gradient(135deg, #7c3aed, #ec4899); padding: 14px 18px; display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .aria-avatar { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
    .aria-info { flex: 1; min-width: 0; }
    .aria-name { font-weight: 700; font-size: 14px; color: #ffffff; }
    .aria-status { font-size: 11px; color: rgba(255,255,255,0.9); display: flex; align-items: center; gap: 4px; }
    .aria-status::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981; }
    .aria-close { background: transparent; border: none; color: #ffffff; cursor: pointer; width: 30px; height: 30px; border-radius: 6px; display: flex; align-items: center; justify-content: center; opacity: 0.85; transition: background 0.15s ease; }
    .aria-close:hover { background: rgba(255,255,255,0.18); opacity: 1; }
    .aria-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: #0e0e16; }
    .aria-messages::-webkit-scrollbar { width: 6px; }
    .aria-messages::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 3px; }
    .aria-msg { max-width: 85%; padding: 10px 14px; border-radius: 14px; font-size: 13.5px; line-height: 1.5; animation: aria-fadeIn 0.25s ease; white-space: pre-wrap; word-wrap: break-word; }
    @keyframes aria-fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .aria-msg-bot { align-self: flex-start; background: #1f1f2e; border: 1px solid rgba(124,58,237,0.2); border-bottom-left-radius: 4px; color: #f4f4fb; }
    .aria-msg-user { align-self: flex-end; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #ffffff; border-bottom-right-radius: 4px; }
    .aria-typing { align-self: flex-start; background: #1f1f2e; border: 1px solid rgba(124,58,237,0.2); padding: 12px 16px; border-radius: 14px; border-bottom-left-radius: 4px; display: flex; gap: 4px; }
    .aria-typing span { width: 6px; height: 6px; background: #a78bfa; border-radius: 50%; animation: aria-typingBounce 1.4s infinite; }
    .aria-typing span:nth-child(2) { animation-delay: 0.2s; }
    .aria-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes aria-typingBounce { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-6px); opacity: 1; } }
    .aria-quick { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 14px 4px; background: #13131c; flex-shrink: 0; }
    .aria-quick-btn { background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.3); color: #c4b5fd; padding: 6px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; font-family: inherit; transition: background 0.15s ease, color 0.15s ease; }
    .aria-quick-btn:hover { background: rgba(124,58,237,0.22); color: #ffffff; }
    .aria-cta { display: block; width: 100%; max-width: 240px; margin: 8px auto 4px; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #ffffff; border: none; padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer; transition: opacity 0.15s ease; }
    .aria-cta:hover { opacity: 0.92; }
    .aria-input-wrap { padding: 10px 14px; border-top: 1px solid rgba(124,58,237,0.2); background: #13131c; display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
    .aria-input { flex: 1; background: #0e0e16; border: 1px solid rgba(124,58,237,0.3); border-radius: 999px; padding: 10px 16px; color: #f4f4fb; font-size: 13.5px; font-family: inherit; outline: none; transition: border-color 0.15s ease; }
    .aria-input:focus { border-color: #7c3aed; }
    .aria-input::placeholder { color: #6b7280; }
    .aria-send { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #ec4899); border: none; color: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: opacity 0.15s ease; }
    .aria-send:hover { opacity: 0.92; }
    .aria-actions { padding: 8px 14px 10px; display: flex; gap: 6px; background: #13131c; border-top: 1px solid rgba(124,58,237,0.12); flex-shrink: 0; }
    .aria-action-btn { flex: 1; min-width: 70px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #d1d5db; padding: 6px 8px; border-radius: 7px; font-size: 11px; cursor: pointer; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 4px; transition: background 0.15s ease, color 0.15s ease; }
    .aria-action-btn:hover { background: rgba(124,58,237,0.18); color: #ffffff; }
    .aria-action-btn.amber { color: #fcd34d; border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.08); }
    .aria-action-btn.amber:hover { background: rgba(245,158,11,0.18); color: #ffffff; }
    @media (max-width: 480px) { .aria-fab { width: 56px; height: 56px; bottom: 16px; right: 16px; } .aria-window { right: 8px; left: 8px; bottom: 80px; width: auto; height: calc(100vh - 110px); max-height: 600px; } }
  `;

  function injectStyles() {
    if (document.getElementById('aria-styles')) return;
    const s = document.createElement('style');
    s.id = 'aria-styles';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }

  // ===== DOM =====
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'style') e.setAttribute('style', v);
      else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
      else e.setAttribute(k, v);
    });
    if (children) (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c === null || c === undefined) return;
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (typeof c === 'object') e.appendChild(c);
    });
    return e;
  }

  let fab, chatWindow, messagesEl, inputEl, sendBtn, quickEl, actionsEl, badge;
  let isOpen = false;
  let isTyping = false;

  function createUI() {
    fab = el('button', { class: 'aria-fab', 'aria-label': 'Conversar com Aria', title: 'Fale com a Aria' });
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
    badge = el('span', { class: 'aria-badge' }, '1');
    fab.appendChild(badge);
    fab.addEventListener('click', toggleWindow);

    chatWindow = el('div', { class: 'aria-window', 'aria-label': 'Chat com Aria' });

    const header = el('div', { class: 'aria-header' });
    const avatar = el('div', { class: 'aria-avatar' }, '✨');
    const info = el('div', { class: 'aria-info' });
    info.appendChild(el('div', { class: 'aria-name' }, 'Aria · AI School'));
    info.appendChild(el('div', { class: 'aria-status' }, 'Online · responde em segundos'));
    const closeBtn = el('button', { class: 'aria-close', 'aria-label': 'Fechar chat' });
    closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    closeBtn.addEventListener('click', toggleWindow);
    header.appendChild(avatar);
    header.appendChild(info);
    header.appendChild(closeBtn);

    messagesEl = el('div', { class: 'aria-messages' });
    quickEl = el('div', { class: 'aria-quick' });

    const inputWrap = el('div', { class: 'aria-input-wrap' });
    inputEl = el('input', {
      class: 'aria-input', type: 'text', placeholder: 'Pergunte sobre cursos, IA, programação...',
      autocomplete: 'off', 'aria-label': 'Mensagem'
    });
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    sendBtn = el('button', { class: 'aria-send', 'aria-label': 'Enviar mensagem' });
    sendBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    sendBtn.addEventListener('click', handleSend);
    inputWrap.appendChild(inputEl);
    inputWrap.appendChild(sendBtn);

    actionsEl = el('div', { class: 'aria-actions' });
    const waBtn = el('button', { class: 'aria-action-btn amber', style: 'flex: 1; min-width: 100%;', title: 'Falar com humano no WhatsApp' });
    waBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> Falar com humano no WhatsApp';
    waBtn.addEventListener('click', sendLeadToWhatsApp);
    actionsEl.appendChild(waBtn);

    chatWindow.appendChild(header);
    chatWindow.appendChild(messagesEl);
    chatWindow.appendChild(quickEl);
    chatWindow.appendChild(inputWrap);
    chatWindow.appendChild(actionsEl);

    document.body.appendChild(fab);
    document.body.appendChild(chatWindow);
  }

  function toggleWindow() {
    isOpen = !isOpen;
    if (isOpen) {
      fab.classList.add('open');
      chatWindow.classList.add('open');
      badge.style.display = 'none';
      if (state.messages.length === 0) startConversation();
      setTimeout(() => inputEl && inputEl.focus(), 300);
    } else {
      fab.classList.remove('open');
      chatWindow.classList.remove('open');
    }
  }

  function addMessage(text, from) {
    const msg = { text, from, timestamp: Date.now() };
    state.messages.push(msg);
    saveSession();
    const msgEl = el('div', { class: `aria-msg aria-msg-${from}` }, text);
    messagesEl.appendChild(msgEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    isTyping = true;
    const t = el('div', { class: 'aria-typing', id: 'aria-typing-indicator' });
    t.appendChild(el('span'));
    t.appendChild(el('span'));
    t.appendChild(el('span'));
    messagesEl.appendChild(t);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    isTyping = false;
    const t = document.getElementById('aria-typing-indicator');
    if (t) t.remove();
  }

  function clearQuick() { quickEl.innerHTML = ''; }

  function showQuick(replies) {
    clearQuick();
    if (!replies || replies.length === 0) return;
    replies.forEach(r => {
      const btn = el('button', { class: 'aria-quick-btn' }, r);
      btn.addEventListener('click', () => { clearQuick(); handleUserInput(r); });
      quickEl.appendChild(btn);
    });
  }

  function showCTA(label, handler) {
    const cta = el('button', { class: 'aria-cta' }, label);
    cta.addEventListener('click', handler);
    quickEl.appendChild(cta);
  }

  async function botSay(text, opts) {
    opts = opts || {};
    showTyping();
    // Tempo variável baseado no tamanho da resposta (DeepSeek demora mais)
    const waitTime = 800 + Math.random() * 800;
    await new Promise(r => setTimeout(r, waitTime));
    hideTyping();
    addMessage(text, 'bot');
    clearQuick();
    if (opts.quick) showQuick(opts.quick);
    if (opts.cta) showCTA(opts.cta.label, opts.cta.handler);
  }

  // ===== WHATSAPP =====
  function sendLeadToWhatsApp() {
    if (!state.lead.name || !state.lead.whatsapp) {
      botSay('Preciso do seu nome e WhatsApp primeiro. Pode me passar?');
      return;
    }
    saveLead();
    const summary = `🤖 NOVO LEAD - AI SCHOOL\n\nNome: ${state.lead.name}\nWhatsApp: ${state.lead.whatsapp}\nInteresse: ${state.lead.course_interest.length > 0 ? state.lead.course_interest.join(', ') : 'A definir'}\nMensagens: ${state.messages.length}`;
    window.open(`https://wa.me/${CONFIG.whatsappSchool}?text=${encodeURIComponent(summary)}`, '_blank');
  }

  function redirectToCheckout(slug) {
    saveLead();
    if (slug === 'mentoria-vip') {
      window.location.hash = '#/checkout/mentoria';
    } else {
      window.location.hash = `#/checkout/${slug}`;
    }
    if (isOpen) toggleWindow();
  }

  // ===== CONVERSATION FLOW =====
  function startConversation() {
    const existing = loadSession();
    if (existing && existing.lead && existing.lead.name && existing.lead.whatsapp) {
      state = existing;
      state.messages.forEach(m => {
        const msgEl = el('div', { class: `aria-msg aria-msg-${m.from}` }, m.text);
        messagesEl.appendChild(msgEl);
      });
      messagesEl.scrollTop = messagesEl.scrollHeight;
      botSay(`Oi, ${state.lead.name}! Bem-vindo de volta. Como posso te ajudar hoje?`, {
        quick: ['Quero ver cursos', 'Tirar dúvida', 'Quero matricular']
      });
      return;
    }
    state.lead.startedAt = new Date().toISOString();
    saveSession();
    botSay(`Oi! Sou a Aria da AI School. 👋\n\nPosso te ajudar de várias formas: explicar sobre IA, programação, design, marketing, recomendar o curso ideal, ou tirar dúvidas sobre preços e modalidades.\n\nPra começar, qual seu nome?`);
    state.stage = 'ask_name';
  }

  async function handleUserInput(input) {
    const text = (typeof input === 'string' ? input : '').trim();
    if (!text) return;
    inputEl.value = '';
    addMessage(text, 'user');

    if (state.stage === 'ask_name') {
      const name = text.split(' ').slice(0, 2).join(' ').substring(0, 40);
      state.lead.name = name;
      saveSession();
      await botSay(`Prazer, ${name}! 😊\n\nAgora me passa seu WhatsApp (com DDD) pra eu poder te enviar informações e contato se precisar:\n\nEx: 11966161611`);
      state.stage = 'ask_whatsapp';
      return;
    }

    if (state.stage === 'ask_whatsapp') {
      const digits = text.replace(/\D/g, '');
      if (digits.length < 10) {
        await botSay('Hmm, esse número parece incompleto. Pode me passar novamente? Preciso do DDD + número (ex: 11966161611).');
        return;
      }
      state.lead.whatsapp = digits;
      try { localStorage.setItem('aichat_lead_whatsapp', digits); } catch (e) {}
      saveSession();
      saveLead();
      state.stage = 'chatting';
      await botSay(`Perfeito, ${state.lead.name}! ✅\n\nAgora me conta: o que você quer aprender ou tirar dúvida? Posso falar sobre qualquer área, desde IA e programação até marketing digital e design.`, {
        quick: ['O que é IA?', 'Quero ver cursos', 'Quero programar', 'Quero aprender design']
      });
      return;
    }

    // Chatting: usar DeepSeek API
    await handleChat(text);
  }

  async function handleChat(text) {
    const input = normalize(text);

    // Detectar intenção de matrícula explicita (atalho direto pro checkout)
    if (/^(quero matricular|matricular agora|inscrever agora|fechar agora|bora fechar)/.test(input)) {
      const course = state.suggestedCourse || findCourse(input);
      if (course) {
        trackInterest(course.slug);
        await botSay(`Boa, ${state.lead.name}! 🚀 Vou te levar direto pro checkout de ${course.titulo}. Lá você gera o PIX e paga em segundos. Também aceitamos boleto 2x sem juros ou cartão em até 12x.`, {
          cta: { label: '🚀 Ir para o checkout', handler: () => redirectToCheckout(course.slug) }
        });
        return;
      }
    }

    // Detectar interesse em curso específico e sugerir matrícula
    const course = findCourse(input);
    if (course && !state.suggestedCourse) {
      state.suggestedCourse = course;
      trackInterest(course.slug);
    }

    // Chama DeepSeek API pra resposta real
    showTyping();
    try {
      const reply = await callDeepSeek(text);
      hideTyping();
      if (reply) {
        addMessage(reply, 'bot');
        // Sugere CTA de matrícula se um curso foi identificado
        if (state.suggestedCourse) {
          const ctaLabel = state.suggestedCourse.slug === 'mentoria-vip' ? '👑 Quero Mentoria VIP' : '🚀 Quero matricular';
          showCTA(ctaLabel, () => redirectToCheckout(state.suggestedCourse.slug));
        }
        showQuick(['Ver outros cursos', 'Tirar outra dúvida', 'Falar com humano']);
      }
    } catch (err) {
      hideTyping();
      const fallback = getFallbackResponse(text);
      addMessage(fallback, 'bot');
      showQuick(['Quero ver cursos', 'Quero matricular', 'Falar com humano']);
    }
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    handleUserInput(text);
  }

  // ===== INIT =====
  function init() {
    injectStyles();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createUI);
    } else {
      createUI();
    }
  }

  window.AriaChatbot = {
    open: () => { if (!isOpen) toggleWindow(); },
    close: () => { if (isOpen) toggleWindow(); },
  };

  try { init(); } catch (err) { console.error('[Aria] Erro ao inicializar:', err); }
})();
