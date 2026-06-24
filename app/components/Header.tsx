"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-header border-b border-white/10 shadow-black/25 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-5">
        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-3 text-white font-semibold tracking-tight text-lg sm:text-xl transition-all hover:opacity-90">
          <span className="flex items-center justify-center w-12 h-12 rounded-3xl bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg shadow-violet-500/25 text-white">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 10.5V6.75A3.75 3.75 0 0011.25 3h-1.5A3.75 3.75 0 006 6.75v10.5A3.75 3.75 0 009.75 21h1.5A3.75 3.75 0 0015 17.25V13.5" />
              <path d="M9 12h6" />
            </svg>
          </span>
          <div className="flex flex-col leading-tight">
            <span>Ryad Web Studio</span>
            <span className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">Agence digitale premium</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-base h-full">
          {[
            { href: "/#home", label: "Accueil" },
            { href: "/#tarifs", label: "Tarifs" },
            { href: "/#projets", label: "Projets" },
            { href: "/#contact", label: "Contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative inline-flex h-full items-center text-white transition-all duration-300 group"
            >
              <span>{link.label}</span>
              <span className="absolute left-0 right-0 bottom-[-2px] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-blue-400 to-violet-400 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-white via-slate-200 to-slate-100 text-zinc-950 shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all"
          >
            Obtenir un devis
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-sm hover:bg-white/10 transition-all"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-transparent"
          onClick={() => setMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.8 }}
            className="absolute right-0 top-18 w-full max-w-sm max-h-[calc(100vh-4.5rem)] bg-zinc-950/98 border-l border-white/15 shadow-2xl shadow-black/30 backdrop-blur-xl flex flex-col overflow-hidden rounded-tl-3xl rounded-bl-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="inline-flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-violet-500/30">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 10.5V6.75A3.75 3.75 0 0011.25 3h-1.5A3.75 3.75 0 006 6.75v10.5A3.75 3.75 0 009.75 21h1.5A3.75 3.75 0 0015 17.25V13.5" />
                    <path d="M9 12h6" />
                  </svg>
                </span>
                <div className="flex flex-col leading-tight">
                  <p className="text-sm font-bold text-white">Menu</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Navigation</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all"
              >
                <CloseIcon />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-5 py-8 space-y-3 overflow-y-auto">
              {[
                { href: "/why-us", label: "Pourquoi nous", icon: "✨", subtitle: "Découvrir notre approche" },
                { href: "/designs", label: "Designs", icon: "🎨", subtitle: "Voir nos designs" },
                { href: "/projects", label: "Projets", icon: "🚀", subtitle: "Explorer notre portfolio" },
                { href: "/results", label: "Résultats", icon: "📈", subtitle: "L'impact concret d'un site pro" },
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative block rounded-2xl border border-white/10 bg-gradient-to-r from-white/8 to-white/3 px-5 py-4 transition-all duration-300 hover:border-white/25 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/8 hover:shadow-lg hover:shadow-violet-500/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{link.icon}</span>
                    <div className="flex-1">
                      <p className="text-base font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {link.label}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5 group-hover:text-zinc-400 transition-colors">
                        {link.subtitle}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-zinc-600 group-hover:text-blue-300 transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Hover gradient background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-violet-500/5 rounded-2xl transition-opacity duration-300 pointer-events-none" />
                </motion.a>
              ))}
            </div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="border-t border-white/10 px-5 py-4 space-y-2"
            >
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-3 py-2.5 text-center rounded-lg bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all hover:scale-[1.01] shadow-md shadow-white/10 text-xs"
              >
                Obtenir un devis gratuit
              </a>
              <a
                href="tel:+33749635085"
                className="block w-full px-3 py-2.5 text-center rounded-lg border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all text-xs"
              >
                Appeler directement
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}
