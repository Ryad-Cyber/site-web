"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DiagnosticForm from "../components/DiagnosticForm";

const EASE = [0.22, 1, 0.36, 1] as const;

// Les signes — le visiteur doit se reconnaître, jamais se sentir jugé
const SIGNES = [
  "Votre site semble ancien face à ceux de vos concurrents.",
  "Il est difficile à utiliser sur téléphone.",
  "Les visiteurs ne trouvent pas rapidement les bonnes informations.",
  "Il reçoit peu de demandes de contact.",
  "Il ne reflète plus votre niveau actuel.",
];

// Les trois verdicts — des conclusions d'analyse, pas des offres.
// Le troisième a le même poids que les deux autres : c'est lui qui
// rend les recommandations payantes crédibles.
const VERDICTS = [
  {
    title: "On repart de zéro",
    desc: "Quand le site actuel ne peut plus porter votre image, le reconstruire coûte moins cher que de le rafistoler. Un site refait reste un site créé : les packs s'appliquent tels quels.",
  },
  {
    title: "On transforme ce qui existe",
    desc: "Quand la base est bonne mais que certains éléments doivent évoluer : le design, la lisibilité sur téléphone, la structure, la vitesse, la facilité à vous contacter. Intervention ciblée, sur devis.",
  },
  {
    title: "On ne touche à rien",
    desc: "Si votre site fonctionne encore, nous vous le dirons — et vous repartirez sans rien dépenser. C'est ce qui rend les deux autres recommandations crédibles.",
  },
];

// Ce que le diagnostic regarde — cinq points précis, jamais un audit complet
const DIAGNOSTIC_POINTS = [
  "L'affichage sur téléphone",
  "La vitesse d'ouverture",
  "La clarté du premier écran",
  "La facilité à vous contacter",
  "Votre présence sur Google",
];

