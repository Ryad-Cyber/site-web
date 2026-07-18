"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

async function parseJsonResponse(res: Response) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as { success?: boolean; error?: string };
  } catch {
    throw new Error("Réponse serveur invalide.");
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      activity: (form.elements.namedItem("activity") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    if (!data.email) {
      setErrorMsg("Le champ email est requis.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setErrorMsg("Adresse email invalide.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await parseJsonResponse(res);

      if (!res.ok) {
        setErrorMsg(json.error ?? "Erreur lors de l'envoi.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Impossible d'envoyer le message. Réessayez."
      );
      setStatus("error");
    }
  }

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl shadow-violet-500/10">
      <div className="mb-6">
        <p className="text-sm font-medium text-violet-400 uppercase tracking-wider mb-2">
          Devis gratuit
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Obtenez votre estimation gratuite
        </h3>
        <p className="mt-2 text-zinc-400 text-sm md:text-base">
          Réponse sous 24h — Devis sans engagement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
            Nom (optionnel)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Votre nom"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="votre@email.com"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
        </div>

        <div>
          <label htmlFor="activity" className="block text-sm font-medium text-zinc-300 mb-2">
            Type d&apos;activité (optionnel)
          </label>
          <input
            id="activity"
            name="activity"
            type="text"
            placeholder="Restaurant, coiffeur, artisan..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
            Description du projet
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Décrivez votre projet et vos objectifs..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
          />
        </div>

        {status === "success" && (
          <p className="text-emerald-400 text-sm font-medium animate-fade-in">
            Message envoyé ! Je vous réponds sous 24h.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm font-medium animate-fade-in">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold hover:from-violet-500 hover:to-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {status === "loading" ? "Envoi en cours..." : "Recevoir mon devis gratuit"}
        </button>
      </form>
    </div>
  );
}
