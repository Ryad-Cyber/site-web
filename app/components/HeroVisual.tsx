"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => {
      // autoplay peut être bloqué (économie de données, politique navigateur) — pas bloquant, la vidéo reste affichée en pause
    });
  }, [shouldLoad]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[560px] mx-auto aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[1/1.1] overflow-hidden rounded-3xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] bg-zinc-900"
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
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
    </motion.div>
  );
}
