//登录接口 参数类型
export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token: string
}

//登录接口 返回类型
export interface loginResponse {
  code: number
  data: dataType
}

//