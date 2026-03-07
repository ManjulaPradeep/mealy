import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RandomRecipe } from '../RandomRecipe'
import * as api from '../../../services/mealDb'

const mockRecipe = {
  id: '1',
  name: 'Random Meal',
  image: 'https://via.placeholder.com/150',
  instructions: 'Mix ingredients and cook',
  ingredients: [
    { name: 'Ingredient 1', measure: '1 cup' },
    { name: 'Ingredient 2', measure: '2 tbsp' }
  ],
  category: 'Dessert',
  area: 'Italian',
  sourceUrl: 'https://example.com',
  youtubeUrl: 'https://youtube.com'
}

describe('RandomRecipe', () => {
  it('fetches recipe when button clicked', async () => {
    vi.spyOn(api, 'getRandomRecipe').mockResolvedValueOnce(mockRecipe)

    render(<RandomRecipe />)

    fireEvent.click(
      screen.getByRole('button', { name: /feeling lucky\? get a random recipe/i })
    )

    await waitFor(() => {
      expect(api.getRandomRecipe).toHaveBeenCalled()
    })
  })

  it('shows error when fetch fails', async () => {
    vi.spyOn(api, 'getRandomRecipe').mockRejectedValueOnce(new Error('fail'))

    render(<RandomRecipe />)

    fireEvent.click(
      screen.getByRole('button', { name: /feeling lucky\? get a random recipe/i })
    )

    await waitFor(() => {
      expect(screen.getByText(/fail/i)).toBeInTheDocument()
    })
  })
})
