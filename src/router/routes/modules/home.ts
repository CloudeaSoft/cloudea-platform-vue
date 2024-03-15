import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/platform/home',
    name: 'index',
    component: () => import('@/views/CloudeaPlatform/HomePage.vue'),
    children:[
      {
        path: '/platform/home/test',
        name: 'test',
        component: () => import('@/views/Test/Test.vue'),
        meta: {
          title: '',
        }
      },
      // {
      //   path:'/index/logo',
      //   component:()=>import('@/views/CloudeaPlatform/components/logo.vue'),
      // }
    ],
    meta: {
      title: '',
    }
  },
]
