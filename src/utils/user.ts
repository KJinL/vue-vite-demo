import userApi from '@/apis/user/request/userApi'
import {CacheEnum} from '@/enum/cacheEnum'
import store from './store'
import router from '@/router'
import userStore from '@/store/userStore'
import {ILoginParams} from "@/apis/user/interface/userInterFace";

export function isLogin() {
    return Boolean(store.get(CacheEnum.TOKEN_KEY))
}

export async function login(values: ILoginParams) {
    const {
        data: {tokenKey},
    } = await userApi.login(values)
    store.set(CacheEnum.TOKEN_KEY, tokenKey)
    await userStore().getUserInfo()

    const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'admin.home'
    router.push({name: routeName})
}

export function logout() {
    router.push('/')
    store.remove(CacheEnum.TOKEN_KEY)
    userStore().info = null
}
