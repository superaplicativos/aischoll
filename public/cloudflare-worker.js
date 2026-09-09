/**
 * AI School - Proxy Cloudflare Worker para DeepSeek API
 *
 * Este código resolve o problema de CORS (o navegador bloqueia chamadas diretas
 * para a API do DeepSeek, mas um Worker no Cloudflare chama de servidor pra servidor).
 *
 * COMO INSTALAR (5 minutos):
 *
 * 1. Acesse https://dash.cloudflare.com (crie conta grátis se não tiver)
 *
 * 2. No menu lateral esquerdo, clique em "Workers & Pages"
 *
 * 3. Clique no botão azul "Create" (Criar)
 *
 * 4. Clique em "Create Worker" (Criar Worker)
 *
 * 5. Vai aparecer um editor de código com "Hello World" - APAGUE TUDO
 *
 * 6. Cole TODO o código abaixo (a partir da linha "// === AI SCHOOL PROXY ===")
 *
 * 7. Substitua a linha:
 *      const DEEPSEEK_API_KEY = 'SUA_CHAVE_AQUI';
 *    por:
 *      const DEEPSEEK_API_KEY = 'sua-chave-deepseek-aqui';
 *    (mantenha as aspas, é a chave que começa com sk-)
 *
 * 8. Clique no botão azul "Deploy" (no topo)
 *
 * 9. Vai aparecer uma URL do tipo:
 *      https://aischool-proxy.seu-usuario.workers.dev
 *    COPIE essa URL
 *
 * 10. Me manda a URL por aqui que eu já atualizo o site pra usar ela.
 *
 * ============== COLE O CÓDIGO ABAIXO NO EDITOR DO CLOUDFLARE ==============
 */

// === AI SCHOOL PROXY ===

const DEEPSEEK_API_KEY = 'SUA_CHAVE_AQUI'; // COLOQUE SUA CHAVE AQUI (sk-...)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      });
    }

    try {
      // Read body from request
      const body = await request.text();

      // Validate JSON
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
        });
      }

      // Add system prompt if not provided
      if (!parsed.messages || !Array.isArray(parsed.messages)) {
        return new Response(JSON.stringify({ error: 'messages array required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
        });
      }

      // Force DeepSeek model + reasonable defaults
      const payload = {
        model: parsed.model || 'deepseek-chat',
        messages: parsed.messages,
        max_tokens: Math.min(parsed.max_tokens || 800, 1500),
        temperature: parsed.temperature !== undefined ? parsed.temperature : 0.7,
        stream: false,
      };

      // Call DeepSeek API server-side (no CORS issue here)
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + DEEPSEEK_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          ...CORS_HEADERS,
        },
      });

    } catch (err) {
      return new Response(JSON.stringify({
        error: 'Worker error: ' + err.message,
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      });
    }
  },
};

/**
 * ============== FIM DO CÓDIGO ==============
 *
 * Após deployar, ME MANDE a URL do Worker (formato: https://xxx.workers.dev)
 * que eu atualizo o chatbot pra usar a IA de verdade do DeepSeek.
 *
 * CUSTO: GRÁTIS até 100.000 requisições por dia no plano Cloudflare Free.
 * Para uma escola pequena isso é mais do que suficiente.
 */
