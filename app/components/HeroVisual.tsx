"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SLIDES = [
  {
    top: "/maison.jpeg",
    bottom: "/site_immobilier.jpeg",
    topAlt: "Villa d'architecte luxueuse de standing",
    bottomAlt: "Maquette d'interface web pour agence immobilière premium",
  },
  {
    top: "/vetment.jpeg",
    bottom: "/site_vetment.png",
    topAlt: "Vêtements haut de gamme exposés en boutique",
    bottomAlt: "Conception de site e-commerce de mode et prêt-à-porter",
  },
  {
    top: "/location_car.jpeg",
    bottom: "/site_car.jpeg",
    topAlt: "Voiture de sport moderne et luxueuse",
    bottomAlt: "Application web responsive de réservation de véhicules de prestige",
  },
  {
    top: "/salon_beaute.jpeg",
    bottom: "/site_salon.jpeg",
    topAlt: "Intérieur élégant et épuré d'un salon de coiffure et beauté",
    bottomAlt: "Site internet professionnel de prise de rendez-vous pour salon esthétique",
  },
];

export default function HeroVisual() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[1/1.1] max-w-[480px] mx-auto flex flex-col gap-4 sm:gap-6 justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full grid grid-rows-2 gap-4 sm:gap-6"
        >
          {/* Top Image Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] group bg-zinc-900/40">
            <Image
              src={slide.top}
              alt={slide.topAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Bottom Image Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] group bg-zinc-900/40">
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
