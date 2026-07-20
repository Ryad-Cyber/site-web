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
  // `items` fait foi : c'est la liste contractuelle des prestations,
  // destinée à la comparaison détaillée de /tarifs.
  items: string[];
  // `homePromises` n'est qu'un RÉSUMÉ COMMERCIAL de `items`, pour les
  // cartes de la home : on y vend, on n'y compare pas. Toute évolution
  // de l'offre doit être reportée dans les DEUX listes.
  homePromises: string[];
  media: TierMedia;
  featured: boolean;
};

export const TIERS: Tier[] = [
  {
    name: "Essentiel",
    price: "499€",
    positioning: "Installer une présence professionnelle.",
    items: [
      "Un site qui donne une belle image de votre entreprise",
      "Un site clair et agréable depuis un téléphone",
      "Être trouvé sur Google par les clients de votre ville",
      "Vos clients vous appellent ou vous écrivent en un clic",
      "Vos services, vos horaires et vos coordonnées bien visibles",
      "Tout est mis en ligne pour vous, sans rien à gérer",
      "Vous changez vos textes et vos photos quand vous voulez",
    ],
    homePromises: [
      "Une belle image pour votre activité",
      "Un site parfaitement lisible sur téléphone",
      "Être trouvé sur Google dans votre ville",
      "Recevoir facilement appels et messages",
      "Un site complet, prêt à fonctionner",
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
    price: "799€",
    positioning: "Faire de votre site un outil commercial.",
    items: [
      "Chaque service que vous proposez, expliqué clairement",
      "Un site fait pour vous amener plus de demandes",
      "Ce qui rassure vos clients placé au bon endroit",
    ],
    homePromises: [
      "Des pages dédiées à chacun de vos services",
      "Un site pensé pour vous amener plus de demandes",
      "Ce qui rassure vos clients mis en avant",
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
    price: "1199€",
    positioning: "Construire une image qui vous distingue.",
    items: [
      "Un style visuel créé uniquement pour votre entreprise",
      "La même belle image partout : sur votre site comme sur vos réseaux",
      "Des détails soignés qui marquent vos visiteurs",
    ],
    homePromises: [
      "Un style visuel créé uniquement pour vous",
      "La même image partout : votre site comme vos réseaux",
      "Des finitions soignées dans chaque détail",
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

// Liste cumulative : chaque niveau reprend toutes les coches des niveaux
// précédents + les siennes. Les coches racontent la montée en gamme
// d'elles-mêmes — aucune ligne d'héritage à lire, aucune hiérarchie de
// couleur : une prestation héritée reste de la valeur pleine.
// Utilisée par /tarifs (comparaison), jamais par la home (qui vend).
export function cumulativeItems(index: number): string[] {
  return TIERS.slice(0, index + 1).flatMap((t) => t.items);
}

// Cartes de la home : au lieu de répéter les promesses des niveaux
// inférieurs, on les résume en une ligne et on n'affiche que les ajouts.
export function homeInheritLabel(index: number): string | null {
  if (index === 0) return null;
  return `Tout ce qui est inclus dans ${TIERS[index - 1].name}, plus :`;
}
