import request from '@/utils/http'
import type { loginForm, loginResponse } from './type'

enum API {
  LOGIN_URL = '/account/login',
  USERINFO_URL = '/account/info'
}

export const reqLogin = (data: loginForm) => request.post<any, loginResponse>(API.LOGIN_URL, data)

export const reqUserInfo = () => request.get(API.USERINFO_URL)
