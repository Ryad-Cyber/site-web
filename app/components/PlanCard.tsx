import { type Tier, homeInheritLabel } from "../../lib/tarifs-data";

// Dégradé signature du logo Ryad Studio (violet → bleu).
// RÈGLE D'EXCLUSIVITÉ : réservé au pack recommandé, une seule carte par page.
const SIGNATURE_BADGE = "from-[#6D5AE0] to-[#4A8FE0]";

// Carte tarifaire de la home — elle VEND, elle ne compare pas : promesses
// synthétiques, pas la liste contractuelle (celle-ci vit sur /tarifs).
//
// Mise en avant de Business — deux signaux seulement, aucun trait visible :
//   1. le badge « Recommandé », seul aplat saturé (assez petit pour l'être)
//   2. une ombre portée teintée du dégradé du logo
// Et un choix de composition : Business n'a PAS de bordure. Une carte
// blanche sans contour posée sur une ombre flotte au-dessus de la page,
// là où les cartes bordées y sont épinglées. La hiérarchie vient de cette
// différence de nature, pas d'un ornement ajouté.
// Réglage : alpha de l'ombre (0.42).
export default function PlanCard({ tier, index }: { tier: Tier; index: number }) {
  const inherit = homeInheritLabel(index);
  const featured = tier.featured;

  return (
    <div
      className={`flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
        featured
          ? "bg-white shadow-[0_28px_60px_-24px_rgba(91,80,200,0.42),0_10px_28px_-14px_rgba(74,120,200,0.24)]"
          : "border border-zinc-200 bg-[#FCFCFC] transition-colors duration-300 hover:border-zinc-300"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-950">
          {tier.name}
        </h3>
        {featured && (
          <span
            className={`rounded-full bg-gradient-to-r ${SIGNATURE_BADGE} px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white`}
          >
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
          featured
            ? "bg-zinc-950 text-white hover:bg-zinc-800"
            : "border border-zinc-300 text-zinc-950 hover:border-zinc-950"
        }`}
      >
        Demander un devis gratuit
      </a>

      <div className="mt-7 border-t border-zinc-100 pt-6">
        {inherit && (
          <p className="mb-4 font-[family-name:var(--font-instrument-serif)] text-[15px] italic text-zinc-500">
            {inherit}
          </p>
        )}

        <ul className="space-y-2.5">
          {tier.homePromises.map((promise) => (
            <li key={promise} className="flex items-start gap-2.5 text-sm text-zinc-600">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {promise}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
