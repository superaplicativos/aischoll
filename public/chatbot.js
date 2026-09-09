/**
 * AI School - Aria (SDR Senior Chatbot)
 * v5.0 - RAG local (sem dependência externa, sem CORS)
 *
 * Funcionamento:
 * - Usa RAG local (rag.js) com knowledge base completa
 * - Resposta imediata, sem latência
 * - 100% confiável, sem pausas nem erros de rede
 *
 * Recursos:
 * - Botão flutuante com animação
 * - Captação de lead (nome + WhatsApp) no início
 * - Respostas consultivas via RAG (cursos, preços, conceitos)
 * - Detecção de intenção de matrícula (direciona pro checkout)
 * - Salva lead no CRM automaticamente
 * - Persistência de sessão
 */
(function () {
  'use strict';

  const CONFIG = {
    whatsappSchool: '55119666161611',
    appName: 'AI School',
    storageKey: 'aischool_leads_v3',
    sessionKey: 'aischool_session_v3',
    primaryColor: '#7c3aed',
    botName: 'Aria',
  };

  // ===== PROXY CONFIG =====
  // Lê a URL do Cloudflare Worker de config.json (arquivo público no site)
  // Se existir, o bot usa a IA real do DeepSeek via proxy (sem CORS)
  // Se não existir, usa o RAG local (knowledge base embutida)
  let WORKER_URL = '';
  async function loadWorkerUrl() {
    try {
      const base = window.location.pathname.replace(/\/+$/, '');
      const paths = [base + '/config.json', './config.json', '/config.json'];
      for (const p of paths) {
        try {
          const r = await fetch(p);
          if (r.ok) {
            const data = await r.json();
            if (data.worker_url) {
              WORKER_URL = data.worker_url;
              console.log('[Aria] Worker URL carregado:', WORKER_URL);
              return;
            }
          }
        } catch (e) {}
      }
    } catch (e) {}
    console.log('[Aria] Sem Worker URL configurado. Usando RAG local.');
  }

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

  function trackInterest(slug) {
    if (slug && !state.lead.course_interest.includes(slug)) {
      state.lead.course_interest.push(slug);
      saveSession();
      if (state.lead.name && state.lead.whatsapp) saveLead();
    }
  }

  // ===== STYLES =====
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
    // Latência natural curta (sem API externa = resposta rápida)
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
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
      botSay(`Oi, ${state.lead.name}! Bem-vindo de volta à AI School. Como posso te ajudar hoje?`, {
        quick: ['Quero ver cursos', 'Tirar dúvida', 'Quero matricular', 'Falar com humano']
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
        quick: ['O que é IA?', 'Quero ver cursos', 'Quero programar', 'Quero aprender design', 'Quero Mentoria VIP']
      });
      return;
    }

    await handleChat(text);
  }

  async function handleChat(text) {
    // 1. PEDIDO DE HUMANO
    if (window.AISchoolRAG && AISchoolRAG.isHumanRequest(text)) {
      await botSay('Claro! Posso te redirecionar pro WhatsApp da escola. Lá você fala direto com nosso time. 👇', {
        cta: { label: '📱 Abrir WhatsApp da escola', handler: sendLeadToWhatsApp }
      });
      return;
    }

    // 2. INTENÇÃO DE MATRÍCULA
    if (window.AISchoolRAG && AISchoolRAG.isEnrollmentIntent(text)) {
      const course = (window.AISchoolRAG && AISchoolRAG.findCourse(text)) || state.suggestedCourse;
      if (course) {
        trackInterest(course.slug);
        const precoStr = course.preco === 4500
          ? 'R$4.500 (10h online) ou R$5.000 (presencial)'
          : course.preco === 12000
          ? 'R$12.000 (3 módulos de 10h)'
          : 'R$4.000 (10h online) ou R$4.500 (presencial)';
        await botSay(`Boa, ${state.lead.name}! 🚀 Vou te levar direto pro checkout de ${course.titulo}.\n\nValor: ${precoStr}\nPagamento: PIX, boleto 2x sem juros ou cartão em até 12x (juros da operadora).`, {
          cta: { label: '🚀 Ir para o checkout', handler: () => redirectToCheckout(course.slug) },
          quick: ['Tirar dúvida antes', 'Ver outros cursos', 'Falar com humano']
        });
        return;
      }
      await botSay('Boa! Qual curso você quer fazer? Se não souber, me conta o que você quer aprender que eu te indico.', {
        quick: ['Quero ver cursos', 'Quero Mentoria VIP', 'Tirar dúvida']
      });
      return;
    }

    // 3. PEDIDO DE EXPLICAÇÃO DE CURSO
    if (window.AISchoolRAG && AISchoolRAG.isCourseDetailRequest(text)) {
      const course = (window.AISchoolRAG && AISchoolRAG.findCourse(text)) || state.suggestedCourse;
      if (course) {
        trackInterest(course.slug);
        await botSay(formatCourseDetails(course, state.lead.name), {
          quick: ['Quero matricular', 'Como funciona o pagamento?', 'Tem horários diferentes?', 'Ver outros cursos']
        });
        return;
      }
    }

    // 4. PEDIDO DE LISTA DE CURSOS
    if (window.AISchoolRAG && AISchoolRAG.isListRequest(text)) {
      const listText = AISchoolRAG.listCoursesByArea();
      await botSay(listText, {
        quick: ['IA', 'Programação', 'Design', 'Marketing', 'Negócios', 'Mentoria VIP']
      });
      return;
    }

    // 5. WORKER PROXY (se configurado) - usa IA real do DeepSeek
    if (WORKER_URL) {
      showTyping();
      try {
        const systemPrompt = buildSystemPrompt();
        const messages = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ];
        const response = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'deepseek-chat', messages: messages, max_tokens: 800, temperature: 0.7 }),
        });
        if (response.ok) {
          const data = await response.json();
          const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
          if (reply && reply.trim()) {
            hideTyping();
            addMessage(reply.trim(), 'bot');
            // Detecta curso na resposta do bot pra sugerir CTA
            const course = (window.AISchoolRAG && AISchoolRAG.findCourse(text)) || state.suggestedCourse;
            if (course) {
              state.suggestedCourse = course;
              trackInterest(course.slug);
              showCTA('🚀 Quero matricular', () => redirectToCheckout(course.slug));
            }
            showQuick(course ? ['Ver outros cursos', 'Tirar outra dúvida', 'Falar com humano'] : ['Quero ver cursos', 'Tirar outra dúvida', 'Falar com humano']);
            return;
          }
        }
        // Se falhou, cai pro RAG local
        console.warn('[Aria] Worker falhou, usando RAG local');
      } catch (err) {
        console.warn('[Aria] Worker erro:', err);
      }
      hideTyping();
    }

    // 6. RAG: usar knowledge base pra responder
    if (window.AISchoolRAG) {
      const course = AISchoolRAG.findCourse(text);
      if (course) {
        state.suggestedCourse = course;
        trackInterest(course.slug);
      }

      const reply = AISchoolRAG.generateResponse(text, state.lead.name, state.lead.course_interest);
      await botSay(reply, {
        quick: state.suggestedCourse
          ? ['Quero matricular', 'O que vou aprender?', 'Ver outros cursos', 'Falar com humano']
          : ['Quero ver cursos', 'O que é IA?', 'Quero Mentoria VIP', 'Falar com humano']
      });

      // Se um curso foi identificado, oferece CTA de matrícula
      if (state.suggestedCourse) {
        showCTA('🚀 Quero matricular', () => redirectToCheckout(state.suggestedCourse.slug));
      }
      return;
    }

    // 6. FALLBACK (sem RAG carregado)
    await botSay(`Posso te ajudar com várias coisas, ${state.lead.name}. O que você quer saber?`, {
      quick: ['Quero ver cursos', 'Tirar dúvida', 'Falar com humano']
    });
  }

  // ===== SYSTEM PROMPT PARA IA =====
  function buildSystemPrompt() {
    let catalogoResumido = '';
    if (window.AISchoolRAG && AISchoolRAG.CURSOS) {
      catalogoResumido = AISchoolRAG.CURSOS.map(c =>
        `- ${c.titulo} | R$${c.preco.toLocaleString('pt-BR')} | ${c.duracao} | ${c.modalidades ? c.modalidades.join('/') : 'online'} | Para: ${c.publico} | Professor: ${c.professor || 'não definido'}`
      ).join('\n');
    }

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
${catalogoResumido || 'Catálogo não disponível. Pergunte sobre cursos específicos.'}

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

  function formatCourseDetails(course, nome) {
    const oque = (course.oque_aprende || []).map(o => '• ' + o).join('\n');
    const ferramentas = (course.ferramentas || []).join(', ');
    const precoStr = course.preco === 4500
      ? 'R$4.500 (10h online) / R$5.000 (presencial)'
      : course.preco === 12000
      ? 'R$12.000 (3 módulos de 10h, R$4.000/módulo)'
      : 'R$4.000 (10h online) / R$4.500 (presencial)';

    return `EMENTA: ${course.titulo}\n\nO QUE VOCÊ VAI APRENDER:\n${oque}\n\nFERRAMENTAS: ${ferramentas}\nPROFESSOR: ${course.professor}\nDURAÇÃO: ${course.duracao}\nINVESTIMENTO: ${precoStr}\n\nQuer matricular${nome ? ', ' + nome : ''}?`;
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    handleUserInput(text);
  }

  // ===== INIT =====
  function init() {
    injectStyles();
    loadWorkerUrl(); // Carrega Worker URL (se existir config.json)
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
