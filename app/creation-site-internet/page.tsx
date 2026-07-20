import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Création de site internet pour entreprise | Ryad Web Studio",
  description:
    "Création de sites internet sur-mesure pour entreprises locales, artisans et indépendants en France. Design premium, mobile d'abord, visibilité Google locale. Devis gratuit.",
  alternates: { canonical: "/creation-site-internet" },
  openGraph: {
    title: "Création de site internet pour entreprise | Ryad Web Studio",
    description:
      "Des sites sur-mesure pour les entreprises locales qui veulent être trouvées et recevoir des demandes.",
    url: "/creation-site-internet",
    type: "website",
  },
};

const SECTEURS = [
  { label: "Restaurant", href: "/site-web-restaurant" },
  { label: "Coiffeur & barbier", href: "/site-web-coiffeur" },
  { label: "Artisan", href: "/site-web-artisan" },
  { label: "Boutique en ligne", href: "/site-web-ecommerce" },
  { label: "Immobilier", href: "/site-web-immobilier" },
  { label: "Location de véhicules", href: "/site-web-location-voiture" },
];

const PRESTATIONS = [
  {
    t: "Un site vitrine professionnel",
    n: "Une présence claire et crédible, pensée pour votre activité et vos clients.",
  },
  {
    t: "Être trouvé dans votre ville",
    n: "Une structure et des pages rapides pour apparaître auprès des clients proches de chez vous.",
  },
  {
    t: "Conçu mobile d'abord",
    n: "C'est depuis leur téléphone que vos clients vous découvrent, souvent en déplacement.",
  },
  {
    t: "Mise en ligne accompagnée",
    n: "Configuration technique, accès remis et suivi après la livraison.",
  },
];

export default function Page() {
  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">
        {/* HERO */}
        <section className="relative min-h-[80svh] flex items-center overflow-hidden bg-[#0a0a0b] text-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/3 h-[520px] w-[520px] rounded-full bg-white/[0.05] blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-white/[0.035] blur-[130px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 py-32">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Création de sites internet</p>
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[4rem] font-semibold leading-[1.05] tracking-[-0.03em]">
              Des sites internet
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                pour entreprises locales
              </span>
            </h1>
            <p className="mt-9 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400">
              Artisans, commerçants, indépendants et petites entreprises en France : un site
              sur-mesure conçu pour vous rendre visible et vous amener des demandes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-medium tracking-tight text-zinc-950 transition-transform duration-300 hover:scale-[1.02]"
              >
                Demander un devis gratuit
              </a>
              <a
                href="/realisations"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 font-medium tracking-tight text-white transition-colors duration-300 hover:bg-white/[0.06]"
              >
                Voir les réalisations
              </a>
            </div>

            {/* Maillage symétrique — les deux intentions de recherche sont disjointes */}
            <p className="mt-10 text-sm text-zinc-500">
              Vous avez déjà un site ?{" "}
              <a
                href="/refonte-site-internet"
                className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                Faites-le diagnostiquer gratuitement
              </a>
              .
            </p>
          </div>
        </section>

        {/* PRESTATIONS */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-36">
          <h2 className="max-w-2xl text-3xl sm:text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-zinc-950">
            Ce qui est
            <br />
            <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
              toujours inclus
            </span>
          </h2>

          <div className="mt-14 grid gap-y-10 sm:grid-cols-2 sm:gap-x-12">
            {PRESTATIONS.map((item, i) => (
              <div key={item.t} className="border-t border-zinc-200 pt-6">
                <span className="text-xs tabular-nums tracking-[0.2em] text-zinc-400">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-zinc-950">
                  {item.t}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-500">{item.n}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTEURS */}
        <section className="bg-zinc-950 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-36">
            <h2 className="max-w-2xl text-3xl sm:text-4xl font-semibold leading-[1.1] tracking-[-0.03em]">
              Votre métier,
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                déjà imaginé
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
              Chaque activité a ses contraintes. Découvrez comment nous les avons pensées pour la
              vôtre.
            </p>

            <ul className="mt-12 flex flex-col">
              {SECTEURS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="group flex items-center justify-between border-t border-white/10 py-5 transition-colors duration-300 hover:border-white/30"
                  >
                    <span className="text-lg text-zinc-400 transition-colors duration-300 group-hover:text-white">
                      {s.label}
                    </span>
                    <svg
                      className="h-4 w-4 text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-24 md:py-36 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950">
            Parlons de
            <br />
            <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
              votre projet
            </span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-7 py-3.5 font-medium tracking-tight text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              Demander un devis gratuit
            </a>
            <a
              href="tel:+33749635085"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-7 py-3.5 font-medium tracking-tight text-zinc-950 transition-colors duration-300 hover:border-zinc-950"
            >
              Appeler directement
            </a>
          </div>
          <p className="mt-8 text-xs tracking-wide text-zinc-400">
            Premier aperçu sous 48h · En ligne en 7 à 14 jours · Devis et maquette gratuits
          </p>
        </section>

        <Footer />
      </main>
    </>
  );
}
