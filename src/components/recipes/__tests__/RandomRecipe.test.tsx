import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RandomRecipe } from '../RandomRecipe'
import * as api from '../../../services/mealDb'

// @todo: implement real tests for this component. 
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
  it('fetches and calls onSelectRecipe when button clicked', async () => {
    vi.spyOn(api, 'getRandomRecipe').mockResolvedValueOnce(mockRecipe)
    const onSelect = vi.fn(() => {})

    render(<RandomRecipe {...{ onSelectRecipe: onSelect } as any} />)

    fireEvent.click(screen.getByRole('button', { name: /random recipe/i }))

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith(mockRecipe)
    })
  })

  it('shows error when fetch fails', async () => {
    vi.spyOn(api, 'getRandomRecipe').mockRejectedValueOnce(new Error('fail'))

    render(<RandomRecipe {...{ onSelectRecipe: vi.fn() } as any} />)

    fireEvent.click(screen.getByRole('button', { name: /random recipe/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load random recipe/i)
      ).toBeInTheDocument()
    })
  })
})
