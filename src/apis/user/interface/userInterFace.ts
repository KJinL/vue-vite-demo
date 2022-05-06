//用户身份信息接口
export interface IUserInfo{
    channelName: string,
    status: string,
    userHead: string,
    userName: string,
    userRole: string
}

// 检查用户登录响应参数
export interface ICheckLoginResponse {
    item: IUserInfo
}

// 登录请求参数
export interface ILoginResponse {
    tokenKey: string,
    info: IUserInfo
}

// 登录响应参数
export interface ILoginParams {
    userName: string
    passWord: string
}
