import type { Metadata } from "next";
import SectorLanding from "../components/SectorLanding";

export const metadata: Metadata = {
  title: "Création de site web pour artisan | Ryad Web Studio",
  description:
    "Site web sur-mesure pour artisans du bâtiment : plombier, électricien, menuisier. Montrez vos chantiers, recevez des demandes de devis et soyez trouvé dans votre ville.",
  alternates: { canonical: "/site-web-artisan" },
  openGraph: {
    title: "Création de site web pour artisan | Ryad Web Studio",
    description:
      "Vos chantiers mis en valeur et des demandes de devis qualifiées, sans dépendre du bouche-à-oreille.",
    url: "/site-web-artisan",
    type: "website",
  },
};

export default function ArtisanPage() {
  return (
    <SectorLanding
      projectId={7}
      h1={
        <>
          Votre savoir-faire mérite
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
            d&apos;être vu
          </span>
        </>
      }
      intro="Plomberie, électricité, menuiserie, rénovation : vos chantiers parlent pour vous. Encore faut-il que les clients qui ne vous connaissent pas puissent les trouver."
      whatsappText="Bonjour, j'aimerais un site web pour mon activité d'artisan"
    />
  );
}
