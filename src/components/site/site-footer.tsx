"use client";

import { useRouter } from "@/lib/router";
import { Sparkles, Instagram, Youtube, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";

export function SiteFooter() {
  const { navigateToHash } = useRouter();

  return (
    <footer className="mt-auto border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg">AI School</span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  Intelligence for All
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A escola líder em IA no Brasil. Cursos para crianças, adolescentes,
              adultos e profissionais. Pague por hora.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-violet-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-violet-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-violet-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Cursos */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Cursos populares</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => navigateToHash("#/curso/ia-iniciante")} className="hover:text-foreground">
                  IA Iniciante
                </button>
              </li>
              <li>
                <button onClick={() => navigateToHash("#/curso/vibe-code")} className="hover:text-foreground">
                  Vibe Code
                </button>
              </li>
              <li>
                <button onClick={() => navigateToHash("#/curso/edicao-videos-ia")} className="hover:text-foreground">
                  Edição de Vídeos com IA
                </button>
              </li>
              <li>
                <button onClick={() => navigateToHash("#/curso/ia-engenheiros-arquitetos")} className="hover:text-foreground">
                  IA para Engenheiros
                </button>
              </li>
              <li>
                <button onClick={() => navigateToHash("#/curso/ia-robotica-criancas")} className="hover:text-foreground">
                  IA + Robótica para Crianças
                </button>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => navigateToHash("#/cursos")} className="hover:text-foreground">Todos os cursos</button></li>
              <li><button onClick={() => navigateToHash("#/mentoria-vip")} className="hover:text-foreground">Mentoria VIP</button></li>
              <li><button onClick={() => navigateToHash("#/diferencial")} className="hover:text-foreground">Pague por hora</button></li>
              <li><button onClick={() => navigateToHash("#/sobre")} className="hover:text-foreground">Sobre a escola</button></li>
              <li><button onClick={() => navigateToHash("#/blog/solo-first")} className="hover:text-foreground">Blog</button></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Fale conosco</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> contato@aischool.com.br
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +55 11 99999-9999
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> WhatsApp 24/7
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AI School. Todos os direitos reservados. CNPJ 00.000.000/0001-00</p>
          <p className="flex items-center gap-2">
            <span>Pagamentos via</span>
            <span className="font-semibold text-emerald-400">PIX Mercado Pago</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
