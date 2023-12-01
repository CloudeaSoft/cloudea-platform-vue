import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/CloudeaPlatform/HomePage.vue'),
    children:[
      {
        path: '/',
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
