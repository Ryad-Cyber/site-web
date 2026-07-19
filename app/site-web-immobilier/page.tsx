import type { Metadata } from "next";
import SectorLanding from "../components/SectorLanding";

export const metadata: Metadata = {
  title: "Création de site web pour agence immobilière | Ryad Web Studio",
  description:
    "Site web sur-mesure pour agences immobilières : chaque bien valorisé, demandes de visite simplifiées et une identité qui vous distingue des portails d'annonces.",
  alternates: { canonical: "/site-web-immobilier" },
  openGraph: {
    title: "Création de site web pour agence immobilière | Ryad Web Studio",
    description:
      "Vos biens valorisés et une identité qui vous distingue des portails d'annonces.",
    url: "/site-web-immobilier",
    type: "website",
  },
};

export default function ImmobilierPage() {
  return (
    <SectorLanding
      projectId={8}
      h1={
        <>
          Vos biens méritent mieux
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
            qu&apos;une annonce parmi d&apos;autres
          </span>
        </>
      }
      intro="Sur les portails, toutes les agences se fondent dans le même gabarit. Votre site est le seul endroit où votre manière de travailler peut vraiment se voir."
      whatsappText="Bonjour, j'aimerais un site web pour mon agence immobilière"
    />
  );
}
