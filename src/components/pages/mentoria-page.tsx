"use client";

import { useRouter } from "@/lib/router";
import { mentoriaVIP, MENTORIA_VIP_MIN } from "@/lib/courses-data";
import { formatBRL } from "@/lib/pix";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckoutDialog } from "@/components/checkout/checkout-dialog";
import {
  Crown, Check, Brain, Target, Phone, Award, Clock, Sparkles,
  Zap, MessageCircle, ArrowRight, Calendar, Video, ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export function MentoriaPage() {
  const { navigate } = useRouter();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const benefits = [
    { icon: Brain, title: "Plano sob medida", desc: "Nas primeiras sessões definimos seu objetivo e desenhamos um plano exclusivo para você. Nada de currículo engessado." },
    { icon: Target, title: "Foco no resultado", desc: "Você sai de cada sessão com algo prático: um prompt, uma automação, um app no ar, uma estratégia. Sem teoria pela teoria." },
    { icon: Phone, title: "Acesso direto", desc: "Canal dedicado no WhatsApp com o mentor. Dúvida fora da aula? Pergunta. Resposta em até 24h." },
    { icon: Award, title: "Acompanhamento de projeto", desc: "Tem um projeto real em mente? Trabalhamos nele juntos. Você entrega algo pronto ao final da mentoria." },
    { icon: Clock, title: "Horários flexíveis", desc: "Manhã, tarde, noite ou fim de semana. Você agenda direto com o mentor, no seu ritmo." },
    { icon: ShieldCheck, title: "Garantia total", desc: "Se nas duas primeiras sessões você achar que não é para você, devolvemos 100% do valor." },
  ];

  const useCases = [
    { title: "Empreendedor Solo", desc: "Quer sair do CLT e construir um produto com IA. Define stack, validação, MVP." },
    { title: "Executivo / Diretor", desc: "Precisa entender IA estrategicamente para tomar decisões. Visão de negócio + técnica." },
    { title: "Profissional liberal", desc: "Médico, advogado, arquiteto, contador. IA aplicada à sua área específica." },
    { title: "Estudante / Pesquisador", desc: "Quer acelerar estudos, fazer research, escrever melhor, publicar mais." },
    { title: "Criador de conteúdo", desc: "Quer turbinar canal com IA, editação rápida, scripts, automação de post." },
    { title: "Futuro Vibe Coder", desc: "Quer construir apps sem saber programar. Cursor, Lovable, v0, deploy." },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/15 to-amber-500/20 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-400 mb-6 backdrop-blur-sm border border-amber-500/20">
              <Crown className="h-3.5 w-3.5" /> MENTORIA VIP PERSONALIZADA
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Aprendizado sob medida,
              <br />
              <span className="shimmer-text">só seu</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              {mentoriaVIP.fullDescription}
            </p>

            <div className="mt-10 inline-block">
              <div className="rounded-2xl glass-strong border-amber-500/30 p-6">
                <p className="text-sm text-muted-foreground">A partir de</p>
                <p className="font-display text-5xl font-bold text-amber-400">
                  {formatBRL(MENTORIA_VIP_MIN)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {mentoriaVIP.minimumHours} horas 1-a-1 · horários flexíveis
                </p>
                <Button
                  size="lg"
                  onClick={() => setCheckoutOpen(true)}
                  className="mt-5 w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 text-white animate-glow"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Quero Mentoria VIP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 mb-3">
              <Sparkles className="h-3 w-3" /> POR QUE MENTORIA VIP
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Não é curso. É <span className="text-amber-400">parceria</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <Card key={b.title} className="glass p-6 border-border hover:border-amber-500/30 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center mb-4">
                  <b.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Como funciona</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "Primeiro contato",
                desc: "Conversa inicial de 30 minutos (grátis) para entender seu objetivo. Definimos juntos se a Mentoria VIP é para você.",
              },
              {
                num: "02",
                title: "Pagamento e agenda",
                desc: "Você paga via PIX (10h mínimas) e já agenda suas primeiras sessões direto com o mentor.",
              },
              {
                num: "03",
                title: "Plano personalizado",
                desc: "Nas primeiras 2 sessões desenhamos seu plano sob medida, com metas claras e entregáveis.",
              },
              {
                num: "04",
                title: "Sessões 1-a-1",
                desc: "Encontros ao vivo via Zoom, de 1h ou 2h, no seu ritmo. Você tem canal direto com o mentor no WhatsApp entre sessões.",
              },
              {
                num: "05",
                title: "Projeto real",
                desc: "Você sai com algo pronto: um app no ar, uma automação rodando, uma estratégia de conteúdo, um produto lançado.",
              },
              {
                num: "06",
                title: "Plano pós-mentoria",
                desc: "Ao final, você recebe um plano de evolução para continuar crescendo sozinho.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center font-display font-bold text-white">
                    {step.num}
                  </div>
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display font-semibold text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 mb-3">
              <Target className="h-3 w-3" /> PARA QUEM É
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              A Mentoria VIP é ideal para você se...
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc) => (
              <Card key={uc.title} className="glass p-5 border-border">
                <h3 className="font-display font-semibold text-sm mb-2">{uc.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES list */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="glass-strong border-amber-500/30 p-8">
            <h2 className="font-display text-2xl font-bold mb-6">O que está incluso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mentoriaVIP.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm">{f}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Video className="h-4 w-4 text-amber-400" /> {mentoriaVIP.format}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-amber-400" /> Início em até 48h após pagamento
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Vamos começar?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Conversa inicial gratuita de 30 minutos. Sem compromisso.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => setCheckoutOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 text-white animate-glow"
            >
              <Crown className="mr-2 h-4 w-4" />
              Garantir Mentoria VIP, {formatBRL(MENTORIA_VIP_MIN)}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://wa.me/55119666161611?text=Quero%20conversa%20inicial%20gratuita%20da%20Mentoria%20VIP", "_blank")}
              className="border-emerald-500/30 hover:bg-emerald-500/10"
            >
              <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
              Conversa grátis de 30min
            </Button>
          </div>
        </div>
      </section>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        title={mentoriaVIP.title}
        description={`Mentoria VIP - ${mentoriaVIP.minimumHours} horas 1-a-1`}
        amount={MENTORIA_VIP_MIN}
        redirectSlug="mentoria"
      />
    </div>
  );
}
