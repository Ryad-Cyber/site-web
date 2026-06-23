"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";

export default function WhyUsPage() {
  const ref = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <Header />
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-500/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
              Pourquoi nous
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Nous construisons des
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                sites qui impressionnent
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Pas juste de beaux sites. Des machines à clients, construites avec attention au détail et une obsession pour les résultats.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/#contact"
              className="px-8 py-4 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all"
            >
              Commencer un projet
            </a>
            <a
              href="/#contact"
              className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
            >
              En savoir plus
            </a>
          </motion.div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ce qui nous rend différents
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Nous ne sommes pas une agence ordinaire. Voici ce qui nous distingue.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "⚡",
                title: "Rapidité extrême",
                description: "Un premier aperçu de votre site en 48h. Pas d'attente inutile, du concret immédiatement.",
              },
              {
                icon: "🎯",
                title: "Orienté résultats",
                description: "Chaque pixel, chaque interaction est pensée pour convertir les visiteurs en clients.",
              },
              {
                icon: "✨",
                title: "Premium par défaut",
                description: "Un design haut de gamme qui positionne votre entreprise au-dessus de la concurrence.",
              },
              {
                icon: "🤝",
                title: "Partnership réel",
                description: "Nous ne disparaissons pas après la livraison. Vous avez un vrai partenaire derrière vous.",
              },
              {
                icon: "📱",
                title: "Mobile-first",
                description: "Chaque site est optimisé mobile en premier. Car 80% de vos clients sont sur téléphone.",
              },
              {
                icon: "🚀",
                title: "Futuriste",
                description: "Les dernières technologies et tendances design pour que vous restiez en avant.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-violet-500/0 to-white/0 group-hover:from-blue-500/10 group-hover:via-violet-500/5 group-hover:to-white/5 transition-all duration-500" />
                <div className="relative">
                  <p className="text-3xl mb-3">{item.icon}</p>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Notre processus
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Simple, transparent et orienté vers vos résultats.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Découverte", desc: "Nous explorons votre activité, vos objectifs et vos clients." },
              { step: "02", title: "Maquette", desc: "Vous validez le design avant que nous ne codions une seule ligne." },
              { step: "03", title: "Développement", desc: "Nous construisons un site rapide, sécurisé et performant." },
              { step: "04", title: "Lancement", desc: "Votre site est en ligne. Et nous restons là pour vous soutenir." },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-4xl font-bold text-blue-400 mb-4">{phase.step}</div>
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className="text-sm text-zinc-400">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "15+", label: "Sites créés" },
              { value: "100%", label: "En responsive" },
              { value: "48h", label: "Premier aperçu" },
              { value: "5★", label: "Clients satisfaits" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Prêt à créer quelque chose d&apos;extraordinaire ?
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Parlons de votre projet. Nous vous ferons une proposition personnalisée, gratuitement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="px-8 py-4 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all"
              >
                Demander un devis
              </a>
              <a
                href="tel:+33749635085"
                className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Appeler directement
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
