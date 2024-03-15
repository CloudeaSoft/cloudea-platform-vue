import http from '@/utils/http/http'
import type { loginForm, loginResponse } from './type'

enum API {
  LOGIN_URL = '/account/login',
  USERINFO_URL = '/account/info'
}

export const reqLogin = (data: loginForm) => http.post<any, loginResponse>(API.LOGIN_URL, data)

export const reqUserInfo = () => http.get(API.USERINFO_URL)
