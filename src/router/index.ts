import userStore from '@/store/userStore'
import {App} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'
import autoload from './autoload'
import guard from './guard'
import env from '@/utils/env'

const router = createRouter({
    history: createWebHistory(env.VITE_BUILD_PATH),
    routes: [...routes],
})

export async function setupRouter(app: App) {
    await userStore().getUserInfo()
    autoload(router)
    guard(router)
    app.use(router)
}

export default router
