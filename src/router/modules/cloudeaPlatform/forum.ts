import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/forum',
    name: 'forum',
    component: () => import('@/views/CloudeaPlatform/ForumPage.vue'),
    meta: {
      title: ''
    }
  }
]