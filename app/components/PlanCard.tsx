import { type Plan } from "../../lib/tarifs-data";

// Carte de pack — volontairement courte : prix, positionnement,
// trois bénéfices, CTA. Le détail vit sur /tarifs.
export default function PlanCard({ plan }: { plan: Plan }) {
  const dark = plan.featured;

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
        dark
          ? "bg-zinc-950 text-white"
          : "border border-zinc-200 bg-white transition-colors duration-300 hover:border-zinc-300"
      }`}
    >
      {dark && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-zinc-950 px-3.5 py-1 text-[11px] font-medium tracking-wide text-white">
          Recommandé
        </span>
      )}

      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
          dark ? "text-zinc-500" : "text-zinc-400"
        }`}
      >
        {plan.name}
      </p>

      <p className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
        <span className={`mr-1.5 align-middle text-xs font-normal ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
          dès
        </span>
        {plan.price}
        <span className={`ml-1 text-sm font-normal ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
          TTC
        </span>
      </p>

      <p className={`mt-2 text-sm ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{plan.desc}</p>

      <div className={`my-6 border-t ${dark ? "border-white/10" : "border-zinc-100"}`} />

      <p className={`text-[10px] uppercase tracking-[0.25em] ${dark ? "text-zinc-600" : "text-zinc-400"}`}>
        {plan.addsLabel}
      </p>

      <ul className="mt-4 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li
            key={f.t}
            className={`flex items-center gap-2.5 text-sm ${dark ? "text-zinc-300" : "text-zinc-600"}`}
          >
            <svg
              className={`h-3.5 w-3.5 shrink-0 ${dark ? "text-zinc-500" : "text-zinc-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {f.t}
          </li>
        ))}
      </ul>

      <a
        href="/#contact"
        className={`mt-7 block rounded-full py-3 text-center text-sm font-medium tracking-tight transition-colors ${
          dark
            ? "bg-white text-zinc-950 hover:bg-zinc-100"
            : "bg-zinc-950 text-white hover:bg-zinc-800"
        }`}
      >
        Demander un devis gratuit
      </a>
    </div>
  );
}
