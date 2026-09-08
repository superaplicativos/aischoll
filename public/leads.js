/**
 * AI School - Biblioteca compartilhada de Leads
 * Usada por: chatbot.js, checkout-dialog, formulário de matrícula, CRM
 *
 * Funciona 100% client-side (GitHub Pages):
 * - Salva todos os leads em localStorage (chave: aischool_leads_crm)
 * - Sincroniza com Google Sheets (best-effort, se URL configurada)
 * - Formato padronizado para todas as fontes
 *
 * API pública (window.AISchoolLeads):
 *   - addLead(partial) → cria/atualiza lead, retorna ID
 *   - getLead(id) → retorna lead por ID
 *   - getLeadByWhatsApp(whatsapp) → retorna lead por WhatsApp
 *   - getAllLeads() → todos os leads
 *   - updateLead(id, partial) → atualiza campos
 *   - addNote(id, text) → adiciona nota
 *   - addConversationMessage(id, msg) → adiciona msg na conversa
 *   - setStatus(id, status) → muda status
 *   - setPaymentStatus(id, status, amount, method) → registra pagamento
 *   - deleteLead(id) → remove lead
 *   - exportCSV() → download CSV
 *   - exportJSON() → download JSON
 *   - syncFromGoogleSheets() → tenta buscar da planilha
 *   - subscribe(callback) → registra callback para mudanças
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'aischool_leads_crm_v1';
  const SHEETS_KEY = 'aischool_sheets_url';
  const DEFAULT_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyivl0Vkeks75M3sbxXIXCKmHyPkSvECgP5K1ds-D1MC8F5z5H_ZDYf4jpqlILCYI9Y/exec';

  // ===== TIPOS DE STATUS =====
  const STATUS = {
    NOVO: 'novo',
    CONTACTADO: 'contactado',
    QUALIFICADO: 'qualificado',
    MATRICULADO: 'matriculado',  // preencheu form ou clicou em matricular
    PAGO: 'pago',
    PERDIDO: 'perdido',
  };

  const STATUS_LABELS = {
    novo: 'Novo',
    contactado: 'Contactado',
    qualificado: 'Qualificado',
    matriculado: 'Matriculado (não pago)',
    pago: 'Pago',
    perdido: 'Perdido',
  };

  const STATUS_COLORS = {
    novo: '#3b82f6',
    contactado: '#a78bfa',
    qualificado: '#f59e0b',
    matriculado: '#ec4899',
    pago: '#10b981',
    perdido: '#ef4444',
  };

  const PAYMENT_STATUS = {
    NAO_PAGO: 'nao_pago',
    AGUARDANDO: 'aguardando',  // gerou PIX mas não confirmou
    PAGO: 'pago',
    ESTORNADO: 'estornado',
  };

  const PAYMENT_STATUS_LABELS = {
    nao_pago: 'Não pagou',
    aguardando: 'Aguardando pagamento',
    pago: 'Pago',
    estornado: 'Estornado',
  };

  const SOURCE_LABELS = {
    chatbot: 'Chatbot (Aria)',
    form: 'Formulário de matrícula',
    checkout: 'Tentativa de checkout',
    manual: 'Adição manual',
    import: 'Importação',
  };

  // ===== STORAGE =====
  function loadLeads() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveLeads(leads) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      notifySubscribers();
      return true;
    } catch (e) {
      console.error('[AISchoolLeads] Erro ao salvar:', e);
      return false;
    }
  }

  // ===== SUBSCRIBERS (para atualizar UI em tempo real) =====
  const subscribers = new Set();
  function notifySubscribers() {
    subscribers.forEach(fn => {
      try { fn(); } catch (e) {}
    });
  }

  // ===== UTILS =====
  function normalizeWhatsApp(whatsapp) {
    return (whatsapp || '').toString().replace(/\D/g, '');
  }

  function generateId(lead) {
    const base = normalizeWhatsApp(lead.whatsapp) || lead.email || (lead.name || '').toLowerCase().replace(/\s/g, '');
    return 'lead_' + (base || Date.now()) + '_' + Math.random().toString(36).substring(2, 8);
  }

  function now() {
    return new Date().toISOString();
  }

  // ===== API PRINCIPAL =====
  function addLead(partial) {
    if (!partial || (!partial.name && !partial.whatsapp && !partial.email)) {
      console.warn('[AISchoolLeads] Lead sem identificação suficiente');
      return null;
    }

    const leads = loadLeads();
    const wa = normalizeWhatsApp(partial.whatsapp);

    // Procura lead existente por WhatsApp ou email
    let existing = null;
    if (wa) {
      existing = leads.find(l => normalizeWhatsApp(l.whatsapp) === wa);
    }
    if (!existing && partial.email) {
      existing = leads.find(l => (l.email || '').toLowerCase() === partial.email.toLowerCase());
    }

    if (existing) {
      // Merge: atualiza campos, mantém status se já existir
      const updated = {
        ...existing,
        ...partial,
        whatsapp: partial.whatsapp || existing.whatsapp,
        email: partial.email || existing.email,
        name: partial.name || existing.name,
        course_interest: Array.from(new Set([
          ...(existing.course_interest || []),
          ...(partial.course_interest || []),
        ])),
        conversation: [
          ...(existing.conversation || []),
          ...(partial.conversation || []),
        ],
        notes: [
          ...(existing.notes || []),
          ...(partial.notes || []),
        ],
        status: partial.status || existing.status,
        updated_at: now(),
        last_contact: now(),
      };
      const idx = leads.findIndex(l => l.id === existing.id);
      leads[idx] = updated;
      saveLeads(leads);
      syncToGoogleSheets(updated);
      return updated.id;
    }

    // Novo lead
    const newLead = {
      id: generateId(partial),
      name: partial.name || '',
      whatsapp: wa,
      email: partial.email || '',
      source: partial.source || 'manual',
      course_interest: partial.course_interest || [],
      modalidade: partial.modalidade || null,
      status: partial.status || STATUS.NOVO,
      payment_status: partial.payment_status || PAYMENT_STATUS.NAO_PAGO,
      payment_amount: partial.payment_amount || 0,
      payment_method: partial.payment_method || null,
      payment_date: partial.payment_date || null,
      payment_txid: partial.payment_txid || null,
      conversation: partial.conversation || [],
      notes: partial.notes || [],
      created_at: partial.created_at || now(),
      updated_at: now(),
      last_contact: now(),
      metadata: partial.metadata || {},
    };
    leads.push(newLead);
    saveLeads(leads);
    syncToGoogleSheets(newLead);
    return newLead.id;
  }

  function getLead(id) {
    return loadLeads().find(l => l.id === id);
  }

  function getLeadByWhatsApp(whatsapp) {
    const wa = normalizeWhatsApp(whatsapp);
    return loadLeads().find(l => normalizeWhatsApp(l.whatsapp) === wa);
  }

  function getAllLeads() {
    return loadLeads().sort((a, b) =>
      new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
    );
  }

  function updateLead(id, partial) {
    const leads = loadLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return false;
    leads[idx] = {
      ...leads[idx],
      ...partial,
      course_interest: partial.course_interest
        ? Array.from(new Set([...(leads[idx].course_interest || []), ...partial.course_interest]))
        : leads[idx].course_interest,
      updated_at: now(),
    };
    saveLeads(leads);
    syncToGoogleSheets(leads[idx]);
    return true;
  }

  function addNote(id, text) {
    if (!text || !text.trim()) return false;
    const leads = loadLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return false;
    leads[idx].notes = leads[idx].notes || [];
    leads[idx].notes.push({
      text: text.trim(),
      timestamp: now(),
      author: 'manual',
    });
    leads[idx].updated_at = now();
    saveLeads(leads);
    return true;
  }

  function addConversationMessage(id, msg) {
    const leads = loadLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return false;
    leads[idx].conversation = leads[idx].conversation || [];
    leads[idx].conversation.push({
      from: msg.from || 'user',
      text: msg.text || '',
      timestamp: msg.timestamp || Date.now(),
    });
    leads[idx].updated_at = now();
    leads[idx].last_contact = now();
    saveLeads(leads);
    return true;
  }

  function setStatus(id, status) {
    return updateLead(id, { status });
  }

  function setPaymentStatus(id, paymentStatus, amount, method, txid) {
    const update = {
      payment_status: paymentStatus,
    };
    if (amount !== undefined) update.payment_amount = amount;
    if (method !== undefined) update.payment_method = method;
    if (txid !== undefined) update.payment_txid = txid;
    if (paymentStatus === PAYMENT_STATUS.PAGO) {
      update.payment_date = now();
      update.status = STATUS.PAGO;
    }
    return updateLead(id, update);
  }

  function deleteLead(id) {
    const leads = loadLeads();
    const filtered = leads.filter(l => l.id !== id);
    if (filtered.length === leads.length) return false;
    saveLeads(filtered);
    return true;
  }

  // ===== EXPORT =====
  function toCSV(leads) {
    const headers = [
      'ID', 'Nome', 'WhatsApp', 'Email', 'Origem', 'Status',
      'Cursos_Interesse', 'Modalidade', 'Pagamento_Status',
      'Valor_Pago', 'Metodo_Pagamento', 'Data_Pagamento',
      'Total_Mensagens', 'Total_Notas', 'Criado_Em', 'Atualizado_Em',
      'Ultimo_Contato'
    ];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.whatsapp,
      l.email,
      SOURCE_LABELS[l.source] || l.source,
      STATUS_LABELS[l.status] || l.status,
      (l.course_interest || []).join('; '),
      l.modalidade || '',
      PAYMENT_STATUS_LABELS[l.payment_status] || l.payment_status,
      l.payment_amount || 0,
      l.payment_method || '',
      l.payment_date || '',
      (l.conversation || []).length,
      (l.notes || []).length,
      l.created_at,
      l.updated_at,
      l.last_contact,
    ]);
    const all = [headers, ...rows];
    return all.map(row =>
      row.map(cell => {
        const s = String(cell || '');
        if (s.includes(',') || s.includes('"') || s.includes('\n')) {
          return '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
      }).join(',')
    ).join('\n');
  }

  function exportCSV() {
    const leads = getAllLeads();
    const csv = toCSV(leads);
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_school_leads_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function exportJSON() {
    const leads = getAllLeads();
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_school_leads_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ===== GOOGLE SHEETS SYNC =====
  function getSheetsUrl() {
    return localStorage.getItem(SHEETS_KEY) || DEFAULT_SHEETS_URL;
  }

  function setSheetsUrl(url) {
    localStorage.setItem(SHEETS_KEY, url);
  }

  let sheetsSyncQueue = [];
  let lastSync = 0;

  function syncToGoogleSheets(lead) {
    const url = getSheetsUrl();
    if (!url || !lead) return Promise.resolve(false);
    // Throttle 5s
    if (Date.now() - lastSync < 5000) {
      sheetsSyncQueue.push(lead);
      return Promise.resolve(false);
    }
    lastSync = Date.now();

    const payload = {
      id: lead.id,
      timestamp: now(),
      name: lead.name,
      whatsapp: lead.whatsapp,
      email: lead.email,
      source: lead.source,
      status: lead.status,
      payment_status: lead.payment_status,
      payment_amount: lead.payment_amount,
      payment_method: lead.payment_method,
      payment_date: lead.payment_date,
      course_interest: lead.course_interest,
      modalidade: lead.modalidade,
      messageCount: (lead.conversation || []).length,
      lastMessages: (lead.conversation || []).slice(-5).map(m => ({
        from: m.from, text: m.text, time: new Date(m.timestamp).toISOString()
      })),
      notes: lead.notes,
      metadata: lead.metadata,
    };

    return fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    }).then(() => {
      console.log('[AISchoolLeads] Sincronizado com Google Sheets:', lead.name);
      return true;
    }).catch((err) => {
      console.warn('[AISchoolLeads] Falha ao sincronizar (será retentado):', err);
      sheetsSyncQueue.push(lead);
      return false;
    });
  }

  // Retry queue a cada 60s
  setInterval(() => {
    if (sheetsSyncQueue.length === 0) return;
    const queue = sheetsSyncQueue.slice();
    sheetsSyncQueue = [];
    queue.forEach(lead => syncToGoogleSheets(lead));
  }, 60000);

  function syncFromGoogleSheets() {
    const url = getSheetsUrl();
    if (!url) return Promise.resolve({ ok: false, error: 'URL não configurada' });

    return fetch(url + '?acao=listarjson', { method: 'GET' })
      .then(r => r.json())
      .then(remoteLeads => {
        if (!Array.isArray(remoteLeads)) {
          return { ok: false, error: 'Resposta inválida da planilha' };
        }
        // Faz merge: para cada lead remoto, se não existe local, adiciona
        const localLeads = loadLeads();
        let added = 0;
        remoteLeads.forEach(remote => {
          const wa = normalizeWhatsApp(remote.whatsapp);
          const existing = localLeads.find(l => normalizeWhatsApp(l.whatsapp) === wa);
          if (!existing && wa) {
            localLeads.push({
              id: 'lead_sheets_' + wa,
              name: remote.name || '',
              whatsapp: wa,
              email: remote.email || '',
              source: 'import',
              course_interest: remote.course_interest || [],
              status: remote.status || STATUS.NOVO,
              payment_status: remote.payment_status || PAYMENT_STATUS.NAO_PAGO,
              payment_amount: remote.payment_amount || 0,
              payment_method: remote.payment_method || null,
              payment_date: remote.payment_date || null,
              conversation: [],
              notes: [],
              created_at: remote.timestamp || remote.data || now(),
              updated_at: now(),
              last_contact: remote.timestamp || remote.data || now(),
            });
            added++;
          }
        });
        saveLeads(localLeads);
        return { ok: true, added, total: remoteLeads.length };
      })
      .catch(err => ({ ok: false, error: err.message }));
  }

  // ===== STATS =====
  function getStats() {
    const leads = getAllLeads();
    const stats = {
      total: leads.length,
      by_status: {},
      by_source: {},
      by_payment: {},
      by_course: {},
      conversion_rate: 0,
      revenue: 0,
      pending_payment: 0,
      new_today: 0,
      new_this_week: 0,
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    leads.forEach(l => {
      // by status
      stats.by_status[l.status] = (stats.by_status[l.status] || 0) + 1;
      // by source
      stats.by_source[l.source] = (stats.by_source[l.source] || 0) + 1;
      // by payment
      stats.by_payment[l.payment_status] = (stats.by_payment[l.payment_status] || 0) + 1;
      // by course
      (l.course_interest || []).forEach(c => {
        stats.by_course[c] = (stats.by_course[c] || 0) + 1;
      });
      // revenue
      if (l.payment_status === PAYMENT_STATUS.PAGO) {
        stats.revenue += l.payment_amount || 0;
      }
      // pending payment
      if (l.status === STATUS.MATRICULADO && l.payment_status !== PAYMENT_STATUS.PAGO) {
        stats.pending_payment++;
      }
      // created today/this week
      const created = new Date(l.created_at);
      if (created >= today) stats.new_today++;
      if (created >= weekAgo) stats.new_this_week++;
    });

    // conversion rate
    const paid = stats.by_status[STATUS.PAGO] || 0;
    stats.conversion_rate = stats.total > 0 ? Math.round((paid / stats.total) * 100) : 0;

    return stats;
  }

  // ===== SUBSCRIBE =====
  function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }

  // ===== EXPOSE API =====
  window.AISchoolLeads = {
    STATUS,
    STATUS_LABELS,
    STATUS_COLORS,
    PAYMENT_STATUS,
    PAYMENT_STATUS_LABELS,
    SOURCE_LABELS,
    // CRUD
    addLead,
    getLead,
    getLeadByWhatsApp,
    getAllLeads,
    updateLead,
    addNote,
    addConversationMessage,
    setStatus,
    setPaymentStatus,
    deleteLead,
    // Export
    exportCSV,
    exportJSON,
    toCSV,
    // Google Sheets
    syncFromGoogleSheets,
    setSheetsUrl,
    getSheetsUrl,
    // Stats
    getStats,
    // Subscribe
    subscribe,
  };
})();
