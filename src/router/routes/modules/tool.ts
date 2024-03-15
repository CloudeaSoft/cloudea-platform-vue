import { type RouteRecordRaw } from 'vue-router'
export default <Array<RouteRecordRaw>>[
  {
    path: 'tool',
    name: 'toolPage',
    component: () => import('@/views/CloudeaPlatform/Tool/ToolIndex.vue'),
    children: [
      {
        name: 'tool',
        path: 'home',
        component:()=>import('@/views/CloudeaPlatform/Tool/EmptyTool.vue')
      },
      {
        name: 'arknightsGacha',
        path: 'arknightsgacha',
        component: () => import('@/views/CloudeaPlatform/Tool/ArknightsGacha.vue')
      },
      {
        name: 'osuSkinIni',
        path: 'osuskinini',
        component: () => import('@/views/CloudeaPlatform/Tool/OsuSkinIni.vue')
      },
      {
        name: 'json',
        path: 'json',
        component: () => import('@/views/CloudeaPlatform/Tool/JsonAnalyzer.vue')
      }
    ],
    meta: {
      title: ''
    }
  }
]
