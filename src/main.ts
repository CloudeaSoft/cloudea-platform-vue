import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$http = axios
app.config.globalProperties.$moment = moment

app.mount('#app')