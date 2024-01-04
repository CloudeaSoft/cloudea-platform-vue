import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: '/tool',
    name: 'toolPage',
    component: () => import('@/views/CloudeaPlatform/ToolPage.vue'),
    children: [
      {
        name: 'tool',
        path: '/tool/',
        component:()=>import('@/views/CloudeaPlatform/Tool/EmptyTool.vue')
      },
      {
        name: 'arknightsGacha',
        path: '/tool/arknightsgacha',
        component: () => import('@/views/CloudeaPlatform/Tool/ArknightsGacha.vue')
      },
      {
        name: 'osuSkinIni',
        path: '/tool/osuskinini',
        component: () => import('@/views/CloudeaPlatform/Tool/OsuSkinIni.vue')
      }
    ],
    meta: {
      title: ''
    }
  }
]
