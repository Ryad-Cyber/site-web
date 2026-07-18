"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

export type CarouselSlide = {
  label: string;
  caption: string;
  type: "photo" | "mockup" | "outcome" | "video";
  src?: string;
  alt?: string;
  variant?: "barber" | "restaurant" | "fitness" | "saas" | "services";
  metrics?: { value: string; label: string }[];
};

type DesignCarouselProps = {
  slides: CarouselSlide[];
  accentGradient: string;
  projectKey: number;
};

const SWIPE_THRESHOLD = 50;
const AUTOPLAY_MS = 6000;

function WebsiteMockup({ variant }: { variant: CarouselSlide["variant"] }) {
  const [imageError, setImageError] = useState(false);

  const themes = {
    barber: {
      bg: "from-zinc-900 via-zinc-800 to-amber-950/40",
      accent: "bg-amber-400",
      title: "Studio Barber",
      nav: ["Services", "Galerie", "Réserver"],
      cta: "Prendre RDV",
    },
    restaurant: {
      bg: "from-zinc-950 via-red-950/30 to-zinc-900",
      accent: "bg-rose-400",
      title: "Restauration",
      nav: ["Menu", "Réservation", "Galerie"],
      cta: "Réserver une table",
    },
    fitness: {
      bg: "from-zinc-950 via-emerald-950/30 to-zinc-900",
      accent: "bg-lime-400",
      title: "Fit Studio",
      nav: ["Programmes", "Coaching", "Tarifs"],
      cta: "Commencer",
    },
    saas: {
      bg: "from-zinc-950 via-blue-950/40 to-zinc-900",
      accent: "bg-sky-400",
      title: "Web Studio",
      nav: ["Projets", "Analytiques", "Équipe"],
      cta: "Nouveau projet",
    },
    services: {
      bg: "from-zinc-950 via-violet-950/40 to-zinc-900",
      accent: "bg-violet-400",
      title: "Services Pro",
      nav: ["Services", "Réalisations", "Devis"],
      cta: "Devis gratuit",
    },
  };

  const theme = themes[variant ?? "barber"];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-[92%] rounded-xl border border-white/15 bg-zinc-950/90 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/10 bg-white/5">
          <span className="w-2 h-2 rounded-full bg-red-400/80" />
          <span className="w-2 h-2 rounded-full bg-amber-400/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
          <div className="ml-2 flex-1 h-5 rounded-md bg-white/5 border border-white/10" />
        </div>
        <div className={`relative p-5 sm:p-7 bg-gradient-to-br ${theme.bg} min-h-[220px] sm:min-h-[260px]`}>
          {variant === "barber" && !imageError ? (
            <Image
              src="/barber_interface.png"
              alt="Barber shop interface"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className={`h-2 w-20 rounded-full ${theme.accent} opacity-90`} />
                <div className="flex gap-3">
                  {theme.nav.map((item) => (
                    <span key={item} className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider hidden sm:inline">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-lg sm:text-2xl font-semibold text-white tracking-tight mb-2">{theme.title}</p>
              <p className="text-[11px] sm:text-xs text-white/45 max-w-[80%] leading-relaxed mb-6">
                Interface premium, mobile-first, conçue pour convertir chaque visiteur en client.
              </p>
              <div className="flex gap-2 mb-6">
                <span className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold text-zinc-950 ${theme.accent}`}>
                  {theme.cta}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium text-white/70 border border-white/15">
                  En savoir plus
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function OutcomeOverlay({
  slide,
  accentGradient,
}: {
  slide: CarouselSlide;
  accentGradient: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="absolute inset-0">
      {slide.src && !imageError && (
        <Image
          src={slide.src}
          alt={slide.alt ?? slide.caption}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
          unoptimized={slide.src.startsWith('http')}
          onError={() => setImageError(true)}
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${accentGradient} opacity-30 mix-blend-overlay`} />

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-sm">
          {(slide.metrics ?? []).map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
              className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-3 py-3 sm:px-4 sm:py-4"
            >
              <p className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">{metric.value}</p>
              <p className="text-[10px] sm:text-xs text-white/60 mt-0.5">{metric.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-sm sm:text-base text-white/80 max-w-xs leading-relaxed">{slide.caption}</p>
      </div>
    </div>
  );
}

export default function DesignCarousel({ slides, accentGradient, projectKey }: DesignCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + slides.length) % slides.length);
    },
    [index, slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    setIndex(0);
    setDirection(0);
  }, [projectKey]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next, index]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  const slide = slides[index];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, scale: 0.96 }),
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-pink-500/5 rounded-3xl blur-3xl" />

      <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden aspect-square">
        {/* Slide label */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-zinc-950/60 backdrop-blur-md text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {slide.label}
          </span>
        </div>

        {/* Progress dots */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Carousel viewport */}
        <motion.div
          className="absolute inset-0 touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={`${projectKey}-${index}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              {slide.type === "photo" && slide.src && (
                <div className="relative w-full h-full overflow-hidden rounded-3xl bg-zinc-950/70">
                  <Image
                    src={slide.src}
                    alt={slide.alt ?? slide.caption}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    unoptimized={slide.src.startsWith('http')}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${accentGradient} opacity-20 mix-blend-overlay`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-sm sm:text-base text-white/90 max-w-xs leading-relaxed">{slide.caption}</p>
                  </div>
                </div>
              )}

              {slide.type === "video" && slide.src && (
                <div className="relative w-full h-full">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain scale-90"
                    onError={(e) => {
                      const video = e.currentTarget;
                      video.style.display = "none";
                      const parent = video.parentElement;
                      if (parent) {
                        const fallback = document.createElement("div");
                        fallback.className = "absolute inset-0 flex items-center justify-center text-zinc-400 text-sm";
                        fallback.textContent = "Vidéo non disponible";
                        parent.appendChild(fallback);
                      }
                    }}
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${accentGradient} opacity-20 mix-blend-overlay`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-sm sm:text-base text-white/90 max-w-xs leading-relaxed">
  Un site pensé pour générer des clients,{" "}
  <span className="text-white font-medium">pas juste des visites</span>
</p>
                  </div>
                </div>
              )}

              {slide.type === "mockup" && (
                <div className={`relative w-full h-full bg-gradient-to-br ${accentGradient}`}>
                  <WebsiteMockup variant={slide.variant} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-zinc-950/90 to-transparent">
                    <p className="text-sm sm:text-base text-white/90 max-w-xs leading-relaxed">{slide.caption}</p>
                  </div>
                </div>
              )}

              {slide.type === "outcome" && (
                <OutcomeOverlay slide={slide} accentGradient={accentGradient} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Autoplay progress bar */}
        {!isPaused && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
            <motion.div
              key={`${projectKey}-${index}-progress`}
              className="h-full bg-gradient-to-r from-blue-400 to-violet-400 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          </div>
        )}

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Image précédente"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-zinc-950/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-zinc-950/80 hover:text-white hover:border-white/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Image suivante"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-zinc-950/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-zinc-950/80 hover:text-white hover:border-white/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
