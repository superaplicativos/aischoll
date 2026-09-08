# AI School — Deploy no GitHub Pages + PIX Mercado Pago

Este documento explica como publicar o site da AI School no GitHub Pages
e como a integração PIX funciona (incluindo o "retorno automático").

## 1. Requisitos

- Conta no GitHub
- Repositório criado (ex: `aischool` ou `<seu-usuario>.github.io`)
- Chave PIX já configurada (CPF: 33783362857)
- (Opcional) Conta no Mercado Pago para webhook de retorno automático real

## 2. Deploy no GitHub Pages

### 2.1. Suba o código para o GitHub

```bash
git init
git add .
git commit -m "AI School — site completo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/aischool.git
git push -u origin main
```

### 2.2. Ative o GitHub Pages

1. Vá em **Settings → Pages** do repositório
2. Em **Build and deployment → Source**, selecione **GitHub Actions**
3. O workflow em `.github/workflows/deploy.yml` roda a cada push em `main`
4. Aguarde ~3 min e acesse:
   - `https://SEU_USUARIO.github.io/aischool/` (repositório normal)
   - `https://SEU_USUARIO.github.io/` (se o repo for `SEU_USUARIO.github.io`)

O workflow detecta automaticamente o tipo de repositório e ajusta o `basePath`.

## 3. Como funciona o PIX

### 3.1. Geração do QR Code (100% client-side)

O site gera o **PIX Copia e Cola** usando o padrão **EMV BR Code** diretamente
no navegador do cliente — sem necessidade de backend. O código está em:

```
src/lib/pix.ts
```

A chave PIX é o **CPF 337.833.628-57** e o destinatário é
**AI SCHOOL TECNOLOGIA EDUCACIONAL**.

Sempre que o cliente clica em "Matricular", um QR Code PIX é gerado
com o valor exato do curso (R$ 4.000) ou da Mentoria (R$ 4.500+).

### 3.2. Retorno automático (duas opções)

#### Opção A — Confirmação manual (atual, sem backend)

Após pagar, o cliente clica em **"Já paguei"** no modal de checkout.
O site simula o retorno do banco e redireciona para a página de sucesso.
O instrutor confirma o pagamento recebido em sua conta (notificação do banco)
e libera o acesso manualmente.

**Vantagem**: funciona 100% no GitHub Pages, sem custo adicional.
**Desvantagem**: requer confirmação manual.

#### Opção B — Webhook automático (produção, requer backend)

Para retorno **100% automático** sem intervenção humana, é necessário um
backend que receba o webhook do Mercado Pago. Sugestões:

1. **Mercado Pago API**: crie uma preferência de pagamento no backend
   com `notification_url` apontando para um servidor que atualiza o status.
2. Use um serviço serverless gratuito:
   - **Cloudflare Workers** (grátis até 100k req/dia)
   - **Vercel Functions** (grátis até 100GB/hora)
   - **Supabase Edge Functions** (grátis até 500k req/mês)

##### Código de exemplo (Cloudflare Worker)

```typescript
// worker.js — Deploy em https://workers.cloudflare.com
export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const body = await request.json();
      // Mercado Pago envia { action, data: { id } }
      if (body.action === 'payment.updated') {
        const paymentId = body.data.id;
        // Consulta a API do MP para confirmar
        const mpRes = await fetch(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          { headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` } }
        );
        const payment = await mpRes.json();
        if (payment.status === 'approved') {
          // Atualiza status no GitHub (via API) ou em um banco
          await env.AISCHOOL_KV.put(
            `payment:${payment.external_reference}`,
            JSON.stringify({ status: 'paid', paymentId })
          );
        }
      }
      return new Response('ok', { status: 200 });
    }
    return new Response('AI School Webhook');
  }
};
```

##### Polling do frontend

No frontend, após gerar o PIX, faça polling a cada 5s:

```typescript
const checkInterval = setInterval(async () => {
  const res = await fetch(`https://seu-worker.workers.dev/status?ref=${orderId}`);
  const data = await res.json();
  if (data.status === 'paid') {
    clearInterval(checkInterval);
    navigate({ name: 'sucesso', slug: courseSlug });
  }
}, 5000);
```

### 3.3. Configurar webhook no Mercado Pago

1. Acesse https://www.mercadopago.com.br/developers/panel
2. **Sua integração → Webhooks → Criar webhook**
3. URL: `https://seu-worker.workers.dev`
4. Eventos: `payment.updated`, `payment.created`
5. Anote o `Access Token` (coloque como secret no Worker)

## 4. Personalização

### 4.1. Trocar a chave PIX

Edite `src/lib/pix.ts`:

```typescript
export const PIX_KEY = "33783362857"; // <- seu CPF/CNPJ/telefone/e-mail
export const PIX_RECEIVER_NAME = "AI SCHOOL TECNOLOGIA EDUCACIONAL";
export const PIX_CITY = "SAO PAULO";
```

### 4.2. Adicionar/remover cursos

Edite `src/lib/courses-data.ts`. Cada curso segue a interface `Course`.

### 4.3. Alterar preços

Por padrão todos os cursos custam `R$ 4.000 / 10h` (R$ 400/h extra).
Para mudar, edite `src/lib/courses-data.ts`:

```typescript
export const COURSE_PRICE = 4000;
export const COURSE_HOURS = 10;
export const MENTORIA_VIP_MIN = 4500;
```

## 5. Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx           # Layout raiz, fonts, metadata
│   ├── page.tsx             # Roteamento via hash
│   └── globals.css          # Design system (violet + emerald)
├── components/
│   ├── checkout/
│   │   └── checkout-dialog.tsx   # Modal de checkout com PIX QR
│   ├── pages/
│   │   ├── home-page.tsx
│   │   ├── cursos-page.tsx
│   │   ├── curso-detail-page.tsx
│   │   ├── mentoria-page.tsx
│   │   ├── diferencial-page.tsx
│   │   ├── sobre-page.tsx
│   │   ├── sucesso-page.tsx
│   │   └── solo-first-article.tsx
│   └── site/
│       ├── site-header.tsx
│       └── site-footer.tsx
└── lib/
    ├── courses-data.ts      # Catálogo (15 cursos + mentoria)
    ├── pix.ts                # BR Code generator
    └── router.ts             # Hash router
```

## 6. Suporte

Para dúvidas, abrir issue no repositório ou WhatsApp.
