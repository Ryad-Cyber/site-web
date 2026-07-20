"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

// Formulaire de diagnostic (/refonte-site-internet) — quatre champs, pas un
// de plus : l'adresse du site est l'engagement le plus faible qui existe.
// Pas de budget, pas de secteur : chaque champ supplémentaire coûte des leads.
export default function DiagnosticForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const get = (id: string) =>
      (form.elements.namedItem(id) as HTMLInputElement | HTMLTextAreaElement).value.trim();

    const siteUrl = get("siteUrl");
    const name = get("name");
    const contact = get("contact");
    const problem = get("problem");

    if (!siteUrl) {
      setErrorMsg("Indiquez l'adresse de votre site actuel.");
      setStatus("error");
      return;
    }
    if (!contact) {
      setErrorMsg("Indiquez un email ou un numéro de téléphone.");
      setStatus("error");
      return;
    }

    // Un seul champ « téléphone ou email » côté visiteur — on route côté client
    const isEmail = contact.includes("@");
    if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      setErrorMsg("Adresse email invalide.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "diagnostic",
          siteUrl,
          name,
          email: isEmail ? contact : "",
          phone: isEmail ? "" : contact,
          message: problem,
        }),
      });

      const text = await res.text();
      const json = text ? (JSON.parse(text) as { error?: string }) : {};

      if (!res.ok) {
        setErrorMsg(json.error ?? "Erreur lors de l'envoi.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Impossible d'envoyer la demande. Réessayez.");
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-white/25 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="siteUrl" className="mb-2 block text-sm font-medium text-zinc-300">
          L&apos;adresse de votre site actuel *
        </label>
        <input
          id="siteUrl"
          name="siteUrl"
          type="text"
          required
          inputMode="url"
          placeholder="www.votre-site.fr"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
          Prénom
        </label>
        <input id="name" name="name" type="text" placeholder="Votre prénom" className={inputClass} />
      </div>

      <div>
        <label htmlFor="contact" className="mb-2 block text-sm font-medium text-zinc-300">
          Téléphone ou email *
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          required
          placeholder="06 12 34 56 78 ou votre@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="problem" className="mb-2 block text-sm font-medium text-zinc-300">
          Qu&apos;est-ce qui vous gêne le plus ? (optionnel)
        </label>
        <input
          id="problem"
          name="problem"
          type="text"
          placeholder="Il est lent, il ne m'amène pas de clients…"
          className={inputClass}
        />
      </div>

      {status === "success" && (
        <p className="animate-fade-in text-sm font-medium text-white">
          Demande envoyée ! Vous recevez notre regard sur votre site sous 24h.
        </p>
      )}
      {status === "error" && (
        <p className="animate-fade-in text-sm font-medium text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-white py-4 font-medium tracking-tight text-zinc-950 shadow-lg shadow-black/20 transition-all hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "loading" ? "Envoi en cours..." : "Recevoir mon diagnostic gratuit"}
      </button>

      <p className="text-center text-xs tracking-wide text-zinc-500">
        Réponse sous 24h · Gratuit · Sans engagement
      </p>
    </form>
  );
}
