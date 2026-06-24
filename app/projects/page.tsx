"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Studio de Coiffure Premium",
      category: "Barbier / Salon",
      description: "Site haute-gamme avec prise de rendez-vous intégrée et galerie photos.",
      image: "🪑",
      stats: ["120+ clients/mois", "2 ans en ligne", "4.9★ avis"],
      color: "from-amber-500/20 to-orange-500/10",
      features: ["Réservation", "Galerie", "Avis clients", "Localisation"],
    },
    {
      id: 2,
      title: "Restaurant Étoilé",
      category: "Restaurant",
      description: "Plateforme élégante avec menu digital, réservations et photos des plats.",
      image: "🍽️",
      stats: ["80+ réservations/mois", "18 mois en ligne", "5★ avis"],
      color: "from-red-500/20 to-pink-500/10",
      features: ["Menu digital", "Réservations", "Photos HD", "Livraison"],
    },
    {
      id: 3,
      title: "Coach Fitness Digital",
      category: "Coach / Fitness",
      description: "Site dynamique avec programme d'entraînement et section membres premium.",
      image: "💪",
      stats: ["200+ abonnés", "1 an en ligne", "4.8★ satisfaction"],
      color: "from-lime-500/20 to-green-500/10",
      features: ["Programmes", "Espace Membre", "Coaching Live", "Nutrition"],
    },
    {
      id: 4,
      title: "Artisan Plomberie",
      category: "Entreprise locale",
      description: "Site professionnel pour artisan local avec devis rapide et interventions.",
      image: "🔧",
      stats: ["50+ appels/mois", "1 an en ligne", "4.9★ recommandé"],
      color: "from-blue-500/20 to-cyan-500/10",
      features: ["Devis rapide", "Urgences", "Tarifs", "Secteur"],
    },
    {
      id: 5,
      title: "SaaS Analytics",
      category: "Startup SaaS",
      description: "Plateforme d'analyse données avec dashboard et API intégrée.",
      image: "📊",
      stats: ["5000+ utilisateurs", "2 ans en ligne", "4.7★ produit"],
      color: "from-violet-500/20 to-purple-500/10",
      features: ["Tableau de bord", "API", "Export", "Analytiques"],
    },
    {
      id: 6,
      title: "E-Commerce Mode",
      category: "E-Commerce",
      description: "Boutique en ligne luxe avec catalogue complet et paiements sécurisés.",
      image: "👗",
      stats: ["1000+ commandes", "1.5 ans en ligne", "4.9★ clients"],
      color: "from-pink-500/20 to-rose-500/10",
      features: ["Catalogue", "Paiements", "Retours", "Expeditions"],
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
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-500/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
              Nos réalisations
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Votre site web
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                commence ici
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Découvrez comment des entreprises locales ont transformé leur présence digitale avec un site web professionnel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400 text-sm uppercase tracking-widest"
          >
            Explorer {projects.length} projets réussis
          </motion.div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative p-6 sm:p-8 h-full flex flex-col">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-5xl sm:text-6xl mb-4 inline-block w-fit"
                  >
                    {project.image}
                  </motion.div>

                  {/* Title & Category */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-blue-400 mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-white/10">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-xs text-zinc-500 mb-1">
                          {["Croissance", "Durée", "Satisfaction"][i]}
                        </p>
                        <p className="text-sm font-semibold text-white">{stat}</p>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-300 group-hover:bg-white/20 transition-all"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white hover:text-zinc-950 transition-all duration-300 group-hover:scale-105"
                  >
                    Demander un devis
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent pointer-events-none transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CASE STUDY SHOWCASE */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Résultats mesurables
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Pas de promesses vides. Voici ce que nous avons réalisé pour nos clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Augmentation du trafic",
                value: "+250%",
                description: "En moyenne sur 6 mois après lancement",
              },
              {
                title: "Appels qualifiés",
                value: "+150%",
                description: "Visiteurs convertis en clients directs",
              },
              {
                title: "Taux de conversion",
                value: "3-5%",
                description: "Bien au-dessus de la moyenne de l'industrie",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 hover:bg-white/10 transition-all"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-blue-400 mb-3">
                  {stat.title}
                </p>
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-zinc-400">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Votre projet est le suivant
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Transformez votre présence digitale. Analyse et proposition gratuites — engagez-vous seulement si vous êtes convaincu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="px-8 py-4 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all"
              >
                Demander un devis
              </a>
              <a
                href="tel:+33749635085"
                className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Appeler directement
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
