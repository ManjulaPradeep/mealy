import { Link } from 'react-router-dom'
import { RandomRecipe } from '../components/recipes/RandomRecipe'

const featureCards = [
  {
    title: 'Search by ingredient',
    description: 'Find meal ideas quickly from ingredients you already have.',
  },
  {
    title: 'Smart recipe details',
    description: 'See ingredients, measures, instructions, and helpful links.',
  },
  {
    title: 'Save favorites',
    description: 'Mark your top recipes and persist them in local storage.',
  },
]

export function HomePage() {
  return (
    <section className="space-y-8 sm:space-y-10">
      <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-500 to-cyan-600 p-6 text-white shadow-xl sm:p-10">
        <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Your Next Favorite Meal Starts Here.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/90 sm:text-base">
          Find recipes by ingredients you already have and turn simple meals into something special.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/recipes"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Start Searching
          </Link>
          <Link
            to="/favorites"
            className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Favorites
          </Link>

                <RandomRecipe />

        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
