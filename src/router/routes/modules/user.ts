import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/CloudeaPlatform/User/UserIndex.vue'),
    children: [
      {
        path: '',
        name: 'default',
        component: () => import('@/views/CloudeaPlatform/User/UserHome.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/CloudeaPlatform/User/UserHome.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/CloudeaPlatform/User/UserSetting.vue')
      },
      {
        path: 'security',
        name: 'security',
        component: () => import('@/views/CloudeaPlatform/User/UserSecurity.vue')
      },
      {
        path: 'avatar',
        name: 'avatar',
        component: () => import('@/views/CloudeaPlatform/User/UserAvatar.vue')
      }
    ],
    meta: {
      title: ''
    }
  }
]
