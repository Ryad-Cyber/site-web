"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Réseaux sociaux — icône monochrome au repos, couleur réelle de la plateforme au survol
const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@ryad.bjn_",
    href: "https://instagram.com/ryad.bjn_",
    // dégradé officiel Instagram
    hoverClass:
      "group-hover:bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] group-hover:border-transparent group-hover:text-white",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Snapchat",
    handle: "ryadbjn",
    href: "https://snapchat.com/add/ryadbjn",
    // jaune Snapchat — icône sombre pour rester lisible
    hoverClass:
      "group-hover:bg-[#FFFC00] group-hover:border-transparent group-hover:text-zinc-950",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 0c-1.5 0-4.5.75-5.25 4.5-.187.937-.14 2.25-.093 3.281v.047c0 .14-.047.234-.14.281-.14.094-.375.14-.657.047-.28-.093-.61-.234-.984-.234-.328 0-.703.093-1.031.328-.281.187-.422.469-.422.797 0 .422.281.797.75 1.031.14.047.328.14.516.187.469.14 1.172.375 1.36.844.093.234.046.516-.094.844-.047.093-1.032 2.531-3.375 2.906-.187.047-.328.235-.281.469.047.328.61.657 1.735.844.093 0 .187.14.234.375.047.14.094.328.14.516.048.187.188.421.516.421.14 0 .282-.047.469-.093.281-.047.656-.14 1.125-.14.281 0 .563.046.844.093.562.094 1.03.422 1.546.797.75.516 1.5 1.078 2.767 1.078.046 0 .093 0 .14-.047h.14c1.266 0 2.016-.562 2.766-1.078.516-.375.984-.703 1.547-.797.28-.047.562-.093.843-.093.47 0 .844.093 1.125.14.188.046.329.093.47.093h.046c.234 0 .421-.093.515-.421.047-.188.094-.375.14-.516.048-.234.141-.375.235-.375 1.125-.187 1.687-.516 1.734-.844.047-.234-.093-.422-.28-.469-2.345-.375-3.33-2.813-3.376-2.906-.14-.328-.187-.61-.094-.844.188-.469.89-.703 1.36-.844.187-.047.375-.14.515-.187.375-.14.797-.469.75-1.078-.047-.422-.469-.797-1.031-.797-.188 0-.375.047-.563.093-.328.094-.61.188-.844.188-.234 0-.421-.047-.515-.14-.094-.048-.14-.141-.14-.282v-.047c.046-1.03.093-2.343-.094-3.28C16.531.75 13.531 0 12.031 0z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    handle: "ryadboujenan",
    href: "https://www.pinterest.com/ryadboujenan",
    // rouge Pinterest
    hoverClass:
      "group-hover:bg-[#E60023] group-hover:border-transparent group-hover:text-white",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592.001 11.985.001L12.017 0z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "ryadboujenan",
    href: "https://www.youtube.com/@ryadboujenan",
    // rouge YouTube
    hoverClass:
      "group-hover:bg-[#FF0000] group-hover:border-transparent group-hover:text-white",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@ryad.bjn_",
    href: "https://www.tiktok.com/@ryad.bjn_",
    // rose TikTok
    hoverClass:
      "group-hover:bg-[#EE1D52] group-hover:border-transparent group-hover:text-white",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
];

const NAVIGATION = [
  { label: "Réalisations", href: "/realisations" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Résultats", href: "/results" },
  { label: "Pourquoi nous", href: "/why-us" },
  { label: "FAQ", href: "/#faq" },
];

const SERVICES = [
  { label: "Création de sites web", href: "/#services" },
  { label: "Refonte & Redesign", href: "/refonte-site-internet" },
  { label: "SEO & Visibilité", href: "/#services" },
  { label: "Applications web", href: "/#services" },
];

const CONTACT = [
  { label: "07 49 63 50 85", href: "tel:+33749635085" },
  { label: "WhatsApp", href: "https://wa.me/33749635085" },
  { label: "Email", href: "mailto:ryadboujenan@outlook.com" },
  { label: "Formulaire", href: "/#contact" },
];

const LEGAL = [
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  { label: "CGV", href: "#" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-600">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[13px] text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    // Fond volontairement plus sombre que la section Contact (zinc-950) :
    // c'est ce décalage, avec le filet et l'air au-dessus, qui sépare les deux blocs.
    <footer className="relative bg-[#050506] text-zinc-400">
      {/* Transition — filet lumineux dégradé + halo doux */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-10 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marque */}
          <div className="lg:col-span-5">
            <a href="/" className="inline-flex transition-opacity hover:opacity-80">
              <Image
                src="/RyadStudio.png"
                alt="Ryad Web Studio"
                width={176}
                height={70}
                className="h-8 w-auto object-contain"
              />
            </a>
            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-zinc-500">
              Sites web sur-mesure pour les entreprises locales qui veulent être trouvées et
              recevoir des demandes.
            </p>

            <a
              href="/#contact"
              className="group mt-7 inline-flex items-center gap-2.5 text-[13px] font-medium text-white transition-colors hover:text-zinc-400"
            >
              Demander un devis gratuit
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-white/50">
                <svg
                  className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Colonnes de liens */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Navigation" links={NAVIGATION} />
            <FooterColumn title="Services" links={SERVICES} />
            <FooterColumn title="Contact" links={CONTACT} />
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="mt-16 border-t border-white/[0.08] pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-600">
              Suivez-nous
            </p>

            <ul className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} — ${social.handle}`}
                    title={`${social.name} · ${social.handle}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="group block"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 ${social.hoverClass}`}
                    >
                      {social.icon}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barre basse — mentions légales intégrées pour rester compact */}
      <div className="relative border-t border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          <div className="flex flex-col items-center gap-4 text-[11px] text-zinc-600 md:flex-row md:justify-between">
            <p className="order-2 md:order-1">
              © 2026 Ryad Web Studio — Paris, France
            </p>
            <ul className="order-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:order-2">
              {LEGAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="transition-colors duration-300 hover:text-zinc-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
