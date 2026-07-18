"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const QUICK_ACTIONS = [
  { label: "Créer un site web", text: "Je veux créer un site web pour mon activité" },
  { label: "Prix d'un site", text: "Quels sont les tarifs pour un site web ?" },
  { label: "Comment ça marche ?", text: "Comment fonctionne le processus de création ?" },
  { label: "Audit gratuit", text: "Pouvez-vous faire un audit de mon besoin ?" },
  { label: "Par où commencer ?", text: "Par où dois-je commencer pour mon projet ?" },
  { label: "Je veux un devis", text: "Je voudrais obtenir un devis gratuit" },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  
  // Greetings
  if (lower.match(/^(bonjour|salut|coucou|hello|hey|bonsoir)/)) {
    return "Bonjour ! Je peux vous aider à préciser votre projet : site vitrine, application web, réservation en ligne ou visibilité sur Google. Que souhaitez-vous faire ?";
  }
  
  // Pricing
  if (lower.match(/(prix|tarif|coût|combien|budget|cher|€|euros)/)) {
    return "Mes formules démarrent à 299€ (Starter), 499€ (Business) et 899€ (Premium). Chaque projet commence par une étude gratuite de votre besoin. Voulez-vous que je vous guide sur la bonne formule ?";
  }
  
  // Timeline/Delivery
  if (lower.match(/(délai|temps|livraison|rapide|jours|combien de temps|long)/)) {
    return "Le premier aperçu peut être livré sous 48h, puis la livraison finale dépend du niveau de personnalisation choisi. Je peux vous donner un cadre précis selon votre projet.";
  }
  
  // Contact
  if (lower.match(/(whatsapp|contact|appeler|téléphone|devis|joindre|numéro)/)) {
    return "Vous pouvez me contacter via le formulaire, WhatsApp au 07 49 63 50 85. Je vous réponds rapidement et je peux établir un devis sur mesure selon votre besoin.";
  }
  
  // SEO/Visibility
  if (lower.match(/(seo|google|référencement|visibilité|position|trouver|apparaître)/)) {
    return "Oui, je peux proposer une base de visibilité locale et technique pour aider votre activité à mieux apparaître sur Google : structure, contenu, vitesse et optimisation mobile.";
  }
  
  // Services/Websites
  if (lower.match(/(site|site web|landing|vitrine|application|app|webapp|créer|faire)/)) {
    return "Je peux créer un site vitrine, une application web ou une expérience mobile pensée pour convertir vos visiteurs en clients. Dites-moi si vous souhaitez surtout générer des appels, des réservations ou des devis.";
  }
  
  // Booking/Appointments
  if (lower.match(/(réservation|rdv|rendez-vous|prendre|agenda|booking|calendrier)/)) {
    return "Oui, j'intègre souvent des réservations, formulaires ou prises de contact pour simplifier le parcours client. Si vous avez déjà un besoin précis, je peux vous orienter vers la bonne solution.";
  }
  
  // Industries
  if (lower.match(/(restaurant|artisan|coiffure|btp|commerce|salon|fitness|gym|immobilier|vetment|mode|location|voiture|nettoyage)/)) {
    return "Je travaille avec des restaurants, salons, artisans, commerces et structures locales. Chaque projet est pensé selon votre secteur, votre audience et vos objectifs business.";
  }
  
  // Getting started
  if (lower.match(/(commencer|début|start|par où|comment|processus|étape)/)) {
    return "On commence par un échange sur votre besoin, puis je vous propose une maquette avant tout engagement. Une fois validée, on passe au développement. Simple et efficace.";
  }
  
  // Audit/Analysis
  if (lower.match(/(audit|analyse|étude|examiner|regarder|conseil)/)) {
    return "Je peux faire une analyse gratuite de votre besoin actuel et vous proposer la meilleure solution. Dites-moi simplement votre activité et vos objectifs principaux.";
  }
  
  // Default response
  return "Je peux vous aider à clarifier votre besoin. Dites-moi si vous cherchez un site vitrine, une application web, une réservation en ligne ou une amélioration de votre visibilité sur Google, et je vous guiderai vers la bonne solution.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant Ryad Web Studio. Comment puis-je vous aider aujourd'hui ?",
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
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getBotReply(userText) }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
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
          <div className="flex items-center justify-between px-5 py-4 bg-white/[0.04] border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Assistant Ryad</p>
                <p className="text-white/70 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
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
                      ? "bg-white text-zinc-950 rounded-br-md"
                      : "bg-white/10 text-zinc-200 rounded-bl-md border border-white/5"
                  }`}
                >
                  {msg.content}
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

          {/* Quick Actions */}
          <div className="px-3 pt-3 pb-2 border-t border-white/10 bg-zinc-900/90">
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => sendMessage(action.text)}
                  disabled={typing}
                  className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {action.label}
                </button>
              ))}
            </div>
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
              disabled={typing}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              aria-label="Envoyer"
              className="w-10 h-10 shrink-0 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Toggle bubble — monochrome et discret */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg shadow-black/10 transition-all duration-300 flex items-center justify-center ${
          open
            ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            : "bg-zinc-950 text-white hover:scale-105"
        }`}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </>
  );
}
