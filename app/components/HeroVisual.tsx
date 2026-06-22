"use client";

import { useRef, type CSSProperties, type MouseEvent } from "react";

const FLOATING_CARDS = [
  {
    label: "+40% conversions",
    sub: "Restaurant Le Palmier",
    gradient: "from-amber-400/30 to-orange-500/20",
    position: "top-0 -left-4 md:-left-8",
    delay: "0s",
  },
  {
    label: "48h preview",
    sub: "Livraison express",
    gradient: "from-violet-400/30 to-purple-500/20",
    position: "top-1/3 -right-2 md:-right-6",
    delay: "0.5s",
  },
  {
    label: "100% mobile",
    sub: "Design responsive",
    gradient: "from-cyan-400/30 to-blue-500/20",
    position: "bottom-8 -left-2 md:left-0",
    delay: "1s",
  },
];

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--parallax-x", `${x * 12}px`);
    el.style.setProperty("--parallax-y", `${y * 12}px`);
  }

  function handleMouseLeave() {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--parallax-x", "0px");
    el.style.setProperty("--parallax-y", "0px");
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[420px] md:h-[520px] hero-parallax"
      style={{ "--parallax-x": "0px", "--parallax-y": "0px" } as CSSProperties}
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-pink-500/20 blur-3xl rounded-full scale-110" />

      {/* Parallax layer */}
      <div className="hero-parallax-layer absolute inset-x-4 top-8 bottom-16">
      {/* Main browser mockup */}
      <div className="h-full rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-violet-500/10 transition-transform duration-500 hover:scale-[1.02]">
        <div className="h-11 border-b border-white/10 flex items-center gap-2 px-4 bg-white/5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
          <div className="ml-4 flex-1 h-6 rounded-md bg-white/5 border border-white/5" />
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-32 rounded-full bg-gradient-to-r from-white/20 to-white/5" />
              <div className="h-2 w-48 rounded-full bg-white/10" />
            </div>
            <div className="h-8 w-24 rounded-lg bg-gradient-to-r from-violet-500/40 to-blue-500/40" />
          </div>

          {/* Media grid */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${
                  i % 3 === 0
                    ? "from-blue-500/25 to-cyan-500/15"
                    : i % 3 === 1
                      ? "from-violet-500/25 to-purple-500/15"
                      : "from-pink-500/20 to-rose-500/15"
                } border border-white/5 hover:scale-105 transition-transform duration-300`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="h-16 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
              <span className="text-xs text-emerald-300 font-medium">+127 leads</span>
            </div>
            <div className="h-16 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
              <span className="text-xs text-blue-300 font-medium">98 PageSpeed</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Floating stat cards */}
      {FLOATING_CARDS.map((card) => (
        <div
          key={card.label}
          className={`absolute ${card.position} z-10 animate-float glass-card px-4 py-3 rounded-2xl border border-white/15 shadow-xl max-w-[160px]`}
          style={{ animationDelay: card.delay }}
        >
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-60`} />
          <div className="relative">
            <p className="text-sm font-bold text-white">{card.label}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{card.sub}</p>
          </div>
        </div>
      ))}

      {/* Decorative ring */}
      <div className="absolute bottom-4 right-8 w-20 h-20 rounded-full border border-white/10 animate-spin-slow" />
    </div>
  );
}
