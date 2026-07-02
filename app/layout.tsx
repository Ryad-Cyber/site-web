import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://ryadwebstudio.fr"),
  title: "Ryad Web Studio | Création de site internet professionnel pour entreprise locale",
  description:
    "Création de sites web professionnels pour entreprises locales en France : restaurants, coiffeurs, coachs sportifs, agences immobilières, boutiques de mode (e-commerce), services de nettoyage et agences de location de voiture.",
  keywords:
    "création site internet entreprise, création site web restaurant, site vitrine coiffeur, développeur web freelance, site internet sur mesure, e-commerce mode, réservation location voiture, site nettoyage professionnel, agence immobilière site web, SEO local France, création site internet local, Ryad Web Studio",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/Ryad_Studio.png",
    shortcut: "/Ryad_Studio.png",
    apple: "/Ryad_Studio.png",
  },
  openGraph: {
    title: "Ryad Web Studio | Sites internet & applications web premium",
    description: "Conception de sites internet et applications web modernes pensés pour développer votre activité locale et attirer des clients.",
    url: "https://ryadwebstudio.fr",
    siteName: "Ryad Web Studio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/Ryad_Studio.png",
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
    images: ["/Ryad_Studio.png"],
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
    "image": "https://ryadwebstudio.fr/Ryad_Studio.png",
    "@id": "https://ryadwebstudio.fr/#website",
    "url": "https://ryadwebstudio.fr",
    "telephone": "+33749635085",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Paris",
      "postalCode": "75000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8566,
      "longitude": 2.3522
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
