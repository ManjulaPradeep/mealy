type ReceipResetProps = {
  onReset: () => void
  isDisabled: boolean
}

export function ReceipReset({ onReset, isDisabled }: ReceipResetProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={isDisabled}
      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      Reset
    </button>
  )
}
