"use client";

import { useRouter } from "@/lib/router";
import {
  courses,
  categoryLabels,
  levelLabels,
  COURSE_PRICE,
  PRICE_PER_HOUR,
  type Course,
  type CourseCategory,
} from "@/lib/courses-data";
import { formatBRL } from "@/lib/pix";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckoutDialog } from "@/components/checkout/checkout-dialog";
import {
  Sparkles,
  Clock,
  Search,
  Filter,
  Star,
  ArrowRight,
  Crown,
  Zap,
} from "lucide-react";
import { useState, useMemo } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Clock, Crown, Workflow: Sparkles, Cpu: Sparkles, Code2: Sparkles,
  Clapperboard: Sparkles, Building2: Sparkles, Plane: Sparkles, Bot: Sparkles,
  Gamepad2: Sparkles, FileSpreadsheet: Sparkles, Palette: Sparkles,
  Layout: Sparkles, Globe: Sparkles, Rocket: Sparkles,
};

export function CursosPage() {
  const { navigate } = useRouter();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<CourseCategory | "all">("all");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        search === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = filterCategory === "all" || c.category === filterCategory;
      return matchSearch && matchCat;
    });
  }, [search, filterCategory]);

  const openCheckout = (course: Course) => {
    setCheckoutCourse(course);
    setCheckoutOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 mb-3">
          <Sparkles className="h-3 w-3" /> CATÁLOGO COMPLETO
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
          {courses.length} cursos de IA. {courses.length} caminhos.
        </h1>
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          Todos os cursos têm <strong>10 horas</strong> e custam{" "}
          <strong className="text-emerald-400">{formatBRL(COURSE_PRICE)}</strong>, pague por hora extra a {formatBRL(PRICE_PER_HOUR)}/h. Escolha seu caminho.
        </p>
      </div>

      {/* Filtros */}
      <div className="mt-10 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar curso (ex: vibe code, drone, crianças, canva...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-card/50 backdrop-blur-sm pl-10 pr-4 py-2.5 text-sm outline-none focus:border-violet-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as CourseCategory | "all")}
              className="rounded-lg border border-border bg-card/50 backdrop-blur-sm px-3 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="all">Todas as categorias</option>
              {(Object.keys(categoryLabels) as CourseCategory[]).map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory("all")}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filterCategory === "all"
                ? "bg-violet-500/20 border-violet-500/50 text-violet-200"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Todos
          </button>
          {(Object.keys(categoryLabels) as CourseCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filterCategory === cat
                  ? "bg-violet-500/20 border-violet-500/50 text-violet-200"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de cursos */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => {
          const Icon = iconMap[course.icon] ?? Sparkles;
          return (
            <Card
              key={course.slug}
              className="group glass border-border hover:border-violet-500/50 transition-all hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              <button
                onClick={() => navigate({ name: "curso", slug: course.slug })}
                className="text-left flex-1 flex flex-col"
              >
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

                  <div className="mt-auto">
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">A partir de</p>
                        <p className="font-display text-2xl font-bold text-emerald-400">
                          {formatBRL(course.price)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {course.hours}h · {formatBRL(course.pricePerHour)}/h
                        </p>
                      </div>
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </button>

              <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate({ name: "curso", slug: course.slug })}
                  className="text-xs"
                >
                  Detalhes
                </Button>
                <Button
                  size="sm"
                  onClick={() => openCheckout(course)}
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white text-xs"
                >
                  Matricular
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Nenhum curso encontrado para sua busca.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setFilterCategory("all");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}

      {/* CTA Mentoria */}
      <div className="mt-16 rounded-2xl glass-strong border border-amber-500/30 p-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 mb-3">
          <Crown className="h-3 w-3" /> MENTORIA VIP
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold">
          Não encontrou o curso ideal?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          A Mentoria VIP é personalizada para o que VOCÊ quer aprender.
          Começa em {formatBRL(4500)}, 10 horas 1-a-1 com mentor dedicado.
        </p>
        <Button
          className="mt-6 bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 text-white"
          onClick={() => navigate({ name: "mentoria" })}
        >
          <Crown className="mr-2 h-4 w-4" />
          Conhecer Mentoria VIP
        </Button>
      </div>

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
    </div>
  );
}
