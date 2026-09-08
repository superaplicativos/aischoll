/**
 * AI School - Google Apps Script para receber leads do chatbot
 * e salvar automaticamente no Google Sheets.
 *
 * COMO INSTALAR:
 * 1. Abra https://sheets.google.com e crie uma planilha nova
 * 2. Na planilha, clique em Extensões → Apps Script
 * 3. Apague todo o código que aparecer e cole este código inteiro
 * 4. Clique em "Salvar" (ícone de disquete)
 * 5. Clique em "Implantar" → "Nova implantação"
 * 6. Tipo: "App da Web"
 * 7. Executar como: "Eu (seu email)"
 * 8. Quem pode acessar: "Qualquer pessoa"
 * 9. Clique em "Implantar"
 * 10. Autorize as permissões quando pedir
 * 11. Copie a URL gerada (termina em /exec)
 * 12. Cole a URL no chatbot.js (campo googleSheetsUrl)
 *
 * COLUNAS CRIADAS AUTOMATICAMENTE:
 * - DataHora
 * - Nome
 * - WhatsApp
 * - Cursos_Interesse
 * - Total_Mensagens
 * - Origem (URL do site)
 * - User_Agent
 * - Tipo (sync_inicial / atualizacao / final)
 * - Conversa_Resumo (últimas 5 mensagens)
 */

// Nome da aba dentro da planilha
var SHEET_NAME = 'Leads';

// Cabeçalhos das colunas (criados automaticamente na primeira execução)
var HEADERS = [
  'DataHora',
  'Nome',
  'WhatsApp',
  'Cursos_Interesse',
  'Total_Mensagens',
  'Origem',
  'User_Agent',
  'Tipo',
  'Conversa_Resumo'
];

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'AI School Chatbot - Google Sheets integration running',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
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
      // Formata o cabeçalho
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#7C3AED').setFontColor('#FFFFFF').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Detecta o tipo de envio
    var tipo = 'sync_inicial';
    if (payload.force && payload.final) {
      tipo = 'envio_final';
    } else if (payload.force) {
      tipo = 'atualizacao';
    } else if (payload.course_interest && payload.course_interest.length > 0) {
      tipo = 'interesse_detectado';
    }

    // Monta o resumo da conversa
    var resumo = '';
    var messages = payload.lastMessages || payload.fullConversation || [];
    if (messages && messages.length > 0) {
      resumo = messages.map(function(m) {
        var sender = m.from === 'bot' ? 'BOT' : (payload.name || 'LEAD').toUpperCase();
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
      payload.userAgent || '',
      tipo,
      resumo
    ];

    sheet.appendRow(row);

    // Auto-ajusta a largura das colunas
    if (sheet.getLastRow() <= 2) {
      sheet.autoResizeColumns(1, HEADERS.length);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Lead salvo com sucesso',
      row: sheet.getLastRow(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log do erro para debug
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      sheet.appendRow([new Date(), 'ERRO', '', '', '', '', '', 'erro_processamento', err.toString()]);
    } catch (e) {}

    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função auxiliar para testar manualmente pelo editor do Apps Script.
 * Simula um payload de lead chegando.
 */
function testInsertLead() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'Teste Manual',
        whatsapp: '11999999999',
        course_interest: ['ia-iniciante', 'vibe-code'],
        messageCount: 5,
        lastMessages: [
          { from: 'bot', text: 'Olá!', time: new Date().toISOString() },
          { from: 'user', text: 'Quero curso de IA', time: new Date().toISOString() }
        ],
        source: '/test',
        userAgent: 'Test',
        force: false
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
