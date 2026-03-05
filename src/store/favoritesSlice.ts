import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RecipeSummary } from '../types/recipe'

const FAVORITES_STORAGE_KEY = 'mealy:favorites'

type FavoritesState = {
  items: RecipeSummary[]
}

function isRecipeSummary(value: unknown): value is RecipeSummary {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.image === 'string'
  )
}

function loadFavoritesFromStorage(): RecipeSummary[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isRecipeSummary)
  } catch {
    return []
  }
}

export function persistFavoritesToStorage(items: RecipeSummary[]): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items))
  } catch(error) {
    console.error('Failed to persist favorites:', error)
  }
}

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<RecipeSummary>) {
      const recipe = action.payload
      const existingIndex = state.items.findIndex((item) => item.id === recipe.id)

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1)
        return
      }

      state.items.unshift(recipe)
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
