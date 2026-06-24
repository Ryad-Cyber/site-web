"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Chatbot from "./components/Chatbot";
import HeroVisual from "./components/HeroVisual";

const WHATSAPP_URL =
  "https://wa.me/33749635085?text=Bonjour, j'aimerais un site web pour mon activité";

const TARIFS_PLANS = [
  {
    name: "Pack Essentiel",
    price: "À partir de 299€",
    desc: "Site vitrine premium pour capter des contacts et transmettre confiance.",
    features: ["Analyse & proposition gratuite", "Design conversion orientée client", "Formulaire de contact + WhatsApp", "Responsive mobile"],
    popular: false,
    cardClass:
      "relative flex flex-col p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 bg-white border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300",
    descClass: "mt-2 text-sm text-zinc-600",
    priceTagClass: "text-sm font-normal ml-1 text-zinc-400",
    featuresClass: "mt-6 space-y-3 text-sm sm:text-base flex-1 text-zinc-600",
    buttonClass:
      "mt-8 block text-center py-3.5 sm:py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] text-sm sm:text-base bg-zinc-950 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-950/20",
  },
  {
    name: "Pack Business",
    price: "À partir de 499€",
    desc: "Site professionnel avec prise de rendez-vous, réservation et optimisation de leads.",
    features: ["Maquette incluse avant paiement", "Pages stratégiques axées conversion", "Intégration réservations / WhatsApp", "Référencement local amélioré"],
    popular: true,
    cardClass:
      "relative flex flex-col p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 bg-zinc-950 text-white border-zinc-950 shadow-2xl shadow-zinc-950/25 scale-[1.02]",
    descClass: "mt-2 text-sm text-zinc-400",
    priceTagClass: "text-sm font-normal ml-1 text-zinc-500",
    featuresClass: "mt-6 space-y-3 text-sm sm:text-base flex-1 text-zinc-300",
    buttonClass:
      "mt-8 block text-center py-3.5 sm:py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] text-sm sm:text-base bg-white text-zinc-950 hover:bg-zinc-100 shadow-lg shadow-white/10",
  },
  {
    name: "Pack Premium",
    price: "À partir de 799€",
    desc: "Solution haut de gamme pour booster votre présence, vos conversions et votre visibilité locale.",
    features: ["Stratégie de conversion incluse", "SEO local & performance", "Intégrations avancées", "Support prioritaire"],
    popular: false,
    cardClass:
      "relative flex flex-col p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 bg-white border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300",
    descClass: "mt-2 text-sm text-zinc-600",
    priceTagClass: "text-sm font-normal ml-1 text-zinc-400",
    featuresClass: "mt-6 space-y-3 text-sm sm:text-base flex-1 text-zinc-600",
    buttonClass:
      "mt-8 block text-center py-3.5 sm:py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] text-sm sm:text-base bg-zinc-950 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-950/20",
  },
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Process clair du début à la fin. J'ai pu valider le design avant la mise en ligne, et le résultat correspond exactement à ce que j'avais en tête.",
    rating: 5,
  },
  {
    quote:
      "Site livré rapidement, design soigné et professionnel. Le formulaire de contact et WhatsApp facilitent vraiment la prise de rendez-vous.",
    rating: 5,
  },
  {
    quote:
      "Accompagnement réactif et à l'écoute. Les ajustements demandés ont été intégrés sans friction, et le site inspire confiance dès la première visite.",
    rating: 5,
  },
];

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
    q: "Proposez-vous l'hébergement ?",
    a: "Oui, l'hébergement professionnel peut être inclus selon la formule. Certificat SSL, sauvegardes et performance sont pris en charge — vous n'avez rien à gérer techniquement.",
  },
  {
    q: "Aidez-vous pour le référencement (SEO) ?",
    a: "Les fondamentaux sont inclus : structure optimisée, balises meta, vitesse de chargement et SEO local de base. Des forfaits SEO avancés sont disponibles si vous souhaitez aller plus loin.",
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} sur 5 étoiles`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-zinc-200"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className={`rounded-2xl border transition-colors duration-300 ${
              isOpen
                ? "border-blue-200/80 bg-white shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/10"
                : "border-zinc-200/80 bg-white/80 hover:border-zinc-300 hover:bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
            >
              <span className="flex items-start gap-4 min-w-0">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors duration-300 ${
                    isOpen
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-semibold text-[15px] sm:text-base leading-snug transition-colors duration-300 ${
                    isOpen ? "text-zinc-950" : "text-zinc-800 group-hover:text-zinc-950"
                  }`}
                >
                  {item.q}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none transition-colors duration-300 ${
                  isOpen
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 text-zinc-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                }`}
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
                  transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <div className="ml-11 border-t border-zinc-100 pt-4">
                      <p className="text-[15px] sm:text-base text-zinc-600 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">

        {/* HERO — Premium TikTok / Framer style */}
        <motion.section
  id="home"
  className="relative overflow-hidden bg-zinc-950 text-white pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 lg:pt-44 lg:pb-36"
  style={{ y: heroY }}
>
          {/* Layered gradients + grid */}
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.3),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.3),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent)]" />

          {/* Animated orbs */}
          <div className="absolute top-[-180px] left-1/4 w-[500px] h-[500px] bg-blue-500/25 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-[20%] right-[-100px] w-[400px] h-[400px] bg-violet-500/20 blur-[100px] rounded-full" style={{ animation: "gradient-shift 8s ease-in-out infinite" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-pink-500/10 blur-[100px] rounded-full" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* LEFT */}
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-sm text-zinc-300 mb-6 sm:mb-8 hover:border-white/20 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Web agency freelance — disponibilité limitée
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-bold leading-[1.1] sm:leading-[1.05] tracking-tight">
                  Des sites web qui
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent animate-shimmer">
                    vendent à votre place
                  </span>
                </h1>

                <p className="mt-6 sm:mt-7 text-lg sm:text-xl text-zinc-300 font-medium">
                  Un site web n&apos;est pas une vitrine. C&apos;est une machine à clients.
                </p>

                <p className="mt-4 sm:mt-5 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                  Je crée des sites premium pour <strong className="text-white">restaurants, coiffeurs, artisans</strong> et entrepreneurs qui veulent <strong className="text-white">plus d&apos;appels, de réservations et de clients</strong> — pas juste un site &ldquo;joli&rdquo;.
                  <br className="hidden sm:block" /> Analyse, maquette et proposition gratuites avant toute validation.
                </p>

                <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3">
                  {["⚡ Livraison rapide", "🧠 Analyse gratuite", "📱 Mobile"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-zinc-300 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="#contact"
                    className="group px-6 sm:px-8 py-4 sm:py-4.5 rounded-2xl bg-white text-zinc-950 font-semibold hover:scale-[1.03] transition-all shadow-xl shadow-white/10 text-center text-base sm:text-lg"
                  >
                    Demander un devis gratuit
                    <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <a
                    href="tel:+33749635085"
                    className="px-6 sm:px-8 py-4 sm:py-4.5 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 transition-all text-center text-base sm:text-lg"
                  >
                    Appeler maintenant
                  </a>
                </div>
              </ScrollReveal>

              {/* RIGHT — Dynamic visual */}
              <ScrollReveal delay={0.2}>
                <motion.div style={{ scale: heroScale }}>
                  <HeroVisual />
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Stats bar — glassmorphism */}
            <ScrollReveal delay={0.3}>
              <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {[
                  { value: "15+", label: "Sites livrés" },
                  { value: "48h", label: "Premier aperçu" },
                  { value: "100%", label: "Responsive" },
                  { value: "5★", label: "Satisfaction client" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.03 }}
                    className="glass-card rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all text-center md:text-left"
                  >
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm text-zinc-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </motion.section>

        {/* Portfolio section removed as requested */}

        <section className="w-full px-4 sm:px-6 py-8">
          <ScrollReveal>
            <div className="overflow-hidden rounded-full border border-white/15 bg-zinc-950 shadow-xl shadow-black/20">
              <motion.div
                className="flex gap-12 whitespace-nowrap py-4 px-4 text-base sm:text-lg font-semibold uppercase tracking-[0.18em] text-white"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              >
                {[
                  "Plus d'appels",
                  "Plus de clients",
                  "Plus de rendez-vous",
                  "Faites croître votre activité",
                ].map((item, index) => (
                  <span key={`${item}-${index}`} className="inline-block">
                    {item}
                    {index < 3 ? " •" : ""}
                  </span>
                ))}
                {[
                  "Plus d'appels",
                  "Plus de clients",
                  "Plus de rendez-vous",
                  "Faites croître votre activité",
                ].map((item, index) => (
                  <span key={`${item}-duplicate-${index}`} className="inline-block">
                    {item}
                    {index < 3 ? " •" : ""}
                  </span>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/95 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.24)] p-6 sm:p-8 backdrop-blur-xl">
              <div className="pointer-events-none absolute -left-14 top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="pointer-events-none absolute right-0 top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative max-w-3xl">
                <p className="text-sm uppercase tracking-[0.32em] text-blue-600 mb-2">Pourquoi un site web ?</p>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 leading-tight">
                  Un site web qui transforme le doute en contact.
                </h2>
                <p className="mt-4 text-base text-zinc-600 leading-7 max-w-2xl">
                  Votre site doit être clair, rapide et professionnel. Il ne doit pas seulement exister : il doit donner confiance.
                </p>
              </div>

              <div className="mt-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="rounded-[1.75rem] border border-white/15 bg-white/95 p-5 shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/10"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-blue-600 mb-4">Vision</p>
                  <h3 className="text-2xl font-semibold text-zinc-950 leading-tight">
                    Des sites qui ont l&apos;air d&apos;appartenir à une entreprise organisée et ambitieuse.
                  </h3>
                  <p className="mt-4 text-sm text-zinc-600 leading-6">
                    Nous créons des expériences digitales lisibles au premier regard, avec des messages clairs et un style soigné.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Restaurant",
                      "Barbier",
                      "Fitness",
                      "Startup",
                    ].map((item) => (
                      <span key={item} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-950/5 px-4 py-2 text-sm font-semibold text-zinc-700 backdrop-blur-md">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <div className="grid gap-4">
                  {[
                    {
                      title: "Confiance immédiate",
                      description: "Un design premium qui donne l’impression que votre entreprise est déjà établie.",
                    },
                    {
                      title: "Contact naturel",
                      description: "Des parcours simples pour que vos visiteurs sachent quoi faire en une seconde.",
                    },
                    {
                      title: "Identité claire",
                      description: "Une esthétique moderne qui valorise votre offre sans exagération.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="rounded-[1.75rem] border border-white/15 bg-white/95 p-5 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:shadow-violet-500/10"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-blue-600 mb-3">{item.title}</p>
                      <p className="text-sm leading-6 text-zinc-600">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* TARIFS */}
        <section id="tarifs" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 md:mb-16">
              <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">Tarifs</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Des offres claires, sans surprise
              </h2>
              <p className="mt-4 text-zinc-600 text-base sm:text-lg leading-relaxed">
                Analyse, maquette et proposition gratuites. Le paiement intervient uniquement après validation de votre projet.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {TARIFS_PLANS.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={plan.cardClass}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-500/25">
                      Le plus choisi
                    </span>
                  )}
                  <h3 className="text-sm sm:text-base font-semibold tracking-wide uppercase">{plan.name}</h3>
                  <p className={plan.descClass}>{plan.desc}</p>
                  <p className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
                    {plan.price}
                    <span className={plan.priceTagClass}>TTC</span>
                  </p>
                  <ul className={plan.featuresClass}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={plan.buttonClass}>
                    Demander un devis gratuit
                  </a>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-center text-zinc-500 text-sm">
              Chaque projet est unique : le prix dépend de vos besoins et objectifs.
            </p>
          </ScrollReveal>
        </section>

        {/* CTA intermédiaire — conversion */}
        <section className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                  <p className="text-sm font-medium text-violet-400 uppercase tracking-wider mb-2">Prêt à passer à l&apos;action ?</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Obtenez votre devis gratuit en moins de 24h
                  </h2>
                  <p className="mt-2 text-zinc-400 text-sm sm:text-base">
                    15+ sites livrés · Réponse garantie · Sans engagement
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href="#contact"
                    className="px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-zinc-100 hover:scale-[1.02] transition-all text-sm sm:text-base text-center"
                  >
                    Demander un devis gratuit
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all text-sm sm:text-base text-center"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.06),transparent)] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">Avis</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight mb-4">
                  Retours après livraison
                </h2>
                <p className="text-zinc-600 text-base leading-relaxed">
                  Ce que nos clients disent le plus souvent une fois leur site en ligne — sans attribution fictive.
                </p>
              </div>
            </ScrollReveal>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-5 sm:gap-6"
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.blockquote
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
                  }}
                  className="group relative flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200/60 transition-all duration-300"
                >
                  <svg
                    className="absolute top-5 right-6 w-10 h-10 text-blue-600/8 group-hover:text-blue-600/12 transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>

                  <StarRating rating={testimonial.rating} />

                  <p className="mt-5 text-zinc-700 leading-relaxed text-[15px] sm:text-base flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-zinc-50 to-white">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">Notre processus</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight mb-4">
                  Comment nous travaillons
                </h2>
                <p className="text-zinc-600 text-base leading-relaxed">
                  Un processus clair et transparent du début à la fin.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  step: "01",
                  title: "Échange initial",
                  description: "Nous explorons votre activité, vos objectifs et votre vision.",
                  icon: "🎯",
                },
                {
                  step: "02",
                  title: "Design & Maquette",
                  description: "Vous validez le design avant que nous ne codions une seule ligne.",
                  icon: "🎨",
                },
                {
                  step: "03",
                  title: "Développement",
                  description: "Nous construisons un site rapide, sécurisé et performant.",
                  icon: "⚙️",
                },
                {
                  step: "04",
                  title: "Mise en ligne",
                  description: "Votre site est en ligne. Nous restons là pour vous soutenir.",
                  icon: "🚀",
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-blue-600/20 group-hover:text-blue-600/40 transition-colors mb-3">
                    {process.step}
                  </div>
                  <div className="text-3xl mb-3">{process.icon}</div>
                  <h3 className="text-lg font-semibold text-zinc-950 mb-2">{process.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{process.description}</p>

                  {index < 3 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2">
                      <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10 sm:mb-14">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">FAQ</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight mb-4">
                  Questions fréquentes
                </h2>
                <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                  Tout ce qu&apos;il faut savoir avant de lancer votre projet — réponses claires, sans jargon.
                </p>
              </div>
            </ScrollReveal>

            <FaqAccordion />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 sm:mt-12 rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 text-center shadow-sm"
            >
              <p className="text-zinc-600 text-[15px] sm:text-base mb-4">
                Vous ne trouvez pas votre réponse ?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 text-white text-sm font-semibold hover:bg-zinc-800 transition-all hover:scale-[1.02] shadow-lg shadow-zinc-950/10"
              >
                Poser une question
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-zinc-950 text-white py-16 md:py-24 px-4 sm:px-6">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/15 blur-[120px] rounded-full" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
                Prêt à commencer ?
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Faites croître votre
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  activité en ligne
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Un site web professionnel qui transforme les visiteurs en clients. Analyse, maquette et proposition gratuites — engagez-vous seulement si vous êtes convaincu.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all hover:scale-[1.02] shadow-lg shadow-white/10"
                >
                  Obtenir un devis gratuit
                </a>
                <a
                  href="tel:+33749635085"
                  className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Appeler directement
                </a>
              </motion.div>

              <p className="mt-8 text-sm text-zinc-400">
                15+ sites livrés • Réponse garantie en 24h • Sans engagement
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTACT — Form + WhatsApp CTA */}
        <section id="contact" className="relative overflow-hidden bg-zinc-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.2),transparent)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/10 blur-[100px] rounded-full" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
                <p className="text-sm font-medium text-violet-400 uppercase tracking-wider mb-3">Contact</p>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight">
                  Prêt à attirer plus de clients ?
                </h2>
                <p className="mt-3 sm:mt-4 text-base text-zinc-400 leading-relaxed">
                  Formulaire direct ou WhatsApp — choisissez ce qui vous convient le mieux.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Contact form */}
                <ContactForm />

                {/* Trust card + WhatsApp alternative */}
                <div className="flex flex-col gap-3 sm:gap-5">
                  {/* Trust card */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/10"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-4">Pourquoi me choisir ?</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-6">
                      Chaque projet commence par un échange gratuit. J&apos;analyse votre activité et propose une solution adaptée à vos objectifs.
                    </p>
                    <div className="space-y-3">
                      {[
                        { icon: "⚡", text: "Réponse sous 24h" },
                        { icon: "💰", text: "Devis gratuit" },
                        { icon: "✨", text: "Aucun engagement" },
                        { icon: "🤝", text: "Accompagnement personnalisé" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-zinc-300">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* WhatsApp alternative */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/10 text-center lg:text-left"
                  >
                    <div className="w-11 h-11 sm:w-13 sm:h-13 mx-auto lg:mx-0 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-3 sm:mb-5">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Alternative rapide : WhatsApp</h3>
                    <p className="text-zinc-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      Préférez le chat instantané ? Réponse garantie sous 24h.
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 sm:px-7 py-4 sm:py-3.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/25 text-base sm:text-sm"
                    >
                      Ouvrir WhatsApp
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 text-center"
                  >
                    <p className="text-sm sm:text-sm text-zinc-400 mb-2">
                      Ou appelez directement :
                    </p>
                    <a href="tel:+33749635085" className="text-lg sm:text-base text-white hover:text-blue-400 transition-colors font-bold">
                      07 49 63 50 85
                    </a>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </main>

      {/* FLOATING WHATSAPP — circular on mobile to match chatbot, pill on desktop */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 sm:w-auto sm:h-auto sm:flex sm:items-center sm:gap-2 bg-emerald-500 text-white sm:pl-4 sm:pr-5 sm:py-3 rounded-full font-semibold shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 transition-all animate-pulse-ring flex items-center justify-center"
      >
        <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </motion.a>

      {/* AI Chatbot widget */}
      <Chatbot />
    </>
  );
}
