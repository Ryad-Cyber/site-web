"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
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

function CheckIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <>
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-white font-semibold tracking-tight hover:opacity-80 transition-opacity text-lg">
            Ryad Web Studio
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#projets" className="hover:text-white transition-colors">Projets</a>
            <a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium bg-white text-zinc-950 px-4 py-2 rounded-lg hover:bg-zinc-100 hover:scale-105 transition-all"
            >
              Devis gratuit
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-4">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white text-lg hover:text-blue-400 transition-colors"
              >
                Services
              </a>
              <a
                href="#projets"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white text-lg hover:text-blue-400 transition-colors"
              >
                Projets
              </a>
              <a
                href="#tarifs"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white text-lg hover:text-blue-400 transition-colors"
              >
                Tarifs
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white text-lg hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center mt-4 bg-white text-zinc-950 px-4 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition-all"
              >
                Devis gratuit
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <main className="bg-zinc-50 text-zinc-900">

        {/* HERO — Premium TikTok / Framer style */}
        <motion.section 
          className="relative overflow-hidden bg-zinc-950 text-white pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 lg:pt-44 lg:pb-36"
          style={{ y: heroY, opacity: heroOpacity }}
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

                <p className="mt-4 sm:mt-5 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                  Je crée des sites premium pour <strong className="text-white">restaurants, coiffeurs, artisans</strong> et entrepreneurs qui veulent <strong className="text-white">plus d'appels, de réservations et de clients</strong> — pas juste un site &ldquo;joli&rdquo;.
                </p>

                <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3">
                  {["⚡ Livraison rapide", "📈 Optimisé conversion", "📱 Mobile-first"].map((tag) => (
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
                    href={WHATSAPP_URL}
                    className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white text-zinc-950 font-semibold hover:scale-[1.03] transition-all shadow-xl shadow-white/10 text-center"
                  >
                    Demander un devis
                    <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <a
                    href="#projets"
                    className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 transition-all text-center"
                  >
                    Voir des résultats
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

        {/* INFINITE TICKER — Apple/Framer style */}
        <section className="bg-zinc-900 border-y border-white/10 overflow-hidden">
          <div className="relative">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[
                "📞 Plus d'appels",
                "⭐ Plus de clients",
                "📈 Plus de réservations",
                "🚀 Plus de visibilité",
                "💬 Plus de demandes de devis",
                "📞 Plus d'appels",
                "⭐ Plus de clients",
                "📈 Plus de réservations",
                "🚀 Plus de visibilité",
                "💬 Plus de demandes de devis",
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-3 px-8 py-4 text-white/80 text-sm font-medium">
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* BENEFITS CHECKMARKS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "✔ Plus d'appels",
                "✔ Plus de réservations",
                "✔ Plus de demandes de devis",
                "✔ Plus de clients grâce à une présence en ligne professionnelle",
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckIcon />
                  <span className="text-sm font-medium text-zinc-700">{benefit.replace("✔ ", "")}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* PROBLEME */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
              <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">Le constat</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Votre site ne devrait pas vous coûter des clients
              </h2>
              <p className="mt-4 sm:mt-5 text-zinc-600 text-base sm:text-lg leading-relaxed">
                Chaque jour sans présence en ligne performante, ce sont des prospects qui choisissent vos concurrents.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Pas assez de clients",
                  desc: "Votre site actuel ne génère aucun contact. Vous dépendez du bouche-à-oreille.",
                  icon: "01",
                },
                {
                  title: "Image peu crédible",
                  desc: "Un design daté fait fuir vos visiteurs en moins de 3 secondes.",
                  icon: "02",
                },
                {
                  title: "Invisible sur Google",
                  desc: "Vos concurrents apparaissent en premier. Vous perdez en visibilité locale.",
                  icon: "03",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }}
                  className="group p-6 sm:p-8 bg-white rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300 transition-all duration-300"
                >
                  <span className="text-xs font-mono text-zinc-400">{item.icon}</span>
                  <h3 className="mt-4 text-lg sm:text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-zinc-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* SERVICES / POURQUOI MOI */}
        <section id="services" className="bg-white border-y border-zinc-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <ScrollReveal>
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">Pourquoi moi</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                    Un partenaire web, pas juste un prestataire
                  </h2>
                  <p className="mt-3 sm:mt-4 text-zinc-600 text-base leading-relaxed">
                    Je ne livre pas un simple site joli — je crée un <strong className="text-zinc-900">outil de conversion</strong> pensé pour votre activité et votre marché local, pour <strong className="text-zinc-900">augmenter vos appels et réservations</strong>.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                  >
                    Discutons de votre projet <ArrowIcon />
                  </a>
                </div>
              </ScrollReveal>

              <ul className="space-y-4 sm:space-y-5">
                {[
                  { title: "Design premium sur-mesure", desc: "Une image professionnelle qui inspire confiance dès la première visite." },
                  { title: "Performance & SEO local", desc: "Sites ultra-rapides, optimisés pour apparaître sur Google dans votre zone." },
                  { title: "100% mobile-first", desc: "Parfait sur smartphone, tablette et ordinateur — là où vos clients vous cherchent." },
                  { title: "Orienté conversion", desc: "Boutons d'appel, WhatsApp, formulaires — chaque élément pousse à l'action." },
                ].map((item, index) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 4, backgroundColor: "#ffffff", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)" }}
                    className="flex gap-4 p-4 sm:p-5 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
                  >
                    <CheckIcon />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
              <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">Processus</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                De l&apos;idée au site en ligne, simplement
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
              {[
                { step: "1", title: "Échange gratuit", desc: "On discute de votre activité, vos objectifs et votre budget." },
                { step: "2", title: "Maquette & validation", desc: "Vous recevez un aperçu sous 48h avant toute mise en ligne." },
                { step: "3", title: "Développement", desc: "Je crée votre site optimisé, rapide et prêt à convertir." },
                { step: "4", title: "Mise en ligne", desc: "Votre site est en ligne. Vous commencez à recevoir des contacts." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }}
                  className="relative"
                >
                  {i < 3 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-px bg-zinc-200" />
                  )}
                  <div className="relative bg-white border border-zinc-200 rounded-2xl p-3 sm:p-5 text-center transition-all duration-300">
                    <span className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-950 text-white font-bold text-sm sm:text-base">
                      {item.step}
                    </span>
                    <h3 className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base">{item.title}</h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-zinc-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* PROJETS */}
        <section id="projets" className="bg-zinc-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
                <div>
                  <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">Portfolio</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Projets récents</h2>
                </div>
                <p className="text-zinc-400 max-w-md leading-relaxed text-sm sm:text-base">
                  Chaque projet est conçu pour <strong className="text-white">générer plus d'appels, réservations et clients</strong>.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-3 sm:gap-5">
                {[
                  {
                    name: "Restaurant Le Palmier",
                    tag: "Restauration",
                    desc: "Site vitrine moderne optimisé pour réservations et visibilité locale.",
                    result: "+40% de réservations en ligne",
                    gradient: "from-amber-500/20 to-orange-600/20",
                  },
                  {
                    name: "Salon Elite Coiffure",
                    tag: "Beauté",
                    desc: "Site premium avec prise de rendez-vous et image haut de gamme.",
                    result: "+60% de prises de RDV",
                    gradient: "from-violet-500/20 to-purple-600/20",
                  },
                  {
                    name: "Artisan BTP Pro",
                    tag: "BTP",
                    desc: "Site professionnel conçu pour générer des demandes de devis qualifiées.",
                    result: "3× plus de demandes de devis",
                    gradient: "from-blue-500/20 to-cyan-600/20",
                  },
                ].map((project, index) => (
                  <motion.article
                    key={project.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group rounded-2xl border border-white/10 overflow-hidden hover:border-white/25 transition-all duration-300 bg-white/[0.02]"
                  >
                    <div className={`h-32 sm:h-40 bg-gradient-to-br ${project.gradient} flex items-end p-3 sm:p-5 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
                      <span className="relative text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 backdrop-blur text-zinc-300">
                        {project.tag}
                      </span>
                    </div>
                    <div className="p-3 sm:p-5">
                      <h3 className="text-base sm:text-lg font-semibold group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-zinc-400 text-sm leading-relaxed">{project.desc}</p>
                      <p className="mt-3 text-sm font-medium text-emerald-400">{project.result}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* TARIFS */}
        <section id="tarifs" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
              <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">Tarifs</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Des offres claires, sans surprise
              </h2>
              <p className="mt-3 sm:mt-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                Choisissez la formule adaptée à votre activité. Paiement en une ou deux fois possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 items-stretch">
              {[
                {
                  name: "Starter",
                  price: "299€",
                  desc: "Site vitrine simple pour démarrer votre présence en ligne.",
                  features: ["1 à 3 pages", "Design responsive", "Formulaire de contact", "Livraison 7 jours"],
                  popular: false,
                },
                {
                  name: "Business",
                  price: "499€",
                  desc: "Site professionnel optimisé pour convertir vos visiteurs.",
                  features: ["Jusqu'à 5 pages", "SEO de base", "Intégration WhatsApp", "Livraison 10 jours"],
                  popular: true,
                },
                {
                  name: "Premium",
                  price: "899€",
                  desc: "Solution complète pour dominer votre marché local.",
                  features: ["Pages illimitées", "SEO avancé", "Optimisation vitesse", "Support 30 jours"],
                  popular: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col p-3 sm:p-5 rounded-2xl border transition-all duration-300 ${
                    plan.popular
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-xl shadow-zinc-950/20"
                      : "bg-white border-zinc-200 hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                      Le plus choisi
                    </span>
                  )}
                  <h3 className="text-xs sm:text-sm font-semibold">{plan.name}</h3>
                  <p className={`mt-1 text-xs ${plan.popular ? "text-zinc-400" : "text-zinc-600"}`}>
                    {plan.desc}
                  </p>
                  <p className="mt-2 text-lg sm:text-xl font-bold">
                    {plan.price}
                    <span className={`text-xs font-normal ${plan.popular ? "text-zinc-500" : "text-zinc-400"}`}>
                      {" "}TTC
                    </span>
                  </p>
                  <ul className={`mt-3 space-y-2 text-xs flex-1 ${plan.popular ? "text-zinc-300" : "text-zinc-600"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 block text-center py-2 rounded-lg font-semibold transition-all hover:scale-[1.02] text-xs ${
                      plan.popular
                        ? "bg-white text-zinc-950 hover:bg-zinc-100"
                        : "bg-zinc-950 text-white hover:bg-zinc-800"
                    }`}
                  >
                    Choisir {plan.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
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

                {/* WhatsApp alternative */}
                <div className="flex flex-col gap-3 sm:gap-5">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 border border-white/10 text-center lg:text-left"
                  >
                    <div className="w-11 h-11 sm:w-13 sm:h-13 mx-auto lg:mx-0 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-3 sm:mb-5">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Discuter sur WhatsApp</h3>
                    <p className="text-zinc-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      Devis gratuit en 5 minutes. Réponse garantie sous 24h — idéal si vous préférez le chat instantané.
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 sm:px-7 py-3 sm:py-3.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/25"
                    >
                      Ouvrir WhatsApp
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-card rounded-2xl p-3 sm:p-5 border border-white/10 text-center"
                  >
                    <p className="text-xs sm:text-sm text-zinc-500">
                      Ou appelez directement :{" "}
                      <a href="tel:+33749635085" className="text-zinc-300 hover:text-white transition-colors font-medium">
                        07 49 63 50 85
                      </a>
                    </p>
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
