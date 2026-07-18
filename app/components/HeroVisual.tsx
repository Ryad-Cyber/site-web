"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    setShouldLoad(true);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => {
      // autoplay peut être bloqué (économie de données, politique navigateur) — pas bloquant, la vidéo reste affichée en pause
    });
  }, [shouldLoad]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-0"
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          src="/videos/hero-animation.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      )}

      {/* Overlay — assure la lisibilité du texte sans masquer la vidéo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,transparent,rgba(0,0,0,0.45))]" />
    </motion.div>
  );
}
