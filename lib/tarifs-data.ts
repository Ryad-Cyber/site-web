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
    desc: "Votre site devient un outil commercial.",
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
    desc: "Une image de marque supérieure.",
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
// Modèle additif (/tarifs)
// Chaque niveau reprend tout le précédent et n'affiche que ses ajouts.
// La liste la plus longue appartient au pack le moins cher : c'est elle
// qui prouve qu'Essentiel est une offre complète, pas une version limitée.
// Les items utilisent « — » pour séparer la prestation de sa précision.
// Aucun terme technique : on parle comme le client.
// ---------------------------------------------------------------------------

export type Tier = {
  name: string;
  price: string;
  // Ce que le visiteur doit comprendre en 5 secondes
  positioning: string;
  items: string[];
  featured: boolean;
};

export const TIERS: Tier[] = [
  {
    name: "Essentiel",
    price: "499€",
    positioning: "Un vrai site professionnel, complet.",
    items: [
      "Site professionnel sur-mesure — jamais un template",
      "Conçu mobile d'abord",
      "Être trouvé dans votre ville",
      "Contact en un geste — appel, WhatsApp, formulaire",
      "Pages essentielles — accueil, prestations, contact",
      "Mise en ligne et configuration technique",
      "Formation à la gestion de base",
    ],
    featured: false,
  },
  {
    name: "Business",
    price: "699€",
    positioning: "Le choix logique pour développer votre activité.",
    items: [
      "Des pages dédiées à vos services — pour répondre clairement aux demandes de vos clients",
      "Parcours pensé pour déclencher la demande",
      "Votre réputation mise en avant",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "899€",
    positioning: "Une image premium qui vous différencie.",
    items: [
      "Direction artistique dédiée",
      "Univers de marque unique — du site jusqu'à vos réseaux",
      "Des finitions premium dans chaque détail — une expérience plus soignée et mémorable",
    ],
    featured: false,
  },
];

// Libellé d'héritage calculé depuis les données — jamais un compte en dur
export function inheritanceLabel(index: number): string | null {
  if (index === 0) return null;
  const count = TIERS.slice(0, index).reduce((n, t) => n + t.items.length, 0);
  return `Les ${count} prestations ${index === 1 ? "de l'Essentiel" : "du Business"}, plus :`;
}
