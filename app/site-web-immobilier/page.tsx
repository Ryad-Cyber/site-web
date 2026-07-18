export default function ImmobilierPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-6">

      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Sites web immobilier
        </h1>
        <p className="text-zinc-400 mt-3">
          Mettez en valeur vos biens avec un design premium.
        </p>

        <div className="mt-6">
          <a href="/#contact" className="px-5 py-2.5 bg-white text-black rounded-full font-semibold">
            Obtenir un site
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-4">
        {[
          "Annonces immobilières",
          "Galeries images HD",
          "Formulaires leads"
        ].map((item) => (
          <div key={item} className="p-5 rounded-2xl border border-white/10 bg-white/5">
            {item}
          </div>
        ))}
      </section>

    </main>
  );
}