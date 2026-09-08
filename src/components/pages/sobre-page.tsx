"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sparkles, Target, Heart, Award, Users, Zap, ArrowRight,
  Brain, Rocket, Shield, BookOpen,
} from "lucide-react";
import { courses } from "@/lib/courses-data";

export function SobrePage() {
  const { navigate } = useRouter();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 mb-3">
          <Sparkles className="h-3 w-3" /> SOBRE A AI SCHOOL
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Nascemos para <span className="shimmer-text">democratizar a IA</span> no Brasil
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          A AI School é a escola pioneira em ensinar Inteligência Artificial
          para todos os públicos no Brasil — de crianças de 7 anos a CEOs.
          Acreditamos que IA é alfabetização do século 21. Por isso criamos
          um modelo onde você paga por hora, aprende no seu ritmo e sai com
          algo concreto na mão.
        </p>
      </div>

      {/* Missão, Visão, Valores */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: Target,
            title: "Missão",
            desc: "Tornar a fluência em IA acessível a todos os brasileiros — independente de idade, formação ou orçamento.",
          },
          {
            icon: Rocket,
            title: "Visão",
            desc: "Ser a referência nacional em educação de IA até 2030, com 100 mil alunos formados e impacto mensurável em suas vidas.",
          },
          {
            icon: Heart,
            title: "Valores",
            desc: "Prática sobre teoria. Respeito ao tempo do aluno. Transparência total. Educação como transformação — não como produto.",
          },
        ].map((item) => (
          <Card key={item.title} className="glass p-6 border-border">
            <item.icon className="h-8 w-8 text-violet-400 mb-4" />
            <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </Card>
        ))}
      </div>

      {/* Por que existimos */}
      <section className="mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Por que existimos
            </h2>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Em 2023, quando o ChatGPT explodiu no mundo, vimos uma divisão
                se formar. De um lado, profissionais de tecnologia que dominaram
                IA rapidamente. Do outro, a maioria — crianças, aposentados,
                professores, advogados, médicos — que ficaram para trás.
              </p>
              <p>
                Pior: os cursos existentes ou eram superficiais demais ("aprenda
                ChatGPT em 30 minutos no YouTube") ou acadêmicos demais
                ("mestrado em IA de 2 anos"). Nenhum atendia o profissional que
                quer aplicar IA no trabalho <strong className="text-foreground">hoje</strong>,
                nem a criança que precisa aprender <strong className="text-foreground">brincando</strong>.
              </p>
              <p>
                A AI School nasceu para preencher essa lacuna. Cursos curtos
                (10 horas), práticos, para todos os públicos, pagos por hora.
                Sem enrolação. Sem mensalidade. Sem promessa vazia.
              </p>
            </div>
          </div>

          <Card className="glass-strong p-8 border-violet-500/30">
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: `${courses.length}`, label: "cursos de IA" },
                { value: "1.200+", label: "alunos formados" },
                { value: "4 a 70", label: "anos de idade" },
                { value: "100%", label: "online ao vivo" },
                { value: "12 meses", label: "de gravação" },
                { value: "7 dias", label: "de garantia" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl md:text-4xl font-bold text-violet-400">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Método */}
      <section className="mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 mb-3">
            <Brain className="h-3 w-3" /> NOSSO MÉTODO
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Como ensinamos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Zap, title: "Aula prática desde o minuto 1", desc: "Você sai de cada aula com algo pronto. Sem teoria pela teoria. Cada encontro tem um entregável." },
            { icon: Users, title: "Turmas pequenas", desc: "Máximo de 8-10 alunos por turma. Em aulas infantis, menos ainda. Você tem atenção." },
            { icon: BookOpen, title: "Material incluso", desc: "Prompts, templates, scripts, bibliotecas. Tudo que você precisa para continuar depois." },
            { icon: Shield, title: "Ética desde o início", desc: "Privacidade, LGPD, viés, deepfakes. Cidadania digital é parte do currículo, não extra." },
            { icon: Award, title: "Certificado reconhecido", desc: "Certificado digital com verificação de autenticidade. Válido para horas complementares." },
            { icon: Heart, title: "Comunidade ativa", desc: "Grupo no WhatsApp/Discord com alunos e mentores. Aprendizado não acaba na última aula." },
          ].map((item) => (
            <Card key={item.title} className="glass p-5 border-border flex gap-4">
              <div className="shrink-0">
                <div className="h-10 w-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-violet-400" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20">
        <Card className="glass-strong border-violet-500/30 p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Bora começar?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Turmas novas toda semana. Mentoria VIP pode começar em 48h.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ name: "cursos" })}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white"
            >
              Ver todos os cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ name: "mentoria" })}
            >
              Conhecer Mentoria VIP
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
