import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

export const metadata = {
  title: "Résultats | Ryad Web Studio",
  description:
    "Découvrez l'impact concret d'un site web professionnel : visibilité, confiance, contacts qualifiés — et le coût réel de ne rien faire.",
};

export default function ResultsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${instrumentSerif.variable} results-page`}>{children}</div>
  );
}
