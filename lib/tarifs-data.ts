// Source unique des tarifs — consommée par la home (cartes courtes)
// et par /tarifs (comparaison détaillée). Les prix ne vivent qu'ici.
//
// Règle éditoriale : tout reste qualitatif. Aucun engagement chiffré
// (nombre de pages, de révisions…) sans validation explicite.

export type Plan = {
  name: string;
  price: string;
  desc: string;
  addsLabel: string;
  features: { t: string; n: string }[];
  featured: boolean;
};

// Socle commun — affiché au-dessus des cartes pour que l'Essentiel
// se lise comme « socle + ceci », jamais comme une offre vide.
export const SOCLE = [
  "Design sur-mesure",
  "Conçu mobile d'abord",
  "Mise en ligne accompagnée",
  "Premier aperçu sous 48h",
];

export const TARIFS_PLANS: Plan[] = [
  {
    name: "Pack Essentiel",
    price: "499€",
    desc: "Une présence professionnelle solide.",
    addsLabel: "Ce qui est inclus",
    features: [
      { t: "Un site rapide et soigné", n: "Impeccable sur téléphone comme sur ordinateur." },
      { t: "Être trouvé dans votre ville", n: "Vous apparaissez quand on cherche votre métier près de chez vous." },
      { t: "Vous faire contacter facilement", n: "Appel, WhatsApp et formulaire accessibles depuis chaque page." },
    ],
    featured: false,
  },
  {
    name: "Pack Business",
    price: "699€",
    desc: "Pour recevoir plus de demandes.",
    addsLabel: "En plus de l'Essentiel",
    features: [
      { t: "Présenter vos services en détail", n: "Chaque prestation expliquée, pour répondre aux questions avant qu'on les pose." },
      { t: "Faciliter les demandes de contact", n: "Un chemin court et évident entre l'intérêt et la prise de contact." },
      { t: "Mettre votre réputation en avant", n: "Ce qui inspire confiance placé là où le visiteur décide." },
    ],
    featured: true,
  },
  {
    name: "Pack Premium",
    price: "899€",
    desc: "Une image qui vous distingue.",
    addsLabel: "En plus du Business",
    features: [
      { t: "Une direction artistique sur-mesure", n: "Couleurs, typographies et mise en page créées pour vous." },
      { t: "Un univers de marque complet", n: "Une identité cohérente, du site jusqu'à vos réseaux." },
      { t: "Une expérience soignée au détail", n: "Animations et transitions qui installent le haut de gamme." },
    ],
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// Comparaison détaillée (/tarifs)
// Cellule : true = inclus, false = non inclus, string = le niveau change
// la nature de la prestation (logique Apple : le texte différencie,
// la coche rassure).
// ---------------------------------------------------------------------------

export type Cell = boolean | string;

export type CompareRow = {
  label: string;
  note?: string;
  cells: [Cell, Cell, Cell]; // Essentiel, Business, Premium
};

export type CompareGroup = {
  title: string;
  rows: CompareRow[];
};

export const COMPARE_GROUPS: CompareGroup[] = [
  {
    title: "Design & image",
    rows: [
      {
        label: "Design du site",
        note: "Jamais un template : chaque site part de votre activité.",
        cells: ["Sur-mesure", "Sur-mesure", "Direction artistique dédiée"],
      },
      { label: "Conçu mobile d'abord", cells: [true, true, true] },
      {
        label: "Animations et transitions premium",
        note: "Le mouvement qui installe une sensation haut de gamme.",
        cells: [false, false, true],
      },
      {
        label: "Univers de marque complet",
        note: "Une identité cohérente, du site jusqu'à vos réseaux.",
        cells: [false, false, true],
      },
    ],
  },
  {
    title: "Contenu & structure",
    rows: [
      {
        label: "Pages essentielles",
        note: "Accueil, prestations, contact : le nécessaire, bien fait.",
        cells: [true, true, true],
      },
      {
        label: "Présentation détaillée de chaque service",
        note: "Chaque prestation expliquée, pour répondre avant qu'on demande.",
        cells: [false, true, true],
      },
      {
        label: "Mise en scène de votre univers",
        note: "Photos, ambiance et ton adaptés à votre clientèle.",
        cells: [false, true, "Poussée au détail"],
      },
    ],
  },
  {
    title: "Visibilité Google",
    rows: [
      {
        label: "Être trouvé dans votre ville",
        note: "Apparaître quand on cherche votre métier près de chez vous.",
        cells: [true, true, true],
      },
      {
        label: "Structure comprise par Google",
        note: "Titres, descriptions et pages rapides : les fondations.",
        cells: [true, true, true],
      },
      {
        label: "Visibilité sur les recherches précises",
        note: "Les pages par service captent les demandes spécifiques.",
        cells: [false, true, true],
      },
    ],
  },
  {
    title: "Contact & demandes",
    rows: [
      {
        label: "Appel, WhatsApp et formulaire",
        note: "Vos coordonnées accessibles depuis chaque page.",
        cells: [true, true, true],
      },
      {
        label: "Parcours pensé pour déclencher la demande",
        note: "Un chemin court entre l'intérêt et la prise de contact.",
        cells: [false, true, true],
      },
      {
        label: "Mise en avant de votre réputation",
        note: "Ce qui inspire confiance placé là où le visiteur décide.",
        cells: [false, true, true],
      },
    ],
  },
  {
    title: "Accompagnement",
    rows: [
      {
        label: "Mise en ligne et configuration technique",
        note: "Sécurité, performance : vous n'avez rien à gérer.",
        cells: [true, true, true],
      },
      {
        label: "Formation à la gestion de base",
        note: "Textes, images, horaires : vous restez autonome.",
        cells: [true, true, true],
      },
      { label: "Interlocuteur unique", cells: [true, true, true] },
      {
        label: "Suivi après le lancement",
        cells: [true, true, "Renforcé"],
      },
    ],
  },
];
