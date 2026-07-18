"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PROJECTS } from "../../lib/projects-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOLD = 5200;

// « Autre » n'est pas un métier : il sert de sortie à l'atelier, pas d'entrée du sélecteur
const SECTORS = PROJECTS.filter((p) => p.name !== "Autre");
const OTHER = PROJECTS.find((p) => p.name === "Autre");

const ENGAGEMENTS = ["Premier aperçu sous 48h", "En ligne en 7 à 14 jours", "Devis et maquette gratuits"];

// Le média du secteur : première slide du projet, vidéo ou photo
function SectorMedia({ sector }: { sector: (typeof SECTORS)[number] }) {
  const slide = sector.slides[0];
  const src = slide.src as string;
  const isRemote = typeof src === "string" && src.startsWith("http");

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-zinc-900 aspect-[4/3]">
      <AnimatePresence mode="sync">
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1, ease: EASE },
            scale: { duration: HOLD / 1000 + 1, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          {slide.type === "video" ? (
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={src}
              alt={slide.alt || `Univers ${sector.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover"
              unoptimized={isRemote}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.5rem]" />
    </div>
  );
}

// ACTE 2 + 3 — l'atelier : index des métiers à gauche, fiche qui se recompose à droite
function SectorWorkshop() {
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const reduce = useReducedMotion();

  // Défilement auto — définitivement arrêté dès que le visiteur choisit son métier
  useEffect(() => {
    if (reduce || locked) return;
    const t = setTimeout(() => setIndex((v) => (v + 1) % SECTORS.length), HOLD);
    return () => clearTimeout(t);
  }, [reduce, locked, index]);

  const active = SECTORS[index];

  const pick = (i: number) => {
    setLocked(true);
    setIndex(i);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Index des métiers */}
      <div className="lg:col-span-5">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Votre métier</p>

        {/* Desktop — liste verticale façon sommaire */}
        <ul className="mt-8 hidden lg:flex lg:flex-col">
          {SECTORS.map((sector, i) => {
            const isActive = i === index;
            return (
              <li key={sector.id}>
                <button
                  onClick={() => pick(i)}
                  aria-current={isActive}
                  className="group relative block w-full py-3.5 text-left"
                >
                  <span
                    className={`text-lg tracking-[-0.01em] transition-colors duration-500 ${
                      isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  >
                    {sector.name}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-zinc-200" />
                  {isActive && (
                    <motion.span
                      key={`${sector.id}-bar`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: locked || reduce ? 0.5 : HOLD / 1000,
                        ease: locked || reduce ? EASE : "linear",
                      }}
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-zinc-950"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile — rail horizontal */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTORS.map((sector, i) => (
            <button
              key={sector.id}
              onClick={() => pick(i)}
              aria-current={i === index}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                i === index
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 text-zinc-500"
              }`}
            >
              {sector.name}
            </button>
          ))}
        </div>
      </div>

      {/* Fiche métier */}
      <div className="lg:col-span-7">
        <SectorMedia sector={active} />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{active.category}</p>

            {/* Ce que vous vivez */}
            <p className="mt-6 text-xl sm:text-2xl font-semibold leading-[1.3] tracking-[-0.02em] text-zinc-950">
              {active.challenge}
            </p>

            {/* Ce que le site doit accomplir */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-500">
              {active.approach}
            </p>

            {/* Pensé pour vous */}
            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">Pensé pour vous</p>
              <div className="mt-5 flex flex-col">
                {active.needs.map((need, i) => (
                  <motion.div
                    key={need.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.5, ease: EASE }}
                    className="border-t border-zinc-200 py-4 first:border-t-0 first:pt-0"
                  >
                    <p className="text-[15px] font-medium text-zinc-950">{need.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">{need.note}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function WhyUsPage() {
  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">
        {/* ACTE 1 — Hero manifeste */}
        <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0a0a0b] text-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/3 h-[560px] w-[560px] rounded-full bg-white/[0.05] blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-white/[0.035] blur-[130px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 py-32">
            <motion.p
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="text-xs uppercase tracking-[0.3em] text-zinc-500"
            >
              Le studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              className="mt-8 text-4xl sm:text-5xl lg:text-[4.5rem] font-semibold leading-[1.03] tracking-[-0.035em]"
            >
              On ne découvre pas
              <br />
              votre métier
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                le jour du devis
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
              className="mt-10 max-w-lg text-base sm:text-lg leading-relaxed text-zinc-400"
            >
              Chaque activité a ses contraintes, ses urgences et sa manière d'attirer des clients.
              Voici comment nous les avons déjà pensées, secteur par secteur.
            </motion.p>

            {/* Indice de scroll — pas de CTA ici, il arrive à la fin */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="mt-16 flex items-center gap-3 text-xs tracking-wide text-zinc-600"
            >
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
                aria-hidden
              >
                ↓
              </motion.span>
              Trouvez votre métier
            </motion.div>
          </div>
        </section>

        {/* ACTE 2 + 3 — L'atelier sectoriel */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.95, ease: EASE }}
            className="mb-16 max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950">
              Votre secteur,
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                déjà imaginé
              </span>
            </h2>
          </motion.div>

          <SectorWorkshop />

          {/* ACTE 3.5 — la sortie élégante */}
          {OTHER && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-24 border-t border-zinc-200 pt-10 text-lg leading-relaxed text-zinc-500"
            >
              Votre métier n'est pas dans la liste ?{" "}
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-950">
                C'est souvent là que les projets les plus intéressants commencent.
              </span>
            </motion.p>
          )}
        </section>

        {/* ACTE 4 — Conclusion */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-32 md:pb-44 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold leading-[1.06] tracking-[-0.03em] text-zinc-950">
              On a déjà imaginé
              <br />
              votre métier.
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                Parlons du vôtre.
              </span>
            </h2>

            <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-7 py-3.5 font-medium tracking-tight text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                Demander un devis gratuit
              </a>
              <a
                href="tel:+33749635085"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-7 py-3.5 font-medium tracking-tight text-zinc-950 transition-colors duration-300 hover:border-zinc-950"
              >
                Appeler directement
              </a>
            </div>

            {/* Engagements — une seule ligne discrète, plus une grille */}
            <p className="mt-8 text-xs text-zinc-400 tracking-wide">
              {ENGAGEMENTS.join(" · ")}
            </p>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}
