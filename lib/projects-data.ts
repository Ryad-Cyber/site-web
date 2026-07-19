import { type CarouselSlide } from "../app/components/DesignCarousel";

export type Project = {
  id: number;
  name: string;
  category: string;
  description: string;
  gradient: string;
  accentColor: string;
  mockup: string;
  features: string[];
  // Objectif du projet — formulation orientée approche, jamais un avis client
  approach: string;
  // Réalité de terrain du métier — observation, jamais une promesse de résultat
  challenge: string;
  // Ce que le site doit apporter, formulé en bénéfice + explication en langage simple
  needs: { label: string; note: string }[];
  // Axes de valeur propres au secteur — affichés dans le panneau de droite
  highlights: { label: string; value: string }[];
  slides: CarouselSlide[];
};

// Type alias for consistency with new naming convention
export type Realisation = Project;

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Barbershop",
    category: "Beauté & Coiffure",
    description: "Un salon de coiffure premium avec réservation, galerie et image de marque soignée.",
    gradient: "from-amber-500/20 via-orange-500/10 to-red-500/5",
    accentColor: "amber",
    mockup: "💈",
    features: ["Réservation", "Galerie", "Avis clients", "Tarifs"],
    approach: "Objectif : transformer les visiteurs en rendez-vous, avec une image à la hauteur du salon.",
    challenge:
      "Les rendez-vous se prennent encore par téléphone, souvent en pleine coupe — et certains appels restent sans réponse.",
    needs: [
      { label: "Réserver sans appeler", note: "Le client choisit son créneau depuis son téléphone, même le soir." },
      { label: "Montrer votre travail", note: "Une galerie de coupes qui donne envie de pousser la porte." },
      { label: "Être trouvé dans votre ville", note: "Apparaître quand quelqu'un cherche un barbier près de chez lui." },
    ],
    highlights: [
      { label: "Univers de marque", value: "Signature" },
      { label: "Prise de RDV", value: "En 3 clics" },
      { label: "Fidélisation", value: "Clients réguliers" },
      { label: "Galerie", value: "Avant / après" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Découvrez l'ambiance premium de votre futur salon et l'expérience proposée à vos clients.",
        type: "video",
        src: "/video_barber.mp4",
      },
      {
        label: "Réserver",
        caption: "Un site pensé pour générer des clients, pas juste des visites.",
        type: "photo",
        src: "/barber_interface.png",
        alt: "Interface web de barbier",
      },
      {
        label: "Nos clients",
        caption: "Des clients satisfaits qui reviennent.",
        type: "photo",
        src: "/client_barber.png",
        alt: "Client satisfait",
      },
    ],
  },
  {
    id: 2,
    name: "Restaurant",
    category: "Restaurant Gastronomique",
    description: "Une présence élégante avec menu digital, réservations et storytelling visuel.",
    gradient: "from-red-500/20 via-pink-500/10 to-rose-500/5",
    accentColor: "red",
    mockup: "🍽️",
    features: ["Menu digital", "Réservations", "Photos HD", "Localisation"],
    approach: "Objectif : donner envie avant même de passer la porte, et rendre la réservation immédiate.",
    challenge:
      "La carte évolue au fil des saisons, et le téléphone sonne souvent en plein service.",
    needs: [
      { label: "Réserver une table en ligne", note: "Sans occuper le téléphone pendant le coup de feu." },
      { label: "Une carte toujours à jour", note: "Modifiable en quelques minutes, sans repasser par un prestataire." },
      { label: "Donner envie avant la porte", note: "Des photos de salle et d'assiettes qui installent l'ambiance." },
    ],
    highlights: [
      { label: "Ambiance", value: "Immersive" },
      { label: "Menu digital", value: "Toujours à jour" },
      { label: "Réservation", value: "En ligne 24/7" },
      { label: "Attractivité", value: "Photos HD" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Une vidéo immersive pour faire ressentir l'ambiance du restaurant avant la réservation.",
        type: "video",
        src: "/video_resto.mp4",
      },
      {
        label: "L'univers",
        caption: "Une salle chaleureuse, des plats soignés et une identité visuelle qui donne envie de venir.",
        type: "photo",
        src: "/univers_restau.jpg",
        alt: "Univers visuel premium pour restaurant",
      },
      {
        label: "Réserver",
        caption: "Réservation en ligne, menu digital et parcours pensé pour convertir vos visiteurs en clients.",
        type: "photo",
        src: "/site_restau.jpeg",
        alt: "Interface du site web du restaurant",
      },
      {
        label: "Réserver",
        caption: "Une interface restaurant premium qui présente le menu, rassure le client et facilite la prise de table.",
        type: "photo",
        src: "/restaurant-site.png",
        alt: "Nouvelle interface de site web restaurant avec réservation",
      },
      {
        label: "Ce que le site permet",
        caption: "Réserver, consulter le menu et trouver le restaurant — sans appeler.",
        type: "outcome",
        variant: "restaurant",
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
        alt: "Clients dînant dans un restaurant animé",
        metrics: [
          { value: "24/7", label: "Réservation en ligne" },
          { value: "Google", label: "Visibilité locale" },
          { value: "Menu digital", label: "Toujours à jour" },
          { value: "Avis", label: "Collecte facilitée" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Fitness & Coaching",
    category: "Salle de sport & Coach sportif",
    description: "Un site premium pour présenter vos programmes, attirer de nouveaux clients et faciliter les prises de rendez-vous.",
    gradient: "from-lime-500/20 via-green-500/10 to-emerald-500/5",
    accentColor: "lime",
    mockup: "🏋️‍♀️",
    features: ["Programmes", "Coaching", "Prise de rendez-vous", "Transformation"],
    approach: "Objectif : présenter les programmes avec clarté et déclencher la prise de contact.",
    challenge:
      "Les prospects hésitent longtemps avant de franchir la porte, et posent presque tous les mêmes questions sur les formules et les tarifs.",
    needs: [
      { label: "Des formules lisibles", note: "Chaque programme et son tarif, sans avoir à demander." },
      { label: "Réserver une séance d'essai", note: "Un premier pas simple, sans engagement." },
      { label: "Inspirer confiance", note: "Des photos réelles de la salle et du coaching, pas des images génériques." },
    ],
    highlights: [
      { label: "Programmes", value: "Détaillés" },
      { label: "Coaching", value: "Sur-mesure" },
      { label: "Prise de RDV", value: "Immédiate" },
      { label: "Motivation", value: "Transformations" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Une salle de sport moderne et motivante, pensée pour inspirer l'énergie et donner envie de s'entraîner.",
        type: "video",
        src: "/video_gym.mp4",
      },
      {
        label: "Réservation",
        caption: "Réservation de séances, présentation des programmes et prise de contact en quelques clics.",
        type: "photo",
        src: "/site_gym.jpeg",
        alt: "Page de réservation d'un coach sportif",
      },
      {
        label: "Transformation",
        caption: "Une identité forte qui inspire confiance et donne envie de commencer sa transformation.",
        type: "photo",
        src: "/gym.jpg",
        alt: "Salle de sport moderne et coaching sportif",
      },
    ],
  },
  {
    id: 4,
    name: "Location de véhicules",
    category: "Mobilité",
    description: "Un site premium pour présenter votre flotte, les disponibilités et simplifier les réservations.",
    gradient: "from-sky-500/20 via-cyan-500/10 to-slate-500/5",
    accentColor: "sky",
    mockup: "🚗",
    features: ["Réservation", "Disponibilités", "Tarifs", "Mobile"],
    approach: "Objectif : rendre la réservation évidente, y compris depuis un téléphone.",
    challenge:
      "Entre les demandes qui arrivent à toute heure et les disponibilités à confirmer, une partie du temps part en allers-retours.",
    needs: [
      { label: "Voir la flotte et les tarifs", note: "Chaque véhicule, son prix et ses conditions au même endroit." },
      { label: "Réserver depuis un téléphone", note: "La majorité des demandes se font en déplacement." },
      { label: "Des conditions claires", note: "Caution, kilométrage, assurance : écrit une fois, plus à réexpliquer." },
    ],
    highlights: [
      { label: "Flotte", value: "Mise en avant" },
      { label: "Disponibilités", value: "Temps réel" },
      { label: "Réservation", value: "Mobile-first" },
      { label: "Tarifs", value: "Transparents" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Une vidéo dynamique pour montrer la disponibilité, la confiance et l'expérience de location.",
        type: "video",
        src: "/video_loca.mp4",
      },
      {
        label: "L'univers",
        caption: "Une expérience moderne pour des services de mobilité haut de gamme.",
        type: "photo",
        src: "/location_car.jpeg",
        alt: "Interface web de location de voiture",
      },
      {
        label: "Réserver",
        caption: "Une expérience moderne pour des services de mobilité haut de gamme.",
        type: "photo",
        src: "/site_car.jpeg",
        alt: "Interface web de location de voiture",
      },
      {
        label: "Réserver",
        caption: "Un parcours clair pour choisir, réserver et confirmer votre véhicule rapidement.",
        type: "photo",
        src: "/site_location.png",
        alt: "Réservation de véhicule en ligne",
      },
      {
        label: "Nos clients",
        caption: "Des utilisateurs satisfaits qui reviennent pour une location simple et fiable.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
        alt: "Clients heureux avec leur voiture de location",
      },
    ],
  },
  {
    id: 5,
    name: "Nettoyage automobile",
    category: "Service / entretien",
    description: "Une expérience rapide et propre pour des réservations, des prestations et une image professionnelle.",
    gradient: "from-cyan-500/20 via-blue-500/10 to-slate-500/5",
    accentColor: "cyan",
    mockup: "🧽",
    features: ["Réservation", "Prestations", "Avis", "Localisation"],
    approach: "Objectif : capter la demande locale et convertir en réservation en moins d'une minute.",
    challenge:
      "Beaucoup de demandes se décident dans l'instant : si la prise de contact demande trop d'étapes, le client passe au suivant.",
    needs: [
      { label: "Réserver en moins d'une minute", note: "Prestation, créneau, adresse — trois choix, c'est tout." },
      { label: "Des prestations comparables", note: "Formules et tarifs côte à côte, sans zone d'ombre." },
      { label: "Être trouvé dans votre ville", note: "Apparaître sur les recherches de nettoyage auto à proximité." },
    ],
    highlights: [
      { label: "Prise de contact", value: "Immédiate" },
      { label: "Réservation", value: "En 1 minute" },
      { label: "Prestations", value: "Détaillées" },
      { label: "Conversion locale", value: "Ciblée" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Une proposition claire, moderne et rassurante pour des services de qualité.",
        type: "photo",
        src: "/clean_car.jpeg",
        alt: "Interface web de nettoyage de voiture",
      },
      {
        label: "Réserver",
        caption: "Un formulaire rapide pour choisir votre prestation de nettoyage en un clin d'œil.",
        type: "photo",
        src: "/clean_car.png",
        alt: "Réservation de nettoyage automobile",
      },
      {
        label: "Nos clients",
        caption: "Des clients rassurés par une interface professionnelle et une prise de rendez-vous rapide.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
        alt: "Client satisfait après nettoyage auto",
      },
    ],
  },
  {
    id: 6,
    name: "Vente de vêtements",
    category: "Vêtements / e-commerce",
    description: "Une boutique visuelle pensée pour mettre en avant vos produits et convertir rapidement.",
    gradient: "from-rose-500/20 via-pink-500/10 to-fuchsia-500/5",
    accentColor: "rose",
    mockup: "👚",
    features: ["Catalogue", "Paiement", "Marque", "Conversion"],
    approach: "Objectif : installer une image de marque premium et fluidifier le parcours d'achat.",
    challenge:
      "Les réseaux font défiler les pièces, mais rien ne reste : la collection disparaît dans le fil au bout de quelques heures.",
    needs: [
      { label: "Une boutique qui vous appartient", note: "Vos pièces restent visibles, sans dépendre d'un algorithme." },
      { label: "Mettre en scène les collections", note: "Une direction artistique qui valorise chaque pièce." },
      { label: "Acheter sans friction", note: "Paiement sécurisé et parcours court jusqu'à la commande." },
    ],
    highlights: [
      { label: "Image de marque", value: "Premium" },
      { label: "Expérience", value: "Fluide" },
      { label: "Collections", value: "Mises en scène" },
      { label: "Confiance", value: "Paiement sécurisé" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Un univers visuel premium, pensé pour faire rayonner les produits.",
        type: "photo",
        src: "/vetment.jpeg",
        alt: "Interface web de site de vêtements",
      },
      {
        label: "Réserver",
        caption: "Une page boutique élégante pour ajouter rapidement au panier et finaliser l'achat.",
        type: "photo",
        src: "/site_vetment.png",
        alt: "Parcours d'achat en ligne pour vêtements",
      },
      {
        label: "Nos clients",
        caption: "Une expérience client claire et élégante, pensée pour fidéliser et convertir.",
        type: "photo",
        src: "/client_vetment.jpeg",
        alt: "Clients satisfaits achetant des vêtements en ligne",
      },
    ],
  },
  {
    id: 7,
    name: "Artisan",
    category: "Entreprise locale",
    description: "Un site professionnel pour présenter votre savoir-faire et générer des devis qualifiés.",
    gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/5",
    accentColor: "violet",
    mockup: "🛠️",
    features: ["Devis", "Portfolio", "Avis", "Contact"],
    approach: "Objectif : valoriser le savoir-faire et générer des demandes de devis qualifiées.",
    challenge:
      "Le bouche-à-oreille fonctionne bien, mais les clients qui ne vous connaissent pas encore ne trouvent presque rien en ligne.",
    needs: [
      { label: "Montrer les chantiers réalisés", note: "Des photos avant/après valent mieux qu'une description." },
      { label: "Recevoir des demandes de devis", note: "Un formulaire court qui cadre le besoin dès le départ." },
      { label: "Être trouvé dans votre ville", note: "Apparaître quand on cherche votre métier dans votre secteur." },
    ],
    highlights: [
      { label: "Savoir-faire", value: "Mis en valeur" },
      { label: "Demande de devis", value: "Simplifiée" },
      { label: "Réalisations", value: "Portfolio" },
      { label: "Crédibilité", value: "Avis clients" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Un site qui transmet confiance, clarté et sérieux dès le premier regard.",
        type: "photo",
        src: "/artisan.png",
        alt: "Professionnel artisanat",
      },
      {
        label: "Réserver",
        caption: "Un parcours simple pour demander un devis ou prendre contact.",
        type: "photo",
        src: "/site_artisan.png",
        alt: "Interface de site web pour artisan",
      },
      {
        label: "Nos clients",
        caption: "Des artisans qui ont transformé leur activité grâce à un site professionnel.",
        type: "photo",
        src: "/client_artisan.png",
        alt: "Client artisan satisfait",
      },
    ],
  },
  {
    id: 8,
    name: "Immobilier",
    category: "Immobilier",
    description: "Une expérience claire pour mettre en avant les biens et accélérer les prises de contact.",
    gradient: "from-indigo-500/20 via-violet-500/10 to-purple-500/5",
    accentColor: "indigo",
    mockup: "🏠",
    features: ["Biens", "Visites", "Contact", "Conversion"],
    approach: "Objectif : valoriser chaque bien et raccourcir le chemin vers la prise de contact.",
    challenge:
      "Sur les portails, les annonces se ressemblent vite, et l'identité de l'agence a peu de place pour s'exprimer.",
    needs: [
      { label: "Valoriser chaque bien", note: "Des pages soignées qui donnent envie de venir visiter." },
      { label: "Prendre contact facilement", note: "Une demande de visite en quelques champs seulement." },
      { label: "Installer votre crédibilité", note: "Un site qui rassure avant même le premier rendez-vous." },
    ],
    highlights: [
      { label: "Biens", value: "Valorisés" },
      { label: "Visites", value: "Programmées" },
      { label: "Contact", value: "Qualifié" },
      { label: "Design", value: "Rassurant" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Un design sobre, premium et rassurant, pensé pour valoriser chaque bien immobilier et inspirer confiance dès la première visite.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
        alt: "Bien immobilier premium",
      },
      {
        label: "Réserver",
        caption: "Présentation des biens et prise de contact en quelques clics.",
        type: "photo",
        src: "/site_immobilier.jpeg",
        alt: "Interface du site immobilier",
      },
      {
        label: "Nos clients",
        caption: "Des clients accompagnés dans leurs projets immobiliers grâce à une expérience digitale claire, fluide et professionnelle.",
        type: "photo",
        src: "/client_maison.jpeg",
        alt: "Clients satisfaits dans le secteur immobilier",
      },
      {
  label: "L'univers",
  caption: "Un design sobre, premium et rassurant, pensé pour valoriser chaque bien immobilier et inspirer confiance dès la première visite.",
  type: "video",
  src: "/video_maison.mp4",
},
    ],
  },
  {
    id: 9,
    name: "Salon de beauté",
    category: "Beauté & spa",
    description: "Un site premium pour séduire, réserver et faire rayonner votre salon.",
    gradient: "from-pink-500/20 via-fuchsia-500/10 to-purple-500/5",
    accentColor: "pink",
    mockup: "💅",
    features: ["Réservation", "Galerie", "Avis", "Brand"],
    approach: "Objectif : traduire l'élégance du salon en ligne et faciliter la réservation.",
    challenge:
      "L'univers du salon est soigné jusque dans les moindres détails, mais rien de tout cela ne se voit en ligne.",
    needs: [
      { label: "Réserver en ligne", note: "Prestation et créneau choisis à l'avance, sans passer un appel." },
      { label: "Traduire l'univers du salon", note: "Photos, couleurs et typographie à l'image du lieu." },
      { label: "Mettre en avant les prestations", note: "Chaque soin, sa durée et son tarif, clairement présentés." },
    ],
    highlights: [
      { label: "Univers de marque", value: "Élégant" },
      { label: "Réservation", value: "En ligne" },
      { label: "Prestations", value: "Mises en avant" },
      { label: "Fidélisation", value: "Clientèle régulière" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Une identité visuelle élégante pour un salon moderne et haut de gamme.",
        type: "photo",
        src: "/salon_beaute.jpeg",
        alt: "Salon de beauté premium",
      },
      {
        label: "Réserver",
        caption: "Réservation en ligne et mise en avant de votre expertise.",
        type: "photo",
        src: "/site_salon.jpeg",
        alt: "Interface du site du salon de beauté",
      },
    ],
  },
  {
    id: 10,
    name: "Autre",
    category: "Projet personnalisé",
    description: "Un site sur mesure pour toute autre activité, à partir de votre besoin précis.",
    gradient: "from-zinc-500/20 via-stone-500/10 to-slate-500/5",
    accentColor: "zinc",
    mockup: "✨",
    features: ["Sur mesure", "Besoin précis", "Contact", "Adaptation"],
    approach: "Objectif : partir de votre activité réelle pour concevoir une expérience sur-mesure.",
    challenge:
      "Votre activité ne rentre dans aucune case toute faite — c'est souvent le signe d'un projet intéressant.",
    needs: [
      { label: "Partir de votre réalité", note: "On construit à partir de votre métier, pas d'un modèle existant." },
      { label: "Aller à l'essentiel", note: "Ce dont vous avez réellement besoin, rien de superflu." },
      { label: "Être trouvé dans votre ville", note: "La visibilité locale s'applique à presque toutes les activités." },
    ],
    highlights: [
      { label: "Approche", value: "Sur-mesure" },
      { label: "Besoin", value: "Analysé" },
      { label: "Design", value: "Unique" },
      { label: "Accompagnement", value: "Complet" },
    ],
    slides: [
      {
        label: "L'univers",
        caption: "Une expérience digitale pensée pour votre activité, quel que soit votre secteur.",
        type: "photo",
        src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80&auto=format&fit=crop",
        alt: "Projet personnalisé",
      },
      {
        label: "Nos clients",
        caption: "Des projets uniques réalisés sur mesure pour des entrepreneurs de tous secteurs.",
        type: "photo",
        src: "/autre_client.jpeg",
        alt: "Clients et projets personnalisés réalisés par l'agence",
      },
    ],
  },
];

export const REALISATIONS: Realisation[] = PROJECTS;