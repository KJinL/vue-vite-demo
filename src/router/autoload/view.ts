import {RouteRecordRaw} from 'vue-router'

let views = import.meta.globEager('../../views/**/**/*.vue')
let layouts = import.meta.globEager('../../layouts/*.vue')

//获取路由
function getRoutes() {
    const layoutRoutes = [] as RouteRecordRaw[]
    Object.entries(layouts).forEach(([file, module]) => {
        const route = getRouteByModule(file, module, false)
        route.children = getChildrenRoutes(route)
        layoutRoutes.push(route)
    })
    return layoutRoutes
}

//获取布局路由的子路由
function getChildrenRoutes(layoutRoute: RouteRecordRaw) {
    const routes = [] as RouteRecordRaw[]
    Object.entries(views).forEach(([file, module]) => {
        if (file.includes(`../../views/${layoutRoute.name as string}`)) {
            const route = getRouteByModule(file, module, true)
            routes.push(route)
        }
    })
    return routes
}

//通过module获取路由
function getRouteByModule(file: string, module: { [key: string]: any }, isChildrenRoutes: boolean) {
    const name = file.replace(/.+layouts\/|.+views\/|\.vue/gi, '')
    const resName = module.default.meta?.name ? module.default.meta.name : name.replace(/\/(\S*)\//, '.')
    const route = {
        name: resName.replaceAll('/', '.'),
        path: `/${name}`,
        component: module.default,
        meta: module.default.meta,
    } as RouteRecordRaw
    return Object.assign(route, module.default?.route)
}
export default getRoutes
