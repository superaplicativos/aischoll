/**
 * AI School - Biblioteca compartilhada de Leads
 * Usada por: chatbot.js, checkout-dialog, formulário de matrícula, CRM
 *
 * 100% client-side (GitHub Pages). Leads ficam no localStorage do navegador.
 * Exporte regularmente para backup (CSV/JSON) pelo painel CRM.
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
 *   - importJSON(jsonString) → importa leads de JSON
 *   - getStats() → estatísticas para dashboard
 *   - subscribe(callback) → registra callback para mudanças
 *   - clearAll() → apaga todos os leads
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'aischool_leads_crm_v1';

  // ===== TIPOS DE STATUS =====
  const STATUS = {
    NOVO: 'novo',
    CONTACTADO: 'contactado',
    QUALIFICADO: 'qualificado',
    MATRICULADO: 'matriculado',
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
    AGUARDANDO: 'aguardando',
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

  function clearAll() {
    saveLeads([]);
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

  function importJSON(jsonString) {
    try {
      const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (!Array.isArray(data)) throw new Error('Formato inválido. Esperado um array de leads.');
      const existing = loadLeads();
      let added = 0;
      let updated = 0;
      data.forEach(remote => {
        const wa = normalizeWhatsApp(remote.whatsapp);
        const existingLead = existing.find(l => normalizeWhatsApp(l.whatsapp) === wa && wa);
        if (existingLead) {
          Object.assign(existingLead, remote, { id: existingLead.id, updated_at: now() });
          updated++;
        } else {
          existing.push({
            ...remote,
            id: remote.id || generateId(remote),
            created_at: remote.created_at || now(),
            updated_at: now(),
          });
          added++;
        }
      });
      saveLeads(existing);
      return { ok: true, added, updated, total: existing.length };
    } catch (err) {
      return { ok: false, error: err.message };
    }
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
      stats.by_status[l.status] = (stats.by_status[l.status] || 0) + 1;
      stats.by_source[l.source] = (stats.by_source[l.source] || 0) + 1;
      stats.by_payment[l.payment_status] = (stats.by_payment[l.payment_status] || 0) + 1;
      (l.course_interest || []).forEach(c => {
        stats.by_course[c] = (stats.by_course[c] || 0) + 1;
      });
      if (l.payment_status === PAYMENT_STATUS.PAGO) {
        stats.revenue += l.payment_amount || 0;
      }
      if (l.status === STATUS.MATRICULADO && l.payment_status !== PAYMENT_STATUS.PAGO) {
        stats.pending_payment++;
      }
      const created = new Date(l.created_at);
      if (created >= today) stats.new_today++;
      if (created >= weekAgo) stats.new_this_week++;
    });

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
    clearAll,
    // Export/Import
    exportCSV,
    exportJSON,
    importJSON,
    toCSV,
    // Stats
    getStats,
    // Subscribe
    subscribe,
  };
})();
