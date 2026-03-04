import { Link } from 'react-router-dom'

type SocialLink = {
  label: string
  href: string
  iconPath: string
}

const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/ManjulaPradeep/mealy',
    iconPath:
      'M12 .5C5.65.5.5 5.66.5 12.02c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-1.92c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.56-2.56-.29-5.26-1.29-5.26-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.19a11 11 0 0 1 5.79 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.59.24 2.77.12 3.06.74.81 1.19 1.85 1.19 3.11 0 4.44-2.7 5.43-5.27 5.72.41.35.78 1.04.78 2.11v3.13c0 .31.2.66.79.55a11.53 11.53 0 0 0 7.85-10.9C23.5 5.66 18.35.5 12 .5Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/manjula-pradeep-1j/',
    iconPath:
      'M4.98 3.5A2.49 2.49 0 1 1 0 3.5a2.49 2.49 0 0 1 4.98 0ZM.5 8.75h4.96V24H.5V8.75ZM8.56 8.75h4.76v2.08h.07c.66-1.25 2.28-2.57 4.7-2.57 5.03 0 5.96 3.31 5.96 7.62V24h-4.96v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.88-2.77 3.81V24H8.56V8.75Z',
  },
  {
    label: 'X',
    href: 'https://x.com',
    iconPath:
      'M18.9 2H22l-6.8 7.76L23.2 22h-6.27l-4.92-6.4L6.4 22H3.3l7.27-8.3L.8 2h6.42l4.45 5.86L18.9 2Zm-1.1 18h1.74L6.27 3.9H4.4L17.8 20Z',
  },
]

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d={path} />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">mealy</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Discover recipes from around the world, explore new flavors, and build your own
              culinary collection with ease.
            </p>
            <p className="mt-4 text-xs text-slate-500">Powered by TheMealDB API</p>
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Navigation
            </h4>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
              <Link to="/" className="transition hover:text-slate-900">
                Home
              </Link>
              <Link to="/recipes" className="transition hover:text-slate-900">
                Recipes
              </Link>
              <Link to="/favorites" className="transition hover:text-slate-900">
                Favorites
              </Link>
            </nav>
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Follow Us
            </h4>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600"
                >
                  <SocialIcon path={item.iconPath} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-1 px-4 py-4 text-xs text-slate-500 sm:justify-start sm:px-6 lg:px-8">
          <span>(c) {new Date().getFullYear()} Mealy. Crafted with</span>

          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-3 text-slate-500 transition-transform duration-200 ease-in-out hover:scale-125"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
      </div>

    </footer>
  )
}
