import { ReceipFilters } from './ReceipFilters'
import { ReceipReset } from './ReceipReset'
import { ReceipSubmit } from './ReceipSubmit'

type ReceipSearchProps = {
  recipeName: string
  ingredient: string
  category: string
  cuisine: string
  categories: string[]
  cuisines: string[]
  isLoadingFilters: boolean
  isLoading: boolean
  onRecipeNameChange: (value: string) => void
  onIngredientChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onCuisineChange: (value: string) => void
  onReset: () => void
  onSubmit: () => void
}

export function ReceipSearch({
  recipeName,
  ingredient,
  category,
  cuisine,
  categories,
  cuisines,
  isLoadingFilters,
  isLoading,
  onRecipeNameChange,
  onIngredientChange,
  onCategoryChange,
  onCuisineChange,
  onReset,
  onSubmit,
}: ReceipSearchProps) {
  const isResetDisabled =
    isLoading ||
    (!recipeName.trim() && !ingredient.trim() && !category.trim() && !cuisine.trim())

  return (
    <form
      className="mt-5 flex flex-wrap gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <input
        type="text"
        value={recipeName}
        placeholder="Recipe name (or part)"
        className="min-w-60 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-emerald-500 transition focus:ring-2"
        onChange={(event) => onRecipeNameChange(event.target.value)}
      />
      <input
        type="text"
        value={ingredient}
        placeholder="Main ingredient"
        className="min-w-52 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-emerald-500 transition focus:ring-2"
        onChange={(event) => onIngredientChange(event.target.value)}
      />
      <ReceipFilters
        category={category}
        cuisine={cuisine}
        categories={categories}
        cuisines={cuisines}
        isLoading={isLoadingFilters}
        onCategoryChange={onCategoryChange}
        onCuisineChange={onCuisineChange}
      />
      <ReceipSubmit isLoading={isLoading} />
      <ReceipReset onReset={onReset} isDisabled={isResetDisabled} />
    </form>
  )
}
