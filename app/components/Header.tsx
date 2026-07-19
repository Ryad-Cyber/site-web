"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

// Liens de navigation principaux (sections de la home + accueil)
const PRIMARY_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/#services", label: "Services" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

// Pages du site
const PAGE_LINKS = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/results", label: "Résultats" },
  { href: "/why-us", label: "Pourquoi nous" },
];

function MenuToggle({ open, lightBars }: { open: boolean; lightBars: boolean }) {
  const bar = `absolute left-0 block h-[1.5px] w-5 rounded-full ${lightBars ? "bg-zinc-950" : "bg-white"}`;
  const t = { duration: 0.3, ease: EASE };
  return (
    <span className="relative block h-5 w-5">
      <motion.span
        className={bar}
        style={{ top: 5 }}
        animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
        transition={t}
      />
      <motion.span
        className={bar}
        style={{ top: 9 }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className={bar}
        style={{ top: 13 }}
        animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
        transition={t}
      />
    </span>
  );
}

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

  // Fermeture au clavier / au scroll — la page n'est jamais verrouillée
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const onScroll = () => setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mobileMenuOpen]);

  const close = () => setMobileMenuOpen(false);
  const transparent = isHome && !scrolled;
  const lightBars = isLightPage;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav
        className={`relative z-50 max-w-6xl mx-auto h-16 sm:h-[4.5rem] px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors duration-500 ${
          transparent
            ? "bg-transparent border-b border-transparent"
            : isLightPage
            ? "bg-white/70 backdrop-blur-sm border-b border-zinc-200"
            : "bg-black/40 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={close}
          className="inline-flex items-center transition-opacity hover:opacity-80"
        >
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
          {PRIMARY_LINKS.map((link) => (
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

        {/* CTA + Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className={`hidden sm:inline-flex items-center justify-center text-sm font-medium tracking-tight px-4 py-2 rounded-full transition-transform duration-300 hover:scale-[1.03] ${
              lightBars ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
            }`}
          >
            Obtenir un devis
          </a>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={`relative z-50 p-2 rounded-full transition-colors duration-300 ${
              lightBars ? "hover:bg-zinc-950/10" : "hover:bg-white/10"
            }`}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            <MenuToggle open={mobileMenuOpen} lightBars={lightBars} />
          </button>
        </div>
      </nav>

      {/* Menu — panneau flottant ancré sous le header, le site reste visible */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Voile très léger : ferme au clic, sans masquer la page */}
            <motion.button
              key="scrim"
              type="button"
              aria-label="Fermer le menu"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed inset-0 z-40 cursor-default bg-zinc-950/25 backdrop-blur-[2px]"
            />

            <div className="pointer-events-none absolute inset-x-0 top-full z-50 max-w-6xl mx-auto px-4 sm:px-6">
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE }}
                className="pointer-events-auto ml-auto w-full sm:w-[22rem] origin-top sm:origin-top-right overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0b]/90 text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)] backdrop-blur-xl"
              >
                <div className="max-h-[calc(100svh-7rem)] overflow-y-auto p-6 sm:p-7">
                  {/* Navigation principale */}
                  <div className="flex flex-col">
                    {PRIMARY_LINKS.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={close}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.045, duration: 0.4, ease: EASE }}
                        className="group -mx-2 rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-white/[0.04]"
                      >
                        <span className="text-xl font-[family-name:var(--font-instrument-serif)] font-normal italic tracking-tight text-zinc-300 transition-colors duration-300 group-hover:text-white">
                          {link.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Pages */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.08 + PRIMARY_LINKS.length * 0.045, duration: 0.4 }}
                    className="mt-7 mb-1 text-[10px] uppercase tracking-[0.3em] text-zinc-600"
                  >
                    Explorer
                  </motion.p>
                  <div className="flex flex-col">
                    {PAGE_LINKS.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={close}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.08 + (PRIMARY_LINKS.length + i) * 0.045,
                          duration: 0.4,
                          ease: EASE,
                        }}
                        className="group -mx-2 flex items-center justify-between rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-white/[0.04]"
                      >
                        <span className="text-sm text-zinc-400 transition-colors duration-300 group-hover:text-white">
                          {link.label}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-zinc-600 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.a>
                    ))}
                  </div>

                  {/* Bas — CTA + contact direct */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.45, ease: EASE }}
                    className="mt-7 pt-5 border-t border-white/10"
                  >
                    <a
                      href="/#contact"
                      onClick={close}
                      className="block w-full px-5 py-3 text-center rounded-full bg-white text-zinc-950 text-sm font-medium tracking-tight transition-transform hover:scale-[1.02]"
                    >
                      Obtenir un devis gratuit
                    </a>
                    <a
                      href="tel:+33749635085"
                      className="mt-3 block text-center text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      07 49 63 50 85
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
