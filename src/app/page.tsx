"use client";

import { useRouter } from "@/lib/router";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HomePage } from "@/components/pages/home-page";
import { CursosPage } from "@/components/pages/cursos-page";
import { CursoDetailPage } from "@/components/pages/curso-detail-page";
import { MentoriaPage } from "@/components/pages/mentoria-page";
import { DiferencialPage } from "@/components/pages/diferencial-page";
import { SobrePage } from "@/components/pages/sobre-page";
import { SucessoPage } from "@/components/pages/sucesso-page";
import { SoloFirstArticle } from "@/components/pages/solo-first-article";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, ArrowLeft } from "lucide-react";

export default function Home() {
  const { route, navigate } = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {route.name === "home" && <HomePage />}
        {route.name === "cursos" && <CursosPage />}
        {route.name === "curso" && <CursoDetailPage slug={route.slug} />}
        {route.name === "mentoria" && <MentoriaPage />}
        {route.name === "diferencial" && <DiferencialPage />}
        {route.name === "sobre" && <SobrePage />}
        {route.name === "sucesso" && <SucessoPage slug={route.slug} />}
        {route.name === "blog" && route.article === "solo-first" && <SoloFirstArticle />}
        {route.name === "not-found" && (
          <div className="container mx-auto px-4 py-32 text-center">
            <p className="text-6xl font-display font-bold text-violet-500 mb-4">404</p>
            <h1 className="font-display text-2xl font-bold mb-4">Página não encontrada</h1>
            <p className="text-muted-foreground mb-6">
              A página que você procura não existe ou foi movida.
            </p>
            <Button onClick={() => navigate({ name: "home" })}>
              <HomeIcon className="mr-2 h-4 w-4" /> Voltar ao início
            </Button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
