import Axios from './Axios'
import utils from "@/utils";
import {CacheEnum} from "@/enum/cacheEnum";
import env from "@/utils/env";

const http = new Axios({
    baseURL: env.VITE_BASE_URL,
    timeout: 10000,
    headers: {},
})

export {http}
