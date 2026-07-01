"use client";

import { useRef, type CSSProperties, type MouseEvent } from "react";

const FLOATING_CARDS = [
  {
    label: "+42% réservations",
    sub: "Barbershop Studio",
    position: "left-0 top-8 sm:top-10",
    delay: "0s",
  },
  {
    label: "48h preview",
    sub: "Livraison soignée",
    position: "right-0 top-1/3",
    delay: "0.5s",
  },
  {
    label: "100% mobile",
    sub: "Expérience fluide",
    position: "left-2 bottom-4 sm:bottom-8",
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
    el.style.setProperty("--parallax-x", `${x * 8}px`);
    el.style.setProperty("--parallax-y", `${y * 8}px`);
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
      className="relative h-[430px] sm:h-[500px]"
      style={{ "--parallax-x": "0px", "--parallax-y": "0px" } as CSSProperties}
    >
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)] shadow-[0_30px_120px_-40px_rgba(0,0,0,0.9)]" />

      <div className="absolute inset-x-4 top-6 bottom-8 rounded-[1.75rem] border border-white/10 bg-zinc-900/80 p-3 sm:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl" style={{ transform: `translate3d(var(--parallax-x), var(--parallax-y), 0)` }}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-zinc-400">
            Studio
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">Visuel principal</p>
                <h3 className="mt-2 text-lg font-semibold text-white">Une présence en ligne pensée pour convertir</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                Premium
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1rem] border border-white/10 bg-zinc-950/70 p-3">
                <div className="h-2.5 w-20 rounded-full bg-white/15" />
                <div className="mt-3 h-24 rounded-[0.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]" />
                <div className="mt-3 flex gap-2">
                  <div className="h-8 flex-1 rounded-full bg-white/10" />
                  <div className="h-8 w-8 rounded-full bg-white/10" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Réservation</p>
                  <p className="mt-2 text-sm text-zinc-300">Contact, prise de rendez-vous, visibilité locale.</p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] p-3">
                  <div className="h-2 w-16 rounded-full bg-white/15" />
                  <div className="mt-3 flex items-end gap-2">
                    <div className="h-10 w-3 rounded-full bg-white/15" />
                    <div className="h-14 w-3 rounded-full bg-white/10" />
                    <div className="h-7 w-3 rounded-full bg-white/15" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">Résultat</p>
              <p className="mt-3 text-3xl font-semibold text-white">+43%</p>
              <p className="mt-1 text-sm text-zinc-400">Taux de conversion sur la première semaine</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">Approche</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
                <div>
                  <p className="text-sm text-white">Maquette & développement</p>
                  <p className="text-sm text-zinc-400">Clair, rapide, efficace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {FLOATING_CARDS.map((card) => (
        <div
          key={card.label}
          className={`absolute ${card.position} z-10 max-w-[170px] rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 shadow-[0_18px_50px_-25px_rgba(0,0,0,0.75)] backdrop-blur-xl`}
          style={{ animationDelay: card.delay }}
        >
          <p className="text-sm font-semibold text-white">{card.label}</p>
          <p className="mt-0.5 text-xs text-zinc-400">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
