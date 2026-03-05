import { configureStore } from '@reduxjs/toolkit'
import { favoritesReducer, persistFavoritesToStorage } from './favoritesSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
})

store.subscribe(() => {
  persistFavoritesToStorage(store.getState().favorites.items)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
