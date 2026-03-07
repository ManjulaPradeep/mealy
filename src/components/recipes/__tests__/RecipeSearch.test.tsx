// src/components/recipes/__tests__/RecipeSearch.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RecipeSearch } from '../RecipeSearch'

// Mock child components
vi.mock('../RecipeFilters', () => ({
  RecipeFilters: ({ onCategoryChange, onCuisineChange }: any) => (
    <div>
      <button onClick={() => onCategoryChange('Dessert')}>Category</button>
      <button onClick={() => onCuisineChange('Italian')}>Cuisine</button>
    </div>
  ),
}))

vi.mock('../RecipeSubmit', () => ({
  RecipeSubmit: ({ isLoading }: any) => <button disabled={isLoading}>Search</button>,
}))

vi.mock('../RecipeReset', () => ({
  RecipeReset: ({ onReset, isDisabled }: any) => (
    <button disabled={isDisabled} onClick={onReset}>
      Reset
    </button>
  ),
}))

const defaultProps = {
  recipeName: 'Cake',
  ingredient: 'Chocolate',
  category: '',
  cuisine: '',
  categories: ['Dessert', 'Main Course'],
  cuisines: ['Italian', 'Indian'],
  isLoadingFilters: false,
  isLoading: false,
  onRecipeNameChange: vi.fn(),
  onIngredientChange: vi.fn(),
  onCategoryChange: vi.fn(),
  onCuisineChange: vi.fn(),
  onReset: vi.fn(),
  onSubmit: vi.fn(),
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('RecipeSearch', () => {
  it('renders inputs and buttons', () => {
    render(<RecipeSearch {...defaultProps} />)

    expect(screen.getByPlaceholderText(/recipe name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/main ingredient/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
    expect(screen.getByText(/category/i)).toBeInTheDocument()
    expect(screen.getByText(/cuisine/i)).toBeInTheDocument()
  })

  it('calls onRecipeNameChange and onIngredientChange when typing', async () => {
    const user = userEvent.setup()
    render(<RecipeSearch {...defaultProps} />)

    const recipeInput = screen.getByPlaceholderText(/recipe name/i)
    const ingredientInput = screen.getByPlaceholderText(/main ingredient/i)

    await user.clear(recipeInput)
    await user.type(recipeInput, 'Pie')
    await user.clear(ingredientInput)
    await user.type(ingredientInput, 'Apple')

    expect(defaultProps.onRecipeNameChange).toHaveBeenCalled()
    expect(defaultProps.onIngredientChange).toHaveBeenCalled()
  })

  it('calls onCategoryChange and onCuisineChange from RecipeFilters', async () => {
    const user = userEvent.setup()
    render(<RecipeSearch {...defaultProps} />)

    await user.click(screen.getByText(/category/i))
    expect(defaultProps.onCategoryChange).toHaveBeenCalledWith('Dessert')

    await user.click(screen.getByText(/cuisine/i))
    expect(defaultProps.onCuisineChange).toHaveBeenCalledWith('Italian')
  })

  it('calls onSubmit when search button is clicked', async () => {
    const user = userEvent.setup()
    render(<RecipeSearch {...defaultProps} />)

    const submitButton = screen.getByRole('button', { name: /search/i })
    await user.click(submitButton)

    expect(defaultProps.onSubmit).toHaveBeenCalled()
  })

  it('calls onReset when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <RecipeSearch
        {...defaultProps}
        recipeName="Cake"
        ingredient="Chocolate"
        category=""
        cuisine=""
      />
    )

    const resetButton = screen.getByRole('button', { name: /reset/i })
    expect(resetButton).not.toBeDisabled()
    await user.click(resetButton)
    expect(defaultProps.onReset).toHaveBeenCalled()
  })

  it('disables reset button when form is empty or loading', () => {
    render(
      <RecipeSearch
        {...defaultProps}
        recipeName=""
        ingredient=""
        category=""
        cuisine=""
        isLoading={true}
      />
    )

    const resetButton = screen.getByRole('button', { name: /reset/i })
    expect(resetButton).toBeDisabled()
  })
})
