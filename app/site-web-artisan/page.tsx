export default function ArtisanPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-6">

      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Sites web pour artisans
        </h1>
        <p className="text-zinc-400 mt-3">
          Plomberie, électricité, bâtiment : soyez visible localement.
        </p>

        <div className="mt-6">
          <a href="/#contact" className="px-5 py-2.5 bg-white text-black rounded-full font-semibold">
            Être contacté
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-4">
        {[
          "Appels directs clients",
          "SEO Google Maps",
          "Site ultra rapide"
        ].map((item) => (
          <div key={item} className="p-5 rounded-2xl border border-white/10 bg-white/5">
            {item}
          </div>
        ))}
      </section>

    </main>
  );
}