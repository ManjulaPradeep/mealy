import type { RecipeDetail, RecipeIngredient, RecipeSummary } from '../types/recipe'

const VITE_MEAL_DB_BASE_URL = import.meta.env.VITE_MEAL_DB_BASE_URL
const VITE_MEAL_DB_SECRET = import.meta.env.VITE_MEAL_DB_SECRET

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

type MealDbCategory = {
  strCategory: string
}

type MealDbArea = {
  strArea: string
}

function buildUrl(path: string): string {
  if (!VITE_MEAL_DB_BASE_URL || !VITE_MEAL_DB_SECRET) {
    throw new Error(
      'Missing MealDB env values. Set VITE_MEAL_DB_BASE_URL and VITE_MEAL_DB_SECRET.',
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
  category: string
  cuisine: string
}): Promise<RecipeSummary[]> {
  const name = params.name.trim()
  const ingredient = params.ingredient.trim()
  const category = params.category.trim()
  const cuisine = params.cuisine.trim()

  if (!name && !ingredient && !category && !cuisine) {
    return []
  }

  const [nameResponse, ingredientResponse, categoryResponse, cuisineResponse] =
    await Promise.all([
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
    category
      ? fetchMealDb<MealDbResponse<MealDbFilterMeal>>(
          `filter.php?c=${encodeURIComponent(category)}`,
        )
      : Promise.resolve({ meals: null }),
    cuisine
      ? fetchMealDb<MealDbResponse<MealDbFilterMeal>>(
          `filter.php?a=${encodeURIComponent(cuisine)}`,
        )
      : Promise.resolve({ meals: null }),
    ])

  const resultSets: RecipeSummary[][] = []

  if (name) {
    resultSets.push((nameResponse.meals ?? []).map(mapMealToSummary))
  }
  if (ingredient) {
    resultSets.push((ingredientResponse.meals ?? []).map(mapMealToSummary))
  }
  if (category) {
    resultSets.push((categoryResponse.meals ?? []).map(mapMealToSummary))
  }
  if (cuisine) {
    resultSets.push((cuisineResponse.meals ?? []).map(mapMealToSummary))
  }

  if (!resultSets.length) {
    return []
  }

  let matches = resultSets[0]

  for (let index = 1; index < resultSets.length; index += 1) {
    const matchIds = new Set(resultSets[index].map((recipe) => recipe.id))
    matches = matches.filter((recipe) => matchIds.has(recipe.id))
  }

  return matches
}

export async function getRecipeDetail(id: string): Promise<RecipeDetail | null> {
  const response = await fetchMealDb<MealDbResponse<MealDbMeal>>(
    `lookup.php?i=${encodeURIComponent(id)}`,
  )
  
  const meal = response.meals?.[0]
  return meal ? mapMealToDetail(meal) : null
}

export async function getRandomRecipe(): Promise<RecipeDetail | null> {
  const response = await fetchMealDb<MealDbResponse<MealDbMeal>>('random.php')

  const meal = response.meals?.[0]
  return meal ? mapMealToDetail(meal) : null
}

export async function getRecipeCategories(): Promise<string[]> {
  const response = await fetchMealDb<MealDbResponse<MealDbCategory>>('list.php?c=list')
  return (response.meals ?? []).map((item) => item.strCategory)
}

export async function getRecipeCuisines(): Promise<string[]> {
  const response = await fetchMealDb<MealDbResponse<MealDbArea>>('list.php?a=list')
  return (response.meals ?? []).map((item) => item.strArea)
}
