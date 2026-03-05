import '@testing-library/jest-dom'
import { vi } from 'vitest'

// @todo: check for this later. vitest shoul automatically include .env.
vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_MEAL_DB_BASE_URL: 'https://test.api',
      VITE_MEAL_DB_SECRET: '1',
    },
  },
})

