export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

<div className="text-center text-sm text-gray-500 mt-6">
  ✔ Réponse sous 24h • ✔ Devis gratuit • ✔ Sans engagement
</div>

<section className="max-w-5xl mx-auto px-6 py-28 text-center">

<p className="text-sm text-gray-500 mb-4">
  Développeur Web • Sites modernes • Freelance
</p>

<h1 className="text-6xl font-bold leading-tight">
  Des sites web qui transforment vos visiteurs en clients
</h1>

<p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
  Je crée des sites rapides, modernes et optimisés pour les entreprises qui veulent attirer plus de clients.
</p>

<div className="mt-10 flex justify-center gap-4 flex-wrap">

  <a
    href="https://wa.me/33749635085?text=Bonjour, je souhaite un devis pour un site web"
    target="_blank"
    className="px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
  >
    Demander un devis
  </a>

  <a
    href="#contact"
    className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
  >
    Me contacter
  </a>

</div>

</section>

      {/* POURQUOI MOI */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-8">Pourquoi me choisir ?</h2>

        <ul className="space-y-4 text-gray-700">
          <li>✔ Design moderne et professionnel</li>
          <li>✔ Sites rapides et optimisés</li>
          <li>✔ Adapté mobile / tablette / PC</li>
          <li>✔ Focus sur acquisition de clients</li>
        </ul>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Comment je travaille
  </h2>

  <div className="grid md:grid-cols-3 gap-6 text-center">

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">1. Discussion</h3>
      <p className="text-gray-600 mt-2">
        On parle de votre projet
      </p>
    </div>

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">2. Création</h3>
      <p className="text-gray-600 mt-2">
        Design + développement du site
      </p>
    </div>

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">3. Livraison</h3>
      <p className="text-gray-600 mt-2">
        Mise en ligne du site
      </p>
    </div>

  </div>
</section>

      {/* PROJETS */}
<section className="max-w-5xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-semibold mb-8">Projets réalisés</h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">Restaurant Le Palmier</h3>
      <p className="text-gray-600 mt-2">
        Site vitrine moderne avec menu et réservation
      </p>
    </div>

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">Salon de coiffure Elite</h3>
      <p className="text-gray-600 mt-2">
        Design moderne + prise de rendez-vous
      </p>
    </div>

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">Artisan BTP Pro</h3>
      <p className="text-gray-600 mt-2">
        Site professionnel pour génération de clients
      </p>
    </div>

  </div>
</section>

<section className="max-w-5xl mx-auto px-6 py-16 text-center">
  <h2 className="text-3xl font-semibold mb-8">Tarifs</h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">Starter</h3>
      <p className="text-gray-600 mt-2">Site simple vitrine</p>
      <p className="mt-4 font-bold">150€ - 300€</p>
    </div>

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">Standard</h3>
      <p className="text-gray-600 mt-2">Site pro optimisé</p>
      <p className="mt-4 font-bold">300€ - 600€</p>
    </div>

    <div className="p-6 border rounded-xl">
      <h3 className="font-bold">Premium</h3>
      <p className="text-gray-600 mt-2">Site + SEO + optimisation</p>
      <p className="mt-4 font-bold">600€ - 1000€</p>
    </div>

  </div>
</section>

      {/* CONTACT */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20 text-center">
  <h2 className="text-3xl font-semibold">Contact</h2>

  <p className="mt-4 text-gray-600">
    Vous avez un projet de site web ? Je réponds rapidement.
  </p>

  <div className="mt-8 space-y-4">

    <a
      href="https://wa.me/33749635085?text=Bonjour, j'aimerais un devis pour un site web"
      target="_blank"
      className="inline-block px-6 py-3 bg-green-500 text-white rounded-xl"
    >
      Contacter sur WhatsApp
    </a>

    <div className="text-gray-600 text-sm space-y-1">
      <p>📱 Téléphone : +33 7 49 63 50 85</p>
      <p>📸 Instagram : ryad.bjn_</p>
      <p>👻 Snapchat : ryadbjn</p>
    </div>

    <p className="text-gray-500 text-sm">
      Réponse rapide • Devis gratuit
    </p>

  </div>
</section>
<section className="max-w-5xl mx-auto px-6 py-16 text-center">
  <h2 className="text-2xl font-semibold">Disponible pour vos projets</h2>

  <p className="mt-4 text-gray-600">
    Je travaille avec des entreprises locales pour créer des sites modernes, rapides et efficaces.
  </p>

  <p className="mt-2 text-sm text-gray-500">
    Réponse rapide • Devis gratuit • Accompagnement personnalisé
  </p>
</section>
      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm">
        © 2026 - Création de sites web modernes
      </footer>

      <a
  href="https://wa.me/33749635085?text=Bonjour, j'aimerais un devis pour un site web"
  target="_blank"
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#25D366",
    color: "white",
    padding: "12px 16px",
    borderRadius: "50px",
    fontSize: "14px",
    textDecoration: "none",
    fontWeight: "bold"
  }}
>
  WhatsApp
</a>
    </main>
  );
}