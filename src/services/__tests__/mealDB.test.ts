import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  searchRecipes,
  getRecipeDetail,
  getRandomRecipe,
  getRecipeCategories,
  getRecipeCuisines,
} from '../mealDb'

// @todo: implement real tests for this component. 
const mockMeal = {
  idMeal: '100',
  strMeal: 'Test Meal',
  strMealThumb: 'image.jpg',
  strInstructions: ' Cook well ',
  strCategory: ' Beef ',
  strArea: ' Italian ',
  strSource: ' http://source.com ',
  strYoutube: ' http://youtube.com ',
  strIngredient1: 'Salt',
  strMeasure1: '1 tsp',
  strIngredient2: ' Pepper ',
  strMeasure2: ' 2 tsp ',
}

describe('mealDb service', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    global.fetch = vi.fn((url: string) => {
      if (url.includes('search.php')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ meals: [mockMeal] }),
        } as Response)
      }

      if (url.includes('filter.php')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              meals: [
                {
                  idMeal: '100',
                  strMeal: 'Test Meal',
                  strMealThumb: 'image.jpg',
                },
              ],
            }),
        } as Response)
      }

      if (url.includes('lookup.php')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ meals: [mockMeal] }),
        } as Response)
      }

      if (url.includes('random.php')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ meals: [mockMeal] }),
        } as Response)
      }

      if (url.includes('list.php?c=list')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              meals: [{ strCategory: 'Beef' }, { strCategory: 'Chicken' }],
            }),
        } as Response)
      }

      if (url.includes('list.php?a=list')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              meals: [{ strArea: 'Italian' }, { strArea: 'French' }],
            }),
        } as Response)
      }

      return Promise.reject(new Error('Unknown URL'))
    }) as any
  })

  // -------------------------------------------------
  // searchRecipes
  // -------------------------------------------------

  it('returns empty array when no params provided', async () => {
    const result = await searchRecipes({
      name: '',
      ingredient: '',
      category: '',
      cuisine: '',
    })

    expect(result).toEqual([])
    expect(fetch).not.toHaveBeenCalled()
  })

  it('searches by name', async () => {
    const result = await searchRecipes({
      name: 'beef',
      ingredient: '',
      category: '',
      cuisine: '',
    })

    expect(fetch).toHaveBeenCalled()
    expect(result[0].id).toBe('100')
    expect(result[0].name).toBe('Test Meal')
  })

  it('intersects multiple filters correctly', async () => {
    const result = await searchRecipes({
      name: 'beef',
      ingredient: 'salt',
      category: '',
      cuisine: '',
    })

    expect(result.length).toBe(1)
    expect(result[0].id).toBe('100')
  })

  // -------------------------------------------------
  // getRecipeDetail
  // -------------------------------------------------

  it('returns mapped recipe detail', async () => {
    const result = await getRecipeDetail('100')

    expect(result?.id).toBe('100')
    expect(result?.instructions).toBe('Cook well')
    expect(result?.category).toBe('Beef')
    expect(result?.area).toBe('Italian')
    expect(result?.ingredients.length).toBe(2)

    expect(result?.ingredients[0]).toEqual({
      name: 'Salt',
      measure: '1 tsp',
    })

    expect(result?.ingredients[1]).toEqual({
      name: 'Pepper',
      measure: '2 tsp',
    })
  })

  it('returns null if no meal found', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ meals: null }),
      } as Response)
    )

    const result = await getRecipeDetail('999')
    expect(result).toBeNull()
  })

  // -------------------------------------------------
  // getRandomRecipe
  // -------------------------------------------------

  it('returns random recipe', async () => {
    const result = await getRandomRecipe()

    expect(result?.id).toBe('100')
  })

  // -------------------------------------------------
  // categories & cuisines
  // -------------------------------------------------

  it('returns recipe categories', async () => {
    const result = await getRecipeCategories()

    expect(result).toEqual(['Beef', 'Chicken'])
  })

  it('returns recipe cuisines', async () => {
    const result = await getRecipeCuisines()

    expect(result).toEqual(['Italian', 'French'])
  })

  // -------------------------------------------------
  // error handling
  // -------------------------------------------------

  it('throws error when response is not ok', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as Response)
    )

    await expect(
      getRandomRecipe()
    ).rejects.toThrow('Failed to fetch recipes: 500')
  })
})
