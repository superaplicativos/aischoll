"use client";

import { useRouter } from "@/lib/router";
import {
  courses,
  getFeaturedCourses,
  COURSE_PRICE,
  COURSE_HOURS,
  PRICE_PER_HOUR,
  MENTORIA_VIP_MIN,
  categoryLabels,
  levelLabels,
  type Course,
} from "@/lib/courses-data";
import { formatBRL } from "@/lib/pix";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckoutDialog } from "@/components/checkout/checkout-dialog";
import {
  Sparkles,
  Clock,
  Crown,
  Users,
  GraduationCap,
  Code2,
  Bot,
  Plane,
  Building2,
  Clapperboard,
  Palette,
  Rocket,
  FileSpreadsheet,
  Workflow,
  Globe,
  Layout,
  Cpu,
  Gamepad2,
  ArrowRight,
  Check,
  Star,
  Zap,
  TrendingUp,
  Shield,
  Heart,
  Brain,
  Target,
  Award,
  Phone,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Clock,
  Crown,
  Workflow,
  Cpu,
  Code2,
  Clapperboard,
  Building2,
  Plane,
  Bot,
  Gamepad2,
  FileSpreadsheet,
  Palette,
  Layout,
  Globe,
  Rocket,
};

export function HomePage() {
  const { navigate } = useRouter();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);

  const featured = getFeaturedCourses();

  const openCheckout = (course: Course) => {
    setCheckoutCourse(course);
    setCheckoutOpen(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl animate-float" />
        <div className="absolute top-40 right-10 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/2 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="container relative mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-sm mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              A escola #1 de IA do Brasil
              <span className="text-violet-400">-</span>
              <span className="text-emerald-400">+1.200 alunos formados</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Aprenda <span className="shimmer-text">Inteligência Artificial</span>
              <br />
              do zero ao avançado
            </h1>

            <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Para crianças, adolescentes, adultos e profissionais.
              Vibe Code, ChatGPT, Midjourney, Robótica, Edição de Vídeo,
              IA para Engenheiros e muito mais {" "}
              <span className="text-foreground font-medium">
                pague apenas por hora de aprendizado.
              </span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => navigate({ name: "cursos" })}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white border-0 animate-glow"
              >
                Ver todos os {courses.length} cursos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ name: "mentoria" })}
                className="backdrop-blur-sm border-2 hover:bg-white/5"
              >
                <Crown className="mr-2 h-4 w-4 text-amber-400" />
                Mentoria VIP
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-3xl">
              {[
                { icon: GraduationCap, value: `${courses.length}`, label: "cursos de IA" },
                { icon: Clock, value: `${COURSE_HOURS}h`, label: "por curso" },
                { icon: Users, value: "1.200+", label: "alunos formados" },
                { icon: Zap, value: formatBRL(PRICE_PER_HOUR).replace(",00", ""), label: "por hora extra" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <stat.icon className="h-5 w-5 text-violet-400 mb-2" />
                  <span className="font-display text-2xl md:text-3xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAL, Pague por hora */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-strong border-emerald-500/30 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 bg-emerald-500/10 blur-3xl rounded-full" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">
                  <Zap className="h-3 w-3" /> Nosso diferencial
                </div>
                <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight">
                  Pague por hora de aprendizado.{" "}
                  <span className="text-emerald-400">Sério.</span>
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Aqui você não paga por um curso longo e cheio de enrolação.
                  Cada curso tem <strong>10 horas de conteúdo</strong> por{" "}
                  <strong className="text-emerald-400">{formatBRL(COURSE_PRICE)}</strong>.
                  Precisa de mais? Compre pacotes de horas avulsas a{" "}
                  <strong className="text-emerald-400">{formatBRL(PRICE_PER_HOUR)}/hora</strong>.
                  Precisa de menos? A Mentoria VIP começa em {formatBRL(MENTORIA_VIP_MIN)}.
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Target,
                      title: "Aprenda só o que precisa",
                      desc: "Você define o ritmo e o foco. Sem 'curso de 200 horas' para enrolar.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Escala conforme evolui",
                      desc: "Começa com 10h, adiciona horas conforme seu projeto cresce.",
                    },
                    {
                      icon: Shield,
                      title: "Sem fidelidade",
                      desc: "Sem mensalidade. Sem pegadinha. Você paga pelo que consome.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl bg-card/50 p-4 border border-border">
                      <item.icon className="h-5 w-5 text-emerald-400 mb-2" />
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <Button
                  className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => navigate({ name: "diferencial" })}
                >
                  Entenda como funciona
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CURSOS DESTAQUE */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 mb-3">
                <Star className="h-3 w-3" /> CURSOS EM DESTAQUE
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
                Os mais procurados
              </h2>
              <p className="mt-3 text-muted-foreground">
                Início imediato. Turmas com vagas abertas agora.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate({ name: "cursos" })}
              className="self-start md:self-auto"
            >
              Ver todos os {courses.length} cursos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((course) => {
              const Icon = iconMap[course.icon] ?? Sparkles;
              return (
                <CourseCard
                  key={course.slug}
                  course={course}
                  onBuy={() => openCheckout(course)}
                  onDetails={() => navigate({ name: "curso", slug: course.slug })}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIAS / SEGMENTOS */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 mb-3">
              <Users className="h-3 w-3" /> PARA TODOS OS PÚBLICOS
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Tem um curso para você
            </h2>
            <p className="mt-3 text-muted-foreground">
              Da infância àaposentadoria. Do iniciante ao especialista.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: Bot, title: "Crianças (7-12)", desc: "IA + Robótica lúdica", slug: "ia-robotica-criancas", gradient: "from-yellow-400 to-orange-500" },
              { icon: Gamepad2, title: "Adolescentes (13-17)", desc: "Apps, games e conteúdo", slug: "ia-adolescentes", gradient: "from-purple-500 to-pink-500" },
              { icon: Sparkles, title: "Iniciantes adultos", desc: "Do zero ao fluente em IA", slug: "ia-iniciante", gradient: "from-violet-500 to-fuchsia-500" },
              { icon: Code2, title: "Vibe Coders", desc: "Programe com IA, sem ser dev", slug: "vibe-code", gradient: "from-cyan-500 to-blue-500" },
              { icon: Building2, title: "Engenheiros", desc: "BIM, render e projetos", slug: "ia-engenheiros-arquitetos", gradient: "from-amber-500 to-orange-500" },
              { icon: Plane, title: "Drone", desc: "Inspeção e mapeamento", slug: "ia-operadores-drone", gradient: "from-sky-500 to-indigo-500" },
              { icon: Clapperboard, title: "Criadores", desc: "Edição e conteúdo com IA", slug: "edicao-videos-ia", gradient: "from-pink-500 to-rose-500" },
              { icon: Rocket, title: "Empreendedores", desc: "Solo First com IA", slug: "ia-empreendedorismo", gradient: "from-amber-500 to-rose-500" },
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => navigate({ name: "curso", slug: item.slug })}
                className="group text-left p-5 rounded-xl glass border border-border hover:border-violet-500/50 transition-all hover:-translate-y-1"
              >
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORIA VIP */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 glass-strong border border-amber-500/30">
              <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-violet-500/20 to-amber-500/20 blur-3xl" />

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 mb-4">
                    <Crown className="h-3 w-3" /> MENTORIA VIP
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                    Aprendizado sob medida,{" "}
                    <span className="shimmer-text">só seu</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Não há currículo fixo. Você chega com seu objetivo, IA,
                    Vibe Code, Empreendedorismo, e desenhamos juntos um plano
                    1-a-1 só seu. Para quem precisa de resultados rápidos.
                  </p>

                  <div className="mt-6 space-y-2">
                    {[
                      "Plano personalizado de aprendizado",
                      "Sessões 1-a-1 ao vivo, no seu ritmo",
                      "Canal direto com mentor no WhatsApp",
                      "Acompanhamento de projeto real",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-sm text-muted-foreground">A partir de</p>
                    <p className="font-display text-4xl font-bold text-amber-400">
                      {formatBRL(MENTORIA_VIP_MIN)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">10 horas, 1-a-1, flexível</p>

                    <Button
                      className="mt-6 bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 text-white"
                      onClick={() => navigate({ name: "mentoria" })}
                    >
                      <Crown className="mr-2 h-4 w-4" />
                      Quero Mentoria VIP
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Brain, title: "Foco no seu objetivo", desc: "Plano sob medida" },
                    { icon: Award, title: "Resultados rápidos", desc: "Sem teoria pela teoria" },
                    { icon: Phone, title: "Acesso direto", desc: "Mentor no WhatsApp" },
                    { icon: Target, title: "Projeto real", desc: "Você sai com algo pronto" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl bg-card/40 border border-border">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 mb-3">
              <Heart className="h-3 w-3" /> DEPOIMENTOS
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Quem aprendeu, recomenda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Mariana Costa",
                role: "Arquiteta & Urbanista",
                content:
                  "Em 2 semanas estava renderizando com IA projetos que levavam 3 dias. O ROI foi imediato, fechei 2 novos contratos graças às apresentações que aprendi a fazer.",
                gradient: "from-amber-500 to-orange-500",
              },
              {
                name: "Pedro Henrique",
                role: "Operador de Drone ANAC",
                content:
                  "Curso direto ao ponto. Já na primeira semana reduzi o tempo de pós-processamento de inspeção em 70%. Vou fazer o curso de edição aérea também.",
                gradient: "from-sky-500 to-indigo-500",
              },
              {
                name: "Ana Beatriz",
                role: "Mãe da Helena (9 anos)",
                content:
                  "Minha filha saiu do curso falando de IA como fofoca de criança. Fez um robô que acende a luz do quarto. Mudou a forma como ela vê o mundo.",
                gradient: "from-yellow-400 to-orange-500",
              },
              {
                name: "Rodrigo Mendes",
                role: "Empreendedor Solo",
                content:
                  "Fiz o curso de Vibe Code e o de Empreendedorismo. Em 6 semanas lancei meu primeiro SaaS. Estou faturando R$ 8 mil/mês. Mudou minha vida.",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                name: "Carla Schmidt",
                role: "Social Media",
                content:
                  "Eu editava 1 vídeo por dia. Hoje edito 5 com IA. Dobrei minha carteira de clientes sem aumentar minha carga horária. Inacreditável.",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                name: "João Vitor, 15 anos",
                role: "Estudante AI School Teen",
                content:
                  "Criei meu primeiro jogo e publiquei na itch.io. Meus amigos não acreditaram. Já tô pensando em vender para a escola.",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="glass p-6 border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonial.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA FINAL */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden glass-strong border-violet-500/30 p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
                Pronto para aprender IA?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Comece hoje. Turmas novas abrem toda semana.
                Mentoria VIP pode começar em 48h.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate({ name: "cursos" })}
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white animate-glow"
                >
                  Ver cursos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/50 hover:bg-emerald-500/10"
                  onClick={() => window.open("https://wa.me/55119666161611", "_blank")}
                >
                  <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
                  Falar no WhatsApp
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {checkoutCourse && (
        <CheckoutDialog
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          title={checkoutCourse.title}
          description={`Curso: ${checkoutCourse.title}`}
          amount={checkoutCourse.price}
          redirectSlug={checkoutCourse.slug}
        />
      )}
    </>
  );
}

// === COURSE CARD ===
function CourseCard({
  course,
  onBuy,
  onDetails,
}: {
  course: Course;
  onBuy: () => void;
  onDetails: () => void;
}) {
  const Icon = iconMap[course.icon] ?? Sparkles;
  return (
    <Card className="group glass border-border hover:border-violet-500/50 transition-all hover:-translate-y-1 overflow-hidden flex flex-col">
      <div className={`relative h-32 bg-gradient-to-br ${course.gradient} overflow-hidden`}>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-14 w-14 text-white/90 group-hover:scale-110 transition-transform" />
        </div>
        <Badge className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white border-0">
          {levelLabels[course.level]}
        </Badge>
        {course.featured && (
          <Badge className="absolute top-3 right-3 bg-amber-500/80 backdrop-blur-sm text-white border-0">
            <Star className="h-3 w-3 mr-1 fill-white" />
            Popular
          </Badge>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-semibold text-base leading-tight mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {course.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground">A partir de</p>
              <p className="font-display text-2xl font-bold text-emerald-400">
                {formatBRL(course.price)}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {course.hours}h, {formatBRL(course.pricePerHour)}/h
              </p>
            </div>
            <div className="text-right">
              <Clock className="h-4 w-4 text-muted-foreground ml-auto mb-1" />
              <p className="text-xs text-muted-foreground">{course.hours} horas</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDetails}
              className="text-xs"
            >
              Detalhes
            </Button>
            <Button
              size="sm"
              onClick={onBuy}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white text-xs"
            >
              Matricular
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// === FAQ ===
function FAQSection() {
  const faqs = [
    {
      q: "Como funciona o pagamento por hora?",
      a: "Cada curso custa R$4.000 por 10 horas (R$400/hora). Se você quiser comprar horas avulsas adicionais, para revisar uma aula, fazer um projeto extra ou mentoria pontual, você paga R$400 por hora extra. Sem fidelidade, sem mensalidade.",
    },
    {
      q: "O pagamento é via PIX mesmo?",
      a: "Sim! 100% dos pagamentos são via PIX, com geração automática de QR Code e retorno automático assim que o banco confirma o pagamento. Você recebe o acesso em minutos.",
    },
    {
      q: "Os cursos são online ou presenciais?",
      a: "A maioria é 100% online ao vivo via Zoom, com gravações disponíveis por 12 meses. As turmas infantis (IA + Robótica) têm modalidade presencial opcional em São Paulo.",
    },
    {
      q: "Tenho que saber programar?",
      a: "Não! Cursos como IA Iniciante, Canva com IA, Pacote Office com IA e Criação de Sites no Lovable são para quem nunca programou. Os cursos de Vibe Code ensinam a programar com IA sem precisar saber JavaScript.",
    },
    {
      q: "Crianças realmente aprendem IA?",
      a: "Sim! No curso IA + Robótica para Crianças (7-12 anos) elas aprendem lógica de programação com Scratch, montam robôs educacionais e entendem como a IA funciona no dia a dia, de forma lúdica e supervisionada.",
    },
    {
      q: "Como funciona a Mentoria VIP?",
      a: "A Mentoria VIP começa em R$4.500 (10 horas 1-a-1). Nas primeiras sessões definimos seu objetivo e desenhamos um plano sob medida. Você tem canal direto com o mentor no WhatsApp e flexibilidade total de horários.",
    },
    {
      q: "Tem certificado?",
      a: "Sim, todos os cursos emitem certificado digital da AI School com carga horária e verificação de autenticidade. A Mentoria VIP emite certificado personalizado.",
    },
    {
      q: "E se eu não gostar do curso?",
      a: "Garantia de 7 dias: se nas duas primeiras aulas você não gostar, devolvemos 100% do valor. Sem perguntas.",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 mb-3">
            <Sparkles className="h-3 w-3" /> PERGUNTAS FREQUENTES
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Ainda com dúvidas?
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-xl glass border-border overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="font-medium text-sm md:text-base pr-4">{faq.q}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform shrink-0" />
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
