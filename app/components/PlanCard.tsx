import { type Tier } from "../../lib/tarifs-data";

// Carte tarifaire classique de la home — logique cumulative :
// chaque niveau affiche toutes les coches des niveaux précédents
// plus les siennes. Business est mis en avant légèrement : bordure
// sombre, badge, seul CTA plein. Aucune image dans ces cartes.
//
// Composition : CTA sous le prix (les trois boutons s'alignent sur une
// même ligne), liste en dessous, carte en hauteur naturelle — jamais de
// vide interne qui ferait paraître l'Essentiel incomplet. La montée
// 7 → 10 → 13 coches dessine un escalier ascendant vers la droite.
export default function PlanCard({
  tier,
  items,
}: {
  tier: Tier;
  items: string[];
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-6 sm:p-7 transition-colors duration-300 ${
        tier.featured
          ? "border-zinc-950 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]"
          : "border-zinc-200 hover:border-zinc-300"
      }`}
    >
      {/* Liseré signature — dégradé du logo Ryad Studio, désaturé/assombri.
          RÈGLE D'EXCLUSIVITÉ : cet accent est réservé à la recommandation
          (une seule occurrence par page). Ne jamais le réutiliser ailleurs
          comme élément décoratif. */}
      {tier.featured && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] rounded-t-[14px] bg-gradient-to-r from-[#524bb0] via-[#4661ab] to-[#3a76ad]"
        />
      )}
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

      <ul className="mt-7 space-y-2 border-t border-zinc-100 pt-6">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
