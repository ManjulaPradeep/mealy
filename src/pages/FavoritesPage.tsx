import { useMemo } from 'react'
import { RecipList } from '../components/recipes/RecipList'
import { toggleFavorite } from '../store/favoritesSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { RecipeSummary } from '../types/recipe'

export function FavoritesPage() {
  const dispatch = useAppDispatch()
  const favoriteRecipes = useAppSelector((state) => state.favorites.items)
  const favoriteRecipeIds = useMemo(
    () => new Set(favoriteRecipes.map((recipe) => recipe.id)),
    [favoriteRecipes],
  )

  const handleToggleFavorite = (recipe: RecipeSummary) => {
    dispatch(toggleFavorite(recipe))
  }

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Favorite Recipes
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Your saved favorites are persisted in local storage.
        </p>
      </header>

      <RecipList
        recipes={favoriteRecipes}
        hasSearched
        selectedRecipeId={null}
        favoriteRecipeIds={favoriteRecipeIds}
        onSelectRecipe={() => {}}
        onToggleFavorite={handleToggleFavorite}
        emptyMessage="No favorites saved yet."
      />
    </section>
  )
}
