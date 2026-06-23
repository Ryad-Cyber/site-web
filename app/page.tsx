"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import Chatbot from "./components/Chatbot";
import HeroVisual from "./components/HeroVisual";

const WHATSAPP_URL =
  "https://wa.me/33749635085?text=Bonjour, j'aimerais un site web pour mon activité";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/ryad.bjn_",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Snapchat",
    href: "https://snapchat.com/add/ryadbjn",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.166 3c-3.003 0-5.5 2.243-5.5 5.01 0 .553-.447 1-1 1s-1-.447-1-1C4.666 4.132 8.01 1 12.166 1c4.155 0 7.5 3.132 7.5 7.01 0 3.767-2.497 6.01-5.5 6.01-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5c4.155 0 7.5-3.243 7.5-7.26C21.666 5.757 17.321 3 12.166 3zm-4 10.5c0 .828.672 1.5 1.5 1.5h5c.828 0 1.5-.672 1.5-1.5S15.494 12 14.666 12h-5c-.828 0-1.5.672-1.5 1.5z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@ryad.bjn_",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
];

const TARIFS_PLANS = [
  {
    name: "Pack Essentiel",
    price: "À partir de 299€",
    desc: "Site vitrine premium pour capter des contacts et transmettre confiance.",
    features: ["Analyse & proposition gratuite", "Design conversion orientée client", "Formulaire de contact + WhatsApp", "Responsive mobile-first"],
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
                  {["⚡ Livraison rapide", "🧠 Analyse gratuite", "📱 Mobile-first"].map((tag) => (
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

        {/* FAQ */}
        <section className="bg-white border-y border-zinc-200/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
            <ScrollReveal>
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">FAQ</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Questions fréquentes</h2>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {[
                  {
                    q: "Combien de temps pour avoir mon site en ligne ?",
                    a: "Entre 7 et 14 jours selon la formule. Vous recevez un aperçu sous 48h après notre premier échange.",
                  },
                  {
                    q: "Est-ce que je peux modifier le contenu moi-même ?",
                    a: "Oui, je vous forme à la gestion de base. Pour des modifications avancées, je reste disponible.",
                  },
                  {
                    q: "Le devis est-il vraiment gratuit ?",
                    a: "Absolument. On échange sur votre projet, je vous propose une solution adaptée, sans aucun engagement.",
                  },
                  {
                    q: "Proposez-vous la maintenance ?",
                    a: "Oui, des forfaits de maintenance optionnels sont disponibles pour garder votre site à jour et performant.",
                  },
                ].map((item, index) => (
                  <motion.details
                    key={item.q}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group p-3 sm:p-5 rounded-xl border border-zinc-200 bg-zinc-50 open:bg-white open:shadow-md transition-all duration-300 hover:border-zinc-300"
                  >
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                      {item.q}
                      <span className="text-zinc-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                    </summary>
                    <p className="mt-4 text-zinc-600 leading-relaxed text-sm sm:text-base">{item.a}</p>
                  </motion.details>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">Testimonials</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight mb-4">
                  Nos clients parlent pour nous
                </h2>
                <p className="text-zinc-600 text-base leading-relaxed">
                  Découvrez comment Ryad Web Studio a transformé les affaires de nos clients.
                </p>
              </div>
            </ScrollReveal>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  quote: "Ryad a complètement transformé notre présence en ligne. Nos rendez-vous ont augmenté de 200% en 3 mois.",
                  author: "Marco Rossi",
                  role: "Propriétaire, Studio de Coiffure Premium",
                  emoji: "🪑",
                },
                {
                  quote: "Professionnel, rapide et qui a dépassé nos attentes. L'équipe est à l'écoute et livre à temps.",
                  author: "Chef Alexandre",
                  role: "Chef, Bella Trattoria",
                  emoji: "🍽️",
                },
                {
                  quote: "Le nouveau site web nous a permis d'attirer beaucoup plus de clients. L'investissement en vaut vraiment la peine.",
                  author: "Emma Rousseau",
                  role: "Coach Fitness",
                  emoji: "💪",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="group relative rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="absolute top-6 left-6 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                    {testimonial.emoji}
                  </div>
                  
                  <p className="text-lg font-semibold text-zinc-700 mb-1">★★★★★</p>
                  
                  <p className="text-zinc-600 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>

                  <div>
                    <p className="font-semibold text-zinc-950">{testimonial.author}</p>
                    <p className="text-xs sm:text-sm text-zinc-500">{testimonial.role}</p>
                  </div>
                </motion.div>
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
                  title: "Discovery Call",
                  description: "Nous explorons votre activité, vos objectifs et votre vision.",
                  icon: "🎯",
                },
                {
                  step: "02",
                  title: "Design & Prototype",
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
                  title: "Lancement",
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

        {/* FAQ ACCORDION */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 sm:mb-16">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">FAQ</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight mb-4">
                  Questions fréquentes
                </h2>
                <p className="text-zinc-600 text-base leading-relaxed max-w-2xl mx-auto">
                  Vous avez des questions ? Consultez notre FAQ ou contactez-nous directement.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  q: "Combien coûte un site web ?",
                  a: "Les prix commencent à partir de 299€ pour un site vitrine. Chaque projet est unique et dépend de vos besoins. Nous proposons une analyse gratuite sans engagement.",
                },
                {
                  q: "Combien de temps cela prend-il ?",
                  a: "Généralement 7 à 14 jours. Vous recevez un aperçu du design sous 48h après notre premier échange.",
                },
                {
                  q: "Puis-je modifier mon site moi-même ?",
                  a: "Oui, nous vous formons à la gestion de base. Pour les modifications avancées, nous restons disponibles et offrons des forfaits de maintenance.",
                },
                {
                  q: "L'hébergement est-il inclus ?",
                  a: "Oui, l'hébergement professionnel est inclus. Vous n'avez rien à gérer, tout est pris en charge.",
                },
                {
                  q: "Le SEO est-il inclus ?",
                  a: "Les bases du SEO (optimisation on-page, vitesse) sont incluses. Nous proposons aussi des forfaits SEO avancés.",
                },
                {
                  q: "Pouvez-vous redesigner un site existant ?",
                  a: "Absolument ! Nous redesignons des sites existants pour améliorer l'expérience utilisateur et les conversions.",
                },
              ].map((item, index) => (
                <motion.details
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group p-4 sm:p-6 rounded-2xl border border-zinc-200 bg-zinc-50 open:bg-white open:shadow-md open:shadow-blue-500/10 transition-all duration-300 hover:border-blue-300"
                >
                  <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base text-zinc-950">
                    {item.q}
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm group-open:bg-blue-500 transition-all">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-zinc-600 leading-relaxed text-sm sm:text-base">{item.a}</p>
                </motion.details>
              ))}
            </div>
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

        {/* FOOTER */}
        <footer className="bg-zinc-950 border-t border-white/10 text-zinc-500 text-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
            {/* Social icons — centered */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
              <p className="text-xs sm:text-sm">© 2026 Ryad Web Studio — Tous droits réservés</p>
              <p className="text-xs sm:text-sm text-zinc-600">Sites web sur-mesure pour entreprises locales</p>
            </div>
          </div>
        </footer>
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
