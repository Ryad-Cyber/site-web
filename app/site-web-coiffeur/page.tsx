import type { Metadata } from "next";
import SectorLanding from "../components/SectorLanding";

export const metadata: Metadata = {
  title: "Création de site web pour coiffeur et barbier | Ryad Web Studio",
  description:
    "Site web sur-mesure pour salons de coiffure et barbershops : prise de rendez-vous en ligne, galerie de coupes et visibilité Google dans votre ville. Devis gratuit.",
  alternates: { canonical: "/site-web-coiffeur" },
  openGraph: {
    title: "Création de site web pour coiffeur et barbier | Ryad Web Studio",
    description:
      "Prise de rendez-vous en ligne, galerie et image de marque : un site qui remplit votre agenda.",
    url: "/site-web-coiffeur",
    type: "website",
  },
};

export default function CoiffeurPage() {
  return (
    <SectorLanding
      projectId={1}
      h1={
        <>
          Un salon qui se remplit
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
            sans décrocher le téléphone
          </span>
        </>
      }
      intro="Vos clients réservent seuls, à toute heure, et découvrent votre travail avant même de pousser la porte. Vous gardez les mains sur la coupe."
      whatsappText="Bonjour, j'aimerais un site web pour mon salon de coiffure"
    />
  );
}
