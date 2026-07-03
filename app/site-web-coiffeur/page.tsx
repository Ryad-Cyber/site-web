"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/33749635085?text=Bonjour, je suis intéressé par un site web pour mon salon de coiffure";

export default function CoiffeurPage() {
  return (
    <main className="bg-zinc-50 text-zinc-900">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80"
            alt="Salon de coiffure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            Un site web qui remplit votre salon de clients
          </motion.h1>

          <p className="mt-5 text-zinc-200">
            Plus de rendez-vous, plus de visibilité Google, plus de clients locaux.
          </p>

          <a href={WHATSAPP_URL} className="mt-8 inline-block px-6 py-3 bg-white text-black rounded-xl">
            Devis gratuit
          </a>
        </div>
      </section>

      {/* PROBLÈME */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center">Pourquoi vous perdez des clients</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            "Pas visible sur Google",
            "Pas de réservation en ligne",
            "Site web inexistant ou vieux",
          ].map((i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow">{i}</div>
          ))}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-3xl font-bold">Je crée des sites qui remplissent votre agenda</h2>
      </section>

      {/* CTA */}
      <section className="text-center py-20">
        <a href={WHATSAPP_URL} className="px-8 py-4 bg-black text-white rounded-xl">
          Booster mon salon
        </a>
      </section>

    </main>
  );
}