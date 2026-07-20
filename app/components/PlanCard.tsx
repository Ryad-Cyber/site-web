import { type Tier, homeInheritLabel } from "../../lib/tarifs-data";

// Carte tarifaire de la home — elle VEND, elle ne compare pas :
// promesses synthétiques, pas la liste contractuelle (celle-ci vit sur /tarifs).
//
// Mise en avant de Business, deux mécanismes seulement :
//   A — une ombre portée teintée du dégradé du logo (violet → bleu). Sur fond
//       clair, l'ombre soustrait de la luminance : c'est le seul geste qui
//       reste perceptible, là où un halo lumineux se dilue.
//   B — Business en blanc pur, les deux autres légèrement en retrait.
// Aucun troisième effet : c'est l'empilement qui fait « SaaS ».
export default function PlanCard({ tier, index }: { tier: Tier; index: number }) {
  const inherit = homeInheritLabel(index);

  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 sm:p-7 transition-colors duration-300 ${
        tier.featured
          ? "border-zinc-950 bg-white shadow-[0_28px_60px_-24px_rgba(91,80,200,0.38),0_10px_28px_-14px_rgba(74,120,200,0.22)]"
          : "border-zinc-200 bg-[#FCFCFC] hover:border-zinc-300"
      }`}
    >
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
