"use client";

import { motion } from "framer-motion";
import DesignCarousel from "./DesignCarousel";
import { Realisation } from "../../lib/projects-data";

export default function FullScreenRealisation({ project, index }: { project: Realisation; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <section
      className="snap-start h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `linear-gradient(${project.gradient})`, backgroundColor: "#0a0a0a" }}
    >
      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      />

      {/* Large mockup emoji */}
      <motion.div
        className="text-9xl md:text-[12rem] select-none z-10"
        aria-label={project.name}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {project.mockup}
      </motion.div>

      {/* Glass‑morphism info panel */}
      <motion.div
        className={`absolute ${isEven ? "right-8" : "left-8"} top-1/2 -translate-y-1/2 max-w-md w-full bg-white/5 backdrop-blur-xl rounded-xl p-6 text-center shadow-lg border border-white/10`}
        initial={{ opacity: 0, x: isEven ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
          {project.category}
        </p>
        <h2 className="text-3xl font-bold text-white mb-3">{project.name}</h2>
        <p className="text-base text-zinc-300 mb-4">{project.description}</p>
        <p className="border-l border-white/20 pl-4 text-zinc-400 mb-4">
          {project.approach}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {project.features.map((f: string) => (
            <span key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
              {f}
            </span>
          ))}
        </div>
        {/* Carousel of images */}
        <DesignCarousel slides={project.slides} accentGradient={project.gradient} projectKey={project.id} />
      </motion.div>
    </section>
  );
}
