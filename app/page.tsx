"use client";

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

interface Design {
  id: number;
  name: string;
  category: string;
  description: string;
  gradient: string;
  mockup: string;
  features: string[];
  slides: CarouselSlide[];
}

const DESIGNS: Design[] = [
  {
    id: 1,
    name: "Location Premium",
    category: "Location de véhicules",
    description: "Création de site internet professionnel de location de voitures et réservation de véhicules de prestige.",
    gradient: "from-sky-500/20 via-cyan-500/10 to-slate-500/5",
    mockup: "🚗",
    features: ["Réservation en ligne", "Tarifs transparents", "Gestion des documents", "Optimisé mobile"],
    slides: [
      {
        label: "L'univers",
        caption: "Une interface claire et engageante pour valoriser votre flotte de véhicules à louer.",
        type: "photo",
        src: "/clean_car.jpeg",
        alt: "Voiture haut de gamme prête pour la location",
      },
      {
        label: "Réserver",
        caption: "Parcours de réservation de voiture fluide et simplifié en quelques clics.",
        type: "photo",
        src: "/site_car.jpeg",
        alt: "Interface web de réservation de voiture de location",
      },
      {
        label: "Nos clients",
        caption: "Des clients de l'agence de location satisfaits qui réservent à nouveau.",
        type: "photo",
        src: "/site_location.png",
        alt: "Capture d'écran du site web de location de véhicules",
      },
    ],
  },
  {
    id: 2,
    name: "Nettoyage Pro",
    category: "Nettoyage & Entretien",
    description: "Création de site internet pour entreprise de nettoyage professionnel, services d'entretien et désinfection de locaux.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/5",
    mockup: "🧽",
    features: ["Réservations", "Prestations de nettoyage", "Avis clients", "Zone d'intervention"],
    slides: [
      {
        label: "L'univers",
        caption: "Présentation claire et impeccable de vos services de nettoyage et d'entretien pour professionnels et particuliers.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
        alt: "Professionnel du nettoyage effectuant un entretien de locaux",
      },
      {
        label: "Réserver",
        caption: "Formulaire de demande de devis express et prise de rendez-vous de nettoyage en ligne.",
        type: "photo",
        src: "/site_fit.png",
        alt: "Interface web d'une entreprise de nettoyage de locaux",
      },
      {
        label: "Le résultat",
        caption: "Des locaux propres, des réservations régulières et une réputation en ligne renforcée.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
        alt: "Chantier d'entretien de locaux propres et nets",
      },
    ],
  },
  {
    id: 3,
    name: "Immobilier Plus",
    category: "Immobilier / Agence",
    description: "Création de site internet d'agence immobilière, avec catalogue de biens et demandes d'estimation.",
    gradient: "from-indigo-500/20 via-violet-500/10 to-purple-500/5",
    mockup: "🏡",
    features: ["Biens immobiliers", "Estimation gratuite", "Contact agents", "SEO local"],
    slides: [
      {
        label: "L'univers",
        caption: "Vitrine immobilière premium pour présenter de magnifiques biens à la vente et à la location.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
        alt: "Magnifique villa immobilière d'architecte contemporaine",
      },
      {
        label: "Réserver",
        caption: "Prise de contact rapide avec les négociateurs ou demande d'évaluation immobilière.",
        type: "photo",
        src: "/site_immobilier.jpeg",
        alt: "Maquette du site web d'une agence immobilière contemporaine",
      },
      {
        label: "Le résultat",
        caption: "Davantage de mandats exclusifs, de leads acheteurs qualifiés et d'estimations obtenues.",
        type: "photo",
        src: "/site_immobilier.jpeg",
        alt: "Vue de l'interface d'estimation de biens en ligne",
      },
    ],
  },
  {
    id: 4,
    name: "Produit Mobile",
    category: "Produit digital / startup",
    description: "Site web et application mobile pour présenter votre offre, convertir et fidéliser vos utilisateurs.",
    gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/5",
    mockup: "📱",
    features: ["Web & mobile", "Inscription", "Analytics", "Expérience fluide"],
    slides: [
      {
        label: "L'univers",
        caption: "Une équipe produit qui a besoin d'une vitrine aussi performante que son outil.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
        alt: "Équipe travaillant sur un produit SaaS",
      },
      {
        label: "Réserver",
        caption: "Landing page claire, démo produit et conversion vers l'inscription.",
        type: "mockup",
        variant: "saas",
      },
      {
        label: "Le résultat",
        caption: "Plus de trials, meilleur taux de conversion, crédibilité startup → scale-up.",
        type: "outcome",
        variant: "saas",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
        alt: "Tableau de bord analytics",
        metrics: [
          { value: "+65%", label: "Inscriptions trial" },
          { value: "3.2×", label: "Taux conversion" },
          { value: "−40%", label: "Coût d'acquisition" },
          { value: "+200", label: "Leads qualifiés/mois" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Services Pro",
    category: "Entreprise Locale / Artisan",
    description: "Site web de prestataire premium avec système de devis instantané",
    gradient: "from-purple-500/20 via-violet-500/10 to-indigo-500/5",
    mockup: "🔧",
    features: ["Devis instantanés", "Portfolio", "Avis clients", "Contact"],
    slides: [
      {
        label: "L'univers",
        caption: "Un artisan ou prestataire local dont le savoir-faire mérite d'être visible en ligne.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
        alt: "Professionnel au travail",
      },
      {
        label: "Réserver",
        caption: "Devis instantané, portfolio de réalisations et avis clients — tout pour rassurer.",
        type: "mockup",
        variant: "services",
      },
      {
        label: "Le résultat",
        caption: "Demandes de devis qualifiées, moins de prospects perdus, réputation locale solide.",
        type: "outcome",
        variant: "services",
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
        alt: "Professionnels sur un chantier",
        metrics: [
          { value: "+140%", label: "Demandes de devis" },
          { value: "4.8★", label: "Satisfaction client" },
          { value: "−50%", label: "Appels non qualifiés" },
          { value: "+75%", label: "Visibilité locale" },
        ],
      },
    ],
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

export default function Home() {
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
          style={{}}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_55%)]" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center">
              {/* LEFT */}
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-zinc-300 mb-4 sm:mb-6 lg:mb-8">
                  <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white/70" />
                  Ryad Web Studio — Sites web et apps web premium
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.8rem] font-bold leading-[1.15] sm:leading-[1.05] tracking-tight">
  Je crée des sites web qui attirent des clients
  <br />
  <span className="text-zinc-200">
    pour les entreprises locales
  </span>
</h1>

                <p className="mt-4 sm:mt-5 lg:mt-7 text-sm sm:text-base md:text-xl text-zinc-300 max-w-xl leading-relaxed">
  Vous êtes <strong className="text-white">coiffeur, restaurateur, coach sportif ou entrepreneur</strong> ?<br />
  Je crée des sites web conçus pour vous apporter plus d’appels, plus de clients et plus de réservations grâce à Google et une meilleure visibilité locale.
</p>
<p className="mt-3 text-sm text-zinc-400">
  Basé en France — spécialisé dans les entreprises locales
</p>

                <div className="mt-4 sm:mt-5 lg:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                  {["Coiffeur", "Restaurant", "Coach sportif", "Entrepreneur", "Autres activités"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs lg:text-sm text-zinc-300 bg-white/[0.04] border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-4">
  <div className="flex flex-col gap-3">
    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
      <a
        href="#contact"
        className="group px-5 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl bg-white text-zinc-950 font-semibold hover:scale-[1.01] transition-all shadow-[0_12px_40px_rgba(255,255,255,0.12)] text-center text-sm sm:text-base lg:text-lg"
      >
        Demander un devis gratuit
        <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
      </a>

      <a
        href="#tarifs"
        className="px-5 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl border border-white/15 bg-white/[0.04] text-white font-semibold hover:bg-white/[0.08] hover:border-white/25 transition-all text-center text-sm sm:text-base lg:text-lg"
      >
        Voir les tarifs
      </a>
    </div>

    <p className="text-xs text-zinc-500 text-center sm:text-left">
      Réponse sous 24h • Devis gratuit • Sans engagement
    </p>
  </div>
</div>
              </ScrollReveal>

              {/* RIGHT — Dynamic visual */}
              <ScrollReveal delay={0.2}>
                <motion.div style={{ scale: heroScale }}>
                  <HeroVisual />
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Stats bar */}
            <ScrollReveal delay={0.3}>
              <div className="mt-8 sm:mt-12 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                {[
                  { value: "15+", label: "Sites livrés" },
                  { value: "48h", label: "Premier aperçu" },
                  { value: "100%", label: "Responsive" },
                  { value: "5★", label: "Satisfaction client" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-4 sm:p-6 border border-white/10 bg-white/[0.03] text-center md:text-left"
                  >
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm text-zinc-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
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
        <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-14">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">Services</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                Un site web ou une app web qui vous ressemble
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 6.5h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 9.5h10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 13.5h4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 11h7" />
                  </svg>
                ),
                title: "Design sur mesure",
                desc: "Un site pensé pour votre activité, pas un template générique.",
                highlight: "Mobile-first, UI soignée, maquette avant développement.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 5.5h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2.5l-2 2-2-2H7.5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.5h4" />
                  </svg>
                ),
                title: "Contact & réservation",
                desc: "Vos clients vous contactent facilement.",
                highlight: "WhatsApp, formulaire, réservation en ligne intégrés.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 5.5a5.5 5.5 0 1 0 5.5 5.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l2.5 2.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 13.5c1.1-2.2 3.3-3.5 5.5-3.5" />
                  </svg>
                ),
                title: "Visibilité Google",
                desc: "Vous êtes trouvé par les clients près de chez vous.",
                highlight: "SEO local, vitesse, structure optimisée.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex items-center gap-5 sm:gap-6 p-5 sm:p-6 rounded-[1.35rem] bg-gradient-to-br from-white via-zinc-50/80 to-white border border-zinc-200/80 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.28)] transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.34)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/70 to-transparent" />
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white shadow-[0_12px_35px_-12px_rgba(24,24,27,0.7)] shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_40px_-12px_rgba(24,24,27,0.8)]">
                  {service.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <h3 className="text-base font-semibold text-zinc-950">{service.title}</h3>
                    <span className="hidden sm:inline text-zinc-300">—</span>
                    <p className="text-sm text-zinc-500">{service.desc}</p>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{service.highlight}</p>
                </div>
              </motion.div>
            ))}
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