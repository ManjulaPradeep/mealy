type RecipeFiltersProps = {
  category: string
  cuisine: string
  categories: string[]
  cuisines: string[]
  isLoading: boolean
  onCategoryChange: (value: string) => void
  onCuisineChange: (value: string) => void
}

export function RecipeFilters({
  category,
  cuisine,
  categories,
  cuisines,
  isLoading,
  onCategoryChange,
  onCuisineChange,
}: RecipeFiltersProps) {
  return (
    <>
      <select
        value={category}
        disabled={isLoading}
        className="min-w-48 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-emerald-500 transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={cuisine}
        disabled={isLoading}
        className="min-w-48 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-emerald-500 transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
        onChange={(event) => onCuisineChange(event.target.value)}
      >
        <option value="">All cuisines</option>
        {cuisines.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  )
}
