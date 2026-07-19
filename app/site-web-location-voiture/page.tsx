import type { Metadata } from "next";
import SectorLanding from "../components/SectorLanding";

export const metadata: Metadata = {
  title: "Création de site web pour agence de location de véhicules | Ryad Web Studio",
  description:
    "Site web sur-mesure pour la location de véhicules : votre flotte et vos tarifs présentés clairement, des conditions lisibles et une réservation pensée pour le mobile.",
  alternates: { canonical: "/site-web-location-voiture" },
  openGraph: {
    title: "Création de site web pour agence de location de véhicules | Ryad Web Studio",
    description:
      "Votre flotte, vos tarifs et vos conditions au même endroit, avec une réservation pensée pour le mobile.",
    url: "/site-web-location-voiture",
    type: "website",
  },
};

export default function LocationVoiturePage() {
  return (
    <SectorLanding
      projectId={4}
      h1={
        <>
          Votre flotte disponible
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
            à toute heure
          </span>
        </>
      }
      intro="Véhicules, tarifs et conditions présentés une bonne fois pour toutes. Vos clients trouvent leur réponse seuls, vous passez moins de temps à répondre aux mêmes questions."
      whatsappText="Bonjour, j'aimerais un site web pour mon agence de location de véhicules"
    />
  );
}
