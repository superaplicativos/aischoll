"use client";

import { useRouter } from "@/lib/router";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Início", hash: "#/" },
  { label: "Cursos", hash: "#/cursos" },
  { label: "Mentoria VIP", hash: "#/mentoria-vip" },
  { label: "Por hora", hash: "#/diferencial" },
  { label: "Sobre", hash: "#/sobre" },
  { label: "Blog", hash: "#/blog/solo-first" },
];

export function SiteHeader() {
  const { navigateToHash } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            navigateToHash("#/");
          }}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg tracking-tight">
              AI School
            </span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
              Intelligence for All
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              onClick={(e) => {
                e.preventDefault();
                navigateToHash(item.hash);
              }}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => navigateToHash("#/cursos")}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white border-0"
          >
            Inscreva-se
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.hash}
                href={item.hash}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHash(item.hash);
                  setMobileOpen(false);
                }}
                className="px-3 py-3 text-sm font-medium hover:bg-white/5 rounded-md"
              >
                {item.label}
              </a>
            ))}
            <Button
              className="mt-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
              onClick={() => {
                navigateToHash("#/cursos");
                setMobileOpen(false);
              }}
            >
              Inscreva-se
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
