"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const SLIDES = [
  {
    type: "Immobilier",
    color: "from-blue-500/30 to-cyan-500/20",
    label: "Génération de leads immobiliers",
    metric: "+38% demandes de contact",
    top: "/maison.jpeg",
    bottom: "/site_immobilier.jpeg",
    topAlt: "Villa d'architecte luxueuse de standing",
    bottomAlt: "Maquette d'interface web pour agence immobilière premium",
  },
  {
    type: "Mode",
    color: "from-purple-500/30 to-pink-500/20",
    label: "E-commerce haute conversion",
    metric: "+52% ventes en ligne",
    top: "/vetment.jpeg",
    bottom: "/site_vetment.png",
    topAlt: "Vêtements haut de gamme exposés en boutique",
    bottomAlt: "Conception de site e-commerce de mode et prêt-à-porter",
  },
  {
    type: "Automobile",
    color: "from-red-500/30 to-orange-500/20",
    label: "Réservation premium véhicules",
    metric: "+41% réservations",
    top: "/location_car.jpeg",
    bottom: "/site_car.jpeg",
    topAlt: "Voiture de sport moderne et luxueuse",
    bottomAlt: "Application web responsive de réservation de véhicules de prestige",
  },
  {
    type: "Beauté",
    color: "from-emerald-500/30 to-green-500/20",
    label: "Réservations automatisées",
    metric: "+63% rendez-vous",
    top: "/salon_beaute.jpeg",
    bottom: "/site_salon.jpeg",
    topAlt: "Intérieur élégant et épuré d'un salon de coiffure et beauté",
    bottomAlt: "Site internet professionnel de prise de rendez-vous pour salon esthétique",
  },
];

export default function HeroVisual() {
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
const y = useMotionValue(0);

const rotateX = useTransform(y, [-300, 300], [8, -8]);
const rotateY = useTransform(x, [-300, 300], [-8, 8]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, [x, y]);

  const slide = SLIDES[index];
  const activeColor = slide.color;
  return (
    <div className="relative w-full overflow-visible aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[1/1.1] max-w-[480px] mx-auto flex flex-col gap-4 sm:gap-6 justify-center">
      <div className="absolute inset-0 flex items-center justify-center -z-10">
      <div
  className={`w-[500px] h-[500px] bg-gradient-to-r ${activeColor} blur-[120px] rounded-full animate-pulse opacity-70`}
/>
    </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
  key={index}
  initial={{ opacity: 0, scale: 0.96, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.96, y: -20 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  style={{
    rotateX,
    rotateY,
    transformPerspective: 1000,
  }}
  className="w-full h-full grid grid-rows-2 gap-4 sm:gap-6"
>
          {/* Top Image Container */}
          <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] group bg-zinc-900/40">
            <Image
              src={slide.top}
              alt={slide.topAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
>
  <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl px-5 py-4 shadow-2xl">
    <p className="text-xs uppercase tracking-[0.2em] text-white/50">
      {slide.type}
    </p>

    <p className="mt-2 text-lg font-semibold text-white">
      {slide.metric}
    </p>

    <p className="mt-1 text-sm text-white/70">
      {slide.label}
    </p>
  </div>
</motion.div>
          {/* Bottom Image Container */}
          <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] group bg-zinc-900/40">
            <Image
              src={slide.bottom}
              alt={slide.bottomAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
