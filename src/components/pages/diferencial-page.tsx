"use client";

import { useRouter } from "@/lib/router";
import { COURSE_PRICE, COURSE_HOURS, PRICE_PER_HOUR, MENTORIA_VIP_MIN } from "@/lib/courses-data";
import { formatBRL } from "@/lib/pix";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Zap, Clock, Target, TrendingUp, Shield, Check, ArrowRight,
  Sparkles, Calculator, Layers, RefreshCw,
} from "lucide-react";

export function DiferencialPage() {
  const { navigate } = useRouter();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 border border-emerald-500/20 mb-6">
          <Zap className="h-3.5 w-3.5" /> NOSSO DIFERENCIAL
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Pague por <span className="text-emerald-400">hora</span>.
          <br />
          Não por curso.
        </h1>

        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          Em um mercado cheio de cursos de 200 horas que ninguém termina,
          cursos longos só para parecerem caros, mensalidades eternas, a AI School
          faz o oposto. Você paga pelo tempo de aprendizado que realmente usa.
          Simples assim.
        </p>
      </div>

      {/* A matemática */}
      <section className="mt-16">
        <Card className="glass-strong border-emerald-500/30 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 mb-3">
                <Calculator className="h-3 w-3" /> COMO FUNCIONA
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                A matemática é simples
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-emerald-400">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cada curso = 10 horas</p>
                    <p className="text-xs text-muted-foreground">Por {formatBRL(COURSE_PRICE)}, {formatBRL(PRICE_PER_HOUR)}/h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-emerald-400">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Precisa de mais horas?</p>
                    <p className="text-xs text-muted-foreground">Compre pacotes avulsos a {formatBRL(PRICE_PER_HOUR)}/hora</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-emerald-400">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Precisa de menos?</p>
                    <p className="text-xs text-muted-foreground">Mentoria VIP começa em {formatBRL(MENTORIA_VIP_MIN)} (10h 1-a-1)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-card/50 border border-border p-6">
              <p className="text-xs text-muted-foreground mb-3">Exemplo prático</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Curso IA Iniciante (10h)</span>
                  <span className="font-semibold text-emerald-400">{formatBRL(COURSE_PRICE)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>+ 3h extras (projeto)</span>
                  <span>+ {formatBRL(PRICE_PER_HOUR * 3)}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-emerald-400">
                    {formatBRL(COURSE_PRICE + PRICE_PER_HOUR * 3)}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3">
                  Você aprendeu 13 horas, saiu com um projeto pronto, e não pagou
                  por uma "mensalidade de curso de 200 horas" que nunca ia terminar.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Por que isso muda tudo */}
      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
          Por que isso muda tudo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Target,
              title: "Foco no essencial",
              desc: "Em 10 horas você aprende o que realmente precisa. Sem fillers. Sem 'curso de 200 horas' que ninguém termina.",
            },
            {
              icon: TrendingUp,
              title: "Escala com você",
              desc: "Começou com 10h e quer mais? Compra pacote avulso. Parou de precisar? Pára. Sem amarras.",
            },
            {
              icon: Layers,
              title: "Stack modular",
              desc: "Faça IA Iniciante → Vibe Code → Avançado. Ou pule direto pro que precisa. Você monta seu aprendizado.",
            },
            {
              icon: RefreshCw,
              title: "Sem renovação forçada",
              desc: "Cursos com começo, meio e fim. Você paga uma vez. Não é assinatura. Não tem pegadinha.",
            },
            {
              icon: Shield,
              title: "Garantia 7 dias",
              desc: "Se nas duas primeiras aulas não for o que esperava, devolvemos 100%. Sem perguntas.",
            },
            {
              icon: Clock,
              title: "Respeito ao seu tempo",
              desc: "10 horas são 5 encontros de 2h. Você não precisa de 6 meses para aprender IA, precisa de foco.",
            },
          ].map((item) => (
            <Card key={item.title} className="glass p-5 border-border">
              <item.icon className="h-6 w-6 text-emerald-400 mb-3" />
              <h3 className="font-display font-semibold text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparativo */}
      <section className="mt-16">
        <Card className="glass-strong p-6 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            AI School vs. cursão de 200h
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Critério</th>
                  <th className="text-left py-3 px-4 font-medium text-emerald-400">AI School</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cursão tradicional</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Duração", "10h (foco total)", "200h (muito filler)"],
                  ["Preço", formatBRL(COURSE_PRICE), "R$ 8.000 - 15.000"],
                  ["Preço/hora", formatBRL(PRICE_PER_HOUR), "R$ 40 - 75"],
                  ["Mensalidade", "Não tem", "Sim, 12-24x"],
                  ["Você aprende o que precisa", "Sim", "Parcialmente"],
                  ["Horas extras flexíveis", "Sim", "Não"],
                  ["Garantia 7 dias", "Sim", "Raramente"],
                  ["Certificado", "Sim", "Sim"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{row[0]}</td>
                    <td className="py-3 px-4 text-emerald-400">{row[1]}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <Card className="glass-strong border-violet-500/30 p-8 md:p-12 text-center">
          <Sparkles className="h-8 w-8 text-violet-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Comece com 10 horas.
            <br />
            Veja se IA é para você.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Não existe compromisso longo. Não existe mensalidade.
            Apenas {formatBRL(COURSE_PRICE)} por 10 horas de aprendizado real.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ name: "cursos" })}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white"
            >
              Ver cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ name: "mentoria" })}
              className="border-amber-500/30 hover:bg-amber-500/10"
            >
              Ou Mentoria VIP
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
