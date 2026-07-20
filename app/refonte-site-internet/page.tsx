import type { Metadata } from "next";
import RefonteView from "./RefonteView";

export const metadata: Metadata = {
  title: "Refonte de site internet — diagnostic gratuit | Ryad Web Studio",
  description:
    "Votre site est lent, daté ou n'amène pas de demandes ? Diagnostic gratuit et honnête : parfois quelques améliorations suffisent, parfois il faut refaire — et si votre site fonctionne encore, nous vous le dirons.",
  alternates: { canonical: "/refonte-site-internet" },
  openGraph: {
    title: "Refonte de site internet — diagnostic gratuit | Ryad Web Studio",
    description:
      "Avant de tout refaire, regardons ce qui doit réellement changer. Diagnostic gratuit de votre site actuel.",
    url: "/refonte-site-internet",
    type: "website",
  },
};

export default function RefontePage() {
  return <RefonteView />;
}
