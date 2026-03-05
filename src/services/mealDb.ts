import type { RecipeDetail, RecipeIngredient, RecipeSummary } from '../types/recipe'

const VITE_MEAL_DB_BASE_URL = import.meta.env.VITE_VITE_MEAL_DB_BASE_URL
const VITE_MEAL_DB_SECRET = import.meta.env.VITE_VITE_MEAL_DB_SECRET

type MealDbMeal = {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions?: string | null
  strCategory?: string | null
  strArea?: string | null
  strSource?: string | null
  strYoutube?: string | null
  [key: `strIngredient${number}`]: string | null | undefined
  [key: `strMeasure${number}`]: string | null | undefined
}

type MealDbFilterMeal = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

type MealDbResponse<TMeal> = {
  meals: TMeal[] | null
}

function buildUrl(path: string): string {
  if (!VITE_MEAL_DB_BASE_URL || !VITE_MEAL_DB_SECRET) {
    throw new Error(
      'Missing MealDB env values. Set VITE_VITE_MEAL_DB_BASE_URL and VITE_VITE_MEAL_DB_SECRET.',
    )
  }

  const base = VITE_MEAL_DB_BASE_URL.replace(/\/$/, '')
  return `${base}/${VITE_MEAL_DB_SECRET}/${path}`
}

async function fetchMealDb<T>(path: string): Promise<T> {
  const response = await fetch(buildUrl(path))
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.status}`)
  }

  return (await response.json()) as T
}

function mapMealToSummary(meal: MealDbMeal | MealDbFilterMeal): RecipeSummary {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
  }
}

function extractIngredients(meal: MealDbMeal): RecipeIngredient[] {
  const ingredients: RecipeIngredient[] = []

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = meal[`strIngredient${index}`]?.trim()
    const measure = meal[`strMeasure${index}`]?.trim() ?? ''

    if (ingredient) {
      ingredients.push({ name: ingredient, measure })
    }
  }

  return ingredients
}

function mapMealToDetail(meal: MealDbMeal): RecipeDetail {
  return {
    ...mapMealToSummary(meal),
    instructions: meal.strInstructions?.trim() ?? 'No instructions provided.',
    ingredients: extractIngredients(meal),
    category: meal.strCategory?.trim() || null,
    area: meal.strArea?.trim() || null,
    sourceUrl: meal.strSource?.trim() || null,
    youtubeUrl: meal.strYoutube?.trim() || null,
  }
}

export async function searchRecipes(params: {
  name: string
  ingredient: string
}): Promise<RecipeSummary[]> {
  const name = params.name.trim()
  const ingredient = params.ingredient.trim()

  if (!name && !ingredient) {
    return []
  }

  const [nameResponse, ingredientResponse] = await Promise.all([
    name
      ? fetchMealDb<MealDbResponse<MealDbMeal>>(
          `search.php?s=${encodeURIComponent(name)}`,
        )
      : Promise.resolve({ meals: null }),
    ingredient
      ? fetchMealDb<MealDbResponse<MealDbFilterMeal>>(
          `filter.php?i=${encodeURIComponent(ingredient)}`,
        )
      : Promise.resolve({ meals: null }),
  ])

  const nameMatches = (nameResponse.meals ?? []).map(mapMealToSummary)
  const ingredientMatches = (ingredientResponse.meals ?? []).map(mapMealToSummary)

  if (name && ingredient) {
    const ingredientIds = new Set(ingredientMatches.map((recipe) => recipe.id))
    return nameMatches.filter((recipe) => ingredientIds.has(recipe.id))
  }

  if (name) {
    return nameMatches
  }

  return ingredientMatches
}

export async function getRecipeDetail(id: string): Promise<RecipeDetail | null> {
  const response = await fetchMealDb<MealDbResponse<MealDbMeal>>(
    `lookup.php?i=${encodeURIComponent(id)}`,
  )
  
  const meal = response.meals?.[0]
  return meal ? mapMealToDetail(meal) : null
}
