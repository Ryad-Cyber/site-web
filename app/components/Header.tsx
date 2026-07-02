"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

const DESKTOP_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/#services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

const MOBILE_LINKS = [
  { href: "/designs", label: "Réalisations" },
  { href: "/projects", label: "Projets" },
  { href: "/results", label: "Résultats" },
  { href: "/why-us", label: "Why us / Pourquoi nous" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
      <nav className="max-w-6xl mx-auto h-16 sm:h-[4.25rem] px-3 sm:px-5 rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-[0_20px_70px_-28px_rgba(0,0,0,0.8)] ring-1 ring-white/5 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-3 transition-all hover:opacity-90">
          <Image
            src="/Ryad_Studio.png"
            alt="Ryad Web Studio"
            width={44}
            height={44}
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl object-cover ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text font-semibold tracking-tight text-base sm:text-lg text-transparent">Ryad Web Studio</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-zinc-400">Agence digitale premium</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 text-sm h-full">
          {DESKTOP_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative inline-flex h-full items-center text-zinc-300 transition-all duration-300 hover:text-white"
            >
              <span>{link.label}</span>
              <span className="absolute left-0 right-0 bottom-[-1px] h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-white/70 via-zinc-200 to-white/70 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* CTA + Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-white text-zinc-950 shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(255,255,255,0.18)]"
          >
            <span className="hidden sm:inline">Obtenir un devis gratuit</span>
            <span className="sm:hidden">Devis gratuit</span>
          </a>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
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
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="inline-flex items-center gap-3">
                  <Image
                    src="/Ryad_Studio.png"
                    alt="Ryad Web Studio"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-2xl object-cover ring-1 ring-white/10 shadow-lg shadow-violet-500/20"
                    priority
                  />
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

              {/* Mobile Nav Links */}
              <div className="flex-1 px-5 py-8 space-y-3 overflow-y-auto">
                {MOBILE_LINKS.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative block rounded-2xl border border-white/10 bg-gradient-to-r from-white/8 to-white/3 px-5 py-4 transition-all duration-300 hover:border-white/25 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/8"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {link.label}
                      </p>
                      <svg className="w-4 h-4 text-zinc-600 group-hover:text-blue-300 transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="border-t border-white/10 px-5 py-4"
              >
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-3 text-center rounded-lg bg-white text-zinc-950 font-semibold hover:bg-zinc-100 transition-all hover:scale-[1.01] shadow-md shadow-white/10 text-sm"
                >
                  Obtenir un devis gratuit
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}