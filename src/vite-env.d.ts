/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VITE_MEAL_DB_BASE_URL: string
  readonly VITE_VITE_MEAL_DB_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
