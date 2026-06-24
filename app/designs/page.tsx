"use client";

import Header from "../components/Header";
import DesignCarousel, { type CarouselSlide } from "../components/DesignCarousel";
import { motion } from "framer-motion";
import { useState } from "react";

type Design = {
  id: number;
  name: string;
  category: string;
  description: string;
  gradient: string;
  accentColor: string;
  mockup: string;
  features: string[];
  testimonial: string;
  slides: CarouselSlide[];
};

export default function DesignsPage() {
  const [selectedProject, setSelectedProject] = useState(0);

  const designs: Design[] = [
    {
      id: 1,
      name: "Barbershop Studio",
      category: "Beauté & Coiffure",
      description: "Salon de coiffure premium avec système de réservation et portfolio",
      gradient: "from-amber-500/20 via-orange-500/10 to-red-500/5",
      accentColor: "amber",
      mockup: "🪑",
      features: ["Réservation en ligne", "Portfolio", "Avis clients", "Tarifs"],
      testimonial: "Nous avons augmenté nos rendez-vous de 180% en 3 mois.",
      slides: [
        {
          label: "L'univers",
          caption: "Un salon moderne où l'ambiance premium attire une clientèle exigeante.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80&auto=format&fit=crop",
          alt: "Salon de coiffure barbier moderne",
        },
        {
          label: "Réserver",
          caption: "Découvrez le site en action.",
          type: "video",
          src: "/video_barber.mp4",
        },
        {
          label: "Nos clients",
          caption: "Des clients satisfaits qui reviennent.",
          type: "photo",
          src: "/client_barber.png",
          alt: "Client satisfait",
        },
      ],
    },
    {
      id: 2,
      name: "Restauration",
      category: "Restaurant Gastronomique",
      description: "Restaurant de luxe avec menu, réservations et photographie exceptionnelle",
      gradient: "from-red-500/20 via-pink-500/10 to-rose-500/5",
      accentColor: "red",
      mockup: "🍽️",
      features: ["Menu digital", "Réservations", "Photos HD", "Localisation"],
      testimonial: "Le design élégant de notre site a changé la perception de notre restaurant.",
      slides: [
        {
          label: "L'univers",
          caption: "Une salle élégante qui mérite d'être découverte avant même la première bouchée.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
          alt: "Intérieur de restaurant gastronomique",
        },
        {
          label: "Réserver",
          caption: "Menu digital, réservations et photos HD pour séduire avant la visite.",
          type: "mockup",
          variant: "restaurant",
        },
        {
          label: "Le résultat",
          caption: "Tables réservées en avance, file d'attente en ligne, réputation renforcée.",
          type: "outcome",
          variant: "restaurant",
          src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
          alt: "Clients dînant dans un restaurant animé",
          metrics: [
            { value: "+120%", label: "Réservations web" },
            { value: "3×", label: "Visibilité locale" },
            { value: "85%", label: "Taux de remplissage" },
            { value: "+45%", label: "Avis en ligne" },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Fit Studio",
      category: "Coaching Fitness",
      description: "Plateforme de coaching moderne avec programmes d'entraînement et espace membre",
      gradient: "from-lime-500/20 via-green-500/10 to-emerald-500/5",
      accentColor: "lime",
      mockup: "💪",
      features: ["Programmes", "Tableau de bord", "Coaching en direct", "Communauté"],
      testimonial: "Le design moderne et les animations ont rendu mon plateforme irrésistible.",
      slides: [
        {
          label: "L'univers",
          caption: "Un coaching moderne, une énergie qui donne envie de s'engager dès la première seconde.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80&auto=format&fit=crop",
          alt: "Coach fitness en séance d'entraînement",
        },
        {
          label: "Réserver",
          caption: "Programmes, tarifs et prise de contact — une plateforme qui vend votre méthode.",
          type: "mockup",
          variant: "fitness",
        },
        {
          label: "Le résultat",
          caption: "Plus de membres, plus d'engagement, une présence en ligne qui inspire confiance.",
          type: "outcome",
          variant: "fitness",
          src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop",
          alt: "Salle de sport moderne avec clients actifs",
          metrics: [
            { value: "+90%", label: "Demandes coaching" },
            { value: "2×", label: "Engagement en ligne" },
            { value: "+150", label: "Membres actifs" },
            { value: "Top 3", label: "Recherche locale" },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Web Studio",
      category: "Plateforme SaaS",
      description: "Outil de gestion de projet nouvelle génération avec collaboration en temps réel",
      gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/5",
      accentColor: "blue",
      mockup: "📊",
      features: ["Temps réel", "Analytiques", "API", "Intégrations"],
      testimonial: "Ryad a créé une expérience utilisateur qui dépasse nos attentes.",
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
          alt: "Tableau de bord analytics avec croissance",
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
      category: "Entreprise Locale",
      description: "Site web de prestataire premium avec système de devis instantané",
      gradient: "from-purple-500/20 via-violet-500/10 to-indigo-500/5",
      accentColor: "purple",
      mockup: "🔧",
      features: ["Devis instantanés", "Portfolio", "Avis clients", "Contact"],
      testimonial: "Notre présence en ligne a complètement transformé notre business.",
      slides: [
        {
          label: "L'univers",
          caption: "Un artisan ou prestataire local dont le savoir-faire mérite d'être visible en ligne.",
          type: "photo",
          src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
          alt: "Professionnel du bâtiment au travail",
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
          alt: "Équipe de professionnels sur un chantier",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/15 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-violet-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
              Notre galerie
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Designs qui
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                transforment les affaires
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Des interfaces premium conçues pour impressionner et convertir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Showcase Carousel */}
            <motion.div
              key={`carousel-${selectedProject}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <DesignCarousel
                slides={designs[selectedProject].slides}
                accentGradient={designs[selectedProject].gradient}
                projectKey={selectedProject}
              />
            </motion.div>

            {/* Featured Content */}
            <div className="relative order-2 lg:order-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${designs[selectedProject].gradient} rounded-3xl blur-3xl opacity-30`} />
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-3">
                    {designs[selectedProject].category}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
                    {designs[selectedProject].name}
                  </h2>
                  <p className="text-base text-zinc-300 mb-6 leading-relaxed">
                    {designs[selectedProject].description}
                  </p>

                  {/* Testimonial */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm italic text-zinc-300">
                      "{designs[selectedProject].testimonial}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Project Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3"
          >
            {designs.map((design, index) => (
              <motion.button
                key={design.id}
                onClick={() => setSelectedProject(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative p-4 rounded-xl border transition-all duration-300 ${
                  selectedProject === index
                    ? "bg-white/15 border-white/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{design.mockup}</div>
                <p className="text-xs font-semibold text-white text-left line-clamp-2">
                  {design.name}
                </p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Tous nos projets
            </h2>
            <p className="text-base text-zinc-400 max-w-xl mx-auto">
              Cliquez sur un projet pour le voir en détail.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {designs.map((design, idx) => (
              <motion.button
                key={design.id}
                variants={itemVariants}
                onClick={() => setSelectedProject(idx)}
                whileHover={{ y: -4 }}
                className="group text-left"
              >
                <div className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${design.gradient} backdrop-blur-xl p-6 h-full overflow-hidden hover:border-white/20 transition-all duration-300`}>
                  <div className="relative">
                    <div className="text-4xl mb-3">{design.mockup}</div>
                    <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-2">
                      {design.category}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                      {design.name}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {design.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>


      {/* CTA FINAL */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Crééons votre projet ensemble
            </h2>
            <p className="text-base text-zinc-400 mb-6 max-w-xl mx-auto leading-relaxed">
              Chaque projet commence par une conversation gratuite.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all hover:scale-[1.02]"
            >
              Demander un devis gratuit
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
