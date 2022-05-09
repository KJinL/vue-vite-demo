import {http} from '@/plugins/axios'
import {ApiEnum} from "@/enum/apiEnum";
import {
    ICheckLoginResponse,
    ILoginParams,
    ILoginResponse
} from "@/apis/user/interface/userInterFace";
import {method} from "lodash";


function checkLogin() {
    return http.request<ICheckLoginResponse>({
        url: ApiEnum.API_CHECK_LOGIN,
        method: 'get'
    })
}


export function login(data: ILoginParams) {
    return http.request<ILoginResponse>({
        url: ApiEnum.API_LOGIN,
        method: 'post',
        data,
    })
}

export default {checkLogin, login}
