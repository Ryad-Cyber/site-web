"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useAnimation, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Chatbot from "./components/Chatbot";
import HeroVisual from "./components/HeroVisual";
import { TIERS, cumulativeItems } from "../lib/tarifs-data";
import PlanCard from "./components/PlanCard";

const WHATSAPP_URL =
  "https://wa.me/33749635085?text=Bonjour, j'aimerais un site web pour mon activité";

// Système de titres de section — cohérent avec la DA du Hero (Instrument Serif italique)
function SectionHeading({
  label,
  title,
  subtitle,
  tone = "dark",
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <>
      <p className={`text-xs uppercase tracking-[0.3em] ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
        {label}
      </p>
      <h2 className={`mt-4 text-2xl sm:text-3xl font-semibold tracking-[-0.02em] leading-[1.12] ${isLight ? "text-white" : "text-zinc-950"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
          {subtitle}
        </p>
      )}
    </>
  );
}


const FAQ_ITEMS = [
  {
    q: "Combien de temps pour avoir mon site en ligne ?",
    a: "Entre 7 et 14 jours selon la formule choisie. Vous recevez une maquette sous 48 h après notre premier échange, puis nous affinons ensemble avant le développement et la mise en ligne.",
  },
  {
    q: "Le devis est-il vraiment gratuit ?",
    a: "Oui, sans aucune condition. Nous échangeons sur votre projet, j'analyse vos besoins et vous propose une solution adaptée — vous décidez ensuite, sans pression ni engagement.",
  },
  {
    q: "Puis-je demander des modifications ?",
    a: "Bien sûr. Des rounds de révisions sont inclus à chaque étape clé : maquette, contenu et mise en page. L'objectif est que le site vous corresponde parfaitement avant la livraison.",
  },
  {
    q: "Mon site sera-t-il adapté au mobile ?",
    a: "Oui, chaque site est conçu mobile en priorité. Il s'affiche correctement sur smartphone, tablette et ordinateur, avec une navigation fluide et des temps de chargement optimisés.",
  },
  {
    q: "Puis-je modifier le contenu moi-même ?",
    a: "Oui. Je vous forme à la gestion de base (textes, images, horaires). Pour des changements plus avancés ou des ajouts de fonctionnalités, je reste disponible sur demande.",
  },
  {
    q: "L'hébergement est-il compris dans les packs ?",
    a: "Non, l'hébergement et le nom de domaine restent à votre nom et ne sont pas compris dans les packs. Je m'occupe de la mise en ligne et de toute la configuration technique — certificat de sécurité, performance, sauvegardes — pour que vous n'ayez rien à gérer. Vous restez propriétaire de votre site et de vos accès.",
  },
  {
    q: "Est-ce qu'on me trouvera sur Google ?",
    a: "Oui, c'est prévu dès la conception. Chaque site est construit pour être trouvé dans votre ville : une structure claire, des pages rapides et les informations dont Google a besoin pour vous proposer aux clients proches de chez vous. Si vous souhaitez aller plus loin, un accompagnement dédié à votre visibilité locale peut être ajouté.",
  },
  {
    q: "Que se passe-t-il après la livraison ?",
    a: "Votre site est mis en ligne et testé. Je vous remets les accès, un guide rapide et reste disponible pour le support. Des forfaits de maintenance optionnels existent pour garder le site à jour.",
  },
  {
    q: "Comment démarrons-nous ensemble ?",
    a: "Remplissez le formulaire de contact ou écrivez-moi sur WhatsApp. Nous planifions un échange gratuit, je vous envoie une proposition sur mesure, et nous lançons dès votre validation.",
  },
];


