"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OUTCOMES = [
  {
    title: "Visibilité locale",
    stat: "24/7",
    desc: "Trouvable sur Google quand un client cherche votre métier.",
    span: "col-span-1 row-span-1",
    tone: "bg-[#f0f4ff] border-[#dbeafe]",
  },
  {
    title: "Confiance immédiate",
    stat: "3 sec",
    desc: "Le temps qu'un visiteur forme une première impression crédible.",
    span: "col-span-1 row-span-2 md:col-start-2 md:row-start-1",
    tone: "bg-[#fafafa] border-zinc-200",
  },
  {
    title: "Contacts qualifiés",
    stat: "+ leads",
    desc: "Formulaire, WhatsApp, réservation — sans intermédiaire.",
    span: "col-span-1 row-span-1",
    tone: "bg-[#ecfdf5] border-[#bbf7d0]",
  },
  {
    title: "Image premium",
    stat: "↑",
    desc: "Vous vous positionnez au niveau de vos concurrents les mieux équipés.",
    span: "col-span-1 row-span-1 md:col-start-1 md:row-start-2",
    tone: "bg-[#fff7ed] border-[#fed7aa]",
  },
  {
    title: "Temps récupéré",
    stat: "− appels",
    desc: "Horaires, services, tarifs : les réponses sont déjà en ligne.",
    span: "col-span-1 row-span-1 md:col-start-3 md:row-start-2",
    tone: "bg-[#faf5ff] border-[#e9d5ff]",
  },
];

const MISTAKES = [
  {
    label: "01",
    title: "Compter uniquement sur Instagram",
    desc: "Les réseaux attirent. Un site convertit et vous appartient.",
  },
  {
    label: "02",
    title: "Laisser Google afficher un concurrent",
    desc: "Sans site, vous n'existez pas dans les recherches locales.",
  },
  {
    label: "03",
    title: "Répondre aux mêmes questions en boucle",
    desc: "Chaque appel « c'est combien ? » aurait pu être évité.",
  },
  {
    label: "04",
    title: "Paraître moins sérieux que la concurrence",
    desc: "Un prospect compare 3 entreprises en 2 minutes. Vous devez tenir la comparaison.",
  },
];

const TIMELINE = [
  {
    phase: "Semaine 1",
    title: "Premiers signaux",
    items: ["Site indexé sur Google", "Premiers clics depuis la recherche", "Partage du lien en confiance"],
  },
  {
    phase: "Mois 1",
    title: "Habitudes qui changent",
    items: ["Moins de questions répétitives", "Demandes plus qualifiées", "Image plus professionnelle perçue"],
  },
  {
    phase: "Mois 3+",
    title: "Effet cumulatif",
    items: ["Référencement local renforcé", "Bouche-à-oreille digital", "Actif qui travaille sans vous"],
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = value * eased;
      setDisplay(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : display}
      {suffix}
    </span>
  );
}

function BrowserMockup({
  variant,
  className = "",
}: {
  variant: "before" | "after";
  className?: string;
}) {
  const isAfter = variant === "after";

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-2xl ${isAfter ? "border-zinc-200 bg-white" : "border-zinc-300 bg-zinc-100"} ${className}`}
    >
      <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${isAfter ? "bg-zinc-50 border-zinc-100" : "bg-zinc-200/80 border-zinc-300"}`}>
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className={`ml-3 flex-1 h-6 rounded-md text-[10px] flex items-center px-2 truncate ${isAfter ? "bg-white border border-zinc-200 text-zinc-400" : "bg-zinc-300/60 text-zinc-500"}`}>
          {isAfter ? "votre-activite.fr" : "recherche-google.fr"}
        </div>
      </div>
      <div className={`p-4 sm:p-5 min-h-[140px] sm:min-h-[168px] ${isAfter ? "bg-white" : "bg-zinc-50"}`}>
        {isAfter ? (
          <div className="space-y-3">
            <div className="h-3 w-2/3 rounded-full bg-zinc-900" />
            <div className="h-2 w-full rounded-full bg-zinc-100" />
            <div className="h-2 w-5/6 rounded-full bg-zinc-100" />
            <div className="flex gap-2 pt-1">
              <div className="h-7 w-24 rounded-lg bg-zinc-900" />
              <div className="h-7 w-20 rounded-lg border border-zinc-200" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 border border-zinc-100" />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 opacity-70">
            <div className="h-2.5 w-1/2 rounded-full bg-zinc-300" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border border-zinc-200 bg-white p-2.5">
                <div className="h-2 w-3/4 rounded-full bg-blue-400/40 mb-1.5" />
                <div className="h-1.5 w-full rounded-full bg-zinc-200" />
              </div>
            ))}
            <p className="text-[10px] text-zinc-400 pt-1">Votre entreprise n&apos;apparaît pas…</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.35em] text-zinc-400 mb-4">
      {children}
    </p>
  );
}

function SerifHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-[family-name:var(--font-instrument-serif)] font-normal tracking-[-0.02em] text-zinc-950 ${className}`}
    >
      {children}
    </h2>
  );
}

export default function ResultsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const [compareTab, setCompareTab] = useState<"before" | "after">("before");

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-zinc-950 selection:bg-zinc-900 selection:text-white">
      <Header />

      {/* HERO — editorial, light, cinematic */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,0,0,0.04),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel>Résultats</SectionLabel>
            <h1 className="text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em] font-semibold max-w-5xl">
              Ce qu&apos;un site
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-500">
                change vraiment
              </span>
              <br />
              pour votre activité.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 sm:mt-10 max-w-xl text-lg sm:text-xl text-zinc-500 leading-relaxed"
          >
            Pas une liste de promesses marketing. Une présentation claire de ce que vous gagnez — et de ce que vous perdez en attendant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-400"
          >
            <motion.span
  animate={{ y: [0, 6, 0] }}
  transition={{
    repeat: Infinity,
    duration: isMobile ? 0.9 : 1.8,
    ease: "easeInOut",
  }}
  className="block w-px h-10 bg-zinc-300"
/>
            Défiler
          </motion.div>
        </motion.div>
      </section>

      {/* STATS STRIP — animated counters */}
      <section className="border-y border-zinc-200/80 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: 97, suffix: "%", label: "des consommateurs cherchent en ligne avant d'acheter" },
              { value: 75, suffix: "%", label: "jugent la crédibilité d'une entreprise sur son site" },
              { value: 88, suffix: "%", label: "des recherches locales aboutissent à un contact ou une visite" },
              { value: 24, suffix: "h", label: "par jour où votre vitrine peut travailler pour vous" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <p className="text-5xl sm:text-6xl font-semibold tracking-[-0.03em] text-zinc-950">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm sm:text-[15px] text-zinc-500 leading-relaxed max-w-[220px]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-[11px] text-zinc-400 tracking-wide">
            Données agrégées d&apos;études sectorielles (Google, Stanford, BrightLocal). Chiffres indicatifs.
          </p>
        </div>
      </section>

      {/* BEFORE / AFTER — comparison */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>Avant / Après</SectionLabel>
              <SerifHeading className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] mb-6">
                De invisible
                <br />
                à incontournable.
              </SerifHeading>
              <p className="text-zinc-500 text-lg leading-relaxed mb-8 max-w-md">
                Même activité, même talent — mais une présence en ligne qui rassure, informe et convertit.
              </p>

              {/* Mobile tab switcher */}
              <div className="flex lg:hidden gap-2 mb-6 p-1 rounded-full bg-zinc-100 w-fit">
                {(["before", "after"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setCompareTab(tab)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      compareTab === tab ? "bg-zinc-950 text-white" : "text-zinc-500"
                    }`}
                  >
                    {tab === "before" ? "Avant" : "Après"}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              {/* Desktop side by side */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-3">Avant</p>
                  <BrowserMockup variant="before" />
                  <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                    <li className="flex gap-2"><span className="text-red-400">×</span> Absent des recherches Google</li>
                    <li className="flex gap-2"><span className="text-red-400">×</span> Crédibilité difficile à prouver</li>
                    <li className="flex gap-2"><span className="text-red-400">×</span> Contacts uniquement par bouche-à-oreille</li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 mb-3">Après</p>
                  <BrowserMockup variant="after" />
                  <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                    <li className="flex gap-2"><span className="text-emerald-500">✓</span> Visible quand on vous cherche</li>
                    <li className="flex gap-2"><span className="text-emerald-500">✓</span> Première impression professionnelle</li>
                    <li className="flex gap-2"><span className="text-emerald-500">✓</span> Contact direct en un clic</li>
                  </ul>
                </motion.div>
              </div>

              {/* Mobile single view */}
              <div className="lg:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={compareTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <BrowserMockup variant={compareTab} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO — positive outcomes */}
      <section className="py-20 sm:py-28 bg-zinc-950 text-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 max-w-2xl"
          >
            <SectionLabel>Ce que vous gagnez</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
              Cinq résultats concrets,
              <span className="block font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400 mt-1">
                pas des promesses vagues.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 sm:gap-4 auto-rows-fr">
            {OUTCOMES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={`${item.span} group rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[180px]`}
              >
                <div>
                  <p className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90 mb-4">
                    {item.stat}
                  </p>
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 to-transparent group-hover:from-white/40 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISTAKES — bento grid light */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
            >
              <SectionLabel>Erreurs fréquentes</SectionLabel>
              <SerifHeading className="text-4xl sm:text-5xl leading-[1.05] mb-5">
                Ce que font les entreprises qui stagnent.
              </SerifHeading>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Ce ne sont pas des fautes graves — ce sont des choix qui coûtent silencieusement des clients chaque semaine.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {MISTAKES.map((mistake, i) => (
                <motion.article
                  key={mistake.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 hover:shadow-lg hover:shadow-zinc-200/50 hover:border-zinc-300 transition-all duration-300 ${i === 0 ? "sm:col-span-2" : ""}`}
                >
                  <span className="text-xs font-mono text-zinc-400">{mistake.label}</span>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-zinc-950 leading-snug">
                    {mistake.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{mistake.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RISK COMPARISON */}
      <section className="py-20 sm:py-28 bg-white border-y border-zinc-200/80">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <SectionLabel>Le vrai calcul</SectionLabel>
            <SerifHeading className="text-4xl sm:text-5xl leading-[1.05]">
              Investir coûte moins que ne rien faire.
            </SerifHeading>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border-2 border-red-100 bg-red-50/50 p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-red-400 mb-4">Sans site web</p>
              <ul className="space-y-4">
                {[
                  "Clients perdus au profit de concurrents visibles en ligne",
                  "Image amateur alors que votre travail est excellent",
                  "Dépendance totale au bouche-à-oreille et aux réseaux",
                  "Aucun actif digital qui prend de la valeur avec le temps",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                    <span className="text-red-400 shrink-0 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-6 border-t border-red-100 text-sm font-medium text-red-600/80">
                Coût réel : invisible, mais cumulatif chaque mois.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/40 p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 mb-4">Avec un site professionnel</p>
              <ul className="space-y-4">
                {[
                  "Présence 24h/24 sur le premier outil de recherche client",
                  "Crédibilité instantanée avant le premier appel",
                  "Canaux de contact multiples et mesurables",
                  "Un investissement unique qui sert votre activité longtemps",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm sm:text-[15px] text-zinc-700 leading-relaxed">
                    <span className="text-emerald-500 shrink-0 mt-0.5">+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-6 border-t border-emerald-100 text-sm font-medium text-emerald-700">
                Un seul client gagné peut amortir l&apos;investissement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 sm:mb-20"
          >
            <SectionLabel>Dans le temps</SectionLabel>
            <SerifHeading className="text-4xl sm:text-5xl leading-[1.05] max-w-2xl">
              Comment les résultats s&apos;installent progressivement.
            </SerifHeading>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-zinc-200" />

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
              {TIMELINE.map((step, i) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative"
                >
                  <div className="hidden lg:flex items-center justify-center w-4 h-4 rounded-full bg-zinc-950 border-4 border-[#fbfbfd] mx-auto mb-8 relative z-10" />
                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 h-full hover:shadow-xl hover:shadow-zinc-200/40 transition-shadow duration-300">
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">{step.phase}</p>
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">{step.title}</h3>
                    <ul className="space-y-3">
                      {step.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-zinc-500">
                          <span className="w-1 h-1 rounded-full bg-zinc-300 shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL PROOF — metric cards */}
      <section className="py-20 sm:py-28 bg-zinc-950 text-white overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionLabel>Preuves visuelles</SectionLabel>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight mb-6">
                Les chiffres que vos concurrents
                <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                  {" "}connaissent déjà.
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Un site n&apos;est pas une dépense décorative. C&apos;est votre meilleur commercial — celui qui ne prend jamais de congés.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: 3, suffix: "×", label: "plus de chances d'être contacté avec un site optimisé mobile" },
                { value: 46, suffix: "%", label: "des recherches Google visent une entreprise locale" },
                { value: 70, suffix: "%", label: "des PME disent que leur site génère des leads" },
                { value: 1, suffix: "", prefix: "<", label: "seconde — délai avant qu'un visiteur juge votre crédibilité", decimals: 0 },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 hover:bg-white/[0.07] transition-colors"
                >
                  <p className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    {card.prefix}
                    <AnimatedCounter value={card.value} suffix={card.suffix} />
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">{card.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — presentation-style */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-zinc-950 text-white px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_80%_20%,rgba(255,255,255,0.08),transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative max-w-3xl">
              <SectionLabel>Prochaine étape</SectionLabel>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] mb-6">
                Vous comprenez pourquoi
                <span className="block font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                  ça vaut le coup.
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl">
                Commencez par un échange gratuit. Analyse, maquette et devis — sans engagement, sans pression.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all hover:scale-[1.02] text-sm sm:text-base"
                >
                  Obtenir un devis gratuit
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all text-sm sm:text-base"
                >
                  Voir des projets réels
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
