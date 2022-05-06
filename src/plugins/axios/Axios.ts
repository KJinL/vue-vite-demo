import {CacheEnum} from './../../enum/cacheEnum'
import store from '@/utils/store'
import axios, {AxiosRequestConfig} from 'axios'
import router from '@/router'
import errorStore from '@/store/errorStore'
import utils from "@/utils";

export default class Axios {
    private instance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)

        this.interceptors()
    }

    public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request<D>(config)
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        }) as Promise<D>
    }

    private interceptors() {
        this.interceptorsRequest()
        this.interceptorsResponse()
    }

    private interceptorsRequest() {
        this.instance.interceptors.request.use(
            (config) => {
                config.headers = {
                    'token_key': store.get(CacheEnum.TOKEN_KEY),
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            },
        )
    }

    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                utils.user.logout()
                // router.push({name: 'login'})
                return Promise.reject(error)
            },
        )
    }
}
