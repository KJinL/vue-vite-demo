import {CacheEnum} from '@/enum/cacheEnum'
import store from '@/utils/store'
import {defineStore} from 'pinia'
import {ICheckLoginResponse, IUserInfo} from "@/apis/user/interface/userInterFace";
import userApi from "@/apis/user/request/userApi";

export default defineStore('user', {
    state: () => {
        return {
            info: {} as null | ICheckLoginResponse,
        }
    },
    actions: {
        async getUserInfo() {
            if (store.get(CacheEnum.TOKEN_KEY)) {
                const res = await userApi.checkLogin()
                this.info = res.data
            }
        },
        updateUserInfo(userInfo: ICheckLoginResponse) {
            this.info = userInfo
        }
    },
})
