import { describe, it, expect, beforeEach, vi } from 'vitest'
import { favoritesReducer, toggleFavorite, persistFavoritesToStorage } from '../favoritesSlice'
import type { RecipeSummary } from '../../types/recipe'

const mockRecipe: RecipeSummary = {
  id: '1',
  name: 'Pizza',
  image: 'pizza.jpg'
}

const mockRecipe2: RecipeSummary = {
  id: '2',
  name: 'Pasta',
  image: 'pasta.jpg'
}

describe('favoritesSlice', () => {

  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should return initial state', () => {
    const state = favoritesReducer(undefined, { type: 'unknown' })

    expect(state.items).toEqual([])
  })

  it('should add recipe to favorites when not existing', () => {
    const initialState = { items: [] }

    const state = favoritesReducer(initialState, toggleFavorite(mockRecipe))

    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toEqual(mockRecipe)
  })

  it('should remove recipe when already in favorites', () => {
    const initialState = { items: [mockRecipe] }

    const state = favoritesReducer(initialState, toggleFavorite(mockRecipe))

    expect(state.items).toHaveLength(0)
  })

  it('should add multiple favorites to beginning of list', () => {
    const initialState = { items: [mockRecipe] }

    const state = favoritesReducer(initialState, toggleFavorite(mockRecipe2))

    expect(state.items).toEqual([mockRecipe2, mockRecipe])
  })

  it('should persist favorites to localStorage', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem')

    persistFavoritesToStorage([mockRecipe])

    expect(spy).toHaveBeenCalledWith(
      'mealy:favorites',
      JSON.stringify([mockRecipe])
    )
  })

  it('should handle localStorage error gracefully', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage error')
    })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    persistFavoritesToStorage([mockRecipe])

    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

})
