"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  TARIFS_PLANS,
  SOCLE,
  COMPARE_GROUPS,
  type Cell,
} from "../../lib/tarifs-data";

const EASE = [0.22, 1, 0.36, 1] as const;

// Grille commune à l'en-tête sticky et au corps — les colonnes restent alignées
const GRID = "grid grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]";

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Rendu d'une cellule : coche (inclus), tiret (absent), texte (nature différente)
function CellContent({ cell, dark }: { cell: Cell; dark: boolean }) {
  if (cell === true) {
    return <CheckIcon className={dark ? "text-white" : "text-zinc-900"} />;
  }
  if (cell === false) {
    return <span className={dark ? "text-zinc-700" : "text-zinc-300"}>—</span>;
  }
  return (
    <span
      className={`text-[13px] font-medium leading-snug ${
        dark ? "text-white" : "text-zinc-900"
      }`}
    >
      {cell}
    </span>
  );
}

// FAQ courte — reprend mot pour mot des engagements déjà publiés ailleurs
const MINI_FAQ = [
  {
    q: "Combien de temps pour être en ligne ?",
    a: "Entre 7 et 14 jours selon la formule choisie. Vous recevez une maquette sous 48 h après notre premier échange, puis nous affinons ensemble avant la mise en ligne.",
  },
  {
    q: "Puis-je demander des modifications ?",
    a: "Bien sûr. Des rounds de révisions sont inclus à chaque étape clé : maquette, contenu et mise en page. Le site doit vous correspondre avant la livraison.",
  },
  {
    q: "Quand faut-il payer ?",
    a: "L'analyse, la maquette et la proposition sont gratuites. Le paiement intervient uniquement après validation de votre projet.",
  },
];

