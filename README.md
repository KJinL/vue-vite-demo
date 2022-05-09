##图标
>图标库为字节跳动开源的图片库iconpark https://iconpark.oceanengine.com/official
1. 直接使用可以再官方复制vue代码
2. 使用\<component :is="icons[‘iconName]">标签进行使用，需要注意的是此方式需要在script标签中将icons引入

##路由自动注册
###开启自动注册
1. 修改 **env** 文件中的 **VITE_ROUTER_AUTOLOAD** 值为true<br/>
2. 自动的注册的路由会以layout中的第一级子目录的vue文件为父路由，同时读取默认导出的**meta**值作为标题和icon
```typescript
  meta: {
    auth: true,
    menu: {
      title: '管理员页面',// 菜单标题
      icon: 'DashboardOne'// 菜单icon
    }
  }
```
3. 子 **view** 需要在 **src/views** 目录下创建与父 **view** 同名目录，
在里面创建不同的模块目录，同时会读取默认导出的 **meta**中的值作为菜单标题
```typescript
  meta: {
    name: 'admin.home',// 路由名称
    menu: {
      title: '状态'// 菜单标题
    }
  }
```
4. 子view如果需要在才但中额外分类父级菜单，则需要在**meta**中新增**pMeta**数据
```typescript
  meta: {
    pMeta:{
        meta: {
            menu: {
                title: 'Dashboard',
                    icon: 'DashboardOne'
            }
        },
    },
    name: 'admin.home',// 路由名称
    menu: {
      title: '状态'// 菜单标题
    }
  }
```
###关闭自动注册
1. 修改 **env** 文件中的 **VITE_ROUTER_AUTOLOAD** 值为false<br/>
2. 参考**src\router\module**目录下路由写法，包含meta数据则自动注册到左侧菜单，否则不注册
