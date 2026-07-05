"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PROJECTS } from "../../lib/projects-data";
import Image from "next/image";

const CATEGORY_COLORS = {
  "Beauté & Coiffure": "from-amber-400 to-orange-400",
  "Restaurant Gastronomique": "from-red-400 to-rose-400",
  "Salle de sport & Coach sportif": "from-lime-400 to-green-400",
  "Mobilité": "from-sky-400 to-cyan-400",
  "Service / entretien": "from-cyan-400 to-blue-400",
  "Vêtements / e-commerce": "from-rose-400 to-pink-400",
  "Entreprise locale": "from-violet-400 to-purple-400",
  "Immobilier": "from-indigo-400 to-violet-400",
  "Beauté & spa": "from-pink-400 to-fuchsia-400",
  "Projet personnalisé": "from-zinc-400 to-slate-400",
};

export default function ProjectsPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const selectedProject = PROJECTS[selectedIdx];
  const colorGradient = CATEGORY_COLORS[selectedProject.category as keyof typeof CATEGORY_COLORS] || "from-blue-400 to-violet-400";

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused || selectedProject.slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % selectedProject.slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedProject.slides.length, isPaused]);

  // Reset slide when project changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedIdx]);

  const currentSlideData = selectedProject.slides[currentSlide];

  return (
    <main className="relative min-h-screen bg-zinc-950 text-white overflow-hidden pt-24 sm:pt-28">
      <Header />
      
      {/* Background gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${colorGradient} blur-[150px] rounded-full transition-colors duration-700`} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr_400px] min-h-[calc(100vh-6rem)]">
        {/* LEFT - Project list (no internal scroll on desktop) */}
        <div className="w-full lg:border-r border-white/10 flex flex-col">
          <div className="p-4 lg:p-8 border-b border-white/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
              Réalisations
            </p>
            <h1 className="text-xl lg:text-2xl font-bold text-white">
              Nos projets
            </h1>
          </div>
          
          <nav className="overflow-x-auto lg:overflow-visible p-4 flex lg:flex-col gap-2">
            {PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setSelectedIdx(idx)}
                className={`flex-shrink-0 lg:w-full text-left p-3 lg:p-4 rounded-xl transition-all duration-300 group ${
                  idx === selectedIdx
                    ? "bg-white/10 border border-white/20"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl lg:text-3xl transition-transform duration-300 ${
                    idx === selectedIdx ? "scale-110" : "group-hover:scale-105"
                  }`}>
                    {project.mockup}
                  </span>
                  <div className="flex-1">
                    <p className={`font-semibold transition-colors text-sm lg:text-base ${
                      idx === selectedIdx ? "text-white" : "text-zinc-400 group-hover:text-white"
                    }`}>
                      {project.name}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5 hidden lg:block">
                      {project.category}
                    </p>
                  </div>
                  {idx === selectedIdx && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
                    />
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* CENTER - Media carousel (main focus) */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 lg:p-12">
          <div className="max-w-2xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div 
                  className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden aspect-[16/10] max-h-[500px] cursor-pointer"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % selectedProject.slides.length)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} opacity-20`} />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedProject.id}-${currentSlide}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative w-full h-full"
                    >
                      {currentSlideData.type === "video" && currentSlideData.src ? (
                        <video
                          src={currentSlideData.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : currentSlideData.src ? (
                        <Image
                          src={currentSlideData.src as string}
                          alt={currentSlideData.alt || selectedProject.name}
                          fill
                          className="object-cover"
                          unoptimized={typeof currentSlideData.src === "string" && currentSlideData.src.startsWith("http")}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl">{selectedProject.mockup}</span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Slide indicators */}
                  {selectedProject.slides.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.slides.map((_, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentSlide
                              ? "w-6 bg-white"
                              : "bg-white/40 hover:bg-white/60"
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm font-medium text-white"
                    >
                      {currentSlideData.label}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="text-xs text-zinc-300 mt-1"
                    >
                      {currentSlideData.caption}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile project details */}
          <div className="lg:hidden w-full mt-6 space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold uppercase tracking-widest text-blue-400"
            >
              {selectedProject.category}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-white"
            >
              {selectedProject.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-sm text-zinc-400 leading-relaxed"
            >
              {selectedProject.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              {selectedProject.features.map((feature, idx) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorGradient}`} />
                  <span className="text-sm text-zinc-300">{feature}</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="pt-4 border-t border-white/10"
            >
              <p className="text-sm text-zinc-500 italic">
                "{selectedProject.testimonial}"
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT - Project details */}
        <div className="hidden lg:flex flex-col p-8 border-l border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3"
              >
                {selectedProject.category}
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="text-3xl font-bold text-white mb-6"
              >
                {selectedProject.name}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-zinc-400 mb-8 leading-relaxed"
              >
                {selectedProject.description}
              </motion.p>

              <div className="grid grid-cols-2 gap-3 mb-8">
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <p className="text-xs text-zinc-400">Impact</p>
    <p className="text-lg font-bold text-white">+30%</p>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <p className="text-xs text-zinc-400">Conversion</p>
    <p className="text-lg font-bold text-white">x2</p>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <p className="text-xs text-zinc-400">Visibilité</p>
    <p className="text-lg font-bold text-white">+180%</p>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <p className="text-xs text-zinc-400">Leads</p>
    <p className="text-lg font-bold text-white">+75%</p>
  </div>
</div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="space-y-3 mb-8"
              >
                {selectedProject.features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05, duration: 0.3 }}
                    className="flex items-center gap-3 group"
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorGradient}`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-auto pt-6 border-t border-white/10"
              >
                <p className="text-sm text-zinc-500 italic">
                  "{selectedProject.testimonial}"
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}
