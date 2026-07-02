"use client";

import Header from "../components/Header";
import DesignCarousel from "../components/DesignCarousel";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { PROJECTS, type Project } from "../../lib/projects-data";

export default function DesignsPage() {
  const [selectedProject, setSelectedProject] = useState(0);
  const selectorRef = useRef<HTMLDivElement>(null);

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

  const handleSelectorScroll = () => {
    selectorRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  };

  const handleProjectAdvance = () => {
    setSelectedProject((prev) => (prev + 1) % designs.length);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/15 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-violet-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
              Notre galerie
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Designs qui
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                s’adaptent à tous vos projets
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Des interfaces premium conçues pour impressionner et convertir, que vous soyez dans le barbershop, la restauration, le fitness, l’artisanat, la location de véhicules, le commerce ou tout autre secteur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROJECT HEADER */}
      <section className="relative py-8 md:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="max-w-2xl"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-3">
                  {designs[selectedProject].category}
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                  {designs[selectedProject].name}
                </h2>
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                  {designs[selectedProject].description}
                </p>
              </motion.div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleProjectAdvance}
                className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
              >
                Suivant
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Showcase Carousel */}
            <motion.div
              key={`carousel-${selectedProject}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <DesignCarousel
                slides={designs[selectedProject].slides}
                accentGradient={designs[selectedProject].gradient}
                projectKey={selectedProject}
              />
            </motion.div>

            {/* Featured Content */}
            <div className="relative order-2 lg:order-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${designs[selectedProject].gradient} rounded-3xl blur-3xl opacity-30`} />
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-3">
                    {designs[selectedProject].category}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
                    {designs[selectedProject].name}
                  </h2>
                  <p className="text-base text-zinc-300 mb-6 leading-relaxed">
                    {designs[selectedProject].description}
                  </p>

                  {/* Testimonial */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm italic text-zinc-300">
                      "{designs[selectedProject].testimonial}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Project Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                ref={selectorRef}
                className="flex-1 overflow-x-auto overflow-y-hidden pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex min-w-max gap-2 sm:gap-3">
                  {designs.map((design, index) => {
                    const isActive = selectedProject === index;
                    return (
                      <motion.button
                        key={design.id}
                        onClick={() => setSelectedProject(index)}
                        whileHover={{ y: -1, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative flex h-20 w-24 sm:h-24 sm:w-28 items-center justify-center rounded-2xl border px-2 text-center transition-all duration-300 ease-out ${
                          isActive
                            ? "border-white/30 bg-white/16 shadow-[0_10px_30px_-12px_rgba(255,255,255,0.35)]"
                            : "border-white/10 bg-white/[0.05] hover:border-white/20 hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className={`absolute inset-x-2 top-2 h-0.5 rounded-full transition-all duration-300 ${isActive ? "bg-gradient-to-r from-blue-400 to-violet-400" : "bg-transparent group-hover:bg-white/20"}`} />
                        <span className="flex flex-col items-center gap-1.5">
                          <span className="text-xl sm:text-2xl leading-none">{design.mockup}</span>
                          <span className={`text-[11px] sm:text-xs font-semibold leading-tight ${isActive ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                            {design.name}
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSelectorScroll}
                aria-label="Afficher les projets suivants"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.12]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Tous nos projets
            </h2>
            <p className="text-base text-zinc-400 max-w-xl mx-auto">
              Cliquez sur un projet pour le voir en détail.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {designs.map((design, idx) => (
              <motion.button
                key={design.id}
                variants={itemVariants}
                onClick={() => setSelectedProject(idx)}
                whileHover={{ y: -4 }}
                className="group text-left"
              >
                <div className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${design.gradient} backdrop-blur-xl p-6 h-full overflow-hidden hover:border-white/20 transition-all duration-300`}>
                  <div className="relative">
                    <div className="text-4xl mb-3">{design.mockup}</div>
                    <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-2">
                      {design.category}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                      {design.name}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {design.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>


      {/* CTA FINAL */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Crééons votre projet ensemble
            </h2>
            <p className="text-base text-zinc-400 mb-6 max-w-xl mx-auto leading-relaxed">
              Chaque projet commence par une conversation gratuite.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all hover:scale-[1.02]"
            >
              Demander un devis gratuit
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
