"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Chatbot from "./components/Chatbot";
import HeroVisual from "./components/HeroVisual";
import DesignCarousel, { type CarouselSlide } from "./components/DesignCarousel";

const WHATSAPP_URL =
  "https://wa.me/33749635085?text=Bonjour, j'aimerais un site web pour mon activité";

const TARIFS_PLANS = [
  {
    name: "Pack Essentiel",
    price: "À partir de 399€",
    desc: "Site pour obtenir des clients et être trouvé sur Google",
    features: ["Être visible sur Google", "Recevoir des demandes de clients", "Site rapide et mobile",],
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
    price: "À partir de 599€",
    desc: "Site optimisé pour générer des appels, réservations et clients",
    features: ["Générer des appels clients", "Réservations en ligne", "Plus de visibilité locale",],
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
    price: "À partir de 899€",
    desc: "Solution complète pour augmenter votre visibilité et vos clients",
    features: ["Plus de clients chaque mois", "Meilleure conversion visiteurs", "Positionnement Google local"],
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


function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className={`rounded-xl border transition-colors duration-300 ${
              isOpen
                ? "border-zinc-200 bg-white shadow-md shadow-zinc-900/5"
                : "border-zinc-200/60 bg-white/70 hover:border-zinc-300 hover:bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left cursor-pointer group"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold transition-colors duration-300 ${
                    isOpen
                      ? "bg-zinc-950 text-white"
                      : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-semibold text-sm sm:text-base leading-tight transition-colors duration-300 ${
                    isOpen ? "text-zinc-950" : "text-zinc-800 group-hover:text-zinc-950"
                  }`}
                >
                  {item.q}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-base leading-none transition-colors duration-300 ${
                  isOpen
                    ? "bg-zinc-950 text-white"
                    : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-950"
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
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3.5 sm:px-5 sm:pb-4 pt-0">
                    <div className="ml-9 border-t border-zinc-100 pt-3">
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{item.a}</p>
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

function ServiceCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative p-5 rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-zinc-300">

      {/* glow léger au hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-zinc-100 via-white to-transparent" />

      <div className="relative">
        <h3 className="font-semibold flex items-center gap-2 transition-transform group-hover:translate-x-1">
          <span className="text-lg">{icon}</span>
          {title}
        </h3>

        <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
          {desc}
        </p>
      </div>

    </div>
  );
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">

        {/* HERO */}
<motion.section
  id="home"
  className="relative overflow-hidden bg-[#0a0a0b] text-white pt-20 pb-10 sm:pt-24 sm:pb-14 md:pt-32 md:pb-24 lg:pt-44 lg:pb-36"
>
<div
  className="pointer-events-none absolute inset-0 z-0"
  style={{
    background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.08), transparent 80%)`,
  }}
/>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />
  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_55%)]" />

  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
    
    {/* GRID IMPORTANT */}
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

      {/* LEFT */}
      <ScrollReveal>
        <div>
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-zinc-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            Ryad Web Studio — Sites web & applications
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight">
  <span className="whitespace-nowrap">
    Des sites web qui
  </span>
  <br />
  <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 text-transparent bg-clip-text">
    transforment vos visiteurs en clients
  </span>
</h1>

          {/* TEXT */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed">
            Sites web modernes pour entreprises locales qui veulent plus d’appels, de réservations et de visibilité sur Google.
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            Coiffeurs, restaurants, coachs, artisans et autres activités locales.
          </p>

          {/* TAGS */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Sites web",
              "Applications mobiles",
              "Réservations",
              "Appels clients",
              "Visibilité Google",
              "Entreprises locales",
            ].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs lg:text-sm text-zinc-300 bg-white/[0.04] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="px-5 py-3 lg:px-8 lg:py-4 rounded-xl bg-white text-zinc-950 font-semibold hover:scale-[1.01] transition-all"
            >
              Demander un devis gratuit →
            </a>

            <a
              href="#tarifs"
              className="px-5 py-3 lg:px-8 lg:py-4 rounded-xl border border-white/15 bg-white/[0.04] text-white font-semibold hover:bg-white/[0.08]"
            >
              Voir les tarifs
            </a>
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            Réponse sous 24h • Devis gratuit • Sans engagement
          </p>
        </div>
      </ScrollReveal>

      {/* RIGHT - IMAGE RESTORED */}
      <ScrollReveal delay={0.2}>
        <motion.div className="relative" style={{ scale: heroScale }}>
          <HeroVisual />
        </motion.div>
      </ScrollReveal>

    </div>
  </div>
</motion.section>

        {/* Scrolling ticker bar */}
        <section className="w-full px-4 sm:px-6 py-6">
          <ScrollReveal>
            <div className="overflow-hidden rounded-full border border-white/15 bg-zinc-950 shadow-xl shadow-black/20">
              <motion.div
                className="flex gap-12 whitespace-nowrap py-3 px-4 text-sm sm:text-base font-semibold uppercase tracking-[0.18em] text-white"
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

        {/* SERVICES */}
        <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">

  {/* LEFT TEXT */}
  <div className="text-center max-w-2xl mx-auto mb-14">
    <p className="text-xs tracking-[0.3em] uppercase text-zinc-500">
      Systèmes digitaux
    </p>

    <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
      On crée des sites qui génèrent des clients
    </h2>

    <p className="mt-4 text-zinc-600 text-sm sm:text-base">
      Sites web, mobile et Google optimisés pour transformer vos visiteurs en clients.
    </p>
  </div>

  {/* SHOWCASE */}
  <div className="grid lg:grid-cols-2 gap-10 items-center">

    {/* LEFT - SWITCH */}
    <div className="space-y-4">

  <ServiceCard
    icon="💻"
    title="Site Web"
    desc="Interface moderne qui donne confiance et convertit vos visiteurs."
  />

  <ServiceCard
    icon="📱"
    title="Mobile"
    desc="WhatsApp, appels et réservations en un clic."
  />

  <ServiceCard
    icon="📍"
    title="Google"
    desc="Apparaissez dans les recherches locales de votre ville."
  />

</div>

    {/* RIGHT - FAKE PREMIUM MOCKUP */}
    <div className="relative flex justify-center">

      {/* glow */}
      <div className="absolute w-[400px] h-[400px] bg-zinc-300 blur-3xl opacity-30 rounded-full" />

      {/* laptop */}
      <div className="relative w-full max-w-md rounded-xl border shadow-2xl bg-black p-2">
        <div className="bg-zinc-900 rounded-lg overflow-hidden h-[260px] flex items-center justify-center text-white text-sm">
          Site Web Preview (scroll animation possible ici)
        </div>
      </div>

      {/* phone */}
      <div className="absolute -right-10 bottom-0 w-32 h-56 rounded-2xl border shadow-xl bg-black p-2">
        <div className="bg-zinc-900 rounded-xl h-full flex items-center justify-center text-white text-[10px]">
          WhatsApp / Booking
        </div>
      </div>

    </div>

  </div>
</section>

        {/* TARIFS */}
        <section id="tarifs" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">Tarifs</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                Des offres claires, sans surprise
              </h2>
              <p className="mt-4 text-zinc-600 text-lg leading-relaxed">
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
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1.5 rounded-full bg-zinc-950 text-white shadow-lg">
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

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight mb-4">
                Questions fréquentes
              </h2>
              <p className="text-zinc-600 text-lg leading-relaxed max-w-xl mx-auto">
                Tout ce qu'il faut savoir avant de lancer votre projet.
              </p>
            </div>
          </ScrollReveal>

          <FaqAccordion />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 text-center shadow-sm"
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
        </section>
        {/* CONTACT */}
        <section id="contact" className="bg-zinc-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">Contact</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Prêt à avoir un site qui vous amène des clients ?
                </h2>
                <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
                  Réponse sous 24h. Devis gratuit. Sans engagement.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Contact form */}
                <ContactForm />

                {/* Trust card + WhatsApp */}
                <div className="flex flex-col gap-5">
                  <div className="rounded-2xl p-6 sm:p-7 border border-zinc-800">
                    <h3 className="text-lg sm:text-xl font-bold mb-4">Pourquoi me choisir ?</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-6">
                      Chaque projet commence par un échange gratuit. J'analyse votre activité et je vous propose une solution adaptée à vos objectifs et à votre budget.
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
                  </div>

                  {/* WhatsApp alternative */}
                  <div className="rounded-2xl p-6 sm:p-7 border border-zinc-800 text-center lg:text-left">
                    <div className="w-11 h-11 mx-auto lg:mx-0 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Alternative rapide : WhatsApp</h3>
                    <p className="text-zinc-400 mb-4 leading-relaxed text-sm sm:text-base">
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
                  </div>

                  <div className="rounded-2xl p-4 sm:p-5 border border-zinc-800 text-center">
                    <p className="text-sm text-zinc-400 mb-2">
                      Ou appelez directement :
                    </p>
                    <a href="tel:+33749635085" className="text-lg text-white hover:text-blue-400 transition-colors font-bold">
                      07 49 63 50 85
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </main>

      {/* FLOATING WHATSAPP */}
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
        className="fixed bottom-6 left-6 z-40 w-14 h-14 sm:w-auto sm:h-auto sm:flex sm:items-center sm:gap-2 bg-emerald-500 text-white sm:pl-4 sm:pr-5 sm:py-3 rounded-full font-semibold shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 transition-all flex items-center justify-center"
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