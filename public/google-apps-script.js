/**
 * AI School - Google Apps Script para capturar leads do chatbot
 * e exibir em uma planilha + página web visualizável
 *
 * COMO INSTALAR (PASSO A PASSO):
 *
 * 1. Acesse https://sheets.google.com e crie uma planilha NOVA
 * 2. Renomeie a planilha para "AI School - Leads" (ou outro nome)
 * 3. Na planilha, clique em: Extensões → Apps Script
 * 4. Apague TODO o código que aparecer no editor
 * 5. Cole TODO o código deste arquivo no editor
 * 6. Clique em SALVAR (ícone de disquete) ou Ctrl+S
 *    - Dê um nome ao projeto: "AI School Chatbot"
 * 7. Clique em IMPLANTAR → Nova implantação
 * 8. Clique no ícone de engrenagem → selecionar tipo: "App da Web"
 * 9. Preencher:
 *    - Descrição: "Chatbot Leads v1"
 *    - Executar como: "Eu (seu-email@gmail.com)"
 *    - Quem pode acessar: "Qualquer pessoa" (IMPORTANTE!)
 * 10. Clique em IMPLANTAR
 * 11. Vai pedir AUTORIZAÇÃO - clique em "Permitir"
 * 12. Vai aparecer a URL do App da Web (termina em /exec)
 * 13. Copie essa URL - é ela que vai no chatbot.js
 *
 * APOS INSTALAR:
 * - Os leads vão aparecer automaticamente na aba "Leads" da planilha
 * - Para ver os leads em formato web, acesse:
 *   sua-url-do-app/exec?acao=listar
 * - Ex: https://script.google.com/macros/s/AKfyc.../exec?acao=listar
 *
 * COLUNAS DA PLANILHA (criadas automaticamente):
 * - DataHora, Nome, WhatsApp, Cursos_Interesse, Total_Mensagens,
 *   Origem, Modalidade (online/presencial), Tipo (sync/final),
 *   Valor, Conversa_Resumo
 */

var SHEET_NAME = 'Leads';

var HEADERS = [
  'DataHora',
  'Nome',
  'WhatsApp',
  'Cursos_Interesse',
  'Total_Mensagens',
  'Origem',
  'Modalidade',
  'Tipo',
  'Valor',
  'Conversa_Resumo'
];

