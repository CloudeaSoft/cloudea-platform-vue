import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/BookShelf',
    name: 'bookShelf',
    component: () => import('@/views/CloudeaPlatform/BookPage.vue'),
    meta: {
      title: ''
    }
  }
]
