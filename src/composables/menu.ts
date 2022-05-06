import store from '@/utils/store'
import {RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw} from 'vue-router'
import {IMenu} from '#/menu'
import {ref} from 'vue'
import router from '@/router'
import utils from '@/utils'
import {CacheEnum} from '@/enum/cacheEnum'

let layoutsInfo = import.meta.globEager('../../views/**/**/index.ts')

class Menu {
    public menus = ref<IMenu[]>([])
    public history = ref<IMenu[]>([])
    public close = ref(store.get(CacheEnum.MENU_IS_CLOSE) ?? true)
    public route = ref(null as null | RouteLocationNormalized)
    private static instance: Menu;

    static getInstance() {
        if (!Menu.instance) {
            Menu.instance = new Menu();
        }
        return Menu.instance;
    }

    private constructor() {
        this.menus.value = utils.env.VITE_ROUTER_AUTOLOAD ? this.getAutoLoadMenuByRoute() : this.getMenuByRoute()
        this.history.value = this.getHistoryMenu()
    }

    private getHistoryMenu() {
        const routes = [] as RouteRecordRaw[]
        router.getRoutes().map((r) => routes.push(...r.children))

        let menus: IMenu[] = utils.store.get(CacheEnum.HISTORY_MENU) ?? []
        return menus.filter((m) => {
            return routes.some((r) => r.name == m.route)
        })
    }

    removeHistoryMenu(menu: IMenu) {
        const index = this.history.value.indexOf(menu)
        this.history.value.splice(index, 1)
        utils.store.set(CacheEnum.HISTORY_MENU, this.history.value)
    }

    addHistoryMenu(route: RouteLocationNormalized) {
        if (!route.meta?.menu) return
        this.route.value = route

        const menu: IMenu = {...route.meta?.menu, route: route.name as string}
        const isHas = this.history.value.some((menu) => menu.route == route.name)
        if (!isHas) this.history.value.unshift(menu)
        if (this.history.value.length > 10) {
            this.history.value.pop()
        }

        utils.store.set(CacheEnum.HISTORY_MENU, this.history.value)
    }

    toggleParentMenu(menu: IMenu) {
        this.menus.value.forEach((m) => {
            m.isClick = m == menu;
        })
    }

    toggleState() {
        this.close.value = !this.close.value
        store.set(CacheEnum.MENU_IS_CLOSE, this.close.value)
    }

    setCurrentMenu(route: RouteLocationNormalizedLoaded) {
        this.menus.value.forEach((m) => {
            m.isClick = false
            m.children?.forEach((c) => {
                c.isClick = false
                if (c.route == route.name) {
                    m.isClick = true
                    c.isClick = true
                }
            })
        })
    }

    private getMenuByRoute() {
        return router
            .getRoutes()
            .filter((route) => route.children.length && route.meta.menu)
            .map((route) => {
                let menu: IMenu = {...route.meta?.menu}
                menu.children = route.children
                    .filter((route) => route.meta?.menu)
                    .map((route) => {
                        return {...route.meta?.menu, route: route.name}
                    }) as IMenu[]
                return menu
            })
            .filter((menu) => menu.children?.length) as IMenu[]
    }

    private getAutoLoadMenuByRoute() {
        const routes = router.getRoutes()
        const titleList: string[] = ['title']
        //拼接父路由
        const pMenu = routes
            .filter((route) => route.children.length && route.meta.menu)
            .map((route) => {
                const pRouteMeta = route.children
                    .filter((route) => route.meta?.pMeta)
                    .map((route) => {
                        return {...route.meta?.pMeta}
                    })
                return pRouteMeta
                    .map((route) => {
                        // @ts-ignore
                        const title = route.meta.menu.title
                        if (!titleList.includes(title)) {
                            titleList.push(title)
                            // @ts-ignore
                            const pMenuItem: IMenu = {
                                // @ts-ignore
                                title: title,
                                // @ts-ignore
                                icon: route.meta.menu.icon,
                                isClick: false,
                                children: []
                            }
                            return pMenuItem
                        }
                    })
            })

        //去除pMenu中的undefined
        pMenu[0] = pMenu[0].filter((menu) => typeof menu !== 'undefined')
        //拼接子路由
        routes.filter((route) => route.children.length && route.meta.menu)
            .map((route) => {
                route.children.filter((route) => route.meta?.pMeta && route.meta.menu)
                    .map((route) => {
                        const chiRoute = route
                        // @ts-ignore
                        for (let i = 0; i < pMenu[0].length; i++) {
                            // @ts-ignore
                            if (pMenu[0][i].title === chiRoute.meta?.pMeta?.meta?.menu.title) {
                                const chiMenu = {
                                    // @ts-ignore
                                    title: chiRoute.meta?.menu.title,
                                    isClick: false,
                                    route: chiRoute.name
                                }
                                // @ts-ignore
                                pMenu[0][i].children.push(chiMenu)
                            }
                        }
                    })
            })


        const autoMenu = routes
            .filter((route) => route.children.length && route.meta.menu)
            .map((route) => {
                let menu: IMenu = {...route.meta?.menu}
                let pMenu: IMenu = {}
                menu.children = route.children
                    .filter((route) => !route.meta?.pMeta)
                    .map((route) => {
                        return {...route.meta?.menu, route: route.name}
                    }) as IMenu[]
                return menu
            })
            .filter((menu) => menu.children?.length) as IMenu[]
        return  pMenu[0].concat(autoMenu) as IMenu[]
    }
}

interface MenuObj {
    k: string,
    v: IMenu[]
}

export default Menu
