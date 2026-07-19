import type { Metadata } from "next";
import SectorLanding from "../components/SectorLanding";

export const metadata: Metadata = {
  title: "Création de boutique en ligne et site e-commerce | Ryad Web Studio",
  description:
    "Boutique en ligne sur-mesure : vos collections mises en scène, un parcours d'achat court et un paiement sécurisé. Une vitrine qui vous appartient, pas un fil d'actualité.",
  alternates: { canonical: "/site-web-ecommerce" },
  openGraph: {
    title: "Création de boutique en ligne et site e-commerce | Ryad Web Studio",
    description:
      "Vos produits mis en valeur, un parcours d'achat fluide et une image de marque premium.",
    url: "/site-web-ecommerce",
    type: "website",
  },
};

export default function EcommercePage() {
  return (
    <SectorLanding
      projectId={6}
      h1={
        <>
          Une boutique
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-400">
            qui vous appartient
          </span>
        </>
      }
      intro="Sur les réseaux, vos pièces disparaissent dans le fil en quelques heures. Une boutique en ligne les garde visibles, mises en scène et prêtes à être achetées."
      whatsappText="Bonjour, j'aimerais créer ma boutique en ligne"
    />
  );
}
