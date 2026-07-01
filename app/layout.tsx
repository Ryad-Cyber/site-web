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
  title: "Ryad Web Studio | Création de sites web qui génèrent des clients",
  description:
    "Développeur freelance spécialisé dans la création de sites web modernes et optimisés pour restaurants, artisans et entreprises locales.",
  keywords:
    "création site web, freelance web, site vitrine, développeur web France, SEO local, site restaurant",
  icons: {
    icon: "/Ryad_Studio.png",
    shortcut: "/Ryad_Studio.png",
    apple: "/Ryad_Studio.png",
  },
  openGraph: {
    title: "Ryad Web Studio",
    description: "Sites web modernes qui transforment vos visiteurs en clients",
    type: "website",
    images: [{ url: "/Ryad_Studio.png", width: 512, height: 512, alt: "Ryad Web Studio" }],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
