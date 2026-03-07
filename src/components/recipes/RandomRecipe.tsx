import { useState } from 'react'
import { getRandomRecipe } from '../../services/mealDb'
import type { RecipeDetail } from '../../types/recipe'
import { RecipDetail } from './RecipeDetail'
import { RecipModal } from './RecipeModal'

export function RandomRecipe() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFetchRandom = async () => {
    setIsModalOpen(true)
    setIsLoading(true)
    setErrorMessage(null)
    setRecipe(null)

    try {
      const randomRecipe = await getRandomRecipe()
      if (!randomRecipe) {
        throw new Error('No random recipe found. Please try again.')
      }
      setRecipe(randomRecipe)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="text-center">
        <button type="button" onClick={handleFetchRandom} className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 animate-bounce">
          Feeling Lucky? Get a Random Recipe!
        </button>
      </div>

      <RecipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isLoading ? 'Fetching Recipe...' : recipe?.name ?? 'Random Recipe'}>
        <RecipDetail recipe={recipe} isLoading={isLoading} errorMessage={errorMessage} />
      </RecipModal>
    </>
  )
}