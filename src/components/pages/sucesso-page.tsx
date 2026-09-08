"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2, Mail, Calendar, MessageCircle, Sparkles, ArrowRight,
  Clock, Download, Heart, Rocket,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  slug?: string;
}

export function SucessoPage({ slug }: Props) {
  const { navigate } = useRouter();
  const [enrolledAt] = useState(new Date().toLocaleString("pt-BR"));

  const isMentoria = slug === "mentoria";

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Confirmação */}
        <Card className="glass-strong border-emerald-500/30 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/20 blur-3xl rounded-full" />

          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-emerald-400" />
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Pagamento confirmado!
            </h1>

            <p className="mt-4 text-muted-foreground">
              {isMentoria
                ? "Bem-vindo à Mentoria VIP! Seu mentor entrará em contato em até 48h para agendar a primeira sessão."
                : "Inscrição confirmada! Você receberá os detalhes de acesso no seu e-mail em instantes."}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-card/50 border border-border px-4 py-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Confirmado em: {enrolledAt}</span>
            </div>
          </div>
        </Card>

        {/* Próximos passos */}
        <Card className="glass p-6 md:p-8 mt-6 border-border">
          <h2 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            Próximos passos
          </h2>

          <ol className="space-y-4">
            <li className="flex gap-3">
              <div className="h-7 w-7 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300 shrink-0">
                1
              </div>
              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-violet-400" />
                  Cheque seu e-mail
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Enviaremos os detalhes de acesso, link do Zoom e materiais
                  para o e-mail informado. Verifique também o spam/promoções.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="h-7 w-7 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300 shrink-0">
                2
              </div>
              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-violet-400" />
                  {isMentoria ? "Aguarde contato do mentor" : "Receba o cronograma"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isMentoria
                    ? "Nosso mentor entrará em contato via WhatsApp em até 48h para definir horários."
                    : "Você receberá o calendário de aulas junto com o acesso. Turmas iniciam toda semana."}
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="h-7 w-7 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300 shrink-0">
                3
              </div>
              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-violet-400" />
                  Entre no grupo do WhatsApp
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Link do grupo da turma virá no e-mail. Lá você tira dúvidas,
                  recebe avisos e conhece seus colegas.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="h-7 w-7 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300 shrink-0">
                4
              </div>
              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Download className="h-4 w-4 text-violet-400" />
                  Baixe materiais de apoio
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Prompts, templates, scripts e bibliotecas estarão disponíveis
                  na área do aluno antes da primeira aula.
                </p>
              </div>
            </li>
          </ol>
        </Card>

        {/* Recursos extras */}
        <Card className="glass p-6 mt-6 border-border">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="h-5 w-5 text-emerald-400" />
            <h3 className="font-display font-semibold">Já quer começar?</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enquanto espera a primeira aula, prepare-se com estes recursos gratuitos:
          </p>
          <div className="space-y-2">
            <a
              href="https://wa.me/55119666161611?text=Quero%20receber%20o%20guia%20gratuito%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border hover:border-violet-500/50 transition-colors"
            >
              <span className="text-sm">Guia gratuito: 10 prompts que mudam tudo</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <button
              onClick={() => navigate({ name: "blog", article: "solo-first" })}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border hover:border-violet-500/50 transition-colors"
            >
              <span className="text-sm">Ler artigo: Empreendedor T-Shaped</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => navigate({ name: "diferencial" })}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border hover:border-violet-500/50 transition-colors"
            >
              <span className="text-sm">Entenda nosso modelo por hora</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </Card>

        {/* Compartilhe */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3 flex items-center justify-center gap-2">
            <Heart className="h-4 w-4 text-rose-400" />
            Indique um amigo e ganhe 1 hora extra gratuita
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.share?.({
                  title: "AI School",
                  text: "Estou aprendendo IA na AI School! Vem comigo 🚀",
                  url: window.location.origin,
                }).catch(() => {
                  navigator.clipboard.writeText(window.location.origin);
                });
              }}
            >
              Compartilhar
            </Button>
            <Button
              size="sm"
              onClick={() => navigate({ name: "home" })}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
            >
              Voltar ao início
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