export default function TarifsView() {
  const [mobilePlan, setMobilePlan] = useState(1); // Business pré-sélectionné

  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">
        {/* HERO court — on vient ici pour comparer, pas pour rêver */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Tarifs</p>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.06] tracking-[-0.03em] text-zinc-950">
              Trois packs,
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                une progression claire
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-zinc-500">
              Chaque niveau reprend tout le précédent et y ajoute une couche. Comparez ligne par
              ligne, choisissez ce dont votre activité a besoin.
            </p>
            <p className="mt-6 text-xs tracking-wide text-zinc-400">
              Chaque pack comprend : {SOCLE.join(" · ")}
            </p>
          </motion.div>
        </section>

        {/* CARTES — la décision doit pouvoir se prendre sans lire le tableau */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 md:pb-28">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3 items-stretch">
            {TARIFS_PLANS.map((plan, index) => {
              const dark = plan.featured;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                  className={`relative flex flex-col rounded-2xl p-6 sm:p-8 ${
                    dark
                      ? "border border-zinc-950 bg-zinc-950 text-white lg:scale-[1.03]"
                      : "border border-zinc-200 bg-white"
                  }`}
                >
                  {dark && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-zinc-950 px-3.5 py-1 text-[11px] font-medium tracking-wide text-white">
                      Recommandé
                    </span>
                  )}
                  <h2
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                      dark ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    {plan.name}
                  </h2>
                  <p className={`mt-3 text-base font-medium tracking-tight ${dark ? "text-white" : "text-zinc-950"}`}>
                    {plan.desc}
                  </p>
                  <p className="mt-5 text-3xl font-semibold tracking-[-0.03em]">
                    <span className={`mr-1.5 align-middle text-xs font-normal ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                      dès
                    </span>
                    {plan.price}
                    <span className={`ml-1 text-sm font-normal ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                      TTC
                    </span>
                  </p>
                  <p className={`mt-6 flex-1 text-sm leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
                    {plan.addsLabel} : {plan.features.map((f) => f.t.toLowerCase()).join(", ")}.
                  </p>
                  <a
                    href="/#contact"
                    className={`mt-8 block rounded-full py-3 text-center text-sm font-medium tracking-tight transition-colors ${
                      dark
                        ? "bg-white text-zinc-950 hover:bg-zinc-100"
                        : "bg-zinc-950 text-white hover:bg-zinc-800"
                    }`}
                  >
                    Demander un devis gratuit
                  </a>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* COMPARAISON — desktop : colonnes avec en-tête sticky */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-36">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-zinc-950"
          >
            Comparer{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
              en détail
            </span>
          </motion.h2>

          {/* ---------- Desktop ---------- */}
          <div className="mt-10 hidden lg:block">
            {/* En-tête sticky : noms + prix restent visibles pendant le parcours du tableau */}
            <div
              className={`${GRID} sticky top-[4.5rem] z-10 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-sm`}
            >
              <div />
              {TARIFS_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`px-5 py-5 ${
                    plan.featured ? "rounded-t-2xl bg-zinc-950 text-white" : ""
                  }`}
                >
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      plan.featured ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    {plan.name.replace("Pack ", "")}
                    {plan.featured && (
                      <span className="ml-2 rounded-full border border-white/15 px-2 py-0.5 text-[9px] font-medium normal-case tracking-wide text-zinc-300">
                        Recommandé
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 text-xl font-semibold tracking-[-0.02em]">
                    <span className={`mr-1 text-[10px] font-normal ${plan.featured ? "text-zinc-500" : "text-zinc-400"}`}>
                      dès
                    </span>
                    {plan.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Corps */}
            {COMPARE_GROUPS.map((group, gi) => (
              <div key={group.title}>
                {/* Titre de groupe — la colonne Business reste sombre pour un bandeau continu */}
                <div className={GRID}>
                  <p className="pt-10 pb-3 text-xs uppercase tracking-[0.3em] text-zinc-400">
                    {group.title}
                  </p>
                  {TARIFS_PLANS.map((plan) => (
                    <div key={plan.name} className={plan.featured ? "bg-zinc-950" : ""} />
                  ))}
                </div>

                {group.rows.map((row, ri) => {
                  const isLastCell =
                    gi === COMPARE_GROUPS.length - 1 && ri === group.rows.length - 1;
                  return (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={GRID}
                    >
                      <div className="border-t border-zinc-200 py-4 pr-6">
                        <p className="text-sm font-medium text-zinc-950">{row.label}</p>
                        {row.note && (
                          <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                            {row.note}
                          </p>
                        )}
                      </div>
                      {row.cells.map((cell, ci) => {
                        const dark = TARIFS_PLANS[ci].featured;
                        return (
                          <div
                            key={ci}
                            className={`flex items-center px-5 py-4 ${
                              dark
                                ? `border-t border-white/10 bg-zinc-950 ${
                                    isLastCell ? "rounded-b-2xl" : ""
                                  }`
                                : "border-t border-zinc-200"
                            }`}
                          >
                            <CellContent cell={cell} dark={dark} />
                          </div>
                        );
                      })}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ---------- Mobile : sélecteur de pack + liste ---------- */}
          <div className="mt-10 lg:hidden">
            {/* Sélecteur segmenté */}
            <div className="grid grid-cols-3 gap-1 rounded-full border border-zinc-200 bg-white p-1">
              {TARIFS_PLANS.map((plan, i) => (
                <button
                  key={plan.name}
                  onClick={() => setMobilePlan(i)}
                  aria-pressed={mobilePlan === i}
                  className={`rounded-full py-2.5 text-center transition-colors duration-300 ${
                    mobilePlan === i ? "bg-zinc-950 text-white" : "text-zinc-500"
                  }`}
                >
                  <span className="block text-xs font-medium">
                    {plan.name.replace("Pack ", "")}
                  </span>
                  <span
                    className={`block text-[10px] ${
                      mobilePlan === i ? "text-zinc-400" : "text-zinc-400"
                    }`}
                  >
                    dès {plan.price}
                  </span>
                </button>
              ))}
            </div>

            {/* Contenu du pack sélectionné */}
            <div className="mt-8">
              {COMPARE_GROUPS.map((group) => (
                <div key={group.title} className="mt-8 first:mt-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                    {group.title}
                  </p>
                  <ul className="mt-4">
                    {group.rows.map((row) => {
                      const cell = row.cells[mobilePlan];
                      const included = cell !== false;
                      return (
                        <li
                          key={row.label}
                          className="flex items-start gap-3 border-t border-zinc-200 py-3.5 first:border-t-0"
                        >
                          <span className="mt-0.5">
                            {included ? (
                              <CheckIcon className="text-zinc-900" />
                            ) : (
                              <span className="block w-4 text-center text-zinc-300">—</span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span
                              className={`block text-sm font-medium ${
                                included ? "text-zinc-950" : "text-zinc-400"
                              }`}
                            >
                              {row.label}
                              {typeof cell === "string" && (
                                <span className="ml-2 text-[12px] font-normal text-zinc-500">
                                  {cell}
                                </span>
                              )}
                            </span>
                            {row.note && included && (
                              <span className="mt-0.5 block text-[13px] leading-relaxed text-zinc-500">
                                {row.note}
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <a
                href="/#contact"
                className="mt-10 block rounded-full bg-zinc-950 py-3.5 text-center text-sm font-medium tracking-tight text-white transition-colors hover:bg-zinc-800"
              >
                Demander un devis gratuit — {TARIFS_PLANS[mobilePlan].name.replace("Pack ", "")}
              </a>
            </div>
          </div>
        </section>

        {/* MINI FAQ */}
        <section className="border-t border-zinc-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
            <div className="grid gap-10 md:grid-cols-3">
              {MINI_FAQ.map((item, i) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-zinc-950">
                    {item.q}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-500">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-24 md:py-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950">
              Un doute sur
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                le bon pack ?
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-zinc-500">
              Décrivez votre activité, je vous recommande le niveau adapté — gratuitement, sans
              engagement.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
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
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}
