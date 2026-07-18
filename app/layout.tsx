import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

export const metadata = {
  metadataBase: new URL("https://ryadstudio.com"),
  title: "Ryad Web Studio | Création de sites web professionnels",
  description:
    "Création de sites internet professionnels pour entreprises locales : restaurants, artisans, commerces et services. Sites modernes, rapides et optimisés SEO.",
  keywords:
    "création site internet entreprise, création site web restaurant, site vitrine coiffeur, développeur web freelance, site internet sur mesure, e-commerce mode, réservation location voiture, site nettoyage professionnel, agence immobilière site web, SEO local France, création site internet local, Ryad Web Studio",
  category: "Web development",
  creator: "Ryad Web Studio",
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ryad Web Studio | Sites internet & applications web premium",
    description: "Conception de sites internet et applications web modernes pensés pour développer votre activité locale et attirer des clients.",
    url: "https://ryadstudio.com",
    siteName: "Ryad Web Studio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://ryadstudio.com/RyadStudio.png",
        width: 512,
        height: 512,
        alt: "Ryad Web Studio - Agence Digitale Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryad Web Studio | Création de sites internet premium",
    description: "Sites web modernes et performants pour booster la visibilité locale de votre entreprise.",
    images: ["https://ryadstudio.com/RyadStudio.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Ryad Web Studio",
  "@id": "https://ryadstudio.com/#website",
  "url": "https://ryadstudio.com",
  "telephone": "+33749635085",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Orléans",
    "postalCode": "45000",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.9029,
    "longitude": 1.9093
  },
  "areaServed": {
    "@type": "City",
    "name": "Orléans"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "19:00"
  },
  "sameAs": [
    "https://wa.me/33749635085"
  ]
};
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
