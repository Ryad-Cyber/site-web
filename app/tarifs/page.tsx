import type { Metadata } from "next";
import TarifsView from "./TarifsView";

export const metadata: Metadata = {
  title: "Tarifs — Packs de création de site web | Ryad Web Studio",
  description:
    "Trois packs clairs pour votre site web : Essentiel dès 499€, Business dès 799€, Premium dès 1199€. Comparez ce que chaque niveau apporte. Devis et maquette gratuits.",
  alternates: { canonical: "/tarifs" },
  openGraph: {
    title: "Tarifs — Packs de création de site web | Ryad Web Studio",
    description:
      "Essentiel, Business ou Premium : comparez ce que chaque pack apporte, sans surprise.",
    url: "/tarifs",
    type: "website",
  },
};

export default function TarifsPage() {
  return <TarifsView />;
}
