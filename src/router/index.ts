import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  type Router,
  type RouteRecordRaw
} from 'vue-router'

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
const cloudeaPlatformModules = import.meta.glob('./modules/cloudeaPlatform/**/*.{js,ts}', {
  eager: true
})
const cloudeaPlatformLayout = loadModules(cloudeaPlatformModules)

// 动态载入modules
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/CloudeaPlatformLayout.vue'),
    children: [...cloudeaPlatformLayout]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes
})

import http from '@/utils/http'

// router.beforeEach((to, from, next) => {
//   if (to.path === '/') {
//     next()
//   } else {
//     const token = localStorage.getItem('Authorization') || null
//     if (token === null || token === '') {
//       next('/')
//     } else {
//       next()
//     }
//   }
// })

export default router
