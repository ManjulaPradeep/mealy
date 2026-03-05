import type { RecipeDetail } from '../../types/recipe'

type RecipDetailProps = {
  recipe: RecipeDetail | null
  isLoading: boolean
  errorMessage: string | null
}

export function RecipDetail({ recipe, isLoading, errorMessage }: RecipDetailProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Loading recipe details...</p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
        <p className="text-sm text-rose-700">{errorMessage}</p>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center">
        <p className="text-sm text-slate-600">
          Select a recipe from the results to view its details.
        </p>
      </div>
    )
  }

  const instructionSteps = recipe.instructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter(Boolean)

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-56 w-full object-cover sm:h-64"
      />
      <div className="space-y-6 p-5 sm:p-6">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{recipe.name}</h2>
          <p className="text-sm text-slate-600">
            Category: {recipe.category ?? 'N/A'} | Area: {recipe.area ?? 'N/A'}
          </p>
        </header>

        <section>
          <h3 className="text-lg font-semibold text-slate-900">Ingredients</h3>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-700">
            {recipe.ingredients.map((item) => (
              <li
                key={`${item.name}-${item.measure}`}
                className="rounded-lg border border-slate-200 px-3 py-2"
              >
                {item.name}
                {item.measure ? ` - ${item.measure}` : ''}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-900">Instructions</h3>
          <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {instructionSteps.length ? (
              instructionSteps.map((step, index) => (
                <p key={`${index + 1}-${step}`}>{step}</p>
              ))
            ) : (
              <p>No instructions provided.</p>
            )}
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          {recipe.sourceUrl ? (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Source
            </a>
          ) : null}
          {recipe.youtubeUrl ? (
            <a
              href={recipe.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              Video Tutorial
            </a>
          ) : null}
        </section>
      </div>
    </article>
  )
}
