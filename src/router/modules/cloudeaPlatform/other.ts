import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/book',
    name: 'book',
    component: () => import('@/views/CloudeaPlatform/BookPage.vue'),
    meta: {
      title: ''
    }
  }
]
