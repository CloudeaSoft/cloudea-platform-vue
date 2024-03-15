import {
  createRouter,
  createWebHashHistory,
  type Router,
  type RouteRecordRaw
} from 'vue-router'
import { type App } from 'vue'

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })

/**
 * 加载路由
 * @param modules
 * @returns
 */
function loadModules(modules: any) {
  let moduleRoutes: Array<RouteRecordRaw> = []
  for (const path in modules) {
    const module = modules[path]
    const defaultExport = module.default as Array<RouteRecordRaw>
    moduleRoutes = moduleRoutes.concat(defaultExport)
  }
  return moduleRoutes
}

// 外部布局 (/external)
const cloudeaPlatformModules = import.meta.glob('./routes/modules/**/*.{js,ts}', {
  eager: true
})
// 动态载入modules
const cloudeaPlatformLayout = loadModules(cloudeaPlatformModules)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/CloudeaPlatform/PlatformHome.vue'),
  },
  {
    path: '/platform',
    name: 'index',
    component: () => import('@/views/CloudeaPlatform/PlatformIndex.vue'),
    children: [...cloudeaPlatformLayout]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}
