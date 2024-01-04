import './assets/main.css'
import './assets/css/base-color.css'
import './assets/css/base-position.css'
import './assets/css/styles.scss'
import './assets/fonts/fonts.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import pinia from './store'
import moment from 'moment'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'default-passive-events'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mitt from 'mitt'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$http = axios
app.config.globalProperties.$moment = moment
app.config.globalProperties.$bus = mitt()

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
