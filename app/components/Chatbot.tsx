"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "bot"; text: string };

const BOT_REPLIES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["bonjour", "salut", "coucou", "bienvenue"],
    reply:
      "Bonjour ! Je peux vous aider à préciser votre projet : site vitrine, application web, réservation en ligne ou visibilité sur Google. Dites-moi ce que vous souhaitez faire.",
  },
  {
    keywords: ["prix", "tarif", "coût", "combien", "budget"],
    reply:
      "Mes formules démarrent à 299€ (Starter), 499€ (Business) et 899€ (Premium). Chaque projet démarre par une étude gratuite de votre besoin — voulez que je vous guide sur la bonne formule ?",
  },
  {
    keywords: ["délai", "temps", "livraison", "rapide", "jours"],
    reply:
      "Le premier aperçu peut être livré sous 48h, puis la livraison finale dépend du niveau de personnalisation choisi. Je peux vous donner un cadre précis selon votre projet.",
  },
  {
    keywords: ["whatsapp", "contact", "appeler", "téléphone", "devis"],
    reply:
      "Vous pouvez me contacter via le formulaire, WhatsApp ou au 07 49 63 50 85. Je vous réponds rapidement et je peux établir un devis sur mesure selon votre besoin.",
  },
  {
    keywords: ["seo", "google", "référencement", "visibilité"],
    reply:
      "Oui, je peux proposer une base de visibilité locale et technique pour aider votre activité à mieux apparaître sur Google : structure, contenu, vitesse et optimisation mobile.",
  },
  {
    keywords: ["site", "site web", "landing", "vitrine", "application", "app", "webapp"],
    reply:
      "Je peux créer un site vitrine, une application web ou une expérience mobile pensée pour convertir vos visiteurs en clients. Dites-moi si vous souhaitez surtout générer des appels, des réservations ou des devis.",
  },
  {
    keywords: ["réservation", "rdv", "prendre", "agenda", "booking"],
    reply:
      "Oui, j’intègre souvent des réservations, formulaires ou prises de contact pour simplifier le parcours client. Si vous avez déjà un besoin précis, je peux vous orienter vers la bonne solution.",
  },
  {
    keywords: ["restaurant", "artisan", "coiffure", "btp", "commerce", "salon", "fitness"],
    reply:
      "Je travaille avec des restaurants, salons, artisans, commerces et structures locales. Chaque projet est pensé selon votre secteur, votre audience et vos objectifs business.",
  },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const { keywords, reply } of BOT_REPLIES) {
    if (keywords.some((k) => lower.includes(k))) return reply;
  }
  return "Je peux vous aider à clarifier votre besoin. Dites-moi si vous cherchez un site vitrine, une application web, une réservation en ligne ou une amélioration de votre visibilité sur Google, et je vous guiderai vers la bonne solution.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Bonjour ! Je suis l'assistant Ryad Web Studio. Posez-moi vos questions sur les tarifs, délais ou services.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userText = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getBotReply(userText) }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  }

  return (
    <>
      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-full max-w-[380px] transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="glass-card rounded-2xl border border-white/15 shadow-2xl shadow-black/40 overflow-hidden flex flex-col h-[480px]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-600/90 to-blue-600/90 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Assistant Ryad</p>
                <p className="text-white/70 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En ligne
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le chat"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-950/95">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white rounded-br-md"
                      : "bg-white/10 text-zinc-200 rounded-bl-md border border-white/5"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start animate-fade-in">
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/10 border border-white/5 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="p-3 border-t border-white/10 bg-zinc-900/90 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Votre question..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              className="w-10 h-10 shrink-0 rounded-xl bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Toggle bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center ${
          open
            ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            : "bg-gradient-to-br from-violet-600 to-blue-600 text-white hover:scale-110 glow-violet"
        }`}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </>
  );
}
