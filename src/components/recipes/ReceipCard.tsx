import type { RecipeSummary } from '../../types/recipe'

type ReceipCardProps = {
  recipe: RecipeSummary
  isSelected: boolean
  onSelect: (recipeId: string) => void
}

export function ReceipCard({ recipe, isSelected, onSelect }: ReceipCardProps) {
  return (
    <button
      type="button"
      className={`group relative aspect-square w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        isSelected ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-slate-200'
      }`}
      onClick={() => onSelect(recipe.id)}
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
  )
}