function doGet(e) {
  var acao = (e && e.parameter && e.parameter.acao) || 'status';

  if (acao === 'status') {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'AI School Chatbot - Apps Script rodando',
      timestamp: new Date().toISOString(),
      planilha: SpreadsheetApp.getActiveSpreadsheet().getName()
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (acao === 'listar') {
    return listarLeadsHTML();
  }

  if (acao === 'listarjson') {
    return listarLeadsJSON();
  }

  return ContentService.createTextOutput('Use ?acao=status, ?acao=listar ou ?acao=listarjson');
}

function doPost(e) {
  try {
    var payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Cria a aba se não existir
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#7C3AED').setFontColor('#FFFFFF').setFontWeight('bold');
      sheet.setFrozenRows(1);
      // Define largura das colunas
      sheet.setColumnWidth(1, 20);  // DataHora
      sheet.setColumnWidth(2, 25);  // Nome
      sheet.setColumnWidth(3, 20);  // WhatsApp
      sheet.setColumnWidth(4, 30); // Cursos_Interesse
      sheet.setColumnWidth(5, 15); // Total_Mensagens
      sheet.setColumnWidth(6, 25); // Origem
      sheet.setColumnWidth(7, 15); // Modalidade
      sheet.setColumnWidth(8, 18); // Tipo
      sheet.setColumnWidth(9, 15); // Valor
      sheet.setColumnWidth(10, 80); // Conversa_Resumo
    }

    // Detecta tipo
    var tipo = 'sync_inicial';
    if (payload.force && payload.final) tipo = 'envio_final';
    else if (payload.force) tipo = 'atualizacao';
    else if (payload.course_interest && payload.course_interest.length > 0) tipo = 'interesse_detectado';

    // Modalidade (online/presencial)
    var modalidade = payload.modalidade || 'nao_informado';

    // Valor (se informado)
    var valor = payload.valor || '';

    // Resumo da conversa
    var resumo = '';
    var messages = payload.lastMessages || payload.fullConversation || [];
    if (messages && messages.length > 0) {
      resumo = messages.map(function(m) {
        var sender = m.from === 'bot' ? 'ARIA' : (payload.name || 'LEAD').toUpperCase();
        var time = m.time ? ' (' + new Date(m.time).toLocaleString('pt-BR') + ')' : '';
        return '[' + sender + time + '] ' + m.text;
      }).join('\n');
    }

    var row = [
      new Date(),
      payload.name || '',
      payload.whatsapp || '',
      (payload.course_interest && payload.course_interest.length > 0) ? payload.course_interest.join(', ') : '',
      payload.messageCount || 0,
      payload.source || '',
      modalidade,
      tipo,
      valor,
      resumo
    ];

    sheet.appendRow(row);

    // Log do evento no Planilha
    Logger.log('Lead salvo: ' + payload.name + ' / ' + payload.whatsapp);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Lead salvo',
      row: sheet.getLastRow(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('ERRO: ' + err.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Lista leads em formato HTML visualizável no navegador
 */
function listarLeadsHTML() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  var leads = [];
  if (sheet && sheet.getLastRow() > 1) {
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues();
    leads = data.reverse().map(function(row) {
      return {
        data: new Date(row[0]).toLocaleString('pt-BR'),
        nome: row[1],
        whatsapp: row[2],
        interesse: row[3],
        mensagens: row[4],
        origem: row[5],
        modalidade: row[6],
        tipo: row[7],
        valor: row[8],
        conversa: row[9]
      };
    });
  }

  var html = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">';
  html += '<title>AI School - Leads Capturados</title>';
  html += '<style>';
  html += 'body{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;background:#0a0a14;color:#f4f4fb;padding:20px;margin:0}';
  html += 'h1{color:#a78bfa;font-size:28px;margin-bottom:8px}';
  html += '.count{color:#10b981;font-weight:bold;font-size:18px;margin-bottom:20px}';
  html += '.lead{background:#15151f;border:1px solid rgba(124,58,237,0.3);border-radius:12px;padding:16px;margin-bottom:12px}';
  html += '.lead-header{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:8px}';
  html += '.lead-name{font-size:18px;font-weight:bold;color:#a78bfa}';
  html += '.lead-wa{font-size:14px;color:#10b981;font-family:monospace}';
  html += '.lead-meta{font-size:12px;color:#a4a4b8;margin-bottom:8px}';
  html += '.lead-badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;margin-right:4px}';
  html += '.badge-online{background:rgba(124,58,237,0.2);color:#a78bfa;border:1px solid rgba(124,58,237,0.3)}';
  html += '.badge-presencial{background:rgba(245,158,11,0.2);color:#fcd34d;border:1px solid rgba(245,158,11,0.3)}';
  html += '.badge-tipo{background:rgba(16,185,129,0.2);color:#6ee7b7;border:1px solid rgba(16,185,129,0.3)}';
  html += '.lead-conversa{background:#0e0e16;border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:10px;font-size:12px;color:#d1d5db;white-space:pre-wrap;max-height:200px;overflow-y:auto;margin-top:8px;font-family:monospace}';
  html += '.empty{text-align:center;padding:60px 20px;color:#6b7280}';
  html += 'a{color:#a78bfa}';
  html += '.refresh{background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:14px;text-decoration:none;display:inline-block;margin-bottom:20px}';
  html += '</style></head><body>';
  html += '<h1>🤖 AI School - Leads do Chatbot</h1>';
  html += '<div class="count">' + leads.length + ' leads capturados</div>';
  html += '<a href="?acao=listar" class="refresh">🔄 Atualizar</a>';
  html += '<a href="?acao=listarjson" class="refresh" style="background:#10b981">📋 JSON</a>';

  if (leads.length === 0) {
    html += '<div class="empty"><h2>Nenhum lead capturado ainda</h2><p>Quando alguém conversar com a Aria no site, vai aparecer aqui automaticamente.</p></div>';
  } else {
    leads.forEach(function(l) {
      html += '<div class="lead">';
      html += '<div class="lead-header">';
      html += '<div><div class="lead-name">' + escapeHtml(l.nome) + '</div>';
      html += '<div class="lead-wa">📱 ' + escapeHtml(l.whatsapp) + '</div></div>';
      html += '<div class="lead-meta">' + escapeHtml(l.data) + '</div>';
      html += '</div>';
      html += '<div class="lead-meta">';
      if (l.modalidade && l.modalidade !== 'nao_informado') {
        html += '<span class="lead-badge ' + (l.modalidade === 'online' ? 'badge-online' : 'badge-presencial') + '">' + l.modalidade + '</span>';
      }
      if (l.tipo) {
        html += '<span class="lead-badge badge-tipo">' + escapeHtml(l.tipo) + '</span>';
      }
      if (l.interesse) {
        html += '🎯 Interesses: <strong>' + escapeHtml(l.interesse) + '</strong>';
      }
      if (l.valor) {
        html += ' · 💰 ' + escapeHtml(String(l.valor));
      }
      html += '</div>';
      if (l.conversa) {
        html += '<div class="lead-conversa">' + escapeHtml(l.conversa) + '</div>';
      }
      html += '</div>';
    });
  }

  html += '</body></html>';
  return ContentService.createTextOutput(html).setMimeType(ContentService.MimeType.HTML);
}

/**
 * Lista leads em formato JSON (para integrações)
 */
function listarLeadsJSON() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  var leads = [];
  if (sheet && sheet.getLastRow() > 1) {
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues();
    leads = data.map(function(row) {
      return {
        data: new Date(row[0]).toISOString(),
        nome: row[1],
        whatsapp: row[2],
        interesse: row[3] ? row[3].split(', ') : [],
        mensagens: row[4],
        origem: row[5],
        modalidade: row[6],
        tipo: row[7],
        valor: row[8],
        conversa: row[9]
      };
    });
  }
  return ContentService.createTextOutput(JSON.stringify(leads)).setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Teste manual - rode no editor pra ver se está funcionando
 */
function testarInsercao() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'TESTE MANUAL',
        whatsapp: '11999999999',
        course_interest: ['ia-iniciante'],
        messageCount: 3,
        lastMessages: [
          { from: 'bot', text: 'Olá! Qual seu nome?', time: new Date().toISOString() },
          { from: 'user', text: 'TESTE MANUAL', time: new Date().toISOString() },
          { from: 'bot', text: 'Prazer! Qual seu WhatsApp?', time: new Date().toISOString() }
        ],
        source: '/teste',
        modalidade: 'online',
        valor: 4000,
        force: true,
        final: true
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
