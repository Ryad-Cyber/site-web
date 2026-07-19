// Source unique des tarifs — consommée par la home (cartes courtes)
// et par /tarifs (comparaison détaillée). Les prix ne vivent qu'ici.
//
// Règle éditoriale : tout reste qualitatif. Aucun engagement chiffré
// (nombre de pages, de révisions…) sans validation explicite.

// Aperçus visuels par niveau — RÉSERVÉS à une future zone secondaire sur
// /tarifs (« Voir un exemple de ce que ce niveau permet »), jamais dans
// les cartes tarifaires principales. Trois registres :
//   proof     → capture entière d'un vrai site (le document)
//   mechanism → plan serré sur une zone d'action : réserver, demander
//   fragment  → très gros plan de direction artistique
// Règles : pas de nom de métier visible, pas de fausses notifications.
export type TierMedia = {
  register: "proof" | "mechanism" | "fragment";
  src: string;
  alt: string;
  caption?: string;
  // "browser" ajoute une barre de navigateur au-dessus du média —
  // uniquement pour une capture brute de site, jamais pour un mockup
  // qui contient déjà son propre cadrage (laptop, téléphone…).
  frame?: "browser";
};

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
  // Ce que le visiteur doit comprendre en 5 secondes — même phrase
  // sur la home et sur /tarifs, jamais deux variantes.
  positioning: string;
  items: string[];
  media: TierMedia;
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
    media: {
      register: "proof",
      // PROVISOIRE — à remplacer par la capture Expert Nuisible dès qu'elle
      // est fournie : changer `src`, et ajouter `frame: "browser"` si c'est
      // une capture d'écran brute (le mockup actuel se cadre tout seul).
      src: "/site_artisan.png",
      alt: "Site professionnel réalisé par le studio, affiché sur ordinateur et téléphone",
    },
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
    media: {
      register: "mechanism",
      src: "/barber_interface.png",
      alt: "Module de réservation en ligne d'un site réalisé par le studio",
    },
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
    media: {
      register: "fragment",
      // vetment.jpeg : mur typographique + scénographie — direction artistique
      // pure, sans fausses statistiques (salon_beaute.jpeg en contient, à éviter)
      src: "/vetment.jpeg",
      alt: "Détail d'un univers de marque créé par le studio",
      caption: "Un univers créé pour une seule marque : la vôtre.",
    },
    featured: false,
  },
];

// Libellé d'héritage calculé depuis les données — jamais un compte en dur
export function inheritanceLabel(index: number): string | null {
  if (index === 0) return null;
  const count = TIERS.slice(0, index).reduce((n, t) => n + t.items.length, 0);
  return `Les ${count} prestations ${index === 1 ? "de l'Essentiel" : "du Business"}, plus :`;
}

// Liste cumulative pour les cartes de la home : chaque niveau reprend
// toutes les coches des niveaux précédents + les siennes. Seul l'intitulé
// court est gardé (la précision après « — » vit sur /tarifs).
export function cumulativeItems(index: number): string[] {
  return TIERS.slice(0, index + 1)
    .flatMap((t) => t.items)
    .map((item) => item.split(" — ")[0]);
}
