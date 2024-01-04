import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/CloudeaPlatform/UserPage.vue'),
    children: [
      {
        path: '/user/home',
        name: 'home',
        component: () => import('@/views/CloudeaPlatform/User/UserHome.vue')
      },
      {
        path: '/user/setting',
        name: 'setting',
        component: () => import('@/views/CloudeaPlatform/User/UserSetting.vue')
      },
      {
        path: '/user/security',
        name: 'security',
        component: () => import('@/views/CloudeaPlatform/User/UserSecurity.vue')
      },
      {
        path: '/user/avatar',
        name: 'avatar',
        component: () => import('@/views/CloudeaPlatform/User/UserAvatar.vue')
      }
    ],
    meta: {
      title: ''
    }
  }
]
