"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/Header";
import DesignCarousel, { type CarouselSlide } from "../components/DesignCarousel";

type Project = {
  id: number;
  name: string;
  category: string;
  description: string;
  gradient: string;
  mockup: string;
  features: string[];
  testimonial: string;
  slides: CarouselSlide[];
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      name: "Barbershop",
      category: "Beauté & Coiffure",
      description: "Un salon premium avec prise de rendez-vous, galerie et une identité visuelle qui attire dès la première visite.",
      gradient: "from-amber-500/20 via-orange-500/10 to-red-500/5",
      mockup: "🪑",
      features: ["Réservation", "Galerie", "Avis clients", "Prestige"],
      testimonial: "Le site a transformé notre image et multiplié les rendez-vous web.",
      slides: [
        {
          label: "L'univers",
          caption: "Une expérience élégante, moderne et pensée pour une clientèle exigeante.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80&auto=format&fit=crop",
          alt: "Salon de coiffure premium",
        },
        {
          label: "Réserver",
          caption: "Une page de réservation fluide, mobile-friendly et simple à utiliser.",
          type: "mockup",
          variant: "barber",
        },
      ],
    },
    {
      id: 2,
      name: "Restaurant",
      category: "Restaurant Gastronomique",
      description: "Une présence élégante avec menu digital, réservations et storytelling visuel pour séduire avant même la visite.",
      gradient: "from-red-500/20 via-pink-500/10 to-rose-500/5",
      mockup: "🍽️",
      features: ["Menu digital", "Réservations", "Photos HD", "Localisation"],
      testimonial: "Le design du site a renforcé notre image et simplifié les réservations.",
      slides: [
        {
          label: "L'univers",
          caption: "Un univers visuel soigné pour raconter votre expérience avant l'arrivée.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
          alt: "Restaurant gastronomique",
        },
        {
          label: "Réserver",
          caption: "Un parcours de réservation premium, rapide et clair.",
          type: "mockup",
          variant: "restaurant",
        },
      ],
    },
    {
      id: 3,
      name: "Location de véhicules",
      category: "Mobilité & transport",
      description: "Un site moderne pour présenter votre flotte, mettre en avant les disponibilités et simplifier la réservation.",
      gradient: "from-sky-500/20 via-cyan-500/10 to-slate-500/5",
      mockup: "🚗",
      features: ["Réservation", "Disponibilités", "Tarifs", "Mobile"],
      testimonial: "La perception premium du site a rendu la réservation plus simple et plus rassurante.",
      slides: [
        {
          label: "L'univers",
          caption: "Une expérience de mobilité haut de gamme, fluide et crédible.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format&fit=crop",
          alt: "Voiture premium",
        },
        {
          label: "Réserver",
          caption: "Tarifs, documents et prise de contact en quelques secondes.",
          type: "mockup",
          variant: "services",
        },
      ],
    },
    {
      id: 4,
      name: "Commerce local",
      category: "Boutique & service",
      description: "Un site clair et performant pour présenter vos produits, votre service et générer des contacts qualifiés.",
      gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/5",
      mockup: "🛍️",
      features: ["Présentation", "Devis", "Avis", "Conversion"],
      testimonial: "Le site nous a permis de mieux convertir les visiteurs en clients.",
      slides: [
        {
          label: "L'univers",
          caption: "Un design moderne qui donne du relief à votre activité et renforce votre crédibilité.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80&auto=format&fit=crop",
          alt: "Commerce local premium",
        },
        {
          label: "Réserver",
          caption: "Un parcours simple, rapide et orienté résultats pour votre activité.",
          type: "mockup",
          variant: "services",
        },
      ],
    },
    {
      id: 5,
      name: "Autre projet",
      category: "Projet sur mesure",
      description: "Nous pouvons aussi créer un site web ou une application mobile pour toute autre activité, à partir de votre besoin précis.",
      gradient: "from-zinc-500/20 via-stone-500/10 to-slate-500/5",
      mockup: "✨",
      features: ["Sur mesure", "Web & mobile", "Besoin précis", "Adaptation"],
      testimonial: "Chaque projet peut être pensé différemment pour une réalité unique.",
      slides: [
        {
          label: "L'univers",
          caption: "Une expérience digitale pensée pour votre activité, quel que soit votre secteur.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80&auto=format&fit=crop",
          alt: "Projet personnalisé",
        },
        {
          label: "Réserver",
          caption: "Contactez-nous pour créer quelque chose d'adapté à votre activité.",
          type: "mockup",
          variant: "saas",
        },
      ],
    },
  ];

  const selected = projects[selectedProject];

  const handleProjectAdvance = () => {
    setSelectedProject((prev) => (prev + 1) % projects.length);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <Header />

      <section className="relative min-h-[74vh] flex items-center justify-center pt-24 pb-10 overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <div className="absolute top-0 left-1/4 w-[480px] h-[480px] bg-blue-500/20 blur-[140px] rounded-full" />
          <div className="absolute top-1/2 right-0 w-[360px] h-[360px] bg-violet-500/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[620px] h-[280px] bg-pink-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
              Nos projets
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Des projets pensés pour
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                des sites web et des apps mobiles premium
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Nous créons des interfaces élégantes, des expériences mobiles et des parcours de conversion pour des commerces, services, entreprises locales ou projets plus spécifiques.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Site web</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Application mobile</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Expérience sur mesure</span>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {projects.map((project, index) => {
              const isActive = selectedProject === index;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(index)}
                  className={`min-w-[180px] flex-1 rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-white/25 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{project.mockup}</span>
                    <span className="text-sm font-semibold text-white">{project.name}</span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{project.category}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 sm:p-8 lg:p-10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-3">
                {selected.category}
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                {selected.name}
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6">
                {selected.description}
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-8 border-l border-white/10 pl-4 italic">
                “{selected.testimonial}”
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {selected.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300">
                    {feature}
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/70 p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">Ce que nous livrons</p>
                <p className="text-base text-white leading-relaxed">
                  Une présence digitale premium, pensée pour votre activité, avec un site web, une application mobile ou une expérience hybride si besoin.
                </p>
              </div>
            </motion.div>

            <DesignCarousel slides={selected.slides} accentGradient={selected.gradient} projectKey={selected.id} />
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 sm:p-10 lg:p-12">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-3">
                Au-delà des exemples
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                Sites web, apps mobiles et expériences sur mesure pour toute activité
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                Que vous soyez une entreprise locale, un commerce, un cabinet, une boutique ou un service plus spécifique, nous adaptons la solution à votre réalité et à vos objectifs.
              </p>
            </div>
            <button
              type="button"
              onClick={handleProjectAdvance}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              Voir un autre projet
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Votre prochain projet commence ici</h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Une analyse et une proposition gratuites pour voir si nous sommes le bon partenaire pour votre visibilité digitale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#contact" className="rounded-2xl bg-white px-8 py-4 font-semibold text-zinc-950 transition-all hover:bg-zinc-100">
                Demander un devis
              </a>
              <a href="tel:+33749635085" className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10">
                Appeler directement
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
