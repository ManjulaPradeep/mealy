import type { RecipeSummary } from '../../types/recipe'

type ReceipCardProps = {
  recipe: RecipeSummary
  isSelected: boolean
  isFavorite: boolean
  onSelect: (recipeId: string) => void
  onToggleFavorite: (recipe: RecipeSummary) => void
}

export function ReceipCard({
  recipe,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: ReceipCardProps) {
  return (
    <article
      className={`group relative aspect-square w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        isSelected ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-slate-200'
      }`}
    >
      <button
        type="button"
        className="h-full w-full"
        onClick={() => onSelect(recipe.id)}
        aria-label={`View recipe ${recipe.name}`}
      >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4">
        <h2 className="line-clamp-2 text-sm font-semibold text-white sm:text-base">
          {recipe.name}
        </h2>
      </div>
      </button>

      <button
        type="button"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className={`absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition ${
          isFavorite
            ? 'border-rose-500 bg-rose-500 text-white hover:bg-rose-600'
            : 'border-white/70 bg-black/20 text-white hover:bg-black/35'
        }`}
        onClick={() => onToggleFavorite(recipe)}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 21s-6.7-4.1-9.2-8C1 10.1 1.6 6.9 4.2 5.2a5 5 0 0 1 5.8.5L12 7.5l2-1.8a5 5 0 0 1 5.8-.5c2.6 1.7 3.2 4.9 1.4 7.8C18.7 16.9 12 21 12 21Z"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  )
}



