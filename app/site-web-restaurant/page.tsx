export default function RestaurantPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 px-6">
      
      {/* HERO */}
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Sites web pour restaurants
        </h1>
        <p className="text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
          Attirez plus de clients avec un site moderne, rapide et optimisé pour les réservations.
        </p>

        <div className="mt-8">
          <a href="/#contact" className="px-6 py-3 bg-white text-black rounded-full font-semibold">
            Demander un devis
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-6">
        {[
          "Menu digital interactif",
          "Réservation en ligne",
          "SEO local optimisé"
        ].map((item) => (
          <div key={item} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <p>{item}</p>
          </div>
        ))}
      </section>
    </main>
  );
}