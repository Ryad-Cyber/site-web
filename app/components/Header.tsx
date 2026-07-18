"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function MenuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
  { href: "/realisations", label: "Réalisations" },
  { href: "/results", label: "Résultats" },
  { href: "/why-us", label: "Why us / Pourquoi nous" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isLightPage = pathname === "/results";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav
        className={`max-w-6xl mx-auto h-16 sm:h-[4.5rem] px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors duration-500 ${
          transparent
            ? "bg-transparent border-b border-transparent"
            : isLightPage
            ? "bg-white/70 backdrop-blur-sm border-b border-zinc-200"
            : "bg-black/40 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        {/* Logo */}
        <a href="/" className="inline-flex items-center transition-opacity hover:opacity-80">
          <Image
            src="/RyadStudio.png"
            alt="Ryad Web Studio"
            width={176}
            height={70}
            className="h-8 sm:h-9 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-9 text-sm h-full">
          {DESKTOP_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`group relative inline-flex h-full items-center tracking-wide transition-colors duration-300 ${
                isLightPage
                  ? "text-zinc-600 hover:text-zinc-950"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <span>{link.label}</span>
              <span
                className={`absolute left-0 right-0 bottom-[-1px] h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  isLightPage ? "bg-zinc-950/70" : "bg-white/70"
                }`}
              />
            </a>
          ))}
        </div>

        {/* CTA + Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className={`hidden sm:inline-flex items-center justify-center text-sm font-medium tracking-tight px-4 py-2 rounded-full transition-transform duration-300 hover:scale-[1.03] ${
              isLightPage ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
            }`}
          >
            Obtenir un devis
          </a>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isLightPage ? "text-zinc-950 hover:bg-zinc-950/10" : "text-white hover:bg-white/10"
            }`}
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
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#0a0a0b] border-l border-white/10 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Image
                  src="/RyadStudio.png"
                  alt="Ryad Web Studio"
                  width={156}
                  height={62}
                  className="h-8 w-auto object-contain"
                  priority
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-2 rounded-full transition-colors hover:bg-white/10"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 px-6 py-8 space-y-1 overflow-y-auto">
                {MOBILE_LINKS.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-between rounded-xl px-4 py-4 tracking-wide transition-colors duration-300 hover:bg-white/5"
                  >
                    <p className="text-base font-normal text-zinc-200 group-hover:text-white transition-colors">
                      {link.label}
                    </p>
                    <svg className="w-4 h-4 text-zinc-600 group-hover:text-white transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="border-t border-white/10 px-6 py-5"
              >
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3.5 text-center rounded-full bg-white text-zinc-950 font-medium tracking-tight transition-transform hover:scale-[1.01]"
                >
                  Obtenir un devis gratuit
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
