import { ReceipSubmit } from './ReceipSubmit'

type ReceipSearchProps = {
  recipeName: string
  ingredient: string
  isLoading: boolean
  onRecipeNameChange: (value: string) => void
  onIngredientChange: (value: string) => void
  onSubmit: () => void
}

export function ReceipSearch({
  recipeName,
  ingredient,
  isLoading,
  onRecipeNameChange,
  onIngredientChange,
  onSubmit,
}: ReceipSearchProps) {
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
      <ReceipSubmit isLoading={isLoading} />
    </form>
  )
}
