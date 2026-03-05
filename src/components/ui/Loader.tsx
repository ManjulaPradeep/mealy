type LoaderProps = {
  size?: number
  fullScreen?: boolean
  inline?: boolean
}

export function Loader({ size = 40, fullScreen = false, inline = false }: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center ${
        inline ? '' : fullScreen ? 'min-h-[60vh]' : 'py-10'
      }`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  )
}






// import { createContext, useContext, useState } from 'react'

// type LoadingContextType = {
//   isLoading: boolean
//   startLoading: () => void
//   stopLoading: () => void
// }

// const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

// export function LoadingProvider({ children }: { children: React.ReactNode }) {
//   const [isLoading, setIsLoading] = useState(false)

//   const startLoading = () => setIsLoading(true)
//   const stopLoading = () => setIsLoading(false)

//   return (
//     <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
//       {children}
//     </LoadingContext.Provider>
//   )
// }

// export function useLoading() {
//   const context = useContext(LoadingContext)
//   if (!context) {
//     throw new Error('useLoading must be used within LoadingProvider')
//   }
//   return context
// }
