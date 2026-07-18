"use client";

import Header from "../components/Header";
import { motion } from "framer-motion";
import { useState } from "react";
import { PROJECTS, type Project } from "../../lib/projects-data";

export default function DesignsPage() {
  const [selectedProject, setSelectedProject] = useState(0);

  const designs: Project[] = PROJECTS;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
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
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-3">
              Notre galerie
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Designs qui
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                transforment les affaires
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              Des interfaces ultra-premium conçues pour impressionner, convertir et dominer le marché.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400 text-sm uppercase tracking-widest"
          >
            Explorez {designs.length} projets de classe mondiale
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="relative py-12 md:py-18 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center"
          >
            {/* Featured Content */}
            <div className="relative order-2 lg:order-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${designs[selectedProject].gradient} rounded-3xl blur-3xl opacity-40`} />
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2.5">
                    {designs[selectedProject].category}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
                    {designs[selectedProject].name}
                  </h2>
                  <p className="text-base text-zinc-300 mb-6 leading-relaxed">
                    {designs[selectedProject].description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {designs[selectedProject].features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span className="text-sm text-zinc-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm italic text-zinc-300 mb-3">
                      "{designs[selectedProject].testimonial}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Large Mockup */}
            <motion.div
              key={`mockup-${selectedProject}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-pink-500/5 rounded-3xl blur-3xl" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 sm:p-10 aspect-square flex items-center justify-center overflow-hidden"
                >
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-7xl sm:text-9xl opacity-80"
                  >
                    {designs[selectedProject].mockup}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Project Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3"
          >
            {designs.map((design, index) => (
              <motion.button
                key={design.id}
                onClick={() => setSelectedProject(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative p-3 sm:p-5 rounded-2xl border transition-all duration-300 ${
                  selectedProject === index
                    ? "bg-white/15 border-white/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{design.mockup}</div>
                <p className="text-xs sm:text-sm font-semibold text-white text-left line-clamp-2">
                  {design.name}
                </p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* QUICK PREVIEW GRID */}
      <section className="relative py-12 md:py-18 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Explorez chaque projet
            </h2>
            <p className="text-base text-zinc-400 max-w-2xl mx-auto">
              Cliquez sur les projets pour voir la vision complète.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {designs.map((design, idx) => (
              <motion.button
                key={design.id}
                variants={itemVariants}
                onClick={() => setSelectedProject(idx)}
                whileHover={{ y: -8 }}
                className="group text-left"
              >
                <div className={`relative rounded-3xl border border-white/10 bg-gradient-to-br ${design.gradient} backdrop-blur-xl p-6 h-full overflow-hidden hover:border-white/20 transition-all duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <div className="text-5xl mb-3">{design.mockup}</div>
                    <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-2">
                      {design.category}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                      {design.name}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                      {design.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Voir le design
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-12 md:py-18 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                value: "5",
                label: "Projets d'exception",
                description: "Chacun conçu avec une obsession pour les détails",
              },
              {
                value: "100%",
                label: "Conversions réussies",
                description: "Tous les projets génèrent des résultats mesurables",
              },
              {
                value: "Classe mondiale",
                label: "Qualité de design",
                description: "Au niveau de Vercel, Framer, Apple et Stripe",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </p>
                <h3 className="text-xl font-semibold text-white mb-2">{stat.label}</h3>
                <p className="text-zinc-400">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-12 md:py-18 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nous pouvons construire ça pour vous
            </h2>
            <p className="text-base text-zinc-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Chaque projet commence par une conversation. Nous écoutons votre vision et créons quelque chose d'extraordinaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#contact"
                className="px-6 py-3.5 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all hover:scale-[1.02]"
              >
                Commencer un projet
              </a>
              <a
                href="tel:+33749635085"
                className="px-6 py-3.5 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Appeler maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

