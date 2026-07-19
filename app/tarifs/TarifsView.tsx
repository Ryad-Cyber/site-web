"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TIERS, inheritanceLabel } from "../../lib/tarifs-data";

const EASE = [0.22, 1, 0.36, 1] as const;

function Check() {
  return (
    <svg
      className="mt-1 h-[15px] w-[15px] shrink-0 text-zinc-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Ligne de prestation : « prestation — précision », la précision en retrait
function TierItem({ item }: { item: string }) {
  const [main, detail] = item.split(" — ");
  return (
    <li className="flex items-start gap-3 py-2.5">
      <Check />
      <span className="text-sm leading-relaxed">
        <span className="font-medium text-zinc-950">{main}</span>
        {detail && <span className="text-zinc-500"> — {detail}</span>}
      </span>
    </li>
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
  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">
        {/* HERO court */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Tarifs</p>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.06] tracking-[-0.03em] text-zinc-950">
              Trois offres,
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                une lecture simple
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-zinc-500">
              Chaque niveau reprend tout le précédent et y ajoute des éléments. Rien à décoder,
              rien à recouper.
            </p>
          </motion.div>
        </section>

        {/* LES TROIS OFFRES — colonnes additives */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-36">
          <div className="grid md:grid-cols-3 md:divide-x md:divide-zinc-200">
            {TIERS.map((tier, index) => {
              const inherit = inheritanceLabel(index);
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
                  className="border-t border-zinc-200 py-10 first:border-t-0 first:pt-0 md:border-t-0 md:py-0 md:px-8 md:first:pl-0 md:last:pr-0"
                >
                  {/* Tête d'offre */}
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-950">
                      {tier.name}
                    </h2>
                    {tier.featured && (
                      <span className="rounded-full bg-zinc-950 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white">
                        Recommandé
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-base font-medium tracking-tight text-zinc-950">
                    {tier.positioning}
                  </p>

                  <p className="mt-5 text-3xl font-semibold tracking-[-0.03em]">
                    <span className="mr-1.5 align-middle text-xs font-normal text-zinc-400">
                      dès
                    </span>
                    {tier.price}
                    <span className="ml-1 text-sm font-normal text-zinc-400">TTC</span>
                  </p>

                  {/* CTA en tête — Business est le seul bouton plein */}
                  <a
                    href="/#contact"
                    className={`mt-6 block rounded-full py-3 text-center text-sm font-medium tracking-tight transition-colors ${
                      tier.featured
                        ? "bg-zinc-950 text-white hover:bg-zinc-800"
                        : "border border-zinc-300 text-zinc-950 hover:border-zinc-950"
                    }`}
                  >
                    Demander un devis gratuit
                  </a>

                  {/* Ligne d'héritage — la seule respiration serif de la section */}
                  {inherit && (
                    <p className="mt-8 font-[family-name:var(--font-instrument-serif)] text-lg italic text-zinc-500">
                      {inherit}
                    </p>
                  )}

                  {/* Prestations */}
                  <ul className={inherit ? "mt-3" : "mt-8"}>
                    {tier.items.map((item) => (
                      <TierItem key={item} item={item} />
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-14 text-center text-sm text-zinc-500">
            Chaque projet est unique : le prix dépend de vos besoins et objectifs.
          </p>
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
