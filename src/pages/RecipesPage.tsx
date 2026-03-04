const recipePlaceholders = [
  'Chicken Biryani',
  'Greek Salad Bowl',
  'Thai Green Curry',
  'Spicy Tuna Pasta',
]

export function RecipesPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Recipe Search
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Search by meal name or ingredient. API integration and result cards
          will be connected in the next step.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Search by recipe name..."
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-emerald-500 transition focus:ring-2 sm:col-span-2"
          />
          <button className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
            Search
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {recipePlaceholders.map((name) => (
          <article
            key={name}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="h-36 rounded-xl bg-slate-200/70" />
            <h2 className="mt-4 text-base font-semibold text-slate-900">{name}</h2>
            <p className="mt-1 text-sm text-slate-600">
              Placeholder card for API recipe results.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
