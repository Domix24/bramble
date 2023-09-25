/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_CUSTOM_DEBUG: string
  readonly VITE_SECONDS_REFRESH_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
