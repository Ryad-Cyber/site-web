export default function RestaurantPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-6">

      {/* HERO */}
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Sites web pour restaurants
        </h1>
        <p className="text-zinc-400 mt-3 text-base max-w-2xl mx-auto">
          Attirez plus de clients avec un site moderne, rapide et optimisé pour les réservations.
        </p>

        <div className="mt-6">
          <a href="/#contact" className="px-5 py-2.5 bg-white text-black rounded-full font-semibold">
            Demander un devis
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-4">
        {[
          "Menu digital interactif",
          "Réservation en ligne",
          "SEO local optimisé"
        ].map((item) => (
          <div key={item} className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <p>{item}</p>
          </div>
        ))}
      </section>
    </main>
  );
}