import { Outlet } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-100 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
