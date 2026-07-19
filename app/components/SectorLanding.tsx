"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import { PROJECTS } from "../../lib/projects-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Landing sectorielle — alimentée par les univers réels de PROJECTS.
 * Une seule mise en page pour tous les métiers : DA cohérente avec la home,
 * navigation complète, et aucun visuel de banque d'images.
 */
export default function SectorLanding({
  projectId,
  h1,
  intro,
  whatsappText,
}: {
  projectId: number;
  h1: React.ReactNode;
  intro: string;
  whatsappText: string;
}) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return null;

  const hero = project.slides[0];
  const heroSrc = hero.src as string;
  const isRemote = typeof heroSrc === "string" && heroSrc.startsWith("http");
  const whatsapp = `https://wa.me/33749635085?text=${encodeURIComponent(whatsappText)}`;

  return (
    <>
      <Header />

      <main className="bg-zinc-50 text-zinc-900">
        {/* HERO — média réel du secteur en fond */}
        <section className="relative min-h-[92svh] flex items-center overflow-hidden bg-[#0a0a0b] text-white">
          <div className="absolute inset-0">
            {hero.type === "video" ? (
              <video
                src={heroSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={heroSrc}
                alt={hero.alt || `Univers ${project.name}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                unoptimized={isRemote}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-[#0a0a0b]/60" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 py-32">
            <motion.p
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="text-xs uppercase tracking-[0.3em] text-zinc-500"
            >
              {project.category}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="mt-7 text-4xl sm:text-5xl lg:text-[4rem] font-semibold leading-[1.05] tracking-[-0.03em]"
            >
              {h1}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400"
            >
              {intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-medium tracking-tight text-zinc-950 transition-transform duration-300 hover:scale-[1.02]"
              >
                Demander un devis gratuit
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 font-medium tracking-tight text-white transition-colors duration-300 hover:bg-white/[0.06]"
              >
                Écrire sur WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        {/* CONSTAT MÉTIER */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Ce que vous vivez</p>
            <p className="mt-7 text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold leading-[1.25] tracking-[-0.02em] text-zinc-950">
              {project.challenge}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-500">
              {project.approach}
            </p>
          </motion.div>
        </section>

        {/* CE QUE LE SITE APPORTE */}
        <section className="bg-zinc-950 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-36">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="max-w-2xl text-3xl sm:text-4xl font-semibold leading-[1.1] tracking-[-0.03em]"
            >
              Ce que votre site
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                doit vous apporter
              </span>
            </motion.h2>

            <div className="mt-14 grid gap-y-8 md:grid-cols-3 md:gap-x-10">
              {project.needs.map((need, i) => (
                <motion.div
                  key={need.label}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: i * 0.09, ease: EASE }}
                  className="border-t border-white/10 pt-6"
                >
                  <span className="text-xs tabular-nums tracking-[0.2em] text-zinc-600">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{need.label}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-500">{need.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* APERÇU DE L'UNIVERS — vraies captures du secteur */}
        {project.slides.length > 1 && (
          <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-36">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mb-12 max-w-2xl"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Un aperçu</p>
              <h2 className="mt-6 text-3xl sm:text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-zinc-950">
                L&apos;univers pensé pour
                <br />
                <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                  votre métier
                </span>
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {project.slides.slice(1, 3).map((slide, i) => {
                const src = slide.src as string;
                const remote = typeof src === "string" && src.startsWith("http");
                return (
                  <motion.figure
                    key={src}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                    className="group relative overflow-hidden rounded-[1.5rem] bg-zinc-900"
                  >
                    <div className="relative aspect-[4/3]">
                      {slide.type === "video" ? (
                        <video
                          src={src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={src}
                          alt={slide.alt || `${project.name} — aperçu`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                          unoptimized={remote}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm leading-relaxed text-white/90">{slide.caption}</p>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>

            <div className="mt-10">
              <a
                href="/realisations"
                className="group inline-flex items-center gap-2.5 text-sm font-medium text-zinc-950 transition-colors hover:text-zinc-500"
              >
                Voir toutes les réalisations
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 transition-colors duration-300 group-hover:border-zinc-950">
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
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
          </section>
        )}

        {/* CTA FINAL */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-32 md:pb-44 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950">
              Parlons de
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
                votre projet
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-zinc-500">
              Un échange gratuit, une proposition sur-mesure. Vous décidez ensuite, sans engagement.
            </p>
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
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}
