import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: 'forum',
    name: 'forum',
    component: () => import('@/views/CloudeaPlatform/Forum/ForumIndex.vue'),
    meta: {
      title: ''
    },
    children: [
      {
        path: 'home',
        name: 'forumIndex',
        component: () => import('@/views/CloudeaPlatform/Forum/ForumHome.vue')
      },
      {
        path: 'post',
        name: 'forumPost',
        component: () => import('@/views/CloudeaPlatform/Forum/ForumPost.vue')
      }
    ]
  }
]
