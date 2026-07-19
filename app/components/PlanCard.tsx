import Image from "next/image";
import { type Tier } from "../../lib/tarifs-data";

// Carte-vitrine de la home : média → nom → positionnement → prix → CTA.
// Les trois cartes partagent strictement la même structure — la différence
// perçue vient du registre de l'image, jamais du traitement de la carte.
// L'offre détaillée vit sur /tarifs.
export default function PlanCard({ tier }: { tier: Tier }) {
  const { media } = tier;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors duration-300 hover:border-zinc-300">
      {/* Fenêtre média — ratio identique partout */}
      <div className="relative">
        {/* Barre navigateur : seulement pour une capture brute de site */}
        {media.frame === "browser" && (
          <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50 px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
          </div>
        )}

        <div
          className={`relative aspect-[3/2] overflow-hidden ${
            media.register === "fragment" ? "bg-zinc-950" : "bg-zinc-100"
          }`}
        >
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={
              media.register === "mechanism"
                ? // plan serré sur le module de réservation, en bas de la maquette —
                  // cadre aussi hors champ les chiffres fictifs du mockup
                  "origin-[65%_100%] scale-[2.2] object-cover"
                : media.register === "fragment"
                ? // plan serré sur le mur typographique — la voix de la marque
                  "origin-[55%_4%] scale-[2.2] object-cover"
                : "object-cover"
            }
          />

          {/* fragment : gros plan galerie + légende — jamais de flou artificiel */}
          {media.register === "fragment" && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {media.caption && (
                <p className="absolute inset-x-0 bottom-0 p-4 font-[family-name:var(--font-instrument-serif)] text-sm italic leading-snug text-white/90">
                  {media.caption}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Texte — cinq éléments, rien de plus */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-950">
            {tier.name}
          </h3>
          {tier.featured && (
            <span className="rounded-full bg-zinc-950 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white">
              Recommandé
            </span>
          )}
        </div>

        <p className="mt-2.5 text-[15px] font-medium leading-snug tracking-tight text-zinc-950">
          {tier.positioning}
        </p>

        <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
          <span className="mr-1.5 align-middle text-xs font-normal text-zinc-400">dès</span>
          {tier.price}
          <span className="ml-1 text-sm font-normal text-zinc-400">TTC</span>
        </p>

        <div className="flex-1" />

        <a
          href="#contact"
          className={`mt-6 block rounded-full py-3 text-center text-sm font-medium tracking-tight transition-colors ${
            tier.featured
              ? "bg-zinc-950 text-white hover:bg-zinc-800"
              : "border border-zinc-300 text-zinc-950 hover:border-zinc-950"
          }`}
        >
          Demander un devis gratuit
        </a>
      </div>
    </div>
  );
}
