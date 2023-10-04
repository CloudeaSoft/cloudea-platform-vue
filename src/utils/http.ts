import axios from 'axios'
import { ElMessage } from 'element-plus'

// 基础axios对象
const request = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    //设置请求头
    // config.headers['token'] = use.token;
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// response拦截器
//可以在接口响应后统一处理结果
request.interceptors.response.use(
  //成功回调
  (response) => {
    //    response.data即为后端返回的Result
    let res = response.data
    //    兼容服务器返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    return res
  },
  // 失败回调
  (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = "Token过期"
        break
      case 403:
        message = "无权访问"
        break
      case 404:
        message = "请求地址错误"
        break
      case 500:
        message = "服务器出现问题"
        break
      default:
        message = "网络出现问题"
        break
    }
    //提示错误信息
    ElMessage({
        type: 'error',
        message
    })
    console.log('err:' + error)
    return Promise.reject(error)
  }
)

// export
export default request
