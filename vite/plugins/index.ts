import vue from '@vitejs/plugin-vue'
import {Plugin} from 'vite'
import autoImport from './autoImport'
import {setupMockPlugin} from './mock'

export default function setupPlugins(isBuild: boolean, env: ImportMetaEnv) {
    const plugins: Plugin[] = [vue()]
    plugins.push(setupMockPlugin(env.VITE_MOCK_ENABLE))
    autoImport(plugins)
    return plugins
}
