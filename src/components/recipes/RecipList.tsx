import type { RecipeSummary } from '../../types/recipe'
import { ReceipCard } from './ReceipCard'

type RecipListProps = {
  recipes: RecipeSummary[]
  hasSearched: boolean
  selectedRecipeId: string | null
  onSelectRecipe: (recipeId: string) => void
}

export function RecipList({
  recipes,
  hasSearched,
  selectedRecipeId,
  onSelectRecipe,
}: RecipListProps) {
  if (!recipes.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center">
        <p className="text-sm text-slate-600">
          {hasSearched
            ? 'No recipes matched your search criteria.'
            : 'Search recipes by name or ingredient to see results.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {recipes.map((recipe) => (
        <ReceipCard
          key={recipe.id}
          recipe={recipe}
          isSelected={selectedRecipeId === recipe.id}
          onSelect={onSelectRecipe}
        />
      ))}
    </div>
  )
}
