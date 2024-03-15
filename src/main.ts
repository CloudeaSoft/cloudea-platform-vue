import './design/main.css'
import './design/base-color.css'
import './design/base-position.css'
import './design/styles.scss'
import './assets/fonts/fonts.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
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
setupRouter(app)
app.use(ElementPlus)
app.config.globalProperties.$http = axios
app.config.globalProperties.$moment = moment
app.config.globalProperties.$bus = mitt()

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
