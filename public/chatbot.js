/**
 * AI School - Chatbot de Vendas com RAG
 * Standalone vanilla JS — funciona em qualquer site (GitHub Pages, Next.js, etc.)
 *
 * Recursos:
 * - Botão flutuante com pulse + badge de notificação
 * - Captura de lead (nome + WhatsApp) no início
 * - Knowledge base com 15 cursos + mentoria + pagamento + FAQ
 * - Matching inteligente por palavras-chave (RAG-like)
 * - Recomendação de curso por perfil
 * - Geração de .txt com conversa completa
 * - Envio do lead para WhatsApp da escola (55119666161611)
 * - Persistência em localStorage
 */

(function () {
  'use strict';

  // ===== CONFIG =====
  const CONFIG = {
    whatsappSchool: '55119666161611',
    appName: 'AI School',
    storageKey: 'aischool_chatbot_leads',
    sessionKey: 'aischool_chatbot_session',
    primaryColor: '#7c3aed',
    accentColor: '#10b981',
    botName: 'Aria',
    botAvatar: '🤖',
  };

  // ===== KNOWLEDGE BASE =====
  const COURSES = [
    {
      slug: 'ia-iniciante',
      title: 'IA Iniciante',
      keywords: ['iniciante', 'iniciar', 'comecar', 'começar', 'do zero', 'primeiros passos', 'basico', 'básico', 'chatgpt', 'claude', 'gemini', 'prompt', 'prompts'],
      short: 'Para quem nunca usou IA. ChatGPT, Claude, Gemini, prompts, criação de imagens. 10h por R$4.000.',
      level: 'iniciante',
      price: 4000,
      audience: 'qualquer pessoa que quer começar a usar IA no dia a dia'
    },
    {
      slug: 'ia-intermediario',
      title: 'IA Intermediário',
      keywords: ['intermediario', 'intermediário', 'automacao', 'automação', 'agente', 'agentes', 'n8n', 'make', 'fluxo', 'encadear', 'integrar', 'workflow'],
      short: 'Fluxos, automações e agentes. n8n, Make, RAG básico. 10h por R$4.000.',
      level: 'intermediario',
      price: 4000,
      audience: 'profissionais que já usam ChatGPT e querem automatizar tarefas'
    },
    {
      slug: 'ia-avancado',
      title: 'IA Avançado',
      keywords: ['avancado', 'avançado', 'api', 'apis', 'rag', 'llm', 'fine-tuning', 'finetuning', 'mcp', 'langchain', 'langgraph', 'vector', 'embedding', 'desenvolvedor', 'tecnico', 'técnico'],
      short: 'APIs de LLM, RAG em produção, agentes autônomos, MCP, fine-tuning. 10h por R$4.000.',
      level: 'avancado',
      price: 4000,
      audience: 'desenvolvedores, analistas de dados, CTOs, fundadores de startup'
    },
    {
      slug: 'vibe-code',
      title: 'Vibe Code',
      keywords: ['vibe code', 'vibecode', 'cursor', 'windsurf', 'claude code', 'programar com ia', 'programar com ia', 'criar app', 'criar site', 'lovable', 'v0'],
      short: 'Programe com IA usando Cursor, Windsurf, Claude Code, v0. Construa apps sem ser engenheiro. 10h por R$4.000.',
      level: 'iniciante',
      price: 4000,
      audience: 'empreendedores, designers, qualquer pessoa que queira criar apps sem saber programar'
    },
    {
      slug: 'edicao-videos-ia',
      title: 'Edição de Vídeos com IA',
      keywords: ['video', 'vídeo', 'videos', 'vídeos', 'edicao', 'edição', 'editar', 'capcut', 'runway', 'pika', 'kling', 'sora', 'youtube', 'tiktok', 'reels', 'shorts', 'content creator', 'criador de conteudo'],
      short: 'CapCut, Runway, Pika, Kling, Sora. Edição profissional, b-roll com IA, legendas automáticas. 10h por R$4.000.',
      level: 'intermediario',
      price: 4000,
      audience: 'criadores de conteúdo, social media, youtubers, tiktokers'
    },
    {
      slug: 'ia-engenheiros-arquitetos',
      title: 'IA para Engenheiros e Arquitetos',
      keywords: ['engenheiro', 'engenheiros', 'arquiteto', 'arquitetos', 'engenharia', 'arquitetura', 'bim', 'revit', 'sketchup', 'render', 'renderizacao', 'renderização', 'memoria de calculo', 'memória de cálculo', 'projeto', 'projetos', 'construcao', 'construção'],
      short: 'BIM, renderização, projetos, cálculos, propostas. IA aplicada à engenharia e arquitetura. 10h por R$4.000.',
      level: 'intermediario',
      price: 4000,
      audience: 'engenheiros civis, arquitetos, calculistas, projetistas'
    },
    {
      slug: 'ia-operadores-drone',
      title: 'IA para Operadores de Drone',
      keywords: ['drone', 'drones', 'operador', 'piloto', 'anac', 'aerofotogrametria', 'mapeamento', 'inspecao', 'inspeção', 'filmagem', 'aereo', 'aéreo', 'ortomosaico'],
      short: 'Pós-processamento, mapeamento, inspeção e edição de filmagens aéreas com IA. 10h por R$4.000.',
      level: 'intermediario',
      price: 4000,
      audience: 'operadores de drone, pilotos ANAC, empresas de aerolevantamento'
    },
    {
      slug: 'ia-robotica-criancas',
      title: 'IA + Robótica para Crianças (7-12)',
      keywords: ['crianca', 'criança', 'criancas', 'crianças', 'filho', 'filhos', 'infantil', 'kids', 'robotica', 'robótica', 'scratch', 'lego', 'microbit', '7 anos', '8 anos', '9 anos', '10 anos', '11 anos', '12 anos', 'primeiro contato'],
      short: 'Curso lúdico onde crianças aprendem IA criando robôs, games e histórias. 10h por R$4.000.',
      level: 'infantil',
      price: 4000,
      audience: 'crianças de 7 a 12 anos curiosas por tecnologia'
    },
    {
      slug: 'ia-adolescentes',
      title: 'IA para Adolescentes (13-17)',
      keywords: ['adolescente', 'adolescentes', 'jovem', 'jovens', '13 anos', '14 anos', '15 anos', '16 anos', '17 anos', 'filho adolescente', 'game', 'jogos', 'itch.io'],
      short: 'Criação de apps, jogos, arte digital e automações. IA para a próxima geração. 10h por R$4.000.',
      level: 'intermediario',
      price: 4000,
      audience: 'adolescentes de 13 a 17 anos interessados em tecnologia'
    },
    {
      slug: 'pacote-office-ia',
      title: 'Pacote Office com IA',
      keywords: ['office', 'excel', 'word', 'powerpoint', 'outlook', 'copilot', 'microsoft 365', 'm365', 'planilha', 'apresentacao', 'apresentação', 'ppt', 'produtividade'],
      short: 'Excel, Word e PowerPoint turbinados com Copilot e ChatGPT. 10h por R$4.000.',
      level: 'iniciante',
      price: 4000,
      audience: 'profissionais administrativos, analistas, assistentes, gerentes'
    },
    {
      slug: 'canva-ia',
      title: 'Canva com IA',
      keywords: ['canva', 'design', 'magic studio', 'magic design', 'logo', 'logotipo', 'identidade visual', 'social media', 'posts', 'instagram', 'thumbnail'],
      short: 'Magic Studio, Magic Design, Magic Edit. Design profissional sem saber design. 10h por R$4.000.',
      level: 'iniciante',
      price: 4000,
      audience: 'empreendedores, social media, professores, pequenos negócios'
    },
    {
      slug: 'criacao-sites-lovable',
      title: 'Criação de Sites no Lovable',
      keywords: ['lovable', 'no-code', 'nocode', 'site', 'sites', 'landing page', 'app', 'supabase', 'sem programar', 'sem saber programar'],
      short: 'Crie sites e apps completos no Lovable com 1 prompt. 10h por R$4.000.',
      level: 'iniciante',
      price: 4000,
      audience: 'empreendedores, designers, pequenos negócios que querem ter um site'
    },
    {
      slug: 'criacao-sites-avancado',
      title: 'Criação de Sites Avançado',
      keywords: ['next.js', 'nextjs', 'cursor', 'v0', 'bolt', 'saas', 'shadcn', 'tailwind', 'deploy', 'vercel', 'desenvolvedor web'],
      short: 'Vibe coding profissional. Cursor, v0, Bolt, Next.js, deploy de apps reais com IA. 10h por R$4.000.',
      level: 'avancado',
      price: 4000,
      audience: 'desenvolvedores, designers técnicos, fundadores'
    },
    {
      slug: 'poe-bots-ia',
      title: 'Poe: Crie Seus Próprios Bots de IA',
      keywords: ['poe', 'bot', 'bots', 'gpt bot', 'claude bot', 'monetizar', 'monetizacao', 'monetização', 'poe store'],
      short: 'Crie bots com IA para vender, atender e automatizar. Monetize com Poe. 10h por R$4.000.',
      level: 'intermediario',
      price: 4000,
      audience: 'criadores de conteúdo, empreendedores, social media, suporte'
    },
    {
      slug: 'ia-empreendedorismo',
      title: 'IA + Empreendedorismo (Solo First)',
      keywords: ['empreender', 'empreendedorismo', 'empreendedor', 'solo first', 'sair do clt', 'clt', 'consultor', 'negocio proprio', 'próprio negócio', 'freelancer', 't-shaped', 'dharma', 'posicionamento'],
      short: 'Torne-se um Empreendedor T-Shaped com IA. Do posicionamento ao primeiro cliente. 10h por R$4.000.',
      level: 'intermediario',
      price: 4000,
      audience: 'profissionais que querem sair do CLT, freelancers que querem escalar'
    }
  ];

  const MENTORIA = {
    slug: 'mentoria-vip',
    title: 'Mentoria VIP',
    keywords: ['mentoria', 'mentor', 'vip', '1-a-1', 'individual', 'personalizada', 'personalizado', 'exclusivo', 'sob medida', 'premium'],
    short: 'Mentoria 1-a-1 sob medida. Você define o que quer aprender e desenhamos um plano só seu. A partir de R$4.500 (10h).',
    price: 4500
  };

  const PAYMENT_INFO = {
    keywords: ['pagar', 'pagamento', 'pix', 'mercado pago', 'cartao', 'cartão', 'boleto', 'parcelar', 'parcela', 'forma de pagamento'],
    answer: '💳 Aceitamos pagamento 100% via PIX (com QR Code automático) — chaves na CPF 33783362857.\n\n✅ Após clicar em "Matricular", o sistema gera um QR Code na hora. Você paga em segundos pelo app do seu banco.\n✅ Retorno automático assim que o pagamento é confirmado.\n✅ Em produção, integração via webhook Mercado Pago (sem intervenção humana).\n✅ Não trabalhamos com cartão ou boleto — apenas PIX (mais rápido e seguro).'
  };

  const SCHEDULE_INFO = {
    keywords: ['horario', 'horário', 'quando', 'aula', 'aulas', 'encontro', 'encontros', 'data', 'turma', 'turmas', 'inicio', 'início', 'disponibilidade'],
    answer: '📅 Os cursos são 100% online ao vivo via Zoom, com gravações disponíveis por 12 meses.\n\n• Cada curso = 10 horas (5 encontros de 2h ou 10 de 1h)\n• Turmas novas toda semana\n• Mentoria VIP: horários flexíveis (manhã, tarde, noite ou fim de semana)\n• Turmas infantis: máximo 8 crianças por turma\n• Demais turmas: máximo 10 alunos'
  };

  const GUARANTEE_INFO = {
    keywords: ['garantia', 'reembolso', 'devolver', 'devolucao', 'devolução', 'nao gostei', 'não gostei', 'arrependimento', 'cancelar', 'cancelamento'],
    answer: '🛡️ Garantia incondicional de 7 dias.\n\nSe nas duas primeiras aulas você não gostar por qualquer motivo, devolvemos 100% do valor. Sem perguntas, sem burocracia.'
  };

  const PRICE_INFO = {
    keywords: ['preco', 'preço', 'valor', 'custo', 'quanto custa', 'quanto', 'quanto fica', 'valor do curso', 'valor da mentoria'],
    answer: '💰 Tabela de preços:\n\n• Todos os cursos: R$ 4.000 / 10 horas (R$ 400/hora)\n• Mentoria VIP: a partir de R$ 4.500 (10h 1-a-1)\n• Horas extras: R$ 400/hora avulsa\n\nNosso diferencial: você paga por hora, não por "curso de 200 horas".'
  };

  const FAQ = [
    {
      keywords: ['certificado', 'certificados', 'diploma'],
      answer: '📜 Sim, todos os cursos emitem certificado digital da AI School com carga horária e verificação de autenticidade. A Mentoria VIP emite certificado personalizado.'
    },
    {
      keywords: ['presencial', 'presenciais', 'fisico', 'físico', 'loja fisica', 'loja física', 'endereco', 'endereço', 'onde fica'],
      answer: '📍 A maioria dos cursos é 100% online ao vivo via Zoom. As turmas infantis (IA + Robótica) têm modalidade presencial opcional em São Paulo.'
    },
    {
      keywords: ['programar', 'programacao', 'programação', 'codar', 'codigo', 'código', 'javascript', 'python', 'preciso saber programar', 'nao sei programar', 'não sei programar'],
      answer: '👨‍💻 Não! Cursos como IA Iniciante, Canva com IA, Pacote Office com IA e Criação de Sites no Lovable são para quem nunca programou. Os cursos de Vibe Code ensinam a programar com IA sem precisar saber JavaScript.'
    },
    {
      keywords: ['idade', 'idades', 'qual idade', 'idade minima', 'mínima', 'crianca pode', 'criança pode', 'menor'],
      answer: '👶 Temos cursos para todas as idades:\n\n• 7-12 anos: IA + Robótica para Crianças\n• 13-17 anos: IA para Adolescentes\n• 18+: todos os demais cursos\n• Não há idade máxima — já tivemos alunos de 70+ anos no curso de IA Iniciante!'
    },
    {
      keywords: ['empresa', 'empresas', 'corporativo', 'in company', 'in-company', 'equipe', 'equipes', 'treinamento', 'treinar', 'grupo'],
      answer: '🏢 Sim, fazemos treinamentos in-company sob medida. Para empresas, montamos um plano específico para a equipe. Fale com nosso time no WhatsApp 11 96616-1611.'
    }
  ];

  // ===== STATE =====
  let state = {
    step: 'greeting', // greeting → ask_name → ask_whatsapp → menu → chatting
    lead: { name: '', whatsapp: '', startedAt: null, course_interest: [] },
    messages: [],
    lastIntent: null
  };

  // ===== DOM HELPER =====
  function el(tag, attrs = {}, children = []) {
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') e.className = v;
      else if (k === 'style') e.setAttribute('style', v);
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v !== null && v !== undefined) e.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c === null || c === undefined) return;
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else e.appendChild(c);
    });
    return e;
  }

  // ===== STYLES =====
  const STYLES = `
    .aichat-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${CONFIG.primaryColor}, #ec4899);
      border: none;
      cursor: pointer;
      z-index: 9998;
      box-shadow: 0 8px 32px rgba(124, 58, 237, 0.5), 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation: aichat-pulse 2.5s ease-in-out infinite;
    }
    .aichat-fab:hover { transform: scale(1.08) rotate(5deg); }
    .aichat-fab svg { width: 32px; height: 32px; color: white; }
    .aichat-fab.open { transform: scale(0); opacity: 0; pointer-events: none; }

    @keyframes aichat-pulse {
      0%, 100% { box-shadow: 0 8px 32px rgba(124, 58, 237, 0.5), 0 0 0 0 rgba(124, 58, 237, 0.4); }
      50% { box-shadow: 0 8px 32px rgba(124, 58, 237, 0.6), 0 0 0 16px rgba(124, 58, 237, 0); }
    }

    .aichat-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #ef4444;
      color: white;
      font-size: 11px;
      font-weight: bold;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #0a0a14;
      animation: aichat-bounce 1s ease-in-out infinite;
    }
    @keyframes aichat-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    .aichat-window {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 600px;
      max-height: calc(100vh - 140px);
      background: #11111f;
      border: 1px solid rgba(124, 58, 237, 0.3);
      border-radius: 20px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124, 58, 237, 0.1);
      z-index: 9999;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
      color: #f4f4fb;
      animation: aichat-slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .aichat-window.open { display: flex; }

    @keyframes aichat-slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .aichat-header {
      background: linear-gradient(135deg, ${CONFIG.primaryColor}, #ec4899);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
    }
    .aichat-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }
    .aichat-info { flex: 1; min-width: 0; }
    .aichat-info-name { font-weight: 700; font-size: 15px; color: white; }
    .aichat-info-status { font-size: 11px; color: rgba(255,255,255,0.85); display: flex; align-items: center; gap: 4px; }
    .aichat-info-status::before {
      content: '';
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 6px #10b981;
    }
    .aichat-close {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
    }
    .aichat-close:hover { background: rgba(255,255,255,0.15); opacity: 1; }

    .aichat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background:
        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 58, 237, 0.08), transparent),
        #0a0a14;
    }
    .aichat-messages::-webkit-scrollbar { width: 6px; }
    .aichat-messages::-webkit-scrollbar-track { background: transparent; }
    .aichat-messages::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.4); border-radius: 3px; }

    .aichat-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.5;
      animation: aichat-fadeIn 0.3s ease;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    @keyframes aichat-fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .aichat-msg-bot {
      align-self: flex-start;
      background: rgba(124, 58, 237, 0.15);
      border: 1px solid rgba(124, 58, 237, 0.25);
      border-bottom-left-radius: 4px;
    }
    .aichat-msg-user {
      align-self: flex-end;
      background: linear-gradient(135deg, ${CONFIG.primaryColor}, #ec4899);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .aichat-typing {
      align-self: flex-start;
      background: rgba(124, 58, 237, 0.15);
      border: 1px solid rgba(124, 58, 237, 0.25);
      padding: 12px 16px;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      display: flex;
      gap: 4px;
    }
    .aichat-typing span {
      width: 6px; height: 6px;
      background: #a78bfa;
      border-radius: 50%;
      animation: aichat-typingBounce 1.4s infinite;
    }
    .aichat-typing span:nth-child(2) { animation-delay: 0.2s; }
    .aichat-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes aichat-typingBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    .aichat-quick {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0 16px 8px;
    }
    .aichat-quick-btn {
      background: rgba(124, 58, 237, 0.1);
      border: 1px solid rgba(124, 58, 237, 0.3);
      color: #a78bfa;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .aichat-quick-btn:hover {
      background: rgba(124, 58, 237, 0.25);
      color: white;
    }

    .aichat-input-wrap {
      padding: 12px 16px;
      border-top: 1px solid rgba(124, 58, 237, 0.2);
      background: rgba(22, 22, 38, 0.6);
      backdrop-filter: blur(8px);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .aichat-input {
      flex: 1;
      background: rgba(10, 10, 20, 0.6);
      border: 1px solid rgba(124, 58, 237, 0.3);
      border-radius: 999px;
      padding: 10px 16px;
      color: #f4f4fb;
      font-size: 13.5px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    .aichat-input:focus { border-color: ${CONFIG.primaryColor}; }
    .aichat-input::placeholder { color: #70708a; }

    .aichat-send {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${CONFIG.primaryColor}, #ec4899);
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .aichat-send:hover { transform: scale(1.05); }
    .aichat-send:disabled { opacity: 0.4; cursor: not-allowed; }

    .aichat-actions {
      padding: 8px 16px 12px;
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      background: rgba(22, 22, 38, 0.4);
      border-top: 1px solid rgba(124, 58, 237, 0.15);
    }
    .aichat-action-btn {
      flex: 1;
      min-width: 80px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #10b981;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 11px;
      cursor: pointer;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    .aichat-action-btn:hover { background: rgba(16, 185, 129, 0.2); }
    .aichat-action-btn.primary {
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.3);
      color: #f59e0b;
    }

    @media (max-width: 480px) {
      .aichat-fab { width: 56px; height: 56px; bottom: 16px; right: 16px; }
      .aichat-fab svg { width: 28px; height: 28px; }
      .aichat-window {
        right: 8px;
        left: 8px;
        bottom: 80px;
        width: auto;
        height: calc(100vh - 110px);
        max-height: 600px;
      }
    }
  `;

  // ===== CSS INJECT =====
  function injectStyles() {
    if (document.getElementById('aichat-styles')) return;
    const style = document.createElement('style');
    style.id = 'aichat-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  // ===== RAG / MATCHING =====
  function normalize(text) {
    return text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function scoreMatch(userInput, keywords) {
    const input = normalize(userInput);
    let score = 0;
    keywords.forEach(k => {
      const kn = normalize(k);
      if (input.includes(kn)) {
        score += kn.length > 4 ? 3 : 2;
      }
      // partial word match
      const words = input.split(/\s+/);
      words.forEach(w => {
        if (w.length > 2 && kn.includes(w)) score += 1;
      });
    });
    return score;
  }

  function findCourse(query) {
    let best = null;
    let bestScore = 0;
    COURSES.forEach(c => {
      const s = scoreMatch(query, c.keywords);
      if (s > bestScore) { bestScore = s; best = c; }
    });
    // Also check mentoria
    const mScore = scoreMatch(query, MENTORIA.keywords);
    if (mScore > bestScore) { bestScore = mScore; best = { ...MENTORIA, isMentoria: true }; }
    return bestScore >= 2 ? best : null;
  }

  function findIntent(query) {
    const intents = [
      { type: 'payment', data: PAYMENT_INFO },
      { type: 'schedule', data: SCHEDULE_INFO },
      { type: 'guarantee', data: GUARANTEE_INFO },
      { type: 'price', data: PRICE_INFO }
    ];

    let best = null;
    let bestScore = 0;
    intents.forEach(i => {
      const s = scoreMatch(query, i.data.keywords);
      if (s > bestScore) { bestScore = s; best = i; }
    });

    if (bestScore >= 2) return best;

    // FAQ
    for (const faq of FAQ) {
      if (scoreMatch(query, faq.keywords) >= 2) return { type: 'faq', data: faq };
    }

    return null;
  }

  function detectCourseInterest(query) {
    const course = findCourse(query);
    if (course && !state.lead.course_interest.includes(course.slug)) {
      state.lead.course_interest.push(course.slug);
      saveSession();
    }
  }

  // ===== BOT RESPONSES =====
  function getBotResponse(userInput) {
    const input = normalize(userInput);

    // Check for buy intent
    if (/^(quero|comprar|matricular|matricula|inscrever|inscricao|pagar|compra|fechar|to dentro|topo|bora)/.test(input)) {
      const course = findCourse(input);
      if (course) {
        return {
          text: `🚀 Perfeito! Vou te levar direto para a matrícula do curso "${course.title}".\n\nValor: ${formatBRL(course.price)} (${course.isMentoria ? 'a partir de' : ''} 10 horas)\nPagamento: PIX na hora com QR Code\n\nClique no botão "Matricular" abaixo para gerar seu PIX.`,
          action: { type: 'redirect_course', slug: course.slug, isMentoria: course.isMentoria }
        };
      }
      return {
        text: 'Ótimo! Qual curso você quer fazer? Posso te ajudar a escolher. Me conta um pouco sobre o que você quer aprender ou qual sua área de atuação.',
        quick: ['IA Iniciante', 'Vibe Code', 'Edição de Vídeos', 'Mentoria VIP', 'Ver todos os cursos']
      };
    }

    // Check for greeting
    if (/^(oi|ola|olá|opa|eai|e ai|bom dia|boa tarde|boa noite|hello|hi)/.test(input)) {
      return {
        text: `Olá${state.lead.name ? ', ' + state.lead.name : ''}! 👋 Tudo bem?\n\nSobre o que você quer saber mais? Posso falar sobre cursos, preços, mentoria VIP, formas de pagamento...`,
        quick: ['Ver cursos', 'Preços', 'Mentoria VIP', 'Falar com humano']
      };
    }

    // Check for human / atendente
    if (/(humano|pessoa|atendente|falar com alguem|falar com alguém|whatsapp|telefone|contato)/.test(input)) {
      return {
        text: '🧑‍💼 Posso te redirecionar para o WhatsApp da escola. Lá você fala direto com nosso time.\n\nClique no botão abaixo para abrir o WhatsApp:',
        action: { type: 'redirect_whatsapp' }
      };
    }

    // Check for "what courses" / "ver cursos"
    if (/(curso|cursos|opcoes|opções|quais|categoria|categoria|areas|áreas)/.test(input) && !findCourse(input)) {
      return {
        text: '📚 Temos 15 cursos de IA para todos os públicos:\n\n• IA Iniciante, Intermediário e Avançado\n• Vibe Code (programar com IA)\n• Edição de Vídeos com IA\n• IA para Engenheiros e Arquitetos\n• IA para Operadores de Drone\n• IA + Robótica para Crianças (7-12)\n• IA para Adolescentes (13-17)\n• Pacote Office com IA (Copilot)\n• Canva com IA\n• Criação de Sites no Lovable\n• Criação de Sites Avançado\n• Poe Bots de IA\n• IA + Empreendedorismo\n• Mentoria VIP (1-a-1)\n\nTodos: R$4.000 / 10h. Qual desses te interessa?',
        quick: ['IA Iniciante', 'Vibe Code', 'IA para Crianças', 'Mentoria VIP']
      };
    }

    // Check intents (payment, schedule, guarantee, price, faq)
    const intent = findIntent(input);
    if (intent) {
      return { text: intent.data.answer };
    }

    // Check for specific course
    const course = findCourse(input);
    if (course) {
      detectCourseInterest(userInput);
      const priceStr = course.isMentoria ? `A partir de R$ ${course.price.toLocaleString('pt-BR')}` : `R$ ${course.price.toLocaleString('pt-BR')} (10 horas)`;
      const audienceLine = course.audience ? `\n👥 Para: ${course.audience}` : '';
      return {
        text: `🎓 ${course.title}\n\n${course.short}\n\n💰 ${priceStr}${audienceLine}\n\nQuer matricular? É só clicar no botão abaixo.`,
        quick: ['Quero matricular', 'Ver outros cursos', 'Falar com humano'],
        action: { type: 'suggest_course', slug: course.slug, isMentoria: course.isMentoria }
      };
    }

    // Profile-based recommendation
    if (/(recomend|indic|qual curso|nao sei|não sei|qual o melhor|me ajuda|ajuda|sugest|acho|perfil)/.test(input)) {
      return {
        text: '🎯 Para te recomendar o curso ideal, me conta:\n\n1. Qual sua área de atuação? (ex: estudante, profissional de marketing, engenheiro, aposentado, dona de casa...)\n2. Para você mesmo ou para alguém? (filho, você, empresa)\n3. Já usou IA antes? (ChatGPT, etc)\n\nResponde rapidinho que eu te indico o melhor caminho!',
        quick: ['Sou iniciante total', 'Para meu filho (criança)', 'Sou criador de conteúdo', 'Sou empreendedor']
      };
    }

    // Profile answers
    if (/iniciante total|nunca usei|comecar do zero|começar do zero/.test(input)) {
      detectCourseInterest('ia-iniciante');
      return {
        text: '✨ Perfeito! Para você o curso ideal é o **IA Iniciante**.\n\nEm 10 horas você sai do zero a fluente em ChatGPT, Claude, Gemini, prompts, criação de imagens. Cada aula tem entrega prática.\n\nValor: R$4.000 (10h)\n\nQuer matricular?',
        quick: ['Quero matricular', 'Ver outros cursos'],
        action: { type: 'suggest_course', slug: 'ia-iniciante' }
      };
    }

    if (/meu filho|filha|crianca|criança|kid|infantil/.test(input)) {
      detectCourseInterest('ia-robotica-criancas');
      return {
        text: '👶 Para seu filho o curso ideal é o **IA + Robótica para Crianças (7-12 anos)**.\n\nCurso lúdico onde crianças aprendem IA criando robôs, games e histórias. Primeiro contato com tecnologia de forma divertida e segura.\n\nValor: R$4.000 (10h)\nTurmas: máximo 8 crianças\n\nQuer matricular?',
        quick: ['Quero matricular', 'Para adolescente (13-17)', 'Ver outros cursos'],
        action: { type: 'suggest_course', slug: 'ia-robotica-criancas' }
      };
    }

    if (/criador de conteudo|conteúdo|content|youtube|tiktok|instagram|social media|edicao|edição/.test(input)) {
      detectCourseInterest('edicao-videos-ia');
      return {
        text: '🎬 Para criadores de conteúdo, o curso ideal é **Edição de Vídeos com IA**.\n\nCapCut, Runway, Pika, Kling, Sora. Edição profissional, b-roll gerado por IA, legendas automáticas estilizadas.\n\nValor: R$4.000 (10h)\n\nQuer matricular?',
        quick: ['Quero matricular', 'Também quero Canva com IA', 'Ver outros cursos'],
        action: { type: 'suggest_course', slug: 'edicao-videos-ia' }
      };
    }

    if (/empreendedor|empreender|negocio|negócio|startup|sair do clt|clt/.test(input)) {
      detectCourseInterest('ia-empreendedorismo');
      return {
        text: '🚀 Para empreendedores, recomendamos o curso **IA + Empreendedorismo (Solo First Framework)**.\n\nTorne-se um Empreendedor T-Shaped com IA. Do posicionamento ao primeiro cliente.\n\nValor: R$4.000 (10h)\n\nOu, se quiser algo 1-a-1 sob medida, a Mentoria VIP começa em R$4.500.',
        quick: ['Quero matricular', 'Quero Mentoria VIP', 'Ver outros cursos'],
        action: { type: 'suggest_course', slug: 'ia-empreendedorismo' }
      };
    }

    // Default fallback
    return {
      text: '🤔 Hmm, não tenho certeza se entendi. Posso te ajudar com:\n\n• Informações sobre cursos (qualquer um dos 15)\n• Preços e formas de pagamento\n• Mentoria VIP\n• Horários e formato das aulas\n• Garantia e reembolso\n• Certificado\n\nO que você quer saber? Ou me conta o que você faz / quer aprender que eu te recomendo o curso certo!',
      quick: ['Ver cursos', 'Preços', 'Mentoria VIP', 'Falar com humano']
    };
  }

  function formatBRL(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  // ===== STORAGE =====
  function saveSession() {
    try {
      localStorage.setItem(CONFIG.sessionKey, JSON.stringify(state));
    } catch (e) {}
  }

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

  function saveLead() {
    try {
      const leads = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      const existingIdx = leads.findIndex(l => l.whatsapp === state.lead.whatsapp);
      const leadData = {
        ...state.lead,
        updatedAt: new Date().toISOString(),
        messages: state.messages
      };
      if (existingIdx >= 0) {
        leads[existingIdx] = leadData;
      } else {
        leads.push(leadData);
      }
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(leads));
    } catch (e) {}
  }

  // ===== TXT GENERATOR =====
  function generateLeadTxt() {
    const now = new Date();
    const dateStr = now.toLocaleString('pt-BR');
    const txt = [];
    txt.push('========================================');
    txt.push('  AI SCHOOL - LEAD CAPTURADO PELO CHATBOT');
    txt.push('========================================');
    txt.push('');
    txt.push(`Data: ${dateStr}`);
    txt.push(`Nome: ${state.lead.name}`);
    txt.push(`WhatsApp: ${state.lead.whatsapp}`);
    txt.push(`Cursos de interesse: ${state.lead.course_interest.length > 0 ? state.lead.course_interest.join(', ') : 'Nenhum específico'}`);
    txt.push(`Total de mensagens: ${state.messages.length}`);
    txt.push('');
    txt.push('----------------------------------------');
    txt.push('CONVERSA COMPLETA');
    txt.push('----------------------------------------');
    txt.push('');
    state.messages.forEach(m => {
      const time = new Date(m.timestamp).toLocaleTimeString('pt-BR');
      const sender = m.from === 'bot' ? 'ARIA (BOT)' : state.lead.name.toUpperCase();
      txt.push(`[${time}] ${sender}:`);
      txt.push(m.text);
      txt.push('');
    });
    txt.push('----------------------------------------');
    txt.push('AÇÃO RECOMENDADA:');
    if (state.lead.course_interest.length > 0) {
      txt.push(`Entrar em contato para fechar matrícula do(s) curso(s): ${state.lead.course_interest.join(', ')}`);
    } else {
      txt.push('Entrar em contato para entender necessidade e recomendar curso');
    }
    txt.push('');
    txt.push('========================================');
    return txt.join('\n');
  }

  function downloadTxt() {
    const content = generateLeadTxt();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const filename = `lead_${state.lead.name.replace(/\s+/g, '_')}_${state.lead.whatsapp.replace(/\D/g, '')}.txt`;
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function sendLeadToWhatsApp() {
    const txt = generateLeadTxt();
    // WhatsApp has a limit of ~4096 chars in wa.me links, so we truncate if needed
    const summary = `🤖 NOVO LEAD - AI SCHOOL\n\nNome: ${state.lead.name}\nWhatsApp: ${state.lead.whatsapp}\nInteresse: ${state.lead.course_interest.length > 0 ? state.lead.course_interest.join(', ') : 'A definir'}\n\nMensagens: ${state.messages.length}\n\n---\n\n${state.messages.slice(-10).map(m => `${m.from === 'bot' ? 'Bot' : state.lead.name}: ${m.text}`).join('\n\n').substring(0, 3000)}`;
    const url = `https://wa.me/${CONFIG.whatsappSchool}?text=${encodeURIComponent(summary)}`;
    window.open(url, '_blank');
  }

  // ===== UI =====
  let fab, window, messagesEl, inputEl, sendBtn, quickEl, actionsEl, badge;
  let isOpen = false;
  let isTyping = false;

  function createUI() {
    // FAB
    fab = el('button', { class: 'aichat-fab', 'aria-label': 'Abrir chatbot', title: 'Fale com a Aria' });
    fab.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
    badge = el('span', { class: 'aichat-badge' }, '1');
    fab.appendChild(badge);
    fab.addEventListener('click', toggleWindow);

    // Window
    window = el('div', { class: 'aichat-window', 'aria-label': 'Chat com a Aria' });

    // Header
    const header = el('div', { class: 'aichat-header' });
    const avatar = el('div', { class: 'aichat-avatar' }, '🤖');
    const info = el('div', { class: 'aichat-info' });
    info.appendChild(el('div', { class: 'aichat-info-name' }, `${CONFIG.botName} · AI School`));
    info.appendChild(el('div', { class: 'aichat-info-status' }, 'Online agora · responde em segundos'));
    const closeBtn = el('button', { class: 'aichat-close', 'aria-label': 'Fechar' });
    closeBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    closeBtn.addEventListener('click', toggleWindow);
    header.appendChild(avatar);
    header.appendChild(info);
    header.appendChild(closeBtn);

    // Messages
    messagesEl = el('div', { class: 'aichat-messages' });

    // Quick replies
    quickEl = el('div', { class: 'aichat-quick' });

    // Input wrap
    const inputWrap = el('div', { class: 'aichat-input-wrap' });
    inputEl = el('input', {
      class: 'aichat-input',
      type: 'text',
      placeholder: 'Digite sua mensagem...',
      autocomplete: 'off'
    });
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    sendBtn = el('button', { class: 'aichat-send', 'aria-label': 'Enviar' });
    sendBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    sendBtn.addEventListener('click', handleSend);
    inputWrap.appendChild(inputEl);
    inputWrap.appendChild(sendBtn);

    // Actions (download txt + send to whatsapp)
    actionsEl = el('div', { class: 'aichat-actions' });
    const downloadBtn = el('button', { class: 'aichat-action-btn', title: 'Baixar conversa em TXT' });
    downloadBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> TXT`;
    downloadBtn.addEventListener('click', downloadTxt);
    const sendWaBtn = el('button', { class: 'aichat-action-btn primary', title: 'Enviar conversa para a escola' });
    sendWaBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> Enviar lead`;
    sendWaBtn.addEventListener('click', sendLeadToWhatsApp);
    actionsEl.appendChild(downloadBtn);
    actionsEl.appendChild(sendWaBtn);

    window.appendChild(header);
    window.appendChild(messagesEl);
    window.appendChild(quickEl);
    window.appendChild(inputWrap);
    window.appendChild(actionsEl);

    document.body.appendChild(fab);
    document.body.appendChild(window);

    // Auto-open after 5s if never interacted
    setTimeout(() => {
      if (!localStorage.getItem('aichat_opened')) {
        // gentle nudge
      }
    }, 5000);
  }

  function toggleWindow() {
    isOpen = !isOpen;
    if (isOpen) {
      fab.classList.add('open');
      window.classList.add('open');
      badge.style.display = 'none';
      localStorage.setItem('aichat_opened', '1');
      // Start conversation if empty
      if (state.messages.length === 0) {
        startConversation();
      }
      setTimeout(() => inputEl.focus(), 300);
    } else {
      fab.classList.remove('open');
      window.classList.remove('open');
    }
  }

  function addMessage(text, from) {
    const msg = { text, from, timestamp: Date.now() };
    state.messages.push(msg);
    saveSession();

    const msgEl = el('div', { class: `aichat-msg aichat-msg-${from}` }, text);
    messagesEl.appendChild(msgEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    isTyping = true;
    const t = el('div', { class: 'aichat-typing', id: 'aichat-typing-indicator' });
    t.appendChild(el('span'));
    t.appendChild(el('span'));
    t.appendChild(el('span'));
    messagesEl.appendChild(t);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    isTyping = false;
    const t = document.getElementById('aichat-typing-indicator');
    if (t) t.remove();
  }

  function showQuick(replies) {
    quickEl.innerHTML = '';
    if (!replies || replies.length === 0) return;
    replies.forEach(r => {
      const btn = el('button', { class: 'aichat-quick-btn' }, r);
      btn.addEventListener('click', () => {
        quickEl.innerHTML = '';
        handleUserInput(r);
      });
      quickEl.appendChild(btn);
    });
  }

  async function botSay(text, quick, action) {
    showTyping();
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
    hideTyping();
    addMessage(text, 'bot');
    if (quick) showQuick(quick);
    if (action && action.type === 'suggest_course') {
      // Show matricular button
      const ctaBtn = el('button', { class: 'aichat-action-btn primary', style: 'margin-top:8px;width:100%;max-width:200px;' }, '🚀 Matricular agora');
      ctaBtn.addEventListener('click', () => redirectToCourse(action.slug, action.isMentoria));
      quickEl.appendChild(ctaBtn);
    }
  }

  function redirectToCourse(slug, isMentoria) {
    saveLead();
    if (isMentoria) {
      window.location.hash = '#/checkout/mentoria';
    } else {
      // Try Next.js router hash first, fallback to landing page
      window.location.hash = `#/checkout/${slug}`;
    }
    // Close chat
    toggleWindow();
  }

  function redirectToWhatsApp() {
    saveLead();
    window.open(`https://wa.me/${CONFIG.whatsappSchool}`, '_blank');
  }

  // ===== FLOW =====
  function startConversation() {
    const existing = loadSession();
    if (existing && existing.lead && existing.lead.name && existing.lead.whatsapp) {
      state = existing;
      state.messages.forEach(m => {
        const msgEl = el('div', { class: `aichat-msg aichat-msg-${m.from}` }, m.text);
        messagesEl.appendChild(msgEl);
      });
      messagesEl.scrollTop = messagesEl.scrollHeight;
      botSay(`Bem-vindo de volta, ${state.lead.name}! 👋\n\nJá tenho seus dados salvos. Posso te ajudar com mais alguma coisa?`, ['Ver cursos', 'Preços', 'Mentoria VIP']);
      return;
    }

    state.lead.startedAt = new Date().toISOString();
    saveSession();
    botSay(`Olá! 👋 Eu sou a ${CONFIG.botName}, sua assistente da AI School.\n\nVou te ajudar a encontrar o curso perfeito e tirar todas suas dúvidas — sem reunião, sem enrolação. 🚀\n\nPara começar, qual o seu nome?`);
    state.step = 'ask_name';
  }

  async function handleUserInput(input) {
    const text = (typeof input === 'string' ? input : inputEl.value).trim();
    if (!text) return;
    inputEl.value = '';

    addMessage(text, 'user');

    if (state.step === 'ask_name') {
      state.lead.name = text;
      saveSession();
      await botSay(`Prazer em conhecer você, ${text}! 😊\n\nAgora me passa seu WhatsApp (com DDD) para eu poder te enviar informações e, se quiser, te contatar depois:\n\nEx: 11966161611 ou 11 96616-1611`);
      state.step = 'ask_whatsapp';
      return;
    }

    if (state.step === 'ask_whatsapp') {
      const digits = text.replace(/\D/g, '');
      if (digits.length < 10) {
        await botSay('Hmm, esse número parece incompleto. Pode me passar novamente? Preciso do DDD + número. Ex: 11966161611');
        return;
      }
      state.lead.whatsapp = digits;
      saveSession();
      saveLead();
      await botSay(`Perfeito, ${state.lead.name}! ✅ Seu WhatsApp foi salvo com segurança.\n\nAgora me conta: o que você quer aprender? Posso te recomendar o curso ideal ou responder qualquer dúvida.`, ['Ver cursos', 'Preços', 'Mentoria VIP', 'Qual curso é pra mim?']);
      state.step = 'chatting';
      return;
    }

    // Chatting mode
    const response = getBotResponse(text);
    await botSay(response.text, response.quick, response.action);

    if (response.action) {
      if (response.action.type === 'redirect_course') {
        // Already shown CTA in quick
      } else if (response.action.type === 'redirect_whatsapp') {
        const waBtn = el('button', { class: 'aichat-action-btn primary', style: 'margin-top:8px;width:100%;max-width:240px;' }, 'Abrir WhatsApp');
        waBtn.addEventListener('click', redirectToWhatsApp);
        quickEl.appendChild(waBtn);
      }
    }

    // Auto-save lead every few messages
    if (state.messages.length % 5 === 0) {
      saveLead();
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

  // Auto-init
  init();

  // Expose API
  window.AISchoolChatbot = {
    open: () => { if (!isOpen) toggleWindow(); },
    close: () => { if (isOpen) toggleWindow(); },
    getLeads: () => JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]'),
    exportAllLeads: function() {
      const leads = this.getLeads();
      const txt = leads.map(l => {
        const lines = [];
        lines.push(`Lead: ${l.name} | WhatsApp: ${l.whatsapp}`);
        lines.push(`Interesse: ${l.course_interest ? l.course_interest.join(', ') : 'Nenhum'}`);
        lines.push(`Capturado em: ${l.startedAt || 'N/A'}`);
        lines.push(`Atualizado em: ${l.updatedAt || 'N/A'}`);
        lines.push('---');
        return lines.join('\n');
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
})();