function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-y border-zinc-200">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.q} className="border-b border-zinc-200 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
            >
              <span
                className={`text-base font-medium leading-snug transition-colors duration-300 ${
                  isOpen ? "text-zinc-950" : "text-zinc-700 group-hover:text-zinc-950"
                }`}
              >
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 text-xl font-light leading-none text-zinc-400 group-hover:text-zinc-900 transition-colors"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-8 text-sm text-zinc-500 leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// Scroll reveal wrapper component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Vraies réalisations présentées dans le showcase Services
const SERVICES_SHOWCASE = [
  { src: "/site_vetment.png", name: "Boutique de mode", url: "boutique-mode.fr" },
  { src: "/site_gym.jpeg", name: "Coach sportif", url: "coach-sportif.fr" },
  { src: "/site_immobilier.jpeg", name: "Immobilier", url: "agence-immo.fr" },
  { src: "/site_salon.jpeg", name: "Salon de beauté", url: "salon-beaute.fr" },
];

const SERVICES = [
  { title: "Site Web", desc: "Interface moderne qui donne confiance et convertit vos visiteurs." },
  { title: "Mobile", desc: "WhatsApp, appels et réservations en un clic." },
  { title: "Google", desc: "Apparaissez dans les recherches locales de votre ville." },
];

// Cadre navigateur premium sur-mesure — chrome minimaliste monochrome
function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3 h-10 px-4 border-b border-zinc-100 bg-zinc-50/70">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
        </span>
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] text-zinc-400">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          {url}
        </span>
        <span className="w-[42px] shrink-0" />
      </div>
      <div className="relative aspect-[16/10] bg-zinc-100">{children}</div>
    </div>
  );
}

