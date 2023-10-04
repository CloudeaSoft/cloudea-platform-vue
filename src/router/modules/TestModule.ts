import { type RouteRecordRaw } from 'vue-router'
const page: Array<RouteRecordRaw> = [
  {
    path: '/EDM/FreightEDM',
    name: 'FreightEDM',
    component: () => import('@/views/internal/EDM/FreightEDM.vue'),
    meta: {
      title: '运价EDM报价'
    }
  }
]
export default page