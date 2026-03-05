import { useEffect, useState } from 'react'
import { RecipDetail } from '../components/recipes/RecipDetail'
import { RecipList } from '../components/recipes/RecipList'
import { RecipModal } from '../components/recipes/RecipModal'
import { RecipPagination } from '../components/recipes/RecipPagination'
import { ReceipSearch } from '../components/recipes/receipSearch'
import { getRecipeDetail, searchRecipes } from '../services/mealDb'
import type { RecipeDetail, RecipeSummary } from '../types/recipe'

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback
}

function getItemsPerPageByWidth(width: number): number {
  if (width >= 1280) {
    return 10
  }
  if (width >= 1024) {
    return 8
  }
  if (width >= 640) {
    return 9
  }
  return 8
}

export function RecipesPage() {
  const [recipeName, setRecipeName] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [recipes, setRecipes] = useState<RecipeSummary[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    getItemsPerPageByWidth(window.innerWidth),
  )
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [detailError, setDetailError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedRecipeId) {
      setSelectedRecipe(null)
      setDetailError(null)
      return
    }

    let isCancelled = false
    setIsLoadingDetail(true)
    setDetailError(null)

    getRecipeDetail(selectedRecipeId)
      .then((recipeDetail) => {
        if (isCancelled) {
          return
        }

        setSelectedRecipe(recipeDetail)
        if (!recipeDetail) {
          setDetailError('Recipe details are unavailable for this item.')
        }
      })
      .catch((error: unknown) => {
        if (!isCancelled) {
          setDetailError(
            getErrorMessage(error, 'Failed to load recipe details. Please try again.'),
          )
          setSelectedRecipe(null)
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoadingDetail(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [selectedRecipeId])

  useEffect(() => {
    const onResize = () => {
      setItemsPerPage(getItemsPerPageByWidth(window.innerWidth))
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const totalPages = Math.ceil(recipes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRecipes = recipes.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1)
      return
    }

    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const handleSelectRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId)
    setIsDetailModalOpen(true)
  }

  const handleSearch = async () => {
    setSearchError(null)

    if (!recipeName.trim() && !ingredient.trim()) {
      setHasSearched(false)
      setCurrentPage(1)
      setIsDetailModalOpen(false)
      setRecipes([])
      setSelectedRecipeId(null)
      setSelectedRecipe(null)
      setSearchError('Enter a recipe name, ingredient, or both.')
      return
    }

    setHasSearched(true)
    setIsSearching(true)

    try {
      const matches = await searchRecipes({ name: recipeName, ingredient })
      setRecipes(matches)
      setCurrentPage(1)
      setIsDetailModalOpen(false)
      setSelectedRecipeId(null)
      setSelectedRecipe(null)
    } catch (error: unknown) {
      setCurrentPage(1)
      setIsDetailModalOpen(false)
      setRecipes([])
      setSelectedRecipeId(null)
      setSelectedRecipe(null)
      setSearchError(getErrorMessage(error, 'Failed to fetch recipes. Please try again.'))
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Recipe Search
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Search by recipe name, main ingredient, or use both to narrow your
          results.
        </p>

        <ReceipSearch
          recipeName={recipeName}
          ingredient={ingredient}
          isLoading={isSearching}
          onRecipeNameChange={setRecipeName}
          onIngredientChange={setIngredient}
          onSubmit={handleSearch}
        />

        {searchError ? (
          <p className="mt-3 text-sm text-rose-700">{searchError}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-6 xl:flex-nowrap">
        <section className="w-full space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Search Results {recipes.length ? `(${recipes.length})` : ''}
          </h2>
          <RecipList
            recipes={paginatedRecipes}
            hasSearched={hasSearched}
            selectedRecipeId={selectedRecipeId}
            onSelectRecipe={handleSelectRecipe}
          />
          <RecipPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      </div>
      <RecipModal
        isOpen={isDetailModalOpen}
        title={selectedRecipe?.name ?? 'Recipe Details'}
        onClose={() => setIsDetailModalOpen(false)}
      >
          <RecipDetail
            recipe={selectedRecipe}
            isLoading={isLoadingDetail}
            errorMessage={detailError}
          />
      </RecipModal>
    </section>
  )
}
