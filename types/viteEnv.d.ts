interface ImportMetaEnv {
    VITE_ROUTER_AUTOLOAD: boolean
    VITE_MOCK_API_URL: string
    VITE_MOCK_ENABLE: boolean
    VITE_BUILD_PATH: string
    VITE_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
