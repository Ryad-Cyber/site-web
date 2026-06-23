"use client";

import Header from "../components/Header";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 pt-32">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact</h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
          Une page de contact simple est en construction. Revenez bientôt ou utilisez le formulaire sur la page d'accueil pour nous joindre immédiatement.
        </p>
      </div>
    </main>
  );
}
