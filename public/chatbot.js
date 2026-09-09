/**
 * AI School - Aria (SDR Senior Chatbot)
 * v3.1 - Script de vendas profissional, UX limpa, sem bugs
 *
 * Fluxo de SDR senior:
 *   1. Hook (benefício imediato)
 *   2. Qualificação (perfil + objetivo)
 *   3. Discovery (problema real)
 *   4. Apresentação de solução (curso certo)
 *   5. Quebra de objeções
 *   6. Fechamento (CTA de matrícula)
 *
 * Features:
 * - Botão flutuante com animação sutil
 * - Captação de lead no primeiro contato
 * - RAG com knowledge base completa
 * - Salva leads no CRM (leads.js) automaticamente
 * - Exportação TXT
 * - Persistência de sessão (continua de onde parou)
 */
(function () {
  'use strict';

  // ===== CONFIG =====
  const CONFIG = {
    whatsappSchool: '55119666161611',
    appName: 'AI School',
    storageKey: 'aischool_leads_v3',
    sessionKey: 'aischool_session_v3',
    primaryColor: '#7c3aed',
    accentColor: '#10b981',
    botName: 'Aria',
  };

  // ===== KNOWLEDGE BASE (CURSOS) =====
  const COURSES = [
    {
      slug: 'ia-iniciante',
      title: 'IA Iniciante',
      keywords: ['iniciante', 'iniciar', 'comecar', 'começar', 'do zero', 'primeiros passos', 'basico', 'básico', 'chatgpt', 'claude', 'gemini', 'prompt', 'prompts', 'nunca usei', 'nao sei nada'],
      short: 'Para quem nunca usou IA. ChatGPT, Gemini, prompts e criação de imagens com Gemini Imagen em 10h.',
      level: 'Iniciante',
      price: 4000,
      hours: 10,
      audience: 'qualquer pessoa que quer começar a usar IA',
      benefits: [
        'Dominar ChatGPT e Gemini (ferramentas Google)',
        'Aprender a fórmula CRISPE de prompts que funcionam',
        'Criar imagens com Gemini Imagen',
        'Aplicar IA no trabalho, estudos e vida pessoal',
        'Certificado digital + comunidade de alunos',
      ],
      objection: 'São R$4.000 por 10h (R$400/hora online). Aula presencial R$450/h. Aceitamos PIX, boleto 2x sem juros ou cartão em até 12x com juros da operadora.',
    },
    {
      slug: 'ia-intermediario',
      title: 'IA Intermediário',
      keywords: ['intermediario', 'intermediário', 'automacao', 'automação', 'agente', 'agentes', 'n8n', 'make', 'fluxo', 'encadear', 'integrar', 'workflow', 'automatizar'],
      short: 'Fluxos, automações e agentes. n8n, Make, RAG básico com Gemini em 10h.',
      level: 'Intermediário',
      price: 4000,
      hours: 10,
      audience: 'profissionais que já usam ChatGPT e querem automatizar tarefas',
      benefits: [
        'Construir agentes de IA que trabalham sozinhos',
        'Automatizar tarefas com n8n (gratuito)',
        'Conectar IA com Gmail, Sheets, WhatsApp',
        'Criar RAG com seus documentos',
        'Sair com 10 templates de automação prontos',
      ],
      objection: 'Você não precisa ser programador. Se já usa ChatGPT, dá pra acompanhar tranquilo.',
    },
    {
      slug: 'ia-avancado',
      title: 'IA Avançado',
      keywords: ['avancado', 'avançado', 'api', 'apis', 'rag', 'llm', 'fine-tuning', 'finetuning', 'mcp', 'langchain', 'langgraph', 'vector', 'embedding', 'desenvolvedor', 'tecnico', 'técnico'],
      short: 'APIs de LLM, RAG em produção, agentes autônomos, MCP, fine-tuning em 10h. Foco em Gemini API.',
      level: 'Avançado',
      price: 4000,
      hours: 10,
      audience: 'desenvolvedores, analistas de dados, CTOs, fundadores de startup',
      benefits: [
        'Dominar APIs de OpenAI, Anthropic, Google',
        'Construir agentes autônomos com LangGraph',
        'RAG em produção com vector DB',
        'Model Context Protocol (MCP) do zero',
        'Eval e guardrails para produtos em produção',
      ],
      objection: 'Exige programação básica (Python ou JS). Se você é dev, vai se sentir em casa.',
    },
    {
      slug: 'vibe-code',
      title: 'Vibe Code',
      keywords: ['vibe code', 'vibecode', 'cursor', 'windsurf', 'claude code', 'programar com ia', 'criar app', 'criar site', 'lovable', 'v0', 'sem programar', 'sem saber programar'],
      short: 'Programe com IA usando Cursor e Gemini Code Assist. Construa apps sem ser engenheiro. 10h.',
      level: 'Iniciante',
      price: 4000,
      hours: 10,
      audience: 'empreendedores, designers, qualquer pessoa que queira criar apps',
      benefits: [
        'Construir apps reais sem saber programar',
        'Dominar Cursor (editor que programa com você)',
        'Publicar 2 apps no ar em 10 horas',
        'Deploy na Vercel com domínio próprio',
        'Sem pré-requisito técnico',
      ],
      objection: 'Se você sabe usar um computador, consegue. IA escreve o código por você.',
    },
    {
      slug: 'edicao-videos-ia',
      title: 'Edição de Vídeos com IA',
      keywords: ['video', 'vídeo', 'videos', 'vídeos', 'edicao', 'edição', 'editar', 'capcut', 'runway', 'pika', 'kling', 'sora', 'youtube', 'tiktok', 'reels', 'shorts', 'criador de conteudo', 'criador de conteúdo', 'social media'],
      short: 'Edição profissional com Gemini e Google Flow. Foco total nas ferramentas Google. 10h.',
      level: 'Intermediário',
      price: 4000,
      hours: 10,
      audience: 'criadores de conteúdo, social media, youtubers, tiktokers',
      benefits: [
        'Editar vídeos 5x mais rápido com CapCut IA',
        'Gerar b-roll com Runway e Pika',
        'Voz com IA (ElevenLabs)',
        'Legendas automáticas estilizadas',
        'Workflow completo: roteiro → post',
      ],
      objection: 'Não precisa saber edição. CapCut é grátis e você aprende em 1 aula.',
    },
    {
      slug: 'ia-engenheiros-arquitetos',
      title: 'IA para Engenheiros e Arquitetos',
      keywords: ['engenheiro', 'engenheiros', 'arquiteto', 'arquitetos', 'engenharia', 'arquitetura', 'bim', 'revit', 'sketchup', 'render', 'renderizacao', 'renderização', 'memoria de calculo', 'memória de cálculo', 'projeto', 'projetos', 'construcao', 'construção'],
      short: 'BIM, renderização, projetos e propostas com IA. Foco em Gemini + Google Workspace. 10h.',
      level: 'Intermediário',
      price: 4000,
      hours: 10,
      audience: 'engenheiros civis, arquitetos, calculistas, projetistas',
      benefits: [
        'Renderizar 10x mais rápido com Midjourney + Veras',
        'Gerar memória de cálculo assistida por IA',
        'Criar propostas comerciais impactantes',
        'Analisar normas técnicas com RAG',
        'Workflow completo: briefing → entrega',
      ],
      objection: 'IA não substitui o engenheiro, ela o multiplica. Você mantém a responsabilidade técnica.',
    },
    {
      slug: 'ia-operadores-drone',
      title: 'IA para Operadores de Drone',
      keywords: ['drone', 'drones', 'operador', 'piloto', 'anac', 'aerofotogrametria', 'mapeamento', 'inspecao', 'inspeção', 'filmagem', 'aereo', 'aéreo', 'ortomosaico'],
      short: 'Pós-processamento, mapeamento, inspeção com IA em 10h.',
      level: 'Intermediário',
      price: 4000,
      hours: 10,
      audience: 'operadores de drone, pilotos ANAC, empresas de aerolevantamento',
      benefits: [
        'Editar filmagens aéreas 3x mais rápido',
        'Gerar ortomosaicos inteligentes',
        'Detectar defeitos em inspeções com visão computacional',
        'Relatórios automáticos com IA',
        'Precificar seus serviços com confiança',
      ],
      objection: 'Curso específico para sua área. Aumenta seu ticket médio em 40-60%.',
    },
    {
      slug: 'ia-robotica-criancas',
      title: 'IA + Robótica para Crianças (7-12 anos)',
      keywords: ['crianca', 'criança', 'criancas', 'crianças', 'filho', 'filha', 'infantil', 'kids', 'robotica', 'robótica', 'scratch', 'lego', 'microbit', '7 anos', '8 anos', '9 anos', '10 anos', '11 anos', '12 anos'],
      short: 'Curso lúdico onde crianças criam robôs, games e histórias com IA. 10h.',
      level: 'Infantil',
      price: 4000,
      hours: 10,
      audience: 'crianças de 7 a 12 anos curiosas por tecnologia',
      benefits: [
        'Primeiro contato com IA de forma segura e divertida',
        'Programação visual com Scratch',
        'Montagem de robôs educacionais',
        'Lógica de programação (loop, condição, variável)',
        'Apresentação final para os pais',
      ],
      objection: 'Turmas pequenas (máx. 8 crianças), supervisão total e conteúdo adaptado por idade.',
    },
    {
      slug: 'ia-adolescentes',
      title: 'IA para Adolescentes (13-17 anos)',
      keywords: ['adolescente', 'adolescentes', 'jovem', 'jovens', '13 anos', '14 anos', '15 anos', '16 anos', '17 anos', 'filho adolescente', 'game', 'jogos', 'itch.io'],
      short: 'Criação de apps, jogos, arte digital com IA em 10h.',
      level: 'Intermediário',
      price: 4000,
      hours: 10,
      audience: 'adolescentes de 13 a 17 anos interessados em tecnologia',
      benefits: [
        'Construir primeiro app com IA',
        'Criar jogos e publicar na itch.io',
        'Arte digital com Midjourney',
        'Edição de vídeo para TikTok/YouTube',
        'Portfólio digital publicado',
      ],
      objection: 'Estimula criatividade, responsabilidade digital e prepara para o mercado futuro.',
    },
    {
      slug: 'pacote-office-ia',
      title: 'Pacote Office com IA',
      keywords: ['office', 'excel', 'word', 'powerpoint', 'outlook', 'copilot', 'microsoft 365', 'm365', 'planilha', 'apresentacao', 'apresentação', 'ppt', 'produtividade'],
      short: 'Excel, Word e PowerPoint turbinados com Copilot e ChatGPT em 10h.',
      level: 'Iniciante',
      price: 4000,
      hours: 10,
      audience: 'profissionais administrativos, analistas, gerentes',
      benefits: [
        'Análise de dados em linguagem natural no Excel',
        'Apresentações em 60 segundos com Copilot',
        'E-mails automáticos no Outlook',
        'Automação entre apps com Power Automate',
        '50 templates prontos para levar pro trabalho',
      ],
      objection: 'Você já usa Office. Agora vai usá-lo 5x mais rápido.',
    },
    {
      slug: 'canva-ia',
      title: 'Canva com IA',
      keywords: ['canva', 'design', 'magic studio', 'magic design', 'logo', 'logotipo', 'identidade visual', 'social media', 'posts', 'instagram', 'thumbnail'],
      short: 'Criação de imagens com Gemini Imagen + GPT. Sem Midjourney/Stable Diffusion. 10h.',
      level: 'Iniciante',
      price: 4000,
      hours: 10,
      audience: 'empreendedores, social media, professores, pequenos negócios',
      benefits: [
        'Magic Design: do prompt ao layout pronto',
        'Magic Edit: edição de imagem com IA',
        'Branding completo (logo, paleta, manual)',
        'Templates para social media',
        'Apresentações e impressos profissionais',
      ],
      objection: 'Se você nunca abriu o Canva, vai sair criando peças profissionais. Se já usa, vai 5x mais rápido.',
    },
    {
      slug: 'criacao-sites-lovable',
      title: 'Criação de Sites no Lovable',
      keywords: ['lovable', 'no-code', 'nocode', 'site', 'sites', 'landing page', 'app', 'supabase', 'sem programar', 'sem saber programar'],
      short: 'Crie sites e apps completos no Lovable com 1 prompt. 10h.',
      level: 'Iniciante',
      price: 4000,
      hours: 10,
      audience: 'empreendedores, designers, pequenos negócios',
      benefits: [
        'Publicar 3 projetos reais no ar',
        'Integração com Supabase (banco + auth)',
        'Landing page de alta conversão',
        'Deploy em domínio próprio',
        'Sem programar uma linha',
      ],
      objection: 'Lovable é a ferramenta mais simples do mercado. Não exige nada técnico.',
    },
    {
      slug: 'criacao-sites-avancado',
      title: 'Criação de Sites Avançado',
      keywords: ['next.js', 'nextjs', 'cursor', 'v0', 'bolt', 'saas', 'shadcn', 'tailwind', 'deploy', 'vercel', 'desenvolvedor web'],
      short: 'Vibe coding profissional com Cursor, v0, Bolt, Next.js em 10h.',
      level: 'Avançado',
      price: 4000,
      hours: 10,
      audience: 'desenvolvedores, designers técnicos, fundadores',
      benefits: [
        'Dominar Cursor Composer + Agent mode',
        'Gerar UIs completas com v0',
        'Auth + banco com Supabase',
        'Pagamentos com Stripe',
        'Publicar um SaaS no ar',
      ],
      objection: 'Exige JS básico. Se você é dev, vai multiplicar produtividade por 5.',
    },
    {
      slug: 'poe-bots-ia',
      title: 'Poe: Crie Seus Próprios Bots de IA',
      keywords: ['poe', 'bot', 'bots', 'gpt bot', 'claude bot', 'monetizar', 'monetizacao', 'monetização', 'poe store'],
      short: 'Crie bots com IA para vender, atender e automatizar. Monetize com Poe. 10h.',
      level: 'Intermediário',
      price: 4000,
      hours: 10,
      audience: 'criadores de conteúdo, empreendedores, social media',
      benefits: [
        'Criar bots personalizados em 5 minutos',
        'Usar múltiplos modelos (GPT-4, Claude, Llama)',
        'Subir knowledge base com seus PDFs',
        'Publicar na Poe Store',
        'Monetizar com bots',
      ],
      objection: 'Poe tem plano gratuito. Dá pra começar sem investir nada.',
    },
    {
      slug: 'ia-empreendedorismo',
      title: 'IA + Empreendedorismo (Solo First)',
      keywords: ['empreender', 'empreendedorismo', 'empreendedor', 'solo first', 'sair do clt', 'clt', 'consultor', 'negocio proprio', 'próprio negócio', 'freelancer', 't-shaped', 'dharma', 'posicionamento'],
      short: 'Torne-se um Empreendedor T-Shaped com IA. Do posicionamento ao primeiro cliente. 10h.',
      level: 'Intermediário',
      price: 4000,
      hours: 10,
      audience: 'profissionais que querem sair do CLT, freelancers que querem escalar',
      benefits: [
        'Definir seu Dharma (posicionamento de excelência)',
        'Construir Soft Assets (intelectual, reputacional, social)',
        'Criar oferta irresistível',
        'Prospecção e vendas com IA',
        'Plano 90 dias para sair do CLT',
      ],
      objection: 'Baseado no Solo First Framework. Curso mais procurado por quem quer transição de carreira.',
    }
  ];

  const MENTORIA = {
    slug: 'mentoria-vip',
    title: 'Mentoria VIP',
    isMentoria: true,
    keywords: ['mentoria', 'mentor', 'vip', '1-a-1', 'individual', 'personalizada', 'personalizado', 'exclusivo', 'sob medida', 'premium', 'acelerar'],
    short: 'Mentoria 1-a-1 sob medida. Você define o que quer aprender e desenhamos um plano só seu.',
    level: 'VIP',
    price: 4500,
    hours: 10,
    audience: 'executivos, fundadores, profissionais que precisam de resultados rápidos',
    benefits: [
      'Plano de aprendizado 100% personalizado',
      'Sessões 1-a-1 ao vivo no seu ritmo',
      'Canal direto com mentor no WhatsApp',
      'Acompanhamento de projeto real',
      'Horários flexíveis (manhã, tarde, noite, fim de semana)',
    ],
    objection: 'A partir de R$4.500. Para quem precisa de resultado rápido e focado.',
  };

  // ===== OBJECTIONS HANDLER =====
  const OBJECTIONS = [
    {
      triggers: ['caro', 'caro demais', 'muito caro', 'nao tenho dinheiro', 'não tenho dinheiro', 'custa muito', 'valor alto', 'ta pago', 'tá caro', 'fora do orcamento', 'fora do orçamento'],
      response: `Entendo perfeitamente, ${'$NAME'}. Vou te mostrar as opções de pagamento:\n\n✅ PIX: R$4.000 à vista (10h online)\n✅ Boleto: 2x de R$2.000 sem juros\n✅ Cartão: até 12x com juros da operadora\n\nE você escolhe a modalidade:\n💻 Online: R$400/hora (pacote 10h = R$4.000)\n📍 Presencial: R$450/hora (pacote 10h = R$4.500)\n\nPara automatização total, temos o curso modular: R$4.000 por módulo (mínimo 3 módulos). Quer que eu te mostre o curso ideal pro seu momento?`
    },
    {
      triggers: ['nao tenho tempo', 'não tenho tempo', 'sem tempo', 'ocupado', 'muito corrido', 'trabalho muito'],
      response: `Entendo, ${'$NAME'}. Tempo é o bem mais escasso hoje. Por isso nosso curso é só 10 horas:\n\n✅ 5 encontros de 2h (ou 10 de 1h, você escolhe)\n✅ Online ao vivo via Zoom + gravações por 12 meses\n✅ Horários flexíveis (manhã, tarde, noite ou fim de semana)\n✅ Turmas novas toda semana\n\nEm 2 semanas você termina o curso. Ou prefere começar com a Mentoria VIP e definir seu próprio cronograma?`
    },
    {
      triggers: ['nao sei qual curso', 'não sei qual curso', 'qual curso', 'indeciso', 'nao sei', 'não sei', 'dúvida qual', 'duvida qual'],
      response: `Tranquilo, ${'$NAME'}. Vou te ajudar a escolher. Me conta rapidinho:\n\n1. Você quer IA pra uso pessoal/profissional geral, ou pra uma área específica?\n2. Você já usou ChatGPT ou alguma IA antes?\n3. Para você mesmo ou pra outra pessoa (filho, equipe)?\n\nCom essas 3 respostas eu te indico o curso ideal em 10 segundos.`
    },
    {
      triggers: ['preciso pensar', 'vou pensar', 'depois eu vejo', 'mais pra frente', 'amanha', 'amanhã', 'vou analisis', 'vou ver'],
      response: `Compreensível, ${'$NAME'}. Mas deixa eu te dar 2 informações importantes pra te ajudar a decidir:\n\n📊 Turmas novas toda semana, começar agora = começar a aplicar IA no trabalho mais cedo\n⏰ Aulas ao vivo (não é só vídeo gravado), você interage com o instrutor\n\nPosso te salvar uma vaga na próxima turma e você decide até lá? É só me confirmar.`
    },
    {
      triggers: ['já fiz curso', 'ja fiz curso', 'ja estudei', 'já estudei', 'conheço IA', 'sei usar'],
      response: `Ótimo, ${'$NAME'}. Já ter uma base é excelente. Me conta: o que você já domina?\n\n1. Já usa ChatGPT/Claude/Gemini no dia a dia?\n2. Já fez automação com n8n ou Zapier?\n3. Já programou com IA (Cursor, Claude Code)?\n\nCom base na sua resposta, eu te indico o nível certo: Intermediário (automações) ou Avançado (APIs, RAG, agentes). Ou, se já é avançado, a Mentoria VIP pra projetos específicos.`
    },
    {
      triggers: ['funciona mesmo', 'realmente funciona', 'é verdade', 'é confiavel', 'é confiável', 'é golpe', 'é furada'],
      response: `Entendo a preocupação, ${'$NAME'}. Sobre confiabilidade:\n\n✅ +1.200 alunos formados\n✅ Aulas ao vivo (não é só vídeo gravado)\n✅ Certificado digital com verificação de autenticidade\n✅ Comunidade ativa no WhatsApp\n✅ Instrutores experientes no mercado\n✅ Pagamento via PIX, boleto ou cartão\n\nSe quiser, posso te passar no WhatsApp da escola pra conversar com algum ex-aluno.`
    }
  ];

  // ===== INTENT DETECTION =====
  const INTENTS = {
    payment: {
      triggers: ['pagar', 'pagamento', 'pix', 'mercado pago', 'cartao', 'cartão', 'boleto', 'parcelar', 'parcela', 'forma de pagamento', 'como pagar', 'como funciona o pagamento'],
      response: `💳 Pagamento 100% via PIX, ${'$NAME'}:\n\n✅ QR Code gerado na hora quando você clica em "Matricular"\n✅ Você paga em segundos pelo app do seu banco\n✅ Retorno automático assim que o banco confirma\n✅ Sem burocracia, sem espera\n\nNão trabalhamos com cartão ou boleto, PIX é mais rápido, mais barato e mais seguro. Pronto pra matricular?`
    },
    schedule: {
      triggers: ['horario', 'horário', 'quando', 'aula', 'aulas', 'encontro', 'encontros', 'data', 'turma', 'turmas', 'inicio', 'início', 'disponibilidade', 'dias'],
      response: `📅 Os cursos são 100% online ao vivo via Zoom, ${'$NAME'}:\n\nCada curso = 10 horas (5 encontros de 2h ou 10 de 1h)\nTurmas novas toda semana\nHorários: manhã, tarde, noite ou fim de semana\nGravações disponíveis por 12 meses\nTurmas pequenas (máx. 10 alunos; infantil máx. 8)\n\nMentoria VIP: horários 100% flexíveis, você agenda direto com o mentor.`
    },
    guarantee: {
      triggers: ['garantia', 'confianca', 'confiança', 'seguranca', 'segurança', 'nao gostei', 'não gostei', 'arrependimento', 'cancelar', 'cancelamento'],
      response: `🛡️ Transparência total, ${'$NAME'}:\n\nAulas ao vivo (não é só vídeo gravado)\nMaterial de apoio completo incluso\nCertificado digital com verificação\nComunidade ativa no WhatsApp\nSuporte direto com os instrutores\nVocê escolhe online ou presencial\n\nNossa prioridade é seu aprendizado real. Em cada aula você sai com algo prático pronto.`
    },
    certificate: {
      triggers: ['certificado', 'certificados', 'diploma', 'comprovante', 'horas complementares'],
      response: `📜 Sim, todos os cursos emitem certificado digital, ${'$NAME'}:\n\nCarga horária de 10 horas\nVerificação de autenticidade\nVálido para horas complementares\nMentoria VIP emite certificado personalizado`
    },
    price: {
      triggers: ['preco', 'preço', 'valor', 'custo', 'quanto custa', 'quanto', 'quanto fica', 'valor do curso', 'valor da mentoria', 'tabela'],
      response: `💰 Tabela de preços, ${'$NAME'}:\n\nTodos os cursos: R$4.000 / 10 horas (R$400/h)\nMentoria VIP: a partir de R$4.500 (10h 1-a-1)\nHoras extras avulsas: R$400/h\n\nNosso diferencial: você paga por hora, não por "curso de 200 horas". Quer que eu te mostre qual curso se encaixa no seu momento?`
    }
  };

  // ===== STATE =====
  let state = {
    stage: 'greeting',
    lead: { name: '', whatsapp: '', startedAt: null, course_interest: [], lastIntent: null },
    messages: [],
    suggestedCourse: null,
  };

  // ===== STORAGE =====
  function loadSession() {
    try {
      const s = localStorage.getItem(CONFIG.sessionKey);
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed && parsed.lead && parsed.lead.name && parsed.lead.whatsapp) {
          return parsed;
        }
      }
    } catch (e) {}
    return null;
  }

  function saveSession() {
    try {
      localStorage.setItem(CONFIG.sessionKey, JSON.stringify(state));
    } catch (e) {}
  }

  function saveLead() {
    if (!state.lead.name || !state.lead.whatsapp) return;
    try {
      // 1. Salva no formato antigo (compatibilidade)
      const leads = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      const idx = leads.findIndex(l => l.whatsapp === state.lead.whatsapp);
      const data = {
        ...state.lead,
        updatedAt: new Date().toISOString(),
        messages: state.messages
      };
      if (idx >= 0) leads[idx] = data;
      else leads.push(data);
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(leads));

      // 2. Salva também no formato novo (CRM) via biblioteca leads.js
      if (window.AISchoolLeads) {
        const conversation = state.messages.map(m => ({
          from: m.from,
          text: m.text,
          timestamp: m.timestamp
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
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function scoreMatch(input, keywords) {
    let score = 0;
    keywords.forEach(k => {
      const kn = normalize(k);
      if (input.includes(kn)) score += kn.length > 4 ? 3 : 2;
    });
    return score;
  }

  function findCourse(query) {
    const input = normalize(query);
    let best = null, bestScore = 0;
    [...COURSES, MENTORIA].forEach(c => {
      const s = scoreMatch(input, c.keywords);
      if (s > bestScore) { bestScore = s; best = c; }
    });
    return bestScore >= 2 ? best : null;
  }

  function detectIntent(query) {
    const input = normalize(query);
    let best = null, bestScore = 0;
    Object.entries(INTENTS).forEach(([name, intent]) => {
      const s = scoreMatch(input, intent.triggers);
      if (s > bestScore) { bestScore = s; best = { name, ...intent }; }
    });
    return bestScore >= 2 ? best : null;
  }

  function detectObjection(query) {
    const input = normalize(query);
    let best = null, bestScore = 0;
    OBJECTIONS.forEach(o => {
      const s = scoreMatch(input, o.triggers);
      if (s > bestScore) { bestScore = s; best = o; }
    });
    return bestScore >= 2 ? best : null;
  }

  function formatBRL(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
  }

  function personalize(text) {
    return text.replace(/\$\{?NAME\}?/g, state.lead.name || '');
  }

  // ===== STYLES (UX LIMPA, SEM HOVER PRETO) =====
  const STYLES = `
    .aria-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      border: none;
      cursor: pointer;
      z-index: 9998;
      box-shadow: 0 6px 24px rgba(124, 58, 237, 0.4), 0 2px 8px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      animation: aria-pulse 3s ease-in-out infinite;
    }
    .aria-fab:hover { transform: scale(1.06); box-shadow: 0 8px 32px rgba(124, 58, 237, 0.5); }
    .aria-fab:active { transform: scale(0.96); }
    .aria-fab svg { width: 28px; height: 28px; color: #ffffff; }
    .aria-fab.open { transform: scale(0); opacity: 0; pointer-events: none; animation: none; }

    @keyframes aria-pulse {
      0%, 100% { box-shadow: 0 6px 24px rgba(124, 58, 237, 0.4), 0 0 0 0 rgba(124, 58, 237, 0.3); }
      50% { box-shadow: 0 6px 24px rgba(124, 58, 237, 0.4), 0 0 0 12px rgba(124, 58, 237, 0); }
    }

    .aria-badge {
      position: absolute;
      top: -4px; right: -4px;
      background: #ef4444;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      width: 22px; height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #0a0a14;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    }

    .aria-window {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 600px;
      max-height: calc(100vh - 130px);
      background: #15151f;
      border: 1px solid rgba(124, 58, 237, 0.25);
      border-radius: 18px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      z-index: 9999;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
      color: #f4f4fb;
      animation: aria-slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .aria-window.open { display: flex; }

    @keyframes aria-slideUp {
      from { transform: translateY(16px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .aria-header {
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .aria-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }
    .aria-info { flex: 1; min-width: 0; }
    .aria-name { font-weight: 700; font-size: 14px; color: #ffffff; }
    .aria-status { font-size: 11px; color: rgba(255,255,255,0.9); display: flex; align-items: center; gap: 4px; }
    .aria-status::before {
      content: '';
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 6px #10b981;
    }
    .aria-close {
      background: transparent;
      border: none;
      color: #ffffff;
      cursor: pointer;
      width: 30px; height: 30px;
      border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.85;
      transition: background 0.15s ease;
    }
    .aria-close:hover { background: rgba(255,255,255,0.18); opacity: 1; }

    .aria-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #0e0e16;
    }
    .aria-messages::-webkit-scrollbar { width: 6px; }
    .aria-messages::-webkit-scrollbar-track { background: transparent; }
    .aria-messages::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.4); border-radius: 3px; }
    .aria-messages::-webkit-scrollbar-thumb:hover { background: rgba(124, 58, 237, 0.6); }

    .aria-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.5;
      animation: aria-fadeIn 0.25s ease;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    @keyframes aria-fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .aria-msg-bot {
      align-self: flex-start;
      background: #1f1f2e;
      border: 1px solid rgba(124, 58, 237, 0.2);
      border-bottom-left-radius: 4px;
      color: #f4f4fb;
    }
    .aria-msg-user {
      align-self: flex-end;
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      color: #ffffff;
      border-bottom-right-radius: 4px;
    }

    .aria-typing {
      align-self: flex-start;
      background: #1f1f2e;
      border: 1px solid rgba(124, 58, 237, 0.2);
      padding: 12px 16px;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      display: flex;
      gap: 4px;
    }
    .aria-typing span {
      width: 6px; height: 6px;
      background: #a78bfa;
      border-radius: 50%;
      animation: aria-typingBounce 1.4s infinite;
    }
    .aria-typing span:nth-child(2) { animation-delay: 0.2s; }
    .aria-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes aria-typingBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    .aria-quick {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 14px 4px;
      background: #13131c;
      flex-shrink: 0;
    }
    .aria-quick-btn {
      background: rgba(124, 58, 237, 0.12);
      border: 1px solid rgba(124, 58, 237, 0.3);
      color: #c4b5fd;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 12px;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }
    .aria-quick-btn:hover {
      background: rgba(124, 58, 237, 0.22);
      color: #ffffff;
      border-color: rgba(124, 58, 237, 0.5);
    }

    .aria-cta {
      display: block;
      width: 100%;
      max-width: 240px;
      margin: 8px auto 4px;
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      color: #ffffff;
      border: none;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .aria-cta:hover { opacity: 0.92; }
    .aria-cta:active { transform: scale(0.98); }

    .aria-input-wrap {
      padding: 10px 14px;
      border-top: 1px solid rgba(124, 58, 237, 0.2);
      background: #13131c;
      display: flex;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
    }
    .aria-input {
      flex: 1;
      background: #0e0e16;
      border: 1px solid rgba(124, 58, 237, 0.3);
      border-radius: 999px;
      padding: 10px 16px;
      color: #f4f4fb;
      font-size: 13.5px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .aria-input:hover { background: #13131c; }
    .aria-input:focus { border-color: #7c3aed; background: #13131c; }
    .aria-input::placeholder { color: #6b7280; }

    .aria-send {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      border: none;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .aria-send:hover { opacity: 0.92; }
    .aria-send:active { transform: scale(0.94); }
    .aria-send:disabled { opacity: 0.4; cursor: not-allowed; }

    .aria-actions {
      padding: 8px 14px 10px;
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      background: #13131c;
      border-top: 1px solid rgba(124, 58, 237, 0.12);
      flex-shrink: 0;
    }
    .aria-action-btn {
      flex: 1;
      min-width: 70px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      color: #d1d5db;
      padding: 6px 8px;
      border-radius: 7px;
      font-size: 11px;
      cursor: pointer;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }
    .aria-action-btn:hover {
      background: rgba(124, 58, 237, 0.18);
      color: #ffffff;
      border-color: rgba(124, 58, 237, 0.4);
    }
    .aria-action-btn.green {
      color: #6ee7b7;
      border-color: rgba(16, 185, 129, 0.3);
      background: rgba(16, 185, 129, 0.08);
    }
    .aria-action-btn.green:hover {
      background: rgba(16, 185, 129, 0.18);
      color: #ffffff;
      border-color: rgba(16, 185, 129, 0.5);
    }
    .aria-action-btn.amber {
      color: #fcd34d;
      border-color: rgba(245, 158, 11, 0.3);
      background: rgba(245, 158, 11, 0.08);
    }
    .aria-action-btn.amber:hover {
      background: rgba(245, 158, 11, 0.18);
      color: #ffffff;
      border-color: rgba(245, 158, 11, 0.5);
    }

    @media (max-width: 480px) {
      .aria-fab { width: 56px; height: 56px; bottom: 16px; right: 16px; }
      .aria-fab svg { width: 26px; height: 26px; }
      .aria-window {
        right: 8px; left: 8px; bottom: 80px;
        width: auto;
        height: calc(100vh - 110px);
        max-height: 600px;
      }
    }
  `;

  function injectStyles() {
    if (document.getElementById('aria-styles')) return;
    const s = document.createElement('style');
    s.id = 'aria-styles';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }

  // ===== DOM HELPERS =====
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (v === null || v === undefined) return;
        if (k === 'class') e.className = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'style') e.setAttribute('style', v);
        else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
        else e.setAttribute(k, v);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(c => {
        if (c === null || c === undefined) return;
        if (typeof c === 'string') e.appendChild(document.createTextNode(c));
        else if (typeof c === 'object') e.appendChild(c);
      });
    }
    return e;
  }

  // ===== UI ELEMENTS =====
  let fab, chatWindow, messagesEl, inputEl, sendBtn, quickEl, actionsEl, badge;
  let isOpen = false;

  function createUI() {
    fab = el('button', { class: 'aria-fab', 'aria-label': 'Conversar com Aria', title: 'Converse com a Aria' });
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
    badge = el('span', { class: 'aria-badge' }, '1');
    fab.appendChild(badge);
    fab.addEventListener('click', toggleWindow);

    chatWindow = el('div', { class: 'aria-window', 'aria-label': 'Chat com Aria' });

    const header = el('div', { class: 'aria-header' });
    const avatar = el('div', { class: 'aria-avatar' }, '✨');
    const info = el('div', { class: 'aria-info' });
    info.appendChild(el('div', { class: 'aria-name' }, `${CONFIG.botName}, AI School`));
    info.appendChild(el('div', { class: 'aria-status' }, 'Online agora, responde em segundos'));
    const closeBtn = el('button', { class: 'aria-close', 'aria-label': 'Fechar chat', title: 'Fechar' });
    closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    closeBtn.addEventListener('click', toggleWindow);
    header.appendChild(avatar);
    header.appendChild(info);
    header.appendChild(closeBtn);

    messagesEl = el('div', { class: 'aria-messages' });
    quickEl = el('div', { class: 'aria-quick' });

    const inputWrap = el('div', { class: 'aria-input-wrap' });
    inputEl = el('input', {
      class: 'aria-input',
      type: 'text',
      placeholder: 'Digite sua mensagem...',
      autocomplete: 'off',
      'aria-label': 'Mensagem'
    });
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    sendBtn = el('button', { class: 'aria-send', 'aria-label': 'Enviar mensagem', title: 'Enviar' });
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

  // ===== MESSAGES =====
  function addMessage(text, from) {
    const msg = { text, from, timestamp: Date.now() };
    state.messages.push(msg);
    saveSession();

    const msgEl = el('div', { class: `aria-msg aria-msg-${from}` }, text);
    messagesEl.appendChild(msgEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const t = el('div', { class: 'aria-typing', id: 'aria-typing-indicator' });
    t.appendChild(el('span'));
    t.appendChild(el('span'));
    t.appendChild(el('span'));
    messagesEl.appendChild(t);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('aria-typing-indicator');
    if (t) t.remove();
  }

  function clearQuick() {
    quickEl.innerHTML = '';
  }

  function showQuick(replies) {
    clearQuick();
    if (!replies || replies.length === 0) return;
    replies.forEach(r => {
      const btn = el('button', { class: 'aria-quick-btn' }, r);
      btn.addEventListener('click', () => {
        clearQuick();
        handleUserInput(r);
      });
      quickEl.appendChild(btn);
    });
  }

  function showCTA(label, handler) {
    const cta = el('button', { class: 'aria-cta' }, label);
    cta.addEventListener('click', handler);
    // Adiciona no quickEl para ser limpo junto com os quick replies
    quickEl.appendChild(cta);
  }

  async function botSay(text, opts) {
    opts = opts || {};
    showTyping();
    await new Promise(r => setTimeout(r, 600 + Math.random() * 500));
    hideTyping();
    const personalized = personalize(text);
    addMessage(personalized, 'bot');
    // Limpa quick replies e CTAs anteriores ANTES de adicionar novos
    clearQuick();
    if (opts.quick) showQuick(opts.quick);
    if (opts.cta) showCTA(opts.cta.label, opts.cta.handler);
  }

  // ===== TXT EXPORT =====
  function downloadTxt() {
    if (!state.lead.name) {
      botSay('Você precisa informar seu nome e WhatsApp primeiro para gerar o TXT da conversa.');
      return;
    }
    const now = new Date();
    const lines = [];
    lines.push('========================================');
    lines.push('  AI SCHOOL - LEAD CAPTURADO PELA ARIA');
    lines.push('========================================');
    lines.push('');
    lines.push(`Data: ${now.toLocaleString('pt-BR')}`);
    lines.push(`Nome: ${state.lead.name}`);
    lines.push(`WhatsApp: ${state.lead.whatsapp}`);
    lines.push(`Cursos de interesse: ${state.lead.course_interest.length > 0 ? state.lead.course_interest.join(', ') : 'Nenhum específico'}`);
    lines.push(`Total de mensagens: ${state.messages.length}`);
    lines.push('');
    lines.push('----------------------------------------');
    lines.push('CONVERSA COMPLETA');
    lines.push('----------------------------------------');
    lines.push('');
    state.messages.forEach(m => {
      const time = new Date(m.timestamp).toLocaleTimeString('pt-BR');
      const sender = m.from === 'bot' ? 'ARIA' : state.lead.name.toUpperCase();
      lines.push(`[${time}] ${sender}:`);
      lines.push(m.text);
      lines.push('');
    });
    lines.push('----------------------------------------');
    lines.push('AÇÃO RECOMENDADA:');
    if (state.lead.course_interest.length > 0) {
      lines.push(`Entrar em contato para fechar matrícula do(s) curso(s): ${state.lead.course_interest.join(', ')}`);
    } else {
      lines.push('Entrar em contato para entender necessidade e recomendar curso');
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lead_${state.lead.name.replace(/\s+/g, '_')}_${state.lead.whatsapp.replace(/\D/g, '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function sendLeadToWhatsApp() {
    if (!state.lead.name || !state.lead.whatsapp) {
      botSay('Preciso do seu nome e WhatsApp antes de enviar pra escola. Pode me passar?');
      return;
    }
    saveLead();
    const summary = `🤖 NOVO LEAD - AI SCHOOL\n\nNome: ${state.lead.name}\nWhatsApp: ${state.lead.whatsapp}\nInteresse: ${state.lead.course_interest.length > 0 ? state.lead.course_interest.join(', ') : 'A definir'}\nMensagens: ${state.messages.length}\n\n---\n\n${state.messages.slice(-8).map(m => `${m.from === 'bot' ? 'Aria' : state.lead.name}: ${m.text}`).join('\n\n').substring(0, 2500)}`;
    window.open(`https://wa.me/${CONFIG.whatsappSchool}?text=${encodeURIComponent(summary)}`, '_blank');
  }

  // ===== CONVERSATION FLOW (SDR SENIOR) =====
  function startConversation() {
    const existing = loadSession();
    if (existing && existing.lead && existing.lead.name && existing.lead.whatsapp) {
      state = existing;
      state.messages.forEach(m => {
        const msgEl = el('div', { class: `aria-msg aria-msg-${m.from}` }, m.text);
        messagesEl.appendChild(msgEl);
      });
      messagesEl.scrollTop = messagesEl.scrollHeight;
      botSay(`Oi, ${state.lead.name}! 👋 Bem-vindo de volta à AI School. Posso te ajudar com mais alguma coisa agora?`, {
        quick: ['Quero matricular', 'Ver cursos', 'Tirar dúvida', 'Falar com humano']
      });
      return;
    }

    state.lead.startedAt = new Date().toISOString();
    saveSession();
    botSay(`Oi! 👋 Eu sou a ${CONFIG.botName}, da AI School.\n\nPosso te ajudar de várias formas: explicar o que é IA, te mostrar qual curso se encaixa no seu momento, tirar dúvidas sobre preços e formato, ou até te matricular.\n\nPra começar, qual o seu nome?`);
    state.stage = 'ask_name';
  }

  async function handleUserInput(input) {
    const text = (typeof input === 'string' ? input : '').trim();
    if (!text) return;
    inputEl.value = '';
    addMessage(text, 'user');

    // STAGE: GREETING → ASK NAME
    if (state.stage === 'ask_name') {
      const name = text.split(' ').slice(0, 2).join(' ').substring(0, 40);
      state.lead.name = name;
      saveSession();
      await botSay(`Prazer em conhecer você, ${name}! 😊\n\nAgora me passa seu WhatsApp (com DDD), só pra te enviar novidades e, se você quiser, alguém da escola poder te contatar depois:\n\nEx: 11966161611 ou 11 96616-1611`);
      state.stage = 'ask_whatsapp';
      return;
    }

    // STAGE: ASK WHATSAPP
    if (state.stage === 'ask_whatsapp') {
      const digits = text.replace(/\D/g, '');
      if (digits.length < 10) {
        await botSay('Hmm, esse número parece incompleto. Pode me passar novamente? Preciso do DDD + número (ex: 11966161611).');
        return;
      }
      state.lead.whatsapp = digits;
      // Salva no localStorage para o checkout-dialog pegar
      try { localStorage.setItem('aichat_lead_whatsapp', digits); } catch (e) {}
      saveSession();
      saveLead();
      await botSay(`Perfeito, ${state.lead.name}! ✅ Seus dados estão salvos com segurança.\n\nAgora me conta: o que te trouxe aqui hoje? Posso te recomendar o curso ideal.`, {
        quick: ['Quero aprender IA do zero', 'Quero programar com IA', 'Quero editar vídeos com IA', 'É pra meu filho(a)', 'Quero mentoria VIP']
      });
      state.stage = 'chatting';
      return;
    }

    // STAGE: CHATTING, usar SDR senior flow
    await handleChat(text);
  }

  async function handleChat(text) {
    const input = normalize(text);

    // 0. PEDIDO DE EXPLICAÇÃO DETALHADA DO CURSO ("o que vou aprender", "ementa", "conteúdo")
    if (/((o que|que|quais|quero saber).*(aprender|conteudo|conteúdo|ementa|ver.*mais|saber mais)|me explica.*curso|detalhe.*curso|conteudo.*curso|ementa|quero entender.*curso)/.test(input)) {
      const course = findCourse(input) || state.suggestedCourse;
      if (course) {
        await presentCourseDetails(course);
        return;
      }
      await botSay(`Claro! Me diz qual curso você quer saber mais. Posso te passar a ementa completa, módulos e ferramentas.`, {
        quick: ['IA Iniciante', 'Vibe Code', 'Mentoria VIP', 'Ver todos os cursos']
      });
      return;
    }

    // 0.1 EXPLICAÇÃO SOBRE IA / CONCEITOS
    if (/(o que.*ia|inteligencia artificial|o que.*intelig.*artificial|como.*ia.*funciona|ia.*como funciona|preciso.*saber.*programar|o que.*chatgpt|o que.*gemini|o que.*prompt|o que.*automa.*ia|o que.*mentoria.*vip|como.*funciona.*mentoria)/.test(input)) {
      await botSay(getEducationalAnswer(input, text));
      return;
    }

    // 1. INTENT: comprando / matricular
    // Só ativa se for uma intenção clara de compra (não apenas mencionando "quero curso")
    if (/^(quero matricular|quero comprar|quero fechar|matricular|matricula|inscrever|inscricao|fechar|bora fechar|to dentro|tô dentro|topo|fechado|vamos la|vamos lá|pode ser|quero esse|quero este|quero o curso)/.test(input)) {
      const course = findCourse(input) || state.suggestedCourse;
      if (course) {
        await presentCourseForEnrollment(course);
        return;
      }
      await botSay('Boa! Vamos fechar isso. 🚀 Qual curso você quer fazer? Se não souber, me conta o que você quer aprender que eu te indico.', {
        quick: ['IA Iniciante', 'Vibe Code', 'Edição de Vídeos', 'Mentoria VIP', 'Ver todos os 15 cursos']
      });
      return;
    }

    // 2. OBJECTION HANDLER
    const objection = detectObjection(input);
    if (objection) {
      await botSay(personalize(objection.response), {
        quick: ['Quero matricular', 'Ver outros cursos', 'Falar com humano', 'Tirar outra dúvida']
      });
      return;
    }

    // 3. INTENT: falar com humano / whatsapp
    if (/(humano|pessoa|atendente|falar com alguem|falar com alguém|whatsapp|telefone|contato|consultor|especialista)/.test(input)) {
      await botSay('Claro! Posso te redirecionar para o WhatsApp da escola, lá você fala direto com nosso time. 👇', {
        cta: { label: '📱 Abrir WhatsApp da escola', handler: sendLeadToWhatsApp }
      });
      return;
    }

    // 4. INTENT: ver cursos / lista
    if (/^(curso|cursos|opcoes|opções|quais|categoria|ver todos|lista)/.test(input) && !findCourse(input)) {
      await botSay('📚 Temos 15 cursos de IA para todos os públicos. Todos com 10h por R$4.000:\n\nIA Iniciante, Intermediário e Avançado\nVibe Code (programar com IA)\nEdição de Vídeos com IA\nIA para Engenheiros e Arquitetos\nIA para Operadores de Drone\nIA + Robótica para Crianças (7-12)\nIA para Adolescentes (13-17)\nPacote Office com IA\nCanva com IA\nCriação de Sites no Lovable\nCriação de Sites Avançado\nPoe Bots de IA\nIA + Empreendedorismo (Solo First)\n\nE a Mentoria VIP (1-a-1) a partir de R$4.500.\n\nQual desses te chama atenção?', {
        quick: ['IA Iniciante', 'Vibe Code', 'Mentoria VIP', 'Me ajuda a escolher']
      });
      return;
    }

    // 5. INTENT: ajuda pra escolher / perfil
    if (/(recomend|indic|nao sei qual|não sei qual|me ajuda|ajuda|sugest|sugestão|qual o melhor|qual curso|qual recomenda|perfil|nao sei|não sei)/.test(input)) {
      await botSay(`Boa, ${state.lead.name}! Vou te ajudar a encontrar o curso perfeito. Me conta rapidinho:\n\n1. Você já usou IA antes (ChatGPT, Claude, etc)?\n2. Pra você mesmo ou pra outra pessoa?\n3. Qual sua área de atuação? (ex: estudo, marketing, engenharia, aposentado, criador de conteúdo...)`, {
        quick: ['Nunca usei IA', 'Já uso ChatGPT', 'Pra meu filho', 'Sou criador de conteúdo', 'Sou empreendedor']
      });
      return;
    }

    // 6. PROFILE ANSWERS → recomendar curso
    if (/(nunca usei|comecar do zero|começar do zero|iniciante total)/.test(input)) {
      trackInterest('ia-iniciante');
      state.suggestedCourse = COURSES.find(c => c.slug === 'ia-iniciante');
      await botSay(`Para você, ${state.lead.name}, o curso ideal é o **IA Iniciante**. ✨\n\nEm 10 horas você sai do zero a fluente em ChatGPT e Gemini. Aprende a fórmula de prompts que funcionam, cria imagens com Gemini Imagen e aplica tudo no trabalho e nos estudos.\n\nR$4.000 (10h online), R$4.500 (10h presencial), Certificado incluso`, {
        cta: { label: '🚀 Quero matricular', handler: () => redirectToCheckout('ia-iniciante') }
      });
      return;
    }

    if (/(filho|filha|crianca|criança|kid|infantil)/.test(input)) {
      const ageMatch = input.match(/(\d+)\s*anos/);
      const age = ageMatch ? parseInt(ageMatch[1]) : 10;
      if (age >= 7 && age <= 12) {
        trackInterest('ia-robotica-criancas');
        state.suggestedCourse = COURSES.find(c => c.slug === 'ia-robotica-criancas');
        await botSay(`Que delícia ter seu filho na AI School! 👶🤖\n\nPara crianças de 7 a 12 anos, o curso ideal é o **IA + Robótica**. Curso lúdico onde seu filho vai criar robôs, games e histórias com IA, primeiro contato com tecnologia de forma segura e divertida.\n\nR$4.000 (10h), Turmas pequenas (máx. 8 crianças), Certificado de "Pequeno Cientista"`, {
          cta: { label: '🚀 Quero matricular meu filho', handler: () => redirectToCheckout('ia-robotica-criancas') }
        });
        return;
      } else if (age >= 13 && age <= 17) {
        trackInterest('ia-adolescentes');
        state.suggestedCourse = COURSES.find(c => c.slug === 'ia-adolescentes');
        await botSay(`Para adolescentes de 13-17 anos, o curso ideal é o **IA para Adolescentes**. 🎮\n\nCriação de apps, jogos, arte digital e automações. IA para a próxima geração de criadores. Sai com portfólio publicado.\n\nR$4.000 (10h), Online ao vivo`, {
          cta: { label: '🚀 Quero matricular', handler: () => redirectToCheckout('ia-adolescentes') }
        });
        return;
      }
    }

    if (/(criador de conteudo|criador de conteúdo|content|youtube|tiktok|instagram|social media|edicao|edição|editar video|editar vídeo)/.test(input)) {
      trackInterest('edicao-videos-ia');
      state.suggestedCourse = COURSES.find(c => c.slug === 'edicao-videos-ia');
      await botSay(`Para criadores de conteúdo, o curso perfeito é **Edição de Vídeos com IA**. 🎬\n\nCapCut, Runway, Pika, Kling, Sora. Edição profissional, b-roll gerado por IA, legendas automáticas. Você vai editar 5x mais rápido.\n\nR$4.000 (10h), Templates de edição inclusos`, {
        cta: { label: '🚀 Quero matricular', handler: () => redirectToCheckout('edicao-videos-ia') }
      });
      return;
    }

    if (/(empreendedor|empreender|negocio|negócio|startup|sair do clt|clt|consultor|freelancer)/.test(input)) {
      trackInterest('ia-empreendedorismo');
      state.suggestedCourse = COURSES.find(c => c.slug === 'ia-empreendedorismo');
      await botSay(`Para quem quer empreender, o curso ideal é **IA + Empreendedorismo (Solo First Framework)**. 🚀\n\nTorne-se um Empreendedor T-Shaped com IA. Do posicionamento ao primeiro cliente. Baseado no framework Solo First.\n\nR$4.000 (10h), Plano 90 dias incluso`, {
        cta: { label: '🚀 Quero matricular', handler: () => redirectToCheckout('ia-empreendedorismo') }
      });
      return;
    }

    if (/(ja uso|já uso|chatgpt|claude|gemini|automatizar|agente)/.test(input)) {
      trackInterest('ia-intermediario');
      state.suggestedCourse = COURSES.find(c => c.slug === 'ia-intermediario');
      await botSay(`Você já tem base, perfeito! O curso ideal é **IA Intermediário**. ⚙️\n\nFluxos, automações e agentes. Aprende n8n (gratuito), Make, RAG básico. Sai com 10 templates de automação prontos pra usar.\n\nR$4.000 (10h)`, {
        cta: { label: '🚀 Quero matricular', handler: () => redirectToCheckout('ia-intermediario') }
      });
      return;
    }

    // 7. INTENT: informações específicas (preço, pagamento, horário, garantia, certificado)
    const intent = detectIntent(input);
    if (intent) {
      await botSay(personalize(intent.response), {
        quick: ['Quero matricular', 'Ver cursos', 'Tirar outra dúvida']
      });
      return;
    }

    // 8. SAUDACAO
    if (/^(oi|ola|olá|opa|eai|e ai|bom dia|boa tarde|boa noite|hello|hi)/.test(input)) {
      await botSay(`Oi, ${state.lead.name}! 👋 Tudo beleza?\n\nSobre o que você quer saber? Posso falar sobre cursos, preços, formas de pagamento, mentoria VIP... ou te recomendar o curso ideal pro seu momento.`, {
        quick: ['Quero aprender IA', 'Ver cursos', 'Preços', 'Mentoria VIP']
      });
      return;
    }

    // 9. RAG: buscar curso específico
    const course = findCourse(input);
    if (course) {
      trackInterest(course.slug);
      state.suggestedCourse = course;
      await presentCourse(course);
      return;
    }

    // 10. FALLBACK inteligente
    await botSay(`Entendi, ${state.lead.name}. Posso te ajudar de várias formas:\n\n• Explicar conceitos: o que é IA, ChatGPT, Gemini, prompt\n• Recomendar curso: me conta sua área e objetivo\n• Detalhar ementa: o que você vai aprender em cada curso\n• Preços e pagamento: PIX, boleto 2x, cartão 12x\n• Mentoria VIP: diferença pra curso normal\n• Falar com humano: te passo no WhatsApp\n\nO que você quer saber?`, {
      quick: ['O que é IA?', 'Quero ver cursos', 'Quero Mentoria VIP', 'Falar com humano']
    });
  }

  function trackInterest(slug) {
    if (!state.lead.course_interest.includes(slug)) {
      state.lead.course_interest.push(slug);
      saveSession();
      if (state.lead.name && state.lead.whatsapp) {
        saveLead();
      }
    }
  }

  // Resposta educativa para perguntas conceituais sobre IA
  function getEducationalAnswer(input, originalText) {
    const name = state.lead.name || '';
    const answers = [
      {
        match: /(o que.*mentoria.*vip|mentoria.*vip.*o que|como.*funciona.*mentoria|mentoria.*como funciona|diferenca.*mentoria.*curso)/,
        answer: `Mentoria VIP é diferente de curso normal. Te explico:\n\nCURSO NORMAL (10h, R$4.000):\n• Currículo pré-definido (você aprende o que está na ementa)\n• Turma com outros alunos (até 10)\n• Ritmo da turma\n• Excelente pra quem tá começando\n\nMENTORIA VIP (10h, R$4.500 online / R$5.000 presencial):\n• SEM currículo fixo. Você chega com seu objetivo e a gente desenha um plano só seu\n• 1-a-1 com mentor (ninguém mais na sala)\n• Ritmo seu, no seu tempo\n• Foco 100% no seu projeto real\n• Canal direto com mentor no WhatsApp\n\nPARA QUEM É MENTORIA VIP:\n• Executivos que precisam aprender IA rápido pra uma decisão\n• Empreendedores que querem aplicar IA no próprio negócio\n• Profissionais que querem sair do CLT (90 dias)\n• Alguém com projeto específico (lançar app, criar canal, automatizar empresa)\n\nQuer conversar comigo sobre seu caso, ou prefere ver curso normal?`,
        quick: ['Quero Mentoria VIP', 'Ver cursos normais', 'Tirar outra dúvida']
      },
      {
        match: /(o que.*chatgpt|chatgpt.*o que|como.*usar.*chatgpt|para que.*chatgpt)/,
        answer: `ChatGPT é um assistente de IA criado pela OpenAI em 2022. Ele conversa com você como um humano e pode:\n\n• Escrever textos (e-mails, redações, posts, código)\n• Resumir documentos longos em segundos\n• Explicar conceitos complexos de forma simples\n• Resolver problemas de matemática\n• Criar imagens (com DALL-E, na versão paga)\n• Programar em qualquer linguagem\n\nCOMO USAR: Acesse chat.openai.com (ou chatgpt.com), crie conta grátis, e digite o que quer. Você pode pedir "escreva um e-mail pra meu chefe pedindo aumento" ou "explique a teoria da relatividade pra uma criança de 10 anos".\n\nDICA: O ChatGPT responde melhor quando você é específico. Em vez de "me dá ideias", diga "me dá 10 ideias de posts pra Instagram sobre cachorros, com emojis, em tom divertido".\n\nNo nosso curso de IA Iniciante (10h, R$4.000), você aprende a dominar o ChatGPT em 2 semanas. Quer saber mais?`,
        quick: ['Quero ver curso de IA Iniciante', 'Quero matricular', 'Tirar outra dúvida']
      },
      {
        match: /(o que.*gemini|gemini.*o que|como.*usar.*gemini|para que.*gemini)/,
        answer: `Gemini é o assistente de IA do Google, concorrente direto do ChatGPT. Foi lançado em dezembro de 2023 e tem algumas vantagens:\n\n• INTEGRAÇÃO GOOGLE: Funciona dentro do Gmail, Google Docs, Sheets, Slides\n• ACESSO À INTERNET: Pode buscar informações atualizadas em tempo real (ChatGPT grátis não faz isso)\n• MULTIMODAL: Entende texto, imagem, áudio e vídeo ao mesmo tempo\n• GRATUITO: A versão básica é de graça (gemini.google.com)\n\nQUAL ESCOLHER?\n• ChatGPT: melhor pra textos longos, código, criatividade\n• Gemini: melhor pra quem já usa Google Workspace (Docs, Gmail, Sheets) e quer integração\n• Claude: melhor pra analisar PDFs longos e documentos\n\nNo curso da AI School, focamos em Gemini + ChatGPT porque são as duas ferramentas que dominam o mercado. Quer que eu te mostre o curso ideal?`,
        quick: ['Quero ver cursos', 'O que é IA generativa?', 'Tirar outra dúvida']
      },
      {
        match: /(o que.*prompt|prompt.*o que|como.*fazer.*prompt|engenharia.*prompt|prompt.*engenharia)/,
        answer: `Prompt é a instrução que você dá pra IA. Tipo a "pergunta" que você manda pro ChatGPT.\n\nA qualidade do prompt define a qualidade da resposta. Se você manda "fala sobre IA", recebe texto genérico. Se manda "explique IA em 3 parágrafos para uma criança de 8 anos, com exemplo de brinquedo", recebe algo muito melhor.\n\nFÓRMULA CRISPE (a que ensinamos no curso):\n• C - Contexto (quem é você, pra quem é)\n• R - Role (qual papel a IA deve assumir)\n• I - Instruction (o que exatamente fazer)\n• S - Specificity (quanto detalhe)\n• P - Personality (tom de voz)\n• E - Extras (formato, tamanho, exemplos)\n\nExemplo fraco: "escreve um e-mail"\nExemplo forte: "Você é um vendedor experiente. Escreva um e-mail de follow-up para um cliente que demonstrou interesse em curso de IA mas não comprou. Tom amigável mas profissional. Máximo 150 palavras. Inclua CTA no final." \n\nIsso é ENGENDRAR PROMPT, e é uma habilidade que todo mundo precisa ter. No curso IA Iniciante (R$4.000, 10h) você aprende isso na prática. Quer?`,
        quick: ['Quero ver curso de IA Iniciante', 'Quero matricular', 'Tirar outra dúvida']
      },
      {
        match: /(o que.*automa.*ia|automacao.*ia.*o que|como.*automatizar|n8n|make.*automa)/,
        answer: `Automação com IA é quando você faz a IA trabalhar SOZINHA em tarefas repetitivas, sem você precisar ficar pedindo uma a uma.\n\nEXEMPLO PRÁTICO: Em vez de copiar cada e-mail que chega, ler, responder... você cria um fluxo onde:\n1. Chega e-mail → IA lê automaticamente\n2. IA classifica (urgente, normal, spam)\n3. IA rascunha resposta\n4. Você só revisa e aprova\n\nFERRAMENTAS MAIS USADAS:\n• n8n (grátis, open source, mais técnico)\n• Make.com (visual, fácil, plano grátis)\n• Zapier (popular, mas caro)\n• Microsoft Power Automate (se já usa Office)\n\nNOSSO CURSO: IA Intermediário (R$4.000, 10h) ensina a montar esses fluxos do zero. Você sai com 10 templates de automação prontos pra usar no trabalho.\n\nQuer entender melhor ou matricular?`,
        quick: ['Quero ver curso IA Intermediário', 'Quero matricular', 'Tirar outra dúvida']
      },
      {
        match: /(\bo que (e|é) ia\b|o que.*inteligencia artificial|o que.*intelig.*artificial|como.*\bia\b.*funciona|\bia\b.*como funciona|o que.*ia generativa|o que e ia generativa|\bia\b generativa)/,
        answer: `Boa pergunta${name ? ', ' + name : ''}! Vou te explicar de forma simples.\n\nIA (Inteligência Artificial) é uma área da computação que cria sistemas capazes de fazer tarefas que antes só humanos conseguiam fazer: entender texto, reconhecer imagens, conversar, recomendar coisas, tomar decisões.\n\nHOJE, quando falamos de IA no dia a dia, estamos falando de IA GENERATIVA, que é um tipo específico de IA que CRIA conteúdo novo (texto, imagem, vídeo, código) a partir do que você pede.\n\nExemplos que você provavelmente já usou:\n• ChatGPT (cria texto, responde perguntas)\n• Gemini do Google (mesma coisa, integrado com Google)\n• DALL-E / Imagen (criam imagens)\n• Sora / Google Flow (criam vídeos)\n\nNÃO É mágica nem consciência. É estatística avançada: a IA aprende padrões de bilhões de textos e imagens, e gera respostas baseadas nesses padrões.\n\nPor isso dominar IA agora é tão importante: ela vai estar em TODO trabalho nos próximos anos. Quer que eu te mostre qual curso ideal pro seu momento?`,
        quick: ['Quero ver cursos', 'Não sei qual curso fazer', 'Tirar outra dúvida']
      },
      {
        match: /(preciso.*saber.*programar|nao sei programar|não sei programar|tenho.*programar|exige.*programa)/,
        answer: `Boa pergunta! Depende do curso. Te explico quais precisam e quais não:\n\nNÃO PRECISA PROGRAMAR:\n✓ IA Iniciante (R$4.000) - do zero, só saber usar computador\n✓ Edição de Vídeos com IA - CapCut + Gemini\n✓ Canva com IA - design sem código\n✓ Pacote Office com IA - Excel/Word/PowerPoint\n✓ IA para Engenheiros - usa ferramentas, não código\n✓ IA para Operadores de Drone - foco em edição\n✓ Criação de Sites no Lovable - app com 1 prompt\n✓ IA para Crianças (7-12) - Scratch visual\n\nPRECISA PROGRAMAR UM POUCO:\n• Vibe Code - programa com IA (não precisa saber antes)\n• Poe Bots - cria bots sem código\n\nPRECISA PROGRAMAR BASTANTE:\n• IA Avançado - APIs, RAG, fine-tuning\n• Criação de Sites Avançado - Next.js + TS\n• Automação Modular (mínimo 3 módulos)\n\nSe você não sabe programar e quer começar, recomendo IA Iniciante. Se quer programar com IA (sem precisar saber JavaScript), Vibe Code. Quer?`,
        quick: ['Quero IA Iniciante', 'Quero Vibe Code', 'Quero Mentoria VIP', 'Tirar outra dúvida']
      }
    ];

    for (const a of answers) {
      if (a.match.test(input)) return a.answer;
    }

    // Default educational fallback
    return `Boa pergunta${name ? ', ' + name : ''}! Vou te ajudar a entender.\n\nSobre o que exatamente você quer saber? Posso explicar:\n\n• O que é IA / IA generativa\n• O que é ChatGPT / Gemini / Claude\n• O que é prompt e engenharia de prompt\n• Como funciona automação com IA\n• O que é Mentoria VIP (diferença pra curso)\n• Se precisa saber programar\n• Detalhes de qualquer curso específico\n\nMe diz o que você quer entender melhor!`;
  }

  async function presentCourse(course) {
    trackInterest(course.slug);
    state.suggestedCourse = course;

    const benefits = course.benefits.slice(0, 4).map(b => `✓ ${b}`).join('\n');
    const priceStr = course.isMentoria
      ? `A partir de R$ ${course.price.toLocaleString('pt-BR')} (${course.hours}h 1-a-1)`
      : `R$ ${course.price.toLocaleString('pt-BR')} (${course.hours}h online) ou R$ 4.500 (presencial)`;

    // Apresentação consultiva: explica o curso, mostra o que vai aprender
    await botSay(`Encontrei o curso ideal pra você: ${course.title} 🎯\n\n${course.short}\n\nO QUE VOCÊ VAI APRENDER:\n${benefits}\n\nPRA QUEM É: ${course.audience}.\n\nINVESTIMENTO: ${priceStr}.\n\nQuer que eu te explique mais sobre o conteúdo, ou prefere ver outros cursos?`, {
      quick: ['O que vou aprender a mais?', 'Ver outros cursos', 'Quero matricular', 'Tirar outra dúvida']
    });
  }

  // Resposta detalhada sobre um curso (ementa)
  async function presentCourseDetails(course) {
    const modules = course.modules || [
      'Módulo 1: Fundamentos e setup das ferramentas',
      'Módulo 2: Aplicações práticas no seu dia a dia',
      'Módulo 3: Projeto real + certificado'
    ];
    const tools = course.tools || course.ferramentas || [];
    const moduleList = modules.map(m => `• ${m.title || m}`).join('\n');
    const toolsStr = tools.length > 0 ? tools.join(', ') : 'ferramentas Google + ChatGPT';

    await botSay(`EMENTA DETALHADA: ${course.title}\n\n${moduleList}\n\nFERRAMENTAS QUE VAI USAR: ${toolsStr}\n\nFORMATO: 10 horas (5 encontros de 2h ou 10 de 1h), online ao vivo via Zoom ou presencial.\n\nCERTIFICADO: Incluso, com verificação de autenticidade.\n\nTem mais alguma dúvida sobre o curso?`, {
      quick: ['Quero matricular', 'Como funciona o pagamento?', 'Tem horários diferentes?', 'Ver outros cursos']
    });
  }

  async function presentCourseForEnrollment(course) {
    const priceStr = course.isMentoria
      ? `A partir de R$ ${course.price.toLocaleString('pt-BR')} (${course.hours}h 1-a-1)`
      : `R$ ${course.price.toLocaleString('pt-BR')} (${course.hours} horas)`;

    await botSay(`🚀 Bora fechar isso, ${state.lead.name}!\n\n**${course.title}**\n${course.short}\n\n💰 ${priceStr}\n💳 PIX, boleto 2x sem juros ou cartão 12x com juros da operadora\n📜 Certificado incluso\n💻 Online ou 📍 presencial, você escolhe\n\nVou te levar pro checkout.`, {
      cta: { label: '🚀 Ir para o checkout', handler: () => redirectToCheckout(course.slug) },
      quick: ['Tirar dúvida antes', 'Ver outros cursos', 'Falar com humano']
    });
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

  // Expose API antes do init
  window.AriaChatbot = {
    open: () => { if (!isOpen) toggleWindow(); },
    close: () => { if (isOpen) toggleWindow(); },
    getLeads: () => {
      try { return JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]'); }
      catch (e) { return []; }
    },
    exportAllLeads: function() {
      const leads = this.getLeads();
      const txt = leads.map(l => {
        return `Lead: ${l.name} | WhatsApp: ${l.whatsapp}\nInteresse: ${l.course_interest ? l.course_interest.join(', ') : 'Nenhum'}\nCapturado em: ${l.startedAt || 'N/A'}\nAtualizado em: ${l.updatedAt || 'N/A'}\n---`;
      }).join('\n\n');
      const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `todos_leads_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  try {
    init();
  } catch (err) {
    console.error('[Aria] Erro ao inicializar:', err);
  }
})();
