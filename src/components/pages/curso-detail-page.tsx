"use client";

import { useRouter } from "@/lib/router";
import { getCourse, levelLabels, courses } from "@/lib/courses-data";
import { formatBRL } from "@/lib/pix";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckoutDialog } from "@/components/checkout/checkout-dialog";
import {
  Sparkles, Clock, Crown, Code2, Clapperboard, Building2, Plane,
  Bot, Gamepad2, FileSpreadsheet, Palette, Layout, Globe, Rocket,
  Workflow, Cpu, Users, Target, Check, ChevronLeft, Star, Award,
  PlayCircle, BookOpen, Wrench, Gift, Calendar, Video, ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Clock, Crown, Workflow, Cpu, Code2, Clapperboard, Building2,
  Plane, Bot, Gamepad2, FileSpreadsheet, Palette, Layout, Globe, Rocket,
};

interface Props {
  slug: string;
}

export function CursoDetailPage({ slug }: Props) {
  const { navigate } = useRouter();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const course = getCourse(slug);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Curso não encontrado</h1>
        <p className="text-muted-foreground mb-6">O curso que você buscou não existe ou foi removido.</p>
        <Button onClick={() => navigate({ name: "cursos" })}>
          Ver todos os cursos
        </Button>
      </div>
    );
  }

  const Icon = iconMap[course.icon] ?? Sparkles;
  const related = courses.filter(c => c.slug !== course.slug && c.category === course.category).slice(0, 3);

  return (
    <div>
      {/* HERO do curso */}
      <section className={`relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-20`} />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

        <div className="container relative mx-auto px-4 pt-12 pb-16">
          <button
            onClick={() => navigate({ name: "cursos" })}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4" /> Todos os cursos
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-violet-500/20 text-violet-200 border-violet-500/30">
                  {levelLabels[course.level]}
                </Badge>
                {course.featured && (
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 border">
                    <Star className="h-3 w-3 mr-1 fill-amber-300" /> Popular
                  </Badge>
                )}
                <Badge variant="outline" className="border-border">
                  {course.hours} horas
                </Badge>
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                {course.title}
              </h1>

              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                {course.fullDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CARD de compra */}
            <div className="lg:col-span-1">
              <Card className="glass-strong border-violet-500/30 p-6 sticky top-24">
                <div className={`relative h-32 rounded-xl bg-gradient-to-br ${course.gradient} overflow-hidden mb-5`}>
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-16 w-16 text-white/90" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Investimento</p>
                    <p className="font-display text-3xl font-bold text-emerald-400">
                      {formatBRL(course.price)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {course.hours} horas · {formatBRL(course.pricePerHour)}/h
                    </p>
                  </div>

                  <Button
                    size="lg"
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white animate-glow"
                  >
                    Matricular agora
                    <PlayCircle className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-emerald-500/30 hover:bg-emerald-500/10"
                    onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
                  >
                    Tirar dúvidas no WhatsApp
                  </Button>

                  <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-violet-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-3.5 w-3.5 text-violet-400" />
                      <span>{course.format}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 text-violet-400" />
                      <span>{course.certificate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
                      <span>Garantia 7 dias</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE VAI APRENDER */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-5 w-5 text-violet-400" />
            <h2 className="font-display text-2xl md:text-3xl font-bold">O que você vai aprender</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {course.whatYouWillLearn.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg glass border-border">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PÚBLICO E PRÉ-REQUISITOS */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass p-6 border-border">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-violet-400" />
                <h3 className="font-display text-lg font-semibold">Para quem é este curso</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{course.targetAudience}</p>
            </Card>
            <Card className="glass p-6 border-border">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-violet-400" />
                <h3 className="font-display text-lg font-semibold">Pré-requisitos</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{course.prerequisites}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* EMENTA / MÓDULOS */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-violet-400" />
            <h2 className="font-display text-2xl md:text-3xl font-bold">Ementa completa</h2>
          </div>
          <div className="space-y-3">
            {course.modules.map((module, i) => (
              <details key={i} className="group rounded-xl glass border-border overflow-hidden" open={i === 0}>
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center font-bold text-violet-300 text-sm">
                      {i + 1}
                    </div>
                    <h3 className="font-display font-semibold text-base">{module.title}</h3>
                  </div>
                  <ChevronLeft className="h-4 w-4 text-muted-foreground group-open:-rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 pl-16">
                  <ul className="space-y-2">
                    {module.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-emerald-400 mt-1 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FERRAMENTAS */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="h-5 w-5 text-violet-400" />
            <h2 className="font-display text-2xl md:text-3xl font-bold">Ferramentas que vai dominar</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {course.tools.map((tool) => (
              <span
                key={tool}
                className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-violet-100"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      {course.bonus && course.bonus.length > 0 && (
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-2 mb-6">
              <Gift className="h-5 w-5 text-amber-400" />
              <h2 className="font-display text-2xl md:text-3xl font-bold">Bônus inclusos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {course.bonus.map((bonus, i) => (
                <Card key={i} className="glass p-4 border-amber-500/20">
                  <div className="flex items-start gap-2">
                    <Gift className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm">{bonus}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="glass-strong border-violet-500/30 p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Pronto para começar?
            </h2>
            <p className="mt-3 text-muted-foreground">
              {course.title}
            </p>
            <div className="mt-6">
              <p className="text-3xl font-bold text-emerald-400">{formatBRL(course.price)}</p>
              <p className="text-xs text-muted-foreground mt-1">{course.hours} horas · {course.format}</p>
            </div>
            <Button
              size="lg"
              onClick={() => setCheckoutOpen(true)}
              className="mt-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white animate-glow"
            >
              Matricular agora
              <PlayCircle className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </section>

      {/* CURSOS RELACIONADOS */}
      {related.length > 0 && (
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-2xl font-bold mb-6">Cursos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rc) => {
                const RIcon = iconMap[rc.icon] ?? Sparkles;
                return (
                  <button
                    key={rc.slug}
                    onClick={() => navigate({ name: "curso", slug: rc.slug })}
                    className="group text-left p-5 rounded-xl glass border-border hover:border-violet-500/50 transition-all"
                  >
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${rc.gradient} flex items-center justify-center mb-3`}>
                      <RIcon className="h-5 w-5 text-white" />
                    </div>
                    <p className="font-semibold text-sm line-clamp-2">{rc.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatBRL(rc.price)} · {rc.hours}h</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        title={course.title}
        description={`Curso: ${course.title}`}
        amount={course.price}
        redirectSlug={course.slug}
      />
    </div>
  );
}