export default function RefonteView() {
  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">
        {/* HERO — sombre, typographique */}
        <section className="relative min-h-[88svh] flex items-center overflow-hidden bg-[#0a0a0b] text-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 left-1/3 h-[520px] w-[520px] rounded-full bg-white/[0.05] blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-white/[0.035] blur-[130px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 py-32">
            <motion.p
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="text-xs uppercase tracking-[0.3em] text-zinc-500"
            >
              Refonte &amp; transformation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="mt-8 text-4xl sm:text-5xl lg:text-[4rem] font-semibold leading-[1.05] tracking-[-0.03em]"
            >
              Votre site existe déjà.
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                Voyons ce qu&apos;il peut devenir.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="mt-9 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400"
            >
              Lent, daté, difficile à utiliser ou peu efficace ? Avant de tout refaire, regardons
              ce qui doit réellement changer — parfois tout, parfois presque rien.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#diagnostic"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-medium tracking-tight text-zinc-950 transition-transform duration-300 hover:scale-[1.02]"
              >
                Obtenir un diagnostic gratuit
              </a>
              <a
                href="tel:+33749635085"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 font-medium tracking-tight text-white transition-colors duration-300 hover:bg-white/[0.06]"
              >
                Parler directement à un expert
              </a>
            </motion.div>
          </div>
        </section>

        {/* LES SIGNES — reconnaissance sans humiliation */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Les signes</p>
            <h2 className="mt-6 text-3xl sm:text-4xl font-semibold leading-[1.15] tracking-[-0.03em] text-zinc-950">
              Votre site était peut-être parfait à sa création.{" "}
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                Votre activité, elle, a évolué.
              </span>
            </h2>
          </motion.div>

          <ul className="mt-14 flex flex-col">
            {SIGNES.map((signe, i) => (
              <motion.li
                key={signe}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className="flex items-baseline gap-5 border-t border-zinc-200 py-5 first:border-t-0"
              >
                <span className="text-xs tabular-nums tracking-[0.2em] text-zinc-400">
                  0{i + 1}
                </span>
                <span className="text-base sm:text-lg text-zinc-700">{signe}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-12 max-w-xl text-lg leading-relaxed text-zinc-500"
          >
            Un site n&apos;est pas forcément mauvais.{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic text-zinc-950">
              Il peut simplement ne plus correspondre à votre activité actuelle.
            </span>
          </motion.p>
        </section>

        {/* LES TROIS VERDICTS — la signature */}
        <section className="border-t border-zinc-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 md:py-36">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.95, ease: EASE }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Après analyse</p>
              <h2 className="mt-6 text-3xl sm:text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-zinc-950">
                Refonte complète, amélioration ciblée
                <br />
                <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                  — ou rien du tout
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-500">
                Nous ne présentons pas trois offres. Nous présentons les trois conclusions
                possibles d&apos;une analyse honnête de votre site.
              </p>
            </motion.div>

            <div className="mt-16 flex flex-col">
              {VERDICTS.map((verdict, i) => (
                <motion.div
                  key={verdict.title}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.85, delay: i * 0.08, ease: EASE }}
                  className="border-t border-zinc-200 py-10 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <span className="text-xs tabular-nums tracking-[0.2em] text-zinc-400">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-zinc-950">
                    {verdict.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500">
                    {verdict.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mt-16 font-[family-name:var(--font-instrument-serif)] text-2xl sm:text-3xl italic leading-snug text-zinc-950"
            >
              Parfois, la meilleure recommandation est de ne rien changer.
            </motion.p>
          </div>
        </section>

        {/* LE DIAGNOSTIC — sombre, méthode en trois temps */}
        <section className="bg-zinc-950 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 md:py-36">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Le diagnostic</p>
              <h2 className="mt-6 text-3xl sm:text-4xl font-semibold leading-[1.12] tracking-[-0.03em]">
                Vous envoyez l&apos;adresse.
                <br />
                <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                  Nous vous disons la vérité.
                </span>
              </h2>
            </motion.div>

            <div className="mt-14 grid gap-y-10 md:grid-cols-2 md:gap-x-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                  Ce que nous regardons
                </p>
                <ul className="mt-5 flex flex-col">
                  {DIAGNOSTIC_POINTS.map((point, i) => (
                    <li
                      key={point}
                      className="flex items-baseline gap-4 border-t border-white/10 py-3.5 first:border-t-0"
                    >
                      <span className="text-xs tabular-nums tracking-[0.2em] text-zinc-600">
                        0{i + 1}
                      </span>
                      <span className="text-[15px] text-zinc-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                  Ce que vous recevez
                </p>
                <p className="mt-5 text-base leading-relaxed text-zinc-400">
                  Quelques points concrets, expliqués simplement — pas un rapport de quarante
                  pages, pas un devis déguisé. Notre avis honnête sur ce qui mérite de changer,
                  sous 24h, gratuitement et sans engagement.
                </p>
                <a
                  href="#diagnostic"
                  className="group mt-8 inline-flex items-center gap-2.5 text-sm font-medium text-white transition-colors hover:text-zinc-400"
                >
                  Envoyer l&apos;adresse de mon site
                  <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-white/60">
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* LA SUITE — continuité tarifaire, pas de seconde grille */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Et ensuite</p>
            <h2 className="mt-6 text-3xl sm:text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-zinc-950">
              Un site refait reste
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                un site créé
              </span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-500">
              Une refonte complète suit les mêmes packs que la création — Essentiel, Business ou
              Premium, sans grille cachée. Une amélioration ciblée fait l&apos;objet d&apos;une
              intervention personnalisée, sur devis.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-8">
              <a
                href="/tarifs"
                className="group inline-flex items-center gap-2.5 text-sm font-medium text-zinc-950 transition-colors hover:text-zinc-500"
              >
                Voir les packs
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 transition-colors duration-300 group-hover:border-zinc-950">
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a
                href="/creation-site-internet"
                className="group inline-flex items-center gap-2.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950"
              >
                Vous partez de zéro ? Création de site
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 transition-colors duration-300 group-hover:border-zinc-950">
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* CONVERSION — formulaire sur place */}
        <section id="diagnostic" className="bg-[#0a0a0b] text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-36">
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.95, ease: EASE }}
                className="lg:sticky lg:top-32"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Diagnostic gratuit
                </p>
                <h2 className="mt-6 text-3xl sm:text-4xl lg:text-[3rem] font-semibold leading-[1.08] tracking-[-0.03em]">
                  Voyons ce que votre site
                  <br />
                  <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                    peut devenir
                  </span>
                </h2>
                <p className="mt-7 max-w-md text-base leading-relaxed text-zinc-400">
                  Collez l&apos;adresse de votre site, nous faisons le reste. Vous recevez notre
                  regard honnête sous 24h — même si la réponse est « ne changez rien ».
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="glass-card rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/30 md:p-8"
              >
                <DiagnosticForm />
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