// Showcase Services — vraies captures qui se succèdent dans le cadre premium
function ServicesShowcase() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setIndex((v) => (v + 1) % SERVICES_SHOWCASE.length),
      2600
    );
    return () => clearInterval(t);
  }, [reduce]);

  const active = SERVICES_SHOWCASE[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-4xl"
    >
      {/* halo doux */}
      <div className="absolute -inset-x-10 -bottom-10 top-12 -z-10 rounded-[3rem] bg-zinc-200/50 blur-3xl" />

      <BrowserFrame url={active.url}>
        {SERVICES_SHOWCASE.map((project, i) => (
          <motion.div
            key={project.src}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={project.src}
              alt={`Réalisation Ryad Web Studio — ${project.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-top"
            />
          </motion.div>
        ))}

        {/* légende */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={active.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-white"
            >
              {active.name}
            </motion.p>
          </AnimatePresence>
        </div>
      </BrowserFrame>

      {/* indicateurs */}
      <div className="mt-5 flex justify-center gap-2">
        {SERVICES_SHOWCASE.map((project, i) => (
          <button
            key={project.name}
            onClick={() => setIndex(i)}
            aria-label={`Voir la réalisation ${project.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Univers clients — ce que le client obtient au-delà du site : une identité complète
// `hold` = temps d'affichage en ms. Les images défilent vite (rythme portfolio),
// les vidéos gardent leur propre respiration pour que le plan ait le temps d'exister.
const UNIVERS = [
  { type: "video", src: "/video_barber.mp4", name: "Barbershop", tag: "Univers & signature", hold: 4600 },
  { type: "image", src: "/salon_beaute.jpeg", name: "Salon de beauté", tag: "Identité & branding", hold: 3000 },
  { type: "video", src: "/video_resto.mp4", name: "Restaurant", tag: "Ambiance & storytelling", hold: 4600 },
  { type: "image", src: "/vetment.jpeg", name: "Boutique de mode", tag: "Direction artistique", hold: 3000 },
  { type: "video", src: "/video_maison.mp4", name: "Immobilier", tag: "Mise en valeur des biens", hold: 4600 },
  { type: "video", src: "/video_loca.mp4", name: "Location de véhicules", tag: "Expérience premium", hold: 5400 },
] as const;

// Showcase cinématique — un univers à la fois, fondu lent + dérive d'échelle
function UniversShowcase() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const active = UNIVERS[index];
  const hold = active.hold;

  // Minuterie relancée à chaque plan : chaque univers tient sa propre durée
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setIndex((v) => (v + 1) % UNIVERS.length), hold);
    return () => clearTimeout(t);
  }, [reduce, index, hold]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center"
    >
      {/* Narration — 5/12 : la légende sort du média et vit ici */}
      <div className="lg:col-span-5">
        <SectionHeading
          tone="light"
          label="Univers de marque"
          title={
            <>
              Vous ne repartez pas avec un site, mais avec{" "}
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                un univers complet
              </span>
            </>
          }
          subtitle="Identité visuelle, direction artistique et ambiance : chaque détail est pensé pour que vos clients ressentent la qualité avant même de vous rencontrer."
        />

        {/* Index des univers — sommaire vertical avec barre de progression */}
        <ul className="mt-10 flex flex-col">
          {UNIVERS.map((item, i) => {
            const isActive = i === index;
            return (
              <li key={item.src}>
                <button
                  onClick={() => setIndex(i)}
                  className="group relative block w-full py-3 text-left"
                  aria-label={`Voir l'univers ${item.name}`}
                  aria-current={isActive}
                >
                  <span
                    className={`text-sm tracking-tight transition-colors duration-500 ${
                      isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`ml-3 text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? "text-zinc-500" : "text-transparent"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
                  {isActive && (
                    <motion.span
                      key={`${item.src}-progress`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduce ? 0 : hold / 1000, ease: "linear" }}
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-white"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <a
          href="/realisations"
          className="group mt-10 inline-flex items-center gap-2.5 text-sm font-medium text-white transition-colors hover:text-zinc-400"
        >
          Voir les univers en détail
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
      </div>

      {/* Média — 7/12, ratio 4/3 : hauteur réduite, effet cinématique conservé */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-zinc-900 aspect-[4/3]">
          <AnimatePresence mode="sync">
            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: hold / 1000 + 1.1, ease: "linear" },
              }}
              className="absolute inset-0"
            >
              {active.type === "video" ? (
                <video
                  src={active.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={active.src}
                  alt={`Univers de marque — ${active.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// NOTRE EXIGENCE — galerie sombre : quatre erreurs courantes démontrées
// typographiquement, puis corrigées. Pas de cartes, pas d'icônes —
// le texte lui-même commet l'erreur avant de la réparer.
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;

// Phase de démonstration : l'erreur s'installe à l'entrée dans le viewport,
// la correction prend le relais après `delay`. Reduced motion = correction directe.
function useDemoPhase(delay: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [corrected, setCorrected] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCorrected(true);
      return;
    }
    const t = setTimeout(() => setCorrected(true), delay);
    return () => clearTimeout(t);
  }, [inView, reduce, delay]);

  return { ref, started: inView, corrected };
}

function RefusalHeading({ index, label }: { index: string; label: string }) {
  return (
    <p className="flex items-baseline gap-4">
      <span className="text-xs tabular-nums tracking-[0.2em] text-zinc-600">{index}</span>
      <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">{label}</span>
    </p>
  );
}

// 01 — La mêmeté : la même phrase clonée, puis une seule voix qui reste
function RefusalTemplates() {
  const { ref, started, corrected } = useDemoPhase(1600);
  return (
    <div ref={ref}>
      <RefusalHeading index="01" label="Les sites interchangeables" />
      <div className="mt-8 space-y-1.5">
        {[0.5, 0.4, 0.3].map((peak, i) => (
          <motion.p
            key={i}
            initial={false}
            animate={{ opacity: started ? (corrected ? 0.09 : peak) : 0, y: started ? 0 : 10 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
            className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] leading-tight text-zinc-400"
          >
            Le même site que tout le monde.
          </motion.p>
        ))}
      </div>
      <motion.p
        initial={false}
        animate={{
          opacity: corrected ? 1 : 0,
          y: corrected ? 0 : 14,
          filter: corrected ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mt-8 font-[family-name:var(--font-instrument-serif)] text-4xl italic leading-[1.12] text-white sm:text-6xl"
      >
        Le vôtre ne ressemblera qu&apos;à vous.
      </motion.p>
    </div>
  );
}

// 02 — L'illisible : la phrase composée mal, puis dépliée proprement
function RefusalLisibilite() {
  const { ref, started, corrected } = useDemoPhase(1800);
  return (
    <div ref={ref}>
      <RefusalHeading index="02" label="Les pages illisibles" />
      <div className="mt-8 grid">
        <motion.p
          initial={false}
          animate={{
            opacity: started && !corrected ? 0.7 : 0,
            filter: corrected ? "blur(5px)" : "blur(0px)",
          }}
          transition={{ duration: 0.6, ease: EASE }}
          className="[grid-area:1/1] max-w-[270px] self-center text-justify text-[11px] leading-[1.2] tracking-tight text-zinc-500"
        >
          chaque mot doit pouvoir se lire sans effort, chaque information doit se trouver en un
          regard, sinon le visiteur plisse les yeux, referme la page, retourne sur google et
          appelle quelqu&apos;un d&apos;autre sans jamais vous le dire
        </motion.p>
        <motion.p
          initial={false}
          animate={{
            opacity: corrected ? 1 : 0,
            y: corrected ? 0 : 14,
            filter: corrected ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.9, ease: EASE }}
          className="[grid-area:1/1] font-[family-name:var(--font-instrument-serif)] text-4xl italic leading-[1.12] text-white sm:text-6xl"
        >
          Le vôtre se lira sans effort.
        </motion.p>
      </div>
    </div>
  );
}

// 03 — La lenteur : un squelette de chargement, puis la phrase qui claque net
function RefusalVitesse() {
  const { ref, started, corrected } = useDemoPhase(1200);
  return (
    <div ref={ref}>
      <RefusalHeading index="03" label="Les sites lents" />
      <div className="mt-8 grid">
        {/* l'attente est la démonstration — jamais plus d'une seconde */}
        <motion.div
          initial={false}
          animate={{ opacity: started && !corrected ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="[grid-area:1/1] space-y-3 self-center"
        >
          <motion.div
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-4/5 rounded-md bg-zinc-800 sm:h-14"
          />
          <motion.div
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
            className="h-10 w-1/2 rounded-md bg-zinc-800 sm:h-14"
          />
        </motion.div>
        {/* la correction apparaît sans transition — c'est le propos */}
        <motion.p
          initial={false}
          animate={{ opacity: corrected ? 1 : 0 }}
          transition={{ duration: 0.05 }}
          className="[grid-area:1/1] font-[family-name:var(--font-instrument-serif)] text-4xl italic leading-[1.12] text-white sm:text-6xl"
        >
          Le vôtre répondra au premier geste.
        </motion.p>
      </div>
    </div>
  );
}

// 04 — Le climax : composition centrée, halo discret, la plus grande
// correction de la séquence — puis le seul bouton de la section,
// conséquence naturelle. La démonstration finale : donner envie, ici même.
function RefusalDesir() {
  const { ref, started, corrected } = useDemoPhase(1400);
  return (
    <div ref={ref} className="relative pt-8 text-center md:pt-14">
      {/* Halo — n'existe que derrière le climax : l'œil traverse
          l'obscurité et arrive dans la lumière au moment du CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[120px]"
      />

      <div className="relative">
        <p className="flex items-baseline justify-center gap-4">
          <span className="text-xs tabular-nums tracking-[0.2em] text-zinc-600">04</span>
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Les sites qui ne donnent pas envie d&apos;appeler
          </span>
        </p>

        <motion.p
          initial={false}
          animate={{ opacity: started ? (corrected ? 0.35 : 0.7) : 0, y: started ? 0 : 10 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-xl font-semibold leading-tight tracking-[-0.02em] text-zinc-400 sm:text-2xl"
        >
          Un site peut être joli et ne rien déclencher.
        </motion.p>

        <motion.p
          initial={false}
          animate={{
            opacity: corrected ? 1 : 0,
            y: corrected ? 0 : 16,
            filter: corrected ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-8 font-[family-name:var(--font-instrument-serif)] text-4xl italic leading-[1.08] text-white sm:text-6xl md:text-7xl"
        >
          Le vôtre donnera envie.
        </motion.p>

        <motion.div
          initial={false}
          animate={{
            opacity: corrected ? 1 : 0,
            y: corrected ? 0 : 16,
            scale: corrected ? 1 : 0.96,
          }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="mt-11"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium tracking-tight text-zinc-950 transition-transform duration-300 hover:scale-[1.02]"
          >
            Et si on parlait du vôtre ?
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">

        {/* HERO */}
        <section
          id="home"
          className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0a0a0b] text-white"
        >
          <HeroVisual />

          <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm text-xs sm:text-sm text-zinc-200 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              Ryad Web Studio
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold leading-[1.05] tracking-[-0.02em]"
            >
              Des sites web qui
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-200">
                transforment vos visiteurs
              </span>
              <br />
              en clients
            </motion.h1>

            {/* TEXT */}
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed"
            >
              Sites web modernes pour entreprises locales qui veulent plus d’appels, de réservations et de visibilité sur Google.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-zinc-950 font-medium tracking-tight hover:scale-[1.02] transition-transform duration-300"
              >
                Demander un devis gratuit
              </a>
            </motion.div>

            {/* Élément de confiance */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.2 }}
              className="mt-5 text-xs text-zinc-400 tracking-wide"
            >
              Réponse sous 24h · Devis gratuit · Sans engagement
            </motion.p>
          </div>
        </section>

        {/* Bandeau — marquee minimaliste */}
        <section className="w-full overflow-hidden border-y border-zinc-200/80">
          <motion.div
            className="flex whitespace-nowrap py-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
          >
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0" aria-hidden={group === 1}>
                {[
                  "Plus d'appels",
                  "Plus de clients",
                  "Plus de rendez-vous",
                  "Faites croître votre activité",
                  "Plus d'appels",
                  "Plus de clients",
                  "Plus de rendez-vous",
                  "Faites croître votre activité",
                ].map((item, index) => (
                  <span
                    key={`${group}-${item}-${index}`}
                    className="flex items-center text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-400"
                  >
                    <span className="px-6">{item}</span>
                    <span className="text-zinc-300">·</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </section>

        {/* SERVICES */}
        <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionHeading
              label="Systèmes digitaux"
              title={
                <>
                  On crée des sites qui{" "}
                  <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-500">
                    génèrent des clients
                  </span>
                </>
              }
              subtitle="Sites web, mobile et Google optimisés pour transformer vos visiteurs en clients."
            />
          </div>

          {/* Showcase premium — vraies réalisations */}
          <ServicesShowcase />

          {/* Les 3 leviers — présentation minimale, sans cartes */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-y-8 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-zinc-200">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="sm:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <span className="text-xs tabular-nums text-zinc-400">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* UNIVERS — ce que le client obtient au-delà du site */}
        <section className="bg-zinc-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36">
            <UniversShowcase />
          </div>
        </section>

        {/* TARIFS */}
        <section id="tarifs" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionHeading
                label="Tarifs"
                title={
                  <>
                    Des offres{" "}
                    <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-500">
                      claires
                    </span>
                    , sans surprise
                  </>
                }
                subtitle="Analyse, maquette et proposition gratuites. Le paiement intervient uniquement après validation de votre projet."
              />
            </div>

            {/* items-start : hauteurs naturelles — pas d'étirement qui creuserait
                un vide dans l'Essentiel ; l'escalier 7→10→13 dit la montée en gamme */}
            <div className="grid md:grid-cols-3 gap-5 sm:gap-6 items-start">
              {TIERS.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PlanCard tier={tier} items={cumulativeItems(index)} />
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="/tarifs"
                className="group inline-flex items-center gap-2.5 text-sm font-medium text-zinc-950 transition-colors hover:text-zinc-500"
              >
                Comparer les packs en détail
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
              <p className="mt-5 text-sm text-zinc-500">
                Chaque projet est unique : le prix dépend de vos besoins et objectifs.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* NOTRE EXIGENCE — galerie sombre : quatre erreurs démontrées, puis corrigées */}
        <section className="bg-[#0a0a0b] text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 md:py-40">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Notre exigence</p>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-[3rem] font-semibold leading-[1.08] tracking-[-0.03em]">
                Une certaine idée du
                <br />
                <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                  travail bien fait
                </span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
                Quatre erreurs que l&apos;on croise partout. Regardez-les disparaître.
              </p>
            </motion.div>

            <div className="mt-24 space-y-24 md:mt-32 md:space-y-36">
              <RefusalTemplates />
              <RefusalLisibilite />
              <RefusalVitesse />
              <RefusalDesir />
            </div>

            {/* Pont vers la preuve — /why-us */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-24 border-t border-white/10 pt-10 md:mt-32"
            >
              <p className="text-lg leading-relaxed text-zinc-400">
                Voici ce que nous refusons.{" "}
                <span className="font-[family-name:var(--font-instrument-serif)] italic text-white">
                  Voici ce que nous faisons à la place.
                </span>
              </p>
              <a
                href="/why-us"
                className="group mt-8 inline-flex items-center gap-2.5 text-sm font-medium text-white transition-colors hover:text-zinc-400"
              >
                Découvrir notre approche
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
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-8">
              <SectionHeading
                label="FAQ"
                title={
                  <>
                    Questions{" "}
                    <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-500">
                      fréquentes
                    </span>
                  </>
                }
                subtitle="Tout ce qu'il faut savoir avant de lancer votre projet."
              />
            </div>
          </ScrollReveal>

          <FaqAccordion />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 text-center"
          >
            <p className="text-zinc-500 text-sm mb-4">
              Vous ne trouvez pas votre réponse ?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white text-sm font-medium tracking-tight hover:bg-zinc-800 transition-colors"
            >
              Poser une question
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </section>
        {/* CONTACT */}
        <section id="contact" className="bg-zinc-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <SectionHeading
                  tone="light"
                  label="Contact"
                  title={
                    <>
                      Prêt à avoir un site qui vous{" "}
                      <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                        amène des clients
                      </span>{" "}
                      ?
                    </>
                  }
                  subtitle="Réponse sous 24h. Devis gratuit. Sans engagement."
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                {/* Contact form */}
                <ContactForm />

                {/* Réassurance + WhatsApp — colonne épurée */}
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold mb-3">Pourquoi me choisir ?</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm mb-6">
                    Chaque projet commence par un échange gratuit. J'analyse votre activité et je vous propose une solution adaptée à vos objectifs et à votre budget.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Réponse sous 24h",
                      "Devis gratuit",
                      "Aucun engagement",
                      "Accompagnement personnalisé",
                    ].map((text) => (
                      <li key={text} className="flex items-center gap-3 text-sm text-zinc-300">
                        <svg className="w-4 h-4 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {text}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-emerald-500 text-white font-medium tracking-tight rounded-full hover:bg-emerald-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Ouvrir WhatsApp
                    </a>
                    <p className="mt-4 text-center text-sm text-zinc-500">
                      Ou appelez directement au{" "}
                      <a href="tel:+33749635085" className="text-white font-medium hover:text-zinc-300 transition-colors">
                        07 49 63 50 85
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </main>

      {/* FLOATING WHATSAPP — discret, icône seule */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-black/10 transition-colors hover:bg-emerald-400"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>

      {/* AI Chatbot widget */}
      <Chatbot />
    </>
  );
}