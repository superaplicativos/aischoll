// AI School - Catálogo completo de cursos
// Todos os cursos: R$ 4.000 / 10 horas. Mentoria VIP: a partir de R$ 4.500.

export type CourseLevel = "iniciante" | "intermediario" | "avancado" | "infantil" | "vip";
export type CourseCategory =
  | "fundamentos"
  | "vibe-code"
  | "criatividade"
  | "profissional"
  | "infanto-juvenil"
  | "produtividade"
  | "empreendedorismo"
  | "mentoria";

export interface Course {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  hours: number;
  pricePerHour: number;
  icon: string;
  gradient: string;
  tags: string[];
  targetAudience: string;
  prerequisites: string;
  whatYouWillLearn: string[];
  modules: { title: string; topics: string[] }[];
  tools: string[];
  bonus?: string[];
  duration: string;
  format: string;
  certificate: string;
  featured?: boolean;
}

export const COURSE_PRICE = 4000;
export const COURSE_HOURS = 10;
export const PRICE_PER_HOUR = COURSE_PRICE / COURSE_HOURS; // R$ 400/h
export const MENTORIA_VIP_MIN = 4500;

export const courses: Course[] = [
  {
    slug: "ia-iniciante",
    title: "IA Iniciante: Primeiros Passos com Inteligência Artificial",
    shortDescription:
      "Comece do zero. Aprenda a usar ChatGPT, Claude e Gemini no dia a dia, no trabalho e nos estudos.",
    fullDescription:
      "Este é o curso de porta de entrada para o universo da Inteligência Artificial. Você não precisa de nenhum conhecimento prévio de tecnologia ou programação. Em 10 horas você vai sair de zero a fluente nas ferramentas de IA mais usadas no mundo, entendendo como elas pensam, o que podem e o que não podem fazer, e como aplicá-las para ganhar horas de tempo livre no trabalho, nos estudos e na vida pessoal. O método é 100% prático: a cada aula você sai com um resultado concreto que pode usar no mesmo dia.",
    category: "fundamentos",
    level: "iniciante",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Sparkles",
    gradient: "from-violet-500 to-fuchsia-500",
    tags: ["ChatGPT", "Claude", "Gemini", "Prompts", "Iniciante"],
    targetAudience:
      "Pessoas sem nenhum conhecimento de IA que querem começar a usar IA no dia a dia — estudantes, aposentados, profissionais de qualquer área, donas de casa, empreendedores iniciantes.",
    prerequisites: "Nenhum. Basta saber usar um computador, celular e ter conta de e-mail.",
    whatYouWillLearn: [
      "O que é IA generativa e como ela funciona por dentro (sem jargão técnico)",
      "Como criar prompts que realmente funcionam — a fórmula CRISPE",
      "ChatGPT na prática: redação, resumos, e-mails, planejamento, estudos",
      "Claude para documentos longos e análise de PDFs",
      "Gemini integrado ao ecossistema Google (Docs, Gmail, Drive)",
      "Como evitar alucinações e checar informações",
      "Criação de imagens com IA (DALL-E, Imagen)",
      "Aplicações no trabalho, estudos e vida pessoal",
      "Limites éticos, privacidade e LGPD",
      "Como continuar evoluindo depois do curso",
    ],
    modules: [
      {
        title: "Módulo 1 — Mindset e Fundamentos",
        topics: [
          "O que é (e o que não é) Inteligência Artificial",
          "IA generativa vs. IA tradicional",
          "Tour completo pelas ferramentas gratuitas e pagas",
          "Como a IA vai impactar sua profissão nos próximos 5 anos",
        ],
      },
      {
        title: "Módulo 2 — A Arte do Prompt",
        topics: [
          "Anatomia de um bom prompt",
          "Fórmula CRISPE: Contexto, Role, Instruction, Specificity, Output, Extras",
          "Engenharia de prompt básica: few-shot, chain-of-thought",
          "Erros comuns que quebram seus resultados",
        ],
      },
      {
        title: "Módulo 3 — ChatGPT na Prática",
        topics: [
          "Conta gratuita vs. Plus: vale a pena pagar?",
          "Custom GPTs: criando seu próprio assistente",
          "Memória, projetos e histórico avançado",
          "20 casos de uso testados no dia a dia",
        ],
      },
      {
        title: "Módulo 4 — Claude, Gemini e o Ecossistema",
        topics: [
          "Claude: o melhor para documentos longos",
          "Gemini integrado ao Google Workspace",
          "Perplexity: o buscador com IA",
          "Como escolher a ferramenta certa para cada tarefa",
        ],
      },
      {
        title: "Módulo 5 — Imagens, Áudio e Vídeo",
        topics: [
          "DALL-E 3 e Imagen: criação de imagens",
          "Voz com IA: ElevenLabs e Whisper",
          "Vídeos curtos com IA generativa",
          "Edição de mídia com IA gratuitamente",
        ],
      },
      {
        title: "Módulo 6 — Ética, Limites e Próximos Passos",
        topics: [
          "Alucinações: como identificar e corrigir",
          "Privacidade, LGPD e dados sensíveis",
          "Viés e responsabilidade no uso de IA",
          "Plano de evolução pessoal pós-curso",
        ],
      },
    ],
    tools: ["ChatGPT", "Claude", "Gemini", "DALL-E", "Perplexity", "ElevenLabs"],
    bonus: [
      "Biblioteca com 100+ prompts prontos para usar",
      "Acesso vitalício à comunidade AI School no WhatsApp",
      "Certificado digital reconhecido",
    ],
    duration: "10 horas (5 encontros de 2h ou 10 de 1h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate:
      "Certificado digital AI School com carga horária de 10 horas e verificação de autenticidade",
    featured: true,
  },
  {
    slug: "ia-intermediario",
    title: "IA Intermediário: Fluxos, Automações e Agentes",
    shortDescription:
      "Saia do prompt solto. Aprenda a encadear ferramentas, criar agentes e automatizar tarefas repetitivas.",
    fullDescription:
      "Você já usa o ChatGPT, mas quer ir além de perguntar e responder. Neste curso intermediário você vai aprender a construir fluxos reais de trabalho usando IA, integrar diferentes ferramentas, criar agentes especializados e automatizar tarefas que hoje consomem horas da sua semana. O foco é produtividade profissional: do primeiro prompt à automação que roda sozinha.",
    category: "fundamentos",
    level: "intermediario",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Workflow",
    gradient: "from-emerald-500 to-cyan-500",
    tags: ["Automação", "Agentes", "n8n", "Make", "Fluxos"],
    targetAudience:
      "Profissionais que já usam ChatGPT ou Claude no dia a dia e querem automatizar tarefas, ganhar escala e criar fluxos com IA.",
    prerequisites: "Conhecimento do curso de IA Iniciante ou equivalente prático.",
    whatYouWillLearn: [
      "Encadeamento de prompts (chaining) para tarefas complexas",
      "Criação de Custom GPTs e Projects no Claude",
      "Agentes de IA: o que são, quando usar e como construir",
      "Automação com n8n (gratuito): do zero ao primeiro fluxo",
      "Automação com Make/Integromat: alternativa visual",
      "Conectando IA com Gmail, Sheets, Notion, WhatsApp",
      "RAG básico: como alimentar a IA com seus documentos",
      "Webhooks: como fazer sistemas diferentes conversarem",
      "Prompt caching e redução de custo",
      "Deploy e monitoramento de automações",
    ],
    modules: [
      {
        title: "Módulo 1 — Do Prompt ao Fluxo",
        topics: [
          "Mentalidade de fluxo: parar de fazer tarefas, criar sistemas",
          "Anatomia de um agente de IA",
          "Ferramentas (tools) que um agente pode usar",
        ],
      },
      {
        title: "Módulo 2 — Custom GPTs e Claude Projects",
        topics: [
          "Como criar um Custom GPT útil",
          "Knowledge base: subindo seus documentos",
          "Actions: integrando com APIs externas",
        ],
      },
      {
        title: "Módulo 3 — n8n do Zero",
        topics: [
          "Instalação local e na nuvem",
          "Triggers, nodes e conexões",
          "Integrando ChatGPT no n8n",
          "Seu primeiro agente autônomo",
        ],
      },
      {
        title: "Módulo 4 — Make.com e Zapier com IA",
        topics: [
          "Comparativo: n8n vs. Make vs. Zapier",
          "Templates prontos para produtividade",
          "Criação de cenários visuais",
        ],
      },
      {
        title: "Módulo 5 — RAG Básico",
        topics: [
          "O que é Retrieval-Augmented Generation",
          "Subindo uma base de conhecimento",
          "Chatbot que responde a partir dos seus PDFs",
          "Ferramentas no-code: AnythingLLM, PrivateGPT",
        ],
      },
      {
        title: "Módulo 6 — Deploy e Operação",
        topics: [
          "Publicando seu agente",
          "Monitoramento e logs",
          "Custos, limites e otimização",
          "Segurança e governança básica",
        ],
      },
    ],
    tools: ["ChatGPT", "Claude", "n8n", "Make.com", "Zapier", "AnythingLLM"],
    bonus: [
      "10 templates de fluxo n8n prontos para importar",
      "Biblioteca de Custom GPTs prontos",
      "Acesso vitalício à comunidade AI School",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — 10 horas",
    featured: true,
  },
  {
    slug: "ia-avancado",
    title: "IA Avançado: Agentes, RAG, LLMs e APIs",
    shortDescription:
      "Para quem quer dominar IA no nível técnico. Agentes autônomos, RAG, fine-tuning, MCP e APIs.",
    fullDescription:
      "Este é o curso para quem quer realmente dominar IA no nível profissional. Você vai trabalhar com APIs de LLMs (OpenAI, Anthropic, Google), construir agentes autônomos com tools, implementar RAG em produção, entender context engineering, configurar MCP servers e até fazer fine-tuning de modelos. O curso assume familiaridade com programação básica, mas não exige que você seja engenheiro de software sênior.",
    category: "fundamentos",
    level: "avancado",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Cpu",
    gradient: "from-orange-500 to-red-500",
    tags: ["APIs", "RAG", "Agentes", "Fine-tuning", "MCP", "OpenAI"],
    targetAudience:
      "Desenvolvedores, analistas de dados, CTOs, fundadores de startup e profissionais técnicos que querem construir produtos com IA.",
    prerequisites:
      "Curso de IA Intermediário ou experiência equivalente. Programação básica em Python ou JavaScript ajuda.",
    whatYouWillLearn: [
      "APIs de LLM: OpenAI, Anthropic, Google, OpenRouter",
      "Tokenização, custo e context window na prática",
      "Function calling e tools",
      "Agentes autônomos com LangChain e LangGraph",
      "RAG em produção: embeddings, vector DB, retrieval",
      "Vector databases: Pinecone, Qdrant, Chroma",
      "Context engineering avançado",
      "Model Context Protocol (MCP): servidores e clientes",
      "Fine-tuning: quando usar, como fazer, custos",
      "Avaliação de modelos e guardrails",
    ],
    modules: [
      {
        title: "Módulo 1 — APIs de LLM na Prática",
        topics: [
          "OpenAI, Anthropic, Google AI Studio",
          "Streaming, function calling, structured outputs",
          "Custo real por token e por requisição",
        ],
      },
      {
        title: "Módulo 2 — Agentes Autônomos",
        topics: [
          "ReAct pattern",
          "LangChain vs. LangGraph vs. OpenAI Agents SDK",
          "Construindo um agente com tools",
        ],
      },
      {
        title: "Módulo 3 — RAG em Produção",
        topics: [
          "Embeddings: OpenAI, Cohere, BGE",
          "Vector DBs: Pinecone, Qdrant, Chroma",
          "Chunking, reranking, hybrid search",
        ],
      },
      {
        title: "Módulo 4 — Context Engineering",
        topics: [
          "Como projetar o contexto perfeito",
          "Memória de longo prazo",
          "Redução de custo com prompt caching",
        ],
      },
      {
        title: "Módulo 5 — MCP e Integrações",
        topics: [
          "O que é o Model Context Protocol",
          "Servidores MCP: criando o seu",
          "Clientes: Claude Desktop, Cursor, Continue",
        ],
      },
      {
        title: "Módulo 6 — Fine-tuning e Avaliação",
        topics: [
          "Quando fazer fine-tuning (e quando não fazer)",
          "LoRA e QLoRA: fine-tuning barato",
          "Eval: como saber se seu sistema está bom",
        ],
      },
    ],
    tools: [
      "OpenAI API",
      "Anthropic API",
      "LangChain",
      "LangGraph",
      "Pinecone",
      "Qdrant",
      "Chroma",
      "Cursor",
    ],
    bonus: [
      "Notebooks Jupyter com todos os exemplos",
      "Acesso a um servidor de embedding por 3 meses",
      "Templates de agentes prontos para produção",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — 10 horas (nível avançado)",
    featured: true,
  },
  {
    slug: "vibe-code",
    title: "Vibe Code: Programe com IA do Zero ao Deploy",
    shortDescription:
      "Aprenda a programar com IA usando Cursor, Windsurf e Claude Code. Construa apps reais sem ser engenheiro.",
    fullDescription:
      "Vibe Coding é a nova forma de programar — você descreve o que quer em linguagem natural e a IA escreve o código. Neste curso você vai do zero ao deploy de aplicações web completas usando as ferramentas mais modernas do mercado (Cursor, Windsurf, Claude Code, v0). Não precisa ser programador. Não precisa saber JavaScript. Em 10 horas você terá publicado pelo menos 2 aplicações reais no ar.",
    category: "vibe-code",
    level: "iniciante",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Code2",
    gradient: "from-cyan-500 to-blue-500",
    tags: ["Cursor", "Windsurf", "Claude Code", "v0", "Lovable"],
    targetAudience:
      "Empreendedores, designers, produtores de conteúdo, estudantes e qualquer pessoa que queira construir apps sem saber programar.",
    prerequisites: "Nenhum. Vontade de criar é o suficiente.",
    whatYouWillLearn: [
      "O que é Vibe Coding e por que muda tudo",
      "Cursor: o editor que programa com você",
      "Windsurf: a alternativa com agents",
      "Claude Code: o agente de terminal",
      "v0.dev: criando UIs com prompts",
      "Lovable: apps completos com um prompt",
      "Deploy na Vercel, Netlify e GitHub Pages",
      "Banco de dados com Supabase e Neon",
      "Como depurar quando a IA erra",
      "Padrões e boas práticas do Vibe Coding",
    ],
    modules: [
      {
        title: "Módulo 1 — Setup e Mentalidade",
        topics: [
          "Instalando Cursor, Windsurf e Claude Code",
          "Como 'pensar em prompt' para código",
          "Estrutura de um projeto web moderno",
        ],
      },
      {
        title: "Módulo 2 — Cursor na Prática",
        topics: [
          "Composer, Chat e Agent mode",
          ".cursorrules: configurando o projeto",
          "Refatoração guiada por IA",
        ],
      },
      {
        title: "Módulo 3 — Windsurf e Claude Code",
        topics: [
          "Windsurf Cascade e agentes",
          "Claude Code no terminal",
          "Quando usar cada ferramenta",
        ],
      },
      {
        title: "Módulo 4 — v0 e Lovable",
        topics: [
          "v0: geração de UIs instantâneas",
          "Lovable: apps completos com 1 prompt",
          "Integração com Supabase",
        ],
      },
      {
        title: "Módulo 5 — Projeto Prático",
        topics: [
          "Construindo um app real do zero",
          "Banco de dados, auth e deploy",
          "Publicando na Vercel",
        ],
      },
      {
        title: "Módulo 6 — Debug, Padrões e Produção",
        topics: [
          "Como ler e corrigir código que a IA escreveu",
          "Estrutura de pastas e convenções",
          "CI/CD, domínio próprio e monitoramento",
        ],
      },
    ],
    tools: ["Cursor", "Windsurf", "Claude Code", "v0.dev", "Lovable", "Vercel", "Supabase", "GitHub"],
    bonus: [
      "Repositório com 5 boilerplates prontos",
      "Catálogo de 50+ prompts testados para Vibe Coding",
      "Acesso ao grupo exclusivo de Vibe Coders no Discord",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — Vibe Code 10 horas",
    featured: true,
  },
  {
    slug: "edicao-videos-ia",
    title: "Edição de Vídeos com IA: Do Clip ao Longo",
    shortDescription:
      "CapCut, Runway, Pika, Kling, Sora. Edição profissional, b-roll gerado por IA e legendas automáticas.",
    fullDescription:
      "Edição de vídeo ficou 10x mais rápido com IA. Neste curso você vai dominar CapCut, Runway, Pika, Kling e as novas ferramentas de geração de vídeo. Aprenda a criar b-roll com IA, editar clipes curtos virais, produzir vídeos longos para YouTube e gerar legendas automáticas com qualidade profissional. Indicado para criadores de conteúdo, social media, editores e youtubers.",
    category: "criatividade",
    level: "intermediario",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Clapperboard",
    gradient: "from-pink-500 to-rose-500",
    tags: ["CapCut", "Runway", "Pika", "Kling", "Sora", "Edição"],
    targetAudience:
      "Criadores de conteúdo, social media, editores de vídeo, youtubers, tiktokers e pequenos negócios que querem produzir vídeo com qualidade profissional.",
    prerequisites: "Familiaridade básica com computador. Não exige conhecimento técnico.",
    whatYouWillLearn: [
      "CapCut Pro com IA: edição rápida e profissional",
      "Geração de b-roll com Runway Gen-3 e Pika 1.5",
      "Vídeos longos com Kling AI e Sora",
      "Legendas automáticas estilizadas",
      "Voz com IA: ElevenLabs e clonagem ética",
      "Removing e substituição de fundo com IA",
      "Colorização e upscale com IA",
      "Workflow completo: do roteiro ao post",
      "Edição para Reels, Shorts e TikTok",
      "Edição para YouTube longo e podcast",
    ],
    modules: [
      {
        title: "Módulo 1 — Stack de Edição com IA",
        topics: [
          "CapCut vs. Premiere com IA",
          "Quando usar cada ferramenta",
          "Setup de workflow",
        ],
      },
      {
        title: "Módulo 2 — Geração de Vídeo",
        topics: [
          "Runway Gen-3: text-to-video e image-to-video",
          "Pika 1.5: motion e efeitos",
          "Kling e Sora: limites e aplicações",
        ],
      },
      {
        title: "Módulo 3 — Voz e Áudio",
        topics: [
          "ElevenLabs: TTS e voice cloning ético",
          "Tratamento de áudio com Adobe IA",
          "Sound effects com IA",
        ],
      },
      {
        title: "Módulo 4 — Edição para Redes",
        topics: [
          "Reels e Shorts: ritmo e cortes",
          "Legendas automáticas estilizadas",
          "Hooks que prendem atenção",
        ],
      },
      {
        title: "Módulo 5 — YouTube e Longo",
        topics: [
          "Edição de vídeos longos com IA",
          "B-roll automático",
          "Thumbnail com IA",
        ],
      },
      {
        title: "Módulo 6 — Projeto Final",
        topics: [
          "Produção de um vídeo completo do zero",
          "Publicação multiplataforma",
          "Análise de métricas e iteração",
        ],
      },
    ],
    tools: ["CapCut", "Runway", "Pika", "Kling", "Sora", "ElevenLabs", "Adobe Premiere IA"],
    bonus: [
      "Pacote com 200 prompts para geração de b-roll",
      "Templates de edição CapCut prontos",
      "Acesso a uma biblioteca de voz com IA",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — Edição de Vídeos com IA",
    featured: true,
  },
  {
    slug: "ia-engenheiros-arquitetos",
    title: "IA para Engenheiros e Arquitetos",
    shortDescription:
      "BIM, renderização, projetos, cálculos, propostas. IA aplicada à engenharia e arquitetura.",
    fullDescription:
      "Curso desenhado para engenheiros civis, arquitetos, calculistas e profissionais da construção civil que querem integrar IA no fluxo de trabalho. Aprenda a acelerar renderizações, automatizar projetos, gerar memórias de cálculo, criar propostas comerciais impressionantes e otimizar a comunicação com clientes. IA não substitui o engenheiro — ela o multiplica.",
    category: "profissional",
    level: "intermediario",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Building2",
    gradient: "from-amber-500 to-orange-500",
    tags: ["BIM", "Revit", "Renderização", "Memória de cálculo", "Propostas"],
    targetAudience:
      "Engenheiros civis, arquitetos, calculistas, projetistas e estudantes de engenharia/arquitetura.",
    prerequisites: "Conhecimento básico de ferramentas como AutoCAD, Revit ou SketchUp ajuda.",
    whatYouWillLearn: [
      "Renderização com IA: Midjourney, Veras, PromeAI",
      "Geração de plantas e layouts com IA",
      "Memória de cálculo assistida por IA",
      "Propostas comerciais e apresentações com IA",
      "ChatGPT para estudos de viabilidade técnica",
      "Automação de planilhas de orçamento",
      "Análise de normas técnicas com RAG",
      "Modelos 3D com IA a partir de planta 2D",
      "Virtual staging com IA",
      "Workflow de projeto do briefing à entrega",
    ],
    modules: [
      {
        title: "Módulo 1 — IA na Construção Civil",
        topics: [
          "Panorama: onde IA já está sendo usada",
          "Stack de ferramentas para arquitetura e engenharia",
          "Ética e responsabilidade técnica",
        ],
      },
      {
        title: "Módulo 2 — Renderização com IA",
        topics: [
          "Midjourney para concept design",
          "Veras: transformando SketchUp em realista",
          "PromeAI: estilos e variações",
        ],
      },
      {
        title: "Módulo 3 — Projeto e Cálculo",
        topics: [
          "Geração de layouts com IA",
          "ChatGPT + Excel para memória de cálculo",
          "Análise de normas com RAG",
        ],
      },
      {
        title: "Módulo 4 — Proposta e Apresentação",
        topics: [
          "Pitch visual com IA",
          "Apresentações em PowerPoint com IA",
          "Vídeos de apresentação de projeto",
        ],
      },
      {
        title: "Módulo 5 — Orçamento e Gestão",
        topics: [
          "Planilhas inteligentes com IA",
          "Automação de BOM e cronograma",
          "Comparativo de fornecedores com IA",
        ],
      },
      {
        title: "Módulo 6 — Projeto Prático",
        topics: [
          "Briefing → Conceito → Render → Proposta",
          "Apresentação final para cliente simulado",
          "Análise de ROI do uso de IA",
        ],
      },
    ],
    tools: ["Midjourney", "Veras", "PromeAI", "Revit", "SketchUp", "ChatGPT", "Excel"],
    bonus: [
      "Biblioteca de 100 prompts para engenharia",
      "Templates de proposta comercial",
      "Catálogo de estilos de renderização",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — IA para Engenheiros e Arquitetos",
    featured: false,
  },
  {
    slug: "ia-operadores-drone",
    title: "IA para Operadores de Drone",
    shortDescription:
      "Pós-processamento, mapeamento, inspeção e edição de filmagens aéreas com IA. Para pilotos profissionais.",
    fullDescription:
      "Curso específico para operadores de drone, pilotos ANAC e profissionais de aerofotogrametria. Aprenda a usar IA para acelerar o pós-processamento, gerar ortomosaicos inteligentes, editar filmagens aéreas, identificar defeitos em inspeções e criar relatórios automatizados. Inclui integração com DroneDeploy, Pix4D e ferramentas de visão computacional.",
    category: "profissional",
    level: "intermediario",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Plane",
    gradient: "from-sky-500 to-indigo-500",
    tags: ["Drone", "Pós-processamento", "Mapeamento", "Inspeção", "Filmagem"],
    targetAudience:
      "Operadores de drone, pilotos ANAC, empresas de aerolevantamento, inspetores industriais e fotógrafos aéreos.",
    prerequisites: "Experiência básica com pilotagem de drone e pós-processamento.",
    whatYouWillLearn: [
      "Edição de filmagens aéreas com CapCut e Premiere IA",
      "Estabilização e upscale com IA",
      "Geração de ortomosaicos com IA",
      "Detecção de defeitos em inspeções com visão computacional",
      "Relatórios automáticos com IA",
      "Mapeamento 3D com IA",
      "Detecção de objetos e contagem",
      "Filmes aéreos cinematográficos com IA",
      "Análise de área, volume e altura com IA",
      "Negócios: como precificar serviços com IA",
    ],
    modules: [
      {
        title: "Módulo 1 — Stack de IA para Drone",
        topics: [
          "Visão geral das ferramentas",
          "Workflow integrado de pós-processamento",
          "Setup de hardware recomendado",
        ],
      },
      {
        title: "Módulo 2 — Edição Aérea Cinematográfica",
        topics: [
          "CapCut + IA para drone",
          "Estabilização automática",
          "Color grading com IA",
        ],
      },
      {
        title: "Módulo 3 — Mapeamento e Modelagem",
        topics: [
          "DroneDeploy + IA",
          "Pix4D Cloud",
          "Visão computacional para ortomosaicos",
        ],
      },
      {
        title: "Módulo 4 — Inspeção Industrial",
        topics: [
          "Detecção de trincas, corrosão e falhas",
          "Modelos pré-treinados vs. custom",
          "Geração de relatório automático",
        ],
      },
      {
        title: "Módulo 5 — Agricultura e Meio Ambiente",
        topics: [
          "NDVI com IA",
          "Contagem de plantas e animais",
          "Detecção de desmatamento",
        ],
      },
      {
        title: "Módulo 6 — Negócios",
        topics: [
          "Como precificar seus serviços",
          "Proposta comercial com IA",
          "Captação de clientes com IA",
        ],
      },
    ],
    tools: ["DroneDeploy", "Pix4D", "CapCut", "ChatGPT", "Roboflow", "Labelbox"],
    bonus: [
      "Templates de relatório de inspeção",
      "Catálogo de prompts para edição aérea",
      "Lista de clientes potenciais por segmento",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — IA para Operadores de Drone",
    featured: false,
  },
  {
    slug: "ia-robotica-criancas",
    title: "IA + Robótica para Crianças (7 a 12 anos)",
    shortDescription:
      "Curso lúdico onde crianças aprendem IA criando robôs, games e histórias. Primeiro contato com tecnologia.",
    fullDescription:
      "Curso desenvolvido para crianças de 7 a 12 anos, no qual elas têm o primeiro contato com Inteligência Artificial e Robótica de forma lúdica, segura e divertida. As crianças aprendem lógica de programação visual (Scratch), criam jogos, dialogam com IA de forma educativa, montam robôs educacionais (usando kits como LEGO Education ou similares) e entendem como a IA funciona no dia a dia. Cada turma tem no máximo 8 crianças para garantir atenção individual.",
    category: "infanto-juvenil",
    level: "iniciante",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Bot",
    gradient: "from-yellow-400 to-orange-500",
    tags: ["Infantil", "Robótica", "Scratch", "Lógica", "Lúdico"],
    targetAudience:
      "Crianças de 7 a 12 anos curiosas por tecnologia. Não exige conhecimento prévio.",
    prerequisites: "Saber ler e escrever. Acompanhamento de um responsável é bem-vindo nas primeiras aulas.",
    whatYouWillLearn: [
      "O que é IA explicada para crianças",
      "Programação visual com Scratch",
      "Criação de jogos e histórias com IA",
      "Construção de robôs educacionais",
      "Lógica de programação (sequência, loop, condicional)",
      "Uso seguro e ético de IA",
      "Como a IA está nos celulares, jogos e casa",
      "Criatividade com IA generativa",
      "Trabalho em equipe e apresentação",
      "Projeto final: robô que faz algo útil",
    ],
    modules: [
      {
        title: "Módulo 1 — Conhecendo a IA",
        topics: [
          "IA está em todo lugar!",
          "Conversando com um robô pela primeira vez",
          "O que a IA pode (e não pode) fazer",
        ],
      },
      {
        title: "Módulo 2 — Programando com Blocos",
        topics: [
          "Primeiros passos no Scratch",
          "Criando uma animação",
          "Loop, condição e variável de forma divertida",
        ],
      },
      {
        title: "Módulo 3 — Robótica Educacional",
        topics: [
          "Montando o primeiro robô",
          "Sensores e motores",
          "Programando o robô para andar",
        ],
      },
      {
        title: "Módulo 4 — IA Generativa para Crianças",
        topics: [
          "Criando imagens com IA",
          "Histórias interativas com IA",
          "Voz com IA (com supervisão)",
        ],
      },
      {
        title: "Módulo 5 — IA no Dia a Dia",
        topics: [
          "Como funciona o YouTube, Netflix e TikTok",
          "Privacidade: o que podemos compartilhar",
          "Cidadania digital",
        ],
      },
      {
        title: "Módulo 6 — Projeto Final",
        topics: [
          "Criação de um robô com propósito",
          "Apresentação para os pais",
          "Certificado de 'Pequeno Cientista de IA'",
        ],
      },
    ],
    tools: ["Scratch", "LEGO Education", "Micro:bit", "ChatGPT Kids (supervisionado)", "Canva"],
    bonus: [
      "Kit de robótica incluso (em modalidade presencial) ou lista de materiais acessíveis",
      "Apresentação final para os pais",
      "Certificado de 'Pequeno Cientista de IA'",
    ],
    duration: "10 horas (10 encontros de 1h) — adaptado ao ritmo infantil",
    format: "Online ao vivo ou presencial (turmas de até 8 crianças)",
    certificate: "Certificado AI School Kids — Pequeno Cientista de IA",
    featured: true,
  },
  {
    slug: "ia-adolescentes",
    title: "IA para Adolescentes (13 a 17 anos)",
    shortDescription:
      "Criação de apps, jogos, arte digital e automações. IA para a próxima geração de criadores.",
    fullDescription:
      "Curso desenhado para adolescentes de 13 a 17 anos que querem dominar IA como ferramenta de criação. Eles vão programar com IA, criar jogos, gerar arte digital, automatizar tarefas da escola e começar a construir um portfólio digital. O curso estimula a curiosidade, a responsabilidade e o empreendedorismo jovem — preparando-os para um mercado que já exige fluência em IA.",
    category: "infanto-juvenil",
    level: "intermediario",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Gamepad2",
    gradient: "from-purple-500 to-pink-500",
    tags: ["Adolescentes", "Apps", "Jogos", "Arte", "Portfólio"],
    targetAudience: "Adolescentes de 13 a 17 anos interessados em tecnologia, games, design e criação.",
    prerequisites: "Familiaridade com computador. Não exige programação prévia.",
    whatYouWillLearn: [
      "Programação com IA (Cursor, Windsurf)",
      "Criação de jogos com IA",
      "Arte digital com Midjourney e Stable Diffusion",
      "Automação de tarefas escolares",
      "Criação de canal de conteúdo com IA",
      "Edição de vídeo para TikTok e YouTube",
      "Ética digital e privacidade",
      "Como começar a ganhar dinheiro com IA",
      "Construção de portfólio digital",
      "Projeto final: produto ou canal publicado",
    ],
    modules: [
      {
        title: "Módulo 1 — IA como Superpoder",
        topics: [
          "Por que IA muda tudo",
          "Stack de ferramentas para adolescentes",
          "Mindset de criador vs. consumidor",
        ],
      },
      {
        title: "Módulo 2 — Programação com IA",
        topics: [
          "Cursor: programando em português",
          "Construindo seu primeiro app",
          "Publicando online",
        ],
      },
      {
        title: "Módulo 3 — Criação de Conteúdo",
        topics: [
          "Edição de vídeo com CapCut + IA",
          "Imagens com Midjourney",
          "Voz com ElevenLabs",
        ],
      },
      {
        title: "Módulo 4 — Games e Robótica",
        topics: [
          "Criando um jogo com IA",
          "Robótica com Micro:bit",
          "Publicação na itch.io",
        ],
      },
      {
        title: "Módulo 5 — Cidadania Digital",
        topics: [
          "Privacidade e LGPD para jovens",
          "Como identificar deepfakes",
          "Saúde mental e redes sociais",
        ],
      },
      {
        title: "Módulo 6 — Projeto Final",
        topics: [
          "Lançamento de um produto, app ou canal",
          "Apresentação para a turma",
          "Plano de evolução",
        ],
      },
    ],
    tools: ["Cursor", "CapCut", "Midjourney", "Micro:bit", "Canva", "itch.io"],
    bonus: [
      "Portfólio digital publicado",
      "Apresentação final para a família",
      "Mentoria de carreira para jovens",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo ou presencial (turmas de até 10 adolescentes)",
    certificate: "Certificado AI School Teen — Criador Digital",
    featured: false,
  },
  {
    slug: "pacote-office-ia",
    title: "Pacote Office com IA",
    shortDescription:
      "Excel, Word e PowerPoint turbinados com Copilot e ChatGPT. Produtividade de outro nível.",
    fullDescription:
      "Domine o pacote Office com IA generativa. Aprenda a automatizar planilhas, criar apresentações profissionais em minutos, redigir documentos perfeitos e analisar dados com linguagem natural usando o Microsoft Copilot, ChatGPT e ferramentas integradas. Para profissionais que trabalham diariamente com Office.",
    category: "produtividade",
    level: "iniciante",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "FileSpreadsheet",
    gradient: "from-green-500 to-emerald-500",
    tags: ["Excel", "Word", "PowerPoint", "Copilot", "Produtividade"],
    targetAudience:
      "Profissionais administrativos, analistas, assistentes, gerentes e qualquer pessoa que use Office no trabalho.",
    prerequisites: "Conhecimento básico de Excel, Word e PowerPoint.",
    whatYouWillLearn: [
      "Excel + Copilot: análise de dados em linguagem natural",
      "Word + IA: redação, revisão e formatação",
      "PowerPoint + IA: apresentações em minutos",
      "Outlook com IA: e-mails, agenda e resumos",
      "Copilot Studio: criando agentes internos",
      "Fórmulas com IA: explique o que quer e gere a fórmula",
      "Dashboards automáticos com IA",
      "Automação entre Office e IA",
      "Templates inteligentes",
      "Produtividade real no trabalho",
    ],
    modules: [
      {
        title: "Módulo 1 — Excel com IA",
        topics: [
          "Copilot no Excel: o que muda",
          "Análise de dados com linguagem natural",
          "Fórmulas geradas por IA",
        ],
      },
      {
        title: "Módulo 2 — Word com IA",
        topics: [
          "Redação com Copilot",
          "Revisão e formatação automática",
          "Templates inteligentes",
        ],
      },
      {
        title: "Módulo 3 — PowerPoint com IA",
        topics: [
          "Apresentações em 60 segundos",
          "Design automático",
          "Speaker Coach",
        ],
      },
      {
        title: "Módulo 4 — Outlook com IA",
        topics: [
          "E-mails automáticos",
          "Resumo de threads",
          "Agenda inteligente",
        ],
      },
      {
        title: "Módulo 5 — Automações",
        topics: [
          "Power Automate com IA",
          "Templates de fluxo",
          "Integração entre apps",
        ],
      },
      {
        title: "Módulo 6 — Projeto Prático",
        topics: [
          "Construção de um dashboard real",
          "Apresentação executiva",
          "Templates para levar para o trabalho",
        ],
      },
    ],
    tools: ["Microsoft 365 Copilot", "ChatGPT", "Excel", "Word", "PowerPoint", "Power Automate"],
    bonus: [
      "Pacote de 50 templates Office",
      "Biblioteca de prompts para Copilot",
      "Guia de atalhos produtividade",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — Office com IA",
    featured: false,
  },
  {
    slug: "canva-ia",
    title: "Canva com IA: Design para Todos",
    shortDescription:
      "Magic Studio, Magic Design, Magic Edit. Design profissional sem saber design.",
    fullDescription:
      "Domine o Canva com a suíte Magic Studio. Crie posts, apresentações, logos, vídeos e materiais de marketing com IA generativa. Para quem quer fazer design profissional sem ser designer. Inclui branding, identidade visual, social media e impressos.",
    category: "criatividade",
    level: "iniciante",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Palette",
    gradient: "from-teal-500 to-cyan-500",
    tags: ["Canva", "Magic Studio", "Design", "Social Media", "Branding"],
    targetAudience:
      "Empreendedores, social media, secretárias, professores, vendedores e qualquer pessoa que precise criar peças visuais.",
    prerequisites: "Nenhuma. Curso é voltado para não-designers.",
    whatYouWillLearn: [
      "Canva Magic Studio: completo",
      "Magic Design: geração de layouts por prompt",
      "Magic Edit: edição de imagem com IA",
      "Magic Write: textos com IA",
      "Magic Animate: animações automáticas",
      "Branding e identidade visual",
      "Templates para social media",
      "Apresentações executivas",
      "Impressos: cartão, flyer, banner",
      "Workflow com Canva + ChatGPT",
    ],
    modules: [
      {
        title: "Módulo 1 — Canva + IA",
        topics: [
          "Tour pelo Magic Studio",
          "Magic Design: do prompt ao layout",
          "Brand Kit com IA",
        ],
      },
      {
        title: "Módulo 2 — Social Media",
        topics: [
          "Posts para Instagram, LinkedIn e TikTok",
          "Templates inteligentes",
          "Calendário editorial com IA",
        ],
      },
      {
        title: "Módulo 3 — Imagem e Vídeo",
        topics: [
          "Magic Edit: remova, substitua, adicione",
          "Magic Media: text-to-image e text-to-video",
          "Edição de vídeo com IA",
        ],
      },
      {
        title: "Módulo 4 — Branding",
        topics: [
          "Criação de logo com IA",
          "Paleta e tipografia",
          "Manual da marca simples",
        ],
      },
      {
        title: "Módulo 5 — Apresentações e Documentos",
        topics: [
          "Pitch deck em minutos",
          "Proposta comercial",
          "Relatório anual",
        ],
      },
      {
        title: "Módulo 6 — Projeto Final",
        topics: [
          "Branding completo para uma marca",
          "Kit de redes sociais",
          "Apresentação de portfólio",
        ],
      },
    ],
    tools: ["Canva Pro", "Magic Studio", "ChatGPT", "Brand Kit"],
    bonus: [
      "Pack com 100 templates Canva editáveis",
      "Brand kit template",
      "Calendário editorial anual",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — Canva com IA",
    featured: false,
  },
  {
    slug: "criacao-sites-lovable",
    title: "Criação de Sites no Lovable (No-Code com IA)",
    shortDescription:
      "Crie sites e apps completos no Lovable com 1 prompt. Não precisa saber programar.",
    fullDescription:
      "O Lovable é a ferramenta que mais cresce no mundo para criar aplicações web completas com IA. Neste curso você vai do zero ao deploy de 3 projetos reais usando Lovable: um site institucional, uma landing page de alta conversão e um app com login e banco de dados. Sem programar uma linha.",
    category: "vibe-code",
    level: "iniciante",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Layout",
    gradient: "from-rose-500 to-pink-500",
    tags: ["Lovable", "No-code", "Sites", "Apps", "Supabase"],
    targetAudience:
      "Empreendedores, designers, social media, pequenos negócios e qualquer pessoa que queira ter um site ou app sem programar.",
    prerequisites: "Nenhuma.",
    whatYouWillLearn: [
      "Setup e primeiros passos no Lovable",
      "Como escrever prompts que geram bons sites",
      "Estrutura de projeto no Lovable",
      "Integração com Supabase (auth + banco)",
      "Integração com Stripe (pagamentos)",
      "Deploy em domínio próprio",
      "Refatoração e ajustes com IA",
      "Templates reutilizáveis",
      "Quando NÃO usar Lovable",
      "3 projetos publicados",
    ],
    modules: [
      {
        title: "Módulo 1 — Setup Lovable + Supabase",
        topics: [
          "Conta e plano Lovable",
          "Conta Supabase",
          "Primeiro app em 5 minutos",
        ],
      },
      {
        title: "Módulo 2 — Prompting para Sites",
        topics: [
          "Como descrever um site",
          "Componentes, cores, layout",
          "Iteração eficaz",
        ],
      },
      {
        title: "Módulo 3 — Site Institucional",
        topics: [
          "Estrutura de páginas",
          "Hero, sobre, serviços, contato",
          "SEO básico",
        ],
      },
      {
        title: "Módulo 4 — Landing Page de Alta Conversão",
        topics: [
          "Estrutura de copy",
          "CTA, prova social, urgência",
          "Integração com e-mail",
        ],
      },
      {
        title: "Módulo 5 — App com Login e Banco",
        topics: [
          "Auth com Supabase",
          "CRUD com IA",
          "Painel admin",
        ],
      },
      {
        title: "Módulo 6 — Deploy e Domínio",
        topics: [
          "Publicação",
          "Domínio próprio",
          "Manutenção e iteração",
        ],
      },
    ],
    tools: ["Lovable", "Supabase", "Vercel", "Stripe", "GitHub"],
    bonus: [
      "3 projetos completos publicados",
      "Repositório com prompts Lovable",
      "Templates de landing page",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — Lovable No-Code",
    featured: false,
  },
  {
    slug: "criacao-sites-avancado",
    title: "Criação de Sites Avançado (Cursor + v0 + Bolt)",
    shortDescription:
      "Vibe coding profissional. Cursor, v0, Bolt, Next.js, deploy de apps reais com IA.",
    fullDescription:
      "Para quem quer construir produtos web profissionais com IA. Você vai dominar Cursor (Composer, Agent mode), v0 (UI generation), Bolt.new (prototipagem rápida), Next.js + Tailwind + shadcn/ui. No final você terá publicado um SaaS ou app completo no ar.",
    category: "vibe-code",
    level: "avancado",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Globe",
    gradient: "from-indigo-500 to-violet-500",
    tags: ["Cursor", "v0", "Bolt", "Next.js", "shadcn/ui"],
    targetAudience:
      "Desenvolvedores, designers técnicos, fundadores e quem já fez o curso de Vibe Code ou Lovable e quer avançar.",
    prerequisites: "Curso de Vibe Code ou experiência equivalente. JavaScript básico ajuda.",
    whatYouWillLearn: [
      "Cursor Composer + Agent mode na prática",
      "v0: geração de UIs shadcn prontas",
      "Bolt.new: protótipos completos",
      "Next.js 16 App Router com IA",
      "shadcn/ui + Tailwind 4",
      "Auth e banco com Supabase/Neon",
      "Pagamentos com Stripe",
      "Deploy em Vercel + domínio próprio",
      "CI/CD com GitHub Actions",
      "Projeto final: SaaS no ar",
    ],
    modules: [
      {
        title: "Módulo 1 — Stack Moderna",
        topics: [
          "Next.js 16 + Tailwind 4 + shadcn/ui",
          "Setup com Cursor",
          ".cursorrules",
        ],
      },
      {
        title: "Módulo 2 — UI com v0",
        topics: [
          "Geração de componentes",
          "Customização",
          "Design system",
        ],
      },
      {
        title: "Módulo 3 — Bolt.new",
        topics: [
          "Prototipagem completa",
          "Quando usar Bolt vs. Cursor",
          "Deploy direto",
        ],
      },
      {
        title: "Módulo 4 — Backend e Banco",
        topics: [
          "Supabase / Neon",
          "Auth + RLS",
          "Server Actions",
        ],
      },
      {
        title: "Módulo 5 — Pagamentos e Email",
        topics: [
          "Stripe Checkout",
          "Resend para e-mails transacionais",
          "Webhooks",
        ],
      },
      {
        title: "Módulo 6 — Projeto SaaS",
        topics: [
          "Construção de um SaaS real",
          "Deploy + domínio",
          "Métricas e iteração",
        ],
      },
    ],
    tools: ["Cursor", "v0", "Bolt.new", "Next.js", "Tailwind", "shadcn/ui", "Supabase", "Stripe", "Vercel"],
    bonus: [
      "Boilerplate de SaaS pronto",
      "Design system shadcn customizado",
      "Templates de e-mail transacional",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — Vibe Code Avançado",
    featured: false,
  },
  {
    slug: "poe-bots-ia",
    title: "Poe: Crie Seus Próprios Bots de IA",
    shortDescription:
      "Crie bots com IA para vender, atender e automatizar. Monetize com Poe.",
    fullDescription:
      "O Poe (da Quora) é a plataforma que permite criar bots de IA personalizados usando múltiplos modelos (GPT-4, Claude, Gemini, Llama) sem programar. Neste curso você aprende a criar bots úteis, publicar na Poe Store, monetizar e integrar via API em seus projetos.",
    category: "vibe-code",
    level: "intermediario",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Bot",
    gradient: "from-fuchsia-500 to-purple-500",
    tags: ["Poe", "Bots", "GPTs", "Monetização", "Automação"],
    targetAudience:
      "Criadores de conteúdo, empreendedores, social media, suporte, vendedores e qualquer pessoa que queira criar bots com IA.",
    prerequisites: "Conhecimento básico de IA (curso de IA Iniciante).",
    whatYouWillLearn: [
      "Poe: como funciona e por que usar",
      "Criando seu primeiro bot em 5 minutos",
      "Escolhendo o modelo certo (GPT-4, Claude, Llama, Gemini)",
      "Knowledge base: subindo seus PDFs e dados",
      "Prompt template: como estruturar",
      "Image bots com FLUX e Stable Diffusion",
      "Server bots com tools",
      "Publicação na Poe Store",
      "Monetização: como ganhar com bots",
      "Integração via API (Python e JS)",
    ],
    modules: [
      {
        title: "Módulo 1 — Tour pelo Poe",
        topics: [
          "Plataforma, planos e modelos",
          "Primeiro bot",
          "Casos de uso",
        ],
      },
      {
        title: "Módulo 2 — Prompt Engineering para Bots",
        topics: [
          "Estrutura de prompt template",
          "Persona e contexto",
          "Few-shot examples",
        ],
      },
      {
        title: "Módulo 3 — Knowledge Base",
        topics: [
          "Subindo PDFs e documentos",
          "Chunks e retrieval",
          "Atualização contínua",
        ],
      },
      {
        title: "Módulo 4 — Bots com Imagem",
        topics: [
          "FLUX.1 e Stable Diffusion",
          "Bots de avatar",
          "Bots de ilustração",
        ],
      },
      {
        title: "Módulo 5 — Publicação e Monetização",
        topics: [
          "Poe Store",
          "Como ganhar pontos/money",
          "Estratégia de nicho",
        ],
      },
      {
        title: "Módulo 6 — API e Integrações",
        topics: [
          "Poe API em Python",
          "Integrando no seu site/app",
          "Cases reais",
        ],
      },
    ],
    tools: ["Poe", "GPT-4", "Claude", "Llama", "Gemini", "FLUX", "Stable Diffusion"],
    bonus: [
      "Pack com 20 bots prontos para clonar",
      "Templates de prompt",
      "Guia de monetização",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — Poe Bots de IA",
    featured: false,
  },
  {
    slug: "ia-empreendedorismo",
    title: "IA + Empreendedorismo: Solo First Framework",
    shortDescription:
      "Torne-se um Empreendedor T-Shaped com IA. Do posicionamento ao primeiro cliente.",
    fullDescription:
      "Curso baseado no Solo First Framework — como se tornar um solo empreendedor de alto impacto usando IA como amplificador. Você vai definir seu Dharma (posicionamento de excelência), construir Soft Assets (capital intelectual, reputacional e social), criar uma oferta irresistível, estabelecer presença digital e fechar seus primeiros clientes. Para quem quer empreender sem queimar caixa.",
    category: "empreendedorismo",
    level: "intermediario",
    price: COURSE_PRICE,
    hours: COURSE_HOURS,
    pricePerHour: PRICE_PER_HOUR,
    icon: "Rocket",
    gradient: "from-amber-500 to-rose-500",
    tags: ["Empreendedorismo", "Solo First", "Posicionamento", "Negócios"],
    targetAudience:
      "Profissionais que querem sair do CLT, freelancers que querem escalar, consultores, especialistas e futuros empreendedores solo.",
    prerequisites: "Experiência profissional em qualquer área.",
    whatYouWillLearn: [
      "Conceito de Empreendedor T-Shaped",
      "Soft Assets: Capital Intelectual, Reputacional e Social",
      "Dharma: como encontrar seu posicionamento de excelência",
      "Oferta: como criar uma proposta irresistível",
      "ICP e Buyer Persona: para quem você vende",
      "Posicionamento digital com IA",
      "Conteúdo que atrai clientes (com IA)",
      "Prospecção e vendas com IA",
      "Gestão financeira solo",
      "Sistemas e IA para operar sozinho",
    ],
    modules: [
      {
        title: "Módulo 1 — O Empreendedor T-Shaped",
        topics: [
          "Haste vertical: Dharma e Soft Assets",
          "Haste horizontal: skills empreendedoras",
          "Por que solo hoje é viável",
        ],
      },
      {
        title: "Módulo 2 — Encontrando seu Dharma",
        topics: [
          "Inventário de Soft Assets",
          "Onde seu conjunto é mais valorizado",
          "Validação de nicho com IA",
        ],
      },
      {
        title: "Módulo 3 — Oferta Irresistível",
        topics: [
          "ICP e Buyer Persona",
          "Estrutura de oferta",
          "Precificação com IA",
        ],
      },
      {
        title: "Módulo 4 — Presença Digital",
        topics: [
          "LinkedIn com IA",
          "Conteúdo que atrai",
          "Calendário editorial automatizado",
        ],
      },
      {
        title: "Módulo 5 — Vendas Solo",
        topics: [
          "Prospecção com IA",
          "Outbound e Inbound",
          "Fechamento",
        ],
      },
      {
        title: "Módulo 6 — Operação e Escala",
        topics: [
          "Sistemas e IA",
          "Finanças solo",
          "Plano 90 dias",
        ],
      },
    ],
    tools: ["ChatGPT", "Claude", "Notion", "LinkedIn", "Calendly", "Stripe", "n8n"],
    bonus: [
      "Template de Business Model Canvas solo",
      "100 prompts de empreendedorismo",
      "Plano 90 dias para sair do CLT",
    ],
    duration: "10 horas (5 encontros de 2h)",
    format: "Online ao vivo via Zoom com gravações disponíveis por 12 meses",
    certificate: "Certificado digital AI School — Solo First Framework",
    featured: true,
  },
];

// Mentoria VIP separada dos cursos
export interface Mentoria {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  minimumHours: number;
  features: string[];
  format: string;
  gradient: string;
  icon: string;
}

export const mentoriaVIP: Mentoria = {
  slug: "mentoria-vip",
  title: "Mentoria VIP Personalizada",
  shortDescription:
    "Mentoria 1-a-1 sob medida. Você define o que quer aprender — IA, Vibe Code, Empreendedorismo — e nós desenhamos um plano só seu.",
  fullDescription:
    "A Mentoria VIP da AI School é diferente de qualquer curso. Não há currículo fixo. Você chega com seu objetivo — seja ele aprender IA para sua profissão específica, construir um produto, automatizar seu negócio ou desenvolver uma estratégia de conteúdo — e nós desenhamos juntos um plano de aprendizado personalizado. Cada sessão é 100% focada no que VOCÊ quer aprender, com tira-dúvidas, acompanhamento de projeto real e mentoria estratégica. Indicado para executivos, fundadores, profissionais liberais e qualquer pessoa que precise de atenção individualizada e resultados rápidos.",
  startingPrice: MENTORIA_VIP_MIN,
  minimumHours: 10,
  features: [
    "Plano de aprendizado personalizado desenhado nas primeiras sessões",
    "Sessões 1-a-1 ao vivo de 1h ou 2h, no seu ritmo",
    "Horários flexíveis — manhã, tarde, noite ou fim de semana",
    "Acompanhamento de projeto real entre sessões",
    "Acesso ao canal direto do mentor no WhatsApp",
    "Material de apoio customizado para seu caso",
    "Revisão de prompts, código, automações",
    "Indicações de ferramentas e stack adequado ao seu caso",
    "Plano de evolução pós-mentoria",
    "Certificado de conclusão personalizado",
  ],
  format: "Online ao vivo via Zoom. Mínimo de 10 horas (R$ 4.500), podendo ser estendido em blocos.",
  gradient: "from-violet-500 via-fuchsia-500 to-amber-500",
  icon: "Crown",
};

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((c) => c.featured);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
  return courses.filter((c) => c.category === category);
}

export const categoryLabels: Record<CourseCategory, string> = {
  fundamentos: "Fundamentos de IA",
  "vibe-code": "Vibe Code & No-Code",
  criatividade: "Criatividade & Conteúdo",
  profissional: "IA Profissional",
  "infanto-juvenil": "Crianças & Adolescentes",
  produtividade: "Produtividade",
  empreendedorismo: "Empreendedorismo",
  mentoria: "Mentoria",
};

export const levelLabels: Record<CourseLevel, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
  infantil: "Infantil",
  vip: "VIP",
};
