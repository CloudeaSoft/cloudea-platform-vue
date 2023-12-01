import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/Tool',
    name: 'toolPage',
    component: () => import('@/views/CloudeaPlatform/ToolPage.vue'),
    children: [
      {
        name: 'empty',
        path: '/Tool/',
        component:()=>import('@/views/CloudeaPlatform/Tool/EmptyTool.vue')
      },
      {
        name: 'arknightsGacha',
        path: '/Tool/ArknightsGacha',
        component: () => import('@/views/CloudeaPlatform/Tool/ArknightsGacha.vue')
      },
      {
        name: 'osuSkinIni',
        path: '/Tool/OsuSkinIni',
        component: () => import('@/views/CloudeaPlatform/Tool/OsuSkinIni.vue')
      }
    ],
    meta: {
      title: ''
    }
  }
]
