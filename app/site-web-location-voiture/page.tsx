"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/33749635085?text=Bonjour, je veux un site web pour mon agence de location de voitures";

export default function LocationVoiturePage() {
  return (
    <main className="bg-zinc-50 text-zinc-900">

      <section className="relative min-h-[90vh] flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
          alt="Voiture de luxe"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-4xl font-bold">
            Plus de réservations pour votre agence de location
          </h1>

          <p className="mt-4 text-zinc-200">
            Site web moderne pour louer vos véhicules 24/7
          </p>

          <a href={WHATSAPP_URL} className="mt-8 inline-block bg-white text-black px-6 py-3 rounded-xl">
            Demander un devis
          </a>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Problèmes actuels</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            "Pas de réservation en ligne",
            "Perte de clients sur Google",
            "Gestion manuelle compliquée",
          ].map((i) => (
            <div key={i} className="p-6 bg-white rounded-xl">{i}</div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white text-center py-20">
        <h2 className="text-3xl font-bold">
          Transformez vos visiteurs en clients
        </h2>
      </section>

    </main>
  );
}