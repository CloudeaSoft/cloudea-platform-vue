import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/User',
    name: 'user',
    component: () => import('@/views/CloudeaPlatform/UserPage.vue'),
    meta: {
      title: ''
    }
  }
]
