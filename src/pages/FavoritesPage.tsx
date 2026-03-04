export function FavoritesPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Favorite Recipes
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Your saved meals will appear here once favorites state is connected to
          local storage.
        </p>
      </header>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center">
        <p className="text-sm text-slate-600">No favorites saved yet.</p>
      </div>
    </section>
  )
}
