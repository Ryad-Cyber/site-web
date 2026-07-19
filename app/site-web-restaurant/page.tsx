import type { Metadata } from "next";
import SectorLanding from "../components/SectorLanding";

export const metadata: Metadata = {
  title: "Création de site web pour restaurant | Ryad Web Studio",
  description:
    "Site web sur-mesure pour restaurants : réservation en ligne, carte toujours à jour et visibilité sur Google dans votre ville. Devis gratuit, premier aperçu sous 48h.",
  alternates: { canonical: "/site-web-restaurant" },
  openGraph: {
    title: "Création de site web pour restaurant | Ryad Web Studio",
    description:
      "Réservation en ligne, carte digitale et visibilité locale : un site pensé pour remplir votre salle.",
    url: "/site-web-restaurant",
    type: "website",
  },
};

export default function RestaurantPage() {
  return (
    <SectorLanding
      projectId={2}
      h1={
        <>
          Un site qui donne envie
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
            avant la première bouchée
          </span>
        </>
      }
      intro="Réservation en ligne, carte toujours à jour et photos qui installent l'ambiance : votre restaurant travaille pour vous même quand le service bat son plein."
      whatsappText="Bonjour, j'aimerais un site web pour mon restaurant"
    />
  );
}
