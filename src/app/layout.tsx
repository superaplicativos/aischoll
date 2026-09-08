import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI School | Cursos de Inteligência Artificial para Todos",
  description:
    "A escola líder em cursos de IA no Brasil. Aprenda Vibe Code, IA Iniciante, Intermediário, Avançado, Edição de Vídeos com IA, IA para Engenheiros, Operadores de Drone, IA + Robótica para Crianças, Mentoria VIP e muito mais. Pague por hora — R$4.000 / 10h.",
  keywords: [
    "curso de IA",
    "inteligência artificial",
    "vibe code",
    "ChatGPT",
    "Midjourney",
    "mentoria IA",
    "curso IA crianças",
    "curso IA Brasil",
    "AI School",
    "automação com IA",
    "n8n",
    "Lovable",
    "Canva IA",
    "Poe",
    "robótica infantil",
  ],
  authors: [{ name: "AI School" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "AI School — Aprenda IA do Zero ao Avançado",
    description:
      "Cursos de Inteligência Artificial para crianças, adolescentes, adultos e profissionais. Pague por hora. Mentoria VIP personalizada.",
    url: "https://aischool.github.io",
    siteName: "AI School",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI School — Cursos de IA para Todos",
    description:
      "Do iniciante ao avançado. Pague por hora de aprendizado. Mentoria VIP a partir de R$4.500.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {/* Chatbot de Vendas com RAG - Aria (carrega dinamicamente com basePath correto) */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            function loadChatbot() {
              // Tenta vários paths até achar o chatbot.js
              var paths = [
                './chatbot.js',
                '../chatbot.js',
                '/chatbot.js'
              ];
              var base = window.location.pathname.replace(/\\/$/, '');
              // Se temos basePath tipo /aischoll, base = /aischoll
              if (base && base !== '' && window.location.pathname !== '/') {
                paths.unshift(base + '/chatbot.js');
              }
              var i = 0;
              function tryNext() {
                if (i >= paths.length) return;
                var s = document.createElement('script');
                s.src = paths[i];
                s.async = true;
                s.onerror = function() { i++; tryNext(); };
                s.onload = function() { if (!window.AISchoolChatbot) { i++; tryNext(); } };
                document.body.appendChild(s);
              }
              tryNext();
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', loadChatbot);
            } else {
              loadChatbot();
            }
          })();
        `}} />
      </body>
    </html>
  );
}
