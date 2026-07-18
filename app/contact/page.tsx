"use client";

import Header from "../components/Header";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 pt-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Contact</h1>
        <p className="text-base text-zinc-400 max-w-3xl leading-relaxed">
          Une page de contact simple est en construction. Revenez bientôt ou utilisez le formulaire sur la page d'accueil pour nous joindre immédiatement.
        </p>
      </div>
    </main>
  );
}
