import { Loader } from '../ui/Loader'

type RecipeSubmitProps = {
  isLoading: boolean
}

export function RecipeSubmit({ isLoading }: RecipeSubmitProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
    >
      {isLoading ? (
        <>
          <Loader size={14} inline />
          <span>Searching...</span>
        </>
      ) : (
        'Search'
      )}
    </button>
  )
}
