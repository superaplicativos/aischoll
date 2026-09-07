"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Hash-based router que funciona em GitHub Pages.
 * Mantém o site 100% estático, sem necessidade de backend.
 *
 * Routes:
 *  #/                     → home
 *  #/cursos               → grid de todos os cursos
 *  #/curso/:slug          → detalhes do curso
 *  #/mentoria-vip         → página da Mentoria VIP
 *  #/checkout/:slug       → checkout (curso)
 *  #/checkout/mentoria    → checkout (mentoria)
 *  #/sucesso              → página de sucesso pós-pagamento
 *  #/sobre                → sobre a escola
 *  #/diferencial          → por que pagar por hora
 *  #/blog/solo-first      → artigo Empreendedor T-Shaped
 */

export type Route =
  | { name: "home" }
  | { name: "cursos" }
  | { name: "curso"; slug: string }
  | { name: "mentoria" }
  | { name: "checkout"; slug: string; type: "curso" | "mentoria" }
  | { name: "sucesso"; slug?: string }
  | { name: "sobre" }
  | { name: "diferencial" }
  | { name: "blog"; article: "solo-first" }
  | { name: "not-found" };

function parseHash(hash: string): Route {
  // Remove o # inicial
  const clean = hash.replace(/^#/, "").replace(/^\//, "");
  const parts = clean.split("/").filter(Boolean);

  if (parts.length === 0) return { name: "home" };

  const [first, second, third] = parts;

  if (first === "cursos") return { name: "cursos" };
  if (first === "curso" && second) return { name: "curso", slug: second };
  if (first === "mentoria-vip") return { name: "mentoria" };
  if (first === "checkout" && second) {
    if (second === "mentoria") return { name: "checkout", slug: "mentoria", type: "mentoria" };
    return { name: "checkout", slug: second, type: "curso" };
  }
  if (first === "sucesso") return { name: "sucesso", slug: second };
  if (first === "sobre") return { name: "sobre" };
  if (first === "diferencial") return { name: "diferencial" };
  if (first === "blog" && second === "solo-first") {
    return { name: "blog", article: "solo-first" };
  }

  return { name: "not-found" };
}

export function routeToHash(route: Route): string {
  switch (route.name) {
    case "home":
      return "#/";
    case "cursos":
      return "#/cursos";
    case "curso":
      return `#/curso/${route.slug}`;
    case "mentoria":
      return "#/mentoria-vip";
    case "checkout":
      return route.type === "mentoria"
        ? "#/checkout/mentoria"
        : `#/checkout/${route.slug}`;
    case "sucesso":
      return route.slug ? `#/sucesso/${route.slug}` : "#/sucesso";
    case "sobre":
      return "#/sobre";
    case "diferencial":
      return "#/diferencial";
    case "blog":
      return `#/blog/${route.article}`;
    default:
      return "#/";
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(typeof window !== "undefined" ? window.location.hash : "")
  );

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      // Scroll para o topo a cada navegação
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((to: Route) => {
    window.location.hash = routeToHash(to);
  }, []);

  const navigateToHash = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  return { route, navigate, navigateToHash };
}
