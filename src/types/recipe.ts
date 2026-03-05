export type RecipeSummary = {
  id: string
  name: string
  image: string
}

export type RecipeIngredient = {
  name: string
  measure: string
}

export type RecipeDetail = RecipeSummary & {
  instructions: string
  ingredients: RecipeIngredient[]
  category: string | null
  area: string | null
  sourceUrl: string | null
  youtubeUrl: string | null
}
