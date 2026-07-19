"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlanCard from "../components/PlanCard";
import {
  TARIFS_PLANS,
  SOCLE,
  COMPARE_GROUPS,
  type Cell,
} from "../../lib/tarifs-data";

const EASE = [0.22, 1, 0.36, 1] as const;

// Grille commune à l'en-tête sticky et au corps — colonnes alignées
const GRID = "grid grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]";

function Check({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      className={`h-[15px] w-[15px] shrink-0 ${muted ? "text-zinc-400" : "text-zinc-900"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Cellule : tiret (absent), 1-3 coches (profondeur), coche + supplément (texte)
function CellContent({ cell }: { cell: Cell }) {
  if (cell === 0) {
    return <span className="text-zinc-300">—</span>;
  }
  if (typeof cell === "number") {
    return (
      <span className="flex items-center gap-1">
        {Array.from({ length: cell }).map((_, i) => (
          <Check key={i} />
        ))}
      </span>
    );
  }
  return (
    <span className="flex flex-col items-center gap-1 text-center">
      <Check />
      <span className="text-[12px] font-medium leading-snug text-zinc-600">+ {cell}</span>
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
              Chaque niveau reprend tout le précédent et y ajoute de la profondeur. Comparez
              ligne par ligne, choisissez ce dont votre activité a besoin.
            </p>
            <p className="mt-6 text-xs tracking-wide text-zinc-400">
              Chaque pack comprend : {SOCLE.join(" · ")}
            </p>
          </motion.div>
        </section>

        {/* CARTES — la décision doit pouvoir se prendre sans lire le tableau */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-32">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3 items-stretch">
            {TARIFS_PLANS.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
              >
                <PlanCard plan={plan} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* COMPARAISON PROGRESSIVE */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24 md:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-zinc-950">
              Comparer{" "}
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                en détail
              </span>
            </h2>
            <p className="mt-3 text-sm text-zinc-500">
              Le nombre de coches indique la profondeur de la prestation à chaque niveau.
            </p>
          </motion.div>

          {/* ---------- Desktop ---------- */}
          <div className="mt-12 hidden lg:block">
            {/* En-tête sticky — léger : noms et prix, rien de plus */}
            <div
              className={`${GRID} sticky top-[4.5rem] z-10 border-b border-zinc-200 bg-zinc-50/95 py-4 backdrop-blur-sm`}
            >
              <div />
              {TARIFS_PLANS.map((plan) => (
                <div key={plan.name} className="px-4 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-950">
                    {plan.name.replace("Pack ", "")}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">dès {plan.price}</p>
                  {plan.featured && (
                    <p className="mt-0.5 text-[10px] tracking-wide text-zinc-400">Recommandé</p>
                  )}
                </div>
              ))}
            </div>

            {/* Corps — beaucoup d'air, filets fins, cellules centrées */}
            {COMPARE_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="pt-14 pb-4 text-xs uppercase tracking-[0.3em] text-zinc-400">
                  {group.title}
                </p>

                {group.rows.map((row) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`${GRID} border-t border-zinc-200/70`}
                  >
                    <div className="py-5 pr-8">
                      <p className="text-sm font-medium text-zinc-950">{row.label}</p>
                      {row.note && (
                        <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                          {row.note}
                        </p>
                      )}
                    </div>
                    {row.cells.map((cell, ci) => (
                      <div key={ci} className="flex items-center justify-center px-4 py-5">
                        <CellContent cell={cell} />
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Rappel CTA en pied de tableau */}
            <div className={`${GRID} mt-2 border-t border-zinc-200`}>
              <div />
              {TARIFS_PLANS.map((plan) => (
                <div key={plan.name} className="px-4 pt-6 text-center">
                  <a
                    href="/#contact"
                    className={`inline-block w-full rounded-full py-2.5 text-[13px] font-medium tracking-tight transition-colors ${
                      plan.featured
                        ? "bg-zinc-950 text-white hover:bg-zinc-800"
                        : "border border-zinc-300 text-zinc-950 hover:border-zinc-950"
                    }`}
                  >
                    Choisir {plan.name.replace("Pack ", "")}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Mobile : sélecteur de pack + liste ---------- */}
          <div className="mt-10 lg:hidden">
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
                  <span className="block text-[10px] text-zinc-400">dès {plan.price}</span>
                </button>
              ))}
            </div>

            <div className="mt-8">
              {COMPARE_GROUPS.map((group) => (
                <div key={group.title} className="mt-9 first:mt-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{group.title}</p>
                  <ul className="mt-3">
                    {group.rows.map((row) => {
                      const cell = row.cells[mobilePlan];
                      const included = cell !== 0;
                      return (
                        <li
                          key={row.label}
                          className="flex items-start justify-between gap-4 border-t border-zinc-200/70 py-3.5 first:border-t-0"
                        >
                          <span className="min-w-0">
                            <span
                              className={`block text-sm font-medium ${
                                included ? "text-zinc-950" : "text-zinc-400"
                              }`}
                            >
                              {row.label}
                            </span>
                            {typeof cell === "string" && (
                              <span className="mt-0.5 block text-[12px] text-zinc-500">
                                + {cell}
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 shrink-0">
                            {cell === 0 ? (
                              <span className="text-zinc-300">—</span>
                            ) : typeof cell === "number" ? (
                              <span className="flex items-center gap-1">
                                {Array.from({ length: cell }).map((_, i) => (
                                  <Check key={i} />
                                ))}
                              </span>
                            ) : (
                              <Check />
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
                Choisir {TARIFS_PLANS[mobilePlan].name.replace("Pack ", "")} — dès{" "}
                {TARIFS_PLANS[mobilePlan].price}
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
